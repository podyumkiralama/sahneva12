"use client";

import { useEffect } from "react";

/**
 * Tiny client island to improve UX for the desktop Services <details> dropdown.
 * - Close on outside click
 * - Close on Escape
 * - Close when a link inside the dropdown is clicked
 *
 * This keeps the main Navbar server-rendered while fixing the "doesn't close" complaint.
 */
export default function ServicesDropdownBehavior({ detailsId }) {
  useEffect(() => {
    if (!detailsId) return;
    const detailsEl = document.getElementById(detailsId);
    if (!(detailsEl instanceof HTMLDetailsElement)) return;

    const close = () => {
      if (detailsEl.open) detailsEl.open = false;
    };

    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (!detailsEl.open) return;
      e.preventDefault();
      close();
      // Return focus to summary for accessibility
      const summary = detailsEl.querySelector("summary");
      if (summary instanceof HTMLElement) requestAnimationFrame(() => summary.focus());
    };

    const onPointerDownCapture = (e) => {
      if (!detailsEl.open) return;
      const t = e.target;
      if (t instanceof Node && detailsEl.contains(t)) return;
      close();
    };

    const onClickCapture = (e) => {
      if (!detailsEl.open) return;
      const t = e.target;
      if (!(t instanceof Element)) return;
      // Any link click inside the details should close it
      const link = t.closest("a[href]");
      if (link && detailsEl.contains(link)) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDownCapture, true);
    detailsEl.addEventListener("click", onClickCapture, true);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDownCapture, true);
      detailsEl.removeEventListener("click", onClickCapture, true);
    };
  }, [detailsId]);

  return null;
}
