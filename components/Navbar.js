// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const focusRingClass = "focus-ring";

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

export default function Navbar() {
  const pathname = usePathname();
  const headerStrings = LOCALE_CONTENT.tr.header;
  
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
  const previousOverflow = useRef("");
  const mobileMenuId = "mobile_menu";
  const servicesBtnId = "nav-services-button";
  const servicesMenuId = "nav-services-menu";
  const mobileMenuHeadingId = "mobile-menu-title-tr";
  const mobileToggleOpenLabel =
    headerStrings?.mobileToggleOpenLabel ?? "Menüyü aç";
  const mobileToggleCloseLabel =
    headerStrings?.mobileToggleCloseLabel ?? "Menüyü kapat";

  /* =============== ESC ile kapatma =============== */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key !== "Escape") return;

      const wasMobileOpen = mobileOpen;
      const wasServicesOpen = servicesOpen;

      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);

      if (wasMobileOpen) {
        toggleButtonRef.current?.focus();
      } else if (wasServicesOpen) {
        servicesButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen, servicesOpen]);

  /* =============== Rota değişince hepsini kapat =============== */
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  /* =============== Mobil açıkken body scroll kilidi =============== */
  useEffect(() => {
    if (mobileOpen) {
      previousOverflow.current = document.body.style.overflow;
      previouslyFocusedElement.current = toggleButtonRef.current;
      document.body.style.overflow = "hidden";
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.style.overflow = previousOverflow.current || "";
      document.body.classList.remove("overflow-hidden");
      if (previouslyFocusedElement.current instanceof HTMLElement) {
        previouslyFocusedElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = previousOverflow.current || "";
      document.body.classList.remove("overflow-hidden");
    };
  }, [mobileOpen]);

  /* =============== Hizmetler dropdown dış tıklama =============== */
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    if (servicesOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [servicesOpen]);

  /* =============== Mobil menü odak tuzağı =============== */
  useEffect(() => {
    if (!mobileOpen) return undefined;

    const menuNode = mobileMenuRef.current;
    if (!menuNode) return undefined;

    const focusableSelectors =
      'a[href]:not([tabindex="-1"]), button:not([disabled]), [tabindex="0"]';
    const focusable = menuNode.querySelectorAll(focusableSelectors);
    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (first instanceof HTMLElement) {
      first.focus();
    }

    const handleKeyDown = (event) => {
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
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  useEffect(
    () => () => hoverTimer.current && clearTimeout(hoverTimer.current),
    []
  );

  /* =============== Hizmetler klavye navigasyonu =============== */
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
      setTimeout(() => focusServiceItem(index), 0);
    },
    [focusServiceItem]
  );

  const handleServicesButtonKeyDown = useCallback(
    (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        setServicesOpen((prev) => {
          const next = !prev;
          if (!prev && next) {
            setTimeout(() => focusServiceItem(0), 0);
          }
          return next;
        });
        return;
      }

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (servicesOpen) {
          focusServiceItem(0);
        } else {
          openServicesMenuAndFocus(0);
        }
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (servicesOpen) {
          focusServiceItem(serviceLinks.length - 1);
        } else {
          openServicesMenuAndFocus(serviceLinks.length - 1);
        }
      }
    },
    [focusServiceItem, openServicesMenuAndFocus, servicesOpen]
  );

  const handleServiceItemKeyDown = useCallback(
    (event, index) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        focusServiceItem(index + 1);
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        focusServiceItem(index - 1);
        return;
      }

      if (event.key === "Home") {
        event.preventDefault();
        focusServiceItem(0);
        return;
      }

      if (event.key === "End") {
        event.preventDefault();
        focusServiceItem(serviceLinks.length - 1);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        setServicesOpen(false);
        servicesButtonRef.current?.focus();
      }
    },
    [focusServiceItem]
  );

  useEffect(() => {
    if (servicesOpen && document.activeElement === servicesButtonRef.current) {
      setTimeout(() => focusServiceItem(0), 0);
    }
  }, [focusServiceItem, servicesOpen]);

  const active = useCallback(
    (href) => pathname === href || (href !== "/" && pathname?.startsWith(href)),
    [pathname]
  );

  /* =============== Hover helper =============== */
  const openNow = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };

  const closeWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const handleHover = (e) => {
    const element = e.currentTarget;
    element.style.transform = "scale(1.02)";
  };

  const handleHoverEnd = (e) => {
    const element = e.currentTarget;
    element.style.transform = "scale(1)";
  };

  const whatsappBtnClass =
    `ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] border border-green-600/20 ${focusRingClass}`;

  const mobileWhatsappBtnClass =
    `block text-center mt-4 rounded-xl px-5 py-3 text-white text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 min-h-[44px] flex items-center justify-center gap-2 border border-green-600/20 ${focusRingClass}`;

  serviceItemRefs.current.length = serviceLinks.length;

  return (
    <>
      {/* Header artık layout'ta, burada sadece NAV var */}
      <nav
        role="navigation"
        aria-label={headerStrings?.navLabel ?? "Ana gezinme"}
        className="fixed top-0 inset-x-0 z-50 bg-white border-b border-neutral-200/80 shadow-lg"
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center gap-3 group ${focusRingClass}`}
              aria-label="Sahneva - Profesyonel sahne ve etkinlik ekipmanları kiralama"
              title="Sahneva Ana Sayfa - Etkinlik ekipmanları kiralama"
              itemProp="url"
            >
              <Image
                src="/img/logo.png"
                alt="Sahneva Logo - Profesyonel sahne, podyum, LED ekran kiralama"
                width={160}
                height={40}
                priority={pathname === "/"}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                itemProp="logo"
              />
            </Link>

            {/* Masaüstü menü */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                href="/hakkimizda"
                className={
                  active("/hakkimizda")
                    ? `relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl text-blue-700 bg-blue-50 border border-blue-200 ${focusRingClass}`
                    : `relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 hover:border hover:border-neutral-200 ${focusRingClass}`
                }
                aria-current={active("/hakkimizda") ? "page" : undefined}
                title="Sahneva Hakkında - Şirket bilgileri ve referanslar"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
              >
                Hakkımızda
              </Link>

              {/* Hizmetler açılır menü */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openNow}
                onMouseLeave={closeWithDelay}
                onFocus={openNow}
                onBlur={closeWithDelay}
              >
                <button
                  id={servicesBtnId}
                  type="button"
                  className={
                    active("/hizmetler") || servicesOpen
                      ? `relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 group border text-blue-700 bg-blue-50 border-blue-200 ${focusRingClass}`
                      : `relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 group border text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 border-transparent hover:border-neutral-200 ${focusRingClass}`
                  }
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesMenuId}
                  onClick={() => setServicesOpen((s) => !s)}
                  onKeyDown={handleServicesButtonKeyDown}
                  ref={servicesButtonRef}
                  title="Sahneva Hizmetler - Tüm ekipman kiralama hizmetlerimiz"
                  onMouseEnter={handleHover}
                  onMouseLeave={handleHoverEnd}
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

                {/* Hover kaybında boşluk köprüsü */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-full h-2"
                  onMouseEnter={openNow}
                />

                <div
                  id={servicesMenuId}
                  role="menu"
                  aria-labelledby={servicesBtnId}
                  hidden={!servicesOpen}
                  className={`absolute left-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl z-[60] overflow-hidden transition-all duration-200 ${
                    servicesOpen
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2 pointer-events-none"
                  }`}
                  onMouseEnter={openNow}
                  onMouseLeave={closeWithDelay}
                >
                  <div className="flex flex-col p-2">
                    {serviceLinks.map(
                      ({ href, label, title, icon, description }, index) => (
                        <Link
                          key={href}
                          role="menuitem"
                          href={href}
                          ref={(node) => {
                            serviceItemRefs.current[index] = node;
                          }}
                          className={`group flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 w-full transform hover:scale-[1.02] ${focusRingClass}`}
                          onClick={() => setServicesOpen(false)}
                          onKeyDown={(event) =>
                            handleServiceItemKeyDown(event, index)
                          }
                          aria-current={active(href) ? "page" : undefined}
                          title={title}
                        >
                          <span
                            className="text-lg opacity-70 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0"
                            aria-hidden="true"
                          >
                            {icon}
                          </span>
                          <div className="flex-1 min-w-0">
                            <div className="font-medium text-neutral-800 group-hover:text-blue-600">
                              {label}
                            </div>
                            <div className="text-xs text-neutral-500 mt-0.5">
                              {description}
                            </div>
                          </div>
                        </Link>
                      )
                    )}
                  </div>
                </div>
              </div>

              <Link
                href="/iletisim"
                className={
                  active("/iletisim")
                    ? `relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl text-blue-700 bg-blue-50 border border-blue-200 ${focusRingClass}`
                    : `relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 hover:border hover:border-neutral-200 ${focusRingClass}`
                }
                aria-current={active("/iletisim") ? "page" : undefined}
                title="Sahneva İletişim - Bize ulaşın ve teklif alın"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
              >
                İletişim
              </Link>

              {/* Masaüstü WhatsApp CTA */}
              <a
                href="https://wa.me/905453048671?text=Merhaba%2C+sahne+ve+etkinlik+ekipmanları+için+teklif+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Teklif — yeni sekmede açılır"
                className={whatsappBtnClass}
                title="WhatsApp'tan teklif alın"
                onMouseEnter={handleHover}
                onMouseLeave={handleHoverEnd}
              >
                <span aria-hidden="true" className="text-base">
                  💬
                </span>
                <span>WhatsApp Teklif</span>
                <span className="sr-only"> — yeni sekmede açılır</span>
              </a>
            </div>

            {/* Mobil menü butonu */}
            <button
              type="button"
              ref={toggleButtonRef}
              onClick={() => setMobileOpen((s) => !s)}
              className={`lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-white border border-neutral-200 hover:bg-neutral-50 transition-all duration-200 min-h-[44px] min-w-[44px] transform hover:scale-105 ${focusRingClass}`}
              aria-label={mobileOpen ? mobileToggleCloseLabel : mobileToggleOpenLabel}
              aria-expanded={mobileOpen}
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              title="Mobil menü"
            >
              <span className="relative w-6 h-6" aria-hidden="true">
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-200 ${
                    mobileOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobil backdrop – focus alınmasın, sadece tıklanabilir alan */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Mobil menü – her zaman DOM'da, kapalıyken gizli */}
      <div
        id={mobileMenuId}
        ref={mobileMenuRef}
        role="dialog"
        aria-modal={mobileOpen ? "true" : undefined}
        aria-label={
          mobileOpen ? headerStrings?.navLabel ?? "Ana gezinme" : undefined
        }
        aria-labelledby={mobileMenuHeadingId}
        aria-hidden={!mobileOpen}
        hidden={!mobileOpen}
        className="lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200 shadow-2xl max-h-[80vh] opacity-100 transition-all duration-300 overflow-hidden"
      >
        <h2 id={mobileMenuHeadingId} className="sr-only">
          {headerStrings?.navLabel ?? "Ana gezinme"}
        </h2>
        <nav
          id="primary-navigation-mobile"
          role="navigation"
          aria-label={headerStrings?.navLabel ?? "Ana gezinme"}
        >
          <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            <Link
              href="/hakkimizda"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-4 text-neutral-800 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 transform hover:scale-[1.02] ${focusRingClass}`}
              aria-current={active("/hakkimizda") ? "page" : undefined}
              title="Sahneva Hakkında"
            >
              <span className="text-lg" aria-hidden="true">
                👥
              </span>
              Hakkımızda
            </Link>

            <div className="py-1">
              <button
                type="button"
                onClick={() => setMobileServicesOpen((s) => !s)}
                aria-expanded={mobileServicesOpen}
                aria-controls="mobile-services-list"
                className={`w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 min-h-[44px] transform hover:scale-[1.02] ${focusRingClass}`}
                title="Sahneva Hizmetler Menüsü"
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
                className={`overflow-hidden transition-all duration-200 ${
                  mobileServicesOpen
                    ? "max-h-80 opacity-100 mt-2"
                    : "max-h-0 opacity-0"
                }`}
              >
                <div className="ml-4 rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {serviceLinks.map(
                    ({ href, label, title, icon, description }) => (
                      <Link
                        key={href}
                        href={href}
                        onClick={() => setMobileOpen(false)}
                        className={`flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 w-full transform hover:scale-[1.01] ${focusRingClass}`}
                        aria-current={active(href) ? "page" : undefined}
                        title={title}
                      >
                        <span
                          className="text-base opacity-70 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        >
                          {icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-neutral-800">
                            {label}
                          </div>
                          <div className="text-xs text-neutral-500 mt-0.5">
                            {description}
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            <Link
              href="/iletisim"
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 py-3.5 px-4 text-neutral-800 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 transform hover:scale-[1.02] ${focusRingClass}`}
              aria-current={active("/iletisim") ? "page" : undefined}
              title="Sahneva İletişim"
            >
              <span className="text-lg" aria-hidden="true">
                📞
              </span>
              İletişim
            </Link>

            {/* Mobil WhatsApp CTA */}
            <a
              href="https://wa.me/905453048671?text=Merhaba%2C+sahne+ve+etkinlik+ekipmanları+için+teklif+almak+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp Teklif — yeni sekmede açılır"
              className={mobileWhatsappBtnClass}
              onClick={() => setMobileOpen(false)}
              title="WhatsApp'tan teklif alın"
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
    </>
  );
}
