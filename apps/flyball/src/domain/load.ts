import { INTENSITY_ORDER } from './catalog.ts';
import { ageOf, bmi, rateVerticalJump, RATING_LABEL, rufierRating } from './metrics.ts';
import type { Athlete, Dosable, MetricValues } from './types.ts';

export type Level = 1 | 2 | 3;

export interface LoadNote {
  tone: 'info' | 'warn';
  text: string;
}

/** How plyometric load is individualised for one athlete. */
export interface LoadProfile {
  level: Level;
  levelLabel: string;
  /** Foot contacts allowed in one session. */
  contactsBudget: number;
  volumeFactor: number;
  restFactor: number;
  maxBoxCm: number;
  notes: LoadNote[];
}

export interface Prescription {
  sets: number;
  reps: number;
  restSec: number;
  contacts: number;
}

// Session foot-contact ranges commonly used for beginner, intermediate and advanced plyometrics.
const LEVELS: Record<Level, { label: string; contacts: number; volume: number; box: number }> = {
  1: { label: 'Boshlang‘ich', contacts: 80, volume: 0.8, box: 30 },
  2: { label: 'O‘rta', contacts: 110, volume: 1, box: 40 },
  3: { label: 'Yuqori', contacts: 140, volume: 1.15, box: 50 },
};

export function buildLoadProfile(athlete: Athlete, values: MetricValues, now: Date): LoadProfile {
  const age = ageOf(athlete, now);
  const notes: LoadNote[] = [];
  let level: Level = 1;
  let restFactor = 1;

  if (values.verticalJump != null) {
    const rating = rateVerticalJump(values.verticalJump, age);
    level = rating === 'yuqori' ? 3 : rating === 'orta' ? 2 : 1;
    notes.push({ tone: 'info', text: `Joyidan sakrash: ${values.verticalJump} sm. Yosh me’yoriga ko‘ra daraja: ${RATING_LABEL[rating].toLowerCase()}.` });
  } else {
    notes.push({ tone: 'info', text: 'Joyidan sakrash natijasi hali kiritilmagan. Shu sababli yuklama boshlang‘ich darajada belgilandi.' });
  }

  if (values.rufier != null) {
    const { label } = rufierRating(values.rufier);
    if (values.rufier > 10) {
      level = Math.max(1, level - 1) as Level;
      restFactor = 1.5;
      notes.push({ tone: 'warn', text: `Rufye indeksi: ${values.rufier} (${label.toLowerCase()}). Dam olish vaqti 1,5 baravar oshirildi va yuklama darajasi bir pog‘ona pasaytirildi.` });
    } else if (values.rufier > 5) {
      restFactor = 1.2;
      notes.push({ tone: 'info', text: `Rufye indeksi: ${values.rufier} (qoniqarli). Dam olish vaqti 20% ga uzaytirildi.` });
    }
  }

  if (values.restingHr != null && values.restingHr > 90) {
    restFactor = Math.max(restFactor, 1.3);
    notes.push({ tone: 'warn', text: `Tinch holatdagi yurak urishi: ${values.restingHr}. Tiklanish sust bo‘lgani uchun to‘plamlar orasidagi dam olish vaqti uzaytirildi.` });
  }

  const base = LEVELS[level];
  let contactsBudget = base.contacts;
  let volumeFactor = base.volume;
  let maxBoxCm = base.box;

  if (age < 13) {
    contactsBudget = Math.min(contactsBudget, 90);
    maxBoxCm = Math.min(maxBoxCm, 30);
    notes.push({ tone: 'info', text: '13 yoshdan kichik sportchilar uchun mashg‘ulotdagi sakrashlar soni va platforma balandligi cheklangan.' });
  }

  const index = bmi(values);
  if (index != null && index >= 25) {
    volumeFactor *= 0.85;
    contactsBudget = Math.round(contactsBudget * 0.85);
    maxBoxCm -= 10;
    notes.push({ tone: 'warn', text: `Tana vazni indeksi: ${index}. Bo‘g‘imlarga tushadigan yukni kamaytirish uchun mashg‘ulot hajmi 15% ga qisqartirildi va platforma balandligi pasaytirildi.` });
  }

  return { level, levelLabel: base.label, contactsBudget, volumeFactor, restFactor, maxBoxCm, notes };
}

export function prescribe(item: Dosable, profile: LoadProfile): Prescription {
  const reps = Math.max(3, Math.round(item.baseReps * profile.volumeFactor));
  const sets = item.intensity === 'yuqori' && profile.level === 1 ? Math.max(2, item.baseSets - 1) : item.baseSets;
  const restSec = Math.round((item.restSec * profile.restFactor) / 5) * 5;
  return { sets, reps, restSec, contacts: sets * reps * item.contactsPerRep };
}

export interface PlannedItem<T extends Dosable = Dosable> extends Prescription {
  item: T;
}

/**
 * Builds one session from a pool of exercises: easiest first, staying inside the
 * athlete's foot-contact budget. `rotation` shifts which exercises lead so that
 * consecutive sessions in the same block are not identical.
 */
export function planWorkout<T extends Dosable>(pool: T[], profile: LoadProfile, rotation = 0, maxItems = 5): PlannedItem<T>[] {
  if (pool.length === 0) return [];
  const shift = rotation % pool.length;
  const ordered = [...pool.slice(shift), ...pool.slice(0, shift)].sort((a, b) => INTENSITY_ORDER[a.intensity] - INTENSITY_ORDER[b.intensity]);
  const plan: PlannedItem<T>[] = [];
  let total = 0;
  for (const item of ordered) {
    if (plan.length >= maxItems) break;
    const p = prescribe(item, profile);
    if (total + p.contacts <= profile.contactsBudget) {
      plan.push({ item, ...p });
      total += p.contacts;
      continue;
    }
    // Fit a shorter version of the exercise into what is left of the budget.
    const perSet = p.reps * item.contactsPerRep;
    const sets = Math.floor((profile.contactsBudget - total) / perSet);
    if (sets >= 2) {
      plan.push({ item, ...p, sets, contacts: sets * perSet });
      total += sets * perSet;
    }
  }
  return plan;
}

/** Rough session length: work at ~2 s per contact plus rest between sets, plus 10 min warm-up. */
export function estimateMinutes(plan: Prescription[]): number {
  const seconds = plan.reduce((sum, p) => sum + p.contacts * 2 + (p.sets - 1) * p.restSec + 60, 0);
  return Math.round(seconds / 60) + 10;
}
