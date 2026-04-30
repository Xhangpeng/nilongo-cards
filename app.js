const START_DATE = new Date('2026-04-22T05:45:00+05:45'); // 5:45 AM Nepal Time

// ===== INFOGRAPHIC CARD LIBRARY (60 cards = 12 days) =====
// Each card has an 'icon' (Infographic watermark) and a 'colorHint' for the dynamic gradient.
const MASTER_LIBRARY = [
  // ---- DAY 1: Greetings ----
  { id:'d1c1', theme:'Greeting', japanese:'こんにちは', hiragana:'こんにちは', nepali:'नमस्ते', romaji:'Konnichiwa', english:'Hello', habit:'Say hello to someone new.', icon:'👋', colorHint:'#d35400' },
  { id:'d1c2', theme:'Greeting', japanese:'ありがとう', hiragana:'ありがとう', nepali:'धन्यवाद', romaji:'Arigatou', english:'Thank you', habit:'Express gratitude today.', icon:'🙏', colorHint:'#f39c12' },
  { id:'d1c3', theme:'Basic', japanese:'はい', hiragana:'はい', nepali:'हो / हजुर', romaji:'Hai', english:'Yes', habit:'Nod and say yes.', icon:'✅', colorHint:'#27ae60' },
  { id:'d1c4', theme:'Basic', japanese:'いいえ', hiragana:'いいえ', nepali:'होइन', romaji:'Iie', english:'No', habit:'Practice polite refusal.', icon:'❌', colorHint:'#c0392b' },
  { id:'d1c5', theme:'Greeting', japanese:'さようなら', hiragana:'さようなら', nepali:'बिदा', romaji:'Sayounara', english:'Goodbye', habit:'Wave goodbye politely.', icon:'🚶', colorHint:'#8e44ad' },

  // ---- DAY 2: Numbers 1-5 ----
  { id:'d2c1', theme:'Number', japanese:'一', hiragana:'いち', nepali:'एक', romaji:'Ichi', english:'One', habit:'Count one item.', icon:'1️⃣', colorHint:'#2980b9' },
  { id:'d2c2', theme:'Number', japanese:'二', hiragana:'に', nepali:'दुई', romaji:'Ni', english:'Two', habit:'Count two items.', icon:'2️⃣', colorHint:'#2980b9' },
  { id:'d2c3', theme:'Number', japanese:'三', hiragana:'さん', nepali:'तीन', romaji:'San', english:'Three', habit:'Count three items.', icon:'3️⃣', colorHint:'#2980b9' },
  { id:'d2c4', theme:'Number', japanese:'四', hiragana:'よん', nepali:'चार', romaji:'Yon / Shi', english:'Four', habit:'Count four items.', icon:'4️⃣', colorHint:'#2980b9' },
  { id:'d2c5', theme:'Number', japanese:'五', hiragana:'ご', nepali:'पाँच', romaji:'Go', english:'Five', habit:'Count five items.', icon:'5️⃣', colorHint:'#2980b9' },

  // ---- DAY 3: Numbers 6-10 ----
  { id:'d3c1', theme:'Number', japanese:'六', hiragana:'ろく', nepali:'छ', romaji:'Roku', english:'Six', habit:'Find six similar objects.', icon:'6️⃣', colorHint:'#34495e' },
  { id:'d3c2', theme:'Number', japanese:'七', hiragana:'なな', nepali:'सात', romaji:'Nana / Shichi', english:'Seven', habit:'Count to seven.', icon:'7️⃣', colorHint:'#34495e' },
  { id:'d3c3', theme:'Number', japanese:'八', hiragana:'はち', nepali:'आठ', romaji:'Hachi', english:'Eight', habit:'Practice counting to eight.', icon:'8️⃣', colorHint:'#34495e' },
  { id:'d3c4', theme:'Number', japanese:'九', hiragana:'きゅう', nepali:'नौ', romaji:'Kyuu', english:'Nine', habit:'Count nine steps.', icon:'9️⃣', colorHint:'#34495e' },
  { id:'d3c5', theme:'Number', japanese:'十', hiragana:'じゅう', nepali:'दस', romaji:'Juu', english:'Ten', habit:'Count to ten in Japanese.', icon:'🔟', colorHint:'#34495e' },

  // ---- DAY 4: Colors ----
  { id:'d4c1', theme:'Color', japanese:'赤', hiragana:'あか', nepali:'रातो', romaji:'Aka', english:'Red', habit:'Spot something red.', icon:'🔴', colorHint:'#e74c3c' },
  { id:'d4c2', theme:'Color', japanese:'青', hiragana:'あお', nepali:'निलो', romaji:'Ao', english:'Blue', habit:'Look at the blue sky.', icon:'🔵', colorHint:'#3498db' },
  { id:'d4c3', theme:'Color', japanese:'緑', hiragana:'みどり', nepali:'हरियो', romaji:'Midori', english:'Green', habit:'Find a green leaf.', icon:'🟢', colorHint:'#2ecc71' },
  { id:'d4c4', theme:'Color', japanese:'黄色', hiragana:'きいろ', nepali:'पहेँलो', romaji:'Kiiro', english:'Yellow', habit:'Notice something yellow.', icon:'🟡', colorHint:'#f1c40f' },
  { id:'d4c5', theme:'Color', japanese:'白', hiragana:'しろ', nepali:'सेतो', romaji:'Shiro', english:'White', habit:'Point out a white cloud.', icon:'⚪', colorHint:'#bdc3c7' },

  // ---- DAY 5: Animals ----
  { id:'d5c1', theme:'Animal', japanese:'犬', hiragana:'いぬ', nepali:'कुकुर', romaji:'Inu', english:'Dog', habit:'Pet a dog if you can.', icon:'🐕', colorHint:'#d35400' },
  { id:'d5c2', theme:'Animal', japanese:'猫', hiragana:'ねこ', nepali:'बिरालो', romaji:'Neko', english:'Cat', habit:'Listen for a meow.', icon:'🐈', colorHint:'#f39c12' },
  { id:'d5c3', theme:'Animal', japanese:'鳥', hiragana:'とり', nepali:'चरा', romaji:'Tori', english:'Bird', habit:'Look for flying birds.', icon:'🕊️', colorHint:'#3498db' },
  { id:'d5c4', theme:'Animal', japanese:'魚', hiragana:'さかな', nepali:'माछा', romaji:'Sakana', english:'Fish', habit:'Imagine a fish swimming.', icon:'🐟', colorHint:'#1abc9c' },
  { id:'d5c5', theme:'Animal', japanese:'熊', hiragana:'くま', nepali:'भालु', romaji:'Kuma', english:'Bear', habit:'Think of a strong bear.', icon:'🐻', colorHint:'#8e44ad' },

  // ---- DAY 6: Actions ----
  { id:'d6c1', theme:'Action', japanese:'食べる', hiragana:'たべる', nepali:'खानु', romaji:'Taberu', english:'To eat', habit:'Say this when you eat.', icon:'🍱', colorHint:'#e67e22' },
  { id:'d6c2', theme:'Action', japanese:'飲む', hiragana:'のむ', nepali:'पिउनु', romaji:'Nomu', english:'To drink', habit:'Say this drinking water.', icon:'🍵', colorHint:'#27ae60' },
  { id:'d6c3', theme:'Action', japanese:'寝る', hiragana:'ねる', nepali:'सुत्नु', romaji:'Neru', english:'To sleep', habit:'Say this before bed.', icon:'😴', colorHint:'#2c3e50' },
  { id:'d6c4', theme:'Action', japanese:'見る', hiragana:'みる', nepali:'हेर्नु', romaji:'Miru', english:'To see/watch', habit:'Use when watching TV.', icon:'👀', colorHint:'#8e44ad' },
  { id:'d6c5', theme:'Action', japanese:'行く', hiragana:'いく', nepali:'जानु', romaji:'Iku', english:'To go', habit:'Say this when leaving.', icon:'🚶‍♂️', colorHint:'#2980b9' },

  // ---- DAY 7: Nature ----
  { id:'d7c1', theme:'Nature', japanese:'太陽', hiragana:'たいよう', nepali:'घाम', romaji:'Taiyou', english:'Sun', habit:'Feel the morning sun.', icon:'☀️', colorHint:'#f39c12' },
  { id:'d7c2', theme:'Nature', japanese:'雨', hiragana:'あめ', nepali:'पानी (वर्षा)', romaji:'Ame', english:'Rain', habit:'Listen to the rain.', icon:'🌧️', colorHint:'#34495e' },
  { id:'d7c3', theme:'Nature', japanese:'山', hiragana:'やま', nepali:'पहाड', romaji:'Yama', english:'Mountain', habit:'Look at a mountain.', icon:'🗻', colorHint:'#2c3e50' },
  { id:'d7c4', theme:'Nature', japanese:'川', hiragana:'かわ', nepali:'नदी', romaji:'Kawa', english:'River', habit:'Imagine a flowing river.', icon:'🏞️', colorHint:'#2980b9' },
  { id:'d7c5', theme:'Nature', japanese:'花', hiragana:'はな', nepali:'फूल', romaji:'Hana', english:'Flower', habit:'Smell a flower today.', icon:'🌸', colorHint:'#e84393' },

  // ---- DAY 8: Food & Drink ----
  { id:'d8c1', theme:'Food', japanese:'水', hiragana:'みず', nepali:'पानी', romaji:'Mizu', english:'Water', habit:'Drink a glass of water.', icon:'💧', colorHint:'#3498db' },
  { id:'d8c2', theme:'Food', japanese:'お茶', hiragana:'おちゃ', nepali:'चिया', romaji:'Ocha', english:'Tea', habit:'Enjoy a cup of tea.', icon:'🍵', colorHint:'#27ae60' },
  { id:'d8c3', theme:'Food', japanese:'ご飯', hiragana:'ごはん', nepali:'भात', romaji:'Gohan', english:'Rice / Meal', habit:'Appreciate your daily rice.', icon:'🍚', colorHint:'#f39c12' },
  { id:'d8c4', theme:'Food', japanese:'肉', hiragana:'にく', nepali:'मासु', romaji:'Niku', english:'Meat', habit:'Recognize meat in a dish.', icon:'🥩', colorHint:'#c0392b' },
  { id:'d8c5', theme:'Food', japanese:'パン', hiragana:'ぱん', nepali:'रोटी / पाउरोटी', romaji:'Pan', english:'Bread', habit:'Eat bread for breakfast.', icon:'🥐', colorHint:'#d35400' },

  // ---- DAY 9: Family ----
  { id:'d9c1', theme:'Family', japanese:'母', hiragana:'はは', nepali:'आमा', romaji:'Haha', english:'Mother', habit:'Call or talk to your mother.', icon:'👩‍👦', colorHint:'#e84393' },
  { id:'d9c2', theme:'Family', japanese:'父', hiragana:'ちち', nepali:'बुबा', romaji:'Chichi', english:'Father', habit:'Talk to your father.', icon:'👨‍👧', colorHint:'#2980b9' },
  { id:'d9c3', theme:'Family', japanese:'兄', hiragana:'あに', nepali:'दाइ', romaji:'Ani', english:'Older Brother', habit:'Remember your older brother.', icon:'👦', colorHint:'#8e44ad' },
  { id:'d9c4', theme:'Family', japanese:'姉', hiragana:'あね', nepali:'दिदी', romaji:'Ane', english:'Older Sister', habit:'Remember your older sister.', icon:'👧', colorHint:'#c0392b' },
  { id:'d9c5', theme:'Family', japanese:'私', hiragana:'わたし', nepali:'म', romaji:'Watashi', english:'I / Me', habit:'Say "I am learning".', icon:'👤', colorHint:'#16a085' },

  // ---- DAY 10: Body Parts ----
  { id:'d10c1', theme:'Body', japanese:'頭', hiragana:'あたま', nepali:'टाउको', romaji:'Atama', english:'Head', habit:'Touch your head.', icon:'🗣️', colorHint:'#34495e' },
  { id:'d10c2', theme:'Body', japanese:'目', hiragana:'め', nepali:'आँखा', romaji:'Me', english:'Eye', habit:'Blink your eyes.', icon:'👁️', colorHint:'#2980b9' },
  { id:'d10c3', theme:'Body', japanese:'手', hiragana:'て', nepali:'हात', romaji:'Te', english:'Hand', habit:'Clap your hands.', icon:'✋', colorHint:'#e67e22' },
  { id:'d10c4', theme:'Body', japanese:'足', hiragana:'あし', nepali:'खुट्टा', romaji:'Ashi', english:'Foot / Leg', habit:'Tap your foot.', icon:'🦶', colorHint:'#d35400' },
  { id:'d10c5', theme:'Body', japanese:'口', hiragana:'くち', nepali:'मुख', romaji:'Kuchi', english:'Mouth', habit:'Smile widely.', icon:'👄', colorHint:'#c0392b' },

  // ---- DAY 11: Objects ----
  { id:'d11c1', theme:'Object', japanese:'本', hiragana:'ほん', nepali:'किताब', romaji:'Hon', english:'Book', habit:'Read a page of a book.', icon:'📖', colorHint:'#8e44ad' },
  { id:'d11c2', theme:'Object', japanese:'ペン', hiragana:'ぺん', nepali:'कलम', romaji:'Pen', english:'Pen', habit:'Write down a Japanese word.', icon:'🖊️', colorHint:'#2980b9' },
  { id:'d11c3', theme:'Object', japanese:'車', hiragana:'くるま', nepali:'गाडी', romaji:'Kuruma', english:'Car', habit:'Spot a car outside.', icon:'🚗', colorHint:'#c0392b' },
  { id:'d11c4', theme:'Object', japanese:'家', hiragana:'いえ', nepali:'घर', romaji:'Ie', english:'House', habit:'Appreciate your home.', icon:'🏠', colorHint:'#27ae60' },
  { id:'d11c5', theme:'Object', japanese:'お金', hiragana:'おかね', nepali:'पैसा', romaji:'Okane', english:'Money', habit:'Look at a coin.', icon:'💴', colorHint:'#f39c12' },

  // ---- DAY 12: Time ----
  { id:'d12c1', theme:'Time', japanese:'今日', hiragana:'きょう', nepali:'आज', romaji:'Kyou', english:'Today', habit:'Make the most of today.', icon:'📅', colorHint:'#3498db' },
  { id:'d12c2', theme:'Time', japanese:'明日', hiragana:'あした', nepali:'भोलि', romaji:'Ashita', english:'Tomorrow', habit:'Plan for tomorrow.', icon:'🌅', colorHint:'#e67e22' },
  { id:'d12c3', theme:'Time', japanese:'今', hiragana:'いま', nepali:'अहिले', romaji:'Ima', english:'Now', habit:'Focus on the present moment.', icon:'⏳', colorHint:'#9b59b6' },
  { id:'d12c4', theme:'Time', japanese:'朝', hiragana:'あさ', nepali:'बिहान', romaji:'Asa', english:'Morning', habit:'Wake up early tomorrow.', icon:'🌄', colorHint:'#f39c12' },
  { id:'d12c5', theme:'Time', japanese:'夜', hiragana:'よる', nepali:'रात', romaji:'Yoru', english:'Night', habit:'Look at the stars tonight.', icon:'🌃', colorHint:'#2c3e50' }
];

