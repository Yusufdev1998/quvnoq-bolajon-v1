export function advanceSceneClock(elapsed: number, duration: number, running: boolean): number {
  return running ? Math.min(duration, elapsed + 1) : elapsed;
}

export function canAdvanceStory(elapsed: number, duration: number, auto: boolean, running: boolean, challenge: boolean, collected: number): boolean {
  return auto && running && elapsed >= duration && (!challenge || collected >= 3);
}
