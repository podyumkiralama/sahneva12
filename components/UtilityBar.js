// components/UtilityBar.js
"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

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

// LocalStorage anahtarları
const LS_KEYS = {
  ACTIVE: "acc_active",
  FONT_SIZE: "acc_font_size",
  PANEL_POSITION: "acc_panel_position",
  // Profil durumları
  SEIZURE_SAFE: "acc_seizure_safe",
  VISION_IMPAIRED: "acc_vision_impaired",
  ADHD_FRIENDLY: "acc_adhd_friendly",
  COGNITIVE_DISABILITY: "acc_cognitive_disability",
  BLIND_USERS: "acc_blind_users",
  KEYBOARD_NAV: "acc_keyboard_nav",
  // İçerik ayarları
  DYSLEXIC_FONT: "acc_dyslexic_font",
  HIGHLIGHT_HEADINGS: "acc_highlight_headings",
  HIGHLIGHT_LINKS: "acc_highlight_links",
  READING_MASK: "acc_reading_mask",
  // Renk ayarları
  HIGH_CONTRAST: "acc_high_contrast",
  INVERT_COLORS: "acc_invert_colors",
  GRAYSCALE: "acc_grayscale",
  UNDERLINE_LINKS: "acc_underline_links",
  DARK_MODE: "acc_dark_mode",
  LIGHT_MODE: "acc_light_mode",
  // Yönlendirme ayarları
  BIG_CURSOR: "acc_big_cursor",
  STOP_ANIMATIONS: "acc_stop_animations",
  MUTE_SOUNDS: "acc_mute_sounds",
  HIDE_IMAGES: "acc_hide_images",
};

