"""Render an original, seamless 124 BPM instrumental dance loop."""
from pathlib import Path
import wave
import numpy as np

RATE = 22050
BPM = 124
BEAT = 60 / BPM
BAR = BEAT * 4
BARS = 32
DURATION = BAR * BARS
samples = round(DURATION * RATE)
mix = np.zeros((samples, 2), dtype=np.float64)
rng = np.random.default_rng(124)


def hz(midi):
    return 440 * 2 ** ((midi - 69) / 12)


def add(tone, start, pan=0):
    # Wrap releases and delay tails across the seam for continuous playback.
    positions = (np.arange(len(tone)) + round(start * RATE)) % samples
    np.add.at(mix[:, 0], positions, tone * np.cos((pan + 1) * np.pi / 4))
    np.add.at(mix[:, 1], positions, tone * np.sin((pan + 1) * np.pi / 4))


def envelope(t, length, attack=0.006, decay=6):
    return np.minimum(t / attack, 1) * np.exp(-decay * t) * np.clip((length - t) / 0.035, 0, 1)


def pluck(midi, start, length=0.48, level=0.12, pan=0, bright=False):
    t = np.arange(round(length * RATE)) / RATE
    f = hz(midi)
    tone = np.sin(2 * np.pi * f * t)
    tone += 0.26 * np.sin(2 * np.pi * f * 2 * t) * np.exp(-5 * t)
    tone += 0.10 * np.sin(2 * np.pi * f * 3 * t) * np.exp(-8 * t)
    if bright:
        tone += 0.11 * np.sin(2 * np.pi * f * 1.004 * t)
    sound = tone * envelope(t, length, decay=5 if bright else 8) * level
    add(sound, start, pan)
    if bright:
        add(sound * 0.17, start + 0.75 * BEAT, -pan)


def bass(midi, start, length=0.21):
    t = np.arange(round(length * RATE)) / RATE
    f = hz(midi)
    tone = np.sin(2 * np.pi * f * t)
    # Upper harmonics keep the bass audible on small phone speakers.
    tone += 0.42 * np.sin(2 * np.pi * f * 2 * t)
    tone += 0.18 * np.sin(2 * np.pi * f * 3 * t)
    add(tone * envelope(t, length, attack=0.008, decay=5) * 0.16, start)


def kick(start, level=0.38):
    length = 0.38
    t = np.arange(round(length * RATE)) / RATE
    phase = 2 * np.pi * (53 * t + 102 * 0.024 * (1 - np.exp(-t / 0.024)))
    tone = np.sin(phase) * np.exp(-11 * t)
    tone += 0.035 * rng.standard_normal(len(t)) * np.exp(-180 * t)
    add(tone * np.minimum(t / 0.002, 1) * np.clip((length - t) / 0.025, 0, 1) * level, start)


def clap(start, level=0.095):
    length = 0.22
    t = np.arange(round(length * RATE)) / RATE
    noise = rng.standard_normal(len(t))
    noise -= np.convolve(noise, np.ones(9) / 9, mode='same')
    bursts = sum(np.exp(-np.maximum(t - delay, 0) / 0.027) * (t >= delay) for delay in [0, 0.011, 0.023])
    add(noise * bursts * np.minimum(t / 0.001, 1) * np.clip((length - t) / 0.03, 0, 1) * level, start, 0.08)


def hat(start, opened=False, level=0.035, pan=-0.22):
    length = 0.22 if opened else 0.075
    t = np.arange(round(length * RATE)) / RATE
    noise = rng.standard_normal(len(t))
    noise -= np.convolve(noise, np.ones(5) / 5, mode='same')
    noise += 0.15 * np.sin(2 * np.pi * 6200 * t)
    add(noise * envelope(t, length, attack=0.001, decay=20 if opened else 65) * level, start, pan)


# Major-key hooks over C, Am, F and G, with offbeat chord stabs.
chords = [[60, 64, 67], [57, 60, 64], [53, 57, 60], [55, 59, 62]]
roots = [36, 33, 29, 31]
phrases = [
    [(76, 0, .5), (79, .75, .5), (76, 1.5, .5), (74, 2, .5), (72, 2.75, .5), (76, 3.5, .5)],
    [(72, 0, .5), (76, .5, .5), (81, 1.5, .5), (79, 2.25, .5), (76, 3, .75)],
    [(77, 0, .5), (76, .75, .5), (72, 1.5, .5), (69, 2, .5), (72, 2.75, .5), (77, 3.5, .5)],
    [(74, 0, .5), (79, .75, .5), (83, 1.5, .5), (79, 2.5, .5), (74, 3.25, .5)],
    [(79, 0, .5), (76, .5, .5), (79, 1.25, .5), (84, 2, .75), (79, 3, .5), (76, 3.5, .5)],
    [(81, 0, .5), (79, .75, .5), (76, 1.5, .75), (72, 2.5, .5), (76, 3.25, .5)],
    [(77, 0, .5), (81, .75, .5), (77, 1.5, .5), (76, 2.25, .5), (72, 3, .75)],
    [(74, 0, .5), (79, .5, .5), (74, 1.25, .5), (71, 2, .5), (74, 2.75, .5), (79, 3.5, .5)],
]

for bar in range(BARS):
    start = bar * BAR
    harmony = bar % 4
    breakdown = 16 <= bar < 20
    # Four-on-the-floor kick, backbeat claps and alternating hi-hats.
    for beat in range(4):
        if not breakdown or beat in [0, 2]:
            kick(start + beat * BEAT, 0.32 if breakdown else 0.38)
        if beat in [1, 3]:
            clap(start + beat * BEAT, 0.055 if breakdown else 0.095)
        hat(start + beat * BEAT, level=0.018)
        hat(start + (beat + 0.5) * BEAT, opened=not breakdown, level=0.026, pan=0.25)
    if bar % 8 == 7:
        for beat in [3.25, 3.5, 3.75]:
            hat(start + beat * BEAT, level=0.026, pan=-0.3)
        if bar in [7, 23, 31]:
            clap(start + 3.75 * BEAT, 0.045)

    for beat, interval in [(0.5, 0), (1.5, 0), (2.5, 7), (3.25, 0), (3.75, 12)]:
        bass(roots[harmony] + interval, start + beat * BEAT, 0.15 if beat % 1 != .5 else 0.24)
    for beat in [0.5, 1.5, 2.5, 3.5]:
        for i, note in enumerate(chords[harmony]):
            pluck(note + 12, start + beat * BEAT, 0.3, 0.027 if breakdown else 0.047, (i - 1) * 0.35)

    for note, beat, duration in phrases[bar % 8]:
        if breakdown and beat % 1:
            continue
        pluck(note, start + beat * BEAT, duration * BEAT + 0.16, 0.095 if breakdown else 0.13, 0.12 if bar % 2 else -0.12, bright=True)

# Round transients and leave headroom for the existing volume control.
mix = np.tanh(mix * 1.15)
mix *= 0.62 / np.max(np.abs(mix))
pcm = (np.clip(mix, -1, 1) * 32767).astype('<i2')
output = Path(__file__).resolve().parents[1] / 'public/audio/quvnoq-raqs.wav'
output.parent.mkdir(parents=True, exist_ok=True)
with wave.open(str(output), 'wb') as track:
    track.setnchannels(2)
    track.setsampwidth(2)
    track.setframerate(RATE)
    track.writeframes(pcm.tobytes())
print(f'Rendered {BPM} BPM, {DURATION:.1f}s stereo dance loop: {output.name} ({output.stat().st_size:,} bytes)')

