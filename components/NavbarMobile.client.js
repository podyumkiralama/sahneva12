"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState } from "react";

const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white";

const NAVBAR_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva ile etkinlik ekipmanları için teklif ve destek almak istiyorum.",
);

export default function NavbarMobile({ serviceLinks, researchLinks }) {
  const pathname = usePathname();
  const uid = useId();

  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [researchOpen, setResearchOpen] = useState(false);
  const panelRef = useRef(null);
  const buttonRef = useRef(null);

  const menuId = `mobile-menu-${uid}`;
  const headingId = `mobile-menu-heading-${uid}`;
  const descId = `mobile-menu-desc-${uid}`;

  const mobileWhatsappHref = useMemo(
    () =>
      `https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=mobile_whatsapp`,
    [],
  );

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
    setResearchOpen(false);
  }, [pathname]);

  // Scroll lock when open
  useEffect(() => {
    if (!open) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [open]);

  // ESC to close (only when open)
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      setServicesOpen(false);
      setResearchOpen(false);
      requestAnimationFrame(() => buttonRef.current?.focus());
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Basic focus trap (only when open)
  useEffect(() => {
    if (!open) return;
    const node = panelRef.current;
    if (!node) return;

    const selectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusables = Array.from(node.querySelectorAll(selectors)).filter(
      (el) => el instanceof HTMLElement && !el.hasAttribute("disabled"),
    );
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    requestAnimationFrame(() => {
      first.focus();
    });

    const onTab = (e) => {
      if (e.key !== "Tab") return;
      const active = document.activeElement;
      if (e.shiftKey) {
        if (active === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onTab);
    return () => document.removeEventListener("keydown", onTab);
  }, [open]);

  return (
    <>
      {/* Toggle */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) {
            setServicesOpen(false);
            setResearchOpen(false);
          }
        }}
        className={
          "lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 min-h-[44px] min-w-[44px] transform hover:scale-105 " +
          FOCUS_RING_CLASS
        }
        aria-label={open ? "Menüyü Kapat" : "Menüyü Aç"}
        aria-expanded={open ? "true" : "false"}
        aria-controls={menuId}
      >
        <span
          className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5"
          aria-hidden="true"
        >
          <span
            className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
              open ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
              open ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </span>
      </button>

      {/* Panel */}
      <div
        id={menuId}
        ref={panelRef}
        role="dialog"
        aria-modal={open ? "true" : "false"}
        aria-labelledby={headingId}
        aria-describedby={descId}
        aria-hidden={!open}
        data-open={open ? "true" : undefined}
        className={`lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200 shadow-2xl overflow-hidden transition-all duration-300 ease-in-out ${
          open
            ? "max-h-[85vh] opacity-100 pointer-events-auto visible"
            : "max-h-0 opacity-0 pointer-events-none invisible"
        }`}
      >
        <p id={headingId} className="sr-only">
          Ana gezinme menüsü
        </p>
        <p id={descId} className="sr-only">
          Menü bağlantıları arasında gezinmek için tab tuşunu kullanabilirsiniz.
        </p>

        <nav aria-labelledby={headingId} aria-describedby={descId}>
          <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/hakkimizda"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 transform hover:scale-[1.02] ${
                FOCUS_RING_CLASS
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                👥
              </span>
              Hakkımızda
            </Link>

            <Link
              href="/blog"
              onClick={() => setOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 transform hover:scale-[1.02] ${
                FOCUS_RING_CLASS
              }`}
            >
              <span className="text-lg" aria-hidden="true">
                📝
              </span>
              Blog
            </Link>

            {/* Services: native details for low-JS */}
            <details
              className="rounded-xl border border-neutral-200 bg-white"
              open={servicesOpen}
              onToggle={(e) => setServicesOpen(e.currentTarget.open)}
            >
              <summary
                className={`list-none cursor-pointer w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 min-h-[44px] ${
                  FOCUS_RING_CLASS
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    🎯
                  </span>
                  <span>Hizmetler</span>
                </span>
                <span
                  className={`text-neutral-700 transition-transform duration-200 ${
                    servicesOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </summary>

              <div className="p-2">
                <div className="rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {serviceLinks.map(({ href, label, icon, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 w-full transform hover:scale-[1.01] ${
                        FOCUS_RING_CLASS
                      }`}
                    >
                      <span
                        className="text-base opacity-70 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-neutral-900">
                          {label}
                        </span>
                        <span className="block text-xs text-neutral-600 mt-0.5 font-medium">
                          {description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>

            {/* Research: native details for low-JS */}
            <details
              className="rounded-xl border border-neutral-200 bg-white"
              open={researchOpen}
              onToggle={(e) => setResearchOpen(e.currentTarget.open)}
            >
              <summary
                className={`list-none cursor-pointer w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 min-h-[44px] ${FOCUS_RING_CLASS}`}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    🔎
                  </span>
                  <span>Bizi Araştırın</span>
                </span>
                <span
                  className={`text-neutral-700 transition-transform duration-200 ${
                    researchOpen ? "rotate-180" : ""
                  }`}
                  aria-hidden="true"
                >
                  ▾
                </span>
              </summary>

              <div className="p-2">
                <div className="rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {researchLinks.map(({ href, label, icon, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setOpen(false)}
                      className={`flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 w-full transform hover:scale-[1.01] ${FOCUS_RING_CLASS}`}
                    >
                      <span
                        className="text-base opacity-70 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block font-bold text-neutral-900">
                          {label}
                        </span>
                        <span className="block text-xs text-neutral-600 mt-0.5 font-medium">
                          {description}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </details>

            <div className="mt-4 rounded-2xl border border-green-700/20 bg-gradient-to-r from-emerald-700 to-green-600 p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-2xl">
                  💬
                </span>
                <div className="space-y-1 text-white">
                  <p className="text-lg font-extrabold">WhatsApp Destek</p>
                  <p className="text-sm font-medium text-emerald-50">
                    WhatsApp üzerinden anında teklif alın ve sorularınızı iletin.
                  </p>
                </div>
              </div>
              <a
                href={mobileWhatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Destek – yeni sekmede açılır"
                className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-bold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] border border-green-700/20 ${
                  FOCUS_RING_CLASS
                }`}
                onClick={() => setOpen(false)}
              >
                <span aria-hidden="true" className="text-base">
                  🚀
                </span>
                <span>WhatsApp Destek</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open
            ? "opacity-100 pointer-events-auto visible"
            : "opacity-0 pointer-events-none invisible"
        }`}
        onClick={() => {
          setOpen(false);
          setServicesOpen(false);
          setResearchOpen(false);
        }}
        aria-hidden={!open}
        data-open={open ? "true" : undefined}
      />
    </>
  );
}