// ToggleCard Bileşeni (GÜNCELLENDİ)
function ToggleCard({ icon, title, description, isActive, onToggle }) {
  // Toggle mekanizmasını kapsayan div'e benzersiz bir ID verelim
  // Bu ID, aria-labelledby için kullanılacak
  const uniqueId = useMemo(() => `toggle-${title.toLowerCase().replace(/[^a-z0-9]/g, '-')}`, [title]);

  return (
    <div 
      className="flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors cursor-pointer"
      onClick={onToggle} // Tıklama tüm karta uygulandı
      id={uniqueId} // Benzersiz ID
    >
      <div className="flex items-start gap-3 flex-1 pointer-events-none">
        <span className="text-2xl mt-1">{icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base" id={`${uniqueId}-title`}>{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-4 pointer-events-none">
        <span className={`text-xs font-medium ${isActive ? 'text-green-600' : 'text-gray-500'}`}>
          {isActive ? 'AÇIK' : 'KAPALI'}
        </span>
        <div // Buton yerine sadece görsel kaydırıcı kaldı
          className={`w-14 h-7 rounded-full transition-colors relative ${
            isActive ? 'bg-green-500' : 'bg-gray-300'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transform transition-transform absolute top-1 ${
              isActive ? 'translate-x-8' : 'translate-x-1'
            }`}
          />
        </div>
      </div>
      
      {/* GÖRSEL KAYDIRICININ YERİNE GEÇEN KLAVYE ODAKLI GÖRÜNMEZ BUTON
        Tüm kart tıklanabilir olsa da, ARIA switch rolünü taşıyan bu elementtir.
      */}
      <button
        onClick={onToggle}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" // Kartın tamamını kaplayan görünmez buton
        role="switch" // 👈 CRITICAL: ARIA Role eklendi
        aria-checked={isActive} // 👈 CRITICAL: ARIA durumu eklendi
        aria-labelledby={`${uniqueId}-title`} // 👈 CRITICAL: Başlıkla ilişkilendirildi
      >
        <span className="sr-only">{title} ayarını {isActive ? 'kapat' : 'aç'}</span> 
      </button>
    </div>
  );
}

// ActionCard Bileşeni
function ActionCard({ icon, title, description, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
    >
      <div className="flex items-start gap-3 flex-1"> 
        <span className="text-2xl mt-1">{icon}</span>
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-base">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
      </div>
    </button>
  );
}


export default function UtilityBar() {
  // Ana durumlar
  const [isActive, setIsActive] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [activeTab, setActiveTab] = useState("profiles");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelPosition, setPanelPosition] = useState("right");

  // Tüm ayar durumları
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
  const panelRef = useRef(null);
  const firstTabRef = useRef(null); // Yeni Ref: Panel açıldığında odaklanılacak ilk öğe

  // Yardımcı fonksiyonlar
  const setLS = (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage kullanılamıyorsa değer saklanmaz
    }
  };

  const getLS = (key, defaultValue) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      // depolama okuması başarısızsa varsayılan değeri döndür
      return defaultValue;
    }
  };

  // CSS stilini uygula
  const applyStyles = useCallback(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }

    const styles = `
      .accessibility-active {
        --acc-font-size: ${fontSize}px;
      }

      .accessibility-active body {
        font-size: var(--acc-font-size) !important;
      }

      ${highContrast ? `
        .accessibility-active {
          background: #000000 !important;
          color: #ffffff !important;
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
      ` : ''}

      ${invertColors ? `
        .accessibility-active {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      ` : ''}

      ${grayscale ? `
        .accessibility-active {
          filter: grayscale(1) !important;
        }
      ` : ''}

      ${underlineLinks ? `
        .accessibility-active a {
          text-decoration: underline !important;
        }
      ` : ''}

      ${dyslexicFont ? `
        .accessibility-active * {
          font-family: Arial, sans-serif !important;
          font-weight: bold !important;
        }
      ` : ''}

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
      ` : ''}

      ${highlightLinks ? `
        .accessibility-active a {
          background: #ffff00 !important;
          color: #000000 !important;
          padding: 2px 4px !important;
        }
      ` : ''}

      ${bigCursor ? `
        .accessibility-active {
          cursor: crosshair !important;
        }
      ` : ''}

      ${darkMode ? `
        .accessibility-active {
          background: #1a1a1a !important;
          color: #ffffff !important;
        }
      ` : ''}

      ${lightMode ? `
        .accessibility-active {
          background: #ffffff !important;
          color: #000000 !important;
        }
      ` : ''}

      ${hideImages ? `
        .accessibility-active img {
          display: none !important;
        }
      ` : ''}

      .reading-guide {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: red;
        z-index: 10000;
        pointer-events: none;
        display: none;
      }

      .accessibility-active .reading-guide {
        display: block;
      }
      
      /* Ekran Okuyucu Metinlerini Gizleme Sınıfı */
      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        white-space: nowrap;
        border-width: 0;
      }
    `;

    styleRef.current.textContent = styles;
  }, [fontSize, highContrast, invertColors, grayscale, underlineLinks, dyslexicFont, highlightHeadings, highlightLinks, bigCursor, darkMode, lightMode, hideImages]);

  // Animasyonları durdur
  const handleStopAnimations = useCallback(() => {
    if (!animationStyleRef.current) {
      animationStyleRef.current = document.createElement('style');
      animationStyleRef.current.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(animationStyleRef.current);
    }
  }, []);

  const handleStartAnimations = useCallback(() => {
    if (animationStyleRef.current) {
      animationStyleRef.current.remove();
      animationStyleRef.current = null;
    }
  }, []);

  // Okuma kılavuzu
  const initReadingGuide = useCallback(() => {
    if (!guideRef.current) {
      guideRef.current = document.createElement('div');
      guideRef.current.className = 'reading-guide';
      document.body.appendChild(guideRef.current);
    }

    const guide = guideRef.current;

    const onMouseMove = (e) => {
      if (guideRef.current) {
        guide.style.top = e.clientY + 'px';
      }
    };

    document.addEventListener('mousemove', onMouseMove);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  // Başlangıç yükleme
  useEffect(() => {
    const active = getLS(LS_KEYS.ACTIVE, false);
    const savedFontSize = getLS(LS_KEYS.FONT_SIZE, 16);
    const savedPosition = getLS(LS_KEYS.PANEL_POSITION, "right");

    // Tüm state'leri yükle
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
      document.documentElement.classList.add('accessibility-active');
      applyStyles();
      
      if (getLS(LS_KEYS.STOP_ANIMATIONS, false)) {
        handleStopAnimations();
      }
      
      if (getLS(LS_KEYS.READING_MASK, false)) {
        initReadingGuide();
      }
    }
  }, [applyStyles, handleStopAnimations, initReadingGuide]);

  // Aktif durum değiştiğinde (Panel açıldığında/kapandığında)
  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add('accessibility-active');
      setLS(LS_KEYS.ACTIVE, true);
      applyStyles();
      
      // Panel açıldığında odağı ilk sekmeye taşı
      if (firstTabRef.current) {
          firstTabRef.current.focus();
      }
      
      // ESC tuşu ile kapatma (Modal Trap'in bir parçası)
      const handleEscape = (event) => {
        if (event.key === 'Escape') {
          setIsActive(false);
        }
      };
      document.addEventListener('keydown', handleEscape);
      
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };

    } else {
      document.documentElement.classList.remove('accessibility-active');
      setLS(LS_KEYS.ACTIVE, false);
      handleStartAnimations();
    }
  }, [isActive, applyStyles, handleStartAnimations]);

  // Panel konumunu değiştir
  const togglePanelPosition = useCallback(() => {
    const newPosition = panelPosition === "right" ? "left" : "right";
    setPanelPosition(newPosition);
    setLS(LS_KEYS.PANEL_POSITION, newPosition);
  }, [panelPosition]);

  // Genel toggle fonksiyonu
  const createToggleHandler = useCallback((state, setState, key, extraAction = null) => {
    return () => {
      const newState = !state;
      setState(newState);
      setLS(key, newState);
      
      if (extraAction) {
        extraAction(newState);
      }
      
      setIsActive(true);
      applyStyles();
    };
  }, [applyStyles]);

  // Profil toggle'ları
  const toggleSeizureSafe = createToggleHandler(
    seizureSafe, setSeizureSafe, LS_KEYS.SEIZURE_SAFE,
    (newState) => {
      if (newState) {
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
    visionImpaired, setVisionImpaired, LS_KEYS.VISION_IMPAIRED,
    (newState) => {
      if (newState) {
        setFontSize(18);
        setLS(LS_KEYS.FONT_SIZE, 18);
        setHighContrast(true);
        setLS(LS_KEYS.HIGH_CONTRAST, true);
        setUnderlineLinks(true);
        setLS(LS_KEYS.UNDERLINE_LINKS, true);
        setBigCursor(true);
        setLS(LS_KEYS.BIG_CURSOR, true);
      } else { // Profil kapatıldığında manuel ayarları sıfırla
        setFontSize(16);
        setLS(LS_KEYS.FONT_SIZE, 16);
        setHighContrast(false);
        setLS(LS_KEYS.HIGH_CONTRAST, false);
        setUnderlineLinks(false);
        setLS(LS_KEYS.UNDERLINE_LINKS, false);
        setBigCursor(false);
        setLS(LS_KEYS.BIG_CURSOR, false);
      }
    }
  );

  const toggleAdhdFriendly = createToggleHandler(
    adhdFriendly, setAdhdFriendly, LS_KEYS.ADHD_FRIENDLY,
    (newState) => {
      if (newState) {
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
    cognitiveDisability, setCognitiveDisability, LS_KEYS.COGNITIVE_DISABILITY,
    (newState) => {
      if (newState) {
        setFontSize(18);
        setLS(LS_KEYS.FONT_SIZE, 18);
        setDyslexicFont(true);
        setLS(LS_KEYS.DYSLEXIC_FONT, true);
        setHighlightHeadings(true);
        setLS(LS_KEYS.HIGHLIGHT_HEADINGS, true);
        setHighlightLinks(true);
        setLS(LS_KEYS.HIGHLIGHT_LINKS, true);
      } else { // Profil kapatıldığında manuel ayarları sıfırla
        setFontSize(16);
        setLS(LS_KEYS.FONT_SIZE, 16);
        setDyslexicFont(false);
        setLS(LS_KEYS.DYSLEXIC_FONT, false);
        setHighlightHeadings(false);
        setLS(LS_KEYS.HIGHLIGHT_HEADINGS, false);
        setHighlightLinks(false);
        setLS(LS_KEYS.HIGHLIGHT_LINKS, false);
      }
    }
  );

  const toggleBlindUsers = createToggleHandler(blindUsers, setBlindUsers, LS_KEYS.BLIND_USERS);
  const toggleKeyboardNav = createToggleHandler(keyboardNav, setKeyboardNav, LS_KEYS.KEYBOARD_NAV);

  // Diğer toggle'lar
  const toggleDyslexicFont = createToggleHandler(dyslexicFont, setDyslexicFont, LS_KEYS.DYSLEXIC_FONT);
  const toggleHighlightHeadings = createToggleHandler(highlightHeadings, setHighlightHeadings, LS_KEYS.HIGHLIGHT_HEADINGS);
  const toggleHighlightLinks = createToggleHandler(highlightLinks, setHighlightLinks, LS_KEYS.HIGHLIGHT_LINKS);
  const toggleReadingMask = createToggleHandler(readingMask, setReadingMask, LS_KEYS.READING_MASK, 
    (newState) => {
      if (newState) {
        initReadingGuide();
      }
    }
  );

  const toggleHighContrast = createToggleHandler(highContrast, setHighContrast, LS_KEYS.HIGH_CONTRAST);
  const toggleInvertColors = createToggleHandler(invertColors, setInvertColors, LS_KEYS.INVERT_COLORS);
  const toggleGrayscale = createToggleHandler(grayscale, setGrayscale, LS_KEYS.GRAYSCALE);
  const toggleUnderlineLinks = createToggleHandler(underlineLinks, setUnderlineLinks, LS_KEYS.UNDERLINE_LINKS);
  const toggleDarkMode = createToggleHandler(darkMode, setDarkMode, LS_KEYS.DARK_MODE);
  const toggleLightMode = createToggleHandler(lightMode, setLightMode, LS_KEYS.LIGHT_MODE);

  const toggleBigCursor = createToggleHandler(bigCursor, setBigCursor, LS_KEYS.BIG_CURSOR);
  const toggleStopAnimations = createToggleHandler(animationsStopped, setAnimationsStopped, LS_KEYS.STOP_ANIMATIONS,
    (newState) => {
      if (newState) handleStopAnimations();
      else handleStartAnimations();
    }
  );
  const toggleMuteSounds = createToggleHandler(muteSounds, setMuteSounds, LS_KEYS.MUTE_SOUNDS);
  const toggleHideImages = createToggleHandler(hideImages, setHideImages, LS_KEYS.HIDE_IMAGES);

  // Ayarları sıfırla
  const resetAll = useCallback(() => {
    Object.values(LS_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    document.documentElement.classList.remove('accessibility-active');
    
    // Tüm state'leri sıfırla
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
    setPanelPosition("right");
    handleStartAnimations();
    
    if (styleRef.current) {
        styleRef.current.textContent = ''; // Stilleri temizle
    }
    
    if (guideRef.current) {
      guideRef.current.remove();
      guideRef.current = null;
    }
  }, [handleStartAnimations]);

  // Font boyutu ayarla
  const setFontSizeWithSave = useCallback((size) => {
    setFontSize(size);
    setLS(LS_KEYS.FONT_SIZE, size);
    applyStyles();
  }, [applyStyles]);

  // Arama sonuçları
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return ROUTES;
    const query = searchQuery.toLowerCase();
    return ROUTES.filter(route => 
      route.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Ana bileşen - Sadece FAB butonu
  if (!isActive) {
    return (
      <div className={`fixed ${panelPosition === 'right' ? 'right-8' : 'left-8'} bottom-8 z-50 flex flex-col gap-3`}>
        <button
          onClick={() => setIsActive(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          aria-label="Erişilebilirlik ayarlarını aç"
          aria-expanded={isActive} // 👈 GÜNCELLENDİ
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
        className={`fixed top-0 ${panelPosition === 'right' ? 'right-0' : 'left-0'} z-[10000] w-full max-w-96 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col`}
        role="dialog" // 👈 YENİ: Modal/Dialog rolü
        aria-modal="true" // 👈 YENİ: Arka planı devre dışı bırakır
        aria-labelledby="accessibility-panel-title" // Başlıkla ilişkilendirildi
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">♿</span>
            </div>
            <div>
              <h2 className="font-bold text-lg" id="accessibility-panel-title">Erişilebilirlik</h2>
              <p className="text-blue-100 text-sm">Ayarlarınızı kişiselleştirin</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={togglePanelPosition}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label={`Paneli ${panelPosition === 'right' ? 'sola' : 'sağa'} taşı`}
            >
              {panelPosition === 'right' ? '◀' : '▶'}
            </button>

            <button
              onClick={() => setIsActive(false)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
              aria-label="Erişilebilirlik ayarlarını kapat"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50" role="tablist"> {/* 👈 GÜNCELLENDİ */}
          {[
            { id: "profiles", label: "Profiller", icon: "👤" },
            { id: "content", label: "İçerik", icon: "📝" },
            { id: "color", label: "Renk", icon: "🎨" },
            { id: "orientation", label: "Yönlendirme", icon: "🎯" },
            { id: "tools", label: "Araçlar", icon: "🛠️" },
          ].map((tab, index) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              ref={index === 0 ? firstTabRef : null} // İlk sekmeye ref atandı
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              role="tab" // 👈 GÜNCELLENDİ
              aria-selected={activeTab === tab.id} // 👈 GÜNCELLENDİ
              id={`tab-${tab.id}`}
              aria-controls={`panel-${tab.id}`}
              tabIndex={activeTab === tab.id ? 0 : -1} // Sadece aktif sekme odaklanılabilir
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-4">
          
          {/* Profiller */}
          <div 
            id="panel-profiles"
            role="tabpanel"
            aria-labelledby="tab-profiles"
            tabIndex={activeTab === "profiles" ? 0 : -1}
            hidden={activeTab !== "profiles"}
            className={activeTab === "profiles" ? "space-y-6" : "hidden"}
          >
            {activeTab === "profiles" && (
              <>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Sizin için doğru erişilebilirlik profilini seçin</h3>
                </div>

                <ToggleCard
                  icon="⚡"
                  title="Epilepsi Güvenli Profili"
                  description="Yanıp sönen efektleri temizler ve renkleri azaltır"
                  isActive={seizureSafe}
                  onToggle={toggleSeizureSafe}
                />
                
                <ToggleCard
                  icon="👁️"
                  title="Görme Engelli Profili"
                  description="Web sitesinin görsellerini geliştirir"
                  isActive={visionImpaired}
                  onToggle={toggleVisionImpaired}
                />
                
                <ToggleCard
                  icon="🧠"
                  title="DEHB Dostu Profili"
                  description="Daha fazla odaklanma ve daha az dikkat dağıtıcı öğe"
                  isActive={adhdFriendly}
                  onToggle={toggleAdhdFriendly}
                />
                
                <ToggleCard
                  icon="🎯"
                  title="Bilişsel Engelli Profili"
                  description="Okuma ve odaklanmaya yardımcı olur"
                  isActive={cognitiveDisability}
                  onToggle={toggleCognitiveDisability}
                />
                
                <ToggleCard
                  icon="⌨️"
                  title="Klavye Navigasyonu"
                  description="Web sitesini klavye ile kullanın"
                  isActive={keyboardNav}
                  onToggle={toggleKeyboardNav}
                />
                
                <ToggleCard
                  icon="🔈"
                  title="Görme Engelli Kullanıcılar"
                  description="Web sitesini ekran okuyucular için optimize edin"
                  isActive={blindUsers}
                  onToggle={toggleBlindUsers}
                />
              </>
            )}
          </div>

          {/* İçerik */}
          <div 
            id="panel-content"
            role="tabpanel"
            aria-labelledby="tab-content"
            tabIndex={activeTab === "content" ? 0 : -1}
            hidden={activeTab !== "content"}
            className={activeTab === "content" ? "space-y-6" : "hidden"}
          >
            {activeTab === "content" && (
              <>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">İçerik ve Okunabilirlik Ayarları</h3>
                </div>

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Yazı Boyutu</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSizeWithSave(Math.max(12, fontSize - 2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                      aria-label="Yazı boyutunu küçült" // 👈 YENİ
                    >
                      A-
                    </button>
                    <div className="flex-1 text-center py-3 bg-blue-50 text-blue-700 rounded-lg font-bold" aria-live="polite"> {/* 👈 YENİ: Değişimi bildir */}
                      {fontSize}px
                    </div>
                    <button
                      onClick={() => setFontSizeWithSave(Math.min(24, fontSize + 2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                      aria-label="Yazı boyutunu büyüt" // 👈 YENİ
                    >
                      A+
                    </button>
                  </div>
                </div>

                <ToggleCard
                  icon="🔤"
                  title="Disleksi Yazı Tipi"
                  description="Okumayı kolaylaştıran özel yazı tipi"
                  isActive={dyslexicFont}
                  onToggle={toggleDyslexicFont}
                />
                
                <ToggleCard
                  icon="📑"
                  title="Başlıkları Vurgula"
                  description="Tüm başlıkları belirgin şekilde işaretler"
                  isActive={highlightHeadings}
                  onToggle={toggleHighlightHeadings}
                />
                
                <ToggleCard
                  icon="🔗"
                  title="Bağlantıları Vurgula"
                  description="Tüm linkleri belirgin şekilde gösterir"
                  isActive={highlightLinks}
                  onToggle={toggleHighlightLinks}
                />
                
                <ToggleCard
                  icon="👁️"
                  title="Okuma Maskesi"
                  description="Okuduğunuz alanı vurgulayan maske"
                  isActive={readingMask}
                  onToggle={toggleReadingMask}
                />
              </>
            )}
          </div>

          {/* Renk */}
          <div 
            id="panel-color"
            role="tabpanel"
            aria-labelledby="tab-color"
            tabIndex={activeTab === "color" ? 0 : -1}
            hidden={activeTab !== "color"}
            className={activeTab === "color" ? "space-y-6" : "hidden"}
          >
            {activeTab === "color" && (
              <>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Renk ve Görünüm Ayarları</h3>
                </div>

                <ToggleCard
                  icon="🎨"
                  title="Yüksek Kontrast"
                  description="Metin ve arkaplan kontrastını maksimuma çıkarır"
                  isActive={highContrast}
                  onToggle={toggleHighContrast}
                />
                
                <ToggleCard
                  icon="🔄"
                  title="Renkleri Ters Çevir"
                  description="Tüm renkleri tersine çevirir"
                  isActive={invertColors}
                  onToggle={toggleInvertColors}
                />
                
                <ToggleCard
                  icon="⚫"
                  title="Siyah-Beyaz Mod"
                  description="Tüm renkleri gri tonlarına çevirir"
                  isActive={grayscale}
                  onToggle={toggleGrayscale}
                />
                
                <ToggleCard
                  icon="🔗"
                  title="Bağlantıların Altını Çiz"
                  description="Tüm linklerin altını çizer"
                  isActive={underlineLinks}
                  onToggle={toggleUnderlineLinks}
                />
                
                <ToggleCard
                  icon="🌙"
                  title="Koyu Mod"
                  description="Koyu arkaplan ve açık renk metin"
                  isActive={darkMode}
                  onToggle={toggleDarkMode}
                />
                
                <ToggleCard
                  icon="☀️"
                  title="Açık Mod"
                  description="Açık arkaplan ve koyu renk metin"
                  isActive={lightMode}
                  onToggle={toggleLightMode}
                />
              </>
            )}
          </div>

          {/* Yönlendirme */}
          <div 
            id="panel-orientation"
            role="tabpanel"
            aria-labelledby="tab-orientation"
            tabIndex={activeTab === "orientation" ? 0 : -1}
            hidden={activeTab !== "orientation"}
            className={activeTab === "orientation" ? "space-y-6" : "hidden"}
          >
            {activeTab === "orientation" && (
              <>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Yönlendirme ve Navigasyon</h3>
                </div>

                <ToggleCard
                  icon="🖱️"
                  title="Büyük İmleç"
                  description="Daha kolay görünen büyük fare imleci"
                  isActive={bigCursor}
                  onToggle={toggleBigCursor}
                />
                
                <ToggleCard
                  icon="⏸️"
                  title="Animasyonları Durdur"
                  description="Tüm hareketli öğeleri durdurur"
                  isActive={animationsStopped}
                  onToggle={toggleStopAnimations}
                />
                
                <ToggleCard
                  icon="🔇"
                  title="Sesleri Kapat"
                  description="Tüm ses ve video seslerini kapatır"
                  isActive={muteSounds}
                  onToggle={toggleMuteSounds}
                />
                
                <ToggleCard
                  icon="🖼️"
                  title="Resimleri Gizle"
                  description="Tüm görselleri gizler"
                  isActive={hideImages}
                  onToggle={toggleHideImages}
                />
              </>
            )}
          </div>

          {/* Araçlar */}
          <div 
            id="panel-tools"
            role="tabpanel"
            aria-labelledby="tab-tools"
            tabIndex={activeTab === "tools" ? 0 : -1}
            hidden={activeTab !== "tools"}
            className={activeTab === "tools" ? "space-y-6" : "hidden"}
          >
            {activeTab === "tools" && (
              <>
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Yardımcı Araçlar</h3>
                </div>

                <ActionCard
                  icon="🔍"
                  title="Site İçi Arama"
                  description="Sayfalarda hızlı arama yapın"
                  onClick={() => setIsSearchOpen(true)}
                />
                
                <ActionCard
                  icon="📞"
                  title="Hızlı İletişim"
                  description="Telefon ile hemen ulaşın"
                  onClick={() => window.open('tel:+905453048671')}
                />
                
                <ActionCard
                  icon="💬"
                  title="WhatsApp"
                  description="WhatsApp'tan mesaj gönderin"
                  onClick={() => window.open('https://wa.me/905453048671')}
                />
                
                <ActionCard
                  icon="⬆️"
                  title="Yukarı Çık"
                  description="Sayfanın en üstüne dönün"
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                />
                
                <div className="pt-4 border-t border-gray-200">
                  <button
                    onClick={resetAll}
                    className="w-full py-4 bg-red-50 text-red-600 rounded-lg font-semibold hover:bg-red-100 transition-colors border border-red-200"
                  >
                    ↻ Tüm Ayarları Sıfırla
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setIsActive(false)}
              className="flex-1 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
            >
              Kapat
            </button>
            <button
              onClick={togglePanelPosition}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
              aria-label={`Paneli ${panelPosition === 'right' ? 'sola' : 'sağa'} taşı`}
            >
              {panelPosition === 'right' ? '◀' : '▶'}
            </button>
          </div>
        </div>
      </div>

      {/* Arama Modalı (Geliştirme alanı) */}
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
