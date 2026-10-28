import { ChevronLeft, CircleCheck, Info, TriangleAlert } from 'lucide-react';
import type { ReactNode } from 'react';
import type { Advice } from '../domain/analytics.ts';
import { INTENSITY_LABEL } from '../domain/catalog.ts';
import type { Intensity } from '../domain/types.ts';

export function PageHeader({ eyebrow, title, back, action }: { eyebrow?: string; title: string; back?: string; action?: ReactNode }) {
  return (
    <header className="page-header">
      {back && (
        <a className="icon-btn" href={back} aria-label="Orqaga">
          <ChevronLeft size={22} />
        </a>
      )}
      <div className="page-header__text">
        {eyebrow && <p className="eyebrow">{eyebrow}</p>}
        <h1>{title}</h1>
      </div>
      {action}
    </header>
  );
}

export function Card({ children, className = '', style }: { children: ReactNode; className?: string; style?: React.CSSProperties }) {
  return <section className={`card ${className}`} style={style}>{children}</section>;
}

export function SectionTitle({ children, aside }: { children: ReactNode; aside?: ReactNode }) {
  return (
    <div className="section-title">
      <h2>{children}</h2>
      {aside}
    </div>
  );
}

export function Pill({ children, color, tone }: { children: ReactNode; color?: string; tone?: 'good' | 'warn' | 'bad' | 'muted' }) {
  return (
    <span className={`pill ${tone ? `pill--${tone}` : ''}`} style={color ? ({ '--pill': color } as React.CSSProperties) : undefined}>
      {children}
    </span>
  );
}

export function Stat({ label, value, unit, sub, tone }: { label: string; value: ReactNode; unit?: string; sub?: ReactNode; tone?: 'good' | 'warn' | 'bad' }) {
  return (
    <div className={`stat ${tone ? `stat--${tone}` : ''}`}>
      <span className="stat__label">{label}</span>
      <span className="stat__value">
        {value}
        {unit && <small>{unit}</small>}
      </span>
      {sub && <span className="stat__sub">{sub}</span>}
    </div>
  );
}

export function Meter({ value, max, color }: { value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="meter" role="progressbar" aria-valuenow={value} aria-valuemax={max}>
      <span style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

export function Segmented<T extends string>({ options, value, onChange }: { options: { id: T; label: string }[]; value: T; onChange: (v: T) => void }) {
  return (
    <div className="segmented" role="tablist">
      {options.map((o) => (
        <button key={o.id} role="tab" aria-selected={o.id === value} className={o.id === value ? 'is-active' : ''} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

export function IntensityBars({ intensity }: { intensity: Intensity }) {
  const n = { past: 1, orta: 2, yuqori: 3 }[intensity];
  return (
    <span className={`intensity intensity--${intensity}`} title={`Intensivlik: ${INTENSITY_LABEL[intensity]}`}>
      {[1, 2, 3].map((i) => (
        <i key={i} className={i <= n ? 'on' : ''} />
      ))}
    </span>
  );
}

const ADVICE_ICON = { warn: TriangleAlert, info: Info, good: CircleCheck };

export function AdviceList({ items }: { items: Advice[] }) {
  return (
    <ul className="advice">
      {items.map((a) => {
        const Icon = ADVICE_ICON[a.tone];
        return (
          <li key={a.id} className={`advice__item advice__item--${a.tone}`}>
            <Icon size={18} />
            <div>
              <strong>{a.title}</strong>
              <p>{a.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

export function Empty({ icon, title, children }: { icon: ReactNode; title: string; children?: ReactNode }) {
  return (
    <div className="empty">
      <div className="empty__icon">{icon}</div>
      <strong>{title}</strong>
      {children && <p>{children}</p>}
    </div>
  );
}
