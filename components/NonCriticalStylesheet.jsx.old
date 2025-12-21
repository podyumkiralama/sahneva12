"use client";

import { useEffect } from "react";

// components/NonCriticalStylesheet.jsx
// Loads non-critical polish styles asynchronously to prevent render-blocking.

const HREF = "/css/non-critical.css";

export default function NonCriticalStylesheet() {
  useEffect(() => {
    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = HREF;
    link.media = "print";
    link.dataset.priority = "deferred";

    const enableStylesheet = () => {
      link.media = "all";
      link.dataset.loaded = "true";
    };

    link.addEventListener("load", enableStylesheet, { once: true });

    document.head.appendChild(link);

    return () => {
      link.removeEventListener("load", enableStylesheet);
      link.remove();
    };
  }, []);

  return null;
}
