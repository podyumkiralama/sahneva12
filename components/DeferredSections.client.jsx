// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import DeferredHydration from "@/components/DeferredHydration.client";

// —————————————————————————————————————————————————
// SKELETON BİLEŞENLERİ (DARK MODE UYUMLU)
// —————————————————————————————————————————————————

function ServicesTabsSkeleton({ srLabel = "Hizmet sekmeleri yükleniyor" } = {}) {
    // ServicesTabs bileşeni Light zeminde yer alsa da, iç paneli Dark olduğu için
    // iskeleti Dark Mode'da hazırlamak, yüklenme sırasında renk geçişini yumuşatır.
    return (
        <div
            className="w-full bg-[#0B1120] p-4 rounded-xl"
            role="status"
            style={{ contain: "layout paint", minHeight: "400px" }}
        >
            <div className="flex gap-3 mb-8 overflow-hidden">
                {[1, 2, 3, 4].map((i) => (
                    <div
                        key={i}
                        className="h-11 flex-1 min-w-[100px] rounded-xl bg-slate-800 motion-safe:animate-pulse"
                    />
                ))}
            </div>
            <div 
                className="h-80 rounded-3xl bg-slate-800 motion-safe:animate-pulse border border-slate-700" 
            />
            <span className="sr-only">{srLabel}</span>
        </div>
    );
}

function ProjectsGallerySkeleton({ srLabel = "Projeler yükleniyor" } = {}) {
    // ——— DÜZELTİLDİ: Dark Mode'a geçirildi ———
    // ProjectsGallery bileşeni Dark Mode'da yer alır.
    return (
        <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8 bg-[#0B1120] rounded-3xl"
            role="status"
            style={{ contain: "layout paint", minHeight: "320px" }}
        >
            {[1, 2, 3].map((key) => (
                <div
                    key={key}
                    className="h-80 rounded-2xl bg-slate-800 motion-safe:animate-pulse"
                />
            ))}
            <span className="sr-only">{srLabel}</span>
        </div>
    );
}

function FaqSkeleton({ srLabel = "Sıkça sorulan sorular yükleniyor" } = {}) {
    // Faq bileşeni Dark Mode'da yer alır ve Split Layout'a sahiptir.
    return (
        <div
            className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 p-6 bg-[#0B1120] rounded-xl" 
            role="status"
            style={{ contain: "layout paint", minHeight: "260px" }}
        >
            {/* Sol Taraf: Soru İskeletleri */}
            <div className="lg:col-span-8 space-y-4">
                {[1, 2, 3, 4].map((key) => (
                    <div
                        key={key}
                        className="h-12 rounded-xl border border-white/10 bg-white/5 motion-safe:animate-pulse"
                    />
                ))}
            </div>
            {/* Sağ Taraf: İletişim Kartı İskeleti */}
            <div className="lg:col-span-4">
                 <div className="h-60 rounded-3xl bg-white/10 border border-white/5 motion-safe:animate-pulse" />
            </div>
            <span className="sr-only">{srLabel}</span>
        </div>
    );
}

// —————————————————————————————————————————————————
// DİNAMİK BİLEŞENLER
// —————————————————————————————————————————————————

const ServicesTabsLazy = dynamic(() => import("@/components/ServicesTabs"), {
    ssr: false,
    loading: () => null,
});

const ProjectsGalleryLazy = dynamic(
    () => import("@/components/ProjectsGallery"),
    {
        ssr: false,
        loading: () => null,
    }
);

const FaqLazy = dynamic(() => import("@/components/Faq"), {
    ssr: false,
    loading: () => null,
});

// —————————————————————————————————————————————————
// DIŞA AKTARILAN DEFERRED BİLEŞENLER
// —————————————————————————————————————————————————

export function ServicesTabsDeferred(props) {
    return (
        <div style={{ minHeight: "400px" }}>
            <DeferredHydration fallback={<ServicesTabsSkeleton />} {...props}>
                <ServicesTabsLazy {...props} />
            </DeferredHydration>
        </div>
    );
}

export function ProjectsGalleryDeferred(props) {
    return (
        <div style={{ minHeight: "320px" }}> {/* minHeight güncellendi */}
            <DeferredHydration fallback={<ProjectsGallerySkeleton />} {...props}>
                <ProjectsGalleryLazy {...props} />
            </DeferredHydration>
        </div>
    );
}

export function FaqDeferred(props) {
    return (
        <div style={{ minHeight: "260px" }}>
            <DeferredHydration fallback={<FaqSkeleton />} {...props}>
                <FaqLazy {...props} />
            </DeferredHydration>
        </div>
    );
}
