import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// AI artwork is only for banners and captions: block covers, game-element covers, the onboarding hero and
// empty-state captions. Exercises and drills never use a still: they show a real movement clip when one
// exists (docs/VIDEO-REFERENCE.md), otherwise the animated figure. Roles use an icon. Names follow docs/image-prompts.md.
const byName = (files: Record<string, string>) => new Map(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]));
const images = byName(import.meta.glob<string>(['../assets/images/block-*.webp', '../assets/images/element-*.webp', '../assets/images/onboarding-*.webp', '../assets/images/empty-*.webp'], { eager: true, query: '?url', import: 'default' }));
const videos = byName(import.meta.glob<string>(['../assets/videos/block-*.mp4', '../assets/videos/element-*.mp4', '../assets/videos/onboarding-*.mp4', '../assets/videos/empty-*.mp4', '../assets/videos/ex-*.mp4', '../assets/videos/drill-*.mp4'], { eager: true, query: '?url', import: 'default' }));

// Who filmed each movement clip. CC BY clips must keep this credit wherever they are shown.
const CC_BY = 'CC BY';
const VIDEO_CREDITS: Record<string, { author: string; url: string; license: string }> = {
  'ex-box-jump': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-split-jump': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-squat-jump': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-rotation-jump': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-skater': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-tuck-jump': { author: 'Pexels', url: 'https://www.pexels.com/video/6156132/', license: 'Pexels License' },
  'ex-single-hop': { author: 'Lance Goyke', url: 'https://youtu.be/hKhx9HOlWOk', license: CC_BY },
  'ex-depth-vertical': { author: 'Melissa Witmer', url: 'https://youtu.be/dIgxJ9mgR28', license: CC_BY },
  'ex-medball-jump': { author: 'Coach Bobby Bluford', url: 'https://youtu.be/bYk0bRfUeBU', license: CC_BY },
  'ex-ankle-hops': { author: '2sport4life', url: 'https://youtu.be/hP0O3gz_dlQ', license: CC_BY },
  // Same clip as ex-depth-vertical: the drop and rebound are the movement being taught.
  'ex-depth-jump-low': { author: 'Melissa Witmer', url: 'https://youtu.be/dIgxJ9mgR28', license: CC_BY },
  'ex-jump-rope': { author: 'Pexels', url: 'https://www.pexels.com/video/5272784/', license: 'Pexels License' },
  'ex-hurdle-hops': { author: 'Pexels', url: 'https://www.pexels.com/video/36205142/', license: 'Pexels License' },
  'ex-approach-jump': { author: 'Pexels', url: 'https://www.pexels.com/video/6216857/', license: 'Pexels License' },
  'drill-approach-attack': { author: 'Pexels', url: 'https://www.pexels.com/video/6216849/', license: 'Pexels License' },
  'drill-static-block': { author: 'Pexels', url: 'https://www.pexels.com/video/6179958/', license: 'Pexels License' },
  'drill-set-jump': { author: 'Pexels', url: 'https://www.pexels.com/video/6217342/', license: 'Pexels License' },
  'drill-dig-hops': { author: 'Pexels', url: 'https://www.pexels.com/video/6217342/', license: 'Pexels License' },
  // Close stand-ins until the team films these moves (docs/VIDEO-REFERENCE.md says what each one shows).
  'ex-lateral-box': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-bounds': { author: 'Redefining Strength', url: 'https://redefiningstrength.com', license: '©' },
  'ex-line-hops': { author: 'Change Your Body Boot Camps', url: 'https://youtu.be/2R7Gc-fOD4c', license: CC_BY },
  'ex-broad-jump': { author: 'THP - Total Health Performance', url: 'https://youtu.be/wBZrsdbE3bI', license: CC_BY },
  'ex-landing': { author: 'Melissa Witmer', url: 'https://youtu.be/dIgxJ9mgR28', license: CC_BY },
  'ex-reactive-drop': { author: 'Melissa Witmer', url: 'https://youtu.be/dIgxJ9mgR28', license: CC_BY },
  'drill-tuck-serve': { author: 'Pexels', url: 'https://www.pexels.com/video/6216961/', license: 'Pexels License' },
  'drill-triple-block': { author: 'Pexels', url: 'https://www.pexels.com/video/6179958/', license: 'Pexels License' },
  'drill-double-attack': { author: 'Pexels', url: 'https://www.pexels.com/video/6216849/', license: 'Pexels License' },
  // Joined from two sources, so both creators are named.
  'drill-depth-attack': { author: 'Melissa Witmer & Pexels', url: 'https://youtu.be/dIgxJ9mgR28', license: `${CC_BY} · Pexels License` },
  'drill-shuffle-block': { author: 'Lance Goyke & Pexels', url: 'https://youtu.be/SEzlqzNqG_Q', license: `${CC_BY} · Pexels License` },
};

/** Source line under a movement clip; renders nothing when the clip is missing or needs no credit. */
export function VideoCredit({ name }: { name: string }) {
  const credit = VIDEO_CREDITS[name];
  if (!credit || !videos.has(name)) return null;
  return (
    <p className="credit">
      Video: <a href={credit.url} target="_blank" rel="noreferrer">{credit.author}</a> · {credit.license}
    </p>
  );
}

// Where to keep the subject when an image is cropped by object-fit / background-size: cover.
const FOCUS: Record<string, string> = { 'block-3': '50% 30%', 'block-4': '50% 0%' };

export function artUrl(name: string): string | undefined {
  return images.get(name);
}

export function artFocus(name: string): string | undefined {
  return FOCUS[name];
}

const prefersReducedMotion = () => typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Shows the generated video when it exists, then the still image, otherwise the fallback
 * (usually the animated figure).
 */
export function Artwork({ name, alt, fallback, className = '' }: { name: string; alt: string; fallback?: ReactNode; className?: string }) {
  const [videoFailed, setVideoFailed] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const video = videos.get(name);
  const image = images.get(name);
  const focus = artFocus(name);
  const style = focus ? { objectPosition: focus } : undefined;

  if (video && !videoFailed && !(image && prefersReducedMotion())) {
    return <LoopVideo src={video} poster={image} label={alt} className={`art ${className}`} style={style} onError={() => setVideoFailed(true)} />;
  }
  if (!image || imageFailed) return <>{fallback}</>;
  return <img className={`art ${className}`} src={image} alt={alt} loading="lazy" decoding="async" style={style} onError={() => setImageFailed(true)} />;
}

/** Muted, looping clip that only plays while on screen, to save battery on long pages. */
function LoopVideo({ src, poster, label, className, style, onError }: { src: string; poster?: string; label: string; className: string; style?: CSSProperties; onError: () => void }) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video || prefersReducedMotion()) return;
    video.muted = true;
    const observer = new IntersectionObserver(([entry]) => (entry.isIntersecting ? video.play().catch(() => {}) : video.pause()), { threshold: 0.25 });
    observer.observe(video);
    return () => observer.disconnect();
  }, [src]);

  return <video ref={ref} className={className} src={src} poster={poster} muted loop playsInline preload="metadata" aria-label={label} style={style} onError={onError} />;
}
