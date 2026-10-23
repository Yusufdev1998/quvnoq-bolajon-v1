import type { Activity, ActivityKind, Mood } from './data';
import { isValidAssessment, testById } from './assessments.ts';
import type { Assessment, TestId } from './assessments.ts';

export type Session = { id: string; childId: string; activityId: string; title: string; kind: ActivityKind; day?: number; seconds: number; mood: Mood; at: string };
export type Role = 'parent' | 'teacher';
export type Child = { id: string; name: string; age: number };
// What one child's screens need: the active child, the adult's role and that child's sessions.
export type Profile = { name: string; age: number; role: Role };
export type ChildView = { profile: Profile; sessions: Session[]; reducedMotion: boolean };
// Version 2 keeps several children (a teacher's group or siblings) and measured test results.
export type Progress = { version: 2; role: Role; children: Child[]; activeChildId: string; sessions: Session[]; assessments: Assessment[]; reducedMotion: boolean };
export const STORAGE_KEY = 'quvnoq-bolajon-v1';
export const initialProgress: Progress = { version: 2, role: 'parent', children: [{ id: 'child-1', name: 'Bolajon', age: 5 }], activeChildId: 'child-1', sessions: [], assessments: [], reducedMotion: false };

export const newId = () => globalThis.crypto?.randomUUID?.() ?? `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 13)}`;
export const activeChild = (p: Progress) => p.children.find(c => c.id === p.activeChildId) ?? p.children[0];
export function childView(p: Progress): ChildView {
  const child = activeChild(p);
  return { profile: { name: child.name, age: child.age, role: p.role }, sessions: p.sessions.filter(s => s.childId === child.id), reducedMotion: p.reducedMotion };
}

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

const cleanName = (name: unknown) => typeof name === 'string' && name.trim() ? name.trim().slice(0, 30) : 'Bolajon';
const cleanAge = (age: unknown) => typeof age === 'number' && age >= 3 && age <= 7 ? age : 5;
const isSession = (s: Session) => !!s && typeof s.id === 'string' && typeof s.title === 'string' && typeof s.activityId === 'string' && ['gym', 'game', 'motor'].includes(s.kind) && ['happy', 'okay', 'tired'].includes(s.mood) && Number.isFinite(s.seconds) && s.seconds >= 0 && !Number.isNaN(Date.parse(s.at)) && (s.day === undefined || (Number.isInteger(s.day) && s.day >= 1 && s.day <= 30));

// Accepts saved data from either version: a version 1 single profile becomes the first child.
export function normalizeProgress(value: unknown): Progress {
  if (!value || typeof value !== 'object') return structuredClone(initialProgress);
  const raw = value as Record<string, unknown>;
  if (raw.version === 1) {
    const profile = (raw.profile ?? {}) as Partial<Profile>;
    const sessions = Array.isArray(raw.sessions) ? raw.sessions.map(s => s && typeof s === 'object' ? { ...s, childId: 'child-1' } : s) : [];
    return normalizeProgress({ version: 2, role: profile.role, children: [{ id: 'child-1', name: profile.name, age: profile.age }], activeChildId: 'child-1', sessions, assessments: [], reducedMotion: raw.reducedMotion });
  }
  if (raw.version !== 2) return structuredClone(initialProgress);
  const seen = new Set<string>();
  const children = (Array.isArray(raw.children) ? raw.children : []).filter((c): c is Child => !!c && typeof c.id === 'string' && !seen.has(c.id) && !!seen.add(c.id))
    .slice(0, 40).map(c => ({ id: c.id, name: cleanName(c.name), age: cleanAge(c.age) }));
  if (!children.length) children.push({ ...initialProgress.children[0] });
  const ids = new Set(children.map(c => c.id));
  return {
    version: 2, role: raw.role === 'teacher' ? 'teacher' : 'parent', children,
    activeChildId: typeof raw.activeChildId === 'string' && ids.has(raw.activeChildId) ? raw.activeChildId : children[0].id,
    sessions: (Array.isArray(raw.sessions) ? raw.sessions : []).filter((s): s is Session => isSession(s) && ids.has(s.childId)),
    assessments: (Array.isArray(raw.assessments) ? raw.assessments : []).filter((a): a is Assessment => isValidAssessment(a) && ids.has(a.childId)),
    reducedMotion: raw.reducedMotion === true,
  };
}

