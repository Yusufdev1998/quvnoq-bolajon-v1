export type Role = 'coach' | 'athlete';

export type Position = 'hujumchi' | 'diagonal' | 'markaziy' | 'boglovchi' | 'libero';

export interface Athlete {
  id: string;
  name: string;
  birthYear: number;
  position: Position;
  createdAt: string;
}

export type MetricKey =
  | 'height'
  | 'weight'
  | 'standingReach'
  | 'restingHr'
  | 'rufier'
  | 'verticalJump'
  | 'attackReach'
  | 'longJump'
  | 'shuttleRun';

export type MetricValues = Partial<Record<MetricKey, number>>;

export interface MetricEntry {
  id: string;
  athleteId: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  values: MetricValues;
}

export type BlockId = 1 | 2 | 3 | 4;
export type Intensity = 'past' | 'orta' | 'yuqori';
export type Motion = 'vertical' | 'forward' | 'lateral' | 'depth' | 'box' | 'single' | 'rotate' | 'throw' | 'approach' | 'block';

/** Anything the load engine can dose: a plyometric exercise or a game drill. */
export interface Dosable {
  id: string;
  intensity: Intensity;
  baseSets: number;
  baseReps: number;
  restSec: number;
  /** Foot contacts per repetition, the standard unit of plyometric volume. */
  contactsPerRep: number;
}

export interface Exercise extends Dosable {
  block: BlockId;
  name: string;
  summary: string;
  steps: string[];
  cues: string[];
  equipment: string[];
  motion: Motion;
  /** Reps are counted for each leg separately. */
  perLeg?: boolean;
}

export type GameElement = 'sakrash' | 'hujum' | 'blok';

export interface GameDrill extends Dosable {
  element: GameElement;
  name: string;
  summary: string;
  plyo: string;
  volleyball: string;
  steps: string[];
  cues: string[];
  minBlock: BlockId;
  motion: Motion;
}

export interface SessionItem {
  refId: string;
  kind: 'exercise' | 'drill';
  sets: number;
  reps: number;
  contacts: number;
}

export interface Session {
  id: string;
  athleteId: string;
  date: string;
  kind: 'plyo' | 'game';
  /** Method block for plyometric sessions, null for game sessions. */
  block: BlockId | null;
  items: SessionItem[];
  durationMin: number;
  /** Session RPE on the CR-10 scale. */
  rpe: number;
  /** Technique quality, 1–5, rated by the coach or the athlete. */
  technique: number;
  note?: string;
}

export interface AppState {
  version: 1;
  role: Role | null;
  athletes: Athlete[];
  activeAthleteId: string | null;
  metrics: MetricEntry[];
  sessions: Session[];
}
