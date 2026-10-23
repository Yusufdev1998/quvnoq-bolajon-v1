import type { Step } from './data';

export type BunnyPose3D = ReturnType<typeof restPose>;
const smooth = (x: number) => { const v = Math.max(0, Math.min(1, x)); return v * v * (3 - 2 * v); };
const mix = (a: number, b: number, t: number) => a + (b - a) * t;
function restPose() {
  return { x: 0, y: 0, lean: 0, turn: 0, headTilt: 0, headTurn: 0, headNod: 0,
    armL: -.16, armR: .16, elbowL: -.12, elbowR: .12, swingL: -.08, swingR: -.08,
    footLX: -.22, footRX: .22, footLY: 0, footRY: 0, footLZ: .06, footRZ: .06,
    earL: -.13, earR: .13, earLag: 0, blink: 1, breath: 0 };
}

// Foot targets are in world space. The renderer solves each knee from hip to ankle,
// so grounded feet stay planted while the body shifts, crouches and recovers.
export function sampleBunnyMotion(action: Step['pose'], seconds: number): BunnyPose3D {
  const p = restPose();
  if (action === 'stretch' || action === 'hands' || action === 'ball') return p;
  const t = Math.max(0, seconds);
  const a = t * Math.PI * 2;
  p.breath = Math.sin(a / 3.8) * .009;
  p.headTilt = Math.sin(a / 5.3) * .025;
  p.headTurn = Math.sin(a / 6.4) * .035;
  const blinkTime = t % 4.7;
  p.blink = blinkTime > 3.8 && blinkTime < 4.02 ? 1 - .95 * Math.sin((blinkTime - 3.8) / .22 * Math.PI) : 1;
  p.earLag = Math.sin(a / 3.8 - .45) * .025;

  if (action === 'jump' || action === 'celebrate') {
    const cycle = t % 2.6;
    const crouch = cycle < .45 ? smooth(cycle / .45) : cycle < .65 ? 1 - smooth((cycle - .45) / .2) : cycle > 1.35 && cycle < 1.85 ? Math.sin((cycle - 1.35) / .5 * Math.PI) * .75 : 0;
    const flight = cycle >= .65 && cycle <= 1.35 ? Math.sin((cycle - .65) / .7 * Math.PI) : 0;
    const height = action === 'celebrate' ? .16 : .31;
    p.y = flight * height - crouch * .105;
    p.footLY = p.footRY = flight * height;
    p.armL = -.25 - flight * .7 + crouch * .1;
    p.armR = -p.armL;
    p.swingL = p.swingR = -.13 - flight * .2 + crouch * .24;
    p.elbowL = -.2 - crouch * .25; p.elbowR = -p.elbowL;
    p.headNod = crouch * .055 - flight * .045;
    p.earLag = Math.sin((cycle - .12) / 2.6 * Math.PI * 2) * .11;
    if (action === 'celebrate') {
      p.armL = -2.25 + Math.sin(a / 1.3) * .12; p.armR = 2.25 + Math.sin(a / 1.3) * .12;
      p.elbowL = -.3; p.elbowR = .3; p.headTilt = Math.sin(a / 2.6) * .07;
    }
  } else if (action === 'reach' || action === 'wings') {
    const up = (1 - Math.cos(a / 5.4)) / 2;
    const target = action === 'reach' ? 2.45 : 1.48;
    p.armL = -.16 - up * target; p.armR = .16 + up * target;
    p.elbowL = -.12 - up * .08; p.elbowR = -p.elbowL;
    p.y = up * .025; p.headNod = -up * .07;
    p.swingL = p.swingR = -.08 - up * .08;
  } else if (action === 'wave') {
    const raised = smooth(t / .8);
    p.armL = mix(-.16, -1.65, raised);
    p.elbowL = mix(-.12, -1 + Math.sin(a / 1.05) * .27, raised);
    p.swingL = -.25 * raised; p.headTilt = -.07 * raised;
    p.turn = -.07 * raised; p.earL -= Math.sin(a / 2.1) * .035;
  } else if (action === 'step') {
    const index = Math.floor(t / .72) % 8;
    const phase = (t % .72) / .72;
    const positions = [[-.22, .22], [-.46, .22], [-.46, -.02], [-.46, .22], [-.22, .22], [-.22, .46], [.02, .46], [-.22, .46], [-.22, .22]];
    const from = positions[index], to = positions[index + 1];
    p.footLX = mix(from[0], to[0], smooth(phase)); p.footRX = mix(from[1], to[1], smooth(phase));
    p.footLY = from[0] !== to[0] ? Math.sin(phase * Math.PI) * .10 : 0;
    p.footRY = from[1] !== to[1] ? Math.sin(phase * Math.PI) * .10 : 0;
    p.x = (p.footLX + p.footRX) / 2;
    p.y = -.025 + Math.sin(phase * Math.PI) * .018;
    p.lean = (p.footLY - p.footRY) * .35;
    p.armL = -.28 + Math.sin(a / 1.44) * .13; p.armR = .28 + Math.sin(a / 1.44) * .13;
    p.swingL = Math.sin(a / 1.44) * .18; p.swingR = -p.swingL;
  } else if (action === 'dance') {
    const beat = a / 1.935;
    p.x = Math.sin(beat) * .10; p.y = -.035 + Math.cos(beat * 2) * .025;
    p.lean = -Math.sin(beat) * .055; p.turn = Math.sin(beat) * .14;
    p.armL = -.65 - (1 + Math.sin(beat)) * .36; p.armR = .65 + (1 - Math.sin(beat)) * .36;
    p.elbowL = -.45 - Math.sin(beat + .5) * .22; p.elbowR = .45 - Math.sin(beat + .5) * .22;
    p.swingL = -.25; p.swingR = -.25;
    p.footLY = Math.max(0, Math.sin(beat)) * .045; p.footRY = Math.max(0, -Math.sin(beat)) * .045;
    p.headTilt = Math.sin(beat - .3) * .07; p.headTurn = Math.sin(beat - .2) * .09;
    p.earLag = Math.sin(beat - .5) * .06;
  }
  return p;
}

export function blendBunnyPoses(from: BunnyPose3D, to: BunnyPose3D, progress: number): BunnyPose3D {
  const result = { ...to };
  for (const key of Object.keys(result) as (keyof BunnyPose3D)[]) result[key] = mix(from[key], to[key], smooth(progress));
  return result;
}
