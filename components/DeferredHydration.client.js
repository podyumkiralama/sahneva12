"use client";

import dynamic from "next/dynamic";
import DeferredHydration from "./DeferredHydration"; // Az önce düzenlediğimiz dosya

// —————————————————————————————————————————————————
// 1. Ağır Bileşenleri Dinamik Olarak İçe Aktar (Dynamic Import)
// Bu sayede kodlar ana pakete (bundle) dahil olmaz, sonradan yüklenir.
// —————————————————————————————————————————————————

// Örnek: ReviewBanner bileşeni
const ReviewBanner = dynamic(() => import("@/components/ReviewBanner"), {
  ssr: false, // Sunucuda render etme, sadece client'ta
  loading: () => <div className="h-16 bg-neutral-100 animate-pulse" />, // Yüklenirken görünecek iskelet
});

// Örnek: ServicesTabs bileşeni
const ServicesTabs = dynamic(() => import("@/components/ServicesTabs"), {
  ssr: true, // SEO için önemliyse true kalabilir, ama lazy yüklenir
  loading: () => <div className="h-96 w-full bg-neutral-100 rounded-xl animate-pulse" />,
});

// Örnek: ProjectsGallery bileşeni
const ProjectsGallery = dynamic(() => import("@/components/ProjectsGallery"), {
  ssr: false,
  loading: () => <div className="h-[500px] w-full bg-neutral-900 rounded-xl animate-pulse" />,
});

// Örnek: FAQ bileşeni
const Faq = dynamic(() => import("@/components/Faq"), {
  ssr: true,
});

// —————————————————————————————————————————————————
// 2. Deferred (Ertelenmiş) Versiyonları Oluştur
// —————————————————————————————————————————————————

export function ReviewBannerDeferred(props) {
  return (
    <DeferredHydration idleTimeout={2000} {...props}>
      <ReviewBanner />
    </DeferredHydration>
  );
}

export function ServicesTabsDeferred(props) {
  return (
    <DeferredHydration idleTimeout={3000} rootMargin="100px" {...props}>
      <ServicesTabs />
    </DeferredHydration>
  );
}

export function ProjectsGalleryDeferred(props) {
  return (
    <DeferredHydration idleTimeout={4000} rootMargin="200px" {...props}>
      <ProjectsGallery />
    </DeferredHydration>
  );
}

export function FaqDeferred(props) {
  return (
    <DeferredHydration idleTimeout={5000} {...props}>
      <Faq />
    </DeferredHydration>
  );
}
