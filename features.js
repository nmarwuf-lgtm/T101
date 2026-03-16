// ============================================================
//  MedTerm Features v3.0
//  🌙 Theme · 📊 XP/Levels · 🎴 Study Mode · 🔔 Notifications
// ============================================================

// ══════════════════════════════════════════════════════════
//  THEME SYSTEM  🌙☀️
// ══════════════════════════════════════════════════════════
const LIGHT_VARS = {
  '--bg':          '#f0f4f8',
  '--bg2':         '#ffffff',
  '--bg3':         '#e8edf5',
  '--surface':     '#ffffff',
  '--surface2':    '#f5f7fa',
  '--surface3':    '#edf0f5',
  '--border':      'rgba(66,153,225,0.15)',
  '--border2':     'rgba(66,153,225,0.3)',
  '--text':        '#1a202c',
  '--text2':       '#4a5568',
  '--text3':       '#718096',
  '--accent':      '#3182ce',
  '--accent2':     '#2b6cb0',
  '--accent-soft': 'rgba(49,130,206,0.12)',
  '--accent-glow': 'rgba(49,130,206,0.06)',
  '--shadow':      '0 4px 24px rgba(0,0,0,0.1)',
  '--shadow-sm':   '0 2px 12px rgba(0,0,0,0.07)',
};

function applyTheme(dark) {
  const root = document.documentElement;
  if (dark) {
    Object.keys(LIGHT_VARS).forEach(k => root.style.removeProperty(k));
    document.body.classList.remove('light-mode');
  } else {
    Object.entries(LIGHT_VARS).forEach(([k,v]) => root.style.setProperty(k, v));
    document.body.classList.add('light-mode');
  }
  const icon = document.getElementById('themeIcon');
  if (icon) icon.textContent = dark ? '🌙' : '☀️';
}

function toggleTheme() {
  const isDark = !document.body.classList.contains('light-mode');
  const newDark = !isDark;
  applyTheme(newDark);
  localStorage.setItem('medterm_theme', newDark ? 'dark' : 'light');
  showToast(newDark ? '🌙 الوضع الليلي' : '☀️ الوضع النهاري');
}

function initTheme() {
  const saved = localStorage.getItem('medterm_theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const dark = saved ? saved === 'dark' : prefersDark;
  applyTheme(dark);
}


// ══════════════════════════════════════════════════════════
//  XP & LEVELS SYSTEM  🏆
// ══════════════════════════════════════════════════════════
const LEVEL_THRESHOLDS = [0, 100, 250, 450, 700, 1000, 1400, 1900, 2500, 3200, 4000];
const LEVEL_NAMES = [
  '', 'مبتدئ', 'متعلم', 'مثابر', 'متقدم',
  'ماهر', 'خبير', 'متميز', 'محترف', 'أستاذ', 'عبقري'
];
const LEVEL_ICONS = ['','🌱','📖','💡','🔬','⚗️','🧠','🎓','🏅','🥇','🏆'];

function getXPData() {
  return JSON.parse(localStorage.getItem('medterm_xp') || '{"xp":0,"quizzes":0,"studied":0,"streak":0,"lastStudy":""}');
}
function saveXPData(d) {
  localStorage.setItem('medterm_xp', JSON.stringify(d));
}

function getLevel(xp) {
  let lvl = 1;
  for (let i = 1; i < LEVEL_THRESHOLDS.length; i++) {
    if (xp >= LEVEL_THRESHOLDS[i]) lvl = i + 1;
    else break;
  }
  return Math.min(lvl, LEVEL_NAMES.length - 1);
}

function getLevelProgress(xp) {
  const lvl = getLevel(xp);
  const cur = LEVEL_THRESHOLDS[lvl - 1] || 0;
  const next = LEVEL_THRESHOLDS[lvl] || LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1];
  return { pct: Math.round(((xp - cur) / (next - cur)) * 100), cur, next, lvl };
}

/**
 * addXP – Awards XP and records the reason for analytics.
 * @param {number} amount  - XP to add
 * @param {string} reason  - 'chapter-open' | 'card' | 'study' | 'quiz' | 'daily'
 */
function addXP(amount, reason) {
  const d = getXPData();
  const oldLvl = getLevel(d.xp);
  d.xp += amount;

  // Track per-reason stats
  d.breakdown = d.breakdown || {};
  d.breakdown[reason] = (d.breakdown[reason] || 0) + amount;

  // Track study card count specifically
  if (reason === 'card') d.studied = (d.studied || 0) + 1;

  saveXPData(d);
  const newLvl = getLevel(d.xp);
  if (newLvl > oldLvl) setTimeout(() => showLevelUpModal(newLvl), 400);
  updateXPBar();
  return d.xp;
}

