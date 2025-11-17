// components/StickyVideoRail.jsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const VIDEOS = [
  {
    id: "video-teknofest",
    youtubeId: "173gBurWSRQ",
    title: "Teknofest LED Ekran Kurulumu - Sahneva",
    description:
      "Teknofest alanında gerçekleştirilen profesyonel LED ekran ve sahne kurulumu.",
    thumbnailUrl: "https://i.ytimg.com/vi/173gBurWSRQ/hqdefault.jpg",
  },
  {
    id: "video-kurumsal-led",
    youtubeId: "4ygMbL4FDRc",
    title: "Kurumsal LED Ekran Kurulumu - Sahneva",
    description:
      "Kurumsal lansman etkinliğinde kullanılan LED ekran ve sahne sistemleri.",
    thumbnailUrl: "https://i.ytimg.com/vi/4ygMbL4FDRc/hqdefault.jpg",
  },
];

export default function StickyVideoRail() {
  const [activeId, setActiveId] = useState(VIDEOS[0].id);
  const [isVisible, setIsVisible] = useState(false);
  const [isOpenDesktop, setIsOpenDesktop] = useState(false);
  const [isOpenMobile, setIsOpenMobile] = useState(false);
  const [canLoadIframe, setCanLoadIframe] = useState(false);

  // Global scroll tetikleyici (her sayfada geçerli)
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY || window.pageYOffset || 0;
      const shouldShow = y > 300; // ilk 300px'i geçince aktif olsun
      setIsVisible(shouldShow);
      if (shouldShow && !canLoadIframe) {
        setCanLoadIframe(true);
      }
    };

    handleScroll(); // sayfa yenilenince de kontrol et
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [canLoadIframe]);

  if (!isVisible) return null;

  const activeVideo = VIDEOS.find((v) => v.id === activeId) ?? VIDEOS[0];

  // Autoplay + sessiz (mute)
  const buildEmbedSrc = (youtubeId) =>
    `https://www.youtube.com/embed/${youtubeId}?rel=0&modestbranding=1&controls=1&autoplay=1&mute=1&playsinline=1`;

  return (
    <>
      {/* Masaüstü (sağ alt sticky mini player) */}
      <aside
        className="hidden md:block fixed z-40 bottom-6 right-6 max-w-xs w-[320px]"
        aria-label="Video galeri mini oynatıcı"
      >
        <div className="bg-white rounded-2xl shadow-2xl border border-neutral-200/70 overflow-hidden">
          {/* Başlık */}
          <header className="flex items-center justify-between px-3 py-2 border-b border-neutral-200 bg-neutral-50">
            <div className="flex items-center gap-2">
              <span aria-hidden="true">🎬</span>
              <p className="text-xs font-semibold text-neutral-800">
                Proje Video Galerisi
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpenDesktop((v) => !v)}
              className="text-[11px] px-2 py-1 rounded-full border border-neutral-300 bg-white hover:bg-neutral-100 transition text-neutral-700"
            >
              {isOpenDesktop ? "Videoları Gizle" : "Videoları Göster"}
            </button>
          </header>

          {/* Aktif video */}
          <div className="relative aspect-video bg-black">
            {canLoadIframe ? (
              <iframe
                title={activeVideo.title}
                src={buildEmbedSrc(activeVideo.youtubeId)}
                loading="lazy"
                className="w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            ) : (
              <button
                type="button"
                onClick={() => setCanLoadIframe(true)}
                className="relative w-full h-full flex items-center justify-center"
              >
                <Image
                  src={activeVideo.thumbnailUrl}
                  alt={activeVideo.title}
                  fill
                  sizes="320px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40" />
                <div className="relative z-10 flex flex-col items-center">
                  <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600 shadow-lg">
                    ▶
                  </span>
                  <span className="mt-2 text-xs font-semibold text-white">
                    İzlemek için tıklayın
                  </span>
                </div>
              </button>
            )}
          </div>

          {/* Video listesi */}
          {isOpenDesktop && (
            <div className="border-t border-neutral-200 bg-white max-h-56 overflow-y-auto">
              <ul className="divide-y divide-neutral-100">
                {VIDEOS.map((video) => (
                  <li key={video.id}>
                    <button
                      type="button"
                      onClick={() => setActiveId(video.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2 text-left hover:bg-neutral-50 transition ${
                        activeId === video.id ? "bg-blue-50/60" : ""
                      }`}
                    >
                      <div className="relative w-16 h-10 rounded-md overflow-hidden flex-shrink-0">
                        <Image
                          src={video.thumbnailUrl}
                          alt={video.title}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-neutral-900 line-clamp-2">
                          {video.title}
                        </p>
                        <p className="text-[11px] text-neutral-500 line-clamp-1">
                          {video.description}
                        </p>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </aside>

      {/* Mobil: küçük buton + modal */}
      <>
        <button
          type="button"
          onClick={() => setIsOpenMobile(true)}
          className="fixed z-40 bottom-5 right-4 md:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold shadow-2xl border border-white/10"
          aria-label="Video galeriyi aç"
        >
          <span aria-hidden="true">🎥</span>
          <span>Proje Videoları</span>
        </button>

        {isOpenMobile && (
          <div
            className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Proje video galerisi"
          >
            <div className="bg-white rounded-t-3xl sm:rounded-3xl w-full max-w-md max-h-[90vh] overflow-hidden shadow-2xl">
              <header className="flex items-center justify-between px-4 py-3 border-b border-neutral-200 bg-neutral-50">
                <p className="text-sm font-semibold text-neutral-900">
                  Proje Video Galerisi
                </p>
                <button
                  type="button"
                  onClick={() => setIsOpenMobile(false)}
                  className="text-xs px-2 py-1 rounded-full border border-neutral-300 hover:bg-neutral-100"
                >
                  Kapat
                </button>
              </header>

              <div className="p-4 space-y-4 overflow-y-auto max-h-[80vh]">
                {/* Aktif video */}
                <div className="rounded-2xl overflow-hidden border border-neutral-200">
                  <div className="relative aspect-video bg-black">
                    {canLoadIframe ? (
                      <iframe
                        title={activeVideo.title}
                        src={buildEmbedSrc(activeVideo.youtubeId)}
                        loading="lazy"
                        className="w-full h-full"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => setCanLoadIframe(true)}
                        className="relative w-full h-full flex items-center justify-center"
                      >
                        <Image
                          src={activeVideo.thumbnailUrl}
                          alt={activeVideo.title}
                          fill
                          sizes="360px"
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-black/40" />
                        <div className="relative z-10 flex flex-col items-center">
                          <span className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-red-600 shadow-lg">
                            ▶
                          </span>
                          <span className="mt-2 text-xs font-semibold text-white">
                            İzlemek için tıklayın
                          </span>
                        </div>
                      </button>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="text-sm font-semibold text-neutral-900">
                      {activeVideo.title}
                    </p>
                    <p className="text-xs text-neutral-600 mt-1">
                      {activeVideo.description}
                    </p>
                  </div>
                </div>

                {/* Liste */}
                <ul className="space-y-3">
                  {VIDEOS.map((video) => (
                    <li key={video.id}>
                      <button
                        type="button"
                        onClick={() => setActiveId(video.id)}
                        className={`w-full flex items-center gap-3 px-2 py-2 rounded-xl border ${
                          activeId === video.id
                            ? "border-blue-500 bg-blue-50"
                            : "border-neutral-200 hover:bg-neutral-50"
                        }`}
                      >
                        <div className="relative w-16 h-10 rounded-md overflow-hidden flex-shrink-0">
                          <Image
                            src={video.thumbnailUrl}
                            alt={video.title}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0 text-left">
                          <p className="text-xs font-semibold text-neutral-900 line-clamp-2">
                            {video.title}
                          </p>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">
                            {video.description}
                          </p>
                        </div>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    </>
  );
}
