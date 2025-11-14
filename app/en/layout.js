import DocumentDirection from "../../components/i18n/DocumentDirection.client";
import SiteHeader from "../../components/i18n/SiteHeader";
import SiteFooter from "../../components/i18n/SiteFooter";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { LOCALE_CONTENT } from "../../lib/i18n/localeContent";

const content = LOCALE_CONTENT.en;

export default function EnglishLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col bg-white text-neutral-900">
      <DocumentDirection lang="en" dir={content.direction} />
      <SiteHeader locale="en" strings={{ ...content.header, direction: content.direction }} />
      <main
        id="main-content"
        role="main"
        tabIndex={-1}
        className="flex-1 pb-16 pt-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 scroll-mt-4"
      >
        {children}
      </main>

      <SiteFooter strings={content.footer} />
      <SpeedInsights />
    </div>
  );
}
