/* ============================================================
   Nihongo Cards — Daily Japanese Greeting Flashcards
   New batch of 5 cards unlocked every day at 5:45 AM Nepal Time
   ============================================================ */

// ===== NEPAL TIMEZONE OFFSET =====
const NEPAL_OFFSET_MIN = 5 * 60 + 45; // UTC+5:45

function getNepalDate() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalMs = utcMs + NEPAL_OFFSET_MIN * 60000;
  const nepal = new Date(nepalMs);
  // Before 5:45 AM Nepal time counts as "previous day's session"
  if (nepal.getHours() < 5 || (nepal.getHours() === 5 && nepal.getMinutes() < 45)) {
    nepal.setDate(nepal.getDate() - 1);
  }
  return nepal.toISOString().slice(0, 10); // YYYY-MM-DD
}

function msUntilNextUnlock() {
  const now = new Date();
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const nepalMs = utcMs + NEPAL_OFFSET_MIN * 60000;
  const nepal = new Date(nepalMs);

  // Next unlock: tomorrow at 5:45 AM Nepal
  const next = new Date(nepalMs);
  next.setHours(5, 45, 0, 0);
  if (nepal.getHours() > 5 || (nepal.getHours() === 5 && nepal.getMinutes() >= 45)) {
    next.setDate(next.getDate() + 1);
  }
  const diffNepalMs = next - nepal;
  return diffNepalMs; // ms until next unlock
}

