import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { BUNNY_ASSET, BUNNY_STATE_MACHINE, bunnyAction } from '../src/riveMotion.ts';
import { games } from '../src/data.ts';

test('the garden story uses its eight authored Rive movements and includes a silent rest', () => {
  const rabbit = games.find(a => a.id === 'rabbit')!;
  assert.deepEqual(rabbit.steps.map(s => bunnyAction(s.pose)), [3, 2, 1, 0, 7, 1, 5, 6]);
  assert.equal(rabbit.steps.reduce((total, step) => total + (step.seconds ?? 0), 0), 90);
  assert.equal(rabbit.steps.filter(step => step.challenge).length, 1);
  assert.equal(rabbit.steps.find(step => step.cue === 'To‘xta')?.seconds, 6);
});

test('the shipped Rive asset and its state-machine contract exist', () => {
  const bytes = readFileSync(new URL(`../public${BUNNY_ASSET}`, import.meta.url));
  assert.equal(bytes.subarray(0, 4).toString(), 'RIVE');
  assert.ok(bytes.includes(Buffer.from(BUNNY_STATE_MACHINE)));
  assert.ok(bytes.includes(Buffer.from('action')));
  for (const name of ['Wave', 'SideStep', 'Dance', 'Celebrate', 'Wings']) assert.ok(bytes.includes(Buffer.from(name)));
  assert.ok(bytes.length < 20_000);
});
