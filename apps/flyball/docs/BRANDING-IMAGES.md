# Flyball — banner, intro and icon images to generate

Review of the 10 banner/intro images in the app, and one prompt per image that still needs to be made. **Generate each image separately**: one prompt, one render, one file, with no grid, montage or cropping afterwards.

## Review

| Image | Status | Note |
| --- | --- | --- |
| `block-1`, `block-2` | ✅ keep | Sharpest in the set |
| `role-athlete` | ✅ keep | Small logo on the jersey (erase it, see below) |
| `role-coach` | ✅ keep | White edge lines were cropped off |
| `element-hujum` | ✅ keep | |
| `empty-sessions` | ✅ keep | Slightly soft, but shown small |
| `block-3` | ❌ regenerate (#1) | Blurriest image in the app (montage crop); portrait shape in a wide banner |
| `block-4` | ❌ regenerate (#2) | Soft (montage crop); visibly worse next to blocks 1–2 |
| `empty-metrics` | ❌ regenerate (#3) | Blurry (montage crop) |
| `onboarding-hero` | ⚠️ recommended (#4) | First screen: jersey rides up and shows the midriff; logos on the shoes |
| `element-sakrash` | ➕ missing (#5) | O‘yin "Sakrash" tab has no banner |
| `element-blok` | ➕ missing (#6) | O‘yin "Blok qo‘yish" tab has no banner |
| `app-icon` | ➕ missing (#7) | Needed for the Android build and the Play Store |
| `feature-graphic` | ➕ optional (#8) | Required only for a Google Play listing |

**Logos:** `onboarding-hero`, `role-coach`, `role-athlete`, `block-1`, `block-2` and `element-hujum` show Nike-style swooshes. Instead of regenerating, use your tool's **erase / inpaint** brush on each logo ("plain fabric, no logo").

## Rules for every image

- Attach **`block-1.webp`** or **`role-athlete.webp`** as the character + style reference, so it is the same girl and look.
- Exact size from the heading, **no borders, no padding, no text, no logos**.
- Save as WebP (PNG for the icon) with the exact file name into `apps/flyball/src/assets/images/`.

Negative prompt (already in every prompt below):

```
text, letters, watermark, logo, swoosh, brand marks, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, exposed midriff, cropped top, revealing clothing, low resolution
```

---

### 1. `block-3.webp` — 1600×900 (16:9) — 3-blok · Modifikatsiyalovchi
```
Wide cinematic banner, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with faint court lines, warm amber (#FFB547) accent lighting with soft lime rim light, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy short-sleeve jersey with one thin lime stripe that covers her waist, black shorts, white knee pads, white-and-lime shoes, no logos anywhere. She is mid-air in a single-leg lateral bound, body angled sideways, one knee driving up, arms balancing, agile change-of-direction mood, a curved amber motion trail showing the sideways path. Two faint transparent ghosts of her on the left show the previous bounds. The figure sits in the horizontal middle band of the image with empty dark space above and below. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, exposed midriff, revealing clothing, low resolution
```

### 2. `block-4.webp` — 1600×900 (16:9) — 4-blok · Takomillashtiruvchi
```
Wide cinematic banner, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court with faint court lines, intense coral red (#FF5C7A) accent lighting with soft lime rim light, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy short-sleeve jersey with one thin lime stripe that covers her waist, black shorts, white knee pads, white-and-lime shoes, no logos anywhere. She explodes upward in a maximal reactive jump just after leaving a black wooden plyo box below her, arms driving to the ceiling, body fully extended, peak intensity mood, a coral shockwave ring and sparks on the floor at take-off. The figure sits in the horizontal middle band of the image with empty dark space above and below. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, exposed midriff, revealing clothing, low resolution
```

### 3. `empty-metrics.webp` — 1600×800 (2:1) — "Hali o‘lchov kiritilmagan"
```
Wide still-life scene, stylized 3D render, matte clay-like materials, deep midnight navy indoor volleyball court floor, soft spotlight from above, lime and coral rim light, calm inviting mood, single image, no text. On the floor: a yellow-and-blue volleyball, a coach's clipboard with a blank chart, a soft measuring tape loosely coiled and a stopwatch, arranged neatly in the centre with lots of empty dark space around them, gentle reflections on the glossy floor. No people. Negative: text, letters, numbers, watermark, logo, border, frame, collage, grid, montage, multiple panels, blurred padding, clutter, low resolution
```

### 4. `onboarding-hero.webp` — 1080×1350 (4:5) — intro screen (recommended)
```
Tall portrait hero image, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball arena with spotlights, electric lime rim light from one side and coral pink from the other, dramatic upward camera angle, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail flying, plain navy short-sleeve jersey with one thin lime stripe, jersey tucked in and fully covering her waist, black shorts, white knee pads, white-and-lime shoes, no logos anywhere. She is at the peak of a powerful spike jump above the net, body arched like a bow, hitting arm drawn back, the volleyball glowing lime just above her hand near the top of the image, lime and coral motion trails curving up from the floor. Keep the ball and her whole body inside the frame, with the lower third of the image calm and darker for text. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, exposed midriff, cropped top, revealing clothing, low resolution
```

### 5. `element-sakrash.webp` — 1600×900 (16:9) — O‘yin · Sakrash
```
Wide cinematic banner, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court near the net, electric lime rim light from the left and coral pink rim light from the right, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy short-sleeve jersey with one thin lime stripe that covers her waist, black shorts, white knee pads, white-and-lime shoes, no logos anywhere. Jump set: at the top of her jump she sets a volleyball with both hands just above her forehead, fingers shaped around the ball, the ball glowing softly lime. Side view, whole body visible, figure in the centre-left with empty space on the right. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, spike, one-hand hit, exposed midriff, revealing clothing, low resolution
```
Check: **two-hand** set (not a spike).

### 6. `element-blok.webp` — 1600×900 (16:9) — O‘yin · Blok qo‘yish
```
Wide cinematic banner, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, single image, no text. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy short-sleeve jersey with one thin lime stripe that covers her waist, black shorts, white knee pads, white-and-lime shoes, no logos anywhere. Block: seen from the opponent's side through the net mesh, she jumps and pushes both arms over the top of the net, hands wide apart with fingers spread, eyes focused forward, a volleyball bouncing off her hands with a small lime burst. Upper body and arms large in frame, centred. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, extra fingers, distorted hands, one hand only, exposed midriff, revealing clothing, low resolution
```
Check: **both** hands over the net.

### 7. `app-icon.png` — 1024×1024 (1:1)
```
App icon, single centred symbol on a solid deep midnight navy (#0A0F1E) square background that fills the whole image edge to edge: a minimalist volleyball drawn with three bold curved electric lime (#D4FF3A) stripes, with a short coral pink (#FF5C7A) upward motion streak at its lower left, flat vector style with very subtle depth, crisp clean edges, symbol occupies the central 60 percent of the canvas with even empty margin all round, readable at 48 pixels. Negative: text, letters, people, photo, scene, border, frame, rounded corners, drop shadow outside, multiple icons, grid, mockup, phone, gradient background
```
Check: one symbol, centred, full navy background, **no rounded corners** (Android rounds them itself and crops the outer ~20%).

### 8. `feature-graphic.webp` — 1024×500 — Google Play listing (optional)
```
Wide promotional banner, stylized 3D sports illustration, matte clay-like render, deep midnight navy indoor volleyball arena with spotlights, electric lime and coral pink rim light, single image, no text. On the right third: a 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy short-sleeve jersey with one thin lime stripe that covers her waist, black shorts, white knee pads, white-and-lime shoes, no logos, at the peak of a spike jump with the ball glowing lime. The left two thirds are calm dark navy with faint court lines, empty, reserved for the app name. Negative: text, letters, watermark, logo, swoosh, border, frame, collage, grid, montage, multiple panels, blurred padding, extra limbs, distorted hands, exposed midriff, revealing clothing, low resolution
```
The "FLYBALL" title gets added on top afterwards, so the type is crisp and correct.

---

## Checklist

- [ ] 1 `block-3.webp`
- [ ] 2 `block-4.webp`
- [ ] 3 `empty-metrics.webp`
- [ ] 4 `onboarding-hero.webp` (recommended)
- [ ] 5 `element-sakrash.webp`
- [ ] 6 `element-blok.webp`
- [ ] 7 `app-icon.png`
- [ ] 8 `feature-graphic.webp` (optional)
- [ ] Erase logos on `role-coach`, `role-athlete`, `block-1`, `block-2`, `element-hujum`

Send them one at a time or together in a zip. Each one gets checked before it goes into the app.
