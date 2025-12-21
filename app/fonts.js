// app/fonts.js
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter-Variable.woff2",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,                 // 🔥 Font gecikmesini düşürür
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});
