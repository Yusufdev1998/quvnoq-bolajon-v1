export type AnimationPlayback = {
  active: boolean;
  paused: boolean;
  exiting: boolean;
  reducedMotion: boolean;
  isRive: boolean;
  characterMoving: boolean;
  stopCue: boolean;
};

export function animationIsRunning(state: AnimationPlayback): boolean {
  if (!state.active || state.paused || state.exiting || state.reducedMotion || state.stopCue) return false;
  return state.isRive ? state.characterMoving : true;
}
