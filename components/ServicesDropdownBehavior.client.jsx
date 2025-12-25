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

    const summary = detailsEl.querySelector("summary");
    const menu = detailsEl.querySelector("#nav-services-panel");

    const close = () => {
      if (detailsEl.open) detailsEl.open = false;
      if (summary instanceof HTMLElement) {
        summary.setAttribute("aria-expanded", "false");
      }
    };

    const onKeyDown = (e) => {
      if (e.key !== "Escape") return;
      if (!detailsEl.open) return;
      e.preventDefault();
      close();
      // Return focus to summary for accessibility
      if (summary instanceof HTMLElement) requestAnimationFrame(() => summary.focus());
    };

    const onPointerDownCapture = (e) => {
      if (!detailsEl.open) return;
      const t = e.target;
      if (t instanceof Node && detailsEl.contains(t)) return;
      close();
      if (summary instanceof HTMLElement) requestAnimationFrame(() => summary.focus());
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

    const onToggle = () => {
      if (summary instanceof HTMLElement) {
        summary.setAttribute("aria-expanded", detailsEl.open ? "true" : "false");
      }
      if (detailsEl.open && menu instanceof HTMLElement) {
        const firstLink = menu.querySelector("a[href]");
        if (firstLink instanceof HTMLElement) {
          requestAnimationFrame(() => firstLink.focus());
        }
      }
    };

    if (summary instanceof HTMLElement) {
      summary.setAttribute("aria-expanded", detailsEl.open ? "true" : "false");
      if (!summary.hasAttribute("aria-controls") && menu?.id) {
        summary.setAttribute("aria-controls", menu.id);
      }
    }

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDownCapture, true);
    detailsEl.addEventListener("click", onClickCapture, true);
    detailsEl.addEventListener("toggle", onToggle);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDownCapture, true);
      detailsEl.removeEventListener("click", onClickCapture, true);
      detailsEl.removeEventListener("toggle", onToggle);
    };
  }, [detailsId]);

  return null;
}
