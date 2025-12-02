"use client";

import React, { useRef, useEffect } from "react";
import clsx from "clsx";

/**
 * Tek bir IntersectionObserver ile çalışan hafif reveal sistemi.
 * Her eleman sadece BİR KEZ animasyon yapar ve sonra observer'dan çıkar.
 */

let sharedObserver = null;

function getObserver() {
  if (typeof window === "undefined") return null;
  if (sharedObserver) return sharedObserver;

  sharedObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal-in");
          if (sharedObserver) {
            sharedObserver.unobserve(entry.target);
          }
        }
      }
    },
    {
      // Biraz görünür olduğunda tetiklensin
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px",
    }
  );

  return sharedObserver;
}

function useScrollReveal(ref) {
  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // JS desteklenmiyorsa direkt göster
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      node.classList.add("reveal-in");
      return;
    }

    const observer = getObserver();
    if (!observer) {
      node.classList.add("reveal-in");
      return;
    }

    observer.observe(node);

    return () => {
      observer.unobserve(node);
    };
  }, [ref]);
}

/**
 * variant:
 *  - "up" (varsayılan)
 *  - "left"
 *  - "right"
 *  - "scale"
 */
export function ScrollReveal({
  as: Component = "div",
  children,
  className,
  variant = "up",
  ...rest
}) {
  const ref = useRef(null);

  useScrollReveal(ref);

  const variantClass =
    variant === "left"
      ? "reveal-left"
      : variant === "right"
      ? "reveal-right"
      : variant === "scale"
      ? "reveal-scale"
      : "reveal-up";

  return (
    <Component
      ref={ref}
      className={clsx("reveal-base", variantClass, className)}
      {...rest}
    >
      {children}
    </Component>
  );
}

// Backwards-compat: diğer dosyalar default import kullanıyorsa
export default ScrollReveal;
