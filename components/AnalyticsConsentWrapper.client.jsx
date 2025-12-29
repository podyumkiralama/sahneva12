// components/AnalyticsConsentWrapper.client.jsx
"use client";

import { useEffect } from "react";

const CONSENT_KEY = "user_analytics_consent";
const GA_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || process.env.NEXT_PUBLIC_GA_ID;

// Consent Mode başlangıç durumu (default: denied)
function initConsentMode() {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };

  window.gtag("consent", "default", {
    ad_storage: "denied",
    analytics_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
}

// GA script'ini gerçekten sayfaya ekleyen fonksiyon
function loadGAScript(gaId) {
  if (typeof window === "undefined" || !gaId) return;

  // Aynı script'i ikinci defa eklemeyelim
  if (document.getElementById("ga-script")) return;
  const existingLoader = document.querySelector(
    'script[src^="https://www.googletagmanager.com/gtag/js"]'
  );
  if (existingLoader || window.__gaInitialized) return;
  window.__gaInitialized = true;

  const script = document.createElement("script");
  script.id = "ga-script";
  script.setAttribute("data-gtag-loader", "true");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  function gtag() {
    window.dataLayer.push(arguments);
  }
  window.gtag = window.gtag || gtag;

  window.gtag("js", new Date());
  window.gtag("config", gaId, {
    anonymize_ip: true,
  });
}

export default function AnalyticsConsentWrapper() {
  useEffect(() => {
    if (!GA_ID) return;

    let idleHandle;
    let timeoutHandle;
    let listenersAttached = false;
    let activated = false;

    const events = ["pointerdown", "keydown", "touchstart", "scroll"];

    const activate = () => {
      if (activated) return;
      activated = true;

      initConsentMode();

      const stored =
        typeof window !== "undefined"
          ? window.localStorage.getItem(CONSENT_KEY)
          : null;

      const isGranted = stored === "granted" || stored === null;

      if (isGranted) {
        if (stored === null) {
          window.localStorage.setItem(CONSENT_KEY, "granted");
        }
        window.gtag("consent", "update", {
          ad_storage: "granted",
          analytics_storage: "granted",
          ad_user_data: "granted",
          ad_personalization: "granted",
        });

        loadGAScript(GA_ID);
      }
    };

    const handleInteraction = () => {
      activate();
      cleanup();
    };

    const cleanup = () => {
      if (listenersAttached) {
        events.forEach((event) =>
          window.removeEventListener(event, handleInteraction)
        );
      }
      if (idleHandle && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle && typeof window !== "undefined") {
        window.clearTimeout(timeoutHandle);
      }
    };

    if (typeof window !== "undefined") {
      listenersAttached = true;
      events.forEach((event) =>
        window.addEventListener(event, handleInteraction, { passive: true })
      );

      if ("requestIdleCallback" in window) {
        idleHandle = window.requestIdleCallback(activate, { timeout: 6000 });
      } else {
        timeoutHandle = window.setTimeout(activate, 3500);
      }
    }

    return cleanup;
  }, []);

  return null;
}
