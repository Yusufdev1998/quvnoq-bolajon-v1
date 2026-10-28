import { useState, type ReactNode } from 'react';

// Every image in assets/images is picked up at build time; names follow docs/image-prompts.md.
const files = import.meta.glob<string>('../assets/images/*.webp', { eager: true, query: '?url', import: 'default' });
const urls = new Map(Object.entries(files).map(([path, url]) => [path.split('/').pop()!.replace('.webp', ''), url]));

// Where to keep the subject when an image is cropped by object-fit / background-size: cover.
const FOCUS: Record<string, string> = { 'block-3': '50% 22%', 'block-4': '50% 28%' };

export function artUrl(name: string): string | undefined {
  return urls.get(name);
}

export function artFocus(name: string): string | undefined {
  return FOCUS[name];
}

/** Shows the generated artwork when it exists, otherwise the fallback (usually the animated figure). */
export function Artwork({ name, alt, fallback, className = '' }: { name: string; alt: string; fallback?: ReactNode; className?: string }) {
  const [failed, setFailed] = useState(false);
  const url = artUrl(name);
  if (!url || failed) return <>{fallback}</>;
  const focus = artFocus(name);
  return (
    <img
      className={`art ${className}`}
      src={url}
      alt={alt}
      loading="lazy"
      decoding="async"
      style={focus ? { objectPosition: focus } : undefined}
      onError={() => setFailed(true)}
    />
  );
}
