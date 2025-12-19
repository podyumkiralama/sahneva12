// app/(tr)/(site)/layout.jsx
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";
import {
  HOME_PAGE_TITLE,
  buildAlternateLanguages,
  buildCanonical,
} from "@/lib/seo/seoConfig";

const content = LOCALE_CONTENT.tr;

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
      {children}
    </>
  );
}
