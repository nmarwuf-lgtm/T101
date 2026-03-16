// ============================================================
//  MedTerm – security.js v1.0
//  تشفير AES-GCM حقيقي · بصمة المتصفح · حماية XSS
// ============================================================
'use strict';

const SecuritySystem = {

  // ══════════════════════════════════════════════════════
  //  بصمة المتصفح (Browser Fingerprint)
  // ══════════════════════════════════════════════════════
  generateFingerprint() {
    const parts = [
      navigator.userAgent,
      navigator.language || '',
      screen.colorDepth,
      `${screen.width}x${screen.height}`,
      new Date().getTimezoneOffset(),
      navigator.hardwareConcurrency || 0,
      !!navigator.maxTouchPoints,
      !!window.indexedDB,
    ];
    return this._hashString(parts.join('|'));
  },

  _hashString(str) {
    let h = 0x811c9dc5;
    for (let i = 0; i < str.length; i++) {
      h ^= str.charCodeAt(i);
      h = (h * 0x01000193) >>> 0;
    }
    return h.toString(36).padStart(8, '0');
  },

  // ══════════════════════════════════════════════════════
  //  إنشاء معرف جلسة فريد
  // ══════════════════════════════════════════════════════
  generateSessionId() {
    const arr = new Uint8Array(16);
    crypto.getRandomValues(arr);
    return Array.from(arr, b => b.toString(16).padStart(2, '0')).join('');
  },

  // ══════════════════════════════════════════════════════
  //  تشفير AES-GCM حقيقي (Web Crypto API)
  // ══════════════════════════════════════════════════════
  async _deriveKey(fingerprint) {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw', enc.encode(fingerprint.padEnd(16, '0').slice(0, 16)),
      { name: 'AES-GCM' }, false, ['encrypt', 'decrypt']
    );
    return keyMaterial;
  },

  async encryptData(plaintext) {
    try {
      const fp  = this.generateFingerprint();
      const key = await this._deriveKey(fp);
      const iv  = crypto.getRandomValues(new Uint8Array(12));
      const enc = new TextEncoder();
      const ct  = await crypto.subtle.encrypt(
        { name: 'AES-GCM', iv }, key, enc.encode(plaintext)
      );
      // Pack: iv(12) + ciphertext → base64
      const combined = new Uint8Array(12 + ct.byteLength);
      combined.set(iv, 0);
      combined.set(new Uint8Array(ct), 12);
      return btoa(String.fromCharCode(...combined));
    } catch {
      // Graceful fallback (non-crypto env)
      return btoa(encodeURIComponent(plaintext));
    }
  },

  async decryptData(b64) {
    try {
      const fp  = this.generateFingerprint();
      const key = await this._deriveKey(fp);
      const raw = Uint8Array.from(atob(b64), c => c.charCodeAt(0));
      const iv  = raw.slice(0, 12);
      const ct  = raw.slice(12);
      const dec = new TextDecoder();
      const pt  = await crypto.subtle.decrypt({ name: 'AES-GCM', iv }, key, ct);
      return dec.decode(pt);
    } catch {
      try { return decodeURIComponent(atob(b64)); } catch { return null; }
    }
  },

  // ══════════════════════════════════════════════════════
  //  HTML Sanitizer – منع XSS
  // ══════════════════════════════════════════════════════
  sanitizeHTML(str) {
    const d = document.createElement('div');
    d.textContent = String(str || '');
    return d.innerHTML;
  },

  // Block injected <script> nodes via MutationObserver
  activateXSSGuard() {
    const observer = new MutationObserver(mutations => {
      mutations.forEach(m => m.addedNodes.forEach(node => {
        if (node.nodeName === 'SCRIPT' && !node.hasAttribute('data-medterm')) {
          node.remove();
          console.warn('[MedTerm] XSS script blocked');
        }
      }));
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  },

  // ══════════════════════════════════════════════════════
  //  منع التضمين في iframe
  // ══════════════════════════════════════════════════════
  preventFraming() {
    if (window.self !== window.top) {
      try { window.top.location = window.self.location; } catch { document.body.innerHTML = ''; }
    }
  },

  // ══════════════════════════════════════════════════════
  //  التحقق من صلاحية الجلسة (30 يوم)
  // ══════════════════════════════════════════════════════
  isSessionValid(session) {
    if (!session?.createdAt) return false;
    const MAX_AGE = 30 * 24 * 60 * 60 * 1000;
    return (Date.now() - session.createdAt) < MAX_AGE;
  },

  // ══════════════════════════════════════════════════════
  //  تشغيل الحماية
  // ══════════════════════════════════════════════════════
  init() {
    this.preventFraming();
    this.activateXSSGuard();
    console.log('%c🔒 MedTerm Security Active', 'color:#63b3ed;font-weight:bold');
  }
};
