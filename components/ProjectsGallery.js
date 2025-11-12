// components/ProjectsGallery.js
"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import Image from "next/image";

const COVER_SIZES =
  "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw";
const LIGHTBOX_SIZES =
  "(max-width: 768px) 100vw, (max-width: 1200px) 90vw, min(1024px, 80vw)";

const GALLERIES = {
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

// Optimized Image Component
function OptimizedImage({ 
  src, 
  alt, 
  sizes, 
  className, 
  quality = 75,
  priority = false,
  onError 
}) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      quality={quality}
      priority={priority}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      onError={onError}
    />
  );
}

export default function ProjectsGallery() {
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
  const scrollYRef = useRef(0);
  const liveRef = useRef(null);

  // Performance optimization: Mount state
  useEffect(() => {
    setMounted(true);
  }, []);

  // Error handling for images
  const handleImageError = useCallback((key) => {
    setImageErrors((prev) => ({ ...prev, [key]: true }));
  }, []);

  const getImageSrc = useCallback((key) =>
    imageErrors[key] ? "/img/placeholder-service.webp" : key
  , [imageErrors]);

  // Lightbox controls
  const open = useCallback((groupTitle, images, startIndex = 0) => {
    lastFocus.current = document.activeElement;
    setTitle(groupTitle);
    setItems(images);
    setIndex(startIndex);
    setIsOpen(true);
    
    // RAF for better performance
    requestAnimationFrame(() => {
      setAnim(true);
    });

    // Accessibility announcement
    if (liveRef.current) {
      setTimeout(() => {
        liveRef.current.textContent = `${groupTitle} galerisi açıldı, ${images.length} profesyonel proje`;
        setTimeout(() => {
          if (liveRef.current) liveRef.current.textContent = "";
        }, 2000);
      }, 80);
    }
  }, []);

  const close = useCallback(() => {
    setAnim(false);
    setTimeout(() => {
      setIsOpen(false);
      // Restore focus safely
      if (lastFocus.current?.focus && typeof lastFocus.current.focus === 'function') {
        lastFocus.current.focus();
      }
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

  // Lightbox effects and event listeners
  useEffect(() => {
    if (!isOpen) return;

    // Store scroll position and lock body
    scrollYRef.current = window.scrollY;
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollYRef.current}px`;
    document.body.style.overflow = "hidden";
    document.body.style.width = "100%";
    
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }

    // Keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };

    window.addEventListener("keydown", handleKeyDown);
    
    // Focus management
    setTimeout(() => {
      if (closeBtnRef.current) {
        closeBtnRef.current.focus();
      }
    }, 100);

    // Cleanup
    return () => {
      const scrollY = scrollYRef.current;
      
      // Restore body styles
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.overflow = "";
      document.body.style.width = "";
      document.body.style.paddingRight = "";
      
      // Restore scroll position
      window.scrollTo(0, scrollY);
      
      // Remove event listener
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, close, prev, next]);

  // Touch handlers for mobile
  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const onTouchEnd = (e) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const deltaX = touchEndX.current - touchStartX.current;
    if (Math.abs(deltaX) > 50) {
      deltaX > 0 ? prev() : next();
    }
  };

  // Reduced motion preference
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      setPrefersReducedMotion(mediaQuery.matches);
      
      const handleChange = (e) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener("change", handleChange);
      
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  // Loading skeleton
  if (!mounted) {
    return (
      <section 
        className="relative pt-2 pb-8 bg-transparent" 
        aria-labelledby="projeler-title"
        style={{ contain: 'layout style paint' }} // CLS önleme
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((k) => (
              <div key={k} className="group" style={{ minHeight: '480px' }}> {/* Fixed height for CLS */}
                <div className="h-80 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl animate-pulse mb-3" />
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

  return (
    <section 
      className="relative pt-2 pb-8 bg-transparent" 
      aria-labelledby="projeler-title"
      style={{ contain: 'layout style paint' }} // CLS önleme
    >
      <div className="container relative z-10">
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Object.entries(GALLERIES).map(([groupTitle, galleryData], i) => {
            const images = galleryData.images;
            const cover = images[0];

            return (
              <li key={groupTitle}>
                <article 
                  className="group relative bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-gray-200/60 hover:border-blue-200/80 overflow-hidden"
                  style={{ minHeight: '480px' }} // Fixed height for CLS
                >
                  <div className="relative h-80 overflow-hidden">
                    <button
                      type="button"
                      onClick={() => open(groupTitle, images, 0)}
                      aria-label={`Galeriyi İncele — ${groupTitle} (${images.length} proje)`}
                      className="absolute inset-0 w-full h-full focus:outline-none focus:ring-4 focus:ring-blue-500/50 rounded-t-2xl"
                    >
                      <span className="sr-only">
                        Galeriyi İncele — {groupTitle} ({images.length} proje)
                      </span>

                      <OptimizedImage
                        src={getImageSrc(cover)}
                        alt={`${groupTitle} - Sahneva profesyonel kurulum referansı`}
                        sizes={COVER_SIZES}
                        className={`object-cover transition-transform duration-700 ${
                          prefersReducedMotion ? "" : "group-hover:scale-110"
                        }`}
                        quality={75}
                        priority={i === 0} // LCP optimization for first image
                        onError={() => handleImageError(cover)}
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
                            Galeriyi İncele
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
                        onClick={() => open(groupTitle, images, 0)}
                        className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 flex items-center gap-1 group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/70"
                        aria-label={`${groupTitle} galerisini aç (${images.length} proje)`}
                      >
                        Tümünü Gör
                        <span
                          className="transform group-hover/btn:translate-x-1 transition-transform duration-200"
                          aria-hidden="true"
                        >
                          →
                        </span>
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>

      {/* Accessibility live region */}
      <div ref={liveRef} aria-live="polite" aria-atomic="true" className="sr-only" />

      {/* Lightbox */}
      {isOpen && (
        <div
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-md ${
            prefersReducedMotion ? "" : "transition-all duration-300"
          } ${anim ? "opacity-100" : "opacity-0"}`}
          role="dialog"
          aria-modal="true"
          aria-label={`${title} profesyonel proje galerisi`}
          onClick={(e) => e.target === e.currentTarget && close()}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
        >
          <button
            ref={closeBtnRef}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 rounded-2xl p-3 sm:p-4 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 transition-all duration-300 min-h-[44px] min-w-[44px] flex items-center justify-center backdrop-blur-sm border border-white/20"
            onClick={close}
            aria-label="Galeriyi kapat"
          >
            <span className="text-lg font-bold">✕</span>
          </button>

          {items.length > 1 && (
            <>
              <button
                className="hidden md:flex absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-2xl w-12 h-12 sm:w-14 sm:h-14 items-center justify-center text-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 backdrop-blur-sm border border-white/20"
                onClick={prev}
                aria-label="Önceki proje"
              >
                ‹
              </button>
              <button
                className="hidden md:flex absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-2xl w-12 h-12 sm:w-14 sm:h-14 items-center justify-center text-2xl transition-all duration-300 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50 backdrop-blur-sm border border-white/20"
                onClick={next}
                aria-label="Sonraki proje"
              >
                ›
              </button>
            </>
          )}

          <div
            className={`relative w-full max-w-6xl aspect-[16/10] ${
              prefersReducedMotion ? "" : "transition-all duration-300"
            } ${anim ? "scale-100 opacity-100" : "scale-90 opacity-0"}`}
          >
            <OptimizedImage
              key={items[index]}
              src={getImageSrc(items[index])}
              alt={`${title} - ${index + 1}. profesyonel referans projemiz`}
              sizes={LIGHTBOX_SIZES}
              className="object-contain rounded-xl"
              quality={80}
              priority={true}
              onError={() => handleImageError(items[index])}
            />
          </div>

          {items.length > 1 && (
            <>
              {/* Mobile controls */}
              <div className="md:hidden fixed inset-x-0 bottom-0 z-50 bg-black/80 backdrop-blur-lg border-t border-white/20 py-4">
                <div className="mx-auto max-w-sm flex items-center justify-between gap-3 px-4">
                  <button
                    onClick={prev}
                    className="flex-1 rounded-xl bg-white/20 text-white py-3 font-semibold text-sm transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] backdrop-blur-sm border border-white/20"
                    aria-label="Önceki proje"
                  >
                    ‹ Önceki
                  </button>
                  <span className="text-white text-sm font-medium px-2">
                    {index + 1} / {items.length}
                  </span>
                  <button
                    onClick={next}
                    className="flex-1 rounded-xl bg-white/20 text-white py-3 font-semibold text-sm transition-all duration-300 hover:bg-white/30 focus:outline-none focus:ring-2 focus:ring-white/50 min-h-[48px] backdrop-blur-sm border border-white/20"
                    aria-label="Sonraki proje"
                  >
                    Sonraki ›
                  </button>
                </div>
              </div>

              {/* Desktop counter */}
              <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 hidden md:block">
                <div className="bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
                  <span className="text-white text-sm font-medium">
                    {index + 1} / {items.length}
                  </span>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </section>
  );
}