let currentDayCards = [];
let activeCardIndex = 0;
let activeDayIndex = 0;
let schedulerTimer = null;
let isAudioPrimed = false;
let cachedJaVoice = null; // Cache to eliminate voice lookup lag

// ===== TIME CALCULATION =====
function getNepalTime() {
  const d = new Date();
  const utc = d.getTime() + (d.getTimezoneOffset() * 60000);
  return new Date(utc + (3600000 * 5.75));
}

function getTotalUnlockedDays() {
  const now = getNepalTime();
  const start = new Date(START_DATE);
  if (now < start) return 1;
  const diffMs = now - start;
  const daysDiff = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const unlocked = daysDiff + 1;
  const maxDays = Math.ceil(MASTER_LIBRARY.length / 5);
  return Math.min(unlocked, maxDays);
}

function msUntilNextUnlock() {
  const nepal = getNepalTime();
  const next = new Date(nepal);
  next.setHours(5, 45, 0, 0);
  if (nepal.getHours() > 5 || (nepal.getHours() === 5 && nepal.getMinutes() >= 45)) {
    next.setDate(next.getDate() + 1);
  }
  return next - nepal;
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  createParticles();
  unlockDueCards();
  buildDayPanel();
  loadDayCards(activeDayIndex);
  scheduleNextUnlock();
  bindEvents();
  
  // Prime audio instantly on first interaction
  const primeHandler = () => {
    if (!isAudioPrimed && window.speechSynthesis) {
      const u = new SpeechSynthesisUtterance('');
      u.volume = 0;
      window.speechSynthesis.speak(u);
      isAudioPrimed = true;
      document.removeEventListener('click', primeHandler);
      document.removeEventListener('touchstart', primeHandler);
    }
  };
  document.addEventListener('click', primeHandler);
  document.addEventListener('touchstart', primeHandler);
});

