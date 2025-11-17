"use client";

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    id: "173gBurWSRQ",
    title: "Sahneva Organizasyon – LED Ekran podyum sahne kurulumu  & Sahne Kurulum Öncesi",
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
    id: "9Q7v0ZL304",
    title: "Sahneva Organizasyon – LED Ekran Çadır Masa sandalye podyum kiralama ",
    description: "Podyum Sahne masa sandalye çadır kiralama kurulum süreci.",
    thumbnail: "https://img.youtube.com/vi/9Q7v0ZL304/hqdefault.jpg",
  },
];

const INITIAL_POSITION = { x: -24, y: -24 }; // sağ alt köşe ofseti

export default function StickyVideoRail() {
  const [isMounted, setIsMounted] = useState(false);

  const [isOpen, setIsOpen] = useState(false);        // ⬅️ başta kapalı
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const [activeIndex, setActiveIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  const [position, setPosition] = useState(INITIAL_POSITION);
  const [dragging, setDragging] = useState(false);

  const [isMobile, setIsMobile] = useState(false);
  const [hasAutoShown, setHasAutoShown] = useState(false); // scroll sonrası 1 defa aç

  const dragRef = useRef(null);
  const startPosRef = useRef({ mouseX: 0, mouseY: 0, x: 0, y: 0 });

  // İlk mount + cihaz tipi
  useEffect(() => {
    setIsMounted(true);
    if (typeof window !== "undefined") {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    }
  }, []);

  // Scroll sonrası otomatik görünme
  useEffect(() => {
    if (!isMounted || hasAutoShown) return;

    const onScroll = () => {
      if (window.scrollY > 300 && !hasAutoShown) {
        setHasAutoShown(true);

        if (isMobile) {
          // mobilde sadece simge çıksın
          setIsOpen(true);
          setIsMinimized(true);
        } else {
          // desktop'ta küçük sticky player
          setIsOpen(true);
          setIsMinimized(false);
        }
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMounted, hasAutoShown, isMobile]);

  // Drag
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
  const playlistForExpanded = VIDEOS.filter((_, i) => i !== activeIndex);

  if (!isMounted) return null;

  // === Handler'lar ===
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

  const handleClose = () => {
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

  // ==================== Tam ekran / sinema modu ====================
  if (isExpanded && isOpen) {
    return (
      <div
        className="fixed inset-0 z-[80] bg-black/80 backdrop-blur-sm flex items-center justify-center px-2 sm:px-6"
        aria-modal="true"
        role="dialog"
        aria-label="Video oynatıcı"
      >
        <div className="absolute top-2 sm:top-4 right-3 sm:right-6 flex gap-2">
          <button
            type="button"
            onClick={handleCollapseFromExpanded}
            className="px-3 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 border border-white/30"
          >
            Küçült
          </button>
          <button
            type="button"
            onClick={handleToggleMinimize}
            className="px-3 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 border border-white/30"
          >
            Simgeye Küçült
          </button>
          <button
            type="button"
            onClick={handleClose}
            className="px-3 py-2 rounded-full bg-red-500/80 text-white text-sm hover:bg-red-600"
          >
            Kapat ✕
          </button>
        </div>

        <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col md:flex-row gap-4 md:gap-6">
          {/* Ana video */}
          <div className="flex-1 bg-black rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <div className="relative w-full aspect-video">
              {!hasStarted && (
                <button
                  type="button"
                  onClick={handlePlay}
                  className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10"
                >
                  <img
                    src={currentVideo.thumbnail}
                    alt={currentVideo.title}
                    className="absolute inset-0 w-full h-full object-cover -z-10"
                  />
                  <div className="flex items-center justify-center w-20 h-20 rounded-full bg-white/90 shadow-xl mb-4">
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

          {/* Playlist */}
          <aside className="w-full md:w-64 lg:w-72 bg-slate-900/90 border border-white/10 rounded-2xl shadow-xl flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-white/10 flex items-center justify-between">
              <div>
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  Oynatma Listesi
                </p>
                <p className="text-sm font-semibold text-white">
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
                    className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800/80 text-left text-slate-100 text-sm"
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
        </div>
      </div>
    );
  }

  // ==================== Minimize mod (sadece simge) ====================
  if (isOpen && isMinimized) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsMinimized(false);
          setIsExpanded(false);
          setIsOpen(true);
        }}
        className="fixed z-[60] bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 px-3 h-11 rounded-full bg-slate-900/90 text-white text-xs sm:text-sm shadow-lg border border-white/15"
        aria-label="Video oynatıcıyı aç"
      >
        <span className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-xs">
          ▶
        </span>
        <span className="hidden sm:inline">
          Sahneva video galerisini aç
        </span>
      </button>
    );
  }

  // ==================== Küçük sticky mod ====================
  if (!isOpen) return null;

  return (
    <div
      ref={dragRef}
      className="fixed z-[60] bottom-0 right-0"
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
      }}
    >
      <div className="mb-4 w-[260px] sm:w-[320px] bg-slate-900/95 border border-white/15 rounded-2xl shadow-2xl overflow-hidden backdrop-blur">
        {/* Başlık + drag alanı */}
        <div
          className="flex items-center justify-between px-3 py-2 cursor-move select-none bg-slate-950/80 border-b border-white/10"
          onMouseDown={startDrag}
          onTouchStart={startDrag}
        >
          <div className="flex items-center gap-2">
            <span className="inline-flex w-2 h-2 rounded-full bg-red-500" />
            <span className="inline-flex w-2 h-2 rounded-full bg-yellow-400" />
            <span className="inline-flex w-2 h-2 rounded-full bg-green-500" />
            <span className="ml-2 text-xs font-semibold text-slate-100">
              Sahneva Video
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={handleExpand}
              aria-label="Videoyu büyüt"
              className="p-1.5 rounded hover:bg-white/10 text-xs text-slate-100"
            >
              ⤢
            </button>
            <button
              type="button"
              onClick={handleToggleMinimize}
              aria-label="Simge durumuna küçült"
              className="p-1.5 rounded hover:bg-white/10 text-xs text-slate-100"
            >
              ▃
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Kapat"
              className="p-1.5 rounded hover:bg-white/10 text-xs text-slate-100"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Video alanı */}
        <div className="relative w-full aspect-video bg-black">
          {!hasStarted && (
            <button
              type="button"
              onClick={handlePlay}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/40 text-white z-10"
            >
              <img
                src={currentVideo.thumbnail}
                alt={currentVideo.title}
                className="absolute inset-0 w-full h-full object-cover -z-10"
                loading="lazy"
              />
              <div className="flex items-center justify-center w-14 h-14 rounded-full bg-white/90 shadow-xl mb-2">
                <span className="ml-0.5 text-2xl text-red-500">▶</span>
              </div>
              <p className="text-xs font-semibold px-3 text-center">
                {currentVideo.title}
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

        {/* Açılır / kapanır mini liste */}
        <details className="group border-t border-white/10">
          <summary className="flex items-center justify-between px-3 py-2 text-[11px] text-slate-200 cursor-pointer select-none">
            <span>Diğer videolar</span>
            <span className="text-xs group-open:rotate-180 transition-transform">
              ⌄
            </span>
          </summary>
          <div className="max-h-40 overflow-y-auto pb-2">
            {VIDEOS.map((video, idx) => (
              <button
                key={video.id}
                type="button"
                onClick={() => handleChangeVideo(idx)}
                className={`w-full flex items-center gap-2 px-3 py-1.5 text-left hover:bg-slate-800/80 ${
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
    </div>
  );
}
