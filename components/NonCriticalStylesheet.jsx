"use client";

// components/NonCriticalStylesheet.jsx
// Loads non-critical polish styles asynchronously to prevent render-blocking.

const HREF = "/css/non-critical.css";

export default function NonCriticalStylesheet() {
  const handleLoad = (event) => {
    event.currentTarget.media = "all";
  };

  return (
    <>
      <link rel="preload" href={HREF} as="style" />
      <link
        rel="stylesheet"
        href={HREF}
        media="print"
        onLoad={handleLoad}
        data-priority="deferred"
      />
      <noscript>
        <link rel="stylesheet" href={HREF} />
      </noscript>
    </>
  );
}