// ===== CORE LOGIC =====
function unlockDueCards() {
  const total = getTotalUnlockedDays();
  activeDayIndex = total - 1; 
}

function buildDayPanel() {
  const panel = document.getElementById('dayPanel');
  panel.innerHTML = '';
  const total = getTotalUnlockedDays();
  
  for (let i = 0; i < total; i++) {
    const btn = document.createElement('button');
    btn.className = `day-btn ${i === activeDayIndex ? 'active' : ''}`;
    btn.textContent = `Day ${i + 1}`;
    btn.onclick = () => {
      document.querySelectorAll('.day-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      loadDayCards(i);
    };
    panel.appendChild(btn);
  }
}

function loadDayCards(dayIndex) {
  activeDayIndex = dayIndex;
  const startIndex = dayIndex * 5;
  currentDayCards = MASTER_LIBRARY.slice(startIndex, startIndex + 5);
  activeCardIndex = 0;
  
  renderCards();
  updateView();
  updateDayHeading(dayIndex);
}

function updateDayHeading(dayIndex) {
  const total = getTotalUnlockedDays();
  const isToday = dayIndex === total - 1;
  document.getElementById('dayHeading').textContent = isToday ? "Today's Cards" : `Day ${dayIndex + 1} Cards`;
  
  const d = new Date(START_DATE);
  d.setDate(d.getDate() + dayIndex);
  document.getElementById('dayDateLabel').textContent = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function createParticles() {
  const container = document.getElementById('particles');
  for (let i = 0; i < 20; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = Math.random() * 6 + 2;
    p.style.width = `${size}px`; p.style.height = `${size}px`;
    p.style.left = `${Math.random() * 100}%`;
    p.style.animationDuration = `${Math.random() * 10 + 10}s`;
    p.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(p);
  }
}

// ===== DYNAMIC INFOGRAPHIC RENDERING =====
function renderCards() {
  const container = document.getElementById('cardContainer');
  container.innerHTML = currentDayCards.map((card, i) => {
    // Generate dynamic dark gradient based on colorHint
    const bgGradient = `linear-gradient(135deg, ${card.colorHint}33 0%, #05050f 80%)`;
    
    return `
    <div class="nihongo-card hidden" data-index="${i}" id="card-${card.id}">
      <div class="card-bg" style="background: ${bgGradient};">
        <div class="card-watermark">${card.icon}</div>
      </div>
      <div class="card-overlay"></div>
      <div class="card-content">
        <div class="card-top">
          <div class="card-badge"><span class="badge-dot"></span> CARD ${i + 1}</div>
          <button class="btn-audio" onclick="playAudio(${i})" title="Listen to pronunciation" id="btnAudio-${i}">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M8 5v14l11-7z"/></svg>
          </button>
        </div>
        <div class="card-middle">
          <div class="card-theme">${card.theme}</div>
          <div class="card-japanese">${card.japanese}</div>
          <div class="card-nepali">${card.nepali}</div>
          <div class="card-romaji">(${card.romaji})</div>
        </div>
        <div class="card-bottom">
          <div class="detail-row">
            <div class="detail-icon">🇬🇧</div>
            <div class="detail-text"><span class="detail-label">Meaning:</span> "${card.english}"</div>
          </div>
          <div class="detail-row">
            <div class="detail-icon">🌸</div>
            <div class="detail-text"><span class="detail-label">Habit:</span> ${card.habit}</div>
          </div>
        </div>
      </div>
    </div>
  `}).join('');
  
  const dots = document.getElementById('dotIndicators');
  dots.innerHTML = currentDayCards.map((_, i) => `<div class="dot" onclick="goToCard(${i})"></div>`).join('');
}

function updateView() {
  const cards = document.querySelectorAll('.nihongo-card');
  const dots = document.querySelectorAll('.dot');
  
  cards.forEach((card, i) => {
    card.className = 'nihongo-card';
    if (i === activeCardIndex) {
      card.classList.add('active');
    } else if (i < activeCardIndex) {
      card.classList.add('exit-left');
    } else {
      card.classList.add('exit-right');
    }
  });
  
  dots.forEach((dot, i) => {
    dot.className = i === activeCardIndex ? 'dot active' : 'dot';
  });
}

function goToCard(index) {
  if (index === activeCardIndex) return;
  activeCardIndex = index;
  updateView();
}

function nextCard() {
  if (activeCardIndex < currentDayCards.length - 1) {
    activeCardIndex++;
    updateView();
  }
}

function prevCard() {
  if (activeCardIndex > 0) {
    activeCardIndex--;
    updateView();
  }
}

function bindEvents() {
  document.getElementById('navNext').addEventListener('click', nextCard);
  document.getElementById('navPrev').addEventListener('click', prevCard);
  
  // Swipe support
  let touchStartX = 0;
  let touchEndX = 0;
  const stage = document.getElementById('cardStage');
  
  stage.addEventListener('touchstart', e => touchStartX = e.changedTouches[0].screenX, {passive: true});
  stage.addEventListener('touchend', e => {
    touchEndX = e.changedTouches[0].screenX;
    if (touchEndX < touchStartX - 40) nextCard();
    if (touchEndX > touchStartX + 40) prevCard();
  }, {passive: true});
  
  // Keyboard
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') nextCard();
    if (e.key === 'ArrowLeft') prevCard();
  });
  
  // PDF
  document.getElementById('btnDownloadPdf').addEventListener('click', generateMultiPagePDF);
}

