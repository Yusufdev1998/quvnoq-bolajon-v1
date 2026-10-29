import { Dumbbell, Footprints, Lock, Play, Timer } from 'lucide-react';
import { href } from '../../app/router.ts';
import type { AthleteContext } from '../../core/store.ts';
import { blockInfo, drillById, exerciseById, GAME_ELEMENTS, INTENSITY_LABEL } from '../../domain/catalog.ts';
import { prescribe } from '../../domain/load.ts';
import { AthleteMotion } from '../../ui/AthleteMotion.tsx';
import { Artwork, VideoCredit } from '../../ui/art.tsx';
import { Card, Empty, PageHeader, Pill } from '../../ui/kit.tsx';

export function DetailPage({ kind, id, ctx }: { kind: 'exercise' | 'drill'; id: string; ctx: AthleteContext }) {
  const exercise = kind === 'exercise' ? exerciseById(id) : undefined;
  const drill = kind === 'drill' ? drillById(id) : undefined;
  const item = exercise ?? drill;
  const back = kind === 'exercise' ? href({ name: 'training' }) : href({ name: 'game' });
  if (!item) {
    return (
      <>
        <PageHeader title="Topilmadi" back={back} />
        <Empty icon={<Dumbbell />} title="Bunday mashq topilmadi" />
      </>
    );
  }

  const rx = prescribe(item, ctx.profile);
  const block = exercise ? blockInfo(exercise.block) : blockInfo(drill!.minBlock);
  const locked = exercise ? ctx.progress[exercise.block - 1].state === 'locked' : drill!.minBlock > ctx.block;
  const usesBox = exercise?.equipment.some((e) => e.startsWith('Platforma')) || item.motion === 'depth';

  return (
    <>
      <PageHeader eyebrow={exercise ? `${exercise.block}-bosqich · ${block.name}` : GAME_ELEMENTS.find((e) => e.id === drill!.element)?.name} title={item.name} back={back} />

      <div className="stage" style={{ '--block': block.color } as React.CSSProperties}>
        <Artwork name={`${exercise ? 'ex' : 'drill'}-${item.id}`} alt={item.name} fallback={<AthleteMotion motion={item.motion} label={item.name} />} />
      </div>
      <VideoCredit name={`${exercise ? 'ex' : 'drill'}-${item.id}`} />

      <p className="lead">{item.summary}</p>

      <div className="pill-row">
        <Pill color={block.color}>Mashq jadalligi: {INTENSITY_LABEL[item.intensity]}</Pill>
        {exercise?.equipment.map((e) => <Pill key={e}>{e}</Pill>)}
        {drill && <Pill>{drill.minBlock}-bosqichdan boshlab</Pill>}
      </div>

      {locked && (
        <Card className="notice">
          <Lock size={18} />
          <p>Bu mashq {block.name.toLowerCase()} bosqich ochilgach mashg‘ulot rejasiga qo‘shiladi. Hozir esa mashq bilan tanishishingiz mumkin.</p>
        </Card>
      )}

      {drill && (
        <div className="combo">
          <div>
            <span className="eyebrow">Plyometrika</span>
            <strong>{drill.plyo}</strong>
          </div>
          <span className="combo__plus">+</span>
          <div>
            <span className="eyebrow">Voleybol</span>
            <strong>{drill.volleyball}</strong>
          </div>
        </div>
      )}

      <Card className="rx">
        <p className="eyebrow">{ctx.athlete.name} uchun yuklama</p>
        <div className="rx__grid">
          <div>
            <strong>{rx.sets}</strong>
            <span>to‘plam</span>
          </div>
          <div>
            <strong>{rx.reps}</strong>
            <span>{exercise?.perLeg ? 'har oyoqqa' : 'takror'}</span>
          </div>
          <div>
            <Timer size={16} />
            <strong>{rx.restSec}</strong>
            <span>s dam</span>
          </div>
          <div>
            <Footprints size={16} />
            <strong>{rx.contacts}</strong>
            <span>sakrash</span>
          </div>
        </div>
        {usesBox && <p className="muted small">Platforma balandligi {ctx.profile.maxBoxCm} sm dan oshmasin.</p>}
      </Card>

      <h2 className="h2">Bajarish tartibi</h2>
      <ol className="steps">
        {item.steps.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ol>

      <h2 className="h2">Murabbiy tavsiyalari</h2>
      <ul className="cues">
        {item.cues.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      {exercise && !locked && (
        <a className="btn btn--primary btn--block" href={href({ name: 'run-plyo', block: exercise.block })}>
          <Play size={18} fill="currentColor" /> {exercise.block}-bosqich mashg‘ulotini boshlash
        </a>
      )}

      {drill && !locked && (
        <a className="btn btn--primary btn--block" href={href({ name: 'run-game', element: drill.element })}>
          <Play size={18} fill="currentColor" /> O‘yin mashg‘ulotini boshlash
        </a>
      )}
    </>
  );
}
