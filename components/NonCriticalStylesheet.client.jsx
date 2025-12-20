"use client";

import { useEffect } from "react";

const isProd = process.env.NODE_ENV === "production";
const shouldDefer = process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";
const mainCssSelector = 'link[rel="stylesheet"][href*="/_next/static/css/"]';

function createPreloadLink(href, original) {
  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "style";
  preload.href = href;
  preload.fetchPriority = "high";
  preload.crossOrigin = original?.crossOrigin || undefined;
  preload.dataset.deferredStylesheet = "true";
  return preload;
}

export default function NonCriticalStylesheet() {
  useEffect(() => {
    if (!isProd || !shouldDefer) return;

    const mainLinks = Array.from(document.querySelectorAll(mainCssSelector));
    if (!mainLinks.length) return;

    mainLinks.forEach((link) => {
      if (link.dataset.deferProcessed === "true") return;

      const href = link.getAttribute("href");
      if (!href) return;

      const preload = createPreloadLink(href, link);

      const enableStylesheet = () => {
        preload.rel = "stylesheet";
        preload.media = "all";
        preload.dataset.deferredApplied = "true";

        link.disabled = true;
        link.media = "all";
      };

      preload.addEventListener("load", enableStylesheet, { once: true });

      link.media = "print";
      link.dataset.deferProcessed = "true";

      document.head.appendChild(preload);
    });
  }, []);

  return null;
}
