const CRITICAL_STYLE = `
  :root {
    color-scheme: light;
    --font-system-stack: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
      "Helvetica Neue", Arial, sans-serif;
    text-size-adjust: 100%;
  }
  *, *::before, *::after {
    box-sizing: border-box;
  }
  html {
    font-size: 100%;
    scroll-behavior: smooth;
    min-height: 100%;
  }
  body {
    margin: 0;
    min-height: 100%;
    background-color: #ffffff;
    color: #0f172a;
    font-family: var(--font-inter, var(--font-inter-fallback, var(--font-system-stack)));
    line-height: 1.6;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  a {
    color: inherit;
    text-decoration: none;
  }
  img, picture, video, canvas, svg {
    max-width: 100%;
    height: auto;
    display: block;
  }
  button,
  input,
  textarea,
  select {
    font: inherit;
  }
  ::selection {
    background-color: rgba(109, 40, 217, 0.18);
  }
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

// Keep this script minimal and avoid DOM mutations that would change the
// server-rendered <html> before React hydrates (prevents hydration errors).
const CRITICAL_SCRIPT = `(() => {
  if (typeof window.requestIdleCallback !== "function") {
    window.requestIdleCallback = function (cb) {
      const start = Date.now();
      return window.setTimeout(() => {
        cb({
          didTimeout: false,
          timeRemaining() {
            return Math.max(0, 50 - (Date.now() - start));
          },
        });
      }, 1);
    };
  }

  if (typeof window.cancelIdleCallback !== "function") {
    window.cancelIdleCallback = function (id) {
      window.clearTimeout(id);
    };
  }
})();`;

function CriticalAssets() {
  return (
    <>
      <style
        id="critical-inline-style"
        data-priority="critical"
        dangerouslySetInnerHTML={{ __html: CRITICAL_STYLE.trim() }}
      ></style>
      <script
        id="idle-callback-polyfill"
        dangerouslySetInnerHTML={{ __html: CRITICAL_SCRIPT }}
        suppressHydrationWarning
      ></script>
    </>
  );
}

export default CriticalAssets;
