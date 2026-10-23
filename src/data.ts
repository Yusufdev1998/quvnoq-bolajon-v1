export type Section = 'home' | 'gym' | 'games' | 'motor' | 'monitor';
export type ActivityKind = 'gym' | 'game' | 'motor';
export type Mood = 'happy' | 'okay' | 'tired';
export type Step = { title: string; instruction: string; pose: 'reach' | 'jump' | 'stretch' | 'hands' | 'ball' | 'wave' | 'step' | 'dance' | 'celebrate' | 'wings'; cue: string; seconds?: number; challenge?: boolean };
export type Activity = {
  id: string; kind: ActivityKind; title: string; description: string; duration: string;
  art: 'bunny' | 'ball' | 'hands' | 'train' | 'flower' | 'bear'; color: string;
  equipment: string; steps: Step[]; group?: string; day?: number;
};

export const gymDays = Array.from({ length: 30 }, (_, i): Activity => {
  const names = ['Harakat bilan tanishamiz', 'Quyoshga salom', 'Quvnoq qadamlar', 'Qanot yozamiz', 'Muvozanatni topamiz', 'Birga harakat qilamiz'];
  return {
    id: `gym-${i + 1}`, kind: 'gym', day: i + 1, title: names[i % names.length],
    description: 'Tanani qizdirish, asosiy harakat va yengil cho‘zilish.', duration: '3 bosqich',
    art: 'bunny', color: 'peach', equipment: 'Qulay kiyim va bo‘sh joy',
    steps: [
      { title: 'Tanani qizdiramiz', instruction: 'Quyoncha kabi kichik yon qadamlar tashlang. Qo‘llaringizni erkin silkiting. Ekrandagi harakatni qulay sur’atda takrorlang.', pose: 'step', cue: 'Kuzat va takrorla', seconds: 15 },
      { title: i % 2 ? 'Qanot yozamiz' : 'Quyoshga cho‘zilamiz', instruction: i % 2 ? 'Qo‘llarni qanot kabi ikki yonga oching. Qulay sur’atda ko‘taring va tushiring.' : 'Ikki qo‘lingizni sekin yuqoriga ko‘taring. So‘ng qo‘llaringizni ohista tushiring.', pose: i % 2 ? 'wings' : 'reach', cue: 'Sekin harakat qil', seconds: 15 },
      { title: 'Dam olamiz', instruction: 'Qo‘llarni erkin tushiring. Bir oz tin oling va tanangizni bo‘shashtiring. Mashg‘ulot tugadi!', pose: 'stretch', cue: 'Ajoyib, dam olamiz' },
    ],
  };
});