function updateXPBar() {
  const d = getXPData();
  const lvl = getLevel(d.xp);
  const { pct, next } = getLevelProgress(d.xp);

  const elXP    = document.getElementById('statXP');
  const elLvl   = document.getElementById('statLevel');
  const elFill  = document.getElementById('xpBarFill');
  const elCount = document.getElementById('xpBarCount');
  const elLabel = document.getElementById('xpLevelLabel');

  if (elXP)    elXP.textContent = d.xp;
  if (elLvl)   elLvl.textContent = toArabicNum(lvl);
  if (elFill)  elFill.style.width = pct + '%';
  if (elCount) elCount.textContent = `${d.xp} / ${next} XP`;
  if (elLabel) elLabel.textContent = toArabicNum(lvl);
}

function toArabicNum(n) {
  return String(n).replace(/\d/g, d => '٠١٢٣٤٥٦٧٨٩'[d]);
}

function showLevelUpModal(lvl) {
  // Remove any existing level-up overlay first
  document.querySelectorAll('.levelup-overlay').forEach(el => el.remove());

  const overlay = document.createElement('div');
  overlay.className = 'levelup-overlay';
  overlay.innerHTML = `
    <div class="levelup-box">
      <div class="levelup-icon">${LEVEL_ICONS[lvl] || '🏆'}</div>
      <div class="levelup-title">ارتقيت للمستوى ${toArabicNum(lvl)}!</div>
      <div class="levelup-name">${LEVEL_NAMES[lvl] || 'بطل'}</div>
      <div class="levelup-sub">أحسنت! واصل مسيرتك التعليمية 🎓</div>
      <button class="levelup-close" onclick="this.closest('.levelup-overlay').classList.remove('visible');setTimeout(()=>this.closest('.levelup-overlay').remove(),400)">
        🎉 شكراً!
      </button>
    </div>`;
  // Close on backdrop click
  overlay.addEventListener('click', e => {
    if (e.target === overlay) {
      overlay.classList.remove('visible');
      setTimeout(() => overlay.remove(), 400);
    }
  });
  document.body.appendChild(overlay);
  requestAnimationFrame(() => overlay.classList.add('visible'));
  // No auto-close – user must dismiss manually
}


// ══════════════════════════════════════════════════════════
//  STUDY MODE (Flashcards)  🎴
// ══════════════════════════════════════════════════════════
let studyState = { chapterId: null, cards: [], index: 0, flipped: false, correct: 0, total: 0 };

function initStudy() {
  const container = document.getElementById('studyContainer');
  if (!container) return;

  if (!studyState.chapterId) {
    renderStudyChapterPicker(container);
  } else {
    renderStudyCard(container);
  }
}

function renderStudyChapterPicker(container) {
  container.innerHTML = `
    <div class="study-picker">
      <div class="study-picker-header">
        <p>اختر فصلاً لبدء جلسة بطاقات الحفظ</p>
      </div>
      <button class="study-all-btn" onclick="startStudyAll()">
        🎯 دراسة كل المصطلحات
      </button>
      <div class="study-chapters-grid">
        ${CHAPTERS.map(ch => `
          <div class="study-ch-card" onclick="startStudy(${ch.id})" style="--sc:#${Math.abs(ch.color.replace('#','') || '63b3ed')}">
            <div class="sc-icon">${ch.icon}</div>
            <div class="sc-title">${ch.title}</div>
            <div class="sc-count">${ch.terms ? ch.terms.length : 0} مصطلح</div>
          </div>`).join('')}
      </div>
    </div>`;
}

function startStudy(chId) {
  const ch = CHAPTERS.find(c => c.id === chId);
  if (!ch || !ch.terms || ch.terms.length === 0) { showToast('لا توجد مصطلحات لهذا الفصل'); return; }
  const shuffled = [...ch.terms].sort(() => Math.random() - 0.5);
  studyState = { chapterId: chId, cards: shuffled, index: 0, flipped: false, correct: 0, total: shuffled.length };
  renderStudyCard(document.getElementById('studyContainer'));
}

