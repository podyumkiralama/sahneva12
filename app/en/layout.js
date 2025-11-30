import DocumentDirection from "../../components/i18n/DocumentDirection.client";
import SiteHeader from "../../components/i18n/SiteHeader";
import SiteFooter from "../../components/i18n/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LOCALE_CONTENT } from "../../lib/i18n/localeContent";

const content = LOCALE_CONTENT.en;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://www.sahneva.com";

export const metadata = {
  title: {
    default: "Sahneva | Stage, LED Wall, Sound & Lighting Rentals in Türkiye",
    template: "%s | Sahneva",
  },
  description:
    "Nationwide stage, LED wall, sound and lighting rentals with turnkey technical crews across Türkiye.",
  alternates: {
    canonical: `${SITE_URL}/en`,
    languages: {
      en: `${SITE_URL}/en`,
      ar: `${SITE_URL}/ar`,
      "tr-TR": `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },
};

export default function EnglishLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <DocumentDirection lang="en" dir={content.direction} />
      <SiteHeader
        locale="en"
        strings={{ ...content.header, direction: content.direction }}
      />
      <div
        className="flex-1 pb-16 pt-0 focus-ring scroll-mt-4"
        role="region"
        aria-label="Main content"
        aria-live="polite"
        aria-atomic="true"
      >
        {children}
      </div>

      <SiteFooter strings={content.footer} />
      <SpeedInsights />
    </div>
  );
}
