import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from 'react';
import type { ReactNode } from 'react';
import { Music2, Pause, Play, Volume2, VolumeX, X } from 'lucide-react';

const VOLUME_KEY = 'quvnoq-bolajon-music-volume';
type MusicState = {
  enabled: boolean; playing: boolean; starting: boolean; volume: number; error: string;
  animationRunning: boolean; toggle: () => void; setVolume: (value: number) => void;
  setAnimationRunning: (value: boolean) => void;
};
const MusicContext = createContext<MusicState | null>(null);

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) throw new Error('Music controls require MusicProvider.');
  return context;
}

export function MusicProvider({ children }: { children: ReactNode }) {
  const audio = useRef<HTMLAudioElement>(null);
  const intent = useRef(false);
  const blocked = useRef(true);
  const request = useRef(0);
  const [enabled, setEnabled] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [starting, setStarting] = useState(false);
  const [error, setError] = useState('');
  const [animationRunning, setAnimationRunning] = useState(false);
  const [volume, updateVolume] = useState(() => {
    try {
      const saved = localStorage.getItem(VOLUME_KEY);
      const value = saved === null ? 0.25 : Number(saved);
      return Number.isFinite(value) && value >= 0 && value <= 1 ? value : 0.25;
    } catch { return 0.25; }
  });

  const play = useCallback(async () => {
    const element = audio.current;
    if (!element || !intent.current || blocked.current || document.hidden) return;
    const current = ++request.current;
    setStarting(true);
    setError('');
    try {
      if (element.error) element.load();
      await element.play();
      if (current !== request.current || !intent.current || blocked.current || document.hidden) {
        if (!intent.current || blocked.current || document.hidden) element.pause();
        return;
      }
      setPlaying(true);
    } catch {
      if (current !== request.current || !intent.current || blocked.current) return;
      intent.current = false;
      setEnabled(false);
      setPlaying(false);
      setError('Musiqa ochilmadi. Yana bir marta yoqib ko‘ring.');
    } finally { if (current === request.current) setStarting(false); }
  }, []);

  const toggle = useCallback(() => {
    const next = !intent.current;
    intent.current = next;
    setEnabled(next);
    setError('');
    if (next) { void play(); }
    else {
      request.current++;
      setStarting(false);
      audio.current?.pause();
      setPlaying(false);
    }
  }, [play]);

  useEffect(() => {
    if (audio.current) audio.current.volume = volume;
    try { localStorage.setItem(VOLUME_KEY, String(volume)); } catch { /* Playback remains usable without storage. */ }
  }, [volume]);

  useEffect(() => {
    blocked.current = !animationRunning;
    if (!animationRunning) {
      request.current++;
      setStarting(false);
      audio.current?.pause();
      setPlaying(false);
    } else if (intent.current && !document.hidden) { void play(); }
  }, [animationRunning, play]);

  useEffect(() => {
    const stopInBackground = () => {
      if (!document.hidden) return;
      intent.current = false;
      request.current++;
      audio.current?.pause();
      setStarting(false);
      setPlaying(false);
      setEnabled(false);
    };
    document.addEventListener('visibilitychange', stopInBackground);
    return () => document.removeEventListener('visibilitychange', stopInBackground);
  }, []);

  return <MusicContext.Provider value={{ enabled, playing, starting, volume, error, animationRunning, toggle, setVolume: value => updateVolume(Math.max(0, Math.min(value, 1))), setAnimationRunning }}>
    {children}
    <audio ref={audio} src="/audio/quvnoq-raqs.wav" loop preload="none" aria-hidden="true"
      onPlaying={() => {
        if (!intent.current || blocked.current || document.hidden) { audio.current?.pause(); return; }
        setPlaying(true);
      }}
      onPause={() => {
        setPlaying(false);
        if (intent.current && !blocked.current) { intent.current = false; setEnabled(false); }
      }}
      onError={() => { intent.current = false; request.current++; setEnabled(false); setPlaying(false); setStarting(false); setError('Musiqa yuklanmadi. Internet yoki ilova fayllarini tekshiring.'); }} />
  </MusicContext.Provider>;
}

export function MusicControl() {
  const music = useMusic();
  const [open, setOpen] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const audible = music.enabled && music.playing && music.volume > 0;
  useEffect(() => {
    if (!open) return;
    const outside = (event: PointerEvent) => { if (!root.current?.contains(event.target as Node)) setOpen(false); };
    const escape = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      event.preventDefault(); event.stopPropagation(); setOpen(false); trigger.current?.focus();
    };
    document.addEventListener('pointerdown', outside);
    document.addEventListener('keydown', escape, true);
    return () => { document.removeEventListener('pointerdown', outside); document.removeEventListener('keydown', escape, true); };
  }, [open]);

  return <div className="music-control" ref={root}>
    <button className={`music-trigger ${audible ? 'is-on' : ''}`} ref={trigger} onClick={() => setOpen(value => !value)} aria-label="Fon musiqasi" aria-expanded={open} aria-controls={panelId} title="Fon musiqasi">
      <Music2 size={19} /><span>Musiqa</span>{audible && <span className="music-indicator" aria-hidden="true" />}
    </button>
    {open && <section id={panelId} className="music-panel" aria-label="Musiqa sozlamalari">
      <div className="music-panel-heading"><span className="music-panel-icon"><Music2 size={21} /></span><div><h2>Quvnoq raqs</h2><p>Jo‘shqin raqs musiqasi</p></div><button className="icon-button" aria-label="Musiqa sozlamalarini yopish" onClick={() => { setOpen(false); trigger.current?.focus(); }}><X size={17} /></button></div>
      <button className={`music-play-button ${music.enabled ? 'is-playing' : ''}`} onClick={music.toggle} disabled={music.starting}>
        {music.enabled ? <Pause size={17} /> : <Play size={17} fill="currentColor" />}
        {music.starting ? 'Musiqa yuklanyapti…' : music.enabled ? 'Musiqani o‘chirish' : 'Musiqani yoqish'}
      </button>
      <div className="music-status" role="status">{music.error || (music.enabled && !music.animationRunning ? 'Animatsiya boshlanganda musiqa yangraydi' : audible ? 'Musiqa yangrayapti' : music.enabled && music.volume === 0 ? 'Ovoz o‘chirilgan · 0%' : 'Musiqa faqat animatsiya vaqtida yangraydi')}</div>
      <label className="music-volume-label" htmlFor={`${panelId}-volume`}><span>Ovoz balandligi</span><output>{Math.round(music.volume * 100)}%</output></label>
      <div className="music-volume">{music.volume === 0 ? <VolumeX size={16} /> : <Volume2 size={16} />}<input id={`${panelId}-volume`} type="range" min="0" max="100" step="5" value={Math.round(music.volume * 100)} onChange={event => music.setVolume(Number(event.target.value) / 100)} aria-label="Musiqa ovozi" /></div>
      <p className="music-footnote">Mashg‘ulotlarni ovozsiz ham bajarish mumkin.</p>
    </section>}
  </div>;
}
