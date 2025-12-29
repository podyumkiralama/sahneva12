import SiteHeader from "../../components/i18n/SiteHeader";
import SiteFooter from "../../components/i18n/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LOCALE_CONTENT } from "../../lib/i18n/localeContent";
import {
  buildAlternateLanguages,
  buildCanonical,
} from "@/lib/seo/seoConfig";
import DocumentDirection from "@/components/i18n/DocumentDirection.client";

const content = LOCALE_CONTENT.ar;

export const metadata = {
  title: {
    default: "سحنڤا | تأجير المسارح وشاشات LED والصوت والإضاءة في تركيا",
    template: "%s | سحنڤا",
  },
  description:
    "تأجير المسارح وشاشات LED وأنظمة الصوت والإضاءة مع فرق فنية كاملة في جميع أنحاء تركيا.",
  alternates: {
    canonical: buildCanonical("/ar"),
    languages: buildAlternateLanguages(),
  },
};

export default function ArabicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <DocumentDirection lang="ar" dir={content.direction} />
      <div id="_main_header">
        <SiteHeader
          locale="ar"
          strings={{ ...content.header, direction: content.direction }}
        />
      </div>
      <main
        id="_main_content"
        className="flex-1 pb-16 pt-0 focus-ring scroll-mt-4"
        role="main"
        aria-label="المحتوى الرئيسي"
        tabIndex={-1}
      >
        {children}
      </main>

      <div id="_main_footer">
        <SiteFooter strings={content.footer} />
      </div>
      <SpeedInsights />
    </div>
  );
}