function startStudyAll() {
  let all = [];
  CHAPTERS.forEach(ch => { if (ch.terms) all = all.concat(ch.terms.map(t => ({...t, _ch: ch.title}))); });
  all = all.sort(() => Math.random() - 0.5);
  if (all.length === 0) { showToast('لا توجد مصطلحات'); return; }
  studyState = { chapterId: 'all', cards: all, index: 0, flipped: false, correct: 0, total: all.length };
  renderStudyCard(document.getElementById('studyContainer'));
}

function renderStudyCard(container) {
  const s = studyState;
  if (s.index >= s.cards.length) {
    // Done
    const xpEarned = s.correct * 5;
    addXP(xpEarned, 'study');
    container.innerHTML = `
      <div class="study-result">
        <div class="sr-icon">🎉</div>
        <div class="sr-title">انتهت الجلسة!</div>
        <div class="sr-score">${s.correct} / ${s.total}</div>
        <div class="sr-xp">+${xpEarned} XP 🏆</div>
        <div class="sr-msg">${s.correct === s.total ? 'ممتاز! أتقنت جميع المصطلحات!' : s.correct >= s.total*0.7 ? 'جيد جداً! استمر' : 'راجع المصطلحات مجدداً'}</div>
        <div class="sr-btns">
          <button class="sr-btn" onclick="studyState.chapterId=null;initStudy()">اختر فصلاً آخر</button>
          <button class="sr-btn accent" onclick="startStudy(${s.chapterId === 'all' ? "'all'" : s.chapterId}); ${s.chapterId === 'all' ? 'startStudyAll()' : ''}">إعادة</button>
        </div>
      </div>`;
    updateXPBar();
    return;
  }

  const card = s.cards[s.index];
  const pct = Math.round((s.index / s.total) * 100);

  container.innerHTML = `
    <div class="study-session">
      <div class="study-top">
        <button class="study-back-btn" onclick="studyState.chapterId=null;initStudy()">← العودة</button>
        <span class="study-counter">${s.index + 1} / ${s.total}</span>
        <span class="study-score-sm">✅ ${s.correct}</span>
      </div>
      <div class="study-progress-track"><div class="study-progress-fill" style="width:${pct}%"></div></div>
      <div class="flashcard ${s.flipped ? 'flipped' : ''}" onclick="flipCard()">
        <div class="flashcard-inner">
          <div class="flashcard-front">
            <div class="fc-hint">اضغط لرؤية الترجمة</div>
            <div class="fc-term">${card.en || card.ar || '—'}</div>
            ${card._ch ? `<div class="fc-chapter">${card._ch}</div>` : ''}
          </div>
          <div class="flashcard-back">
            <div class="fc-hint-back">الترجمة العربية</div>
            <div class="fc-translation">${card.ar || '—'}</div>
            ${card.def ? `<div class="fc-def">${card.def}</div>` : ''}
            <button class="fc-speak" onclick="event.stopPropagation();speakText('${esc(card.en || '')}','en-US')">🔊 EN</button>
          </div>
        </div>
      </div>
      <div class="study-actions ${s.flipped ? 'visible' : ''}">
        <button class="study-btn wrong-btn" onclick="markCard(false)">❌ لم أعرف</button>
        <button class="study-btn correct-btn" onclick="markCard(true)">✅ عرفت!</button>
      </div>
    </div>`;
}

function flipCard() {
  studyState.flipped = !studyState.flipped;
  const card = document.querySelector('.flashcard');
  if (card) card.classList.toggle('flipped', studyState.flipped);
  const actions = document.querySelector('.study-actions');
  if (actions) actions.classList.toggle('visible', studyState.flipped);
}

function markCard(correct) {
  if (correct) {
    studyState.correct++;
    addXP(2, 'card'); // tracked as 'card' → increments d.studied automatically
  }
  studyState.index++;
  studyState.flipped = false;
  renderStudyCard(document.getElementById('studyContainer'));
}


