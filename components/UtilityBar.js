"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

/* ==========================================
   Sahneva — UtilityBar (Final Sürüm)
   - WCAG 2.2 odaklı
   - Focus trap + Escape
   - Body scroll kilidi
   - Global sınıf tabanlı tema (min !important)
   - Okuma maskesi (radial spotlight)
   - Medya sessize alma (observer)
   - Kısayollar: Alt+Shift+A (aç/kapat), Ctrl/⌘+K (Arama)
   - Düşük CLS: Bar geç yüklenirse bile güvenli
   ========================================== */

/* =================== Rotalar =================== */
const ROUTES = [
  { href: "/", label: "Anasayfa", icon: "🏠" },
  { href: "/hakkimizda", label: "Hakkımızda", icon: "👥" },
  { href: "/iletisim", label: "İletişim", icon: "📞" },
  { href: "/podyum-kiralama", label: "Podyum", icon: "👑" },
  { href: "/led-ekran-kiralama", label: "LED Ekran", icon: "🖥️" },
  { href: "/ses-isik-sistemleri", label: "Ses & Işık", icon: "🎭" },
  { href: "/cadir-kiralama", label: "Çadır", icon: "⛺" },
  { href: "/masa-sandalye-kiralama", label: "Masa Sandalye", icon: "🪑" },
  { href: "/sahne-kiralama", label: "Sahne", icon: "🎪" },
];

/* ============= LocalStorage anahtarları ============= */
const LS_KEYS = {
  ACTIVE: "acc_active",
  FONT_SIZE: "acc_font_size",
  PANEL_POSITION: "acc_panel_position",
  // Profiller
  SEIZURE_SAFE: "acc_seizure_safe",
  VISION_IMPAIRED: "acc_vision_impaired",
  ADHD_FRIENDLY: "acc_adhd_friendly",
  COGNITIVE_DISABILITY: "acc_cognitive_disability",
  BLIND_USERS: "acc_blind_users",
  KEYBOARD_NAV: "acc_keyboard_nav",
  // İçerik
  DYSLEXIC_FONT: "acc_dyslexic_font",
  HIGHLIGHT_HEADINGS: "acc_highlight_headings",
  HIGHLIGHT_LINKS: "acc_highlight_links",
  READING_MASK: "acc_reading_mask",
  // Renk
  HIGH_CONTRAST: "acc_high_contrast",
  INVERT_COLORS: "acc_invert_colors",
  GRAYSCALE: "acc_grayscale",
  UNDERLINE_LINKS: "acc_underline_links",
  DARK_MODE: "acc_dark_mode",
  LIGHT_MODE: "acc_light_mode",
  // Yönlendirme
  BIG_CURSOR: "acc_big_cursor",
  STOP_ANIMATIONS: "acc_stop_animations",
  MUTE_SOUNDS: "acc_mute_sounds",
  HIDE_IMAGES: "acc_hide_images",
};

/* =================== Yardımcılar =================== */
const setLS = (key, value) => {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
};
const getLS = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

/* =================== Global CSS ===================
   Tek defalık style etiketi; sınıf tabanlı kurallar
   ================================================ */
