import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';

// AI artwork is only for banners and captions: block covers, game-element covers, the onboarding hero and
// empty-state captions. Exercises and drills never use a still: they show a real movement clip when one
// exists (docs/VIDEO-REFERENCE.md), otherwise the animated figure. Roles use an icon. Names follow docs/image-prompts.md.
const byName = (files: Record<string, string>) => new Map(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace(/\.\w+$/, ''), url]));
const images = byName(import.meta.glob<string>(['../assets/images/block-*.webp', '../assets/images/element-*.webp', '../assets/images/onboarding-*.webp', '../assets/images/empty-*.webp'], { eager: true, query: '?url', import: 'default' }));
const videos = byName(import.meta.glob<string>(['../assets/videos/block-*.mp4', '../assets/videos/element-*.mp4', '../assets/videos/onboarding-*.mp4', '../assets/videos/empty-*.mp4', '../assets/videos/ex-*.mp4', '../assets/videos/drill-*.mp4'], { eager: true, query: '?url', import: 'default' }));

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
