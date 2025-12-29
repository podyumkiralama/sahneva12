// app/fonts.js
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/InterVariable.woff2",
      style: "normal",
      weight: "100 900",
    },
  ],
  // Keep text paint unblocked; allow font to swap in after first render.
  display: "swap",
  // Preload to start the font fetch during initial navigation instead of waiting
  // for layout hydration, reducing perceived latency on slow networks.
  preload: true,
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
