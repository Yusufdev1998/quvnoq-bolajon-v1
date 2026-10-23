import test from 'node:test';
import assert from 'node:assert/strict';
import { createSecondaryMotion, sampleBunnyMotion, spline, transitionSeconds } from '../src/bunnyMotion3d.ts';
import { games, motorActivities } from '../src/data.ts';
import type { Step } from '../src/data.ts';

const poses: Step['pose'][] = ['reach', 'jump', 'still', 'hands', 'ball', 'wave', 'step', 'march', 'dance', 'celebrate', 'wings'];

test('keyframe splines pass through every key and hold repeated values', () => {
  const keys = [[0, 0], [1, 1], [2, 1], [3, 0]] as const;
  for (const [time, value] of keys) assert.equal(spline(keys, time), value);
  assert.ok(Math.abs(spline(keys, 1.5) - 1) < 1e-9);
  for (let t = 0; t <= 3; t += .01) assert.ok(spline(keys, t) <= 1 + 1e-9);
  assert.equal(spline(keys, -1), 0);
  assert.equal(spline(keys, 9), 0);
});

test('every pose produces finite values for the whole adventure', () => {
  for (const pose of poses) for (let t = 0; t < 90; t += .037) {
    for (const [key, value] of Object.entries(sampleBunnyMotion(pose, t))) assert.ok(Number.isFinite(value), `${pose} ${key} at ${t}`);
  }
});

test('the jump crouches with feet planted, leaves the ground and lands back on it', () => {
  const crouch = sampleBunnyMotion('jump', .6), apex = sampleBunnyMotion('jump', .98), settled = sampleBunnyMotion('jump', 2.3);
  assert.ok(crouch.y < -.1 && crouch.footLY === 0 && crouch.footRY === 0);
  assert.ok(apex.y > .4 && apex.footLY > .25);
  assert.ok(Math.abs(settled.y) < .005 && settled.footLY === 0);
});

test('the dance bounce is lowest on each 124 BPM beat', () => {
  const beat = 60 / 124;
  for (let i = 4; i < 12; i++) {
    const onBeat = sampleBunnyMotion('dance', i * beat + beat * .18).y;
    const offBeat = sampleBunnyMotion('dance', i * beat + beat * .9).y;
    assert.ok(onBeat < offBeat - .02, `beat ${i}`);
  }
});

test('secondary motion settles when still and does not depend on frame rate', () => {
  const run = (fps: number) => {
    const secondary = createSecondaryMotion();
    let pose = sampleBunnyMotion('jump', 0);
    for (let frame = 0; frame <= fps * 1.3; frame++) pose = secondary.apply(sampleBunnyMotion('jump', frame / fps), 1 / fps);
    return pose;
  };
  assert.ok(Math.abs(run(30).earLag - run(120).earLag) < .005);

  const secondary = createSecondaryMotion();
  for (let t = 0; t <= 2.4; t += 1 / 60) secondary.apply(sampleBunnyMotion('jump', t), 1 / 60);
  const still = sampleBunnyMotion('still', 0);
  let settled = still;
  for (let i = 0; i < 400; i++) settled = secondary.apply(still, 1 / 60);
  assert.ok(Math.abs(settled.earLag - still.earLag) < .005);
  assert.ok(Math.abs(settled.headNod - still.headNod) < .005);
});

test('walking in place lifts one foot at a time while the other stays planted', () => {
  for (let t = 0; t < 5; t += .05) {
    const p = sampleBunnyMotion('march', t);
    assert.ok(p.footLY === 0 || p.footRY === 0, `both feet up at ${t}`);
  }
  assert.ok(sampleBunnyMotion('march', .3).footLY > .1 && sampleBunnyMotion('march', .3 + .625).footRY > .1);
});

test('fine motor poses open and close the paws, and only the ball pose shows the ball', () => {
  const grips = Array.from({ length: 60 }, (_, i) => sampleBunnyMotion('hands', 1 + i * .05).gripL);
  assert.ok(Math.min(...grips) < .05 && Math.max(...grips) > .95);
  assert.equal(sampleBunnyMotion('ball', 2).ball, 1);
  assert.equal(sampleBunnyMotion('hands', 2).ball, 0);
  assert.ok(transitionSeconds('jump') < transitionSeconds('reach'));
});

test('steps that ask for walking, waving or wings show those moves', () => {
  const pose = (title: string) => [...games, ...motorActivities].flatMap(a => a.steps).find(s => s.title === title)?.pose;
  assert.equal(pose('Ayiqcha yuradi'), 'march');
  assert.equal(pose('Asalarilar uchadi'), 'wings');
  assert.equal(pose('Navbatni uzatamiz'), 'wave');
  assert.equal(pose('To‘pni ushlaymiz'), 'ball');
});
