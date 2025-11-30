import DocumentDirection from "../../components/i18n/DocumentDirection.client";
import SiteHeader from "../../components/i18n/SiteHeader";
import SiteFooter from "../../components/i18n/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LOCALE_CONTENT } from "../../lib/i18n/localeContent";

const content = LOCALE_CONTENT.ar;

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "")
  : "https://www.sahneva.com";

export const metadata = {
  title: {
    default: "سحنڤا | تأجير المسارح وشاشات LED والصوت والإضاءة في تركيا",
    template: "%s | سحنڤا",
  },
  description:
    "تأجير المسارح وشاشات LED وأنظمة الصوت والإضاءة مع فرق فنية كاملة في جميع أنحاء تركيا.",
  alternates: {
    canonical: `${SITE_URL}/ar`,
    languages: {
      ar: `${SITE_URL}/ar`,
      en: `${SITE_URL}/en`,
      "tr-TR": `${SITE_URL}/`,
      "x-default": `${SITE_URL}/`,
    },
  },
};

export default function ArabicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <DocumentDirection lang="ar" dir={content.direction} />
      <SiteHeader
        locale="ar"
        strings={{ ...content.header, direction: content.direction }}
      />
      <div
        className="flex-1 pb-16 pt-0 focus-ring scroll-mt-4"
        role="region"
        aria-label="المحتوى الرئيسي"
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
