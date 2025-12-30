"use client";

import { useEffect } from "react";
import { startClarity } from "@microsoft/clarity";

export default function ClarityProvider() {
  useEffect(() => {
    startClarity({
      projectId: "utk0bu995w",
    });
  }, []);

  return null;
}
