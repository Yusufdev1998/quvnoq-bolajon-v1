import { addDays, daysBetween, parseISODate, startOfWeek, toISODate } from '../core/dates.ts';
import { metricDef } from './metrics.ts';
import { MASTERY, type BlockProgress } from './progression.ts';
import type { MetricEntry, MetricKey, Session } from './types.ts';

/** Session-RPE load in arbitrary units: RPE × minutes. */
export const sessionLoad = (s: Session) => s.rpe * s.durationMin;
export const sessionContacts = (s: Session) => s.items.reduce((sum, i) => sum + i.contacts, 0);

export interface WeekBucket {
  start: string;
  contacts: number;
  load: number;
  sessions: number;
}

export function weeklyBuckets(sessions: Session[], athleteId: string, now: Date, weeks = 8): WeekBucket[] {
  const first = addDays(startOfWeek(now), -7 * (weeks - 1));
  const buckets: WeekBucket[] = Array.from({ length: weeks }, (_, i) => ({ start: toISODate(addDays(first, i * 7)), contacts: 0, load: 0, sessions: 0 }));
  for (const s of sessions) {
    if (s.athleteId !== athleteId) continue;
    const index = Math.floor(daysBetween(first, parseISODate(s.date)) / 7);
    const bucket = buckets[index];
    if (!bucket) continue;
    bucket.contacts += sessionContacts(s);
    bucket.load += sessionLoad(s);
    bucket.sessions += 1;
  }
  return buckets;
}

export type AcwrZone = 'nomalum' | 'kam' | 'optimal' | 'yuqori' | 'xavfli';

export interface Acwr {
  acute: number;
  chronic: number;
  ratio: number | null;
  zone: AcwrZone;
}

/** Days of training history before the ratio means anything; earlier, one session looks like a 4× spike. */
export const ACWR_MIN_HISTORY_DAYS = 21;

/** Acute:chronic workload ratio — last 7 days against the weekly average of the last 28. */
export function acwr(sessions: Session[], athleteId: string, now: Date): Acwr {
  let acute = 0;
  let total = 0;
  let history = 0;
  for (const s of sessions) {
    if (s.athleteId !== athleteId) continue;
    const ago = daysBetween(parseISODate(s.date), now);
    history = Math.max(history, ago);
    if (ago < 0 || ago >= 28) continue;
    total += sessionLoad(s);
    if (ago < 7) acute += sessionLoad(s);
  }
  const chronic = total / 4;
  if (chronic === 0 || history < ACWR_MIN_HISTORY_DAYS) return { acute, chronic, ratio: null, zone: 'nomalum' };
  const ratio = Math.round((acute / chronic) * 100) / 100;
  const zone: AcwrZone = ratio < 0.8 ? 'kam' : ratio <= 1.3 ? 'optimal' : ratio <= 1.5 ? 'yuqori' : 'xavfli';
  return { acute, chronic, ratio, zone };
}

/** Plyometric sessions need about 48 h between them for tendons and muscles to recover. */
export const MIN_REST_DAYS = 2;

/** The date the athlete can train again, or null when today is fine. Game drills count: they are jumps too. */
export function restUntil(sessions: Session[], athleteId: string, now: Date): Date | null {
  const last = sessions.filter((s) => s.athleteId === athleteId).reduce<string | null>((max, s) => (max == null || s.date > max ? s.date : max), null);
  if (last == null) return null;
  const until = addDays(parseISODate(last), MIN_REST_DAYS);
  return daysBetween(now, until) > 0 ? until : null;
}

export const ZONE_LABEL: Record<AcwrZone, string> = {
  nomalum: 'Ma’lumot yetarli emas',
  kam: 'Yuklama kam',
  optimal: 'Optimal zona',
  yuqori: 'Yuqori',
  xavfli: 'Jarohat xavfi',
};

export interface Point {
  date: string;
  value: number;
}

