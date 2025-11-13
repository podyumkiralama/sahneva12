'use client';

import { useScrollAnimation } from "@/components/hooks/useScrollAnimation";

export function ScrollReveal({
  children,
  as: Component = "div",
  className = "",
  delay = "",
  direction = "up",
  ...props
}) {
  const ref = useScrollAnimation();

  const getAnimationClass = () => {
    switch (direction) {
      case "left":
        return "reveal-left";
      case "right":
        return "reveal-right";
      case "scale":
        return "reveal-scale";
      default:
        return "reveal";
    }
  };

  const delayClass = delay ? `delay-${delay}` : "";
  const classes = [getAnimationClass(), delayClass, className]
    .filter(Boolean)
    .join(" ");

  return (
    <Component
      ref={ref}
      className={classes}
      data-sr-manual="true"
      {...props}
    >
      {children}
    </Component>
  );
}

// Grup halinde animasyon için bileşen
export function ScrollRevealGroup({
  children,
  as: Component = "div",
  className = "",
  ...props
}) {
  return (
    <Component className={className} {...props}>
      {children}
    </Component>
  );
}
