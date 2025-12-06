// app/(tr)/(site)/layout.jsx
import Footer from "@/components/Footer";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import { ReviewBannerDeferred } from "@/components/DeferredSections.client"; // YENİ İMPORT

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

const content = LOCALE_CONTENT.tr;

// Metadata dil ayarları
export const metadata = { /* ... */ };

export default function TurkishLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col bg-white text-neutral-900"
      dir={content.direction}
    >
      {/* Header Root Layout'ta */}

      <main /* ... */ >
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ——— REVIEW BANNER YENİ KONUMU (FOOTER'dan önce) ——— */}
      <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />

      <footer /* ... */>
        <Footer />
      </footer>

      <DeferredSpeedInsights />
    </div>
  );
}