// ===== AUDIO =====
function playAudio(index) {
  const card = currentDayCards[index];
  if (!card || !window.speechSynthesis) return;
  
  // Only cancel if actively speaking to avoid flush lag
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }
  
  const btn = document.getElementById(`btnAudio-${index}`);
  document.querySelectorAll('.btn-audio').forEach(b => b.classList.remove('playing'));
  if (btn) btn.classList.add('playing');
  
  // Use hiragana for correct and softer pronunciation
  const utterance = new SpeechSynthesisUtterance(card.hiragana);
  utterance.lang = 'ja-JP'; // Force Japanese language engine to prevent fallback to English/OS default
  
  // Cache voice globally to eliminate search latency
  if (!cachedJaVoice) {
    const voices = window.speechSynthesis.getVoices();
    cachedJaVoice = voices.find(v => v.name.includes('Haruka') || v.name.includes('Kyoko') || v.name.includes('Google 日本語')) 
                 || voices.find(v => v.lang.startsWith('ja')) 
                 || voices.find(v => v.lang.includes('JP'));
  }
               
  if (cachedJaVoice) utterance.voice = cachedJaVoice;
  
  // Adjust pitch slightly higher and rate slightly slower for an elegant, softer tone
  utterance.pitch = 1.2;
  utterance.rate = 0.8;
  
  utterance.onend = () => { if (btn) btn.classList.remove('playing'); };
  utterance.onerror = () => { if (btn) btn.classList.remove('playing'); };
  
  // Slight detachment to prevent main thread blocking
  setTimeout(() => window.speechSynthesis.speak(utterance), 5);
}

