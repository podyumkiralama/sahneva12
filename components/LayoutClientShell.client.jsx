"use client";

import DocumentDirection from "./i18n/DocumentDirection.client";
import NewTabAccessibility from "./NewTabAccessibility.client";

/**
 * Layout genelinde zorunlu olmayan scriptleri geciktirerek
 * ilk render yükünü azaltır.
 */
export default function LayoutClientShell({ lang, dir }) {
  return (
    <>
      <DocumentDirection lang={lang} dir={dir} />
      <NewTabAccessibility />
    </>
  );
}
