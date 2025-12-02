// app/(tr)/(site)/layout.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UtilityBar from "@/components/UtilityBar.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const content = LOCALE_CONTENT.tr;

export const metadata = {
  // content.meta tanımlı olduğu için hata vermez
  title: content?.meta?.title ?? "Sahneva",
  description: content?.meta?.description ?? "Etkinlik Prodüksiyon Hizmetleri",
  alternates: {
    canonical: `${SITE_URL}/`,
    languages: {
      "tr-TR": `${SITE_URL}/`,
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      "x-default": `${SITE_URL}/`,
    },
  },
};

export default function TurkishLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900" dir={content.direction}>
      
      {/* ---- HEADER ---- 
          ID: _main_header (SkipLink burayı hedefler)
      */}
      <header
        id="_main_header"
        role="banner"
        aria-label="Sahneva site başlığı ve ana gezinme"
        className="w-full relative z-50"
      >
        {/* SiteHeader yerine doğrudan bileşenleri koyduk */}
        <UtilityBar />
        <Navbar />
        <StickyVideoRailclient />
      </header>

      {/* ---- MAIN CONTENT ---- 
          ID: _main_content (SkipLink burayı hedefler)
          Fixed header için üst boşluk: pt-16 (mobil), lg:pt-20 (desktop)
      */}
      <main
        id="_main_content"
        role="main"
        aria-label="Sahneva ana içerik bölgesi"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
      >
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ---- FOOTER ---- 
          ID: _main_footer (SkipLink burayı hedefler)
      */}
      <footer id="_main_footer" role="contentinfo">
        {/* SiteFooter yerine doğrudan Footer bileşenini koyduk */}
        <Footer />
      </footer>

      <DeferredSpeedInsights />
    </div>
  );
}
