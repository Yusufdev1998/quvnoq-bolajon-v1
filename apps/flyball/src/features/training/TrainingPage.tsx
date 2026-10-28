import { Check, ChevronRight, Lock, Play } from 'lucide-react';
import { href } from '../../app/router.ts';
import type { AthleteContext } from '../../core/store.ts';
import { BLOCKS, exercisesOfBlock } from '../../domain/catalog.ts';
import { prescribe } from '../../domain/load.ts';
import { MASTERY } from '../../domain/progression.ts';
import { IntensityBars, Meter, PageHeader, Pill } from '../../ui/kit.tsx';

const STATE_LABEL = { locked: 'Yopiq', active: 'Joriy', mastered: 'O‘zlashtirildi' };

export function TrainingPage({ ctx }: { ctx: AthleteContext }) {
  return (
    <>
      <PageHeader eyebrow="1-bo‘lim" title="Plyometrik mashqlar" />
      <p className="lead">
        Mashqlar to‘rtta metodik blokda, yuklama bosqichma-bosqich oshadi. Keyingi blok oldingisi o‘zlashtirilgach ochiladi: kamida {MASTERY.minSessions} ta
        mashg‘ulot va oxirgi {MASTERY.window} tasida texnika o‘rtachasi {MASTERY.techniqueAvg} va undan yuqori.
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
                <div className="track__head">
                  <div>
                    <p className="eyebrow">{b.id}-blok</p>
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
                      {Math.min(p.sessions, MASTERY.minSessions)}/{MASTERY.minSessions} mashg‘ulot · texnika {p.recentTechnique ?? '—'}
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
                    <Play size={16} fill="currentColor" /> {p.state === 'mastered' ? 'Takrorlash' : `${b.id}-blok mashg‘uloti`}
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
