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
  className="flex-1 focus:outline-none scroll-mt-4"
>
  {children}
</main>
      <Footer />
      <SpeedInsights />
    </div>
  );
}
