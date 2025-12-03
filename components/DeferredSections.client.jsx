// components/DeferredSections.client.jsx
"use client";

import dynamic from "next/dynamic";
import DeferredHydration from "@/components/DeferredHydration.client";

// —————————————————————————————————————————————————
// SKELETON BİLEŞENLERİ (sabit minHeight + motion-safe animasyon)
// —————————————————————————————————————————————————

function ReviewBannerSkeleton() {
  return (
    <div
      className="pointer-events-none w-full"
      aria-hidden="true"
      style={{ contain: "layout paint", minHeight: "80px" }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200/60 bg-white/80 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block h-10 w-10 rounded-full bg-amber-200/80 motion-safe:animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-neutral-200 motion-safe:animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-neutral-200 motion-safe:animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServicesTabsSkeleton({ srLabel = "Hizmet sekmeleri yükleniyor" } = {}) {
  return (
    <div
      className="w-full"
      role="status"
      style={{ contain: "layout paint", minHeight: "400px" }}
    >
      <div className="flex gap-3 mb-8 overflow-hidden">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-11 flex-1 min-w-[100px] rounded-xl bg-neutral-200 motion-safe:animate-pulse"
          />
        ))}
      </div>
      <div className="h-80 rounded-3xl bg-neutral-100 motion-safe:animate-pulse border border-neutral-200" />
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

function ProjectsGallerySkeleton({ srLabel = "Projeler yükleniyor" } = {}) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      style={{ contain: "layout paint", minHeight: "280px" }}
    >
      {[1, 2, 3].map((key) => (
        <div
          key={key}
          className="h-80 rounded-2xl bg-neutral-200 motion-safe:animate-pulse"
        />
      ))}
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

function FaqSkeleton({ srLabel = "Sıkça sorulan sorular yükleniyor" } = {}) {
  return (
    <div
      className="space-y-4"
      role="status"
      style={{ contain: "layout paint", minHeight: "260px" }}
    >
      {[1, 2, 3, 4].map((key) => (
        <div
          key={key}
          className="h-12 rounded-xl border border-neutral-100 bg-neutral-50 p-4 motion-safe:animate-pulse"
        />
      ))}
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

// —————————————————————————————————————————————————
// DİNAMİK BİLEŞENLER
// —————————————————————————————————————————————————

const ReviewBannerLazy = dynamic(() => import("@/components/ReviewBanner"), {
  ssr: false,
  loading: () => null, // skeleton zaten DeferredHydration fallback'inde
});

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

export function ReviewBannerDeferred(props) {
  return (
    <div style={{ minHeight: "80px" }}>
      <DeferredHydration fallback={<ReviewBannerSkeleton />} {...props}>
        <ReviewBannerLazy {...props} />
      </DeferredHydration>
    </div>
  );
}

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
    <div style={{ minHeight: "280px" }}>
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
