import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  // Defer font loading so the hero visual can appear first.
  preload: false,
  adjustFontFallback: true,
  variable: "--font-inter",
});