// ===== MASTER CARD LIBRARY (60 cards = 12 days worth) =====
// Each card: { id, theme, japanese, nepali, romaji, english, habit, themeKey }
// themeKey cycles through: morning | mealtime | leaving | returning | bedtime
const MASTER_LIBRARY = [
  // ---- DAY 1 (original set) ----
  { id:'d1c1', theme:'Morning Start',      japanese:'おはようございます',   nepali:'शुभ बिहानी',              romaji:'Ohayou gozaimasu',    english:'Good Morning',          habit:'Say this when you wake up.',      themeKey:'morning'   },
  { id:'d1c2', theme:'Mealtime Gratitude', japanese:'いただきます',          nepali:'म खान सुरु गर्दैछु',     romaji:'Itadakimasu',         english:'I humbly receive',      habit:'Say before eating.',              themeKey:'mealtime'  },
  { id:'d1c3', theme:'Leaving House',      japanese:'行ってきます',           nepali:'म गएर आउँछु',            romaji:'Ittekimasu',          english:"I'll go and come back", habit:'Say when leaving home.',          themeKey:'leaving'   },
  { id:'d1c4', theme:'Returning Home',     japanese:'ただいま',              nepali:'म आएँ',                  romaji:'Tadaima',             english:"I'm back",              habit:'Say when you return home.',       themeKey:'returning' },
  { id:'d1c5', theme:'Bedtime Routine',    japanese:'おやすみなさい',        nepali:'शुभ रात्री',              romaji:'Oyasuminasai',        english:'Good Night',            habit:'Say before sleeping.',            themeKey:'bedtime'   },

  // ---- DAY 2 ----
  { id:'d2c1', theme:'Thank You',          japanese:'ありがとうございます',   nepali:'धेरै धन्यवाद',            romaji:'Arigatou gozaimasu',  english:'Thank you very much',   habit:'Thank someone today.',            themeKey:'morning'   },
  { id:'d2c2', theme:'You\'re Welcome',    japanese:'どういたしまして',       nepali:'कुनै कुरा छैन',           romaji:'Dou itashimashite',   english:"You're welcome",        habit:'Respond graciously today.',       themeKey:'mealtime'  },
  { id:'d2c3', theme:'Please',             japanese:'お願いします',           nepali:'कृपया',                  romaji:'Onegaishimasu',       english:'Please / I ask of you', habit:'Use when requesting help.',       themeKey:'leaving'   },
  { id:'d2c4', theme:'I\'m Sorry',         japanese:'すみません',             nepali:'माफ गर्नुस्',             romaji:'Sumimasen',           english:'Excuse me / Sorry',     habit:'Apologise if needed today.',      themeKey:'returning' },
  { id:'d2c5', theme:'I Understand',       japanese:'わかりました',           nepali:'मैले बुझें',             romaji:'Wakarimashita',       english:'I understand',          habit:'Say when you understand.',        themeKey:'bedtime'   },

  // ---- DAY 3 ----
  { id:'d3c1', theme:'Nice to Meet You',   japanese:'はじめまして',           nepali:'भेट भएकोमा खुशी छु',     romaji:'Hajimemashite',       english:'Nice to meet you',      habit:'Introduce yourself today.',       themeKey:'morning'   },
  { id:'d3c2', theme:'How Are You?',       japanese:'お元気ですか',           nepali:'तपाईं कस्तो हुनुहुन्छ?', romaji:'Ogenki desu ka',      english:'How are you?',          habit:'Ask someone how they are.',       themeKey:'mealtime'  },
  { id:'d3c3', theme:'I\'m Fine',          japanese:'元気です',              nepali:'म ठीक छु',               romaji:'Genki desu',          english:'I am fine/well',        habit:'Respond positively today.',       themeKey:'leaving'   },
  { id:'d3c4', theme:'See You Later',      japanese:'またね',                nepali:'फेरि भेटौँला',           romaji:'Mata ne',             english:'See you later',         habit:'Say goodbye to a friend.',        themeKey:'returning' },
  { id:'d3c5', theme:'Take Care',          japanese:'お大事に',              nepali:'ख्याल राख्नुस्',         romaji:'Odaiji ni',           english:'Take care',             habit:'Tell someone to take care.',      themeKey:'bedtime'   },

  // ---- DAY 4 ----
  { id:'d4c1', theme:'Let\'s Eat',         japanese:'いただきましょう',       nepali:'खाउँ न',                 romaji:'Itadakimashou',       english:"Let's eat",             habit:'Invite family to eat together.',  themeKey:'morning'   },
  { id:'d4c2', theme:'It was Delicious',   japanese:'ごちそうさまでした',     nepali:'खाना मिठो थियो',         romaji:'Gochisousama deshita',english:'Thank you for the meal',habit:'Say after every meal.',           themeKey:'mealtime'  },
  { id:'d4c3', theme:'I\'m Going Out',     japanese:'出かけます',             nepali:'म बाहिर जाँदैछु',        romaji:'Dekakemasu',          english:"I'm going out",         habit:'Announce before leaving.',        themeKey:'leaving'   },
  { id:'d4c4', theme:'Welcome Back',       japanese:'お帰り',                nepali:'स्वागत छ',               romaji:'Okaeri',              english:'Welcome back',          habit:'Greet returning family members.', themeKey:'returning' },
  { id:'d4c5', theme:'Sweet Dreams',       japanese:'いい夢を',              nepali:'राम्रो सपना देख्नुस्',   romaji:'Ii yume wo',          english:'Sweet dreams',          habit:'Wish someone good dreams.',       themeKey:'bedtime'   },

  // ---- DAY 5 ----
  { id:'d5c1', theme:'Good Afternoon',     japanese:'こんにちは',             nepali:'नमस्कार',                romaji:'Konnichiwa',          english:'Hello / Good Afternoon', habit:'Greet people during the day.',   themeKey:'morning'   },
  { id:'d5c2', theme:'Good Evening',       japanese:'こんばんは',             nepali:'शुभ सन्ध्या',            romaji:'Konbanwa',            english:'Good evening',          habit:'Greet people in the evening.',    themeKey:'mealtime'  },
  { id:'d5c3', theme:'Be Careful',         japanese:'気をつけて',             nepali:'सावधान रहनुस्',          romaji:'Ki wo tsukete',       english:'Be careful / Take care',habit:'Say before someone travels.',     themeKey:'leaving'   },
  { id:'d5c4', theme:'I\'m Home',          japanese:'ただいま帰りました',     nepali:'म घर आएँ',              romaji:'Tadaima kaerimashita',english:'I have returned home',  habit:'Say the full phrase today.',      themeKey:'returning' },
  { id:'d5c5', theme:'Rest Well',          japanese:'ゆっくり休んでね',       nepali:'राम्ररी आराम गर्नुस्',  romaji:'Yukkuri yasunde ne',  english:'Rest well',             habit:'Tell a tired person to rest.',    themeKey:'bedtime'   },

  // ---- DAY 6 ----
  { id:'d6c1', theme:'Good Luck',          japanese:'頑張って',              nepali:'शुभकामना',               romaji:'Ganbatte',            english:'Do your best / Good luck', habit:'Encourage someone today.',     themeKey:'morning'   },
  { id:'d6c2', theme:'No Problem',         japanese:'大丈夫です',             nepali:'ठीक छ',                  romaji:'Daijoubu desu',       english:"It's alright / No problem",habit:'Use when reassuring others.',  themeKey:'mealtime'  },
  { id:'d6c3', theme:'Just a Moment',      japanese:'少し待ってください',     nepali:'एक क्षण पर्खनुस्',      romaji:'Sukoshi matte kudasai',english:'Please wait a moment',  habit:'Say politely when busy.',         themeKey:'leaving'   },
  { id:'d6c4', theme:'I\'m Tired',         japanese:'疲れました',             nepali:'म थाकें',               romaji:'Tsukaremashita',      english:'I am tired',            habit:'Express how you feel honestly.',  themeKey:'returning' },
  { id:'d6c5', theme:'Sleep Well',         japanese:'ゆっくり寝てね',         nepali:'राम्ररी सुत्नुस्',      romaji:'Yukkuri nete ne',     english:'Sleep well',            habit:'Wish family a good night.',       themeKey:'bedtime'   },

  // ---- DAY 7 ----
  { id:'d7c1', theme:'Congratulations',    japanese:'おめでとうございます',   nepali:'बधाई छ',                 romaji:'Omedetou gozaimasu',  english:'Congratulations',       habit:'Congratulate someone today.',     themeKey:'morning'   },
  { id:'d7c2', theme:'Enjoy Your Meal',    japanese:'召し上がれ',             nepali:'खाना मज्जाले खानुस्',   romaji:'Meshiagare',          english:'Please enjoy your meal',habit:'Say when serving food.',          themeKey:'mealtime'  },
  { id:'d7c3', theme:'Have a Safe Trip',   japanese:'気をつけて行ってらっしゃい', nepali:'सुरक्षित जानुस्',    romaji:'Ki wo tsukete itterasshai', english:'Have a safe trip',  habit:'Say to departing loved ones.',    themeKey:'leaving'   },
  { id:'d7c4', theme:'You\'re Back!',      japanese:'おかえりなさい',         nepali:'स्वागत छ तपाईंलाई',     romaji:'Okaerinasai',         english:'Welcome home (formal)',  habit:'Welcome someone home warmly.',  themeKey:'returning' },
  { id:'d7c5', theme:'Don\'t Stay Up Late',japanese:'夜更かしはだめよ',       nepali:'ढिलो नसुत्नुस्',        romaji:'Yofukashi wa dame yo', english:'Don\'t stay up too late', habit:'Remind yourself to sleep early.', themeKey:'bedtime'  },

  // ---- DAY 8 ----
  { id:'d8c1', theme:'Let\'s Do Our Best', japanese:'一緒に頑張りましょう',   nepali:'सँगै मिहिनेत गरौँ',     romaji:'Issho ni ganbarimassho', english:"Let's try our best together", habit:'Encourage a teammate.',     themeKey:'morning'   },
  { id:'d8c2', theme:'I\'m Hungry',        japanese:'お腹が空きました',       nepali:'म भोकाएँ',              romaji:'Onaka ga sukimashita',english:'I am hungry',           habit:'Express hunger politely.',        themeKey:'mealtime'  },
  { id:'d8c3', theme:'On My Way',          japanese:'もう出発します',         nepali:'म अहिले हिँड्छु',       romaji:'Mou shuppatsu shimasu',english:'I\'m departing now',    habit:'Send a message before leaving.',  themeKey:'leaving'   },
  { id:'d8c4', theme:'Glad to Be Home',    japanese:'やっと帰れた',          nepali:'आखिर घर आएँ',           romaji:'Yatto kaereta',       english:'Finally made it home',  habit:'Appreciate coming home.',         themeKey:'returning' },
  { id:'d8c5', theme:'Time to Sleep',      japanese:'もう寝る時間です',       nepali:'अब सुत्ने समय भयो',     romaji:'Mou neru jikan desu',  english:'It\'s time to sleep',   habit:'Set a regular sleep schedule.',   themeKey:'bedtime'   },

  // ---- DAY 9 ----
  { id:'d9c1', theme:'Good Morning Sun',   japanese:'朝日がきれいですね',     nepali:'बिहानको घाम सुन्दर छ',  romaji:'Asahi ga kirei desu ne',english:'The morning sun is beautiful', habit:'Admire nature today.',      themeKey:'morning'   },
  { id:'d9c2', theme:'Shall We Eat?',      japanese:'食べませんか',           nepali:'खाने हो?',               romaji:'Tabemasen ka',        english:'Shall we eat?',         habit:'Invite a friend for lunch.',      themeKey:'mealtime'  },
  { id:'d9c3', theme:'I\'ll Be Back Soon', japanese:'すぐ戻ります',          nepali:'म छिट्टै फर्किन्छु',    romaji:'Sugu modorimasu',     english:'I\'ll be back soon',    habit:'Say before a short trip.',        themeKey:'leaving'   },
  { id:'d9c4', theme:'I Missed Home',      japanese:'家が恋しかった',         nepali:'घर मिस्स भयो',          romaji:'Ie ga koishikatta',   english:'I missed home',         habit:'Tell family you missed them.',    themeKey:'returning' },
  { id:'d9c5', theme:'Peaceful Night',     japanese:'静かな夜ですね',         nepali:'शान्त रात छ',            romaji:'Shizuka na yoru desu ne', english:'What a peaceful night', habit:'Enjoy the quiet evening.',     themeKey:'bedtime'   },

  // ---- DAY 10 ----
  { id:'d10c1', theme:'Wake Up!',           japanese:'起きなさい',            nepali:'उठ्नुस्!',              romaji:'Okinasai',            english:'Wake up!',              habit:'Wake up on time tomorrow.',       themeKey:'morning'   },
  { id:'d10c2', theme:'Let\'s Cook',        japanese:'料理しましょう',        nepali:'खाना पकाउँ',             romaji:'Ryouri shimashou',    english:"Let's cook",            habit:'Cook a meal at home today.',      themeKey:'mealtime'  },
  { id:'d10c3', theme:'Don\'t Forget',      japanese:'忘れないでね',          nepali:'नबिर्सनुस् है',          romaji:'Wasurenaide ne',      english:'Don\'t forget',         habit:'Set a reminder for yourself.',    themeKey:'leaving'   },
  { id:'d10c4', theme:'Home Sweet Home',    japanese:'やっぱり家が一番',      nepali:'घर नै सबभन्दा राम्रो',  romaji:'Yappari ie ga ichiban', english:'Home is the best',     habit:'Appreciate your home today.',     themeKey:'returning' },
  { id:'d10c5', theme:'Tomorrow is New',    japanese:'明日も頑張ろう',        nepali:'भोलि पनि मिहिनेत गरौँ', romaji:'Ashita mo ganbarou',  english:'Let\'s do our best tomorrow', habit:'Plan something good for tomorrow.', themeKey:'bedtime' },

  // ---- DAY 11 ----
  { id:'d11c1', theme:'Morning Exercise',   japanese:'朝の運動をしましょう',  nepali:'बिहान व्यायाम गरौँ',   romaji:'Asa no undou wo shimashou', english:'Let\'s exercise in the morning', habit:'Do 10 min of exercise.', themeKey:'morning'   },
  { id:'d11c2', theme:'Enjoy the Food',     japanese:'おいしそうですね',      nepali:'मिठो देखिन्छ',          romaji:'Oishisou desu ne',    english:'That looks delicious',  habit:'Compliment food today.',          themeKey:'mealtime'  },
  { id:'d11c3', theme:'Safe Travels',       japanese:'どうぞお気をつけて',    nepali:'राम्ररी जानुस्',        romaji:'Douzo oki wo tsukete', english:'Please travel safely',  habit:'Wish family safe travels.',       themeKey:'leaving'   },
  { id:'d11c4', theme:'I\'m Exhausted',     japanese:'くたくたです',          nepali:'म एकदम थाकें',          romaji:'Kutakuta desu',       english:'I\'m completely tired', habit:'Rest without guilt today.',       themeKey:'returning' },
  { id:'d11c5', theme:'Lights Out',         japanese:'電気を消してください',  nepali:'बत्ती निभाउनुस्',       romaji:'Denki wo keshite kudasai', english:'Please turn off the lights', habit:'Save energy at night.',     themeKey:'bedtime'   },

  // ---- DAY 12 ----
  { id:'d12c1', theme:'Fresh Start',        japanese:'今日も素晴らしい一日を', nepali:'आज पनि राम्रो दिन होस्', romaji:'Kyou mo subarashii ichinichi wo', english:'Have a wonderful day today', habit:'Set a positive intention.', themeKey:'morning'  },
  { id:'d12c2', theme:'Eat Together',       japanese:'一緒に食べましょう',    nepali:'सँगै खाउँ',             romaji:'Issho ni tabemashou',  english:"Let's eat together",    habit:'Share a meal with family.',       themeKey:'mealtime'  },
  { id:'d12c3', theme:'I\'m Off Now',       japanese:'行ってまいります',      nepali:'म जाँदैछु',             romaji:'Itte mairimasu',       english:'I am off now (formal)', habit:'Use the respectful form today.',  themeKey:'leaving'   },
  { id:'d12c4', theme:'Back at Last',       japanese:'ようやく帰ってきた',    nepali:'अन्तमा आएँ',            romaji:'Youyaku kaette kita',  english:'Finally back',          habit:'Notice the joy of returning.',    themeKey:'returning' },
  { id:'d12c5', theme:'Dream of Japan',     japanese:'日本の夢を見てね',      nepali:'जापानको सपना देख्नुस्', romaji:'Nihon no yume wo mite ne', english:'Dream of Japan',       habit:'Imagine visiting Japan.',         themeKey:'bedtime'   },
];

