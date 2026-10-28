import assert from 'node:assert/strict';
import { test } from 'node:test';
import { parseHash, href } from '../src/app/router.ts';
import { reducer, initialState } from '../src/core/reducer.ts';
import { acwr, coachAdvice, trend, weeklyBuckets } from '../src/domain/analytics.ts';
import { BLOCKS, EXERCISES, GAME_DRILLS, exercisesOfBlock } from '../src/domain/catalog.ts';
import { metricsCsv } from '../src/domain/csv.ts';
import { buildLoadProfile, planWorkout, prescribe } from '../src/domain/load.ts';
import { latestValues, rateVerticalJump } from '../src/domain/metrics.ts';
import { blockProgress, currentBlock, MASTERY } from '../src/domain/progression.ts';
import type { Athlete, BlockId, Session } from '../src/domain/types.ts';

const now = new Date(2026, 9, 28);
const athlete: Athlete = { id: 'a', name: 'Madina', birthYear: 2012, position: 'hujumchi', createdAt: '2026-01-01' };

const session = (date: string, block: BlockId | null, technique = 4, rpe = 6, durationMin = 40): Session => ({
  id: `${date}-${block}-${Math.random()}`,
  athleteId: 'a',
  date,
  kind: block ? 'plyo' : 'game',
  block,
  items: [{ refId: 'ankle-hops', kind: 'exercise', sets: 3, reps: 10, contacts: 30 }],
  durationMin,
  rpe,
  technique,
});

test('catalog: four method blocks with five exercises each and unique ids', () => {
  assert.equal(BLOCKS.length, 4);
  for (const b of BLOCKS) assert.equal(exercisesOfBlock(b.id).length, 5);
  const ids = [...EXERCISES, ...GAME_DRILLS].map((x) => x.id);
  assert.equal(new Set(ids).size, ids.length);
  for (const el of ['sakrash', 'hujum', 'blok']) assert.ok(GAME_DRILLS.some((d) => d.element === el && d.minBlock === 1), `${el} has a block-1 drill`);
});

test('load: missing tests give the beginner level', () => {
  const p = buildLoadProfile(athlete, {}, now);
  assert.equal(p.level, 1);
  assert.equal(p.contactsBudget, 80);
});

test('load: a strong jump raises the level, poor recovery lowers it and lengthens rest', () => {
  const strong = buildLoadProfile(athlete, { verticalJump: 45 }, now);
  assert.equal(strong.level, 3);
  const tired = buildLoadProfile(athlete, { verticalJump: 45, rufier: 12 }, now);
  assert.equal(tired.level, 2);
  assert.equal(tired.restFactor, 1.5);
  assert.ok(tired.notes.some((n) => n.tone === 'warn'));
});

test('load: high BMI cuts volume and box height', () => {
  const p = buildLoadProfile(athlete, { verticalJump: 35, height: 160, weight: 70 }, now);
  assert.equal(p.level, 2);
  assert.equal(p.contactsBudget, Math.round(110 * 0.85));
  assert.equal(p.maxBoxCm, 30);
});

test('load: under-13 athletes are capped', () => {
  const young = { ...athlete, birthYear: 2015 };
  const p = buildLoadProfile(young, { verticalJump: 60 }, now);
  assert.ok(p.contactsBudget <= 90);
  assert.ok(p.maxBoxCm <= 30);
});

test('load: workout plans stay inside the contact budget and start with the easiest', () => {
  for (const level of [{}, { verticalJump: 35 }, { verticalJump: 50 }]) {
    const profile = buildLoadProfile(athlete, level, now);
    for (const b of BLOCKS) {
      for (let r = 0; r < 5; r++) {
        const plan = planWorkout(exercisesOfBlock(b.id), profile, r);
        assert.ok(plan.length >= 2, `block ${b.id} rotation ${r} has a plan`);
        assert.ok(plan.reduce((s, p) => s + p.contacts, 0) <= profile.contactsBudget);
      }
    }
  }
  const hi = EXERCISES.find((e) => e.intensity === 'yuqori')!;
  assert.equal(prescribe(hi, buildLoadProfile(athlete, {}, now)).sets, hi.baseSets - 1);
});

