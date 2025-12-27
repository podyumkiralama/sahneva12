// components/ProjectsGallery.js
"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useId,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

// ===============================================================
// GALERİ VERİLERİ — Sabit 3 kategori (A seçildi)
// ===============================================================

const DEFAULT_GALLERIES = {
  "LED Ekran Kiralama": {
    images: Array.from(
      { length: 36 },
      (_, i) => `/img/galeri/led-ekran-kiralama-${i + 1}.webp`
    ),
    description:
      "Yüksek çözünürlüklü LED ekran kurulumları ve profesyonel etkinlik prodüksiyonu.",
    stats: "50+ Kurumsal Etkinlik",
    icon: "🖥️",
  },

  "Çadır Kiralama": {
    images: Array.from(
      { length: 19 },
      (_, i) => `/img/galeri/cadir-kiralama-${i + 1}.webp`
    ),
    description:
      "Açık hava etkinlikleri için premium çadır kiralama ve profesyonel çözümler.",
    stats: "100+ Açık Hava Projesi",
    icon: "⛺",
  },

  "Podyum Kiralama": {
    images: Array.from(
      { length: 36 },
      (_, i) => `/img/galeri/podyum-kiralama-${i + 1}.webp`
    ),
    description:
      "Profesyonel podyum kiralama, kurulum ve modüler podyum sistemleri.",
    stats: "200+ Profesyonel Kurulum",
    icon: "👑",
  },
};

// ===============================================================
// SÖZLÜK & TEXTLER
// ===============================================================

const DEFAULT_DICTIONARY = {
  title: "Projelerimiz",
  subtitle:
    "500'den fazla kurumsal etkinlik, konser, fuar ve etkinlik organizasyonu projesinde profesyonel çözüm ortağı olduk.",
  hoverCta: "Projeyi incele",
  statsLabel: "Tamamlanan proje",
  dialogAria: "{{title}} projesi",
  closeLabel: "Kapat",
  prevLabel: "Önceki görsel",
  prevSr: "Önceki proje görseline git",
  nextLabel: "Sonraki görsel",
  nextSr: "Sonraki proje görseline git",
  mobilePrevLabel: "Önceki görsel",
  mobileNextLabel: "Sonraki görsel",
  counterLabel: "{{index}} / {{total}}",
  liveMessage: "{{title}} galerisi {{count}} görselle açıldı",
  lightboxAlt: "{{title}} — referans proje {{index}}",
  regionTitleSr: "Proje galerisi listesi ve içerik detayı",
};

function fillTemplate(template, replacements) {
  return template?.replace(/\{\{(.*?)\}\}/g, (_, key) => replacements[key] ?? "");
}

function buildImages({ images, imagePattern, imageCount }) {
  if (Array.isArray(images) && images.length) return images;
  if (!imagePattern || !imageCount) return [];

  return Array.from({ length: imageCount }, (_, index) =>
    fillTemplate(imagePattern, { index: index + 1 })
  );
}

// ===============================================================
// BLUR + IMAGE SETTINGS
// ===============================================================

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...";

const COVER_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";

const LIGHTBOX_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, min(1024px, 80vw)";

const LIGHTBOX_FOCUS_RING =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

// ===============================================================
// GALLERY CARD
// ===============================================================