export const games: Activity[] = [
  { id: 'rabbit', kind: 'game', title: 'Quyoncha sakraydi', description: 'Quyoncha bilan sehrli bog‘ga sayohat: harakatlar, yulduzchalar va quvnoq raqs!', duration: '1,5 daqiqa', art: 'bunny', color: 'peach', group: 'Rolli o‘yinlar', equipment: 'Bo‘sh joy va kattalar yordami', steps: [
    { title: 'Salom, quyoncha!', instruction: 'Quyoncha bizni bog‘ga taklif qilyapti! Unga qo‘l silkiting. Bugun birga kichik sarguzashtga chiqamiz.', pose: 'wave', cue: 'Salom ber', seconds: 8 },
    { title: 'Quyoshga salom', instruction: 'Quyonchani kuzating: qo‘llar yuqoriga ko‘tariladi va sekin tushadi. O‘zingizga qulay sur’atda birga takrorlang.', pose: 'reach', cue: 'Birga cho‘zilamiz', seconds: 14 },
    { title: 'Gullar orasidan o‘tamiz', instruction: 'Yashil ishora — harakat! Quyoncha yumshoq sakrayapti. Katta kishi bilan sizga qulay harakatni takrorlang.', pose: 'jump', cue: 'Harakat qil', seconds: 14 },
    { title: 'Jimjit bog‘da dam', instruction: 'Qizil ishora — to‘xtaymiz. Quyoncha ham qimirlamay turibdi. Bir oz dam oling, keyin sayohatni davom ettiramiz.', pose: 'stretch', cue: 'To‘xta', seconds: 6 },
    { title: 'Kapalakka ergashamiz', instruction: 'Kapalak bir yonga, keyin boshqa yonga uchdi. Quyoncha kabi kichik yon qadamlarni ko‘rsating. Shoshilmang.', pose: 'step', cue: 'Birga qadam tashla', seconds: 14 },
    { title: 'Uchta yulduzchani top!', instruction: 'Bog‘da uchta yulduzcha yashiringan. Ekrandagi yulduzchalarni birma-bir bosib, quyonchaga yordam bering!', pose: 'jump', cue: 'Yulduzchalarni top', seconds: 12, challenge: true },
    { title: 'Quyoncha bilan raqs', instruction: 'Quyoncha bilan qo‘llarni silkiting va yengil tebraning. O‘zingiz yoqtirgan harakat ham bo‘ladi.', pose: 'dance', cue: 'Qani, birga raqs!', seconds: 14 },
    { title: 'Barakalla, do‘stim!', instruction: 'Quyoncha siz bilan faxrlanyapti! Unga qo‘l silkiting va o‘zingizni tabriklang. Birga juda yaxshi harakat qildik.', pose: 'celebrate', cue: 'Barakalla!', seconds: 8 },
  ] },
  { id: 'bear', kind: 'game', title: 'Ayiqcha va asalarilar', description: 'Ayiqcha bilan birga o‘ynab, harakat qilamiz.', duration: '3 ishora', art: 'bear', color: 'butter', group: 'Rolli o‘yinlar', equipment: 'Bo‘sh joy va kattalar yordami', steps: [
    { title: 'Ayiqcha yuradi', instruction: 'Ayiqcha kabi sekin va yumshoq qadam tashlang.', pose: 'jump', cue: 'Qadam tashla' },
    { title: 'Asalarilar uchadi', instruction: 'Qo‘llaringizni qanotdek oching. Yonma-yon turib qanot qoqishni ko‘rsating.', pose: 'stretch', cue: 'Qanot yoz' },
    { title: 'Uyga qaytamiz', instruction: 'Belgilangan joyga sekin qayting. Bir-biringizga qo‘l silkiting.', pose: 'reach', cue: 'Salom ber' },
  ] },
  { id: 'train', kind: 'game', title: 'Quvnoq poyezd', description: 'Bir safda yurib, navbat bilan bekatga yetamiz.', duration: '3 bekat', art: 'train', color: 'mint', group: 'Rolli o‘yinlar', equipment: 'Guruh yoki oila a’zolari', steps: [
    { title: 'Poyezdga chiqamiz', instruction: 'Bir-biringizning ortingizdan safga turing. Oraliq masofani saqlang.', pose: 'stretch', cue: 'Safga tur' },
    { title: 'Poyezd yo‘lga chiqdi', instruction: 'Bir maromda sekin qadam tashlang. Oldindagi do‘stingizni kuzating.', pose: 'jump', cue: 'Birga yur' },
    { title: 'Bekatga yetdik', instruction: 'Bekat ishorasini ko‘rganda to‘xtang. Keyingi do‘stingizga navbat bering.', pose: 'reach', cue: 'Navbat ber' },
  ] },
  { id: 'stations', kind: 'game', title: 'To‘rt bekat', description: 'Har bir bekatda yangi harakat kutmoqda.', duration: '4 bekat', art: 'flower', color: 'lavender', group: 'Stansiyalar', equipment: 'To‘rtta belgilangan joy', steps: [
    { title: '1-bekat: salom', instruction: 'Birinchi bekatga yuring. Ikki qo‘lingiz bilan salom bering.', pose: 'reach', cue: 'Salom ber' },
    { title: '2-bekat: qanotlar', instruction: 'Ikkinchi bekatda qo‘llaringizni yon tomonga oching.', pose: 'stretch', cue: 'Qanot yoz' },
    { title: '3-bekat: qadamlar', instruction: 'Uchinchi bekatda joyingizda sekin qadam tashlang.', pose: 'jump', cue: 'Qadam tashla' },
    { title: '4-bekat: dam', instruction: 'Oxirgi bekatda tanangizni bo‘shashtiring va dam oling.', pose: 'stretch', cue: 'Dam ol' },
  ] },
  { id: 'circle', kind: 'game', title: 'Aylanma mashq', description: 'Tanish harakatlarni ketma-ket bajaramiz.', duration: '3 bosqich', art: 'ball', color: 'peach', group: 'Stansiyalar', equipment: 'Qulay va bo‘sh joy', steps: [
    { title: 'Davraga turamiz', instruction: 'Bir-biringizga xalaqit bermaydigan masofada davra hosil qiling.', pose: 'stretch', cue: 'Tayyorlan' },
    { title: 'Harakatni takrorlaymiz', instruction: 'Katta kishi ko‘rsatgan qo‘l harakatini o‘zingizga qulay sur’atda takrorlang.', pose: 'reach', cue: 'Takrorla' },
    { title: 'Navbat sizniki', instruction: 'O‘zingiz yoqtirgan yengil harakatni ko‘rsating. Do‘stlaringiz takrorlasin.', pose: 'hands', cue: 'Ko‘rsat' },
  ] },
  { id: 'relay', kind: 'game', title: 'Tez va epchil', description: 'Jamoada o‘ynab, bir-birimizni qo‘llaymiz.', duration: '3 bosqich', art: 'bunny', color: 'mint', group: 'Estafetalar', equipment: 'Belgilangan yo‘lak va kattalar yordami', steps: [
    { title: 'Navbatni kutamiz', instruction: 'Boshlanish chizig‘ida navbat bilan turing. Yashil ishorani kuting.', pose: 'stretch', cue: 'Kut' },
    { title: 'Belgiga boramiz', instruction: 'Kattalar ko‘rsatgan belgigacha o‘zingizga qulay sur’atda boring va qayting.', pose: 'jump', cue: 'Harakat qil' },
    { title: 'Navbatni uzatamiz', instruction: 'Keyingi do‘stingizga qo‘l silkiting. Endi uning navbati!', pose: 'reach', cue: 'Navbat ber' },
  ] },
  { id: 'pass', kind: 'game', title: 'To‘pni uzat', description: 'Yumshoq to‘pni do‘stimizga yetkazamiz.', duration: '3 bosqich', art: 'ball', color: 'butter', group: 'Estafetalar', equipment: 'Yumshoq to‘p va sherik', steps: [
    { title: 'To‘pni ushlaymiz', instruction: 'Yumshoq to‘pni ikki qo‘lingiz bilan ushlang. Sherigingizga qarang.', pose: 'ball', cue: 'Ushla' },
    { title: 'To‘pni uzatamiz', instruction: 'To‘pni yaqinda turgan sherigingizga ohista qo‘ldan qo‘lga uzating.', pose: 'ball', cue: 'Uzat' },
    { title: 'Qayta olamiz', instruction: 'Qo‘llaringizni ochib, to‘pni sherigingizdan qayta oling.', pose: 'hands', cue: 'Qabul qil' },
  ] },
];

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
    { title: 'Tayyorlanamiz', instruction: `Qulay o‘tiring. Kerak bo‘ladi: ${equipment.toLowerCase()}. Katta kishi mashqni avval ko‘rsatsin.`, pose: 'hands', cue: 'Kuzat' },
    { title, instruction, pose: i === 2 ? 'ball' : 'hands', cue: 'Sekin takrorla' },
    { title: 'Barmoqlar dam oladi', instruction: 'Qo‘llaringizni erkin qo‘ying. Barmoqlaringizni bo‘shashtiring va bir-biringizga qo‘l silkiting.', pose: 'hands', cue: 'Dam ol' },
  ],
}));

export const sectionLabels: Record<Section, string> = { home: 'Bosh sahifa', gym: 'Gimnastika', games: 'O‘yinlar', motor: 'Mayda motorika', monitor: 'Monitoring' };
export const kindLabels: Record<ActivityKind, string> = { gym: 'Gimnastika', game: 'Interfaol o‘yin', motor: 'Mayda motorika' };