test('progression: blocks unlock only after enough sessions with good technique', () => {
  const sessions = Array.from({ length: MASTERY.minSessions }, (_, i) => session(`2026-10-${String(i + 1).padStart(2, '0')}`, 1, 5));
  let p = blockProgress(sessions, 'a');
  assert.deepEqual(p.map((x) => x.state), ['mastered', 'active', 'locked', 'locked']);
  assert.equal(currentBlock(p), 2);

  const weak = sessions.map((s, i) => (i >= MASTERY.minSessions - 3 ? { ...s, technique: 3 } : s));
  p = blockProgress(weak, 'a');
  assert.equal(p[0].state, 'active');
  assert.equal(currentBlock(p), 1);
});

test('progression: sessions in a locked block do not unlock later blocks', () => {
  const sessions = Array.from({ length: 6 }, (_, i) => session(`2026-10-0${i + 1}`, 2, 5));
  const p = blockProgress(sessions, 'a');
  assert.equal(p[1].state, 'locked');
});

test('analytics: ACWR zones', () => {
  assert.equal(acwr([], 'a', now).zone, 'nomalum');
  const steady = ['2026-10-02', '2026-10-09', '2026-10-16', '2026-10-23'].map((d) => session(d, 1));
  assert.equal(acwr(steady, 'a', now).zone, 'optimal');
  const spike = [session('2026-10-02', 1), session('2026-10-26', 1, 4, 9, 90), session('2026-10-27', 1, 4, 9, 90)];
  const r = acwr(spike, 'a', now);
  assert.equal(r.zone, 'xavfli');
  assert.ok(coachAdvice({ sessions: spike, entries: [], athleteId: 'a', progress: blockProgress(spike, 'a'), now }).some((a) => a.id === 'acwr-high'));
});

test('analytics: weekly buckets and trends', () => {
  const weeks = weeklyBuckets([session('2026-10-27', 1), session('2026-10-20', 1)], 'a', now, 4);
  assert.equal(weeks.length, 4);
  assert.equal(weeks[3].contacts, 30);
  assert.equal(weeks[2].contacts, 30);
  const t = trend([{ date: '2026-09-01', value: 9.1 }, { date: '2026-10-01', value: 8.7 }], 'shuttleRun');
  assert.equal(t?.improving, true);
});

test('metrics: latest values merge partial entries', () => {
  const entries = [
    { id: '1', athleteId: 'a', date: '2026-09-01', values: { height: 165, verticalJump: 30 } },
    { id: '2', athleteId: 'a', date: '2026-10-01', values: { verticalJump: 33 } },
  ];
  const { values, dates } = latestValues(entries, 'a');
  assert.deepEqual(values, { height: 165, verticalJump: 33 });
  assert.equal(dates.height, '2026-09-01');
  assert.equal(rateVerticalJump(33, 14), 'orta');
  assert.ok(metricsCsv({ ...initialState, athletes: [athlete], metrics: entries }).includes('Madina,2026-10-01'));
});

test('reducer: removing an athlete removes their data and fixes the selection', () => {
  const b: Athlete = { ...athlete, id: 'b', name: 'Laylo' };
  let s = reducer(initialState, { type: 'saveAthlete', athlete });
  s = reducer(s, { type: 'saveAthlete', athlete: b });
  assert.equal(s.activeAthleteId, 'b');
  s = reducer(s, { type: 'addSession', session: { ...session('2026-10-01', 1), athleteId: 'b' } });
  s = reducer(s, { type: 'removeAthlete', id: 'b' });
  assert.equal(s.activeAthleteId, 'a');
  assert.equal(s.sessions.length, 0);
});

test('router: hashes round-trip', () => {
  for (const r of [{ name: 'home' }, { name: 'exercise', id: 'box-jump' }, { name: 'run-plyo', block: 3 }, { name: 'run-game', element: 'blok' }, { name: 'monitoring' }] as const) {
    assert.deepEqual(parseHash(href(r)), r);
  }
  assert.deepEqual(parseHash('#/nomalum'), { name: 'home' });
});
