// components/UtilityBar.client.js
"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    const scheduleRender = () => setShouldRender(true);

    // Tarayıcı destekliyorsa idle sırasında yükle
    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleRender, {
        timeout: 1200,
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        }
      };
    }

    // Desteklemiyorsa hafif gecikmeyle yükle
    const timerId = window.setTimeout(scheduleRender, 1200);
    return () => window.clearTimeout(timerId);
  }, [shouldRender]);

  // Henüz yüklemiyoruz → hiçbir şey gösterme
  if (!shouldRender) return null;

  // Artık erişilebilirlik paneli yüklenecek
  return <UtilityBar />;
}
