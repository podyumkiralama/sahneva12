// hooks/usePerformance.js
'use client';

import { useEffect, useRef } from "react";

// ✅ Layout Shift Önleyen Hook
export function useLayoutShiftProtection() {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // ✅ ResizeObserver ile layout değişikliklerini izle
    // İlk ölçümü de observer üzerinden alarak layout thrash'ini önlüyoruz
    // (getBoundingClientRect gibi senkron ölçümler zorunlu reflow tetikleyebiliyor).
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { height } = entry.contentRect;
        if (height > 0) {
          requestAnimationFrame(() => {
            entry.target.style.minHeight = `${height}px`;
          });
        }
      }
    });

    observer.observe(element);
    
    return () => {
      observer.disconnect();
      // ✅ Cleanup
      if (element.style.minHeight) {
        element.style.minHeight = '';
      }
    };
  }, []);

  return ref;
}

// ✅ Debounce ile DOM Operasyonları
export function useDebouncedEffect(callback, delay, deps = []) {
  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => clearTimeout(handler);
  }, [callback, delay, ...deps]);
}

// ✅ Performance Observer Hook'u
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'PerformanceObserver' in window) {
      // ✅ LCP Takibi
      const lcpObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        const lastEntry = entries[entries.length - 1];
        
        console.log('LCP:', lastEntry?.startTime || 'N/A');
        
        // Analytics'e gönderebilirsiniz
        if (window.gtag && lastEntry) {
          window.gtag('event', 'lcp_measurement', {
            event_category: 'Performance',
            event_label: 'Largest Contentful Paint',
            value: Math.round(lastEntry.startTime)
          });
        }
      });

      // ✅ Layout Shift Takibi
      const clsObserver = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        let totalShift = 0;
        
        entries.forEach(entry => {
          if (!entry.hadRecentInput) {
            totalShift += entry.value;
          }
        });
        
        console.log('CLS:', totalShift);
      });

      try {
        lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });
        clsObserver.observe({ entryTypes: ['layout-shift'] });
      } catch (e) {
        console.warn('PerformanceObserver not supported:', e);
      }

      return () => {
        lcpObserver.disconnect();
        clsObserver.disconnect();
      };
    }
  }, []);
}
