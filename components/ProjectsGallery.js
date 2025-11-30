// components/ProjectsGallery.js
"use client";

import {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

const COVER_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const LIGHTBOX_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, min(1024px, 80vw)";

const DEFAULT_GALLERIES = {
  "LED Ekran Kiralama": {
    images: Array.from({ length: 36 }, (_, i) => `/img/galeri/led-ekran-kiralama-${i + 1}.webp`),
    description:
      "Yüksek çözünürlüklü LED ekran kurulumları ve profesyonel etkinlik prodüksiyonları",
    stats: "50+ Kurumsal Etkinlik",
    icon: "🖥️",
  },
  "Çadır Kiralama": {
    images: Array.from({ length: 19 }, (_, i) => `/img/galeri/cadir-kiralama-${i + 1}.webp`),
    description:
      "Açık hava etkinlikleri için premium çadır kurulumları ve profesyonel çözümler",
    stats: "100+ Açık Hava Organizasyonu",
    icon: "⛺",
  },
  "Podyum Kiralama": {
    images: Array.from({ length: 36 }, (_, i) => `/img/galeri/podyum-kiralama-${i + 1}.webp`),
    description:
      "Profesyonel podyum kurulumları ve modüler podyum sistemleri",
    stats: "200+ Profesyonel Kurulum",
    icon: "👑",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R";

const DEFAULT_DICTIONARY = {
  exploreAria: "Galeriyi İncele — {{title}} ({{count}} proje)",
  exploreHiddenLabel: "Galeriyi İncele — {{title}} ({{count}} proje)",
  hoverCta: "Galeriyi İncele",
  cardAlt: "{{title}} - Sahneva profesyonel kurulum referansı",
  seeAllLabel: "Tümünü Gör",
  seeAllSr: " — {{title}} ({{count}} proje)",
  dialogAria: "{{title}} profesyonel proje galerisi",
  closeLabel: "Galeriyi kapat",
  prevLabel: "‹ Önceki",
  prevSr: "Önceki proje",
  nextLabel: "Sonraki ›",
  nextSr: "Sonraki proje",
  mobilePrevLabel: "‹ Önceki",
  mobileNextLabel: "Sonraki ›",
  counterLabel: "{{index}} / {{total}}",
  liveMessage: "{{title}} galerisi açıldı, {{count}} profesyonel proje",
  lightboxAlt: "{{title}} - {{index}}. profesyonel referans projemiz",
  regionTitleSr: "Profesyonel projeler galeri içeriği",
};

const TEMPLATE_PATTERN = /\{\{\s*(\w+)\s*\}\}/g;

function formatWithParams(template, fallback, params, order = []) {
  const source = template ?? fallback;

  if (typeof source === "function") {
    return source(...order.map((key) => params[key]));
  }

  if (typeof source === "string") {
    return source.replace(TEMPLATE_PATTERN, (_, key) => {
      const value = params[key];
      return value !== undefined ? String(value) : "";
    });
  }

  if (typeof fallback === "function") {
    return fallback(...order.map((key) => params[key]));
  }

  if (typeof fallback === "string") {
    return fallback.replace(TEMPLATE_PATTERN, (_, key) => {
      const value = params[key];
      return value !== undefined ? String(value) : "";
    });
  }

  return "";
}

const SKELETON_ITEMS = [1, 2, 3];

function mergeDictionary(base, override = {}) {
  const result = { ...base };

  for (const [key, value] of Object.entries(override || {})) {
    if (
      value &&
      typeof value === "object" &&
      !Array.isArray(value) &&
      typeof base[key] === "object"
    ) {
      result[key] = mergeDictionary(base[key], value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

const GalleryCard = memo(function GalleryCard({
  dictionary,
  galleryData,
  getImageSrc,
  groupTitle,
  handleImageError,
  index,
  open,
  prefersReducedMotion,
  templates,
}) {
  const {
    cardAltTemplate,
    exploreAriaTemplate,
    exploreHiddenLabelTemplate,
    seeAllSrTemplate,
  } = templates;

  const images = galleryData.images;
  const cover = images[0];

  const exploreAria = useMemo(
    () =>
      formatWithParams(
        exploreAriaTemplate,
        DEFAULT_DICTIONARY.exploreAria,
        { title: groupTitle, count: images.length },
        ["title", "count"]
      ),
    [exploreAriaTemplate, groupTitle, images.length]
  );

  const exploreHiddenLabel = useMemo(
    () =>
      formatWithParams(
        exploreHiddenLabelTemplate,
        DEFAULT_DICTIONARY.exploreHiddenLabel,
        { title: groupTitle, count: images.length },
        ["title", "count"]
      ),
    [exploreHiddenLabelTemplate, groupTitle, images.length]
  );

  const cardAlt = useMemo(
    () =>
      formatWithParams(
        cardAltTemplate,
        DEFAULT_DICTIONARY.cardAlt,
        { title: groupTitle },
        ["title"]
      ),
    [cardAltTemplate, groupTitle]
  );

  const seeAllSr = useMemo(
    () =>
      formatWithParams(
        seeAllSrTemplate,
        DEFAULT_DICTIONARY.seeAllSr,
        { title: groupTitle, count: images.length },
        ["title", "count"]
      ),
    [groupTitle, images.length, seeAllSrTemplate]
  );

  const openFirst = useCallback(
    () => open(groupTitle, images, 0),
    [groupTitle, images, open]
  );

  const handleCoverError = useCallback(
    () => handleImageError(cover),
    [cover, handleImageError]
  );

  return (
    <li>
      <article className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/60 hover:border-blue-200/80 overflow-hidden">
        <div className="relative h-80 overflow-hidden">
          <button
            type="button"
            onClick={openFirst}
            aria-label={exploreAria}
            className="absolute inset-0 w-full h-full focus-ring rounded-t-2xl"
          >
            <span className="absolute opacity-0 pointer-events-none">
              {exploreHiddenLabel}
            </span>

            <Image
              src={getImageSrc(cover)}
              alt={cardAlt}
              fill
              className={`object-cover transition-transform duration-700 ${
                prefersReducedMotion ? "" : "group-hover:scale-110"
              }`}
              sizes={COVER_SIZES}
              quality={index === 0 ? 60 : 65}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              placeholder="blur"
              blurDataURL={BLUR_DATA_URL}
              priority={index === 0}
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={handleCoverError}
            />

            <div
              className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            />

            <div
              className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              aria-hidden="true"
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-full px-5 py-2.5 transform -translate-y-3 group-hover:translate-y-0 transition-transform duration-500">
                <span className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <span aria-hidden="true">🔍</span>
                  {dictionary.hoverCta}
                </span>
              </div>
            </div>
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center gap-3 mb-2.5">
            <span className="text-2xl text-gray-700" aria-hidden="true">
              {galleryData.icon}
            </span>
            <h3 className="text-lg font-bold text-gray-900">{groupTitle}</h3>
          </div>

          <p className="text-gray-600 leading-relaxed mb-3 line-clamp-2">
            {galleryData.description}
          </p>

          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 rounded-full px-3 py-1">
              {galleryData.stats}
            </span>

            <button
              onClick={openFirst}
              className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group/btn focus-ring"
            >
              {dictionary.seeAllLabel}
              <span
                className="transform group-hover/btn:translate-x-1 transition-transform duration-200"
                aria-hidden="true"
              >
                →
              </span>
              <span className="sr-only">{seeAllSr}</span>
            </button>
          </div>
        </div>
      </article>
    </li>
  );
});

export default function ProjectsGallery({
  galleries = DEFAULT_GALLERIES,
  dictionary: dictionaryOverride,
  ariaLabelledBy,
  regionLabelId = "projects-gallery-region-title",
}) {
  const dictionary = useMemo(
    () => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride),
    [dictionaryOverride]
  );

  const [isOpen, setIsOpen] = useState(false);
  const [anim, setAnim] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastFocus = useRef(null);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const scrollYRef = useRef(0);
  const liveRef = useRef(null);
  const portalRef = useRef(null);

  const exploreAriaTemplate = dictionary.exploreAria;
  const exploreHiddenLabelTemplate = dictionary.exploreHiddenLabel;
  const cardAltTemplate = dictionary.cardAlt;
  const seeAllSrTemplate = dictionary.seeAllSr;
  const dialogAriaTemplate = dictionary.dialogAria;
  const counterLabelTemplate = dictionary.counterLabel;
  const liveMessageTemplate = dictionary.liveMessage;
  const lightboxAltTemplate = dictionary.lightboxAlt;

  const templates = useMemo(
    () => ({
      cardAltTemplate,
      exploreAriaTemplate,
      exploreHiddenLabelTemplate,
      seeAllSrTemplate,
    }),
    [cardAltTemplate, exploreAriaTemplate, exploreHiddenLabelTemplate, seeAllSrTemplate]
  );

  useEffect(() => {
    if (typeof document === "undefined") return;

    const portalNode = document.createElement("div");
    portalNode.setAttribute("id", "projects-gallery-lightbox");
    portalRef.current = portalNode;
    document.body.appendChild(portalNode);
    setMounted(true);

    return () => {
      if (portalRef.current?.parentNode) {
        portalRef.current.parentNode.removeChild(portalRef.current);
      }
    };
  }, []);

  const handleImageError = useCallback((key) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  }, []);
  const getImageSrc = useCallback(
    (key) => (imageErrors[key] ? "/img/placeholder-service.webp" : key),
    [imageErrors]
  );

  const open = useCallback(
    (groupTitle, images, startIndex = 0) => {
      lastFocus.current = document.activeElement;
      setTitle(groupTitle);
      setItems(images);
      setIndex(startIndex);
      setIsOpen(true);
      setTimeout(() => setAnim(true), 10);

      if (liveRef.current) {
        setTimeout(() => {
          liveRef.current.textContent = formatWithParams(
            liveMessageTemplate,
            DEFAULT_DICTIONARY.liveMessage,
            { title: groupTitle, count: images.length },
            ["title", "count"]
          );
          setTimeout(() => {
            if (liveRef.current) liveRef.current.textContent = "";
          }, 2000);
        }, 80);
      }
    },
    [liveMessageTemplate]
  );

  const close = useCallback(() => {
    setAnim(false);
    setTimeout(() => {
      setIsOpen(false);
      if (lastFocus.current?.focus) lastFocus.current.focus();
    }, 200);
  }, []);

  const prev = useCallback(() => {
    if (items.length <= 1) return;
    setIndex((c) => (c - 1 + items.length) % items.length);
  }, [items]);

  const next = useCallback(() => {
    if (items.length <= 1) return;
    setIndex((c) => (c + 1) % items.length);
  }, [items]);

  useEffect(() => {
    if (!isOpen) return;

    scrollYRef.current = window.scrollY;
    const sw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.overflow = "hidden";
    if (sw > 0) document.body.style.paddingRight = `${sw}px`;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    setTimeout(() => closeBtnRef.current?.focus(), 100);

    return () => {
      const y = scrollYRef.current;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      window.scrollTo(0, y);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close, prev, next]);

  useEffect(() => {
    if (!isOpen || !dialogRef.current) return;

    const dialogNode = dialogRef.current;
    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusableEls = Array.from(
      dialogNode.querySelectorAll(focusableSelectors)
    ).filter((el) => !el.hasAttribute("aria-hidden"));

    if (!focusableEls.length) return;

    const first = focusableEls[0];
    const last = focusableEls[focusableEls.length - 1];

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const active = document.activeElement;

      if (event.shiftKey) {
        if (active === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialogNode.addEventListener("keydown", handleKeyDown);
    return () => dialogNode.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const onTouchStart = useCallback((e) => {
    touchStartX.current = e.touches[0].clientX;
  }, []);
  const onTouchEnd = useCallback(
    (e) => {
      touchEndX.current = e.changedTouches[0].clientX;
      const dx = touchEndX.current - touchStartX.current;
      if (Math.abs(dx) > 50) (dx > 0 ? prev() : next());
    },
    [next, prev]
  );

  const regionHeadingId = ariaLabelledBy ?? regionLabelId;
  const regionHeading =
    dictionary.regionTitleSr ?? DEFAULT_DICTIONARY.regionTitleSr;

  const handleOverlayClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        close();
      }
    },
    [close]
  );

  const galleryEntries = useMemo(
    () => Object.entries(galleries),
    [galleries]
  );

  if (!mounted) {
    return (
      <section
        className="relative pt-2 pb-8 bg-transparent"
        aria-labelledby={regionHeadingId}
      >
        {!ariaLabelledBy && (
          <h2 id={regionHeadingId} className="sr-only">
            {regionHeading}
          </h2>
        )}
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKELETON_ITEMS.map((k) => (
              <div key={k} className="group">
                <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse motion-reduce:animate-none mb-3" />
                <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-1.5" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-1" />
                <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  return (
    <section
      className="relative pt-2 pb-8 bg-transparent"
      aria-labelledby={regionHeadingId}
    >
      {!ariaLabelledBy && (
        <h2 id={regionHeadingId} className="sr-only">
          {regionHeading}
        </h2>
      )}
      <div className="container relative z-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryEntries.map(([groupTitle, galleryData], i) => (
            <GalleryCard
              key={groupTitle}
              dictionary={dictionary}
              galleryData={galleryData}
              getImageSrc={getImageSrc}
              handleImageError={handleImageError}
              index={i}
              open={open}
              prefersReducedMotion={prefersReducedMotion}
              templates={templates}
              groupTitle={groupTitle}
            />
          ))}
        </ul>
      </div>

      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {isOpen && mounted && portalRef.current
        ? createPortal(
            <div
              className={`fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/95 backdrop-blur-md${
                prefersReducedMotion ? "" : " transition-all duration-500"
              } ${anim ? "opacity-100" : "opacity-0"}`}
              role="dialog"
              aria-modal="true"
            aria-label={formatWithParams(
              dialogAriaTemplate,
              DEFAULT_DICTIONARY.dialogAria,
              { title },
              ["title"]
            )}
              onClick={handleOverlayClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              <button
                ref={closeBtnRef}
                className="absolute top-6 right-6 z-10 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-2xl p-4 focus-ring transition-all duration-300 min-h-[52px] min-w-[52px] flex items-center justify-center backdrop-blur-sm border border-white/20"
                onClick={close}
              >
                <span className="text-lg font-bold">✕</span>
                <span className="sr-only">{dictionary.closeLabel}</span>
              </button>

              {items.length > 1 && (
                <>
                  <button
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-2xl w-14 h-14 items-center justify-center text-2xl transition-all duration-300 focus-ring backdrop-blur-sm border border-white/20"
                    onClick={prev}
                  >
                    {dictionary.prevLabel}
                    <span className="sr-only">{dictionary.prevSr}</span>
                  </button>
                  <button
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-2xl w-14 h-14 items-center justify-center text-2xl transition-all duration-300 focus-ring backdrop-blur-sm border border-white/20"
                    onClick={next}
                  >
                    {dictionary.nextLabel}
                    <span className="sr-only">{dictionary.nextSr}</span>
                  </button>
                </>
              )}

              <div className="relative flex w-full h-full items-center justify-center">
                <div
                  className={`relative w-full max-w-6xl h-full max-h-[calc(100vh-220px)] sm:max-h-[calc(100vh-200px)] md:max-h-[calc(100vh-180px)] lg:max-h-[calc(100vh-160px)] ${
                    prefersReducedMotion ? "" : " transition-all duration-500"
                  } ${anim ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
                >
                  <Image
                    key={items[index]}
                    src={getImageSrc(items[index])}
                    alt={formatWithParams(
                      lightboxAltTemplate,
                      DEFAULT_DICTIONARY.lightboxAlt,
                      { title, index: index + 1 },
                      ["title", "index"]
                    )}
                    fill
                    className="object-contain rounded-xl"
                    sizes={LIGHTBOX_SIZES}
                    quality={70}
                    priority
                    loading="eager"
                    decoding="sync"
                    onError={() => handleImageError(items[index])}
                  />
                </div>
              </div>

              {items.length > 1 && (
                <>
                  <div className="md:hidden fixed inset-x-0 bottom-0 z-[1000] bg-black/80 backdrop-blur-lg border-t border-white/20 py-4">
                    <div className="mx-auto max-w-sm flex items-center justify-between gap-3 px-4">
                      <button
                        onClick={prev}
                        className="flex-1 rounded-xl bg-white/20 text-white py-4 font-semibold text-sm transition-all duration-300 hover:bg-white/30 focus-ring min-h-[52px] backdrop-blur-sm border border-white/20"
                      >
                        {dictionary.mobilePrevLabel}
                      </button>
                      <span className="text-white text-sm font-medium px-2">
                        {formatWithParams(
                          counterLabelTemplate,
                          DEFAULT_DICTIONARY.counterLabel,
                          { index: index + 1, total: items.length },
                          ["index", "total"]
                        )}
                      </span>
                      <button
                        onClick={next}
                        className="flex-1 rounded-xl bg-white/20 text-white py-4 font-semibold text-sm transition-all duration-300 hover:bg-white/30 focus-ring min-h-[52px] backdrop-blur-sm border border-white/20"
                      >
                        {dictionary.mobileNextLabel}
                      </button>
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
                    <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                      <span className="text-white text-sm font-medium">
                        {formatWithParams(
                          counterLabelTemplate,
                          DEFAULT_DICTIONARY.counterLabel,
                          { index: index + 1, total: items.length },
                          ["index", "total"]
                        )}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>,
            portalRef.current
          )
        : null}
    </section>
  );
}
