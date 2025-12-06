// app/(tr)/(site)/layout.jsx
import Footer from "@/components/Footer";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { ReviewBannerDeferred } from "@/components/DeferredSections.client"; 

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const content = LOCALE_CONTENT.tr;

// Metadata ayarları
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
          MAIN CONTENT (Header Boşluğu)
      ================================= */}
      <main
        id="_main_content" 
        role="main"
        aria-label="Sahneva ana içerik bölgesi"
        aria-live="polite"
        aria-atomic="true"
        tabIndex={-1}
        // Root Layout'taki Fixed Header'ın altını açar
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
      >
        <div className="overflow-x-hidden">{children}</div>
      </main>
      
      {/* ——— REVIEW BANNER (Layout'a taşınan fixed bileşen) ——— */}
      <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />


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
