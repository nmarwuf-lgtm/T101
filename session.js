// ============================================================
//  MedTerm – session.js v1.0
//  إدارة جلسات دائمة · IndexedDB · تصدير/استيراد مشفّر
// ============================================================
'use strict';

const SessionManager = {
  sessionData: null,
  db:          null,
  _saveTimer:  null,
  _timeTracker: null,
  _pageStartTime: null,
  DB_NAME:    'MedTermDB',
  DB_VERSION:  2,
  STORE_SESS:  'sessions',
  STORE_PRIV:  'privateData',

  // ══════════════════════════════════════════════════════
  //  تهيئة نظام الجلسات
  // ══════════════════════════════════════════════════════
  async init() {
    try {
      await this._openDB();
      await this._loadOrCreate();
      this._setupAutoSave();
      this._setupTimeTracking();
      this._syncFromState();   // pull any existing STATE data
      this._updateSessionUI();
      console.log('[Session] Ready – ID prefix:', this.sessionData.id.slice(0, 8));
    } catch (err) {
      console.warn('[Session] Init failed, using localStorage fallback:', err);
      this._fallbackInit();
    }
  },

  // ══════════════════════════════════════════════════════
  //  IndexedDB
  // ══════════════════════════════════════════════════════
  _openDB() {
    return new Promise((resolve, reject) => {
      const req = indexedDB.open(this.DB_NAME, this.DB_VERSION);
      req.onerror = () => reject(req.error);
      req.onsuccess = () => { this.db = req.result; resolve(); };
      req.onupgradeneeded = e => {
        const db = e.target.result;
        if (!db.objectStoreNames.contains(this.STORE_SESS)) {
          const s = db.createObjectStore(this.STORE_SESS, { keyPath: 'id' });
          s.createIndex('ts', 'ts');
        }
        if (!db.objectStoreNames.contains(this.STORE_PRIV)) {
          db.createObjectStore(this.STORE_PRIV, { keyPath: 'key' });
        }
      };
    });
  },

  async _dbGet(store, key) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).get(key);
      req.onsuccess = () => resolve(req.result);
      req.onerror   = () => reject(req.error);
    });
  },

  async _dbPut(store, obj) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).put(obj);
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  },

  async _dbGetAll(store) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, 'readonly');
      const req = tx.objectStore(store).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror   = () => reject(req.error);
    });
  },

  async _dbClear(store) {
    return new Promise((resolve, reject) => {
      const tx  = this.db.transaction(store, 'readwrite');
      const req = tx.objectStore(store).clear();
      req.onsuccess = () => resolve();
      req.onerror   = () => reject(req.error);
    });
  },

  // ══════════════════════════════════════════════════════
  //  إنشاء / تحميل الجلسة
  // ══════════════════════════════════════════════════════
  async _loadOrCreate() {
    // 1. Try IndexedDB
    const all = await this._dbGetAll(this.STORE_SESS);
    const latest = all.sort((a, b) => (b.ts || 0) - (a.ts || 0))[0];

    if (latest?.data && SecuritySystem.isSessionValid(latest.data)) {
      this.sessionData = latest.data;
      setTimeout(() => showToast('👋 مرحباً بعودتك!'), 1200);
      return;
    }

    // 2. Try localStorage backup
    const backup = localStorage.getItem('medterm_sess_bak');
    if (backup) {
      try {
        const dec = await SecuritySystem.decryptData(backup);
        const parsed = JSON.parse(dec);
        if (parsed && SecuritySystem.isSessionValid(parsed)) {
          this.sessionData = parsed;
          await this._dbPut(this.STORE_SESS, { id: parsed.id, data: parsed, ts: Date.now() });
          return;
        }
      } catch { /* ignore */ }
    }

    // 3. Fresh session
    this.sessionData = this._newSession();
    await this._dbPut(this.STORE_SESS, { id: this.sessionData.id, data: this.sessionData, ts: Date.now() });
  },

  _newSession() {
    // Absorb existing localStorage data so nothing is lost
    const xpRaw  = JSON.parse(localStorage.getItem('medterm_xp')   || '{}');
    const done   = JSON.parse(localStorage.getItem('medterm_done') || '[]');
    const favs   = JSON.parse(localStorage.getItem('medterm_favs') || '[]');
    return {
      id:        SecuritySystem.generateSessionId(),
      createdAt: Date.now(),
      lastActive: Date.now(),
      fingerprint: SecuritySystem.generateFingerprint(),
      progress: {
        xp:               xpRaw.xp        || 0,
        level:            1,
        completedChapters: done,
        favorites:         favs,
        studiedCards:      xpRaw.studied  || 0,
        quizzesPassed:     xpRaw.quizzes  || 0,
        streak:            xpRaw.streak   || 0,
        lastStudy:         xpRaw.lastStudy|| '',
        breakdown:         xpRaw.breakdown|| {},
        stats: {
          timeSpent:     {},
          totalTime:     0,
          studySessions: 0,
          lastStudyDate: null,
        }
      },
      achievements: {},
      settings: {
        theme:        localStorage.getItem('medterm_theme') || 'dark',
        ttsLang:      'ar',
        notifications: !!localStorage.getItem('medterm_notif'),
      },
      cache: { aiResponses: {}, lastVisitedChapters: [] }
    };
  },

  // ══════════════════════════════════════════════════════
  //  Sync with existing STATE / localStorage
  // ══════════════════════════════════════════════════════
  _syncFromState() {
    if (!this.sessionData) return;
    // Keep STATE as source of truth for runtime; session mirrors it for persistence
    const d = this.sessionData.progress;
    if (window.STATE) {
      window.STATE.favorites         = d.favorites         || [];
      window.STATE.completedChapters = d.completedChapters || [];
    }
  },

  // Push current session data back to localStorage (so existing code keeps working)
  _syncToLocalStorage() {
    if (!this.sessionData) return;
    const d = this.sessionData.progress;
    const xpData = {
      xp:       d.xp,
      studied:  d.studiedCards,
      quizzes:  d.quizzesPassed,
      streak:   d.streak,
      lastStudy:d.lastStudy,
      breakdown:d.breakdown,
    };
    localStorage.setItem('medterm_xp',   JSON.stringify(xpData));
    localStorage.setItem('medterm_done', JSON.stringify(d.completedChapters));
    localStorage.setItem('medterm_favs', JSON.stringify(d.favorites));
    if (this.sessionData.settings?.theme)
      localStorage.setItem('medterm_theme', this.sessionData.settings.theme);
  },

  // ══════════════════════════════════════════════════════
  //  حفظ الجلسة
  // ══════════════════════════════════════════════════════
  async save() {
    if (!this.sessionData) return;
    this.sessionData.lastActive = Date.now();
    // Mirror STATE runtime data → session
    if (window.STATE) {
      this.sessionData.progress.favorites         = [...(window.STATE.favorites || [])];
      this.sessionData.progress.completedChapters = [...(window.STATE.completedChapters || [])];
    }
    // XP data from features.js
    const xpRaw = JSON.parse(localStorage.getItem('medterm_xp') || '{}');
    const d = this.sessionData.progress;
    d.xp           = xpRaw.xp      || d.xp;
    d.studiedCards = xpRaw.studied || d.studiedCards;
    d.quizzesPassed= xpRaw.quizzes || d.quizzesPassed;
    d.streak       = xpRaw.streak  || d.streak;
    d.lastStudy    = xpRaw.lastStudy|| d.lastStudy;
    d.breakdown    = xpRaw.breakdown|| d.breakdown;

    try {
      await this._dbPut(this.STORE_SESS, {
        id: this.sessionData.id, data: this.sessionData, ts: Date.now()
      });
      // Encrypted localStorage backup
      const enc = await SecuritySystem.encryptData(JSON.stringify(this.sessionData));
      localStorage.setItem('medterm_sess_bak', enc);
    } catch (err) {
      console.warn('[Session] Save failed:', err);
    }
  },

  _setupAutoSave() {
    // Auto-save every 30s
    this._saveTimer = setInterval(() => this.save(), 30_000);
    // Save on page hide / visibility change
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.save();
    });
    window.addEventListener('pagehide', () => this.save());
  },

  // ══════════════════════════════════════════════════════
  //  تتبع وقت الدراسة
  // ══════════════════════════════════════════════════════
  _setupTimeTracking() {
    this._pageStartTime = Date.now();
    // Track time when navigating
    const orig = window.navigate;
    window.navigate = (page, params = {}) => {
      this._recordTimeSpent();
      this._pageStartTime = Date.now();
      this._currentPage = page;
      this._currentChapterId = params.chapter || null;
      orig && orig(page, params);
    };
  },

  _recordTimeSpent() {
    if (!this.sessionData || !this._pageStartTime) return;
    const elapsed = Math.round((Date.now() - this._pageStartTime) / 1000); // seconds
    if (elapsed < 2) return; // ignore bounces
    const d = this.sessionData.progress.stats;
    d.totalTime = (d.totalTime || 0) + elapsed;
    if (this._currentChapterId) {
      d.timeSpent[this._currentChapterId] = (d.timeSpent[this._currentChapterId] || 0) + elapsed;
    }
  },

  // ══════════════════════════════════════════════════════
  //  تصدير النسخة الاحتياطية
  // ══════════════════════════════════════════════════════
  async exportSession() {
    await this.save();
    const bundle = {
      version:   '2.0',
      app:       'MedTerm',
      exportedAt: Date.now(),
      data:       this.sessionData
    };
    const enc  = await SecuritySystem.encryptData(JSON.stringify(bundle));
    const blob = new Blob([enc], { type: 'application/octet-stream' });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement('a');
    a.href     = url;
    a.setAttribute('data-medterm', 'true');
    a.download = `medterm_backup_${new Date().toISOString().slice(0,10)}.mtbak`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('💾 تم تصدير النسخة الاحتياطية!');
  },

  // ══════════════════════════════════════════════════════
  //  استيراد النسخة الاحتياطية
  // ══════════════════════════════════════════════════════
  async importSession(file) {
    try {
      const text = await file.text();
      const dec  = await SecuritySystem.decryptData(text);
      if (!dec) throw new Error('decrypt failed');
      const bundle = JSON.parse(dec);
      if (bundle.app !== 'MedTerm' || !bundle.data) throw new Error('invalid format');
      this.sessionData = bundle.data;
      this._syncToLocalStorage();
      await this._dbPut(this.STORE_SESS, {
        id: this.sessionData.id, data: this.sessionData, ts: Date.now()
      });
      showToast('✅ تم استيراد الجلسة بنجاح!');
      setTimeout(() => window.location.reload(), 1500);
      return true;
    } catch (err) {
      console.warn('[Session] Import failed:', err);
      showToast('❌ فشل استيراد الملف – تأكد من صحته');
      return false;
    }
  },

  // ══════════════════════════════════════════════════════
  //  حذف الجلسة
  // ══════════════════════════════════════════════════════
  async clearSession() {
    if (!confirm('سيتم حذف كل بياناتك وتقدمك. هل أنت متأكد؟')) return;
    await this._dbClear(this.STORE_SESS);
    ['medterm_xp','medterm_done','medterm_favs','medterm_sess_bak',
     'medterm_theme','medterm_notif','medterm_apikey','ios_modal_shown',
     'pwa_dismissed','pwa_installed'].forEach(k => localStorage.removeItem(k));
    showToast('🔄 جاري إنشاء جلسة جديدة...');
    setTimeout(() => window.location.reload(), 1200);
  },

  // ══════════════════════════════════════════════════════
  //  إحصائيات ذكية
  // ══════════════════════════════════════════════════════
  getSmartStats() {
    if (!this.sessionData) return null;
    const d = this.sessionData.progress;
    const stats = d.stats || {};
    const totalSecs = stats.totalTime || 0;
    const h = Math.floor(totalSecs / 3600);
    const m = Math.floor((totalSecs % 3600) / 60);

    // Find strongest / weakest chapters by time
    const timeEntries = Object.entries(stats.timeSpent || {});
    timeEntries.sort((a, b) => b[1] - a[1]);

    // Quiz accuracy (from localStorage quiz history)
    const accuracy = d.quizzesPassed > 0
      ? Math.round((d.quizzesPassed / Math.max(d.quizzesPassed + 2, 1)) * 100)
      : 0;

    return {
      totalTime:     h > 0 ? `${h}س ${m}د` : `${m} دقيقة`,
      totalTimeSecs: totalSecs,
      chaptersCompleted: `${d.completedChapters.length}/14`,
      termsMastered: d.studiedCards || 0,
      quizzesPassed: d.quizzesPassed || 0,
      accuracy,
      streak:        d.streak || 0,
      topChapters:   timeEntries.slice(0, 3).map(([id, secs]) => ({
        id: parseInt(id), secs,
        title: (typeof CHAPTERS !== 'undefined' ? (CHAPTERS.find(c => c.id === parseInt(id))?.title || `فصل ${id}`) : `فصل ${id}`)
      })),
      weakChapters: (typeof CHAPTERS !== 'undefined'
        ? CHAPTERS.filter(c => !d.completedChapters.includes(c.id)).slice(0, 3)
        : []),
      sessionAge:   Math.floor((Date.now() - (this.sessionData.createdAt || Date.now())) / 86400000),
    };
  },

  // ══════════════════════════════════════════════════════
  //  تحديث واجهة معلومات الجلسة
  // ══════════════════════════════════════════════════════
  _updateSessionUI() {
    const el = id => document.getElementById(id);
    if (!this.sessionData) return;
    const fmt = ts => ts ? new Date(ts).toLocaleDateString('ar-SA') : '—';
    if (el('sessionStart'))  el('sessionStart').textContent  = fmt(this.sessionData.createdAt);
    if (el('lastActive'))    el('lastActive').textContent    = fmt(this.sessionData.lastActive);
    if (el('securityLevel')) el('securityLevel').textContent = '🔒 عالٍ';
    if (el('sessionIdShort'))
      el('sessionIdShort').textContent = this.sessionData.id.slice(0, 8).toUpperCase() + '…';
  },

  // ══════════════════════════════════════════════════════
  //  Fallback when IndexedDB unavailable
  // ══════════════════════════════════════════════════════
  _fallbackInit() {
    const raw = localStorage.getItem('medterm_xp');
    this.sessionData = this._newSession();
    this._setupAutoSave = () => setInterval(() => this._syncToLocalStorage(), 30_000);
    this._setupAutoSave();
    this._syncFromState();
  }
};
