import type { ActivityKind, Section } from './data';
import { physicalTests, testHistory, trend } from './assessments.ts';
import type { Assessment } from './assessments.ts';
import { completedDays, dateKey } from './progress.ts';
import type { Role, Session } from './progress.ts';

export type Recommendation = { id: string; tone: 'praise' | 'suggest' | 'remind' | 'care'; title: string; text: string; action?: { label: string; section: Section; activityId?: string } };

const DAY = 86_400_000;
const kindNames: Record<ActivityKind, [string, Section]> = { gym: ['Gimnastika', 'gym'], game: ['Interfaol o‘yinlar', 'games'], motor: ['Mayda motorika', 'motor'] };

// Methodological suggestions for the adult, built only from this child's own records:
// regularity, balance between sections, mood after sessions and measured test results.
export function recommendations(sessions: Session[], assessments: Assessment[], childId: string, role: Role, now = new Date()): Recommendation[] {
  const list: (Recommendation & { priority: number })[] = [];
  const add = (priority: number, r: Recommendation) => list.push({ ...r, priority });
  const ago = (at: string) => (now.getTime() - new Date(at).getTime()) / DAY;
  const teacher = role === 'teacher';

  if (!sessions.length) {
    add(10, { id: 'start', tone: 'suggest', title: 'Birinchi mashg‘ulotdan boshlang', text: teacher ? 'Guruh bilan 1-kun gimnastikasini bajaring. Harakatni avval o‘zingiz ko‘rsating, so‘ng bolalar takrorlasin.' : 'Uyda 1-kun gimnastikasini birga bajaring. Harakatni avval o‘zingiz ko‘rsating.', action: { label: 'Gimnastikaga o‘tish', section: 'gym' } });
  } else {
    const recent = sessions.filter(s => ago(s.at) <= 7);
    const activeDays = new Set(recent.map(s => dateKey(new Date(s.at)))).size;
    if (!recent.length) add(9, { id: 'return', tone: 'remind', title: 'Mashg‘ulotlarga qaytamiz', text: 'Oxirgi haftada mashg‘ulot bo‘lmadi. Qisqa, 5 daqiqalik mashg‘ulotdan qayta boshlash yetarli.', action: { label: 'Gimnastikaga o‘tish', section: 'gym' } });
    else if (activeDays >= 4) add(3, { id: 'regular', tone: 'praise', title: 'Muntazamlik juda yaxshi', text: `Oxirgi 7 kunda ${activeDays} kun faol bo‘ldi. Shu maromni saqlang, ammo dam olish kunlarini ham unutmang.` });
    else if (activeDays <= 2) add(6, { id: 'more-days', tone: 'suggest', title: 'Haftada kamida 3–4 kun', text: `Oxirgi 7 kunda ${activeDays} kun mashg‘ulot bo‘ldi. Qisqa bo‘lsa ham, tez-tez takrorlash ko‘nikmani mustahkamlaydi.` });

    for (const kind of ['gym', 'game', 'motor'] as ActivityKind[]) {
      if (!sessions.some(s => s.kind === kind && ago(s.at) <= 14)) {
        const [name, section] = kindNames[kind];
        add(5, { id: `section-${kind}`, tone: 'suggest', title: `${name} bo‘limini qo‘shing`, text: kind === 'motor' ? 'Ikki haftadan beri mayda motorika mashqi bajarilmadi. Barmoq mashqlari qo‘l-ko‘z koordinatsiyasini rivojlantiradi.' : kind === 'game' ? 'Ikki haftadan beri o‘yin bajarilmadi. O‘yinlar yirik motorika va jamoaviy hamkorlikni rivojlantiradi.' : 'Ikki haftadan beri gimnastika bajarilmadi. 30 kunlik dasturni ketma-ket davom ettiring.', action: { label: `${name}ga o‘tish`, section } });
      }
    }

    const lastFive = sessions.slice().sort((a, b) => b.at.localeCompare(a.at)).slice(0, 5);
    const tired = lastFive.filter(s => s.mood === 'tired').length;
    if (tired >= 2) add(8, { id: 'tired', tone: 'care', title: 'Yuklamani yengillashtiring', text: teacher ? `So‘nggi ${lastFive.length} mashg‘ulotdan ${tired} tasidan keyin bola charchaganini bildirdi. Mashg‘ulotni qisqartiring, tanaffuslar qo‘shing va sakrash o‘rniga cho‘zilish mashqlarini tanlang.` : `So‘nggi ${lastFive.length} mashg‘ulotdan ${tired} tasidan keyin bolajon charchadi. Mashg‘ulotni qisqartiring va ko‘proq dam bering.`, action: { label: 'Mayda motorikaga o‘tish', section: 'motor' } });
    else if (lastFive.length >= 3 && lastFive.every(s => s.mood === 'happy')) add(2, { id: 'happy', tone: 'praise', title: 'Mashg‘ulotlar quvonch bilan o‘tyapti', text: 'Bolajon so‘nggi mashg‘ulotlardan xursand. Navbatdagi kunlarda biroz murakkabroq harakatlarni sinab ko‘ring.' });

    const days = completedDays(sessions).length;
    if (days === 30) add(4, { id: 'program-done', tone: 'praise', title: '30 kunlik dastur yakunlandi', text: 'Dastur to‘liq bajarildi. Jismoniy testlarni qayta o‘tkazib, boshlang‘ich natijalar bilan solishtiring.' });
    else if (days === 10 || days === 20) add(4, { id: `stage-${days}`, tone: 'praise', title: `${days / 10}-bosqich yakunlandi`, text: 'Keyingi kunlarda harakatlar kengroq bo‘ladi. Bolajonning qulay sur’atiga e’tibor bering.' });
  }

  const own = assessments.filter(a => a.childId === childId);
  if (!own.length) {
    add(7, { id: 'baseline', tone: 'remind', title: 'Boshlang‘ich o‘lchovni o‘tkazing', text: 'Jismoniy sifatlarni kuzatish uchun testlarni bir marta o‘lchab kiriting. Keyingi o‘lchovlar shu natija bilan solishtiriladi.' });
  } else {
    const latest = own.reduce((a, b) => (a.at > b.at ? a : b));
    if (ago(latest.at) > 30) add(7, { id: 'remeasure', tone: 'remind', title: 'Testlarni qayta o‘lchang', text: 'Oxirgi o‘lchovdan bir oydan ko‘proq vaqt o‘tdi. Dinamikani ko‘rish uchun testlarni takrorlang.' });
    for (const test of physicalTests) {
      const history = testHistory(own, childId, test.id), result = trend(history, test);
      if (result === 'declined' || (result === 'same' && history.length >= 3)) {
        add(6, { id: `test-${test.id}`, tone: 'suggest', title: `${test.quality}: ko‘proq mashq`, text: `“${test.title}” natijasi ${result === 'declined' ? 'oldingisidan pasaydi' : 'o‘zgarmayapti'}. “${test.practice.label}” mashqini tez-tez bajaring va bolani rag‘batlantiring.`, action: { label: test.practice.label, section: test.practice.section, activityId: test.practice.activityId } });
      } else if (result === 'improved') {
        add(2, { id: `test-${test.id}`, tone: 'praise', title: `${test.quality} yaxshilandi`, text: `“${test.title}” natijasi oldingi o‘lchovdan yaxshiroq. Bolajonni maqtang!` });
      }
    }
  }
  return list.sort((a, b) => b.priority - a.priority).slice(0, 5).map(({ priority: _priority, ...r }) => r);
}
