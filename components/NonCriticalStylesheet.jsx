"use client";

import { useEffect } from "react";

// components/NonCriticalStylesheet.jsx
// Loads non-critical polish styles asynchronously to prevent render-blocking.

const HREF = "/css/non-critical.css";

export default function NonCriticalStylesheet() {
  useEffect(() => {
    const existingLink = document.querySelector(
      `link[rel="stylesheet"][href="${HREF}"]`
    );

    if (!existingLink) return undefined;

    const enableStylesheet = () => {
      existingLink.media = "all";
      existingLink.dataset.loaded = "true";
    };

    if (existingLink.media === "all") return undefined;

    if (existingLink.sheet) {
      enableStylesheet();
      return undefined;
    }

    existingLink.addEventListener("load", enableStylesheet, { once: true });

    return () => existingLink.removeEventListener("load", enableStylesheet);
  }, []);

  const handleLoad = (event) => {
    event.currentTarget.media = "all";
  };

  return (
    <>
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
