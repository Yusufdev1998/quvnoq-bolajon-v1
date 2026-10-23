import type { Step } from './data';

export type BunnyPose3D = ReturnType<typeof restPose>;
const smooth = (x: number) => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
const hash = (n: number) => { const s = Math.sin(n * 127.1 + 311.7) * 43758.5453; return s - Math.floor(s); };
// Music loop tempo (scripts/create-background-music.py), so the dance lands on the beat.
const BEAT = 60 / 124;

function restPose() {
  return { x: 0, y: 0, lean: 0, pitch: 0, turn: 0, squash: 0, headTilt: 0, headTurn: 0, headNod: 0,
    armL: -.16, armR: .16, elbowL: -.12, elbowR: .12, swingL: -.08, swingR: -.08, flexL: 0, flexR: 0, gripL: 0, gripR: 0, ball: 0, ring: 0,
    footLX: -.22, footRX: .22, footLY: 0, footRY: 0, footLZ: .06, footRZ: .06, heelL: 0, heelR: 0,
    earL: -.13, earR: .13, earLag: 0, earTip: 0, tail: 0, belly: 0, blink: 1, breath: 0, gazeX: 0, gazeY: 0 };
}

type Key = readonly [time: number, value: number];
// Catmull-Rom spline through keyframes: velocity stays continuous across keys, so motion
// flows like hand-keyed animation instead of stopping at every pose. Tangents flatten at
// peaks, dips and repeated values (auto tangents), so extremes never overshoot and
// repeating a value creates a true hold.
export function spline(keys: readonly Key[], t: number): number {
  if (t <= keys[0][0]) return keys[0][1];
  const last = keys.length - 1;
  if (t >= keys[last][0]) return keys[last][1];
  let i = 0;
  while (t > keys[i + 1][0]) i++;
  const [t0, v0] = keys[i], [t1, v1] = keys[i + 1];
  const tangent = (k: number) => {
    if (k <= 0 || k >= last) return 0;
    if ((keys[k][1] - keys[k - 1][1]) * (keys[k + 1][1] - keys[k][1]) <= 0) return 0;
    return (keys[k + 1][1] - keys[k - 1][1]) / (keys[k + 1][0] - keys[k - 1][0]);
  };
  const h = t1 - t0, u = (t - t0) / h, u2 = u * u, u3 = u2 * u;
  return (2 * u3 - 3 * u2 + 1) * v0 + (u3 - 2 * u2 + u) * h * tangent(i) + (-2 * u3 + 3 * u2) * v1 + (u3 - u2) * h * tangent(i + 1);
}

// Irregular blinks (2.6–5.4 s apart, occasionally doubled): eyelids close fast and open slowly.
function blinkAt(t: number) {
  const slot = Math.floor(t / 4), start = slot * 4 + .4 + hash(slot) * 2.8;
  const lid = (s: number) => s < 0 || s > .2 ? 1 : s < .06 ? 1 - smooth(s / .06) : s < .085 ? 0 : smooth((s - .085) / .115);
  return Math.min(lid(t - start), hash(slot + 91) > .78 ? lid(t - start - .26) : 1);
}

// Eyes hold a fixation, then make a quick saccade; half the fixations return to the viewer.
function gazeAt(t: number) {
  const slot = Math.floor(t / 1.7), local = t - slot * 1.7;
  const target = (n: number) => hash(n + 7) < .5 ? [0, 0] : [(hash(n + 13) * 2 - 1) * .8, (hash(n + 29) * 2 - 1) * .45];
  const [px, py] = target(slot - 1), [nx, ny] = target(slot), s = smooth(local / .07);
  return [mix(px, nx, s), mix(py, ny, s)];
}

// How long the body takes to blend into each move: quick for energetic moves,
// slower for calm reaches and for settling into stillness.
const TRANSITIONS: Partial<Record<Step['pose'], number>> = { jump: .3, celebrate: .3, run: .3, wave: .35, march: .35, dance: .35, step: .4, wings: .55, balance: .6, reach: .6, still: .6, cooldown: .7 };
export const transitionSeconds = (pose: Step['pose']) => TRANSITIONS[pose] ?? .45;

