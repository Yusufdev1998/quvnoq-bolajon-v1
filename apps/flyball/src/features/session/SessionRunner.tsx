import { Check, Footprints, Play, SkipForward, Timer, X } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { navigate, type Route } from '../../app/router.ts';
import { toISODate } from '../../core/dates.ts';
import { dispatch, newId, type AthleteContext } from '../../core/store.ts';
import { blockInfo, exercisesOfBlock, GAME_DRILLS, GAME_ELEMENTS } from '../../domain/catalog.ts';
import { estimateMinutes, planWorkout, type PlannedItem } from '../../domain/load.ts';
import type { Dosable, Exercise, GameDrill, Motion } from '../../domain/types.ts';
import { AthleteMotion } from '../../ui/AthleteMotion.tsx';
import { Artwork, VideoCredit } from '../../ui/art.tsx';
import { confirmAction } from '../../ui/confirm.tsx';
import { Empty } from '../../ui/kit.tsx';

type RunRoute = Extract<Route, { name: 'run-plyo' | 'run-game' }>;
type Item = Dosable & { name: string; motion: Motion; steps: string[]; cues: string[] };
type Phase = 'preview' | 'work' | 'rest' | 'finish';

const RPE_LABEL: Record<number, string> = { 1: 'Juda yengil', 2: 'Yengil', 3: 'O‘rtacha', 4: 'Biroz og‘ir', 5: 'Og‘ir', 6: 'Og‘ir', 7: 'Juda og‘ir', 8: 'Juda og‘ir', 9: 'Deyarli maksimal', 10: 'Maksimal' };

