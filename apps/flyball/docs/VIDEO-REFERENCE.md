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

## Creative Commons clips (YouTube, CC BY)

Licensed **Creative Commons Attribution** (checked in each video's metadata on 2026-10-29). Reuse is allowed as long as the creator is credited: the app shows "Video: <author> · CC BY" with a link under the clip (`VIDEO_CREDITS` in `src/ui/art.tsx`). Keep that credit if a clip moves.

| File | Source video | Creator | Start + length | Crop (w:h:x:y) | Notes |
| --- | --- | --- | --- | --- | --- |
| `ex-single-hop.mp4` | [Single Leg Forward-Backward Hops](https://youtu.be/hKhx9HOlWOk) | Lance Goyke | 1.008 + 2.687 s | 960:720:160:0 | Side view, one leg |
| `ex-depth-vertical.mp4` | [depth jump](https://youtu.be/dIgxJ9mgR28) | Melissa Witmer | 0.9 + 1.9 s | 760:570:260:100 | Off the box, max reach at a Vertec; loop jumps back to the box |
| `ex-medball-jump.mp4` | [Medicine Ball Power Jumps](https://youtu.be/bYk0bRfUeBU) | Coach Bobby Bluford | 5.333 + 3.334 s | 640:480:90:0 | **Close, not exact:** jumps holding the ball overhead, no throw |
| `ex-ankle-hops.mp4` | [Pogo jumps](https://youtu.be/hP0O3gz_dlQ) | 2sport4life | 0.8 + 4.0 s | 960:720:20:0 | Busy gym background |

`ex-depth-jump-low.mp4` is a copy of `ex-depth-vertical.mp4` (same drop-and-rebound movement, same credit).

## Pexels clips (Pexels License)

Free to use in apps, no attribution required; the app still shows "Video: Pexels" with a link.

| File | Source video | Start + length | Crop (w:h:x:y) | Notes |
| --- | --- | --- | --- | --- |
| `ex-tuck-jump.mp4` | [pexels.com/video/6156132](https://www.pexels.com/video/6156132/) | 3.9 + 3.2 s | 960:720:160:0 | One tuck jump in slow motion, knees fully to the chest; replaced the YouTube CC clip (Steve Eckert) |
| `ex-jump-rope.mp4` | [pexels.com/video/5272784](https://www.pexels.com/video/5272784/) | 2.544 + 2.544 s | 960:720:120:0 | Young girl, front view, fixed camera |
| `ex-hurdle-hops.mp4` | [pexels.com/video/36205142](https://www.pexels.com/video/36205142/) | 0.75 + 3.0 s | 720:540:0:430 | Two-foot hops over mini hurdles; the camera follows him |
| `ex-approach-jump.mp4` | [pexels.com/video/6216857](https://www.pexels.com/video/6216857/) | 4.0 + 4.0 s | 960:720:160:0 | Volleyball approach steps and take-off; slight pan |

### Game drills (Pexels)

| File | Source video | Start + length | Crop (w:h:x:y) | Notes |
| --- | --- | --- | --- | --- |
| `drill-approach-attack.mp4` | [pexels.com/video/6216849](https://www.pexels.com/video/6216849/) | 6.3 + 2.5 s | 960:720:160:0 | Girl's approach run, jump and spike in a school gym; slight pan |
| `drill-static-block.mp4` | [pexels.com/video/6179958](https://www.pexels.com/video/6179958/) | 0.3 + 2.6 s | 960:720:200:0 | Close-up: two hands over the tape block the ball (beach net) |
| `drill-set-jump.mp4` | [pexels.com/video/6217342](https://www.pexels.com/video/6217342/) | 1.5 + 3.5 s | 720:540:0:130 | Overhead set, waist up; **close, not exact:** she sets standing, without the jump |
| `drill-dig-hops.mp4` | [pexels.com/video/6217342](https://www.pexels.com/video/6217342/) | 10.0 + 4.0 s | 720:540:0:560 | Same girl, forearm pass; the lateral hops before it are not shown |

No clean clip for `drill-tuck-serve` (every jump serve on Pexels has a moving or zooming camera), `drill-depth-attack`, `drill-double-attack`, `drill-shuffle-block` or `drill-triple-block`; those keep the animated figure.

**Source order:** Redefining Strength clips stay as they are. For everything else, Pexels or Pixabay comes first, and YouTube CC BY only where no stock clip shows the movement correctly. Checked on 2026-10-29: Pexels and Pixabay had no usable single-leg hop, depth jump, medicine ball jump throw or pogo hop (only burpees, bench step-overs, close-ups, slams, group dancing or a 3D cartoon), so those stay on YouTube CC.

Download a Pexels file at a small size with `https://www.pexels.com/download/video/<id>/?h=720&w=1280` (or `h=1280&w=720` for portrait).

Still without a clip (nothing usable found on YouTube CC or Pexels): `ex-landing`, `ex-line-hops`, `ex-broad-jump`, `ex-lateral-box`, `ex-reactive-drop`, `ex-bounds`. Pexels has plenty of volleyball spike, serve and block footage for the drills and game elements.

Checked and rejected: Endless Reference tuck (jump off a truck, split screen), WABBA and Bootcamp Ideas tuck (low jumps / blurry, head cut), THP broad jump and bounds (burned-in caption, runs out of frame), AmericanParkour (camera cuts), 2R7Gc line hops (movement unclear), ExperienceLife lateral jump (a skater, with text), The Body Guide lateral box (vertical video with caption over the box), OVR depth / hurdle (vertical, talking, overlays), Professional Seminars (talking head), Dead Ball Slams (a slam, not a jump throw), informedinsport bounds and Ace Jumper volleyball (far away, moving camera or match footage), Jump Rope Dudes (rope only after on-screen counters). Unavailable: `tf7YG9xwscA`, `OCWEypnPwGc`, `r_Oe8mj7Y88`.

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
