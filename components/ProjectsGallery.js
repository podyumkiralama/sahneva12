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
import { ScrollReveal } from "@/components/ScrollReveal";

// —————————————————————————————————————————
// AYARLAR & VERİLER
// —————————————————————————————————————————

const COVER_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const LIGHTBOX_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, min(1024px, 80vw)";

const DEFAULT_GALLERIES = {
  "LED Ekran Kiralama": {
    images: Array.from({ length: 36 }, (_, i) => `/img/galeri/led-ekran-kiralama-${i + 1}.webp`),
    description: "Yüksek çözünürlüklü LED ekran kurulumları ve profesyonel etkinlik prodüksiyonları.",
    stats: "50+ Kurumsal Etkinlik",
    icon: "🖥️",
  },
  "Çadır Kiralama": {
    images: Array.from({ length: 19 }, (_, i) => `/img/galeri/cadir-kiralama-${i + 1}.webp`),
    description: "Açık hava etkinlikleri için premium çadır kurulumları ve profesyonel çözümler.",
    stats: "100+ Açık Hava Projesi",
    icon: "⛺",
  },
  "Podyum Kiralama": {
    images: Array.from({ length: 36 }, (_, i) => `/img/galeri/podyum-kiralama-${i + 1}.webp`),
    description: "Profesyonel podyum kurulumları ve modüler podyum sistemleri.",
    stats: "200+ Profesyonel Kurulum",
    icon: "👑",
  },
};

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R";

const DEFAULT_DICTIONARY = {
  sectionTitle: "Referans Projelerimiz",
  sectionDesc: "Türkiye'nin önde gelen markaları için gerçekleştirdiğimiz sahne, podyum ve teknik prodüksiyon çalışmalarından seçkiler.",
  exploreAria: "Galeriyi İncele — {{title}} ({{count}} görsel)",
  exploreHiddenLabel: "Galeriyi İncele — {{title}} ({{count}} görsel)",
  hoverCta: "İncele",
  cardAlt: "{{title}} - Sahneva profesyonel kurulum referansı",
  seeAllLabel: "Tümünü Gör",
  seeAllSr: " — {{title}} ({{count}} görsel)",
  dialogAria: "{{title}} profesyonel proje galerisi",
  closeLabel: "Galeriyi kapat",
  prevLabel: "‹ Önceki",
  prevSr: "Önceki proje",
  nextLabel: "Sonraki ›",
  nextSr: "Sonraki proje",
  mobilePrevLabel: "‹ Geri",
  mobileNextLabel: "İleri ›",
  counterLabel: "{{index}} / {{total}}",
  liveMessage: "{{title}} galerisi açıldı, {{count}} görsel yüklendi",
  lightboxAlt: "{{title}} - {{index}}. referans görseli",
  regionTitleSr: "Profesyonel projeler galeri içeriği",
};

const TEMPLATE_PATTERN = /\{\{\s*(\w+)\s*\}\}/g;

// —————————————————————————————————————————
// YARDIMCI FONKSİYONLAR
// —————————————————————————————————————————

