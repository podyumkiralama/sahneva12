// components/ReviewBanner.jsx
"use client";

import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

import ExternalLink from "@/components/ExternalLink";

const REVIEW_URL = "https://g.page/r/CZhkMzkNOdgnEBI/review";
const LS_KEY = "rvb.dismissed.v1";

// Kullanıcı sayfanın ne kadarını scroll etmiş (0–1 arası)
function getScrollRatio() {
  if (typeof document === "undefined") return 0;

  const doc = document.documentElement;
  const scrollTop = doc.scrollTop || document.body.scrollTop || 0;
  const scrollHeight = doc.scrollHeight || document.body.scrollHeight || 1;
  const clientHeight = doc.clientHeight || window.innerHeight || 1;

  return (scrollTop + clientHeight) / scrollHeight;
}

const BannerContent = memo(function BannerContent({
  title,
  subtitle,
  ctaLabel,
  ctaAriaLabel,
  closeAriaLabel,
  dismiss,
}) {
  return (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        role="presentation"
        className="hidden sm:flex items-center justify-center rounded-full bg-yellow-400/15 text-yellow-500 w-10 h-10 text-xl"
      >
        ★
      </div>

      <div className="min-w-0">
        <p
          className="text-sm sm:text-base font-semibold text-neutral-900"
          id="review-title"
        >
          {title}
        </p>
        <p
          className="text-xs sm:text-sm text-neutral-600"
          id="review-subtitle"
        >
          {subtitle}
        </p>
      </div>

      <div className="flex-1" />

      <ExternalLink
        href={REVIEW_URL}
        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#b45309] hover:bg-[#92400e] text-white text-sm font-semibold px-4 py-2 transition-colors focus-ring"
        ariaLabel={ctaAriaLabel}
      >
        ⭐ {ctaLabel}
      </ExternalLink>

      <button
        type="button"
        onClick={dismiss}
        className="ml-2 -mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 focus-ring"
        aria-label={closeAriaLabel}
      >
        ✕
      </button>
    </div>
  );
});

function ReviewBanner({
  mode = "sticky",
  className = "",
  title = "Sahneva Organizasyon’u Google’da değerlendirin",
  subtitle = "Görüşünüz bizim için çok değerli. 1 dakikanızı ayırır mısınız?",
  ctaLabel = "Yorum Yaz",
  ctaAriaLabel = "Google üzerinde Sahneva için yorum yaz (yeni sekmede açılır)",
  closeAriaLabel = "Bu bildirimi kapat",
  /**
   * İstersen ileride prop ile oynayabil diye threshold ayrı:
   * 0.5 = sayfanın %50'si, 0.8 = alta yakın, vs.
   */
  scrollThreshold = 0.5,
}) {
  // Kullanıcı kalıcı olarak kapattı mı?
  const [dismissed, setDismissed] = useState(false);
  // Scroll ile banner tetiklendi mi?
  const [activated, setActivated] = useState(false);

  const wrapRef = useRef(null);

  const stickyStyle = useMemo(
    () => ({
      bottom: "max(0.75rem, env(safe-area-inset-bottom))",
    }),
    []
  );

  const shouldShow = activated && !dismissed;

  // Banner yüksekliğini ölçüp :root'a CSS var olarak yaz
  const applyRootOffset = useCallback(() => {
    if (!wrapRef.current) return;
    const h = wrapRef.current.offsetHeight || 0;
    const root = document.documentElement;
    root.style.setProperty("--rb-bottom", `${h + 8}px`); // +8px nefes payı
    root.classList.add("has-review-banner");
  }, []);

  const clearRootOffset = useCallback(() => {
    const root = document.documentElement;
    root.style.removeProperty("--rb-bottom");
    root.classList.remove("has-review-banner");
  }, []);

  // İlk yüklemede daha önce dismiss etmiş mi kontrol et
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const dismissedValue = localStorage.getItem(LS_KEY);
      if (dismissedValue === "1") {
        setDismissed(true);
      }
    } catch {
      // localStorage yoksa sessiz geç
    }
  }, []);

  // Scroll ile tetikleme (sayfanın ortalarına/sonuna gelince göster)
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (dismissed || activated) return;

    const handleScroll = () => {
      const ratio = getScrollRatio();
      if (ratio >= scrollThreshold) {
        setActivated(true);
        window.removeEventListener("scroll", handleScroll);
      }
    };

    // Kullanıcı zaten aşağıdaysa (örn. anchor ile geldi) hemen kontrol et
    handleScroll();
    if (!activated && !dismissed) {
      window.addEventListener("scroll", handleScroll, { passive: true });
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [dismissed, activated, scrollThreshold]);

  // Sticky modda root offset'i yönet
  useEffect(() => {
    if (!shouldShow || mode !== "sticky") {
      if (typeof document !== "undefined") clearRootOffset();
      return;
    }

    applyRootOffset();

    const ro =
      typeof ResizeObserver !== "undefined"
        ? new ResizeObserver(() => applyRootOffset())
        : null;

    if (wrapRef.current && ro) ro.observe(wrapRef.current);
    if (typeof window !== "undefined") {
      window.addEventListener("orientationchange", applyRootOffset);
    }

    return () => {
      if (ro) ro.disconnect();
      if (typeof window !== "undefined") {
        window.removeEventListener("orientationchange", applyRootOffset);
      }
      if (typeof document !== "undefined") clearRootOffset();
    };
  }, [shouldShow, mode, applyRootOffset, clearRootOffset]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(LS_KEY, "1");
    } catch {
      // localStorage yoksa sadece state kapatır
    }
    setDismissed(true);
    if (typeof document !== "undefined") clearRootOffset();
  }, [clearRootOffset]);

  // Dismissed veya daha scroll threshold'a gelinmediyse render etme
  if (!shouldShow) return null;

  if (mode === "inline") {
    return (
      <section
        className={`container my-6 rounded-2xl border bg-white shadow-sm p-4 sm:p-5 ${className}`}
        role="region"
        aria-labelledby="review-title"
        aria-describedby="review-subtitle"
      >
        <BannerContent
          title={title}
          subtitle={subtitle}
          ctaLabel={ctaLabel}
          ctaAriaLabel={ctaAriaLabel}
          closeAriaLabel={closeAriaLabel}
          dismiss={dismiss}
        />
      </section>
    );
  }

  return (
    <div
      role="region"
      aria-live="polite"
      aria-labelledby="review-title"
      aria-describedby="review-subtitle"
      className={`fixed left-3 right-3 z-[60] ${className}`}
      style={stickyStyle}
      ref={wrapRef}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white shadow-lg p-3 sm:p-4">
        <BannerContent
          title={title}
          subtitle={subtitle}
          ctaLabel={ctaLabel}
          ctaAriaLabel={ctaAriaLabel}
          closeAriaLabel={closeAriaLabel}
          dismiss={dismiss}
        />
      </div>
    </div>
  );
}

export default memo(ReviewBanner);
