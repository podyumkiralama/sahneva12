import { Inter } from "next/font/google";

export const inter = Inter({
  subsets: ["latin", "latin-ext"],
  // Keep text paint unblocked; allow font to swap in after first render.
  display: "swap",
  // Defer font loading so the hero visual can appear first.
  preload: false,
  adjustFontFallback: true,
  variable: "--font-inter",
});
