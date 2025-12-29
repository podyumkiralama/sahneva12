// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback, useMemo, useId } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white";

const MOBILE_MENU_HEADING_ID = "navbar-mobile-menu-heading";
const MOBILE_MENU_DESCRIPTION_ID = "navbar-mobile-menu-description";

const NAVBAR_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva ile etkinlik ekipmanları için teklif ve destek almak istiyorum."
);

/**
 * Hizmet linkleri (mega menü + mobil menü)
 * Not: Kurumsal Organizasyon burada olmalı.
 */
const SERVICE_LINKS = [
  {
    href: "/podyum-kiralama",
    label: "Podyum Kiralama",
    icon: "👑",
    description: "Profesyonel modüler podyum sistemleri",
  },
  {
    href: "/led-ekran-kiralama",
    label: "LED Ekran Kiralama",
    icon: "🖥️",
    description: "HD LED ekran ve video wall çözümleri",
  },
  {
    href: "/sahne-kiralama",
    label: "Sahne Kiralama",
    icon: "🎪",
    description: "Portatif ve modüler sahne sistemleri",
  },
  {
    href: "/kurumsal-organizasyon",
    label: "Kurumsal Organizasyon",
    icon: "🏢",
    description: "Kurumsal etkinlik planlama ve uçtan uca organizasyon yönetimi",
  },
  {
    href: "/ses-isik-sistemleri",
    label: "Ses & Işık Sistemleri",
    icon: "🎭",
    description: "Konser kalitesinde ses ve ışık ekipmanları",
  },
  {
    href: "/truss-kiralama",
    label: "Truss Kiralama",
    icon: "🧩",
    description: "Alüminyum truss, portal ve üst yapı çözümleri",
  },
  {
    href: "/cadir-kiralama",
    label: "Çadır Kiralama",
    icon: "⛺",
    description: "Her türlü etkinlik için çadır çözümleri",
  },
  {
    href: "/masa-sandalye-kiralama",
    label: "Masa Sandalye Kiralama",
    icon: "🪑",
    description: "Toplantı ve davetler için masa sandalye",
  },
];

