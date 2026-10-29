import type { Motion } from '../domain/types.ts';

const ARMS_UP: Motion[] = ['block', 'approach', 'throw'];

/** A stylised volleyball player looping the movement of an exercise. */
export function AthleteMotion({ motion, label }: { motion: Motion; label: string }) {
  const armsUp = ARMS_UP.includes(motion);
  const net = motion === 'block' || motion === 'approach';
  return (
    <svg className={`motion motion--${motion}`} viewBox="0 0 240 170" role="img" aria-label={`Mashq harakatining namunasi: ${label}`}>
      <defs>
        <pattern id="mesh" width="6" height="6" patternUnits="userSpaceOnUse">
          <path d="M0 0L6 6M6 0L0 6" stroke="currentColor" strokeWidth="0.6" opacity="0.5" />
        </pattern>
      </defs>
      <line className="motion__floor" x1="8" x2="232" y1="150" y2="150" />
      <line className="motion__court" x1="40" x2="40" y1="150" y2="156" />
      <line className="motion__court" x1="200" x2="200" y1="150" y2="156" />
      {net && (
        <g className="motion__net">
          <line x1="206" x2="206" y1="40" y2="150" />
          <rect x="201" y="44" width="10" height="34" fill="url(#mesh)" />
        </g>
      )}
      {motion === 'depth' && <rect className="motion__box" x="28" y="120" width="56" height="30" rx="4" />}
      {motion === 'box' && <rect className="motion__box" x="150" y="120" width="56" height="30" rx="4" />}
      <ellipse className="motion__shadow" cx="120" cy="151" rx="16" ry="3" />
      <g className="motion__fig">
        <path className="motion__hair" d="M113 56c-6 2-9 8-8 15 3-3 5-6 7-9" />
        <circle className="motion__head" cx="120" cy="62" r="9" />
        <line className="motion__limb motion__limb--leg" x1="120" y1="106" x2="112" y2="146" />
        <line className="motion__limb motion__limb--leg motion__limb--back" x1="120" y1="106" x2="129" y2="146" />
        <line className="motion__torso" x1="120" y1="74" x2="120" y2="106" />
        {armsUp ? (
          <>
            <line className="motion__limb" x1="120" y1="80" x2="109" y2="50" />
            <line className="motion__limb motion__limb--back" x1="120" y1="80" x2="131" y2="50" />
          </>
        ) : (
          <>
            <line className="motion__limb" x1="120" y1="80" x2="105" y2="100" />
            <line className="motion__limb motion__limb--back" x1="120" y1="80" x2="135" y2="100" />
          </>
        )}
      </g>
      {(motion === 'throw' || motion === 'approach') && <circle className="motion__ball" cx="120" cy="40" r="8" />}
    </svg>
  );
}
