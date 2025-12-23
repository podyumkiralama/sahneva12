// app/layout.jsx
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { inter } from "./fonts";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;

/* ================== VIEWPORT ================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
      <head />

      <body className="min-h-screen bg-white text-neutral-900 antialiased flex flex-col font-sans">
        <SkipLinks />

        <header
          id="_main_header"
          aria-label="Sahneva site başlığı ve ana gezinme"
          className="w-full relative z-50"
        >
          <Navbar />
        </header>

        <main
          id="_main_content"
          aria-label="Sahneva ana içerik"
          tabIndex={-1}
          className="flex-1 pt-16 lg:pt-20 focus:outline-none scroll-mt-24"
        >
          <div className="overflow-x-hidden">{children}</div>
        </main>

        <Footer
          id="_main_footer"
          ariaLabel="Sahneva site altbilgi"
          descriptionId="_main_footer_desc"
        />
      </body>
    </html>
  );
}
