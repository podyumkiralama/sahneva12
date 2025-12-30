// app/layout.jsx
import "../styles/globals.css";
import { inter } from "./fonts";
import SkipLinks from "@/components/SkipLinks";
import NewTabAccessibility from "@/components/NewTabAccessibility.client";
import AnalyticsConsentWrapper from "@/components/AnalyticsConsentWrapper.client";
import Script from "next/script";

const DEFAULT_LANG = "tr";
const DEFAULT_DIR = "ltr";

/* ================== VIEWPORT ================== */
export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#6d28d9",
};

export const metadata = {
  manifest: "/manifest.json",
};

/* ================== ROOT LAYOUT ================== */
export default function RootLayout({ children }) {
  return (
    <html
      lang={DEFAULT_LANG}
      dir={DEFAULT_DIR}
      className={`${inter.variable} font-sans`}
      suppressHydrationWarning
    >
       <body className="min-h-screen antialiased flex flex-col font-sans">
        <AnalyticsConsentWrapper />
        <SkipLinks />
        <NewTabAccessibility />
        {children}
        <Script id="clarity-id" strategy="beforeInteractive">
  {`window.__CLARITY_ID__="${process.env.NEXT_PUBLIC_CLARITY_ID || ""}"`}
</Script>

<Script src="/clarity.js" strategy="afterInteractive" />

      </body>
    </html>
  );
}
