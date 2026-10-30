export type Section = 'home' | 'gym' | 'games' | 'motor' | 'monitor';
export type ActivityKind = 'gym' | 'game' | 'motor';
export type Mood = 'happy' | 'okay' | 'tired';
// Character moves. 'still' stands calmly (stop and wait signals); 'cooldown' is the
// static stretch that ends a session; the last six are seated fine-motor hand moves.
export type Pose = 'still' | 'reach' | 'wings' | 'wave' | 'step' | 'march' | 'run' | 'jump' | 'balance' | 'cooldown' | 'dance' | 'celebrate'
  | 'hands' | 'ball' | 'fingers' | 'ring' | 'pinch' | 'roll';
export type Step = { title: string; instruction: string; pose: Pose; cue: string; seconds?: number; challenge?: boolean; clip?: string };
export type Activity = {
  id: string; kind: ActivityKind; title: string; description: string; duration: string;
  art: 'bunny' | 'ball' | 'hands' | 'train' | 'flower' | 'bear'; color: string;
  equipment: string; steps: Step[]; group?: string; day?: number;
};

// Command colors used on the full-screen signal cards: green move, red stop,
// yellow get ready or wait, blue stretch and rest.
export type Signal = 'go' | 'stop' | 'ready' | 'rest';
export function commandSignal(step: Step): Signal {
  if (step.cue === 'To‘xta') return 'stop';
  if (step.pose === 'cooldown' || step.cue.startsWith('Dam')) return 'rest';
  if (step.pose === 'still') return 'ready';
  return 'go';
}

const gymMoves = {
  march: { title: 'Joyida yuramiz', instruction: 'Joyingizda sekin yuring: tizzalarni biroz ko‘taring, qo‘llarni erkin silkiting. Ekrandagi harakatni qulay sur’atda takrorlang.', pose: 'march', cue: 'Kuzat va takrorla' },
  step: { title: 'Yon qadamlar', instruction: 'Quyoncha kabi chapga va o‘ngga yon qadam tashlang. Har qadamda og‘irlikni bir oyoqdan ikkinchisiga o‘tkazing.', pose: 'step', cue: 'Kuzat va takrorla' },
  run: { title: 'Joyida yuguramiz', instruction: 'Joyingizda yengil yuguring: tizzalar yuqoriga, qo‘llar tirsakdan bukilgan. Charchasangiz sekinlashing.', pose: 'run', cue: 'Yugur' },
  reach: { title: 'Quyoshga cho‘zilamiz', instruction: 'Ikki qo‘lingizni sekin yuqoriga ko‘taring, oyoq uchida turing. So‘ng qo‘llaringizni ohista tushiring.', pose: 'reach', cue: 'Sekin harakat qil' },
  wings: { title: 'Qanot yozamiz', instruction: 'Qo‘llarni qanot kabi ikki yonga oching. Qulay sur’atda ko‘taring va tushiring.', pose: 'wings', cue: 'Sekin harakat qil' },
  balance: { title: 'Laylakdek turamiz', instruction: 'Qo‘llarni yonga oching va bir oyoqni ko‘taring. Bir oz ushlab turing, so‘ng oyoqni almashtiring. Katta kishi yoningizda tursin.', pose: 'balance', cue: 'Muvozanat' },
  jump: { title: 'Quyonchadek sakraymiz', instruction: 'Tizzalarni bukib, ikki oyoqda yuqoriga sakrang. Yumshoq qo‘nish uchun tizzalarni yana bukib qo‘ning.', pose: 'jump', cue: 'Sakra' },
  cooldown: { title: 'Cho‘zilamiz', instruction: 'Qo‘llarni yuqoriga cho‘zing, so‘ng chapga va o‘ngga sekin egiling. Har tomonda bir oz ushlab turing va qo‘llarni silkitib bo‘shashtiring.', pose: 'cooldown', cue: 'Dam ol va cho‘zil' },
} satisfies Record<string, Omit<Step, 'seconds'>>;

