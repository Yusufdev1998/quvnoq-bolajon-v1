import type { BlockId, Exercise, GameDrill, GameElement, Intensity } from './types.ts';

export interface BlockInfo {
  id: BlockId;
  name: string;
  goal: string;
  color: string;
}

export const BLOCKS: BlockInfo[] = [
  { id: 1, name: 'Moslashtiruvchi', goal: 'To‘g‘ri yerga tushish, to‘piq va tizza bo‘g‘imlarini past zarbali sakrashlarga moslashtirish.', color: 'var(--b1)' },
  { id: 2, name: 'Rivojlantiruvchi', goal: 'Sakrovchanlik va tezkorlik-kuchni o‘rta intensivlikdagi sakrashlar bilan rivojlantirish.', color: 'var(--b2)' },
  { id: 3, name: 'Modifikatsiyalovchi', goal: 'Bir oyoqda, yon tomonga va burilib sakrash orqali harakat shakllarini o‘zgartirish.', color: 'var(--b3)' },
  { id: 4, name: 'Takomillashtiruvchi', goal: 'Reaktiv va maksimal sakrashlar bilan o‘yindagi kuch va tezlikni cho‘qqiga chiqarish.', color: 'var(--b4)' },
];

export const INTENSITY_LABEL: Record<Intensity, string> = { past: 'Past', orta: 'O‘rta', yuqori: 'Yuqori' };
export const INTENSITY_ORDER: Record<Intensity, number> = { past: 0, orta: 1, yuqori: 2 };

