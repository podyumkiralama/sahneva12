"use client";

import { useCallback, useEffect, useState } from "react";
import dynamic from "next/dynamic";

const UtilityBar = dynamic(() => import("./UtilityBar"), {
  ssr: false,
  loading: () => null,
});

const LS_KEYS = {
  ACTIVE: "acc_active",
  PANEL_POSITION: "acc_panel_position",
};

function readStorageValue(key, fallback) {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    return raw === null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

function writeStorageValue(key, value) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore write errors (e.g. private mode)
  }
}

export default function UtilityBarClient() {
  const [shouldRender, setShouldRender] = useState(false);
  const [panelPosition, setPanelPosition] = useState("right");

  useEffect(() => {
    const storedPosition = readStorageValue(LS_KEYS.PANEL_POSITION, "right");
    setPanelPosition(storedPosition === "left" ? "left" : "right");

    const hasActivePrefs = readStorageValue(LS_KEYS.ACTIVE, false);
    if (hasActivePrefs) {
      setShouldRender(true);
    }
  }, []);

  const handleOpenPanel = useCallback(() => {
    setShouldRender(true);
  }, []);

  const togglePanelPosition = useCallback(() => {
    setPanelPosition((prev) => {
      const next = prev === "right" ? "left" : "right";
      writeStorageValue(LS_KEYS.PANEL_POSITION, next);
      return next;
    });
  }, []);

  const handlePanelPositionChange = useCallback((position) => {
    if (position !== "left" && position !== "right") return;
    setPanelPosition(position);
    writeStorageValue(LS_KEYS.PANEL_POSITION, position);
  }, []);

  if (shouldRender) {
    return (
      <UtilityBar
        initialPanelPosition={panelPosition}
        onPanelPositionChange={handlePanelPositionChange}
      />
    );
  }

  return (
    <div
      className={`fixed ${panelPosition === "right" ? "right-8" : "left-8"} bottom-8 z-50 flex flex-col gap-3`}
    >
      <button
        onClick={handleOpenPanel}
        className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-full shadow-2xl flex items-center justify-center text-2xl transition-all duration-300 hover:scale-110"
        aria-label="Erişilebilirlik ayarlarını aç"
      >
        ♿
      </button>

      <button
        onClick={togglePanelPosition}
        className="w-10 h-10 bg-gray-600 hover:bg-gray-700 text-white rounded-full shadow-lg flex items-center justify-center text-lg transition-all duration-300 hover:scale-110"
        aria-label={`Paneli ${panelPosition === "right" ? "sola" : "sağa"} taşı`}
      >
        {panelPosition === "right" ? "◀" : "▶"}
      </button>
    </div>
  );
}
