import type { BlockId, Exercise, GameDrill, GameElement, Intensity } from './types.ts';

export interface BlockInfo {
  id: BlockId;
  name: string;
  goal: string;
  color: string;
}

export const BLOCKS: BlockInfo[] = [
  { id: 1, name: 'Moslashtiruvchi', goal: 'Yerga to‘g‘ri qo‘nishni o‘rganish, to‘piq va tizza bo‘g‘imlarini yengil sakrashlarga moslashtirish.', color: 'var(--b1)' },
  { id: 2, name: 'Rivojlantiruvchi', goal: 'O‘rtacha jadallikdagi sakrashlar orqali sakrash balandligi, tezkorlik va kuchni rivojlantirish.', color: 'var(--b2)' },
  { id: 3, name: 'Harakatlarni murakkablashtiruvchi', goal: 'Bir oyoqda, yon tomonga va burilib sakrash orqali harakatlarni murakkablashtirish.', color: 'var(--b3)' },
  { id: 4, name: 'Takomillashtiruvchi', goal: 'Tezkor va maksimal sakrashlar orqali o‘yindagi kuch va tezlikni yanada oshirish.', color: 'var(--b4)' },
];

export const INTENSITY_LABEL: Record<Intensity, string> = { past: 'Past', orta: 'O‘rta', yuqori: 'Yuqori' };
export const INTENSITY_ORDER: Record<Intensity, number> = { past: 0, orta: 1, yuqori: 2 };

