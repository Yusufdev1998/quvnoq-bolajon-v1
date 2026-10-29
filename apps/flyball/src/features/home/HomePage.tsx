import { ArrowUpRight, Play, ShieldCheck } from 'lucide-react';
import { href } from '../../app/router.ts';
import { formatDate, formatLongDate, startOfWeek, toISODate } from '../../core/dates.ts';
import type { AthleteContext } from '../../core/store.ts';
import { metricSeries, MIN_REST_DAYS, sessionContacts, trend, ZONE_LABEL } from '../../domain/analytics.ts';
import { blockInfo } from '../../domain/catalog.ts';
import { estimateMinutes } from '../../domain/load.ts';
import { artFocus, artUrl } from '../../ui/art.tsx';
import { AdviceList, Card, Meter, SectionTitle, Stat } from '../../ui/kit.tsx';
import { useAppState } from '../../core/store.ts';

export function HomePage({ ctx }: { ctx: AthleteContext }) {
  const state = useAppState();
  const now = new Date();
  const info = blockInfo(ctx.block);
  const cover = artUrl(`block-${ctx.block}`);
  const planned = ctx.todayPlan.reduce((s, p) => s + p.contacts, 0);
  const weekStart = toISODate(startOfWeek(now));
  const weekContacts = ctx.sessions.filter((s) => s.date >= weekStart).reduce((s, x) => s + sessionContacts(x), 0);
  const jump = metricSeries(state.metrics, ctx.athlete.id, 'verticalJump');
  const jumpTrend = trend(jump, 'verticalJump');
  const zoneTone = ctx.load.zone === 'xavfli' ? 'bad' : ctx.load.zone === 'yuqori' || ctx.load.zone === 'kam' ? 'warn' : ctx.load.zone === 'optimal' ? 'good' : undefined;

  return (
    <>
      <header className="hero-head">
        <p className="eyebrow">{formatLongDate(now)}</p>
        <h1>
          Salom, <span className="accent-text">{ctx.athlete.name.split(' ')[0]}</span>
        </h1>
      </header>

      <section className={`today ${cover ? 'today--art' : ''}`} style={{ '--block': info.color } as React.CSSProperties}>
        {cover && <div className="today__art" style={{ backgroundImage: `url(${cover})`, backgroundPosition: artFocus(`block-${ctx.block}`) }} aria-hidden />}
        <div className="today__top">
          <span className="today__badge">{ctx.block}-bosqich</span>
          <span className="today__name">{info.name}</span>
        </div>
        <h2 className="today__title">{ctx.restUntil ? 'Bugun — dam olish kuni' : 'Bugungi mashg‘ulot'}</h2>
        {ctx.restUntil && (
          <p className="today__note">
            Sakrash mashg‘ulotlari orasida {MIN_REST_DAYS * 24} soat tanaffus qilish kerak. Bu vaqtda mushaklar va paylar tiklanadi. Keyingi mashg‘ulot{' '}
            {formatDate(toISODate(ctx.restUntil))} kuni.
          </p>
        )}
        <div className="today__numbers">
          <div>
            <strong>{ctx.todayPlan.length}</strong>
            <span>mashq</span>
          </div>
          <div>
            <strong>{planned}</strong>
            <span>sakrash</span>
          </div>
          <div>
            <strong>~{estimateMinutes(ctx.todayPlan)}</strong>
            <span>daqiqa</span>
          </div>
        </div>
        <ol className="today__list">
          {ctx.todayPlan.map((p) => (
            <li key={p.item.id}>
              <span>{p.item.name}</span>
              <em>
                {p.sets}×{p.reps}
              </em>
            </li>
          ))}
        </ol>
        {/* The coach can still overrule the rest day, but it is no longer the obvious action. */}
        <a className={`btn ${ctx.restUntil ? 'btn--ghost' : 'btn--primary'} btn--block`} href={href({ name: 'run-plyo' })}>
          <Play size={18} fill="currentColor" /> {ctx.restUntil ? 'Shunga qaramay boshlash' : 'Mashg‘ulotni boshlash'}
        </a>
      </section>

      <div className="stat-grid">
        <Card>
          <Stat
            label="Joyidan sakrash"
            value={ctx.values.verticalJump ?? '—'}
            unit={ctx.values.verticalJump != null ? 'sm' : undefined}
            tone={jumpTrend?.improving ? 'good' : undefined}
            sub={jumpTrend ? `${jumpTrend.delta > 0 ? '+' : ''}${jumpTrend.delta} sm dastlabki o‘lchovga nisbatan` : jump.length > 0 ? 'Birinchi o‘lchov' : 'Hali test natijasi kiritilmagan'}
          />
        </Card>
        <Card>
          <Stat label="ACWR" value={ctx.load.ratio ?? '—'} tone={zoneTone} sub={ZONE_LABEL[ctx.load.zone]} />
        </Card>
        <Card className="stat-grid__wide">
          <Stat label="Haftalik sakrashlar" value={weekContacts} sub={`Bir mashg‘ulot uchun limit: ${ctx.profile.contactsBudget} ta sakrash`} />
          <Meter value={weekContacts} max={ctx.profile.contactsBudget * 3} />
        </Card>
      </div>

      <Card className="profile-card">
        <div className="profile-card__head">
          <ShieldCheck size={20} />
          <div>
            <p className="eyebrow">Individual yuklama</p>
            <strong>{ctx.profile.levelLabel} daraja</strong>
          </div>
          <a className="link" href={href({ name: 'metrics' })}>
            Batafsil ko‘rish <ArrowUpRight size={14} />
          </a>
        </div>
        <div className="kv">
          <span>Bir mashg‘ulotdagi sakrashlar</span>
          <b>≤ {ctx.profile.contactsBudget}</b>
          <span>Platforma balandligi</span>
          <b>≤ {ctx.profile.maxBoxCm} sm</b>
          <span>Dam olish vaqti koeffitsienti</span>
          <b>×{ctx.profile.restFactor}</b>
        </div>
      </Card>

      {ctx.advice.length > 0 && (
        <>
          <SectionTitle
            aside={
              <a className="link" href={href({ name: 'monitoring' })}>
                Monitoring <ArrowUpRight size={14} />
              </a>
            }
          >
            Tavsiyalar
          </SectionTitle>
          <AdviceList items={ctx.advice.slice(0, 3)} />
        </>
      )}
    </>
  );
}
