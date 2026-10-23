import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import type { FormEvent, ReactNode } from 'react';
import { ArrowDownToLine, ArrowLeft, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Flower2, Footprints, Gamepad2, Hand, Heart, House, Info, Leaf, LockKeyhole, Pause, Play, Plus, RotateCcw, ShieldCheck, Sparkles, Sprout, Star, Sun, TrendingUp, Trophy, Users, VolumeX, X } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ActivityArt, Bunny, HeroArt } from './Illustrations';
import { games, gymDays, kindLabels, motorActivities, sectionLabels } from './data';
import type { Activity, Mood, Section } from './data';
import { STORAGE_KEY, completedDays, dateKey, downloadReport, formatDuration, initialProgress, isDayUnlocked, nextDay, normalizeProgress, recordSession, uzDate, uzWeekday, localTime } from './progress';
import type { Profile, Progress, Session } from './progress';
import { MusicControl, useMusic } from './Music';
import { animationIsRunning } from './animationPlayback';
import { useReducedMotion } from './useReducedMotion';
import { GardenScenery, SceneProgress, StarChallenge } from './GardenAdventure';
import { advanceSceneClock, canAdvanceStory } from './adventure';

const Bunny3D = lazy(() => import('./Bunny3D'));

const navItems: { id: Section; icon: LucideIcon; label: string; short: string }[] = [
  { id: 'home', icon: House, label: 'Bosh sahifa', short: 'Asosiy' },
  { id: 'gym', icon: Footprints, label: 'Gimnastika', short: 'Mashqlar' },
  { id: 'games', icon: Gamepad2, label: 'Interfaol o‘yinlar', short: 'O‘yinlar' },
  { id: 'motor', icon: Hand, label: 'Mayda motorika', short: 'Motorika' },
  { id: 'monitor', icon: TrendingUp, label: 'Monitoring', short: 'Natijalar' },
];
const sections: { id: Section; label: string; description: string; color: string; art: string; count: string }[] = [
  { id: 'gym', label: 'Gimnastika', description: 'Har kuni yangi harakat', color: 'peach', art: 'bunny', count: '30 kunlik dastur' },
  { id: 'games', label: 'Interfaol o‘yinlar', description: 'O‘ynaymiz va o‘rganamiz', color: 'mint', art: 'ball', count: '7 ta quvnoq o‘yin' },
  { id: 'motor', label: 'Mayda motorika', description: 'Chaqqon barmoqlar', color: 'lavender', art: 'hands', count: '8 ta mashg‘ulot' },
  { id: 'monitor', label: 'Monitoring', description: 'Har bir yutuq qadrli', color: 'butter', art: 'progress', count: 'Rivojlanish kundaligi' },
];

function load() {
  try { const saved = localStorage.getItem(STORAGE_KEY); return { progress: saved ? normalizeProgress(JSON.parse(saved)) : structuredClone(initialProgress), warning: false }; }
  catch { return { progress: structuredClone(initialProgress), warning: true }; }
}
function currentSection(): Section {
  const hash = location.hash.slice(1);
  return navItems.some(item => item.id === hash) ? hash as Section : 'home';
}

