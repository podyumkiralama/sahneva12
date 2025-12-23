// app/layout.jsx
import fs from "node:fs";
import path from "node:path";
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import NonCriticalStylesheet from "@/components/NonCriticalStylesheet";
import { getCssAssetHrefs } from "@/lib/cssManifest";

import { inter } from "./fonts";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const DEFAULT_LOCALE = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";
const DEFAULT_DIR = DEFAULT_LOCALE.direction;

const criticalCss = fs.readFileSync(
  path.join(process.cwd(), "styles", "critical.css"),
  "utf8",
);

const shouldDeferCss =
  process.env.NODE_ENV === "production" &&
  process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";

const deferredCssHrefs = shouldDeferCss ? getCssAssetHrefs() : [];

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
      <head>
        {/* Above-the-fold critical CSS */}
        <style
          data-critical="above-the-fold"
          dangerouslySetInnerHTML={{ __html: criticalCss }}
        />

        {/* Defer main CSS (only in prod unless env disables) */}
        {shouldDeferCss ? (
          <>
            {/* Preload discovered CSS assets (helps warm cache) */}
            {deferredCssHrefs.map((href) => (
              <link
                key={href}
                rel="preload"
                as="style"
                href={href}
                crossOrigin="anonymous"
                data-deferred-css="true"
                fetchPriority="high"
              />
            ))}

            {/* No-JS fallback */}
            <noscript
              dangerouslySetInnerHTML={{
                __html: deferredCssHrefs
                  .map((href) => `<link rel="stylesheet" href="${href}" />`)
                  .join(""),
              }}
            />

            {/* Single source of truth: one script to switch /_next/static/css/ links non-blocking */}
            <NonCriticalStylesheet hrefs={deferredCssHrefs} />
          </>
        ) : null}
      </head>

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
