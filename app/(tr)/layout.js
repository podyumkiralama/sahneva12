// app/(tr)/(site)/layout.jsx
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import UtilityBar from "@/components/UtilityBar.client";
import StickyVideoRailclient from "@/components/StickyVideoRail.client";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  buildAlternateLanguages,
  buildCanonical,
} from "@/lib/seo/seoConfig";

const content = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";

export const metadata = {
  title: {
    default: HOME_PAGE_TITLE,
    template: `%s | Sahneva Organizasyon`,
  },
  description: content.meta.description,
  alternates: {
    canonical: buildCanonical("/"),
    languages: buildAlternateLanguages(),
  },
};

export default function TurkishLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col bg-white text-neutral-900"
      dir={content.direction}
    >
      <DocumentDirection lang={DEFAULT_LANG} dir={content.direction} />
      {/* ================================
          HEADER
          ID: _main_header  (SkipLinks hedefi)
      ================================= */}
      <header
        id="_main_header"
        role="banner"
        aria-label="Sahneva site başlığı ve ana gezinme"
        className="w-full relative z-50"
      >
        <UtilityBar />
        <Navbar />
        <StickyVideoRailclient />
      </header>

      {/* ================================
          MAIN CONTENT
          ID: _main_content (SkipLinks hedefi)
          Fixed header boşluğu: pt-16 / lg:pt-20
      ================================= */}
      <main
        id="_main_content"
        role="main"
        aria-label="Sahneva ana içerik bölgesi"
        tabIndex={-1}
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
      >
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ================================
          FOOTER
          ID: _main_footer (SkipLinks hedefi)
      ================================= */}
      <Footer />

      <DeferredSpeedInsights />
    </div>
  );
}
