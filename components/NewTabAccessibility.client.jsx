// components/NewTabAccessibility.client.jsx
"use client";

import { useEffect } from "react";

const HINTS = {
  tr: "– yeni sekmede açılır",
  en: "– opens in a new tab",
  ar: "– يفتح في علامة تبويب جديدة",
};

function detectLangSafe() {
  try {
    const lang = document.documentElement.lang?.toLowerCase();
    if (lang?.startsWith("tr")) return "tr";
    if (lang?.startsWith("en")) return "en";
    if (lang?.startsWith("ar")) return "ar";

    const navLang = navigator.language?.toLowerCase();
    if (navLang?.startsWith("tr")) return "tr";
    if (navLang?.startsWith("en")) return "en";
    if (navLang?.startsWith("ar")) return "ar";
  } catch {
    // ignore
  }
  return "tr";
}

export default function NewTabAccessibility() {
  useEffect(() => {
    const lang = detectLangSafe();
    const hint = HINTS[lang] || HINTS.tr;
    const processed = new WeakSet();

    const hasExistingHint = (labelOrText = "") =>
      /(yeni sekmede açılır|opens in a new tab|علامة تبويب جديدة)/i.test(
        labelOrText
      );

    const isExternal = (href) => {
      try {
        const url = new URL(href, window.location.href);
        return url.origin !== window.location.origin;
      } catch {
        return false;
      }
    };

    const isWhatsappLink = (href) => {
      try {
        const url = new URL(href, window.location.href);
        return url.hostname === "wa.me" || url.hostname.endsWith("whatsapp.com");
      } catch {
        return false;
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const a = entry.target;
          if (processed.has(a)) return;
          processed.add(a);
          observer.unobserve(a);

          // ExternalLink ile oluşturulmuş linkleri atla (örnek data attribute)
          if (a.dataset?.externalLink === "true") return;

          const href = a.getAttribute("href") || "";
          if (!href || !isExternal(href)) return;

          // REL / REFPOLICY tamamlama (eğer eksikse)
          const rel = new Set(
            (a.getAttribute("rel") || "")
              .split(" ")
              .filter(Boolean)
          );
          rel.add("noopener");
          rel.add("noreferrer");
          if (!isWhatsappLink(href)) {
            rel.add("nofollow");
          }
          a.setAttribute("rel", [...rel].join(" "));

          if (!a.getAttribute("referrerpolicy")) {
            a.setAttribute("referrerpolicy", "no-referrer");
          }

          // ARIA-LABEL tamamlama
          const label = a.getAttribute("aria-label")?.trim() || "";
          const text = a.textContent?.trim() || "";

          const base = label || text;
          if (!base || hasExistingHint(base)) return;

          a.setAttribute("aria-label", `${base} ${hint}`);
        });
      },
      {
        threshold: 0.1,
      }
    );

    // Sadece target="_blank" linkler
    document
      .querySelectorAll("a[target='_blank']")
      .forEach((a) => observer.observe(a));

    return () => observer.disconnect();
  }, []);

  return null;
}
