import { useState } from 'react';
import { newId } from '../../core/store.ts';
import type { Athlete, Position } from '../../domain/types.ts';

export const POSITION_LABEL: Record<Position, string> = {
  hujumchi: 'Hujumchi',
  diagonal: 'Diagonal hujumchi',
  markaziy: 'Markaziy blokchi',
  boglovchi: 'Bog‘lovchi',
  libero: 'Libero',
};

export function AthleteForm({ initial, submitLabel, onSubmit, onCancel }: { initial?: Athlete; submitLabel: string; onSubmit: (a: Athlete) => void; onCancel?: () => void }) {
  const year = new Date().getFullYear();
  const [name, setName] = useState(initial?.name ?? '');
  const [birthYear, setBirthYear] = useState(String(initial?.birthYear ?? year - 14));
  const [position, setPosition] = useState<Position>(initial?.position ?? 'hujumchi');
  const [touched, setTouched] = useState(false);

  const by = Number(birthYear);
  const nameError = name.trim().length < 2 ? 'Ismingizni kiriting' : null;
  const yearError = !Number.isInteger(by) || by < year - 25 || by > year - 8 ? `${year - 25}–${year - 8} oralig‘ida` : null;

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (nameError || yearError) return;
    onSubmit({ id: initial?.id ?? newId(), createdAt: initial?.createdAt ?? new Date().toISOString(), name: name.trim(), birthYear: by, position });
  };

  return (
    <form className="athlete-form" onSubmit={submit} noValidate>
      <label className={`field ${touched && nameError ? 'has-error' : ''}`}>
        <span>Ism va familiya {touched && nameError && <small>{nameError}</small>}</span>
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Masalan: Madina Karimova" autoComplete="off" />
      </label>
      <label className={`field ${touched && yearError ? 'has-error' : ''}`}>
        <span>Tug‘ilgan yil {touched && yearError && <small>{yearError}</small>}</span>
        <input inputMode="numeric" value={birthYear} onChange={(e) => setBirthYear(e.target.value)} />
      </label>
      <div className="field">
        <span>O‘yindagi pozitsiya</span>
        <div className="chips">
          {(Object.keys(POSITION_LABEL) as Position[]).map((p) => (
            <button type="button" key={p} className={p === position ? 'is-active' : ''} onClick={() => setPosition(p)}>
              {POSITION_LABEL[p]}
            </button>
          ))}
        </div>
      </div>
      <div className="form-actions">
        {onCancel && (
          <button type="button" className="btn btn--ghost" onClick={onCancel}>
            Bekor qilish
          </button>
        )}
        <button type="submit" className="btn btn--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
