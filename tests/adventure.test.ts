import test from 'node:test';
import assert from 'node:assert/strict';
import { advanceSceneClock, canAdvanceStory } from '../src/adventure.ts';

test('scene timing stops during a pause and clamps at the scene duration', () => {
  assert.equal(advanceSceneClock(4, 8, false), 4);
  assert.equal(advanceSceneClock(4, 8, true), 5);
  assert.equal(advanceSceneClock(8, 8, true), 8);
});

test('automatic scenes wait for their duration and challenge completion', () => {
  assert.equal(canAdvanceStory(7, 8, true, true, false, 0), false);
  assert.equal(canAdvanceStory(8, 8, true, true, false, 0), true);
  assert.equal(canAdvanceStory(12, 12, true, true, true, 2), false);
  assert.equal(canAdvanceStory(12, 12, true, true, true, 3), true);
  assert.equal(canAdvanceStory(12, 12, false, true, true, 3), false);
  assert.equal(canAdvanceStory(12, 12, true, false, true, 3), false);
});
