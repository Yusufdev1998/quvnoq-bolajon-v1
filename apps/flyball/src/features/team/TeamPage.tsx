import { Check, Pencil, Plus, RotateCcw, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { navigate } from '../../app/router.ts';
import { dispatch, useAppState } from '../../core/store.ts';
import type { Role } from '../../domain/types.ts';
import { confirmAction } from '../../ui/confirm.tsx';
import { Card, PageHeader, Segmented, SectionTitle } from '../../ui/kit.tsx';
import { AthleteForm, POSITION_LABEL } from './AthleteForm.tsx';

export function TeamPage() {
  const state = useAppState();
  const [editing, setEditing] = useState<string | 'new' | null>(null);
  const coach = state.role === 'coach';
  const year = new Date().getFullYear();

  return (
    <>
      <PageHeader eyebrow="Sozlamalar" title={coach ? 'Jamoa' : 'Mening profilim'} back="#/" />

      <Card>
        <p className="eyebrow">Foydalanuvchi</p>
        <Segmented<Role>
          options={[
            { id: 'coach', label: 'Murabbiy' },
            { id: 'athlete', label: 'Sportchi' },
          ]}
          value={state.role ?? 'coach'}
          onChange={(role) => dispatch({ type: 'setRole', role })}
        />
        <p className="muted small">{coach ? 'Bir nechta sportchini kuzatish, jamoa monitoringi va hisobot.' : 'Mustaqil mashg‘ulotlar uchun bitta profil.'}</p>
      </Card>

      <SectionTitle
        aside={
          coach &&
          editing !== 'new' && (
            <button className="btn btn--ghost btn--sm" onClick={() => setEditing('new')}>
              <Plus size={16} /> Sportchi
            </button>
          )
        }
      >
        {coach ? `Sportchilar (${state.athletes.length})` : 'Profil'}
      </SectionTitle>

      {editing === 'new' && (
        <Card>
          <AthleteForm
            submitLabel="Qo‘shish"
            onCancel={() => setEditing(null)}
            onSubmit={(athlete) => {
              dispatch({ type: 'saveAthlete', athlete });
              setEditing(null);
            }}
          />
        </Card>
      )}

      <ul className="roster">
        {(coach ? state.athletes : state.athletes.filter((a) => a.id === state.activeAthleteId).slice(0, 1)).map((a) =>
          editing === a.id ? (
            <li key={a.id}>
              <Card>
                <AthleteForm
                  initial={a}
                  submitLabel="Saqlash"
                  onCancel={() => setEditing(null)}
                  onSubmit={(athlete) => {
                    dispatch({ type: 'saveAthlete', athlete });
                    setEditing(null);
                  }}
                />
              </Card>
            </li>
          ) : (
            <li key={a.id} className={a.id === state.activeAthleteId ? 'is-active' : ''}>
              <button
                className="roster__main"
                onClick={() => {
                  dispatch({ type: 'selectAthlete', id: a.id });
                  navigate({ name: 'home' });
                }}
              >
                <span className="identity__avatar">{a.name.slice(0, 1).toUpperCase()}</span>
                <span>
                  <strong>{a.name}</strong>
                  <small>
                    {year - a.birthYear} yosh · {POSITION_LABEL[a.position]}
                  </small>
                </span>
                {a.id === state.activeAthleteId && <Check size={18} className="accent-text" />}
              </button>
              <button className="icon-btn icon-btn--quiet" aria-label="Tahrirlash" onClick={() => setEditing(a.id)}>
                <Pencil size={17} />
              </button>
              {coach && state.athletes.length > 1 && (
                <button
                  className="icon-btn icon-btn--quiet"
                  aria-label="O‘chirish"
                  onClick={async () =>
                    (await confirmAction({ title: `${a.name}ni o‘chirasizmi?`, text: 'Uning barcha o‘lchovlari va mashg‘ulotlari ham o‘chiriladi.', confirmLabel: 'O‘chirish', danger: true })) &&
                    dispatch({ type: 'removeAthlete', id: a.id })
                  }
                >
                  <Trash2 size={17} />
                </button>
              )}
            </li>
          ),
        )}
      </ul>

      <SectionTitle>Ma’lumotlar</SectionTitle>
      <Card>
        <p className="muted small">Barcha ma’lumotlar faqat shu qurilmada saqlanadi. Ro‘yxatdan o‘tish, server yoki tashqi uzatish yo‘q.</p>
        <button
          className="btn btn--danger"
          onClick={async () =>
            (await confirmAction({ title: 'Hammasini tozalaysizmi?', text: 'Barcha sportchilar, o‘lchovlar va mashg‘ulotlar qurilmadan o‘chiriladi. Buni qaytarib bo‘lmaydi.', confirmLabel: 'Tozalash', danger: true })) &&
            dispatch({ type: 'reset' })
          }
        >
          <RotateCcw size={16} /> Hammasini tozalash
        </button>
      </Card>
    </>
  );
}