export function addChild(p: Progress, name: string, age: number): Progress {
  const child = { id: newId(), name: cleanName(name), age: cleanAge(age) };
  return { ...p, children: [...p.children, child], activeChildId: child.id };
}
export function removeChild(p: Progress, id: string): Progress {
  if (p.children.length < 2) return p;
  const children = p.children.filter(c => c.id !== id);
  return { ...p, children, activeChildId: p.activeChildId === id ? children[0].id : p.activeChildId, sessions: p.sessions.filter(s => s.childId !== id), assessments: p.assessments.filter(a => a.childId !== id) };
}
export function addAssessment(p: Progress, testId: TestId, value: number, at = new Date().toISOString()): Progress {
  const assessment: Assessment = { id: newId(), childId: activeChild(p).id, testId, value, at };
  return isValidAssessment(assessment) ? { ...p, assessments: [...p.assessments, assessment] } : p;
}
// Records a finished activity for the active child; gymnastics unlocking uses only that child's days.
export function addSession(p: Progress, activity: Activity, seconds: number, mood: Mood, at?: string): Progress {
  const child = activeChild(p).id;
  const own = p.sessions.filter(s => s.childId === child);
  const updated = recordSession(own, activity, seconds, mood, at, child);
  return updated === own ? p : { ...p, sessions: [updated[0], ...p.sessions] };
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

export function recordSession(sessions: Session[], activity: Activity, seconds: number, mood: Mood, at = new Date().toISOString(), childId = 'child-1'): Session[] {
  if (activity.kind === 'gym' && !isDayUnlocked(activity.day ?? 0, sessions)) return sessions;
  // newId falls back when a phone opens the LAN preview over HTTP without randomUUID.
  const session: Session = { id: newId(), childId, activityId: activity.id, title: activity.title, kind: activity.kind, ...(activity.day ? { day: activity.day } : {}), seconds: Math.max(0, Math.floor(seconds)), mood, at };
  return [session, ...sessions];
}

export function formatDuration(seconds: number): string {
  if (seconds < 60) return `${seconds} soniya`;
  return `${Math.floor(seconds / 60)} daq${seconds % 60 ? ` ${seconds % 60} son` : ''}`;
}

// One CSV with every child's sessions and measured test results, for the teacher or parent.
export function reportCsv(progress: Progress): string {
  const names = new Map(progress.children.map(c => [c.id, c.name]));
  const when = (at: string) => `${dateKey(new Date(at))} ${localTime(new Date(at))}`;
  const columns = ['Sana', 'Bola', 'Turi', 'Bo‘lim yoki sifat', 'Nomi', 'Kun', 'Natija', 'Birlik', 'Kayfiyat'];
  const rows = [
    ...progress.sessions.map(s => ({ at: s.at, row: [when(s.at), names.get(s.childId) ?? '', 'Mashg‘ulot', s.kind === 'gym' ? 'Gimnastika' : s.kind === 'game' ? 'O‘yin' : 'Mayda motorika', s.title, s.day ?? '', s.seconds, 'soniya', { happy: 'Xursand', okay: 'Yaxshi', tired: 'Charchadim' }[s.mood]] })),
    ...progress.assessments.map(a => { const t = testById(a.testId); return { at: a.at, row: [when(a.at), names.get(a.childId) ?? '', 'Jismoniy test', t.quality, t.title, '', a.value, t.unit, ''] }; }),
  ].sort((a, b) => b.at.localeCompare(a.at)).map(r => r.row);
  return '\uFEFF' + [columns, ...rows].map(row => row.map(csvCell).join(',')).join('\r\n');
}
