"use client";

import dynamic from "next/dynamic";
import DeferredHydration from "@/components/DeferredHydration.client";

function ReviewBannerSkeleton() {
  return (
    <div className="pointer-events-none" aria-hidden="true">
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200/60 bg-white/80 p-4 shadow-lg">
        <div className="flex items-center gap-3 animate-pulse motion-reduce:animate-none">
          <div className="hidden sm:block h-10 w-10 rounded-full bg-amber-200/80" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-neutral-200" />
            <div className="h-3 w-1/2 rounded bg-neutral-200" />
          </div>
          <div className="h-9 w-24 rounded-full bg-amber-300/80" />
          <div className="h-9 w-9 rounded-full bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}

function ServicesTabsSkeleton() {
  return (
    <div
      className="w-full"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Hizmet sekmeleri yükleniyor"
    >
      <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:overflow-hidden mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-11 flex-1 min-w-[120px] rounded-xl bg-neutral-200 animate-pulse motion-reduce:animate-none"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="h-80 rounded-3xl border border-neutral-200 bg-neutral-100 animate-pulse motion-reduce:animate-none" aria-hidden="true" />
      <span className="sr-only">Hizmet sekmeleri yükleniyor</span>
    </div>
  );
}

function ProjectsGallerySkeleton() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Projeler yükleniyor"
    >
      {[1, 2, 3].map((key) => (
        <div
          key={key}
          className="h-80 rounded-2xl bg-neutral-200 animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">Projeler yükleniyor</span>
    </div>
  );
}

function FaqSkeleton() {
  return (
    <div
      className="space-y-4"
      role="status"
      aria-live="polite"
      aria-busy="true"
      aria-label="Sık sorulan sorular yükleniyor"
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/10 p-4 animate-pulse motion-reduce:animate-none"
          aria-hidden="true"
        >
          <div className="h-4 w-3/4 rounded bg-white/40 mb-3" />
          <div className="h-3 w-full rounded bg-white/20 mb-2" />
          <div className="h-3 w-2/3 rounded bg-white/20" />
        </div>
      ))}
      <span className="sr-only">Sık sorulan sorular yükleniyor</span>
    </div>
  );
}

const ReviewBannerLazy = dynamic(() => import("@/components/ReviewBanner"), {
  ssr: false,
  loading: ReviewBannerSkeleton,
});

const ServicesTabsLazy = dynamic(() => import("@/components/ServicesTabs"), {
  ssr: false,
  loading: ServicesTabsSkeleton,
});

const ProjectsGalleryLazy = dynamic(() => import("@/components/ProjectsGallery"), {
  ssr: false,
  loading: ProjectsGallerySkeleton,
});

const FaqLazy = dynamic(() => import("@/components/Faq"), {
  ssr: false,
  loading: FaqSkeleton,
});

export function ReviewBannerDeferred({ idleTimeout = 2000, rootMargin = "0px", ...rest }) {
  return (
    <DeferredHydration
      fallback={<ReviewBannerSkeleton />}
      idleTimeout={idleTimeout}
      rootMargin={rootMargin}
      {...rest}
    >
      <ReviewBannerLazy />
    </DeferredHydration>
  );
}

export function ServicesTabsDeferred({ idleTimeout = 2800, rootMargin = "320px", ...rest }) {
  return (
    <DeferredHydration
      fallback={<ServicesTabsSkeleton />}
      idleTimeout={idleTimeout}
      rootMargin={rootMargin}
      {...rest}
    >
      <ServicesTabsLazy />
    </DeferredHydration>
  );
}

export function ProjectsGalleryDeferred({ idleTimeout = 3200, rootMargin = "360px", ...rest }) {
  return (
    <DeferredHydration
      fallback={<ProjectsGallerySkeleton />}
      idleTimeout={idleTimeout}
      rootMargin={rootMargin}
      {...rest}
    >
      <ProjectsGalleryLazy />
    </DeferredHydration>
  );
}

export function FaqDeferred({ idleTimeout = 3600, rootMargin = "400px", ...rest }) {
  return (
    <DeferredHydration
      fallback={<FaqSkeleton />}
      idleTimeout={idleTimeout}
      rootMargin={rootMargin}
      {...rest}
    >
      <FaqLazy />
    </DeferredHydration>
  );
}