const JUMP: Record<string, readonly Key[]> = {
  arm: [[0, -.16], [.3, -.16], [.62, -.24], [.74, -.42], [.98, -.6], [1.22, -.48], [1.44, -.34], [1.9, -.18], [2.4, -.16]],
  swing: [[0, -.08], [.3, -.06], [.62, .62], [.74, -1.05], [.98, -1.25], [1.22, -.7], [1.44, -.55], [1.9, -.1], [2.4, -.08]],
  elbow: [[0, -.12], [.3, -.12], [.62, -.38], [.74, -.2], [.98, -.48], [1.22, -.3], [1.44, -.36], [1.9, -.13], [2.4, -.12]],
  pitch: [[0, 0], [.3, 0], [.62, .15], [.74, .03], [.98, -.03], [1.22, .05], [1.44, .17], [1.9, -.01], [2.4, 0]],
  squash: [[0, 0], [.3, 0], [.62, .045], [.74, -.075], [.98, 0], [1.18, -.03], [1.26, .02], [1.44, .085], [1.66, -.015], [1.9, .005], [2.4, 0]],
  heel: [[0, 0], [.55, 0], [.74, .52], [.98, .36], [1.22, .28], [1.3, 0], [2.4, 0]],
  nod: [[0, 0], [.3, 0], [.62, .06], [.74, -.07], [.98, -.04], [1.22, .02], [1.44, .09], [1.9, -.01], [2.4, 0]],
};

// Anticipation crouch, push-off onto the toes, a true ballistic arc, toe-first landing,
// a deeper absorb than the take-off crouch, then a small overshoot while settling.
function hop(p: BunnyPose3D, t: number, height: number) {
  const takeoff = .74, air = .34 + height * .45, land = takeoff + air, lift = .14;
  // Squeeze the air phase into the authored timeline so higher jumps hang longer.
  const k = t < takeoff ? t : t < land ? takeoff + (t - takeoff) / air * .48 : t - air + .48;
  let y: number, feet = 0;
  if (t < .3) y = 0;
  else if (t < .62) y = -.13 * smooth((t - .3) / .32);
  else if (t < takeoff) { const u = (t - .62) / .12; y = mix(-.13, lift, u * u); }
  else if (t < land) { const u = (t - takeoff) / air; y = lift + height * 4 * u * (1 - u); feet = y - lift + Math.sin(u * Math.PI) * .05; }
  else if (t < land + .22) { const u = (t - land) / .22; y = mix(lift, -.15, 1 - (1 - u) * (1 - u)); }
  else y = spline([[0, -.15], [.24, .018], [.42, -.006], [.7, 0]], t - land - .22);
  p.y = y; p.footLY = p.footRY = feet;
  p.armL = spline(JUMP.arm, k); p.armR = -p.armL;
  p.swingL = p.swingR = spline(JUMP.swing, k);
  p.elbowL = spline(JUMP.elbow, k); p.elbowR = -p.elbowL;
  p.pitch = spline(JUMP.pitch, k); p.squash = spline(JUMP.squash, k);
  p.heelL = p.heelR = spline(JUMP.heel, k); p.headNod += spline(JUMP.nod, k);
  return t > land + .04 && t < land + .2;
}

// Paw pose for seated hand moves: [swing, arm, flex, elbow, gazeY, headNod].
const FRONT = {
  hands: [-.4, .14, -1.75, .32, -.3, .05], fingers: [-.4, .14, -1.75, .32, -.3, .05],
  ball: [-.55, -.1, -1.3, -.12, -.55, .1], ring: [-.55, -.1, -1.3, -.12, -.5, .1],
  pinch: [-.5, .1, -1.4, .2, -.6, .12], roll: [-.5, .12, -1.45, .28, -.5, .1],
} as const;

