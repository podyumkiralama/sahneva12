// components/DeferredHydration.client.js
"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Performans İyileştirici:
 * Ağır client bileşenlerini sadece kullanıcı onları göreceği zaman
 * veya tarayıcı boşta kaldığında (idle) yükler.
 *
 * Kullanım:
 * <DeferredHydration
 *   idleTimeout={3000}
 *   rootMargin="200px"
 * >
 *   <AğırBileşen />
 * </DeferredHydration>
 */
export default function DeferredHydration({
  children,
  fallback = null,
  rootMargin = "200px", // Görünmeye 200px kala yüklemeye başla
  idleTimeout = 3000,   // En geç 3 sn sonra yine de yükle
  as: Component = "div",
  className,
  // Eğer hemen yüklemek istersek (ör: kritik alan), forceHydrate ile override edebiliriz
  forceHydrate = false,
  ...rest
}) {
  const [isHydrated, setHydrated] = useState(forceHydrate);
  const ref = useRef(null);
  const hasHydratedRef = useRef(forceHydrate);

  useEffect(() => {
    // SSR güvenliği
    if (typeof window === "undefined") return;

    // Zaten hydrate olduysa hiçbir şey kurma
    if (hasHydratedRef.current || forceHydrate) {
      if (!isHydrated) setHydrated(true);
      return;
    }

    const element = ref.current;
    if (!element) return;

    let idleId = null;
    let idleUsingRaf = false;
    let observer = null;
    let cancelled = false;

    const hydrateNow = () => {
      if (cancelled || hasHydratedRef.current) return;
      hasHydratedRef.current = true;
      setHydrated(true);

      // IO ve idle callback’leri artık gereksiz
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (idleId !== null) {
        if (!idleUsingRaf && "cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        } else {
          cancelAnimationFrame(idleId);
        }
        idleId = null;
      }
    };

    // Tarayıcı boşta kalınca yükle
    const scheduleIdle = () => {
      if ("requestIdleCallback" in window) {
        idleId = window.requestIdleCallback(
          (deadline) => {
            // Yeterli idle süresi varsa hydrate
            if (deadline.timeRemaining() > 0 || deadline.didTimeout) {
              hydrateNow();
            }
          },
          { timeout: idleTimeout }
        );
        idleUsingRaf = false;
      } else {
        // Safari / eski tarayıcı için rAF fallback
        const start = performance.now();
        idleUsingRaf = true;
        const loop = () => {
          const now = performance.now();
          if (now - start >= idleTimeout) {
            hydrateNow();
            return;
          }
          idleId = requestAnimationFrame(loop);
        };
        idleId = requestAnimationFrame(loop);
      }
    };

    scheduleIdle();

    // IntersectionObserver: görünür olunca daha erken yükle
    if ("IntersectionObserver" in window) {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting || entry.isVisible) {
              hydrateNow();
            }
          });
        },
        { rootMargin }
      );
      observer.observe(element);
    }

    // Cleanup
    return () => {
      cancelled = true;
      if (observer) {
        observer.disconnect();
        observer = null;
      }
      if (idleId !== null) {
        if (!idleUsingRaf && "cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        } else {
          cancelAnimationFrame(idleId);
        }
      }
    };
  }, [idleTimeout, rootMargin, forceHydrate, isHydrated]);

  const busy = !isHydrated && Boolean(fallback);

  return (
    <Component
      ref={ref}
      className={className}
      aria-busy={busy || undefined}
      {...rest}
    >
      {isHydrated ? children : fallback}
    </Component>
  );
}
