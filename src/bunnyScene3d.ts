import * as THREE from 'three';
import type { BunnyPose3D } from './bunnyMotion3d';

type Limb = { shoulder: THREE.Group; elbow: THREE.Group; paw: THREE.Mesh };
const up = new THREE.Vector3(0, 1, 0);

export function createBunnyScene(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera(-2.5, 2.5, 4.25, -.35, .1, 40);
  camera.position.set(.25, 3.05, 9);
  camera.lookAt(0, 1.8, 0);

  scene.add(new THREE.HemisphereLight(0xf6f6e9, 0x9da995, 2.1));
  const key = new THREE.DirectionalLight(0xffecd2, 3.1);
  key.position.set(-3, 6, 5); key.castShadow = true;
  key.shadow.mapSize.set(1024, 1024);
  Object.assign(key.shadow.camera, { left: -3, right: 3, top: 5, bottom: -2, near: .5, far: 16 });
  key.shadow.normalBias = .025; key.shadow.bias = -.0003;
  key.shadow.radius = 3;
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xfff9e9, 2.5); rim.position.set(3, 4, -3); scene.add(rim);
  const fill = new THREE.DirectionalLight(0xddeaf7, .75); fill.position.set(4, 2, 4); scene.add(fill);

  const sphere = new THREE.SphereGeometry(1, 32, 24);
  const tuftGeometry = new THREE.SphereGeometry(1, 6, 4);
  const fur = new THREE.MeshStandardMaterial({ color: '#f3e9d8', roughness: .96 });
  const muzzleMaterial = new THREE.MeshStandardMaterial({ color: '#fff2df', roughness: 1 });
  const pink = new THREE.MeshStandardMaterial({ color: '#dc9c99', roughness: .83 });
  const noseMaterial = new THREE.MeshPhysicalMaterial({ color: '#b97879', roughness: .44, clearcoat: .2 });
  const iris = new THREE.MeshPhysicalMaterial({ color: '#654b37', roughness: .18, clearcoat: 1, clearcoatRoughness: .08 });
  const pupil = new THREE.MeshPhysicalMaterial({ color: '#171d1b', roughness: .12, clearcoat: 1 });
  const glint = new THREE.MeshBasicMaterial({ color: '#fffdf3' });
  const mouthMaterial = new THREE.MeshStandardMaterial({ color: '#967b67', roughness: .95 });
  const knit = knitTexture();
  const shirt = new THREE.MeshStandardMaterial({ color: '#589280', roughness: .95, bumpMap: knit, bumpScale: .018 });
  const collar = new THREE.MeshStandardMaterial({ color: '#96b7a0', roughness: 1, bumpMap: knit, bumpScale: .015 });
  const shorts = new THREE.MeshStandardMaterial({ color: '#c99551', roughness: 1, bumpMap: knit, bumpScale: .012 });
  const pocket = new THREE.MeshStandardMaterial({ color: '#d8dfb4', roughness: 1, bumpMap: knit, bumpScale: .01 });

  function ball(parent: THREE.Object3D, material: THREE.Material, xyz: number[], scale: number[]) {
    const mesh = new THREE.Mesh(sphere, material);
    mesh.position.set(xyz[0], xyz[1], xyz[2]); mesh.scale.set(scale[0], scale[1], scale[2]);
    mesh.castShadow = true; mesh.receiveShadow = true; parent.add(mesh); return mesh;
  }
  function curve(parent: THREE.Object3D, points: number[][], radius: number, material: THREE.Material) {
    const path = new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p as [number, number, number])));
    const mesh = new THREE.Mesh(new THREE.TubeGeometry(path, 20, radius, 5, false), material);
    parent.add(mesh); return mesh;
  }
  // Tufts lie along the surface in the direction the fur grows (comb), slightly lifted,
  // like layered strands; without a comb they stand out radially for a cotton-ball tail.
  function fuzz(parent: THREE.Object3D, center: number[], radii: number[], count: number, skip?: (x: number, y: number, z: number) => boolean, comb?: THREE.Vector3) {
    const mesh = new THREE.InstancedMesh(tuftGeometry, fur, count);
    const dummy = new THREE.Object3D(); const normal = new THREE.Vector3(), flow = new THREE.Vector3(), side = new THREE.Vector3(), basis = new THREE.Matrix4();
    let used = 0;
    for (let i = 0; i < count; i++) {
      const y = 1 - (i + .5) / count * 2;
      const r = Math.sqrt(1 - y * y), angle = i * 2.399963;
      const x = Math.cos(angle) * r, z = Math.sin(angle) * r;
      if (skip?.(x, y, z)) continue;
      normal.set(x / radii[0], y / radii[1], z / radii[2]).normalize();
      const size = .014 + (Math.sin(i * 71.17) + 1) * .004;
      dummy.position.set(center[0] + x * radii[0], center[1] + y * radii[1], center[2] + z * radii[2]);
      if (comb) {
        flow.copy(comb).addScaledVector(normal, -comb.dot(normal));
        if (flow.lengthSq() < .01) flow.set(0, 0, 1).addScaledVector(normal, -normal.z);
        flow.normalize().addScaledVector(normal, .45).normalize();
        side.crossVectors(flow, normal).normalize();
        basis.makeBasis(side, flow, normal); dummy.quaternion.setFromRotationMatrix(basis);
        dummy.position.addScaledVector(flow, size * .9);
        dummy.scale.set(size * 1.25, size * 2.3, size * .55);
      } else {
        dummy.quaternion.setFromUnitVectors(up, normal);
        dummy.scale.set(size, size * 1.7, size * .85);
      }
      dummy.updateMatrix();
      mesh.setMatrixAt(used++, dummy.matrix);
    }
    mesh.count = used; mesh.instanceMatrix.needsUpdate = true;
    mesh.receiveShadow = true; mesh.frustumCulled = false; parent.add(mesh);
  }

  const body = new THREE.Group(); scene.add(body);
  const chest = ball(body, shirt, [0, .49, 0], [.43, .55, .31]);
  ball(body, shorts, [-.19, .015, .015], [.245, .24, .29]);
  ball(body, shorts, [.19, .015, .015], [.245, .24, .29]);
  ball(body, fur, [0, 1.02, 0], [.19, .21, .20]);
  const collarMesh = new THREE.Mesh(new THREE.TorusGeometry(.185, .038, 12, 36), collar);
  collarMesh.position.set(0, .965, .01); collarMesh.rotation.x = Math.PI / 2; body.add(collarMesh);
  ball(body, pocket, [0, .46, .307], [.13, .15, .023]);
  const leaf = ball(body, shirt, [.015, .48, .335], [.025, .063, .012]); leaf.rotation.z = -.35;
  curve(body, [[-.1, .56, .33], [0, .545, .339], [.1, .56, .33]], .005, collar);
  const tail = ball(body, fur, [.33, .17, -.25], [.23, .23, .23]);
  fuzz(tail, [0, 0, 0], [1, 1, 1], 100);

  const head = new THREE.Group(); head.position.set(0, 1.35, .015); body.add(head);
  ball(head, fur, [0, 0, 0], [.60, .555, .46]);
  fuzz(head, [0, 0, 0], [.60, .555, .46], 1100, (_x, y, z) => z > .65 && y < .5 && y > -.7, new THREE.Vector3(0, -1, -.35));
  // Separate rounded cheeks give the muzzle depth without obscuring the mouth.
  ball(head, muzzleMaterial, [-.145, -.19, .414], [.22, .16, .14]);
  ball(head, muzzleMaterial, [.145, -.19, .414], [.22, .16, .14]);
  const nose = ball(head, noseMaterial, [0, -.115, .558], [.083, .056, .055]); nose.rotation.z = Math.PI;
  curve(head, [[0, -.16, .565], [0, -.215, .566], [-.065, -.245, .55], [-.11, -.228, .54]], .009, mouthMaterial);
  curve(head, [[0, -.215, .566], [.065, -.245, .55], [.11, -.228, .54]], .009, mouthMaterial);
  const eyes: THREE.Group[] = [];
  const pupils: THREE.Mesh[] = [];
  for (const side of [-1, 1]) {
    const eye = new THREE.Group(); eye.position.set(side * .235, .075, .417); eye.rotation.y = side * .19; head.add(eye); eyes.push(eye);
    ball(eye, iris, [0, 0, 0], [.112, .146, .06]);
    pupils.push(ball(eye, pupil, [side * -.012, .005, .046], [.075, .106, .032]));
    ball(eye, glint, [-.029, .052, .074], [.028, .034, .014]);
    ball(eye, glint, [.031, -.035, .074], [.011, .013, .008]);
    curve(head, [[side * .15, .275, .40], [side * .235, .30, .397], [side * .31, .27, .37]], .012, mouthMaterial);
    for (let w = 0; w < 3; w++) curve(head, [[side * .29, -.18, .50], [side * .44, -.14 - w * .035, .49], [side * .59, -.10 - w * .075, .44]], .0035, mouthMaterial);
  }
  const ears: THREE.Group[] = [];
  const earTips: THREE.Group[] = [];
  for (const side of [-1, 1]) {
    const ear = new THREE.Group(); ear.position.set(side * .275, .425, -.025); head.add(ear); ears.push(ear);
    ball(ear, fur, [0, .40, 0], [.165, .50, .115]);
    ball(ear, pink, [0, .43, .096], [.104, .389, .034]);
    fuzz(ear, [0, .40, 0], [.165, .50, .115], 180, (x, _y, z) => z > .35 && Math.abs(x) < .8, new THREE.Vector3(0, 1, 0));
    const tip = new THREE.Group(); tip.position.y = .72; ear.add(tip); earTips.push(tip);
    ball(tip, fur, [0, .105, -.005], [.132, .23, .095]);
    ball(tip, pink, [0, .075, .075], [.077, .15, .025]);
  }

  const arms: Limb[] = [];
  for (const side of [-1, 1]) {
    const shoulder = new THREE.Group(); shoulder.position.set(side * .405, .79, .0); body.add(shoulder);
    ball(shoulder, fur, [0, -.18, 0], [.125, .235, .13]);
    ball(shoulder, shirt, [0, -.015, -.005], [.164, .18, .16]);
    const elbow = new THREE.Group(); elbow.position.y = -.34; shoulder.add(elbow);
    ball(elbow, fur, [0, -.13, 0], [.115, .205, .12]);
    const paw = ball(elbow, muzzleMaterial, [0, -.325, .025], [.139, .155, .135]);
    ball(paw, pink, [0, -.05, .90], [.32, .36, .12]);
    arms.push({ shoulder, elbow, paw });
  }
  const legs = [-1, 1].map(side => {
    const thigh = ball(scene, fur, [0, 0, 0], [.145, .22, .15]);
    const calf = ball(scene, fur, [0, 0, 0], [.12, .22, .13]);
    const knee = ball(scene, fur, [0, 0, 0], [.135, .135, .135]);
    // The foot pivots at the ball of the toes, so raising the heel keeps the toes planted.
    const foot = new THREE.Group(); scene.add(foot);
    ball(foot, fur, [0, .12, -.18], [.18, .125, .285]);
    for (let toe = -1; toe <= 1; toe++) curve(foot, [[toe * .067, .19, -.01], [toe * .067, .17, .05]], .004, mouthMaterial);
    return { side, thigh, calf, knee, foot };
  });

  // A soft toy ball held between the paws; its squash follows how hard the paws press.
  const ballTexture = toyBallTexture();
  const toyBall = new THREE.Mesh(sphere, new THREE.MeshStandardMaterial({ map: ballTexture, roughness: .55 }));
  toyBall.castShadow = true; toyBall.visible = false; scene.add(toyBall);
  // An elastic ring looped around both paws; it lengthens as the paws pull apart.
  const elastic = new THREE.Mesh(new THREE.TorusGeometry(1, .075, 12, 48), new THREE.MeshStandardMaterial({ color: '#d9584a', roughness: .45 }));
  elastic.castShadow = true; elastic.visible = false; scene.add(elastic);
  const pawL = new THREE.Vector3(), pawR = new THREE.Vector3();

  const ground = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), new THREE.ShadowMaterial({ opacity: .20 }));
  ground.rotation.x = -Math.PI / 2; ground.position.y = -.008; ground.receiveShadow = true; scene.add(ground);
  // A broad translucent contact shadow keeps the soles visually anchored on small screens.
  const contactTexture = shadowTexture();
  const contactMaterial = new THREE.MeshBasicMaterial({ map: contactTexture, transparent: true, depthWrite: false, opacity: .24 });
  const contact = new THREE.Mesh(new THREE.PlaneGeometry(1.7, 1.15), contactMaterial);
  contact.rotation.x = -Math.PI / 2; contact.position.y = -.004; scene.add(contact);

  const hip = new THREE.Vector3(), ankle = new THREE.Vector3(), direction = new THREE.Vector3(), bend = new THREE.Vector3(), kneePoint = new THREE.Vector3();
  function segment(mesh: THREE.Mesh, from: THREE.Vector3, to: THREE.Vector3, width: number) {
    direction.subVectors(to, from);
    mesh.position.copy(from).add(to).multiplyScalar(.5);
    mesh.quaternion.setFromUnitVectors(up, direction.clone().normalize());
    mesh.scale.set(width, direction.length() / 2 + .065, width);
  }
  function update(p: BunnyPose3D) {
    body.position.set(p.x, .85 + p.y, 0); body.rotation.set(p.pitch, .10 + p.turn, p.lean);
    // Volume-preserving squash and stretch around the hips.
    body.scale.set(1 + p.squash * .5, 1 - p.squash, 1 + p.squash * .5);
    chest.scale.set(.43 - p.belly * .3, .55 + p.breath + p.belly, .31 - p.belly * .3);
    head.rotation.set(p.headNod, p.headTurn, p.headTilt);
    eyes.forEach(eye => { eye.scale.y = p.blink; });
    pupils.forEach((pupilMesh, i) => { pupilMesh.position.x = (i ? -.012 : .012) + p.gazeX * .024; pupilMesh.position.y = .005 + p.gazeY * .022; });
    ears[0].rotation.set(p.earLag, 0, p.earL); ears[1].rotation.set(p.earLag * .82, 0, p.earR);
    earTips[0].rotation.x = p.earLag * .9 + p.earTip + .045; earTips[1].rotation.x = p.earLag * .75 + p.earTip * 1.15 + .025;
    tail.position.y = .17 + p.tail * .08; tail.rotation.set(p.tail * .6, 0, p.tail * .4);
    arms[0].shoulder.rotation.set(p.swingL, 0, p.armL); arms[1].shoulder.rotation.set(p.swingR, 0, p.armR);
    arms[0].elbow.rotation.set(p.flexL, 0, p.elbowL); arms[1].elbow.rotation.set(p.flexR, 0, p.elbowR);
    // Open paws spread wide and flat; a fist is smaller and rounder.
    // Open paws turn their palms outward (more so the higher the forearm is raised); fists curl in.
    arms.forEach((arm, i) => {
      const g = i ? p.gripR : p.gripL, flex = i ? p.flexR : p.flexL;
      arm.paw.scale.set(.139 * (1.1 - g * .22), .155 * (1.06 - g * .2), .135 * (.94 + g * .1));
      arm.paw.rotation.x = Math.min(1, -flex / 1.75) * (1.5 - g * 1.9);
    });
    body.updateMatrixWorld(true);
    toyBall.visible = p.ball > .02; elastic.visible = p.ring > .02;
    if (toyBall.visible || elastic.visible) { arms[0].paw.getWorldPosition(pawL); arms[1].paw.getWorldPosition(pawR); }
    if (elastic.visible) {
      const half = pawL.distanceTo(pawR) / 2 + .06;
      elastic.position.copy(pawL).add(pawR).multiplyScalar(.5); elastic.position.z += .05;
      elastic.scale.set(half * p.ring, Math.max(.08, .26 - half * .25) * p.ring, p.ring);
      elastic.rotation.set(0, body.rotation.y, Math.atan2(pawR.y - pawL.y, pawR.x - pawL.x));
    }
    if (toyBall.visible) {
      const gap = Math.max(.1, pawL.distanceTo(pawR) / 2 - .115), radius = .27 * p.ball;
      const across = Math.min(radius, gap * p.ball), bulge = radius + (radius - across) * .6;
      toyBall.position.copy(pawL).add(pawR).multiplyScalar(.5); toyBall.position.z += .03;
      toyBall.scale.set(across, bulge, bulge); toyBall.rotation.set(.3, body.rotation.y, 0);
    }
    for (const leg of legs) {
      const left = leg.side < 0;
      hip.set(leg.side * .215, .0, .015).applyMatrix4(body.matrixWorld);
      const fx = left ? p.footLX : p.footRX, fy = left ? p.footLY : p.footRY, fz = left ? p.footLZ : p.footRZ;
      leg.foot.position.set(fx, fy, fz + .3);
      leg.foot.rotation.set(left ? p.heelL : p.heelR, leg.side * .07, 0);
      leg.foot.updateMatrix();
      ankle.set(0, .17, -.3).applyMatrix4(leg.foot.matrix);
      direction.subVectors(ankle, hip);
      const distance = Math.min(direction.length(), .759);
      direction.normalize();
      bend.set(0, 0, 1).addScaledVector(direction, -direction.z).normalize();
      const kneeOffset = Math.sqrt(Math.max(0, .38 * .38 - distance * distance / 4));
      kneePoint.copy(hip).add(ankle).multiplyScalar(.5).addScaledVector(bend, kneeOffset);
      leg.knee.position.copy(kneePoint);
      segment(leg.thigh, hip, kneePoint, .14); segment(leg.calf, kneePoint, ankle, .12);
    }
    const airborne = Math.max(0, Math.min(p.footLY, p.footRY));
    contact.position.x = p.x; contact.scale.setScalar(1 - airborne * 1.1 + Math.max(0, -p.y) * .4);
    contactMaterial.opacity = Math.max(.06, .24 - airborne * .5);
  }
  function resize(width: number, height: number) {
    renderer.setSize(width, height, false);
    const viewHeight = 4.65;
    camera.left = -viewHeight * width / height / 2; camera.right = -camera.left;
    camera.top = viewHeight / 2; camera.bottom = -viewHeight / 2;
    camera.updateProjectionMatrix();
  }
  return {
    update, resize, render: () => renderer.render(scene, camera),
    dispose() {
      const geometries = new Set<THREE.BufferGeometry>(); const materials = new Set<THREE.Material>();
      scene.traverse(object => {
        if (object instanceof THREE.Mesh) {
          geometries.add(object.geometry);
          (Array.isArray(object.material) ? object.material : [object.material]).forEach(m => materials.add(m));
          if (object instanceof THREE.InstancedMesh) object.dispose();
        }
      });
      geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose());
      knit.dispose(); contactTexture.dispose(); ballTexture.dispose(); key.shadow.map?.dispose(); renderer.dispose(); renderer.forceContextLoss();
    },
  };
}