// The 30 days widen the range of movement step by step: days 1–10 use small, calm
// movements; days 11–20 add side steps and balance; days 21–30 add running and jumps.
// Every session keeps the order warm-up → main movement → stretch.
const gymLevels = [
  { names: ['Harakat bilan tanishamiz', 'Quyoshga salom'], warm: 'march', main: [['reach'], ['wings']], seconds: 15, cool: 20, note: 'Kichik va sekin harakatlar.' },
  { names: ['Muvozanatni topamiz', 'Qanot va qadam'], warm: 'step', main: [['reach', 'balance'], ['wings', 'balance']], seconds: 20, cool: 25, note: 'Kengroq harakatlar va muvozanat.' },
  { names: ['Chaqqon oyoqlar', 'Quvnoq sakrashlar'], warm: 'run', main: [['jump', 'balance'], ['jump', 'wings']], seconds: 25, cool: 30, note: 'Sakrash, yugurish va uzoqroq ushlab turish.' },
] as const;

export const gymDays = Array.from({ length: 30 }, (_, i): Activity => {
  const stage = Math.floor(i / 10), level = gymLevels[stage], variant = i % 2;
  const steps: Step[] = [
    { ...gymMoves[level.warm], title: `Tanani qizdiramiz: ${gymMoves[level.warm].title.toLocaleLowerCase('uz-UZ')}`, seconds: level.seconds },
    ...level.main[variant].map(move => ({ ...gymMoves[move], seconds: level.seconds })),
    { ...gymMoves.cooldown, seconds: level.cool },
  ];
  return {
    id: `gym-${i + 1}`, kind: 'gym', day: i + 1, title: level.names[variant],
    description: `Tanani qizdirish, asosiy harakat va cho‘zilish. ${stage + 1}-bosqich: ${level.note}`, duration: `${steps.length} bosqich`,
    art: 'bunny', color: 'peach', equipment: 'Qulay kiyim va bo‘sh joy', steps,
  };
});

