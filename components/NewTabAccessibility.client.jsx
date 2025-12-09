"use client";

import { useEffect } from "react";

const NEW_TAB_HINTS = {
  tr: "(yeni sekmede açılır)",
  en: "(opens in a new tab)",
  ar: "(تفتح في علامة تبويب جديدة)",
};

function getNewTabHint(lang) {
  if (lang?.startsWith("en")) return NEW_TAB_HINTS.en;
  if (lang?.startsWith("ar")) return NEW_TAB_HINTS.ar;
  return NEW_TAB_HINTS.tr;
}

export default function NewTabAccessibility() {
  useEffect(() => {
    const lang = document.documentElement.lang || "tr";
    const newTabHint = getNewTabHint(lang);
    const newTabRegex = /(yeni sekmede|opens in a new tab|tab yeni|new tab|علامة تبويب جديدة)/i;

    document.querySelectorAll("a[target='_blank']").forEach((anchor) => {
      const relParts = new Set(
        (anchor.getAttribute("rel") || "")
          .split(" ")
          .map((part) => part.trim())
          .filter(Boolean),
      );

      relParts.add("noopener");
      relParts.add("noreferrer");

      try {
        const url = new URL(anchor.href, window.location.href);
        if (url.origin !== window.location.origin) {
          relParts.add("nofollow");
        }
      } catch {
        relParts.add("nofollow");
      }

      anchor.setAttribute("rel", Array.from(relParts).join(" "));

      const currentLabel = anchor.getAttribute("aria-label")?.trim();
      const visibleText = anchor.textContent?.trim();
      const title = anchor.getAttribute("title")?.trim();
      const baseLabel = currentLabel || visibleText || title;

      if (!baseLabel) return;

      if (newTabRegex.test(baseLabel)) {
        anchor.setAttribute("aria-label", baseLabel);
        return;
      }

      anchor.setAttribute("aria-label", `${baseLabel} ${newTabHint}`.trim());
    });
  }, []);

  return null;
}