export default function App() {
  const [loaded] = useState(load);
  const [progress, setProgress] = useState<Progress>(loaded.progress);
  const [storageWarning, setStorageWarning] = useState(loaded.warning);
  const [section, setSection] = useState<Section>(currentSection);
  const [overlay, setOverlay] = useState<'profile' | 'help' | null>(null);
  const [activity, setActivity] = useState<Activity | null>(null);
  const [toast, setToast] = useState('');
  const mainRef = useRef<HTMLElement>(null);
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(progress)); }
    catch { setStorageWarning(true); }
  }, [progress]);
  useEffect(() => {
    const onHash = () => { setSection(currentSection()); window.scrollTo({ top: 0 }); mainRef.current?.focus({ preventScroll: true }); };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);
  useEffect(() => { if (!toast) return; const timer = setTimeout(() => setToast(''), 4200); return () => clearTimeout(timer); }, [toast]);
  const navigate = (value: Section) => { location.hash = value; };
  const today = progress.sessions.filter(s => dateKey(new Date(s.at)) === dateKey());
  const day = nextDay(progress.sessions);
  const done = completedDays(progress.sessions);
  const todayGym = today.find(s => s.kind === 'gym' && s.day);
  const dailyPlan = [
    gymDays[(todayGym?.day ?? day) - 1],
    games.find(a => a.id === today.find(s => s.kind === 'game')?.activityId) ?? games[0],
    motorActivities.find(a => a.id === today.find(s => s.kind === 'motor')?.activityId) ?? motorActivities[0],
  ];
  const completedKinds = new Set(today.map(s => s.kind));
  const dailyCount = completedKinds.size;
  const notify = (message: string) => setToast(message);
  const start = (value: Activity) => {
    if (value.day && !isDayUnlocked(value.day, progress.sessions)) { notify('Avval oldingi kun mashqlarini yakunlang.'); return; }
    setActivity(value);
  };

  return <div className={`app ${progress.reducedMotion ? 'reduce-motion' : ''}`}>
    <a className="skip-link" href="#main-content" onClick={e => { e.preventDefault(); mainRef.current?.focus(); }}>Asosiy qismga o‘tish</a>
    <aside className="sidebar">
      <Brand />
      <div className="sidebar-caption">BIRGA O‘SIB BORAMIZ</div>
      <nav aria-label="Asosiy navigatsiya">{navItems.map(({ id, icon: Icon, label }) => <a key={id} href={`#${id}`} className={`nav-item ${section === id ? 'active' : ''}`} aria-current={section === id ? 'page' : undefined}><Icon size={21} strokeWidth={1.8} /><span>{label}</span>{section === id && <span className="nav-dot" />}</a>)}</nav>
      <div className="sidebar-bottom"><div className="grow-card"><div className="grow-plant"><Sprout size={38} strokeWidth={1.5} /></div><strong>Kichik qadamlar,<br />katta yutuqlar!</strong><p>Har bir harakat bilan<br />birga ulg‘ayamiz.</p><span className="little-dots">✦ · ✧</span></div><button className="help-button" onClick={() => setOverlay('help')}><CircleHelp size={19} /> Ota-onalar uchun <ChevronRight size={16} /></button><span className="prototype-label">Quvnoq bolajon · Prototip v1.0</span></div>
    </aside>
    <div className="workspace">
      <header className="topbar"><div className="desktop-breadcrumb"><span>Bolajon olami</span><ChevronRight size={14} /><strong>{sectionLabels[section]}</strong></div><div className="mobile-brand"><Brand /></div><div className="topbar-actions"><MusicControl /><span className="visual-badge"><VolumeX size={16} /> Vizual o‘rganish</span><button className="icon-button help-top" aria-label="Yordam" onClick={() => setOverlay('help')}><CircleHelp size={21} /></button><span className="header-divider" /><button className="profile-button" onClick={() => setOverlay('profile')} aria-label="Bola profilini ochish"><span className="avatar"><Bunny /></span><span className="profile-label"><strong>{progress.profile.name}</strong><small>{progress.profile.age} yosh <span>·</span> {progress.profile.role === 'parent' ? 'Ota-ona' : 'Tarbiyachi'}</small></span><ChevronDown size={15} /></button></div></header>
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {storageWarning && <div className="storage-warning" role="status"><Info size={18} /> Brauzer xotirasi mavjud emas. Natijalar sahifa yopilganda saqlanmasligi mumkin.</div>}
        {section === 'home' && <>
          <div className="greeting-row"><div><div className="eyebrow"><span className="small-sun"><Sun size={16} /></span> YANGI KUN, YANGI IMKONIYAT</div><h1>Salom, {progress.profile.name.toLocaleLowerCase('uz-UZ')}! <span className="wave">👋</span></h1><p>Bugun birga harakat qilamiz va yangi yutuqlarga erishamiz.</p></div><div className="date-pill"><span>{uzDate()}</span><small>{uzWeekday()}</small></div></div>
          <div className="dashboard-grid"><div className="dashboard-main">
            <section className="hero"><div className="hero-copy"><span className="hero-tag"><span /> HAR KUN OZGINA HARAKAT</span><h2>Birga o‘ynaymiz,<br />sog‘lom ulg‘ayamiz<span>!</span></h2><p>Quvnoq mashqlar va qiziqarli o‘yinlar<br className="desktop-br" /> bilan har bir kunimiz yanada yorqin.</p><button className="primary-button" onClick={() => start(gymDays[day - 1])}><Play size={16} fill="currentColor" /> Mashg‘ulotni boshlash <ArrowRight size={18} /></button><span className="hero-footnote"><ShieldCheck size={14} /> Kattalar bilan birga o‘rganamiz</span></div><HeroArt /></section>
            <div className="section-heading"><div><h2>Bugun nimani o‘rganamiz?</h2><p>Bolajoningiz uchun kichik kashfiyotlar</p></div><span className="section-spark"><Sparkles size={22} /></span></div>
            <div className="category-grid">{sections.map(s => <button className={`category-card ${s.color}`} key={s.id} onClick={() => navigate(s.id)}><div className="category-top"><span className="card-count">{s.count}</span><span className="category-arrow"><ArrowRight size={17} /></span></div><ActivityArt type={s.art} /><h3>{s.label}</h3><p>{s.description}</p></button>)}</div>
            <section className="daily-section"><div className="section-heading"><div><h2>Kichik qadamlar rejasi</h2><p>Bugungi quvonchli mashg‘ulotlar</p></div><span className="soft-chip">{dailyCount}/3 bajarildi</span></div><div className="daily-list">{dailyPlan.map((a, i) => {
              const completed = today.some(s => s.activityId === a.id);
              const Icon = [Footprints, Gamepad2, Hand][i];
              return <button className={`daily-item ${completed ? 'completed' : ''}`} key={a.id} onClick={() => start(a)}><span className={`daily-icon ${['peach', 'mint', 'lavender'][i]}`}><Icon size={22} /></span><span className="daily-copy"><small>{kindLabels[a.kind]} {a.day ? `· ${a.day}-kun` : ''}</small><strong>{a.title}</strong></span><span className="daily-duration"><Clock3 size={13} />{a.duration}</span><span className={`daily-status ${completed ? 'checked' : ''}`}>{completed ? <Check size={17} /> : <Play size={15} fill="currentColor" />}</span></button>;
            })}</div></section>
          </div><aside className="dashboard-aside"><section className="today-card"><div className="card-heading"><h2>Bugungi faollik</h2><span className="sparkle-icon"><Sparkles size={19} /></span></div><ProgressRing value={dailyCount} total={3} /><h3>{dailyCount === 3 ? 'Barakalla, bolajon!' : dailyCount ? 'Juda yaxshi ketyapti!' : 'Keling, boshlaymiz!'}</h3><p>{dailyCount === 3 ? 'Bugungi uchta yo‘nalish yakunlandi.' : 'Har bir kichik harakat — katta yutuq.'}</p><div className="today-stats"><div><strong>{today.length}<span> ta</span></strong><small>Mashg‘ulot</small></div><span /><div><strong>{Math.floor(today.reduce((n, s) => n + s.seconds, 0) / 60)}<span> daq</span></strong><small>Faol vaqt</small></div></div><div className="week-strip">{weekDays(progress.sessions).map(w => <div key={w.key} className={`week-day ${w.today ? 'is-today' : ''}`}><small>{w.label}</small><span>{w.done ? <Check size={14} /> : w.today ? <span className="tiny-dot" /> : '·'}</span></div>)}</div></section>
            <section className="journey-card"><div className="journey-title"><span className="journey-icon"><Footprints size={19} /></span><span><h3>Bizning sayohat</h3><small>30 kunlik gimnastika</small></span><Leaf size={18} className="muted-leaf" /></div><div className="journey-track"><span style={{ width: `${done.length / 30 * 100}%` }} /></div><div className="journey-label"><strong>{done.length} kun <span>bajarildi</span></strong><span>30 kundan</span></div><button className="text-button" onClick={() => navigate('gym')}>Dasturga o‘tish <ArrowRight size={15} /></button></section>
            <section className="parent-note"><span className="note-art"><Heart size={22} /></span><div className="eyebrow">OTA-ONALAR UCHUN</div><h3>Eng yaxshi yordam —<br />birga bajaring!</h3><p>Harakatlarni avval o‘zingiz ko‘rsating. Bolajoningizning har bir urinishini qo‘llab-quvvatlang.</p><button className="text-button" onClick={() => setOverlay('help')}>Foydali tavsiyalar <ArrowRight size={15} /></button><Flower2 className="note-flower" size={72} strokeWidth={1} /></section>
          </aside></div>
          <div className="home-footer"><span><Heart size={14} /> Har bir bolajon o‘z sur’atida ulg‘ayadi</span><span>Mehr bilan yaratilgan</span></div>
        </>}
        {section === 'gym' && <Gym progress={progress} start={start} />}
        {section === 'games' && <ActivityLibrary kind="games" start={start} sessions={progress.sessions} />}
        {section === 'motor' && <ActivityLibrary kind="motor" start={start} sessions={progress.sessions} />}
        {section === 'monitor' && <Monitoring progress={progress} navigate={navigate} notify={notify} />}
      </main>
    </div>
    <nav className="bottom-nav" aria-label="Mobil navigatsiya">{navItems.map(({ id, icon: Icon, short }) => <a key={id} href={`#${id}`} className={section === id ? 'active' : ''} aria-current={section === id ? 'page' : undefined}><Icon size={22} strokeWidth={section === id ? 2.3 : 1.8} /><span>{short}</span></a>)}</nav>
    {overlay === 'profile' && <ProfileModal progress={progress} close={() => setOverlay(null)} save={(profile, reducedMotion) => { setProgress(p => ({ ...p, profile, reducedMotion })); setOverlay(null); notify('Profil saqlandi. Yangi yutuqlar sari!'); }} />}
    {overlay === 'help' && <HelpModal close={() => setOverlay(null)} />}
    {activity && <ActivityPlayer key={activity.id} activity={activity} reducedMotion={progress.reducedMotion} close={() => setActivity(null)} save={(seconds, mood) => { setProgress(p => ({ ...p, sessions: recordSession(p.sessions, activity, seconds, mood) })); }} />}
    {toast && <div className="toast" role="status"><Check size={18} />{toast}</div>}
  </div>;
}

