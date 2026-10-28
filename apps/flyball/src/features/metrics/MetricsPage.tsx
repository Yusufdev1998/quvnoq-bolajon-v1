import { Plus, Ruler, Trash2, X } from 'lucide-react';
import { useState } from 'react';
import { formatDate, toISODate } from '../../core/dates.ts';
import { dispatch, newId, type AthleteContext } from '../../core/store.ts';
import { ageOf, bmi, formatValue, jumpNorm, METRIC_GROUPS, METRICS, rateVerticalJump, RATING_LABEL, rufierRating, validateValue, type Rating } from '../../domain/metrics.ts';
import type { MetricKey, MetricValues } from '../../domain/types.ts';
import { confirmAction } from '../../ui/confirm.tsx';
import { Card, Empty, PageHeader, Pill, SectionTitle } from '../../ui/kit.tsx';
import { POSITION_LABEL } from '../team/AthleteForm.tsx';

const RATING_TONE: Record<Rating, 'good' | 'warn' | 'bad'> = { yuqori: 'good', orta: 'warn', past: 'bad' };

export function MetricsPage({ ctx }: { ctx: AthleteContext }) {
  const [adding, setAdding] = useState(false);
  const now = new Date();
  const age = ageOf(ctx.athlete, now);
  const index = bmi(ctx.values);

  const rating = (key: MetricKey, v: number): { label: string; tone: 'good' | 'warn' | 'bad' } | null => {
    if (key === 'verticalJump') {
      const r = rateVerticalJump(v, age);
      return { label: RATING_LABEL[r], tone: RATING_TONE[r] };
    }
    if (key === 'rufier') {
      const r = rufierRating(v);
      return { label: r.label, tone: RATING_TONE[r.rating] };
    }
    return null;
  };

  return (
    <>
      <PageHeader
        eyebrow="2-bo‘lim"
        title="Individual ko‘rsatkichlar"
        action={
          !adding && (
            <button className="icon-btn icon-btn--accent" onClick={() => setAdding(true)} aria-label="Yangi o‘lchov">
              <Plus size={22} />
            </button>
          )
        }
      />

      <Card className="identity">
        <span className="identity__avatar">{ctx.athlete.name.slice(0, 1).toUpperCase()}</span>
        <div>
          <strong>{ctx.athlete.name}</strong>
          <span>
            {age} yosh · {POSITION_LABEL[ctx.athlete.position]}
          </span>
        </div>
        <div className="identity__bmi">
          <b>{index ?? '—'}</b>
          <span>TVI</span>
        </div>
      </Card>

      {adding && <MetricForm ctx={ctx} onClose={() => setAdding(false)} />}

      {METRIC_GROUPS.map((g) => (
        <section key={g.id}>
          <SectionTitle>{g.label}</SectionTitle>
          <p className="muted small group-desc">{g.description}</p>
          <div className="metric-grid">
            {METRICS.filter((m) => m.group === g.id).map((m) => {
              const v = ctx.values[m.key];
              const r = v != null ? rating(m.key, v) : null;
              return (
                <Card key={m.key} className="metric">
                  <span className="metric__label">{m.label}</span>
                  <span className="metric__value">
                    {v != null ? formatValue(m.key, v) : '—'}
                    {v != null && m.unit && <small>{m.unit}</small>}
                  </span>
                  <span className="metric__foot">
                    {ctx.dates[m.key] ? formatDate(ctx.dates[m.key]!) : 'kiritilmagan'}
                    {r && <Pill tone={r.tone}>{r.label}</Pill>}
                  </span>
                </Card>
              );
            })}
          </div>
        </section>
      ))}
      <p className="muted small">
        Joyidan sakrash me’yori ({age} yosh): past &lt; {jumpNorm(age).low} sm, yuqori ≥ {jumpNorm(age).high} sm. Me’yorlar taxminiy va murabbiy tomonidan moslashtiriladi.
      </p>

      <SectionTitle>Yuklama qanday moslashtirildi</SectionTitle>
      <Card className="explain">
        <div className="kv">
          <span>Daraja</span>
          <b>{ctx.profile.levelLabel}</b>
          <span>Sakrashlar / mashg‘ulot</span>
          <b>≤ {ctx.profile.contactsBudget}</b>
          <span>Takrorlar koeffitsienti</span>
          <b>×{Math.round(ctx.profile.volumeFactor * 100) / 100}</b>
          <span>Dam olish koeffitsienti</span>
          <b>×{ctx.profile.restFactor}</b>
          <span>Tumba balandligi</span>
          <b>≤ {ctx.profile.maxBoxCm} sm</b>
        </div>
        <ul className="explain__notes">
          {ctx.profile.notes.map((n) => (
            <li key={n.text} className={n.tone === 'warn' ? 'is-warn' : ''}>
              {n.text}
            </li>
          ))}
        </ul>
      </Card>

      <SectionTitle>O‘lchovlar tarixi</SectionTitle>
      {ctx.entries.length === 0 ? (
        <Empty icon={<Ruler />} art="empty-metrics" title="Hali o‘lchov kiritilmagan">
          Yuqoridagi “+” tugmasi orqali boshlang‘ich testni kiriting.
        </Empty>
      ) : (
        <ul className="history">
          {ctx.entries.map((e) => (
            <li key={e.id}>
              <div>
                <strong>{formatDate(e.date)}</strong>
                <span>
                  {(Object.keys(e.values) as MetricKey[])
                    .map((k) => `${METRICS.find((m) => m.key === k)?.label}: ${formatValue(k, e.values[k]!)}`)
                    .join(' · ')}
                </span>
              </div>
              <button className="icon-btn icon-btn--quiet" aria-label="O‘chirish" onClick={async () => (await confirmAction({ title: 'O‘lchovni o‘chirasizmi?', text: `${formatDate(e.date)} sanadagi barcha qiymatlar o‘chiriladi.`, confirmLabel: 'O‘chirish', danger: true })) && dispatch({ type: 'removeMetrics', id: e.id })}>
                <Trash2 size={17} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

function MetricForm({ ctx, onClose }: { ctx: AthleteContext; onClose: () => void }) {
  const [date, setDate] = useState(toISODate(new Date()));
  const [raw, setRaw] = useState<Partial<Record<MetricKey, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const parsed: MetricValues = {};
  const errors: Partial<Record<MetricKey, string>> = {};
  for (const m of METRICS) {
    const text = raw[m.key]?.trim().replace(',', '.');
    if (!text) continue;
    const value = Number(text);
    const error = validateValue(m.key, value);
    if (error) errors[m.key] = error;
    else parsed[m.key] = value;
  }
  const hasValues = Object.keys(parsed).length > 0;
  const valid = hasValues && Object.keys(errors).length === 0;

  const save = () => {
    setSubmitted(true);
    if (!valid) return;
    dispatch({ type: 'addMetrics', entry: { id: newId(), athleteId: ctx.athlete.id, date, values: parsed } });
    onClose();
  };

  return (
    <Card className="form-card">
      <div className="form-card__head">
        <h2>Yangi o‘lchov</h2>
        <button className="icon-btn icon-btn--quiet" onClick={onClose} aria-label="Yopish">
          <X size={20} />
        </button>
      </div>
      <label className="field">
        <span>Sana</span>
        <input type="date" value={date} max={toISODate(new Date())} onChange={(e) => setDate(e.target.value)} />
      </label>
      <p className="muted small">Faqat o‘lchangan ko‘rsatkichlarni kiriting — qolganlari avvalgi qiymatda qoladi.</p>
      {METRIC_GROUPS.map((g) => (
        <fieldset key={g.id} className="fieldset">
          <legend>{g.label}</legend>
          {METRICS.filter((m) => m.group === g.id).map((m) => (
            <label key={m.key} className={`field field--inline ${errors[m.key] ? 'has-error' : ''}`}>
              <span>
                {m.label}
                <small>{errors[m.key] ?? m.hint}</small>
              </span>
              <div className="input-unit">
                <input
                  inputMode="decimal"
                  placeholder={ctx.values[m.key] != null ? String(ctx.values[m.key]) : '—'}
                  value={raw[m.key] ?? ''}
                  onChange={(e) => setRaw({ ...raw, [m.key]: e.target.value })}
                />
                {m.unit && <em>{m.unit}</em>}
              </div>
            </label>
          ))}
        </fieldset>
      ))}
      {submitted && !hasValues && <p className="error">Kamida bitta ko‘rsatkich kiriting.</p>}
      <button className="btn btn--primary btn--block" onClick={save}>
        Saqlash
      </button>
    </Card>
  );
}
