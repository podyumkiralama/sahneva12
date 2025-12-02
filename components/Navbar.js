// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const focusRingClass = "focus-ring";
const MOBILE_MENU_HEADING_ID = "navbar-mobile-menu-heading";

const serviceLinks = [
  {
    href: "/podyum-kiralama",
    label: "Podyum Kiralama",
    title: "Modüler podyum kiralama ve kurulum hizmeti - Sahneva",
    icon: "👑",
    description: "Profesyonel modüler podyum sistemleri",
  },
  {
    href: "/led-ekran-kiralama",
    label: "LED Ekran Kiralama",
    title: "Yüksek çözünürlüklü LED ekran kiralama - Sahneva",
    icon: "🖥️",
    description: "HD LED ekran ve video wall çözümleri",
  },
  {
    href: "/ses-isik-sistemleri",
    label: "Ses & Işık Sistemleri",
    title: "Profesyonel ses ve ışık sistemleri kiralama - Sahneva",
    icon: "🎚️",
    description: "Konser, konferans ve kurumsal etkinlikler için ses ve ışık",
  },
  {
    href: "/cadir-kiralama",
    label: "Çadır Kiralama",
    title: "Etkinlik çadırı kiralama - Sahneva",
    icon: "⛺",
    description: "Dış mekan etkinlikleri için profesyonel çadır çözümleri",
  },
  {
    href: "/masa-sandalye-kiralama",
    label: "Masa & Sandalye Kiralama",
    title: "Masa sandalye kiralama - Sahneva",
    icon: "🪑",
    description: "Konuk konforu için masa, sandalye ve oturma düzeni",
  },
];

function getLocaleFromPath(pathname) {
  if (!pathname) return "tr";
  if (pathname.startsWith("/en")) return "en";
  if (pathname.startsWith("/ar")) return "ar";
  return "tr";
}

