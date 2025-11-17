"use client";

import { useEffect, useState, useRef } from "react";

// Dinamik yükleme
import dynamic from "next/dynamic";
const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

// Bağlantı kontrolü
const SLOW_CONNECTION_TYPES = new Set(["slow-2g", "2g"]);
function getConnectionInfo() {
  if (typeof navigator === "undefined") return null;
  return navigator.connection || navigator.mozConnection || navigator.webkitConnection || null;
}

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);
  const [manualTrigger, setManualTrigger] = useState(false);
  const [showManualPrompt, setShowManualPrompt] = useState(false);

  const panelRef = useRef(null);
  const dragging = useRef(false);
  const startPos = useRef({ x: 0, y: 0, offsetX: 0, offsetY: 0 });
  const [pos, setPos] = useState({ x: 20, y: 80 }); // Başlangıç pozisyonu

  // ------------------------------------------------------------------
  // Performans – geç yükleme
  // ------------------------------------------------------------------
  useEffect(() => {
    if (typeof window === "undefined" || shouldRender) return;

    const connection = getConnectionInfo();
    const effective = connection?.effectiveType?.toLowerCase?.();
    const saveData = Boolean(connection?.saveData);
    const verySlow = effective ? SLOW_CONNECTION_TYPES.has(effective) : false;

    if (!manualTrigger && (saveData || verySlow)) {
      setShowManualPrompt(true);
      return;
    }

    const schedule = () => setShouldRender(true);
    const timeout = effective === "3g" ? 2200 : 1200;

    if ("requestIdleCallback" in window) {
      const id = window.requestIdleCallback(schedule, { timeout: timeout + 800 });
      return () => window.cancelIdleCallback?.(id);
    }

    const id = setTimeout(schedule, timeout);
    return () => clearTimeout(id);
  }, [manualTrigger, shouldRender]);

  // ------------------------------------------------------------------
  // Sürükleme – desktop + mobil
  // ------------------------------------------------------------------
  useEffect(() => {
    if (!shouldRender) return;

    const panel = panelRef.current;
    if (!panel) return;

    const handleDown = (e) => {
      dragging.current = true;
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      startPos.current = {
        x: clientX,
        y: clientY,
        offsetX: pos.x,
        offsetY: pos.y,
      };
    };

    const handleMove = (e) => {
      if (!dragging.current) return;

      e.preventDefault();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const clientY = e.touches ? e.touches[0].clientY : e.clientY;

      setPos({
        x: startPos.current.offsetX + (clientX - startPos.current.x),
        y: startPos.current.offsetY + (clientY - startPos.current.y),
      });
    };

    const handleUp = () => {
      dragging.current = false;
    };

    panel.addEventListener("mousedown", handleDown);
    panel.addEventListener("touchstart", handleDown);
    window.addEventListener("mousemove", handleMove, { passive: false });
    window.addEventListener("touchmove", handleMove, { passive: false });
    window.addEventListener("mouseup", handleUp);
    window.addEventListener("touchend", handleUp);

    return () => {
      panel.removeEventListener("mousedown", handleDown);
      panel.removeEventListener("touchstart", handleDown);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("mouseup", handleUp);
      window.removeEventListener("touchend", handleUp);
    };
  }, [shouldRender, pos]);

  // ------------------------------------------------------------------
  // Manual yükleme butonu (çok kötü internet için)
  // ------------------------------------------------------------------
  if (showManualPrompt && !manualTrigger) {
    return (
      <button
        type="button"
        onClick={() => {
          setManualTrigger(true);
          setShouldRender(true);
        }}
        className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-full bg-white text-purple-700 shadow-xl border border-purple-300 font-semibold"
      >
        ♿ Erişilebilirliği Aç
      </button>
    );
  }

  // ------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------
  if (!shouldRender) return null;

  return (
    <div
      ref={panelRef}
      style={{
        position: "fixed",
        left: pos.x,
        top: pos.y,
        zIndex: 9999,
        touchAction: "none",
      }}
      className="cursor-move active:scale-[0.98] transition-transform"
    >
      <UtilityBar />
    </div>
  );
}