export function SessionRunner({ route, ctx }: { route: RunRoute; ctx: AthleteContext }) {
  const setup = useMemo(() => {
    if (route.name === 'run-plyo') {
      const block = route.block ?? ctx.block;
      const locked = ctx.progress[block - 1].state === 'locked';
      const plan = locked ? [] : planWorkout<Exercise>(exercisesOfBlock(block), ctx.profile, ctx.progress[block - 1].sessions);
      return { kind: 'plyo' as const, block, title: `${block}-bosqich · ${blockInfo(block).name}`, color: blockInfo(block).color, plan: plan as PlannedItem<Item>[] };
    }
    const element = GAME_ELEMENTS.find((e) => e.id === route.element)!;
    const pool = GAME_DRILLS.filter((d) => d.element === route.element && d.minBlock <= ctx.block);
    const done = ctx.sessions.filter((s) => s.kind === 'game').length;
    const plan = planWorkout<GameDrill>(pool, ctx.profile, done, 3);
    return { kind: 'game' as const, block: null, title: `O‘yin · ${element.name}`, color: 'var(--hot)', plan: plan as PlannedItem<Item>[] };
  }, [route, ctx]);

  const [phase, setPhase] = useState<Phase>('preview');
  const [index, setIndex] = useState(0);
  const [set, setSet] = useState(1);
  const [doneSets, setDoneSets] = useState<number[]>(() => setup.plan.map(() => 0));
  const [startedAt, setStartedAt] = useState(0);
  const [restUntil, setRestUntil] = useState(0);
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    if (phase !== 'rest') return;
    const t = setInterval(() => setNow(Date.now()), 250);
    return () => clearInterval(t);
  }, [phase]);

  const remaining = Math.max(0, Math.ceil((restUntil - now) / 1000));
  useEffect(() => {
    if (phase === 'rest' && remaining === 0) setPhase('work');
  }, [phase, remaining]);

  const exit = async () => {
    const leave =
      phase === 'preview' ||
      (await confirmAction({ title: 'Mashg‘ulotdan chiqasizmi?', text: 'Bajarilgan mashqlar va to‘plamlar saqlanmaydi.', confirmLabel: 'Chiqish', danger: true }));
    if (leave) navigate({ name: 'home' });
  };

  const header = (
    <div className="runner__top" style={{ '--block': setup.color } as React.CSSProperties}>
      <button className="icon-btn" onClick={exit} aria-label="Chiqish">
        <X size={22} />
      </button>
      <span className="runner__title">{setup.title}</span>
      <span className="runner__step">{phase === 'preview' || phase === 'finish' ? '' : `${index + 1}/${setup.plan.length}`}</span>
    </div>
  );

  if (setup.plan.length === 0) {
    return (
      <div className="runner">
        {header}
        <Empty icon={<Footprints />} title="Mashg‘ulot rejasini tuzib bo‘lmadi">
          Bu bosqich hali ochilmagan yoki unga mos mashqlar mavjud emas.
        </Empty>
      </div>
    );
  }

  const current = setup.plan[index];
  const rest = (seconds: number) => {
    setRestUntil(Date.now() + seconds * 1000);
    setNow(Date.now());
    setPhase('rest');
  };

  const completeSet = () => {
    const nextDone = doneSets.map((d, i) => (i === index ? d + 1 : d));
    setDoneSets(nextDone);
    if (set < current.sets) {
      setSet(set + 1);
      rest(current.restSec);
    } else if (index < setup.plan.length - 1) {
      setIndex(index + 1);
      setSet(1);
      rest(current.restSec);
    } else {
      setPhase('finish');
    }
  };

  const skipItem = () => {
    if (index < setup.plan.length - 1) {
      setIndex(index + 1);
      setSet(1);
      setPhase('work');
    } else {
      setPhase('finish');
    }
  };

  if (phase === 'preview') {
    const total = setup.plan.reduce((s, p) => s + p.contacts, 0);
    return (
      <div className="runner">
        {header}
        <div className="runner__body">
          <p className="eyebrow">{ctx.athlete.name} uchun reja</p>
          <h1 className="runner__h1">Mashg‘ulotni boshlashga tayyormisiz?</h1>
          <div className="today__numbers today__numbers--plain">
            <div>
              <strong>{setup.plan.length}</strong>
              <span>mashq</span>
            </div>
            <div>
              <strong>{total}</strong>
              <span>sakrash</span>
            </div>
            <div>
              <strong>~{estimateMinutes(setup.plan)}</strong>
              <span>daqiqa</span>
            </div>
          </div>
          <div className="warmup">
            <Timer size={18} />
            <p>Boshlashdan oldin 8–10 daqiqa badan qizdiring: yengil yuguring, bo‘g‘imlarni aylantiring va dinamik cho‘zilish mashqlarini bajaring.</p>
          </div>
          <ol className="plan">
            {setup.plan.map((p, i) => (
              <li key={p.item.id}>
                <span className="plan__n">{i + 1}</span>
                <div>
                  <strong>{p.item.name}</strong>
                  <span>
                    {p.sets}×{p.reps} · dam {p.restSec} s · {p.contacts} sakrash
                  </span>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="runner__actions">
          <button
            className="btn btn--primary btn--block btn--lg"
            onClick={() => {
              setStartedAt(Date.now());
              setPhase('work');
            }}
          >
            <Play size={20} fill="currentColor" /> Boshlash
          </button>
        </div>
      </div>
    );
  }

  if (phase === 'finish') {
    return <FinishForm setup={setup} doneSets={doneSets} startedAt={startedAt} ctx={ctx} header={header} />;
  }

  const restTotal = current.restSec || 1;
  return (
    <div className="runner">
      {header}
      <div className="runner__progress" aria-hidden>
        {setup.plan.map((p, i) => (
          <span key={p.item.id} className={i < index ? 'done' : i === index ? 'now' : ''} />
        ))}
      </div>
      <div className="runner__body">
        <div className="stage stage--runner" style={{ '--block': setup.color } as React.CSSProperties}>
          <Artwork
            key={current.item.id}
            name={`${setup.kind === 'plyo' ? 'ex' : 'drill'}-${current.item.id}`}
            alt={current.item.name}
            fallback={<AthleteMotion motion={current.item.motion} label={current.item.name} />}
          />
          {phase === 'rest' && (
            <div className="rest">
              <svg viewBox="0 0 100 100" className="rest__ring">
                <circle cx="50" cy="50" r="44" className="rest__track" />
                <circle cx="50" cy="50" r="44" className="rest__bar" style={{ strokeDashoffset: 276.5 * (1 - remaining / restTotal) }} />
              </svg>
              <div className="rest__text">
                <strong>{remaining}</strong>
                <span>dam olish</span>
              </div>
            </div>
          )}
        </div>
        <VideoCredit name={`${setup.kind === 'plyo' ? 'ex' : 'drill'}-${current.item.id}`} />
        <p className="eyebrow">{phase === 'rest' ? 'Keyingi mashq' : `${set}-to‘plam / ${current.sets}`}</p>
        <h1 className="runner__h1">{current.item.name}</h1>
        <div className="reps">
          <strong>{current.reps}</strong>
          <span>marta</span>
        </div>
        <ul className="cues cues--compact">
          {current.item.cues.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </div>
      <div className="runner__actions">
        {phase === 'rest' ? (
          <button className="btn btn--ghost btn--block btn--lg" onClick={() => setPhase('work')}>
            <SkipForward size={20} /> Dam olishni o‘tkazib yuborish
          </button>
        ) : (
          <>
            <button className="btn btn--primary btn--block btn--lg" onClick={completeSet}>
              <Check size={22} strokeWidth={3} /> To‘plam tugadi
            </button>
            <button className="btn btn--text" onClick={skipItem}>
              Mashqni o‘tkazib yuborish
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function FinishForm({
  setup,
  doneSets,
  startedAt,
  ctx,
  header,
}: {
  setup: { kind: 'plyo' | 'game'; block: number | null; plan: PlannedItem<Item>[] };
  doneSets: number[];
  startedAt: number;
  ctx: AthleteContext;
  header: React.ReactNode;
}) {
  const [duration, setDuration] = useState(() => Math.max(10, Math.round((Date.now() - startedAt) / 60000) + 10));
  const [rpe, setRpe] = useState(5);
  const [technique, setTechnique] = useState(4);
  const [note, setNote] = useState('');

  const items = setup.plan
    .map((p, i) => ({ refId: p.item.id, kind: setup.kind === 'plyo' ? ('exercise' as const) : ('drill' as const), sets: doneSets[i], reps: p.reps, contacts: doneSets[i] * p.reps * p.item.contactsPerRep }))
    .filter((i) => i.sets > 0);
  const contacts = items.reduce((s, i) => s + i.contacts, 0);

  const save = () => {
    dispatch({
      type: 'addSession',
      session: {
        id: newId(),
        athleteId: ctx.athlete.id,
        date: toISODate(new Date()),
        kind: setup.kind,
        block: setup.block as 1 | 2 | 3 | 4 | null,
        items,
        durationMin: duration,
        rpe,
        technique,
        note: note.trim() || undefined,
      },
    });
    navigate({ name: 'monitoring' });
  };

  return (
    <div className="runner">
      {header}
      <div className="runner__body">
        <p className="eyebrow">Mashg‘ulot yakunlandi</p>
        <h1 className="runner__h1">Mashg‘ulotni baholang</h1>
        <div className="today__numbers today__numbers--plain">
          <div>
            <strong>{items.length}</strong>
            <span>mashq</span>
          </div>
          <div>
            <strong>{contacts}</strong>
            <span>sakrash</span>
          </div>
          <div>
            <strong>{rpe * duration}</strong>
            <span>yuklama (AU)</span>
          </div>
        </div>

        <label className="field">
          <span>Davomiylik (badan qizdirish bilan), daqiqa</span>
          <input type="number" inputMode="numeric" min={5} max={180} value={duration} onChange={(e) => setDuration(Math.max(1, Number(e.target.value) || 1))} />
        </label>

        <div className="field">
          <span>
            Sezilgan zo‘riqish darajasi (RPE): <b>{rpe}</b> — {RPE_LABEL[rpe]}
          </span>
          <input type="range" min={1} max={10} value={rpe} onChange={(e) => setRpe(Number(e.target.value))} className="rpe" style={{ '--pct': `${((rpe - 1) / 9) * 100}%` } as React.CSSProperties} />
        </div>

        <div className="field">
          <span>Texnika sifati</span>
          <div className="rating">
            {[1, 2, 3, 4, 5].map((n) => (
              <button key={n} className={n <= technique ? 'is-on' : ''} onClick={() => setTechnique(n)} aria-label={`${n} ball`}>
                {n}
              </button>
            ))}
          </div>
        </div>

        <label className="field">
          <span>Izoh (ixtiyoriy)</span>
          <textarea rows={2} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Masalan: chap tizzamda noqulaylik sezdim" />
        </label>
      </div>
      <div className="runner__actions">
        <button className="btn btn--primary btn--block btn--lg" disabled={items.length === 0} onClick={save}>
          <Check size={20} strokeWidth={3} /> Saqlash
        </button>
      </div>
    </div>
  );
}
