// app/fonts.js
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  // Leave fonts to load with page CSS instead of preloading so hero media can start sooner.
  preload: false,
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
