# Flyball — AI video prompts for the game drills

Short looping clips for the 9 game drills (O‘yin elementlari). The app plays them **muted, looping, only while on screen**, on the drill card, the drill page and the workout screen. If a drill has no video, the app shows its still image, then the animated figure.

## Where the files go

Save each clip as **`apps/flyball/src/assets/videos/<name>.mp4`**, using the names below. The app picks them up automatically. A still with the same name in `src/assets/images/` becomes the poster frame (shown before the clip loads, and instead of it when the phone has "reduce motion" on).

## Video settings

| Setting | Value | Why |
| --- | --- | --- |
| Length | **4–6 s** | One clean repetition of the drill |
| Loop | **Seamless**: last frame ≈ first frame | It replays forever on the card |
| Aspect | **16:9 or 4:3**, athlete centred | The app crops to 4:3; keep 15% empty margin left and right |
| Camera | **Locked / static**, no zoom, no cuts | Moving cameras make the movement hard to read |
| Audio | None (it is removed anyway) | Videos always play muted |
| Format | MP4 (H.264), 720p is enough | Plays in every browser and in Android WebView |
| Size | Aim for ≤ 2 MB per clip | Send the originals; they get compressed to fit |

## How to get consistent results

1. **Use image-to-video, not text-to-video.** Start every clip from a still of the same girl, ideally the drill's own approved still, or `onboarding-hero.webp` / `ex-landing.webp` as the character reference. Runway, Kling, Luma, Pika, Veo and Sora all support a start image.
2. **One clip per drill.** No split screens, no montage, no captions.
3. **Describe the movement in order, step by step.** Video models follow a timeline much better than a single pose.
4. Check every clip against its **Check** line, and especially that the feet and the ball move the right way.

Negative prompt (if your tool has one):

```
text, captions, subtitles, logo, swoosh, watermark, split screen, collage, multiple panels, camera shake, zoom, cuts, slow motion blur smear, extra limbs, distorted hands, morphing body, sliding feet, floating without jumping, revealing clothing
```

Shared start of every prompt (already included below):

> Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes.

---

## Sakrash

### 1. `drill-set-jump.mp4` — Sakrab pas berish
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Three-quarter side view, full body in frame. A volleyball is tossed in from the right edge in a high arc. She sinks into a half squat, jumps straight up, meets the ball above her forehead with both hands and sets it up and back out of frame, then lands softly on both feet and returns to the ready stance.
```
Check: two-hand overhead set at the top of the jump; soft two-foot landing.

### 2. `drill-dig-hops.mp4` — Yon sakrash va to‘pni ko‘tarish
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Front view, full body in frame, a glowing lime line on the floor. She hops sideways over the line four times with feet together, then a volleyball comes in low from the right; she shuffles and drops into a low stance, joins her forearms into a flat platform and digs the ball up, then recovers to standing.
```
Check: four two-foot side hops, then a forearm dig (not an overhead pass).

### 3. `drill-tuck-serve.mp4` — Sakrab uzatishga tayyorgarlik
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court seen from behind the white end line, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Side view, full body in frame, standing behind the end line holding a volleyball. She tosses the ball high in front of her, takes two quick approach steps, jumps and arches her body, and hits a jump serve over the net far in the background, then lands on both feet behind the line.
```
Check: she serves from **behind the end line**, the net is far away.

## Hujum zarbasi

### 4. `drill-approach-attack.mp4` — Yugurib kelib hujum zarbasi
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court with a net on the right, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Side view, full body in frame. A volleyball is set high near the net. She takes a three-step approach toward the net (left, right, left), swings both arms back on the last step, jumps off both feet, swings her right arm and spikes the ball down over the net, then lands on both feet without touching the net.
```
Check: three steps, two-foot take-off, one-arm hit at the top, two-foot landing.

### 5. `drill-depth-attack.mp4` — Tumbadan tushib hujum
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court with a net on the right and a low black plyo box two metres from the net, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Side view, full body in frame. She stands on the box, steps off, lands on both feet and immediately takes two quick steps toward the net, jumps and spikes a set ball over the net, then lands on both feet.
```
Check: she **steps off the box**, then attacks at the net in one continuous movement.

### 6. `drill-double-attack.mp4` — Ketma-ket ikki hujum
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court with a net on the right and a white attack line three metres back, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Side view, full body in frame. She approaches and spikes a first ball over the net, lands, backpedals quickly to the attack line facing the net, then approaches again and spikes a second ball, and lands.
```
Check: **two** spikes with a return to the attack line in between.

## Blok qo‘yish

### 7. `drill-static-block.mp4` — Joyidan blok sakrashi
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Side view along the net, full body in frame. She stands right at the net with hands at shoulder height, bends her knees, jumps straight up and pushes both hands over the top of the net with fingers spread, then lands on both feet in the same spot without touching the net.
```
Check: **both** hands go over the net; straight up and down, no travel.

### 8. `drill-shuffle-block.mp4` — Yon qadam va blok
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Front view from her side of the net, full body in frame. She starts in the middle of the net, takes two quick side shuffle steps to the right without crossing her feet, stops, jumps and blocks with both hands over the net, lands, then shuffles back to the middle.
```
Check: side shuffles (feet don't cross) **then** a two-hand block.

### 9. `drill-triple-block.mp4` — Chap — markaz — o‘ng bloklar
```
Stylized 3D animated sports scene, matte clay-like render, deep midnight navy indoor volleyball court, electric lime rim light from the left and coral pink rim light from the right, static camera, wide shot of the whole net, smooth realistic motion at normal speed, seamless loop. A 15-year-old Central Asian girl volleyball player, dark high ponytail, plain navy jersey with one thin lime stripe and no logos, black shorts, white knee pads, white-and-lime shoes. Front view from her side of the net, full body in frame. She blocks at the left of the net with both hands over the tape, lands, shuffles to the middle and blocks again, lands, shuffles to the right and blocks a third time, then shuffles back to the left.
```
Check: **three** separate two-hand blocks at left, middle and right.

---

## Optional: section headers as video

The three section headers on the O‘yin screen also accept video: `element-sakrash.mp4`, `element-hujum.mp4`, `element-blok.mp4` (16:9, 4–6 s, same rules). A slow, cinematic version of a set, a spike and a block works well there.

## Checklist

- [ ] 1 `drill-set-jump.mp4`
- [ ] 2 `drill-dig-hops.mp4`
- [ ] 3 `drill-tuck-serve.mp4`
- [ ] 4 `drill-approach-attack.mp4`
- [ ] 5 `drill-depth-attack.mp4`
- [ ] 6 `drill-double-attack.mp4`
- [ ] 7 `drill-static-block.mp4`
- [ ] 8 `drill-shuffle-block.mp4`
- [ ] 9 `drill-triple-block.mp4`

Send the original files (a zip is fine). Each clip gets checked, trimmed to a clean loop if needed, and compressed before it goes into the app.
