// app/(tr)/(site)/layout.jsx
import DocumentDirection from "@/components/i18n/DocumentDirection.client";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  buildAlternateLanguages,
  buildCanonical,
} from "@/lib/seo/seoConfig";

const content = LOCALE_CONTENT.tr;
const DEFAULT_LANG = "tr";

export const metadata = {
  title: {
    default: HOME_PAGE_TITLE,
    template: `%s | Sahneva`,
  },
  description: content.meta.description,
  alternates: {
    canonical: buildCanonical("/"),
    languages: buildAlternateLanguages(),
  },
};

export default function TurkishLayout({ children }) {
  return (
    <>
      <DocumentDirection lang={DEFAULT_LANG} dir={content.direction} />
      {children}
    </>
  );
}
