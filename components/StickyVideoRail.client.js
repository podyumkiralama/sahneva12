// components/StickyVideoRail.client.js
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const StickyVideoRailLazy = dynamic(() => import("./StickyVideoRail"), {
  ssr: false,
  loading: () => null,
});

export default function StickyVideoRailClient() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    const scheduleRender = () => setShouldRender(true);

    // Tarayıcı boşta kalınca yükle (tercih edilen)
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleRender, { timeout: 2000 });
      return () => {
        if ("cancelIdleCallback" in window) window.cancelIdleCallback(idleId);
      };
    }

    // Fallback
    const timerId = window.setTimeout(scheduleRender, 2000);
    return () => window.clearTimeout(timerId);
  }, [shouldRender]);

  if (!shouldRender) return null;
  return <StickyVideoRailLazy />;
}
