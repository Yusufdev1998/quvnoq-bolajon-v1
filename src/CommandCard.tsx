import { useEffect, useState } from 'react';
import { Eye, Footprints, Hand, Leaf } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { commandSignal } from './data';
import type { Signal, Step } from './data';

const cards: Record<Signal, { icon: LucideIcon; color: string; word: string }> = {
  go: { icon: Footprints, color: 'Yashil', word: 'Harakat' },
  stop: { icon: Hand, color: 'Qizil', word: 'To‘xta' },
  ready: { icon: Eye, color: 'Sariq', word: 'Tayyorlan' },
  rest: { icon: Leaf, color: 'Ko‘k', word: 'Dam ol' },
};

// Every command arrives as a colored card with a gesture icon, as in a hearing-impaired
// group: it is held up large when the step starts, then stays as a smaller card in the corner.
export function CommandCard({ step, paused }: { step: Step; paused: boolean }) {
  const signal = commandSignal(step), { icon: Icon, color, word } = cards[signal];
  const [raised, setRaised] = useState(true);
  useEffect(() => {
    if (paused) return;
    const timer = setTimeout(() => setRaised(false), 1800);
    return () => clearTimeout(timer);
  }, [paused]);
  return <>
    {raised && <div className={`command-card raised ${signal}`} aria-hidden="true"><Icon size={46} strokeWidth={2.2} /><strong>{word}</strong><span>{step.cue}</span></div>}
    <span className={`command-card corner ${signal}`} role="status" aria-label={`${color} kartochka: ${step.cue}`}><Icon size={18} strokeWidth={2.4} />{step.cue}</span>
  </>;
}
