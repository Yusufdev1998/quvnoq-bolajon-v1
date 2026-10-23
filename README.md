# Quvnoq bolajon

A mobile-first Uzbek React prototype for visual movement activities for preschool children, based on the supplied Quvnoq bolajon reference. Built with React, TypeScript and Vite, with Capacitor configuration ready for a later Android package.

## Run locally

Requires Node.js 22 or later (Node 24 recommended).

```sh
npm install
npm run dev
```

Open http://localhost:5173. For a phone on the same network, use the Network URL printed by Vite. Hash navigation works without server route rewrites.

```sh
npm test
npm run build
npm run preview
```

## Prototype features

- Responsive home screen and five-tab mobile navigation.
- Sequential 30-day gymnastics program. Completing a day unlocks the next; replaying a day does not increase the completed-day count.
- Seven guided group games in three categories: role play, stations and relays.
- Eight fine motor activities, with and without equipment.
- Illustrated activity player with visual instructions, pause/resume, adult confirmation, mood selection and explicit result saving.
- Editable child profile and reduced-animation setting.
- Monitoring with date/category filters, weekly activity chart, history, milestones and CSV export of all results.
- Browser-local persistence. No login, analytics, camera, server or external data submission.

## Android with Capacitor later

The configuration in `capacitor.config.ts` points to Vite's `dist` folder. Android has not been generated or built yet. When ready, install the Android tooling required by the installed Capacitor version, then run:

```sh
npm run build
npm run android:add
npm run android:sync
npm run android:open
```

Run `android:add` only once. After subsequent web changes, use `android:sync`. Build/sign the APK in Android Studio. The placeholder application ID `uz.quvnoqbolajon.app` can be changed before generating the native project. Follow the current official setup requirements at https://capacitorjs.com/docs/android.

## Scope and content

This is an interactive prototype, not a validated exercise curriculum. The supplied reference specifies sections and the 30-day unlocking rule, but does not provide day-by-day prescriptions or instructional media. The prototype uses representative illustrated instructions and repeating sample daily themes. Specialist-approved routines, accurate exercise videos/sign demonstrations and individualized recommendations remain future content work.

Monitoring records activities confirmed by an adult, active on-screen time and selected mood. It does not measure a child's movement, strength, balance or physical development. Exercise results are self-reported, not clinical assessments.

Data is stored under `quvnoq-bolajon-v1` in localStorage, for one child per browser profile. Clearing browser storage removes it. Export results before doing so. Browser storage is suitable for this prototype; production deployment needs a deliberate consent, backup and storage design. Native CSV sharing and Android back-button behavior should be verified during Capacitor integration.

The source includes locally drawn SVG illustrations and Lucide icons. No audio is required. The app respects operating-system reduced-motion preferences and an in-app animation setting.

The Nunito font is bundled locally. Capacitor's `xcode` dependency is overridden to use UUID 11, preserving the CommonJS `v4()` API while avoiding the older UUID advisory.

## Rive garden adventure

Open **O‘yinlar → Quyoncha sakraydi** for an eight-scene garden adventure lasting about 90 seconds. The bunny waves, stretches, hops, rests, takes side steps, helps find three tappable stars, dances and celebrates. Automatic progression can be switched off; pause freezes the animation and scene timer, replay restarts the current demonstration, and manual next/previous controls stay available. The star scene waits for all three stars unless an adult advances manually. Watching alone never saves a result: an adult must confirm participation and select a mood before saving. Star taps are play interactions, not movement measurements.

Eight authored timelines (Rest, Jump, RaiseArms, Wave, SideStep, Dance, Celebrate and Wings) are selected through the numeric `BunnyControls.action` view model property. Moving cycles last 8–10 seconds, with varied poses, ear movement and blinking. Gymnastics also uses the Rive character for side steps, stretches and wing movements, with manual progression. Reduced-motion preferences show a static illustration and disable automatic story progression. Other games and motor activities retain their SVG demonstrations.

The 14 KB `.riv` asset and the WebAssembly runtime are served locally, without a Rive account or CDN dependency. The animation uses shapes, keyframes and a state machine, with no embedded scripts. The normal app build uses the checked-in binary and does not require the authoring CLI.

Editable source lives in `animations/quvnoq-bunny/scene.rml`; `scripts/create-rive-bunny.mjs` regenerates it. To rebuild the asset, install the official Rive CLI from https://rive.app/agents, or set `RIVE_CLI` to its executable, then run `npm run animation:build`. This verifies and inspects the scene before producing and copying the `.riv` file. The trial was authored with CLI 1.7.0.

## Optional background music

The music-note button in the header and modal headers enables music and adjusts volume. When enabled, music plays only while an activity's character animation is running. Browsing, instructions, completion screens, pauses, exit confirmations, static stop poses, loading/failed Rive animations, and reduced-motion illustrations remain silent. Leaving an activity stops the music; enabling it on an overview screen arms it for the next animation. Leaving the browser/app also pauses playback; tap play again on return. Volume is remembered on this device, while the music preference starts off after a reload.

`public/audio/quvnoq-raqs.wav` is an original, locally synthesized dance loop (124 BPM, approximately 62 seconds), with a four-on-the-floor kick, backbeat claps, hi-hats, bouncy bass, offbeat chords and a bright melody. A short breakdown and variations lead back into the main groove. It ships with the app and needs no music service or account. The reproducible source is `scripts/create-background-music.py`, which uses Python and NumPy. No audio is needed to understand the activities.
