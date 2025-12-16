// components/AnalyticsConsentWrapper.client.jsx
"use client";

import { useEffect } from "react";

const CONSENT_KEY = "user_analytics_consent";
const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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

  const script = document.createElement("script");
  script.id = "ga-script";
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

    // 1) Consent Mode default state: denied
    initConsentMode();

    // 2) LocalStorage'dan daha önceki kullanıcı onayını oku
    const stored = typeof window !== "undefined"
      ? window.localStorage.getItem(CONSENT_KEY)
      : null;

    if (stored === "granted") {
      // 3) Daha önce onay vermiş kullanıcı için consent'i granted yap
      window.gtag("consent", "update", {
        ad_storage: "granted",
        analytics_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
      });

      // 4) GA script'ini yükle
      loadGAScript(GA_ID);
    }
  }, []);

  // UI render etmiyor, sadece arkada çalışıyor
  return null;
}