function formatWithParams(template, fallback, params, order = []) {
  const source = template ?? fallback;
  if (typeof source === "function") return source(...order.map((key) => params[key]));
  if (typeof source === "string") {
    return source.replace(TEMPLATE_PATTERN, (_, key) => {
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
    if (value && typeof value === "object" && !Array.isArray(value) && typeof base[key] === "object") {
      result[key] = mergeDictionary(base[key], value);
    } else if (value !== undefined) {
      result[key] = value;
    }
  }
  return result;
}

// —————————————————————————————————————————
// GALERİ KARTI BİLEŞENİ (Dark Mode & Glass)
// —————————————————————————————————————————

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
  const { cardAltTemplate, exploreAriaTemplate, exploreHiddenLabelTemplate, seeAllSrTemplate } = templates;
  const images = galleryData.images;
  const cover = images[0];

  const exploreAria = useMemo(() => formatWithParams(exploreAriaTemplate, DEFAULT_DICTIONARY.exploreAria, { title: groupTitle, count: images.length }, ["title", "count"]), [exploreAriaTemplate, groupTitle, images.length]);
  const exploreHiddenLabel = useMemo(() => formatWithParams(exploreHiddenLabelTemplate, DEFAULT_DICTIONARY.exploreHiddenLabel, { title: groupTitle, count: images.length }, ["title", "count"]), [exploreHiddenLabelTemplate, groupTitle, images.length]);
  const cardAlt = useMemo(() => formatWithParams(cardAltTemplate, DEFAULT_DICTIONARY.cardAlt, { title: groupTitle }, ["title"]), [cardAltTemplate, groupTitle]);
  const seeAllSr = useMemo(() => formatWithParams(seeAllSrTemplate, DEFAULT_DICTIONARY.seeAllSr, { title: groupTitle, count: images.length }, ["title", "count"]), [groupTitle, images.length, seeAllSrTemplate]);

  const openFirst = useCallback(() => open(groupTitle, images, 0), [groupTitle, images, open]);
  const handleCoverError = useCallback(() => handleImageError(cover), [cover, handleImageError]);

  return (
    <article className="group relative flex flex-col bg-white/5 border border-white/10 rounded-3xl shadow-2xl backdrop-blur-sm transition-all duration-500 overflow-hidden hover:-translate-y-2 hover:border-white/20 h-full">
      
      {/* GÖRSEL ALANI */}
      <div className="relative h-64 overflow-hidden">
        <button
          type="button"
          onClick={openFirst}
          aria-label={exploreAria}
          className="absolute inset-0 w-full h-full focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-500/50 cursor-zoom-in"
        >
          <span className="sr-only">{exploreHiddenLabel}</span>

          <Image
            src={getImageSrc(cover)}
            alt={cardAlt}
            fill
            className={`object-cover transition-transform duration-700 ${prefersReducedMotion ? "" : "group-hover:scale-110"}`}
            sizes={COVER_SIZES}
            quality={index === 0 ? 75 : 65}
            loading={index === 0 ? "eager" : "lazy"}
            blurDataURL={BLUR_DATA_URL}
            placeholder="blur"
            onError={handleCoverError}
          />

          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B1120] via-transparent to-transparent opacity-80" />

          {/* Hover Efekti: Büyüteç */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              <span className="font-bold text-white text-sm flex items-center gap-2">
                <span>🔍</span>
                {dictionary.hoverCta}
              </span>
            </div>
          </div>
          
          {/* Badge */}
          <div className="absolute top-4 right-4">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-emerald-400 border border-emerald-500/30 shadow-lg">
                Referans
            </span>
          </div>
        </button>
      </div>

      {/* İÇERİK ALANI */}
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-start gap-4 mb-3">
          <div className="w-10 h-10 shrink-0 bg-white/10 backdrop-blur-md border border-white/20 rounded-lg flex items-center justify-center text-xl shadow-lg">
            {galleryData.icon}
          </div>
          <div>
            <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
              {groupTitle}
            </h3>
            <p className="text-xs text-blue-300/80 font-medium mt-1">
              {galleryData.stats}
            </p>
          </div>
        </div>

        <p className="text-slate-400 leading-relaxed text-sm mb-6 line-clamp-2 flex-1 border-l-2 border-white/10 pl-3">
          {galleryData.description}
        </p>

        <div className="pt-4 border-t border-white/10 mt-auto">
          <button
            onClick={openFirst}
            className="w-full inline-flex items-center justify-between font-bold text-sm text-white hover:text-blue-400 transition-colors group/btn focus:outline-none"
          >
            <span>{dictionary.seeAllLabel}</span>
            <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center group-hover/btn:bg-blue-500 group-hover/btn:text-white transition-all">
               <span aria-hidden="true" className="text-xs">➜</span>
            </div>
            <span className="sr-only">{seeAllSr}</span>
          </button>
        </div>
      </div>
    </article>
  );
});

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function ProjectsGallery({
  galleries = DEFAULT_GALLERIES,
  dictionary: dictionaryOverride,
  ariaLabelledBy,
  regionLabelId = "projects-gallery-title",
}) {
  const dictionary = useMemo(() => mergeDictionary(DEFAULT_DICTIONARY, dictionaryOverride), [dictionaryOverride]);

  const [isOpen, setIsOpen] = useState(false);
  const [anim, setAnim] = useState(false);
  const [title, setTitle] = useState("");
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [imageErrors, setImageErrors] = useState({});

  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const lastFocus = useRef(null);
  const closeBtnRef = useRef(null);
  const dialogRef = useRef(null);
  const scrollYRef = useRef(0);
  const liveRef = useRef(null);
  const portalRef = useRef(null);

  const templates = useMemo(() => ({
    cardAltTemplate: dictionary.cardAlt,
    exploreAriaTemplate: dictionary.exploreAria,
    exploreHiddenLabelTemplate: dictionary.exploreHiddenLabel,
    seeAllSrTemplate: dictionary.seeAllSr,
  }), [dictionary.cardAlt, dictionary.exploreAria, dictionary.exploreHiddenLabel, dictionary.seeAllSr]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    const portalNode = document.createElement("div");
    portalNode.setAttribute("id", "projects-gallery-lightbox");
    portalRef.current = portalNode;
    document.body.appendChild(portalNode);
    setMounted(true);
    return () => {
      if (portalRef.current?.parentNode) portalRef.current.parentNode.removeChild(portalRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotionPreference = (event) => setPrefersReducedMotion(event.matches);
    updateMotionPreference(media);
    if (media.addEventListener) media.addEventListener("change", updateMotionPreference);
    else media.addListener(updateMotionPreference);
    return () => {
      if (media.removeEventListener) media.removeEventListener("change", updateMotionPreference);
      else media.removeListener(updateMotionPreference);
    };
  }, []);

  const handleImageError = useCallback((key) => setImageErrors((prev) => ({ ...prev, [key]: true })), []);
  const getImageSrc = useCallback((key) => (imageErrors[key] ? "/img/placeholder-service.webp" : key), [imageErrors]);

  const open = useCallback((groupTitle, images, startIndex = 0) => {
    lastFocus.current = document.activeElement;
    setTitle(groupTitle);
    setItems(images);
    setIndex(startIndex);
    setIsOpen(true);
    setTimeout(() => setAnim(true), 10);
    if (liveRef.current) {
      setTimeout(() => {
        liveRef.current.textContent = formatWithParams(dictionary.liveMessage, DEFAULT_DICTIONARY.liveMessage, { title: groupTitle, count: images.length }, ["title", "count"]);
        setTimeout(() => { if (liveRef.current) liveRef.current.textContent = ""; }, 2000);
      }, 80);
    }
  }, [dictionary.liveMessage]);

  const close = useCallback(() => {
    setAnim(false);
    setTimeout(() => {
      setIsOpen(false);
      if (lastFocus.current?.focus) lastFocus.current.focus();
    }, 200);
  }, []);

  const prev = useCallback(() => { if (items.length <= 1) return; setIndex((c) => (c - 1 + items.length) % items.length); }, [items]);
  const next = useCallback(() => { if (items.length <= 1) return; setIndex((c) => (c + 1) % items.length); }, [items]);

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

  const onTouchStart = useCallback((e) => { touchStartX.current = e.touches[0].clientX; }, []);
  const onTouchEnd = useCallback((e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const dx = touchEndX.current - touchStartX.current;
    if (Math.abs(dx) > 50) (dx > 0 ? prev() : next());
  }, [next, prev]);

  const handleOverlayClick = useCallback((event) => { if (event.target === event.currentTarget) close(); }, [close]);
  const galleryEntries = useMemo(() => Object.entries(galleries), [galleries]);

  if (!mounted) {
    return (
      <section className="relative py-16 bg-[#0B1120] border-t border-white/5">
        <div className="container px-4 mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {SKELETON_ITEMS.map(k => <div key={k} className="h-80 bg-white/5 rounded-3xl animate-pulse" />)}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative py-16 md:py-24 bg-[#0B1120] border-t border-white/5 overflow-hidden" aria-labelledby={regionLabelId}>
      {/* Arka Plan Efektleri */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full mix-blend-screen"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full mix-blend-screen"></div>
      </div>

      <div className="container relative z-10 px-4 mx-auto">
        
        {/* Başlık Alanı (SEO) */}
        {!ariaLabelledBy && (
            <ScrollReveal direction="up" delay="0.05">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 id={regionLabelId} className="text-3xl md:text-5xl font-bold text-white mb-6 leading-tight">
                        {dictionary.sectionTitle}
                    </h2>
                    <p className="text-slate-400 text-lg md:text-xl leading-relaxed">
                        {dictionary.sectionDesc}
                    </p>
                </div>
            </ScrollReveal>
        )}

        {/* Galeri Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryEntries.map(([groupTitle, galleryData], i) => (
             <ScrollReveal key={groupTitle} direction="up" delay={0.1 + (i * 0.1)}>
                <GalleryCard
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
            </ScrollReveal>
          ))}
        </ul>
      </div>

      <div ref={liveRef} aria-live="polite" className="sr-only" />

      {/* LIGHTBOX PORTAL */}
      {isOpen && mounted && portalRef.current
        ? createPortal(
            <div
              className={`fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-xl ${prefersReducedMotion ? "" : " transition-all duration-300"} ${anim ? "opacity-100" : "opacity-0"}`}
              role="dialog"
              aria-modal="true"
              aria-label={formatWithParams(dictionary.dialogAria, DEFAULT_DICTIONARY.dialogAria, { title }, ["title"])}
              onClick={handleOverlayClick}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEnd}
            >
              {/* Kapat Butonu */}
              <button
                ref={closeBtnRef}
                className="absolute top-6 right-6 z-20 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                onClick={close}
                title={dictionary.closeLabel}
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {items.length > 1 && (
                <>
                  <button
                    className="hidden md:flex absolute left-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full w-14 h-14 items-center justify-center transition-all border border-white/10 backdrop-blur-sm"
                    onClick={prev}
                    title={dictionary.prevLabel}
                  >
                     <span className="text-3xl pb-1">‹</span>
                  </button>
                  <button
                    className="hidden md:flex absolute right-6 top-1/2 -translate-y-1/2 z-10 text-white/70 hover:text-white bg-black/40 hover:bg-black/60 rounded-full w-14 h-14 items-center justify-center transition-all border border-white/10 backdrop-blur-sm"
                    onClick={next}
                    title={dictionary.nextLabel}
                  >
                     <span className="text-3xl pb-1">›</span>
                  </button>
                </>
              )}

              <div className="relative w-full h-full max-w-7xl max-h-screen p-4 md:p-10 flex items-center justify-center">
                 <div className={`relative w-full h-full flex items-center justify-center ${anim ? "scale-100 opacity-100" : "scale-95 opacity-0"} transition-all duration-300`}>
                    <Image
                        key={items[index]}
                        src={getImageSrc(items[index])}
                        alt={formatWithParams(dictionary.lightboxAlt, DEFAULT_DICTIONARY.lightboxAlt, { title, index: index + 1 }, ["title", "index"])}
                        fill
                        className="object-contain"
                        sizes={LIGHTBOX_SIZES}
                        quality={85}
                        priority
                        onError={() => handleImageError(items[index])}
                    />
                 </div>
              </div>

              {/* Alt Bilgi (Mobil + Desktop) */}
              <div className="absolute bottom-8 left-0 right-0 text-center pointer-events-none">
                 <div className="inline-block bg-black/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/10">
                    <span className="text-white font-medium text-sm tracking-wide">
                        {formatWithParams(dictionary.counterLabel, DEFAULT_DICTIONARY.counterLabel, { index: index + 1, total: items.length }, ["index", "total"])}
                    </span>
                 </div>
              </div>

            </div>,
            portalRef.current
          )
        : null}
    </section>
  );
}
