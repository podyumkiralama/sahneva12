import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UtilityBar from "../../components/UtilityBar.client";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <header
        id="_main_header"
        role="banner"
        tabIndex={-1}
        aria-label="Sahneva ana site başlığı"
        className="w-full"
      >
        <UtilityBar />
        <Navbar />
      </header>
      <main
        id="_main_content"
        tabIndex={-1}
        className="flex-1 pt-6 pb-10 lg:pb-12 focus-ring scroll-mt-4"
      >
        {children}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}