import { useMemo, useSyncExternalStore } from 'react';
import { acwr, coachAdvice } from '../domain/analytics.ts';
import { exercisesOfBlock } from '../domain/catalog.ts';
import { buildLoadProfile, planWorkout } from '../domain/load.ts';
import { latestValues } from '../domain/metrics.ts';
import { blockProgress, currentBlock } from '../domain/progression.ts';
import type { AppState } from '../domain/types.ts';
import { initialState, reducer, type Action } from './reducer.ts';

const KEY = 'flyball:v1';
const listeners = new Set<() => void>();

function load(): AppState {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return initialState;
    const parsed = JSON.parse(raw) as AppState;
    return parsed?.version === 1 ? { ...initialState, ...parsed } : initialState;
  } catch {
    return initialState;
  }
}

let state = load();

export function dispatch(action: Action) {
  state = reducer(state, action);
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // Storage can be unavailable (private mode); the app keeps working in memory.
  }
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export const getState = () => state;
export const useAppState = () => useSyncExternalStore(subscribe, getState);

export const newId = () => (crypto.randomUUID ? crypto.randomUUID() : `${Date.now().toString(36)}-${Math.random().toString(36).slice(2)}`);

/** Everything the screens need about the selected athlete, derived once per state change. */
export function deriveAthlete(s: AppState, now: Date) {
  const athlete = s.athletes.find((a) => a.id === s.activeAthleteId) ?? s.athletes[0];
  if (!athlete) return null;
  const { values, dates } = latestValues(s.metrics, athlete.id);
  const profile = buildLoadProfile(athlete, values, now);
  const progress = blockProgress(s.sessions, athlete.id);
  const block = currentBlock(progress);
  const sessions = s.sessions.filter((x) => x.athleteId === athlete.id).sort((a, b) => b.date.localeCompare(a.date));
  const entries = s.metrics.filter((m) => m.athleteId === athlete.id).sort((a, b) => b.date.localeCompare(a.date));
  const blockSessions = progress[block - 1].sessions;
  return {
    athlete,
    values,
    dates,
    profile,
    progress,
    block,
    sessions,
    entries,
    todayPlan: planWorkout(exercisesOfBlock(block), profile, blockSessions),
    load: acwr(s.sessions, athlete.id, now),
    advice: coachAdvice({ sessions: s.sessions, entries: s.metrics, athleteId: athlete.id, progress, now }),
  };
}

export type AthleteContext = NonNullable<ReturnType<typeof deriveAthlete>>;

export function useAthlete(): AthleteContext | null {
  const s = useAppState();
  return useMemo(() => deriveAthlete(s, new Date()), [s]);
}
