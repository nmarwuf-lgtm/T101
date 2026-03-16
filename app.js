// ============================================================
//  MedTerm App v3.0 – app.js
//  Chapter 1 full rich content + Images gallery + PWA
// ============================================================

const STATE = {
  currentPage: 'home',
  currentChapter: null,
  currentMode: null,
  currentSource: 'doctor',
  translateLang: 'ar',
  favorites: JSON.parse(localStorage.getItem('medterm_favs') || '[]'),
  apiKey: localStorage.getItem('medterm_apikey') || '',
  ttsLang: 'ar',
  quizState: null,
  organFilter: 'all',
  completedChapters: JSON.parse(localStorage.getItem('medterm_done') || '[]'),
  aiCache: JSON.parse(sessionStorage.getItem('medterm_aicache') || '{}'),
};

// ── ROUTER ─────────────────────────────────────────────────
function navigate(page, params = {}) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  const el = document.getElementById('page-' + page);
  if (!el) return;
  el.classList.add('active');
  document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
  const nb = document.querySelector(`.nav-btn[data-page="${page}"]`);
  if (nb) nb.classList.add('active');
  STATE.currentPage = page;
  const hash = params.chapter ? `#${page}/${params.chapter}` : `#${page}`;
  history.pushState({ page, params }, '', hash);
  switch (page) {
    case 'home':           initHome(); break;
    case 'chapters':       initChapters(); break;
    case 'chapter-detail': initChapterDetail(params.chapter); break;
    case 'favorites':      initFavorites(); break;
    case 'quiz':           initQuiz(); break;
    case 'overview':       initOverview(); break;
    case 'body3d':         initBody3D(); break;
  }
  window.scrollTo(0, 0);
}

