// components/ReviewBanner.jsx
"use client";

import { useEffect, useState, useCallback, useRef } from "react";

const REVIEW_URL = "https://g.page/r/CZhkMzkNOdgnEBI/review";
const LS_KEY = "rvb.dismissed.v1";

export default function ReviewBanner({
  mode = "sticky",
  className = "",
  title = "Sahneva Organizasyon’u Google’da değerlendirin",
  subtitle = "Görüşünüz bizim için çok değerli. 1 dakikanızı ayırır mısınız?",
  ctaLabel = "Yorum Yaz",
}) {
  const [hidden, setHidden] = useState(true);
  const wrapRef = useRef(null);

  // Banner yüksekliğini ölçüp :root'a CSS var olarak yaz
  const applyRootOffset = useCallback(() => {
    if (!wrapRef.current) return;
    const h = wrapRef.current.offsetHeight || 0;
    const root = document.documentElement;
    root.style.setProperty("--rb-bottom", `${h + 8}px`); // +8px ekstra nefes payı
    root.classList.add("has-review-banner");
  }, []);

  const clearRootOffset = useCallback(() => {
    const root = document.documentElement;
    root.style.removeProperty("--rb-bottom");
    root.classList.remove("has-review-banner");
  }, []);

  useEffect(() => {
    const dismissed =
      typeof window !== "undefined" && localStorage.getItem(LS_KEY) === "1";
    setHidden(dismissed);
  }, []);

  useEffect(() => {
    if (hidden || mode !== "sticky") {
      clearRootOffset();
      return;
    }
    // İlk ölçüm
    applyRootOffset();

    // Resize’da yeniden hesapla
    const ro = new ResizeObserver(() => applyRootOffset());
    if (wrapRef.current) ro.observe(wrapRef.current);
    window.addEventListener("orientationchange", applyRootOffset);

    return () => {
      ro.disconnect();
      window.removeEventListener("orientationchange", applyRootOffset);
      clearRootOffset();
    };
  }, [hidden, mode, applyRootOffset, clearRootOffset]);

  const dismiss = useCallback(() => {
    try {
      localStorage.setItem(LS_KEY, "1");
    } catch {}
    setHidden(true);
    clearRootOffset();
  }, [clearRootOffset]);

  if (hidden) return null;

  const Content = () => (
    <div className="flex items-center gap-3">
      <div
        aria-hidden="true"
        role="presentation"
        className="hidden sm:flex items-center justify-center rounded-full bg-yellow-400/15 text-yellow-500 w-10 h-10 text-xl"
      >
        ★
      </div>

      <div className="min-w-0">
        <p className="text-sm sm:text-base font-semibold text-neutral-900" id="review-title">
          {title}
        </p>
        <p className="text-xs sm:text-sm text-neutral-600" id="review-subtitle">
          {subtitle}
        </p>
      </div>

      <div className="flex-1" />

      <a
        href={REVIEW_URL}
        target="_blank"
        rel="noopener noreferrer"
        className="shrink-0 inline-flex items-center gap-2 rounded-full bg-[#b45309] hover:bg-[#92400e] text-white text-sm font-semibold px-4 py-2 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#b45309]/40"
        aria-label={`Google üzerinde Sahneva için yorum yaz (yeni sekmede açılır)`}
      >
        ⭐ {ctaLabel}
      </a>

      <button
        type="button"
        onClick={dismiss}
        className="ml-2 -mr-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-neutral-500 hover:bg-neutral-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-300"
        aria-label="Bu bildirimi kapat"
      >
        ✕
      </button>
    </div>
  );

  if (mode === "inline") {
    return (
      <section
        className={`container my-6 rounded-2xl border bg-white shadow-sm p-4 sm:p-5 ${className}`}
        role="region"
        aria-labelledby="review-title"
        aria-describedby="review-subtitle"
      >
        <Content />
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
      style={{
        bottom: "max(0.75rem, env(safe-area-inset-bottom))",
      }}
      ref={wrapRef}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border bg-white shadow-lg p-3 sm:p-4">
        <Content />
      </div>
    </div>
  );
}