// Foot positions during the side-step pattern: one foot travels per step.
const STEPS = [[-.22, .22], [-.46, .22], [-.46, -.02], [-.46, .22], [-.22, .22], [-.22, .46], [.02, .46], [-.22, .46], [-.22, .22]];

// Foot targets are in world space. The renderer solves each knee from hip to ankle,
// so grounded feet stay planted while the body shifts, crouches and recovers.
export function sampleBunnyMotion(action: Step['pose'], seconds: number): BunnyPose3D {
  const p = restPose();
  const t = Math.max(0, seconds);
  const a = t * Math.PI * 2;
  // Living idle shared by every pose: breathing, slow weight shift, blinks and gaze.
  p.breath = Math.sin(a / 3.6) * .011;
  p.armL -= p.breath * .9; p.armR += p.breath * .9;
  p.x = Math.sin(a / 7.3) * .009; p.lean = -p.x * .5;
  p.blink = blinkAt(t);
  [p.gazeX, p.gazeY] = gazeAt(t);
  p.headTurn = p.gazeX * .06 + Math.sin(a / 6.4) * .02;
  p.headNod = -p.gazeY * .04;
  p.headTilt = Math.sin(a / 5.3) * .022;
  if (action === 'still') return p;

  if (action === 'jump') {
    if (hop(p, t % 2.4, .32)) p.blink = Math.min(p.blink, .6);
  } else if (action === 'celebrate') {
    const cycle = t % 1.7;
    hop(p, Math.min(2.4, cycle * 1.12 + .26), .17);
    const cheer = smooth(t / .5);
    p.armL = mix(p.armL, -2.3 + Math.sin(a / .85) * .16, cheer); p.armR = mix(p.armR, 2.3 + Math.sin(a / .85 + .6) * .16, cheer);
    p.elbowL = mix(p.elbowL, -.35 + Math.sin(a / .85 - .5) * .22, cheer); p.elbowR = mix(p.elbowR, .35 - Math.sin(a / .85 + .1) * .22, cheer);
    p.swingL = p.swingR = mix(p.swingL, -.15, cheer);
    p.headTilt = Math.sin(a / 1.7) * .08; p.gazeX = p.gazeY = 0;
  } else if (action === 'reach') {
    // Inhale and rise onto the toes, hold at the top, then lower slowly while exhaling.
    const c = t % 5.4;
    const up = spline([[0, 0], [.3, 0], [2, 1], [2.9, 1], [4.7, 0], [5.4, 0]], c);
    const stretch = spline([[0, 0], [1.6, 0], [2.15, 1], [2.75, 1], [3.3, 0], [5.4, 0]], c);
    p.armL = -.16 - up * 2.42 - stretch * .08; p.armR = -p.armL;
    p.elbowL = -.12 + up * .06 - Math.max(0, up - .5) * .08; p.elbowR = -p.elbowL;
    p.swingL = p.swingR = -.08 - up * .12;
    p.y = up * .03 + stretch * .05; p.heelL = p.heelR = stretch * .38;
    p.squash = -stretch * .035; p.breath += up * .02;
    p.headNod -= up * .1 + stretch * .05; p.gazeY = up * .7; p.gazeX *= 1 - up;
  } else if (action === 'wings') {
    // Arms open like wings, then flap gently; the forearms trail like feathers.
    const open = smooth(t / 1.1), flap = a / 1.9;
    p.armL = mix(-.16, -1.45 + Math.sin(flap) * .3, open); p.armR = -p.armL;
    p.elbowL = mix(-.12, Math.sin(flap - 1.1) * .32, open); p.elbowR = -p.elbowL;
    p.swingL = p.swingR = -.05 * open;
    p.y = Math.sin(flap + Math.PI) * .018 * open; p.squash = Math.sin(flap + Math.PI) * .012 * open;
    p.heelL = p.heelR = Math.max(0, Math.sin(flap)) * .12 * open;
  } else if (action === 'wave') {
    // Raise with a little overshoot; the paw trails the forearm; weight settles on one leg.
    const raised = spline([[0, 0], [.45, .82], [.7, 1.06], [.95, 1]], t);
    const wave = Math.sin(a / .95) * clamp01((t - .45) / .3);
    p.armL = -.16 - raised * 1.5; p.swingL = -.25 * raised;
    p.elbowL = -.12 - raised * .9 + wave * .3; p.armL += Math.sin(a / .95 - .9) * .07 * clamp01((t - .45) / .3);
    p.x += .035 * raised; p.lean -= .035 * raised; p.turn = -.08 * raised;
    p.headTilt = -.08 * raised + wave * .015; p.headTurn -= .04 * raised;
    p.footLZ = .06 + .05 * raised; p.heelL = .1 * raised;
    p.armR = .16 + .06 * raised; p.elbowR = .14;
  } else if (action === 'step') {
    const index = Math.floor(t / .72) % 8, phase = (t % .72) / .72;
    const from = STEPS[index], to = STEPS[index + 1];
    const left = from[0] !== to[0];
    const swing = smooth((phase - .12) / .76), lift = Math.sin(clamp01((phase - .12) / .7) * Math.PI);
    const stance = left ? from[1] : from[0];
    const base = mix((from[0] + from[1]) / 2, (to[0] + to[1]) / 2, swing);
    // The hips shift over the supporting foot before the other foot leaves the ground.
    const shift = Math.sin(clamp01(phase / .8) * Math.PI);
    p.x += base + (stance - base) * .42 * shift;
    p.lean += (p.x - base) * -.55;
    p.headTilt -= p.lean * .7;
    p.y = -.022 + lift * .014 - Math.max(0, Math.sin((phase - .8) / .2 * Math.PI)) * .016;
    if (left) { p.footLX = mix(from[0], to[0], swing); p.footLY = lift * .085; p.heelL = lift * .22; p.footRX = from[1]; }
    else { p.footRX = mix(from[1], to[1], swing); p.footRY = lift * .085; p.heelR = lift * .22; p.footLX = from[0]; }
    const counter = Math.sin(a / 1.44);
    p.armL = -.26 + counter * .1; p.armR = .26 + counter * .1;
    p.swingL = counter * .17; p.swingR = -p.swingL;
    p.elbowL = -.2 - Math.max(0, counter) * .15; p.elbowR = .2 + Math.max(0, -counter) * .15;
    p.turn = counter * .03;
  } else if (action === 'march') {
    // Walking in place: the heel peels up, the knee lifts, the foot sets down softly,
    // the hips shift over the supporting leg and the arms swing against the legs.
    const c = (t % 1.25) / 1.25, ph = (c % .5) / .5, leftUp = c < .5;
    const lift = Math.sin(clamp01((ph - .1) / .75) * Math.PI);
    const heel = spline([[0, 0], [.12, .32], [.35, .22], [.85, 0], [1, 0]], ph);
    if (leftUp) { p.footLY = lift * .13; p.heelL = heel; p.footLZ = .06 + lift * .05; }
    else { p.footRY = lift * .13; p.heelR = heel; p.footRZ = .06 + lift * .05; }
    const gait = Math.sin(c * Math.PI * 2);
    p.x += gait * .03; p.lean -= gait * .02; p.headTilt += gait * .015; p.turn = gait * .045;
    p.y = -.015 + lift * .012 - Math.max(0, Math.sin((ph - .82) / .18 * Math.PI)) * .014;
    p.swingL = .3 * gait - .05; p.swingR = -.3 * gait - .05;
    p.flexL = -.3 - Math.max(0, -gait) * .3; p.flexR = -.3 - Math.max(0, gait) * .3;
  } else if (action === 'run') {
    // Jogging in place: a short flight between steps, knees driving up, bent arms pumping.
    const c = (t % .7) / .7, ph = (c % .5) / .5, leftUp = c < .5;
    const lift = Math.sin(clamp01(ph / .8) * Math.PI);
    if (leftUp) { p.footLY = lift * .19; p.footLZ = .06 + lift * .08; p.heelL = .25 + lift * .2; p.heelR = Math.max(0, .45 - ph * 1.6); }
    else { p.footRY = lift * .19; p.footRZ = .06 + lift * .08; p.heelR = .25 + lift * .2; p.heelL = Math.max(0, .45 - ph * 1.6); }
    const pump = Math.sin(c * Math.PI * 2);
    p.y = -.035 + Math.max(0, Math.sin((ph - .15) / .5 * Math.PI)) * .05;
    p.squash = ph < .12 ? (1 - ph / .12) * .03 : 0;
    p.pitch = .07; p.x += pump * .015; p.turn = pump * .05;
    p.swingL = .55 * pump - .15; p.swingR = -.55 * pump - .15;
    p.flexL = p.flexR = -1.45; p.elbowL = -.15; p.elbowR = .15; p.gripL = p.gripR = .7;
  } else if (action === 'balance') {
    // Stand on one leg like a stork: shift over the supporting foot, lift the other knee,
    // arms out, with small corrections while holding; then switch legs.
    const c = t % 10, leftUp = c < 5, u = c % 5;
    const shift = spline([[0, 0], [.9, 1], [4.4, 1], [5, 0]], u);
    const lift = spline([[0, 0], [.8, 0], [1.5, 1], [4.1, 1], [4.7, 0], [5, 0]], u);
    const stance = leftUp ? .22 : -.22;
    p.x += stance * .75 * shift;
    const wobble = (Math.sin(t * 2.3) + Math.sin(t * 3.7 + 1) * .6) * lift;
    p.lean += -stance * .12 * shift + wobble * .022;
    p.headTilt -= p.lean * .6;
    p.armL = -.16 - shift * 1.2 + wobble * .1; p.armR = .16 + shift * 1.2 + wobble * .1;
    p.elbowL = -.12 - shift * .1; p.elbowR = -p.elbowL;
    if (leftUp) { p.footLY = lift * .26; p.footLZ = .06 + lift * .12; p.heelL = lift * .5; }
    else { p.footRY = lift * .26; p.footRZ = .06 + lift * .12; p.heelR = lift * .5; }
    p.gazeX *= 1 - lift; p.gazeY = mix(p.gazeY, -.15, lift);
  } else if (action === 'cooldown') {
    // Static stretches held for a few breaths: reach up, bend left, bend right,
    // lower the arms slowly and finish by shaking the arms out loosely.
    const c = t % 14;
    const up = spline([[0, 0], [2.5, 1], [10, 1], [11.6, 0], [14, 0]], c);
    const bend = spline([[0, 0], [4, 0], [5.5, 1], [7, 1], [8.5, -1], [10, -1], [11.2, 0], [14, 0]], c);
    const shake = spline([[0, 0], [11.4, 0], [11.9, 1], [13.4, 1], [14, 0]], c);
    const loose = Math.sin(t * 15) * shake;
    p.armL = -.16 - up * 2.5 + bend * .2 + loose * .1; p.armR = .16 + up * 2.5 + bend * .2 - loose * .1;
    p.elbowL = -.12 - up * .05 + loose * .12; p.elbowR = -p.elbowL;
    p.lean += bend * .3; p.x -= bend * .035; p.headTilt += bend * .12;
    p.breath += up * .02 - shake * .006; p.y = -Math.abs(loose) * .008;
    p.headNod -= up * .06; p.gazeY = up * .5 * (1 - Math.abs(bend));
  } else if (action in FRONT) {
    // Seated fine-motor moves: paws in front of the chest, eyes on the paws.
    const raise = smooth(t / .8), base = FRONT[action as keyof typeof FRONT];
    p.swingL = p.swingR = mix(-.08, base[0], raise);
    p.armL = mix(-.16, base[1], raise); p.armR = -p.armL;
    p.flexL = p.flexR = mix(0, base[2], raise);
    p.elbowL = mix(-.12, base[3], raise); p.elbowR = -p.elbowL;
    p.gazeY = base[4] * raise; p.gazeX *= 1 - raise; p.headNod += base[5] * raise;
    p.ball = action === 'ball' ? 1 : 0; p.ring = action === 'ring' ? 1 : 0;
    if (action === 'ball') {
      // Two gentle squeezes, then the ball is offered forward and brought back.
      const c = t % 4.4;
      const squeeze = spline([[0, 0], [.5, 1], [.9, 0], [1.4, 1], [1.8, 0], [4.4, 0]], c);
      const offer = spline([[0, 0], [2.2, 0], [2.9, 1], [3.4, 1], [4.2, 0], [4.4, 0]], c);
      p.elbowL += squeeze * .1 * raise; p.elbowR = -p.elbowL;
      p.flexL = p.flexR = p.flexL + offer * .75 * raise;
      p.swingL = p.swingR = p.swingL - offer * .45 * raise;
      p.pitch = offer * .06; p.y -= offer * .015; p.heelL = p.heelR = offer * .08;
      p.gripL = p.gripR = .45 + squeeze * .35;
      p.gazeY = mix(p.gazeY, 0, offer);
    } else if (action === 'hands') {
      // Open the paws wide, then close them into soft fists; the right paw trails a little.
      p.gripL = (1 - Math.cos(a / 2.6)) / 2 * raise; p.gripR = (1 - Math.cos(a / 2.6 - .5)) / 2 * raise;
      p.elbowL += Math.sin(a / 2.6) * .04; p.elbowR -= Math.sin(a / 2.6 - .5) * .04;
    } else if (action === 'fingers') {
      // Fingers greet each other: four quick touches of the paws, then a short pause.
      const c = t % 3.2, beat = c < 2.4 ? (c % .6) / .6 : 1;
      const touch = beat < .35 ? smooth(beat / .35) : 1 - smooth((beat - .35) / .65);
      p.elbowL += touch * .32 * raise; p.elbowR = -p.elbowL;
      p.gripL = p.gripR = (.15 + touch * .45) * raise;
    } else if (action === 'ring') {
      // Stretch the elastic ring by pulling the paws apart, hold, then let it relax.
      const pull = spline([[0, 0], [.7, 1], [1.4, 1], [2.2, 0], [2.6, 0]], t % 2.6) * raise;
      p.elbowL -= pull * .55; p.elbowR = -p.elbowL; p.armL -= pull * .12; p.armR = -p.armL;
      p.gripL = p.gripR = .55; p.headNod += pull * .02;
    } else if (action === 'pinch') {
      // Pick up a small item with one paw, carry it across and place it; then the other paw.
      const c = t % 5, leftTurn = c < 2.5, u = c % 2.5;
      const reach = spline([[0, 0], [.6, 1], [.9, 1], [1.6, -1], [1.9, -1], [2.5, 0]], u) * raise;
      const grip = spline([[0, 0], [.7, 0], [.9, 1], [1.7, 1], [1.9, 0], [2.5, 0]], u);
      const dip = Math.max(0, reach) * .35, drop = Math.max(0, -reach) * .2;
      if (leftTurn) { p.armL -= reach * .32; p.elbowL -= reach * .3; p.flexL += dip + drop; p.gripL = grip; p.gripR = .3; }
      else { p.armR += reach * .32; p.elbowR += reach * .3; p.flexR += dip + drop; p.gripR = grip; p.gripL = .3; }
      p.gazeX = (leftTurn ? -reach : reach) * .7; p.headTurn += p.gazeX * .08;
    } else {
      // Rolling or winding: the paws circle around each other.
      const turn = a / 1.3;
      p.flexL += Math.sin(turn) * .28 * raise; p.flexR += Math.sin(turn + Math.PI) * .28 * raise;
      p.elbowL += Math.cos(turn) * .1 * raise; p.elbowR -= Math.cos(turn + Math.PI) * .1 * raise;
      p.gripL = p.gripR = .5;
    }
  } else if (action === 'dance') {
    // Knees bounce on every beat (fast down, softer up); the sway spans a two-beat cycle.
    const beatPhase = (t / BEAT) % 1;
    const bounce = beatPhase < .18 ? smooth(beatPhase / .18) : 1 - smooth((beatPhase - .18) / .82);
    const sway = Math.sin(a / (BEAT * 4));
    p.x += sway * .1; p.y = -.03 - bounce * .045;
    p.squash = bounce * .025; p.lean -= sway * .06; p.turn = sway * .15;
    p.armL = -.65 - (1 + sway) * .36; p.armR = .65 + (1 - sway) * .36;
    p.elbowL = -.45 - Math.sin(a / (BEAT * 4) + .5) * .22 - bounce * .06; p.elbowR = .45 - Math.sin(a / (BEAT * 4) + .5) * .22 + bounce * .06;
    p.swingL = p.swingR = -.25;
    p.footLY = Math.max(0, sway) * .05; p.footRY = Math.max(0, -sway) * .05;
    p.heelL = Math.max(0, sway) * .25; p.heelR = Math.max(0, -sway) * .25;
    p.headTilt = Math.sin(a / (BEAT * 4) - .3) * .08; p.headTurn += Math.sin(a / (BEAT * 4) - .2) * .09;
    p.headNod += bounce * .045;
  }
  return p;
}

