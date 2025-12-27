// components/UtilityBar.js
"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Link from "next/link";
import useSearchIndex from "@/lib/useSearchIndex";

const UTILITY_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, erişilebilirlik panelinden yazıyorum. Hızlı teklif ve destek almak istiyorum."
);

const LS_KEYS = {
  ACTIVE: "acc_active",
  FONT_SIZE: "acc_font_size",
  PANEL_POSITION: "acc_panel_position_v2",
  SEIZURE_SAFE: "acc_seizure_safe",
  VISION_IMPAIRED: "acc_vision_impaired",
  ADHD_FRIENDLY: "acc_adhd_friendly",
  COGNITIVE_DISABILITY: "acc_cognitive_disability",
  BLIND_USERS: "acc_blind_users",
  KEYBOARD_NAV: "acc_keyboard_nav",
  DYSLEXIC_FONT: "acc_dyslexic_font",
  HIGHLIGHT_HEADINGS: "acc_highlight_headings",
  HIGHLIGHT_LINKS: "acc_highlight_links",
  READING_MASK: "acc_reading_mask",
  HIGH_CONTRAST: "acc_high_contrast",
  INVERT_COLORS: "acc_invert_colors",
  GRAYSCALE: "acc_grayscale",
  UNDERLINE_LINKS: "acc_underline_links",
  DARK_MODE: "acc_dark_mode",
  LIGHT_MODE: "acc_light_mode",
  BIG_CURSOR: "acc_big_cursor",
  STOP_ANIMATIONS: "acc_stop_animations",
  MUTE_SOUNDS: "acc_mute_sounds",
  HIDE_IMAGES: "acc_hide_images",
};

