"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const DEFAULT_LOCALE = "tr";
const FALLBACK_STRINGS = LOCALE_CONTENT[DEFAULT_LOCALE].skipLinks;
const LINK_CLASSNAME =
  "inline-flex items-center rounded-md bg-slate-900 px-4 py-2 text-sm font-semibold text-white shadow-lg focus-ring";

function normalizeLocale(value) {
  if (!value) return DEFAULT_LOCALE;
  const normalized = value.toLowerCase();
  if (normalized.startsWith("en")) return "en";
  if (normalized.startsWith("ar")) return "ar";
  return DEFAULT_LOCALE;
}

function resolveLocaleFromPath(pathname) {
  if (!pathname) return DEFAULT_LOCALE;
  const segment = pathname.split("/").filter(Boolean)[0];
  return normalizeLocale(segment);
}

export default function SkipLinks() {
  const pathname = usePathname();
  const [documentLocale, setDocumentLocale] = useState();

  useEffect(() => {
    if (typeof document === "undefined") return undefined;

    const updateLocale = () => {
      setDocumentLocale(normalizeLocale(document.documentElement.lang));
    };

    updateLocale();

    const observer = new MutationObserver(updateLocale);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });

    return () => observer.disconnect();
  }, []);

  const activeLocale = useMemo(
    () => documentLocale ?? resolveLocaleFromPath(pathname ?? ""),
    [documentLocale, pathname]
  );

  const strings = LOCALE_CONTENT[activeLocale]?.skipLinks ?? FALLBACK_STRINGS;

  return (
    <div className="sr-only focus-within:not-sr-only fixed top-2 left-2 z-[9999] space-y-2">
      <a href="#main-content" className={LINK_CLASSNAME}>
        {strings?.toMain ?? FALLBACK_STRINGS.toMain}
      </a>
      <a href="#main-header" className={LINK_CLASSNAME}>
        {strings?.toHeader ?? FALLBACK_STRINGS.toHeader}
      </a>
      <a href="#site-footer" className={LINK_CLASSNAME}>
        {strings?.toFooter ?? FALLBACK_STRINGS.toFooter}
      </a>
    </div>
  );
}
