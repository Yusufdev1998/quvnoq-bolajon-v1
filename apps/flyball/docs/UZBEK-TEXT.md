# Flyball — ilovadagi barcha o‘zbekcha matnlar

Review list of every piece of Uzbek text a user can see in the app, taken straight from the source code on 2026-10-29.

**602 items.**

- **`L42`** is the line in the file, so a fix can be found quickly.
- **`{name}`** is a value filled in by the app (a number, a date, an athlete's name).
- Text split across lines on screen (because a value sits in the middle) appears as several items in a row.
- Exercise names, technique cues and coach advice are in the catalogue and analytics sections near the end.

To mark something: write the fix after the line, e.g. `→ Mashg‘ulotni boshlash`.

## Pastki menyu va umumiy

_Tab bar labels and the app shell._ · `src/app/App.tsx`

- `L17` Bugun
- `L18` Mashqlar
- `L19` O‘yin
- `L20` Natijalar
- `L21` Monitoring
- `L47` Flyball — bosh sahifa
- `L51` FLYBALL
- `L60` Asosiy bo‘limlar

## Kirish ekrani (onboarding)

_First screen: hero, role choice._ · `src/features/onboarding/Onboarding.tsx`

- `L14` Voleybolchi qiz hujum zarbasini bajarish uchun sakrayapti
- `L14` Hujum uchun sakrash
- `L16` Yosh voleybolchilar uchun
- `L18` Sakra
- `L18` balandroq!
- `L20` Kuchliroq zarba ber!
- `L25` Sakrash mashqlari, sizga mos yuklama va natijalarni kuzatish — barchasi bir ilovada. Ilovadan kim sifatida foydalanasiz?
- `L27` Murabbiy
- `L27` Jamoani boshqarish, sportchilarning yuklamasi va tavsiyalar
- `L28` Sportchi
- `L28` Mustaqil mashq qilish va natijalarimni kuzatish
- `L33` Avval birinchi sportchini qo‘shing. Qolganlarini keyin ham qo‘shishingiz mumkin.
- `L33` O‘z profilingizni to‘ldiring.
- `L35` Davom etish

## Sportchi formasi

_Add / edit athlete form._ · `src/features/team/AthleteForm.tsx`

- `L6` Hujumchi
- `L7` Diagonal hujumchi
- `L8` Markaziy blokchi
- `L9` Bog‘lovchi
- `L10` Libero
- `L21` Ismingizni kiriting
- `L22` {…}–{…} oralig‘ida
- `L34` Ism va familiya
- `L35` Masalan: Madina Karimova
- `L38` Tug‘ilgan yil
- `L42` O‘yindagi pozitsiya
- `L54` Bekor qilish

## Jamoa / Sozlamalar

_Team list, role switch, data reset._ · `src/features/team/TeamPage.tsx`

- `L18` Sozlamalar
- `L18` Jamoa
- `L18` Mening profilim
- `L21` Foydalanuvchi
- `L24` Murabbiy
- `L25` Sportchi
- `L30` Bir nechta sportchining mashg‘ulotlari va natijalarini kuzatish, hisobotlar olish.
- `L30` Shaxsiy mashg‘ulotlar va natijalarni kuzatish uchun bitta profil.
- `L38` Sportchi
- `L43` Sportchilar ({length})
- `L43` Profil
- `L49` Qo‘shish
- `L66` Saqlash
- `L88` yosh ·
- `L93` Tahrirlash
- `L99` O‘chirish
- `L101` {name}ni o‘chirasizmi?
- `L101` Uning barcha o‘lchovlari va mashg‘ulotlari ham o‘chiriladi.
- `L101` O‘chirish
- `L113` Ma’lumotlar
- `L115` Ma’lumotlaringiz faqat shu qurilmada saqlanadi. Ro‘yxatdan o‘tish talab qilinmaydi va ma’lumotlar serverga yuborilmaydi.
- `L119` Barcha ma’lumotlarni o‘chirasizmi?
- `L119` Barcha sportchilar, o‘lchovlar va mashg‘ulotlar haqidagi ma’lumotlar qurilmadan butunlay o‘chiriladi. Ularni qayta tiklab bo‘lmaydi.
- `L119` O‘chirish
- `L123` Barcha ma’lumotlarni o‘chirish

## Bugun (bosh sahifa)

_Today screen._ · `src/features/home/HomePage.tsx`

- `L29` Salom,
- `L36` -bosqich
- `L39` Bugun — dam olish kuni
- `L39` Bugungi mashg‘ulot
- `L42` Sakrash mashg‘ulotlari orasida
- `L42` soat tanaffus qilish kerak. Bu vaqtda mushaklar va paylar tiklanadi. Keyingi mashg‘ulot
- `L43` kuni.
- `L49` mashq
- `L53` sakrash
- `L57` daqiqa
- `L72` Shunga qaramay boshlash
- `L72` Mashg‘ulotni boshlash
- `L79` Joyidan sakrash
- `L83` {…}{delta} sm dastlabki o‘lchovga nisbatan
- `L83` Birinchi o‘lchov
- `L83` Hali test natijasi kiritilmagan
- `L87` ACWR
- `L90` Haftalik sakrashlar
- `L90` Bir mashg‘ulot uchun limit: {contactsBudget} ta sakrash
- `L99` Individual yuklama
- `L100` daraja
- `L103` Batafsil ko‘rish
- `L107` Bir mashg‘ulotdagi sakrashlar
- `L109` Platforma balandligi
- `L110` sm
- `L111` Dam olish vaqti koeffitsienti
- `L121` Monitoring
- `L125` Tavsiyalar

## Mashqlar

_Exercise blocks list._ · `src/features/training/TrainingPage.tsx`

- `L10` Hali ochilmagan
- `L10` Hozirgi bosqich
- `L10` O‘zlashtirildi
- `L15` 1-bo‘lim
- `L15` Plyometrik mashqlar
- `L17` Mashqlar to‘rtta bosqichga bo‘lingan. Yuklama asta-sekin oshadi. Keyingi bosqich ochilishi uchun kamida
- `L17` ta mashg‘ulot va oxirgi
- `L18` tasida texnika o‘rtachasi
- `L18` yoki undan yuqori bo‘lishi kerak.
- `L31` {id}-bosqich: {name}
- `L34` -bosqich
- `L45` ta mashg‘ulot · texnika bahosi
- `L60` har oyoqqa
- `L60` · dam
- `L72` Takrorlash
- `L72` {id}-bosqich mashg‘uloti

## Mashq / o‘yin mashqi sahifasi

_Exercise and drill detail page._ · `src/features/training/DetailPage.tsx`

- `L18` Topilmadi
- `L19` Bunday mashq topilmadi
- `L27` Platforma
- `L31` {block}-bosqich · {name}
- `L41` Mashq jadalligi:
- `L43` -bosqichdan boshlab
- `L49` Bu mashq
- `L49` bosqich ochilgach mashg‘ulot rejasiga qo‘shiladi. Hozir esa mashq bilan tanishishingiz mumkin.
- `L56` Plyometrika
- `L61` Voleybol
- `L68` uchun yuklama
- `L72` to‘plam
- `L76` har oyoqqa
- `L81` s dam
- `L86` sakrash
- `L89` Platforma balandligi
- `L89` sm dan oshmasin.
- `L92` Bajarish tartibi
- `L99` Murabbiy tavsiyalari
- `L108` -bosqich mashg‘ulotini boshlash
- `L114` O‘yin mashg‘ulotini boshlash

## O‘yin elementlari

_Game elements tab._ · `src/features/game/GamePage.tsx`

- `L20` 3-bo‘lim
- `L20` O‘yin elementlari
- `L21` Sakrash mashqlari voleybol harakatlari bilan uyg‘unlashtirilgan. Bu sakrash kuchi bilan birga texnik va taktik ko‘nikmalarni ham rivojlantiradi.
- `L39` -bosqichdan
- `L54` ta mashq
- `L57` Bu yo‘nalishdagi mashqlar keyingi bosqichlarda ochiladi.

## Mashg‘ulot jarayoni

_Workout runner, rest timer, finish and rating form._ · `src/features/session/SessionRunner.tsx`

- `L18` Juda yengil
- `L18` Yengil
- `L18` O‘rtacha
- `L18` Biroz og‘ir
- `L18` Og‘ir
- `L18` Juda og‘ir
- `L18` Deyarli maksimal
- `L18` Maksimal
- `L26` {block}-bosqich · {…}
- `L32` O‘yin · {name}
- `L57` Mashg‘ulotdan chiqasizmi?
- `L57` Bajarilgan mashqlar va to‘plamlar saqlanmaydi.
- `L57` Chiqish
- `L63` Chiqish
- `L75` Mashg‘ulot rejasini tuzib bo‘lmadi
- `L76` Bu bosqich hali ochilmagan yoki unga mos mashqlar mavjud emas.
- `L120` uchun reja
- `L121` Mashg‘ulotni boshlashga tayyormisiz?
- `L125` mashq
- `L129` sakrash
- `L133` daqiqa
- `L138` Boshlashdan oldin 8–10 daqiqa badan qizdiring: yengil yuguring, bo‘g‘imlarni aylantiring va dinamik cho‘zilish mashqlarini bajaring.
- `L147` · dam
- `L147` sakrash
- `L162` Boshlash
- `L198` dam olish
- `L204` Keyingi mashq
- `L204` {set}-to‘plam / {sets}
- `L208` marta
- `L219` Dam olishni o‘tkazib yuborish
- `L224` To‘plam tugadi
- `L227` Mashqni o‘tkazib yuborish
- `L282` Mashg‘ulot yakunlandi
- `L283` Mashg‘ulotni baholang
- `L287` mashq
- `L291` sakrash
- `L295` yuklama (AU)
- `L300` Davomiylik (badan qizdirish bilan), daqiqa
- `L306` Sezilgan zo‘riqish darajasi (RPE):
- `L312` Texnika sifati
- `L315` {n} ball
- `L323` Izoh (ixtiyoriy)
- `L324` Masalan: chap tizzamda noqulaylik sezdim
- `L329` Saqlash

## Ko‘rsatkichlar

_Measurements page and new-measurement form._ · `src/features/metrics/MetricsPage.tsx`

- `L34` 2-bo‘lim
- `L35` Individual ko‘rsatkichlar
- `L38` Yangi o‘lchov
- `L50` yosh ·
- `L55` TVI
- `L87` Joyidan sakrash me’yori (
- `L87` yosh): past &lt;
- `L87` sm, yuqori ≥
- `L87` sm. Me’yorlar taxminiy va murabbiy tomonidan moslashtiriladi.
- `L90` Yuklama qanday moslashtirilgan?
- `L93` Daraja
- `L95` Bir mashg‘ulotdagi sakrashlar
- `L97` Takrorlash koeffitsienti
- `L99` Dam olish vaqti koeffitsienti
- `L101` Platforma balandligi
- `L102` sm
- `L113` O‘lchovlar tarixi
- `L115` Hali hech qanday o‘lchov kiritilmagan
- `L116` Dastlabki o‘lchovlarni kiritish uchun yuqoridagi «+» tugmasini bosing.
- `L130` O‘chirish
- `L130` O‘lchovni o‘chirasizmi?
- `L130` {…} sanasida kiritilgan barcha ko‘rsatkichlar o‘chiriladi.
- `L169` Yangi o‘lchov
- `L170` Yopish
- `L175` Sana
- `L178` Faqat o‘lchagan ko‘rsatkichlaringizni kiriting. Qolganlari avvalgi qiymati bilan saqlanadi.
- `L201` Kamida bitta ko‘rsatkich kiriting.
- `L203` Saqlash

## Monitoring

_ACWR, charts, team table, log, CSV export._ · `src/features/monitoring/MonitoringPage.tsx`

- `L31` 4-bo‘lim
- `L31` Monitoring
- `L36` Qisqa va uzoq muddatli yuklama nisbati (ACWR)
- `L56` Oxirgi 7 kun:
- `L56` AU · Oxirgi 4 haftalik o‘rtacha:
- `L56` AU. Tavsiya etilgan oraliq: 0,8–1,3.
- `L57` Nisbatni hisoblash uchun kamida {…} haftalik mashg‘ulot ma’lumoti kerak.
- `L64` Sakrashlar
- `L65` Sezilgan zo‘riqish bo‘yicha yuklama (sRPE)
- `L76` So‘nggi 8 hafta (hafta dushanbadan boshlanadi)
- `L79` Ko‘rsatkichlar dinamikasi
- `L89` ” bo‘yicha o‘lchov yo‘q.
- `L97` birinchi o‘lchovdan beri
- `L106` Murabbiy uchun tavsiyalar
- `L113` Mashg‘ulotlar jurnali
- `L115` Hali mashg‘ulot yo‘q
- `L116` Birinchi mashg‘ulotni saqlaganingizdan so‘ng, u shu yerda ko‘rinadi.
- `L127` {block}-bosqich · {…}
- `L127` O‘yin elementlari
- `L130` sakrash · RPE
- `L130` AU · texnika
- `L134` O‘chirish
- `L134` Mashg‘ulotni o‘chirasizmi?
- `L134` Bu mashg‘ulot jurnal, grafiklar va bosqich bo‘yicha rivojlanish tarixidan o‘chiriladi.
- `L142` Hisobot
- `L144` flyball-mashgulotlar.csv
- `L145` Mashg‘ulotlar hisoboti (CSV)
- `L147` flyball-korsatkichlar.csv
- `L148` Ko‘rsatkichlar hisoboti (CSV)
- `L153` Hisobot yaratish uchun avval mashg‘ulot natijasini yoki o‘lchov ko‘rsatkichini saqlang.
- `L154` Hisobot barcha sportchilarning ma’lumotlarini o‘z ichiga oladi. Ko‘rsatkichlar faylida {length} ta ustun mavjud.
- `L173` Jamoa
- `L176` Sportchi
- `L177` Bosqich
- `L178` Sakrash
- `L179` ACWR

## Mashqlar katalogi

_Block names and descriptions, every exercise and drill: name, summary, technique cues, game elements._ · `src/domain/catalog.ts`

- `L11` Moslashtiruvchi
- `L11` Yerga to‘g‘ri qo‘nishni o‘rganish, to‘piq va tizza bo‘g‘imlarini yengil sakrashlarga moslashtirish.
- `L12` Rivojlantiruvchi
- `L12` O‘rtacha jadallikdagi sakrashlar orqali sakrash balandligi, tezkorlik va kuchni rivojlantirish.
- `L13` Harakatlarni murakkablashtiruvchi
- `L13` Bir oyoqda, yon tomonga va burilib sakrash orqali harakatlarni murakkablashtirish.
- `L14` Takomillashtiruvchi
- `L14` Tezkor va maksimal sakrashlar orqali o‘yindagi kuch va tezlikni yanada oshirish.
- `L17` Past
- `L17` O‘rta
- `L17` Yuqori
- `L23` Yerga to‘g‘ri tushish
- `L24` Past platformadan tushib, yerga yumshoq va muvozanatni saqlagan holda qo‘nishni o‘rganish.
- `L25` 20–30 sm balandlikdagi platforma ustida turing.
- `L25` Bir oyoqni oldinga uzatib, platformadan qadam tashlab tushing.
- `L25` Ikki oyoqqa bir vaqtda, tovonni ko‘targan holda qo‘ning.
- `L25` Yarim o‘tirgan holatda 2 soniya muvozanatni saqlang.
- `L26` Qo‘nishda tizzalar ichkariga bukilib ketmasin.
- `L26` Iloji boricha ovozsiz va yumshoq qo‘ning.
- `L27` Platforma: 20–30 sm
- `L30` To‘piq sakrashlari
- `L31` Oyoq uchida kichik va tez sakrashlar to‘piqning qayishqoqligini rivojlantiradi.
- `L32` Oyoqlarni yelka kengligida qo‘ying.
- `L32` Tizzalarni deyarli bukmasdan oyoq uchida sakrang.
- `L32` Oyoqning yerga tegib turish vaqtini imkon qadar qisqartiring.
- `L33` Tovonlarni yerga tekkizmang.
- `L33` Gavdani tik tuting, qo‘llar bilan ritmni saqlang.
- `L37` Arqon bilan sakrash
- `L38` Ritm va harakatlar muvofiqligini yaxshilaydigan badan qizdirish mashqi.
- `L39` Arqonni bilaklar yordamida aylantiring.
- `L39` Ikki oyoqda past va bir maromda sakrang.
- `L39` Har bir to‘plam oxirida sakrash tezligini oshiring.
- `L40` Tirsaklarni gavdaga yaqin tuting.
- `L40` 3–5 sm dan baland sakramang.
- `L41` Arqon
- `L44` Chiziqdan yon tomonga sakrash
- `L45` Maydondagi chiziqdan chapga va o‘ngga sakrash orqali yonlama harakatlarda muvozanatni rivojlantirish.
- `L46` Chiziq yonida ikki oyoqda turing.
- `L46` Chiziqdan yon tomonga sakrab o‘ting.
- `L46` Darhol ortga sakrang. Borib-qaytish bir takror hisoblanadi.
- `L47` Yelkalarni bir tekis tuting, harakatni asosan oyoqlar bilan bajaring.
- `L47` Chiziqqa tegmang.
- `L51` Yarim o‘tirib sakrash
- `L52` Yarim o‘tirgan holatdan yuqoriga sakrab, oyoqlarning kuchini rivojlantirish.
- `L53` Yarim o‘tiring va qo‘llarni orqaga uzating.
- `L53` Qo‘llarni oldinga-yuqoriga siltab, tik sakrang.
- `L53` Yumshoq qo‘ning, boshlang‘ich holatga qayting va mashqni takrorlang.
- `L54` Har bir sakrashni alohida bajaring, shoshilmang.
- `L54` Yerga qo‘nganda tizzalarni biroz buking.
- `L59` Tizzalarni ko‘krakka tortib sakrash
- `L60` Sakrashning eng yuqori nuqtasida tizzalarni ko‘krakka tortish orqali tezkor kuchni rivojlantirish.
- `L61` Tik turib, qo‘llarni siltang.
- `L61` Yuqoriga sakrab tizzalarni ko‘krakka torting.
- `L61` Oyoqlarni pastga tushirib, yumshoq qo‘ning.
- `L62` Gavda oldinga egilmasin.
- `L62` Tizzalarni ko‘tarishga e’tibor bering; qo‘llarni tizzalarga tomon tushirmang.
- `L66` Platformaga sakrab chiqish
- `L67` Platformaga yuqoriga sakrash orqali kuchni rivojlantirish va qo‘nishdagi zarbani kamaytirish.
- `L68` Platformadan 30 sm masofada turing.
- `L68` Qo‘llarni siltab platforma ustiga sakrab chiqing.
- `L68` Platforma ustida gavdani to‘liq rostlang.
- `L68` Pastga sakramasdan, qadam tashlab tushing.
- `L69` Platformaga tizzalarni bukib, yarim o‘tirgan holda qo‘ning.
- `L69` Platforma balandligi profilingizda belgilangan chegaradan oshmasin.
- `L70` Platforma
- `L73` Joyidan uzunlikka sakrash
- `L74` Oldinga sakrash kuchi hujumga yugurib kelish va qadam tashlash uchun muhim.
- `L75` Oyoqlarni yelka kengligida qo‘ying.
- `L75` Qo‘llarni orqaga siltab, tizzalarni buking.
- `L75` Oldinga va yuqoriga sakrab, ikkala oyoqqa qo‘ning.
- `L76` Qo‘nganda muvozanatni saqlang, gavda oldinga yiqilib ketmasin.
- `L76` Har bir sakrashdan so‘ng boshlang‘ich joyga qayting.
- `L80` Oldinga tashlangan qadam holatida sakrash
- `L81` Bir oyoq oldinda turgan holatdan sakrab, havoda oyoqlarning o‘rnini almashtirish.
- `L82` Bir oyoqni oldinga tashlab, tizzalarni bukib turing.
- `L82` Yuqoriga sakrang va havoda oyoqlarni almashtiring.
- `L82` Oyoqlar o‘rnini almashtirgan holda qo‘ning.
- `L83` Orqadagi tizza yerga qattiq tegmasin.
- `L83` Gavdani tik tuting.
- `L87` Konkichi usulida sakrash
- `L88` Yon tomonga bir oyoqdan ikkinchisiga sakrash orqali himoyadagi tezkor harakatni rivojlantirish.
- `L89` O‘ng oyoqda turing.
- `L89` Chap tomonga keng sakrab, chap oyoqqa qo‘ning.
- `L89` 1 soniya muvozanatni saqlang, so‘ng qarama-qarshi tomonga sakrang.
- `L90` Qo‘nayotgan oyoq tizzasi oyoq uchi bilan bir yo‘nalishda bo‘lsin.
- `L90` Muvozanatni saqlash uchun qo‘llardan foydalaning.
- `L95` Platformadan tushib sakrash
- `L96` Platformadan tushgach, darhol sakrab, mushaklarning cho‘zilish va qisqarish kuchidan foydalanish.
- `L97` 30 sm balandlikdagi platforma ustida turing.
- `L97` Platformadan pastga qadam tashlang.
- `L97` Oyoqlar yerga tegishi bilan darhol yuqoriga sakrang.
- `L98` Yer bilan kontakt vaqtini imkon qadar qisqa saqlang.
- `L98` Bu mashq faqat yerga to‘g‘ri qo‘nishni o‘zlashtirgan sportchilar uchun.
- `L99` Platforma: 30 sm
- `L102` Bir oyoqda sakrash
- `L103` Bir oyoqda ketma-ket sakrash hujum uchun depsinish kuchini oshiradi.
- `L104` Bir oyoqda turing.
- `L104` Oldinga ketma-ket 3 marta sakrang.
- `L104` Oxirgi sakrashdan so‘ng 2 soniya muvozanatni saqlang, keyin oyoqni almashtiring.
- `L105` Tizza ichkariga bukilib ketmasin.
- `L105` Mashqni har ikkala oyoqda teng marta bajaring.
- `L109` Platformaga yon tomondan sakrash
- `L110` Platformaga yon tomondan sakrash to‘siq qo‘yishda yonlama harakat kuchini rivojlantiradi.
- `L111` Platformaning yon tomonida turing.
- `L111` Yon tomonga sakrab platforma ustiga chiqing.
- `L111` Pastga qadam tashlab tushing va mashqni boshqa tomondan takrorlang.
- `L112` Ikkala oyoq bilan bir vaqtda qo‘ning.
- `L112` Yelkalarni to‘rga parallel tuting.
- `L113` Past platforma
- `L116` 180° burilib sakrash
- `L117` Havoda yarim aylanish orqali muvozanat va qo‘nishni nazorat qilishni rivojlantirish.
- `L118` Yarim o‘tiring, qo‘llarni orqaga uzating.
- `L118` Sakrab havoda 180° buriling.
- `L118` Qarama-qarshi tomonga yuzlangan holda yumshoq qo‘ning.
- `L119` Burilishni yelkalar harakati bilan boshlang.
- `L119` Har safar yo‘nalishni almashtiring.
- `L123` To‘ldirma to‘p bilan sakrab otish
- `L124` Sakrash va to‘pni otishni birlashtirib, oyoqdan qo‘lgacha kuch uzatishni mashq qilish.
- `L125` 1–2 kg li to‘ldirma to‘pni ko‘krak oldida ushlang.
- `L125` Tizzalarni buking va sakrash bilan bir vaqtda to‘pni yuqoriga oting.
- `L125` To‘pni ilib oling yoki yerga tushishini kuting.
- `L126` Harakatni oyoqlar bilan boshlang, to‘pni qo‘llar bilan oting.
- `L126` To‘p siz uchun haddan tashqari og‘ir bo‘lmasin.
- `L127` To‘ldirma to‘p: 1–2 kg
- `L131` Platformadan tushib, maksimal sakrash
- `L132` Platformadan tushgach, bor kuch bilan yuqoriga sakrab, tezkor kuchni rivojlantirish.
- `L133` Profilingizda belgilangan balandlikdagi platforma ustida turing.
- `L133` Pastga qadam tashlang.
- `L133` Oyoqlar yerga tegishi bilanoq qo‘llarni siltab, imkon qadar baland sakrang.
- `L134` Takrorlash sonidan ko‘ra harakat sifati muhim. Har bir sakrashni to‘g‘ri bajaring.
- `L134` Harakat texnikasi buzilsa, to‘plamni to‘xtating.
- `L135` Platforma
- `L138` To‘siqlar ustidan sakrash
- `L139` Beshta past to‘siqdan uzluksiz sakrab o‘tish orqali tezkor depsinishni rivojlantirish.
- `L140` 5 ta to‘siqni bir-biridan 1 m masofada joylashtiring.
- `L140` Ikki oyoqda to‘siqlar ustidan uzluksiz sakrang.
- `L140` Barcha 5 ta to‘siqdan o‘tish bir takror hisoblanadi.
- `L141` To‘siqlar orasida to‘xtamang.
- `L141` Tizzalarni yetarlicha baland ko‘taring.
- `L142` 5 ta to‘siq, balandligi 30–40 sm
- `L145` Uch qadamli hujum sakrashi
- `L146` Hujum zarbasiga tayyorgarlik: chap–o‘ng–chap qadamlaridan so‘ng kuchli depsinish.
- `L147` To‘rdan 3–4 m uzoqlikda turing.
- `L147` Tezlikni oshirib, uch qadamda to‘r tomon harakatlaning.
- `L147` Oxirgi qadamda ikki oyoqqa tayanib, qo‘llarni siltagan holda yuqoriga sakrang.
- `L147` Zarba beruvchi qo‘lni yuqoriga cho‘zing.
- `L148` Oxirgi qadamni uzun va tez bajaring.
- `L148` To‘rga tegmasdan, muvozanatni saqlab qo‘ning.
- `L149` Voleybol to‘ri
- `L152` Ketma-ket ikki reaktiv sakrash
- `L153` Platformadan tushib, ketma-ket ikki marta sakrash orqali to‘siq qo‘yish va qayta hujum ritmini mashq qilish.
- `L154` Platformadan pastga qadam tashlang.
- `L154` Oyoqlar yerga tegishi bilan sakrang.
- `L154` Qo‘ngandan so‘ng darhol yana bir marta sakrang.
- `L155` Ikkinchi sakrashda ham balandlikni saqlashga harakat qiling.
- `L155` Har bir sakrashda qo‘llarni faol ishlating.
- `L156` Platforma
- `L159` Katta qadamlar bilan sakrab yugurish
- `L160` Bir oyoqdan ikkinchisiga uzun sakrashlar orqali depsinish kuchini rivojlantirish.
- `L161` Yengil yugurib boshlang.
- `L161` Har bir qadamda uzoqroqqa va balandroqqa sakrashga harakat qiling.
- `L161` Ketma-ket 8 ta sakrash bir takror hisoblanadi.
- `L162` Depsinish vaqtida tayanch oyoqni to‘liq rostlang.
- `L162` Tayanch oyoqqa qarama-qarshi qo‘lni oldinga uzating.
- `L168` Sakrash
- `L168` To‘pni o‘yinga kiritish, pas berish va himoyadagi sakrashlarni plyometrik mashqlar bilan uyg‘unlashtirish.
- `L169` Hujum zarbasi
- `L169` Yugurib kelish, depsinish va hujum zarbasini bir harakat sifatida bajarish.
- `L170` Blok qo‘yish
- `L170` To‘r oldida tez siljish va ketma-ket to‘siq qo‘yish uchun sakrashlar.
- `L175` Sakrab pas berish
- `L176` Yarim o‘tirgan holatdan sakrab, eng yuqori nuqtada ikki qo‘l bilan pas berish.
- `L177` Yarim o‘tirib sakrash
- `L177` Sakrab yuqoridan pas berish
- `L178` Sherigingiz to‘pni boshingiz ustiga tashlaydi.
- `L178` Yarim o‘tirgan holatdan to‘p tomon sakrang.
- `L178` Eng yuqori nuqtada ikki qo‘l bilan pas bering.
- `L179` Sakrash vaqtini to‘pning harakatiga moslang.
- `L179` Yerga yumshoq qo‘ning.
- `L183` Yon tomonga sakrab, to‘pni qabul qilish
- `L184` Chiziqdan yon tomonga sakrab, so‘ng to‘pni pastdan qabul qilish.
- `L185` Chiziqdan yon tomonga sakrash ×4
- `L185` To‘pni pastdan qabul qilish (himoya)
- `L186` Chiziqdan yon tomonga 4 marta sakrang.
- `L186` Murabbiy to‘pni yon tomonga tashlaydi.
- `L186` Tez siljib, to‘pni pastdan qabul qiling.
- `L187` Sakrashdan so‘ng tizzalarni bukib, past holatda qoling.
- `L187` Bilaklarni birlashtirib, to‘pni qabul qilish yuzasini to‘pga qarating.
- `L191` Sakrab to‘pni o‘yinga kiritishga tayyorgarlik
- `L192` Tizzalarni ko‘krakka tortib sakrash, so‘ng sakrab to‘pni o‘yinga kiritish.
- `L193` Tizzalarni ko‘krakka tortib sakrash ×3
- `L193` Sakrab to‘pni o‘yinga kiritish
- `L194` To‘pni o‘yinga kiritish chizig‘i ortida tizzalarni ko‘krakka tortib 3 marta sakrang.
- `L194` 10 soniya davomida nafasni rostlang.
- `L194` To‘pni yuqoriga tashlang, yugurib kelib sakrang va to‘pni o‘yinga kiriting.
- `L195` Sakrash uchun depsinish chiziqni bosmasdan bajarilsin.
- `L195` Charchaganingizda ham harakat texnikasiga rioya qiling.
- `L199` Yugurib kelib hujum zarbasi
- `L200` Uch qadamda yugurib kelib, to‘pga to‘rdan oshirib hujum zarbasi berish.
- `L201` Uch qadamli hujum sakrashi
- `L201` 4-zonadan hujum zarbasi
- `L202` Bog‘lovchi to‘pni 4-zonaga uzatadi.
- `L202` Chap–o‘ng–chap tartibida uch qadam tashlang.
- `L202` Ikki oyoqda depsinib, sakrashning eng yuqori nuqtasida to‘pga zarba bering.
- `L203` Qo‘llarni siltash harakatini depsinish bilan uyg‘unlashtiring.
- `L203` Zarbadan keyin ikki oyoqqa qo‘ning.
- `L207` Platformadan tushib, hujum qilish
- `L208` Platformadan tushgandan keyingi sakrashni hujum zarbasi bilan yakunlash.
- `L209` Platformadan tushib sakrash
- `L209` Hujum zarbasi
- `L210` Platformani to‘rdan 2 m uzoqlikka qo‘ying.
- `L210` Platformadan tushib, ikki qadam yugurib keling.
- `L210` Darhol sakrab, uzatilgan to‘pni uring.
- `L211` Yerga tegib turish vaqtini qisqartiring, harakatni to‘xtatib qo‘ymang.
- `L211` Har bir zarbada imkon qadar baland sakrashga intiling.
- `L215` Ketma-ket ikki hujum
- `L216` Zarba berish, hujum chizig‘iga qaytish va qayta zarba berish orqali takroriy hujumni mashq qilish.
- `L217` Ketma-ket ikki reaktiv sakrash
- `L217` Ketma-ket ikki hujum zarbasi
- `L218` Birinchi to‘pni uring.
- `L218` Hujum chizig‘iga tez qayting.
- `L218` Ikkinchi uzatilgan to‘pga yugurib kelib, zarba bering.
- `L219` Ortga qaytayotganda yuzingiz to‘rga qarab tursin.
- `L219` Ikkinchi sakrashni ham bor kuch bilan bajaring.
- `L223` Joyidan sakrab to‘siq qo‘yish
- `L224` To‘r oldida sakrab, qo‘llarni to‘rdan oshirib to‘siq qo‘yish.
- `L225` Joyidan tik sakrash
- `L225` Yakka to‘siq
- `L226` To‘rdan bir qarich narida turing.
- `L226` Qo‘llarni yelka balandligida tuting.
- `L226` Sakrab, qo‘llarni to‘r ustidan raqib maydoni tomon uzating.
- `L227` Barmoqlarni keng oching.
- `L227` To‘rga tegmang.
- `L231` Yon qadam va to‘siq
- `L232` Yon qadamlar bilan siljib, so‘ng sakrab to‘siq qo‘yish.
- `L233` Konkichi usulida sakrash
- `L233` Siljib to‘siq qo‘yish
- `L234` Markazda turing.
- `L234` Murabbiy ishorasiga ko‘ra yon tomonga 2 qadam tashlang.
- `L234` Harakatni nazorat bilan to‘xtatib, darhol sakrab to‘siq qo‘ying.
- `L235` Qadam tashlashda oyoqlarni chalishtirib yubormang.
- `L235` Sakrashdan oldin uzoq to‘xtab qolmang.
- `L239` Chap, markaz va o‘ng tomonda to‘siq qo‘yish
- `L240` To‘r bo‘ylab uch nuqtada ketma-ket sakrab to‘siq qo‘yish.
- `L241` Ketma-ket tezkor sakrashlar
- `L241` Uch zonada to‘siq qo‘yish
- `L242` Chap zonada sakrab to‘siq qo‘ying.
- `L242` Qo‘ngandan keyin markazga siljib, yana sakrang.
- `L242` O‘ng zonada uchinchi marta sakrab to‘siq qo‘ying.
- `L243` Har safar qo‘llarni to‘r ustidan oshiring.
- `L243` Qo‘ngandan keyin to‘xtab qolmang.

## O‘lchovlar va baholar

_Measurement names, units, how-to hints, validation messages, rating words._ · `src/domain/metrics.ts`

- `L20` Antropometrik
- `L20` Bo‘y va tana vazni kabi o‘lchovlar mashg‘ulot yuklamasi va platforma balandligini tanlashda yordam beradi.
- `L21` Morfofunksional
- `L21` Yurak-qon tomir tizimining zo‘riqishdan keyin tiklanish qobiliyatini baholash.
- `L22` Jismoniy tayyorgarlik
- `L22` Sakrash qobiliyati, tezkor kuch va chaqqonlikni baholash testlari.
- `L26` Bo‘y
- `L26` sm
- `L26` Poyabzalsiz, tik turgan holda o‘lchang.
- `L27` Tana vazni
- `L27` kg
- `L27` Ertalab, mashg‘ulotdan oldin o‘lchang.
- `L28` Qo‘l yetadigan balandlik
- `L28` sm
- `L28` Devor yonida turib, bir qo‘lni yuqoriga cho‘zgan holda o‘lchang.
- `L29` Tinch holatdagi yurak urishi
- `L29` marta/daq.
- `L29` Ertalab o‘rningizdan turmasdan, yurak urishini 1 daqiqa davomida sanang.
- `L30` Rufye indeksi
- `L30` 30 soniyada 30 marta o‘tirib-turgandan so‘ng yurak urishining tiklanishini baholash.
- `L31` Joyidan yuqoriga sakrash
- `L31` sm
- `L31` Qo‘llarni siltab 3 marta sakrang va eng yaxshi natijani kiriting.
- `L32` Hujumdagi sakrash balandligi
- `L32` sm
- `L32` Yugurib kelib sakraganda qo‘l yetgan eng yuqori nuqtani o‘lchang.
- `L33` Joyidan uzunlikka sakrash
- `L33` sm
- `L33` Ikki oyoqda depsinib sakrang va eng yaxshi urinish natijasini kiriting.
- `L34` Moki yugurish 6×5 m
- `L34` Voleybol maydonida yo‘nalishni tez o‘zgartirish qobiliyatini o‘lchash.
- `L45` Raqam kiriting
- `L46` Qiymat {min} dan {max} gacha bo‘lishi kerak
- `L92` A’lo
- `L92` Yaxshi
- `L93` Qoniqarli
- `L94` Yaxshilash kerak
- `L94` Past
- `L97` Past
- `L97` O‘rta
- `L97` Yuqori

## Individual yuklama izohlari

_Level names and the "how the load was adapted" explanations._ · `src/domain/load.ts`

- `L33` Boshlang‘ich
- `L34` O‘rta
- `L35` Yuqori
- `L47` Joyidan sakrash: {verticalJump} sm. Yosh me’yoriga ko‘ra daraja: {…}.
- `L49` Joyidan sakrash natijasi hali kiritilmagan. Shu sababli yuklama boshlang‘ich darajada belgilandi.
- `L57` Rufye indeksi: {rufier} ({…}). Dam olish vaqti 1,5 baravar oshirildi va yuklama darajasi bir pog‘ona pasaytirildi.
- `L60` Rufye indeksi: {rufier} (qoniqarli). Dam olish vaqti 20% ga uzaytirildi.
- `L66` Tinch holatdagi yurak urishi: {restingHr}. Tiklanish sust bo‘lgani uchun to‘plamlar orasidagi dam olish vaqti uzaytirildi.
- `L77` 13 yoshdan kichik sportchilar uchun mashg‘ulotdagi sakrashlar soni va platforma balandligi cheklangan.
- `L85` Tana vazni indeksi: {index}. Bo‘g‘imlarga tushadigan yukni kamaytirish uchun mashg‘ulot hajmi 15% ga qisqartirildi va platforma balandligi pasaytirildi.

## Murabbiy tavsiyalari va ACWR

_ACWR zone names and every coach recommendation._ · `src/domain/analytics.ts`

- `L76` Ma’lumot yetarli emas
- `L77` Yuklama me’yordan past
- `L78` Tavsiya etilgan oraliq
- `L79` Yuqori
- `L80` Jarohatlanish xavfi yuqori
- `L130` Birinchi mashg‘ulot
- `L130` Mashg‘ulot natijalarini saqlaganingizdan keyin yuklamani kuzatish boshlanadi. Avval 1-bosqichdagi to‘g‘ri qo‘nish mashqlarini bajaring.
- `L135` Yuklama keskin oshgan
- `L135` So‘nggi 7 kundagi yuklama 4 haftalik o‘rtachadan {ratio} baravar yuqori. Keyingi 2–3 mashg‘ulotda sakrashlar sonini 20–30% ga kamaytiring.
- `L137` Yuklama pasaygan
- `L137` Bu hafta odatdagidan kamroq mashq qildingiz. Tanaffusdan keyin yuklamani birdaniga emas, asta-sekin oshiring.
- `L145` Charchoq belgilari
- `L145` So‘nggi 3 mashg‘ulotdagi o‘rtacha zo‘riqish darajasi (RPE): {…}. Bir kun yengil mashq qiling yoki to‘liq dam oling.
- `L148` Texnikaga e’tibor
- `L148` Harakat texnikasi uchun qo‘yilgan baho pasaygan. Yuklamani oshirmang: platforma balandligini kamaytiring va to‘g‘ri qo‘nish mashqlarini takrorlang.
- `L154` {block}-bosqichda qolish
- `L154` Mashg‘ulotlar soni yetarli, ammo texnika bo‘yicha o‘rtacha baho {…} (talab: {techniqueAvg}). Keyingi bosqichga o‘tishdan oldin texnikani yaxshilang.
- `L158` {block}-bosqich ochildi
- `L158` {length} ta bosqich o‘zlashtirildi. Yangi bosqichning birinchi haftasida mashg‘ulot hajmini belgilangan me’yorning 80% idan boshlang.
- `L166` Sakrovchanlik o‘smoqda
- `L166` Joyidan sakrash natijasi {…} sm dan {last} sm gacha yaxshilandi. Hozirgi mashg‘ulot usuli natija beryapti.
- `L169` Natija to‘xtab qolgan
- `L169` So‘nggi uchta testda sakrash natijasi oshmadi. Mashqlarni o‘zgartiring yoki bir hafta yengillashtirilgan yuklama bilan shug‘ullaning.
- `L175` Boshlang‘ich test
- `L175` Yuklamani sizga moslash uchun bo‘y, vazn, Rufye indeksi va joyidan sakrash natijalarini kiriting.
- `L177` Qayta test vaqti
- `L177` So‘nggi o‘lchovdan beri 4 haftadan ortiq vaqt o‘tdi. O‘zgarishlarni kuzatish uchun testlarni qayta bajaring.

## CSV hisobot ustunlari

_Column headers in the exported files._ · `src/domain/csv.ts`

- `L20` Sportchi
- `L20` Sana
- `L20` Turi
- `L20` Bosqich
- `L20` Mashqlar
- `L20` Sakrashlar
- `L20` Davomiylik (daq.)
- `L20` RPE
- `L20` Mashg‘ulot yuklamasi (AU)
- `L20` Texnika
- `L20` Izoh
- `L23` Plyometrika
- `L23` O‘yin elementlari
- `L30` Sportchi
- `L30` Sana

## Ulashish

_Android share sheet title._ · `src/core/exportFile.ts`

- `L8` Flyball hisoboti

## Oy nomlari

_Short month names used in dates (e.g. 29-okt)._ · `src/core/dates.ts`

- `L1` yan
- `L1` fev
- `L1` mar
- `L1` apr
- `L1` may
- `L1` iyun
- `L1` iyul
- `L1` avg
- `L1` sen
- `L1` okt
- `L1` noy
- `L1` dek

## Umumiy elementlar

_Shared buttons and labels._ · `src/ui/kit.tsx`

- `L12` Orqaga
- `L83` Intensivlik: {…}

## Tasdiqlash oynasi

_Confirm dialog._ · `src/ui/confirm.tsx`

- `L57` Bekor qilish

## Diagrammalar

_Screen-reader labels of the charts._ · `src/ui/charts.tsx`

- `L19` Haftalar bo‘yicha ustunli diagramma
- `L62` Natijalar dinamikasi

## Animatsiya

_Screen-reader label of the animated figure._ · `src/ui/AthleteMotion.tsx`

- `L10` Mashq harakatining namunasi: {label}

## Video

_Label before the video credit._ · `src/ui/art.tsx`

- `L53` Video manbasi:

