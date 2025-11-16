"use client";

import { useEffect } from "react";

export default function DocumentDirection({ lang, dir }) {
  useEffect(() => {
    if (typeof document === "undefined") return;
    const { documentElement } = document;
    documentElement.lang = lang;
    documentElement.setAttribute("xml:lang", lang);
    documentElement.dir = dir;
  }, [lang, dir]);

  return null;
}
