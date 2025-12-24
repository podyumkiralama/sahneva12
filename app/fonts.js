// app/fonts.js
import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal"],
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
