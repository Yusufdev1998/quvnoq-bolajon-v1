import { Check, ChevronRight, Lock, Play } from 'lucide-react';
import { href } from '../../app/router.ts';
import type { AthleteContext } from '../../core/store.ts';
import { BLOCKS, exercisesOfBlock } from '../../domain/catalog.ts';
import { prescribe } from '../../domain/load.ts';
import { MASTERY } from '../../domain/progression.ts';
import { Artwork } from '../../ui/art.tsx';
import { IntensityBars, Meter, PageHeader, Pill } from '../../ui/kit.tsx';

const STATE_LABEL = { locked: 'Hali ochilmagan', active: 'Hozirgi bosqich', mastered: 'O‘zlashtirildi' };

export function TrainingPage({ ctx }: { ctx: AthleteContext }) {
  return (
    <>
      <PageHeader eyebrow="1-bo‘lim" title="Plyometrik mashqlar" />
      <p className="lead">
        Mashqlar to‘rtta bosqichga bo‘lingan. Yuklama asta-sekin oshadi. Keyingi bosqich ochilishi uchun kamida {MASTERY.minSessions} ta
        mashg‘ulot va oxirgi {MASTERY.window} tasida texnika o‘rtachasi {MASTERY.techniqueAvg} yoki undan yuqori bo‘lishi kerak.
      </p>

      <ol className="track">
        {BLOCKS.map((b) => {
          const p = ctx.progress[b.id - 1];
          const locked = p.state === 'locked';
          return (
            <li key={b.id} className={`track__block track__block--${p.state}`} style={{ '--block': b.color } as React.CSSProperties}>
              <div className="track__rail" aria-hidden>
                <span className="track__dot">{p.state === 'mastered' ? <Check size={16} strokeWidth={3} /> : locked ? <Lock size={14} /> : b.id}</span>
              </div>
              <div className="track__body">
                <Artwork name={`block-${b.id}`} alt={`${b.id}-bosqich: ${b.name}`} className="track__cover" />
                <div className="track__head">
                  <div>
                    <p className="eyebrow">{b.id}-bosqich</p>
                    <h2>{b.name}</h2>
                  </div>
                  <Pill tone={p.state === 'mastered' ? 'good' : locked ? 'muted' : undefined} color={p.state === 'active' ? b.color : undefined}>
                    {STATE_LABEL[p.state]}
                  </Pill>
                </div>
                <p className="muted">{b.goal}</p>
                {!locked && (
                  <div className="track__progress">
                    <span>
                      {Math.min(p.sessions, MASTERY.minSessions)}/{MASTERY.minSessions} ta mashg‘ulot · texnika bahosi {p.recentTechnique ?? '—'}
                    </span>
                    <Meter value={Math.min(p.sessions, MASTERY.minSessions)} max={MASTERY.minSessions} color={b.color} />
                  </div>
                )}
                <ul className="ex-list">
                  {exercisesOfBlock(b.id).map((ex) => {
                    const rx = prescribe(ex, ctx.profile);
                    return (
                      <li key={ex.id}>
                        <a href={href({ name: 'exercise', id: ex.id })} className={locked ? 'is-locked' : ''}>
                          <div>
                            <strong>{ex.name}</strong>
                            <span>
                              {rx.sets}×{rx.reps}
                              {ex.perLeg ? ' har oyoqqa' : ''} · dam {rx.restSec} s
                            </span>
                          </div>
                          <IntensityBars intensity={ex.intensity} />
                          <ChevronRight size={18} className="muted" />
                        </a>
                      </li>
                    );
                  })}
                </ul>
                {!locked && (
                  <a className={`btn ${p.state === 'active' ? 'btn--primary' : 'btn--ghost'}`} href={href({ name: 'run-plyo', block: b.id })}>
                    <Play size={16} fill="currentColor" /> {p.state === 'mastered' ? 'Takrorlash' : `${b.id}-bosqich mashg‘uloti`}
                  </a>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </>
  );
}