export const EXERCISES: Exercise[] = [
  // 1-blok — moslashtiruvchi
  {
    id: 'landing', block: 1, name: 'Yerga to‘g‘ri tushish', motion: 'depth', intensity: 'past',
    summary: 'Past tumbadan tushib, yumshoq va barqaror qo‘nishni o‘rganish.',
    steps: ['20–30 sm tumba ustida turing.', 'Bir oyoq bilan oldinga qadam tashlab tushing.', 'Ikki oyoqqa bir vaqtda, tovonni ko‘tarib qo‘ning.', 'Yarim o‘tirgan holatda 2 soniya qotib turing.'],
    cues: ['Tizzalar oyoq uchidan ichkariga tushmasin.', 'Qo‘nish ovozsiz bo‘lsin.'],
    equipment: ['Tumba 20–30 sm'], baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'ankle-hops', block: 1, name: 'To‘piq sakrashlari', motion: 'vertical', intensity: 'past',
    summary: 'Oyoq uchida tez va kichik sakrashlar — to‘piq bo‘g‘imining “prujina”sini uyg‘otadi.',
    steps: ['Oyoqlarni yelka kengligida qo‘ying.', 'Tizzalarni deyarli bukmasdan oyoq uchida sakrang.', 'Yerga tegish vaqtini iloji boricha qisqa qiling.'],
    cues: ['Tovon yerga tegmasin.', 'Gavda tik, qo‘llar ritm beradi.'],
    equipment: [], baseSets: 3, baseReps: 12, restSec: 45, contactsPerRep: 1,
  },
  {
    id: 'jump-rope', block: 1, name: 'Arqon bilan sakrash', motion: 'vertical', intensity: 'past',
    summary: 'Ritm va koordinatsiya uchun klassik isituvchi plyometrika.',
    steps: ['Arqonni bilak bilan aylantiring.', 'Ikki oyoqda past va bir maromda sakrang.', 'Har to‘plamning oxirida tezlikni oshiring.'],
    cues: ['Tirsaklar tanaga yaqin.', 'Sakrash balandligi 3–5 sm dan oshmasin.'],
    equipment: ['Arqon'], baseSets: 3, baseReps: 20, restSec: 45, contactsPerRep: 1,
  },
  {
    id: 'line-hops', block: 1, name: 'Chiziq ustidan yonga sakrash', motion: 'lateral', intensity: 'past',
    summary: 'Maydon chizig‘i ustidan chapga-o‘ngga sakrash: yon tomonga barqarorlik.',
    steps: ['Chiziq yonida ikki oyoqda turing.', 'Chiziq ustidan yon tomonga sakrab o‘ting.', 'Darhol qaytib sakrang — bu bitta takror.'],
    cues: ['Yelkalar to‘g‘ri, faqat oyoqlar ishlaydi.', 'Chiziqqa tegmang.'],
    equipment: [], baseSets: 3, baseReps: 10, restSec: 60, contactsPerRep: 2,
  },
  {
    id: 'squat-jump', block: 1, name: 'Yarim o‘tirib sakrash', motion: 'vertical', intensity: 'past',
    summary: 'Yarim o‘tirgan holatdan tik yuqoriga sakrash — kuchni sakrashga aylantirish.',
    steps: ['Yarim o‘tirgan holatga tushing, qo‘llar orqada.', 'Qo‘llarni siltab tik yuqoriga sakrang.', 'Yumshoq qo‘nib, holatni tiklang va keyingisini bajaring.'],
    cues: ['Har bir sakrash alohida, shoshilmang.', 'Qo‘nishda tizzalar biroz bukilgan.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 1,
  },
  // 2-blok — rivojlantiruvchi
  {
    id: 'tuck-jump', block: 2, name: 'Tizzalarni ko‘krakka tortib sakrash', motion: 'vertical', intensity: 'orta',
    summary: 'Eng yuqori nuqtada tizzalarni ko‘krakka tortish — portlovchi kuch.',
    steps: ['Tik turib, qo‘llarni siltang.', 'Yuqoriga sakrab tizzalarni ko‘krakka torting.', 'Oyoqlarni tushirib yumshoq qo‘ning.'],
    cues: ['Gavda oldinga egilmasin.', 'Tizzalar qo‘llarga tegsin, qo‘llar tizzaga emas.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'box-jump', block: 2, name: 'Tumbaga sakrab chiqish', motion: 'box', intensity: 'orta',
    summary: 'Pastdan yuqoriga sakrash, qo‘nish zarbasi kichik — kuchga e’tibor.',
    steps: ['Tumbadan 30 sm narida turing.', 'Qo‘llarni siltab tumbaga sakrab chiqing.', 'Tumba ustida to‘liq tik turing.', 'Pastga qadam bilan tushing — sakrab emas.'],
    cues: ['Tumba ustiga yarim o‘tirgan holatda qo‘ning.', 'Tumba balandligini profilingizdagidan oshirmang.'],
    equipment: ['Tumba'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'broad-jump', block: 2, name: 'Joyidan uzunlikka sakrash', motion: 'forward', intensity: 'orta',
    summary: 'Gorizontal kuch: yugurib kelish va hujum qadamlarining asosi.',
    steps: ['Oyoqlarni yelka kengligida qo‘ying.', 'Qo‘llarni orqaga siltab, chuqur cho‘king.', 'Oldinga-yuqoriga sakrab, ikki oyoqqa qo‘ning.'],
    cues: ['Qo‘nishda gavda oldinga yiqilmasin.', 'Har sakrashdan keyin qayting.'],
    equipment: [], baseSets: 3, baseReps: 5, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'split-jump', block: 2, name: 'Hamla holatida sakrash', motion: 'vertical', intensity: 'orta',
    summary: 'Hamla holatidan sakrab, havoda oyoqlarni almashtirish.',
    steps: ['Bir oyoq oldinda hamla holatida turing.', 'Yuqoriga sakrang va havoda oyoqlarni almashtiring.', 'Qarama-qarshi hamla holatiga qo‘ning.'],
    cues: ['Orqa tizza yerga urilmasin.', 'Gavda tik.'],
    equipment: [], baseSets: 3, baseReps: 8, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'skater', block: 2, name: 'Konkichi sakrashi', motion: 'lateral', intensity: 'orta',
    summary: 'Bir oyoqdan ikkinchisiga yon tomonga sakrash — himoyada siljish.',
    steps: ['O‘ng oyoqda turing.', 'Chapga keng sakrab chap oyoqqa qo‘ning.', '1 soniya muvozanatni ushlab, qaytib sakrang.'],
    cues: ['Qo‘nayotgan tizza oyoq uchi yo‘nalishida.', 'Qo‘llar muvozanat uchun.'],
    equipment: [], baseSets: 3, baseReps: 8, restSec: 75, contactsPerRep: 1,
  },
  // 3-blok — modifikatsiyalovchi
  {
    id: 'depth-jump-low', block: 3, name: 'Tumbadan tushib sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Tushish energiyasini darhol sakrashga aylantirish (cho‘zilish-qisqarish sikli).',
    steps: ['30 sm tumba ustida turing.', 'Tumbadan pastga qadam tashlang.', 'Yerga tegishingiz bilan darhol yuqoriga sakrang.'],
    cues: ['Yerga tegish — “issiq pech” kabi qisqa.', 'Faqat to‘g‘ri qo‘nishni o‘zlashtirganlar uchun.'],
    equipment: ['Tumba 30 sm'], baseSets: 3, baseReps: 5, restSec: 90, contactsPerRep: 2,
  },
  {
    id: 'single-hop', block: 3, name: 'Bir oyoqda sakrash', motion: 'single', intensity: 'orta', perLeg: true,
    summary: 'Bir oyoqda ketma-ket sakrash — hujumdagi depsinish oyog‘ini kuchaytiradi.',
    steps: ['Bir oyoqda turing.', 'Oldinga ketma-ket 3 marta sakrang.', 'Oxirgi sakrashda 2 soniya qotib turing, so‘ng oyoqni almashtiring.'],
    cues: ['Tizza ichkariga qiyshaymasin.', 'Har ikki oyoq uchun teng takror.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 2,
  },
  {
    id: 'lateral-box', block: 3, name: 'Tumbaga yondan sakrash', motion: 'box', intensity: 'orta',
    summary: 'Tumbaga yon tomondan sakrash — blokdagi yon siljish kuchi.',
    steps: ['Tumba yonida turing.', 'Yon tomonga sakrab tumbaga chiqing.', 'Qadam bilan tushib, ikkinchi tomondan takrorlang.'],
    cues: ['Ikki oyoq bir vaqtda qo‘nadi.', 'Yelkalar to‘rga qaragandek to‘g‘ri.'],
    equipment: ['Past tumba'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'rotation-jump', block: 3, name: '180° burilib sakrash', motion: 'rotate', intensity: 'orta',
    summary: 'Havoda yarim burilish — fazoda mo‘ljal olish va qo‘nishni boshqarish.',
    steps: ['Yarim o‘tiring, qo‘llar orqada.', 'Sakrab havoda 180° buriling.', 'Teskari tomonga qarab yumshoq qo‘ning.'],
    cues: ['Burilish yelkadan boshlanadi.', 'Har safar yo‘nalishni almashtiring.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'medball-jump', block: 3, name: 'To‘ldirma to‘p bilan sakrab otish', motion: 'throw', intensity: 'orta',
    summary: 'Sakrash va otishni birlashtirish — butun tana bo‘ylab kuch uzatish.',
    steps: ['1–2 kg to‘pni ko‘krak oldida ushlang.', 'Cho‘kib, sakrash bilan birga to‘pni yuqoriga oting.', 'To‘pni ilib oling yoki yerga tushishini kuting.'],
    cues: ['Oyoqlar boshlaydi, qo‘llar tugatadi.', 'To‘p og‘ir bo‘lmasin.'],
    equipment: ['To‘ldirma to‘p 1–2 kg'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  // 4-blok — takomillashtiruvchi
  {
    id: 'depth-vertical', block: 4, name: 'Chuqurlikdan maksimal sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Tumbadan tushib, eng yuqori nuqtaga sakrash — reaktiv kuch cho‘qqisi.',
    steps: ['Profilingizdagi balandlikdagi tumbada turing.', 'Pastga qadam tashlang.', 'Yerga tekkan zahoti qo‘llarni siltab maksimal yuqoriga sakrang.'],
    cues: ['Sifat miqdordan muhim: har biri maksimal.', 'Texnika buzilsa — to‘plamni to‘xtating.'],
    equipment: ['Tumba'], baseSets: 4, baseReps: 5, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'hurdle-hops', block: 4, name: 'To‘siqlar ustidan sakrash', motion: 'forward', intensity: 'yuqori',
    summary: '5 ta past to‘siq ustidan uzluksiz sakrash — tezkor depsinish.',
    steps: ['5 ta to‘siqni 1 m oraliqda qo‘ying.', 'Ikki oyoqda to‘siqlar ustidan uzluksiz sakrang.', 'Bir qatorni o‘tish — bitta takror.'],
    cues: ['To‘siqlar orasida to‘xtamang.', 'Tizzalarni yuqori ko‘taring.'],
    equipment: ['5 ta to‘siq 30–40 sm'], baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 5,
  },
  {
    id: 'approach-jump', block: 4, name: 'Uch qadamli hujum sakrashi', motion: 'approach', intensity: 'yuqori',
    summary: 'Hujum zarbasining yugurib kelishi: chap–o‘ng–chap va kuchli depsinish.',
    steps: ['To‘rdan 3–4 m narida turing.', 'Uch qadam bilan tezlashib yugurib keling.', 'Ikki oyoqda tormozlab, qo‘llarni siltab yuqoriga sakrang.', 'Zarba beruvchi qo‘lni yuqoriga cho‘zing.'],
    cues: ['Oxirgi qadam eng uzun va tez.', 'To‘rga tegmasdan, joyga qo‘ning.'],
    equipment: ['Voleybol to‘ri'], baseSets: 4, baseReps: 5, restSec: 90, contactsPerRep: 1,
  },
  {
    id: 'reactive-drop', block: 4, name: 'Reaktiv ikki karra sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Tumbadan tushib, ketma-ket ikki marta sakrash — blok va qayta hujum ritmi.',
    steps: ['Tumbadan pastga qadam tashlang.', 'Yerga tegishi bilan sakrang.', 'Qo‘nib, darhol yana bir marta sakrang.'],
    cues: ['Ikkinchi sakrash birinchisidan past bo‘lmasin.', 'Qo‘llar har safar faol.'],
    equipment: ['Tumba'], baseSets: 3, baseReps: 5, restSec: 120, contactsPerRep: 3,
  },
  {
    id: 'bounds', block: 4, name: 'Sakrab yugurish', motion: 'forward', intensity: 'yuqori',
    summary: 'Bir oyoqdan ikkinchisiga uzun sakrashlar — depsinish quvvati.',
    steps: ['Yengil yugurib boshlang.', 'Har qadamni uzun va baland sakrashga aylantiring.', '8 ta sakrash — bitta takror.'],
    cues: ['Depsinish oyog‘i to‘liq to‘g‘rilanadi.', 'Qarama-qarshi qo‘l oldinga.'],
    equipment: [], baseSets: 3, baseReps: 3, restSec: 120, contactsPerRep: 8,
  },
];

export const GAME_ELEMENTS: { id: GameElement; name: string; description: string }[] = [
  { id: 'sakrash', name: 'Sakrash', description: 'Uzatish, pas va himoyadagi sakrashlar plyometrika bilan.' },
  { id: 'hujum', name: 'Hujum zarbasi', description: 'Yugurib kelish, depsinish va zarba bitta harakat zanjirida.' },
  { id: 'blok', name: 'Blok qo‘yish', description: 'To‘r oldida tez siljish va ketma-ket blok sakrashlari.' },
];

export const GAME_DRILLS: GameDrill[] = [
  {
    id: 'set-jump', element: 'sakrash', name: 'Sakrab pas berish', motion: 'throw', intensity: 'past', minBlock: 1,
    summary: 'Yarim o‘tirib sakrash va to‘pni eng yuqori nuqtada uzatish.',
    plyo: 'Yarim o‘tirib sakrash', volleyball: 'Sakrab yuqoridan pas',
    steps: ['Sherik to‘pni boshingiz ustiga tashlaydi.', 'Yarim o‘tirib, to‘pga qarshi sakrang.', 'Eng yuqori nuqtada ikki qo‘l bilan pas bering.'],
    cues: ['To‘pga sakrash vaqtini moslang.', 'Qo‘nish yumshoq.'],
    baseSets: 3, baseReps: 8, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'dig-hops', element: 'sakrash', name: 'Yon sakrash va to‘pni ko‘tarish', motion: 'lateral', intensity: 'past', minBlock: 1,
    summary: 'Chiziq ustidan yonga sakrashdan keyin pastdan qabul.',
    plyo: 'Chiziq ustidan yonga sakrash ×4', volleyball: 'Pastdan qabul (himoya)',
    steps: ['Chiziq ustidan 4 marta yonga sakrang.', 'Murabbiy to‘pni yon tomonga tashlaydi.', 'Tez siljib, to‘pni pastdan qabul qiling.'],
    cues: ['Sakrashdan keyin past holatda qoling.', 'Platforma to‘pga qarab.'],
    baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 4,
  },
  {
    id: 'tuck-serve', element: 'sakrash', name: 'Sakrab uzatishga tayyorgarlik', motion: 'approach', intensity: 'orta', minBlock: 2,
    summary: 'Tizzalarni tortib sakrashlar, so‘ng sakrab uzatish.',
    plyo: 'Tizzalarni ko‘krakka tortib sakrash ×3', volleyball: 'Sakrab uzatish',
    steps: ['Uzatish chizig‘ida 3 ta tuck-sakrash bajaring.', '10 soniya nafasni rostlang.', 'To‘pni tashlab, yugurib kelib sakrab uzating.'],
    cues: ['Uzatishda depsinish chiziqdan oldin.', 'Charchoqda texnikani saqlang.'],
    baseSets: 3, baseReps: 5, restSec: 90, contactsPerRep: 4,
  },
  {
    id: 'approach-attack', element: 'hujum', name: 'Yugurib kelib hujum zarbasi', motion: 'approach', intensity: 'orta', minBlock: 1,
    summary: 'Uch qadamli yugurib kelish va to‘rdan oshirib zarba.',
    plyo: 'Uch qadamli hujum sakrashi', volleyball: 'Hujum zarbasi (4-raqamdan)',
    steps: ['Bog‘lovchi to‘pni 4-raqamga uzatadi.', 'Chap–o‘ng–chap yugurib keling.', 'Ikki oyoqda depsinib, to‘pni yuqori nuqtada uring.'],
    cues: ['Qo‘l siltash depsinish bilan bir vaqtda.', 'Zarbadan keyin ikki oyoqqa qo‘ning.'],
    baseSets: 3, baseReps: 6, restSec: 90, contactsPerRep: 1,
  },
  {
    id: 'depth-attack', element: 'hujum', name: 'Tumbadan tushib hujum', motion: 'depth', intensity: 'yuqori', minBlock: 3,
    summary: 'Chuqurlikdan sakrashni hujum zarbasiga aylantirish.',
    plyo: 'Tumbadan tushib sakrash', volleyball: 'Hujum zarbasi',
    steps: ['Tumbani to‘rdan 2 m narida qo‘ying.', 'Tumbadan tushib, ikki qadam yugurib keling.', 'Darhol sakrab, uzatilgan to‘pni uring.'],
    cues: ['Yerga tegish qisqa — tormozlamang.', 'Har zarba maksimal sakrash bilan.'],
    baseSets: 3, baseReps: 5, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'double-attack', element: 'hujum', name: 'Ketma-ket ikki hujum', motion: 'approach', intensity: 'yuqori', minBlock: 4,
    summary: 'Zarba — chiziqqa qaytish — yana zarba: o‘yindagi takroriy hujum.',
    plyo: 'Reaktiv ikki karra sakrash', volleyball: 'Ikki hujum zarbasi ketma-ket',
    steps: ['Birinchi to‘pni uring.', 'Hujum chizig‘iga tez qayting.', 'Ikkinchi uzatilgan to‘pga yugurib kelib uring.'],
    cues: ['Qaytish yuzingiz to‘rga qaragan holda.', 'Ikkinchi sakrash ham to‘liq kuch bilan.'],
    baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'static-block', element: 'blok', name: 'Joyidan blok sakrashi', motion: 'block', intensity: 'past', minBlock: 1,
    summary: 'To‘r oldida qo‘llarni to‘rdan oshirib blok qo‘yish.',
    plyo: 'Joyidan tik sakrash', volleyball: 'Yakka blok',
    steps: ['To‘rdan bir qarich narida turing.', 'Qo‘llar yelka balandligida.', 'Sakrab qo‘llarni to‘r ustidan raqib tomoniga o‘tkazing.'],
    cues: ['Barmoqlar keng ochiq.', 'To‘rga tegmang.'],
    baseSets: 3, baseReps: 8, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'shuffle-block', element: 'blok', name: 'Yon qadam va blok', motion: 'block', intensity: 'orta', minBlock: 2,
    summary: 'Yon qadam bilan siljib, keyin blok sakrashi.',
    plyo: 'Konkichi sakrashi', volleyball: 'Siljib blok qo‘yish',
    steps: ['Markazda turing.', 'Murabbiy ishorasi bilan 2 yon qadam tashlang.', 'Tormozlab, darhol blokka sakrang.'],
    cues: ['Oyoqlar chalkashmasin.', 'Sakrashdan oldin to‘xtash qisqa.'],
    baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'triple-block', element: 'blok', name: 'Chap — markaz — o‘ng bloklar', motion: 'block', intensity: 'yuqori', minBlock: 3,
    summary: 'To‘r bo‘ylab uch nuqtada ketma-ket blok sakrashlari.',
    plyo: 'Reaktiv sakrashlar seriyasi', volleyball: 'Uch zonada blok',
    steps: ['Chap zonada blokka sakrang.', 'Qo‘nib, markazga siljing va sakrang.', 'O‘ng zonada uchinchi blokni qo‘ying.'],
    cues: ['Har blokda qo‘llar to‘rdan oshsin.', 'Qo‘nishdan keyin pauza yo‘q.'],
    baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 3,
  },
];

export const exerciseById = (id: string) => EXERCISES.find((e) => e.id === id);
export const drillById = (id: string) => GAME_DRILLS.find((d) => d.id === id);
export const blockInfo = (id: BlockId) => BLOCKS[id - 1];
export const exercisesOfBlock = (id: BlockId) => EXERCISES.filter((e) => e.block === id);