const CARDS_PER_DAY = 5;

// ===== STORAGE KEYS =====
const STORAGE_KEY_UNLOCKED = 'nihongo_unlocked_days';
const STORAGE_KEY_VIEWED   = 'nihongo_viewed_day';

// ===== STATE =====
let allUnlockedCards = []; // All cards visible so far
let currentDayCards  = []; // Cards for the selected day
let currentIndex     = 0;
let isAnimating      = false;
let activeDayIndex   = 0;  // Which day is user viewing
let schedulerTimer   = null;

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  unlockDueCards();
  buildDayPanel();
  loadDayCards(activeDayIndex);
  scheduleNextUnlock();
  bindEvents();
});

// ===== UNLOCK LOGIC =====
// Returns how many day-batches should be unlocked so far,
// counting from the app's epoch (Day 1 = 2026-04-22)
const EPOCH_DATE = '2026-04-22'; // Day 1

function daysBetween(isoA, isoB) {
  const a = new Date(isoA + 'T00:00:00Z');
  const b = new Date(isoB + 'T00:00:00Z');
  return Math.round((b - a) / 86400000);
}

function unlockDueCards() {
  const today = getNepalDate();
  const daysElapsed = Math.max(0, daysBetween(EPOCH_DATE, today));
  // Day 1 is index 0, meaning batches 0..daysElapsed are unlocked
  const batchesToUnlock = Math.min(daysElapsed + 1, Math.floor(MASTER_LIBRARY.length / CARDS_PER_DAY));

  // Save to storage
  localStorage.setItem(STORAGE_KEY_UNLOCKED, String(batchesToUnlock));

  // Flatten unlocked cards
  allUnlockedCards = MASTER_LIBRARY.slice(0, batchesToUnlock * CARDS_PER_DAY);

  // Default: view the latest day
  activeDayIndex = batchesToUnlock - 1;
}

