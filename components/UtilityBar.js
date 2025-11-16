'use client';

import { useState, useEffect, useCallback } from 'react';

const AccessibilityToolbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activePanel, setActivePanel] = useState('profiles');
  const [settings, setSettings] = useState({
    // Görsel Ayarlar
    fontSize: 16,
    highContrast: false,
    invertColors: false,
    grayscale: false,
    darkMode: false,
    lightMode: false,
    underlineLinks: false,
    
    // Okunabilirlik
    dyslexicFont: false,
    highlightHeadings: false,
    highlightLinks: false,
    readingMask: false,
    
    // Navigasyon
    bigCursor: false,
    keyboardNav: false,
    
    // İçerik
    stopAnimations: false,
    muteSounds: false,
    hideImages: false,
    
    // Profiller
    seizureSafe: false,
    visionImpaired: false,
    adhdFriendly: false,
    cognitiveDisability: false,
    blindUsers: false
  });

  // LocalStorage işlemleri
  const saveToLocalStorage = useCallback((key, value) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(`acc_${key}`, JSON.stringify(value));
    }
  }, []);

  const loadFromLocalStorage = useCallback((key, defaultValue) => {
    if (typeof window !== 'undefined') {
      const item = localStorage.getItem(`acc_${key}`);
      return item ? JSON.parse(item) : defaultValue;
    }
    return defaultValue;
  }, []);

  // CSS stilini uygula
  const applyAccessibilityStyles = useCallback(() => {
    const styles = `
      .accessibility-active {
        --acc-font-size: ${settings.fontSize}px;
      }

      .accessibility-active body {
        font-size: var(--acc-font-size) !important;
      }

      ${settings.highContrast ? `
        .accessibility-active {
          background: #000000 !important;
          color: #ffffff !important;
        }
        .accessibility-active * {
          background: #000000 !important;
          color: #ffffff !important;
          border-color: #ffff00 !important;
        }
        .accessibility-active a {
          color: #ffff00 !important;
          text-decoration: underline !important;
        }
      ` : ''}

      ${settings.invertColors ? `
        .accessibility-active {
          filter: invert(1) hue-rotate(180deg) !important;
        }
      ` : ''}

      ${settings.grayscale ? `
        .accessibility-active {
          filter: grayscale(1) !important;
        }
      ` : ''}

      ${settings.darkMode ? `
        .accessibility-active {
          background: #1a1a1a !important;
          color: #ffffff !important;
        }
      ` : ''}

      ${settings.lightMode ? `
        .accessibility-active {
          background: #ffffff !important;
          color: #000000 !important;
        }
      ` : ''}

      ${settings.underlineLinks ? `
        .accessibility-active a {
          text-decoration: underline !important;
        }
      ` : ''}

      ${settings.dyslexicFont ? `
        .accessibility-active * {
          font-family: "Comic Sans MS", "Arial Rounded MT Bold", Arial, sans-serif !important;
          font-weight: normal !important;
          letter-spacing: 1px !important;
        }
      ` : ''}

      ${settings.highlightHeadings ? `
        .accessibility-active h1,
        .accessibility-active h2,
        .accessibility-active h3,
        .accessibility-active h4,
        .accessibility-active h5,
        .accessibility-active h6 {
          background: yellow !important;
          color: black !important;
          padding: 8px 12px !important;
          border-radius: 4px !important;
        }
      ` : ''}

      ${settings.highlightLinks ? `
        .accessibility-active a {
          background: #ffff00 !important;
          color: #000000 !important;
          padding: 4px 8px !important;
          border-radius: 3px !important;
        }
      ` : ''}

      ${settings.bigCursor ? `
        .accessibility-active {
          cursor: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='14' fill='%23000' stroke='%23fff' stroke-width='2'/%3E%3C/svg%3E") 16 16, auto !important;
        }
      ` : ''}

      ${settings.hideImages ? `
        .accessibility-active img {
          display: none !important;
        }
      ` : ''}

      .accessibility-reading-mask {
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

      .accessibility-active .accessibility-reading-mask {
        display: block;
      }
    `;

    // Mevcut stil etiketini bul veya oluştur
    let styleTag = document.getElementById('accessibility-styles');
    if (!styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'accessibility-styles';
      document.head.appendChild(styleTag);
    }
    styleTag.textContent = styles;
  }, [settings]);

  // Animasyonları durdur/başlat
  const handleAnimations = useCallback((stop) => {
    let styleTag = document.getElementById('accessibility-animations');
    
    if (stop && !styleTag) {
      styleTag = document.createElement('style');
      styleTag.id = 'accessibility-animations';
      styleTag.textContent = `
        *, *::before, *::after {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
          scroll-behavior: auto !important;
        }
      `;
      document.head.appendChild(styleTag);
    } else if (!stop && styleTag) {
      styleTag.remove();
    }
  }, []);

  // Okuma maskesi
  const handleReadingMask = useCallback((enable) => {
    let mask = document.getElementById('accessibility-reading-mask');
    
    if (enable && !mask) {
      mask = document.createElement('div');
      mask.id = 'accessibility-reading-mask';
      mask.className = 'accessibility-reading-mask';
      document.body.appendChild(mask);

      const onMouseMove = (e) => {
        mask.style.top = e.clientY + 'px';
      };
      
      document.addEventListener('mousemove', onMouseMove);
    } else if (!enable && mask) {
      mask.remove();
    }
  }, []);

  // Ayarları güncelle
  const updateSetting = useCallback((key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      
      // LocalStorage'a kaydet
      saveToLocalStorage(key, value);
      
      // Erişilebilirlik aktifse stilleri uygula
      if (document.documentElement.classList.contains('accessibility-active')) {
        setTimeout(() => applyAccessibilityStyles(), 0);
      }
      
      return newSettings;
    });
  }, [saveToLocalStorage, applyAccessibilityStyles]);

  // Profil uygula
  const applyProfile = useCallback((profileName) => {
    const profiles = {
      seizureSafe: () => {
        updateSetting('seizureSafe', true);
        updateSetting('stopAnimations', true);
        updateSetting('muteSounds', true);
        handleAnimations(true);
      },
      visionImpaired: () => {
        updateSetting('visionImpaired', true);
        updateSetting('fontSize', 18);
        updateSetting('highContrast', true);
        updateSetting('underlineLinks', true);
        updateSetting('bigCursor', true);
      },
      adhdFriendly: () => {
        updateSetting('adhdFriendly', true);
        updateSetting('stopAnimations', true);
        handleAnimations(true);
      },
      cognitiveDisability: () => {
        updateSetting('cognitiveDisability', true);
        updateSetting('fontSize', 18);
        updateSetting('dyslexicFont', true);
        updateSetting('highlightHeadings', true);
        updateSetting('highlightLinks', true);
      }
    };

    if (profiles[profileName]) {
      profiles[profileName]();
    }
  }, [updateSetting, handleAnimations]);

  // Tüm ayarları sıfırla
  const resetAll = useCallback(() => {
    const resetSettings = {
      fontSize: 16,
      highContrast: false,
      invertColors: false,
      grayscale: false,
      darkMode: false,
      lightMode: false,
      underlineLinks: false,
      dyslexicFont: false,
      highlightHeadings: false,
      highlightLinks: false,
      readingMask: false,
      bigCursor: false,
      keyboardNav: false,
      stopAnimations: false,
      muteSounds: false,
      hideImages: false,
      seizureSafe: false,
      visionImpaired: false,
      adhdFriendly: false,
      cognitiveDisability: false,
      blindUsers: false
    };

    setSettings(resetSettings);
    
    // LocalStorage'ı temizle
    Object.keys(resetSettings).forEach(key => {
      localStorage.removeItem(`acc_${key}`);
    });

    // Stilleri kaldır
    document.documentElement.classList.remove('accessibility-active');
    handleAnimations(false);
    handleReadingMask(false);
    
    const styleTag = document.getElementById('accessibility-styles');
    if (styleTag) styleTag.remove();
  }, [handleAnimations, handleReadingMask]);

  // Başlangıç yükleme
  useEffect(() => {
    // Ayarları localStorage'dan yükle
    const loadedSettings = {};
    Object.keys(settings).forEach(key => {
      loadedSettings[key] = loadFromLocalStorage(key, settings[key]);
    });
    setSettings(loadedSettings);

    // Erişilebilirlik aktifse stilleri uygula
    const isActive = loadFromLocalStorage('active', false);
    if (isActive) {
      document.documentElement.classList.add('accessibility-active');
      setTimeout(() => applyAccessibilityStyles(), 100);
    }
  }, [loadFromLocalStorage, applyAccessibilityStyles]);

  // Ayarlar değiştiğinde stilleri güncelle
  useEffect(() => {
    applyAccessibilityStyles();
    
    // Özel efektler
    if (settings.stopAnimations) {
      handleAnimations(true);
    } else {
      handleAnimations(false);
    }
    
    if (settings.readingMask) {
      handleReadingMask(true);
    } else {
      handleReadingMask(false);
    }
  }, [settings, applyAccessibilityStyles, handleAnimations, handleReadingMask]);

  // Ana bileşen - Floating Action Button
  if (!isOpen) {
    return (
      <div className="fixed right-8 bottom-8 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
          aria-label="Erişilebilirlik ayarlarını aç"
        >
          ♿
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[10000]">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Panel */}
      <div className="absolute right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <span className="text-xl">♿</span>
            </div>
            <div>
              <h2 className="font-bold text-lg">Erişilebilirlik</h2>
              <p className="text-blue-100 text-sm">Ayarlarınızı kişiselleştirin</p>
            </div>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 rounded-lg bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 bg-gray-50">
          {[
            { id: 'profiles', label: 'Profiller', icon: '👤' },
            { id: 'content', label: 'İçerik', icon: '📝' },
            { id: 'color', label: 'Renk', icon: '🎨' },
            { id: 'navigation', label: 'Navigasyon', icon: '🎯' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActivePanel(tab.id)}
              className={`flex-1 flex flex-col items-center py-3 text-xs font-medium transition-colors ${
                activePanel === tab.id 
                  ? 'text-blue-600 bg-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <span className="text-lg mb-1">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4">
          {/* Profiller */}
          {activePanel === 'profiles' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Erişilebilirlik Profilleri</h3>
              
              <ProfileCard
                icon="⚡"
                title="Epilepsi Güvenli"
                description="Animasyonları durdurur ve yanıp sönen içeriği engeller"
                isActive={settings.seizureSafe}
                onToggle={() => applyProfile('seizureSafe')}
              />
              
              <ProfileCard
                icon="👁️"
                title="Görme Engelli"
                description="Yazı boyutunu ve kontrastı artırır"
                isActive={settings.visionImpaired}
                onToggle={() => applyProfile('visionImpaired')}
              />
              
              <ProfileCard
                icon="🧠"
                title="DEHB Dostu"
                description="Dikkat dağıtıcı öğeleri azaltır"
                isActive={settings.adhdFriendly}
                onToggle={() => applyProfile('adhdFriendly')}
              />
              
              <ProfileCard
                icon="🎯"
                title="Bilişsel Engelli"
                description="Okunabilirliği artırır"
                isActive={settings.cognitiveDisability}
                onToggle={() => applyProfile('cognitiveDisability')}
              />
            </div>
          )}

          {/* İçerik */}
          {activePanel === 'content' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">İçerik Ayarları</h3>
              
              {/* Yazı Boyutu */}
              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-900 mb-3">Yazı Boyutu</h4>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateSetting('fontSize', Math.max(12, settings.fontSize - 2))}
                    className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                  >
                    A-
                  </button>
                  <div className="flex-1 text-center py-2 bg-blue-100 text-blue-700 rounded-lg font-medium">
                    {settings.fontSize}px
                  </div>
                  <button
                    onClick={() => updateSetting('fontSize', Math.min(24, settings.fontSize + 2))}
                    className="flex-1 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg font-bold transition-colors"
                  >
                    A+
                  </button>
                </div>
              </div>

              <ToggleCard
                icon="🔤"
                title="Disleksi Yazı Tipi"
                description="Okumayı kolaylaştıran yazı tipi"
                isActive={settings.dyslexicFont}
                onToggle={() => updateSetting('dyslexicFont', !settings.dyslexicFont)}
              />
              
              <ToggleCard
                icon="📑"
                title="Başlıkları Vurgula"
                description="Başlıkları belirgin şekilde göster"
                isActive={settings.highlightHeadings}
                onToggle={() => updateSetting('highlightHeadings', !settings.highlightHeadings)}
              />
              
              <ToggleCard
                icon="🔗"
                title="Bağlantıları Vurgula"
                description="Linkleri belirgin şekilde göster"
                isActive={settings.highlightLinks}
                onToggle={() => updateSetting('highlightLinks', !settings.highlightLinks)}
              />
              
              <ToggleCard
                icon="👁️"
                title="Okuma Maskesi"
                description="Okuma çizgisi göster"
                isActive={settings.readingMask}
                onToggle={() => updateSetting('readingMask', !settings.readingMask)}
              />
            </div>
          )}

          {/* Renk */}
          {activePanel === 'color' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Renk Ayarları</h3>
              
              <ToggleCard
                icon="🎨"
                title="Yüksek Kontrast"
                description="Maksimum renk kontrastı"
                isActive={settings.highContrast}
                onToggle={() => updateSetting('highContrast', !settings.highContrast)}
              />
              
              <ToggleCard
                icon="🔄"
                title="Renkleri Ters Çevir"
                description="Tüm renkleri tersine çevir"
                isActive={settings.invertColors}
                onToggle={() => updateSetting('invertColors', !settings.invertColors)}
              />
              
              <ToggleCard
                icon="⚫"
                title="Siyah-Beyaz"
                description="Gri tonlamalı görünüm"
                isActive={settings.grayscale}
                onToggle={() => updateSetting('grayscale', !settings.grayscale)}
              />
              
              <ToggleCard
                icon="🌙"
                title="Koyu Mod"
                description="Koyu arkaplan kullan"
                isActive={settings.darkMode}
                onToggle={() => {
                  updateSetting('darkMode', !settings.darkMode);
                  updateSetting('lightMode', false);
                }}
              />
              
              <ToggleCard
                icon="☀️"
                title="Açık Mod"
                description="Açık arkaplan kullan"
                isActive={settings.lightMode}
                onToggle={() => {
                  updateSetting('lightMode', !settings.lightMode);
                  updateSetting('darkMode', false);
                }}
              />
              
              <ToggleCard
                icon="🔗"
                title="Bağlantıların Altını Çiz"
                description="Tüm linklerin altını çiz"
                isActive={settings.underlineLinks}
                onToggle={() => updateSetting('underlineLinks', !settings.underlineLinks)}
              />
            </div>
          )}

          {/* Navigasyon */}
          {activePanel === 'navigation' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Navigasyon Ayarları</h3>
              
              <ToggleCard
                icon="🖱️"
                title="Büyük İmleç"
                description="Daha büyük fare imleci"
                isActive={settings.bigCursor}
                onToggle={() => updateSetting('bigCursor', !settings.bigCursor)}
              />
              
              <ToggleCard
                icon="⌨️"
                title="Klavye Navigasyonu"
                description="Klavye ile gezintiyi etkinleştir"
                isActive={settings.keyboardNav}
                onToggle={() => updateSetting('keyboardNav', !settings.keyboardNav)}
              />
              
              <ToggleCard
                icon="⏸️"
                title="Animasyonları Durdur"
                description="Hareketli öğeleri durdur"
                isActive={settings.stopAnimations}
                onToggle={() => updateSetting('stopAnimations', !settings.stopAnimations)}
              />
              
              <ToggleCard
                icon="🔇"
                title="Sesleri Kapat"
                description="Tüm sesleri sustur"
                isActive={settings.muteSounds}
                onToggle={() => updateSetting('muteSounds', !settings.muteSounds)}
              />
              
              <ToggleCard
                icon="🖼️"
                title="Resimleri Gizle"
                description="Görselleri gizle"
                isActive={settings.hideImages}
                onToggle={() => updateSetting('hideImages', !settings.hideImages)}
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={() => {
                const isActive = !document.documentElement.classList.contains('accessibility-active');
                if (isActive) {
                  document.documentElement.classList.add('accessibility-active');
                  saveToLocalStorage('active', true);
                } else {
                  document.documentElement.classList.remove('accessibility-active');
                  saveToLocalStorage('active', false);
                }
              }}
              className={`flex-1 py-3 rounded-lg font-semibold transition-colors ${
                document.documentElement.classList.contains('accessibility-active')
                  ? 'bg-green-600 text-white hover:bg-green-700'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {document.documentElement.classList.contains('accessibility-active') ? 'Aktif' : 'Aktif Et'}
            </button>
            
            <button
              onClick={resetAll}
              className="px-6 py-3 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors"
            >
              Sıfırla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Yardımcı Bileşenler
const ProfileCard = ({ icon, title, description, isActive, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
    <div className="flex items-start gap-3 flex-1">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
    
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        isActive ? 'bg-green-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transform transition-transform absolute top-1 ${
          isActive ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

const ToggleCard = ({ icon, title, description, isActive, onToggle }) => (
  <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
    <div className="flex items-start gap-3 flex-1">
      <span className="text-2xl">{icon}</span>
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{title}</h4>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </div>
    
    <button
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${
        isActive ? 'bg-blue-500' : 'bg-gray-300'
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-white transform transition-transform absolute top-1 ${
          isActive ? 'translate-x-7' : 'translate-x-1'
        }`}
      />
    </button>
  </div>
);

export default AccessibilityToolbar;
