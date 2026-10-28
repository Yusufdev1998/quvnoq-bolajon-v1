# Flyball — AI image prompts

Prompts for every caption in the app: onboarding, the four blocks, all 20 exercises, the 3 game elements, all 9 drills, empty states, icon and splash.

## How to use

1. Paste the **style block** at the start of every prompt. It keeps the whole set consistent.
2. Add the **athlete block** wherever the prompt says `[ATHLETE]`.
3. Add the **subject** line for the image.
4. Use the **negative prompt** if your tool supports one (Midjourney: `--no ...`).
5. Generate a few variations of the onboarding hero first, pick the one you like best, and use it as the character/style reference (Midjourney `--cref` / `--sref`, or "reference image" in other tools) for the rest of the set.

Save each image as WebP under the file name given, in `apps/flyball/src/assets/images/`. The app picks up every file there automatically; screens without an image keep the animated figure. Generate images at the ratio in the table without borders or padding, and keep brand logos (e.g. swooshes) off the kit.

---

### Style block (paste first, every time)

> Stylized 3D sports illustration, matte clay-like render with soft subsurface skin, bold cinematic rim light in electric lime (#D4FF3A) from one side and coral pink (#FF5C7A) from the other, deep midnight navy background (#0A0F1E) with faint indoor volleyball court lines and a soft spotlight pool on the floor, subtle motion trails showing the movement path, dynamic low camera angle, clean composition with empty space around the figure, premium sports-app aesthetic, high detail, no text

### Athlete block — `[ATHLETE]`

> a 15-year-old Central Asian girl volleyball player, athletic build, dark hair in a high ponytail, focused determined expression, navy team jersey with a thin lime stripe, black sports shorts, white knee pads, white-and-lime volleyball shoes

### Negative prompt

> text, letters, logos, watermark, extra limbs, extra fingers, distorted hands, twisted knees, unnatural joints, blurry, photo noise, cluttered background, crowd, revealing clothing, sexualized, cartoonish chibi, low detail

### Formats

| Use in app | Ratio | Size |
| --- | --- | --- |
| Exercise / drill stage (detail page, workout runner) | 4:3 | 1200×900 |
| Drill thumbnail (list) | 4:3 | same image as the stage, cropped |
| Block cover | 16:9 | 1600×900 |
| Onboarding hero | 4:5 | 1080×1350 |
| Empty states | 1:1 | 800×800 |
| App icon | 1:1 | 1024×1024 |
| Splash | 9:16 | 1284×2778 |

Midjourney: add `--ar 4:3 --style raw --v 7` (change `--ar` per format).

---

## Onboarding

**`onboarding-hero.webp`** (4:5) — "Sakra balandroq. Uring kuchliroq."
> [ATHLETE] at the peak of a powerful spike jump above a volleyball net, body arched like a bow, hitting arm cocked back, ball glowing with lime light just above her hand, ponytail flying, lime and coral motion trails curving up from the floor, dramatic upward camera angle

**`role-coach.webp`** (1:1) — "Murabbiy"
> a friendly female volleyball coach in a navy tracksuit holding a tablet showing glowing lime charts, whistle around neck, standing courtside, warm confident smile, half-body portrait

**`role-athlete.webp`** (1:1) — "Sportchi"
> [ATHLETE] holding a volleyball under one arm, half-body portrait, confident smile, lime rim light

---

## Method blocks (16:9 covers)

**`block-1.webp`** — 1-blok · Moslashtiruvchi
> [ATHLETE] landing softly from a low box in a perfect athletic stance, knees aligned over toes, calm controlled mood, cool cyan (#4CC9F0) accent lighting instead of lime, gentle ripple on the floor where she lands

**`block-2.webp`** — 2-blok · Rivojlantiruvchi
> [ATHLETE] exploding upward in a tuck jump, knees pulled to chest, energetic mood, mint green (#3DDC97) accent lighting, small burst of light particles under her feet

**`block-3.webp`** — 3-blok · Modifikatsiyalovchi
> [ATHLETE] mid-air in a single-leg lateral bound, body angled sideways, agile changing-direction mood, amber (#FFB547) accent lighting, curved motion trail showing the sideways path

**`block-4.webp`** — 4-blok · Takomillashtiruvchi
> [ATHLETE] in a maximal reactive jump off a plyo box, arms driving up, peak intensity mood, coral red (#FF5C7A) accent lighting, shockwave ring on the floor at take-off

---

## Plyometric exercises (4:3)

### 1-blok — Moslashtiruvchi

**`ex-landing.webp`** — Yerga to‘g‘ri tushish
> [ATHLETE] landing on both feet after stepping off a low 30 cm wooden plyo box, holding a half-squat, knees tracking over toes, heels slightly lifted, arms forward for balance, ghosted silhouette showing her on the box a moment before

**`ex-ankle-hops.webp`** — To‘piq sakrashlari
> [ATHLETE] doing small quick hops on the balls of her feet with almost straight knees, upright posture, arms swinging rhythmically, short repeated lime motion arcs under the feet showing rapid bounces

**`ex-jump-rope.webp`** — Arqon bilan sakrash
> [ATHLETE] skipping a speed rope with both feet, elbows tucked, rope blurred into a glowing lime arc around her, feet just a few centimetres off the floor

**`ex-line-hops.webp`** — Chiziq ustidan yonga sakrash
> [ATHLETE] hopping sideways over a glowing lime court line, both feet together in the air, shoulders square, ghosted silhouettes on both sides of the line showing the side-to-side rhythm

**`ex-squat-jump.webp`** — Yarim o‘tirib sakrash
> [ATHLETE] jumping straight up from a half squat, arms swung overhead, body fully extended, ghosted silhouette of the half-squat start position below her

### 2-blok — Rivojlantiruvchi

**`ex-tuck-jump.webp`** — Tizzalarni ko‘krakka tortib sakrash
> [ATHLETE] at the top of a tuck jump, knees pulled up high to her chest, hands reaching to the knees, torso upright, explosive energy

**`ex-box-jump.webp`** — Tumbaga sakrab chiqish
> [ATHLETE] jumping onto a 40 cm wooden plyo box, landing on top in a soft half squat, arms forward, ghosted take-off silhouette on the floor in front of the box

**`ex-broad-jump.webp`** — Joyidan uzunlikka sakrash
> [ATHLETE] in a standing broad jump flying forward, arms reaching ahead, knees bent, long horizontal lime motion trail from take-off to landing point marked on the floor

**`ex-split-jump.webp`** — Hamla holatida sakrash
> [ATHLETE] mid-air switching legs from a lunge position, one leg forward and one back in a scissor shape, torso upright, arms in running motion

**`ex-skater.webp`** — Konkichi sakrashi
> [ATHLETE] in a skater jump, landing on one leg after a wide lateral bound, other leg crossed behind, one arm swinging across, speed-skater posture, curved sideways motion trail

### 3-blok — Modifikatsiyalovchi

**`ex-depth-jump-low.webp`** — Tumbadan tushib sakrash
> [ATHLETE] rebounding upward immediately after dropping from a 30 cm plyo box, feet just leaving the floor, a bright flash at the floor contact point showing a very short contact, ghosted silhouette on the box behind

**`ex-single-hop.webp`** — Bir oyoqda sakrash
> [ATHLETE] hopping forward on one leg, other knee bent and lifted, arms balanced, three glowing footprints on the floor showing consecutive single-leg hops

**`ex-lateral-box.webp`** — Tumbaga yondan sakrash
> [ATHLETE] jumping sideways onto a low plyo box, body side-on to the camera, both feet landing together, shoulders facing an imaginary net

**`ex-rotation-jump.webp`** — 180° burilib sakrash
> [ATHLETE] mid-air rotating half a turn, body twisted, spiral lime motion trail wrapping around her showing the 180-degree rotation

**`ex-medball-jump.webp`** — To‘ldirma to‘p bilan sakrab otish
> [ATHLETE] jumping up while throwing a 2 kg rubber medicine ball overhead with both hands, whole body extended, ball rising with a coral motion trail

### 4-blok — Takomillashtiruvchi

**`ex-depth-vertical.webp`** — Chuqurlikdan maksimal sakrash
> [ATHLETE] exploding to a maximal vertical jump right after dropping from a plyo box, arms driving to the ceiling, fully extended, shockwave ring on the floor at take-off, ghosted drop silhouette behind

**`ex-hurdle-hops.webp`** — To‘siqlar ustidan sakrash
> [ATHLETE] jumping continuously over a row of five low lime training hurdles, knees high, side view, ghosted silhouettes above each hurdle showing the rhythm

**`ex-approach-jump.webp`** — Uch qadamli hujum sakrashi
> [ATHLETE] in a volleyball spike approach, last powerful step plant with both arms swung back, about to take off toward the net, three glowing footprints behind her marking the left-right-left approach

**`ex-reactive-drop.webp`** — Reaktiv ikki karra sakrash
> [ATHLETE] in the second of two quick consecutive jumps after a box drop, two ghosted silhouettes showing the first jump and the landing, rhythmic double-bounce motion trail

**`ex-bounds.webp`** — Sakrab yugurish
> [ATHLETE] mid-stride in a long bounding run, driving knee high, push-off leg fully extended, opposite arm forward, long arcing motion trail across the court

---

## Game elements (16:9 section headers)

**`element-sakrash.webp`** — Sakrash
> [ATHLETE] jump-setting a volleyball with both hands at the top of her jump, fingers shaped around the ball, soft lime glow on the ball

**`element-hujum.webp`** — Hujum zarbasi
> [ATHLETE] spiking a volleyball over the net at the highest point, hitting arm extended, ball compressed on impact with a coral burst of light

**`element-blok.webp`** — Blok qo‘yish
> [ATHLETE] blocking at the net with both arms reaching over the tape, hands wide with fingers spread, viewed from the opponent's side through the net

---

## Game drills (4:3)

### Sakrash

**`drill-set-jump.webp`** — Sakrab pas berish
> [ATHLETE] jumping from a half squat to set a volleyball overhead with both hands, a partner's hands visible in the foreground having just tossed the ball

**`drill-dig-hops.webp`** — Yon sakrash va to‘pni ko‘tarish
> [ATHLETE] in a low defensive dig, forearm platform under a volleyball, just after a lateral hop over a lime court line, ghosted hop silhouette behind

**`drill-tuck-serve.webp`** — Sakrab uzatishga tayyorgarlik
> [ATHLETE] performing a jump serve behind the end line, ball tossed high, body arched, hitting arm drawn back, a faint ghosted tuck-jump silhouette beside her

### Hujum zarbasi

**`drill-approach-attack.webp`** — Yugurib kelib hujum zarbasi
> [ATHLETE] taking off after a three-step approach toward the net for an outside attack, ball set high above the antenna, glowing footprints marking the approach

**`drill-depth-attack.webp`** — Tumbadan tushib hujum
> [ATHLETE] spiking a ball at the net, with a plyo box two metres behind her and a ghosted silhouette dropping off the box, showing the drop-to-attack sequence

**`drill-double-attack.webp`** — Ketma-ket ikki hujum
> [ATHLETE] spiking a second ball while a ghosted silhouette shows her first spike and her quick return to the attack line, two coral impact bursts

### Blok qo‘yish

**`drill-static-block.webp`** — Joyidan blok sakrashi
> [ATHLETE] straight-up block jump at the net from a standing start, hands penetrating over the tape, eyes on the hitter

**`drill-shuffle-block.webp`** — Yon qadam va blok
> [ATHLETE] blocking at the net after two side shuffles, glowing lateral footprints along the net, body square to the net

**`drill-triple-block.webp`** — Chap — markaz — o‘ng bloklar
> [ATHLETE] blocking at three positions along the net, shown as three ghosted silhouettes at left, middle and right with the solid figure at the right, lime arcs connecting them

---

## Empty states and system images

**`empty-sessions.webp`** (1:1) — "Hali mashg‘ulot yo‘q"
> a single volleyball resting on an empty court floor under a soft spotlight, lime rim light, calm inviting mood, lots of empty space

**`empty-metrics.webp`** (1:1) — "Hali o‘lchov kiritilmagan"
> a measuring tape, a stopwatch and a clipboard with a blank chart arranged neatly on a court floor, spotlight, lime and coral rim light

**`rest-timer.webp`** (1:1) — "Dam olish"
> [ATHLETE] sitting on a bench catching her breath, towel on shoulders, water bottle in hand, relaxed, cool cyan lighting

**`session-done.webp`** (1:1) — "Mashg‘ulot yakunlandi"
> [ATHLETE] celebrating with a fist pump, small burst of lime and coral confetti light particles, joyful expression

**`app-icon.png`** (1:1, 1024×1024)
> app icon, minimalist volleyball made of three bold curved lime (#D4FF3A) stripes with a small coral (#FF5C7A) upward motion streak, centered on a deep midnight navy (#0A0F1E) rounded square, flat vector with subtle depth, no text

**`splash.png`** (9:16)
> deep midnight navy background with faint court lines, a glowing lime volleyball rising in the center leaving a coral motion trail, generous empty space above and below for the logo, no text
