// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
    title: "Profesyonel ses ve ışık sistemi kiralama - Sahneva",
    icon: "🎭",
    description: "Konser kalitesinde ses ve ışık ekipmanları",
  },
  {
    href: "/cadir-kiralama",
    label: "Çadır Kiralama",
    title: "Etkinlik çadırı kiralama ve kurulum - Sahneva",
    icon: "⛺",
    description: "Her türlü etkinlik için çadır çözümleri",
  },
  {
    href: "/masa-sandalye-kiralama",
    label: "Masa Sandalye Kiralama",
    title: "Masa sandalye kiralama hizmeti - Sahneva",
    icon: "🪑",
    description: "Toplantı ve davetler için masa sandalye",
  },
  {
    href: "/sahne-kiralama",
    label: "Sahne Kiralama",
    title: "Profesyonel sahne kiralama ve kurulum - Sahneva",
    icon: "🎪",
    description: "Portatif ve modüler sahne sistemleri",
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

  const headerStrings =
    LOCALE_CONTENT[locale]?.header || LOCALE_CONTENT.tr.header;

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const hoverTimer = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const serviceItemRefs = useRef([]);
  const previouslyFocusedElement = useRef(null);

  const mobileMenuId = "mobile_menu";
  const servicesBtnId = "nav-services-button";
  const servicesMenuId = "nav-services-menu";

  const isActiveLink = useCallback(
    (href) => pathname === href || (href !== "/" && pathname?.startsWith(href)),
    [pathname]
  );

  const whatsappBtnClass = useMemo(
    () =>
      `ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-bold \
       bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 \
       transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 \
       min-h-[44px] border border-green-700/20 ${focusRingClass}`,
    []
  );

  const mobileWhatsappBtnClass = useMemo(
    () =>
      `block text-center mt-4 rounded-xl px-5 py-3 text-white text-sm font-bold \
       bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 \
       transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 \
       min-h-[44px] flex items-center justify-center gap-2 border border-green-700/20 ${focusRingClass}`,
    []
  );

  const openServicesNow = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  }, []);

  const closeServicesWithDelay = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 200);
  }, []);

  const focusServiceItem = useCallback((index) => {
    const items = serviceItemRefs.current.filter(Boolean);
    if (!items.length) return;
    const normalizedIndex = ((index % items.length) + items.length) % items.length;
    items[normalizedIndex]?.focus();
  }, []);

  const openServicesMenuAndFocus = useCallback(
    (index = 0) => {
      setServicesOpen(true);
      requestAnimationFrame(() => focusServiceItem(index));
    },
    [focusServiceItem]
  );

  const handleServicesButtonKeyDown = useCallback(
    (event) => {
      switch (event.key) {
        case "Enter":
        case " ":
          event.preventDefault();
          setServicesOpen((prev) => {
            const next = !prev;
            if (next) {
              requestAnimationFrame(() => focusServiceItem(0));
            }
            return next;
          });
          break;
        case "ArrowDown":
          event.preventDefault();
          servicesOpen ? focusServiceItem(0) : openServicesMenuAndFocus(0);
          break;
        case "ArrowUp":
          event.preventDefault();
          servicesOpen
            ? focusServiceItem(serviceLinks.length - 1)
            : openServicesMenuAndFocus(serviceLinks.length - 1);
          break;
        default:
          break;
      }
    },
    [focusServiceItem, openServicesMenuAndFocus, servicesOpen]
  );

  const handleServiceItemKeyDown = useCallback(
    (event, index) => {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          focusServiceItem(index + 1);
          break;
        case "ArrowUp":
          event.preventDefault();
          focusServiceItem(index - 1);
          break;
        case "Home":
          event.preventDefault();
          focusServiceItem(0);
          break;
        case "End":
          event.preventDefault();
          focusServiceItem(serviceLinks.length - 1);
          break;
        case "Escape":
          event.preventDefault();
          setServicesOpen(false);
          servicesButtonRef.current?.focus();
          break;
        default:
          break;
      }
    },
    [focusServiceItem]
  );

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      const wasMobileOpen = mobileOpen;
      const wasServicesOpen = servicesOpen;

      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);

      requestAnimationFrame(() => {
        if (wasMobileOpen) {
          toggleButtonRef.current?.focus();
        } else if (wasServicesOpen) {
          servicesButtonRef.current?.focus();
        }
      });
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, servicesOpen]);

  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (mobileOpen) {
      previouslyFocusedElement.current = document.activeElement;
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";

      requestAnimationFrame(() => {
        if (previouslyFocusedElement.current instanceof HTMLElement) {
          previouslyFocusedElement.current?.focus();
        }
      });
    }

    return () => {
      document.body.style.overflow = "";
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [servicesOpen]);

  useEffect(() => {
    if (!mobileOpen) return;

    const menuNode = mobileMenuRef.current;
    if (!menuNode) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
    const focusable = Array.from(menuNode.querySelectorAll(focusableSelectors));

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    requestAnimationFrame(() => {
      if (first instanceof HTMLElement) first.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const activeEl = document.activeElement;

      if (event.shiftKey) {
        if (activeEl === first) {
          event.preventDefault();
          last.focus();
        }
      } else if (activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    if (servicesOpen && document.activeElement === servicesButtonRef.current) {
      requestAnimationFrame(() => focusServiceItem(0));
    }
  }, [servicesOpen, focusServiceItem]);

  useEffect(
    () => () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    },
    []
  );

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? "bg-slate-950/95 shadow-xl shadow-slate-950/40 backdrop-blur"
          : "bg-slate-950/90 backdrop-blur"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <nav
          className="flex items-center justify-between gap-6 py-3"
          aria-label={t.mainNavLabel}
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-neutral-900 group-hover:text-blue-700">{label}</div>
          <div className="text-xs text-neutral-600 font-medium mt-0.5">{description}</div>
        </div>
      </Link>
    ),
    [isActiveLink, handleServiceItemKeyDown]
  );

  return (
    <>
      <nav
        aria-label={headerStrings.navLabel}
        className="sticky top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200/80 shadow-lg"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href={locale === "tr" ? "/" : `/${locale}`}
              className={`flex items-center gap-2 rounded-xl px-2 py-1 hover:bg-slate-900 ${focusRingClass}`}
            >
              <Image
                src="/img/logo.png"
                alt="Sahneva Logo - Profesyonel sahne, podyum, LED ekran kiralama"
                width={160}
                height={40}
                priority={pathname === "/" || pathname === `/${locale}`}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                style={{ color: "transparent" }}
              />
              <span className="flex flex-col leading-tight">
                <span className="text-sm font-semibold tracking-tight text-white">
                  Sahneva
                </span>
                <span className="text-[11px] font-medium text-slate-300">
                  {t.tagline}
                </span>
              </span>
            </Link>

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
                        ? "bg-emerald-500/15 text-white ring-1 ring-emerald-400/60"
                        : "text-slate-200 hover:bg-slate-900/80"
                    } ${focusRingClass}`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              {/* Hizmetler dropdown trigger (desktop) */}
              <div className="relative group">
                <button
                  type="button"
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium text-slate-200 hover:bg-slate-900/80 ${focusRingClass}`}
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span>{t.servicesLabel}</span>
                  <span aria-hidden="true">▾</span>
                </button>
                <div className="pointer-events-none absolute right-0 z-40 mt-3 w-72 translate-y-2 rounded-2xl border border-slate-800/80 bg-slate-900/95 p-3 shadow-2xl shadow-slate-950/40 ring-1 ring-slate-800/70 opacity-0 transition group-hover:pointer-events-auto group-hover:translate-y-0 group-hover:opacity-100">
                  <div className="grid grid-cols-1 gap-2">
                    {serviceLinks.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        title={service.title}
                        className={`flex items-start gap-3 rounded-xl px-3 py-2 text-left text-sm text-slate-100 transition hover:bg-slate-800/80 ${focusRingClass}`}
                      >
                        <span className="text-lg" aria-hidden="true">
                          {service.icon}
                        </span>
                        <span className="flex flex-col">
                          <span className="font-semibold leading-tight">{service.label}</span>
                          <span className="text-[12px] text-slate-400">
                            {service.description}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="flex items-center gap-3">
                <a
                  href="tel:+905453048671"
                  className={`rounded-full bg-gradient-to-r from-emerald-400 to-emerald-500 px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm shadow-emerald-500/30 hover:from-emerald-300 hover:to-emerald-400 ${focusRingClass}`}
                >
                  {t.callNow}
                </a>
                <a
                  href="https://wa.me/905453048671?text=Merhaba%2C+etkinliginiz+icin+teklif+almak+isterim."
                  target="_blank"
                  rel="noreferrer"
                  className={`rounded-full border border-emerald-300/70 px-4 py-2 text-sm font-semibold text-emerald-200 hover:bg-emerald-500/10 hover:text-white ${focusRingClass}`}
                  aria-label={`${t.whatsappCta} (WhatsApp yeni sekmede açılır)`}
                >
                  {t.whatsappCta}
                </a>
              </div>
          </div>

            <button
              type="button"
              ref={toggleButtonRef}
              onClick={() => setMobileOpen((s) => !s)}
              className={`
                lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-white border 
                border-neutral-200 hover:bg-neutral-50 transition-all duration-200 
                min-h-[44px] min-w-[44px] transform hover:scale-105 ${focusRingClass}
              `}
              aria-label={
                mobileOpen
                  ? headerStrings.mobileToggleCloseLabel
                  : headerStrings.mobileToggleOpenLabel
              }
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="true"
            >
              <span className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5" aria-hidden="true">
                <span
                  className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
                    mobileOpen ? "rotate-45 translate-y-2" : ""
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`w-5 h-0.5 bg-neutral-900 rounded-full transition-all duration-300 origin-center ${
                    mobileOpen ? "-rotate-45 -translate-y-2" : ""
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal={mobileOpen || undefined}
        aria-labelledby={MOBILE_MENU_HEADING_ID}
        className={`
          lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200 
          shadow-2xl overflow-hidden transition-all duration-300 ease-in-out
          ${mobileOpen ? "max-h-[85vh] opacity-100 pointer-events-auto visible" : "max-h-0 opacity-0 pointer-events-none invisible"}
        `}
      >
        <h2 id={MOBILE_MENU_HEADING_ID} className="sr-only">
          {headerStrings.navLabel}
        </h2>

        <nav aria-label={headerStrings.navLabel}>
          <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/hakkimizda"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl
                hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent
                hover:border-blue-200 transform hover:scale-[1.02] ${focusRingClass}
              `}
              aria-current={isActiveLink("/hakkimizda") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">
                👥
              </span>
              Hakkımızda
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl
                hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent
                hover:border-blue-200 transform hover:scale-[1.02] ${focusRingClass}
              `}
              aria-current={isActiveLink("/blog") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">
                📝
              </span>
              Blog
            </Link>

            <div className="py-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((s) => !s)}
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-list"
                className={`
                  w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold
                  text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700
                  transition-all duration-200 border border-transparent hover:border-blue-200
                  min-h-[44px] transform hover:scale-[1.02] ${focusRingClass}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">
                    🎯
                  </span>
                  <span>Hizmetler</span>
                </span>
                <svg
                  className={`w-5 h-5 shrink-0 text-neutral-700 transition-transform duration-200 ${
                    mobileServicesOpen ? "rotate-180" : ""
                  }`}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M6 9l6 6 6-6" />
                </svg>
              </button>

              <div
                id="mobile-services-list"
                className={`
                  overflow-hidden transition-all duration-300 ease-in-out
                  ${mobileServicesOpen ? "max-h-[600px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"}
                `}
              >
                <div className="ml-4 rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {serviceLinks.map(({ href, label, title, icon, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-start gap-3 px-3 py-2 text-sm text-neutral-700
                        hover:bg-blue-50 hover:text-blue-700 rounded-md
                        transition-all duration-200 w-full transform hover:scale-[1.01]
                        ${focusRingClass}
                      `}
                      title={title}
                      aria-current={isActiveLink(href) ? "page" : undefined}
                    >
                      <span className="text-base opacity-70 mt-0.5 flex-shrink-0" aria-hidden="true">
                        {icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-neutral-900">{label}</div>
                        <div className="text-xs text-neutral-600 mt-0.5 font-medium">{description}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl
                hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent
                hover:border-blue-200 transform hover:scale-[1.02] ${focusRingClass}
              `}
              aria-current={isActiveLink("/iletisim") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">
                📞
              </span>
              İletişim
            </Link>

            <a
              href="https://wa.me/905453048671?text=Merhaba%2C+sahne+ve+etkinlik+ekipmanları+için+teklif+almak+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Teklif — yeni sekmede açılır"
              className={mobileWhatsappBtnClass}
              onClick={() => setMobileOpen(false)}
            >
              <span aria-hidden="true" className="text-base">
                💬
              </span>
              <span>WhatsApp Teklif</span>
              <span className="sr-only"> — yeni sekmede açılır</span>
            </a>
          </div>
        </nav>
      </div>

      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"}
        `}
        onClick={() => setMobileOpen(false)}
        aria-hidden="true"
      />
    </>
  );
}
