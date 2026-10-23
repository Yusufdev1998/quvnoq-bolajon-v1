import { writeFileSync } from 'node:fs';

// Authoring source for the custom, script-free Rive character.
// The CLI schemas and bundled format/drawing/state-machine docs define these types.
let counter = 100;
const ids = {};
const id = name => ids[name] ??= `0:${counter++}`;
const escape = text => String(text).replaceAll('&', '&amp;').replaceAll('"', '&quot;');
const tag = (type, props = {}, children = '') => {
  const attributes = Object.entries(props).map(([key, value]) => `${key}="${escape(value)}"`).join(' ');
  return children ? `<${type} ${attributes}>${children}</${type}>` : `<${type} ${attributes}/>`;
};
const element = (type, name, props = {}, children = '') => tag(type, { ...props, name, id: id(name) }, children);
const paint = color => tag('Fill', {}, tag('SolidColor', { colorValue: color }));
function ellipse(name, x, y, width, height, color, props = {}) {
  return element('Shape', name, { x, y, ...props }, tag('Ellipse', { width, height, originX: 0.5, originY: 0.5 }) + paint(color));
}
function roundedRect(name, x, y, width, height, radius, color, props = {}) {
  return element('Shape', name, { x, y, ...props }, tag('Rectangle', { width, height, cornerRadiusTL: radius, originX: 0.5, originY: 0.5 }) + paint(color));
}
const group = (name, props, children) => element('Node', name, props, children);
function smile() {
  const points = tag('PointsPath', { isClosed: false },
    tag('CubicDetachedVertex', { x: -8, y: 14, outRotation: 0.785398, outDistance: 7, inDistance: 0 }) +
    tag('CubicDetachedVertex', { x: 8, y: 14, inRotation: 2.356194, inDistance: 7, outDistance: 0 }));
  return element('Shape', 'Smile', {}, points + tag('Stroke', { thickness: 2.5, cap: 'round', join: 'round' }, tag('SolidColor', { colorValue: 'FF866552' })));
}
function ear(side) {
  return group(`${side}Ear`, { x: side === 'Left' ? -22 : 22, y: 76, rotation: side === 'Left' ? -0.18 : 0.18 },
    ellipse(`${side}InnerEar`, 0, -34, 10, 50, 'FFF0BFAF') + ellipse(`${side}OuterEar`, 0, -34, 24, 78, 'FFFFF7E7'));
}
function arm(side) {
  return group(`${side}Arm`, { x: side === 'Left' ? -27 : 27, y: 167, rotation: side === 'Left' ? 0.2 : -0.2 },
    ellipse(`${side}Paw`, 0, 52, 24, 26, 'FFFFF7E7') + ellipse(`${side}UpperArm`, 0, 27, 21, 63, 'FFFFF7E7'));
}
function leg(side) {
  return group(`${side}Leg`, { x: side === 'Left' ? -17 : 17, y: 216 },
    ellipse(`${side}Foot`, side === 'Left' ? -4 : 4, 43, 34, 19, 'FFFFF7E7') + ellipse(`${side}Shin`, 0, 22, 24, 48, 'FFFFF7E7'));
}

const face = group('Head', { x: 0, y: 109 },
  group('Eyes', {}, ellipse('LeftHighlight', -16.7, -2.8, 1.5, 2, 'FFFFFDF4') + ellipse('RightHighlight', 19.3, -2.8, 1.5, 2, 'FFFFFDF4') + ellipse('LeftEye', -18, -2, 5, 7, 'FF3F5145') + ellipse('RightEye', 18, -2, 5, 7, 'FF3F5145')) +
  ellipse('LeftCheek', -29, 11, 17, 10, 'FFF4BAA7') + ellipse('RightCheek', 29, 11, 17, 10, 'FFF4BAA7') +
  ellipse('Nose', 0, 7, 8, 6, 'FFB37E6B') + smile() +
  ellipse('Face', 0, 0, 96, 82, 'FFFFF7E7'));

const body = group('Body', { x: 140, y: 40 },
  face + ear('Left') + ear('Right') +
  roundedRect('Pocket', 0, 186, 17, 18, 4, 'FFD8E5BA', { rotation: 0.12 }) +
  ellipse('PocketLeaf', 0, 183, 3, 9, 'FF82A587', { rotation: 0.28 }) +
  roundedRect('Collar', 0, 157, 19, 8, 4, 'FFC6DCC0') +
  roundedRect('Shirt', 0, 183, 64, 66, 18, 'FF6BA58C') +
  roundedRect('LeftShorts', -17, 216, 34, 35, 9, 'FFE8A65C', { rotation: 0.08 }) +
  roundedRect('RightShorts', 17, 216, 34, 35, 9, 'FFE8A65C', { rotation: -0.08 }) +
  arm('Left') + arm('Right') + leg('Left') + leg('Right') +
  ellipse('Tail', 37, 208, 26, 26, 'FFF7E9D1'));
