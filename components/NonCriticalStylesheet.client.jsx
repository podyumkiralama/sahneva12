"use client";

import { useEffect } from "react";

const isProd = process.env.NODE_ENV === "production";
const shouldDefer = process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";
const mainCssSelector = 'link[rel="stylesheet"][href*="/_next/static/css/"]';
const preloadSelector = 'link[rel="preload"][data-deferred-css="true"]';

function ensurePreload(href) {
  const existing = Array.from(document.querySelectorAll(preloadSelector)).find(
    (node) => node.getAttribute("href") === href,
  );

  if (existing) return existing;

  const preload = document.createElement("link");
  preload.rel = "preload";
  preload.as = "style";
  preload.href = href;
  preload.fetchPriority = "high";
  preload.dataset.deferredCss = "true";
  preload.dataset.deferredStylesheet = "true";
  preload.crossOrigin = "anonymous";
  document.head.appendChild(preload);
  return preload;
}

function activateStylesheet(link, originals) {
  link.rel = "stylesheet";
  link.media = "all";
  link.dataset.deferredApplied = "true";

  originals.forEach((original) => {
    if (original.getAttribute("href") === link.getAttribute("href")) {
      original.disabled = true;
      original.media = "all";
      original.dataset.deferredApplied = "true";
    }
  });
}

export default function NonCriticalStylesheet({ hrefs = [] }) {
  useEffect(() => {
    if (!isProd || !shouldDefer) return;

    const originalStyles = Array.from(document.querySelectorAll(mainCssSelector));
    const targets = hrefs.length
      ? hrefs
      : Array.from(
          new Set(originalStyles.map((link) => link.getAttribute("href")).filter(Boolean)),
        );

    if (!targets.length && !originalStyles.length) return;

    const preloads = targets.map((href) => ensurePreload(href));

    originalStyles.forEach((link) => {
      link.media = "print";
      link.dataset.deferProcessed = "true";
    });

    preloads.forEach((preload) => {
      if (preload.dataset.deferProcessed === "true") return;

      const enable = () => activateStylesheet(preload, originalStyles);

      // If hydration happens after the preload finished, the load event might
      // have already fired. Apply immediately in that case to avoid a missed
      // swap and FOUC.
      if (preload.rel === "stylesheet" || preload.dataset.deferredApplied === "true") {
        enable();
        return;
      }

      preload.addEventListener("load", enable, { once: true });
      preload.dataset.deferProcessed = "true";

      // Fallback to ensure activation even if the load event is missed.
      window.requestAnimationFrame(() => {
        if (preload.dataset.deferredApplied === "true") return;
        enable();
      });
    });
  }, [hrefs]);

  return null;
}
