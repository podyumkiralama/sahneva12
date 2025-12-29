// components/StickyVideoRail.jsx
"use client";

import { useEffect, useId, useRef, useState } from "react";
import DeferredHydration from "@/components/DeferredHydration.client";

const VIDEOS = [
  {
    id: "173gBurWSRQ",
    title:
      "Sahneva Organizasyon – LED Ekran podyum sahne kurulumu  & Sahne Kurulum Öncesi",
    description: "Backstage, sahne kurulumu ve hazırlık görüntüleri.",
    thumbnail: "https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg",
  },
  {
    id: "4ygMbL4FDRc",
    title: "Sahneva Organizasyon – LED Ekran podyum çadır & Sahne Kurulum",
    description: "LED ekran kurulum ve sahne ışıklandırma süreci.",
    thumbnail: "https://img.youtube.com/vi/4ygMbL4FDRc/hqdefault.jpg",
  },
  {
    id: "JNzGlNzNRuk",
    title: "Sahneva Organizasyon – LED Ekran Çadır podyum & Sahne Kurulum",
    description: "Podyum Sahne dom çadır kiralama kurulum süreci.",
    thumbnail: "https://img.youtube.com/vi/JNzGlNzNRuk/hqdefault.jpg",
  },
  {
    id: "_9Q7v0ZL304",
    title:
      "Sahneva Organizasyon – LED Ekran Çadır Masa sandalye podyum kiralama ",
    description: "Podyum Sahne masa sandalye çadır kiralama kurulum süreci.",
    thumbnail: "https://img.youtube.com/vi/_9Q7v0ZL304/hqdefault.jpg",
  },
  {
    id: "ah4ORjaQSMA",
    title:
      "Üniversite Mezuniyet Töreni Organizasyonu | Sahne, LED Ekran ve Ses–Işık Prodüksiyon",
    description:
      "Üniversite mezuniyet törenleri için profesyonel sahne, LED ekran, ses–ışık sistemleri ve tüm teknik prodüksiyon altyapısını sağlayarak kurumlara eksiksiz bir mezuniyet deneyimi sunuyoruz",
    thumbnail: "https://img.youtube.com/vi/ah4ORjaQSMA/hqdefault.jpg",
  },
  {
    id: "c72ILTyJH4A",
    title:
      "Helal Fuarı Organizasyonu | Sahneva Profesyonel Sahne, LED Ekran ve Teknik Prodüksiyon",
    description:
      "Helal Fuarı kapsamında gerçekleştirilen etkinlik ve organizasyon alanlarının sahne, LED ekran, ses–ışık ve teknik prodüksiyon kurulumlarını Sahneva olarak profesyonel ekiplerimizle gerçekleştirdik.",
    thumbnail: "https://img.youtube.com/vi/c72ILTyJH4A/hqdefault.jpg",
  },
  {
    id: "egd21AA1dZ0",
    title:
      "Ankara Gençlik Festivali Organizasyonu | Sahneva Sahne – LED Ekran – Teknik Prodüksiyon",
    description:
      "Ankara Gençlik Festivali için sahne, LED ekran, ses–ışık sistemleri ve tüm teknik prodüksiyon altyapısını Sahneva olarak profesyonel ekiplerimizle sağladık.",
    thumbnail: "https://img.youtube.com/vi/egd21AA1dZ0/hqdefault.jpg",
  },
  {
    id: "tyb1lG9KtiA",
    title:
      "Çadır Kurulumu Organizasyonu | Sahneva Profesyonel Etkinlik Çadırı & Teknik Altyapı",
    description:
      "Etkinlik, fuar, festival, kurumsal organizasyon, düğün, açılış ve özel proje alanlarında profesyonel çadır kurulumu hizmeti sunuyoruz.",
    thumbnail: "https://img.youtube.com/vi/tyb1lG9KtiA/hqdefault.jpg",
  },
  {
    id: "1R5Av0x5ouA",
    title:
      "Sahne Işık Şov | Sahneva Profesyonel Işık Tasarımı & Etkinlik Prodüksiyonu",
    description:
      "Konserler, festivaller, kurumsal etkinlikler, açılış törenleri ve gösteriler için profesyonel sahne ışık şovları hazırlıyoruz.",
    thumbnail: "https://img.youtube.com/vi/1R5Av0x5ouA/hqdefault.jpg",
  },
  {
    id: "HNDZ-wYVKLw",
    title:
      "Şirket Etkinliği & Lansman Organizasyonu | Profesyonel Sahne Kurulumu",
    description:
      "Kurumsal etkinlikler, lansmanlar, toplantılar, ödül törenleri ve marka etkinlikleri için profesyonel sahne, LED ekran, ses–ışık ve teknik prodüksiyon hizmeti sunuyoruz.",
    thumbnail: "https://img.youtube.com/vi/HNDZ-wYVKLw/hqdefault.jpg",
  },
];

