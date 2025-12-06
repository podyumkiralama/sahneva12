"use client";

import { useEffect } from "react";

export default function IdleCallbackPolyfill() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (typeof window.requestIdleCallback !== "function") {
      window.requestIdleCallback = function requestIdleCallbackFallback(cb) {
        const start = Date.now();
        return window.setTimeout(() => {
          cb({
            didTimeout: false,
            timeRemaining() {
              return Math.max(0, 50 - (Date.now() - start));
            },
          });
        }, 1);
      };
    }

    if (typeof window.cancelIdleCallback !== "function") {
      window.cancelIdleCallback = function cancelIdleCallbackFallback(id) {
        window.clearTimeout(id);
      };
    }
  }, []);

  return null;
}
