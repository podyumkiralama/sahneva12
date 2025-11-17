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
  // Yeni video eklemek istersen sadece buraya obje ekle:
  // { id: "YOUTUBE_ID", title: "Başlık" },
];

const SCROLL_THRESHOLD = 280; // px

function getEmbedUrl(id) {
  return `https://www.youtube.com/embed/${id}?autoplay=1&mute=1&rel=0&modestbranding=1&controls=1&playsinline=1`;
}

export default function StickyVideoRail() {
  const [visible, setVisible] = useState(false);
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const [loadPlayer, setLoadPlayer] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showList, setShowList] = useState(true);

  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hasPosition, setHasPosition] = useState(false);

  const dragDataRef = useRef(null);
  const containerRef = useRef(null);

  // İlk pozisyon + scroll sonrası görünür yap
  useEffect(() => {
    if (typeof window === "undefined") return;

    const setInitialPos = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const baseW = w < 768 ? 260 : 320;
      const baseH = w < 768 ? 200 : 220;

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

  // Sürükleme
  const handlePointerDown = (event) => {
    if (!containerRef.current) return;

    event.preventDefault();
    const rect = containerRef.current.getBoundingClientRect();

    dragDataRef.current = {
      startX: event.clientX,
      startY: event.clientY,
      startLeft: rect.left,
      startTop: rect.top,
      width: rect.width,
      height: rect.height,
    };

    const handleMove = (e) => {
      if (!dragDataRef.current) return;

      const dx = e.clientX - dragDataRef.current.startX;
      const dy = e.clientY - dragDataRef.current.startY;

      const newX = dragDataRef.current.startLeft + dx;
      const newY = dragDataRef.current.startTop + dy;

      const maxX = window.innerWidth - dragDataRef.current.width - 8;
      const maxY = window.innerHeight - dragDataRef.current.height - 8;

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

  /* ================= MINIMIZE (SIMGE) ================ */

  if (!hasPosition || !visible) {
    return null;
  }

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

  /* ================= EXPANDED MODAL ================ */

  if (isExpanded) {
    return (
      <>
        <div className="fixed inset-0 z-[70] bg-black/70 backdrop-blur-sm flex items-center justify-center px-4">
          <div className="w-full max-w-5xl">
            {/* Başlık + butonlar */}
            <div className="flex items-center justify-between mb-3 text-sm text-slate-100">
              <div className="flex items-center gap-2">
                <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400" />
                <span className="font-semibold">
                  Sahneva Proje Videoları – Galeri
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                  }}
                  className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-label="Küçült"
                >
                  Küçült
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsExpanded(false);
                    setIsMinimized(true);
                  }}
                  className="px-3 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-xs focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  aria-label="Simge durumuna küçült"
                >
                  Gizle
                </button>
              </div>
            </div>

            {/* Büyük video */}
            <div className="aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-slate-800 mb-4">
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
                <button
                  type="button"
                  onClick={() => setLoadPlayer(true)}
                  className="w-full h-full flex flex-col items-center justify-center bg-black/80 text-white gap-3 group"
                >
                  <div className="w-20 h-20 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
                    ▶
                  </div>
                  <span className="text-sm opacity-80">
                    Oynatmak için tıklayın (YouTube)
                  </span>
                </button>
              )}
            </div>

            {/* Aşağı doğru inen liste */}
            <div className="bg-slate-950/90 border border-slate-800 rounded-2xl max-h-56 overflow-y-auto p-3">
              <div className="text-xs text-slate-300 mb-2">
                Diğer videoları seçmek için listeden birine tıklayın.
              </div>
              <div className="space-y-2">
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
                      className={`w-full flex items-center gap-3 rounded-xl overflow-hidden border text-left text-sm transition-colors ${
                        isActive
                          ? "border-purple-500 bg-purple-900/40"
                          : "border-slate-800 bg-slate-900/60 hover:bg-slate-800/80"
                      }`}
                    >
                      <img
                        src={`https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`}
                        alt={video.title}
                        className="w-20 h-12 object-cover flex-shrink-0"
                        loading="lazy"
                      />
                      <span className="pr-3 line-clamp-2 text-slate-100">
                        {video.title}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Simge buton – expanded açıkken de dursun (isteğe bağlı) */}
      </>
    );
  }

  /* ============== KÜÇÜK SÜRÜKLENEBİLİR PENCERE ============== */

  const baseWidth = 320;
  const baseHeight = 190; // video alanı

  return (
    <div
      ref={containerRef}
      style={{
        position: "fixed",
        zIndex: 60,
        width: baseWidth,
        left: position.x,
        top: position.y,
      }}
      className="hidden sm:flex flex-col rounded-2xl bg-slate-950/95 text-white shadow-2xl border border-slate-800 overflow-hidden backdrop-blur-md"
      aria-label="Sahneva video galerisi"
    >
      {/* Üst bar: drag + butonlar */}
      <div className="flex items-center justify-between px-3 py-2 bg-slate-900/80 text-xs select-none">
        <div
          className="flex items-center gap-2 cursor-move"
          onPointerDown={handlePointerDown}
        >
          <span className="inline-flex w-2 h-2 rounded-full bg-emerald-400" />
          <span className="font-semibold">Sahneva Proje Videoları</span>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setShowList((p) => !p)}
            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label={showList ? "Video listesini gizle" : "Video listesini göster"}
          >
            {showList ? "▾" : "▴"}
          </button>
          <button
            type="button"
            onClick={() => setIsExpanded(true)}
            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Videoyu büyüt"
          >
            ▣
          </button>
          <button
            type="button"
            onClick={() => setIsMinimized(true)}
            className="w-6 h-6 rounded-md bg-slate-800 hover:bg-slate-700 flex items-center justify-center text-[11px] focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
            aria-label="Pencereyi simge durumuna küçült"
          >
            _
          </button>
        </div>
      </div>

      {/* Video player */}
      <div
        className="relative bg-black"
        style={{ width: "100%", height: baseHeight }}
      >
        {!loadPlayer && (
          <button
            type="button"
            onClick={() => setLoadPlayer(true)}
            className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-white gap-3 group"
          >
            <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center shadow-xl group-hover:scale-105 transition-transform">
              ▶
            </div>
            <span className="text-[11px] opacity-80">
              Oynatmak için tıklayın
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

      {/* Açılıp kapanan liste – aşağı doğru, scrollable */}
      {showList && (
        <div className="border-t border-slate-800 max-h-40 overflow-y-auto bg-slate-950/90">
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
                className={`w-full flex items-center gap-2 px-2 py-2 text-left text-[11px] transition-colors ${
                  isActive
                    ? "bg-purple-700/50"
                    : "hover:bg-slate-800/80"
                }`}
              >
                <img
                  src={`https://i.ytimg.com/vi/${video.id}/default.jpg`}
                  alt={video.title}
                  className="w-12 h-8 object-cover rounded"
                  loading="lazy"
                />
                <span className="line-clamp-2 text-slate-100">
                  {video.title}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