function getDayCards(dayIndex) {
  const start = dayIndex * CARDS_PER_DAY;
  return allUnlockedCards.slice(start, start + CARDS_PER_DAY);
}

function getTotalUnlockedDays() {
  return Math.ceil(allUnlockedCards.length / CARDS_PER_DAY);
}

// ===== DAY PANEL =====
function buildDayPanel() {
  const panel = document.getElementById('dayPanel');
  const total = getTotalUnlockedDays();

  const items = Array.from({ length: total }, (_, i) => {
    const label = i === total - 1 ? '⭐ Today' : `Day ${i + 1}`;
    const dateLabel = getDayDateLabel(i);
    return `<button class="day-btn ${i === activeDayIndex ? 'active' : ''}" 
              data-day="${i}" onclick="switchDay(${i})" title="${dateLabel}">
              ${label}
            </button>`;
  }).join('');

  panel.innerHTML = `<div class="day-panel-inner">${items}</div>`;

  // Show countdown to next unlock
  updateCountdown();
}

function getDayDateLabel(dayIndex) {
  const d = new Date(EPOCH_DATE + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + dayIndex);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function switchDay(dayIndex) {
  activeDayIndex = dayIndex;
  document.querySelectorAll('.day-btn').forEach((b, i) =>
    b.classList.toggle('active', i === dayIndex)
  );
  loadDayCards(dayIndex);
}

// ===== LOAD CARDS FOR A DAY =====
function loadDayCards(dayIndex) {
  currentDayCards = getDayCards(dayIndex);
  currentIndex = 0;
  renderCards();
  renderDots();
  updateView();
  updateDayHeading(dayIndex);
}

function updateDayHeading(dayIndex) {
  const total = getTotalUnlockedDays();
  const isToday = dayIndex === total - 1;
  const label = isToday ? `Today's Cards` : `Day ${dayIndex + 1} Cards`;
  document.getElementById('dayHeading').textContent = label;
  document.getElementById('dayDateLabel').textContent = getDayDateLabel(dayIndex);
}

// ===== PARTICLE BACKGROUND =====
function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 25; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`;
    p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 15 + 10}s`;
    p.style.animationDelay = `${Math.random() * 10}s`;
    container.appendChild(p);
  }
}

