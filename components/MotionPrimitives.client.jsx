// components/MotionPrimitives.client.jsx
'use client';

import { useRef, useEffect, useState } from 'react';

/**
 * 2026 Standardı: "Progressive Enhancement" Animasyonları.
 * Ağır kütüphaneler yerine Native IntersectionObserver ve CSS Transition kullanır.
 * 'prefers-reduced-motion' kullanıcının işletim sistemi ayarlarına otomatik uyum sağlar.
 */
export function MotionWrapper({ 
  children, 
  animation = 'fade-up', 
  delay = 0, 
  className = '',
  as: Component = 'div', // Semantik HTML için esneklik (section, article, li vs.)
 ...props 
}) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Tarayıcı desteği kontrolü ve Reduced Motion kontrolü
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setIsVisible(true); // Animasyonu atla, direkt göster
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Performans: Tek seferlik tetikleme
        }
      },
      { threshold: 0.1, rootMargin: '50px' } // Erken yükleme için marj
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up': return 'translate-y-8 opacity-0';
      case 'fade-down': return '-translate-y-8 opacity-0';
      case 'scale': return 'scale-95 opacity-0';
      case 'blur': return 'blur-sm opacity-0';
      default: return 'opacity-0';
    }
  };

  const getVisibleStyle = () => {
    switch (animation) {
      case 'fade-up': 
      case 'fade-down': return 'translate-y-0 opacity-100';
      case 'scale': return 'scale-100 opacity-100';
      case 'blur': return 'blur-0 opacity-100';
      default: return 'opacity-100';
    }
  };

  return (
    <Component
      ref={ref}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${isVisible? getVisibleStyle() : getInitialStyle()}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </Component>
  );
}
