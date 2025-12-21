// app/fonts.js
import localFont from "next/font/local";

export const inter = localFont({
  src: [
    {
      path: "../public/fonts/inter/Inter-VariableFont_opsz,wght.ttf",
      weight: "100 900",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});