function ensureGlobalStyles() {
  const ID = "a11y-global-styles";
  if (document.getElementById(ID)) return;
  const style = document.createElement("style");
  style.id = ID;
  style.textContent = `
  /* Kök değişkenler */
  html.accessibility-active { --acc-bg: var(--acc-bg, #ffffff); --acc-fg: var(--acc-fg, #0a0a0a); --acc-link:#1d4ed8; --acc-font-size: 16px; }
  html.accessibility-active, html.accessibility-active body { background: var(--acc-bg) !important; color: var(--acc-fg) !important; }
  html.accessibility-active a { color: var(--acc-link); }
  html.accessibility-active.fs { font-size: var(--acc-font-size) !important; }

  /* Yüksek Kontrast */
  html.accessibility-active.hc { --acc-bg:#000; --acc-fg:#fff; --acc-link:#ff0; }
  html.accessibility-active.hc a { text-decoration: underline; }

  /* Dark / Light */
  html.accessibility-active.dark { --acc-bg:#111827; --acc-fg:#f9fafb; --acc-link:#60a5fa; }
  html.accessibility-active.light { --acc-bg:#ffffff; --acc-fg:#0b0f19; --acc-link:#1d4ed8; }

  /* Altı çizili linkler */
  html.accessibility-active.ulinks a { text-decoration: underline; }

  /* Invert & Grayscale filtreleri */
  html.accessibility-active.inv body { filter: invert(1) hue-rotate(180deg); }
  html.accessibility-active.gray body { filter: grayscale(1); }

  /* Disleksi ve odak görünürlüğü */
  html.accessibility-active.dyslexic * { letter-spacing: .04em !important; word-spacing: .08em !important; line-height: 1.6 !important; }
  html.accessibility-active.kb-nav *:focus { outline: 3px solid #2563eb !important; outline-offset: 2px; }

  /* Büyük imleç — sistem kısıtlı, belirginlik artır */
  html.accessibility-active.big-cursor * { cursor: default !important; }

  /* Hareket azalt (reduced motion) */
  html.accessibility-active.rm *:not(.allow-anim),
  html.accessibility-active.rm *:not(.allow-anim)::before,
  html.accessibility-active.rm *:not(.allow-anim)::after { animation: none !important; transition: none !important; scroll-behavior: auto !important; }

  /* Resimleri gizle */
  html.accessibility-active.hide-img img { display:none !important; }

  /* Başlık/Link vurguları */
  html.accessibility-active.hl-head h1,
  html.accessibility-active.hl-head h2,
  html.accessibility-active.hl-head h3,
  html.accessibility-active.hl-head h4,
  html.accessibility-active.hl-head h5,
  html.accessibility-active.hl-head h6 { background: #ffff00 !important; color:#000 !important; padding:4px 8px !important; }
  html.accessibility-active.hl-link a { background:#ffff00 !important; color:#000 !important; padding:2px 4px !important; }

  /* Okuma maskesi (spotlight) */
  .reading-mask { position: fixed; inset: 0; pointer-events: none; display:none; z-index: 10000; }
  html.accessibility-active .reading-mask { display:block; }
  /* Radial spotlight dinamik olarak inline style ile atanıyor */
  `;
  document.head.appendChild(style);
}

