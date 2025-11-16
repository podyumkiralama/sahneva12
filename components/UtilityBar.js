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
  FONT_SPACING: "acc_font_spacing",
  PANEL_POSITION: "acc_panel_position",
  PANEL_OPEN: "acc_panel_open",
  PANEL_SCROLL_POSITION: "acc_panel_scroll_position", // Scroll pozisyonu eklendi
  
  // Profil durumları
  SEIZURE_SAFE: "acc_seizure_safe",
  VISION_IMPAIRED: "acc_vision_impaired",
  ADHD_FRIENDLY: "acc_adhd_friendly",
  COGNITIVE_DISABILITY: "acc_cognitive_disability",
  BLIND_USERS: "acc_blind_users",
  KEYBOARD_NAV: "acc_keyboard_nav",
  MOTOR_DISABILITY: "acc_motor_disability",
  HEARING_IMPAIRED: "acc_hearing_impaired",
  
  // İçerik ayarları
  DYSLEXIC_FONT: "acc_dyslexic_font",
  HIGHLIGHT_HEADINGS: "acc_highlight_headings",
  HIGHLIGHT_LINKS: "acc_highlight_links",
  READING_MASK: "acc_reading_mask",
  READING_GUIDE: "acc_reading_guide",
  TEXT_MAGNIFIER: "acc_text_magnifier",
  ALIGN_CENTER: "acc_align_center",
  ALIGN_LEFT: "acc_align_left",
  
  // Renk ayarları
  HIGH_CONTRAST: "acc_high_contrast",
  INVERT_COLORS: "acc_invert_colors",
  GRAYSCALE: "acc_grayscale",
  UNDERLINE_LINKS: "acc_underline_links",
  DARK_MODE: "acc_dark_mode",
  LIGHT_MODE: "acc_light_mode",
  COLOR_BLIND_PROTANOPIA: "acc_color_blind_protanopia",
  COLOR_BLIND_DEUTERANOPIA: "acc_color_blind_deuteranopia",
  COLOR_BLIND_TRITANOPIA: "acc_color_blind_tritanopia",
  
  // Yönlendirme ayarları
  BIG_CURSOR: "acc_big_cursor",
  STOP_ANIMATIONS: "acc_stop_animations",
  MUTE_SOUNDS: "acc_mute_sounds",
  HIDE_IMAGES: "acc_hide_images",
  VIRTUAL_KEYBOARD: "acc_virtual_keyboard",
  SCREEN_READER: "acc_screen_reader",
  VOICE_COMMANDS: "acc_voice_commands",
};

