"use client";

import { useEffect } from "react";

export default function DocumentDirection({ lang, dir }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
    document.body.dir = dir;
  }, [lang, dir]);

  return null;
}
