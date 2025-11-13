// components/DeferredSections.client.js
"use client";

import dynamic from "next/dynamic";
import DeferredHydration from "@/components/DeferredHydration.client";
import { useEffect, useRef } from "react";

// ✅ Layout Shift Önleyen Hook (optimized)
function useLayoutShiftProtection() {
  const ref = useRef(null);
  
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // ✅ Intersection Observer ile görünürlük kontrolü
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        // Görünür olduğunda min-height kaldır
        requestAnimationFrame(() => {
          element.style.minHeight = '';
        });
        observer.disconnect();
      }
    }, {
      threshold: 0.1,
      rootMargin: '50px'
    });

    observer.observe(element);
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

// ✅ Optimized Skeleton Components
function ReviewBannerSkeleton() {
  const ref = useLayoutShiftProtection();
  
  return (
    <div 
      ref={ref}
      className="pointer-events-none layout-stable" 
      aria-hidden="true"
      style={{ 
        contain: 'layout style paint',
        minHeight: '80px' // Fixed height for CLS prevention
      }}
    >
      <div className="mx-auto max-w-3xl rounded-2xl border border-amber-200/60 bg-white/80 p-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="hidden sm:block h-10 w-10 rounded-full bg-amber-200/80 animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-3/4 rounded bg-neutral-200 animate-pulse" />
            <div className="h-3 w-1/2 rounded bg-neutral-200 animate-pulse" />
          </div>
          <div className="h-9 w-24 rounded-full bg-amber-300/80 animate-pulse" />
          <div className="h-9 w-9 rounded-full bg-neutral-200 animate-pulse" />
        </div>
      </div>
    </div>
  );
}

function ServicesTabsSkeleton({ srLabel = "Hizmet sekmeleri yükleniyor" } = {}) {
  const ref = useLayoutShiftProtection();

  return (
    <div
      ref={ref}
      className="w-full layout-stable"
      role="status"
      aria-live="polite"
      style={{ 
        contain: 'layout style paint',
        minHeight: '400px' // Fixed height for CLS prevention
      }}
    >
      <div className="flex flex-wrap gap-3 sm:flex-nowrap sm:overflow-hidden mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div
            key={index}
            className="h-11 flex-1 min-w-[120px] rounded-xl bg-neutral-200 animate-pulse"
            aria-hidden="true"
          />
        ))}
      </div>
      <div className="h-80 rounded-3xl border border-neutral-200 bg-neutral-100 animate-pulse" aria-hidden="true" />
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