function Brand() { return <div className="brand"><span className="brand-logo"><Bunny /></span><span>Quvnoq<span>bolajon<span className="brand-dot">.</span></span></span></div>; }
function ProgressRing({ value, total }: { value: number; total: number }) {
  const percent = Math.min(value / total, 1);
  return <div className="progress-ring" role="img" aria-label={`${total} mashg‘ulotdan ${value} tasi bajarildi`}><svg viewBox="0 0 180 180"><circle cx="90" cy="90" r="73" fill="none" stroke="#F1EEE7" strokeWidth="11" /><circle cx="90" cy="90" r="73" fill="none" stroke="#E7AB66" strokeWidth="11" strokeDasharray={`${percent * 458.67} 458.67`} strokeLinecap="round" transform="rotate(-90 90 90)" /></svg><div className="ring-content"><span className="ring-sun"><Sun size={29} strokeWidth={1.6} /></span><strong>{value}<span> / {total}</span></strong><small>mashg‘ulot</small></div></div>;
}
function weekDays(sessions: Session[]) {
  const today = dateKey(); const now = new Date(`${today}T12:00:00+05:00`); const dayIndex = (now.getUTCDay() + 6) % 7;
  return ['Du', 'Se', 'Ch', 'Pa', 'Ju', 'Sh', 'Ya'].map((label, i) => {
    const d = new Date(now); d.setUTCDate(now.getUTCDate() - dayIndex + i); const key = dateKey(d);
    return { label, key, today: key === today, done: sessions.some(s => dateKey(new Date(s.at)) === key) };
  });
}
function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <div className="page-heading"><div><div className="eyebrow"><Sparkles size={15} />{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{children}</div>;
}

