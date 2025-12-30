"use client";

import { useEffect } from "react";
import clarity from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    // Consent varsa buraya koşul koyarsın (şimdilik direkt başlatıyoruz)
    clarity.start({ projectId: "utk0bu995w" });
  }, []);

  return null;
}
