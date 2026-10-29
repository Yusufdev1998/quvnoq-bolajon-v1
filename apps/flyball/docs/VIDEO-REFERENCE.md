# Movement reference: "23 Plyo Variations" (Redefining Strength)

This is a third-party YouTube video, © Redefining Strength (redefiningstrength.com). Five short clips from it are in the app (below). **Get written permission from Redefining Strength before any public release**, or replace these clips with your own footage.

Local copy: `C:\Users\Yusuf\Desktop\ai images\Plyometric exercises  - 23 Plyo Variations - Redefining Strength (720p, h264).mp4` (4:04, 1280×720).

## Clips in the app

`src/assets/videos/`, 640×480, H.264, muted, cut where the on-screen move label has already faded out, and each loop starts and ends on the same pose. Exercise pages and the workout screen play the clip; exercises without one show the animated figure.

| File | Source | Crop (w:h:x:y) | Shows |
| --- | --- | --- | --- |
| `ex-box-jump.mp4` | 0:30.75 + 3.0 s | 920:690:180:0 | Steps down, swings, jumps up and lands on the box |
| `ex-split-jump.mp4` | 0:58.0 + 2.0 s | 720:540:344:150 | Two in-place leg switches from a deep lunge |
| `ex-squat-jump.mp4` | 1:06.0 + 3.0 s | 880:660:240:50 | Two squat jumps, arms overhead |
| `ex-rotation-jump.mp4` | 1:48.0 + 2.5 s | 760:570:170:110 | Two 180° snowboard hops |
| `ex-skater.mp4` | 1:56.0 + 2.0 s | 880:660:136:50 | Skater bound left and right |

To recut one (ffmpeg): `ffmpeg -ss <start> -t <length> -i <video> -an -vf "crop=<crop>,scale=640:480,fps=30" -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart <file>.mp4`

`ex-broad-jump` was skipped: in "Forward Hops" she hops out of frame.

## The 23 moves and their Flyball match

✅ same movement · ≈ related, useful for parts of it · — no Flyball equivalent

| # | Time | Move in the video | Flyball | What to take from it |
| --- | --- | --- | --- | --- |
| 1 | 0:26 | Basic Box Jump | ✅ `ex-box-jump` | Lands on top in a deep, quiet squat; **steps** down, never jumps down |
| 2 | 0:36 | Explosive Step Up | — | |
| 3 | 0:44 | Box Shuffle | — | One foot on the box, switching feet over it |
| 4 | 0:52 | Split Squat Jump | ✅ `ex-split-jump` | Done **in place**: deep lunge, back knee almost on the floor, straight up, switch, land in the same spot. Hands clasped at the chest |
| 5 | 1:02 | Squat Jumps | ✅ `ex-squat-jump` | Hands down in the squat, both arms fully overhead at the top |
| 6 | 1:10 | Jumps For Height | ≈ `ex-tuck-jump` | Knees come up at the top; no hands-to-knees |
| 7 | 1:20 | Plyo Jacks | — | |
| 8 | 1:28 | Single Leg Deadlift Hops | ≈ `ex-single-hop` | One-leg landing, free leg stays off the floor |
| 9 | 1:36 | Ins and Outs | — | |
| 10 | 1:43 | Snowboard Hops | ✅ `ex-rotation-jump` | 180° turn on the spot, landing sideways in a low squat |
| 11 | 1:52 | Skater Hops | ✅ `ex-skater` | Wide side bound, land on one leg, trailing leg crosses behind |
| 12 | 2:02 | Burpee | — | |
| 13 | 2:14 | Jumping Spider | — | |
| 14 | 2:22 | Clapping Push Up | — | |
| 15 | 2:28 | X Hops | ≈ `ex-single-hop` | Small one-leg hops in an X pattern, hands on hips |
| 16 | 2:40 | Forward Bounding Hops | ≈ `ex-bounds` | Diagonal one-leg bounds moving forward |
| 17 | 2:48 | Plank Skiers | — | |
| 18 | 2:58 | Press Jacks | ≈ `ex-medball-jump` | Medicine ball held at the chest and pressed overhead |
| 19 | 3:06 | Alternating Rotational Throws | — | |
| 20 | 3:16 | Side Shuffle with Chest Pass | ≈ `drill-shuffle-block` | Low lateral shuffle footwork, hips square |
| 21 | 3:24 | Forward Hops | ✅ `ex-broad-jump` | Two-foot jump forward, arms swing back then forward |
| 22 | 3:36 | Frog Hops | ≈ `ex-broad-jump` | Deeper squat, hands touch the floor between hops |
| 23 | 3:42 | Plyo Pull Ups | — | |

## Not in the video

Use the written prompt and the coach's check for these: `ex-landing`, `ex-ankle-hops`, `ex-jump-rope`, `ex-line-hops`, `ex-depth-jump-low`, `ex-lateral-box`, `ex-depth-vertical`, `ex-hurdle-hops`, `ex-approach-jump`, `ex-reactive-drop`, and every volleyball `element-*` and `drill-*` image except the shuffle footwork above.
