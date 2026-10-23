import type { Section } from './data';

export type TestId = 'longJump' | 'balance' | 'run10' | 'flexibility' | 'throw' | 'fineMotor';
export type Assessment = { id: string; childId: string; testId: TestId; value: number; at: string };
export type PhysicalTest = {
  id: TestId; quality: string; title: string; unit: string; better: 'higher' | 'lower';
  min: number; max: number; step: number; how: string; practice: { label: string; section: Section; activityId?: string };
};

// Simple field tests an adult measures and enters. The app tracks each child's own change
// over time; it does not compare children or apply age norms, which a specialist must set.
export const physicalTests: PhysicalTest[] = [
  { id: 'longJump', quality: 'Kuch va sakrash', title: 'Joyidan uzunlikka sakrash', unit: 'sm', better: 'higher', min: 0, max: 250, step: 1,
    how: 'Bola chiziq oldida ikki oyoqda turadi va oldinga sakraydi. Chiziqdan orqadagi tovongacha masofa o‘lchanadi. Ikki urinishdan eng yaxshisi yoziladi.',
    practice: { label: 'Quyoncha sakraydi', section: 'games', activityId: 'rabbit' } },
  { id: 'balance', quality: 'Muvozanat', title: 'Bir oyoqda turish', unit: 'soniya', better: 'higher', min: 0, max: 120, step: 1,
    how: 'Qo‘llar belda, bola bir oyoqda turadi. Ikkinchi oyoq yerga tekkuncha vaqt o‘lchanadi. Katta kishi yonida turadi.',
    practice: { label: 'Aylanma mashq', section: 'games', activityId: 'circle' } },
  { id: 'run10', quality: 'Tezkorlik', title: '10 metrga yugurish', unit: 'soniya', better: 'lower', min: 1, max: 30, step: .1,
    how: 'Tekis va xavfsiz yo‘lakda start chizig‘idan 10 metrgacha yuguradi. Kartochka ko‘tarilgandan marragacha vaqt o‘lchanadi.',
    practice: { label: 'Tez va epchil', section: 'games', activityId: 'relay' } },
  { id: 'flexibility', quality: 'Egiluvchanlik', title: 'O‘tirib oldinga egilish', unit: 'sm', better: 'higher', min: -30, max: 30, step: 1,
    how: 'Oyoqlar to‘g‘ri, tovonlar chiziqda. Bola sekin oldinga egiladi. Barmoq uchlari chiziqdan o‘tsa (+), yetmasa (−) sm yoziladi. Majburlab egmang.',
    practice: { label: 'Gimnastikadagi cho‘zilish', section: 'gym' } },
  { id: 'throw', quality: 'Koordinatsiya', title: 'Qopchani uzoqqa uloqtirish', unit: 'm', better: 'higher', min: 0, max: 20, step: .1,
    how: 'Bola 150–200 g li yumshoq qopchani bir qo‘l bilan oldinga uloqtiradi. Chiziqdan qopcha tushgan joygacha masofa yoziladi.',
    practice: { label: 'To‘pni uzat', section: 'games', activityId: 'pass' } },
  { id: 'fineMotor', quality: 'Mayda motorika', title: 'Donachalarni ko‘chirish', unit: 'dona / 30 s', better: 'higher', min: 0, max: 80, step: 1,
    how: '30 soniya ichida yirik donachalarni bir idishdan ikkinchisiga birma-bir ko‘chiradi. Ko‘chirilganlar soni yoziladi.',
    practice: { label: 'Donachalarni ko‘chirish', section: 'motor', activityId: 'seeds' } },
];
export const testById = (id: TestId) => physicalTests.find(t => t.id === id)!;

export function isValidAssessment(a: unknown): a is Assessment {
  if (!a || typeof a !== 'object') return false;
  const v = a as Assessment, test = physicalTests.find(t => t.id === v.testId);
  return !!test && typeof v.id === 'string' && typeof v.childId === 'string' && Number.isFinite(v.value)
    && v.value >= test.min && v.value <= test.max && !Number.isNaN(Date.parse(v.at));
}

export function testHistory(assessments: Assessment[], childId: string, testId: TestId): Assessment[] {
  return assessments.filter(a => a.childId === childId && a.testId === testId).sort((a, b) => a.at.localeCompare(b.at));
}

export type Trend = 'first' | 'improved' | 'same' | 'declined';
// Compares the latest result with the previous one; changes within one measuring step count as "same".
export function trend(history: Assessment[], test: PhysicalTest): Trend {
  if (history.length < 2) return 'first';
  const change = history[history.length - 1].value - history[history.length - 2].value;
  if (Math.abs(change) < test.step * 1.5) return 'same';
  return (change > 0) === (test.better === 'higher') ? 'improved' : 'declined';
}
