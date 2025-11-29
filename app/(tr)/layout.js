// app/layout.jsx
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900">
      
      {/* ---- HEADER ---- 
         Navbar 'fixed' olduğu için header container'ı sadece semantik amaçlıdır.
         tabIndex kaldırıldı, header'a focuslanmak standart bir davranış değildir.
      */}
      <header
        id="_main_header"
        aria-label="Sahneva ana site başlığı"
        className="w-full relative z-50" 
      >
        <Navbar />
      </header>

      {/* ---- MAIN CONTENT ---- 
         DÜZELTME: Navbar fixed olduğu için içeriğin altında kalmaması adına
         padding-top (pt) değerleri Navbar yüksekliği ile eşitlendi.
         Mobil: h-16 -> pt-16
         Desktop: h-20 -> lg:pt-20
         Ekstra boşluk için +4 veya +6 eklenebilir.
      */}
      <main
        id="_main_content"
        aria-label="Ana içerik"
        className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* ---- FOOTER ---- */}
      <div id="site-footer-wrapper" className="w-full mt-auto">
        <Footer />
      </div>

      {/* Vercel Analytics */}
      <SpeedInsights />
    </div>
  );
}
