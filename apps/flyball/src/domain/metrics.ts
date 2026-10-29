import type { Athlete, MetricEntry, MetricKey, MetricValues } from './types.ts';

export type MetricGroup = 'antropometrik' | 'morfofunksional' | 'jismoniy';
export type Better = 'higher' | 'lower' | 'neutral';
export type Rating = 'past' | 'orta' | 'yuqori';

export interface MetricDef {
  key: MetricKey;
  label: string;
  unit: string;
  group: MetricGroup;
  better: Better;
  min: number;
  max: number;
  step: number;
  hint: string;
}

export const METRIC_GROUPS: { id: MetricGroup; label: string; description: string }[] = [
  { id: 'antropometrik', label: 'Antropometrik', description: 'Bo‘y va tana vazni kabi o‘lchovlar mashg‘ulot yuklamasi va platforma balandligini tanlashda yordam beradi.' },
  { id: 'morfofunksional', label: 'Morfofunksional', description: 'Yurak-qon tomir tizimining zo‘riqishdan keyin tiklanish qobiliyatini baholash.' },
  { id: 'jismoniy', label: 'Jismoniy tayyorgarlik', description: 'Sakrash qobiliyati, tezkor kuch va chaqqonlikni baholash testlari.' },
];

export const METRICS: MetricDef[] = [
  { key: 'height', label: 'Bo‘y', unit: 'sm', group: 'antropometrik', better: 'neutral', min: 120, max: 210, step: 0.5, hint: 'Poyabzalsiz, tik turgan holda o‘lchang.' },
  { key: 'weight', label: 'Tana vazni', unit: 'kg', group: 'antropometrik', better: 'neutral', min: 25, max: 120, step: 0.1, hint: 'Ertalab, mashg‘ulotdan oldin o‘lchang.' },
  { key: 'standingReach', label: 'Qo‘l yetadigan balandlik', unit: 'sm', group: 'antropometrik', better: 'neutral', min: 150, max: 290, step: 1, hint: 'Devor yonida turib, bir qo‘lni yuqoriga cho‘zgan holda o‘lchang.' },
  { key: 'restingHr', label: 'Tinch holatdagi yurak urishi', unit: 'marta/daq.', group: 'morfofunksional', better: 'lower', min: 40, max: 120, step: 1, hint: 'Ertalab o‘rningizdan turmasdan, yurak urishini 1 daqiqa davomida sanang.' },
  { key: 'rufier', label: 'Rufye indeksi', unit: '', group: 'morfofunksional', better: 'lower', min: -5, max: 25, step: 0.1, hint: '30 soniyada 30 marta o‘tirib-turgandan so‘ng yurak urishining tiklanishini baholash.' },
  { key: 'verticalJump', label: 'Joyidan yuqoriga sakrash', unit: 'sm', group: 'jismoniy', better: 'higher', min: 10, max: 80, step: 0.5, hint: 'Qo‘llarni siltab 3 marta sakrang va eng yaxshi natijani kiriting.' },
  { key: 'attackReach', label: 'Hujumdagi sakrash balandligi', unit: 'sm', group: 'jismoniy', better: 'higher', min: 180, max: 340, step: 1, hint: 'Yugurib kelib sakraganda qo‘l yetgan eng yuqori nuqtani o‘lchang.' },
  { key: 'longJump', label: 'Joyidan uzunlikka sakrash', unit: 'sm', group: 'jismoniy', better: 'higher', min: 100, max: 280, step: 1, hint: 'Ikki oyoqda depsinib sakrang va eng yaxshi urinish natijasini kiriting.' },
  { key: 'shuttleRun', label: 'Moki yugurish 6×5 m', unit: 's', group: 'jismoniy', better: 'lower', min: 6, max: 20, step: 0.01, hint: 'Voleybol maydonida yo‘nalishni tez o‘zgartirish qobiliyatini o‘lchash.' },
];

export function metricDef(key: MetricKey): MetricDef {
  const def = METRICS.find((m) => m.key === key);
  if (!def) throw new Error(`Unknown metric ${key}`);
  return def;
}

export function validateValue(key: MetricKey, value: number): string | null {
  const def = metricDef(key);
  if (!Number.isFinite(value)) return 'Raqam kiriting';
  if (value < def.min || value > def.max) return `Qiymat ${def.min} dan ${def.max} gacha bo‘lishi kerak`;
  return null;
}

/** Most recent value of every metric for one athlete, with the date it was measured. */
export function latestValues(entries: MetricEntry[], athleteId: string): { values: MetricValues; dates: Partial<Record<MetricKey, string>> } {
  const values: MetricValues = {};
  const dates: Partial<Record<MetricKey, string>> = {};
  const own = entries.filter((e) => e.athleteId === athleteId).sort((a, b) => a.date.localeCompare(b.date));
  for (const entry of own) {
    for (const [key, value] of Object.entries(entry.values) as [MetricKey, number][]) {
      if (value == null) continue;
      values[key] = value;
      dates[key] = entry.date;
    }
  }
  return { values, dates };
}

export function ageOf(athlete: Athlete, now: Date): number {
  return now.getFullYear() - athlete.birthYear;
}

export function bmi(values: MetricValues): number | null {
  if (!values.height || !values.weight) return null;
  const m = values.height / 100;
  return Math.round((values.weight / (m * m)) * 10) / 10;
}

/**
 * Approximate standing vertical jump bands for girls who play volleyball,
 * widening by about 1–1.5 cm for each year of age from 12.
 */
export function jumpNorm(age: number): { low: number; high: number } {
  const years = Math.min(Math.max(age - 12, 0), 6);
  return { low: Math.round(26 + years), high: Math.round(36 + years * 1.5) };
}

export function rateVerticalJump(cm: number, age: number): Rating {
  const { low, high } = jumpNorm(age);
  if (cm < low) return 'past';
  if (cm >= high) return 'yuqori';
  return 'orta';
}

export function rufierRating(value: number): { label: string; rating: Rating } {
  if (value <= 5) return { label: value <= 0 ? 'A’lo' : 'Yaxshi', rating: 'yuqori' };
  if (value <= 10) return { label: 'Qoniqarli', rating: 'orta' };
  return { label: value <= 15 ? 'Yaxshilash kerak' : 'Past', rating: 'past' };
}

export const RATING_LABEL: Record<Rating, string> = { past: 'Past', orta: 'O‘rta', yuqori: 'Yuqori' };

export function formatValue(key: MetricKey, value: number): string {
  const def = metricDef(key);
  const digits = def.step < 0.1 ? 2 : def.step < 1 ? 1 : 0;
  return value.toFixed(digits).replace(/(\.\d*?)0+$/, '$1').replace(/\.$/, '');
}
