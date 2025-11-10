/* GA init – inline yerine harici dosya */
(function () {
  try {
    const gaId =
      document.currentScript?.getAttribute("data-ga-id") ||
      (typeof process !== "undefined" && process.env && process.env.NEXT_PUBLIC_GA_ID) ||
      "G-J5YK10YLLC";

    if (!gaId) return;

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
  } catch (e) {
    // Sessizce geç
  }
})();
