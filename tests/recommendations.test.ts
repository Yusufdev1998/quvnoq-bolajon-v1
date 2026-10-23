import test from 'node:test';
import assert from 'node:assert/strict';
import { physicalTests, testById, trend } from '../src/assessments.ts';
import type { Assessment } from '../src/assessments.ts';
import { recommendations } from '../src/recommendations.ts';
import type { Session } from '../src/progress.ts';

const now = new Date('2026-10-23T12:00:00Z');
const daysAgo = (n: number) => new Date(now.getTime() - n * 86_400_000).toISOString();
const session = (n: number, kind: Session['kind'], mood: Session['mood'] = 'happy'): Session => ({ id: `${kind}-${n}-${mood}`, childId: 'c', activityId: kind === 'gym' ? 'gym-1' : 'pass', title: 't', kind, ...(kind === 'gym' ? { day: 1 } : {}), seconds: 60, mood, at: daysAgo(n) });
const measure = (testId: Assessment['testId'], value: number, n: number): Assessment => ({ id: `${testId}-${n}`, childId: 'c', testId, value, at: daysAgo(n) });
const ids = (s: Session[], a: Assessment[] = [], role: 'parent' | 'teacher' = 'parent') => recommendations(s, a, 'c', role, now).map(r => r.id);

test('trends respect whether a higher or lower result is better', () => {
  const run = testById('run10');
  assert.equal(trend([measure('run10', 4.2, 9), measure('run10', 3.8, 1)], run), 'improved');
  assert.equal(trend([measure('longJump', 90, 9), measure('longJump', 80, 1)], testById('longJump')), 'declined');
  assert.equal(trend([measure('longJump', 90, 9), measure('longJump', 91, 1)], testById('longJump')), 'same');
  assert.equal(trend([measure('balance', 5, 1)], testById('balance')), 'first');
  assert.equal(physicalTests.length, 6);
});

test('a new child is guided to start and to take a baseline measurement', () => {
  assert.deepEqual(ids([]).slice(0, 2), ['start', 'baseline']);
});

test('recommendations react to gaps, tiredness and measured results', () => {
  const sessions = [session(1, 'gym', 'tired'), session(2, 'gym', 'tired'), session(3, 'gym')];
  const result = ids(sessions, [measure('balance', 12, 40), measure('balance', 7, 35)]);
  assert.equal(result[0], 'tired');
  assert.ok(result.includes('remeasure'));
  assert.ok(result.includes('section-motor') || result.includes('section-game'));
  assert.ok(result.length <= 5);
  const balance = recommendations(sessions, [measure('balance', 12, 10), measure('balance', 7, 5)], 'c', 'parent', now).find(r => r.id === 'test-balance');
  assert.equal(balance?.action?.activityId, 'circle');
});

test('regular, happy practice is praised and teacher wording differs', () => {
  const regular = [0, 1, 2, 3, 4].flatMap(n => [session(n, 'gym'), session(n, 'game'), session(n, 'motor')]);
  assert.ok(ids(regular, [measure('longJump', 80, 9)]).includes('regular'));
  const tired = [session(1, 'gym', 'tired'), session(2, 'game', 'tired')];
  const [parent] = recommendations(tired, [], 'c', 'parent', now), [teacher] = recommendations(tired, [], 'c', 'teacher', now);
  assert.equal(parent.id, 'tired');
  assert.notEqual(parent.text, teacher.text);
});
