import type { AppState, Athlete, MetricEntry, Role, Session } from '../domain/types.ts';

export type Action =
  | { type: 'setRole'; role: Role }
  | { type: 'saveAthlete'; athlete: Athlete }
  | { type: 'removeAthlete'; id: string }
  | { type: 'selectAthlete'; id: string }
  | { type: 'addMetrics'; entry: MetricEntry }
  | { type: 'removeMetrics'; id: string }
  | { type: 'addSession'; session: Session }
  | { type: 'removeSession'; id: string }
  | { type: 'reset' };

export const initialState: AppState = { version: 1, role: null, athletes: [], activeAthleteId: null, metrics: [], sessions: [] };

export function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case 'setRole':
      return { ...state, role: action.role };
    case 'saveAthlete': {
      const exists = state.athletes.some((a) => a.id === action.athlete.id);
      const athletes = exists ? state.athletes.map((a) => (a.id === action.athlete.id ? action.athlete : a)) : [...state.athletes, action.athlete];
      return { ...state, athletes, activeAthleteId: exists ? state.activeAthleteId : action.athlete.id };
    }
    case 'removeAthlete': {
      const athletes = state.athletes.filter((a) => a.id !== action.id);
      return {
        ...state,
        athletes,
        activeAthleteId: state.activeAthleteId === action.id ? (athletes[0]?.id ?? null) : state.activeAthleteId,
        metrics: state.metrics.filter((m) => m.athleteId !== action.id),
        sessions: state.sessions.filter((s) => s.athleteId !== action.id),
      };
    }
    case 'selectAthlete':
      return state.athletes.some((a) => a.id === action.id) ? { ...state, activeAthleteId: action.id } : state;
    case 'addMetrics':
      return { ...state, metrics: [...state.metrics, action.entry] };
    case 'removeMetrics':
      return { ...state, metrics: state.metrics.filter((m) => m.id !== action.id) };
    case 'addSession':
      return { ...state, sessions: [...state.sessions, action.session] };
    case 'removeSession':
      return { ...state, sessions: state.sessions.filter((s) => s.id !== action.id) };
    case 'reset':
      return initialState;
  }
}