function Gym({ progress, start }: { progress: Progress; start: (activity: Activity) => void }) {
  const [week, setWeek] = useState(Math.floor((nextDay(progress.sessions) - 1) / 7));
  const done = completedDays(progress.sessions); const day = nextDay(progress.sessions); const current = gymDays[day - 1];
  return <div className="inner-page"><PageHeading eyebrow="HAR KUN BIR QADAM" title="Quvnoq gimnastika" description="Ko‘ramiz, takrorlaymiz va birga ulg‘ayamiz." />
    <section className="gym-banner"><div><span className="soft-chip">30 kunlik sayohat</span><h2>{done.length === 30 ? 'Sayohat yakunlandi!' : `${day}-kun. ${current.title}`}</h2><p>Tanani qizdirish → asosiy harakat → dam olish</p><button className="primary-button" onClick={() => start(current)}><Play size={16} fill="currentColor" />{done.length === 30 ? 'Yana takrorlaymiz' : 'Bugungi mashg‘ulot'}<ArrowRight size={17} /></button><small>Namuna dastur · Kattalar bilan birga</small></div><div className="gym-bunny"><Bunny /></div></section>
    <div className="program-heading"><div><h2>Harakatlar taqvimi</h2><p>Keyingi kun avvalgisi bajarilgach ochiladi.</p></div><strong className="soft-chip">{done.length} / 30 kun</strong></div><div className="program-progress"><span style={{ width: `${done.length / 30 * 100}%` }} /></div>
    <div className="week-selector"><button className="icon-button" aria-label="Oldingi hafta" disabled={week === 0} onClick={() => setWeek(w => w - 1)}><ChevronLeft size={21} /></button><div className="week-tabs">{[0, 1, 2, 3, 4].map(w => <button className={week === w ? 'selected' : ''} key={w} onClick={() => setWeek(w)}>{w + 1}-hafta</button>)}</div><button className="icon-button" aria-label="Keyingi hafta" disabled={week === 4} onClick={() => setWeek(w => w + 1)}><ChevronRight size={21} /></button></div>
    <div className="days-grid">{gymDays.slice(week * 7, week * 7 + 7).map(a => {
      const complete = done.includes(a.day!); const unlocked = isDayUnlocked(a.day!, progress.sessions);
      return <button className={`day-card ${complete ? 'done' : ''} ${a.day === day && !complete ? 'current' : ''} ${!unlocked ? 'locked' : ''}`} key={a.id} disabled={!unlocked} onClick={() => start(a)}><div className="day-card-top"><span>{a.day}-KUN</span>{complete ? <Check size={18} /> : !unlocked ? <LockKeyhole size={16} /> : <span className="current-dot" />}</div><ActivityArt type={['bunny', 'flower', 'ball'][((a.day ?? 1) - 1) % 3]} /><h3>{a.title}</h3><small>{complete ? 'Bajarildi · takrorlash' : unlocked ? 'Boshlashga tayyor' : 'Hali ochilmagan'}</small>{unlocked && <span className="day-arrow"><ArrowRight size={17} /></span>}</button>;
    })}</div><div className="quiet-note"><Info size={17} /><p>Harakatlarni bolajoningizning imkoniyatiga mos bajaring. Dasturdagi kunlar — ketma-ket mashg‘ulotlar; ularni kalendar bo‘yicha har kuni bajarish shart emas.</p></div>
  </div>;
}

function ActivityLibrary({ kind, start, sessions }: { kind: 'games' | 'motor'; start: (activity: Activity) => void; sessions: Session[] }) {
  const [filter, setFilter] = useState('Barchasi');
  const isGame = kind === 'games'; const activities = isGame ? games : motorActivities;
  const groups = ['Barchasi', ...new Set(activities.map(a => a.group!))];
  const filtered = activities.filter(a => filter === 'Barchasi' || a.group === filter);
  return <div className="inner-page"><PageHeading eyebrow={isGame ? 'O‘YIN ORQALI O‘RGANAMIZ' : 'KICHIK BARMOQLAR, YANGI KASHFIYOTLAR'} title={isGame ? 'Qani, birga o‘ynaymiz!' : 'Chaqqon barmoqlar'} description={isGame ? 'Rangli ishoralar, qiziqarli rollar va birgalikdagi quvonch.' : 'Qo‘l va barmoqlar uchun ko‘rgazmali mashg‘ulotlar.'}><span className={`library-symbol ${isGame ? 'mint' : 'lavender'}`}>{isGame ? <Gamepad2 size={35} /> : <Hand size={35} />}</span></PageHeading>
    <div className={`library-callout ${isGame ? 'mint' : 'lavender'}`}><span>{isGame ? <Users size={25} /> : <Hand size={25} />}</span><div><strong>{isGame ? 'Birga o‘ynash yanada qiziq!' : 'Oddiy harakatlardan boshlaymiz'}</strong><p>{isGame ? 'Katta kishi ishoralarni ko‘rsatadi, bolajon harakat bilan javob beradi.' : 'Avval jihozsiz mashqlar, keyin yumshoq to‘pcha va boshqa jihozlar bilan.'}</p></div><VolumeX size={23} /></div>
    <div className="library-toolbar"><div className="filter-tabs" aria-label="Mashg‘ulot turlari">{groups.map(g => <button className={filter === g ? 'selected' : ''} key={g} onClick={() => setFilter(g)} aria-pressed={filter === g}>{g}</button>)}</div><small>{filtered.length} ta mashg‘ulot</small></div>
    <div className="library-grid">{filtered.map(a => {
      const complete = sessions.some(s => s.activityId === a.id);
      return <button key={a.id} className="library-card" onClick={() => start(a)}><div className={`library-card-art ${a.color}`}><span className="library-group">{a.group}</span>{a.id === 'rabbit' && <span className="live-animation-badge"><Sparkles size={11} />Jonli ko‘rsatma</span>}{complete && <span className="completed-badge" aria-label="Avval bajarilgan"><Check size={15} /> Bajarildi</span>}<ActivityArt type={a.art} /><span className="library-play"><Play size={18} fill="currentColor" /></span></div><div className="library-card-copy"><h2>{a.title}</h2><p>{a.description}</p><div><span><Clock3 size={14} />{a.duration}</span><ArrowUpRight /></div></div></button>;
    })}</div><div className="quiet-note"><Heart size={17} /><p>{isGame ? 'Barcha ishoralar ekranda ko‘rsatiladi. Ovozli buyruqlar talab qilinmaydi.' : 'Jihozli mashqlar kattalar nazoratida bajariladi. Mayda buyumlarni bolaga nazoratsiz qoldirmang.'}</p></div>
  </div>;
}
function ArrowUpRight() { return <ArrowRight size={18} className="arrow-diagonal" />; }

