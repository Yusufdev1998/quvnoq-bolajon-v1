import { Check, Flower2, Sparkles, Star } from 'lucide-react';

function Butterfly({ size }: { size: number }) {
  return <svg width={size} height={size} viewBox="0 0 30 30" fill="none"><path d="M15 15C2-5-5 17 12 18C-2 26 13 33 15 19C17 33 32 26 18 18C35 17 28-5 15 15Z" fill="currentColor" opacity=".8" /><path d="M15 12V22M15 13L12 9M15 13L18 9" stroke="#756583" strokeWidth="1.5" strokeLinecap="round" /></svg>;
}

export function GardenScenery({ still, celebration }: { still: boolean; celebration: boolean }) {
  return <div className={`garden-scenery ${still ? 'still' : ''} ${celebration ? 'celebrating' : ''}`} aria-hidden="true">
    <div className="garden-hill hill-back" /><div className="garden-hill hill-front" />
    <span className="garden-butterfly butterfly-one"><Butterfly size={25} /></span>
    <span className="garden-butterfly butterfly-two"><Butterfly size={18} /></span>
    <span className="garden-flower flower-one"><Flower2 size={30} /></span>
    <span className="garden-flower flower-two"><Flower2 size={23} /></span>
    <span className="garden-flower flower-three"><Flower2 size={18} /></span>
    {celebration && <div className="garden-confetti">{Array.from({ length: 14 }, (_, i) => <span key={i} style={{ left: `${5 + i * 7}%`, animationDelay: `${i % 5 * 0.23}s`, backgroundColor: ['#e9b86d', '#95b99c', '#b5a5d0', '#eab2a0'][i % 4] }} />)}</div>}
  </div>;
}

export function StarChallenge({ found, collect, paused }: { found: number[]; collect: (id: number) => void; paused: boolean }) {
  return <div className="star-challenge" aria-label="Uchta yulduzchani toping">{[0, 1, 2].map(id => <button key={id} className={`garden-star star-${id} ${found.includes(id) ? 'found' : ''}`} disabled={paused || found.includes(id)} aria-label={`${id + 1}-yulduzcha${found.includes(id) ? ' topildi' : ''}`} onClick={() => collect(id)}>{found.includes(id) ? <Check size={26} /> : <Star size={30} fill="currentColor" />}</button>)}</div>;
}

export function SceneProgress({ elapsed, duration, story, auto, toggleAuto, challenge, collected, reduced }: { elapsed: number; duration: number; story: boolean; auto: boolean; toggleAuto: () => void; challenge: boolean; collected: number; reduced: boolean }) {
  const remaining = Math.max(0, duration - elapsed);
  return <div className="scene-progress">
    <div className="scene-progress-label"><span><Sparkles size={13} />{story ? 'Sehrli bog‘ sarguzashti' : 'Birga kuzatamiz va takrorlaymiz'}</span><strong>{reduced ? 'O‘z sur’atida' : remaining ? `${remaining} son` : 'Yana takrorlash mumkin'}</strong></div>
    <div className="scene-time-track" role="progressbar" aria-label="Joriy ko‘rsatma vaqti" aria-valuemin={0} aria-valuemax={duration} aria-valuenow={elapsed}><span style={{ width: `${elapsed / duration * 100}%` }} /></div>
    {story && <div className="story-options"><button className={`story-auto ${auto && !reduced ? 'on' : ''}`} onClick={toggleAuto} disabled={reduced} aria-pressed={auto && !reduced}><span aria-hidden="true" />O‘zi davom etsin</button>{challenge ? <span className="challenge-count"><Star size={13} fill="currentColor" />{collected}/3 yulduzcha</span> : <small>Istalgan payt keyingisiga o‘tish mumkin</small>}</div>}
    {challenge && collected === 3 && <div className="challenge-success" role="status"><Check size={14} />Uchala yulduzcha ham topildi. Ajoyib!</div>}
    {challenge && remaining === 0 && collected < 3 && <p className="challenge-hint">Yulduzchalarni toping yoki katta kishi bilan davom eting.</p>}
  </div>;
}