// ===== RENDER CARDS =====
const THEME_IMAGES = {
  morning:   'images/morning.png',
  mealtime:  'images/mealtime.png',
  leaving:   'images/leaving.png',
  returning: 'images/returning.png',
  bedtime:   'images/bedtime.png',
};

function renderCards() {
  const container = document.getElementById('cardContainer');
  container.innerHTML = currentDayCards.map((card, i) => `
    <div class="nihongo-card hidden" data-theme="${card.themeKey}" data-index="${i}" id="card-${card.id}">
      <div class="card-accent-bar"></div>
      <div class="card-bg">
        <img src="${THEME_IMAGES[card.themeKey]}" alt="${card.theme} background" loading="eager" />
      </div>
      <div class="card-overlay"></div>
      <div class="card-content">
        <!-- Top -->
        <div class="card-top">
          <div class="card-badge">
            <span class="badge-dot"></span>
            CARD ${i + 1}
          </div>
          <button class="btn-audio" onclick="playAudio(${i})" title="Listen to pronunciation" id="btnAudio-${i}">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/>
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07"/>
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14"/>
            </svg>
          </button>
        </div>

        <!-- Middle -->
        <div class="card-middle">
          <div class="card-japanese">${card.japanese}</div>
          <div class="card-theme">${card.theme}</div>
          <div class="card-nepali">${card.nepali}</div>
          <div class="card-romaji">(${card.romaji})</div>
        </div>

        <!-- Bottom -->
        <div class="card-bottom">
          <div class="detail-row">
            <span class="detail-icon">🇬🇧</span>
            <span class="detail-text"><span class="detail-label">Meaning:</span> "${card.english}"</span>
          </div>
          <div class="detail-row">
            <span class="detail-icon">🌸</span>
            <span class="detail-text"><span class="detail-label">Habit:</span> ${card.habit}</span>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

// ===== RENDER DOTS =====
function renderDots() {
  const container = document.getElementById('dotIndicators');
  container.innerHTML = currentDayCards.map((_, i) =>
    `<div class="dot" data-index="${i}" onclick="goToCard(${i})"></div>`
  ).join('');
}

// ===== UPDATE VIEW =====
function updateView() {
  const cards = document.querySelectorAll('.nihongo-card');
  const dots  = document.querySelectorAll('.dot');

  cards.forEach((card, i) => {
    card.classList.remove('active', 'exit-left', 'exit-right', 'hidden');
    card.classList.add(i === currentIndex ? 'active' : 'hidden');
  });
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));
}

// ===== NAVIGATION =====
function navigate(direction) {
  if (isAnimating || currentDayCards.length === 0) return;
  isAnimating = true;

  const cards = document.querySelectorAll('.nihongo-card');
  const dots  = document.querySelectorAll('.dot');
  const oldIndex = currentIndex;

  currentIndex = direction === 'next'
    ? (currentIndex + 1) % currentDayCards.length
    : (currentIndex - 1 + currentDayCards.length) % currentDayCards.length;

  cards[oldIndex].classList.remove('active', 'hidden');
  cards[oldIndex].classList.add(direction === 'next' ? 'exit-left' : 'exit-right');
  cards[currentIndex].classList.remove('hidden', 'exit-left', 'exit-right');
  cards[currentIndex].classList.add('active');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

  setTimeout(() => {
    cards[oldIndex].classList.remove('exit-left', 'exit-right');
    cards[oldIndex].classList.add('hidden');
    isAnimating = false;
  }, 600);
}

function goToCard(index) {
  if (index === currentIndex || isAnimating) return;
  const direction = index > currentIndex ? 'next' : 'prev';
  const cards = document.querySelectorAll('.nihongo-card');
  const dots  = document.querySelectorAll('.dot');
  const oldIndex = currentIndex;
  currentIndex = index;
  isAnimating = true;

  cards[oldIndex].classList.remove('active', 'hidden');
  cards[oldIndex].classList.add(direction === 'next' ? 'exit-left' : 'exit-right');
  cards[currentIndex].classList.remove('hidden', 'exit-left', 'exit-right');
  cards[currentIndex].classList.add('active');
  dots.forEach((dot, i) => dot.classList.toggle('active', i === currentIndex));

  setTimeout(() => {
    cards[oldIndex].classList.remove('exit-left', 'exit-right');
    cards[oldIndex].classList.add('hidden');
    isAnimating = false;
  }, 600);
}

// ===== SCHEDULER =====
function scheduleNextUnlock() {
  const ms = msUntilNextUnlock();
  console.log(`Next card unlock in ${Math.round(ms / 60000)} minutes (Nepal 5:45 AM)`);
  if (schedulerTimer) clearTimeout(schedulerTimer);
  schedulerTimer = setTimeout(() => {
    unlockDueCards();
    buildDayPanel();
    loadDayCards(activeDayIndex);
    showToastMessage('🎉 5 new cards unlocked!', 3500);
    scheduleNextUnlock(); // reschedule for the day after
  }, ms);
}

// ===== COUNTDOWN DISPLAY =====
function updateCountdown() {
  const el = document.getElementById('countdownTimer');
  if (!el) return;

  function tick() {
    const ms = msUntilNextUnlock();
    const totalSec = Math.floor(ms / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    el.textContent = `Next unlock: ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }
  tick();
  setInterval(tick, 1000);
}