// ══════════════════════════════════════════════════════════
//  PROGRESS PAGE  📊
// ══════════════════════════════════════════════════════════
function initProgress() {
  const container = document.getElementById('progressContainer');
  if (!container) return;
  const d    = getXPData();
  const lvl  = getLevel(d.xp);
  const { pct, next } = getLevelProgress(d.xp);
  const done = JSON.parse(localStorage.getItem('medterm_done') || '[]');
  const favs = JSON.parse(localStorage.getItem('medterm_favs') || '[]');
  const donePercent = Math.round((done.length / CHAPTERS.length) * 100);
  const achievements = getAchievements(d, done, favs);
  const earned = achievements.filter(a => a.earned);

  // Smart stats from SessionManager (if available)
  const smart = (typeof SessionManager !== 'undefined' && SessionManager.sessionData)
    ? SessionManager.getSmartStats() : null;

  container.innerHTML = `
    <div class="progress-page">

      <!-- Level Card -->
      <div class="prog-level-card">
        <div class="plc-icon">${LEVEL_ICONS[lvl]}</div>
        <div class="plc-info">
          <div class="plc-title">المستوى ${toArabicNum(lvl)} — ${LEVEL_NAMES[lvl]}</div>
          <div class="plc-sub">${d.xp} XP إجمالي · عضو منذ ${smart ? smart.sessionAge + ' يوم' : '—'}</div>
        </div>
      </div>
      <div class="prog-xp-bar">
        <div class="prog-xp-labels"><span>المستوى الحالي</span><span>${d.xp} / ${next} XP</span></div>
        <div class="prog-xp-track"><div class="prog-xp-fill" style="width:${pct}%"></div></div>
        <div class="prog-xp-next">المستوى التالي: ${LEVEL_NAMES[Math.min(lvl+1,LEVEL_NAMES.length-1)]}</div>
      </div>

      <!-- Stats Grid -->
      <div class="prog-stats-grid">
        <div class="prog-stat-card"><span class="psc-num">${d.xp}</span><span class="psc-lbl">نقطة XP</span></div>
        <div class="prog-stat-card"><span class="psc-num">${done.length}</span><span class="psc-lbl">فصل مكتمل</span></div>
        <div class="prog-stat-card"><span class="psc-num">${d.quizzes || 0}</span><span class="psc-lbl">اختبار ناجح</span></div>
        <div class="prog-stat-card"><span class="psc-num">${d.studied || 0}</span><span class="psc-lbl">بطاقة مدروسة</span></div>
        <div class="prog-stat-card"><span class="psc-num">${favs.length}</span><span class="psc-lbl">مفضلة</span></div>
        <div class="prog-stat-card"><span class="psc-num">${d.streak || 0}</span><span class="psc-lbl">يوم متتالي 🔥</span></div>
      </div>

      <!-- Smart Stats (from SessionManager) -->
      ${smart ? `
      <div class="prog-section-title">📊 إحصائياتي الذكية</div>
      <div class="smart-stats-grid">
        <div class="smart-stat"><div class="ss-icon">⏱️</div><div class="ss-val">${smart.totalTime}</div><div class="ss-lbl">وقت الدراسة</div></div>
        <div class="smart-stat"><div class="ss-icon">🎯</div><div class="ss-val">${smart.accuracy}%</div><div class="ss-lbl">دقة الإجابات</div></div>
        <div class="smart-stat"><div class="ss-icon">📖</div><div class="ss-val">${smart.chaptersCompleted}</div><div class="ss-lbl">فصول مكتملة</div></div>
        <div class="smart-stat"><div class="ss-icon">🔥</div><div class="ss-val">${smart.streak} يوم</div><div class="ss-lbl">التسلسل</div></div>
      </div>
      ${smart.topChapters.length ? `
      <div class="prog-section-title">⭐ أكثر الفصول دراسة</div>
      <div class="top-chapters-list">
        ${smart.topChapters.map((ch,i) => `
          <div class="top-ch-row">
            <span class="tc-rank">${['🥇','🥈','🥉'][i]}</span>
            <span class="tc-title">${ch.title}</span>
            <span class="tc-time">${Math.floor(ch.secs/60)}د</span>
          </div>`).join('')}
      </div>` : ''}
      ${smart.weakChapters.length ? `
      <div class="prog-section-title">💡 فصول تحتاج مراجعة</div>
      <div class="weak-chapters-list">
        ${smart.weakChapters.map(ch => `
          <div class="weak-ch-row" onclick="navigate('chapter-detail',{chapter:${ch.id}})">
            <span>${ch.icon}</span><span class="wc-title">${ch.title}</span>
            <span class="wc-action">ادرس →</span>
          </div>`).join('')}
      </div>` : ''}
      ` : ''}

      <!-- Chapter Progress -->
      <div class="prog-section-title">📚 تقدم الفصول (${donePercent}%)</div>
      <div class="prog-chapters">
        ${CHAPTERS.map(ch => {
          const isDone = done.includes(ch.id);
          const secs   = smart?.topChapters?.find(t => t.id === ch.id)?.secs || 0;
          return `
            <div class="prog-ch-row" onclick="navigate('chapter-detail',{chapter:${ch.id}})">
              <span class="pcr-icon">${ch.icon}</span>
              <span class="pcr-title">${ch.title}</span>
              ${secs > 0 ? `<span class="pcr-time">${Math.floor(secs/60)}د</span>` : ''}
              <span class="pcr-status ${isDone ? 'done' : ''}">${isDone ? '✓' : '○'}</span>
            </div>`;
        }).join('')}
      </div>

      <!-- Achievements -->
      <div class="prog-section-title">🏅 الإنجازات (${earned.length}/${achievements.length})</div>
      <div class="prog-achievements">
        ${achievements.map(a => `
          <div class="achiev-card ${a.earned ? 'earned' : 'locked'}">
            <div class="achiev-icon">${a.icon}</div>
            <div class="achiev-info">
              <div class="achiev-name">${a.name}</div>
              <div class="achiev-desc">${a.desc}</div>
            </div>
            ${a.earned ? '<div class="achiev-check">✓</div>' : '<div class="achiev-lock">🔒</div>'}
          </div>`).join('')}
      </div>

      <!-- Reset & Share -->
      <div style="display:flex;gap:10px;margin-top:4px">
        <button class="prog-share-btn" onclick="shareResults()">📤 مشاركة تقدمي</button>
        <button class="prog-reset-btn" style="flex:1" onclick="confirmReset()">🗑️ إعادة التعيين</button>
      </div>
    </div>`;
}


