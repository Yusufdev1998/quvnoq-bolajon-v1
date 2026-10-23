import test from 'node:test';
import assert from 'node:assert/strict';
import { animationIsRunning } from '../src/animationPlayback.ts';
import type { AnimationPlayback } from '../src/animationPlayback.ts';

const moving: AnimationPlayback = { active: true, paused: false, exiting: false, reducedMotion: false, isRive: false, characterMoving: false, stopCue: false };

test('music is allowed with a running SVG or loaded, moving Rive character', () => {
  assert.equal(animationIsRunning(moving), true);
  assert.equal(animationIsRunning({ ...moving, isRive: true, characterMoving: true }), true);
});

test('instructions, completion, pauses, exits and static poses must stay silent', () => {
  for (const state of [
    { active: false }, { paused: true }, { exiting: true },
    { reducedMotion: true }, { stopCue: true },
    { isRive: true, characterMoving: false },
  ]) assert.equal(animationIsRunning({ ...moving, ...state }), false);
});