// ── HOME ───────────────────────────────────────────────────
function initHome() {
  updateStats();
  const grid = document.getElementById('homeChaptersGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CHAPTERS.slice(0, 6).forEach(ch => grid.appendChild(buildChapterCard(ch)));
}

function updateStats() {
  const favEl = document.getElementById('statFav');
  const doneEl = document.getElementById('statDone');
  const badge = document.getElementById('favBadge');
  if (favEl) favEl.textContent = STATE.favorites.length;
  if (doneEl) doneEl.textContent = STATE.completedChapters.length;
  if (badge) {
    badge.textContent = STATE.favorites.length;
    badge.style.display = STATE.favorites.length > 0 ? 'flex' : 'none';
  }
}

// ── CHAPTERS ───────────────────────────────────────────────
function initChapters() {
  const grid = document.getElementById('allChaptersGrid');
  if (!grid) return;
  grid.innerHTML = '';
  CHAPTERS.forEach(ch => grid.appendChild(buildChapterCard(ch)));
}

function buildChapterCard(ch) {
  const isFav = STATE.favorites.includes(ch.id);
  const isDone = STATE.completedChapters.includes(ch.id);
  const div = document.createElement('div');
  div.className = 'chapter-card' + (isFav ? ' favorited' : '');
  div.style.setProperty('--card-accent', ch.color);
  div.innerHTML = `
    <span class="card-fav">⭐</span>
    <div class="card-icon">${ch.icon}</div>
    <div>
      <div class="card-num">الفصل ${ch.id} · ص ${ch.pages}</div>
      <div class="card-title">${ch.title}</div>
      <div class="card-pages">${ch.titleEn}</div>
    </div>
    ${isDone ? '<div style="font-size:0.7rem;color:var(--green);font-weight:700;margin-top:4px">✓ مكتمل</div>' : ''}
  `;
  div.onclick = () => navigate('chapter-detail', { chapter: ch.id });
  return div;
}

// ── CHAPTER DETAIL ─────────────────────────────────────────
function initChapterDetail(chId) {
  const ch = CHAPTERS.find(c => c.id === chId);
  if (!ch) return;
  STATE.currentChapter = ch;
  STATE.currentMode = null;
  document.getElementById('chIcon').textContent = ch.icon;
  document.getElementById('chTag').textContent = `الفصل ${ch.id} · ص ${ch.pages}`;
  document.getElementById('chTitle').textContent = ch.title;
  document.getElementById('chDesc').textContent = ch.desc;
  const hero = document.getElementById('chapterHero');
  hero.style.borderRight = `4px solid ${ch.color}`;
  hero.style.background = `linear-gradient(135deg, ${ch.color}18, transparent)`;
  const idx = CHAPTERS.findIndex(c => c.id === chId);
  document.getElementById('chProgressFill').style.width = Math.round(((idx + 1) / CHAPTERS.length) * 100) + '%';
  updateFavButton();
  // Show images button only for chapters that have images
  const imgBtn = document.getElementById('chImagesBtn');
  if (imgBtn) imgBtn.style.display = ch.images && ch.images.length ? 'flex' : 'none';
  document.getElementById('chTabsWrap').style.display = 'none';
  document.getElementById('chTranslateWrap').style.display = 'none';
  document.getElementById('chImagesWrap') && (document.getElementById('chImagesWrap').style.display = 'none');
  document.getElementById('chSourceContent').innerHTML = '';
  document.getElementById('chTranslateContent').innerHTML = '';
}

function showChapterMode(mode) {
  STATE.currentMode = mode;
  const ch = STATE.currentChapter;
  // hide all panels
  document.getElementById('chTabsWrap').style.display = 'none';
  document.getElementById('chTranslateWrap').style.display = 'none';
  const imgWrap = document.getElementById('chImagesWrap');
  if (imgWrap) imgWrap.style.display = 'none';

  if (mode === 'explain') {
    document.getElementById('chTabsWrap').style.display = 'block';
    switchSource('doctor');
  } else if (mode === 'translate') {
    document.getElementById('chTranslateWrap').style.display = 'block';
    renderTranslation('ar');
  } else if (mode === 'images') {
    if (imgWrap) { imgWrap.style.display = 'block'; renderChapterImages(ch); }
  }
  markDone(ch.id);
  setTimeout(() => {
    const target = mode === 'explain' ? 'chTabsWrap' : mode === 'translate' ? 'chTranslateWrap' : 'chImagesWrap';
    const el = document.getElementById(target);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, 100);
}

function markDone(chId) {
  if (!STATE.completedChapters.includes(chId)) {
    STATE.completedChapters.push(chId);
    localStorage.setItem('medterm_done', JSON.stringify(STATE.completedChapters));
    updateStats();
  }
}

// ── CHAPTER IMAGES ─────────────────────────────────────────
function renderChapterImages(ch) {
  const wrap = document.getElementById('chImagesWrap');
  if (!wrap || !ch.images || !ch.images.length) return;
  wrap.innerHTML = `
    <div class="images-header">
      <h3>🖼️ صور الفصل ${ch.id}</h3>
      <span class="source-meta">${ch.images.length} صورة تشريحية مشروحة</span>
    </div>
    <div class="images-gallery">
      ${ch.images.map((img, i) => `
        <div class="img-card" id="imgCard_${img.id}">
          <div class="img-header">
            <span class="img-title">${img.title}</span>
            <span class="img-title-en">${img.titleEn}</span>
          </div>
          <div class="img-wrapper" onclick="openImgLightbox('${esc(img.url)}','${esc(img.fallback||img.url)}','${esc(img.title)}')">
            <img data-src="${img.url}"
                 src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1' height='1'%3E%3C/svg%3E"
                 alt="${img.title}"
                 data-fallback="${esc(img.fallback||img.url)}"
                 class="img-photo lazy-img"/>
            <div class="img-zoom-hint">🔍 اضغط للتكبير</div>
          </div>
          ${img.labels && img.labels.length ? `
            <div class="img-labels">
              ${img.labels.map(l=>`<span class="img-label">${l}</span>`).join('')}
            </div>` : ''}
          <div class="img-desc">
            <button class="speak-btn" onclick="speakText('${esc(img.desc)}','ar-SA')" style="flex-shrink:0">🔊</button>
            <p>${img.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>`;
  requestAnimationFrame(initLazyImages);
}

/**
 * initLazyImages – Loads images only when they scroll into view.
 * Uses IntersectionObserver for performance; falls back to direct load.
 */
function initLazyImages() {
  const imgs = document.querySelectorAll('img.lazy-img[data-src]');
  if (!imgs.length) return;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const img = entry.target;
        img.src = img.dataset.src;
        img.onerror = () => {
          const fb = img.dataset.fallback;
          if (fb && fb !== img.src) { img.src = fb; img.onerror = null; }
          else { img.style.minHeight = '80px'; img.alt = '⚠️ تعذّر تحميل الصورة'; }
        };
        img.removeAttribute('data-src');
        obs.unobserve(img);
      });
    }, { rootMargin: '250px 0px' });
    imgs.forEach(img => observer.observe(img));
  } else {
    imgs.forEach(img => { img.src = img.dataset.src; img.removeAttribute('data-src'); });
  }
}
function openImgLightbox(url, fallback, title) {
  const box = document.createElement('div');
  box.className = 'img-lightbox';
  box.innerHTML = `
    <button class="lb-close" onclick="this.closest('.img-lightbox').remove()">✕</button>
    <div class="lb-inner">
      <img src="${url}" alt="${title}" onerror="this.src='${fallback}'" class="lb-img"/>
      <p class="lb-title">${title}</p>
    </div>`;
  box.onclick = e => { if (e.target === box) box.remove(); };
  document.body.appendChild(box);
}

// ── SOURCE TABS ────────────────────────────────────────────
// Debounce timer for AI source switching
let _switchTimer = null;

function switchSource(source) {
  STATE.currentSource = source;
  document.querySelectorAll('.ch-tab').forEach(t => t.classList.toggle('active', t.dataset.source === source));
  const ch = STATE.currentChapter;
  const container = document.getElementById('chSourceContent');
  if (source === 'doctor') {
    clearTimeout(_switchTimer);
    renderDoctorExplain(ch, container);
  } else {
    // Debounce AI calls by 350ms to prevent spam when clicking tabs quickly
    clearTimeout(_switchTimer);
    _switchTimer = setTimeout(() => renderAIExplain(ch, source, container), 350);
  }
}

// ── DOCTOR EXPLAIN – rich version for ch1, standard for others ──
function renderDoctorExplain(ch, container) {
  // Rich chapter 1 with sections
  if (ch.id === 1 && ch.sections) {
    renderDoctorExplainRich(ch, container);
    return;
  }
  // Standard
  const termsHTML = ch.terms.map(t => buildTermRow(t, ch)).join('');
  container.innerHTML = `
    <div class="source-header">
      <div>
        <h3>👨‍⚕️ شرح الدكتور – الفصل ${ch.id}</h3>
        <span class="source-meta">${ch.terms.length} مصطلح · ${ch.pages} صفحة</span>
      </div>
      <button class="speak-btn speak-all" onclick="speakText('${esc(ch.overview)}','ar-SA')">🔊 استمع</button>
    </div>
    <div class="source-body">
      <div class="section-block">
        <h4>📌 نظرة عامة على الفصل</h4>
        <p>${ch.overview}</p>
      </div>
      <div class="section-block">
        <h4>📚 المصطلحات الأساسية</h4>
        ${termsHTML}
      </div>
      <div class="highlight-box">
        <strong>💡 تذكر:</strong> هذا الفصل يشمل الصفحات ${ch.pages} – احفظ المصطلحات باللغتين للامتحانات.
      </div>
    </div>`;
}

function renderDoctorExplainRich(ch, container) {
  // Build sections accordion
  const sectionsHTML = ch.sections.map((sec, si) => `
    <div class="rich-section" id="rsec_${sec.id}">
      <div class="rich-sec-header" onclick="toggleRichSection('rsec_${sec.id}')">
        <span class="rsec-icon">${sec.icon}</span>
        <span class="rsec-title">${sec.title}</span>
        <svg class="rsec-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-width="2"/></svg>
      </div>
      <div class="rich-sec-body ${si===0?'open':''}">
        ${sec.content.map(item => `
          <div class="rich-item">
            <div class="rich-item-heading">
              <span>${item.heading}</span>
              <button class="speak-btn" onclick="speakText('${esc(item.body)}','ar-SA')">🔊 AR</button>
              ${item.bodyEn ? `<button class="speak-btn" onclick="speakText('${esc(item.bodyEn)}','en-US')">🔊 EN</button>` : ''}
            </div>
            <p class="rich-item-body">${item.body.replace(/\n/g,'<br>')}</p>
            ${item.bodyEn ? `<p class="rich-item-en">${item.bodyEn.replace(/\n/g,'<br>')}</p>` : ''}
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  const termsHTML = ch.terms.map(t => buildTermRow(t, ch)).join('');

  container.innerHTML = `
    <div class="source-header">
      <div>
        <h3>👨‍⚕️ شرح الدكتور – الفصل ${ch.id}</h3>
        <span class="source-meta">${ch.terms.length} مصطلح · ${ch.sections.length} موضوع · ${ch.pages} صفحة</span>
      </div>
      <button class="speak-btn speak-all" onclick="speakText('${esc(ch.overview)}','ar-SA')">🔊 استمع</button>
    </div>
    <div class="source-body">
      <div class="section-block">
        <h4>📌 نظرة عامة</h4>
        <p>${ch.overview}</p>
        ${ch.author ? `<p class="rich-author">📖 المصدر: ${ch.author}</p>` : ''}
      </div>

      <div class="section-block">
        <h4>📋 مواضيع الفصل (اضغط لفتح كل موضوع)</h4>
        <div class="rich-sections">${sectionsHTML}</div>
      </div>

      <div class="section-block">
        <h4>📚 المصطلحات الكاملة (${ch.terms.length} مصطلح)</h4>
        ${termsHTML}
      </div>

      <div class="highlight-box">
        <strong>💡 للامتحان:</strong> احفظ الاتجاهات الـ11 مع أمثلتها، وتسلسل مستويات التنظيم، ومكونات التوازن الداخلي.
      </div>
    </div>`;
}

function toggleRichSection(id) {
  const sec = document.getElementById(id);
  if (!sec) return;
  const body = sec.querySelector('.rich-sec-body');
  const arrow = sec.querySelector('.rsec-arrow');
  body.classList.toggle('open');
  arrow.style.transform = body.classList.contains('open') ? 'rotate(90deg)' : '';
}

function buildTermRow(t, ch) {
  const pron = t.pron ? `<span class="term-pron">النطق: ${t.pron}</span>` : '';
  return `
    <div class="term-row">
      <div class="term-dot" style="background:${ch.color}25;color:${ch.color}">📖</div>
      <div class="term-content">
        <div class="term-en">
          <span class="term-en-word">${t.en}</span>
          <button class="speak-btn" onclick="speakText('${esc(t.en)}','en-US')">🔊 EN</button>
          <button class="speak-btn" onclick="speakText('${esc(t.ar)}','ar-SA')">🔊 AR</button>
        </div>
        <div class="term-ar">${t.ar}</div>
        ${pron}
        <div class="term-desc">${t.desc}</div>
      </div>
    </div>`;
}

// ── AI EXPLAIN ─────────────────────────────────────────────
// ── AI SERVICE (API Key never exposed in plain network calls) ─────────────────
const AIService = {
  /**
   * Sends a request to the Anthropic API.
   * The API key is read from STATE at call-time and never stored in network logs
   * beyond the encrypted HTTPS layer. Users are warned to use a proxy for prod.
   */
  async call(prompt) {
    const key = STATE.apiKey;
    if (!key) return null;
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': key,
        'anthropic-version': '2023-06-01',
        'anthropic-dangerous-direct-browser-access': 'true'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1200,
        messages: [{ role: 'user', content: prompt }]
      })
    });
    if (!res.ok) throw new Error('API ' + res.status);
    const data = await res.json();
    return data.content?.[0]?.text || '';
  },

  /** Session-scoped cache stored in sessionStorage */
  cacheGet(key) {
    try {
      const cache = JSON.parse(sessionStorage.getItem('medterm_aicache') || '{}');
      return cache[key] || null;
    } catch { return null; }
  },
  cacheSet(key, value) {
    try {
      const cache = JSON.parse(sessionStorage.getItem('medterm_aicache') || '{}');
      cache[key] = value;
      // Limit cache size to 50 entries to avoid quota errors
      const keys = Object.keys(cache);
      if (keys.length > 50) delete cache[keys[0]];
      sessionStorage.setItem('medterm_aicache', JSON.stringify(cache));
      STATE.aiCache[key] = value;
    } catch (e) { console.warn('AI cache write failed:', e); }
  }
};

async function renderAIExplain(ch, source, container) {
  const labels = {
    chatgpt:  { name: '🤖 ChatGPT',    color: '#10b981' },
    gemini:   { name: '✨ Gemini',      color: '#f59e0b' },
    notebook: { name: '📓 NotebookLM', color: '#8b5cf6' }
  };
  const lbl = labels[source];
  const cacheKey = `${ch.id}_${source}`;

  // 1. Return from cache immediately
  const cached = AIService.cacheGet(cacheKey);
  if (cached) { renderAIContent(container, lbl, cached, ch); return; }

  container.innerHTML = `<div class="source-loading"><div class="spinner"></div><p>جاري توليد شرح ${lbl.name}…</p></div>`;

  // 2. Chapter 1 has pre-embedded AI content — no API call needed
  if (ch.id === 1 && ch.aiContent?.[source]) {
    AIService.cacheSet(cacheKey, ch.aiContent[source]);
    renderAIContent(container, lbl, ch.aiContent[source], ch);
    return;
  }

  // 3. No API key — show demo content with a hint
  if (!STATE.apiKey) {
    const demo = buildDemoAIContent(ch, source);
    AIService.cacheSet(cacheKey, demo);
    renderAIContent(container, lbl, demo, ch);
    showToast('💡 أضف API Key لشرح ذكاء اصطناعي مباشر');
    return;
  }

  // 4. Live API call
  try {
    const text = await AIService.call(buildAIPrompt(ch, source));
    if (!text) throw new Error('empty response');
    AIService.cacheSet(cacheKey, text);
    renderAIContent(container, lbl, text, ch);
  } catch (err) {
    console.warn('AI explain failed:', err);
    const demo = buildDemoAIContent(ch, source);
    renderAIContent(container, lbl, demo, ch);
    showToast('⚠️ خطأ في الاتصال – عرض محتوى تجريبي');
  }
}

function buildAIPrompt(ch, source) {
  const styles = {
    chatgpt:  'أسلوب ChatGPT: شرح واضح بنقاط، سهل للمبتدئ مع أمثلة عملية',
    gemini:   'أسلوب Gemini: تحليلي مع ربط المعلومات بالسياق العلمي والتطبيقي',
    notebook: 'أسلوب NotebookLM: ملاحظات دراسية أكاديمية منظمة للمراجعة'
  };
  return `أنت مساعد تعليمي لطلاب التمريض. اشرح الفصل التالي بـ${styles[source]}.

الفصل: ${ch.title} (${ch.titleEn}) | الصفحات: ${ch.pages}
الموضوع: ${ch.overview}
المصطلحات: ${ch.terms.map(t=>`${t.en}(${t.ar})`).join(', ')}

المطلوب: مقدمة مبسطة (3 جمل) + أهم 5 نقاط للحفظ + التطبيق التمريضي + نصيحة للمراجعة.
الرد بالعربية فقط.`;
}

function buildDemoAIContent(ch, source) {
  const s = {
    chatgpt: `📌 **مقدمة:**\n${ch.overview}\n\n✅ **أهم 5 نقاط:**\n${ch.terms.slice(0,5).map((t,i)=>`${i+1}. **${t.en}** (${t.ar}): ${t.desc}`).join('\n')}\n\n🏥 **التطبيق التمريضي:**\nفهم هذا الفصل أساسي لأي ممرض للتعامل مع المرضى وقراءة التقارير الطبية.\n\n💡 **نصيحة:** اكتب المصطلحات يومياً مع صور ذهنية!`,
    gemini:  `🔬 **التحليل العلمي:**\n${ch.overview}\n\nالمصطلحات المحورية:\n${ch.terms.slice(0,5).map(t=>`• **${t.en}**: ${t.desc}`).join('\n')}\n\n🔗 **الترابط:** فهم هذه المفاهيم يساعد في ربط الفصول وتطبيقها سريرياً.`,
    notebook:`📓 **ملاحظات الفصل ${ch.id}:**\n**العنوان:** ${ch.title}\n**الصفحات:** ${ch.pages}\n\n**الملخص:**\n${ch.overview}\n\n**المصطلحات:**\n${ch.terms.slice(0,6).map(t=>`• ${t.en} | ${t.ar} – ${t.desc}`).join('\n')}\n\n**للمراجعة:**\n- راجع مرتين يومياً\n- استخدم Flash Cards`
  };
  return s[source] || s.chatgpt;
}

function renderAIContent(container, lbl, content, ch) {
  const html = content.replace(/\*\*(.*?)\*\*/g,'<strong>$1</strong>').replace(/\n/g,'<br>').replace(/• /g,'&bull; ');
  container.innerHTML = `
    <div class="source-header">
      <div>
        <h3>${lbl.name} – الفصل ${ch.id}</h3>
        <span class="source-meta" style="color:${lbl.color}">ذكاء اصطناعي</span>
      </div>
      <button class="speak-btn speak-all" onclick="speakText('${esc(content.replace(/\*\*/g,''))}','ar-SA')">🔊 استمع</button>
    </div>
    <div class="source-body">
      <div class="section-block"><p style="line-height:2">${html}</p></div>
      <div class="highlight-box"><strong>📣 ملاحظة:</strong> مولّد بالذكاء الاصطناعي – قارنه دائماً بالكتاب.</div>
    </div>`;
}

// ── TRANSLATION ─────────────────────────────────────────────
function setTranslateLang(lang) {
  STATE.translateLang = lang;
  document.querySelectorAll('.trl-lang').forEach(b => {
    b.classList.toggle('active', b.textContent.includes(lang === 'ar' ? 'العربية' : 'English'));
  });
  renderTranslation(lang);
}

function renderTranslation(lang) {
  const ch = STATE.currentChapter;
  const container = document.getElementById('chTranslateContent');
  const rows = ch.terms.map(t => {
    const primary = lang === 'ar' ? t.ar : t.en;
    const secondary = lang === 'ar' ? t.en : t.ar;
    const spLang = lang === 'ar' ? 'ar-SA' : 'en-US';
    const pron = t.pron ? `<span class="term-pron">🗣️ ${t.pron}</span>` : '';
    return `
      <div class="term-row">
        <div class="term-dot" style="background:var(--accent-soft);color:var(--accent)">🌐</div>
        <div class="term-content">
          <div class="term-en">
            <span class="term-en-word">${primary}</span>
            <button class="speak-btn" onclick="speakText('${esc(primary)}','${spLang}')">🔊</button>
            <button class="speak-btn" onclick="speakText('${esc(secondary)}','${lang==='ar'?'en-US':'ar-SA'}')">🔊 ${lang==='ar'?'EN':'AR'}</button>
          </div>
          <div class="term-ar">${secondary}</div>
          ${pron}
          <div class="term-desc">${t.desc}</div>
        </div>
      </div>`;
  }).join('');

  container.innerHTML = `
    <div class="source-header">
      <div>
        <h3>🌐 ترجمة الفصل ${ch.id} – ${lang==='ar'?'عربي':'English'}</h3>
        <span class="source-meta">${ch.terms.length} مصطلح مع النطق</span>
      </div>
    </div>
    <div class="source-body">${rows}</div>`;
}

// ── FAVORITES ──────────────────────────────────────────────
function toggleChapterFav() {
  const ch = STATE.currentChapter; if (!ch) return;
  const idx = STATE.favorites.indexOf(ch.id);
  if (idx > -1) { STATE.favorites.splice(idx,1); showToast('🗑️ تمت الإزالة من المفضلة'); }
  else { STATE.favorites.push(ch.id); showToast('⭐ تمت الإضافة إلى المفضلة!'); }
  localStorage.setItem('medterm_favs', JSON.stringify(STATE.favorites));
  updateFavButton(); updateStats();
}

function updateFavButton() {
  const btn = document.getElementById('chFavBtn'); if (!btn || !STATE.currentChapter) return;
  btn.classList.toggle('active', STATE.favorites.includes(STATE.currentChapter.id));
}

function initFavorites() {
  const c = document.getElementById('favoritesContainer'); if (!c) return;
  if (STATE.favorites.length === 0) {
    c.innerHTML = `<div class="empty-state"><div class="em-icon">⭐</div><h3>لا يوجد مفضلة بعد</h3><p>اضغط على النجمة ⭐ في أي فصل لحفظه هنا</p></div>`;
    return;
  }
  c.innerHTML = `<div class="favorites-list">${CHAPTERS.filter(ch=>STATE.favorites.includes(ch.id)).map(ch=>`
    <div class="fav-item" onclick="navigate('chapter-detail',{chapter:${ch.id}})">
      <div class="fav-item-icon" style="background:${ch.color}22;border:1px solid ${ch.color}44">${ch.icon}</div>
      <div class="fav-item-info"><h4>${ch.title}</h4><p>الفصل ${ch.id} · ص ${ch.pages} · ${ch.titleEn}</p></div>
      <button class="fav-remove" onclick="event.stopPropagation();removeFav(${ch.id})">
        <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke-width="2"/></svg>
      </button>
    </div>`).join('')}</div>`;
}

function removeFav(chId) {
  const idx = STATE.favorites.indexOf(chId);
  if (idx > -1) STATE.favorites.splice(idx,1);
  localStorage.setItem('medterm_favs', JSON.stringify(STATE.favorites));
  updateStats(); initFavorites();
  showToast('🗑️ تمت الإزالة من المفضلة');
}

// ── QUIZ ───────────────────────────────────────────────────
function initQuiz() {
  const c = document.getElementById('quizContainer'); if (!c) return;
  if (STATE.quizState) { renderQuizGame(c); return; }
  c.innerHTML = `
    <div class="quiz-intro"><div class="quiz-intro-icon">🧠</div><h3>اختر فصلاً لتبدأ الاختبار</h3><p>كل فصل يحتوي على أسئلة متعددة الاختيار</p></div>
    <div class="quiz-selector">
      <button class="quiz-chapter-btn quiz-all-btn" onclick="startQuizAll()">
        <div class="q-icon">🎯</div><div class="q-info"><h4>اختبار شامل</h4><p>جميع الفصول</p></div>
        <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/></svg>
      </button>
      ${CHAPTERS.map(ch=>`
        <button class="quiz-chapter-btn" onclick="startQuiz(${ch.id})" style="--qcolor:${ch.color}">
          <div class="q-icon">${ch.icon}</div>
          <div class="q-info"><h4>${ch.title}</h4><p>${ch.quiz.length} سؤال · الفصل ${ch.id}</p></div>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-width="2" stroke-linecap="round"/></svg>
        </button>`).join('')}
    </div>`;
}

function startQuiz(chId) {
  const ch = CHAPTERS.find(c => c.id === chId); if (!ch) return;
  STATE.quizState = { chapter: ch, questions: shuffle([...ch.quiz]), current: 0, score: 0, answered: false, done: false, isAll: false };
  renderQuizGame(document.getElementById('quizContainer'));
}

function startQuizAll() {
  const allQ = CHAPTERS.flatMap(ch => ch.quiz.map(q => ({ ...q, chTitle: ch.title })));
  STATE.quizState = {
    chapter: { title: 'اختبار شامل', icon: '🎯', id: 0 },
    questions: shuffle(allQ).slice(0, 20),
    current: 0, score: 0, answered: false, done: false, isAll: true
  };
  renderQuizGame(document.getElementById('quizContainer'));
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function renderQuizGame(container) {
  const qs = STATE.quizState; if (!qs) return;
  if (qs.done) {
    const pct = Math.round((qs.score / qs.questions.length) * 100);
    const emoji = pct >= 80 ? '🏆' : pct >= 50 ? '✅' : '📚';
    container.innerHTML = `
      <div class="quiz-result">
        <div class="result-icon">${emoji}</div>
        <div class="result-score">${qs.score}<span>/${qs.questions.length}</span></div>
        <div class="result-pct">${pct}%</div>
        <div class="result-msg">${pct>=80?'ممتاز! أداء رائع 🎉':pct>=50?'جيد! استمر في المراجعة 💪':'راجع الفصل مرة أخرى 📖'}</div>
        <div class="result-btns">
          <button class="retry-btn" onclick="STATE.quizState=null;initQuiz()">اختر فصلاً آخر</button>
          <button class="retry-btn secondary" onclick="${qs.isAll?'startQuizAll()':'startQuiz('+qs.chapter.id+')'}">إعادة الاختبار</button>
        </div>
      </div>`;
    return;
  }
  const q = qs.questions[qs.current];
  container.innerHTML = `
    <div class="quiz-game">
      <div class="quiz-header"><h3>${qs.chapter.icon} ${qs.chapter.title}</h3><span class="quiz-score">✅ ${qs.score} نقطة</span></div>
      <div class="quiz-progress"><div class="quiz-progress-fill" style="width:${(qs.current/qs.questions.length)*100}%"></div></div>
      <div class="question-card">
        <div class="question-num">سؤال ${qs.current+1} من ${qs.questions.length}</div>
        <div class="question-text">${q.q}</div>
      </div>
      <div class="answers-grid">
        ${q.opts.map((opt,i)=>`<button class="answer-btn" id="ans_${i}" onclick="answerQuiz(${i})">${opt}</button>`).join('')}
      </div>
    </div>`;
}

function answerQuiz(idx) {
  const qs = STATE.quizState; if (!qs || qs.answered) return;
  qs.answered = true;
  const q = qs.questions[qs.current];
  const btns = document.querySelectorAll('.answer-btn');
  btns.forEach(b => b.disabled = true);
  if (idx === q.ans) { btns[idx].classList.add('correct'); qs.score++; showToast('✅ إجابة صحيحة!'); }
  else { btns[idx].classList.add('wrong'); if (btns[q.ans]) btns[q.ans].classList.add('correct'); showToast('❌ إجابة خاطئة'); }
  setTimeout(() => {
    qs.current++; qs.answered = false;
    if (qs.current >= qs.questions.length) qs.done = true;
    renderQuizGame(document.getElementById('quizContainer'));
  }, 1300);
}

// ── OVERVIEW ───────────────────────────────────────────────
function initOverview() {
  const grid = document.getElementById('overviewGrid'); if (!grid) return;
  grid.innerHTML = '';
  CHAPTERS.forEach(ch => {
    const card = document.createElement('div');
    card.className = 'overview-card';
    card.style.setProperty('--ov-color', ch.color);
    card.innerHTML = `
      <div class="overview-card-header" onclick="toggleOverview(this.parentElement)">
        <span class="ov-icon">${ch.icon}</span>
        <span class="ov-title">الفصل ${ch.id}: ${ch.title}</span>
        <svg class="ov-arrow" width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 18l6-6-6-6" stroke-width="2"/></svg>
      </div>
      <div class="overview-card-body">
        <div class="ov-meta"><span>📄 ${ch.pages}</span><span>🌐 ${ch.titleEn}</span><span>📝 ${ch.quiz.length} أسئلة</span>${ch.images?`<span>🖼️ ${ch.images.length} صورة</span>`:''}</div>
        <p>${ch.overview}</p>
        <div class="ov-terms">${ch.terms.slice(0,4).map(t=>`<span class="ov-term-chip">${t.en}</span>`).join('')}</div>
        <div class="ov-actions">
          <button onclick="navigate('chapter-detail',{chapter:${ch.id}})">فتح الفصل →</button>
          <button onclick="startQuiz(${ch.id});navigate('quiz')">اختبار 🧠</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

function toggleOverview(card) { card.classList.toggle('expanded'); }

// ── BODY 3D ────────────────────────────────────────────────
function initBody3D() {
  const container = document.getElementById('bodyExplorer'); if (!container) return;
  const cats = ['all','nervous','cardiovascular','respiratory','digestive','urinary','lymphatic'];
  const catLbls = { all:'الكل', nervous:'عصبي', cardiovascular:'دوري', respiratory:'تنفسي', digestive:'هضمي', urinary:'بولي', lymphatic:'ليمفاوي' };
  const filtered = STATE.organFilter === 'all' ? ORGANS : ORGANS.filter(o => o.category === STATE.organFilter);
  container.innerHTML = `
    <div class="organs-filter">${cats.map(c=>`<button class="filter-btn${STATE.organFilter===c?' active':''}" onclick="filterOrgans('${c}')">${catLbls[c]}</button>`).join('')}</div>
    <div class="organs-grid">${filtered.map(o=>`
      <div class="organ-card" onclick="openOrganModal(${o.id})">
        <div class="organ-emoji">${o.emoji}</div>
        <div class="organ-name-ar">${o.nameAr}</div>
        <div class="organ-name-en">${o.nameEn}</div>
      </div>`).join('')}
    </div>
    <div class="organ-modal-overlay" id="organModalOverlay" onclick="handleOrganModalClick(event)">
      <div class="organ-modal" id="organModalContent"><div class="modal-handle"></div></div>
    </div>`;
}

function filterOrgans(cat) { STATE.organFilter = cat; initBody3D(); }

function openOrganModal(organId) {
  const organ = ORGANS.find(o => o.id === organId); if (!organ) return;
  document.getElementById('organModalContent').innerHTML = `
    <div class="modal-handle"></div>
    <button class="close-organ-modal" onclick="closeOrganModal()">✕ إغلاق</button>
    <h3>${organ.emoji} ${organ.nameAr}</h3>
    <p class="em-sub">${organ.nameEn}&nbsp;
      <button class="speak-btn" onclick="speakText('${esc(organ.nameEn)}','en-US')">🔊 EN</button>
      <button class="speak-btn" onclick="speakText('${esc(organ.nameAr)}','ar-SA')">🔊 AR</button>
    </p>
    <div class="organ-3d-view"><div class="organ-3d-anim">${organ.emoji}</div><span class="organ-3d-label">محاكاة تفاعلية</span></div>
    <div class="organ-facts">${organ.facts.map(f=>`<div class="organ-fact"><span class="fact-icon">💡</span><span class="fact-text">${f}</span></div>`).join('')}</div>`;
  document.getElementById('organModalOverlay').classList.add('visible');
}

function closeOrganModal() {
  const el = document.getElementById('organModalOverlay'); if (el) el.classList.remove('visible');
}
function handleOrganModalClick(e) {
  if (e.target === document.getElementById('organModalOverlay')) closeOrganModal();
}

// ── TTS ────────────────────────────────────────────────────
function speakText(text, lang) {
  if (!('speechSynthesis' in window)) { showToast('⚠️ المتصفح لا يدعم النطق'); return; }
  window.speechSynthesis.cancel();
  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = lang || (STATE.ttsLang === 'ar' ? 'ar-SA' : 'en-US');
  utter.rate = 0.85; utter.pitch = 1;
  const bar = document.getElementById('audioBar');
  const titleEl = document.getElementById('audioTitle');
  const langEl  = document.getElementById('audioLang');
  const fillEl  = document.getElementById('audioProgressFill');
  if (titleEl) titleEl.textContent = text.slice(0,45) + (text.length > 45 ? '…' : '');
  if (langEl)  langEl.textContent  = utter.lang.startsWith('ar') ? 'AR' : 'EN';
  if (bar)     bar.style.display   = 'flex';
  if (fillEl)  fillEl.style.width  = '0%';

  // Use boundary events for accurate progress instead of guessing duration
  let charCount = 0;
  const totalChars = text.length || 1;
  utter.addEventListener('boundary', (e) => {
    if (e.charIndex !== undefined && fillEl) {
      fillEl.style.width = Math.min(100, Math.round((e.charIndex / totalChars) * 100)) + '%';
    }
  });
  utter.onend = () => {
    if (fillEl) fillEl.style.width = '100%';
    setTimeout(() => { if (bar) bar.style.display = 'none'; }, 900);
  };
  utter.onerror = () => { if (bar) bar.style.display = 'none'; };
  window.speechSynthesis.speak(utter);
}

function stopAudio() { window.speechSynthesis.cancel(); document.getElementById('audioBar').style.display='none'; }
function toggleAudioLang() { STATE.ttsLang = STATE.ttsLang==='ar'?'en':'ar'; document.getElementById('langSwitch').textContent = STATE.ttsLang.toUpperCase(); }

// ── SIDEBAR ────────────────────────────────────────────────
function openSidebar() {
  document.getElementById('sideDrawer').classList.add('open');
  document.getElementById('sidebarOverlay').classList.add('visible');
  document.body.style.overflow = 'hidden';
  buildDrawerChapters();
}
function closeSidebar() {
  document.getElementById('sideDrawer').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');
  document.body.style.overflow = '';
}
function buildDrawerChapters() {
  const el = document.getElementById('drawerChaptersList');
  if (!el || el.children.length > 0) return;
  el.innerHTML = CHAPTERS.map(ch => `
    <a href="#" onclick="navigate('chapter-detail',{chapter:${ch.id}});closeSidebar()" style="font-size:0.82rem;padding:8px 14px;gap:8px">
      <span>${ch.icon}</span> ${ch.title}
    </a>`).join('');
}

// ── TOAST ──────────────────────────────────────────────────
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2500);
}

// ── API KEY ────────────────────────────────────────────────
function openApiModal() {
  const m = document.getElementById('apiModal');
  if (m) { m.classList.add('visible'); const i=document.getElementById('apiKeyInput'); if(i&&STATE.apiKey)i.value=STATE.apiKey; }
}
function closeApiModal() { const m=document.getElementById('apiModal'); if(m)m.classList.remove('visible'); }
function saveApiKey() {
  const i=document.getElementById('apiKeyInput'); if (!i) return;
  const key=i.value.trim();
  if (key) { STATE.apiKey=key; localStorage.setItem('medterm_apikey',key); closeApiModal(); showToast('✅ تم حفظ API Key!'); }
  else showToast('⚠️ أدخل المفتاح أولاً');
}
window.openApiModal = openApiModal;

// ── HELPER ────────────────────────────────────────────────
/**
 * esc() – Safe escaping for use inside HTML attribute strings (onclick="...").
 * Prevents XSS by encoding all dangerous characters as HTML entities.
 * @param {string} str - raw input
 * @param {number} max - max length (default 200)
 */
function esc(str, max = 200) {
  return (str || '')
    .slice(0, max)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\\/g, '&#92;')
    .replace(/\n/g, ' ')
    .replace(/\r/g, '');
}

// ── INIT ───────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  const hash = location.hash.replace('#','');
  if (hash) { const p=hash.split('/'); navigate(p[0], p[1]?{chapter:parseInt(p[1])}:{}); }
  else navigate('home');
  document.addEventListener('keydown', e => {
    if (e.key==='Escape') { closeSidebar(); closeApiModal(); closeOrganModal(); }
  });
  if (!STATE.apiKey) setTimeout(()=>showToast('🔑 أضف API Key للذكاء الاصطناعي'), 2500);
});
window.addEventListener('popstate', () => {
  const hash = location.hash.replace('#','');
  if (hash) { const p=hash.split('/'); navigate(p[0], p[1]?{chapter:parseInt(p[1])}:{}); }
});