function Monitoring({ progress, navigate, notify }: { progress: Progress; navigate: (section: Section) => void; notify: (message: string) => void }) {
  const [period, setPeriod] = useState('week');
  const [kind, setKind] = useState('all');
  const cutoff = new Date(`${dateKey()}T00:00:00+05:00`); cutoff.setUTCDate(cutoff.getUTCDate() - (period === 'week' ? 6 : 29));
  const sessions = progress.sessions.filter(s => (period === 'all' || new Date(s.at) >= cutoff) && (kind === 'all' || s.kind === kind));
  const activeDays = new Set(sessions.map(s => dateKey(new Date(s.at)))).size;
  const [expanded, setExpanded] = useState(false);
  const weeks = weekDays(sessions); const max = Math.max(3, ...weeks.map(w => sessions.filter(s => dateKey(new Date(s.at)) === w.key).length));
  return <div className="inner-page"><PageHeading eyebrow="HAR BIR YUTUQ QADRLI" title="Rivojlanish kundaligi" description={`${progress.profile.name}ning kichik qadamlari va quvonchli yutuqlari.`}><button className="outline-button" disabled={!progress.sessions.length} onClick={() => { downloadReport(progress); notify('Barcha natijalar CSV fayliga yuklandi.'); }}><ArrowDownToLine size={17} /> Natijalarni yuklash</button></PageHeading>
    <div className="monitor-filters"><div className="filter-tabs">{[['week', '7 kun'], ['month', '30 kun'], ['all', 'Barchasi']].map(([v, l]) => <button key={v} onClick={() => { setPeriod(v); setExpanded(false); }} className={period === v ? 'selected' : ''} aria-pressed={period === v}>{l}</button>)}</div><label className="select-label">Bo‘lim<select value={kind} onChange={e => { setKind(e.target.value); setExpanded(false); }}><option value="all">Barcha bo‘limlar</option><option value="gym">Gimnastika</option><option value="game">O‘yinlar</option><option value="motor">Mayda motorika</option></select></label></div>
    <div className="metric-grid"><Metric icon={Footprints} color="peach" value={sessions.length} label="Mashg‘ulot bajarildi" unit="ta" /><Metric icon={Clock3} color="mint" value={Math.floor(sessions.reduce((n, s) => n + s.seconds, 0) / 60)} label="Birgalikda faol vaqt" unit="daq" /><Metric icon={Sun} color="butter" value={activeDays} label="Faol kunlar" unit="kun" /><Metric icon={Trophy} color="lavender" value={completedDays(sessions).length} label="Gimnastika dasturi" unit="/ 30" /></div>
    <div className="monitor-charts"><section className="chart-card"><div className="card-heading"><div><h2>Bu haftadagi harakatlar</h2><p>Har bir mashg‘ulot — bitta quvonchli qadam</p></div><span className="chart-legend"><span /> Mashg‘ulotlar</span></div><div className="bar-chart" role="img" aria-label={weeks.map(w => `${w.label}: ${sessions.filter(s => dateKey(new Date(s.at)) === w.key).length} ta mashg‘ulot`).join(', ')}>{weeks.map(w => {
      const count = sessions.filter(s => dateKey(new Date(s.at)) === w.key).length;
      return <div className={`bar-column ${w.today ? 'today' : ''}`} key={w.key}><span className="bar-number">{count}</span><div className="bar-track"><div style={{ height: `${count / max * 100}%` }} /></div><span>{w.label}</span></div>;
    })}</div></section><section className="milestone-card"><div className="milestone-icon"><Trophy size={38} strokeWidth={1.4} /></div><h2>{progress.sessions.length >= 10 ? 'Harakat qahramoni!' : progress.sessions.length >= 1 ? 'Birinchi qadam!' : 'Yutuqlar oldinda!'}</h2><p>{progress.sessions.length >= 10 ? 'O‘nta mashg‘ulotni bajardingiz. Ajoyib mehnat!' : progress.sessions.length >= 1 ? 'Birinchi mashg‘ulot bajarildi. Yana birga davom etamiz!' : 'Birinchi mashg‘ulotni bajarib, sayohatni boshlang.'}</p><span className="milestone-chip"><Star size={15} />{progress.sessions.length >= 10 ? '10 ta mashg‘ulot' : progress.sessions.length ? 'Birinchi mashg‘ulot' : 'Birinchi yutuqni kutyapmiz'}</span></section></div>
    <section className="history-section"><div className="section-heading"><div><h2>Mashg‘ulotlar tarixi</h2><p>Birgalikda bajarilgan harakatlar</p></div><span className="soft-chip">{sessions.length} ta natija</span></div>{sessions.length ? <><div className="history-list">{sessions.slice(0, expanded ? undefined : 8).map(s => <div className="history-row" key={s.id}><span className={`daily-icon ${s.kind === 'gym' ? 'peach' : s.kind === 'game' ? 'mint' : 'lavender'}`}>{s.kind === 'gym' ? <Footprints size={21} /> : s.kind === 'game' ? <Gamepad2 size={21} /> : <Hand size={21} />}</span><div className="history-name"><strong>{s.title}</strong><small>{kindLabels[s.kind]}{s.day ? ` · ${s.day}-kun` : ''}</small></div><span className="history-date">{uzDate(new Date(s.at), true)}<small>{localTime(new Date(s.at))}</small></span><span className="history-duration">{formatDuration(s.seconds)}</span><span className={`mood-tag ${s.mood}`}>{s.mood === 'happy' ? '😊 Xursand' : s.mood === 'okay' ? '🙂 Yaxshi' : '😌 Charchadim'}</span></div>)}</div>{sessions.length > 8 && <button className="outline-button show-more" onClick={() => setExpanded(v => !v)}>{expanded ? 'Kamroq ko‘rsatish' : 'Barchasini ko‘rsatish'}<ChevronDown size={16} /></button>}</> : <div className="empty-state"><div className="empty-art"><ActivityArt type="flower" /></div><h3>{progress.sessions.length ? 'Bu davrda natija topilmadi' : 'Birinchi qadamdan boshlaymiz'}</h3><p>{progress.sessions.length ? 'Boshqa davr yoki bo‘limni tanlab ko‘ring.' : 'Mashg‘ulotni yakunlang — natijasi shu yerda ko‘rinadi.'}</p><button className="primary-button" onClick={() => navigate('gym')}>Mashqlarga o‘tish<ArrowRight size={17} /></button></div>}</section><div className="quiet-note"><ShieldCheck size={18} /><p>Bu kundalik bajarilgan mashg‘ulotlarni qayd etadi. Ma’lumotlar faqat shu qurilmadagi brauzerda saqlanadi. Jismoniy rivojlanish ko‘rsatkichlari avtomatik o‘lchanmaydi.</p></div>
  </div>;
}
function Metric({ icon: Icon, color, value, label, unit }: { icon: LucideIcon; color: string; value: number; label: string; unit: string }) { return <div className="metric"><span className={`metric-icon ${color}`}><Icon size={22} /></span><strong>{value}<small> {unit}</small></strong><span>{label}</span></div>; }

