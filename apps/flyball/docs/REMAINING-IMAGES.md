# Flyball — remaining 36 images, one at a time

Each prompt below is **complete and self-contained**. Generate **one image per prompt**. Do not ask for a grid, a montage or several images in one picture.

> **Do not crop images out of a multi-scene generation.** Crops from composite sheets came back with heads, arms and feet cut off, panel borders left in, and the wrong movement. One prompt → one render → one file. The whole girl must be in frame, with space above her head and below her feet; never crop a render afterwards.

### Review log

✅ final · 🟡 right movement, cosmetic flaws · 🔴 shows a different movement than the exercise · ❌ not in app

| Image | Result | Reason |
| --- | --- | --- |
| `ex-landing` | ✅ in app | Individually generated; matches the check |
| `ex-ankle-hops` | ✅ in app | Correct pose |
| `ex-jump-rope` | ❌ redo | Head and feet cropped off; rope under the feet not visible |
| `ex-line-hops` | ❌ redo | Head cropped; panel border; no line on the floor |
| `ex-squat-jump` | 🟡 draft in app, replace | Squat then straight-up jump with arms high; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-tuck-jump` | 🟡 draft in app, replace | No head (cropped at chest); blurry |
| `ex-box-jump` | 🟡 draft in app, replace | Full figure landing on the box in a half squat; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-broad-jump` | 🟡 draft in app, replace | Forward flight between two crouches; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-split-jump` | 🔴 placeholder in app, **wrong movement**, replace before release | Still a forward running bound, not an in-place scissor switch; from the 2×5 montage (low resolution, about 275×205 px per crop); prompt rewritten 2026-10-29, regenerate |
| `ex-skater` | 🟡 draft in app, replace | Lateral bounds with side arcs, one-leg landing; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-depth-jump-low` | 🟡 draft in app, replace | Drop from the box and landing shown; the rebound is not visible; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-single-hop` | 🟡 draft in app, replace | One-leg hops with arcs, other knee raised; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-lateral-box` | 🔴 placeholder in app, **wrong movement**, replace before release | Jumps between two boxes instead of sideways onto one; from the 2×5 montage (low resolution, about 275×205 px per crop); prompt rewritten 2026-10-29, regenerate |
| `ex-rotation-jump` | 🟡 draft in app, replace | Spiral trail shows the rotation; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-medball-jump` | 🟡 draft in app, replace | Medicine ball held, then jumping up with it; from the 2×5 montage (low resolution, about 275×205 px per crop) |
| `ex-depth-vertical` | 🔴 placeholder in app, **wrong movement**, replace before release | No box, so it reads as a squat jump; prompt rewritten 2026-10-29, regenerate |
| `ex-hurdle-hops` | 🔴 placeholder in app, **wrong movement**, replace before release | Tuck jump between two boxes, no hurdles; bottom border cropped; prompt rewritten 2026-10-29, regenerate |
| `ex-approach-jump` | 🟡 draft in app, replace | Approach steps then take-off toward the net (from the 26–35 batch's approach image); bottom border cropped |
| `ex-reactive-drop` | ❌ redo | File is completely black |
| `ex-bounds` | 🟡 draft in app, replace | Forward bounding leap; top border cropped |
| `element-sakrash` | ❌ redo | Old montage crop with "ex-spike-jump.webp" burned in; identical to `element-hujum` |
| `element-hujum` | 🟡 draft in app, replace | Spike at the net from the "tuck-serve" file, arm cocked just before contact |
| `element-blok` | ❌ redo | Old montage crop with "ex-block-jump.webp" burned in |
| `drill-set-jump` | ❌ redo | Old montage crop with "ex-spike-jump.webp" burned in; no partner |
| `drill-dig-hops` | ❌ redo | Old montage crop with "ex-dig-to-jump.webp" burned in |
| `drill-approach-attack` | 🟡 draft in app, replace | Approach sequence with ghost steps and take-off toward the net; bottom border cropped |
| `drill-shuffle-block` | 🟡 draft in app, replace | Lateral shuffle shown, but no block at the net; top panel strip cropped |
| `drill-static-block` | 🔴 placeholder in app, **wrong movement**, replace before release | One-hand reach for the ball, not a two-hand block over the tape; bottom border cropped; prompt rewritten 2026-10-29, regenerate |
| `drill-tuck-serve` | ❌ redo | Shows a spike at the net, not a serve behind the end line (image reused as `element-hujum`) |
| `drill-depth-attack` | ❌ redo | Same file as drill-approach-attack; no box |
| `drill-double-attack` | ❌ redo | Same file as drill-approach-attack; no second attack |
| `drill-triple-block` | ❌ redo | Same file as drill-approach-attack; shows an attack, not blocks |
| `rest-timer` | ❌ redo | Old broken fragment re-sent: half a bench, no athlete, panel lines |
| `session-done` | ❌ redo | Old broken fragment re-sent: a trophy, no athlete, panel lines |
| `app-icon` | ❌ redo | Old broken fragment re-sent: a bench and half a ball, not an icon |

## Workflow for every image

1. Open a **new** generation (do not continue a montage).
2. Attach the reference image `src/assets/images/onboarding-hero.webp` as a **character + style reference** (Midjourney: `--cref <url> --sref <url>`; ChatGPT/DALL·E, Leonardo, Ideogram: "reference image"). This keeps the same girl and look as the images already in the app.
3. Paste the whole prompt from the code block.
4. Check the result against the **Check** line. If the pose is wrong, regenerate. A wrong pose teaches a wrong movement.
5. Make sure there is **no text, no border, no blurred padding, no logo**.
6. Export as **WebP** (or PNG and convert) at the size given, and save it with the exact **file name** into `apps/flyball/src/assets/images/`.
7. Tick it off in the checklist at the bottom.

The app shows each new image automatically. Screens without one keep the animated figure.

## Settings

| Group | Count | Size | Midjourney suffix |
| --- | --- | --- | --- |
| Exercises `ex-*` | 20 | 1200×900 (4:3) | `--ar 4:3 --style raw --v 7` |
| Drills `drill-*` | 9 | 1200×900 (4:3) | `--ar 4:3 --style raw --v 7` |
| Elements `element-*` | 3 | 1600×900 (16:9) | `--ar 16:9 --style raw --v 7` |
| Rest / done | 2 | 800×800 (1:1) | `--ar 1:1 --style raw --v 7` |
| App icon | 1 | 1024×1024 (1:1) | `--ar 1:1 --v 7` |
| Splash | 1 | 1284×2778 (9:19.5) | `--ar 9:19 --v 7` |

Negative prompt (Midjourney `--no`, other tools "negative prompt"). It is already appended to every prompt below:

```
text, letters, captions, labels, watermark, logo, swoosh, brand marks, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, knees caving inward, unnatural joints, revealing clothing, sexualized, chibi, low resolution
```

---

## Exercises — 1-blok · Moslashtiruvchi

### 1. `ex-landing.webp` — Yerga to‘g‘ri tushish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She has just stepped off a low 30 cm black plyo box behind her and lands on both feet at the same time in a soft half-squat, knees pointing straight over her toes, heels slightly lifted, arms forward for balance, calm controlled expression. A faint transparent ghost of her standing on the box shows where she came from. Side three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: both feet land together, knees over toes, box behind her.

### 2. `ex-ankle-hops.webp` — To‘piq sakrashlari
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She performs small quick hops on the balls of her feet with knees almost straight, feet only a few centimetres above the floor, body upright, arms bent and swinging in rhythm. Short repeated lime arcs under her feet show fast small bounces. Front three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: tiny hops, straight-ish knees, heels off the floor.

### 3. `ex-jump-rope.webp` — Arqon bilan sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She skips a thin speed rope with both feet together, elbows close to her body, wrists turning the rope, feet just off the floor. The rope is a single glowing lime arc passing under her feet. Front view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, tangled rope, unnatural joints, revealing clothing, low resolution
```
Check: one rope, held in both hands, passing under both feet.

