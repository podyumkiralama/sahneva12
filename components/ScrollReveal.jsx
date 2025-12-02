"use client";

import React, { forwardRef } from "react";

// Basit class merge helper
function mergeClassNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

/**
 * ScrollReveal – NO-OP, ama asChild destekli
 * Hiç animasyon yapmıyor, sadece DOM yapısını bozmadan wrapper görevi görüyor.
 */
const ScrollRevealBase = (
  {
    as,          // örn: "section"
    asChild,     // true ise child'ı root olarak kullan
    children,
    className = "",
    ...rest
  },
  ref
) => {
  // asChild: <ScrollReveal asChild><li /></ScrollReveal>
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: mergeClassNames(children.props.className, className),
      ...rest,
    });
  }

  const Component = as || "div";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
};

export const ScrollReveal = forwardRef(ScrollRevealBase);

/**
 * ScrollRevealGroup – sadece layout wrapper'ı, animasyon yok
 */
const ScrollRevealGroupBase = (
  { as, asChild, children, className = "", ...rest },
  ref
) => {
  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children, {
      ref,
      className: mergeClassNames(children.props.className, className),
      ...rest,
    });
  }

  const Component = as || "div";

  return (
    <Component ref={ref} className={className} {...rest}>
      {children}
    </Component>
  );
};

export const ScrollRevealGroup = forwardRef(ScrollRevealGroupBase);

export default ScrollReveal;