export function blendBunnyPoses(from: BunnyPose3D, to: BunnyPose3D, progress: number): BunnyPose3D {
  const result = { ...to };
  for (const key of Object.keys(result) as (keyof BunnyPose3D)[]) result[key] = mix(from[key], to[key], smooth(progress));
  return result;
}

// Damped spring that trails a target; the gap between them drives the floppy parts.
class Spring {
  x = 0; v = 0; last = 0; ready = false; frequency: number; damping: number;
  constructor(frequency: number, damping: number) { this.frequency = frequency; this.damping = damping; }
  follow(target: number, dt: number) {
    if (!this.ready) { this.x = this.last = target; this.v = 0; this.ready = true; return 0; }
    const k = (Math.PI * 2 * this.frequency) ** 2, c = 2 * this.damping * Math.sqrt(k);
    // Small sub-steps along the target's path since the last frame keep the result
    // stable and nearly identical at 30, 60 or 120 fps.
    const steps = Math.max(1, Math.ceil(dt * 480)), h = dt / steps;
    for (let i = 1; i <= steps; i++) {
      const goal = mix(this.last, target, i / steps);
      this.v += (k * (goal - this.x) - c * this.v) * h;
      this.x += this.v * h;
    }
    this.last = target;
    return this.x - target;
  }
}

