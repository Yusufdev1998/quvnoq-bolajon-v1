import { sessionContacts, sessionLoad } from './analytics.ts';
import { drillById, exerciseById } from './catalog.ts';
import { METRICS } from './metrics.ts';
import type { AppState } from './types.ts';

type Cell = string | number | undefined;

const escape = (value: Cell) => {
  const s = value == null ? '' : String(value);
  return /[",;\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
};

/** CSV with a BOM so Excel opens Uzbek letters correctly. */
export function toCsv(rows: Cell[][]): string {
  return '﻿' + rows.map((r) => r.map(escape).join(',')).join('\r\n');
}

export function sessionsCsv(state: AppState): string {
  const names = new Map(state.athletes.map((a) => [a.id, a.name]));
  const rows: Cell[][] = [['Sportchi', 'Sana', 'Turi', 'Bosqich', 'Mashqlar', 'Sakrashlar', 'Davomiylik (daq.)', 'RPE', 'Mashg‘ulot yuklamasi (AU)', 'Texnika', 'Izoh']];
  for (const s of [...state.sessions].sort((a, b) => a.date.localeCompare(b.date))) {
    const items = s.items.map((i) => (i.kind === 'exercise' ? exerciseById(i.refId)?.name : drillById(i.refId)?.name) ?? i.refId).join('; ');
    rows.push([names.get(s.athleteId), s.date, s.kind === 'plyo' ? 'Plyometrika' : 'O‘yin elementlari', s.block ?? '', items, sessionContacts(s), s.durationMin, s.rpe, sessionLoad(s), s.technique, s.note]);
  }
  return toCsv(rows);
}

export function metricsCsv(state: AppState): string {
  const names = new Map(state.athletes.map((a) => [a.id, a.name]));
  const rows: Cell[][] = [['Sportchi', 'Sana', ...METRICS.map((m) => (m.unit ? `${m.label} (${m.unit})` : m.label))]];
  for (const e of [...state.metrics].sort((a, b) => a.date.localeCompare(b.date))) {
    rows.push([names.get(e.athleteId), e.date, ...METRICS.map((m) => e.values[m.key])]);
  }
  return toCsv(rows);
}
