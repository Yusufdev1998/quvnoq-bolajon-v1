import test from 'node:test';
import assert from 'node:assert/strict';
import { gymDays, games } from '../src/data.ts';
import { addAssessment, addChild, addSession, childView, completedDays, csvCell, dateKey, initialProgress, isDayUnlocked, nextDay, normalizeProgress, recordSession, removeChild, reportCsv, uzDate, uzWeekday } from '../src/progress.ts';

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
  assert.equal(loaded.children[0].name, 'Bolajon');
  assert.equal(loaded.children[0].age, 5);
});

test('saved version 1 data becomes the first child of version 2', () => {
  const old = { version: 1, profile: { name: 'Aziza', age: 4, role: 'teacher' }, reducedMotion: true, sessions: [{ id: 'a', activityId: 'gym-1', title: 'x', kind: 'gym', day: 1, seconds: 30, mood: 'happy', at: '2026-10-01T10:00:00Z' }] };
  const p = normalizeProgress(old);
  assert.equal(p.version, 2);
  assert.equal(p.role, 'teacher');
  assert.equal(p.reducedMotion, true);
  assert.deepEqual(p.children, [{ id: 'child-1', name: 'Aziza', age: 4 }]);
  assert.equal(p.sessions[0].childId, 'child-1');
  assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify(p))), p);
});

test('each child keeps separate gymnastics progress and results', () => {
  let p = addSession(initialProgress, gymDays[0], 40, 'happy');
  p = addChild(p, 'Ali', 6);
  assert.equal(childView(p).profile.name, 'Ali');
  assert.equal(childView(p).sessions.length, 0);
  assert.equal(addSession(p, gymDays[1], 40, 'happy'), p);
  p = addAssessment(p, 'longJump', 92);
  p = addAssessment(p, 'longJump', 999);
  assert.equal(p.assessments.length, 1);
  const first = p.children[0].id;
  assert.equal(nextDay(childView({ ...p, activeChildId: first }).sessions), 2);
  const removed = removeChild(p, p.activeChildId);
  assert.equal(removed.children.length, 1);
  assert.equal(removed.assessments.length, 0);
  assert.equal(removed.sessions.length, 1);
  assert.equal(removeChild(removed, first), removed);
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

test('the CSV report lists every child’s sessions and test results', () => {
  let p = addSession(initialProgress, gymDays[0], 40, 'happy', '2026-10-20T08:00:00Z');
  p = addChild(p, 'Ali', 6);
  p = addAssessment(p, 'run10', 4.2, '2026-10-21T08:00:00Z');
  const lines = reportCsv(p).split('\r\n');
  assert.equal(lines.length, 3);
  assert.ok(lines[1].includes('"Ali"') && lines[1].includes('"Jismoniy test"') && lines[1].includes('"4.2"'));
  assert.ok(lines[2].includes('"Bolajon"') && lines[2].includes('"Gimnastika"'));
});
