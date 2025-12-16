// components/CaseGallery.js
"use client";

import Image from "next/image";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

function CaseGallery({ images = [], visibleCount = 4 }) {
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const lastFocus = useRef(null);
  const scrollYRef = useRef(0);
  const dialogRef = useRef(null);
  const closeBtnRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Component mount kontrolü
  useEffect(() => {
    setIsMounted(true);
  }, []);

  const openLightbox = useCallback(
    (index) => {
      if (!isMounted) return;

      lastFocus.current = document.activeElement;
      setCurrentIndex(index);
      setOpen(true);
    },
    [isMounted]
  );

  const closeLightbox = useCallback(() => {
    setOpen(false);
  }, []);

  const navigate = useCallback(
    (direction) => {
      setCurrentIndex((prev) => {
        if (!images.length) return prev;

        if (direction === "prev") {
          return prev === 0 ? images.length - 1 : prev - 1;
        }
        return prev === images.length - 1 ? 0 : prev + 1;
      });
    },
    [images.length]
  );

  const handleBackdropClick = useCallback(
    (event) => {
      if (event.target === event.currentTarget) {
        closeLightbox();
      }
    },
    [closeLightbox]
  );

  const handlePrev = useCallback(() => navigate("prev"), [navigate]);
  const handleNext = useCallback(() => navigate("next"), [navigate]);

  // Lightbox açıkken body scroll kilidi + klavye kontrolleri
  useEffect(() => {
    if (!open || !isMounted) return;

    const body = document.body;
    scrollYRef.current = window.scrollY;

    // Scroll kilidi
    const previousStyles = {
      position: body.style.position,
      top: body.style.top,
      overflow: body.style.overflow,
      width: body.style.width,
    };

    body.style.position = "fixed";
    body.style.top = `-${scrollYRef.current}px`;
    body.style.overflow = "hidden";
    body.style.width = "100%";

    // Odak yönetimi
    const focusElement = closeBtnRef.current || dialogRef.current;
    if (focusElement) {
      setTimeout(() => focusElement.focus(), 50);
    }

    // Klavye olayları
    const handleKeyDown = (e) => {
      switch (e.key) {
        case "Escape":
          e.preventDefault();
          closeLightbox();
          break;
        case "ArrowLeft":
          e.preventDefault();
          navigate("prev");
          break;
        case "ArrowRight":
          e.preventDefault();
          navigate("next");
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    // Temizleme
    return () => {
      window.removeEventListener("keydown", handleKeyDown);

      // Scroll kilidini kaldır
      body.style.position = previousStyles.position;
      body.style.top = previousStyles.top;
      body.style.overflow = previousStyles.overflow;
      body.style.width = previousStyles.width;

      if (scrollYRef.current !== undefined) {
        window.scrollTo(0, scrollYRef.current);
      }

      // Önceki odağa dön
      if (lastFocus.current?.focus) {
        setTimeout(() => lastFocus.current.focus(), 50);
      }
    };
  }, [closeLightbox, navigate, open, isMounted, images.length]);

  // Görüntülenecek thumbnail'leri belirle
  const displayImages = useMemo(
    () => (visibleCount ? images.slice(0, visibleCount) : images),
    [images, visibleCount]
  );

  if (!isMounted) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {displayImages.map((_, i) => (
          <div
            key={i}
            className="relative aspect-[16/9] overflow-hidden rounded-xl border bg-gray-200 animate-pulse"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Thumbnail Grid */}
      <div
        className={`grid gap-3 ${
          displayImages.length === 1
            ? "grid-cols-1 max-w-md mx-auto"
            : displayImages.length === 2
            ? "grid-cols-2 max-w-2xl mx-auto"
            : displayImages.length === 3
            ? "grid-cols-3 max-w-3xl mx-auto"
            : "grid-cols-2 md:grid-cols-4"
        }`}
        aria-label="Proje galerisi"
      >
        {displayImages.map((img, index) => (
          <button
            key={`${img.src}-${index}`}
            type="button"
            className="relative aspect-[16/9] overflow-hidden rounded-xl border-2 border-gray-200 bg-white hover:border-blue-500 hover:shadow-lg transition-all duration-300 group focus-ring"
            onClick={() => openLightbox(index)}
            aria-label={`${
              img.alt || `Galerideki ${index + 1}. görsel`
            } - Görseli büyüt`}
          >
            <Image
              src={img.src}
              alt={img.alt || `Galerideki ${index + 1}. görsel`}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              // Performans: sadece ilk görsel eager, diğerleri lazy
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              quality={75}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span
                className="bg-black/50 text-white rounded-full p-2 transform scale-75 group-hover:scale-100 transition-transform duration-300"
                aria-hidden="true"
              >
                🔍
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Gizli görseller için bilgi (screen reader için) */}
      {visibleCount && images.length > visibleCount && (
        <p className="sr-only">
          Galeride {images.length - visibleCount} adet daha görsel bulunmaktadır.
          Lightbox açıldığında tüm görselleri görebilirsiniz.
        </p>
      )}

      {/* Lightbox/Modal */}
      {open && isMounted && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="lightbox-title"
          aria-describedby="lightbox-description"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 nc-CaseGallery-lightbox-1"
          onClick={handleBackdropClick}
        >
          {/* Erişilebilir başlık ve açıklama */}
          <h2 id="lightbox-title" className="sr-only">
            Görsel Galerisi
          </h2>
          <p id="lightbox-description" className="sr-only">
            {images[currentIndex]?.alt || "Görsel"}.
            {images.length > 1
              ? ` ${currentIndex + 1} / ${images.length}. `
              : " "}
            Esc tuşuyla kapatabilir, sol ve sağ ok tuşlarıyla gezinebilirsiniz.
          </p>

          {/* Kapat butonu */}
          <button
            ref={closeBtnRef}
            type="button"
            className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-10 h-10 flex items-center justify-center transition-all duration-200 focus-ring backdrop-blur-sm"
            onClick={closeLightbox}
            aria-label="Galeriyi kapat"
          >
            <span aria-hidden="true">✕</span>
          </button>

          {/* Görsel sayacı */}
          {images.length > 1 && (
            <div className="absolute top-4 left-4 z-10 bg-black/50 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              <span className="font-medium">{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{images.length}</span>
            </div>
          )}

          {/* Önceki butonu */}
            {images.length > 1 && (
              <button
                type="button"
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus-ring backdrop-blur-sm md:left-6"
                onClick={handlePrev}
                aria-label="Önceki görsel"
              >
                <span aria-hidden="true" className="text-2xl">
                ‹
              </span>
            </button>
          )}

          {/* Ana görsel container */}
          <div className="relative w-full max-w-6xl h-full flex items-center justify-center">
            <div className="relative w-full h-full max-h-[80vh] flex items-center justify-center">
              <Image
                key={images[currentIndex]?.src}
                src={images[currentIndex]?.src || ""}
                alt={
                  images[currentIndex]?.alt ||
                  `Galerideki ${currentIndex + 1}. görsel`
                }
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
                className="object-contain"
                quality={90}
                loading="eager"
                decoding="async"
              />
            </div>
          </div>

          {/* Sonraki butonu */}
            {images.length > 1 && (
              <button
                type="button"
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white rounded-full w-12 h-12 flex items-center justify-center transition-all duration-200 focus-ring backdrop-blur-sm md:right-6"
                onClick={handleNext}
                aria-label="Sonraki görsel"
              >
                <span aria-hidden="true" className="text-2xl">
                ›
              </span>
            </button>
          )}

          {/* Görsel açıklaması */}
          {images[currentIndex]?.alt && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 bg-black/70 text-white px-4 py-2 rounded-lg max-w-2xl text-center backdrop-blur-sm">
              <p className="text-sm font-medium">
                {images[currentIndex].alt}
              </p>
            </div>
          )}

          {/* Mobil navigasyon */}
          {images.length > 1 && (
              <div className="md:hidden absolute bottom-4 inset-x-4 flex justify-between">
                <button
                  type="button"
                  className="flex-1 max-w-[120px] bg-white/10 hover:bg-white/20 text-white py-3 rounded-l-lg transition-colors duration-200 focus-ring"
                  onClick={handlePrev}
                  aria-label="Önceki görsel"
                >
                  Önceki
                </button>
                <button
                  type="button"
                  className="flex-1 max-w-[120px] bg-white/10 hover:bg-white/20 text-white py-3 rounded-r-lg transition-colors duration-200 focus-ring"
                  onClick={handleNext}
                  aria-label="Sonraki görsel"
                >
                  Sonraki
              </button>
            </div>
          )}

          {/* Küçük resim önizlemeleri (desktop) */}
          {images.length > 1 && (
            <div className="hidden md:flex absolute bottom-4 left-1/2 -translate-x-1/2 gap-2 max-w-full overflow-x-auto px-4 py-2">
              {images.map((img, index) => (
                <button
                  key={`thumb-${index}`}
                  type="button"
                  className={`flex-shrink-0 w-16 h-12 relative rounded border-2 transition-all duration-200 focus-ring ${
                    index === currentIndex
                      ? "border-white scale-110"
                      : "border-white/30 hover:border-white/60"
                  }`}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`${
                    index + 1
                  }. görsele git: ${
                    img.alt || `Galerideki ${index + 1}. görsel`
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `Galerideki ${index + 1}. görsel küçük önizleme`}
                    fill
                    sizes="64px"
                    className="object-cover rounded"
                    quality={50}
                    loading="lazy"
                    decoding="async"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default React.memo(CaseGallery);
