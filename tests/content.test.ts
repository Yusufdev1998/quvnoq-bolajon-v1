import test from 'node:test';
import assert from 'node:assert/strict';
import { commandSignal, games, gymDays, motorActivities } from '../src/data.ts';

test('every gymnastics day runs warm-up, main movement, then a stretch', () => {
  for (const day of gymDays) {
    assert.equal(day.steps.at(-1)!.pose, 'cooldown');
    assert.ok(day.steps[0].title.startsWith('Tanani qizdiramiz'));
    assert.ok(day.steps.length >= 3);
  }
});

test('the 30 days widen the range of movement step by step', () => {
  const poses = (from: number, to: number) => new Set(gymDays.slice(from, to).flatMap(d => d.steps.map(s => s.pose)));
  const total = (i: number) => gymDays[i].steps.reduce((n, s) => n + (s.seconds ?? 0), 0);
  assert.ok(!poses(0, 10).has('jump') && !poses(0, 10).has('run') && !poses(0, 10).has('balance'));
  assert.ok(poses(10, 20).has('balance'));
  assert.ok(poses(20, 30).has('jump') && poses(20, 30).has('run'));
  assert.ok(total(0) < total(10) && total(10) < total(20));
});

test('commands map to colored cards', () => {
  const step = (cue: string, pose: Parameters<typeof commandSignal>[0]['pose']) => commandSignal({ title: '', instruction: '', cue, pose });
  assert.equal(step('To‘xta', 'still'), 'stop');
  assert.equal(step('Kut', 'still'), 'ready');
  assert.equal(step('Ushlab tur', 'cooldown'), 'rest');
  assert.equal(step('Dam ol', 'wave'), 'rest');
  assert.equal(step('Yugur', 'run'), 'go');
  const signals = new Set([...games, ...gymDays, ...motorActivities].flatMap(a => a.steps.map(commandSignal)));
  assert.deepEqual([...signals].sort(), ['go', 'ready', 'rest', 'stop']);
});

test('fine motor exercises each show their own hand movement', () => {
  const main = Object.fromEntries(motorActivities.map(a => [a.id, a.steps[1].pose]));
  assert.deepEqual(main, { hello: 'fingers', fist: 'hands', squeeze: 'ball', ring: 'ring', clips: 'pinch', seeds: 'pinch', rope: 'roll', clay: 'roll' });
});

test('games follow the described content', () => {
  const poses = (id: string) => games.find(g => g.id === id)!.steps.map(s => s.pose);
  assert.ok(poses('relay').includes('run'));
  assert.deepEqual(poses('stations'), ['reach', 'jump', 'cooldown', 'balance']);
  assert.ok(poses('circle').includes('cooldown') && poses('circle').includes('reach'));
  assert.ok(poses('rabbit').includes('balance'));
});