// ===== SCHEDULER =====
function scheduleNextUnlock() {
  if (schedulerTimer) clearTimeout(schedulerTimer);
  schedulerTimer = setTimeout(() => {
    unlockDueCards();
    buildDayPanel();
    loadDayCards(activeDayIndex);
    scheduleNextUnlock();
  }, msUntilNextUnlock());
}

function updateCountdown() {
  const el = document.getElementById('countdownTimer');
  if (!el) return;
  function tick() {
    const ms = msUntilNextUnlock();
    const s = Math.floor(ms / 1000);
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    el.textContent = `Next unlock: ${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}:${String(sec).padStart(2,'0')}`;
  }
  tick();
  setInterval(tick, 1000);
}
updateCountdown();

// ===== PDF EXPORT =====
async function generateMultiPagePDF() {
  const btn = document.getElementById('btnDownloadPdf');
  btn.style.opacity = '0.5';
  btn.style.pointerEvents = 'none';
  btn.innerHTML = '<span>Creating PDF...</span>';

  try {
    const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    
    // Create an off-screen container to render cards at high resolution
    const exportDiv = document.createElement('div');
    exportDiv.style.position = 'absolute';
    exportDiv.style.left = '-9999px';
    exportDiv.style.top = '0';
    exportDiv.style.width = '500px'; 
    exportDiv.style.height = '700px';
    document.body.appendChild(exportDiv);

    for (let i = 0; i < currentDayCards.length; i++) {
      const card = currentDayCards[i];
      const bgGradient = `linear-gradient(135deg, ${card.colorHint}55 0%, #05050f 100%)`;
      
      exportDiv.innerHTML = `
        <div class="nihongo-card active" style="position:relative; width:100%; height:100%; transform:none; border-radius:0;">
          <div class="card-bg" style="background: ${bgGradient};">
            <div class="card-watermark" style="font-size: 20rem; opacity: 0.2;">${card.icon}</div>
          </div>
          <div class="card-overlay"></div>
          <div class="card-content" style="padding:40px;">
            <div class="card-top">
              <div class="card-badge">CARD ${i + 1}</div>
            </div>
            <div class="card-middle">
              <div class="card-theme">${card.theme}</div>
              <div class="card-japanese" style="font-size:4rem;">${card.japanese}</div>
              <div class="card-nepali" style="font-size:3rem;">${card.nepali}</div>
              <div class="card-romaji" style="font-size:1.5rem;">(${card.romaji})</div>
            </div>
            <div class="card-bottom">
              <div class="detail-row" style="background:rgba(255,255,255,0.1); padding:20px;">
                <div class="detail-icon">🇬🇧</div>
                <div class="detail-text" style="font-size:1.2rem;">Meaning: "${card.english}"</div>
              </div>
              <div class="detail-row" style="background:rgba(255,255,255,0.1); padding:20px;">
                <div class="detail-icon">🌸</div>
                <div class="detail-text" style="font-size:1.2rem;">Habit: ${card.habit}</div>
              </div>
            </div>
          </div>
        </div>
      `;

      const canvas = await html2canvas(exportDiv, { scale: 2, useCORS: true, backgroundColor: '#05050f' });
      const imgData = canvas.toDataURL('image/jpeg', 0.9);
      
      if (i > 0) pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
    }
    
    document.body.removeChild(exportDiv);
    pdf.save(`Nihongo_Cards_Day_${activeDayIndex + 1}.pdf`);
  } catch (error) {
    console.error('PDF Generation failed', error);
    alert('Failed to generate PDF. Please try again.');
  } finally {
    btn.style.opacity = '1';
    btn.style.pointerEvents = 'auto';
    btn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg><span>Get PDF</span>`;
  }
}
