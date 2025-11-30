// app/(tr)/(site)/layout.jsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://www.sahneva.com";

export const metadata = {
  title: {
    default: "Sahne, LED Ekran, Ses & Işık Kiralama | Sahneva",
    template: "%s | Sahneva",
  },
  description:
    "Türkiye genelinde sahne, podyum, LED ekran, ses-ışık sistemleri ve çadır kiralama hizmetleri. Hızlı kurulum ve profesyonel teknik ekip.",
  alternates: {
    canonical: SITE_URL,
    languages: {
      "tr-TR": SITE_URL,
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      "x-default": SITE_URL,
    },
  },
};

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
      <div
        className="flex-1"
        role="region"
        aria-label="Sahneva ana içerik alanı"
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>

      {/* ---- FOOTER ---- */}
      <Footer />

      {/* Vercel Speed Insights */}
      <SpeedInsights />
    </div>
  );
}