/* ================ Ana Bileşen ================ */
export default function UtilityBar() {
  // Ana durumlar
  const [isActive, setIsActive] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [activeTab, setActiveTab] = useState("profiles");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelPosition, setPanelPosition] = useState("right");

  // Ayarlar
  const [seizureSafe, setSeizureSafe] = useState(false);
  const [visionImpaired, setVisionImpaired] = useState(false);
  const [adhdFriendly, setAdhdFriendly] = useState(false);
  const [cognitiveDisability, setCognitiveDisability] = useState(false);
  const [blindUsers, setBlindUsers] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [highlightHeadings, setHighlightHeadings] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingMask, setReadingMask] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [bigCursor, setBigCursor] = useState(false);
  const [animationsStopped, setAnimationsStopped] = useState(false);
  const [muteSounds, setMuteSounds] = useState(false);
  const [hideImages, setHideImages] = useState(false);

  // Refs
  const panelRef = useRef(null);
  const guideRef = useRef(null);

  /* =============== Global sınıflar / değişkenler =============== */
  const applyRootClasses = useCallback(() => {
    const html = document.documentElement;

    const anyEnabled = (
      fontSize !== 16 || highContrast || darkMode || lightMode || invertColors || grayscale || underlineLinks ||
      dyslexicFont || keyboardNav || bigCursor || animationsStopped || hideImages || highlightHeadings ||
      highlightLinks || readingMask || seizureSafe || visionImpaired || adhdFriendly || cognitiveDisability ||
      blindUsers || muteSounds
    );

    const activeOrEnabled = isActive || anyEnabled;

    html.classList.toggle("accessibility-active", activeOrEnabled);
    html.classList.toggle("fs", activeOrEnabled);
    html.style.setProperty("--acc-font-size", `${fontSize}px`);

    // Tema sınıfları
    html.classList.toggle("hc", highContrast);
    html.classList.toggle("dark", darkMode && !lightMode);
    html.classList.toggle("light", lightMode && !darkMode);

    // Filtreler
    html.classList.toggle("inv", invertColors);
    html.classList.toggle("gray", grayscale);

    // Diğerleri
    html.classList.toggle("ulinks", underlineLinks);
    html.classList.toggle("dyslexic", dyslexicFont);
    html.classList.toggle("kb-nav", keyboardNav);
    html.classList.toggle("big-cursor", bigCursor);
    html.classList.toggle("rm", animationsStopped);
    html.classList.toggle("hide-img", hideImages);
    html.classList.toggle("hl-head", highlightHeadings);
    html.classList.toggle("hl-link", highlightLinks);
  }, [isActive, fontSize, highContrast, darkMode, lightMode, invertColors, grayscale, underlineLinks, dyslexicFont, keyboardNav, bigCursor, animationsStopped, hideImages, highlightHeadings, highlightLinks, readingMask, seizureSafe, visionImpaired, adhdFriendly, cognitiveDisability, blindUsers, muteSounds]);

  /* =============== Medya sessize alma =============== */
  const applyMute = useCallback((mute) => {
    const media = document.querySelectorAll("audio, video");
    media.forEach((m) => { m.muted = mute; if (mute) m.volume = 0; });
  }, []);

  /* =============== Okuma maskesi (spotlight) =============== */
  const ensureReadingMask = useCallback(() => {
    if (!guideRef.current) {
      const d = document.createElement("div");
      d.className = "reading-mask";
      d.style.background = "radial-gradient(closest-side at 50% 50%, transparent 0 24px, rgba(0,0,0,.55) 25px)";
      guideRef.current = d;
      document.body.appendChild(d);
    }
  }, []);

  /* =============== İlk yükleme =============== */
  useEffect(() => {
    if (typeof window === "undefined") return;
    ensureGlobalStyles();

    // localStorage
    setIsActive(getLS(LS_KEYS.ACTIVE, false));
    setFontSize(getLS(LS_KEYS.FONT_SIZE, 16));
    setPanelPosition(getLS(LS_KEYS.PANEL_POSITION, "right"));

    setSeizureSafe(getLS(LS_KEYS.SEIZURE_SAFE, false));
    setVisionImpaired(getLS(LS_KEYS.VISION_IMPAIRED, false));
    setAdhdFriendly(getLS(LS_KEYS.ADHD_FRIENDLY, false));
    setCognitiveDisability(getLS(LS_KEYS.COGNITIVE_DISABILITY, false));
    setBlindUsers(getLS(LS_KEYS.BLIND_USERS, false));
    setKeyboardNav(getLS(LS_KEYS.KEYBOARD_NAV, false));
    setDyslexicFont(getLS(LS_KEYS.DYSLEXIC_FONT, false));
    setHighlightHeadings(getLS(LS_KEYS.HIGHLIGHT_HEADINGS, false));
    setHighlightLinks(getLS(LS_KEYS.HIGHLIGHT_LINKS, false));
    setReadingMask(getLS(LS_KEYS.READING_MASK, false));
    setHighContrast(getLS(LS_KEYS.HIGH_CONTRAST, false));
    setInvertColors(getLS(LS_KEYS.INVERT_COLORS, false));
    setGrayscale(getLS(LS_KEYS.GRAYSCALE, false));
    setUnderlineLinks(getLS(LS_KEYS.UNDERLINE_LINKS, false));
    setDarkMode(getLS(LS_KEYS.DARK_MODE, false));
    setLightMode(getLS(LS_KEYS.LIGHT_MODE, false));
    setBigCursor(getLS(LS_KEYS.BIG_CURSOR, false));
    setAnimationsStopped(getLS(LS_KEYS.STOP_ANIMATIONS, false));
    setMuteSounds(getLS(LS_KEYS.MUTE_SOUNDS, false));
    setHideImages(getLS(LS_KEYS.HIDE_IMAGES, false));
  }, []);

  /* =============== Kök sınıfları reaktif uygula =============== */
  useEffect(() => {
    applyRootClasses();
  }, [applyRootClasses]);

  /* =============== Panel açıkken: body lock + focus trap + Escape =============== */
  useEffect(() => {
    if (!isActive) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKey = (e) => { if (e.key === "Escape") setIsActive(false); };
    document.addEventListener("keydown", handleKey);

    // Focus trap
    const el = panelRef.current;
    const getFocusables = () => el?.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const focusables = getFocusables();
    const first = focusables?.[0];
    const last = focusables?.[focusables.length - 1];
    const onTab = (e) => {
      if (e.key !== "Tab") return;
      const fs = getFocusables();
      if (!fs || fs.length === 0) return;
      const f = fs[0];
      const l = fs[fs.length - 1];
      if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
      else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
    };
    el?.addEventListener("keydown", onTab);
    setTimeout(() => first?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", handleKey);
      el?.removeEventListener("keydown", onTab);
    };
  }, [isActive]);

  /* =============== Kısayollar =============== */
  useEffect(() => {
    const onKey = (e) => {
      const k = e.key?.toLowerCase();
      if (e.altKey && e.shiftKey && k === "a") {
        e.preventDefault(); setIsActive((v) => !v);
      }
      if ((e.ctrlKey || e.metaKey) && k === "k") {
        e.preventDefault(); setIsSearchOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  /* =============== Reading mask davranışı =============== */
  useEffect(() => {
    if (!readingMask || !isActive) return;
    ensureReadingMask();
    const onMove = (e) => {
      if (!guideRef.current) return;
      const mx = e.clientX; const my = e.clientY;
      guideRef.current.style.background = `radial-gradient(closest-side at ${mx}px ${my}px, transparent 0 24px, rgba(0,0,0,.55) 25px)`;
    };
    document.addEventListener("mousemove", onMove);
    return () => document.removeEventListener("mousemove", onMove);
  }, [readingMask, isActive, ensureReadingMask]);

  /* =============== Medya sessize alma + observer =============== */
  useEffect(() => { applyMute(muteSounds); }, [muteSounds, applyMute]);
  useEffect(() => {
    const obs = new MutationObserver(() => applyMute(getLS(LS_KEYS.MUTE_SOUNDS, false)));
    obs.observe(document.body, { childList: true, subtree: true });
    return () => obs.disconnect();
  }, [applyMute]);

  /* =============== Panel konumu =============== */
  const togglePanelPosition = useCallback(() => {
    const next = panelPosition === "right" ? "left" : "right";
    setPanelPosition(next); setLS(LS_KEYS.PANEL_POSITION, next);
  }, [panelPosition]);

  /* =============== Genel toggle helper =============== */
  const createToggleHandler = useCallback((state, setState, key, after) => () => {
    const v = !state;
    setState(v);
    setLS(key, v);
    after?.(v);
  }, []);

  /* =============== Profiller =============== */
  const toggleSeizureSafe = createToggleHandler(seizureSafe, setSeizureSafe, LS_KEYS.SEIZURE_SAFE, (v) => {
    // Animasyonları ve sesleri kapatır
    setAnimationsStopped(v); setLS(LS_KEYS.STOP_ANIMATIONS, v);
    setMuteSounds(v); setLS(LS_KEYS.MUTE_SOUNDS, v); applyMute(v);
  });
  const toggleVisionImpaired = createToggleHandler(
  visionImpaired, setVisionImpaired, LS_KEYS.VISION_IMPAIRED,
  (v) => {
    if (v) {
      setFontSize(18); setLS(LS_KEYS.FONT_SIZE, 18);
      setHighContrast(true); setLS(LS_KEYS.HIGH_CONTRAST, true);
      setUnderlineLinks(true); setLS(LS_KEYS.UNDERLINE_LINKS, true);
      setBigCursor(true); setLS(LS_KEYS.BIG_CURSOR, true);
    } else {
      setHighContrast(false); setLS(LS_KEYS.HIGH_CONTRAST, false);
      setUnderlineLinks(false); setLS(LS_KEYS.UNDERLINE_LINKS, false);
      setBigCursor(false); setLS(LS_KEYS.BIG_CURSOR, false);
      setFontSize(16); setLS(LS_KEYS.FONT_SIZE, 16);
    }
  }
); setLS(LS_KEYS.FONT_SIZE, 18);
      setHighContrast(true); setLS(LS_KEYS.HIGH_CONTRAST, true);
      setUnderlineLinks(true); setLS(LS_KEYS.UNDERLINE_LINKS, true);
      setBigCursor(true); setLS(LS_KEYS.BIG_CURSOR, true);
    }
  });
  const toggleAdhdFriendly = createToggleHandler(adhdFriendly, setAdhdFriendly, LS_KEYS.ADHD_FRIENDLY, (v) => {
    setAnimationsStopped(v); setLS(LS_KEYS.STOP_ANIMATIONS, v);
  });
  const toggleCognitiveDisability = createToggleHandler(
  cognitiveDisability, setCognitiveDisability, LS_KEYS.COGNITIVE_DISABILITY,
  (v) => {
    if (v) {
      setFontSize(18); setLS(LS_KEYS.FONT_SIZE, 18);
      setDyslexicFont(true); setLS(LS_KEYS.DYSLEXIC_FONT, true);
      setHighlightHeadings(true); setLS(LS_KEYS.HIGHLIGHT_HEADINGS, true);
      setHighlightLinks(true); setLS(LS_KEYS.HIGHLIGHT_LINKS, true);
    } else {
      setDyslexicFont(false); setLS(LS_KEYS.DYSLEXIC_FONT, false);
      setHighlightHeadings(false); setLS(LS_KEYS.HIGHLIGHT_HEADINGS, false);
      setHighlightLinks(false); setLS(LS_KEYS.HIGHLIGHT_LINKS, false);
      setFontSize(16); setLS(LS_KEYS.FONT_SIZE, 16);
    }
  }
); setLS(LS_KEYS.FONT_SIZE, 18);
      setDyslexicFont(true); setLS(LS_KEYS.DYSLEXIC_FONT, true);
      setHighlightHeadings(true); setLS(LS_KEYS.HIGHLIGHT_HEADINGS, true);
      setHighlightLinks(true); setLS(LS_KEYS.HIGHLIGHT_LINKS, true);
    }
  });
  const toggleBlindUsers = createToggleHandler(blindUsers, setBlindUsers, LS_KEYS.BLIND_USERS);
  const toggleKeyboardNav = createToggleHandler(keyboardNav, setKeyboardNav, LS_KEYS.KEYBOARD_NAV);

  /* =============== Diğer toggles =============== */
  const toggleDyslexicFont = createToggleHandler(dyslexicFont, setDyslexicFont, LS_KEYS.DYSLEXIC_FONT);
  const toggleHighlightHeadings = createToggleHandler(highlightHeadings, setHighlightHeadings, LS_KEYS.HIGHLIGHT_HEADINGS);
  const toggleHighlightLinks = createToggleHandler(highlightLinks, setHighlightLinks, LS_KEYS.HIGHLIGHT_LINKS);
  const toggleReadingMask = createToggleHandler(readingMask, setReadingMask, LS_KEYS.READING_MASK, (v) => { if (v) ensureReadingMask(); });
  const toggleHighContrast = createToggleHandler(highContrast, setHighContrast, LS_KEYS.HIGH_CONTRAST);
  const toggleInvertColors = createToggleHandler(invertColors, setInvertColors, LS_KEYS.INVERT_COLORS);
  const toggleGrayscale = createToggleHandler(grayscale, setGrayscale, LS_KEYS.GRAYSCALE);
  const toggleUnderlineLinks = createToggleHandler(underlineLinks, setUnderlineLinks, LS_KEYS.UNDERLINE_LINKS);
  const toggleDarkMode = createToggleHandler(darkMode, setDarkMode, LS_KEYS.DARK_MODE);
  const toggleLightMode = createToggleHandler(lightMode, setLightMode, LS_KEYS.LIGHT_MODE);
  const toggleBigCursor = createToggleHandler(bigCursor, setBigCursor, LS_KEYS.BIG_CURSOR);
  const toggleStopAnimations = createToggleHandler(animationsStopped, setAnimationsStopped, LS_KEYS.STOP_ANIMATIONS);
  const toggleMuteSounds = createToggleHandler(muteSounds, setMuteSounds, LS_KEYS.MUTE_SOUNDS, (v) => applyMute(v));
  const toggleHideImages = createToggleHandler(hideImages, setHideImages, LS_KEYS.HIDE_IMAGES);

  /* =============== Sıfırlama =============== */
  const resetAll = useCallback(() => {
    Object.values(LS_KEYS).forEach((k) => localStorage.removeItem(k));
    setIsActive(false); setFontSize(16); setPanelPosition("right");
    setSeizureSafe(false); setVisionImpaired(false); setAdhdFriendly(false); setCognitiveDisability(false);
    setBlindUsers(false); setKeyboardNav(false); setDyslexicFont(false);
    setHighlightHeadings(false); setHighlightLinks(false); setReadingMask(false);
    setHighContrast(false); setInvertColors(false); setGrayscale(false); setUnderlineLinks(false);
    setDarkMode(false); setLightMode(false); setBigCursor(false); setAnimationsStopped(false);
    setMuteSounds(false); setHideImages(false);
    applyMute(false);
    if (guideRef.current) { guideRef.current.remove(); guideRef.current = null; }
  }, [applyMute]);

  /* =============== Yazı boyutu =============== */
  const setFontSizeWithSave = useCallback((size) => {
    const clamped = Math.max(12, Math.min(24, size));
    setFontSize(clamped); setLS(LS_KEYS.FONT_SIZE, clamped);
  }, []);

  /* =============== Arama =============== */
  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return ROUTES;
    return ROUTES.filter((r) => r.label.toLowerCase().includes(q));
  }, [searchQuery]);

  /* =============== Render =============== */
  if (!isActive) {
    return (
      <div className={`fixed ${panelPosition === 'right' ? 'right-8' : 'left-8'} bottom-8 z-50 flex flex-col gap-3`}>
        <button
          onClick={() => { setIsActive(true); setLS(LS_KEYS.ACTIVE, true); }}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          aria-label="Erişilebilirlik ayarlarını aç"
        >
          ♿
        </button>
        <button
          onClick={togglePanelPosition}
          className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
          aria-label={`Paneli ${panelPosition === 'right' ? 'sola' : 'sağa'} taşı`}
        >
          {panelPosition === 'right' ? '◀' : '▶'}
        </button>
      </div>
    );
  }

  return (
    <>
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Erişilebilirlik ayarları"
        className={`fixed top-0 ${panelPosition === 'right' ? 'right-0' : 'left-0'} z-[10000] w-full max-w-96 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center"><span className="text-xl" aria-hidden>♿</span></div>
            <div>
              <h2 className="font-bold text-lg">Erişilebilirlik</h2>
              <p className="text-blue-100 text-sm">Ayarlarınızı kişiselleştirin</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={togglePanelPosition} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors" aria-label={`Paneli ${panelPosition === 'right' ? 'sola' : 'sağa'} taşı`}>{panelPosition === 'right' ? '◀' : '▶'}</button>
            <button onClick={() => setIsActive(false)} className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors" aria-label="Paneli kapat">✕</button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50" role="tablist" aria-label="Erişilebilirlik sekmeleri">
          {[
            { id: "profiles", label: "Profiller", icon: "👤" },
            { id: "content", label: "İçerik", icon: "📝" },
            { id: "color", label: "Renk", icon: "🎨" },
            { id: "orientation", label: "Yönlendirme", icon: "🎯" },
            { id: "tools", label: "Araçlar", icon: "🛠️" },
          ].map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`panel-${tab.id}`}
              id={`tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${ activeTab === tab.id ? 'text-blue-600 bg-white border-b-2 border-blue-600' : 'text-gray-600 hover:text-gray-900' }`}
            >
              <span className="text-lg mb-1" aria-hidden>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Profiller */}
          <section id="panel-profiles" role="tabpanel" aria-labelledby="tab-profiles" hidden={activeTab!=="profiles"} className="space-y-6">
            <div className="text-center mb-2"><h3 className="text-lg font-semibold text-gray-900">Sizin için doğru erişilebilirlik profilini seçin</h3></div>
            <ToggleCard icon="⚡" title="Epilepsi Güvenli Profili" description="Yanıp sönen efektleri ve sesleri azaltır" isActive={seizureSafe} onToggle={toggleSeizureSafe} />
            <ToggleCard icon="👁️" title="Görme Engelli Profili" description="Kontrast ve okunabilirlik artışı" isActive={visionImpaired} onToggle={toggleVisionImpaired} />
            <ToggleCard icon="🧠" title="DEHB Dostu Profili" description="Hareketleri azaltır, dikkati artırır" isActive={adhdFriendly} onToggle={toggleAdhdFriendly} />
            <ToggleCard icon="🎯" title="Bilişsel Engelli Profili" description="Yazı ve vurguları belirginleştirir" isActive={cognitiveDisability} onToggle={toggleCognitiveDisability} />
            <ToggleCard icon="⌨️" title="Klavye Navigasyonu" description=":focus görünürlüğünü artırır" isActive={keyboardNav} onToggle={toggleKeyboardNav} />
            <ToggleCard icon="🔈" title="Görme Engelli Kullanıcılar" description="Ekran okuyucu uyumları" isActive={blindUsers} onToggle={toggleBlindUsers} />
          </section>

          {/* İçerik */}
          <section id="panel-content" role="tabpanel" aria-labelledby="tab-content" hidden={activeTab!=="content"} className="space-y-6">
            <div className="text-center mb-2"><h3 className="text-lg font-semibold text-gray-900">İçerik ve Okunabilirlik Ayarları</h3></div>
            <div className="bg-gray-50 p-4 rounded-xl">
              <h4 className="font-semibold text-gray-900 mb-3">Yazı Boyutu</h4>
              <div className="flex items-center gap-3">
                <button onClick={() => setFontSizeWithSave(fontSize - 2)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors" aria-label="Yazı boyutunu azalt">A-</button>
                <div className="flex-1 text-center py-3 bg-blue-50 text-blue-700 rounded-lg font-bold" aria-live="polite">{fontSize}px</div>
                <button onClick={() => setFontSizeWithSave(fontSize + 2)} className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors" aria-label="Yazı boyutunu artır">A+</button>
              </div>
            </div>
            <ToggleCard icon="🔤" title="Disleksi Ayarları" description="Harf/kelime aralıklarını iyileştirir" isActive={dyslexicFont} onToggle={toggleDyslexicFont} />
            <ToggleCard icon="📑" title="Başlıkları Vurgula" description="Başlıkları belirgin hale getirir" isActive={highlightHeadings} onToggle={toggleHighlightHeadings} />
            <ToggleCard icon="🔗" title="Bağlantıları Vurgula" description="Linkleri belirgin gösterir" isActive={highlightLinks} onToggle={toggleHighlightLinks} />
            <ToggleCard icon="👁️" title="Okuma Maskesi" description="Odaklandığınız alanı öne çıkarır" isActive={readingMask} onToggle={toggleReadingMask} />
          </section>

          {/* Renk */}
          <section id="panel-color" role="tabpanel" aria-labelledby="tab-color" hidden={activeTab!=="color"} className="space-y-6">
            <div className="text-center mb-2"><h3 className="text-lg font-semibold text-gray-900">Renk ve Görünüm</h3></div>
            <ToggleCard icon="🎨" title="Yüksek Kontrast" description="Maksimum metin/zemin kontrastı" isActive={highContrast} onToggle={toggleHighContrast} />
            <ToggleCard icon="🔄" title="Renkleri Ters Çevir" description="Tüm renkleri tersine çevirir" isActive={invertColors} onToggle={toggleInvertColors} />
            <ToggleCard icon="⚫" title="Siyah-Beyaz" description="Gri tonlama uygular" isActive={grayscale} onToggle={toggleGrayscale} />
            <ToggleCard icon="🔗" title="Bağlantıların Altını Çiz" description="Tüm linkleri altı çizgili yapar" isActive={underlineLinks} onToggle={toggleUnderlineLinks} />
            <ToggleCard icon="🌙" title="Koyu Mod" description="Koyu arka plan" isActive={darkMode} onToggle={toggleDarkMode} />
            <ToggleCard icon="☀️" title="Açık Mod" description="Açık arka plan" isActive={lightMode} onToggle={toggleLightMode} />
          </section>

          {/* Yönlendirme */}
          <section id="panel-orientation" role="tabpanel" aria-labelledby="tab-orientation" hidden={activeTab!=="orientation"} className="space-y-6">
            <div className="text-center mb-2"><h3 className="text-lg font-semibold text-gray-900">Yönlendirme ve Navigasyon</h3></div>
            <ToggleCard icon="🖱️" title="Büyük İmleç" description="İmleç görünürlüğünü artırır" isActive={bigCursor} onToggle={toggleBigCursor} />
            <ToggleCard icon="⏸️" title="Animasyonları Durdur" description="Hareketli öğeleri kapatır" isActive={animationsStopped} onToggle={toggleStopAnimations} />
            <ToggleCard icon="🔇" title="Sesleri Kapat" description="Sayfadaki ses/video seslerini kapatır" isActive={muteSounds} onToggle={toggleMuteSounds} />
            <ToggleCard icon="🖼️" title="Resimleri Gizle" description="Tüm görselleri gizler" isActive={hideImages} onToggle={toggleHideImages} />
          </section>

          {/* Araçlar */}
          <section id="panel-tools" role="tabpanel" aria-labelledby="tab-tools" hidden={activeTab!=="tools"} className="space-y-6">
            <div className="text-center mb-2"><h3 className="text-lg font-semibold text-gray-900">Yardımcı Araçlar</h3></div>
            <ActionCard icon="🔍" title="Site İçi Arama" description="Sayfalarda hızlı arama yapın (Ctrl/⌘+K)" onClick={() => setIsSearchOpen(true)} />
            <ActionCard icon="📞" title="Hızlı İletişim" description="Telefon ile hemen ulaşın" onClick={() => window.open('tel:+905453048671')} />
            <ActionCard icon="💬" title="WhatsApp" description="WhatsApp'tan mesaj gönderin" onClick={() => window.open('https://wa.me/905453048671')} />
            <ActionCard icon="⬆️" title="Yukarı Çık" description="Sayfanın en üstüne dönün" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} />
            <div className="pt-4 border-t border-gray-200">
              <button onClick={resetAll} className="w-full py-4 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors border border-red-200">↻ Tüm Ayarları Sıfırla</button>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex justify-between gap-2">
            <button onClick={() => setIsActive(false)} className="flex-1 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm">Kapat</button>
            <button onClick={togglePanelPosition} className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm">{panelPosition === 'right' ? '◀' : '▶'}</button>
          </div>
        </div>
      </div>

      {/* Arama Modalı */}
      {isSearchOpen && (
        <SearchModal
          query={searchQuery}
          setQuery={setSearchQuery}
          results={searchResults}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}

/* =============== ToggleCard =============== */
function ToggleCard({ icon, title, description, isActive, onToggle }) {
  return (
    <div className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors">
      <div className="flex items-start gap-3 flex-1">
        <span className="text-2xl mt-1" aria-hidden>{icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 ml-4">
        <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>{isActive ? 'AÇIK' : 'KAPALI'}</span>
        <button onClick={onToggle} aria-pressed={isActive} aria-label={`${title} ${isActive ? 'kapat' : 'aç'}`} className={`w-14 h-7 rounded-full transition-colors relative ${ isActive ? 'bg-green-500' : 'bg-gray-300' }`}>
          <div className={`w-5 h-5 rounded-full bg-white transform transition-transform absolute top-1 ${ isActive ? 'translate-x-8' : 'translate-x-1' }`} />
        </button>
      </div>
    </div>
  );
}

/* =============== ActionCard =============== */
function ActionCard({ icon, title, description, onClick }) {
  return (
    <button onClick={onClick} className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors text-left">
      <div className="flex items-start gap-3 flex-1">
        <span className="text-2xl mt-1" aria-hidden>{icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      <span className="text-gray-400 text-lg" aria-hidden>›</span>
    </button>
  );
}

/* =============== SearchModal =============== */
function SearchModal({ query, setQuery, results, onClose }) {
  const modalRef = useRef(null);

  // Body lock + Escape + focus trap
  useEffect(() => {
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);

    const el = modalRef.current;
    const getFocusables = () => el?.querySelectorAll('button, [href], input, [tabindex]:not([tabindex="-1"])');
    const fs = getFocusables();
    const first = fs?.[0]; const last = fs?.[fs.length - 1];
    const onTab = (e) => {
      if (e.key !== 'Tab') return;
      const arr = getFocusables(); if (!arr || !arr.length) return;
      const f = arr[0]; const l = arr[arr.length - 1];
      if (e.shiftKey && document.activeElement === f) { e.preventDefault(); l.focus(); }
      else if (!e.shiftKey && document.activeElement === l) { e.preventDefault(); f.focus(); }
    };
    el?.addEventListener('keydown', onTab);
    setTimeout(() => first?.focus(), 0);

    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
      el?.removeEventListener('keydown', onTab);
    };
  }, [onClose]);

  // Enter: ilk sonuç
  useEffect(() => {
    const onEnter = (e) => {
      if (e.key !== 'Enter') return;
      if (!results || results.length === 0) return;
      e.preventDefault();
      window.location.href = results[0].href;
    };
    document.addEventListener('keydown', onEnter);
    return () => document.removeEventListener('keydown', onEnter);
  }, [results]);

  return (
    <div className="fixed inset-0 z-[10001] bg-black/50 flex items-center justify-center p-4" role="dialog" aria-modal="true" aria-label="Site içi arama">
      <div ref={modalRef} className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Sayfalarda arama yapın..." className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" autoFocus aria-label="Arama metni" />
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" aria-hidden>🔍</span>
            </div>
            <button onClick={onClose} className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors" aria-label="Arama penceresini kapat">Kapat</button>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {(!results || results.length === 0) ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <div className="text-4xl mb-4" aria-hidden>🔍</div>
              <div className="text-lg font-semibold">Sonuç bulunamadı</div>
            </div>
          ) : (
            results.map((route) => (
              <Link key={route.href} href={route.href} onClick={onClose} className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors">
                <span className="text-xl" aria-hidden>{route.icon}</span>
                <span className="font-medium text-gray-700">{route.label}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
