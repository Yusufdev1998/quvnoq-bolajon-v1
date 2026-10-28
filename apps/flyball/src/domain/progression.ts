import type { BlockId, Session } from './types.ts';

/** A block counts as mastered after enough sessions with consistently good technique. */
export const MASTERY = { minSessions: 6, window: 3, techniqueAvg: 4 };

export type BlockState = 'locked' | 'active' | 'mastered';

export interface BlockProgress {
  block: BlockId;
  state: BlockState;
  sessions: number;
  /** Average technique of the last `MASTERY.window` sessions in the block. */
  recentTechnique: number | null;
}

const BLOCK_IDS: BlockId[] = [1, 2, 3, 4];

export function isMastered(blockSessions: Session[]): boolean {
  if (blockSessions.length < MASTERY.minSessions) return false;
  const avg = recentTechnique(blockSessions);
  return avg != null && avg >= MASTERY.techniqueAvg;
}

function recentTechnique(blockSessions: Session[]): number | null {
  const recent = [...blockSessions].sort((a, b) => a.date.localeCompare(b.date)).slice(-MASTERY.window);
  if (recent.length === 0) return null;
  return Math.round((recent.reduce((s, x) => s + x.technique, 0) / recent.length) * 10) / 10;
}

export function blockProgress(sessions: Session[], athleteId: string): BlockProgress[] {
  const own = sessions.filter((s) => s.athleteId === athleteId && s.kind === 'plyo');
  let unlocked = true;
  return BLOCK_IDS.map((block) => {
    const inBlock = own.filter((s) => s.block === block);
    const mastered = unlocked && isMastered(inBlock);
    const state: BlockState = !unlocked ? 'locked' : mastered ? 'mastered' : 'active';
    unlocked = mastered;
    return { block, state, sessions: inBlock.length, recentTechnique: recentTechnique(inBlock) };
  });
}

/** The block the athlete is working in now: the first one not yet mastered. */
export function currentBlock(progress: BlockProgress[]): BlockId {
  return progress.find((p) => p.state === 'active')?.block ?? 4;
}
