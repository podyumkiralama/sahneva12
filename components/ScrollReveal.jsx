// components/ScrollReveal.jsx
"use client";

import {
  useRef,
  useEffect,
  useState,
  useCallback,
  cloneElement,
  isValidElement,
} from "react";
import clsx from "clsx";

// Varsayılan geçiş sınıfları
const DEFAULT_CLASSES =
  "opacity-0 transition-all duration-1000 ease-out translate-y-8";

// Bileşen ekranda göründüğünde eklenecek sınıf
const REVEALED_CLASS = "!opacity-100 !translate-y-0";

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
  const [isVisible, setIsVisible] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);

  const handleIntersect = useCallback(([entry]) => {
    if (entry.isIntersecting && !hasPlayed) {
      setIsVisible(true);
      setHasPlayed(true); // Animasyonu sadece bir kez oynat
    }
  }, [hasPlayed]);

  useEffect(() => {
    if (!ref.current) return;

    // Intersection Observer ayarları
    const observer = new IntersectionObserver(handleIntersect, {
      root: null, // Viewport'u kullan
      rootMargin: "0px",
      threshold: 0.1, // %10'u görünür olduğunda tetikle
    });

    observer.observe(ref.current);

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [handleIntersect]);

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

  const initialClasses = clsx(
    DEFAULT_CLASSES,
    getDirectionClasses(direction),
    isVisible && REVEALED_CLASS,
  );

  const style = {
    transitionDelay: `${delay * 0.25}s`, // Delay'i daha belirgin hale getir
    ...(direction === 'scale' && { transitionProperty: 'opacity, transform' }),
  };

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