function getAchievements(d, done, favs) {
  return [
    { icon:'🌱', name:'الخطوة الأولى',   desc:'افتح أي فصل',         earned: done.length >= 1 },
    { icon:'📖', name:'قارئ نشط',        desc:'أكمل ٣ فصول',         earned: done.length >= 3 },
    { icon:'🎓', name:'طالب متميز',      desc:'أكمل ٧ فصول',         earned: done.length >= 7 },
    { icon:'🏆', name:'خريج التشريح',    desc:'أكمل جميع الفصول',    earned: done.length >= 14 },
    { icon:'⭐', name:'محب المفضلة',     desc:'أضف ٥ مفضلات',        earned: favs.length >= 5 },
    { icon:'🧠', name:'اختباري أول',     desc:'اجتز اختباراً واحداً', earned: (d.quizzes||0) >= 1 },
    { icon:'🔥', name:'بطل الاختبارات', desc:'اجتز ١٠ اختبارات',    earned: (d.quizzes||0) >= 10 },
    { icon:'🎴', name:'مبتدئ البطاقات', desc:'ادرس ٢٠ بطاقة',        earned: (d.studied||0) >= 20 },
    { icon:'💯', name:'حافظ المصطلحات', desc:'ادرس ١٠٠ بطاقة',       earned: (d.studied||0) >= 100 },
    { icon:'💎', name:'نجم MedTerm',    desc:'احصل على ٥٠٠ XP',     earned: d.xp >= 500 },
  ];
}

function confirmReset() {
  if (!confirm('هل تريد إعادة تعيين كل التقدم؟ لا يمكن التراجع.')) return;
  localStorage.removeItem('medterm_xp');
  localStorage.removeItem('medterm_done');
  localStorage.removeItem('medterm_favs');
  STATE.favorites = [];
  STATE.completedChapters = [];
  updateXPBar();
  initProgress();
  showToast('🔄 تم إعادة التعيين');
}


// ══════════════════════════════════════════════════════════
//  NOTIFICATIONS  🔔
// ══════════════════════════════════════════════════════════
function requestNotifications() {
  if (!('Notification' in window)) {
    showToast('⚠️ المتصفح لا يدعم الإشعارات');
    return;
  }
  if (Notification.permission === 'granted') {
    scheduleReminder();
    showToast('✅ التذكيرات مفعلة');
    return;
  }
  Notification.requestPermission().then(perm => {
    if (perm === 'granted') {
      scheduleReminder();
      showToast('🔔 تم تفعيل التذكيرات اليومية!');
      localStorage.setItem('medterm_notif', '1');
      const btn = document.getElementById('notifBtn');
      if (btn) btn.textContent = '🔔 التذكيرات مفعلة';
    } else {
      showToast('⚠️ تم رفض الإشعارات');
    }
  });
}

function scheduleReminder() {
  const msgs = [
    'حان وقت مراجعة علم التشريح! 🔬',
    'لا تنسَ دراستك اليومية في MedTerm 📚',
    'بضع دقائق يومياً تصنع الفارق 🧠',
    'راجع مصطلحاتك الطبية اليوم ⚕️',
  ];
  const msg = msgs[Math.floor(Math.random() * msgs.length)];
  // Demo: notify after 5s for testing, real apps use Push API
  setTimeout(() => {
    if (Notification.permission === 'granted') {
      new Notification('MedTerm – تذكير الدراسة', {
        body: msg,
        icon: 'icons/icon-192.png',
        badge: 'icons/icon-72.png',
        tag: 'medterm-reminder',
      });
    }
  }, 5000);
}