export default function Navbar() {
  const pathname = usePathname();
  const locale = getLocaleFromPath(pathname);
  const t = LOCALE_CONTENT[locale]?.navbar ?? LOCALE_CONTENT.tr.navbar;

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const mobileMenuRef = useRef(null);
  const mobileMenuToggleRef = useRef(null);
  const lastFocusedElementRef = useRef(null);

  // Scroll durumunu yönet
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 12);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(false);

    // Menüyü kapatınca odak tekrar toggle butonuna/önceki elemana dönsün
    requestAnimationFrame(() => {
      if (mobileMenuToggleRef.current) {
        mobileMenuToggleRef.current.focus();
      } else if (lastFocusedElementRef.current) {
        try {
          lastFocusedElementRef.current.focus();
        } catch {
          // ignore
        }
      }
    });
  }, []);

  const openMobileMenu = useCallback(() => {
    setIsMobileMenuOpen(true);

    // Son odaklanan elemanı kaydet
    if (typeof document !== "undefined") {
      lastFocusedElementRef.current = document.activeElement;
    }

    // İlk odaklanacak elemanı menü içinde bul
    requestAnimationFrame(() => {
      if (!mobileMenuRef.current) return;
      const focusableSelectors =
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select';
      const focusable = mobileMenuRef.current.querySelectorAll(
        focusableSelectors
      );
      if (focusable.length > 0) {
        focusable[0].focus();
      }
    });
  }, []);

  const handleMobileMenuToggle = () => {
    if (isMobileMenuOpen) {
      closeMobileMenu();
    } else {
      openMobileMenu();
    }
  };

  // Focus trap: mobil menü açıkken TAB/Shift+TAB sadece menü içinde dönsün
  const handleMobileMenuKeyDown = useCallback(
    (event) => {
      if (!isMobileMenuOpen || !mobileMenuRef.current) return;

      if (event.key === "Escape") {
        event.preventDefault();
        closeMobileMenu();
        return;
      }

      if (event.key !== "Tab") return;

      const focusableSelectors =
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"]), input, textarea, select';
      const focusable = mobileMenuRef.current.querySelectorAll(
        focusableSelectors
      );
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab
        if (document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    },
    [isMobileMenuOpen, closeMobileMenu]
  );

  // Body scroll kilidi (mobil menü açıkken)
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (isMobileMenuOpen) {
      const original = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = original;
      };
    }
  }, [isMobileMenuOpen]);

  const isActiveLink = useCallback(
    (href) => {
      if (!pathname) return false;
      if (href === "/") return pathname === "/" || pathname === "/tr";
      return pathname.startsWith(href);
    },
    [pathname]
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow duration-200 ${
        isScrolled ? "shadow-lg shadow-slate-900/40" : ""
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between py-3"
          aria-label={t.mainNavLabel}
        >
          {/* Logo + marka */}
          <div className="flex items-center gap-3">
            <Link
              href={locale === "tr" ? "/" : `/${locale}`}
              className={`flex items-center gap-2 rounded-xl px-1 py-1 ${focusRingClass}`}
            >
              <Image
                src="/img/logo.png"
                alt="Sahneva Organizasyon logo"
                width={40}
                height={40}
                className="h-10 w-10"
                priority
              />
              <span className="flex flex-col">
                <span className="text-sm font-semibold tracking-tight text-white">
                  Sahneva
                </span>
                <span className="text-[11px] font-medium text-slate-300">
                  {t.tagline}
                </span>
              </span>
            </Link>
          </div>

          {/* Masaüstü menü */}
          <div className="hidden items-center gap-6 md:flex">
            <div className="flex items-center gap-3 text-sm font-medium text-slate-200">
              {t.primaryLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  title={item.title}
                  className={`rounded-full px-3 py-2 transition ${
                    isActiveLink(item.href)
                      ? "bg-slate-900/80 text-white"
                      : "text-slate-300 hover:bg-slate-800/60"
                  } ${focusRingClass}`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            {/* Hizmetler dropdown trigger (desktop) */}
            <div className="relative">
              <button
                type="button"
                className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-800/60 ${focusRingClass}`}
                aria-haspopup="true"
                aria-expanded="false"
              >
                <span>{t.servicesLabel}</span>
                <span aria-hidden="true">▾</span>
              </button>
              {/* Basit bir hover menü; gelişmiş alt menü bileşenin varsa onunla değiştirirsin */}
              <div className="pointer-events-none absolute right-0 z-40 mt-2 w-64 translate-y-1 opacity-0 transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100" />
            </div>

            {/* CTA */}
            <div className="flex items-center gap-3">
              <a
                href="tel:+905453048671"
                className={`rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-emerald-400 ${focusRingClass}`}
              >
                {t.callNow}
              </a>
              <a
                href="https://wa.me/905453048671?text=Merhaba%2C+etkinliginiz+icin+teklif+almak+isterim."
                target="_blank"
                rel="noreferrer"
                className={`rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10 ${focusRingClass}`}
                aria-label={`${t.whatsappCta} (WhatsApp yeni sekmede açılır)`}
              >
                {t.whatsappCta}
              </a>
            </div>
          </div>

          {/* Mobil menü butonu */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              ref={mobileMenuToggleRef}
              type="button"
              onClick={handleMobileMenuToggle}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-slate-900/80 text-slate-100 shadow-sm hover:bg-slate-800 ${focusRingClass}`}
              aria-label={
                isMobileMenuOpen ? t.mobileMenuCloseLabel : t.mobileMenuOpenLabel
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu-panel"
              aria-haspopup="true"
            >
              <span className="sr-only">
                {isMobileMenuOpen
                  ? t.mobileMenuCloseLabel
                  : t.mobileMenuOpenLabel}
              </span>
              <span aria-hidden="true">
                {isMobileMenuOpen ? "✕" : "☰"}
              </span>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobil menü overlay + panel */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm md:hidden"
          aria-hidden="false"
        >
          <div
            ref={mobileMenuRef}
            id="mobile-menu-panel"
            role="dialog"
            aria-modal="true"
            aria-labelledby={MOBILE_MENU_HEADING_ID}
            className="fixed inset-x-3 top-3 bottom-3 flex flex-col overflow-hidden rounded-2xl bg-slate-900 shadow-xl ring-1 ring-slate-700/80"
            onKeyDown={handleMobileMenuKeyDown}
          >
            {/* Üst bar */}
            <div className="flex items-center justify-between border-b border-slate-700/80 px-4 py-3">
              <h2
                id={MOBILE_MENU_HEADING_ID}
                className="text-sm font-semibold text-slate-100"
              >
                {t.mobileMenuLabel}
              </h2>
              <button
                type="button"
                onClick={closeMobileMenu}
                className={`inline-flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-100 hover:bg-slate-700 ${focusRingClass}`}
              >
                <span className="sr-only">{t.mobileMenuCloseLabel}</span>
                <span aria-hidden="true">✕</span>
              </button>
            </div>

            {/* Linkler */}
            <div className="flex-1 overflow-y-auto px-4 py-4">
              <nav aria-label={t.mobileNavLabel} className="space-y-2">
                {t.primaryLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    title={item.title}
                    className={`block rounded-xl px-3 py-2 text-sm font-medium ${
                      isActiveLink(item.href)
                        ? "bg-slate-800 text-white"
                        : "text-slate-200 hover:bg-slate-800/80"
                    } ${focusRingClass}`}
                    onClick={closeMobileMenu}
                  >
                    {item.label}
                  </Link>
                ))}

                <div className="mt-4 border-t border-slate-700/80 pt-4">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-400">
                    {t.servicesLabel}
                  </p>
                  <ul className="space-y-1">
                    {serviceLinks.map((service) => (
                      <li key={service.href}>
                        <Link
                          href={service.href}
                          title={service.title}
                          className={`flex items-center gap-2 rounded-xl px-3 py-2 text-sm ${
                            isActiveLink(service.href)
                              ? "bg-slate-800 text-white"
                              : "text-slate-200 hover:bg-slate-800/80"
                          } ${focusRingClass}`}
                          onClick={closeMobileMenu}
                        >
                          <span aria-hidden="true">{service.icon}</span>
                          <span className="flex flex-col text-left">
                            <span className="font-medium">
                              {service.label}
                            </span>
                            <span className="text-[11px] text-slate-400">
                              {service.description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </nav>
            </div>

            {/* Alt CTA’lar */}
            <div className="border-t border-slate-700/80 px-4 py-3">
              <div className="flex flex-col gap-2">
                <a
                  href="tel:+905453048671"
                  className={`inline-flex items-center justify-center rounded-full bg-emerald-500 px-4 py-2 text-sm font-semibold text-slate-900 hover:bg-emerald-400 ${focusRingClass}`}
                >
                  {t.callNow}
                </a>
                <a
                  href="https://wa.me/905453048671?text=Merhaba%2C+etkinliginiz+icin+teklif+almak+isterim."
                  target="_blank"
                  rel="noreferrer"
                  className={`inline-flex items-center justify-center rounded-full border border-emerald-400/60 px-4 py-2 text-sm font-semibold text-emerald-300 hover:bg-emerald-500/10 ${focusRingClass}`}
                  aria-label={`${t.whatsappCta} (WhatsApp yeni sekmede açılır)`}
                >
                  {t.whatsappCta}
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
