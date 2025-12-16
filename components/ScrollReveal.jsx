// components/ScrollReveal.jsx
"use client";

import { cloneElement, isValidElement } from "react";
import { motion, useReducedMotion } from "framer-motion";
import clsx from "clsx";

/**
 * Direction'a göre hidden state üretir (transform sadece görsel; layout bozmaz)
 * SSR/Hydration tutarlılığı için variants kullanıyoruz.
 */
function getHiddenVariant(direction, distance) {
  const d = distance ?? 32;

  switch (direction) {
    case "left":
      return { opacity: 0, x: -d, y: 0, scale: 1 };
    case "right":
      return { opacity: 0, x: d, y: 0, scale: 1 };
    case "down":
      return { opacity: 0, x: 0, y: -d, scale: 1 };
    case "scale":
      // scale CLS tool’da bazen “wider/smaller” gibi raporlanabiliyor,
      // yine de variants ile SSR/hydration tutarlı kalıyoruz.
      return { opacity: 0, x: 0, y: 0, scale: 0.96 };
    case "up":
    default:
      return { opacity: 0, x: 0, y: d, scale: 1 };
  }
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.7,
  distance = 32,
  asChild = false,
  className,
  ...rest
}) {
  const shouldReduceMotion = useReducedMotion();
  const numericDelay = Number(delay) || 0;

  // Reduce motion: hiç animasyon yok
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

  const variants = {
    hidden: getHiddenVariant(direction, distance),
    show: { opacity: 1, x: 0, y: 0, scale: 1 },
  };

  const combinedClassName = clsx("will-change-[opacity,transform]", className);

  const motionProps = {
    variants,
    initial: "hidden",          // ✅ SSR’da da hidden state basılır
    whileInView: "show",
    viewport: {
      once: true,
      amount: 0.15,
      margin: "0px 0px -10% 0px",
    },
    transition: {
      duration,
      delay: numericDelay,
      ease: [0.22, 0.61, 0.36, 1],
    },
    style: {
      // CLS-safe: stable rendering hints
      transformOrigin: "center",
    },
  };

  if (asChild && isValidElement(children)) {
    const MotionComponent = motion(children.type);

    return (
      <MotionComponent
        {...children.props}
        {...rest}
        {...motionProps}
        className={clsx(children.props.className, combinedClassName)}
        style={{ ...(children.props.style || {}), ...(motionProps.style || {}) }}
      >
        {children.props.children}
      </MotionComponent>
    );
  }

  return (
    <motion.div {...motionProps} className={combinedClassName} {...rest}>
      {children}
    </motion.div>
  );
}

export function ScrollRevealGroup({ children }) {
  return <>{children}</>;
}
