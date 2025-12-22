// app/fonts.js
import localFont from "next/font/local";

const systemFontStack = [
  "system-ui",
  "-apple-system",
  "BlinkMacSystemFont",
  "Segoe UI",
  "Roboto",
  "Helvetica Neue",
  "Arial",
  "sans-serif",
];

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/InterVariable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: systemFontStack,
});
