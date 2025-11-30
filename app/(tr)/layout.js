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
      <div
        role="region"
        aria-label="Sahneva site navigasyonu"
        className="w-full relative z-50"
      >
        <Navbar />
      </div>

      {/* ---- MAIN CONTENT ----
         Navbar fixed olduğu için içerik altında kalmaması adına
         padding-top değerleri Navbar yüksekliğine göre ayarlı:
         Mobil: h-16 -> pt-16
         Desktop: h-20 -> lg:pt-20
      */}
      <main
        id="_main_content"
        role="main"
        aria-label="Sahneva ana içerik bölgesi"
        tabIndex={-1}
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
      >
        <div className="overflow-x-hidden">{children}</div>
      </main>

      {/* ---- FOOTER ---- */}
      <Footer />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
