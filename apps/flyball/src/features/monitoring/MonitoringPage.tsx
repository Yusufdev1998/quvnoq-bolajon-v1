import { Download, Footprints, Trash2, TrendingDown, TrendingUp } from 'lucide-react';
import { useMemo, useState } from 'react';
import { formatDate } from '../../core/dates.ts';
import { exportCsv } from '../../core/exportFile.ts';
import { deriveAthlete, dispatch, useAppState, type AthleteContext } from '../../core/store.ts';
import { metricSeries, sessionContacts, sessionLoad, trend, weeklyBuckets, ZONE_LABEL, type AcwrZone } from '../../domain/analytics.ts';
import { blockInfo, drillById, exerciseById } from '../../domain/catalog.ts';
import { metricsCsv, sessionsCsv } from '../../domain/csv.ts';
import { metricDef, METRICS } from '../../domain/metrics.ts';
import type { MetricKey } from '../../domain/types.ts';
import { BarChart, LineChart } from '../../ui/charts.tsx';
import { confirmAction } from '../../ui/confirm.tsx';
import { AdviceList, Card, Empty, PageHeader, Pill, Segmented, SectionTitle } from '../../ui/kit.tsx';

const TREND_KEYS: MetricKey[] = ['verticalJump', 'attackReach', 'longJump', 'shuttleRun', 'rufier', 'weight'];
const ZONE_TONE: Record<AcwrZone, 'good' | 'warn' | 'bad' | 'muted'> = { nomalum: 'muted', kam: 'warn', optimal: 'good', yuqori: 'warn', xavfli: 'bad' };

