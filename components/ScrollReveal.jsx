// components/ScrollReveal.jsx
"use client";

import { useRef, useEffect, useState, cloneElement, isValidElement } from "react";
import clsx from "clsx";

// Varsayılan geçiş sınıfları
const DEFAULT_CLASSES =
  "opacity-0 transition-all duration-1000 ease-out translate-y-8";

// Bileşen ekranda göründüğünde eklenecek sınıf
const REVEALED_CLASS = "!opacity-100 !translate-y-0";

const observerCallbacks = new Map();
let sharedObserver;
let sharedObserverPromise;

function createObserver() {
  return new IntersectionObserver((entries) => {
    for (const entry of entries) {
      const callback = observerCallbacks.get(entry.target);

      if (callback) {
        callback(entry);

        if (entry.isIntersecting) {
          observerCallbacks.delete(entry.target);
          sharedObserver?.unobserve(entry.target);
        }
      }
    }
  }, {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  });
}

function ensureObserver() {
  if (typeof window === "undefined") return Promise.resolve(null);
  if (sharedObserver) return Promise.resolve(sharedObserver);
  if (sharedObserverPromise) return sharedObserverPromise;

  sharedObserverPromise = new Promise((resolve) => {
    const setupObserver = () => {
      sharedObserver = createObserver();
      resolve(sharedObserver);
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(setupObserver, { timeout: 400 });
    } else {
      window.setTimeout(setupObserver, 120);
    }
  });

  return sharedObserverPromise;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("matchMedia" in window)) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(mediaQuery.matches);

    updatePreference();
    mediaQuery.addEventListener("change", updatePreference);

    return () => mediaQuery.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

/**
 * ScrollReveal bileşeni
 * Intersection Observer kullanarak bileşen ekrana girdiğinde animasyon başlatır.
 *
 * @param {object} props
 * @param {string} [props.delay] - Animasyon gecikmesi (saniye cinsinden).
 * @param {string} [props.direction] - Animasyon yönü (örneğin 'left', 'right', 'scale').
 * @param {boolean} [props.asChild] - İçindeki child öğeyi sarmalamak yerine doğrudan ona sınıf uygular.
 * @param {React.ReactNode} props.children - Render edilecek alt öğe.
 */
function ScrollReveal({
  children,
  delay = "0",
  direction = "up", // 'up', 'down', 'left', 'right', 'scale'
  asChild = false,
  ...rest
}) {
  const ref = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const shouldAnimate = !prefersReducedMotion;
  const [isVisible, setIsVisible] = useState(() => !shouldAnimate);
  const hasPlayedRef = useRef(!shouldAnimate);

  useEffect(() => {
    if (!shouldAnimate) {
      setIsVisible(true);
      hasPlayedRef.current = true;
      return;
    }

    const element = ref.current;
    if (!element) return undefined;

    let cancelled = false;

    ensureObserver().then((observer) => {
      if (!observer || cancelled || !ref.current || hasPlayedRef.current) return;

      observerCallbacks.set(element, (entry) => {
        if (entry.isIntersecting && !hasPlayedRef.current) {
          hasPlayedRef.current = true;
          setIsVisible(true);
        }
      });

      observer.observe(element);
    });

    return () => {
      cancelled = true;

      if (element) {
        observerCallbacks.delete(element);
        sharedObserver?.unobserve(element);
      }
    };
  }, [shouldAnimate]);

  // Yöne özel geçiş stilleri
  const getDirectionClasses = (dir) => {
    switch (dir) {
      case "left":
        return "translate-x-[-50px]";
      case "right":
        return "translate-x-[50px]";
      case "down":
        return "translate-y-[-50px]";
      case "scale":
        return "scale-90 opacity-0";
      case "up":
      default:
        return "translate-y-8"; // DEFAULT_CLASSES'ta zaten tanımlı
    }
  };

  const initialClasses = shouldAnimate
    ? clsx(
        DEFAULT_CLASSES,
        getDirectionClasses(direction),
        isVisible && REVEALED_CLASS,
      )
    : undefined;

  const style = shouldAnimate
    ? {
        transitionDelay: `${delay * 0.25}s`, // Delay'i daha belirgin hale getir
        ...(direction === "scale" && { transitionProperty: "opacity, transform" }),
      }
    : undefined;

  if (asChild) {
    if (!isValidElement(children)) {
      // Geçersiz child durumda, sarmalayıcı kullanmaya geri dön
      return (
        <div ref={ref} className={initialClasses} style={style} {...rest}>
          {children}
        </div>
      );
    }

    return cloneElement(children, {
      ref,
      className: clsx(children.props.className, initialClasses),
      style: { ...style, ...children.props.style },
      ...rest,
    });
  }

  // Wrapper olarak kullan
  return (
    <div ref={ref} className={initialClasses} style={style} {...rest}>
      {children}
    </div>
  );
}

/**
 * ScrollReveal'ın birden fazla alt öğeyi tek bir grup halinde yönetmesini sağlar.
 * Animasyonlar, grup ekrana geldiğinde alt öğeler için sırayla başlar.
 * @param {object} props
 * @param {React.ReactNode} props.children
 */
function ScrollRevealGroup({ children }) {
  // Bu bileşen sadece alt öğeler için bir sarıcıdır, mantığı ScrollReveal'da işlenir.
  return <>{children}</>;
}

export { ScrollReveal, ScrollRevealGroup };
