import { ClipboardList, User } from 'lucide-react';
import { dispatch, useAppState } from '../../core/store.ts';
import type { Role } from '../../domain/types.ts';
import { AthleteMotion } from '../../ui/AthleteMotion.tsx';
import { Artwork } from '../../ui/art.tsx';
import { AthleteForm } from '../team/AthleteForm.tsx';

export function Onboarding() {
  const { role } = useAppState();

  return (
    <div className="onboarding">
      <div className="onboarding__hero">
        <Artwork name="onboarding-hero" alt="Voleybolchi qiz hujum zarbasi uchun sakramoqda" fallback={<AthleteMotion motion="approach" label="Hujum sakrashi" />} />
      </div>
      <p className="eyebrow">Yosh voleybolchilar uchun</p>
      <h1 className="onboarding__title">
        Sakra <span className="accent-text">balandroq.</span>
        <br />
        Uring kuchliroq.
      </h1>

      {!role ? (
        <>
          <p className="lead">Plyometrik mashqlar, individual yuklama va natijalar monitoringi bitta ilovada. Kim sifatida foydalanasiz?</p>
          <div className="role-cards">
            <RoleCard role="coach" icon={<ClipboardList size={26} />} title="Murabbiy" text="Jamoa, individual yuklama va tavsiyalar" />
            <RoleCard role="athlete" icon={<User size={26} />} title="Sportchi" text="Mustaqil mashg‘ulot va o‘z natijalarim" />
          </div>
        </>
      ) : (
        <>
          <p className="lead">{role === 'coach' ? 'Birinchi sportchini qo‘shing. Keyinroq jamoaga yana qo‘shishingiz mumkin.' : 'Profilingizni to‘ldiring.'}</p>
          <div className="card">
            <AthleteForm submitLabel="Davom etish" onSubmit={(athlete) => dispatch({ type: 'saveAthlete', athlete })} />
          </div>
        </>
      )}
    </div>
  );
}

function RoleCard({ role, icon, title, text }: { role: Role; icon: React.ReactNode; title: string; text: string }) {
  return (
    <button className="role-card" onClick={() => dispatch({ type: 'setRole', role })}>
      <span className="role-card__icon">{icon}</span>
      <strong>{title}</strong>
      <span>{text}</span>
    </button>
  );
}
