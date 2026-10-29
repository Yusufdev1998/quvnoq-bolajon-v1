import { ChevronRight, Lock, Play } from 'lucide-react';
import { useState } from 'react';
import { href } from '../../app/router.ts';
import type { AthleteContext } from '../../core/store.ts';
import { blockInfo, GAME_DRILLS, GAME_ELEMENTS } from '../../domain/catalog.ts';
import { prescribe } from '../../domain/load.ts';
import type { GameElement } from '../../domain/types.ts';
import { AthleteMotion } from '../../ui/AthleteMotion.tsx';
import { Artwork } from '../../ui/art.tsx';
import { IntensityBars, PageHeader, Segmented } from '../../ui/kit.tsx';

export function GamePage({ ctx }: { ctx: AthleteContext }) {
  const [element, setElement] = useState<GameElement>('hujum');
  const info = GAME_ELEMENTS.find((e) => e.id === element)!;
  const drills = GAME_DRILLS.filter((d) => d.element === element);
  const open = drills.filter((d) => d.minBlock <= ctx.block);

  return (
    <>
      <PageHeader eyebrow="3-bo‘lim" title="O‘yin elementlari" />
      <p className="lead">Sakrash mashqlari voleybol harakatlari bilan uyg‘unlashtirilgan. Bu sakrash kuchi bilan birga texnik va taktik ko‘nikmalarni ham rivojlantiradi.</p>

      <Segmented options={GAME_ELEMENTS.map((e) => ({ id: e.id, label: e.name }))} value={element} onChange={setElement} />
      <Artwork key={element} name={`element-${element}`} alt={info.name} className="element-cover" />
      <p className="muted element-desc">{info.description}</p>

      <div className="drills">
        {drills.map((d) => {
          const locked = d.minBlock > ctx.block;
          const rx = prescribe(d, ctx.profile);
          return (
            <a key={d.id} href={href({ name: 'drill', id: d.id })} className={`drill ${locked ? 'is-locked' : ''}`} style={{ '--block': blockInfo(d.minBlock).color } as React.CSSProperties}>
              <div className="drill__art">
                <Artwork name={`drill-${d.id}`} alt="" fallback={<AthleteMotion motion={d.motion} label={d.name} />} />
              </div>
              <div className="drill__body">
                <div className="drill__meta">
                  <IntensityBars intensity={d.intensity} />
                  <span>{locked ? <><Lock size={12} /> {d.minBlock}-bosqichdan</> : `${rx.sets}×${rx.reps}`}</span>
                </div>
                <strong>{d.name}</strong>
                <span className="drill__combo">
                  {d.plyo} <b>+</b> {d.volleyball}
                </span>
              </div>
              <ChevronRight size={18} className="muted" />
            </a>
          );
        })}
      </div>

      {open.length > 0 ? (
        <a className="btn btn--primary btn--block" href={href({ name: 'run-game', element })}>
          <Play size={18} fill="currentColor" /> {info.name}: {open.length} ta mashq
        </a>
      ) : (
        <p className="muted center">Bu yo‘nalishdagi mashqlar keyingi bosqichlarda ochiladi.</p>
      )}
    </>
  );
}