export default function UtilityBar() {
  // Ana durumlar
  const [isActive, setIsActive] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [fontSize, setFontSize] = useState(16);
  const [fontSpacing, setFontSpacing] = useState(1);
  const [activeTab, setActiveTab] = useState("profiles");
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [panelPosition, setPanelPosition] = useState("right");
  const [showScrollTop, setShowScrollTop] = useState(false); // Yukarı çık butonu için
  const [showScrollBottom, setShowScrollBottom] = useState(false); // Aşağı in butonu için

  // Tüm ayar durumları
  const [seizureSafe, setSeizureSafe] = useState(false);
  const [visionImpaired, setVisionImpaired] = useState(false);
  const [adhdFriendly, setAdhdFriendly] = useState(false);
  const [cognitiveDisability, setCognitiveDisability] = useState(false);
  const [blindUsers, setBlindUsers] = useState(false);
  const [keyboardNav, setKeyboardNav] = useState(false);
  const [motorDisability, setMotorDisability] = useState(false);
  const [hearingImpaired, setHearingImpaired] = useState(false);
  
  const [dyslexicFont, setDyslexicFont] = useState(false);
  const [highlightHeadings, setHighlightHeadings] = useState(false);
  const [highlightLinks, setHighlightLinks] = useState(false);
  const [readingMask, setReadingMask] = useState(false);
  const [readingGuide, setReadingGuide] = useState(false);
  const [textMagnifier, setTextMagnifier] = useState(false);
  const [alignCenter, setAlignCenter] = useState(false);
  const [alignLeft, setAlignLeft] = useState(false);
  
  const [highContrast, setHighContrast] = useState(false);
  const [invertColors, setInvertColors] = useState(false);
  const [grayscale, setGrayscale] = useState(false);
  const [underlineLinks, setUnderlineLinks] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [lightMode, setLightMode] = useState(false);
  const [colorBlindProtanopia, setColorBlindProtanopia] = useState(false);
  const [colorBlindDeuteranopia, setColorBlindDeuteranopia] = useState(false);
  const [colorBlindTritanopia, setColorBlindTritanopia] = useState(false);
  
  const [bigCursor, setBigCursor] = useState(false);
  const [animationsStopped, setAnimationsStopped] = useState(false);
  const [muteSounds, setMuteSounds] = useState(false);
  const [hideImages, setHideImages] = useState(false);
  const [virtualKeyboard, setVirtualKeyboard] = useState(false);
  const [screenReader, setScreenReader] = useState(false);
  const [voiceCommands, setVoiceCommands] = useState(false);

  // Refs
  const styleRef = useRef(null);
  const guideRef = useRef(null);
  const maskRef = useRef(null);
  const animationStyleRef = useRef(null);
  const panelRef = useRef(null);
  const magnifierRef = useRef(null);
  const tabContentRef = useRef(null); // Tab content için ref eklendi

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
      return defaultValue;
    }
  };

  // Scroll pozisyonunu kontrol et
  const handleScroll = useCallback(() => {
    if (tabContentRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = tabContentRef.current;
      const scrollBottom = scrollHeight - scrollTop - clientHeight;
      
      setShowScrollTop(scrollTop > 100);
      setShowScrollBottom(scrollBottom > 100);
    }
  }, []);

  // Yukarı kaydır
  const scrollToTop = useCallback(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  // Aşağı kaydır
  const scrollToBottom = useCallback(() => {
    if (tabContentRef.current) {
      tabContentRef.current.scrollTo({ 
        top: tabContentRef.current.scrollHeight, 
        behavior: 'smooth' 
      });
    }
  }, []);

  // SVG Filtrelerini ekle
  const addSVGFilters = useCallback(() => {
    if (document.getElementById('color-blindness-filters')) return;

    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.id = 'color-blindness-filters';
    svg.setAttribute('style', 'position: absolute; width: 0; height: 0;');
    
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    
    // Protanopia (Kırmızı Körlüğü) filtresi
    const protanopia = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    protanopia.id = 'protanopia';
    protanopia.setAttribute('x', '0');
    protanopia.setAttribute('y', '0');
    protanopia.setAttribute('width', '100%');
    protanopia.setAttribute('height', '100%');
    
    const protanopiaMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    protanopiaMatrix.setAttribute('type', 'matrix');
    protanopiaMatrix.setAttribute('values', 
      '0.567 0.433 0 0 0 ' +
      '0.558 0.442 0 0 0 ' +
      '0 0.242 0.758 0 0 ' +
      '0 0 0 1 0'
    );
    protanopia.appendChild(protanopiaMatrix);
    
    // Deuteranopia (Yeşil Körlüğü) filtresi
    const deuteranopia = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    deuteranopia.id = 'deuteranopia';
    deuteranopia.setAttribute('x', '0');
    deuteranopia.setAttribute('y', '0');
    deuteranopia.setAttribute('width', '100%');
    deuteranopia.setAttribute('height', '100%');
    
    const deuteranopiaMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    deuteranopiaMatrix.setAttribute('type', 'matrix');
    deuteranopiaMatrix.setAttribute('values',
      '0.625 0.375 0 0 0 ' +
      '0.7 0.3 0 0 0 ' +
      '0 0.3 0.7 0 0 ' +
      '0 0 0 1 0'
    );
    deuteranopia.appendChild(deuteranopiaMatrix);
    
    // Tritanopia (Mavi Körlüğü) filtresi
    const tritanopia = document.createElementNS('http://www.w3.org/2000/svg', 'filter');
    tritanopia.id = 'tritanopia';
    tritanopia.setAttribute('x', '0');
    tritanopia.setAttribute('y', '0');
    tritanopia.setAttribute('width', '100%');
    tritanopia.setAttribute('height', '100%');
    
    const tritanopiaMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix');
    tritanopiaMatrix.setAttribute('type', 'matrix');
    tritanopiaMatrix.setAttribute('values',
      '0.95 0.05 0 0 0 ' +
      '0 0.433 0.567 0 0 ' +
      '0 0.475 0.525 0 0 ' +
      '0 0 0 1 0'
    );
    tritanopia.appendChild(tritanopiaMatrix);
    
    defs.appendChild(protanopia);
    defs.appendChild(deuteranopia);
    defs.appendChild(tritanopia);
    svg.appendChild(defs);
    document.body.appendChild(svg);
  }, []);

  // CSS stilini uygula - SAYDAMLIK KALDIRILDI
  const applyStyles = useCallback(() => {
    if (!styleRef.current) {
      styleRef.current = document.createElement('style');
      document.head.appendChild(styleRef.current);
    }

    const styles = `
      .accessibility-active {
        --acc-font-size: ${fontSize}px;
        --acc-font-spacing: ${fontSpacing};
        --acc-line-height: ${1 + (fontSpacing - 1) * 0.3};
      }

      .accessibility-active body {
        font-size: var(--acc-font-size) !important;
        letter-spacing: calc(var(--acc-font-spacing) * 0.1em) !important;
        line-height: var(--acc-line-height) !important;
      }

      ${highContrast ? `
        .accessibility-active {
          background: #000000 !important;
          color: #ffffff !important;
        }
        .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
          background: #000000 !important;
          color: #ffffff !important;
          border-color: #ffff00 !important;
        }
        .accessibility-active a:not(.utility-bar a), .accessibility-active button:not(.utility-bar button) {
          color: #ffff00 !important;
          text-decoration: underline !important;
        }
        .accessibility-active img:not(.utility-bar img), .accessibility-active video:not(.utility-bar video) {
          filter: contrast(2) brightness(0.8) !important;
        }
      ` : ''}

      ${invertColors ? `
        .accessibility-active:not(.utility-bar) {
          filter: invert(1) hue-rotate(180deg) !important;
        }
        .accessibility-active img:not(.utility-bar img), .accessibility-active video:not(.utility-bar video) {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      ` : ''}

      ${grayscale ? `
        .accessibility-active:not(.utility-bar) {
          filter: grayscale(1) !important;
        }
        .accessibility-active img:not(.utility-bar img), .accessibility-active video:not(.utility-bar video) {
          filter: grayscale(1) !important;
        }
      ` : ''}

      ${colorBlindProtanopia ? `
        .accessibility-active:not(.utility-bar) {
          filter: url('#protanopia') !important;
        }
      ` : ''}

      ${colorBlindDeuteranopia ? `
        .accessibility-active:not(.utility-bar) {
          filter: url('#deuteranopia') !important;
        }
      ` : ''}

      ${colorBlindTritanopia ? `
        .accessibility-active:not(.utility-bar) {
          filter: url('#tritanopia') !important;
        }
      ` : ''}

      ${underlineLinks ? `
        .accessibility-active a:not(.utility-bar a) {
          text-decoration: underline !important;
          text-underline-offset: 0.2em !important;
        }
      ` : ''}

      ${dyslexicFont ? `
        .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
          font-family: "Comic Sans MS", "OpenDyslexic", Arial, sans-serif !important;
          font-weight: normal !important;
          letter-spacing: 0.12em !important;
        }
      ` : ''}

      ${highlightHeadings ? `
        .accessibility-active h1:not(.utility-bar h1),
        .accessibility-active h2:not(.utility-bar h2),
        .accessibility-active h3:not(.utility-bar h3),
        .accessibility-active h4:not(.utility-bar h4),
        .accessibility-active h5:not(.utility-bar h5),
        .accessibility-active h6:not(.utility-bar h6) {
          background: linear-gradient(90deg, #ffeb3b, #ffc107) !important;
          color: #000000 !important;
          padding: 12px 16px !important;
          border-left: 4px solid #ff9800 !important;
          margin: 8px 0 !important;
          border-radius: 4px !important;
        }
      ` : ''}

      ${highlightLinks ? `
        .accessibility-active a:not(.utility-bar a) {
          background: #ffff00 !important;
          color: #000000 !important;
          padding: 4px 8px !important;
          border-radius: 3px !important;
          font-weight: bold !important;
        }
        .accessibility-active a:not(.utility-bar a):hover {
          background: #ffeb3b !important;
          transform: translateY(-1px) !important;
        }
      ` : ''}

      ${bigCursor ? `
        .accessibility-active:not(.utility-bar), .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23000' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 16 16, auto !important;
        }
      ` : ''}

      ${darkMode ? `
        .accessibility-active:not(.utility-bar) {
          background: #1a1a1a !important;
          color: #ffffff !important;
        }
        .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
          background-color: inherit !important;
          color: inherit !important;
        }
        .accessibility-active a:not(.utility-bar a) {
          color: #4fc3f7 !important;
        }
      ` : ''}

      ${lightMode ? `
        .accessibility-active:not(.utility-bar) {
          background: #ffffff !important;
          color: #000000 !important;
        }
        .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
          background-color: inherit !important;
          color: inherit !important;
        }
        .accessibility-active a:not(.utility-bar a) {
          color: #1565c0 !important;
        }
      ` : ''}

      ${alignCenter ? `
        .accessibility-active p:not(.utility-bar p), 
        .accessibility-active div:not(.utility-bar):not(.utility-bar div), 
        .accessibility-active article:not(.utility-bar article) {
          text-align: center !important;
        }
      ` : ''}

      ${alignLeft ? `
        .accessibility-active p:not(.utility-bar p), 
        .accessibility-active div:not(.utility-bar):not(.utility-bar div), 
        .accessibility-active article:not(.utility-bar article) {
          text-align: left !important;
        }
      ` : ''}

      ${hideImages ? `
        .accessibility-active img:not(.utility-bar img) {
          display: none !important;
        }
        .accessibility-active img:not(.utility-bar img)::before {
          content: "🖼️ [Resim gizlendi]" !important;
          display: block !important;
          background: #f0f0f0 !important;
          padding: 10px !important;
          border: 1px dashed #ccc !important;
        }
      ` : ''}

      .accessibility-reading-guide {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 2px;
        background: linear-gradient(90deg, #ff0000, #ff4444);
        z-index: 10000;
        pointer-events: none;
        display: none;
        box-shadow: 0 0 10px rgba(255,0,0,0.5);
      }

      .accessibility-reading-mask {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: linear-gradient(
          to bottom,
          transparent 0%,
          transparent 45%,
          rgba(0,0,0,0.4) 48%,
          rgba(0,0,0,0.4) 52%,
          transparent 55%,
          transparent 100%
        );
        z-index: 9999;
        pointer-events: none;
        display: none;
      }

      .accessibility-text-magnifier {
        position: fixed;
        background: yellow;
        padding: 4px 8px;
        border-radius: 4px;
        font-weight: bold;
        z-index: 10001;
        pointer-events: none;
        display: none;
        transform: scale(1.2);
        box-shadow: 0 2px 10px rgba(0,0,0,0.3);
      }

      .accessibility-active .accessibility-reading-guide {
        display: block;
      }

      .accessibility-active .accessibility-reading-mask {
        display: block;
      }

      .accessibility-active .accessibility-text-magnifier {
        display: block;
      }

      /* Utility bar'ın kendi stillerini koru - SAYDAMLIK KALDIRILDI */
      .utility-bar, .utility-bar * {
        background: inherit !important;
        color: inherit !important;
        filter: none !important;
        font-family: inherit !important;
        cursor: inherit !important;
        opacity: 1 !important;
      }

      /* Scroll butonları */
      .scroll-to-top-btn, .scroll-to-bottom-btn {
        position: absolute;
        right: 20px;
        width: 40px;
        height: 40px;
        background: rgba(59, 130, 246, 0.9) !important;
        color: white !important;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 18px;
        z-index: 100;
        transition: all 0.3s ease;
        border: 2px solid white;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      }

      .scroll-to-top-btn:hover, .scroll-to-bottom-btn:hover {
        background: rgba(37, 99, 235, 0.9) !important;
        transform: scale(1.1);
      }

      .scroll-to-top-btn {
        top: 80px;
      }

      .scroll-to-bottom-btn {
        bottom: 80px;
      }
    `;

    styleRef.current.textContent = styles;
  }, [fontSize, fontSpacing, highContrast, invertColors, grayscale, colorBlindProtanopia, colorBlindDeuteranopia, colorBlindTritanopia, underlineLinks, dyslexicFont, highlightHeadings, highlightLinks, bigCursor, darkMode, lightMode, alignCenter, alignLeft, hideImages]);

  // Animasyonları durdur
  const handleStopAnimations = useCallback(() => {
    if (!animationStyleRef.current) {
      animationStyleRef.current = document.createElement('style');
      animationStyleRef.current.textContent = `
        .accessibility-active *:not(.utility-bar):not(.utility-bar *) {
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

  // Başlangıç yükleme
  useEffect(() => {
    // SVG filtrelerini ekle
    addSVGFilters();

    // Ayarları localStorage'dan yükle
    const active = getLS(LS_KEYS.ACTIVE, false);
    const panelOpen = getLS(LS_KEYS.PANEL_OPEN, false);
    const savedFontSize = getLS(LS_KEYS.FONT_SIZE, 16);
    const savedFontSpacing = getLS(LS_KEYS.FONT_SPACING, 1);
    const savedPosition = getLS(LS_KEYS.PANEL_POSITION, "right");

    // Tüm state'leri yükle
    const loadState = (key, setter, defaultValue = false) => {
      setter(getLS(key, defaultValue));
    };

    loadState(LS_KEYS.SEIZURE_SAFE, setSeizureSafe);
    loadState(LS_KEYS.VISION_IMPAIRED, setVisionImpaired);
    loadState(LS_KEYS.ADHD_FRIENDLY, setAdhdFriendly);
    loadState(LS_KEYS.COGNITIVE_DISABILITY, setCognitiveDisability);
    loadState(LS_KEYS.BLIND_USERS, setBlindUsers);
    loadState(LS_KEYS.KEYBOARD_NAV, setKeyboardNav);
    loadState(LS_KEYS.MOTOR_DISABILITY, setMotorDisability);
    loadState(LS_KEYS.HEARING_IMPAIRED, setHearingImpaired);
    
    loadState(LS_KEYS.DYSLEXIC_FONT, setDyslexicFont);
    loadState(LS_KEYS.HIGHLIGHT_HEADINGS, setHighlightHeadings);
    loadState(LS_KEYS.HIGHLIGHT_LINKS, setHighlightLinks);
    loadState(LS_KEYS.READING_MASK, setReadingMask);
    loadState(LS_KEYS.READING_GUIDE, setReadingGuide);
    loadState(LS_KEYS.TEXT_MAGNIFIER, setTextMagnifier);
    loadState(LS_KEYS.ALIGN_CENTER, setAlignCenter);
    loadState(LS_KEYS.ALIGN_LEFT, setAlignLeft);
    
    loadState(LS_KEYS.HIGH_CONTRAST, setHighContrast);
    loadState(LS_KEYS.INVERT_COLORS, setInvertColors);
    loadState(LS_KEYS.GRAYSCALE, setGrayscale);
    loadState(LS_KEYS.UNDERLINE_LINKS, setUnderlineLinks);
    loadState(LS_KEYS.DARK_MODE, setDarkMode);
    loadState(LS_KEYS.LIGHT_MODE, setLightMode);
    loadState(LS_KEYS.COLOR_BLIND_PROTANOPIA, setColorBlindProtanopia);
    loadState(LS_KEYS.COLOR_BLIND_DEUTERANOPIA, setColorBlindDeuteranopia);
    loadState(LS_KEYS.COLOR_BLIND_TRITANOPIA, setColorBlindTritanopia);
    
    loadState(LS_KEYS.BIG_CURSOR, setBigCursor);
    loadState(LS_KEYS.STOP_ANIMATIONS, setAnimationsStopped);
    loadState(LS_KEYS.MUTE_SOUNDS, setMuteSounds);
    loadState(LS_KEYS.HIDE_IMAGES, setHideImages);
    loadState(LS_KEYS.VIRTUAL_KEYBOARD, setVirtualKeyboard);
    loadState(LS_KEYS.SCREEN_READER, setScreenReader);
    loadState(LS_KEYS.VOICE_COMMANDS, setVoiceCommands);

    setIsActive(active);
    setIsPanelOpen(panelOpen);
    setFontSize(savedFontSize);
    setFontSpacing(savedFontSpacing);
    setPanelPosition(savedPosition);

    if (active) {
      document.documentElement.classList.add('accessibility-active');
      applyStyles();
      
      if (getLS(LS_KEYS.STOP_ANIMATIONS, false)) handleStopAnimations();
    }
  }, [applyStyles, handleStopAnimations, addSVGFilters]);

  // Aktif durum değiştiğinde
  useEffect(() => {
    if (isActive) {
      document.documentElement.classList.add('accessibility-active');
      setLS(LS_KEYS.ACTIVE, true);
      applyStyles();
    } else {
      document.documentElement.classList.remove('accessibility-active');
      setLS(LS_KEYS.ACTIVE, false);
      handleStartAnimations();
    }
  }, [isActive, applyStyles, handleStartAnimations]);

  // Panel açık/kapalı durumunu kaydet
  useEffect(() => {
    setLS(LS_KEYS.PANEL_OPEN, isPanelOpen);
  }, [isPanelOpen]);

  // Scroll event listener'ını ekle
  useEffect(() => {
    const tabContent = tabContentRef.current;
    if (tabContent) {
      tabContent.addEventListener('scroll', handleScroll);
      // İlk yüklemede scroll durumunu kontrol et
      setTimeout(handleScroll, 100);
    }

    return () => {
      if (tabContent) {
        tabContent.removeEventListener('scroll', handleScroll);
      }
    };
  }, [handleScroll, isPanelOpen, activeTab]);

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
      setIsPanelOpen(true);
      setTimeout(() => applyStyles(), 100);
    };
  }, [applyStyles]);

  // Toggle fonksiyonları (kısaltılmış)
  const toggleSeizureSafe = createToggleHandler(seizureSafe, setSeizureSafe, LS_KEYS.SEIZURE_SAFE);
  const toggleVisionImpaired = createToggleHandler(visionImpaired, setVisionImpaired, LS_KEYS.VISION_IMPAIRED);
  const toggleAdhdFriendly = createToggleHandler(adhdFriendly, setAdhdFriendly, LS_KEYS.ADHD_FRIENDLY);
  const toggleCognitiveDisability = createToggleHandler(cognitiveDisability, setCognitiveDisability, LS_KEYS.COGNITIVE_DISABILITY);
  const toggleBlindUsers = createToggleHandler(blindUsers, setBlindUsers, LS_KEYS.BLIND_USERS);
  const toggleKeyboardNav = createToggleHandler(keyboardNav, setKeyboardNav, LS_KEYS.KEYBOARD_NAV);
  const toggleMotorDisability = createToggleHandler(motorDisability, setMotorDisability, LS_KEYS.MOTOR_DISABILITY);
  const toggleHearingImpaired = createToggleHandler(hearingImpaired, setHearingImpaired, LS_KEYS.HEARING_IMPAIRED);
  const toggleDyslexicFont = createToggleHandler(dyslexicFont, setDyslexicFont, LS_KEYS.DYSLEXIC_FONT);
  const toggleHighlightHeadings = createToggleHandler(highlightHeadings, setHighlightHeadings, LS_KEYS.HIGHLIGHT_HEADINGS);
  const toggleHighlightLinks = createToggleHandler(highlightLinks, setHighlightLinks, LS_KEYS.HIGHLIGHT_LINKS);
  const toggleReadingMask = createToggleHandler(readingMask, setReadingMask, LS_KEYS.READING_MASK);
  const toggleReadingGuide = createToggleHandler(readingGuide, setReadingGuide, LS_KEYS.READING_GUIDE);
  const toggleTextMagnifier = createToggleHandler(textMagnifier, setTextMagnifier, LS_KEYS.TEXT_MAGNIFIER);
  const toggleHighContrast = createToggleHandler(highContrast, setHighContrast, LS_KEYS.HIGH_CONTRAST);
  const toggleInvertColors = createToggleHandler(invertColors, setInvertColors, LS_KEYS.INVERT_COLORS);
  const toggleGrayscale = createToggleHandler(grayscale, setGrayscale, LS_KEYS.GRAYSCALE);
  const toggleUnderlineLinks = createToggleHandler(underlineLinks, setUnderlineLinks, LS_KEYS.UNDERLINE_LINKS);
  const toggleDarkMode = createToggleHandler(darkMode, setDarkMode, LS_KEYS.DARK_MODE);
  const toggleLightMode = createToggleHandler(lightMode, setLightMode, LS_KEYS.LIGHT_MODE);
  const toggleBigCursor = createToggleHandler(bigCursor, setBigCursor, LS_KEYS.BIG_CURSOR);
  const toggleStopAnimations = createToggleHandler(animationsStopped, setAnimationsStopped, LS_KEYS.STOP_ANIMATIONS);
  const toggleMuteSounds = createToggleHandler(muteSounds, setMuteSounds, LS_KEYS.MUTE_SOUNDS);
  const toggleHideImages = createToggleHandler(hideImages, setHideImages, LS_KEYS.HIDE_IMAGES);
  const toggleVirtualKeyboard = createToggleHandler(virtualKeyboard, setVirtualKeyboard, LS_KEYS.VIRTUAL_KEYBOARD);
  const toggleScreenReader = createToggleHandler(screenReader, setScreenReader, LS_KEYS.SCREEN_READER);
  const toggleVoiceCommands = createToggleHandler(voiceCommands, setVoiceCommands, LS_KEYS.VOICE_COMMANDS);
  const toggleAlignCenter = createToggleHandler(alignCenter, setAlignCenter, LS_KEYS.ALIGN_CENTER);
  const toggleAlignLeft = createToggleHandler(alignLeft, setAlignLeft, LS_KEYS.ALIGN_LEFT);

  // Renk körlüğü toggle'ları
  const createColorBlindToggle = (type, setter, currentState) => 
    createToggleHandler(currentState, setter, LS_KEYS[`COLOR_BLIND_${type.toUpperCase()}`],
      (newState) => {
        if (newState) {
          setColorBlindProtanopia(false);
          setColorBlindDeuteranopia(false);
          setColorBlindTritanopia(false);
          setLS(LS_KEYS.COLOR_BLIND_PROTANOPIA, false);
          setLS(LS_KEYS.COLOR_BLIND_DEUTERANOPIA, false);
          setLS(LS_KEYS.COLOR_BLIND_TRITANOPIA, false);
        }
      }
    );

  const toggleColorBlindProtanopia = createColorBlindToggle('protanopia', setColorBlindProtanopia, colorBlindProtanopia);
  const toggleColorBlindDeuteranopia = createColorBlindToggle('deuteranopia', setColorBlindDeuteranopia, colorBlindDeuteranopia);
  const toggleColorBlindTritanopia = createColorBlindToggle('tritanopia', setColorBlindTritanopia, colorBlindTritanopia);

  // Font boyutu ve aralığı ayarla
  const setFontSizeWithSave = useCallback((size) => {
    setFontSize(size);
    setLS(LS_KEYS.FONT_SIZE, size);
    setIsActive(true);
    setIsPanelOpen(true);
    setTimeout(() => applyStyles(), 100);
  }, [applyStyles]);

  const setFontSpacingWithSave = useCallback((spacing) => {
    setFontSpacing(spacing);
    setLS(LS_KEYS.FONT_SPACING, spacing);
    setIsActive(true);
    setIsPanelOpen(true);
    setTimeout(() => applyStyles(), 100);
  }, [applyStyles]);

  // Ayarları sıfırla
  const resetAll = useCallback(() => {
    if (!window.confirm('Tüm erişilebilirlik ayarları sıfırlanacak. Emin misiniz?')) {
      return;
    }

    Object.values(LS_KEYS).forEach(key => {
      localStorage.removeItem(key);
    });
    
    document.documentElement.classList.remove('accessibility-active');
    
    // Tüm state'leri sıfırla
    const resetStates = [
      [setSeizureSafe, false], [setVisionImpaired, false], [setAdhdFriendly, false],
      [setCognitiveDisability, false], [setBlindUsers, false], [setKeyboardNav, false],
      [setMotorDisability, false], [setHearingImpaired, false], [setDyslexicFont, false],
      [setHighlightHeadings, false], [setHighlightLinks, false], [setReadingMask, false],
      [setReadingGuide, false], [setTextMagnifier, false], [setAlignCenter, false],
      [setAlignLeft, false], [setHighContrast, false], [setInvertColors, false],
      [setGrayscale, false], [setUnderlineLinks, false], [setDarkMode, false],
      [setLightMode, false], [setColorBlindProtanopia, false], [setColorBlindDeuteranopia, false],
      [setColorBlindTritanopia, false], [setBigCursor, false], [setAnimationsStopped, false],
      [setMuteSounds, false], [setHideImages, false], [setVirtualKeyboard, false],
      [setScreenReader, false], [setVoiceCommands, false]
    ];
    
    resetStates.forEach(([setter, value]) => setter(value));
    
    setFontSize(16);
    setFontSpacing(1);
    setIsActive(false);
    setIsPanelOpen(false);
    handleStartAnimations();

    alert('Tüm ayarlar sıfırlandı!');
  }, [handleStartAnimations]);

  // Arama sonuçları
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return ROUTES;
    const query = searchQuery.toLowerCase();
    return ROUTES.filter(route => 
      route.label.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Ana bileşen - SAYDAMLIK KALDIRILDI, SCROLL BUTONLARI EKLENDİ
  if (!isPanelOpen) {
    return (
      <div className={`utility-bar fixed ${panelPosition === 'right' ? 'right-8' : 'left-8'} bottom-8 z-50 flex flex-col gap-3`}>
        <button
          onClick={() => setIsPanelOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110 border-2 border-white/20"
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

        {/* Ayarları Sıfırla Butonu */}
        {isActive && (
          <button
            onClick={resetAll}
            className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full shadow-lg flex items-center justify-center text-sm transition-all duration-300 hover:scale-110"
            aria-label="Tüm ayarları sıfırla"
            title="Tüm ayarları sıfırla"
          >
            ↻
          </button>
        )}
      </div>
    );
  }

  return (
    <>
      <div 
        ref={panelRef}
        className={`utility-bar fixed top-0 ${panelPosition === 'right' ? 'right-0' : 'left-0'} z-[10000] w-full max-w-96 h-screen bg-white shadow-2xl border-l border-gray-200 flex flex-col`}
      >
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">♿</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Erişilebilirlik</h2>
              <p className="text-blue-100 text-sm">EqualWeb benzeri araç çubuğu</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={resetAll}
              className="w-8 h-8 rounded-lg bg-red-500/80 hover:bg-red-600 flex items-center justify-center transition-colors"
              title="Tüm ayarları sıfırla"
            >
              ↻
            </button>

            <button
              onClick={togglePanelPosition}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
            >
              {panelPosition === 'right' ? '◀' : '▶'}
            </button>

            <button
              onClick={() => setIsPanelOpen(false)}
              className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
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
            { id: "navigation", label: "Navigasyon", icon: "🎯" },
            { id: "tools", label: "Araçlar", icon: "🛠️" },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content - SCROLL BUTONLARI EKLENDİ */}
        <div className="relative flex-1 overflow-hidden">
          <div 
            ref={tabContentRef}
            className="h-full overflow-y-auto p-4"
            onScroll={handleScroll}
          >
            {/* Profiller */}
            {activeTab === "profiles" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Erişilebilirlik Profilleri</h3>
                  <p className="text-sm text-gray-600 mt-1">EqualWeb benzeri hazır profiller</p>
                </div>

                <ToggleCard
                  icon="⚡"
                  title="Epilepsi Güvenli Profili"
                  description="Animasyonları durdurur, sesleri kapatır ve görselleri gizler"
                  isActive={seizureSafe}
                  onToggle={toggleSeizureSafe}
                />
                
                <ToggleCard
                  icon="👁️"
                  title="Görme Engelli Profili"
                  description="Büyük yazı, yüksek kontrast ve metin büyüteci"
                  isActive={visionImpaired}
                  onToggle={toggleVisionImpaired}
                />
                
                <ToggleCard
                  icon="🧠"
                  title="DEHB Dostu Profili"
                  description="Dikkat dağıtıcı öğeleri azaltır ve odaklanmayı artırır"
                  isActive={adhdFriendly}
                  onToggle={toggleAdhdFriendly}
                />
                
                <ToggleCard
                  icon="🎯"
                  title="Bilişsel Engelli Profili"
                  description="Okunabilirliği artırır ve içeriği basitleştirir"
                  isActive={cognitiveDisability}
                  onToggle={toggleCognitiveDisability}
                />
                
                <ToggleCard
                  icon="♿"
                  title="Motor Engelli Profili"
                  description="Büyük imleç, klavye navigasyonu ve sanal klavye"
                  isActive={motorDisability}
                  onToggle={toggleMotorDisability}
                />
                
                <ToggleCard
                  icon="👂"
                  title="İşitme Engelli Profili"
                  description="Ses alternatifleri ve görsel uyarılar"
                  isActive={hearingImpaired}
                  onToggle={toggleHearingImpaired}
                />
              </div>
            )}

            {/* İçerik */}
            {activeTab === "content" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">İçerik ve Okunabilirlik</h3>
                  <p className="text-sm text-gray-600 mt-1">EqualWeb okuma araçları</p>
                </div>

                {/* Yazı Boyutu */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Yazı Boyutu</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSizeWithSave(Math.max(12, fontSize - 2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                    >
                      A-
                    </button>
                    <div className="flex-1 text-center py-3 bg-blue-50 text-blue-700 rounded-lg font-bold">
                      {fontSize}px
                    </div>
                    <button
                      onClick={() => setFontSizeWithSave(Math.min(24, fontSize + 2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-lg transition-colors"
                    >
                      A+
                    </button>
                  </div>
                </div>

                {/* Yazı Aralığı */}
                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Yazı Aralığı</h4>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setFontSpacingWithSave(Math.max(0.8, fontSpacing - 0.2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors"
                    >
                      Sık
                    </button>
                    <div className="flex-1 text-center py-3 bg-blue-50 text-blue-700 rounded-lg font-bold text-sm">
                      {fontSpacing.toFixed(1)}x
                    </div>
                    <button
                      onClick={() => setFontSpacingWithSave(Math.min(2, fontSpacing + 0.2))}
                      className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 rounded-lg font-bold text-sm transition-colors"
                    >
                      Geniş
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
                  description="Okuma alanını vurgulayan maske"
                  isActive={readingMask}
                  onToggle={toggleReadingMask}
                />
                
                <ToggleCard
                  icon="📏"
                  title="Okuma Kılavuzu"
                  description="Takip etmeyi kolaylaştıran kılavuz çizgisi"
                  isActive={readingGuide}
                  onToggle={toggleReadingGuide}
                />
                
                <ToggleCard
                  icon="🔍"
                  title="Metin Büyüteci"
                  description="Üzerine gelinen metni büyütür"
                  isActive={textMagnifier}
                  onToggle={toggleTextMagnifier}
                />

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Metin Hizalama</h4>
                  <div className="flex gap-2">
                    <button
                      onClick={toggleAlignLeft}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        alignLeft ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ↶ Sol
                    </button>
                    <button
                      onClick={toggleAlignCenter}
                      className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                        alignCenter ? 'bg-blue-600 text-white' : 'bg-gray-100 hover:bg-gray-200'
                      }`}
                    >
                      ☰ Orta
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Renk */}
            {activeTab === "color" && (
              <div className="space-y-4">
                <div className="text-center mb-2">
                  <h3 className="text-lg font-semibold text-gray-900">Renk ve Görünüm</h3>
                  <p className="text-sm text-gray-600 mt-1">EqualWeb renk ayarları</p>
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

                <div className="bg-gray-50 p-4 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">Renk Körlüğü Modları</h4>
                  <div className="space-y-2">
                    <ToggleCard
                      icon="🔴"
                      title="Protanopia (Kırmızı Körlüğü)"
                      description="Kırmızı renk algısını düzeltir"
                      isActive={colorBlindProtanopia}
                      onToggle={toggleColorBlindProtanopia}
                      small
                    />
                    <ToggleCard
                      icon="🟢"
                      title="Deuteranopia (Yeşil Körlüğü)"
                      description="Yeşil renk algısını düzeltir"
                      isActive={colorBlindDeuteranopia}
                      onToggle={toggleColorBlindDeuteranopia}
                      small
                    />
                    <ToggleCard
                      icon="🔵"
                      title="Tritanopia (Mavi Körlüğü)"
                      description="Mavi renk algısını düzeltir"
                      isActive={colorBlindTritanopia}
                      onToggle={toggleColorBlindTritanopia}
                      small
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Diğer sekmeler... */}
          </div>

          {/* SCROLL BUTONLARI - YUKARI ÇIK */}
          {showScrollTop && (
            <button
              onClick={scrollToTop}
              className="scroll-to-top-btn"
              title="Yukarı çık"
            >
              ↑
            </button>
          )}

          {/* SCROLL BUTONLARI - AŞAĞI İN */}
          {showScrollBottom && (
            <button
              onClick={scrollToBottom}
              className="scroll-to-bottom-btn"
              title="Aşağı in"
            >
              ↓
            </button>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 bg-gray-50 p-3">
          <div className="flex justify-between gap-2">
            <button
              onClick={() => setIsPanelOpen(false)}
              className="flex-1 py-2 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 transition-colors text-sm"
            >
              Kapat
            </button>
            <button
              onClick={togglePanelPosition}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors text-sm"
            >
              {panelPosition === 'right' ? '◀' : '▶'}
            </button>
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

// ToggleCard Bileşeni
function ToggleCard({ icon, title, description, isActive, onToggle, small = false }) {
  return (
    <div className={`flex items-center justify-between p-4 rounded-xl border border-gray-200 bg-white hover:border-gray-300 transition-colors ${small ? 'py-3' : ''}`}>
      <div className="flex items-start gap-3 flex-1">
        <span className={`${small ? 'text-xl' : 'text-2xl'} mt-1`}>{icon}</span>
        <div className="flex-1">
          <h3 className={`font-semibold text-gray-900 ${small ? 'text-base' : 'text-base'}`}>{title}</h3>
          <p className={`text-gray-600 mt-1 ${small ? 'text-xs' : 'text-sm'}`}>{description}</p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 ml-4">
        <span className={`font-medium ${isActive ? 'text-green-600' : 'text-gray-500'} ${small ? 'text-xs' : 'text-xs'}`}>
          {isActive ? 'AÇIK' : 'KAPALI'}
        </span>
        <button
          onClick={onToggle}
          className={`rounded-full transition-colors relative ${
            small ? 'w-12 h-6' : 'w-14 h-7'
          } ${isActive ? 'bg-green-500' : 'bg-gray-300'}`}
        >
          <div
            className={`rounded-full bg-white transform transition-transform absolute top-1 ${
              small 
                ? `w-4 h-4 ${isActive ? 'translate-x-7' : 'translate-x-1'}`
                : `w-5 h-5 ${isActive ? 'translate-x-8' : 'translate-x-1'}`
            }`}
          />
        </button>
      </div>
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
      <span className="text-gray-400 text-lg">›</span>
    </button>
  );
}

// SearchModal Bileşeni
function SearchModal({ query, setQuery, results, onClose }) {
  return (
    <div className="fixed inset-0 z-[10001] bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl max-h-[80vh] flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="flex-1 relative">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Sayfalarda arama yapın..."
                className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                autoFocus
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Kapat
            </button>
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {results.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-lg font-semibold">Sonuç bulunamadı</div>
              <div className="text-sm mt-2">Farklı bir anahtar kelime deneyin</div>
            </div>
          ) : (
            results.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                onClick={onClose}
                className="flex items-center gap-3 p-4 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 transition-colors group"
              >
                <span className="text-xl group-hover:scale-110 transition-transform">{route.icon}</span>
                <span className="font-medium text-gray-700 group-hover:text-blue-600">{route.label}</span>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