function ProjectsGallerySkeleton({ srLabel = "Projeler yükleniyor" } = {}) {
  const ref = useLayoutShiftProtection();

  return (
    <div
      ref={ref}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 layout-stable"
      role="status"
      aria-live="polite"
      style={{ 
        contain: 'layout style paint',
        minHeight: '280px' // Fixed height for CLS prevention
      }}
    >
      {[1, 2, 3].map((key) => (
        <div
          key={key}
          className="h-80 rounded-2xl bg-neutral-200 animate-pulse"
          aria-hidden="true"
        />
      ))}
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

function FaqSkeleton({ srLabel = "Sık sorulan sorular yükleniyor" } = {}) {
  const ref = useLayoutShiftProtection();

  return (
    <div
      ref={ref}
      className="space-y-4 layout-stable"
      role="status"
      aria-live="polite"
      style={{ 
        contain: 'layout style paint',
        minHeight: '320px' // Fixed height for CLS prevention
      }}
    >
      {Array.from({ length: 5 }).map((_, index) => (
        <div
          key={index}
          className="rounded-2xl border border-white/10 bg-white/10 p-4 animate-pulse"
          aria-hidden="true"
        >
          <div className="h-4 w-3/4 rounded bg-white/40 mb-3" />
          <div className="h-3 w-full rounded bg-white/20 mb-2" />
          <div className="h-3 w-2/3 rounded bg-white/20" />
        </div>
      ))}
      <span className="sr-only">{srLabel}</span>
    </div>
  );
}

// ✅ Optimized Dynamic Imports with better loading strategy
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

// ✅ Performance Optimized Deferred Components
export function ReviewBannerDeferred({
  idleTimeout = 2000,
  rootMargin = "100px",
  className = "",
  containerProps = {},
  ...restProps
}) {
  const ref = useLayoutShiftProtection();
  const {
    ["aria-live"]: ariaLive,
    ["aria-busy"]: ariaBusy,
    ...bannerProps
  } = restProps;
  const hydrationProps = {
    ...containerProps,
    ...(ariaLive !== undefined ? { "aria-live": ariaLive } : {}),
    ...(ariaBusy !== undefined ? { "aria-busy": ariaBusy } : {}),
  };

  return (
    <div
      ref={ref}
      className={`layout-stable ${className}`}
      style={{ contain: 'layout style paint' }}
    >
      <DeferredHydration
        fallback={<ReviewBannerSkeleton />}
        idleTimeout={idleTimeout}
        rootMargin={rootMargin}
        {...hydrationProps}
      >
        <ReviewBannerLazy {...bannerProps} />
      </DeferredHydration>
    </div>
  );
}

export function ServicesTabsDeferred({
  idleTimeout = 2800,
  rootMargin = "200px",
  className = "",
  loadingSrLabel = "Hizmet sekmeleri yükleniyor",
  containerProps = {},
  ...restProps
}) {
  const ref = useLayoutShiftProtection();
  const {
    ["aria-live"]: ariaLive,
    ["aria-busy"]: ariaBusy,
    ...componentProps
  } = restProps;
  const hydrationProps = {
    ...containerProps,
    ...(ariaLive !== undefined ? { "aria-live": ariaLive } : {}),
    ...(ariaBusy !== undefined ? { "aria-busy": ariaBusy } : {}),
  };

  return (
    <div
      ref={ref}
      className={`layout-stable ${className}`}
      style={{ contain: 'layout style paint' }}
    >
      <DeferredHydration
        fallback={<ServicesTabsSkeleton srLabel={loadingSrLabel} />}
        idleTimeout={idleTimeout}
        rootMargin={rootMargin}
        {...hydrationProps}
      >
        <ServicesTabsLazy {...componentProps} />
      </DeferredHydration>
    </div>
  );
}

export function ProjectsGalleryDeferred({
  idleTimeout = 3200,
  rootMargin = "250px",
  className = "",
  loadingSrLabel = "Projeler yükleniyor",
  containerProps = {},
  ...restProps
}) {
  const ref = useLayoutShiftProtection();
  const {
    ["aria-live"]: ariaLive,
    ["aria-busy"]: ariaBusy,
    ...componentProps
  } = restProps;
  const hydrationProps = {
    ...containerProps,
    ...(ariaLive !== undefined ? { "aria-live": ariaLive } : {}),
    ...(ariaBusy !== undefined ? { "aria-busy": ariaBusy } : {}),
  };

  return (
    <div
      ref={ref}
      className={`layout-stable ${className}`}
      style={{ contain: 'layout style paint' }}
    >
      <DeferredHydration
        fallback={<ProjectsGallerySkeleton srLabel={loadingSrLabel} />}
        idleTimeout={idleTimeout}
        rootMargin={rootMargin}
        {...hydrationProps}
      >
        <ProjectsGalleryLazy {...componentProps} />
      </DeferredHydration>
    </div>
  );
}

export function FaqDeferred({
  idleTimeout = 3600,
  rootMargin = "300px",
  className = "",
  loadingSrLabel = "Sık sorulan sorular yükleniyor",
  containerProps = {},
  ...restProps
}) {
  const ref = useLayoutShiftProtection();
  const {
    ["aria-live"]: ariaLive,
    ["aria-busy"]: ariaBusy,
    ...componentProps
  } = restProps;
  const hydrationProps = {
    ...containerProps,
    ...(ariaLive !== undefined ? { "aria-live": ariaLive } : {}),
    ...(ariaBusy !== undefined ? { "aria-busy": ariaBusy } : {}),
  };

  return (
    <div
      ref={ref}
      className={`layout-stable ${className}`}
      style={{ contain: 'layout style paint' }}
    >
      <DeferredHydration
        fallback={<FaqSkeleton srLabel={loadingSrLabel} />}
        idleTimeout={idleTimeout}
        rootMargin={rootMargin}
        {...hydrationProps}
      >
        <FaqLazy {...componentProps} />
      </DeferredHydration>
    </div>
  );
}

// ✅ Export for performance monitoring
export const DeferredSectionConfigs = {
  ReviewBanner: { timeout: 2000, rootMargin: "100px" },
  ServicesTabs: { timeout: 2800, rootMargin: "200px" },
  ProjectsGallery: { timeout: 3200, rootMargin: "250px" },
  Faq: { timeout: 3600, rootMargin: "300px" }
};
