import Script from "next/script";

const isProd = process.env.NODE_ENV === "production";
const shouldDefer = process.env.NEXT_PUBLIC_DEFER_MAIN_CSS !== "false";
const mainCssSelector =
  'link[rel="stylesheet"][href*="/_next/static/css/"], link[rel="stylesheet"][href*="/_chunks/"]';
const preloadSelector = 'link[rel="preload"][data-deferred-css="true"]';

function buildScript(hrefs = []) {
  const targets = Array.isArray(hrefs) ? hrefs : [];
  return `
    (() => {
      if (!${isProd} || !${shouldDefer}) return;
      if (typeof document === "undefined") return;

      const mainCssSelector = ${JSON.stringify(mainCssSelector)};
      const preloadSelector = ${JSON.stringify(preloadSelector)};

      const ensurePreload = (href) => {
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
      };

      const originals = Array.from(document.querySelectorAll(mainCssSelector));
      const targetHrefs = ${JSON.stringify(targets)}.length
        ? ${JSON.stringify(targets)}
        : Array.from(new Set(originals.map((link) => link.getAttribute("href")).filter(Boolean)));

      if (!targetHrefs.length && !originals.length) return;

      const preloads = targetHrefs.map((href) => ensurePreload(href));

      originals.forEach((link) => {
        link.media = "print";
        link.dataset.deferProcessed = "true";
      });

      const activate = (preload) => {
        preload.rel = "stylesheet";
        preload.media = "all";
        preload.dataset.deferredApplied = "true";

        originals.forEach((original) => {
          if (original.getAttribute("href") === preload.getAttribute("href")) {
            original.disabled = true;
            original.media = "all";
            original.dataset.deferredApplied = "true";
          }
        });
      };

      preloads.forEach((preload) => {
        if (preload.rel === "stylesheet" || preload.dataset.deferredApplied === "true") {
          activate(preload);
          return;
        }

        preload.addEventListener("load", () => activate(preload), { once: true });

        requestAnimationFrame(() => {
          if (preload.dataset.deferredApplied === "true") return;
          activate(preload);
        });
      });
    })();
  `;
}

export default function NonCriticalStylesheet({ hrefs = [] }) {
  if (!isProd || !shouldDefer) return null;
  const inlineScript = buildScript(hrefs);

  return (
    <Script id="non-critical-stylesheet" strategy="afterInteractive">
      {inlineScript}
    </Script>
  );
}
