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
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Arial"],
});
