import { useEffect, useState } from 'react';
import { Alignment, Fit, Layout, RuntimeLoader, useRive, useViewModelInstanceNumber } from '@rive-app/react-canvas';
import wasmUrl from '@rive-app/canvas/rive.wasm?url';
import fallbackWasmUrl from '@rive-app/canvas/rive_fallback.wasm?url';
import { Bunny } from './Illustrations';
import type { Step } from './data';
import { BUNNY_ASSET, BUNNY_STATE_MACHINE, bunnyAction } from './riveMotion';
import { useReducedMotion } from './useReducedMotion';

// Serve both runtimes locally, including after the web build is packaged with Capacitor.
RuntimeLoader.setWasmUrl(wasmUrl);
RuntimeLoader.setWasmFallbackUrl(fallbackWasmUrl);
const layout = new Layout({ fit: Fit.Contain, alignment: Alignment.BottomCenter });

type Props = { pose: Step['pose']; paused: boolean; reducedMotion: boolean; onMotionChange: (moving: boolean) => void; onReadyChange: (ready: boolean) => void };

export default function RiveBunny(props: Props) {
  const reduced = useReducedMotion(props.reducedMotion);
  useEffect(() => {
    if (reduced) { props.onMotionChange(false); props.onReadyChange(false); }
  }, [reduced, props.onMotionChange, props.onReadyChange]);

  if (reduced) {
    return <div className="rive-bunny static-bunny" data-rive-status="reduced-motion"><Bunny pose={props.pose} /></div>;
  }
  return <RivePlayback pose={props.pose} paused={props.paused} onMotionChange={props.onMotionChange} onReadyChange={props.onReadyChange} />;
}

function RivePlayback({ pose, paused, onMotionChange, onReadyChange }: Pick<Props, 'pose' | 'paused' | 'onMotionChange' | 'onReadyChange'>) {
  const [failed, setFailed] = useState(false);
  const { rive, RiveComponent } = useRive({
    src: BUNNY_ASSET,
    artboard: 'QuvnoqBunny',
    stateMachine: BUNNY_STATE_MACHINE,
    layout,
    autoBind: true,
    autoplay: false,
    shouldDisableRiveListeners: true,
    onLoadError: () => setFailed(true),
  });
  const { setValue } = useViewModelInstanceNumber('action', rive?.viewModelInstance);
  const action = bunnyAction(pose);

  useEffect(() => {
    onReadyChange(!!rive && !failed);
    return () => onReadyChange(false);
  }, [rive, failed, onReadyChange]);

  useEffect(() => {
    onMotionChange(!!rive && !failed && !paused && action !== 0);
    return () => onMotionChange(false);
  }, [rive, failed, paused, action, onMotionChange]);

  useEffect(() => { if (rive) setValue(action); }, [rive, setValue, action]);
  useEffect(() => {
    if (!rive) return;
    if (paused) rive.pause(); else rive.play(BUNNY_STATE_MACHINE);
  }, [rive, paused]);
  useEffect(() => {
    if (rive || failed) return;
    const timer = setTimeout(() => setFailed(true), 12000);
    return () => clearTimeout(timer);
  }, [rive, failed]);

  if (failed) return <div className="rive-bunny static-bunny" data-rive-status="error"><Bunny pose={pose} /><span className="animation-fallback-note" role="status">Animatsiya ochilmadi. Ko‘rsatma bo‘yicha davom eting.</span></div>;

  const label = ['Quyoncha to‘xtab dam olyapti', 'Quyoncha sekin sakrayapti', 'Quyoncha qo‘llarini ko‘tarib tushiryapti', 'Quyoncha qo‘l silkib salomlashyapti', 'Quyoncha yon tomonga qadam tashlayapti', 'Quyoncha raqs tushyapti', 'Quyoncha yutuqni nishonlayapti', 'Quyoncha qanotlarini yozib-yig‘yapti'][action];
  return <div className="rive-bunny" data-rive-status={rive ? 'ready' : 'loading'} data-motion={action} data-playback={paused ? 'paused' : 'playing'}>
    {!rive && <div className="rive-loading"><Bunny pose={pose} /><span role="status">Quyoncha tayyorlanyapti…</span></div>}
    <RiveComponent role="img" aria-label={label} className={rive ? 'rive-canvas' : 'rive-canvas is-loading'} />
  </div>;
}
