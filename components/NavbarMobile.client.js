// components/NavbarMobile.client.jsx
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

  const closeAll = () => {
    setOpen(false);
    setServicesOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  };

  // Close menu on route change
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
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
      e.preventDefault();
      closeAll();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  // Outside click to close (capture)
  useEffect(() => {
    if (!open) return;

    const onPointerDownCapture = (e) => {
      const t = e.target;
      if (!(t instanceof Node)) return;

      const panel = panelRef.current;
      const btn = buttonRef.current;

      // If click is inside panel or on toggle button, ignore
      if (panel && panel.contains(t)) return;
      if (btn && btn.contains(t)) return;

      closeAll();
    };

    document.addEventListener("pointerdown", onPointerDownCapture, true);
    return () =>
      document.removeEventListener("pointerdown", onPointerDownCapture, true);
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

    requestAnimationFrame(() => first.focus());

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
      {/* Toggle button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={() => {
          setOpen((v) => !v);
          if (!open) setServicesOpen(false);
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

      {/* Backdrop */}
      <div
        className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-200 ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        aria-hidden="true"
        onClick={() => closeAll()}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
      </div>

      {/* Panel */}
      <div
        id={menuId}
        ref={panelRef}
        className={`lg:hidden fixed top-0 right-0 z-[70] h-[100dvh] w-[min(92vw,420px)] transform transition-transform duration-200 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        role="dialog"
        aria-modal={open ? "true" : "false"}
        aria-labelledby={headingId}
        aria-describedby={descId}
        aria-hidden={!open}
      >
        <div className="h-full bg-white shadow-2xl border-l border-neutral-200 flex flex-col">
          {/* Header */}
          <div className="px-5 py-5 border-b border-neutral-200 bg-white">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div
                  id={headingId}
                  className="text-base font-extrabold text-neutral-900"
                >
                  Menü
                </div>
                <p id={descId} className="mt-1 text-xs font-medium text-neutral-600">
                  Hızlı gezinme ve teklif kanalları
                </p>
              </div>

              <button
                type="button"
                onClick={() => closeAll()}
                className={`inline-flex items-center justify-center rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-bold text-neutral-900 hover:bg-neutral-50 min-h-[44px] ${FOCUS_RING_CLASS}`}
                aria-label="Menüyü Kapat"
              >
                ✕
              </button>
            </div>

            <a
              href={mobileWhatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Teklif – yeni sekmede açılır"
              className={`mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-white text-sm font-extrabold
                bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                transition-all duration-200 shadow-lg hover:shadow-xl min-h-[44px] ${FOCUS_RING_CLASS}`}
            >
              <span aria-hidden="true">💬</span>
              WhatsApp Teklif
            </a>
          </div>

          {/* Body */}
          <nav aria-labelledby={headingId} aria-describedby={descId}>
            <div className="px-5 py-5 space-y-3 overflow-y-auto">
              <Link
                href="/hakkimizda"
                onClick={() => closeAll()}
                className={`flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 ${
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
                onClick={() => closeAll()}
                className={`flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 ${
                  FOCUS_RING_CLASS
                }`}
              >
                <span className="text-lg" aria-hidden="true">
                  📝
                </span>
                Blog
              </Link>

              {/* Research links (İletişim / Nasıl Çalışıyoruz / Bölgesel / SSS) */}
              {Array.isArray(researchLinks) && researchLinks.length > 0 && (
                <div className="rounded-xl border border-neutral-200 bg-white">
                  <div className="px-4 pt-4 pb-2">
                    <div className="text-sm font-extrabold text-neutral-900">
                      Bizi Araştırın
                    </div>
                    <div className="mt-1 text-xs font-medium text-neutral-600">
                      Süreç, iletişim ve bilgi sayfaları
                    </div>
                  </div>
                  <div className="p-2 space-y-1">
                    {researchLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => closeAll()}
                        className={`flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 w-full ${
                          FOCUS_RING_CLASS
                        }`}
                      >
                        <span
                          className="text-base opacity-70 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className="block font-bold text-neutral-900">
                            {item.label}
                          </span>
                          <span className="block text-xs text-neutral-600 mt-0.5 font-medium">
                            {item.description}
                          </span>
                        </span>
                        <span className="text-neutral-400" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Services */}
              <details
                className="rounded-xl border border-neutral-200 bg-white"
                open={servicesOpen}
                onToggle={(e) => setServicesOpen(e.currentTarget.open)}
              >
                <summary
                  className={`list-none cursor-pointer w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 min-h-[44px] ${FOCUS_RING_CLASS}`}
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
                        onClick={() => closeAll()}
                        className={`flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 rounded-md transition-all duration-200 w-full ${FOCUS_RING_CLASS}`}
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
                        <span className="text-neutral-400" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </details>

              {/* Phone quick link */}
              <a
                href="tel:+905453048671"
                onClick={() => closeAll()}
                className={`flex items-center justify-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm font-extrabold text-neutral-900 hover:bg-neutral-50 min-h-[44px] ${FOCUS_RING_CLASS}`}
                aria-label="Hemen Ara"
              >
                <span aria-hidden="true">📞</span> Hemen Ara
              </a>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}