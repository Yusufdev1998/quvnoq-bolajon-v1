# Flyball

A mobile-first Uzbek app for young female volleyball players and their coaches: plyometric training in four method blocks, load individualised from each athlete's measurements, plyometrics combined with game elements, and monitoring. Built from the Flyball referat. It is a standalone app with its own design and architecture, independent of Quvnoq bolajon in the repository root.

## Run locally

Requires Node.js 22.18 or later.

```sh
cd apps/flyball
npm install
npm run dev
```

Open http://localhost:5174.

```sh
npm test
npm run build
```

## Sections

1. **Plyometrik mashqlar** — 20 exercises in four blocks: moslashtiruvchi, rivojlantiruvchi, modifikatsiyalovchi, takomillashtiruvchi. A block unlocks after the previous one is mastered: at least 6 sessions, with a technique average of 4+ over the last 3.
2. **Individual ko‘rsatkichlar** — anthropometric (height, weight, standing reach), morpho-functional (resting pulse, Rufier index) and physical tests (vertical jump, attack reach, long jump, 6×5 m shuttle). They set the athlete's load profile: level, foot-contact budget per session, rep and rest factors, and maximum box height.
3. **O‘yin elementlari** — 9 drills that pair a plyometric exercise with a jump, an attack hit or a block. Each opens from a given block.
4. **Monitoring** — session log (foot contacts, session RPE × minutes), weekly charts, acute:chronic workload ratio, metric trends, team overview, coach recommendations and CSV export.

A guided session runner plans each workout within the contact budget, times rest between sets, and records RPE and technique at the end.

Two roles: a coach (several athletes) or an athlete (self-training). All data stays on the device in `localStorage`.

## Architecture

```
src/
  domain/    pure logic, no React: types, catalog, metrics, load engine, progression, analytics, CSV
  core/      reducer + external store (useSyncExternalStore, persisted), dates, file export
  app/       shell and hash router
  features/  one folder per screen: home, training, game, session, metrics, monitoring, team, onboarding
  ui/        kit components, SVG charts, animated athlete figure
  styles/    design tokens and styles (dark court theme, Barlow Condensed + Inter)
tests/       node:test suites for the domain layer, reducer and router
```

## Android

`capacitor.config.ts` uses the application ID `uz.flyball.app`. The native project has not been generated yet:

```sh
npm run android:add
npm run android:sync
```
