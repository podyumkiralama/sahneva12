/* GA init – inline yerine harici dosya */
(function () {
  try {
    const gaId =
      document.currentScript?.getAttribute("data-ga-id") ||
      (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_GA_ID) ||
      "G-J5YK10YLLC";

    if (!gaId || window.__gaInitialized) return;
    window.__gaInitialized = true;

    // Avoid injecting duplicate script tags on hydration retries/Strict Mode
    const existingLoader = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${gaId}"]`
    );
    if (!existingLoader) {
      const loader = document.createElement("script");
      loader.async = true;
      loader.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
      loader.setAttribute("data-ga-id", gaId);
      document.head.appendChild(loader);
    }

    window.dataLayer = window.dataLayer || [];
    function gtag() {
      window.dataLayer.push(arguments);
    }
    window.gtag = gtag;

    gtag("js", new Date());
    gtag("config", gaId, {
      anonymize_ip: true,
      allow_google_signals: false,
      allow_ad_personalization_signals: false,
      transport_type: "beacon",
    });
  } catch {
    // Sessizce geç
  }
})();
