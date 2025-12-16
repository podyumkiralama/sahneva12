// components/UtilityBar.client.js
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    let idleId = null;
    let timeoutId = null;
    let listenerAttached = false;

    const activate = () => setShouldRender(true);

    const events = ["scroll", "pointerdown", "keydown", "touchstart"];

    const handleFirstInteraction = () => {
      activate();
      cleanup();
    };

    const attachListeners = () => {
      if (listenerAttached) return;
      listenerAttached = true;

      events.forEach((event) =>
        window.addEventListener(event, handleFirstInteraction, { passive: true })
      );

      timeoutId = window.setTimeout(() => {
        activate();
        cleanup();
      }, 5000);
    };

    const cleanup = () => {
      if (listenerAttached) {
        events.forEach((event) =>
          window.removeEventListener(event, handleFirstInteraction)
        );
      }
      if (idleId && "cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      if (timeoutId) window.clearTimeout(timeoutId);
    };

    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(attachListeners, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(attachListeners, 150);
    }

    return cleanup;
  }, [shouldRender]);

  // ✅ CLS FIX: UtilityBar gelmeden önce bile fixed slot'u render et
  // Not: Bu slot, DevTools'taki "fixed left-4 bottom-6 z-50" ile aynı konumu rezerve eder.
  return (
    <div
      className="fixed left-4 bottom-6 z-50"
      style={{ width: 56, height: 56 }}
      aria-hidden={!shouldRender}
    >
      {shouldRender ? <UtilityBar /> : null}
    </div>
  );
}
