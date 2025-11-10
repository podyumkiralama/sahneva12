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
    if (typeof window === "undefined") return;

    const scheduleRender = () => setShouldRender(true);

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleRender, { timeout: 2000 });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        }
      };
    }

    const timerId = window.setTimeout(scheduleRender, 1200);
    return () => window.clearTimeout(timerId);
  }, []);

  if (!shouldRender) return null;

  return <UtilityBar />;
}