const GalleryCard = memo(function GalleryCard({
  title,
  gallery,
  i,
  open,
  prefersReducedMotion,
  getSrc,
  onError,
  dictionary,
}) {
  const cover = gallery.images?.[0];
  const coverRef = useRef(null);
  const [canLoadCover, setCanLoadCover] = useState(false);

  useEffect(() => {
    if (!coverRef.current || canLoadCover) return;

    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setCanLoadCover(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setCanLoadCover(true);
          observer.disconnect();
        }
      },
      { rootMargin: "240px 0px", threshold: 0.1 }
    );

    observer.observe(coverRef.current);
    return () => observer.disconnect();
  }, [canLoadCover]);

  const handleOpen = () => open(title, gallery.images, 0);

  return (
    <article
      className="group relative rounded-3xl overflow-hidden bg-slate-900/40 border border-slate-700/60 shadow-lg shadow-black/40"
      aria-labelledby={`project-card-${i}-title`}
    >
      {/* Görsel */}
      <button
        type="button"
        onClick={handleOpen}
        className="relative block w-full aspect-[4/3] overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
        ref={coverRef}
      >
        {canLoadCover ? (
          <Image
            src={getSrc(cover)}
            alt={fillTemplate(dictionary.lightboxAlt, {
              title,
              index: 1,
            })}
            fill
            sizes={COVER_SIZES}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={`object-cover transition-transform duration-700 ${
              prefersReducedMotion ? "" : "group-hover:scale-110"
            }`}
            onError={() => onError(cover)}
          />
        ) : (
          <div className="absolute inset-0 bg-slate-900/70" aria-hidden="true" />
        )}

        {/* Alt karartma */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-90" />

        {/* Hover CTA */}
        <div
          className="
            absolute inset-0 flex items-center justify-center
            opacity-0 group-hover:opacity-100 transition-opacity
          "
        >
          <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5">
            <span className="font-bold text-white text-sm flex items-center gap-2">
              🔍 {dictionary.hoverCta}
            </span>
          </div>
        </div>

        {/* Badge */}
        <span
          className="
            absolute top-4 right-4
            inline-flex items-center px-2.5 py-1
            rounded-full text-xs font-bold uppercase tracking-wider
            bg-black/60 text-white/90 backdrop-blur
          "
        >
          {gallery.icon && (
            <span className="mr-1" aria-hidden="true">
              {gallery.icon}
            </span>
          )}
          {dictionary.statsLabel}: {gallery.stats}
        </span>
      </button>

      {/* İçerik */}
      <div className="p-5 border-t border-slate-700/60 bg-gradient-to-b from-slate-900/40 to-slate-950/80">
        <h3
          id={`project-card-${i}-title`}
          className="text-lg font-semibold text-white flex items-center gap-2"
        >
          {gallery.icon && <span aria-hidden="true">{gallery.icon}</span>}
          <span>{title}</span>
        </h3>
        <p className="mt-2 text-sm text-slate-300">{gallery.description}</p>
      </div>
    </article>
  );
});