export const EXERCISES: Exercise[] = [
  // 1-blok — moslashtiruvchi
  {
    id: 'landing', block: 1, name: 'Yerga to‘g‘ri tushish', motion: 'depth', intensity: 'past',
    summary: 'Past platformadan tushib, yerga yumshoq va muvozanatni saqlagan holda qo‘nishni o‘rganish.',
    steps: ['20–30 sm balandlikdagi platforma ustida turing.', 'Bir oyoqni oldinga uzatib, platformadan qadam tashlab tushing.', 'Ikki oyoqqa bir vaqtda, tovonni ko‘targan holda qo‘ning.', 'Yarim o‘tirgan holatda 2 soniya muvozanatni saqlang.'],
    cues: ['Qo‘nishda tizzalar ichkariga bukilib ketmasin.', 'Iloji boricha ovozsiz va yumshoq qo‘ning.'],
    equipment: ['Platforma: 20–30 sm'], baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'ankle-hops', block: 1, name: 'To‘piq sakrashlari', motion: 'vertical', intensity: 'past',
    summary: 'Oyoq uchida kichik va tez sakrashlar to‘piqning qayishqoqligini rivojlantiradi.',
    steps: ['Oyoqlarni yelka kengligida qo‘ying.', 'Tizzalarni deyarli bukmasdan oyoq uchida sakrang.', 'Oyoqning yerga tegib turish vaqtini imkon qadar qisqartiring.'],
    cues: ['Tovonlarni yerga tekkizmang.', 'Gavdani tik tuting, qo‘llar bilan ritmni saqlang.'],
    equipment: [], baseSets: 3, baseReps: 12, restSec: 45, contactsPerRep: 1,
  },
  {
    id: 'jump-rope', block: 1, name: 'Arqon bilan sakrash', motion: 'vertical', intensity: 'past',
    summary: 'Ritm va harakatlar muvofiqligini yaxshilaydigan badan qizdirish mashqi.',
    steps: ['Arqonni bilaklar yordamida aylantiring.', 'Ikki oyoqda past va bir maromda sakrang.', 'Har bir to‘plam oxirida sakrash tezligini oshiring.'],
    cues: ['Tirsaklarni gavdaga yaqin tuting.', '3–5 sm dan baland sakramang.'],
    equipment: ['Arqon'], baseSets: 3, baseReps: 20, restSec: 45, contactsPerRep: 1,
  },
  {
    id: 'line-hops', block: 1, name: 'Chiziqdan yon tomonga sakrash', motion: 'lateral', intensity: 'past',
    summary: 'Maydondagi chiziqdan chapga va o‘ngga sakrash orqali yonlama harakatlarda muvozanatni rivojlantirish.',
    steps: ['Chiziq yonida ikki oyoqda turing.', 'Chiziqdan yon tomonga sakrab o‘ting.', 'Darhol ortga sakrang. Borib-qaytish bir takror hisoblanadi.'],
    cues: ['Yelkalarni bir tekis tuting, harakatni asosan oyoqlar bilan bajaring.', 'Chiziqqa tegmang.'],
    equipment: [], baseSets: 3, baseReps: 10, restSec: 60, contactsPerRep: 2,
  },
  {
    id: 'squat-jump', block: 1, name: 'Yarim o‘tirib sakrash', motion: 'vertical', intensity: 'past',
    summary: 'Yarim o‘tirgan holatdan yuqoriga sakrab, oyoqlarning kuchini rivojlantirish.',
    steps: ['Yarim o‘tiring va qo‘llarni orqaga uzating.', 'Qo‘llarni oldinga-yuqoriga siltab, tik sakrang.', 'Yumshoq qo‘ning, boshlang‘ich holatga qayting va mashqni takrorlang.'],
    cues: ['Har bir sakrashni alohida bajaring, shoshilmang.', 'Yerga qo‘nganda tizzalarni biroz buking.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 1,
  },
  // 2-blok — rivojlantiruvchi
  {
    id: 'tuck-jump', block: 2, name: 'Tizzalarni ko‘krakka tortib sakrash', motion: 'vertical', intensity: 'orta',
    summary: 'Sakrashning eng yuqori nuqtasida tizzalarni ko‘krakka tortish orqali tezkor kuchni rivojlantirish.',
    steps: ['Tik turib, qo‘llarni siltang.', 'Yuqoriga sakrab tizzalarni ko‘krakka torting.', 'Oyoqlarni pastga tushirib, yumshoq qo‘ning.'],
    cues: ['Gavda oldinga egilmasin.', 'Tizzalarni ko‘tarishga e’tibor bering; qo‘llarni tizzalarga tomon tushirmang.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'box-jump', block: 2, name: 'Platformaga sakrab chiqish', motion: 'box', intensity: 'orta',
    summary: 'Platformaga yuqoriga sakrash orqali kuchni rivojlantirish va qo‘nishdagi zarbani kamaytirish.',
    steps: ['Platformadan 30 sm masofada turing.', 'Qo‘llarni siltab platforma ustiga sakrab chiqing.', 'Platforma ustida gavdani to‘liq rostlang.', 'Pastga sakramasdan, qadam tashlab tushing.'],
    cues: ['Platformaga tizzalarni bukib, yarim o‘tirgan holda qo‘ning.', 'Platforma balandligi profilingizda belgilangan chegaradan oshmasin.'],
    equipment: ['Platforma'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'broad-jump', block: 2, name: 'Joyidan uzunlikka sakrash', motion: 'forward', intensity: 'orta',
    summary: 'Oldinga sakrash kuchi hujumga yugurib kelish va qadam tashlash uchun muhim.',
    steps: ['Oyoqlarni yelka kengligida qo‘ying.', 'Qo‘llarni orqaga siltab, tizzalarni buking.', 'Oldinga va yuqoriga sakrab, ikkala oyoqqa qo‘ning.'],
    cues: ['Qo‘nganda muvozanatni saqlang, gavda oldinga yiqilib ketmasin.', 'Har bir sakrashdan so‘ng boshlang‘ich joyga qayting.'],
    equipment: [], baseSets: 3, baseReps: 5, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'split-jump', block: 2, name: 'Oldinga tashlangan qadam holatida sakrash', motion: 'vertical', intensity: 'orta',
    summary: 'Bir oyoq oldinda turgan holatdan sakrab, havoda oyoqlarning o‘rnini almashtirish.',
    steps: ['Bir oyoqni oldinga tashlab, tizzalarni bukib turing.', 'Yuqoriga sakrang va havoda oyoqlarni almashtiring.', 'Oyoqlar o‘rnini almashtirgan holda qo‘ning.'],
    cues: ['Orqadagi tizza yerga qattiq tegmasin.', 'Gavdani tik tuting.'],
    equipment: [], baseSets: 3, baseReps: 8, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'skater', block: 2, name: 'Konkichi usulida sakrash', motion: 'lateral', intensity: 'orta',
    summary: 'Yon tomonga bir oyoqdan ikkinchisiga sakrash orqali himoyadagi tezkor harakatni rivojlantirish.',
    steps: ['O‘ng oyoqda turing.', 'Chap tomonga keng sakrab, chap oyoqqa qo‘ning.', '1 soniya muvozanatni saqlang, so‘ng qarama-qarshi tomonga sakrang.'],
    cues: ['Qo‘nayotgan oyoq tizzasi oyoq uchi bilan bir yo‘nalishda bo‘lsin.', 'Muvozanatni saqlash uchun qo‘llardan foydalaning.'],
    equipment: [], baseSets: 3, baseReps: 8, restSec: 75, contactsPerRep: 1,
  },
  // 3-blok — modifikatsiyalovchi
  {
    id: 'depth-jump-low', block: 3, name: 'Platformadan tushib sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Platformadan tushgach, darhol sakrab, mushaklarning cho‘zilish va qisqarish kuchidan foydalanish.',
    steps: ['30 sm balandlikdagi platforma ustida turing.', 'Platformadan pastga qadam tashlang.', 'Oyoqlar yerga tegishi bilan darhol yuqoriga sakrang.'],
    cues: ['Yer bilan kontakt vaqtini imkon qadar qisqa saqlang.', 'Bu mashq faqat yerga to‘g‘ri qo‘nishni o‘zlashtirgan sportchilar uchun.'],
    equipment: ['Platforma: 30 sm'], baseSets: 3, baseReps: 5, restSec: 90, contactsPerRep: 2,
  },
  {
    id: 'single-hop', block: 3, name: 'Bir oyoqda sakrash', motion: 'single', intensity: 'orta', perLeg: true,
    summary: 'Bir oyoqda ketma-ket sakrash hujum uchun depsinish kuchini oshiradi.',
    steps: ['Bir oyoqda turing.', 'Oldinga ketma-ket 3 marta sakrang.', 'Oxirgi sakrashdan so‘ng 2 soniya muvozanatni saqlang, keyin oyoqni almashtiring.'],
    cues: ['Tizza ichkariga bukilib ketmasin.', 'Mashqni har ikkala oyoqda teng marta bajaring.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 2,
  },
  {
    id: 'lateral-box', block: 3, name: 'Platformaga yon tomondan sakrash', motion: 'box', intensity: 'orta',
    summary: 'Platformaga yon tomondan sakrash to‘siq qo‘yishda yonlama harakat kuchini rivojlantiradi.',
    steps: ['Platformaning yon tomonida turing.', 'Yon tomonga sakrab platforma ustiga chiqing.', 'Pastga qadam tashlab tushing va mashqni boshqa tomondan takrorlang.'],
    cues: ['Ikkala oyoq bilan bir vaqtda qo‘ning.', 'Yelkalarni to‘rga parallel tuting.'],
    equipment: ['Past platforma'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'rotation-jump', block: 3, name: '180° burilib sakrash', motion: 'rotate', intensity: 'orta',
    summary: 'Havoda yarim aylanish orqali muvozanat va qo‘nishni nazorat qilishni rivojlantirish.',
    steps: ['Yarim o‘tiring, qo‘llarni orqaga uzating.', 'Sakrab havoda 180° buriling.', 'Qarama-qarshi tomonga yuzlangan holda yumshoq qo‘ning.'],
    cues: ['Burilishni yelkalar harakati bilan boshlang.', 'Har safar yo‘nalishni almashtiring.'],
    equipment: [], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'medball-jump', block: 3, name: 'To‘ldirma to‘p bilan sakrab otish', motion: 'throw', intensity: 'orta',
    summary: 'Sakrash va to‘pni otishni birlashtirib, oyoqdan qo‘lgacha kuch uzatishni mashq qilish.',
    steps: ['1–2 kg li to‘ldirma to‘pni ko‘krak oldida ushlang.', 'Tizzalarni buking va sakrash bilan bir vaqtda to‘pni yuqoriga oting.', 'To‘pni ilib oling yoki yerga tushishini kuting.'],
    cues: ['Harakatni oyoqlar bilan boshlang, to‘pni qo‘llar bilan oting.', 'To‘p siz uchun haddan tashqari og‘ir bo‘lmasin.'],
    equipment: ['To‘ldirma to‘p: 1–2 kg'], baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  // 4-blok — takomillashtiruvchi
  {
    id: 'depth-vertical', block: 4, name: 'Platformadan tushib, maksimal sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Platformadan tushgach, bor kuch bilan yuqoriga sakrab, tezkor kuchni rivojlantirish.',
    steps: ['Profilingizda belgilangan balandlikdagi platforma ustida turing.', 'Pastga qadam tashlang.', 'Oyoqlar yerga tegishi bilanoq qo‘llarni siltab, imkon qadar baland sakrang.'],
    cues: ['Takrorlash sonidan ko‘ra harakat sifati muhim. Har bir sakrashni to‘g‘ri bajaring.', 'Harakat texnikasi buzilsa, to‘plamni to‘xtating.'],
    equipment: ['Platforma'], baseSets: 4, baseReps: 5, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'hurdle-hops', block: 4, name: 'To‘siqlar ustidan sakrash', motion: 'forward', intensity: 'yuqori',
    summary: 'Beshta past to‘siqdan uzluksiz sakrab o‘tish orqali tezkor depsinishni rivojlantirish.',
    steps: ['5 ta to‘siqni bir-biridan 1 m masofada joylashtiring.', 'Ikki oyoqda to‘siqlar ustidan uzluksiz sakrang.', 'Barcha 5 ta to‘siqdan o‘tish bir takror hisoblanadi.'],
    cues: ['To‘siqlar orasida to‘xtamang.', 'Tizzalarni yetarlicha baland ko‘taring.'],
    equipment: ['5 ta to‘siq, balandligi 30–40 sm'], baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 5,
  },
  {
    id: 'approach-jump', block: 4, name: 'Uch qadamli hujum sakrashi', motion: 'approach', intensity: 'yuqori',
    summary: 'Hujum zarbasiga tayyorgarlik: chap–o‘ng–chap qadamlaridan so‘ng kuchli depsinish.',
    steps: ['To‘rdan 3–4 m uzoqlikda turing.', 'Tezlikni oshirib, uch qadamda to‘r tomon harakatlaning.', 'Oxirgi qadamda ikki oyoqqa tayanib, qo‘llarni siltagan holda yuqoriga sakrang.', 'Zarba beruvchi qo‘lni yuqoriga cho‘zing.'],
    cues: ['Oxirgi qadamni uzun va tez bajaring.', 'To‘rga tegmasdan, muvozanatni saqlab qo‘ning.'],
    equipment: ['Voleybol to‘ri'], baseSets: 4, baseReps: 5, restSec: 90, contactsPerRep: 1,
  },
  {
    id: 'reactive-drop', block: 4, name: 'Ketma-ket ikki reaktiv sakrash', motion: 'depth', intensity: 'yuqori',
    summary: 'Platformadan tushib, ketma-ket ikki marta sakrash orqali to‘siq qo‘yish va qayta hujum ritmini mashq qilish.',
    steps: ['Platformadan pastga qadam tashlang.', 'Oyoqlar yerga tegishi bilan sakrang.', 'Qo‘ngandan so‘ng darhol yana bir marta sakrang.'],
    cues: ['Ikkinchi sakrashda ham balandlikni saqlashga harakat qiling.', 'Har bir sakrashda qo‘llarni faol ishlating.'],
    equipment: ['Platforma'], baseSets: 3, baseReps: 5, restSec: 120, contactsPerRep: 3,
  },
  {
    id: 'bounds', block: 4, name: 'Katta qadamlar bilan sakrab yugurish', motion: 'forward', intensity: 'yuqori',
    summary: 'Bir oyoqdan ikkinchisiga uzun sakrashlar orqali depsinish kuchini rivojlantirish.',
    steps: ['Yengil yugurib boshlang.', 'Har bir qadamda uzoqroqqa va balandroqqa sakrashga harakat qiling.', 'Ketma-ket 8 ta sakrash bir takror hisoblanadi.'],
    cues: ['Depsinish vaqtida tayanch oyoqni to‘liq rostlang.', 'Tayanch oyoqqa qarama-qarshi qo‘lni oldinga uzating.'],
    equipment: [], baseSets: 3, baseReps: 3, restSec: 120, contactsPerRep: 8,
  },
];

export const GAME_ELEMENTS: { id: GameElement; name: string; description: string }[] = [
  { id: 'sakrash', name: 'Sakrash', description: 'To‘pni o‘yinga kiritish, pas berish va himoyadagi sakrashlarni plyometrik mashqlar bilan uyg‘unlashtirish.' },
  { id: 'hujum', name: 'Hujum zarbasi', description: 'Yugurib kelish, depsinish va hujum zarbasini bir harakat sifatida bajarish.' },
  { id: 'blok', name: 'Blok qo‘yish', description: 'To‘r oldida tez siljish va ketma-ket to‘siq qo‘yish uchun sakrashlar.' },
];

export const GAME_DRILLS: GameDrill[] = [
  {
    id: 'set-jump', element: 'sakrash', name: 'Sakrab pas berish', motion: 'throw', intensity: 'past', minBlock: 1,
    summary: 'Yarim o‘tirgan holatdan sakrab, eng yuqori nuqtada ikki qo‘l bilan pas berish.',
    plyo: 'Yarim o‘tirib sakrash', volleyball: 'Sakrab yuqoridan pas berish',
    steps: ['Sherigingiz to‘pni boshingiz ustiga tashlaydi.', 'Yarim o‘tirgan holatdan to‘p tomon sakrang.', 'Eng yuqori nuqtada ikki qo‘l bilan pas bering.'],
    cues: ['Sakrash vaqtini to‘pning harakatiga moslang.', 'Yerga yumshoq qo‘ning.'],
    baseSets: 3, baseReps: 8, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'dig-hops', element: 'sakrash', name: 'Yon tomonga sakrab, to‘pni qabul qilish', motion: 'lateral', intensity: 'past', minBlock: 1,
    summary: 'Chiziqdan yon tomonga sakrab, so‘ng to‘pni pastdan qabul qilish.',
    plyo: 'Chiziqdan yon tomonga sakrash ×4', volleyball: 'To‘pni pastdan qabul qilish (himoya)',
    steps: ['Chiziqdan yon tomonga 4 marta sakrang.', 'Murabbiy to‘pni yon tomonga tashlaydi.', 'Tez siljib, to‘pni pastdan qabul qiling.'],
    cues: ['Sakrashdan so‘ng tizzalarni bukib, past holatda qoling.', 'Bilaklarni birlashtirib, to‘pni qabul qilish yuzasini to‘pga qarating.'],
    baseSets: 3, baseReps: 6, restSec: 60, contactsPerRep: 4,
  },
  {
    id: 'tuck-serve', element: 'sakrash', name: 'Sakrab to‘pni o‘yinga kiritishga tayyorgarlik', motion: 'approach', intensity: 'orta', minBlock: 2,
    summary: 'Tizzalarni ko‘krakka tortib sakrash, so‘ng sakrab to‘pni o‘yinga kiritish.',
    plyo: 'Tizzalarni ko‘krakka tortib sakrash ×3', volleyball: 'Sakrab to‘pni o‘yinga kiritish',
    steps: ['To‘pni o‘yinga kiritish chizig‘i ortida tizzalarni ko‘krakka tortib 3 marta sakrang.', '10 soniya davomida nafasni rostlang.', 'To‘pni yuqoriga tashlang, yugurib kelib sakrang va to‘pni o‘yinga kiriting.'],
    cues: ['Sakrash uchun depsinish chiziqni bosmasdan bajarilsin.', 'Charchaganingizda ham harakat texnikasiga rioya qiling.'],
    baseSets: 3, baseReps: 5, restSec: 90, contactsPerRep: 4,
  },
  {
    id: 'approach-attack', element: 'hujum', name: 'Yugurib kelib hujum zarbasi', motion: 'approach', intensity: 'orta', minBlock: 1,
    summary: 'Uch qadamda yugurib kelib, to‘pga to‘rdan oshirib hujum zarbasi berish.',
    plyo: 'Uch qadamli hujum sakrashi', volleyball: '4-zonadan hujum zarbasi',
    steps: ['Bog‘lovchi to‘pni 4-zonaga uzatadi.', 'Chap–o‘ng–chap tartibida uch qadam tashlang.', 'Ikki oyoqda depsinib, sakrashning eng yuqori nuqtasida to‘pga zarba bering.'],
    cues: ['Qo‘llarni siltash harakatini depsinish bilan uyg‘unlashtiring.', 'Zarbadan keyin ikki oyoqqa qo‘ning.'],
    baseSets: 3, baseReps: 6, restSec: 90, contactsPerRep: 1,
  },
  {
    id: 'depth-attack', element: 'hujum', name: 'Platformadan tushib, hujum qilish', motion: 'depth', intensity: 'yuqori', minBlock: 3,
    summary: 'Platformadan tushgandan keyingi sakrashni hujum zarbasi bilan yakunlash.',
    plyo: 'Platformadan tushib sakrash', volleyball: 'Hujum zarbasi',
    steps: ['Platformani to‘rdan 2 m uzoqlikka qo‘ying.', 'Platformadan tushib, ikki qadam yugurib keling.', 'Darhol sakrab, uzatilgan to‘pni uring.'],
    cues: ['Yerga tegib turish vaqtini qisqartiring, harakatni to‘xtatib qo‘ymang.', 'Har bir zarbada imkon qadar baland sakrashga intiling.'],
    baseSets: 3, baseReps: 5, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'double-attack', element: 'hujum', name: 'Ketma-ket ikki hujum', motion: 'approach', intensity: 'yuqori', minBlock: 4,
    summary: 'Zarba berish, hujum chizig‘iga qaytish va qayta zarba berish orqali takroriy hujumni mashq qilish.',
    plyo: 'Ketma-ket ikki reaktiv sakrash', volleyball: 'Ketma-ket ikki hujum zarbasi',
    steps: ['Birinchi to‘pni uring.', 'Hujum chizig‘iga tez qayting.', 'Ikkinchi uzatilgan to‘pga yugurib kelib, zarba bering.'],
    cues: ['Ortga qaytayotganda yuzingiz to‘rga qarab tursin.', 'Ikkinchi sakrashni ham bor kuch bilan bajaring.'],
    baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 2,
  },
  {
    id: 'static-block', element: 'blok', name: 'Joyidan sakrab to‘siq qo‘yish', motion: 'block', intensity: 'past', minBlock: 1,
    summary: 'To‘r oldida sakrab, qo‘llarni to‘rdan oshirib to‘siq qo‘yish.',
    plyo: 'Joyidan tik sakrash', volleyball: 'Yakka to‘siq',
    steps: ['To‘rdan bir qarich narida turing.', 'Qo‘llarni yelka balandligida tuting.', 'Sakrab, qo‘llarni to‘r ustidan raqib maydoni tomon uzating.'],
    cues: ['Barmoqlarni keng oching.', 'To‘rga tegmang.'],
    baseSets: 3, baseReps: 8, restSec: 60, contactsPerRep: 1,
  },
  {
    id: 'shuffle-block', element: 'blok', name: 'Yon qadam va to‘siq', motion: 'block', intensity: 'orta', minBlock: 2,
    summary: 'Yon qadamlar bilan siljib, so‘ng sakrab to‘siq qo‘yish.',
    plyo: 'Konkichi usulida sakrash', volleyball: 'Siljib to‘siq qo‘yish',
    steps: ['Markazda turing.', 'Murabbiy ishorasiga ko‘ra yon tomonga 2 qadam tashlang.', 'Harakatni nazorat bilan to‘xtatib, darhol sakrab to‘siq qo‘ying.'],
    cues: ['Qadam tashlashda oyoqlarni chalishtirib yubormang.', 'Sakrashdan oldin uzoq to‘xtab qolmang.'],
    baseSets: 3, baseReps: 6, restSec: 75, contactsPerRep: 1,
  },
  {
    id: 'triple-block', element: 'blok', name: 'Chap, markaz va o‘ng tomonda to‘siq qo‘yish', motion: 'block', intensity: 'yuqori', minBlock: 3,
    summary: 'To‘r bo‘ylab uch nuqtada ketma-ket sakrab to‘siq qo‘yish.',
    plyo: 'Ketma-ket tezkor sakrashlar', volleyball: 'Uch zonada to‘siq qo‘yish',
    steps: ['Chap zonada sakrab to‘siq qo‘ying.', 'Qo‘ngandan keyin markazga siljib, yana sakrang.', 'O‘ng zonada uchinchi marta sakrab to‘siq qo‘ying.'],
    cues: ['Har safar qo‘llarni to‘r ustidan oshiring.', 'Qo‘ngandan keyin to‘xtab qolmang.'],
    baseSets: 3, baseReps: 4, restSec: 120, contactsPerRep: 3,
  },
];

export const exerciseById = (id: string) => EXERCISES.find((e) => e.id === id);
export const drillById = (id: string) => GAME_DRILLS.find((d) => d.id === id);
export const blockInfo = (id: BlockId) => BLOCKS[id - 1];
export const exercisesOfBlock = (id: BlockId) => EXERCISES.filter((e) => e.block === id);
