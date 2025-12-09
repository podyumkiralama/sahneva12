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
import { ScrollReveal } from "@/components/ScrollReveal";

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
      "Yüksek çözünürlüklü LED ekran kurulumları ve profesyonel etkinlik prodüksiyonları.",
    stats: "50+ Kurumsal Etkinlik",
    icon: "🖥️",
  },

  "Çadır Kiralama": {
    images: Array.from(
      { length: 19 },
      (_, i) => `/img/galeri/cadir-kiralama-${i + 1}.webp`
    ),
    description:
      "Açık hava etkinlikleri için premium çadır kurulumları ve profesyonel çözümler.",
    stats: "100+ Açık Hava Projesi",
    icon: "⛺",
  },

  "Podyum Kiralama": {
    images: Array.from(
      { length: 36 },
      (_, i) => `/img/galeri/podyum-kiralama-${i + 1}.webp`
    ),
    description:
      "Profesyonel podyum kurulumları ve modüler podyum sistemleri.",
    stats: "200+ Profesyonel Kurulum",
    icon: "👑",
  },
};

const DEFAULT_DICTIONARY = {
  exploreAria: "Aç — {{title}} ({{count}} proje)",
  exploreHiddenLabel: "Aç — {{title}} ({{count}} proje)",
  hoverCta: "İncele",
  cardAlt: "{{title}} — referans proje",
  seeAllLabel: "Tümünü Gör",
  seeAllSr: " — {{title}} ({{count}} proje)",
  badgeLabel: "Referans",
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
const COVER_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const LIGHTBOX_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 85vw, 80vw";

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/...";

// ===============================================================
// Kart Componenti
// ===============================================================
const GalleryCard = memo(function GalleryCard({
  i,
  title,
  gallery,
  open,
  prefersReducedMotion,
  getSrc,
  onError,
  dictionary,
}) {
  const images = gallery.images?.length
    ? gallery.images
    : ["/img/placeholder-service.webp"];

  const cover = images[0];
  const count = images.length;

  const exploreLabel = fillTemplate(dictionary.exploreAria, {
    title,
    count,
  });

  const exploreHiddenLabel = fillTemplate(dictionary.exploreHiddenLabel, {
    title,
    count,
  });

  return (
    <article
      role="listitem"
      className="
        group relative flex flex-col bg-white/5 border border-white/10
        rounded-3xl shadow-xl backdrop-blur-md overflow-hidden
        transition-all duration-500
        hover:-translate-y-2 hover:border-white/20
      "
    >
      {/* Görsel */}
      <div className="relative h-64 overflow-hidden">
        <button
          type="button"
          onClick={() => open(title, images, 0)}
          aria-label={exploreLabel}
          className="absolute inset-0 w-full h-full cursor-zoom-in focus:outline-none focus:ring-4 focus:ring-blue-500/40"
        >
          <span className="sr-only">{exploreHiddenLabel}</span>

          <Image
            src={getSrc(cover)}
            alt={fillTemplate(dictionary.cardAlt, { title })}
            fill
            sizes={COVER_SIZES}
            quality={i === 0 ? 70 : 60}
            loading={i === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL={BLUR_DATA_URL}
            className={`object-cover transition-transform duration-700 ${
              prefersReducedMotion ? "" : "group-hover:scale-110"
            }`}
            onError={() => onError(cover)}
          />

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
              bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30
            "
          >
            {dictionary.badgeLabel}
          </span>
        </button>
      </div>

      {/* İçerik */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-3">
          <div
            className="
            w-10 h-10 bg-white/10 backdrop-blur-md border border-white/20
            rounded-lg flex items-center justify-center text-xl shadow-lg
          "
          >
            {gallery.icon}
          </div>

          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {title}
            </h3>
            <p className="text-xs text-blue-300/80 font-medium mt-1">
              {gallery.stats}
            </p>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-2 border-l-2 border-white/10 pl-3 flex-1">
          {gallery.description}
        </p>

        <button
          onClick={() => open(title, images, 0)}
          className="
            w-full inline-flex items-center justify-between
            font-bold text-sm text-white hover:text-blue-400 transition-colors
          "
        >
          <span>
            {dictionary.seeAllLabel}
            <span className="sr-only">{fillTemplate(dictionary.seeAllSr, { title, count })}</span>
          </span>
          <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center">
            ➜
          </span>
        </button>
      </div>
    </article>
  );
});

// ===============================================================
// ANA BİLEŞEN — PROJECTS GALLERY
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

  if (!mounted) return null;

  const entries = Object.entries(normalizedGalleries);

  const computedHeadingId = ariaLabelledby ?? `projects-title-${headingId}`;
  const computedDescriptionId = ariaDescribedby ?? `projects-desc-${descriptionId}`;
  const computedRole = role ?? (ariaLabel || computedHeadingId ? "region" : undefined);

  return (
    <section
      className="relative py-20 bg-[#0B1120] overflow-hidden"
      aria-labelledby={ariaLabel ? undefined : computedHeadingId}
      aria-label={ariaLabel}
      aria-describedby={computedDescriptionId}
      role={computedRole}
    >
      {/* Grid Background + Glow — HeroSection ile uyumlu */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-purple-500/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-blue-500/10 blur-[130px] rounded-full" />
      </div>

      {/* Başlık */}
      <ScrollReveal>
        <div className="container px-4 mx-auto relative z-10 text-center max-w-3xl mb-16">
          <h2
            id={computedHeadingId}
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Başarılı{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Projelerimiz
            </span>
          </h2>
          <p id={computedDescriptionId} className="text-slate-400 text-lg mt-4">
            500'den fazla kurumsal etkinlik, konser, fuar ve organizasyonda
            profesyonel çözüm ortağı olduk.
          </p>
        </div>
      </ScrollReveal>

      {/* Grid */}
      <div className="container px-4 mx-auto relative z-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {entries.map(([title, gallery], i) => (
            <ScrollReveal key={title} direction="up" delay={i * 0.1}>
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
            </ScrollReveal>
          ))}
        </ul>
      </div>

      {/* LIGHTBOX */}
      {openState.isOpen &&
        createPortal(
          <div
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
              className="
                absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white/80
                hover:text-white hover:bg-white/20
                focus:outline-none focus:ring-2 focus:ring-white/40
              "
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

              {openState.items.length > 1 && (
                <>
                  <button
                    onClick={prev}
                    className="
                      hidden md:flex absolute left-6 top-1/2 -translate-y-1/2
                      bg-black/40 hover:bg-black/60 border border-white/10
                      rounded-full w-14 h-14 items-center justify-center text-white/70 hover:text-white
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
                      rounded-full w-14 h-14 items-center justify-center text-white/70 hover:text-white
                    "
                    aria-label={normalizedDictionary.nextLabel}
                  >
                    <span aria-hidden="true">›</span>
                    <span className="sr-only">{normalizedDictionary.nextSr}</span>
                  </button>
                </>
              )}

            <div className="relative w-full max-w-6xl h-[80vh] p-6 flex items-center justify-center">
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
                    className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
                    aria-label={normalizedDictionary.mobilePrevLabel}
                  >
                    <span aria-hidden="true">‹</span>
                    <span className="sr-only">{normalizedDictionary.prevSr}</span>
                  </button>

                  <span>
                    {fillTemplate(normalizedDictionary.counterLabel, {
                      index: openState.index + 1,
                      total: openState.items.length,
                    })}
                  </span>

                  <button
                    onClick={next}
                    className="inline-flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full"
                    aria-label={normalizedDictionary.mobileNextLabel}
                  >
                    <span className="sr-only">{normalizedDictionary.nextSr}</span>
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
