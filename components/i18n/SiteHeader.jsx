"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";

const focusRingClass = "focus-ring";

export default function SiteHeader({ locale, strings }) {
  const [open, setOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const previouslyFocusedElement = useRef(null);
  const previousOverflow = useRef("");
  const mobileMenuId = "mobile_menu";

  const direction = strings.direction ?? (locale === "ar" ? "rtl" : "ltr");
  const homeHref = locale === "tr" ? "/" : `/${locale}`;

  const ariaStrings = useMemo(
    () => ({
      header: strings?.ariaLabel ?? "Site header",
      nav: strings?.navLabel ?? strings?.navigationLabel ?? "Main navigation",
      mobileToggleOpen:
        strings?.mobileToggleOpenLabel ??
        strings?.mobileToggleOpen ??
        strings?.mobileToggleLabel ??
        strings?.mobileToggle ??
        "Open navigation menu",
      mobileToggleClose:
        strings?.mobileToggleCloseLabel ??
        strings?.mobileToggleClose ??
        strings?.mobileToggleLabel ??
        strings?.mobileToggle ??
        "Close navigation menu",
      mobileMenuOpenStatus:
        strings?.mobileMenuOpenStatus ??
        strings?.mobileMenuStatusOpen ??
        "Navigation menu expanded",
      mobileMenuClosedStatus:
        strings?.mobileMenuClosedStatus ??
        strings?.mobileMenuStatusClosed ??
        "Navigation menu collapsed",
    }),
    [strings]
  );

  useEffect(() => {
    if (!open) return undefined;

    const node = mobileMenuRef.current;
    previouslyFocusedElement.current = toggleButtonRef.current;
    previousOverflow.current = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.body.classList.add("overflow-hidden");

    const focusableSelectors =
      'a[href]:not([tabindex="-1"]), button:not([disabled]), [tabindex="0"]';
    const focusable = node?.querySelectorAll(focusableSelectors) ?? [];
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (first instanceof HTMLElement) {
      first.focus();
    }

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleButtonRef.current?.focus();
      }
      if (event.key === "Tab" && focusable.length > 0) {
        if (event.shiftKey) {
          if (document.activeElement === first) {
            event.preventDefault();
            last.focus();
          }
        } else if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow.current || "";
      document.body.classList.remove("overflow-hidden");
      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
    };
  }, [open]);

  return (
    <header
      tabIndex={-1}
      aria-label={ariaStrings.header}
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/70"
      dir={direction}
    >
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      >
        {open
          ? ariaStrings.mobileMenuOpenStatus
          : ariaStrings.mobileMenuClosedStatus}
      </div>
      <nav
        className="container mx-auto px-4 sm:px-6 lg:px-8"
        aria-label={ariaStrings.nav}
      >
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href={homeHref} className={`flex items-center gap-3 ${focusRingClass}`}>
            <span className="text-2xl font-black text-indigo-600">Sahneva</span>
            <span className="hidden sm:block text-sm text-neutral-500 font-medium">
              {strings.tagline}
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-6">
            {strings.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`text-sm font-semibold text-neutral-700 hover:text-indigo-600 px-2 py-1 rounded-lg ${focusRingClass}`}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={strings.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200 ${focusRingClass}`}
              aria-label={`${strings.whatsappLabel} – yeni sekmede açılır`}
            >
              <span aria-hidden="true">💬</span>
              {strings.whatsappLabel}
            </a>
          </div>

          <button
            type="button"
            ref={toggleButtonRef}
            onClick={() => setOpen((v) => !v)}
            className={`lg:hidden inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-3 text-neutral-700 shadow-sm ${focusRingClass}`}
            aria-expanded={open}
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            aria-label={open ? ariaStrings.mobileToggleClose : ariaStrings.mobileToggleOpen}
          >
            <span className="sr-only">
              {open ? ariaStrings.mobileToggleClose : ariaStrings.mobileToggleOpen}
            </span>
            <span className="relative h-5 w-5" aria-hidden="true">
              <span
                className={`absolute inset-x-0 top-1 h-0.5 bg-current transition-transform duration-200 ${open ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current transition-opacity duration-200 ${open ? "opacity-0" : ""}`}
              />
              <span
                className={`absolute inset-x-0 bottom-1 h-0.5 bg-current transition-transform duration-200 ${open ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal={open ? "true" : undefined}
        aria-hidden={!open}
        hidden={!open}
        aria-label={ariaStrings.nav}
        className="lg:hidden border-t border-neutral-200 bg-white shadow-xl"
      >
        <nav
          id="primary-navigation-mobile"
          aria-label={ariaStrings.nav}
        >
          <div className="container mx-auto px-4 py-4 space-y-2">
            {strings.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-lg px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100 ${focusRingClass}`}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <a
              href={strings.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-bold text-white ${focusRingClass}`}
              aria-label={`${strings.whatsappLabel} – yeni sekmede açılır`}
            >
              <span aria-hidden="true">💬</span>
              {strings.whatsappLabel}
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