function knitTexture() {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#898989'; ctx.fillRect(0, 0, 128, 128);
  ctx.strokeStyle = '#b1b1b1'; ctx.lineWidth = 1.6;
  for (let y = 0; y < 132; y += 8) for (let x = 0; x < 132; x += 7) {
    ctx.beginPath(); ctx.moveTo(x - 2, y - 4); ctx.quadraticCurveTo(x - 2, y, x, y + 2); ctx.quadraticCurveTo(x + 2, y, x + 2, y - 4); ctx.stroke();
  }
  const texture = new THREE.CanvasTexture(canvas); texture.wrapS = texture.wrapT = THREE.RepeatWrapping; texture.repeat.set(3, 3); return texture;
}
function toyBallTexture() {
  const canvas = document.createElement('canvas'); canvas.width = 128; canvas.height = 64;
  const ctx = canvas.getContext('2d')!; ctx.fillStyle = '#f4be55'; ctx.fillRect(0, 0, 128, 64);
  ctx.fillStyle = '#e48b57'; for (const x of [14, 46, 78, 110]) ctx.fillRect(x, 0, 7, 64);
  const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; return texture;
}
function shadowTexture() {
  const canvas = document.createElement('canvas'); canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!; const gradient = ctx.createRadialGradient(32, 32, 1, 32, 32, 32);
  gradient.addColorStop(0, '#44523de6'); gradient.addColorStop(.4, '#44523d70'); gradient.addColorStop(1, '#44523d00');
  ctx.fillStyle = gradient; ctx.fillRect(0, 0, 64, 64); return new THREE.CanvasTexture(canvas);
}
