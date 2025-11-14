import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import UtilityBar from "../../components/UtilityBar.client";
import { SpeedInsights } from "@vercel/speed-insights/next";

export default function TurkishLayout({ children }) {
  return (
    <div className="flex flex-col min-h-screen">
      <UtilityBar />
      <Navbar />
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex-1 pt-6 pb-10 lg:pb-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 scroll-mt-4"
      >
        {children}
      </main>

      <Footer />
      <SpeedInsights />
    </div>
  );
}