### 4. `ex-line-hops.webp` — Chiziq ustidan yonga sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She hops sideways over a single glowing lime court line with both feet together in the air, shoulders square to the camera, knees slightly bent. Faint transparent ghosts of her stand on both sides of the line to show the side-to-side rhythm. Front view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: sideways over one line, feet together.

### 5. `ex-squat-jump.webp` — Yarim o‘tirib sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She jumps straight up from a half squat, body fully extended in the air, both arms swung up overhead, toes pointed down. A faint transparent ghost below her shows the half-squat start position with arms behind. Side three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: straight vertical jump, arms overhead, ghost squat below.

## Exercises — 2-blok · Rivojlantiruvchi

### 6. `ex-tuck-jump.webp` — Tizzalarni ko‘krakka tortib sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. At the top of a tuck jump she pulls both knees up high to her chest, torso upright, hands lightly touching the knees, high above the floor, explosive energy, mint green light particles under her feet. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: both knees at chest height, torso upright.

### 7. `ex-box-jump.webp` — Tumbaga sakrab chiqish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She has just jumped up onto a 40 cm black wooden plyo box and lands on top of it on both feet in a soft half squat, arms forward, knees over toes. A faint transparent ghost on the floor in front of the box shows her take-off. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: she lands ON TOP of the box (jumping up, not down).