function UtilityBar() {
  // Ana durumlar
  const [isActive, setIsActive] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [activeTab, setActiveTab] = useState("profiles");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelPosition, setPanelPosition] = useState("left");
  const { routes: searchRoutes } = useSearchIndex();

  // Ayar durumları
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
  const styleRef = useRef(null);
  const guideRef = useRef(null);
  const animationStyleRef = useRef(null);

  const setLS = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* ignore */
    }
  };

  const getLS = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  // Dinamik CSS
  const applyStyles = useCallback(() => {
    if (!styleRef.current && typeof document !== "undefined") {
      styleRef.current = document.createElement("style");
      document.head.appendChild(styleRef.current);
    }
    if (!styleRef.current) return;

    const styles = `
      .accessibility-active {
        --acc-font-size: ${fontSize}px;
      }
      .accessibility-active body {
        font-size: var(--acc-font-size) !important;
      }

      ${highContrast ? `
        .accessibility-active {
          background: #000 !important;
          color: #fff !important;
        }
        .accessibility-active * {
          background: inherit !important;
          color: inherit !important;
          border-color: #ffff00 !important;
        }
        .accessibility-active a {
          color: #ffff00 !important;
          text-decoration: underline !important;
        }
      ` : ""}

      ${invertColors ? `
        .accessibility-active {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      ` : ""}

      ${grayscale ? `
        .accessibility-active {
          filter: grayscale(1) !important;
        }
      ` : ""}

      ${underlineLinks ? `
        .accessibility-active a {
          text-decoration: underline !important;
        }
      ` : ""}

      ${dyslexicFont ? `
        .accessibility-active * {
          font-family: Arial, sans-serif !important;
          font-weight: 600 !important;
        }
      ` : ""}

      ${highlightHeadings ? `
        .accessibility-active h1,
        .accessibility-active h2,
        .accessibility-active h3,
        .accessibility-active h4,
        .accessibility-active h5,
        .accessibility-active h6 {
          background: yellow !important;
          color: black !important;
          padding: 4px 8px !important;
        }
      ` : ""}

      ${highlightLinks ? `
        .accessibility-active a {
          background: #ffff00 !important;
          color: #000 !important;
          padding: 2px 4px !important;
        }
      ` : ""}

      ${bigCursor ? `
        .accessibility-active {
          cursor: crosshair !important;
        }
      ` : ""}

      ${darkMode ? `
        .accessibility-active {
          background: #111827 !important;
          color: #f9fafb !important;
        }
      ` : ""}

      ${lightMode ? `
        .accessibility-active {
          background: #ffffff !important;
          color: #111827 !important;
        }
      ` : ""}

      ${hideImages ? `
        .accessibility-active img {
          display: none !important;
        }
      ` : ""}

      .reading-guide {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: #f97316;
        z-index: 10000;
        pointer-events: none;
        display: none;
      }
      .accessibility-active .reading-guide {
        display: block;
      }
    `;

    styleRef.current.textContent = styles;
  }, [
    fontSize,
    highContrast,
    invertColors,
    grayscale,
    underlineLinks,
    dyslexicFont,
    highlightHeadings,
    highlightLinks,
    bigCursor,
    darkMode,
    lightMode,
    hideImages,
  ]);

  const handleStopAnimations = useCallback(() => {
    if (animationStyleRef.current || typeof document === "undefined") return;
    const style = document.createElement("style");
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
        scroll-behavior: auto !important;
      }
    `;
    document.head.appendChild(style);
    animationStyleRef.current = style;
  }, []);

  const handleStartAnimations = useCallback(() => {
    if (animationStyleRef.current) {
      animationStyleRef.current.remove();
      animationStyleRef.current = null;
    }
  }, []);

  const initReadingGuide = useCallback(() => {
    if (typeof document === "undefined") return;
    if (!guideRef.current) {
      const guide = document.createElement("div");
      guide.className = "reading-guide";
      document.body.appendChild(guide);
      guideRef.current = guide;
    }

    const onMouseMove = (e) => {
      if (guideRef.current) {
        guideRef.current.style.top = `${e.clientY}px`;
      }
    };

    document.addEventListener("mousemove", onMouseMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  // İlk yükleme
  useEffect(() => {
    if (typeof window === "undefined") return;

    const active = getLS(LS_KEYS.ACTIVE, false);
    const savedFontSize = getLS(LS_KEYS.FONT_SIZE, 16);
    const savedPosition = getLS(LS_KEYS.PANEL_POSITION, "left");

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

    setIsActive(active);
    setFontSize(savedFontSize);
    setPanelPosition(savedPosition);

    if (active) {
      document.documentElement.classList.add("accessibility-active");
      applyStyles();

      if (getLS(LS_KEYS.STOP_ANIMATIONS, false)) {
        handleStopAnimations();
      }
      if (getLS(LS_KEYS.READING_MASK, false)) {
        initReadingGuide();
      }
    }
  }, [applyStyles, handleStopAnimations, initReadingGuide]);

  // Aktiflik değişince
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isActive) {
      document.documentElement.classList.add("accessibility-active");
      setLS(LS_KEYS.ACTIVE, true);
      applyStyles();
    } else {
      document.documentElement.classList.remove("accessibility-active");
      setLS(LS_KEYS.ACTIVE, false);
      handleStartAnimations();
    }
  }, [isActive, applyStyles, handleStartAnimations]);

  const togglePanelPosition = useCallback(() => {
    const next = panelPosition === "right" ? "left" : "right";
    setPanelPosition(next);
    setLS(LS_KEYS.PANEL_POSITION, next);
  }, [panelPosition]);

  const createToggleHandler = useCallback(
    (state, setState, key, extraAction) =>
      () => {
        const next = !state;
        setState(next);
        setLS(key, next);
        if (extraAction) extraAction(next);
        setIsActive(true);
        applyStyles();
      },
    [applyStyles]
  );

  // Profil handler'ları
  const toggleSeizureSafe = createToggleHandler(
    seizureSafe,
    setSeizureSafe,
    LS_KEYS.SEIZURE_SAFE,
    (on) => {
      if (on) {
        handleStopAnimations();
        setMuteSounds(true);
        setLS(LS_KEYS.MUTE_SOUNDS, true);
      } else {
        handleStartAnimations();
        setMuteSounds(false);
        setLS(LS_KEYS.MUTE_SOUNDS, false);
      }
    }
  );

  const toggleVisionImpaired = createToggleHandler(
    visionImpaired,
    setVisionImpaired,
    LS_KEYS.VISION_IMPAIRED,
    (on) => {
      if (on) {
        setFontSize(18);
        setLS(LS_KEYS.FONT_SIZE, 18);
        setHighContrast(true);
        setLS(LS_KEYS.HIGH_CONTRAST, true);
        setUnderlineLinks(true);
        setLS(LS_KEYS.UNDERLINE_LINKS, true);
        setBigCursor(true);
        setLS(LS_KEYS.BIG_CURSOR, true);
      }
    }
  );

  const toggleAdhdFriendly = createToggleHandler(
    adhdFriendly,
    setAdhdFriendly,
    LS_KEYS.ADHD_FRIENDLY,
    (on) => {
      if (on) {
        handleStopAnimations();
        setAnimationsStopped(true);
        setLS(LS_KEYS.STOP_ANIMATIONS, true);
      } else {
        handleStartAnimations();
        setAnimationsStopped(false);
        setLS(LS_KEYS.STOP_ANIMATIONS, false);
      }
    }
  );

  const toggleCognitiveDisability = createToggleHandler(
    cognitiveDisability,
    setCognitiveDisability,
    LS_KEYS.COGNITIVE_DISABILITY,
    (on) => {
      if (on) {
        setFontSize(18);
        setLS(LS_KEYS.FONT_SIZE, 18);
        setDyslexicFont(true);
        setLS(LS_KEYS.DYSLEXIC_FONT, true);
        setHighlightHeadings(true);
        setLS(LS_KEYS.HIGHLIGHT_HEADINGS, true);
        setHighlightLinks(true);
        setLS(LS_KEYS.HIGHLIGHT_LINKS, true);
      }
    }
  );

  const toggleBlindUsers = createToggleHandler(
    blindUsers,
    setBlindUsers,
    LS_KEYS.BLIND_USERS
  );
  const toggleKeyboardNav = createToggleHandler(
    keyboardNav,
    setKeyboardNav,
    LS_KEYS.KEYBOARD_NAV
  );

  // Diğer toggle'lar
  const toggleDyslexicFont = createToggleHandler(
    dyslexicFont,
    setDyslexicFont,
    LS_KEYS.DYSLEXIC_FONT
  );
  const toggleHighlightHeadings = createToggleHandler(
    highlightHeadings,
    setHighlightHeadings,
    LS_KEYS.HIGHLIGHT_HEADINGS
  );
  const toggleHighlightLinks = createToggleHandler(
    highlightLinks,
    setHighlightLinks,
    LS_KEYS.HIGHLIGHT_LINKS
  );
  const toggleReadingMask = createToggleHandler(
    readingMask,
    setReadingMask,
    LS_KEYS.READING_MASK,
    (on) => {
      if (on) initReadingGuide();
    }
  );
  const toggleHighContrast = createToggleHandler(
    highContrast,
    setHighContrast,
    LS_KEYS.HIGH_CONTRAST
  );
  const toggleInvertColors = createToggleHandler(
    invertColors,
    setInvertColors,
    LS_KEYS.INVERT_COLORS
  );
  const toggleGrayscale = createToggleHandler(
    grayscale,
    setGrayscale,
    LS_KEYS.GRAYSCALE
  );
  const toggleUnderlineLinks = createToggleHandler(
    underlineLinks,
    setUnderlineLinks,
    LS_KEYS.UNDERLINE_LINKS
  );
  const toggleDarkMode = createToggleHandler(
    darkMode,
    setDarkMode,
    LS_KEYS.DARK_MODE
  );
  const toggleLightMode = createToggleHandler(
    lightMode,
    setLightMode,
    LS_KEYS.LIGHT_MODE
  );
  const toggleBigCursor = createToggleHandler(
    bigCursor,
    setBigCursor,
    LS_KEYS.BIG_CURSOR
  );
  const toggleStopAnimations = createToggleHandler(
    animationsStopped,
    setAnimationsStopped,
    LS_KEYS.STOP_ANIMATIONS,
    (on) => {
      if (on) handleStopAnimations();
      else handleStartAnimations();
    }
  );
  const toggleMuteSounds = createToggleHandler(
    muteSounds,
    setMuteSounds,
    LS_KEYS.MUTE_SOUNDS
  );
  const toggleHideImages = createToggleHandler(
    hideImages,
    setHideImages,
    LS_KEYS.HIDE_IMAGES
  );

  const resetAll = useCallback(() => {
    if (typeof window === "undefined") return;

    Object.values(LS_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    document.documentElement.classList.remove("accessibility-active");

    setSeizureSafe(false);
    setVisionImpaired(false);
    setAdhdFriendly(false);
    setCognitiveDisability(false);
    setBlindUsers(false);
    setKeyboardNav(false);
    setDyslexicFont(false);
    setHighlightHeadings(false);
    setHighlightLinks(false);
    setReadingMask(false);
    setHighContrast(false);
    setInvertColors(false);
    setGrayscale(false);
    setUnderlineLinks(false);
    setDarkMode(false);
    setLightMode(false);
    setBigCursor(false);
    setAnimationsStopped(false);
    setMuteSounds(false);
    setHideImages(false);
    setFontSize(16);
    setIsActive(false);
    setPanelPosition("left");
setLS(LS_KEYS.PANEL_POSITION, "left");

    handleStartAnimations();

    if (guideRef.current) {
      guideRef.current.remove();
      guideRef.current = null;
    }
  }, [handleStartAnimations]);

  const setFontSizeWithSave = useCallback(
    (size) => {
      const clamped = Math.min(24, Math.max(12, size));
      setFontSize(clamped);
      setLS(LS_KEYS.FONT_SIZE, clamped);
      applyStyles();
    },
    [applyStyles]
  );

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return searchRoutes;
    const q = searchQuery.toLowerCase();
    return searchRoutes.filter((route) => {
      const labelMatch = route.label.toLowerCase().includes(q);
      const keywordMatch = route.keywords?.some((keyword) =>
        keyword.toLowerCase().includes(q),
      );
      return labelMatch || keywordMatch;
    });
  }, [searchQuery, searchRoutes]);

  // Panel kapalıyken: sadece FAB
  if (!isActive) {
    return (
      <div
        className={`fixed ${
          panelPosition === "right" ? "right-4" : "left-4"
        } bottom-6 z-50`}
      >
        <button
          onClick={() => setIsActive(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          aria-label="Erişilebilirlik ayarlarını aç"
        >
          ♿
        </button>
      </div>
    );
  }

  // Panel açıkken
  return (
    <>
      <div
        className={`fixed top-0 ${
          panelPosition === "right" ? "right-0" : "left-0"
        } z-[10000] w-full max-w-96 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">♿</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Erişilebilirlik</h2>
              <p className="text-blue-100 text-sm">
                Ayarlarınızı kişiselleştirin
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={togglePanelPosition}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label={`Paneli ${
                panelPosition === "right" ? "sola" : "sağa"
              } taşı`}
            >
              {panelPosition === "right" ? "◀" : "▶"}
            </button>
            <button
              onClick={() => setIsActive(false)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Erişilebilirlik panelini kapat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: "profiles", label: "Profiller", icon: "👤" },
            { id: "content", label: "İçerik", icon: "📝" },
            { id: "color", label: "Renk", icon: "🎨" },
            { id: "orientation", label: "Yönlendirme", icon: "🎯" },
            { id: "tools", label: "Araçlar", icon: "🛠️" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id
                  ? "text-blue-600 bg-white border-b-2 border-blue-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* İçerik */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Profiller */}
          {activeTab === "profiles" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Sizin için uygun erişilebilirlik profilini seçin
                </h3>
              </div>

              <ToggleCard
                icon="⚡"
                title="Epilepsi Güvenli Profil"
                description="Yanıp sönen efektleri ve yoğun animasyonları azaltır."
                isActive={seizureSafe}
                onToggle={toggleSeizureSafe}
              />
              <ToggleCard
                icon="👁️"
                title="Görme Engelli Profili"
                description="Büyük yazı, yüksek kontrast ve belirgin bağlantılar."
                isActive={visionImpaired}
                onToggle={toggleVisionImpaired}
              />
              <ToggleCard
                icon="🧠"
                title="DEHB Dostu Profil"
                description="Daha az hareket, daha sakin arayüz."
                isActive={adhdFriendly}
                onToggle={toggleAdhdFriendly}
              />
              <ToggleCard
                icon="🎯"
                title="Bilişsel Destek Profili"
                description="Okumayı ve odaklanmayı kolaylaştıran ayarlar."
                isActive={cognitiveDisability}
                onToggle={toggleCognitiveDisability}
              />
              <ToggleCard
                icon="⌨️"
                title="Klavye Navigasyonu"
                description="Siteyi klavye ile rahatça kullanın."
                isActive={keyboardNav}
                onToggle={toggleKeyboardNav}
              />
              <ToggleCard
                icon="🔈"
                title="Görme Engelli Kullanıcılar"
                description="Ekran okuyucu dostu düzenlemeler."
                isActive={blindUsers}
                onToggle={toggleBlindUsers}
              />
            </div>
          )}

          {/* İçerik */}
          {activeTab === "content" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  İçerik ve okunabilirlik ayarları
                </h3>
              </div>

              <div className="bg-gray-50 p-4 rounded-xl">
                <h4 className="font-semibold text-gray-900 mb-3">
                  Yazı Boyutu
                </h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setFontSizeWithSave(fontSize - 2)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                  >
                    A-
                  </button>
                  <div className="flex-1 text-center py-3 bg-blue-50 text-blue-700 rounded-lg font-bold">
                    {fontSize}px
                  </div>
                  <button
                    onClick={() => setFontSizeWithSave(fontSize + 2)}
                    className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                  >
                    A+
                  </button>
                </div>
              </div>

              <ToggleCard
                icon="🔤"
                title="Disleksi Yazı Tipi"
                description="Okumayı kolaylaştıran yazı tipi ve ağırlık."
                isActive={dyslexicFont}
                onToggle={toggleDyslexicFont}
              />
              <ToggleCard
                icon="📑"
                title="Başlıkları Vurgula"
                description="Tüm başlıkları belirgin hale getirir."
                isActive={highlightHeadings}
                onToggle={toggleHighlightHeadings}
              />
              <ToggleCard
                icon="🔗"
                title="Bağlantıları Vurgula"
                description="Linklerin fark edilmesini kolaylaştırır."
                isActive={highlightLinks}
                onToggle={toggleHighlightLinks}
              />
              <ToggleCard
                icon="👁️"
                title="Okuma Maskesi"
                description="Satır üzerinde hareket eden okuma kılavuzu."
                isActive={readingMask}
                onToggle={toggleReadingMask}
              />
            </div>
          )}

          {/* Renk */}
          {activeTab === "color" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Renk ve görünüm ayarları
                </h3>
              </div>

              <ToggleCard
                icon="🎨"
                title="Yüksek Kontrast"
                description="Metin ve arka plan kontrastını artırır."
                isActive={highContrast}
                onToggle={toggleHighContrast}
              />
              <ToggleCard
                icon="🔄"
                title="Renkleri Ters Çevir"
                description="Renkleri ters çevirerek farklı bir görünüm sunar."
                isActive={invertColors}
                onToggle={toggleInvertColors}
              />
              <ToggleCard
                icon="⚫"
                title="Siyah-Beyaz Mod"
                description="Tüm renkleri gri tonuna çevirir."
                isActive={grayscale}
                onToggle={toggleGrayscale}
              />
              <ToggleCard
                icon="🔗"
                title="Bağlantı Altı Çizgisi"
                description="Tüm linklerin altını çizer."
                isActive={underlineLinks}
                onToggle={toggleUnderlineLinks}
              />
              <ToggleCard
                icon="🌙"
                title="Koyu Mod"
                description="Koyu tema severler için rahat okuma."
                isActive={darkMode}
                onToggle={toggleDarkMode}
              />
              <ToggleCard
                icon="☀️"
                title="Açık Mod"
                description="Parlak ve temiz arayüz."
                isActive={lightMode}
                onToggle={toggleLightMode}
              />
            </div>
          )}

          {/* Yönlendirme */}
          {activeTab === "orientation" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Yönlendirme ve navigasyon
                </h3>
              </div>

              <ToggleCard
                icon="🖱️"
                title="Büyük İmleç"
                description="İmleci daha belirgin hale getirir."
                isActive={bigCursor}
                onToggle={toggleBigCursor}
              />
              <ToggleCard
                icon="⏸️"
                title="Animasyonları Durdur"
                description="Tüm hareketli öğeleri durdurur."
                isActive={animationsStopped}
                onToggle={toggleStopAnimations}
              />
              <ToggleCard
                icon="🔇"
                title="Sesleri Kapat"
                description="Site seslerini ve video seslerini kapatır."
                isActive={muteSounds}
                onToggle={toggleMuteSounds}
              />
              <ToggleCard
                icon="🖼️"
                title="Resimleri Gizle"
                description="Görselleri gizleyerek dikkat dağıtmayı azaltır."
                isActive={hideImages}
                onToggle={toggleHideImages}
              />
            </div>
          )}

          {/* Araçlar */}
          {activeTab === "tools" && (
            <div className="space-y-6">
              <div className="text-center mb-2">
                <h3 className="text-lg font-semibold text-gray-900">
                  Yardımcı araçlar
                </h3>
              </div>

              <ToggleCard
                icon="🗑️"
                title="Tüm Ayarları Sıfırla"
                description="Tüm erişilebilirlik ayarlarını varsayılan hale getir."
                isActive={false}
                onToggle={resetAll}
                asButtonOnly
              />

              <div className="space-y-3">
                <ActionCard
                  icon="🔍"
                  title="Sayfalar Arasında Ara"
                  description="Site içinde sayfa başlıklarında arama yapın."
                  onClick={() => setIsSearchOpen(true)}
                />
                <ActionCard
                  icon="📞"
                  title="Hemen Ara"
                  description="Sahneva ile telefonla iletişime geç."
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.location.href = "tel:+905453048671";
                    }
                  }}
                />
                <ActionCard
                  icon="💬"
                  title="WhatsApp İletişim"
                  description="WhatsApp üzerinden hızlı teklif alın."
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.open(
                        `https://wa.me/905453048671?text=${UTILITY_WHATSAPP_MESSAGE}&utm_source=utilitybar&utm_medium=whatsapp_shortcut`,
                        "_blank",
                        "noopener,noreferrer"
                      );
                    }
                  }}
                />
                <ActionCard
                  icon="⬆️"
                  title="Yukarı Kaydır"
                  description="Sayfanın en üstüne dön."
                  onClick={() => {
                    if (typeof window !== "undefined") {
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex justify-end">
            <button
              onClick={() => setIsActive(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
            >
              Kapat
            </button>
          </div>
        </div>
      </div>

      {/* Arama Modali */}
      {isSearchOpen && (
        <SearchModal
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          results={searchResults}
          onClose={() => setIsSearchOpen(false)}
        />
      )}
    </>
  );
}

/* ---------- Yardımcı Bileşenler ---------- */

function ToggleCard({
  icon,
  title,
  description,
  isActive,
  onToggle,
  asButtonOnly = false,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-3 flex items-start gap-3">
      <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center text-lg">
        {icon}
      </div>
      <div className="flex-1">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          </div>
          <button
            type="button"
            onClick={onToggle}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              asButtonOnly
                ? "bg-red-500 hover:bg-red-600"
                : isActive
                ? "bg-blue-600"
                : "bg-gray-300"
            }`}
            aria-pressed={isActive}
          >
            {!asButtonOnly && (
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  isActive ? "translate-x-5" : "translate-x-1"
                }`}
              />
            )}
            {asButtonOnly && (
              <span className="w-full text-xs text-white font-semibold">
                Sıfırla
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

function ActionCard({ icon, title, description, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-start gap-3 rounded-xl border border-gray-200 bg-white p-3 hover:bg-gray-50 text-left transition-colors"
    >
      <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-lg text-blue-600">
        {icon}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold text-gray-900">{title}</h4>
        <p className="text-xs text-gray-600 mt-1">{description}</p>
      </div>
    </button>
  );
}

function SearchModal({ searchQuery, setSearchQuery, results, onClose }) {
  return (
    <div className="fixed inset-0 z-[10001] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl max-h-[80vh] flex flex-col">
        {/* Başlık */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <span className="text-xl">🔍</span>
            <div>
              <p className="font-semibold text-gray-900 text-sm">
                Site içi arama
              </p>
              <p className="text-xs text-gray-600">
                Sayfalarda hızlıca arama yapın
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-3 py-1.5 rounded-lg bg-gray-100 text-xs font-medium text-gray-700 hover:bg-gray-200"
          >
            Kapat
          </button>
        </div>

        {/* Arama inputu */}
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="relative">
            <label htmlFor="site-search-input" className="sr-only">
              Site içinde arama yapın
            </label>
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" aria-hidden="true">
              🔍
            </span>
            <input
              id="site-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Örn: LED ekran kiralama..."
              className="w-full pl-9 pr-3 py-2.5 rounded-lg border border-gray-300 text-sm focus-ring"
              autoFocus
            />
          </div>
        </div>

        {/* Sonuçlar */}
        <div className="flex-1 overflow-y-auto">
            {results.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-gray-600 text-sm">
                <div className="text-3xl mb-2">😕</div>
                <p>Eşleşen bir sayfa bulunamadı.</p>
              </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {results.map((route) => (
                <li key={route.href}>
                  <Link
                    href={route.href}
                    onClick={onClose}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
                  >
                    <span className="text-xl">{route.icon}</span>
                    <span className="text-sm font-medium text-gray-800">
                      {route.label}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default UtilityBar;
