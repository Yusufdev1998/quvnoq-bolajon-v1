import type { Step } from './data';

export const BUNNY_STATE_MACHINE = 'BunnyMotion';
export const BUNNY_ASSET = '/animations/quvnoq-bunny.riv';
export type BunnyAction = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7;

// Public contract with animations/quvnoq-bunny: BunnyControls.action.
export function bunnyAction(pose: Step['pose']): BunnyAction {
  if (pose === 'jump') return 1;
  if (pose === 'reach') return 2;
  if (pose === 'wave') return 3;
  if (pose === 'step') return 4;
  if (pose === 'dance') return 5;
  if (pose === 'celebrate') return 6;
  if (pose === 'wings') return 7;
  return 0;
}
