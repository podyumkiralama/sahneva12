// components/ScrollReveal.jsx
"use client";

import { cloneElement, isValidElement } from "react";
import clsx from "clsx";

export function ScrollReveal({
  children,
  asChild = false,
  className,
  ...rest
}) {
  if (asChild && isValidElement(children)) {
    return (
      cloneElement(children, {
        className: clsx(children.props.className, className),
        ...rest,
      })
    );
  }

  return (
    <div className={className} {...rest}>
      {children}
    </div>
  );
}

export function ScrollRevealGroup({ children }) {
  return <>{children}</>;
}
