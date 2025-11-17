"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g"]);

function getConnectionInfo() {
  if (typeof navigator === "undefined") return null;
  return (
    navigator.connection ||
    navigator.mozConnection ||
    navigator.webkitConnection ||
    null
  );
}

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);
  const [manualTrigger, setManualTrigger] = useState(false);
  const [showManualPrompt, setShowManualPrompt] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    const connection = getConnectionInfo();
    const effective = connection?.effectiveType?.toLowerCase?.();
    const saveData = Boolean(connection?.saveData);
    const isVerySlow = effective ? SLOW_CONNECTION_TYPES.has(effective) : false;

    // Çok yavaş bağlantıda kullanıcıdan izin iste
    if (!manualTrigger && (saveData || isVerySlow)) {
      setShowManualPrompt(true);
      return;
    }

    setShowManualPrompt(false);

    const scheduleRender = () => setShouldRender(true);

    // Orta–yavaş bağlantılar için ufak gecikme
    const timeout = effective === "3g" ? 2200 : 1200;

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(scheduleRender, {
        timeout: timeout + 600,
      });
      return () => {
        if ("cancelIdleCallback" in window) {
          window.cancelIdleCallback(idleId);
        }
      };
    }

    const timerId = window.setTimeout(scheduleRender, timeout);
    return () => window.clearTimeout(timerId);
  }, [manualTrigger, shouldRender]);

  // Artık erişilebilirlik paneli yüklenecek
  if (shouldRender) {
    return <UtilityBar />;
  }

  // Çok yavaş bağlantıda: manuel açma butonu göster
  if (showManualPrompt && !manualTrigger) {
    return (
      <button
  type="button"
  onClick={() => {
    setManualTrigger(true);
    setShouldRender(true);
  }}
  style={{
    position: "fixed",
    bottom: "1.5rem",
    left: "1.25rem",   // ← ← ← SAĞ TARAF KALKSIN, SOL TARAF EKLENSİN
    zIndex: 60,
    padding: "0.75rem 1.25rem",
    borderRadius: "9999px",
    border: "1px solid rgba(109, 40, 217, 0.28)",
    background: "rgba(255, 255, 255, 0.95)",
    color: "#6d28d9",
    fontWeight: 600,
    boxShadow: "0 18px 40px rgba(109, 40, 217, 0.22)",
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)",
    cursor: "pointer",
  }}
  aria-label="Erişilebilirlik menüsünü yükle"
>
    );
  }

  // Henüz yüklemiyoruz → hiç bir şey render etme
  return null;
}
