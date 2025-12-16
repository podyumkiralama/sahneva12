// components/ScrollReveal.jsx
"use client";

import {
  cloneElement,
  isValidElement,
} from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

/**
 * Kaynaktan hedefe animasyon başlangıç değerlerini üretir
 */
function getInitialFromDirection(direction, distance) {
  const d = distance ?? 32;

  switch (direction) {
    case "left":
      return { opacity: 0, x: -d, y: 0 };
    case "right":
      return { opacity: 0, x: d, y: 0 };
    case "down":
      return { opacity: 0, x: 0, y: -d };
    case "scale":
      return { opacity: 0, scale: 0.9 };
    case "up":
    default:
      return { opacity: 0, x: 0, y: d };
  }
}

/**
 * ScrollReveal
 *
 * @param {object} props
 * @param {"up"|"down"|"left"|"right"|"scale"} [props.direction="up"]
 * @param {number|string} [props.delay=0] - saniye cinsinden gecikme (0.0–1.0)
 * @param {number} [props.duration=0.7] - animasyon süresi
 * @param {number} [props.distance=32] - px olarak başlangıç offset'i
 * @param {boolean} [props.asChild=false] - (eski API için; şu an wrapper yine de ekleniyor)
 */
export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  asChild = false, // API uyumu için tutuluyor
  className,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();
  const numericDelay = Number(delay) || 0;

  // Hareket azaltma tercihinde animasyon uygulama, direkt göster
  if (shouldReduceMotion) {
    if (asChild && isValidElement(children)) {
      return cloneElement(children, {
        className: clsx(children.props.className, className),
        ...rest,
      });
    }

    return (
      <div className={className} {...rest}>
        {children}
      </div>
    );
  }

  const initial = getInitialFromDirection(direction, distance);
  const animate =
    direction === "scale"
      ? { opacity: 1, scale: 1 }
      : { opacity: 1, x: 0, y: 0 };

  const combinedClassName = clsx(
    "will-change-[opacity,transform]",
    className
  );

  // asChild olsa bile şimdilik her zaman wrapper kullanıyoruz,
  // böylece API bozulmuyor, sadece DOM'a extra bir div giriyor.
  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{
        once: true,           // her eleman için sadece bir kez animasyon
        amount: 0.15,         // elemanın %15'i görünce tetiklenir
        margin: "0px 0px -10% 0px",
      }}
      transition={{
        duration,
        delay: numericDelay,
        ease: [0.22, 0.61, 0.36, 1], // hoş bir ease-out
      }}
      className={combinedClassName}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/**
 * ScrollRevealGroup
 * Şimdilik sadece sarıcı, API geri uyumluluğu için.
 * İstersen ileride index'e göre auto delay ekleyebiliriz.
 */
export function ScrollRevealGroup({ children }) {
  return <>{children}</>;
}
