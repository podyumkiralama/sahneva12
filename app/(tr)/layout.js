// app/(tr)/(site)/layout.jsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UtilityBar from "@/components/UtilityBar.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const content = LOCALE_CONTENT.tr;

// Metadata dil ayarları
export const metadata = {
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
    <div
      className="flex min-h-screen flex-col bg-white text-neutral-900"
      dir={content.direction}
    >
      {/* ================================
          HEADER (Sabitlenmiş)
          ID: _main_header (SkipLinks hedefi)
      ================================= */}
      <header
        id="_main_header"
        role="banner"
        aria-label="Sahneva site başlığı ve ana gezinme"
        // Sabit başlık için 'sticky top-0' yerine 'fixed top-0' kullanıldı.
        className="w-full fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm shadow-md"
      >
        <UtilityBar />
        <Navbar />
        {/* StickyVideoRail client component olduğu için burada kalmalı */}
        <StickyVideoRailclient /> 
      </header>

      {/* ================================
          MAIN CONTENT (İçerik, Padding'i Header yüksekliğine ayarlar)
          ID: _main_content (SkipLinks hedefi)
      ================================= */}
      <main
        id="_main_content"
        role="main"
        aria-label="Sahneva ana içerik bölgesi"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        // Sabit header yüksekliği kadar üst boşluk ekler (pt-16/lg:pt-20)
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24" 
      >
        {/* Children (page.js) içeriği burada render edilir */}
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ================================
          FOOTER
      ================================= */}
      <footer
        id="_main_footer"
        role="contentinfo"
        aria-label="Sahneva site altbilgi"
      >
        <Footer />
      </footer>

      <DeferredSpeedInsights />
    </div>
  );
}