// Secondary motion: ears, ear tips, head, tail and belly lag behind the body and settle,
// which reads as mass and softness. The result is frame-rate independent.
export function createSecondaryMotion() {
  const make = () => ({
    earY: new Spring(2.1, .22), earX: new Spring(2.4, .25), earPitch: new Spring(2.6, .3), tip: new Spring(1.6, .2),
    head: new Spring(4.2, .55), tail: new Spring(5.2, .28), belly: new Spring(6.5, .32),
  });
  let s = make();
  return {
    reset() { s = make(); },
    apply(pose: BunnyPose3D, dt: number): BunnyPose3D {
      const p = { ...pose };
      const ear = s.earY.follow(p.y, dt), side = s.earX.follow(p.x, dt), tilt = s.earPitch.follow(p.pitch + p.headNod, dt);
      // Rising fast flattens the ears back; falling throws them forward.
      // tanh keeps a hard landing from folding the ears flat while staying smooth.
      p.earLag += Math.tanh((ear * 1.2 - tilt * .9) / .32) * .32;
      p.earTip += s.tip.follow(p.earLag, dt) * 1.4;
      p.earL -= side * 2.6; p.earR -= side * 2.6;
      p.headNod -= s.head.follow(p.y, dt) * .55;
      p.tail += s.tail.follow(p.y + p.x * .5, dt) * 1.6;
      p.belly += s.belly.follow(p.y, dt) * .3;
      return p;
    },
  };
}
