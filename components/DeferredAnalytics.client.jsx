"use client";

import { useEffect, useRef } from "react";

// Chrome Lighthouse ve DevTools "Deprecated API usage" uyarısını tetikleyen
// `mozConnection`/`webkitConnection` gibi vendor-prefiksli Network Information
// API erişimlerini kaldırıyoruz. Yalnızca standart `navigator.connection`
// üzerinde bulunan `saveData` bilgisine bakıyoruz; yoksa analitikleri yüklemeye
// devam ediyoruz.
function shouldRespectSaveData() {
  if (typeof navigator === "undefined") return false;
  const connection = navigator.connection;
  return Boolean(connection?.saveData);
}

export default function DeferredAnalytics({ gaId }) {
  const hasLoadedRef = useRef(false);

  useEffect(() => {
    if (!gaId || hasLoadedRef.current) return;
    if (shouldRespectSaveData()) return;

    let cancelled = false;
    let idleHandle;
    let timeoutHandle;
    let appendedScript;

    const loadAnalytics = () => {
      if (cancelled || hasLoadedRef.current) return;
      hasLoadedRef.current = true;

      const script = document.createElement("script");
      script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      script.async = true;
      script.onload = () => {
        if (!window.dataLayer) {
          window.dataLayer = [];
        }
        window.dataLayer.push({ event: "gtm.js", "gtm.start": Date.now() });
      };
      document.head.appendChild(script);
      appendedScript = script;

      window.dataLayer = window.dataLayer || [];
      function gtag() {
        window.dataLayer.push(arguments);
      }
      gtag("js", new Date());
      gtag("config", gaId, {
        anonymize_ip: true,
        page_title: document.title,
        page_location: window.location.href,
      });
    };

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(loadAnalytics, { timeout: 4000 });
    } else {
      timeoutHandle = window.setTimeout(loadAnalytics, 2500);
    }

    return () => {
      cancelled = true;
      if (idleHandle && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle && typeof window !== "undefined") {
        window.clearTimeout(timeoutHandle);
      }
      if (appendedScript?.parentNode) {
        appendedScript.parentNode.removeChild(appendedScript);
      }
    };
  }, [gaId]);

  return null;
}