export default function Navbar({
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role: roleOverride,
  headingId: headingIdProp,
  descriptionId: descriptionIdProp,
}) {
  const pathname = usePathname();
  const instanceId = useId();

  const headerStrings = LOCALE_CONTENT?.tr?.header || {
    navLabel: "Ana gezinme menüsü",
    mobileToggleOpenLabel: "Menüyü Aç",
    mobileToggleCloseLabel: "Menüyü Kapat",
  };

  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const computedHeadingId = headingIdProp ?? `navbar-heading-${instanceId}`;
  const computedDescriptionId =
    descriptionIdProp ?? `navbar-description-${instanceId}`;

  const resolvedAriaLabel =
    ariaLabel ?? (ariaLabelledby ? undefined : headerStrings.navLabel);
  const resolvedAriaLabelledby =
    ariaLabel || ariaLabelledby ? ariaLabelledby : computedHeadingId;
  const resolvedAriaDescribedby = ariaDescribedby ?? computedDescriptionId;

  const navRole = roleOverride;
  const shouldRenderHeading = !resolvedAriaLabel && !ariaLabelledby;
  const shouldRenderDescription = !ariaDescribedby;

  const hoverTimer = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const servicesButtonRef = useRef(null);

  const firstServiceItemRef = useRef(null);
  const serviceItemRefs = useRef([]);

  const mobileMenuOpenedRef = useRef(false);

  const mobileMenuId = "mobile_menu";
  const servicesBtnId = "nav-services-button";
  const servicesMenuId = "nav-services-menu";
  const servicesPanelId = "nav-services-mega-panel";

  const active = useCallback(
    (href) =>
      pathname === href || (href !== "/" && pathname?.startsWith(href)),
    [pathname]
  );
<Link
  href="/yardim"
  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/80 hover:bg-white/10 hover:text-white transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/50"
  aria-label="Yardım ve arama"
>
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="h-5 w-5">
    <path
      d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M16.5 16.5 21 21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
</Link>

  const whatsappBtnClass = useMemo(
    () =>
      `ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-bold
       bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
       transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
       min-h-[44px] border border-green-700/20 ${FOCUS_RING_CLASS}`,
    []
  );

  const mobileWhatsappBtnClass = useMemo(
    () =>
      `inline-flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-white text-sm font-bold
       bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
       transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
       min-h-[44px] border border-green-700/20 ${FOCUS_RING_CLASS}`,
    []
  );

  const openNow = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (!servicesOpen) setServicesOpen(true);
  }, [servicesOpen]);

  const closeWithDelay = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 200);
  }, []);

  // ===== Keyboard nav for ARIA menuitems =====
  const focusServiceItem = useCallback((index) => {
    const items = serviceItemRefs.current.filter(Boolean);
    if (!items.length) return;
    const normalizedIndex =
      ((index % items.length) + items.length) % items.length;
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
            if (next) requestAnimationFrame(() => focusServiceItem(0));
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
            ? focusServiceItem(SERVICE_LINKS.length - 1)
            : openServicesMenuAndFocus(SERVICE_LINKS.length - 1);
          break;
        case "Escape":
          if (servicesOpen) {
            event.preventDefault();
            setServicesOpen(false);
            requestAnimationFrame(() => servicesButtonRef.current?.focus());
          }
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
          focusServiceItem(SERVICE_LINKS.length - 1);
          break;
        case "Escape":
          event.preventDefault();
          setServicesOpen(false);
          requestAnimationFrame(() => servicesButtonRef.current?.focus());
          break;
        default:
          break;
      }
    },
    [focusServiceItem]
  );

  // When servicesOpen -> focus first item
  useEffect(() => {
    if (!servicesOpen) return;
    requestAnimationFrame(() => {
      firstServiceItemRef.current?.focus();
    });
  }, [servicesOpen]);

  // ESC global (mobile + mega)
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      const wasMobileOpen = mobileOpen;
      const wasServicesOpen = servicesOpen;

      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);

      if (wasMobileOpen || wasServicesOpen) {
        requestAnimationFrame(() => {
          if (wasMobileOpen) toggleButtonRef.current?.focus();
          else if (wasServicesOpen) servicesButtonRef.current?.focus();
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, servicesOpen]);

  // route change -> close
  useEffect(() => {
    if (mobileOpen || servicesOpen || mobileServicesOpen) {
      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);
    }
  }, [pathname]);

  // body scroll lock for mobile
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
      document.documentElement.style.overflow = "hidden";
      mobileMenuOpenedRef.current = true;
      return () => {
        document.body.style.overflow = "";
        document.documentElement.style.overflow = "";
      };
    }

    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    if (mobileMenuOpenedRef.current) {
      requestAnimationFrame(() => toggleButtonRef.current?.focus());
      mobileMenuOpenedRef.current = false;
    }
    return undefined;
  }, [mobileOpen]);

  // outside click close for mega menu
  useEffect(() => {
    if (!servicesOpen) return;

    const handleClickOutside = (e) => {
      const panel = document.getElementById(servicesPanelId);
      const btn = servicesButtonRef.current;
      if (!panel || !btn) return;
      if (panel.contains(e.target) || btn.contains(e.target)) return;
      setServicesOpen(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [servicesOpen]);

  // focus trap for mobile menu
  useEffect(() => {
    if (!mobileOpen) return;

    const menuNode = mobileMenuRef.current;
    if (!menuNode) return;

    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    const focusable = Array.from(
      menuNode.querySelectorAll(focusableSelectors)
    ).filter(
      (el) =>
        el instanceof HTMLElement &&
        el.tabIndex !== -1 &&
        el.getAttribute("aria-hidden") !== "true"
    );

    if (!focusable.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    requestAnimationFrame(() => {
      first instanceof HTMLElement && first.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;
      const activeEl = document.activeElement;

      if (event.shiftKey) {
        if (activeEl === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        if (activeEl === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  const NavLink = useCallback(
    ({ href, children, className = "" }) => (
      <Link
        href={href}
        className={`
          relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl
          ${
            active(href)
              ? "text-blue-700 bg-blue-50 border border-blue-200"
              : "text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 hover:border hover:border-neutral-200 border border-transparent"
          }
          ${FOCUS_RING_CLASS} ${className}
        `}
        aria-current={active(href) ? "page" : undefined}
      >
        {children}
      </Link>
    ),
    [active]
  );

  const ServiceLink = useCallback(
    ({ href, label, icon, description, index, isOpen, firstItemRef }) => (
      <Link
        href={href}
        ref={(node) => {
          serviceItemRefs.current[index] = node;
          if (index === 0 && firstItemRef) firstItemRef.current = node;
        }}
        className={`
          group flex items-start gap-3 rounded-xl px-5 py-3.5
          text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700
          transition-all duration-200 border border-transparent hover:border-blue-200
          ${FOCUS_RING_CLASS}
        `}
        onClick={() => setServicesOpen(false)}
        onKeyDown={(event) => handleServiceItemKeyDown(event, index)}
        aria-current={active(href) ? "page" : undefined}
        role="menuitem"
        tabIndex={isOpen ? 0 : -1}
      >
        <span
          className="mt-0.5 text-lg opacity-80 group-hover:opacity-100"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <div className="font-extrabold text-neutral-900 group-hover:text-blue-700">
            {label}
          </div>
          <div className="mt-0.5 text-xs font-medium text-neutral-600">
            {description}
          </div>
        </div>
        <span
          className="ml-2 text-neutral-400 group-hover:text-blue-600"
          aria-hidden="true"
        >
          ›
        </span>
      </Link>
    ),
    [active, handleServiceItemKeyDown]
  );

  const serviceCols = useMemo(() => {
    const byHref = (h) => SERVICE_LINKS.find((x) => x.href === h);
    return [
      {
        title: "Sahne & Görüntü",
        items: [byHref("/sahne-kiralama"), byHref("/podyum-kiralama"), byHref("/led-ekran-kiralama")].filter(Boolean),
      },
      {
        title: "Teknik Altyapı",
        items: [byHref("/ses-isik-sistemleri"), byHref("/truss-kiralama")].filter(Boolean),
      },
      {
        title: "Alan & Donanım",
        items: [byHref("/cadir-kiralama"), byHref("/masa-sandalye-kiralama")].filter(Boolean),
      },
    ];
  }, []);

  // "Kurumsal Organizasyon" özel blok (güvenli)
  const kurumsal = useMemo(
    () => SERVICE_LINKS.find((s) => s.href === "/kurumsal-organizasyon") || null,
    []
  );
  const kurumsalIndex = useMemo(
    () => SERVICE_LINKS.findIndex((s) => s.href === "/kurumsal-organizasyon"),
    []
  );

  return (
    <>
      <nav
        aria-label={resolvedAriaLabel}
        aria-labelledby={resolvedAriaLabel ? undefined : resolvedAriaLabelledby}
        aria-describedby={resolvedAriaDescribedby}
        role={navRole}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200/80 shadow-lg"
      >
        {shouldRenderHeading && (
          <p id={computedHeadingId} className="sr-only">
            {headerStrings.navLabel}
          </p>
        )}
        {shouldRenderDescription && (
          <p id={computedDescriptionId} className="sr-only">
            {headerStrings.navLabel} bağlantıları arasında gezinmek için tab tuşunu kullanabilirsiniz.
          </p>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link
              href="/"
              className={`flex items-center gap-3 group ${FOCUS_RING_CLASS}`}
              aria-label="Sahneva - Ana Sayfa"
            >
              <Image
                src="/img/logo.webp"
                alt="Sahneva Logo"
                width={160}
                height={40}
                decoding="async"
                sizes="(max-width: 768px) 120px, 160px"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105"
              />

            </Link>

            <div className="hidden lg:flex items-center gap-4">
              <NavLink href="/hakkimizda">Hakkımızda</NavLink>
              <NavLink href="/blog">Blog</NavLink>

              {/* Hizmetler */}
              <div
                className="relative"
                onMouseEnter={openNow}
                onMouseLeave={closeWithDelay}
              >
                <button
                  id={servicesBtnId}
                  type="button"
                  className={`
                    relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 group border
                    ${
                      servicesOpen
                        ? "text-blue-700 bg-blue-50 border-blue-200"
                        : "text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 border-transparent hover:border-neutral-200"
                    }
                    ${FOCUS_RING_CLASS}
                  `}
                  aria-haspopup="menu"
                  aria-expanded={servicesOpen ? "true" : "false"}
                  aria-controls={servicesMenuId}
                  onClick={() =>
                    setServicesOpen((s) => {
                      const next = !s;
                      if (next) requestAnimationFrame(() => focusServiceItem(0));
                      return next;
                    })
                  }
                  onKeyDown={handleServicesButtonKeyDown}
                  ref={servicesButtonRef}
                >
                  <span className="flex items-center gap-2">
                    Hizmetler
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2.5}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </span>
                </button>

                {/* hover köprüsü */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-full h-3"
                  onMouseEnter={openNow}
                />

                {/* Mega panel (kapalıyken DOM’da yok) */}
                {servicesOpen && (
                  <div
                    id={servicesPanelId}
                    className="fixed inset-x-0 top-[80px] z-[70]"
                    onMouseEnter={openNow}
                    onMouseLeave={closeWithDelay}
                  >
                    <div className="mx-auto max-w-7xl px-4">
                      <div className="rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-hidden max-h-[calc(100vh-120px)] overflow-y-auto">
                        {/* Üst bar */}
                        <div className="flex items-center justify-between gap-3 px-6 py-4 border-b border-neutral-200">
                          <div className="flex items-center gap-3">
                            <span className="text-sm font-extrabold text-neutral-900">
                              Hizmetler
                            </span>
                            <span className="text-xs font-semibold text-neutral-500">
                              Sahneva’nın tüm kiralama çözümleri
                            </span>
                          </div>

                          <button
                            type="button"
                            onClick={() => setServicesOpen(false)}
                            className={`rounded-xl border border-neutral-200 bg-white px-3 py-2 text-sm font-bold text-neutral-900 hover:bg-neutral-50 ${FOCUS_RING_CLASS}`}
                            aria-label="Mega menüyü kapat"
                          >
                            ✕
                          </button>
                        </div>

                        {/* İçerik */}
                        <div className="grid gap-6 p-6 lg:grid-cols-[460px_1fr] items-stretch">
                          {/* Sol görsel (boşluk yok + ortalı) */}
                          <Link
                            href="/hizmetler"
                            onClick={() => setServicesOpen(false)}
                            className={`group relative overflow-hidden rounded-2xl border border-neutral-200 ${FOCUS_RING_CLASS} h-full`}
                          >
                            <div className="relative h-full min-h-[420px]">
                              <Image
                                src="/img/nav/hizmetler-mega.webp"
                                alt="Sahneva hizmetleri: sahne, podyum, LED ekran, ses-ışık ve daha fazlası"
                                fill
                                sizes="(max-width: 1024px) 100vw, 460px"
                                className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            </div>

                            <div className="absolute bottom-4 left-4 right-4">
                              <div className="text-3xl font-black text-white">
                                Hizmetler
                              </div>
                              <div className="mt-2 inline-flex items-center gap-2 text-sm font-bold text-white/90">
                                Tüm hizmetleri incele{" "}
                                <span aria-hidden="true">›</span>
                              </div>
                            </div>
                          </Link>

                          {/* Sağ kolonlar: ARIA MENU */}
                          <div
                            id={servicesMenuId}
                            role="menu"
                            aria-label="Hizmetler menüsü"
                            aria-orientation="vertical"
                            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                          >
                            {serviceCols.map((col, colIndex) => {
                              const headingId = `services-col-${colIndex}-heading`;
                              const isTechnical = col.title === "Teknik Altyapı";

                              return (
                                <div
                                  key={col.title}
                                  role="group"
                                  aria-labelledby={headingId}
                                >
                                  <div
                                    id={headingId}
                                    className="text-sm font-extrabold text-neutral-900"
                                  >
                                    {col.title}
                                  </div>

                                  {/* 🔥 Kurumsal Organizasyon – Teknik Altyapı üstüne blok */}
                                  {isTechnical && kurumsal && kurumsalIndex >= 0 && (
                                    <div className="mt-2 mb-3">
                                      <ServiceLink
                                        index={kurumsalIndex}
                                        isOpen={servicesOpen}
                                        {...kurumsal}
                                      />
                                    </div>
                                  )}

                                  <div className="mt-2 space-y-2">
                                    {col.items.map((service) => {
                                      const index = SERVICE_LINKS.findIndex(
                                        (s) => s.href === service.href
                                      );
                                      if (index < 0) return null;

                                      const isFirstFocusable =
                                        colIndex === 0 &&
                                        service.href === col.items?.[0]?.href;

                                      return (
                                        <ServiceLink
                                          key={service.href}
                                          index={index}
                                          isOpen={servicesOpen}
                                          firstItemRef={
                                            isFirstFocusable
                                              ? firstServiceItemRef
                                              : null
                                          }
                                          {...service}
                                        />
                                      );
                                    })}
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* alt bar intentionally removed */}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <NavLink href="/iletisim">İletişim</NavLink>

              <a
                href={`https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=desktop_whatsapp`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Destek – yeni sekmede açılır"
                className={whatsappBtnClass}
              >
                <span aria-hidden="true" className="text-base">
                  💬
                </span>
                <span>WhatsApp Destek</span>
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              type="button"
              ref={toggleButtonRef}
              onClick={() =>
                setMobileOpen((s) => {
                  if (!s) setMobileServicesOpen(false);
                  return !s;
                })
              }
              className={`
                lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-white border
                border-neutral-200 hover:bg-neutral-50 transition-all duration-200
                min-h-[44px] min-w-[44px] transform hover:scale-105 ${FOCUS_RING_CLASS}
              `}
              aria-label={
                mobileOpen
                  ? headerStrings.mobileToggleCloseLabel
                  : headerStrings.mobileToggleOpenLabel
              }
              aria-expanded={mobileOpen ? "true" : "false"}
              aria-controls={mobileMenuId}
            >
              <span
                className="relative w-6 h-6 flex flex-col justify-center items-center gap-1.5"
                aria-hidden="true"
              >
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

      {/* Mobile Menu */}
      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal={mobileOpen ? "true" : "false"}
        aria-labelledby={MOBILE_MENU_HEADING_ID}
        aria-describedby={MOBILE_MENU_DESCRIPTION_ID}
        aria-hidden={!mobileOpen}
        data-open={mobileOpen ? "true" : undefined}
        className={`
          lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200
          shadow-2xl overflow-hidden transition-all duration-300 ease-in-out
          ${
            mobileOpen
              ? "max-h-[85vh] opacity-100 pointer-events-auto visible"
              : "max-h-0 opacity-0 pointer-events-none invisible"
          }
        `}
      >
        <h2 id={MOBILE_MENU_HEADING_ID} className="sr-only">
          {headerStrings.navLabel}
        </h2>

        <p id={MOBILE_MENU_DESCRIPTION_ID} className="sr-only">
          {headerStrings.navLabel} menüsü. Bağlantıları gezmek için tab tuşunu
          kullanabilirsiniz.
        </p>

<nav
  aria-labelledby={MOBILE_MENU_HEADING_ID}
  aria-describedby={MOBILE_MENU_DESCRIPTION_ID}
>

          <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/hakkimizda"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl
                hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent
                hover:border-blue-200 transform hover:scale-[1.02] ${FOCUS_RING_CLASS}
              `}
              aria-current={active("/hakkimizda") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">👥</span>
              Hakkımızda
            </Link>

            <Link
              href="/blog"
              onClick={() => setMobileOpen(false)}
              className={`
                flex items-center gap-3 py-3.5 px-4 text-neutral-900 font-bold text-[15px] rounded-xl
                hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent
                hover:border-blue-200 transform hover:scale-[1.02] ${FOCUS_RING_CLASS}
              `}
              aria-current={active("/blog") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">📝</span>
              Blog
            </Link>

            {/* Mobile services accordion */}
            <div className="py-1">
              <button
                id="mobile-services-button"
                type="button"
                onClick={() => setMobileServicesOpen((s) => !s)}
                aria-expanded={mobileServicesOpen ? "true" : "false"}
                aria-controls="mobile-services-list"
                className={`
                  w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold
                  text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700
                  transition-all duration-200 border border-transparent hover:border-blue-200
                  min-h-[44px] transform hover:scale-[1.02] ${FOCUS_RING_CLASS}
                `}
              >
                <span className="flex items-center gap-3">
                  <span className="text-lg" aria-hidden="true">🎯</span>
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
  role="region"
  aria-labelledby="mobile-services-button"
  className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${mobileServicesOpen ? "max-h-[700px] opacity-100 py-2" : "max-h-0 opacity-0 py-0"}
  `}
>

                <div className="ml-4 rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {SERVICE_LINKS.map(({ href, label, icon, description }) => (
                    <Link
                      key={href}
                      href={href}
                      onClick={() => setMobileOpen(false)}
                      className={`
                        flex items-start gap-3 px-3 py-2 text-sm text-neutral-700
                        hover:bg-blue-50 hover:text-blue-700 rounded-md
                        transition-all duration-200 w-full transform hover:scale-[1.01]
                        ${FOCUS_RING_CLASS}
                      `}
                      aria-current={active(href) ? "page" : undefined}
                      tabIndex={mobileServicesOpen ? 0 : -1}
                    >
                      <span
                        className="text-base opacity-70 mt-0.5 flex-shrink-0"
                        aria-hidden="true"
                      >
                        {icon}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-neutral-900">{label}</div>
                        <div className="text-xs text-neutral-600 mt-0.5 font-medium">
                          {description}
                        </div>
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
                hover:border-blue-200 transform hover:scale-[1.02] ${FOCUS_RING_CLASS}
              `}
              aria-current={active("/iletisim") ? "page" : undefined}
            >
              <span className="text-lg" aria-hidden="true">📞</span>
              İletişim
            </Link>

            <div className="mt-4 rounded-2xl border border-green-700/20 bg-gradient-to-r from-emerald-700 to-green-600 p-4 shadow-xl">
              <div className="flex items-start gap-3">
                <span aria-hidden="true" className="text-2xl">💬</span>
                <div className="space-y-1 text-white">
                  <p className="text-lg font-extrabold">WhatsApp Destek</p>
                  <p className="text-sm font-medium text-emerald-50">
                    WhatsApp üzerinden anında teklif alın ve sorularınızı iletin.
                  </p>
                </div>
              </div>
              <a
                href={`https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=mobile_whatsapp`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Destek – yeni sekmede açılır"
                className={`${mobileWhatsappBtnClass} mt-4`}
                onClick={() => setMobileOpen(false)}
              >
                <span aria-hidden="true" className="text-base">🚀</span>
                <span>WhatsApp Destek</span>
              </a>
            </div>
          </div>
        </nav>
      </div>

      {/* Mobile Backdrop */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${mobileOpen ? "opacity-100 pointer-events-auto visible" : "opacity-0 pointer-events-none invisible"}
        `}
        onClick={() => {
          setMobileOpen(false);
          setMobileServicesOpen(false);
        }}
        aria-hidden={!mobileOpen}
        data-open={mobileOpen ? "true" : undefined}
      />
    </>
  );
}
