// components/StickyVideoRail.jsx
"use client";

import { useEffect, useRef, useState } from "react";

const VIDEOS = [
  {
    id: "173gBurWSRQ",
    title: "Sahneva – LED Ekran & Sahne Kurulum",
  },
  {
    id: "4ygMbL4FDRc",
    title: "Sahneva – Proje Uygulama",
  },
];

const SCROLL_THRESHOLD = 280; // px

function getEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&playsinline=1`;
}

export default function StickyVideoRail() {
  const [visible, setVisible] = useState(false); // scroll sonrası aç
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const [loadPlayer, setLoadPlayer] = useState(false); // lazy iframe
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPosition, setHasPosition] = useState(false);

  const dragDataRef = useRef(null);
  const containerRef = useRef(null);

  // İlk scroll + başlangıç pozisyonu
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setInitialPos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const baseW = w < 768 ? 260 : 320;
      const baseH = w < 768 ? 150 : 180;

      setPosition({
        x: w - baseW - 16,
        y: h - baseH - 24,
      });
      setHasPosition(true);
    };

    setInitialPos();
    window.addEventListener("resize", setInitialPos);

    const onScroll = () => {
      if (window.scrollY > SCROLL_THRESHOLD) {
        setVisible(true);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener("resize", setInitialPos);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // drag işlemleri
  const handlePointerDown = (event) => {
    if (!containerRef.current) return;

    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();

    dragDataRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: rect.left,
      startTop: rect.top,
    };

    const handleMove = (e) => {
      if (!dragDataRef.current) return;

      const dx = e.clientX - dragDataRef.current.startX;
      const dy = e.clientY - dragDataRef.current.startY;

      const newX = dragDataRef.current.startLeft + dx;
      const newY = dragDataRef.current.startTop + dy;

      const maxX = window.innerWidth - rect.width - 8;
      const maxY = window.innerHeight - rect.height - 8;

      setPosition({
        x: Math.min(Math.max(8, newX), maxX),
        y: Math.min(Math.max(8, newY), maxY),
      });
    };

    const handleUp = () => {
      dragDataRef.current = null;
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerup", handleUp);
    };

    window.addEventListener("pointermove", handleMove);
    window.addEventListener("pointerup", handleUp);
  };

  if (!hasPosition || !visible) {
    return null;
  }

  // Tamamen küçültülmüş hali: sadece simge (mobilde istediğin davranış)
  if (isMinimized) {
    return (
      <button
        type="button"
        onClick={() => {
          setIsMinimized(false);
          setLoadPlayer(true);
        }}
        className="fixed z-[60] bottom-4 right-4 md:bottom-6 md:right-6 flex items-center justify-center w-12 h-12 rounded-full bg-purple-600 text-white shadow-2xl hover:scale-105 transition-transform focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
        aria-label="Video galerisini aç"
      >
        🎥
      </button>
    );
  }

  const baseWidth = isExpanded ? 420 : 300;
  const baseHeight = isExpanded ? 236 : 170;

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        zIndex: 60,
        width: baseWidth,
        height: baseHeight + 56, // header + player
        left: position.x,
        top: position.y,
      }}
      className="hidden sm:flex flex-col rounded-2xl bg-slate-950/95 text-white shadow-2xl border border-slate-800 overflow-hidden backdrop-blur-md"
      aria-label="Sahneva video galerisi"
    >
      {/* Üst bar: drag + butonlar */}
      <div
        className="flex items-center justify-between px-3 py-2 cursor-move select-none bg-slate-900/80 text-xs"
        onPointerDown={handlePointerDown}
      >
        <div className="flex items-center gap-2">
          <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold">Sahneva Proje Videoları</span>
        </div>
        <div className="flex items-center gap-1 cursor-default">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsExpanded((prev) => !prev);
            }}
            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label={isExpanded ? "Videoyu küçült" : "Videoyu büyüt"}
          >
            {isExpanded ? "▢" : "▣"}
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMinimized(true);
            }}
            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Pencereyi küçült"
          >
            _
          </button>
        </div>
      </div>

      {/* Ana içerik */}
      <div className="flex-1 flex">
        {/* Video player */}
        <div className="flex-1 relative">
          {!loadPlayer && (
            <button
              type="button"
              onClick={() => setLoadPlayer(true)}
              className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white gap-3 group"
            >
              <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                ▶
              </div>
              <span className="text-xs opacity-80">
                Oynatmak için tıklayın (YouTube)
              </span>
            </button>
          )}

          {loadPlayer ? (
            <iframe
              title="Sahneva video oynatıcı"
              src={getEmbedUrl(activeId)}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full border-0"
              loading="lazy"
            />
          ) : (
            <img
              src={`https://i.ytimg.com/vi/${activeId}/hqdefault.jpg`}
              alt="Sahneva video önizleme"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          )}
        </div>

        {/* Sağ tarafta küçük diğer videolar (desktop) */}
        <div className="hidden md:flex flex-col w-28 border-l border-slate-800 bg-slate-950/70">
          {VIDEOS.map((video) => {
            const isActive = video.id === activeId;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => {
                  setActiveId(video.id);
                  setLoadPlayer(true);
                }}
                className={`relative flex-1 min-h-[64px] border-b border-slate-800 last:border-b-0 overflow-hidden text-[11px] text-left group ${
                  isActive ? "bg-purple-600/40" : "hover:bg-slate-800/80"
                }`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                  alt={video.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90"
                  loading="lazy"
                />
                <div className="relative z-10 p-2 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                  <div className="line-clamp-2 leading-snug">
                    {video.title}
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
