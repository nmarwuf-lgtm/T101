// ============================================================
//  MedTerm Service Worker v4.0 – Full Offline Support
// ============================================================
const CACHE_NAME = 'medterm-v6.0';
const FONT_CACHE = 'medterm-fonts-v1';

const APP_FILES = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './data.js',
  './features.js',
  './security.js',
  './session.js',
  './manifest.json',
  './icons/icon-72.png',
  './icons/icon-96.png',
  './icons/icon-128.png',
  './icons/icon-144.png',
  './icons/icon-152.png',
  './icons/icon-192.png',
  './icons/icon-384.png',
  './icons/icon-512.png',
];

const FONT_URLS = [
  'https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&family=Tajawal:wght@300;400;500;700;800&display=swap',
];

// ── INSTALL: cache all app files ──────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    Promise.all([
      caches.open(CACHE_NAME).then(cache =>
        Promise.allSettled(APP_FILES.map(f => cache.add(f).catch(() => {})))
      ),
      caches.open(FONT_CACHE).then(cache =>
        Promise.allSettled(FONT_URLS.map(f => cache.add(f).catch(() => {})))
      ),
    ]).then(() => self.skipWaiting())
  );
});

// ── ACTIVATE: clean old caches ────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(k => k !== CACHE_NAME && k !== FONT_CACHE)
          .map(k => caches.delete(k))
      )
    ).then(() => self.clients.claim())
  );
});

// ── FETCH: Cache-first for app, stale-while-revalidate for fonts ──
self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // Google Fonts – cache first
  if (url.hostname.includes('fonts.gstatic.com') || url.hostname.includes('fonts.googleapis.com')) {
    event.respondWith(
      caches.open(FONT_CACHE).then(cache =>
        cache.match(event.request).then(cached => {
          if (cached) return cached;
          return fetch(event.request).then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          }).catch(() => new Response('', { status: 503 }));
        })
      )
    );
    return;
  }

  // App files – Cache-first, update in background
  event.respondWith(
    caches.open(CACHE_NAME).then(cache =>
      cache.match(event.request).then(cached => {
        const networkFetch = fetch(event.request)
          .then(res => {
            if (res.ok) cache.put(event.request, res.clone());
            return res;
          })
          .catch(() => null);

        return cached || networkFetch || new Response(
          '<html dir="rtl"><body style="font-family:sans-serif;text-align:center;padding:40px"><h2>⚡ MedTerm</h2><p>يعمل بدون إنترنت. الرجاء فتح الصفحة الرئيسية.</p></body></html>',
          { status: 200, headers: { 'Content-Type': 'text/html; charset=utf-8' } }
        );
      })
    )
  );
});

// ── BACKGROUND SYNC message ──────────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
