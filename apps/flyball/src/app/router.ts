import { useSyncExternalStore } from 'react';
import type { BlockId, GameElement } from '../domain/types.ts';

export type Route =
  | { name: 'home' }
  | { name: 'training' }
  | { name: 'exercise'; id: string }
  | { name: 'game' }
  | { name: 'drill'; id: string }
  | { name: 'run-plyo'; block?: BlockId }
  | { name: 'run-game'; element: GameElement }
  | { name: 'metrics' }
  | { name: 'monitoring' }
  | { name: 'team' };

export function parseHash(hash: string): Route {
  const [a, b] = hash.replace(/^#\/?/, '').split('/').map(decodeURIComponent);
  switch (a) {
    case 'mashqlar':
      return b ? { name: 'exercise', id: b } : { name: 'training' };
    case 'oyin':
      return b ? { name: 'drill', id: b } : { name: 'game' };
    case 'boshlash': {
      const n = Number(b);
      return n >= 1 && n <= 4 ? { name: 'run-plyo', block: n as BlockId } : { name: 'run-plyo' };
    }
    case 'oyin-mashgulot':
      return b === 'sakrash' || b === 'hujum' || b === 'blok' ? { name: 'run-game', element: b } : { name: 'game' };
    case 'korsatkichlar':
      return { name: 'metrics' };
    case 'monitoring':
      return { name: 'monitoring' };
    case 'jamoa':
      return { name: 'team' };
    default:
      return { name: 'home' };
  }
}

export function href(route: Route): string {
  switch (route.name) {
    case 'home': return '#/';
    case 'training': return '#/mashqlar';
    case 'exercise': return `#/mashqlar/${route.id}`;
    case 'game': return '#/oyin';
    case 'drill': return `#/oyin/${route.id}`;
    case 'run-plyo': return route.block ? `#/boshlash/${route.block}` : '#/boshlash';
    case 'run-game': return `#/oyin-mashgulot/${route.element}`;
    case 'metrics': return '#/korsatkichlar';
    case 'monitoring': return '#/monitoring';
    case 'team': return '#/jamoa';
  }
}

export function navigate(route: Route) {
  window.location.hash = href(route);
}

function subscribe(listener: () => void) {
  window.addEventListener('hashchange', listener);
  return () => window.removeEventListener('hashchange', listener);
}

export function useRoute(): Route {
  const hash = useSyncExternalStore(subscribe, () => window.location.hash);
  return parseHash(hash);
}
