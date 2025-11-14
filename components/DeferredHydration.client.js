"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Defers hydrating expensive client components until they are near the viewport
 * or the main thread is idle. This helps Lighthouse mobile scores by reducing
 * the amount of JavaScript executed during the first paint.
 */
export default function DeferredHydration({
  children,
  fallback = null,
  rootMargin = "240px",
  idleTimeout = 3000,
  as: Component = "div",
  className,
  "aria-live": ariaLive,
  "aria-busy": ariaBusy,
  ...rest
}) {
  const containerRef = useRef(null);
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (shouldRender) return;

    const node = containerRef.current;
    if (!node) {
      setShouldRender(true);
      return;
    }

    let idleHandle;
    const markReady = () => setShouldRender(true);

    if (typeof window !== "undefined") {
      const startIdle = () => {
        if ("requestIdleCallback" in window) {
          idleHandle = window.requestIdleCallback(markReady, { timeout: idleTimeout });
        } else {
          idleHandle = window.setTimeout(markReady, idleTimeout);
        }
      };

      if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
          const entry = entries[0];
          if (entry?.isIntersecting) {
            markReady();
            observer.disconnect();
          }
        }, { rootMargin });

        observer.observe(node);
        startIdle();

        return () => {
          observer.disconnect();
          if (idleHandle) {
            if ("cancelIdleCallback" in window) {
              window.cancelIdleCallback(idleHandle);
            } else {
              window.clearTimeout(idleHandle);
            }
          }
        };
      }

      startIdle();
    }

    return () => {
      if (idleHandle) {
        if (typeof window !== "undefined" && "cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleHandle);
        } else if (typeof window !== "undefined") {
          window.clearTimeout(idleHandle);
        }
      }
    };
  }, [idleTimeout, rootMargin, shouldRender]);

  const normalizedAriaBusy = (() => {
    if (typeof ariaBusy === "boolean") return ariaBusy;
    if (typeof ariaBusy === "string") {
      const value = ariaBusy.toLowerCase();
      if (value === "true") return true;
      if (value === "false") return false;
    }
    return undefined;
  })();

  return (
    <Component
      ref={containerRef}
      className={className}
      aria-live={ariaLive}
      aria-busy={shouldRender ? undefined : normalizedAriaBusy ?? true}
      {...rest}
    >
      {shouldRender ? children : fallback}
    </Component>
  );
}
