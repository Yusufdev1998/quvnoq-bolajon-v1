import { useEffect, useState } from 'react';

export function useReducedMotion(preference: boolean): boolean {
  const [system, setSystem] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setSystem(media.matches);
    media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  return preference || system;
}
