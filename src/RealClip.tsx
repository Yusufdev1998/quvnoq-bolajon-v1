import { useEffect, useRef } from 'react';
import type { Step } from './data';

// Short clips of real children doing a movement, shown beside the bunny. Named pose-<pose> or motor-<activity id>;
// a step without a matching file just shows the bunny.
const clips = Object.fromEntries(
  Object.entries(import.meta.glob<string>('./assets/clips/*.mp4', { eager: true, query: '?url', import: 'default' }))
    .map(([path, url]) => [path.split('/').pop()!.replace('.mp4', ''), url]),
);

// Every clip comes from Pexels (free licence, no attribution required); the source is still linked.
const PEXELS_IDS: Record<string, number> = {
  'pose-wave': 8160271, 'pose-reach': 6952686, 'pose-jump': 6481510, 'pose-balance': 8046717, 'pose-cooldown': 6952629,
  'pose-dance': 8385588, 'pose-celebrate': 8813224, 'pose-wings': 6202769, 'pose-run': 8088664,
  'motor-squeeze': 25950159, 'motor-clay': 8160131,
};

export const clipName = (step: Step) => step.clip ?? `pose-${step.pose}`;

export function RealClip({ step, paused, reducedMotion }: { step: Step; paused: boolean; reducedMotion: boolean }) {
  const name = clipName(step);
  const src = clips[name];
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;
    if (paused || reducedMotion) video.pause();
    else video.play().catch(() => {});
  }, [paused, reducedMotion, src]);

  if (!src) return null;
  return <div className="real-clip">
    {/* #t=0.5 shows a real frame instead of a blank box when the clip does not autoplay. */}
    <video ref={ref} src={`${src}#t=0.5`} muted loop playsInline preload="metadata" aria-label={`Bolajon harakatni bajarmoqda: ${step.title}`} />
    <div>
      <strong>Bolajonlar shunday bajaradi</strong>
      <small>Quyonchani kuzating yoki haqiqiy bolalardan o‘rganing.</small>
      {PEXELS_IDS[name] && <a href={`https://www.pexels.com/video/${PEXELS_IDS[name]}/`} target="_blank" rel="noreferrer">Video: Pexels</a>}
    </div>
  </div>;
}
