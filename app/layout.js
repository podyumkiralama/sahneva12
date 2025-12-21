// app/layout.jsx
import fs from "node:fs";
import path from "node:path";
import "../styles/globals.css";

import SkipLinks from "@/components/SkipLinks";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import NonCriticalStylesheet from "@/components/NonCriticalStylesheet.client";
import { getCssAssetHrefs } from "@/lib/cssManifest";
import Script from "next/script";

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

const CSS_DEFER_BOOTSTRAP = `
  (() => {
    const selector = 'link[rel="stylesheet"][href*="/_next/static/css/"]';
    const makeNonBlocking = (link) => {
      if (!link || link.dataset.deferredBootstrap === "true") return;

      link.media = "print";
      link.fetchPriority = link.fetchPriority || "high";
      link.dataset.deferredBootstrap = "true";

      const enable = () => {
        link.media = "all";
        link.rel = "stylesheet";
        link.dataset.deferredApplied = "true";
      };

      link.addEventListener("load", enable, { once: true });

      // Fallback in case the load event fires before this script runs.
      requestAnimationFrame(() => {
        if (link.dataset.deferredApplied === "true") return;
        enable();
      });
    };

    const upgradeExisting = () => {
      document.querySelectorAll(selector).forEach((link) => makeNonBlocking(link));
    };

    if (document.readyState === "complete" || document.readyState === "interactive") {
      upgradeExisting();
    } else {
      document.addEventListener("DOMContentLoaded", upgradeExisting, { once: true });
    }
  })();
`;

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
      className={`${inter.className} ${inter.variable}`}
      suppressHydrationWarning
    >
      <head>
        <style
          data-critical="above-the-fold"
          dangerouslySetInnerHTML={{ __html: criticalCss }}
        />
        {shouldDeferCss ? (
          <>
            <Script id="defer-main-css" strategy="beforeInteractive">
              {CSS_DEFER_BOOTSTRAP}
            </Script>
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
            <noscript
              dangerouslySetInnerHTML={{
                __html: deferredCssHrefs
                  .map((href) => `<link rel="stylesheet" href="${href}" />`)
                  .join(""),
              }}
            />
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