export const games: Activity[] = [
  { id: 'rabbit', kind: 'game', title: 'Quyoncha sakraydi', description: 'Quyoncha bilan sehrli bog‘ga sayohat: harakatlar, yulduzchalar va quvnoq raqs!', duration: '1,5 daqiqa', art: 'bunny', color: 'peach', group: 'Rolli o‘yinlar', equipment: 'Bo‘sh joy va kattalar yordami', steps: [
    { title: 'Salom, quyoncha!', instruction: 'Quyoncha bizni bog‘ga taklif qilyapti! Unga qo‘l silkiting. Bugun birga kichik sarguzashtga chiqamiz.', pose: 'wave', cue: 'Salom ber', seconds: 8 },
    { title: 'Quyoshga salom', instruction: 'Quyonchani kuzating: qo‘llar yuqoriga ko‘tariladi va sekin tushadi. O‘zingizga qulay sur’atda birga takrorlang.', pose: 'reach', cue: 'Birga cho‘zilamiz', seconds: 14 },
    { title: 'Gullar orasidan o‘tamiz', instruction: 'Yashil ishora — harakat! Quyoncha yumshoq sakrayapti. Katta kishi bilan sizga qulay harakatni takrorlang.', pose: 'jump', cue: 'Harakat qil', seconds: 14 },
    { title: 'Jimjit bog‘da dam', instruction: 'Qizil ishora — to‘xtaymiz. Quyoncha ham qimirlamay turibdi. Bir oz dam oling, keyin sayohatni davom ettiramiz.', pose: 'still', cue: 'To‘xta', seconds: 6 },
    { title: 'Laylakdek turamiz', instruction: 'Kapalak gulga qo‘ndi. Quyoncha bir oyoqda turib, uni jimgina kuzatyapti. Qo‘llarni yonga oching va muvozanatni saqlang.', pose: 'balance', cue: 'Muvozanat', seconds: 14 },
    { title: 'Uchta yulduzchani top!', instruction: 'Bog‘da uchta yulduzcha yashiringan. Ekrandagi yulduzchalarni birma-bir bosib, quyonchaga yordam bering!', pose: 'jump', cue: 'Yulduzchalarni top', seconds: 12, challenge: true },
    { title: 'Quyoncha bilan raqs', instruction: 'Quyoncha bilan qo‘llarni silkiting va yengil tebraning. O‘zingiz yoqtirgan harakat ham bo‘ladi.', pose: 'dance', cue: 'Qani, birga raqs!', seconds: 14 },
    { title: 'Barakalla, do‘stim!', instruction: 'Quyoncha siz bilan faxrlanyapti! Unga qo‘l silkiting va o‘zingizni tabriklang. Birga juda yaxshi harakat qildik.', pose: 'celebrate', cue: 'Barakalla!', seconds: 8 },
  ] },
  { id: 'bear', kind: 'game', title: 'Ayiqcha va asalarilar', description: 'Ayiqcha bilan birga o‘ynab, harakat qilamiz.', duration: '3 ishora', art: 'bear', color: 'butter', group: 'Rolli o‘yinlar', equipment: 'Bo‘sh joy va kattalar yordami', steps: [
    { title: 'Ayiqcha yuradi', instruction: 'Ayiqcha kabi sekin va yumshoq qadam tashlang.', pose: 'march', cue: 'Qadam tashla' },
    { title: 'Asalarilar uchadi', instruction: 'Qo‘llaringizni qanotdek oching. Yonma-yon turib qanot qoqishni ko‘rsating.', pose: 'wings', cue: 'Qanot yoz' },
    { title: 'Uyga qaytamiz', instruction: 'Belgilangan joyga sekin qayting. Bir-biringizga qo‘l silkiting.', pose: 'wave', cue: 'Salom ber' },
  ] },
  { id: 'train', kind: 'game', title: 'Quvnoq poyezd', description: 'Bir safda yurib, navbat bilan bekatga yetamiz.', duration: '3 bekat', art: 'train', color: 'mint', group: 'Rolli o‘yinlar', equipment: 'Guruh yoki oila a’zolari', steps: [
    { title: 'Poyezdga chiqamiz', instruction: 'Bir-biringizning ortingizdan safga turing. Oraliq masofani saqlang.', pose: 'still', cue: 'Safga tur' },
    { title: 'Poyezd yo‘lga chiqdi', instruction: 'Bir maromda sekin qadam tashlang. Oldindagi do‘stingizni kuzating.', pose: 'march', cue: 'Birga yur' },
    { title: 'Bekatga yetdik', instruction: 'Bekat ishorasini ko‘rganda to‘xtang. Keyingi do‘stingizga navbat bering.', pose: 'wave', cue: 'Navbat ber' },
  ] },
  { id: 'stations', kind: 'game', title: 'To‘rt bekat', description: 'Har bir bekatda boshqa mushak guruhi ishlaydi.', duration: '4 bekat', art: 'flower', color: 'lavender', group: 'Stansiyalar', equipment: 'To‘rtta belgilangan joy', steps: [
    { title: '1-bekat: qo‘llar', instruction: 'Birinchi bekatda qo‘llarni yuqoriga cho‘zing va sekin tushiring. Yelka va qo‘l mushaklari ishlaydi.', pose: 'reach', cue: 'Qo‘llar' },
    { title: '2-bekat: oyoqlar', instruction: 'Ikkinchi bekatda joyingizda yengil sakrang. Oyoq mushaklari ishlaydi.', pose: 'jump', cue: 'Sakra' },
    { title: '3-bekat: tana', instruction: 'Uchinchi bekatda qo‘llarni ko‘tarib, chapga va o‘ngga sekin egiling. Yon va bel mushaklari cho‘ziladi.', pose: 'cooldown', cue: 'Egil' },
    { title: '4-bekat: muvozanat', instruction: 'Oxirgi bekatda bir oyoqda turib, qo‘llarni yonga oching. So‘ng oyoqni almashtiring. O‘zingiz bajarishga harakat qiling.', pose: 'balance', cue: 'Muvozanat' },
  ] },
  { id: 'circle', kind: 'game', title: 'Aylanma mashq', description: 'Statik va dinamik cho‘zilishlarni ketma-ket bajaramiz.', duration: '5 bosqich', art: 'ball', color: 'peach', group: 'Stansiyalar', equipment: 'Qulay va bo‘sh joy', steps: [
    { title: 'Davraga turamiz', instruction: 'Bir-biringizga xalaqit bermaydigan masofada davra hosil qiling.', pose: 'still', cue: 'Tayyorlan' },
    { title: 'Dinamik cho‘zilish', instruction: 'Qo‘llarni sekin yuqoriga ko‘taring va tushiring. Harakatni bir maromda takrorlang.', pose: 'reach', cue: 'Takrorla' },
    { title: 'Qanotlarni silkitamiz', instruction: 'Qo‘llarni yonga oching va qanotdek yengil silkiting.', pose: 'wings', cue: 'Silkit' },
    { title: 'Statik cho‘zilish', instruction: 'Qo‘llarni yuqoriga ko‘tarib, yonga egiling va bir oz ushlab turing. So‘ng boshqa tomonga egiling.', pose: 'cooldown', cue: 'Ushlab tur' },
    { title: 'Harakatni nazorat qilamiz', instruction: 'Bir oyoqda turib, muvozanatni saqlang. Shoshilmang, keyin oyoqni almashtiring.', pose: 'balance', cue: 'Muvozanat' },
  ] },
  { id: 'relay', kind: 'game', title: 'Tez va epchil', description: 'Jamoada navbat bilan yugurib, topshiriq bajaramiz.', duration: '4 bosqich', art: 'bunny', color: 'mint', group: 'Estafetalar', equipment: 'Belgilangan yo‘lak va kattalar yordami', steps: [
    { title: 'Navbatni kutamiz', instruction: 'Boshlanish chizig‘ida navbat bilan turing. Yashil kartochkani kuting.', pose: 'still', cue: 'Kut' },
    { title: 'Belgigacha yuguramiz', instruction: 'Kattalar ko‘rsatgan belgigacha yugurib boring. Yo‘lakda bir-biringizga xalaqit bermang.', pose: 'run', cue: 'Yugur' },
    { title: 'Topshiriqni bajaramiz', instruction: 'Belgi yonida uch marta yengil sakrang, so‘ng joyingizga qayting.', pose: 'jump', cue: 'Sakra' },
    { title: 'Navbatni uzatamiz', instruction: 'Keyingi do‘stingizga qo‘l silkiting. Endi uning navbati!', pose: 'wave', cue: 'Navbat ber' },
  ] },
  { id: 'pass', kind: 'game', title: 'To‘pni uzat', description: 'Yumshoq to‘pni do‘stimizga yetkazamiz.', duration: '3 bosqich', art: 'ball', color: 'butter', group: 'Estafetalar', equipment: 'Yumshoq to‘p va sherik', steps: [
    { title: 'To‘pni ushlaymiz', instruction: 'Yumshoq to‘pni ikki qo‘lingiz bilan ushlang. Sherigingizga qarang.', pose: 'ball', cue: 'Ushla' },
    { title: 'To‘pni uzatamiz', instruction: 'To‘pni yaqinda turgan sherigingizga ohista qo‘ldan qo‘lga uzating.', pose: 'ball', cue: 'Uzat' },
    { title: 'Qayta olamiz', instruction: 'Qo‘llaringizni ochib, to‘pni sherigingizdan qayta oling.', pose: 'hands', cue: 'Qabul qil' },
  ] },
];

