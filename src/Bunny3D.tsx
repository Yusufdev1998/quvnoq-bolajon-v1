import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { Step } from './data';
import { Bunny } from './Illustrations';
import { createBunnyScene } from './bunnyScene3d';
import { blendBunnyPoses, createSecondaryMotion, sampleBunnyMotion, transitionSeconds } from './bunnyMotion3d';

const RiveFallback = lazy(() => import('./RiveBunny'));
type Props = { pose: Step['pose']; paused: boolean; reducedMotion: boolean; onMotionChange: (moving: boolean) => void; onReadyChange: (ready: boolean) => void };

export default function Bunny3D(props: Props) {
  const host = useRef<HTMLDivElement>(null);
  const latest = useRef(props); latest.current = props;
  const [status, setStatus] = useState<'loading' | 'ready' | 'fallback'>('loading');
  useEffect(() => {
    // A fresh canvas per mount: a canvas whose WebGL context was released on unmount
    // (as React StrictMode does once in development) can never create a renderer again.
    const element = document.createElement('canvas');
    element.setAttribute('role', 'img');
    element.setAttribute('aria-label', 'Harakatlarni ko‘rsatayotgan uch o‘lchamli quyoncha');
    host.current!.appendChild(element);
    const secondary = createSecondaryMotion();
    let scene: ReturnType<typeof createBunnyScene> | undefined;
    let frame = 0, lastTime = 0, elapsed = 0, transition = 1;
    let action = latest.current.pose;
    let current = sampleBunnyMotion(action, 0), from = current, shown = current;
    let disposed = false, dirty = true, announcedReady = false, wasReduced = latest.current.reducedMotion;
    const fail = () => {
      if (disposed) return;
      cancelAnimationFrame(frame); resize.disconnect();
      element.removeEventListener('webglcontextlost', contextLost);
      scene?.dispose(); scene = undefined;
      latest.current.onReadyChange(false); latest.current.onMotionChange(false); setStatus('fallback');
    };
    const contextLost = (event: Event) => { event.preventDefault(); fail(); };
    element.addEventListener('webglcontextlost', contextLost);
    const resize = new ResizeObserver(entries => {
      const bounds = entries[0].contentRect;
      if (bounds.width > 0 && bounds.height > 0 && scene) { scene.resize(bounds.width, bounds.height); dirty = true; }
    });
    try {
      scene = createBunnyScene(element);
      const bounds = element.getBoundingClientRect(); scene.resize(Math.max(1, bounds.width), Math.max(1, bounds.height));
      resize.observe(element);
      const tick = (time: number) => {
        if (disposed || !scene) return;
        const dt = lastTime ? Math.min(.05, (time - lastTime) / 1000) : 0; lastTime = time;
        const { pose, paused, reducedMotion } = latest.current;
        if (reducedMotion !== wasReduced) { wasReduced = reducedMotion; dirty = true; }
        if (pose !== action) { from = current; action = pose; elapsed = 0; transition = 0; dirty = true; }
        // Still poses keep breathing and blinking; only the reduced-motion view is fully static.
        if (!paused && !reducedMotion && !document.hidden) {
          elapsed += dt; transition = Math.min(1, transition + dt / transitionSeconds(action));
          current = blendBunnyPoses(from, sampleBunnyMotion(action, elapsed), transition);
          shown = secondary.apply(current, dt);
          dirty = true;
        }
        if (reducedMotion) { current = shown = sampleBunnyMotion(action, 0); secondary.reset(); }
        if (dirty) {
          try { scene.update(shown); scene.render(); } catch { fail(); return; }
          dirty = false;
          if (!announcedReady) { announcedReady = true; setStatus('ready'); }
        }
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    } catch { fail(); }
    return () => {
      disposed = true; cancelAnimationFrame(frame); resize.disconnect();
      element.removeEventListener('webglcontextlost', contextLost);
      latest.current.onReadyChange(false); latest.current.onMotionChange(false); scene?.dispose(); element.remove();
    };
  }, []);
  useEffect(() => {
    if (status === 'fallback') return;
    props.onReadyChange(status === 'ready');
    props.onMotionChange(status === 'ready' && !props.paused && !props.reducedMotion && props.pose !== 'still');
  }, [status, props.pose, props.paused, props.reducedMotion, props.onReadyChange, props.onMotionChange]);

  if (status === 'fallback') return <Suspense fallback={<div className="rive-bunny static-bunny"><Bunny pose={props.pose} /></div>}><RiveFallback {...props} /></Suspense>;
  return <div ref={host} className="bunny-3d" data-character-status={status} data-motion={props.pose} data-playback={props.paused ? 'paused' : props.reducedMotion ? 'still' : 'playing'}>
    {status === 'loading' && <span className="character-loading" role="status">Quyoncha tayyorlanyapti…</span>}
  </div>;
}
