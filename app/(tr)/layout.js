// app/(tr)/(site)/layout.jsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900">
      {/* ---- HEADER ----
         Navbar 'fixed' olduğu için header container'ı semantik amaçlı.
      */}
      <header
        id="_main_header"
        aria-label="Sahneva ana site başlığı"
        role="banner"
        className="w-full relative z-50"
      >
        <Navbar />
      </header>

      {/* ---- MAIN CONTENT ----
         Navbar fixed olduğu için içerik altında kalmaması adına
         padding-top değerleri Navbar yüksekliğine göre ayarlı:
         Mobil: h-16 -> pt-16
         Desktop: h-20 -> lg:pt-20
      */}
      <main
        id="_main_content"
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        tabIndex={-1} // Skip link odak hedefi
      >
        {children}
      </main>

      {/* ---- FOOTER ---- */}
      <div id="site-footer-wrapper" className="w-full mt-auto">
        <Footer />
      </div>

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