// ===== AUDIO =====
function playAudio(index) {
  const card = currentDayCards[index];
  if (!card) return;
  const btn = document.getElementById(`btnAudio-${index}`);

  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
    document.querySelectorAll('.btn-audio').forEach(b => b.classList.remove('playing'));
  }

  const utterance = new SpeechSynthesisUtterance(card.japanese);
  utterance.lang  = 'ja-JP';
  utterance.rate  = 0.85;
  utterance.pitch = 1.0;

  const voices = window.speechSynthesis.getVoices();
  const jaVoice = voices.find(v => v.lang.startsWith('ja'));
  if (jaVoice) utterance.voice = jaVoice;

  utterance.onstart = () => { btn && btn.classList.add('playing'); showToast('Playing audio…'); };
  utterance.onend   = () => { btn && btn.classList.remove('playing'); hideToast(); };
  utterance.onerror = () => { btn && btn.classList.remove('playing'); hideToast(); showToastMessage('Audio unavailable', 2000); };

  window.speechSynthesis.speak(utterance);
}

if (window.speechSynthesis) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => window.speechSynthesis.getVoices();
}

// ===== TOAST =====
function showToast(text) {
  const toast = document.getElementById('audioToast');
  document.getElementById('audioToastText').textContent = text;
  toast.classList.add('visible');
}
function hideToast() {
  document.getElementById('audioToast').classList.remove('visible');
}
function showToastMessage(text, duration) {
  showToast(text);
  setTimeout(hideToast, duration);
}