### 8. `ex-broad-jump.webp` — Joyidan uzunlikka sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Standing broad jump: she flies forward horizontally with both feet together, arms reaching forward, knees bent, body leaning forward. A long low lime arc on the floor runs from a take-off line to a landing mark. Pure side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, one-leg jump, unnatural joints, revealing clothing, low resolution
```
Check: two-foot jump forward (not a one-leg bound).

### 9. `ex-split-jump.webp` — Hamla holatida sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Split squat jump IN PLACE, she does not travel forward. The main figure is at the bottom of a deep lunge on the floor: left foot forward with the left shin vertical and the thigh parallel to the floor, right knee a hand's width above the floor, right heel lifted, torso tall and vertical, hands clasped in front of her chest with elbows bent. Directly above the same spot, a faint transparent ghost of her hangs in the air with the legs already switched (right leg forward, left leg back) and only a short gap between the legs. A thin vertical lime arrow runs straight up between the two, and both feet of the ghost are above the same floor marks as the lunge. Pure side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, running, sprinting, forward bound, long stride, leaning forward, motion toward the camera edge, unnatural joints, revealing clothing, low resolution
```
Check: deep lunge with the back knee near the floor, ghost straight ABOVE (not ahead) with legs swapped. If she looks like she is running, regenerate.

### 10. `ex-skater.webp` — Konkichi sakrashi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Skater jump: she lands on her left leg after a wide sideways bound, left knee bent over the toes, right leg crossed behind her, right arm swinging across her body like a speed skater. A curved sideways lime trail shows the lateral path. Front view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: one-leg landing after a SIDEWAYS bound, other leg behind.

## Exercises — 3-blok · Modifikatsiyalovchi

### 11. `ex-depth-jump-low.webp` — Tumbadan tushib sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Depth jump: a 30 cm black plyo box stands behind her; she has just dropped from it and rebounds straight up, feet just leaving the floor, arms swinging up. A small bright amber flash on the floor marks a very short ground contact. A faint transparent ghost of her stands on the box. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: box BEHIND, she jumps UP from the floor.

### 12. `ex-single-hop.webp` — Bir oyoqda sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Single-leg hops forward: she is in the air on her right leg only, left knee bent with the left foot lifted behind, arms out for balance. Three glowing amber footprints of the same right foot on the floor behind her show consecutive one-leg hops. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: only one leg used, other foot never touches the floor.

### 13. `ex-lateral-box.webp` — Tumbaga yondan sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Lateral box jump with exactly ONE low 30 cm black plyo box in the whole scene. The box stands on the floor to her right, its long side facing the camera. She has just landed on top of the box on both feet together, in a soft half squat, chest and hips facing the camera, shoulders square, arms forward. A faint transparent ghost of her stands on the floor to the LEFT of the box, also facing the camera, at the take-off. One sideways amber arc goes from the ghost's feet up onto the box. Front view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, two boxes, second box, jumping between boxes, side view, jumping forward onto the box, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: ONE box, she faces the camera, the ghost is beside the box (not in front of it).

