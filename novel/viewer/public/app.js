// BAEBE reader — paginated SPA with copy-protection.
// All chapter HTML is fetched from /api/* (auth-gated, no-cache).

(() => {
  'use strict';

  // ------------------------------------------------------------------
  // Copy / inspect protection
  // ------------------------------------------------------------------
  const block = (e) => {
    e.preventDefault();
    e.stopPropagation();
    return false;
  };

  ['contextmenu', 'copy', 'cut', 'paste', 'selectstart', 'dragstart'].forEach((ev) =>
    document.addEventListener(ev, block, { capture: true })
  );

  document.addEventListener(
    'keydown',
    (e) => {
      const k = e.key?.toLowerCase();
      // Block copy / save / print / view-source / select-all / open-devtools
      if (
        (e.ctrlKey || e.metaKey) &&
        ['c', 'x', 'a', 's', 'p', 'u'].includes(k)
      ) {
        block(e);
        return;
      }
      if (k === 'f12') block(e);
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && ['i', 'j', 'c'].includes(k)) {
        block(e);
      }
    },
    { capture: true }
  );

  // Note: devtools-detection heuristics produce too many false positives
  // (mobile Safari address bar, headless browsers, accessibility tools).
  // We rely on the layered protections: no-select, key blocking, no-cache,
  // session watermark, and rate limiting. A determined user can always inspect.

  // ------------------------------------------------------------------
  // State
  // ------------------------------------------------------------------
  const PREFS_KEY = 'baebe.prefs.v1';
  const PROGRESS_KEY = 'baebe.progress.v1';

  const state = {
    manifest: null,
    chapters: [], // flat list of {slug, title, partTitle}
    currentIdx: 0,
    page: 0,
    totalPages: 1,
    prefs: {
      theme: 'sepia',
      font: 'serif',
      sizeStep: 0, // -3..+5
      lhStep: 0, // -3..+5
      marginStep: 0, // -2..+3
    },
  };

  const SIZES = [0.85, 0.93, 1.0, 1.08, 1.18, 1.3, 1.45, 1.6, 1.8];
  const LH = [1.4, 1.5, 1.6, 1.7, 1.8, 1.95, 2.1];
  const MARGINS = ['1rem', '2rem', '3rem', '4rem', '5rem', '6rem'];

  // ------------------------------------------------------------------
  // Element refs
  // ------------------------------------------------------------------
  const $app = document.getElementById('app');
  const $frame = document.getElementById('frame');
  const $content = document.getElementById('content');
  const $watermark = document.getElementById('watermark');
  const $partTitle = document.getElementById('part-title');
  const $chapterTitle = document.getElementById('chapter-title');
  const $pageInfo = document.getElementById('page-info');
  const $chapterProgress = document.getElementById('chapter-progress');
  const $copyright = document.getElementById('copyright');
  const $tocList = document.getElementById('toc-list');
  const $toc = document.getElementById('toc');
  const $settings = document.getElementById('settings');
  const $scrim = document.getElementById('scrim');
  const $sizeVal = document.getElementById('size-val');
  const $lhVal = document.getElementById('lh-val');
  const $marginVal = document.getElementById('margin-val');

  // ------------------------------------------------------------------
  // Prefs
  // ------------------------------------------------------------------
  function loadPrefs() {
    try {
      const raw = localStorage.getItem(PREFS_KEY);
      if (raw) Object.assign(state.prefs, JSON.parse(raw));
    } catch {}
  }

  function savePrefs() {
    try {
      localStorage.setItem(PREFS_KEY, JSON.stringify(state.prefs));
    } catch {}
  }

  function applyPrefs() {
    document.body.classList.remove('theme-light', 'theme-sepia', 'theme-dark', 'theme-night');
    document.body.classList.add(`theme-${state.prefs.theme}`);
    $app.dataset.font = state.prefs.font;

    const size = SIZES[clamp(state.prefs.sizeStep + 2, 0, SIZES.length - 1)];
    const lh = LH[clamp(state.prefs.lhStep + 2, 0, LH.length - 1)];
    const margin = MARGINS[clamp(state.prefs.marginStep + 2, 0, MARGINS.length - 1)];

    document.documentElement.style.setProperty('--reader-size', `${size}rem`);
    document.documentElement.style.setProperty('--reader-lh', String(lh));
    document.documentElement.style.setProperty('--reader-margin', margin);

    $sizeVal.textContent = `${Math.round(size * 100 / 1.0)}%`;
    $lhVal.textContent = lh.toFixed(2);
    $marginVal.textContent = ['XS', 'S', 'M', 'L', 'XL', 'XXL'][
      clamp(state.prefs.marginStep + 2, 0, 5)
    ];

    // Update segmented active states
    document.querySelectorAll('[data-theme]').forEach((b) => {
      b.dataset.active = b.dataset.theme === state.prefs.theme ? 'true' : 'false';
    });
    document.querySelectorAll('[data-font]').forEach((b) => {
      b.dataset.active = b.dataset.font === state.prefs.font ? 'true' : 'false';
    });
  }

  function clamp(n, lo, hi) {
    return Math.max(lo, Math.min(hi, n));
  }

  // ------------------------------------------------------------------
  // Manifest + chapter loading
  // ------------------------------------------------------------------
  async function fetchManifest() {
    const r = await fetch('/api/manifest', { credentials: 'same-origin' });
    if (r.status === 401) {
      location.href = '/login';
      return;
    }
    if (!r.ok) throw new Error('manifest failed');
    return r.json();
  }

  async function fetchChapter(slug) {
    const r = await fetch(`/api/chapter/${encodeURIComponent(slug)}`, {
      credentials: 'same-origin',
      cache: 'no-store',
    });
    if (r.status === 401) {
      location.href = '/login';
      return null;
    }
    if (!r.ok) throw new Error('chapter failed');
    return r.json();
  }

  function flattenManifest(m) {
    const flat = [];
    for (const part of m.parts) {
      for (const ch of part.chapters) {
        flat.push({ slug: ch.slug, title: ch.title, partTitle: part.title });
      }
    }
    return flat;
  }

  // ------------------------------------------------------------------
  // Pagination via CSS columns + transform
  // ------------------------------------------------------------------
  function pageWidth() {
    return $content.clientWidth || $frame.clientWidth;
  }

  function recalcPages() {
    $content.style.columnWidth = '';
    void $content.offsetWidth;

    const w = $content.clientWidth;
    if (w <= 0) {
      requestAnimationFrame(recalcPages);
      return;
    }
    $content.style.columnWidth = `${w}px`;
    void $content.offsetWidth;

    const total = Math.max(1, Math.round($content.scrollWidth / w));
    state.totalPages = total;
    state.page = clamp(state.page, 0, state.totalPages - 1);
    applyTransform(false);
    updateProgress();
  }

  function applyTransform(animate = true) {
    const w = pageWidth();
    const left = state.page * w;
    if (animate && 'scrollBehavior' in document.documentElement.style) {
      $content.scrollTo({ left, behavior: 'smooth' });
    } else {
      $content.scrollLeft = left;
    }
  }

  function nextPage() {
    if (state.page < state.totalPages - 1) {
      state.page++;
      applyTransform();
      updateProgress();
      saveProgress();
    } else if (state.currentIdx < state.chapters.length - 1) {
      goChapter(state.currentIdx + 1, 0);
    }
  }

  function prevPage() {
    if (state.page > 0) {
      state.page--;
      applyTransform();
      updateProgress();
      saveProgress();
    } else if (state.currentIdx > 0) {
      goChapter(state.currentIdx - 1, -1); // -1 == last page
    }
  }

  function updateProgress() {
    $pageInfo.textContent = `${state.page + 1} / ${state.totalPages}`;
    const pct = state.totalPages <= 1 ? 100 : Math.round((state.page / (state.totalPages - 1)) * 100);
    $chapterProgress.textContent = `${pct}%`;
  }

  // ------------------------------------------------------------------
  // Chapter render
  // ------------------------------------------------------------------
  async function goChapter(idx, page = 0) {
    idx = clamp(idx, 0, state.chapters.length - 1);
    const ch = state.chapters[idx];
    const data = await fetchChapter(ch.slug);
    if (!data) return;

    state.currentIdx = idx;
    $partTitle.textContent = data.partTitle;
    $chapterTitle.textContent = data.title;
    $content.innerHTML = data.html;

    // Set watermark
    const tag = `${data.watermark}`;
    const main = state.manifest.label
      ? `${state.manifest.copyright} • ${state.manifest.label}`
      : state.manifest.copyright;
    $watermark.dataset.text = main;
    $watermark.dataset.tag = tag;
    $copyright.textContent = state.manifest.copyright;

    // Highlight in TOC
    document.querySelectorAll('.toc-chapter').forEach((el) => {
      el.dataset.current = el.dataset.slug === ch.slug ? 'true' : 'false';
    });

    // Reset pagination after render
    state.page = 0;
    requestAnimationFrame(() => {
      recalcPages();
      if (page === -1) state.page = state.totalPages - 1;
      else state.page = clamp(page, 0, state.totalPages - 1);
      applyTransform(false);
      updateProgress();
      saveProgress();
    });
  }

  // ------------------------------------------------------------------
  // Progress persistence
  // ------------------------------------------------------------------
  function saveProgress() {
    try {
      localStorage.setItem(
        PROGRESS_KEY,
        JSON.stringify({ idx: state.currentIdx, page: state.page })
      );
    } catch {}
  }

  function loadProgress() {
    try {
      const raw = localStorage.getItem(PROGRESS_KEY);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }

  // ------------------------------------------------------------------
  // TOC
  // ------------------------------------------------------------------
  function buildTOC() {
    $tocList.innerHTML = '';
    for (const part of state.manifest.parts) {
      const head = document.createElement('div');
      head.className = 'toc-part';
      head.textContent = part.title;
      $tocList.appendChild(head);

      for (const ch of part.chapters) {
        const btn = document.createElement('button');
        btn.className = 'toc-chapter';
        btn.dataset.slug = ch.slug;
        btn.textContent = ch.title;
        btn.addEventListener('click', () => {
          const idx = state.chapters.findIndex((c) => c.slug === ch.slug);
          if (idx >= 0) goChapter(idx, 0);
          closeDrawers();
        });
        $tocList.appendChild(btn);
      }
    }
  }

  // ------------------------------------------------------------------
  // UI: drawers, tap/swipe/keys, settings
  // ------------------------------------------------------------------
  function openDrawer(which) {
    closeDrawers(true);
    const el = which === 'toc' ? $toc : $settings;
    el.hidden = false;
    requestAnimationFrame(() => (el.dataset.show = 'true'));
    $scrim.hidden = false;
    requestAnimationFrame(() => ($scrim.dataset.show = 'true'));
    $app.dataset.uiVisible = 'true';
  }

  function closeDrawers(skipScrim = false) {
    [$toc, $settings].forEach((el) => {
      el.dataset.show = 'false';
      setTimeout(() => {
        if (el.dataset.show === 'false') el.hidden = true;
      }, 300);
    });
    if (!skipScrim) {
      $scrim.dataset.show = 'false';
      setTimeout(() => {
        if ($scrim.dataset.show === 'false') $scrim.hidden = true;
      }, 200);
    }
  }

  function toggleUI() {
    $app.dataset.uiVisible = $app.dataset.uiVisible === 'true' ? 'false' : 'true';
  }

  function bindUI() {
    document.getElementById('btn-toc').addEventListener('click', () => openDrawer('toc'));
    document.getElementById('btn-settings').addEventListener('click', () => openDrawer('settings'));
    document.getElementById('btn-close-toc').addEventListener('click', () => closeDrawers());
    document.getElementById('btn-close-settings').addEventListener('click', () => closeDrawers());
    $scrim.addEventListener('click', () => closeDrawers());

    document.getElementById('tap-prev').addEventListener('click', prevPage);
    document.getElementById('tap-next').addEventListener('click', nextPage);
    document.getElementById('tap-toggle').addEventListener('click', toggleUI);

    // Keyboard nav
    window.addEventListener('keydown', (e) => {
      if (e.target.matches('input,textarea')) return;
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        nextPage();
      } else if (e.key === 'ArrowLeft') {
        prevPage();
      } else if (e.key === 'Escape') {
        closeDrawers();
      }
    });

    // Swipe
    let sx = null;
    let sy = null;
    let st = 0;
    $frame.addEventListener(
      'touchstart',
      (e) => {
        if (e.touches.length !== 1) return;
        sx = e.touches[0].clientX;
        sy = e.touches[0].clientY;
        st = Date.now();
      },
      { passive: true }
    );
    $frame.addEventListener(
      'touchend',
      (e) => {
        if (sx == null) return;
        const t = e.changedTouches[0];
        const dx = t.clientX - sx;
        const dy = t.clientY - sy;
        const dt = Date.now() - st;
        sx = sy = null;
        if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy) * 1.5 && dt < 600) {
          if (dx < 0) nextPage();
          else prevPage();
        }
      },
      { passive: true }
    );

    // Settings controls
    document.querySelectorAll('[data-theme]').forEach((b) => {
      b.addEventListener('click', () => {
        state.prefs.theme = b.dataset.theme;
        savePrefs();
        applyPrefs();
        recalcPages();
      });
    });
    document.querySelectorAll('[data-font]').forEach((b) => {
      b.addEventListener('click', () => {
        state.prefs.font = b.dataset.font;
        savePrefs();
        applyPrefs();
        recalcPages();
      });
    });
    document.querySelectorAll('[data-size]').forEach((b) => {
      b.addEventListener('click', () => {
        state.prefs.sizeStep = clamp(state.prefs.sizeStep + Number(b.dataset.size), -2, 6);
        savePrefs();
        applyPrefs();
        recalcPages();
      });
    });
    document.querySelectorAll('[data-lh]').forEach((b) => {
      b.addEventListener('click', () => {
        state.prefs.lhStep = clamp(state.prefs.lhStep + Number(b.dataset.lh), -2, 4);
        savePrefs();
        applyPrefs();
        recalcPages();
      });
    });
    document.querySelectorAll('[data-margin]').forEach((b) => {
      b.addEventListener('click', () => {
        state.prefs.marginStep = clamp(state.prefs.marginStep + Number(b.dataset.margin), -2, 3);
        savePrefs();
        applyPrefs();
        recalcPages();
      });
    });

    // Recalc on resize/orientation
    let rTimer;
    window.addEventListener('resize', () => {
      clearTimeout(rTimer);
      rTimer = setTimeout(recalcPages, 120);
    });
    window.addEventListener('orientationchange', () => setTimeout(recalcPages, 200));

    // Hide UI when reader is idle
    let idleTimer;
    const resetIdle = () => {
      clearTimeout(idleTimer);
      idleTimer = setTimeout(() => ($app.dataset.uiVisible = 'false'), 4500);
    };
    ['click', 'touchend', 'keydown'].forEach((ev) =>
      document.addEventListener(ev, resetIdle)
    );
    resetIdle();
  }

  // ------------------------------------------------------------------
  // Boot
  // ------------------------------------------------------------------
  async function boot() {
    loadPrefs();
    applyPrefs();
    bindUI();

    try {
      const m = await fetchManifest();
      if (!m) return;
      state.manifest = m;
      state.chapters = flattenManifest(m);
      buildTOC();

      const saved = loadProgress();
      const startIdx = saved?.idx ?? 0;
      const startPage = saved?.page ?? 0;
      await goChapter(startIdx, startPage);
    } catch (err) {
      $content.innerHTML = `<p style="text-align:center;color:#a44">Failed to load. <a href="/login">Sign in again</a>.</p>`;
      console.error(err);
    }
  }

  // Service worker (PWA) — register only if served via HTTPS or localhost
  if ('serviceWorker' in navigator) {
    // Optional; not implemented to keep things simple. Manifest still allows install.
  }

  document.addEventListener('DOMContentLoaded', boot);
})();
