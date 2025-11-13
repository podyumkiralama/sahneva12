"use client";

import { useState } from "react";
import Link from "next/link";

export default function SiteHeader({ locale, strings }) {
  const [open, setOpen] = useState(false);
  const direction = strings.direction ?? (locale === "ar" ? "rtl" : "ltr");

  const homeHref = locale === "tr" ? "/" : `/${locale}`;

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/70"
      dir={direction}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          <Link href={homeHref} className="flex items-center gap-3">
            <span className="text-2xl font-black text-indigo-600">Sahneva</span>
            <span className="hidden sm:block text-sm text-neutral-500 font-medium">
              {strings.tagline}
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6" aria-label={strings.navigationLabel}>
            {strings.links.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-neutral-700 hover:text-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500 px-2 py-1 rounded-lg"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={strings.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-2.5 text-sm font-bold text-white shadow-lg hover:shadow-xl transition-all duration-200"
            >
              <span aria-hidden="true">💬</span>
              {strings.whatsappLabel}
            </a>
          </nav>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white p-3 text-neutral-700 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-indigo-500"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span className="sr-only">{strings.mobileToggle}</span>
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
      </div>

      <div
        id="mobile-menu"
        hidden={!open}
        className="lg:hidden border-t border-neutral-200 bg-white shadow-xl"
      >
        <div className="container mx-auto px-4 py-4 space-y-2">
          {strings.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-lg px-4 py-3 text-sm font-semibold text-neutral-700 hover:bg-neutral-100"
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={strings.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 px-4 py-3 text-sm font-bold text-white"
          >
            <span aria-hidden="true">💬</span>
            {strings.whatsappLabel}
          </a>
        </div>
      </div>
    </header>
  );
}