function Modal({ children, title, close, wide = false }: { children: ReactNode; title: string; close: () => void; wide?: boolean }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => { const el = ref.current!; el.showModal(); const previousOverflow = document.body.style.overflow; document.body.style.overflow = 'hidden'; return () => { document.body.style.overflow = previousOverflow; el.close(); }; }, []);
  return <dialog ref={ref} className={`modal ${wide ? 'wide' : ''}`} aria-label={title} onCancel={e => { e.preventDefault(); close(); }} onClick={e => { if (e.target === e.currentTarget) { const r = e.currentTarget.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) close(); } }}><div className="modal-top"><span>{title}</span><div className="modal-header-controls"><MusicControl /><button className="icon-button" onClick={close} aria-label="Yopish"><X size={21} /></button></div></div>{children}</dialog>;
}

function ProfileModal({ progress, close, save }: { progress: Progress; close: () => void; save: (profile: Profile, reduced: boolean) => void }) {
  const [name, setName] = useState(progress.profile.name); const [age, setAge] = useState(progress.profile.age); const [role, setRole] = useState(progress.profile.role); const [reduced, setReduced] = useState(progress.reducedMotion);
  const submit = (e: FormEvent) => { e.preventDefault(); if (name.trim()) save({ name: name.trim(), age, role }, reduced); };
  return <Modal title="Bolajon profili" close={close}><form className="profile-form" onSubmit={submit}><div className="profile-avatar-large"><Bunny /></div><h2>Bolajon bilan tanishamiz</h2><p>Uning kichik yutuqlarini birga kuzatamiz.</p><label>Bolajonning ismi<input autoComplete="off" maxLength={30} required value={name} onChange={e => setName(e.target.value)} placeholder="Ismini yozing" /></label><div className="form-columns"><label>Yoshi<select value={age} onChange={e => setAge(Number(e.target.value))}>{[3, 4, 5, 6, 7].map(n => <option key={n} value={n}>{n} yosh</option>)}</select></label><label>Siz kimsiz?<select value={role} onChange={e => setRole(e.target.value as Profile['role'])}><option value="parent">Ota-ona</option><option value="teacher">Tarbiyachi</option></select></label></div><label className="toggle-label"><span><strong>Kamroq animatsiya</strong><small>Harakatli tasvirlarni to‘xtatish</small></span><input type="checkbox" checked={reduced} onChange={e => setReduced(e.target.checked)} /><span className={`toggle ${reduced ? 'on' : ''}`} aria-hidden="true" /></label><div className="profile-privacy"><ShieldCheck size={17} />Profil faqat shu qurilmada saqlanadi.</div><button className="primary-button full-width" type="submit" disabled={!name.trim()}><Check size={18} />Saqlash</button></form></Modal>;
}

function HelpModal({ close }: { close: () => void }) {
  return <Modal title="Ota-onalar va tarbiyachilar uchun" close={close}><div className="help-content"><div className="help-heart"><Heart size={33} strokeWidth={1.5} /></div><h2>Birga bajarsak,<br />yanada quvnoq bo‘ladi!</h2><p>Quvnoq bolajon eshitishida nuqsoni bor maktabgacha yoshdagi bolalar uchun ko‘rgazmali mashg‘ulotlar prototipidir.</p>{[
    [VolumeX, 'Ko‘rsating va birga takrorlang', 'Ovozli buyruq shart emas. Ekrandagi tasvir, matn va ishoralarni birgalikda kuzating.'],
    [Heart, 'Bolajonning sur’atini tanlang', 'Qulay joy tayyorlang, mashqlarni avval ko‘rsating. Dam olish uchun istalgan payt tanaffus qiling.'],
    [Star, 'Har bir urinishni qadrlang', 'Natijani tezlik yoki boshqa bolalar bilan solishtirmang. Kichik yutuqni ham birga nishonlang.'],
    [ShieldCheck, 'Natijalarni o‘zingiz belgilang', 'Mashq bajarilganini katta kishi tasdiqlaydi. Ilova harakatlarni kamera yoki sensor orqali baholamaydi.'],
  ].map(([Icon, title, text]) => { const I = Icon as LucideIcon; return <div className="help-tip" key={title as string}><span><I size={21} /></span><div><h3>{title as string}</h3><p>{text as string}</p></div></div>; })}<div className="help-prototype"><Info size={18} /><p>Mashqlar — namuna mazmun. Kengaytirilgan dastur va individual tavsiyalar mutaxassis bilan ishlab chiqiladi.</p></div><button className="primary-button full-width" onClick={close}>Tushunarli, birga boshlaymiz<ArrowRight size={17} /></button></div></Modal>;
}

