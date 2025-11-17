// components/StickyVideoRail.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    id: "173gBurWSRQ",
    title: "Sahneva – LED Ekran & Sahne Kurulum Öncesi",
    description: "Backstage, sahne kurulumu ve hazırlık görüntüleri.",
    thumbnail: "https://img.youtube.com/vi/173gBurWSRQ/hqdefault.jpg",
  },
  {
    id: "4ygMbL4FDRc",
    title: "Sahneva – LED Ekran & Sahne Kurulum",
    description: "LED ekran kurulum ve sahne ışıklandırma süreci.",
    thumbnail: "https://img.youtube.com/vi/4ygMbL4FDRc/hqdefault.jpg",
  },
  // Yeni videolar geldikçe buraya ekleyebilirsin
];

const INITIAL_POSITION = { x: -24, y: -24 }; // sağ alt köşe ofseti

export default function StickyVideoRail() {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false); // iframe lazy load
  const [position, setPosition] = useState(INITIAL_POSITION);
  const [dragging, setDragging] = useState(false);

  const dragRef = useRef(null);
  const startPosRef = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0 });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Scroll sonrası otomatik görünme (biraz aşağı inince)
  useEffect(() => {
    if (!isMounted) return;
    const onScroll = () => {
      if (window.scrollY > 300 && !hasStarted) {
        setIsOpen(true);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMounted, hasStarted]);

  // === Drag işlemleri (sadece expanded değilken) ===
  useEffect(() => {
    if (!dragging || !dragRef.current) return;

    const handleMove = (e) => {
      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      const dx = clientX - startPosRef.current.mouseX;
      const dy = clientY - startPosRef.current.mouseY;

      setPosition({
        x: startPosRef.current.x + dx,
        y: startPosRef.current.y + dy,
      });
    };

    const handleUp = () => {
      setDragging(false);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("touchend", handleUp);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", handleUp);
    };
  }, [dragging]);

  const startDrag = (e) => {
    if (isExpanded) return; // büyük modda sürükleme yok
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

  const currentVideo = VIDEOS[activeIndex];
  const playlistForExpanded = VIDEOS.filter((_, i) => i !== activeIndex); // büyük modda oynayanı listeden çıkar

  if (!isMounted || !isOpen) return null;

  // ==================== Yardımcı Handler'lar ====================

  const handlePlay = () => {
    setHasStarted(true);
    setIsMinimized(false);
  };

  const handleChangeVideo = (index) => {
    setActiveIndex(index);
    setHasStarted(false); // yeni videoda tekrar lazy-load
  };

  const handleExpand = () => {
    setIsExpanded(true);
    setIsMinimized(false);
  };

  const handleCollapse = () => {
    setIsExpanded(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsExpanded(false);
    setIsMinimized(false);
  };

  const handleToggleMinimize = () => {
    setIsMinimized((v) => !v);
  };

  // ==================== Minimize simge butonu (video arka planda açık kalır) ====================
  // Dokunma hedefleri büyük: min-w/min-h ≥ 44px
  const MinimizedButton = () =>
    isMinimized ? (
      <button
        type="button"
        onClick={() => setIsMinimized(false)}
        className="fixed z-[70] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 rounded-full bg-slate-900/95 text-white shadow-xl border border-white/20 px-3 py-2 min-w-[48px] min-h-[48px]"
        aria-label="Video oynatıcıyı aç"
      >
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-base">
          ▶
        </span>
        <span className="hidden sm:inline text-xs font-medium">
          Sahneva video galerisini aç
        </span>
      </button>
    ) : null;

  // ==================== Ortak video player (tek iframe, modlar arasında unmount olmaz) ====================
  const VideoPlayer = () => (
    <div className="relative w-full aspect-video bg-black">
      {!hasStarted && (
        <button
          type="button"
          onClick={handlePlay}
          className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10 min-w-[44px] min-h-[44px]"
        >
          <img
            src={currentVideo.thumbnail}
            alt={currentVideo.title}
            className="absolute inset-0 w-full h-full object-cover -z-10"
            loading="lazy"
          />
          <div className="flex items-center justify-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/95 shadow-2xl mb-3">
            <span className="ml-1 text-3xl text-red-500">▶</span>
          </div>
          <p className="text-xs sm:text-sm font-semibold px-4 text-center">
            {currentVideo.title}
          </p>
          <p className="mt-1 text-[11px] text-white/80 max-w-md px-4 text-center hidden sm:block">
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
  );

  // ==================== Küçük sticky + büyük mod aynı ağaçta (iframe hep aynı) ====================
  return (
    <>
      {/* Minimize simge */}
      <MinimizedButton />

      {/* Player container – minimized ise gizli ama DOM'da duruyor, video kaldığı yerden devam eder */}
      <div
        ref={dragRef}
        className={
          isExpanded
            ? "fixed inset-0 z-[80] flex items-center justify-center px-2 sm:px-6"
            : "fixed z-[60] bottom-0 right-0"
        }
        style={
          isExpanded
            ? undefined
            : {
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
                display: isMinimized ? "none" : "block",
              }
        }
        aria-modal={isExpanded ? "true" : undefined}
        role={isExpanded ? "dialog" : "group"}
        aria-label={isExpanded ? "Video oynatıcı" : "Sahneva video oynatıcı"}
      >
        {/* Expanded ise arka plan karartma */}
        {isExpanded && (
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm -z-10" />
        )}

        <div
          className={
            isExpanded
              ? "relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row gap-4 md:gap-6"
              : "mb-4 w-[260px] sm:w-[320px] bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur"
          }
        >
          {/* Başlık + drag + kontroller */}
          <div
            className={
              isExpanded
                ? "flex items-center justify-between px-4 py-3 bg-slate-950/90 border border-white/10 rounded-2xl mb-3 md:mb-0"
                : "flex items-center justify-between px-3 py-2 cursor-move select-none bg-slate-950/80 border-b border-white/10"
            }
            onMouseDown={startDrag}
            onTouchStart={startDrag}
          >
            <div className="flex items-center gap-2">
              {/* Mac tarzı noktalar */}
              <span className="inline-flex w-2 h-2 rounded-full bg-red-500" />
              <span className="inline-flex w-2 h-2 rounded-full bg-yellow-400" />
              <span className="inline-flex w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-2 text-[11px] sm:text-xs font-semibold text-slate-100">
                Sahneva Video
              </span>
            </div>
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Butonlar: dokunma hedefleri büyük */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  isExpanded ? handleCollapse() : handleExpand();
                }}
                aria-label={isExpanded ? "Küçült" : "Büyüt"}
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2 rounded-full bg-white/5 text-[11px] sm:text-xs text-slate-100 hover:bg-white/15 border border-white/15"
              >
                {isExpanded ? "Küçült" : "Tam Ekran"}
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleToggleMinimize();
                }}
                aria-label="Simge durumuna küçült"
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2 rounded-full bg-white/5 text-[11px] sm:text-xs text-slate-100 hover:bg-white/15 border border-white/15"
              >
                Simge
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClose();
                }}
                aria-label="Kapat"
                className="inline-flex items-center justify-center min-w-[40px] min-h-[40px] px-2 py-2 rounded-full bg-red-500/80 text-[11px] sm:text-xs text-white hover:bg-red-600"
              >
                Kapat ✕
              </button>
            </div>
          </div>

          {/* Küçük mod: sadece video + açılır liste */}
          {!isExpanded && (
            <div className="w-full">
              <VideoPlayer />

              {/* Açılır / kapanır mini liste */}
              <details className="group border-t border-white/10">
                <summary className="flex items-center justify-between px-3 py-3 text-[11px] sm:text-xs text-slate-200 cursor-pointer select-none">
                  <span>Diğer videolar</span>
                  <span className="text-xs group-open:rotate-180 transition-transform">
                    ⌄
                  </span>
                </summary>
                <div className="max-h-40 overflow-y-auto pb-2 custom-scroll">
                  {VIDEOS.map((video, idx) => (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => handleChangeVideo(idx)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-slate-800/80 ${
                        idx === activeIndex ? "bg-slate-800/80" : ""
                      }`}
                    >
                      <img
                        src={video.thumbnail}
                        alt={video.title}
                        className="w-10 h-6 rounded-sm object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <span className="text-[11px] text-slate-100 line-clamp-2">
                        {video.title}
                      </span>
                    </button>
                  ))}
                </div>
              </details>
            </div>
          )}

          {/* Expanded mod: büyük video + Winamp tarzı sağ playlist */}
          {isExpanded && (
            <>
              {/* Ana video */}
              <div className="flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
                <VideoPlayer />
              </div>

              {/* Playlist */}
              <aside className="w-full md:w-64 lg:w-72 bg-slate-900/95 border border-white/15 rounded-2xl shadow-xl flex flex-col overflow-hidden">
                <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div>
                    <p className="text-[10px] uppercase tracking-wide text-slate-400">
                      Oynatma Listesi
                    </p>
                    <p className="text-xs sm:text-sm font-semibold text-white">
                      Diğer videolar
                    </p>
                  </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scroll">
                  {playlistForExpanded.length === 0 && (
                    <p className="px-4 py-3 text-xs text-slate-400">
                      Şu anda sadece tek video var.
                    </p>
                  )}
                  {playlistForExpanded.map((video) => {
                    const index = VIDEOS.findIndex((v) => v.id === video.id);
                    return (
                      <button
                        key={video.id}
                        type="button"
                        onClick={() => handleChangeVideo(index)}
                        className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/80 text-left text-slate-100 text-xs sm:text-sm"
                      >
                        <div className="relative w-14 h-9 flex-shrink-0 rounded-md overflow-hidden bg-black">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="truncate font-medium text-xs sm:text-sm">
                            {video.title}
                          </p>
                          <p className="hidden sm:block text-[11px] text-slate-400 truncate">
                            {video.description}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </aside>
            </>
          )}
        </div>
      </div>
    </>
  );
}