const INITIAL_POSITION = { x: -24, y: -24 };
const AUTO_OPEN_SCROLL_Y = 200; // daha “erken” ama yine de user-driven
const IDLE_FALLBACK_MS = 8000;  // hiç scroll yoksa 8sn sonra

function StickyVideoRailInner({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role,
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [dragging, setDragging] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false);

  const dragRef = useRef(null);
  const startPosRef = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0 });
  const headingId = useId();
  const descriptionId = useId();

  const computedHeadingId =
    ariaLabelledby ?? `sticky-video-rail-heading-${headingId}`;
  const computedDescriptionId =
    ariaDescribedby ?? `sticky-video-rail-description-${descriptionId}`;
  const computedRole =
    role ?? (ariaLabel || ariaLabelledby ? "region" : undefined);

  const accessibleTitle = "Sahneva Video Galerisi";
  const accessibleDescription =
    "Sahneva'nın öne çıkan videolarını oynatmak ve listedeki diğer kliplere geçiş yapmak için sürüklenebilir, açılır bir oynatıcı.";

  const currentVideo = VIDEOS[activeIndex];
  const playlistForExpanded = VIDEOS.filter((_, i) => i !== activeIndex);

  // İlk mount + mobile tespiti
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    }
  }, []);

  // ESC ile kapatma (aynı sayfada tekrar auto-open olmasın)
  useEffect(() => {
    if (!isMounted) return;

    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      // ESC: açık olsun/olmasın "bu sayfada bir daha otomatik açma"
      setHasAutoShown(true);
      setIsOpen(false);
      setIsExpanded(false);
      setIsMinimized(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isMounted]);

  // Scroll ile otomatik gösterme (ultra düşük maliyet: passive + RAF throttling)
  useEffect(() => {
    if (!isMounted || hasAutoShown) return;

    let ticking = false;

    const autoOpen = () => {
      if (hasAutoShown) return;
      setHasAutoShown(true);

      if (isMobile) {
        setIsOpen(true);
        setIsMinimized(true);
      } else {
        setIsOpen(true);
        setIsMinimized(false);
      }
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        if (window.scrollY > AUTO_OPEN_SCROLL_Y && !hasAutoShown) autoOpen();
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });

    // Idle fallback: kullanıcı hiç scroll yapmazsa, biraz sonra aç (çok hafif)
    let idleTimer = window.setTimeout(() => {
      if (!hasAutoShown) autoOpen();
    }, IDLE_FALLBACK_MS);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.clearTimeout(idleTimer);
    };
  }, [isMounted, hasAutoShown, isMobile]);

  // Drag hareketi (dependency fix: position eklendi)
  useEffect(() => {
    if (!dragging || !dragRef.current) return;

    const dragRafRef = { current: null };
    const pendingPosition = { ...position };

    const handleMove = (e) => {
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startPosRef.current.mouseX;
      const dy = clientY - startPosRef.current.mouseY;

      pendingPosition.x = startPosRef.current.x + dx;
      pendingPosition.y = startPosRef.current.y + dy;

      if (dragRafRef.current) return;
      dragRafRef.current = requestAnimationFrame(() => {
        setPosition({ ...pendingPosition });
        dragRafRef.current = null;
      });
    };

    const handleUp = () => {
      if (dragRafRef.current) {
        cancelAnimationFrame(dragRafRef.current);
        dragRafRef.current = null;
      }
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      if (dragRafRef.current) cancelAnimationFrame(dragRafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging, position]);

  const startDrag = (e) => {
    if (isExpanded) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    startPosRef.current = {
      mouseX: clientX,
      mouseY: clientY,
      x: position.x,
      y: position.y,
    };
    setDragging(true);
  };

  if (!isMounted) return null;

  const handlePlay = () => {
    setHasStarted(true);
    setIsOpen(true);
    setIsMinimized(false);
  };

  const handleChangeVideo = (index) => {
    setActiveIndex(index);
    setHasStarted(false);
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setIsMinimized(false);
  };

  const handleCollapseFromExpanded = () => {
    setIsExpanded(false);
  };

  // Kapat: bu sayfada bir daha otomatik açma
  const handleClose = () => {
    setHasAutoShown(true);
    setIsOpen(false);
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const handleToggleMinimize = () => {
    if (isExpanded) {
      setIsExpanded(false);
      setIsMinimized(true);
      return;
    }
    setIsMinimized((v) => !v);
  };

  // =============== Tam ekran / sinema modu ===============
  if (isExpanded && isOpen) {
    return (
      <div
        className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex flex-col items-center px-2 sm:px-6 py-2"
        aria-modal="true"
        role="dialog"
        aria-labelledby={ariaLabel ? undefined : computedHeadingId}
        aria-label={ariaLabel}
        aria-describedby={computedDescriptionId}
      >
        <div className="sr-only">
          <h2 id={computedHeadingId}>{accessibleTitle}</h2>
          <p id={computedDescriptionId}>{accessibleDescription}</p>
        </div>

        {/* ÜST BAR */}
        <div className="w-full max-w-6xl flex justify-between items-center mb-4 bg-black/80 rounded-xl px-4 py-3 border border-white/20">
          <div className="flex items-center gap-2">
            <span className="text-white font-semibold text-sm sm:text-base">
              {accessibleTitle}
            </span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={handleCollapseFromExpanded}
              className="rail-control group"
              data-variant="primary"
            >
              <span className="text-lg">↘️</span>
              <span className="hidden sm:inline">Küçült</span>
            </button>
            <button
              type="button"
              onClick={handleToggleMinimize}
              className="rail-control group"
              data-variant="muted"
            >
              <span className="text-lg">🗕</span>
              <span className="hidden sm:inline">Simge</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="rail-control group"
              data-variant="danger"
            >
              <span className="text-lg">✕</span>
              <span className="hidden sm:inline">Kapat</span>
            </button>
          </div>
        </div>

        {/* İÇERİK */}
        <div className="relative w-full max-w-6xl flex-1 flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Ana video */}
          <div className="flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative w-full aspect-video">
              {!hasStarted && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10 hover:bg-black/30 transition-colors group"
                >
                  <img
                    src={currentVideo.thumbnail}
                    alt={currentVideo.title}
                    width="480"
                    height="270"
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                  />
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 shadow-xl mb-4 group-hover:scale-110 transition-transform">
                    <span className="ml-1 text-3xl text-red-500">▶</span>
                  </div>
                  <p className="text-lg sm:text-xl font-semibold px-4 text-center">
                    {currentVideo.title}
                  </p>
                  <p className="mt-2 text-sm text-white/80 max-w-xl px-4 text-center">
                    Oynatmak için tıklayın
                  </p>
                </button>
              )}
              {hasStarted && (
                <iframe
                  title={currentVideo.title}
                  src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&mute=0&rel=0&modestbranding=1&controls=1&playsinline=1`}
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              )}
            </div>
          </div>

          {/* Playlist (GENİŞ) */}
          <aside className="w-full md:w-64 lg:w-72 bg-slate-900/90 border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-slate-400">
                    Oynatma Listesi
                  </p>
                  <p className="text-sm font-semibold text-white">
                    Diğer videolar
                  </p>
                </div>
              </div>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                {playlistForExpanded.length}
              </span>
            </div>

            <div
              className="flex-1 overflow-y-auto custom-scroll px-1 py-1"
              role="radiogroup"
              aria-label="Video seçimi"
            >
              {playlistForExpanded.length === 0 && (
                <p className="px-4 py-3 text-xs text-slate-400">
                  Şu anda sadece tek video var.
                </p>
              )}

              {playlistForExpanded.map((video) => {
                const index = VIDEOS.findIndex((v) => v.id === video.id);
                const isActive = index === activeIndex;

                return (
                  <label
                    key={video.id}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left text-slate-100 text-sm transition-colors border-b border-white/5 last:border-b-0 cursor-pointer ${
                      isActive
                        ? "bg-blue-500/20 border-r-2 border-blue-500"
                        : "hover:bg-slate-800/80 border-r-2 border-transparent"
                    }`}
                  >
                    <input
                      type="radio"
                      name="sticky-video-expanded"
                      className="sr-only"
                      checked={isActive}
                      onChange={() => handleChangeVideo(index)}
                    />
                    <div className="relative w-14 h-9 flex-shrink-0 rounded-md overflow-hidden bg-black">
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        width="160"
                        height="90"
                        className="w-full h-full object-cover"
                        loading="lazy"
                        decoding="async"
                        fetchPriority="low"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                        <span className="text-white text-xs">▶</span>
                      </div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="truncate font-medium text-xs sm:text-sm">
                        {video.title}
                      </p>
                      <p className="hidden sm:block text-xs text-slate-400 truncate">
                        {video.description}
                      </p>
                    </div>
                  </label>
                );
              })}
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // =============== Minimize mod (simge) ===============
  if (isOpen && isMinimized) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsMinimized(false);
          setIsExpanded(false);
          setIsOpen(true);
        }}
        className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white text-xs sm:text-sm shadow-lg border border-white/20 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 group"
        aria-label="Video oynatıcıyı aç"
      >
        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs group-hover:scale-110 transition-transform">
          ▶
        </span>
        <span className="hidden sm:inline font-medium">Videoları Görüntüle</span>
        <span className="sm:hidden font-medium">Aç</span>
      </button>
    );
  }

  // =============== Kapalıysa ===============
  if (!isOpen) return null;

  // =============== Küçük sticky mod ===============
  return (
    <div
      ref={dragRef}
      className="fixed z-[60] bottom-0 right-0"
      style={{ transform: `translate3d(${position.x}px, ${position.y}px, 0)` }}
      role={computedRole}
      aria-labelledby={ariaLabel ? undefined : computedHeadingId}
      aria-label={ariaLabel}
      aria-describedby={computedDescriptionId}
    >
      <div className="sr-only">
        <h2 id={computedHeadingId}>{accessibleTitle}</h2>
        <p id={computedDescriptionId}>{accessibleDescription}</p>
      </div>

      <div className="mb-4 w-[280px] sm:w-[340px] bg-slate-900/95 border border-white/20 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-lg">
        {/* Başlık + drag alanı */}
        <div
          className="flex items-center justify-between px-4 py-3 cursor-move select-none bg-gradient-to-r from-slate-800 to-slate-900 border-b border-white/10"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-slate-100 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              {accessibleTitle}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleExpand}
              aria-label="Videoyu büyüt"
              className="rail-control group"
              data-variant="primary"
            >
              <span className="group-hover:scale-110 transition-transform text-sm">
                ⤢ BÜYÜT
              </span>
            </button>
            <button
              type="button"
              onClick={handleToggleMinimize}
              aria-label="Simge durumuna küçült"
              className="rail-control group"
              data-variant="muted"
            >
              <span className="group-hover:scale-110 transition-transform">🗕</span>
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Kapat"
              className="rail-control group"
              data-variant="danger"
            >
              <span className="group-hover:scale-110 transition-transform">✕</span>
            </button>
          </div>
        </div>

        {/* Video alanı */}
        <div className="relative w-full aspect-video bg-black">
          {!hasStarted && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10 hover:bg-black/30 transition-colors group"
            >
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                width="640"
                height="360"
                className="absolute inset-0 w-full h-full object-cover -z-10"
                loading="lazy"
                decoding="async"
                fetchPriority="low"
              />
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-white/90 shadow-xl mb-3 group-hover:scale-110 transition-transform">
                <span className="ml-1 text-2xl text-red-500">▶</span>
              </div>
              <p className="text-sm font-semibold px-4 text-center line-clamp-2">
                {currentVideo.title}
              </p>
              <p className="mt-2 text-xs text-white/80 px-4 text-center">
                Oynatmak için tıklayın
              </p>
            </button>
          )}

          {hasStarted && (
            <iframe
              title={currentVideo.title}
              src={`https://www.youtube-nocookie.com/embed/${currentVideo.id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&playsinline=1`}
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
            />
          )}
        </div>

        {/* Açılır mini liste */}
        <details className="group border-t border-white/10">
          <summary className="flex items-center justify-between px-4 py-3 text-sm text-slate-200 cursor-pointer select-none hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="font-medium">Diğer Videolar</span>
              <span className="text-xs bg-blue-500 text-white px-2 py-1 rounded-full">
                {VIDEOS.length - 1}
              </span>
            </div>
            <span className="text-lg group-open:rotate-180 transition-transform duration-200">
              ⌄
            </span>
          </summary>

          <div
            className="max-h-48 overflow-y-auto custom-scroll pb-2 bg-slate-800/50 px-1"
            role="radiogroup"
            aria-label="Video seçimi"
          >
            {VIDEOS.map((video, idx) => {
              const isActive = idx === activeIndex;

              return (
                <label
                  key={video.id}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleChangeVideo(idx);
                    }
                  }}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors border-r-2 cursor-pointer ${
                    isActive
                      ? "bg-blue-500/20 border-blue-500"
                      : "hover:bg-slate-700/50 border-transparent"
                  } focus-ring`}
                >
                  <input
                    type="radio"
                    name="sticky-video-mini"
                    className="sr-only"
                    checked={isActive}
                    onChange={() => handleChangeVideo(idx)}
                  />
                  <div className="relative w-12 h-8 rounded-md overflow-hidden bg-black flex-shrink-0">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      width="160"
                      height="90"
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
                    />
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                      <span className="text-white text-[10px]">▶</span>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-100 font-medium line-clamp-2 text-left">
                      {video.title}
                    </p>
                  </div>
                </label>
              );
            })}
          </div>
        </details>
      </div>
    </div>
  );
}

/**
 * Dışa açılan bileşen:
 * - DeferredHydration ile geç hydrate olur
 * - CLS etkilemez (fixed)
 */
export default function StickyVideoRail({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role,
  ...props
}) {
  return (
    <DeferredHydration
      rootMargin="600px"
      idleTimeout={5000}
      fallback={null}
      as="div"
      {...props}
    >
      <StickyVideoRailInner
        ariaLabel={ariaLabel}
        ariaLabelledby={ariaLabelledby}
        ariaDescribedby={ariaDescribedby}
        role={role}
      />
    </DeferredHydration>
  );
}
