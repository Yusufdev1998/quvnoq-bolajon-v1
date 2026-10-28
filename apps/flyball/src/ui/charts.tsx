import { useId } from 'react';

export interface Datum {
  label: string;
  value: number;
}

const W = 320;
const H = 140;
const PAD = { top: 18, right: 8, bottom: 22, left: 8 };

export function BarChart({ data, color = 'var(--accent)', highlightLast = true, limit }: { data: Datum[]; color?: string; highlightLast?: boolean; limit?: number }) {
  const max = Math.max(1, limit ?? 0, ...data.map((d) => d.value));
  const innerW = W - PAD.left - PAD.right;
  const innerH = H - PAD.top - PAD.bottom;
  const slot = innerW / data.length;
  const barW = Math.min(26, slot * 0.6);
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Haftalik ustunli diagramma">
      {limit != null && (
        <g>
          <line x1={PAD.left} x2={W - PAD.right} y1={PAD.top + innerH - (limit / max) * innerH} y2={PAD.top + innerH - (limit / max) * innerH} className="chart__limit" />
        </g>
      )}
      {data.map((d, i) => {
        const h = (d.value / max) * innerH;
        const x = PAD.left + slot * i + (slot - barW) / 2;
        const last = highlightLast && i === data.length - 1;
        return (
          <g key={d.label + i}>
            <rect x={x} y={PAD.top} width={barW} height={innerH} rx={6} className="chart__track" />
            <rect x={x} y={PAD.top + innerH - h} width={barW} height={Math.max(h, d.value > 0 ? 3 : 0)} rx={6} fill={color} opacity={last ? 1 : 0.55} />
            {d.value > 0 && (
              <text x={x + barW / 2} y={PAD.top + innerH - h - 5} textAnchor="middle" className="chart__value">
                {Math.round(d.value)}
              </text>
            )}
            <text x={x + barW / 2} y={H - 6} textAnchor="middle" className="chart__label">
              {d.label}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function LineChart({ data, color = 'var(--accent)' }: { data: Datum[]; color?: string }) {
  const fillId = `fill-${useId().replace(/[^\w-]/g, '')}`;
  if (data.length === 0) return null;
  const values = data.map((d) => d.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const innerW = W - PAD.left - PAD.right - 16;
  const innerH = H - PAD.top - PAD.bottom;
  const x = (i: number) => PAD.left + 8 + (data.length === 1 ? innerW / 2 : (innerW * i) / (data.length - 1));
  const y = (v: number) => PAD.top + innerH - ((v - min) / span) * innerH * 0.8 - innerH * 0.1;
  const path = data.map((d, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(d.value).toFixed(1)}`).join(' ');
  const area = `${path} L${x(data.length - 1)},${PAD.top + innerH} L${x(0)},${PAD.top + innerH} Z`;
  return (
    <svg className="chart" viewBox={`0 0 ${W} ${H}`} role="img" aria-label="Natijalar dinamikasi">
      <defs>
        <linearGradient id={fillId} x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.35" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      {data.length > 1 && <path d={area} fill={`url(#${fillId})`} />}
      <path d={path} fill="none" stroke={color} strokeWidth={3} strokeLinejoin="round" strokeLinecap="round" />
      {data.map((d, i) => (
        <g key={d.label + i}>
          <circle cx={x(i)} cy={y(d.value)} r={4.5} fill="var(--bg)" stroke={color} strokeWidth={2.5} />
          <text x={x(i)} y={y(d.value) - 10} textAnchor="middle" className="chart__value">
            {d.value}
          </text>
          <text x={x(i)} y={H - 6} textAnchor="middle" className="chart__label">
            {d.label}
          </text>
        </g>
      ))}
    </svg>
  );
}