function ActivityPlayer({ activity, close, save, reducedMotion }: { activity: Activity; close: () => void; save: (seconds: number, mood: Mood) => void; reducedMotion: boolean }) {
  const { setAnimationRunning } = useMusic();
  const motionReduced = useReducedMotion(reducedMotion);
  const story = activity.id === 'rabbit';
  const usesCharacter = story || activity.kind === 'gym';
  const [characterMoving, setCharacterMoving] = useState(false);
  const [characterReady, setCharacterReady] = useState(false);
  const [replay, setReplay] = useState(0);
  const [stage, setStage] = useState(-1);
  const [paused, setPaused] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [sceneSeconds, setSceneSeconds] = useState(0);
  const [autoAdvance, setAutoAdvance] = useState(true);
  const [stars, setStars] = useState<Record<number, number[]>>({});
  const [confirmed, setConfirmed] = useState(false);
  const [visible, setVisible] = useState(!document.hidden);
  const [mood, setMood] = useState<Mood | null>(null);
  const [saved, setSaved] = useState(false);
  const [exit, setExit] = useState(false);
  const saveGuard = useRef(false);
  const active = stage >= 0 && stage < activity.steps.length;
  const step = activity.steps[stage];
  const duration = step?.seconds ?? 12;
  const found = stars[stage] ?? [];
  const clockRunning = active && !paused && !exit && visible && (!usesCharacter || characterReady || motionReduced);
  const animationRunning = animationIsRunning({ active: active && visible, paused, exiting: exit, reducedMotion: motionReduced, isRive: usesCharacter, characterMoving, stopCue: step?.cue === 'To‘xta' });

  useEffect(() => {
    const update = () => setVisible(!document.hidden);
    document.addEventListener('visibilitychange', update);
    return () => document.removeEventListener('visibilitychange', update);
  }, []);
  useEffect(() => {
    setAnimationRunning(animationRunning);
    return () => setAnimationRunning(false);
  }, [animationRunning, setAnimationRunning]);
  useEffect(() => {
    if (!clockRunning) return;
    const timer = setInterval(() => {
      setSeconds(s => s + 1);
      setSceneSeconds(s => advanceSceneClock(s, duration, true));
    }, 1000);
    return () => clearInterval(timer);
  }, [clockRunning, duration, stage, replay]);
  useEffect(() => {
    if (!story || motionReduced || !canAdvanceStory(sceneSeconds, duration, autoAdvance, clockRunning, !!step?.challenge, found.length)) return;
    setSceneSeconds(0);
    setStage(s => s + 1);
  }, [story, motionReduced, sceneSeconds, duration, autoAdvance, clockRunning, step?.challenge, found.length]);

  const changeStage = (next: number) => { setSceneSeconds(0); setStage(next); };
  const requestClose = () => { if (active || (stage === activity.steps.length && !saved)) setExit(true); else close(); };
  const complete = () => {
    if (mood && (!story || confirmed) && !saveGuard.current) {
      saveGuard.current = true; save(seconds, mood); setSaved(true);
    }
  };
  const replayScene = () => { setCharacterReady(false); setSceneSeconds(0); setReplay(n => n + 1); };
  const collectStar = (id: number) => {
    if (!clockRunning) return;
    setStars(all => ({ ...all, [stage]: [...new Set([...(all[stage] ?? []), id])] }));
  };

  return <Modal title={activity.day ? `Gimnastika · ${activity.day}-kun` : kindLabels[activity.kind]} close={requestClose} wide>
    {exit ? <div className="exit-content">
      <span className="exit-icon"><Pause size={33} /></span><h2>Hozircha to‘xtatamizmi?</h2>
      <p>Yakunlanmagan mashg‘ulot natijasi saqlanmaydi. Keyin boshidan boshlashingiz mumkin.</p>
      <button className="primary-button full-width" onClick={() => setExit(false)}>Davom etamiz<Play size={17} /></button>
      <button className="outline-button full-width" onClick={close}>Mashg‘ulotdan chiqish</button>
    </div> : stage === -1 ? <div className="activity-intro">
      <div className={`intro-art ${activity.color}`}><ActivityArt type={activity.art} /><span className="intro-star star-a">✦</span><span className="intro-star star-b">✧</span></div>
      <div className="eyebrow">{activity.day ? `${activity.day}-KUN · ` : ''}{activity.duration.toUpperCase()}{story ? ' · 8 SAHNA' : ''}</div>
      <h2>{activity.title}</h2><p>{activity.description}</p>
      <div className="equipment"><span><Plus size={18} /></span><div><small>Kerak bo‘ladi</small><strong>{activity.equipment}</strong></div></div>
      <div className="intro-guidance"><Users size={18} /><span>Katta kishi harakatni avval ko‘rsatadi, bolajon takrorlaydi. Istalgan payt dam olish mumkin.</span></div>
      {story && <p className="story-intro-note">Quyoncha bilan salomlashamiz, gullar orasidan o‘tamiz, yulduzchalarni topamiz va raqs tushamiz!</p>}
      <button className="primary-button full-width" onClick={() => changeStage(0)}><Play size={18} fill="currentColor" />Qani, boshladik!</button>
    </div> : active ? <div className="player-content">
      <div className="step-heading"><span>{stage + 1} / {activity.steps.length} bosqich</span><span className="player-clock"><Clock3 size={15} />{String(Math.floor(seconds / 60)).padStart(2, '0')}:{String(seconds % 60).padStart(2, '0')}</span></div>
      <div className="step-track">{activity.steps.map((_, i) => <span key={i} className={i <= stage ? 'filled' : ''} />)}</div>
      <div className={`player-scene ${activity.color} ${paused ? 'paused' : ''} ${usesCharacter ? 'has-rive has-3d' : ''}`}>
        <div className="scene-sun"><Sun size={42} strokeWidth={1.4} /></div><div className="scene-cloud cloud-left" /><div className="scene-cloud cloud-right" /><div className="scene-ground" />
        {usesCharacter && <GardenScenery still={!animationRunning} celebration={step.pose === 'celebrate' || (!!step.challenge && found.length === 3)} />}
        {usesCharacter ? <Suspense fallback={<Bunny pose={step.pose} />}><Bunny3D key={replay} pose={step.pose} paused={paused || exit || !visible} reducedMotion={motionReduced} onMotionChange={setCharacterMoving} onReadyChange={setCharacterReady} /></Suspense> : <Bunny pose={step.pose} animated={animationRunning} />}
        {step.challenge && <StarChallenge found={found} collect={collectStar} paused={!clockRunning} />}
        {usesCharacter && !motionReduced && <button className="replay-animation" aria-label="Harakatni qayta ko‘rish" disabled={paused || !characterReady} onClick={replayScene}><RotateCcw size={15} /> Qayta ko‘rish</button>}
        <span className="scene-flower">✿</span>{paused && <div className="pause-overlay"><Pause size={32} /><strong>Tanaffus</strong></div>}
        <span className={`visual-cue ${step.cue === 'To‘xta' ? 'stop-cue' : ''}`}>{step.cue === 'To‘xta' ? <Hand size={20} /> : <Check size={19} />}{step.cue}</span>
      </div>
      <SceneProgress elapsed={sceneSeconds} duration={duration} story={story} auto={autoAdvance} toggleAuto={() => setAutoAdvance(a => !a)} challenge={!!step.challenge} collected={found.length} reduced={motionReduced} />
      <h2>{step.title}</h2><p className="step-instruction" aria-live="polite">{step.instruction}</p>
      <div className="player-adult-note"><Users size={15} />{story ? 'Birga tomosha qiling va o‘z sur’atingizda takrorlang.' : 'Harakat bajarilgach, katta kishi tasdiqlaydi.'}</div>
      <div className="player-actions">
        <button className="outline-button" onClick={() => setPaused(p => !p)} aria-label={paused ? 'Davom ettirish' : 'Tanaffus'}>{paused ? <Play size={19} /> : <Pause size={19} />}<span>{paused ? 'Davom etish' : 'Tanaffus'}</span></button>
        <button className="primary-button" disabled={paused} onClick={() => changeStage(stage + 1)}>{stage === activity.steps.length - 1 ? 'Yakunlash' : 'Bajardik, keyingisi'}<ArrowRight size={18} /></button>
      </div>
      {stage > 0 && <button className="text-button previous-step" disabled={paused} onClick={() => changeStage(stage - 1)}><ArrowLeft size={14} />Oldingi harakat</button>}
    </div> : <div className="completion-content">
      <div className="completion-medal"><Trophy size={51} strokeWidth={1.4} /><span>✦</span><span>✧</span></div><div className="eyebrow">KICHIK QADAM, KATTA YUTUQ</div>
      <h2>{saved ? 'Natija saqlandi!' : 'Barakalla, bolajon!'}</h2><p>{saved ? 'Yutuqingiz rivojlanish kundaligiga qo‘shildi.' : story ? 'Sehrli bog‘dagi sarguzashtimiz yakunlandi!' : 'Yana bir mashg‘ulotni birga bajardik.'}</p>
      <div className="completed-session"><Check size={19} /><strong>{activity.title}</strong><span>{formatDuration(seconds)}</span></div>
      {!saved ? <><h3>Bolajon o‘zini qanday his qilyapti?</h3>
        <div className="mood-options">{([['happy', '😊', 'Xursand'], ['okay', '🙂', 'Yaxshi'], ['tired', '😌', 'Charchadim']] as const).map(([v, face, label]) => <button key={v} onClick={() => setMood(v)} className={mood === v ? 'selected' : ''} aria-pressed={mood === v}><span>{face}</span>{label}</button>)}</div>
        {story && <label className="story-confirm"><input type="checkbox" checked={confirmed} onChange={e => setConfirmed(e.target.checked)} /><span>Bola mashg‘ulotni bajardi — tasdiqlayman</span></label>}
        <button className="primary-button full-width" disabled={!mood || (story && !confirmed)} onClick={complete}><Check size={18} />Natijani saqlash</button>
      </> : <><div className="saved-message"><Sprout size={21} />{activity.day && activity.day < 30 ? `${activity.day + 1}-kun mashg‘uloti ham ochildi!` : 'Har bir bolajon o‘z sur’atida ulg‘ayadi.'}</div><button className="primary-button full-width" onClick={close}>Ajoyib, davom etamiz<ArrowRight size={18} /></button></>}
    </div>}
  </Modal>;
}
