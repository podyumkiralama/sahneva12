"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Performans İyileştirici:
 * Ağır bileşenleri (Client Components) sadece kullanıcı onları göreceği zaman
 * veya tarayıcı boşta kaldığında (idle) yükler.
 */
export default function DeferredHydration({
  children,
  fallback = null,
  rootMargin = "200px", // Görünmeye 200px kala yüklemeye başla
  idleTimeout = 3000,   // Veya en geç 3 saniye sonra yükle
  as: Component = "div",
  className,
  ...rest
}) {
  const [isHydrated, setHydrated] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    // Zaten yüklendiyse tekrar çalışma
    if (isHydrated) return;

    const element = ref.current;
    
    // Tarayıcı boşta kaldığında yüklemeyi tetikleyecek fonksiyon
    const onIdle = () => {
      if ("requestIdleCallback" in window) {
        return window.requestIdleCallback(() => setHydrated(true), { timeout: idleTimeout });
      }
      // Eski tarayıcılar için fallback
      return setTimeout(() => setHydrated(true), idleTimeout);
    };

    const idleId = onIdle();

    // IntersectionObserver: Kullanıcı scoll yapıp elemente yaklaştı mı?
    let observer;
    if ("IntersectionObserver" in window && element) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.isVisible) {
              setHydrated(true);
              // Yüklendiği an izlemeyi bırak
              observer.disconnect();
            }
          });
        },
        { rootMargin }
      );
      observer.observe(element);
    }

    // Temizlik (Cleanup) fonksiyonu
    return () => {
      if ("cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      if (observer) observer.disconnect();
    };
  }, [idleTimeout, rootMargin, isHydrated]);

  return (
    <Component
      ref={ref}
      className={className}
      // Erişilebilirlik: Yüklenirken 'meşgul' olduğunu bildirir
      aria-busy={!isHydrated} 
      {...rest}
    >
      {isHydrated ? children : fallback}
    </Component>
  );
}
