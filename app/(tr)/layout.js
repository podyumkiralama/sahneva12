// app/(tr)/(site)/layout.jsx
// ...
import Footer from "@/components/Footer";
import DeferredSpeedInsights from "@/components/DeferredSpeedInsights.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

// EKLENECEK: ReviewBannerDeferred import'u
import { ReviewBannerDeferred } from "@/components/DeferredSections.client"; 


const SITE_URL =
// ...

export default function TurkishLayout({ children }) {
  return (
    <div
      className="flex min-h-screen flex-col bg-white text-neutral-900"
      dir={content.direction}
    >
      {/* ... MAIN CONTENT kısmı ... */}
      <main
        id="_main_content" // SkipLinks hedefi
        role="main"
        // ...
      >
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ——— EKLENEN KISIM: Review Banner (Footer'dan önce) ——— */}
      <ReviewBannerDeferred idleTimeout={2000} rootMargin="100px" />

      {/* ... FOOTER kısmı ... */}
      <footer
        id="_main_footer" // SkipLinks hedefi
        // ...
      >
        <Footer />
      </footer>

      <DeferredSpeedInsights />
    </div>
  );
}
