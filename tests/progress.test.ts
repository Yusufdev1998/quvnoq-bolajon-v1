import test from 'node:test';
import assert from 'node:assert/strict';
import { gymDays, games } from '../src/data.ts';
import { completedDays, csvCell, dateKey, initialProgress, isDayUnlocked, nextDay, normalizeProgress, recordSession, uzDate, uzWeekday } from '../src/progress.ts';

test('gymnastics days unlock sequentially and cannot be skipped', () => {
  assert.equal(nextDay([]), 1);
  assert.equal(isDayUnlocked(1, []), true);
  assert.equal(isDayUnlocked(2, []), false);
  assert.deepEqual(recordSession([], gymDays[1], 20, 'happy'), []);
  const sessions = recordSession([], gymDays[0], 30, 'happy');
  assert.equal(isDayUnlocked(2, sessions), true);
  assert.equal(isDayUnlocked(3, sessions), false);
  assert.equal(nextDay(sessions), 2);
});

test('replaying a day records activity without inflating completed days', () => {
  let sessions = recordSession([], gymDays[0], 30, 'happy');
  sessions = recordSession(sessions, gymDays[0], 10, 'okay');
  assert.equal(sessions.length, 2);
  assert.deepEqual(completedDays(sessions), [1]);
  assert.equal(nextDay(sessions), 2);
});

test('game completion does not unlock gymnastics days', () => {
  const sessions = recordSession([], games[0], 15, 'happy');
  assert.equal(sessions.length, 1);
  assert.equal(nextDay(sessions), 1);
  assert.equal(isDayUnlocked(2, sessions), false);
});

test('all 30 days complete without producing a day 31', () => {
  let sessions = [] as ReturnType<typeof recordSession>;
  for (const day of gymDays) sessions = recordSession(sessions, day, 60, 'happy');
  assert.equal(completedDays(sessions).length, 30);
  assert.equal(nextDay(sessions), 30);
  assert.equal(isDayUnlocked(31, sessions), false);
  assert.equal(isDayUnlocked(0, sessions), false);
  assert.equal(isDayUnlocked(1.5, sessions), false);
});

test('progress validation rejects corrupt saved data', () => {
  assert.deepEqual(normalizeProgress(null), initialProgress);
  assert.deepEqual(normalizeProgress({ version: 7 }), initialProgress);
  const valid = recordSession([], gymDays[0], 12, 'happy')[0];
  const loaded = normalizeProgress({ version: 1, profile: { name: '', age: 100 }, sessions: [valid, { ...valid, seconds: -1 }, { ...valid, at: 'bad date' }, null] });
  assert.equal(loaded.sessions.length, 1);
  assert.equal(loaded.profile.name, 'Bolajon');
  assert.equal(loaded.profile.age, 5);
});

test('local dates use Tashkent time across UTC midnight', () => {
  assert.equal(dateKey(new Date('2026-10-23T20:00:00Z')), '2026-10-24');
  assert.equal(dateKey(new Date('2026-10-23T18:59:59Z')), '2026-10-23');
});

test('Uzbek labels work even if the browser lacks Uzbek locale data', () => {
  assert.equal(uzDate(new Date('2026-10-23T12:00:00Z')), '23-oktabr');
  assert.equal(uzWeekday(new Date('2026-10-23T12:00:00Z')), 'Juma');
});

test('CSV export escapes quotes and neutralizes formula-like profile names', () => {
  assert.equal(csvCell('Ali "kichik"'), '"Ali ""kichik"""');
  assert.equal(csvCell('=1+1'), '"\'=1+1"');
  assert.equal(csvCell('  @SUM(1)'), '"\'  @SUM(1)"');
  assert.equal(csvCell(30), '"30"');
});