export function MonitoringPage({ ctx }: { ctx: AthleteContext }) {
  const state = useAppState();
  const now = new Date();
  const [chart, setChart] = useState<'contacts' | 'load'>('contacts');
  const [metric, setMetric] = useState<MetricKey>('verticalJump');

  const weeks = weeklyBuckets(state.sessions, ctx.athlete.id, now, 8);
  const series = metricSeries(state.metrics, ctx.athlete.id, metric);
  const metricTrend = trend(series, metric);
  const ratio = ctx.load.ratio;

  return (
    <>
      <PageHeader eyebrow="4-bo‘lim" title="Monitoring" />

      <Card className="acwr">
        <div className="acwr__head">
          <div>
            <p className="eyebrow">Yuklama nisbati (ACWR)</p>
            <strong className="acwr__value">{ratio ?? '—'}</strong>
          </div>
          <Pill tone={ZONE_TONE[ctx.load.zone]}>{ZONE_LABEL[ctx.load.zone]}</Pill>
        </div>
        <div className="acwr__scale" aria-hidden>
          <span className="z-low" />
          <span className="z-ok" />
          <span className="z-high" />
          <span className="z-risk" />
          {ratio != null && <i style={{ left: `${Math.min(100, (ratio / 2) * 100)}%` }} />}
        </div>
        <div className="acwr__ticks" aria-hidden>
          <span>0</span>
          <span>0.8</span>
          <span>1.3</span>
          <span>1.5</span>
          <span>2+</span>
        </div>
        <p className="muted small">
          Oxirgi 7 kun: {Math.round(ctx.load.acute)} AU · 4 haftalik o‘rtacha: {Math.round(ctx.load.chronic)} AU. Optimal zona 0.8–1.3.
        </p>
      </Card>

      <SectionTitle>
        <Segmented
          options={[
            { id: 'contacts', label: 'Sakrashlar' },
            { id: 'load', label: 'sRPE yuklama' },
          ]}
          value={chart}
          onChange={setChart}
        />
      </SectionTitle>
      <Card>
        <BarChart
          data={weeks.map((w) => ({ label: formatDate(w.start).split('-')[0], value: chart === 'contacts' ? w.contacts : w.load }))}
          color={chart === 'contacts' ? 'var(--accent)' : 'var(--cool)'}
        />
        <p className="muted small center">Haftalar (dushanbadan), oxirgi 8 hafta</p>
      </Card>

      <SectionTitle>Ko‘rsatkichlar dinamikasi</SectionTitle>
      <div className="chips chips--scroll">
        {TREND_KEYS.map((k) => (
          <button key={k} className={k === metric ? 'is-active' : ''} onClick={() => setMetric(k)}>
            {metricDef(k).label}
          </button>
        ))}
      </div>
      <Card>
        {series.length === 0 ? (
          <p className="muted center">“{metricDef(metric).label}” bo‘yicha o‘lchov yo‘q.</p>
        ) : (
          <>
            <LineChart data={series.map((p) => ({ label: formatDate(p.date), value: p.value }))} color="var(--hot)" />
            {metricTrend && (
              <p className={`trend ${metricTrend.improving === true ? 'is-good' : metricTrend.improving === false ? 'is-bad' : ''}`}>
                {metricTrend.delta >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {metricTrend.delta > 0 ? '+' : ''}
                {metricTrend.delta} {metricDef(metric).unit} birinchi o‘lchovdan beri
              </p>
            )}
          </>
        )}
      </Card>

      {ctx.advice.length > 0 && (
        <>
          <SectionTitle>Murabbiy uchun tavsiyalar</SectionTitle>
          <AdviceList items={ctx.advice} />
        </>
      )}

      {state.role === 'coach' && state.athletes.length > 1 && <TeamOverview />}

      <SectionTitle>Mashg‘ulotlar jurnali</SectionTitle>
      {ctx.sessions.length === 0 ? (
        <Empty icon={<Footprints />} art="empty-sessions" title="Hali mashg‘ulot yo‘q">
          Birinchi mashg‘ulot saqlangach, jurnal shu yerda paydo bo‘ladi.
        </Empty>
      ) : (
        <ul className="log">
          {ctx.sessions.map((s) => (
            <li key={s.id} style={{ '--block': s.block ? blockInfo(s.block).color : 'var(--hot)' } as React.CSSProperties}>
              <div className="log__date">
                <strong>{formatDate(s.date).split('-')[0]}</strong>
                <span>{formatDate(s.date).split('-')[1]}</span>
              </div>
              <div className="log__body">
                <strong>{s.kind === 'plyo' ? `${s.block}-blok · ${blockInfo(s.block ?? 1).name}` : 'O‘yin elementlari'}</strong>
                <span>{s.items.map((i) => (i.kind === 'exercise' ? exerciseById(i.refId)?.name : drillById(i.refId)?.name)).join(', ')}</span>
                <span className="log__nums">
                  {sessionContacts(s)} sakrash · RPE {s.rpe} · {sessionLoad(s)} AU · texnika {s.technique}/5
                </span>
                {s.note && <em>“{s.note}”</em>}
              </div>
              <button className="icon-btn icon-btn--quiet" aria-label="O‘chirish" onClick={async () => (await confirmAction({ title: 'Mashg‘ulotni o‘chirasizmi?', text: 'U jurnal, grafiklar va blok progressidan olib tashlanadi.', confirmLabel: 'O‘chirish', danger: true })) && dispatch({ type: 'removeSession', id: s.id })}>
                <Trash2 size={16} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <SectionTitle>Hisobot</SectionTitle>
      <div className="export">
        <button className="btn btn--ghost" onClick={() => exportCsv('flyball-mashgulotlar.csv', sessionsCsv(state))} disabled={state.sessions.length === 0}>
          <Download size={16} /> Mashg‘ulotlar CSV
        </button>
        <button className="btn btn--ghost" onClick={() => exportCsv('flyball-korsatkichlar.csv', metricsCsv(state))} disabled={state.metrics.length === 0}>
          <Download size={16} /> Ko‘rsatkichlar CSV
        </button>
      </div>
      <p className="muted small">
        {state.sessions.length === 0 && state.metrics.length === 0
          ? 'Hisobot uchun avval mashg‘ulot saqlang yoki ko‘rsatkich kiriting.'
          : `Barcha sportchilar ma’lumoti; ko‘rsatkichlar faylida ${METRICS.length} ta ustun.`}
      </p>
    </>
  );
}

function TeamOverview() {
  const state = useAppState();
  const rows = useMemo(() => {
    const now = new Date();
    return state.athletes.map((a) => {
      const ctx = deriveAthlete({ ...state, activeAthleteId: a.id }, now)!;
      const jt = trend(metricSeries(state.metrics, a.id, 'verticalJump'), 'verticalJump');
      return { a, ctx, jt };
    });
  }, [state]);

  return (
    <>
      <SectionTitle>Jamoa</SectionTitle>
      <Card className="team-table">
        <div className="team-table__row team-table__row--head">
          <span>Sportchi</span>
          <span>Blok</span>
          <span>Sakrash</span>
          <span>ACWR</span>
        </div>
        {rows.map(({ a, ctx, jt }) => (
          <button key={a.id} className={`team-table__row ${a.id === state.activeAthleteId ? 'is-active' : ''}`} onClick={() => dispatch({ type: 'selectAthlete', id: a.id })}>
            <span className="team-table__name">{a.name}</span>
            <span>
              <i className="dot" style={{ background: blockInfo(ctx.block).color }} />
              {ctx.block}
            </span>
            <span>
              {ctx.values.verticalJump ?? '—'}
              {jt && jt.delta !== 0 && <small className={jt.delta > 0 ? 'up' : 'down'}>{jt.delta > 0 ? `+${jt.delta}` : jt.delta}</small>}
            </span>
            <span className={`zone zone--${ZONE_TONE[ctx.load.zone]}`}>{ctx.load.ratio ?? '—'}</span>
          </button>
        ))}
      </Card>
    </>
  );
}