const motorPoses: Record<string, Pose> = { hello: 'fingers', fist: 'hands', squeeze: 'ball', ring: 'ring', clips: 'pinch', seeds: 'pinch', rope: 'roll', clay: 'roll' };
const motorItems = [
  ['hello', 'Barmoqlar salomlashadi', 'Har bir barmoq bilan salomlashamiz.', 'Jihozsiz', 'Bosh barmog‘ingizni qolgan barmoqlaringizga birma-bir tekkizing. Har biriga salom bering.'],
  ['fist', 'Musht — kaft', 'Kaftimizni ochamiz va yumshoq yopamiz.', 'Jihozsiz', 'Kaftingizni keng oching. So‘ng barmoqlaringizni sekin yig‘ib, yumshoq musht qiling.'],
  ['squeeze', 'Yumshoq to‘pcha', 'To‘pchani ushlab, siqib ko‘ramiz.', 'Yumshoq to‘pcha', 'Yumshoq to‘pchani kaftingizga oling. Uni yengil siqing va bo‘shating.'],
  ['ring', 'Elastik halqa', 'Barmoqlar bilan halqani kengaytiramiz.', 'Yumshoq elastik halqa', 'Kattalar yordamida halqani barmoqlaringizga joylang. Uni yengil kengaytiring va bo‘shating.'],
  ['clips', 'Qistirgichlarni terish', 'Rangli qistirgichlarni birma-bir teramiz.', 'Yirik yumshoq qistirgichlar', 'Qistirgichni barmoqlaringiz bilan oching. Uni karton chetiga birma-bir joylashtiring.'],
  ['seeds', 'Donachalarni ko‘chirish', 'Buyumlarni bir idishdan boshqasiga olamiz.', 'Yirik donachalar va ikkita idish', 'Katta kishi yoningizda tursin. Yirik donachalarni birma-bir ushlab, ikkinchi idishga ko‘chiring.'],
  ['rope', 'Arqonchani o‘rash', 'Yumshoq arqonchani birga o‘raymiz.', 'Qisqa yumshoq arqoncha', 'Arqonchani stol ustida kichik doira qilib o‘rang. Katta kishi sizga ko‘rsatsin.'],
  ['clay', 'Plastilin sharchalari', 'Kaftimizda rangli sharchalar yasaymiz.', 'Bolalar plastilini', 'Plastilindan bir bo‘lak oling. Ikki kaftingiz orasida sekin aylantirib, sharcha yasang.'],
];
export const motorActivities: Activity[] = motorItems.map(([id, title, description, equipment, instruction], i) => ({
  id, kind: 'motor', title, description, equipment, duration: '3 bosqich', art: i === 2 ? 'ball' : i === 7 ? 'flower' : 'hands',
  color: ['lavender', 'peach', 'mint', 'butter'][i % 4], group: i < 2 ? 'Jihozsiz' : 'Jihozlar bilan',
  steps: [
    { title: 'Tayyorlanamiz', instruction: `Qulay o‘tiring. Kerak bo‘ladi: ${equipment.toLowerCase()}. Katta kishi mashqni avval ko‘rsatsin.`, pose: 'still', cue: 'Kuzat' },
    { title, instruction, pose: motorPoses[id], cue: 'Sekin takrorla', clip: `motor-${id}` },
    { title: 'Barmoqlar dam oladi', instruction: 'Qo‘llaringizni erkin qo‘ying. Barmoqlaringizni bo‘shashtiring va bir-biringizga qo‘l silkiting.', pose: 'wave', cue: 'Dam ol' },
  ],
}));

export const sectionLabels: Record<Section, string> = { home: 'Bosh sahifa', gym: 'Gimnastika', games: 'O‘yinlar', motor: 'Mayda motorika', monitor: 'Monitoring' };
export const kindLabels: Record<ActivityKind, string> = { gym: 'Gimnastika', game: 'Interfaol o‘yin', motor: 'Mayda motorika' };