### 14. `ex-rotation-jump.webp` — 180° burilib sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. 180-degree rotation jump: in mid-air she is turning half a circle, body twisted with shoulders leading the turn, arms tucked close, both feet together. A spiral amber light trail wraps around her body showing the half turn. Three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, running, revealing clothing, low resolution
```
Check: rotating in the air on the spot (not running or cutting).

### 15. `ex-medball-jump.webp` — To‘ldirma to‘p bilan sakrab otish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Medicine ball jump throw: she jumps up with her whole body extended and throws a dark grey rubber 2 kg medicine ball straight up overhead with both hands; the ball has just left her hands with a coral motion trail. Side three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, volleyball instead of medicine ball, unnatural joints, revealing clothing, low resolution
```
Check: a heavy grey medicine ball (not a volleyball), two-hand throw upward.

## Exercises — 4-blok · Takomillashtiruvchi

### 16. `ex-depth-vertical.webp` — Chuqurlikdan maksimal sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Depth jump to maximal vertical. A large, clearly visible 40 cm black wooden plyo box stands on the left side of the image, its full height and top edge in view. A faint transparent ghost of her stands on top of the box, about to step off. One short step to the right of the box, she is high in the air in a maximal vertical jump, body fully extended, both arms driving up to the ceiling, toes pointed down, her feet higher than the top of the box. A coral shockwave ring on the floor under her marks where she landed and took off again, and a dotted lime path runs from the box down to the ring and straight up to her. Pure side view, full body and the whole box visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, no box, box hidden or cropped, jumping onto the box, unnatural joints, revealing clothing, low resolution
```
Check: the whole box is visible on the left, ghost on top of it, she is in the air to the right with feet above box height.

### 17. `ex-hurdle-hops.webp` — To‘siqlar ustidan sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Hurdle hops. On the floor, a straight row of five mini training hurdles runs from left to right, evenly spaced about one metre apart. Each hurdle is a thin lime crossbar 30 cm high on two thin vertical legs with small feet, open underneath, like a low gate; there are no boxes or solid blocks anywhere. She is in the air directly above the third hurdle, both feet together and tucked under her, knees pulled up, arms swinging forward. Faint transparent ghosts above the second and fourth hurdles show the continuous two-foot rhythm. Pure side view, full body and all five hurdles visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, boxes, plyo boxes, solid blocks, cones, steps, one-leg hurdling, running hurdles, unnatural joints, revealing clothing, low resolution
```
Check: five thin open hurdles (no boxes), she is over the middle one on two feet.

### 18. `ex-approach-jump.webp` — Uch qadamli hujum sakrashi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with a net on the right, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Volleyball spike approach: the last powerful plant step, both feet planted heel-to-toe, knees bent, both arms swung fully back behind her, about to take off toward the net. Three glowing coral footprints behind her mark the left-right-left approach. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, knees caving inward, unnatural joints, revealing clothing, low resolution
```
Check: plant step with arms back, net ahead, three footprints.

### 19. `ex-reactive-drop.webp` — Reaktiv ikki karra sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Reactive double jump after a box drop: a black plyo box on the left; ghosts show her dropping off it and doing a first jump; the solid figure is in the second jump in the same spot, arms up. A bouncing coral trail with two arcs connects them. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, running, unnatural joints, revealing clothing, low resolution
```
Check: box, two vertical jumps in place (no running).

### 20. `ex-bounds.webp` — Sakrab yugurish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, soft spotlight on the floor, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Bounding run: mid-air in an exaggerated long running stride, front knee driven high, back push-off leg fully extended, opposite arm forward. A long arcing coral trail across the floor shows large leaps from one foot to the other. Pure side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: long forward leap, knee high, back leg straight.

---

## Game elements (16:9)

