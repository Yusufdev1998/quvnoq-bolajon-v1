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
- Sequential 30-day gymnastics program. Completing a day unlocks the next; replaying a day does not increase the completed-day count. Every session runs warm-up → main movement → stretch, and the range of movement widens in three 10-day stages: small calm movements, then side steps and balance, then running and jumps.
- Seven guided group games in three categories: role play (Ayiqcha va asalarilar, Quyoncha sakraydi, Quvnoq poyezd), stations (To‘rt bekat works arms, legs, trunk and balance in turn; Aylanma mashq alternates dynamic and static stretches) and relays (Tez va epchil, To‘pni uzat).
- Eight fine motor activities ordered by increasing resistance (no equipment, soft ball, elastic ring, then other equipment), each with its own hand demonstration.
- Every command is shown as a colored card with a gesture icon: green move, red stop, yellow get ready or wait, blue stretch and rest. The card is held up large when a step starts and stays as a smaller card in the corner.
- A 3D character demonstrates every activity, with pause/resume, adult confirmation, mood selection and explicit result saving.
- Several children per device (a parent's children or a teacher's group, up to 40), each with separate gymnastics progress, history and test results. Parent or teacher role and reduced-animation setting.
- Monitoring with date/category filters, weekly activity chart, history, milestones, a group overview for teachers, physical test results with trends, recommendations and CSV export of all children's results.
- Local persistence. No login, analytics, camera, server or external data submission.

## Android

The native project lives in `android/` (Capacitor 8, minimum Android 7.0 / API 24, target API 36, application ID `uz.quvnoqbolajon.app`). After web changes:

```sh
npm run android:sync
cd android && ./gradlew assembleDebug
```

The debug APK is written to `android/app/build/outputs/apk/debug/app-debug.apk`. The Gradle wrapper uses Gradle 9.1 so the build also runs on JDK 25; JDK 21 works too. `android/local.properties` points to the local Android SDK and is not committed. Build a signed release APK or App Bundle in Android Studio (`npm run android:open`). Follow the current official setup requirements at https://capacitorjs.com/docs/android.

## Scope and content

This is an interactive prototype, not a validated exercise curriculum. The supplied reference specifies sections and the 30-day unlocking rule, but does not provide day-by-day prescriptions or instructional media. The prototype uses representative illustrated instructions and repeating sample daily themes. Specialist-approved routines, accurate exercise videos/sign demonstrations and individualized recommendations remain future content work.

Monitoring records activities confirmed by an adult, active on-screen time and selected mood. Physical qualities are tracked through six simple field tests an adult measures and enters: standing long jump (strength), one-leg stand (balance), 10 m run (speed), seated forward bend (flexibility), bag throw (coordination) and moving beads in 30 seconds (fine motor). Each test shows the latest value and its change from the previous measurement. Children are compared only with their own earlier results: the app applies no age norms or levels, because those must come from a specialist. The test list and instructions live in `src/assessments.ts`.

Recommendations for parents and teachers are generated from the child's own records: how regularly they practise, sections not used for two weeks, repeated tiredness after sessions, gymnastics milestones, missing or overdue measurements, and test results that fell or stopped improving (each linked to an activity that practises that quality). The rules live in `src/recommendations.ts`; the wording differs for parents and teachers. They are suggestions, not clinical advice.

Data is stored under `quvnoq-bolajon-v1` in localStorage (format version 2: several children, sessions and test results). Data saved by the earlier single-child version is migrated automatically into the first child. Clearing app or browser storage removes it, so export results first. Local storage is suitable for this prototype; production deployment needs a deliberate consent, backup and storage design. In the Android app the CSV export opens the system share sheet; Android back-button behavior inside open dialogs still needs checking on a device.

The source includes locally drawn SVG illustrations and Lucide icons. No audio is required. The app respects operating-system reduced-motion preferences and an in-app animation setting.

## 3D character

Every activity is demonstrated by a real-time three.js bunny (`src/bunnyScene3d.ts`). Its 18 moves are keyframed in `src/bunnyMotion3d.ts`: still, reach, wings, wave, side step, walking and running in place, jump, one-leg balance, cool-down stretch, dance, celebrate, and six seated hand moves (open/close paws, finger touches, squeezing a ball, stretching an elastic ring, pick-and-place, and rolling). Spring physics adds follow-through to the ears, head, tail and belly; feet stay planted through leg IK; the dance is timed to the music's 124 BPM. If WebGL is unavailable, the Rive bunny below takes over.

The Nunito font is bundled locally. Capacitor's `xcode` dependency is overridden to use UUID 11, preserving the CommonJS `v4()` API while avoiding the older UUID advisory.

## Rive garden adventure

Open **O‘yinlar → Quyoncha sakraydi** for an eight-scene garden adventure lasting about 90 seconds. The bunny waves, stretches, hops, rests, balances on one leg, helps find three tappable stars, dances and celebrates. Automatic progression can be switched off; pause freezes the animation and scene timer, replay restarts the current demonstration, and manual next/previous controls stay available. The star scene waits for all three stars unless an adult advances manually. Watching alone never saves a result: an adult must confirm participation and select a mood before saving. Star taps are play interactions, not movement measurements.

Eight authored timelines (Rest, Jump, RaiseArms, Wave, SideStep, Dance, Celebrate and Wings) are selected through the numeric `BunnyControls.action` view model property. Moving cycles last 8–10 seconds, with varied poses, ear movement and blinking. The Rive bunny is now the fallback for devices without WebGL; newer moves map to the closest timeline (walking to SideStep, running to Jump, the stretch to RaiseArms, balance to Wings) and the hand moves to Rest. Reduced-motion preferences show a static illustration and disable automatic story progression.

The 14 KB `.riv` asset and the WebAssembly runtime are served locally, without a Rive account or CDN dependency. The animation uses shapes, keyframes and a state machine, with no embedded scripts. The normal app build uses the checked-in binary and does not require the authoring CLI.

Editable source lives in `animations/quvnoq-bunny/scene.rml`; `scripts/create-rive-bunny.mjs` regenerates it. To rebuild the asset, install the official Rive CLI from https://rive.app/agents, or set `RIVE_CLI` to its executable, then run `npm run animation:build`. This verifies and inspects the scene before producing and copying the `.riv` file. The trial was authored with CLI 1.7.0.

## Optional background music

The music-note button in the header and modal headers enables music and adjusts volume. When enabled, music plays only while an activity's character animation is running. Browsing, instructions, completion screens, pauses, exit confirmations, static stop poses, loading/failed Rive animations, and reduced-motion illustrations remain silent. Leaving an activity stops the music; enabling it on an overview screen arms it for the next animation. Leaving the browser/app also pauses playback; tap play again on return. Volume is remembered on this device, while the music preference starts off after a reload.

`public/audio/quvnoq-raqs.wav` is an original, locally synthesized dance loop (124 BPM, approximately 62 seconds), with a four-on-the-floor kick, backbeat claps, hi-hats, bouncy bass, offbeat chords and a bright melody. A short breakdown and variations lead back into the main groove. It ships with the app and needs no music service or account. The reproducible source is `scripts/create-background-music.py`, which uses Python and NumPy. No audio is needed to understand the activities.
