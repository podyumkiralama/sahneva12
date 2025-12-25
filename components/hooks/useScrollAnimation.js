'use client';

import { useEffect, useRef } from 'react';

export function useScrollAnimation() {
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      element.classList.add('active');
      return undefined;
    }

    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

      const handlePreferenceChange = (event) => {
        if (event.matches) {
          element.classList.add('active');
        }
      };

      mediaQuery.addEventListener('change', handlePreferenceChange);

      const cleanupPreferences = () => {
        mediaQuery.removeEventListener('change', handlePreferenceChange);
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('active');
            }
          });
        },
        {
          threshold: 0.1,
          rootMargin: '0px 0px -50px 0px'
        }
      );

      observer.observe(element);

      return () => {
        cleanupPreferences();
        observer.disconnect();
      };
    }

    return undefined;
  }, []);

  return elementRef;
}
