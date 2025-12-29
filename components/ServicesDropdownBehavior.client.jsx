"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * Tiny client island to improve UX for the desktop Services <details> dropdown.
 * - Close on outside click
 * - Close on Escape
 * - Close when a link inside the dropdown is clicked
 *
 * This keeps the main Navbar server-rendered while fixing the "doesn't close" complaint.
 */
export default function ServicesDropdownBehavior({ detailsId, panelId }) {
  const pathname = usePathname();

  useEffect(() => {
    if (!detailsId) return;
    const detailsEl = document.getElementById(detailsId);
    if (!(detailsEl instanceof HTMLDetailsElement)) return;

    const allDetails = document.querySelectorAll(`#${CSS.escape(detailsId)}`);
    if (allDetails.length > 1) {
      allDetails.forEach((node, index) => {
        if (index > 0 && node instanceof HTMLDetailsElement) {
          node.open = false;
          node.hidden = true;
          node.setAttribute("aria-hidden", "true");
        }
      });
    }

    const summary = detailsEl.querySelector("summary");
    const menu =
      (panelId ? document.getElementById(panelId) : null) ??
      detailsEl.querySelector("[data-dropdown-panel]");

    const close = () => {
      if (detailsEl.open) detailsEl.open = false;
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

    const closeOtherDropdowns = () => {
      const dropdowns = document.querySelectorAll('details[data-nav-dropdown="true"]');
      dropdowns.forEach((dropdown) => {
        if (dropdown !== detailsEl && dropdown instanceof HTMLDetailsElement) {
          dropdown.open = false;
        }
      });
    };

    const onToggle = () => {
      if (detailsEl.open) {
        closeOtherDropdowns();
      }
      if (summary instanceof HTMLElement) {
        summary.setAttribute("aria-expanded", String(detailsEl.open));
      }
      if (detailsEl.open && menu instanceof HTMLElement) {
        const firstLink = menu.querySelector("a[href]");
        if (firstLink instanceof HTMLElement) {
          requestAnimationFrame(() => firstLink.focus());
        }
      }
    };

    if (summary instanceof HTMLElement && !summary.hasAttribute("aria-controls") && menu?.id) {
      summary.setAttribute("aria-controls", menu.id);
    }
    if (summary instanceof HTMLElement && !summary.hasAttribute("aria-expanded")) {
      summary.setAttribute("aria-expanded", "false");
    }

    const onPointerOver = (e) => {
      if (!detailsEl.open) return;
      const target = e.target;
      if (!(target instanceof Element)) return;
      const hoveredSummary = target.closest("summary");
      if (!hoveredSummary) return;
      const hoveredDetails = hoveredSummary.closest('details[data-nav-dropdown="true"]');
      if (hoveredDetails && hoveredDetails !== detailsEl) {
        close();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDownCapture, true);
    document.addEventListener("pointerover", onPointerOver, true);
    detailsEl.addEventListener("click", onClickCapture, true);
    detailsEl.addEventListener("toggle", onToggle);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDownCapture, true);
      document.removeEventListener("pointerover", onPointerOver, true);
      detailsEl.removeEventListener("click", onClickCapture, true);
      detailsEl.removeEventListener("toggle", onToggle);
    };
  }, [detailsId, panelId]);

  useEffect(() => {
    if (!detailsId) return;
    const detailsEl = document.getElementById(detailsId);
    if (!(detailsEl instanceof HTMLDetailsElement)) return;
    if (detailsEl.open) detailsEl.open = false;
  }, [detailsId, pathname]);

  return null;
}
