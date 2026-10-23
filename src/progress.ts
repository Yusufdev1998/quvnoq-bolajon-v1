import type { Activity, ActivityKind, Mood } from './data';

export type Session = { id: string; activityId: string; title: string; kind: ActivityKind; day?: number; seconds: number; mood: Mood; at: string };
export type Profile = { name: string; age: number; role: 'parent' | 'teacher' };
export type Progress = { version: 1; profile: Profile; sessions: Session[]; reducedMotion: boolean };
export const STORAGE_KEY = 'quvnoq-bolajon-v1';
export const initialProgress: Progress = { version: 1, profile: { name: 'Bolajon', age: 5, role: 'parent' }, sessions: [], reducedMotion: false };

export function dateKey(date: Date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(date);
}

const uzMonths = ['yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun', 'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'];
const uzWeekdays = ['Yakshanba', 'Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba'];
export function uzDate(date = new Date(), short = false): string {
  const [, month, day] = dateKey(date).split('-').map(Number);
  return `${day}-${short ? uzMonths[month - 1].slice(0, 3) : uzMonths[month - 1]}`;
}
export function uzWeekday(date = new Date()): string {
  return uzWeekdays[new Date(`${dateKey(date)}T12:00:00+05:00`).getUTCDay()];
}
export function localTime(date: Date): string {
  return new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Tashkent' }).format(date);
}

export function csvCell(value: string | number): string {
  const text = String(value);
  const safe = /^[\s]*[=+@-]/.test(text) ? `'${text}` : text;
  return `"${safe.replace(/"/g, '""')}"`;
}

export function normalizeProgress(value: unknown): Progress {
  if (!value || typeof value !== 'object') return structuredClone(initialProgress);
  const p = value as Partial<Progress>;
  if (p.version !== 1) return structuredClone(initialProgress);
  const sessions = Array.isArray(p.sessions) ? p.sessions.filter((s): s is Session => !!s && typeof s.id === 'string' && typeof s.title === 'string' && typeof s.activityId === 'string' && ['gym', 'game', 'motor'].includes(s.kind) && ['happy', 'okay', 'tired'].includes(s.mood) && Number.isFinite(s.seconds) && s.seconds >= 0 && !Number.isNaN(Date.parse(s.at)) && (s.day === undefined || (Number.isInteger(s.day) && s.day >= 1 && s.day <= 30))) : [];
  return {
    version: 1,
    profile: { name: typeof p.profile?.name === 'string' && p.profile.name.trim() ? p.profile.name.slice(0, 30) : 'Bolajon', age: typeof p.profile?.age === 'number' && p.profile.age >= 3 && p.profile.age <= 7 ? p.profile.age : 5, role: p.profile?.role === 'teacher' ? 'teacher' : 'parent' },
    sessions, reducedMotion: p.reducedMotion === true,
  };
}

export function completedDays(sessions: Session[]): number[] {
  return [...new Set(sessions.filter(s => s.kind === 'gym' && s.day).map(s => s.day!))].sort((a, b) => a - b);
}

export function nextDay(sessions: Session[]): number {
  const done = new Set(completedDays(sessions));
  for (let day = 1; day <= 30; day++) if (!done.has(day)) return day;
  return 30;
}

export function isDayUnlocked(day: number, sessions: Session[]): boolean {
  if (!Number.isInteger(day) || day < 1 || day > 30) return false;
  const done = new Set(completedDays(sessions));
  for (let previous = 1; previous < day; previous++) if (!done.has(previous)) return false;
  return true;
}

export function recordSession(sessions: Session[], activity: Activity, seconds: number, mood: Mood, at = new Date().toISOString()): Session[] {
  if (activity.kind === 'gym' && !isDayUnlocked(activity.day ?? 0, sessions)) return sessions;
  // A phone opening the LAN preview over HTTP may not expose randomUUID.
  const id = globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 13)}`;
  const session: Session = { id, activityId: activity.id, title: activity.title, kind: activity.kind, ...(activity.day ? { day: activity.day } : {}), seconds: Math.max(0, Math.floor(seconds)), mood, at };
  return [session, ...sessions];
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} soniya`;
  return `${Math.floor(seconds / 60)} daq${seconds % 60 ? ` ${seconds % 60} son` : ''}`;
}

export function downloadReport(progress: Progress) {
  const columns = ['Sana', 'Bola', 'Bo‘lim', 'Mashg‘ulot', 'Kun', 'Davomiylik (soniya)', 'Kayfiyat'];
  const rows = progress.sessions.map(s => [`${dateKey(new Date(s.at))} ${localTime(new Date(s.at))}`, progress.profile.name, s.kind === 'gym' ? 'Gimnastika' : s.kind === 'game' ? 'O‘yin' : 'Mayda motorika', s.title, s.day ?? '', s.seconds, { happy: 'Xursand', okay: 'Yaxshi', tired: 'Charchadim' }[s.mood]]);
  const csv = '\uFEFF' + [columns, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8;' }));
  const link = document.createElement('a'); link.href = url; link.download = `quvnoq-bolajon-${dateKey()}.csv`; link.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
}
