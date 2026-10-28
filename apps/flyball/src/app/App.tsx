import { ChartLine, Layers, Ruler, Users, Volleyball, Zap } from 'lucide-react';
import { useEffect } from 'react';
import { useAppState, useAthlete } from '../core/store.ts';
import { HomePage } from '../features/home/HomePage.tsx';
import { GamePage } from '../features/game/GamePage.tsx';
import { MetricsPage } from '../features/metrics/MetricsPage.tsx';
import { MonitoringPage } from '../features/monitoring/MonitoringPage.tsx';
import { Onboarding } from '../features/onboarding/Onboarding.tsx';
import { SessionRunner } from '../features/session/SessionRunner.tsx';
import { TeamPage } from '../features/team/TeamPage.tsx';
import { ConfirmHost } from '../ui/confirm.tsx';
import { DetailPage } from '../features/training/DetailPage.tsx';
import { TrainingPage } from '../features/training/TrainingPage.tsx';
import { href, useRoute, type Route } from './router.ts';

const TABS: { route: Route; label: string; icon: typeof Zap; match: Route['name'][] }[] = [
  { route: { name: 'home' }, label: 'Bugun', icon: Zap, match: ['home'] },
  { route: { name: 'training' }, label: 'Mashqlar', icon: Layers, match: ['training', 'exercise'] },
  { route: { name: 'game' }, label: 'O‘yin', icon: Volleyball, match: ['game', 'drill'] },
  { route: { name: 'metrics' }, label: 'Ko‘rsatkich', icon: Ruler, match: ['metrics'] },
  { route: { name: 'monitoring' }, label: 'Monitoring', icon: ChartLine, match: ['monitoring'] },
];

export function App() {
  const state = useAppState();
  const ctx = useAthlete();
  const route = useRoute();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [route.name, 'id' in route ? route.id : '']);

  if (!state.role || !ctx) return <Onboarding />;

  if (route.name === 'run-plyo' || route.name === 'run-game') {
    return (
      <div className="app app--focus">
        <SessionRunner key={href(route)} route={route} ctx={ctx} />
        <ConfirmHost />
      </div>
    );
  }

  return (
    <div className="app">
      <div className="topbar">
        <a className="brand" href="#/" aria-label="Flyball bosh sahifa">
          <span className="brand__mark" aria-hidden>
            <Volleyball size={18} strokeWidth={2.5} />
          </span>
          FLYBALL
        </a>
        <a className="athlete-chip" href={href({ name: 'team' })}>
          <span className="athlete-chip__avatar">{ctx.athlete.name.slice(0, 1).toUpperCase()}</span>
          <span className="athlete-chip__name">{ctx.athlete.name}</span>
          {state.role === 'coach' && <Users size={16} />}
        </a>
      </div>
      <main className="page">{renderPage(route, ctx)}</main>
      <nav className="tabbar" aria-label="Asosiy bo‘limlar">
        {TABS.map(({ route: r, label, icon: Icon, match }) => {
          const active = match.includes(route.name);
          return (
            <a key={label} href={href(r)} className={active ? 'is-active' : ''} aria-current={active ? 'page' : undefined}>
              <Icon size={21} strokeWidth={active ? 2.5 : 2} />
              <span>{label}</span>
            </a>
          );
        })}
      </nav>
      <ConfirmHost />
    </div>
  );
}

function renderPage(route: Route, ctx: NonNullable<ReturnType<typeof useAthlete>>) {
  switch (route.name) {
    case 'training': return <TrainingPage ctx={ctx} />;
    case 'exercise': return <DetailPage kind="exercise" id={route.id} ctx={ctx} />;
    case 'game': return <GamePage ctx={ctx} />;
    case 'drill': return <DetailPage kind="drill" id={route.id} ctx={ctx} />;
    case 'metrics': return <MetricsPage ctx={ctx} />;
    case 'monitoring': return <MonitoringPage ctx={ctx} />;
    case 'team': return <TeamPage />;
    default: return <HomePage ctx={ctx} />;
  }
}
