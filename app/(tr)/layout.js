import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen bg-white text-neutral-900">
      
      {/* ---- HEADER ---- */}
      <header
        id="_main_header"
        aria-label="Sahneva ana site başlığı"
        className="w-full"
        tabIndex={-1}
      >
        <Navbar />
      </header>

      {/* ---- MAIN CONTENT ---- */}
      <main
        id="_main_content"
        className="flex-1 pt-6 pb-10 lg:pb-12 focus-ring scroll-mt-4"
        tabIndex={-1}
      >
        {children}
      </main>

      {/* ---- FOOTER ---- */}
      <div id="site-footer" className="w-full mt-auto">
        <Footer />
      </div>

      {/* Vercel Analytics */}
      <SpeedInsights />
    </div>
  );
}