export function metricSeries(entries: MetricEntry[], athleteId: string, key: MetricKey): Point[] {
  return entries
    .filter((e) => e.athleteId === athleteId && e.values[key] != null)
    .map((e) => ({ date: e.date, value: e.values[key] as number }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export interface Trend {
  delta: number;
  improving: boolean | null;
}

/** Change between the first and the last point; `improving` honours whether lower is better. */
export function trend(series: Point[], key: MetricKey): Trend | null {
  if (series.length < 2) return null;
  const delta = Math.round((series[series.length - 1].value - series[0].value) * 100) / 100;
  const better = metricDef(key).better;
  if (better === 'neutral' || delta === 0) return { delta, improving: null };
  return { delta, improving: better === 'higher' ? delta > 0 : delta < 0 };
}

export interface Advice {
  id: string;
  tone: 'good' | 'info' | 'warn';
  title: string;
  text: string;
}

export interface AdviceInput {
  sessions: Session[];
  entries: MetricEntry[];
  athleteId: string;
  progress: BlockProgress[];
  now: Date;
}

/** Methodological recommendations for the coach, derived from the monitoring data. */
export function coachAdvice({ sessions, entries, athleteId, progress, now }: AdviceInput): Advice[] {
  const advice: Advice[] = [];
  const own = sessions.filter((s) => s.athleteId === athleteId).sort((a, b) => a.date.localeCompare(b.date));

  if (own.length === 0) {
    advice.push({ id: 'start', tone: 'info', title: 'Birinchi mashg‘ulot', text: 'Monitoring mashg‘ulotlar saqlangandan keyin boshlanadi. 1-blokdan, to‘g‘ri qo‘nish texnikasidan boshlang.' });
  }

  const load = acwr(sessions, athleteId, now);
  if (load.zone === 'xavfli') {
    advice.push({ id: 'acwr-high', tone: 'warn', title: 'Yuklama keskin oshgan', text: `Oxirgi 7 kunlik yuklama 4 haftalik o‘rtachadan ${load.ratio} baravar ko‘p. Keyingi 2–3 mashg‘ulotda sakrashlar sonini 20–30% kamaytiring.` });
  } else if (load.zone === 'kam') {
    advice.push({ id: 'acwr-low', tone: 'info', title: 'Yuklama pasaygan', text: 'Bu hafta odatdagidan kam mashq qilindi. Tanaffusdan keyin hajmni birdaniga emas, asta-sekin tiklang.' });
  }

  const recent = own.slice(-3);
  if (recent.length === 3) {
    const rpe = recent.reduce((s, x) => s + x.rpe, 0) / 3;
    const technique = recent.reduce((s, x) => s + x.technique, 0) / 3;
    if (rpe >= 8) {
      advice.push({ id: 'fatigue', tone: 'warn', title: 'Charchoq belgilari', text: `Oxirgi 3 mashg‘ulotda o‘rtacha RPE ${rpe.toFixed(1)}. Bitta yengil kun yoki to‘liq dam olish kunini rejalashtiring.` });
    }
    if (technique < 3) {
      advice.push({ id: 'technique', tone: 'warn', title: 'Texnikaga e’tibor', text: 'Texnika bahosi pasaygan. Yuklamani oshirmang: tumba balandligini pasaytiring va qo‘nish mashqlarini takrorlang.' });
    }
  }

  const active = progress.find((p) => p.state === 'active');
  if (active && active.sessions >= MASTERY.minSessions && (active.recentTechnique ?? 0) < MASTERY.techniqueAvg) {
    advice.push({ id: 'block-gate', tone: 'info', title: `${active.block}-blokda qolish`, text: `Mashg‘ulotlar soni yetarli, ammo texnika o‘rtachasi ${active.recentTechnique ?? '—'} (kerak: ${MASTERY.techniqueAvg}). Keyingi blokka o‘tishdan oldin sifatni oshiring.` });
  }
  const mastered = progress.filter((p) => p.state === 'mastered');
  if (mastered.length > 0 && active) {
    advice.push({ id: 'block-up', tone: 'good', title: `${active.block}-blok ochilgan`, text: `${mastered.length} ta blok o‘zlashtirildi. Yangi blokning birinchi haftasida hajmni 80% dan boshlang.` });
  }

  const jumps = metricSeries(entries, athleteId, 'verticalJump');
  if (jumps.length >= 2) {
    const last = jumps[jumps.length - 1].value;
    const prev = jumps[jumps.length - 2].value;
    if (last - jumps[0].value >= 2) {
      advice.push({ id: 'jump-up', tone: 'good', title: 'Sakrovchanlik o‘smoqda', text: `Joyidan sakrash ${jumps[0].value} sm dan ${last} sm gacha oshdi. Joriy metodika samarali.` });
    }
    if (jumps.length >= 3 && last <= prev && prev <= jumps[jumps.length - 3].value) {
      advice.push({ id: 'jump-plateau', tone: 'warn', title: 'Natija to‘xtab qolgan', text: 'Oxirgi uchta testda sakrash o‘smadi. Mashqlar to‘plamini almashtiring yoki bir haftalik yengillashtirilgan sikl qo‘llang.' });
    }
  }

  const lastTest = entries.filter((e) => e.athleteId === athleteId).map((e) => e.date).sort().pop();
  if (!lastTest) {
    advice.push({ id: 'no-tests', tone: 'info', title: 'Boshlang‘ich test', text: 'Individual yuklama uchun bo‘y, vazn, Rufye indeksi va joyidan sakrash natijasini kiriting.' });
  } else if (daysBetween(parseISODate(lastTest), now) > 28) {
    advice.push({ id: 'retest', tone: 'info', title: 'Qayta test vaqti', text: 'Oxirgi o‘lchovdan 4 haftadan ko‘p vaqt o‘tdi. Dinamikani ko‘rish uchun testlarni takrorlang.' });
  }

  const order = { warn: 0, info: 1, good: 2 };
  return advice.sort((a, b) => order[a.tone] - order[b.tone]);
}
