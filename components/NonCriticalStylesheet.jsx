// components/NonCriticalStylesheet.jsx
import Script from "next/script";

const isProd = process.env.NODE_ENV === "production";
const shouldDefer = process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";

const MAIN_CSS_SELECTOR = 'link[rel="stylesheet"][href*="/_next/static/css/"]';
const PRELOAD_SELECTOR = 'link[rel="preload"][data-deferred-css="true"]';

function buildScript(hrefs = []) {
  const targets = Array.isArray(hrefs) ? hrefs : [];

  return `
(() => {
  if (!${isProd} || !${shouldDefer}) return;
  if (typeof document === "undefined") return;

  const mainCssSelector = ${JSON.stringify(MAIN_CSS_SELECTOR)};
  const preloadSelector = ${JSON.stringify(PRELOAD_SELECTOR)};

  const uniq = (arr) => Array.from(new Set((arr || []).filter(Boolean)));

  const ensurePreload = (href) => {
    // Respect existing preload created by server
    const existing = Array.from(document.querySelectorAll(preloadSelector)).find(
      (node) => node.getAttribute("href") === href
    );
    if (existing) return existing;

    // Create preload if missing (safe)
    const preload = document.createElement("link");
    preload.rel = "preload";
    preload.as = "style";
    preload.href = href;
    preload.crossOrigin = "anonymous";
    preload.dataset.deferredCss = "true";
    preload.dataset.deferredStylesheet = "true";
    try { preload.fetchPriority = "high"; } catch (e) {}
    document.head.appendChild(preload);
    return preload;
  };

  const getOriginalStylesheets = () =>
    Array.from(document.querySelectorAll(mainCssSelector))
      .filter((l) => l && l.getAttribute("href"));

  const originals = getOriginalStylesheets();
  const originalHrefs = originals.map((l) => l.getAttribute("href"));

  // If we were given explicit hrefs (from manifest), prefer them.
  // Otherwise fallback to whatever Next emitted.
  const targetHrefs = uniq(${JSON.stringify(targets)}.length ? ${JSON.stringify(targets)} : originalHrefs);

  if (!targetHrefs.length && !originals.length) return;

  // 1) Make existing blocking stylesheets non-blocking ASAP
  originals.forEach((link) => {
    if (link.dataset.deferredProcessed === "true") return;
    link.media = "print";
    link.dataset.deferredProcessed = "true";
  });

  // 2) Ensure preloads exist (warm cache)
  const preloads = targetHrefs.map((href) => ensurePreload(href));

  // 3) Activate styles AFTER window load (and ideally on idle)
  const activateAll = () => {
    const current = getOriginalStylesheets();
    current.forEach((link) => {
      // Turn them back on
      link.media = "all";
      link.dataset.deferredApplied = "true";
    });
  };

  const scheduleActivate = () => {
    // Use idle time if possible to reduce TBT spikes
    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(() => activateAll(), { timeout: 2000 });
    } else {
      setTimeout(() => activateAll(), 50);
    }
  };

  // Preload load listeners (optional)
  preloads.forEach((preload) => {
    if (!preload) return;
    preload.addEventListener("load", () => {
      // Do nothing here intentionally; activation is centralized
      // (avoid early style recalcs / TBT spikes)
    }, { once: true });
  });

  // Main trigger: after full load
  if (document.readyState === "complete") {
    scheduleActivate();
  } else {
    window.addEventListener("load", scheduleActivate, { once: true });
  }

  // Safety fallback: if load never fires for some reason, activate later anyway
  setTimeout(() => {
    try { activateAll(); } catch (e) {}
  }, 8000);
})();
  `;
}

export default function NonCriticalStylesheet({ hrefs = [] }) {
  if (!isProd || !shouldDefer) return null;

  const inlineScript = buildScript(hrefs);

  // Important: run early to flip main CSS links to media=print before they block too much
  return (
    <Script id="non-critical-stylesheet" strategy="beforeInteractive">
      {inlineScript}
    </Script>
  );
}
