"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((mod) => mod.SpeedInsights), {
  ssr: false,
  loading: () => null,
});

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g"]);

// Avoid vendor-prefixed Network Information API properties that trigger Lighthouse
// "Deprecated API" warnings. Rely only on the standard `navigator.connection`
// shape when it exists.
function canLoadInsights() {
  if (typeof navigator === "undefined") return true;
  const connection = navigator.connection;
  if (!connection) return true;
  if (connection.saveData) return false;
  const effective = connection.effectiveType?.toLowerCase?.();
  if (effective && SLOW_CONNECTION_TYPES.has(effective)) return false;
  return true;
}

export default function DeferredSpeedInsights() {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    if (!canLoadInsights()) return;
    if (shouldRender) return;

    let idleHandle;
    let timeoutHandle;

    const schedule = () => setShouldRender(true);

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleHandle = window.requestIdleCallback(schedule, { timeout: 5000 });
    } else if (typeof window !== "undefined") {
      timeoutHandle = window.setTimeout(schedule, 3200);
    }

    return () => {
      if (idleHandle && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        window.cancelIdleCallback(idleHandle);
      }
      if (timeoutHandle && typeof window !== "undefined") {
        window.clearTimeout(timeoutHandle);
      }
    };
  }, [shouldRender]);

  if (!shouldRender) {
    return null;
  }

  return <SpeedInsights />;
}