// ===============================================================
// ANA BİLEŞEN
// ===============================================================
export default function ProjectsGallery({
  galleries,
  dictionary,
  role,
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
}) {
  const [mounted, setMounted] = useState(false);
  const [openState, setOpenState] = useState({
    isOpen: false,
    items: [],
    index: 0,
    title: "",
  });
  const [anim, setAnim] = useState(false);
  const [errors, setErrors] = useState({});
  const [reduced, setReduced] = useState(false);
  const headingId = useId();
  const descriptionId = useId();

  const normalizedDictionary = useMemo(
    () => ({ ...DEFAULT_DICTIONARY, ...(dictionary ?? {}) }),
    [dictionary]
  );

  const normalizedGalleries = useMemo(() => {
    const source = galleries ?? DEFAULT_GALLERIES;

    return Object.fromEntries(
      Object.entries(source).map(([title, gallery]) => [
        title,
        {
          ...gallery,
          images: buildImages(gallery),
        },
      ])
    );
  }, [galleries]);

  const lastFocus = useRef(null);
  const portal = useRef(null);
  const closeBtn = useRef(null);
  const dialogRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0 });

  const handleError = useCallback(
    (key) => setErrors((p) => ({ ...p, [key]: true })),
    []
  );

  const getSrc = useCallback(
    (key) => (errors[key] ? "/img/placeholder-service.webp" : key),
    [errors]
  );

  // Prefers-reduced-motion
  useEffect(() => {
    const m = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(m.matches);
    apply();
    m.addEventListener("change", apply);
    return () => m.removeEventListener("change", apply);
  }, []);

  // Portal setup
  useEffect(() => {
    const el = document.createElement("div");
    el.id = "projects-gallery-lightbox";
    document.body.appendChild(el);
    portal.current = el;
    setMounted(true);

    return () => el.remove();
  }, []);

  const open = useCallback((title, items, index = 0) => {
    lastFocus.current = document.activeElement;

    setOpenState({ isOpen: true, items, index, title });

    setTimeout(() => setAnim(true), 20);
    setTimeout(() => closeBtn.current?.focus(), 120);
  }, []);

  const close = useCallback(() => {
    setAnim(false);
    setTimeout(() => {
      setOpenState((s) => ({ ...s, isOpen: false }));
      lastFocus.current?.focus?.();
    }, 200);
  }, []);

  const prev = useCallback(
    () =>
      setOpenState((s) => ({
        ...s,
        index: (s.index - 1 + s.items.length) % s.items.length,
      })),
    []
  );

  const next = useCallback(
    () =>
      setOpenState((s) => ({
        ...s,
        index: (s.index + 1) % s.items.length,
      })),
    []
  );

  const handleImageClick = useCallback(
    (event) => {
      if (openState.items.length <= 1) return;
      if (!window.matchMedia("(min-width: 768px)").matches) return;

      const target = event.currentTarget;
      const rect = target.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickRatio = clickX / rect.width;

      if (clickRatio <= 0.35) {
        prev();
        return;
      }

      if (clickRatio >= 0.65) {
        next();
      }
    },
    [next, prev, openState.items.length]
  );

  const handleTouchStart = useCallback((event) => {
    const touch = event.touches?.[0];
    if (!touch) return;
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  }, []);

  const handleTouchEnd = useCallback(
    (event) => {
      if (openState.items.length <= 1) return;
      const touch = event.changedTouches?.[0];
      if (!touch) return;

      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;

      if (Math.abs(deltaX) < 50 || Math.abs(deltaX) < Math.abs(deltaY)) return;

      if (deltaX > 0) {
        prev();
      } else {
        next();
      }
    },
    [next, prev, openState.items.length]
  );

  // Klavye kısayolları + focus trap (Escape, ok tuşları, Tab döngüsü)
  useEffect(() => {
    if (!openState.isOpen) return;

    const dialogEl = dialogRef.current;
    if (!dialogEl) return;

    const FOCUSABLE_SELECTORS =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), textarea, input, select';

    const getFocusable = () =>
      Array.from(dialogEl.querySelectorAll(FOCUSABLE_SELECTORS)).filter(
        (el) =>
          el instanceof HTMLElement &&
          !el.hasAttribute("disabled") &&
          el.getAttribute("aria-hidden") !== "true"
      );

    const handleKeyDown = (event) => {
      if (!openState.isOpen) return;

      if (event.key === "Escape") {
        event.preventDefault();
        close();
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        next();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        prev();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = getFocusable();
      if (!focusable.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const current = document.activeElement;

      if (event.shiftKey) {
        if (!current || current === first || !dialogEl.contains(current)) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (!current || current === last || !dialogEl.contains(current)) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [openState.isOpen, close, next, prev]);

  if (!mounted) return null;

  const entries = Object.entries(normalizedGalleries);

  const computedHeadingId = ariaLabelledby ?? `projects-title-${headingId}`;
  const computedDescriptionId =
    ariaDescribedby ?? `projects-desc-${descriptionId}`;
  const computedRole =
    role ?? (ariaLabel || computedHeadingId ? "region" : undefined);

  return (
    <section
      className="relative py-20 2xl:py-24 bg-[#0B1120] overflow-hidden"
      aria-labelledby={ariaLabel ? undefined : computedHeadingId}
      aria-label={ariaLabel}
      aria-describedby={computedDescriptionId}
      role={computedRole}
    >
      {/* Arka Plan — Faq.js ile aynı grid + mavi glow */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {/* Grid */}
        <div
          className="
            absolute inset-0
            grid-overlay
          "
        />
        {/* Glow */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen" />
      </div>

      {/* Başlık */}
      <div className="container px-4 mx-auto relative z-10 text-center max-w-3xl mb-16">
        <h2
          id={computedHeadingId}
          className="text-4xl md:text-5xl font-bold text-white leading-tight"
        >
          Başarılı{" "}
          <span className="gradient-text gradient-text--safe-xl">
            Projelerimiz
          </span>
        </h2>
        <p id={computedDescriptionId} className="text-slate-400 text-lg mt-4">
          500'den fazla kurumsal etkinlik, konser, fuar ve organizasyonda
          profesyonel çözüm ortağı olduk.
        </p>
      </div>

      {/* Grid */}
      <div className="container px-4 mx-auto relative z-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map(([title, gallery], i) => (
            <li key={title} className="list-none">
              <GalleryCard
                title={title}
                gallery={gallery}
                i={i}
                open={open}
                prefersReducedMotion={reduced}
                getSrc={getSrc}
                onError={handleError}
                dictionary={normalizedDictionary}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* LIGHTBOX */}
      {openState.isOpen &&
        createPortal(
          <div
            ref={dialogRef}
            tabIndex={-1}
            className={`
              fixed inset-0 z-[9999] bg-black/95 backdrop-blur-xl
              flex items-center justify-center
              ${reduced ? "" : "transition-all duration-300"}
              ${anim ? "opacity-100" : "opacity-0"}
            `}
            role="dialog"
            aria-modal="true"
            aria-label={fillTemplate(normalizedDictionary.dialogAria, {
              title: openState.title,
            })}
            onClick={(e) => e.target === e.currentTarget && close()}
          >
            <div className="sr-only" aria-live="polite">
              {fillTemplate(normalizedDictionary.liveMessage, {
                title: openState.title,
                count: openState.items.length,
              })}
            </div>

            <button
              ref={closeBtn}
              className={`
                absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/80
                hover:text-white hover:bg-white/20
                ${LIGHTBOX_FOCUS_RING}
              `}
              onClick={close}
              aria-label={normalizedDictionary.closeLabel}
            >
              <svg
                className="w-8 h-8"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {openState.items.length > 1 && (
              <>
                <button
                  onClick={prev}
                  className="
                    hidden md:flex absolute left-6 top-1/2 -translate-y-1/2
                    bg-black/40 hover:bg-black/60 border border-white/10
                    rounded-full w-14 h-14 items-center justify-center text-white/90 hover:text-white
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                  "
                  aria-label={normalizedDictionary.prevLabel}
                >
                  <span aria-hidden="true">‹</span>
                  <span className="sr-only">{normalizedDictionary.prevSr}</span>
                </button>
                <button
                  onClick={next}
                  className="
                    hidden md:flex absolute right-6 top-1/2 -translate-y-1/2
                    bg-black/40 hover:bg-black/60 border border-white/10
                    rounded-full w-14 h-14 items-center justify-center text-white/90 hover:text-white
                    focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 focus-visible:ring-offset-2 focus-visible:ring-offset-black
                  "
                  aria-label={normalizedDictionary.nextLabel}
                >
                  <span aria-hidden="true">›</span>
                  <span className="sr-only">{normalizedDictionary.nextSr}</span>
                </button>
              </>
            )}

            <div
              className="relative w-full max-w-6xl h-[80vh] p-6 flex items-center justify-center"
              onClick={handleImageClick}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                key={openState.items[openState.index]}
                src={getSrc(openState.items[openState.index])}
                alt={fillTemplate(normalizedDictionary.lightboxAlt, {
                  title: openState.title,
                  index: openState.index + 1,
                })}
                fill
                sizes={LIGHTBOX_SIZES}
                className={`object-contain ${
                  anim ? "opacity-100 scale-100" : "opacity-0 scale-95"
                } transition-all duration-300`}
              />

              {openState.items.length > 1 && (
                <div className="absolute inset-x-0 -bottom-2 flex items-center justify-between px-6 md:hidden text-white/80 text-sm">
                  <button
                    onClick={prev}
                    className={`inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full ${LIGHTBOX_FOCUS_RING}`}
                    aria-label={normalizedDictionary.mobilePrevLabel}
                  >
                    <span aria-hidden="true">‹</span>
                    <span className="sr-only">
                      {normalizedDictionary.prevSr}
                    </span>
                  </button>

                  <span>
                    {fillTemplate(normalizedDictionary.counterLabel, {
                      index: openState.index + 1,
                      total: openState.items.length,
                    })}
                  </span>

                  <button
                    onClick={next}
                    className={`inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full ${LIGHTBOX_FOCUS_RING}`}
                    aria-label={normalizedDictionary.mobileNextLabel}
                  >
                    <span className="sr-only">
                      {normalizedDictionary.nextSr}
                    </span>
                    <span aria-hidden="true">›</span>
                  </button>
                </div>
              )}
            </div>
          </div>,
          portal.current
        )}
    </section>
  );
}