// ===== PDF — ALL 5 CARDS OF CURRENT DAY =====
async function downloadPdf() {
  const cards = getDayCards(activeDayIndex);
  if (!cards.length) return;

  showToast(`Generating PDF (${cards.length} cards)…`);

  try {
    const { jsPDF } = window.jspdf;
    const CARD_W_MM = 105; // A6 portrait
    const CARD_H_MM = 148;

    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: [CARD_W_MM, CARD_H_MM]
    });

    for (let i = 0; i < cards.length; i++) {
      const card = cards[i];
      const cardEl = document.getElementById(`card-${card.id}`);
      if (!cardEl) continue;

      showToast(`Rendering card ${i + 1} of ${cards.length}…`);

      // Temporarily make fully visible for capture
      const origClass = cardEl.className;
      cardEl.className = 'nihongo-card active';
      cardEl.style.position = 'relative';
      cardEl.style.zIndex = '999';
      await new Promise(r => setTimeout(r, 80)); // let paint settle

      const canvas = await html2canvas(cardEl, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#0a0a1a',
        logging: false,
      });

      // Restore
      cardEl.className = origClass;
      cardEl.style.position = '';
      cardEl.style.zIndex = '';

      const imgData = canvas.toDataURL('image/png');
      const imgAspect = canvas.height / canvas.width;
      const pdfImgH = CARD_W_MM * imgAspect;
      const yOffset  = (CARD_H_MM - Math.min(pdfImgH, CARD_H_MM)) / 2;

      if (i > 0) pdf.addPage([CARD_W_MM, CARD_H_MM], 'portrait');
      pdf.addImage(imgData, 'PNG', 0, yOffset, CARD_W_MM, Math.min(pdfImgH, CARD_H_MM));

      // Card label footer
      pdf.setFontSize(7);
      pdf.setTextColor(160, 160, 180);
      pdf.text(`Card ${i + 1}/${cards.length} — ${card.japanese} (${card.romaji})`, CARD_W_MM / 2, CARD_H_MM - 2, { align: 'center' });
    }

    const dayLabel = getDayDateLabel(activeDayIndex).replace(/\s+/g, '-');
    pdf.save(`nihongo-day${activeDayIndex + 1}-${dayLabel}.pdf`);
    showToastMessage(`✅ PDF saved! (${cards.length} cards)`, 3000);
  } catch (err) {
    console.error('PDF error:', err);
    showToastMessage('PDF generation failed', 2000);
  }
}

// ===== EVENT BINDINGS =====
function bindEvents() {
  document.getElementById('navPrev').addEventListener('click', () => navigate('prev'));
  document.getElementById('navNext').addEventListener('click', () => navigate('next'));
  document.getElementById('btnDownloadPdf').addEventListener('click', downloadPdf);

  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft')  navigate('prev');
    if (e.key === 'ArrowRight') navigate('next');
    if (e.key === ' ')          { e.preventDefault(); playAudio(currentIndex); }
  });

  let touchStartX = 0;
  const stage = document.getElementById('cardStage');
  stage.addEventListener('touchstart', e => { touchStartX = e.changedTouches[0].screenX; }, { passive: true });
  stage.addEventListener('touchend',   e => {
    const diff = touchStartX - e.changedTouches[0].screenX;
    if (Math.abs(diff) > 50) navigate(diff > 0 ? 'next' : 'prev');
  }, { passive: true });
}