### 21. `element-sakrash.webp` — Sakrash
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court near the net, electric lime rim light from the left and coral pink rim light from the right, clean wide composition with empty space, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Jump set: at the top of her jump she sets a volleyball with both hands above her forehead, fingers shaped around the ball, the ball glowing softly lime. Side view, full body visible, figure on the left third. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, extra fingers, unnatural joints, revealing clothing, low resolution
```
Check: two-hand overhead set while jumping (not a spike).

### 22. `element-hujum.webp` — Hujum zarbasi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean wide composition with empty space, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Spike: at the highest point above the net she hits the volleyball with her right hand, hitting arm fully extended, left arm pulled down, the ball compressed at impact with a coral burst of light. Side view from her side of the net, full body visible, figure on the left third. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: one-arm hit at the top, contact with the ball.

### 23. `element-blok.webp` — Blok qo‘yish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean wide composition with empty space, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Block: viewed from the opponent's side through the net, she jumps and reaches both arms over the top of the net, hands wide apart with fingers spread, eyes focused forward. Front view through the net mesh, upper body and arms large in frame. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: both hands OVER the net, seen through the net.

---

## Game drills (4:3)

### 24. `drill-set-jump.webp` — Sakrab pas berish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She jumps from a half squat to set a volleyball with both hands above her forehead; in the foreground a partner's hands (no face) have just tossed the ball up to her. Three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, extra fingers, unnatural joints, revealing clothing, low resolution
```
Check: overhead two-hand set, partner's hands tossing.

### 25. `drill-dig-hops.webp` — Yon sakrash va to‘pni ko‘tarish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Low defensive dig: knees deep, forearms joined into a flat platform under a volleyball, just after hopping sideways over a lime court line; a faint ghost of the sideways hop is behind her. Front three-quarter view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: forearm pass (dig), low stance, court line.

### 26. `drill-tuck-serve.webp` — Sakrab uzatishga tayyorgarlik
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court seen from behind the end line, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Jump serve: behind the white end line she is in the air, the ball tossed high in front of her, body arched like a bow, right hitting arm drawn back. A faint ghost beside her shows a tuck jump done before the serve. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, net in front of her, unnatural joints, revealing clothing, low resolution
```
Check: serving from the END LINE (not at the net).

### 27. `drill-approach-attack.webp` — Yugurib kelib hujum zarbasi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with net and antenna, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Outside attack: she takes off from both feet after a three-step approach, both arms swinging up, eyes on a volleyball set high near the antenna. Three glowing footprints on the floor behind her mark the approach. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: take-off moment (not yet hitting), footprints, ball above.

### 28. `drill-depth-attack.webp` — Tumbadan tushib hujum
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with net, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Drop-to-attack sequence: a black plyo box stands two metres back from the net with a faint ghost of her stepping off it; the solid figure is in the air at the net hitting the volleyball with her right arm. A coral trail links the box to the hit. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: box AND net both visible, ghost on box, hit at net.

### 29. `drill-double-attack.webp` — Ketma-ket ikki hujum
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with net and a white 3-metre attack line, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Two attacks in a row: a faint ghost shows her first spike at the net and a second ghost running back to the attack line; the solid figure is spiking a second ball. Two coral impact bursts at the two contacts. Side view, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: two ghosts (first hit, return), solid second hit.

### 30. `drill-static-block.webp` — Joyidan blok sakrashi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Standing block with no ball in the scene. Seen from the opponent's side of the court, looking at her through the net. She has jumped straight up from a standing start close to the net, body vertical, and BOTH arms are fully straight and pushed together over the white top tape of the net, both hands side by side reaching toward the camera, shoulder-width apart, fingers spread wide and thumbs up, eyes looking forward. Her head and both hands are above the tape; her feet are in the air below the net. A faint transparent ghost of her stands on the floor below, knees bent, hands up at shoulder height, ready to jump. Front view through the net, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, ball, volleyball, one-hand reach, one arm, spiking, hitting, arm swing, side view, unnatural joints, revealing clothing, low resolution
```
Check: no ball, two straight arms together over the tape, seen through the net. If only one arm is up, regenerate.

### 31. `drill-shuffle-block.webp` — Yon qadam va blok
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Shuffle and block: two glowing lime sideways footprints along the floor next to the net show two side steps; at the end she jumps to block with both hands over the net, body square to the net. Front view from her side of the net, full body visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: sideways footprints along the net, then block.

### 32. `drill-triple-block.webp` — Chap — markaz — o‘ng bloklar
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, clean wide composition, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Three blocks along the net: two faint transparent ghosts of her blocking at the left and middle of the net, and the solid figure blocking at the right, both hands over the net each time. Lime arcs connect the three positions. Front view from her side of the net, all three figures fully visible. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, unnatural joints, revealing clothing, low resolution
```
Check: one solid + two ghosts, all blocking, one continuous scene (not three panels).

---

## Rest and finish (1:1)

### 33. `rest-timer.webp` — Dam olish
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, cool cyan rim light, calm mood, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She sits on a wooden bench at the side of the court catching her breath, towel over her shoulders, holding a water bottle, relaxed smile. Three-quarter view, whole bench and figure visible, centred. Negative: text, letters, captions, labels, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, revealing clothing, low resolution
```
Check: the girl is actually in the image, sitting and resting.

