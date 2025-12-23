// app/fonts.js
import { Inter } from "next/font/google";

export const inter = Inter({
  // Keep the font payload small by limiting to Latin only and the two weights we
  // actually use in headings/body. This trims several unicode shards and the
  // unused variable range that were inflating the download waterfall.
  subsets: ["latin"],
  weight: ["400", "600"],
  // Keep text paint unblocked; allow font to swap in after first render.
  display: "swap",
  // Preload to start the font fetch during initial navigation instead of waiting
  // for layout hydration, reducing perceived latency on slow networks.
  preload: true,
  adjustFontFallback: true,
  variable: "--font-inter",
  fallback: [
    "system-ui",
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica Neue",
    "Arial",
    "sans-serif",
  ],
});

