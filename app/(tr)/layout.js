import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UtilityBar from "../../components/UtilityBar.client"; 
import StickyVideoRail from "@/components/StickyVideoRail";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen relative">
      
      <StickyVideoRail />
      
      <header
        id="main-header"
        className="w-full relative z-40"
      >
        <UtilityBar />
        <Navbar />
      </header>

      <main
        id="main-content"
        className="flex-1 pt-0 focus:outline-none scroll-mt-24" 
        tabIndex={-1}
      >
        {children}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}
