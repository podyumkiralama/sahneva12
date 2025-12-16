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
    // SSR'da veya zaten render edilmişse hiçbir şey yapma
    if (typeof window === "undefined" || shouldRender) return;

    let idleId = null;
    let timeoutId = null;
    let listenerAttached = false;

    const activate = () => {
      setShouldRender(true);
    };

    // Kullanıcı etkileşimi: scroll / tıklama / klavye / dokunma
    const events = ["scroll", "pointerdown", "keydown", "touchstart"];

    const handleFirstInteraction = () => {
      activate();
      cleanup();
    };

    const attachListeners = () => {
      if (listenerAttached) return;
      listenerAttached = true;

      events.forEach((event) =>
        window.addEventListener(event, handleFirstInteraction, {
          passive: true,
        })
      );

      // Ek güvenlik: 5 saniye içinde hiçbir şey olmazsa yine yükle
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

      if (idleId && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }
    };

    // Dinleyicileri, main thread boşta kaldığında ekle
    if ("requestIdleCallback" in window) {
      idleId = window.requestIdleCallback(attachListeners, { timeout: 1500 });
    } else {
      timeoutId = window.setTimeout(attachListeners, 150);
    }

    return cleanup;
  }, [shouldRender]);

  // Henüz yükleme tetiklenmediyse hiç render etme
  if (!shouldRender) return null;

  // Artık erişilebilirlik paneli yüklenecek
  return <UtilityBar />;
}
