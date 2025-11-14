"use client";

import { useMemo } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const DEFAULT_LOCALE = "tr";

function resolveLocaleFromPath(pathname) {
  if (!pathname) return DEFAULT_LOCALE;
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";
  return DEFAULT_LOCALE;
}

export default function SkipLinks({ locale }) {
  const pathname = usePathname();

  const activeLocale = useMemo(() => {
    if (locale) return locale;
    return resolveLocaleFromPath(pathname ?? "");
  }, [locale, pathname]);

  const strings =
    LOCALE_CONTENT[activeLocale]?.skipLinks ??
    LOCALE_CONTENT[DEFAULT_LOCALE].skipLinks;

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-2 left-2 z-[9999] space-y-2">
      <a
        href="#main-content"
        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {strings?.toMain ?? LOCALE_CONTENT[DEFAULT_LOCALE].skipLinks.toMain}
      </a>
      <a
        href="#main-header"
        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {strings?.toHeader ?? LOCALE_CONTENT[DEFAULT_LOCALE].skipLinks.toHeader}
      </a>
      <a
        href="#main-footer"
        className="inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-500/70 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        {strings?.toFooter ?? LOCALE_CONTENT[DEFAULT_LOCALE].skipLinks.toFooter}
      </a>
    </div>
  );
}