### 34. `session-done.webp` — Mashg‘ulot yakunlandi
```
Stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime and coral pink rim light, joyful mood, clean empty background, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. She celebrates finishing training with a fist pump and a big smile, a small burst of lime and coral confetti light particles around her. Front view, waist-up, centred. Negative: text, letters, captions, labels, watermark, logo, swoosh, trophy, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, extra fingers, revealing clothing, low resolution
```
Check: the girl celebrating (no trophy-only image).

---

## App icon and splash

### 35. `app-icon.png` — 1024×1024
```
App icon, single centered symbol, minimalist volleyball drawn with three bold curved electric lime (#D4FF3A) stripes, with a small coral pink (#FF5C7A) upward motion streak at the lower left, on a solid deep midnight navy (#0A0F1E) rounded square background filling the whole image, flat vector style with very subtle depth, crisp edges, readable at 48 pixels. Negative: text, letters, people, photo, background scene, border, frame, multiple icons, grid, mockup, phone, shadow outside the square
```
Check: one icon filling the canvas, no scene, no phone mockup.
Save as PNG. (Android icons are generated from it later with `npx @capacitor/assets generate`.)

### 36. `splash.png` — 1284×2778 portrait
```
Mobile splash screen background, tall portrait, solid deep midnight navy (#0A0F1E) with very faint volleyball court lines in perspective, one glowing electric lime (#D4FF3A) volleyball rising in the exact centre leaving a soft coral pink (#FF5C7A) motion trail below it, large empty space above and below for a logo, minimal and calm. Negative: text, letters, logo, people, border, frame, multiple balls, collage, grid, phone mockup, clutter
```
Check: tall portrait, ball in the centre, mostly empty navy.
Save as PNG.

---

## Checklist

Exercises
- [x] 1 `ex-landing.webp`
- [x] 2 `ex-ankle-hops.webp`
- [ ] 3 `ex-jump-rope.webp`
- [ ] 4 `ex-line-hops.webp`
- [ ] 5 `ex-squat-jump.webp`
- [ ] 6 `ex-tuck-jump.webp`
- [ ] 7 `ex-box-jump.webp`
- [ ] 8 `ex-broad-jump.webp`
- [ ] 9 `ex-split-jump.webp`
- [ ] 10 `ex-skater.webp`
- [ ] 11 `ex-depth-jump-low.webp`
- [ ] 12 `ex-single-hop.webp`
- [ ] 13 `ex-lateral-box.webp`
- [ ] 14 `ex-rotation-jump.webp`
- [ ] 15 `ex-medball-jump.webp`
- [ ] 16 `ex-depth-vertical.webp`
- [ ] 17 `ex-hurdle-hops.webp`
- [ ] 18 `ex-approach-jump.webp`
- [ ] 19 `ex-reactive-drop.webp`
- [ ] 20 `ex-bounds.webp`

Elements and drills
- [ ] 21 `element-sakrash.webp`
- [ ] 22 `element-hujum.webp`
- [ ] 23 `element-blok.webp`
- [ ] 24 `drill-set-jump.webp`
- [ ] 25 `drill-dig-hops.webp`
- [ ] 26 `drill-tuck-serve.webp`
- [ ] 27 `drill-approach-attack.webp`
- [ ] 28 `drill-depth-attack.webp`
- [ ] 29 `drill-double-attack.webp`
- [ ] 30 `drill-static-block.webp`
- [ ] 31 `drill-shuffle-block.webp`
- [ ] 32 `drill-triple-block.webp`

Other
- [ ] 33 `rest-timer.webp`
- [ ] 34 `session-done.webp`
- [ ] 35 `app-icon.png`
- [ ] 36 `splash.png`

When a batch is done, put the files in a zip and share it. Each one gets checked for pose, text and borders before it goes into the app.