const shadow = ellipse('Shadow', 140, 315, 118, 15, '1F557D54');

// All timelines key the same moving parts, so transitions return to a complete pose.
const defaults = { Body: { x: 140, y: 40, scaleX: 1, scaleY: 1 }, Eyes: { scaleY: 1 }, LeftArm: { rotation: 0.2 }, RightArm: { rotation: -0.2 }, LeftLeg: { rotation: 0 }, RightLeg: { rotation: 0 }, Head: { rotation: 0 }, LeftEar: { rotation: -0.18 }, RightEar: { rotation: 0.18 }, Shadow: { scaleX: 1, opacity: 1 } };
function keyframes(property, frames) {
  return tag('KeyedProperty', { property }, frames.map(([frame, value]) => tag('KeyFrameDouble', { frame, value, interpolationType: 'cubic' }, tag('CubicEaseInterpolator', { x1: 0.42, y1: 0, x2: 0.58, y2: 1 }))).join(''));
}
function timeline(name, duration, overrides) {
  if (name !== 'Rest') overrides.Eyes = { scaleY: [[0, 1], [145, 1], [151, 0.12], [158, 1], [duration - 95, 1], [duration - 89, 0.12], [duration - 82, 1], [duration, 1]] };
  const objects = Object.entries(defaults).map(([target, properties]) => tag('KeyedObject', { objectId: id(target) }, Object.entries(properties).map(([property, value]) => keyframes(property, overrides[target]?.[property] ?? [[0, value], [duration, value]])).join(''))).join('');
  return element('LinearAnimation', name, { duration, fps: 60, loopValue: 'loop' }, objects);
}
const mirror = frames => frames.map(([frame, value]) => [frame, -value]);
const hops = [[0, 40], [35, 43], [66, 10], [96, 40], [138, 43], [168, 6], [198, 40], [250, 43], [282, 14], [312, 40], [370, 43], [402, 8], [432, 40], [480, 40]];
const hopArms = [[0, .2], [35, .1], [66, 1.05], [96, .2], [138, .1], [168, 1.15], [198, .2], [250, .1], [282, .9], [312, .2], [370, .1], [402, 1.1], [432, .2], [480, .2]];
const raise = [[0, .2], [90, 2.5], [180, 2.5], [255, .2], [300, .2], [390, 2.5], [480, 2.5], [555, .2], [600, .2]];
const sway = [[0, 140], [60, 128], [120, 140], [180, 152], [240, 140], [300, 128], [360, 140], [420, 152], [480, 140]];
const steps = [[0, 140], [90, 124], [150, 140], [240, 156], [300, 140], [390, 124], [450, 140], [540, 156], [600, 140]];
const dancingArm = [[0, .5], [60, 1.8], [120, .7], [180, 1.2], [240, .5], [300, 1.8], [360, .7], [420, 1.2], [480, .5]];
const wings = [[0, .2], [100, 1.5], [160, 1.5], [260, .3], [300, .2], [400, 1.5], [460, 1.5], [560, .3], [600, .2]];
const timelines = [
  timeline('Rest', 180, {}),
  timeline('Jump', 480, {
    Body: { y: hops }, LeftArm: { rotation: hopArms }, RightArm: { rotation: mirror(hopArms) },
    LeftLeg: { rotation: hops.map(([f, y]) => [f, y < 40 ? .2 : 0]) },
    RightLeg: { rotation: hops.map(([f, y]) => [f, y < 40 ? -.2 : 0]) },
    LeftEar: { rotation: hops.map(([f, y]) => [f, y < 40 ? -.28 : -.18]) },
    RightEar: { rotation: hops.map(([f, y]) => [f, y < 40 ? .28 : .18]) },
    Shadow: { scaleX: hops.map(([f, y]) => [f, y < 40 ? .65 : 1]), opacity: hops.map(([f, y]) => [f, y < 40 ? .55 : 1]) },
  }),
  timeline('RaiseArms', 600, {
    LeftArm: { rotation: raise }, RightArm: { rotation: mirror(raise) },
    Head: { rotation: [[0, 0], [100, -.06], [200, .06], [300, 0], [400, -.06], [500, .06], [600, 0]] },
  }),
  timeline('Wave', 480, {
    LeftArm: { rotation: [[0, .2], [60, 2.3], [100, 1.9], [140, 2.5], [180, 1.9], [220, 2.5], [260, 1.9], [300, 2.5], [340, 1.9], [390, 2.3], [450, .2], [480, .2]] },
    Head: { rotation: [[0, 0], [80, .1], [220, -.06], [360, .08], [480, 0]] },
    LeftEar: { rotation: [[0, -.18], [120, -.3], [260, -.12], [400, -.25], [480, -.18]] },
  }),
  timeline('SideStep', 600, {
    Body: { x: steps, y: steps.map(([f], i) => [f, i % 2 ? 43 : 40]) },
    LeftLeg: { rotation: steps.map(([f], i) => [f, i % 4 === 1 ? .25 : i % 4 === 3 ? -.12 : 0]) },
    RightLeg: { rotation: steps.map(([f], i) => [f, i % 4 === 1 ? .12 : i % 4 === 3 ? -.25 : 0]) },
    LeftArm: { rotation: steps.map(([f], i) => [f, i % 2 ? .65 : .2]) },
    RightArm: { rotation: steps.map(([f], i) => [f, i % 2 ? -.65 : -.2]) },
    Head: { rotation: steps.map(([f], i) => [f, i % 4 === 1 ? -.07 : i % 4 === 3 ? .07 : 0]) },
  }),
  timeline('Dance', 480, {
    Body: { x: sway, y: sway.map(([f], i) => [f, i % 2 ? 43 : 40]) },
    LeftArm: { rotation: dancingArm }, RightArm: { rotation: dancingArm.map(([f, v]) => [f, -2.3 + v]) },
    LeftLeg: { rotation: sway.map(([f], i) => [f, i % 4 === 1 ? .2 : 0]) },
    RightLeg: { rotation: sway.map(([f], i) => [f, i % 4 === 3 ? -.2 : 0]) },
    Head: { rotation: sway.map(([f], i) => [f, i % 4 === 1 ? -.12 : i % 4 === 3 ? .12 : 0]) },
    LeftEar: { rotation: sway.map(([f], i) => [f, i % 2 ? -.32 : -.18]) },
    RightEar: { rotation: sway.map(([f], i) => [f, i % 2 ? .32 : .18]) },
  }),
  timeline('Celebrate', 480, {
    Body: { y: [[0, 40], [80, 30], [140, 40], [220, 30], [280, 40], [360, 30], [420, 40], [480, 40]] },
    LeftArm: { rotation: [[0, .2], [60, 2.4], [130, 2.1], [200, 2.5], [270, 2.1], [340, 2.5], [410, 2.1], [480, .2]] },
    RightArm: { rotation: [[0, -.2], [60, -2.4], [130, -2.1], [200, -2.5], [270, -2.1], [340, -2.5], [410, -2.1], [480, -.2]] },
    Head: { rotation: [[0, 0], [120, -.1], [240, .1], [360, -.1], [480, 0]] },
  }),
  timeline('Wings', 600, { LeftArm: { rotation: wings }, RightArm: { rotation: mirror(wings) }, Head: { rotation: [[0, 0], [150, -.08], [300, 0], [450, .08], [600, 0]] } }),
];

