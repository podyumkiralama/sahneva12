// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useId,
} from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

// Tek yerde tanımlı focus ring helper
const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white";
const MOBILE_MENU_HEADING_ID = "navbar-mobile-menu-heading";
const MOBILE_MENU_DESCRIPTION_ID = "navbar-mobile-menu-description";

// Tüm hizmet linkleri (bileşen dışı, re-render'da değişmez)
const SERVICE_LINKS = [
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

const NAVBAR_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva ile etkinlik ekipmanları için teklif ve destek almak istiyorum."
);

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

  // Lokalizasyon fallback
  const headerStrings = LOCALE_CONTENT?.tr?.header || {
    navLabel: "Ana gezinme menüsü",
    mobileToggleOpenLabel: "Menüyü aç",
    mobileToggleCloseLabel: "Menüyü kapat",
  };

  // State
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const computedHeadingId = headingIdProp ?? `navbar-heading-${instanceId}`;
  const computedDescriptionId =
    descriptionIdProp ?? `navbar-description-${instanceId}`;
  const resolvedAriaLabel = ariaLabel ??
    (ariaLabelledby ? undefined : headerStrings.navLabel);
  const resolvedAriaLabelledby =
    ariaLabel || ariaLabelledby
      ? ariaLabelledby
      : computedHeadingId;
  const resolvedAriaDescribedby =
    ariaDescribedby ?? computedDescriptionId;
  const navRole = roleOverride ?? "navigation";
  const shouldRenderHeading = !resolvedAriaLabel && !ariaLabelledby;
  const shouldRenderDescription = !ariaDescribedby;

  // Refs
  const dropdownRef = useRef(null);
  const hoverTimer = useRef(null);
  const mobileMenuRef = useRef(null);
  const toggleButtonRef = useRef(null);
  const servicesButtonRef = useRef(null);
  const serviceItemRefs = useRef([]);
  const mobileMenuOpenedRef = useRef(false);

  // ARIA id'leri
  const mobileMenuId = "mobile_menu";
  const servicesBtnId = "nav-services-button";
  const servicesMenuId = "nav-services-menu";

  /**
   * Aktif link helper
   * @param {string} href - Linkin yolu
   * @returns {boolean}
   */
  const active = useCallback(
    (href) =>
      pathname === href ||
      (href !== "/" && pathname?.startsWith(href)),
    [pathname]
  );

  // Class memo'ları
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
      `block text-center mt-4 rounded-xl px-5 py-3 text-white text-sm font-bold
        bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
        transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
        min-h-[44px] flex items-center justify-center gap-2 border border-green-700/20 ${FOCUS_RING_CLASS}`,
    []
  );

  /* =============== Hover/Focus Yönetimi (Hizmetler) =============== */
  const openNow = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    if (!servicesOpen) {
      setServicesOpen(true);
    }
  }, [servicesOpen]);

  const closeWithDelay = useCallback(() => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(
      () => setServicesOpen(false),
      200
    );
  }, []);

  /* =============== Hizmetler Klavye Navigasyonu =============== */
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
      // Menünün açılmasını beklemek için requestAnimationFrame
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
              // Menü açılırsa ilk öğeye odaklan
              requestAnimationFrame(() => focusServiceItem(0));
            }
            return next;
          });
          break;
        case "ArrowDown":
          event.preventDefault();
          // Açık değilse aç ve ilk öğeye odaklan, açıksa sadece ilk öğeye odaklan
          servicesOpen
            ? focusServiceItem(0)
            : openServicesMenuAndFocus(0);
          break;
        case "ArrowUp":
          event.preventDefault();
          // Açık değilse aç ve son öğeye odaklan, açıksa sadece son öğeye odaklan
          servicesOpen
            ? focusServiceItem(SERVICE_LINKS.length - 1)
            : openServicesMenuAndFocus(
                SERVICE_LINKS.length - 1
              );
          break;
        case "Escape":
          // Menü düğmesindeyken Esc ile bir şey yapmaya gerek yok
          // Genel Esc dinleyicisi bu durumu ele alacak
          break;
      }
    },
    [
      focusServiceItem,
      openServicesMenuAndFocus,
      servicesOpen,
    ]
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
          // Odak düğmeye geri taşınır
          servicesButtonRef.current?.focus();
          break;
      }
    },
    [focusServiceItem]
  );

  /* =============== ESC ile Global Kapatma ve Odak Geri Taşıma =============== */
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== "Escape") return;

      const wasMobileOpen = mobileOpen;
      const wasServicesOpen = servicesOpen;

      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);

      // Sadece gerçekten bir şey kapandıysa odağı taşı
      if (wasMobileOpen || wasServicesOpen) {
        requestAnimationFrame(() => {
          if (wasMobileOpen) {
            // Mobil menü açıktıysa toggle düğmesine geri dön
            toggleButtonRef.current?.focus();
          } else if (wasServicesOpen) {
            // Hizmetler menüsü açıktıysa hizmetler düğmesine geri dön
            servicesButtonRef.current?.focus();
          }
        });
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () =>
      document.removeEventListener("keydown", handleEscape);
  }, [mobileOpen, servicesOpen]);

  /* =============== Rota Değişince Hepsini Kapat =============== */
  useEffect(() => {
    // Rota değiştiğinde menülerin kapatılması, özellikle mobil menü
    if (mobileOpen || servicesOpen || mobileServicesOpen) {
      setMobileOpen(false);
      setServicesOpen(false);
      setMobileServicesOpen(false);
      // Rota değişiminde odak yönetimini sıfırlamaya gerek yok,
      // React/Next.js yeni sayfada odak yönetimini üstlenecek
    }
  }, [pathname]);

  /* =============== Mobil Açıkken Body Scroll Kilidi ve Odak Yönetimi =============== */
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

    // Menü kapanırken scroll'u serbest bırak
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";

    if (mobileMenuOpenedRef.current) {
      requestAnimationFrame(() => {
        toggleButtonRef.current?.focus();
      });
      mobileMenuOpenedRef.current = false;
    }

    return undefined;
  }, [mobileOpen]);

  /* =============== Hizmetler Dropdown Dış Tıklama =============== */
  useEffect(() => {
    const handleClickOutside = (e) => {
      // Dış tıklama sadece servicesOpen true iken dinlenir
      if (
        servicesOpen &&
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        !servicesButtonRef.current.contains(e.target) // Düğme tıklaması zaten setServicesOpen'ı güncelliyor
      ) {
        setServicesOpen(false);
      }
    };

    if (servicesOpen) {
      // Tıklamaları dinle
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("touchstart", handleClickOutside);
    }
    return () => {
      // Dinleyicileri kaldır
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
      document.removeEventListener(
        "touchstart",
        handleClickOutside
      );
    };
  }, [servicesOpen]);

  /* =============== Mobil Menü Odak Tuzağı (Focus Trap) =============== */
  useEffect(() => {
    if (!mobileOpen) return;

    const menuNode = mobileMenuRef.current;
    if (!menuNode) return;

    // Odaklanabilir öğe seçicileri
    const focusableSelectors =
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

    // Odaklanılabilir tüm öğeleri al
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

    // Mobil menü açıldığında ilk öğeye odaklan (erişilebilirlik kuralı)
    requestAnimationFrame(() => {
      first instanceof HTMLElement && first.focus();
    });

    const handleKeyDown = (event) => {
      if (event.key !== "Tab") return;

      const activeEl = document.activeElement;

      if (event.shiftKey) {
        // Shift + Tab (Geriye doğru döngü)
        if (activeEl === first) {
          event.preventDefault();
          last.focus();
        }
      } else {
        // Tab (İleri doğru döngü)
        if (activeEl === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () =>
      document.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  /* =============== Hover timer cleanup (Sadece unmount için) =============== */
  useEffect(() => {
    return () => {
      if (hoverTimer.current) clearTimeout(hoverTimer.current);
    };
  }, []);

  /* =============== Tekrarlı NavLink helper =============== */
  // NavLink, aktif durumu ve odak halkası yönetimi içerir
  const NavLink = useCallback(
    ({ href, children, title, className = "" }) => (
      <Link
        href={href}
        className={`
          relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl
          ${
            active(href)
              ? "text-blue-700 bg-blue-50 border border-blue-200"
              : "text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 hover:border hover:border-neutral-200"
          }
          ${FOCUS_RING_CLASS} ${className}
        `}
        aria-current={active(href) ? "page" : undefined}
        title={title}
      >
        {children}
      </Link>
    ),
    [active]
  );

  /* =============== ServiceLink helper =============== */
  // ServiceLink, klavye yönetimi ve ref yönetimi içerir
  const ServiceLink = useCallback(
    ({
      href,
      label,
      title,
      icon,
      description,
      index,
    }) => (
      // Link etrafındaki li öğesi kaldırıldı, çünkü bu bir Link bileşeni.
      // Dışarıda <li> kullanılıyor.
      <Link
        href={href}
        ref={(node) => {
          serviceItemRefs.current[index] = node;
        }}
        className={`
          group flex items-start gap-3 px-3 py-2 text-sm text-neutral-700
          hover:bg-blue-50 hover:text-blue-700 rounded-lg transition-all duration-200
          w-full transform hover:scale-[1.02] ${FOCUS_RING_CLASS}
        `}
        onClick={() => setServicesOpen(false)} // Tıklandığında menüyü kapat
        onKeyDown={(event) =>
          handleServiceItemKeyDown(event, index)
        }
        // ARIA: Aktif sayfayı belirt
        aria-current={active(href) ? "page" : undefined}
        title={title}
        // role="menuitem" kullanımı tartışmalı olduğu için (navigasyon bağlantısı yerine menü öğesi),
        // standart <Link> olarak bırakıldı ve klavye yönetimi (ArrowDown/Up) eklendi.
      >
        <span
          className="text-lg opacity-80 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0"
          aria-hidden="true"
        >
          {icon}
        </span>
        <div className="flex-1 min-w-0">
          <div className="font-bold text-neutral-900 group-hover:text-blue-700">
            {label}
          </div>
          <div className="text-xs text-neutral-600 font-medium mt-0.5">
            {description}
          </div>
        </div>
      </Link>
    ),
    [active, handleServiceItemKeyDown]
  );

    return (
    <>
      {/* Desktop Navbar */}
      <nav
        aria-label={resolvedAriaLabel}
        aria-labelledby={resolvedAriaLabel ? undefined : resolvedAriaLabelledby}
        aria-describedby={resolvedAriaDescribedby}
        role={navRole}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200/80 shadow-lg"
      >
        {shouldRenderHeading && (
          <h2 id={computedHeadingId} className="sr-only">
            {headerStrings.navLabel}
          </h2>
        )}
        {shouldRenderDescription && (
          <p id={computedDescriptionId} className="sr-only">
            {headerStrings.navLabel} bağlantıları arasında gezinmek için tab tuşunu
            kullanabilirsiniz.
          </p>
        )}

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className={`flex items-center gap-3 group ${FOCUS_RING_CLASS}`}
              aria-label="Sahneva - Profesyonel sahne ve etkinlik ekipmanları kiralama - Ana Sayfa"
            >
              <Image
                src="/img/logo.png"
                alt="Sahneva Logo - Profesyonel sahne, podyum, LED ekran kiralama"
                width={160}
                height={40}
                priority={pathname === "/"}
                sizes="(max-width: 768px) 120px, 160px"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105 nc-Navbar-logo-1"
              />
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-4">
              <NavLink href="/hakkimizda">Hakkımızda</NavLink>
              <NavLink href="/blog">Blog</NavLink>

              {/* Hizmetler Dropdown */}
              <div
                className="relative"
                ref={dropdownRef}
                onMouseEnter={openNow}
                onMouseLeave={closeWithDelay}
              >
                <button
                  id={servicesBtnId}
                  type="button"
                  className={`
                    relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 group border
                    ${
                      active("/hizmetler") || servicesOpen
                        ? "text-blue-700 bg-blue-50 border-blue-200"
                        : "text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 border-transparent hover:border-neutral-200"
                    }
                    ${FOCUS_RING_CLASS}
                  `}
                  aria-haspopup="true"
                  aria-expanded={servicesOpen ? "true" : "false"}
                  aria-controls={servicesMenuId}
                  data-open={servicesOpen ? "true" : undefined}
                  onClick={() =>
                    setServicesOpen((s) => {
                      const next = !s;
                      if (next) {
                        requestAnimationFrame(() => focusServiceItem(0));
                      }
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

                {/* Hover boşluk köprüsü */}
                <span
                  aria-hidden="true"
                  className="absolute left-0 right-0 top-full h-2"
                  onMouseEnter={openNow}
                />

                <ul
                  id={servicesMenuId}
                  aria-labelledby={servicesBtnId}
                  data-open={servicesOpen ? "true" : undefined}
                  className={`
                    absolute left-0 top-full mt-2 w-80 bg-white border border-neutral-200 rounded-xl shadow-xl
                    z-[60] transition-all duration-200 flex flex-col p-2
                    ${
                      servicesOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 translate-y-2 pointer-events-none"
                    }
                  `}
                  onMouseEnter={openNow}
                  onMouseLeave={closeWithDelay}
                >
                  <li className="part-category space-y-1">
                    <span className="part-menu-head text-xs font-semibold text-neutral-500 px-3 uppercase tracking-wider">
                      Hizmetler
                    </span>
                    <ul className="flex flex-col gap-1">
                      {SERVICE_LINKS.map((service, index) => (
                        <li key={service.href}>
                          <ServiceLink index={index} {...service} />
                        </li>
                      ))}
                    </ul>
                  </li>
                </ul>
              </div>

              <NavLink href="/iletisim">İletişim</NavLink>

              {/* Desktop WhatsApp CTA */}
              <a
                href={`https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=desktop_whatsapp`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                aria-label="WhatsApp Destek — WhatsApp üzerinden hızlı destek ve teklif alın (yeni sekmede açılır)"
                className={whatsappBtnClass}
              >
                <span aria-hidden="true" className="text-base">
                  💬
                </span>
                <span>WhatsApp Destek</span>
                <span className="sr-only">— yeni sekmede açılır</span>
              </a>
            </div>

            {/* Mobile menu button */}
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
          aria-label={resolvedAriaLabel}
          aria-labelledby={resolvedAriaLabel ? undefined : resolvedAriaLabelledby}
          aria-describedby={resolvedAriaDescribedby}
          role={navRole}
        >
          <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
            {/* Hakkımızda */}
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
              <span className="text-lg" aria-hidden="true">
                👥
              </span>
              Hakkımızda
            </Link>

            {/* Blog */}
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
              <span className="text-lg" aria-hidden="true">
                📝
              </span>
              Blog
            </Link>

            {/* Mobil Hizmetler Akordeon */}
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
  role="region"
  aria-labelledby="mobile-services-button"
  aria-hidden={!mobileServicesOpen}
  data-inert={mobileServicesOpen ? undefined : true}
  className={`
    overflow-hidden transition-all duration-300 ease-in-out
    ${
      mobileServicesOpen
        ? "max-h-[600px] opacity-100 py-2"
        : "max-h-0 opacity-0 py-0"
    }
  `}
>

                <div className="ml-4 rounded-lg border border-neutral-200 bg-white p-2 space-y-1">
                  {SERVICE_LINKS.map(
                    ({ href, label, title, icon, description }) => (
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
                        title={title}
                        aria-current={active(href) ? "page" : undefined}
                      >
                        <span
                          className="text-base opacity-70 mt-0.5 flex-shrink-0"
                          aria-hidden="true"
                        >
                          {icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-neutral-900">
                            {label}
                          </div>
                          <div className="text-xs text-neutral-600 mt-0.5 font-medium">
                            {description}
                          </div>
                        </div>
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* İletişim */}
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
              <span className="text-lg" aria-hidden="true">
                📞
              </span>
              İletişim
            </Link>

            {/* Mobil WhatsApp CTA */}
            <a
              href={`https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=mobile_whatsapp`}
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="WhatsApp Destek — Mobil menüden WhatsApp destek hattını açın (yeni sekmede açılır)"
              className={mobileWhatsappBtnClass}
              onClick={() => setMobileOpen(false)}
            >
              <span aria-hidden="true" className="text-base">
                💬
              </span>
              <span>WhatsApp Destek</span>
              <span className="sr-only">— yeni sekmede açılır</span>
            </a>
          </div>
        </nav>
      </div>

      {/* Mobil Backdrop */}
      <div
        className={`
          lg:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm transition-opacity duration-300
          ${
            mobileOpen
              ? "opacity-100 pointer-events-auto visible"
              : "opacity-0 pointer-events-none invisible"
          }
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