// ══════════════════════════════════════════════════════════
//  PATCH: hook into existing navigate() for XP events
// ══════════════════════════════════════════════════════════
const _origNavigate = window.navigate;
window.navigate = function(page, params = {}) {
  _origNavigate && _origNavigate(page, params);

  if (page === 'study')    initStudy();
  if (page === 'progress') initProgress();

  // XP for opening a chapter (first time each session)
  if (page === 'chapter-detail' && params.chapter) {
    const key = 'visited_ch_' + params.chapter;
    if (!sessionStorage.getItem(key)) {
      addXP(3, 'chapter-open');
      sessionStorage.setItem(key, '1');
    }
  }
};

// Patch quiz completion to award XP
const _origAnswerQuiz = window.answerQuiz;
window.answerQuiz = function(idx) {
  const before = STATE.quizState ? { ...STATE.quizState } : null;
  _origAnswerQuiz && _origAnswerQuiz(idx);
  const after = STATE.quizState;
  if (before && after && after.done && !before.done) {
    const xpEarned = after.score * 10;
    addXP(xpEarned, 'quiz');
    const d = getXPData(); d.quizzes = (d.quizzes||0) + 1; saveXPData(d);
    showToast(`🏆 +${xpEarned} XP!`);
    updateXPBar();
  }
};


// ══════════════════════════════════════════════════════════
//  INIT
// ══════════════════════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  updateXPBar();

  // Check notification status
  if (localStorage.getItem('medterm_notif') === '1') {
    const btn = document.getElementById('notifBtn');
    if (btn) btn.textContent = '🔔 التذكيرات مفعلة';
  }

  // Daily streak
  const today = new Date().toDateString();
  const d = getXPData();
  if (d.lastStudy !== today) {
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    d.streak = d.lastStudy === yesterday ? (d.streak||0) + 1 : 1;
    d.lastStudy = today;
    d.xp = (d.xp || 0) + 5; // daily login bonus
    saveXPData(d);
    updateXPBar();
    if (d.streak > 1) showToast(`🔥 ${d.streak} أيام متتالية! +5 XP`);
  }
});


// ══════════════════════════════════════════════════════════
//  FOCUS MODE  🎯
// ══════════════════════════════════════════════════════════
let _focusActive = false;

function toggleFocusMode() {
  _focusActive = !_focusActive;
  document.body.classList.toggle('focus-mode', _focusActive);
  const btn = document.getElementById('focusModeBtn');
  if (btn) {
    btn.textContent = _focusActive ? '✕' : '🎯';
    btn.title = _focusActive ? 'إنهاء وضع التركيز' : 'وضع التركيز';
  }
  showToast(_focusActive ? '🎯 وضع التركيز – بدون تشتيت!' : '↩ خروج من وضع التركيز');
}

// Exit focus mode when navigating away
const _origNavigateForFocus = window.navigate;
window.navigate = function(page, params = {}) {
  if (_focusActive && page !== 'chapter-detail') {
    _focusActive = false;
    document.body.classList.remove('focus-mode');
  }
  _origNavigateForFocus && _origNavigateForFocus(page, params);
};


// ══════════════════════════════════════════════════════════
//  SHARE RESULTS  📤
// ══════════════════════════════════════════════════════════
function shareResults() {
  const d = getXPData();
  const lvl = getLevel(d.xp);
  const done = JSON.parse(localStorage.getItem('medterm_done') || '[]');
  const text = `📚 تقدمي في MedTerm\n🏆 المستوى ${lvl} – ${LEVEL_NAMES[lvl]}\n✅ أكملت ${done.length} من 14 فصلاً\n💎 ${d.xp} XP مجمّعة\n\n#MedTerm #علم_التشريح`;
  if (navigator.share) {
    navigator.share({ title: 'MedTerm – تقدمي', text }).catch(() => copyToClipboard(text));
  } else {
    copyToClipboard(text);
  }
}

function copyToClipboard(text) {
  navigator.clipboard?.writeText(text)
    .then(() => showToast('📋 تم النسخ للحافظة!'))
    .catch(() => showToast('⚠️ تعذّر المشاركة'));
}