const actionId = id('action'); const vmId = id('BunnyControls'); const defaultId = id('Default');
const states = ['Rest', 'Jump', 'RaiseArms', 'Wave', 'SideStep', 'Dance', 'Celebrate', 'Wings'].map((name, value) => ({ name, value, stateId: id(`${name}State`) }));
function condition(value) {
  return tag('TransitionViewModelCondition', { opValue: 'equal' },
    tag('TransitionPropertyViewModelComparator', {}, tag('BindablePropertyNumber', {}, tag('DataBindContext', { sourcePathIds: `${vmId}-${actionId}`, propertyKey: 636 }))) + tag('TransitionValueNumberComparator', { value }));
}
const stateMachine = element('StateMachine', 'BunnyMotion', {}, element('StateMachineLayer', 'Movement', {},
  tag('AnyState', { x: 260, y: -220 }) + tag('ExitState', { x: 520, y: -220 }) +
  tag('EntryState', { x: 0, y: 0 }, tag('StateTransition', { stateToId: states[0].stateId })) +
  states.map((state, i) => tag('AnimationState', { id: state.stateId, animationId: id(state.name), x: 240 + i * 230, y: i === 1 ? 160 : 0, reset: true }, states.filter(s => s !== state).map(next => tag('StateTransition', { stateToId: next.stateId, duration: next.value === 0 ? 100 : 180 }, condition(next.value))).join(''))).join('')));

const viewModel = tag('ViewModel', { id: vmId, name: 'BunnyControls', defaultInstanceId: defaultId },
  tag('ViewModelPropertyNumber', { name: 'action', id: actionId }) +
  tag('ViewModelInstance', { name: 'Default', id: defaultId, exports: true }, tag('ViewModelInstanceNumber', { propertyValue: 0, viewModelPropertyId: actionId })));

const scene = tag('Rive', { version: 1, kind: 'fragment' },
  element('Artboard', 'QuvnoqBunny', { width: 280, height: 340, defaultStateMachineId: id('BunnyMotion'), viewModelId: vmId, viewModelInstanceId: defaultId, styleId: id('ArtboardStyle') },
    element('LayoutComponentStyle', 'ArtboardStyle') + body + shadow + stateMachine + timelines.join('')) + viewModel);
writeFileSync(new URL('../animations/quvnoq-bunny/scene.rml', import.meta.url), scene.replaceAll('><', '>\n<') + '\n');
console.log('Wrote eight bunny timelines with varied 8–10 second movement cycles, driven by BunnyControls.action.');
