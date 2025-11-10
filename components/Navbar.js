// components/Navbar.js
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

const serviceLinks = [
  { 
    href: "/podyum-kiralama", 
    label: "Podyum Kiralama", 
    title: "Modüler podyum kiralama ve kurulum hizmeti - Sahneva", 
    icon: "👑",
    description: "Profesyonel modüler podyum sistemleri"
  },
  { 
    href: "/led-ekran-kiralama", 
    label: "LED Ekran Kiralama", 
    title: "Yüksek çözünürlüklü LED ekran kiralama - Sahneva", 
    icon: "🖥️",
    description: "HD LED ekran ve video wall çözümleri"
  },
  { 
    href: "/ses-isik-sistemleri", 
    label: "Ses & Işık Sistemleri", 
    title: "Profesyonel ses ve ışık sistemi kiralama - Sahneva", 
    icon: "🎭",
    description: "Konser kalitesinde ses ve ışık ekipmanları"
  },
  { 
    href: "/cadir-kiralama", 
    label: "Çadır Kiralama", 
    title: "Etkinlik çadırı kiralama ve kurulum - Sahneva", 
    icon: "⛺",
    description: "Her türlü etkinlik için çadır çözümleri"
  },
  { 
    href: "/masa-sandalye-kiralama", 
    label: "Masa Sandalye Kiralama", 
    title: "Masa sandalye kiralama hizmeti - Sahneva", 
    icon: "🪑",
    description: "Toplantı ve davetler için masa sandalye"
  },
  { 
    href: "/sahne-kiralama", 
    label: "Sahne Kiralama", 
    title: "Profesyonel sahne kiralama ve kurulum - Sahneva", 
    icon: "🎪",
    description: "Portatif ve modüler sahne sistemleri"
  }
];

export default function Navbar() {
  const pathname = usePathname();

  const [scrolled, setScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);

  const dropdownRef = useRef(null);
  const hoverTimer = useRef(null);
  const servicesBtnId = "nav-services-button";
  const servicesMenuId = "nav-services-menu";

  // Partikül efekti (reduced-motion kontrolü ile)
  const burst = useCallback((e, colors = ["#6366f1", "#8b5cf6"]) => {
    try {
      if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
      const x = e?.clientX ?? window.innerWidth / 2;
      const y = e?.clientY ?? 80;
      const n = 6;
      const life = 400;
      const fragment = document.createDocumentFragment();
      for (let i = 0; i < n; i++) {
        const el = document.createElement("span");
        el.className = "burst-particle";
        el.setAttribute("aria-hidden", "true");
        el.setAttribute("role", "presentation");
        const angle = (Math.PI * 2 * i) / n + Math.random() * 0.3;
        const dist = 28 + Math.random() * 24;
        el.style.setProperty("--dx", Math.cos(angle) * dist + "px");
        el.style.setProperty("--dy", Math.sin(angle) * dist + "px");
        el.style.setProperty("--dr", `${(Math.random() * 60 - 30).toFixed(1)}deg`);
        el.style.setProperty("--life", `${life}ms`);
        el.style.setProperty("--burst-c1", colors[0]);
        el.style.setProperty("--burst-c2", colors[1]);
        const s = 4 + Math.random() * 4;
        el.style.width = el.style.height = s + "px";
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        fragment.appendChild(el);
        setTimeout(() => el.parentNode && el.parentNode.removeChild(el), life + 40);
      }
      document.body.appendChild(fragment);
    } catch {}
  }, []);

  // Scroll gölge/blur
  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 8);
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC kapatma
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setServicesOpen(false);
        setMobileServicesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Rota değişince menüleri kapat
  useEffect(() => {
    setMobileOpen(false);
    setServicesOpen(false);
    setMobileServicesOpen(false);
  }, [pathname]);

  // Mobil açıkken body scroll kilidi
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = mobileOpen ? "hidden" : prev || "";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [mobileOpen]);

  // Hizmetler dropdown dış tıklama
  useEffect(() => {
    function onClickOutside(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    }
    if (servicesOpen) document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, [servicesOpen]);

  useEffect(() => () => hoverTimer.current && clearTimeout(hoverTimer.current), []);

  const active = useCallback(
    (href) => pathname === href || (href !== "/" && pathname?.startsWith(href)),
    [pathname]
  );

  const openNow = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    setServicesOpen(true);
  };
  const closeWithDelay = () => {
    if (hoverTimer.current) clearTimeout(hoverTimer.current);
    hoverTimer.current = setTimeout(() => setServicesOpen(false), 150);
  };

  const whatsappBtnClass =
    "ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-h-[44px] border border-green-600/20";

  const mobileWhatsappBtnClass =
    "block text-center mt-4 rounded-xl px-5 py-3 text-white text-sm font-bold bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500/50 focus-visible:ring-offset-2 focus-visible:ring-offset-white min-h-[44px] flex items-center justify-center gap-2 border border-green-600/20";

  // Mobil servis listesi class'ını düzeltilmiş şekilde tanımla
  const mobileServicesListClass = `overflow-hidden transition-all duration-300 ${
    mobileServicesOpen ? "max-h-80 opacity-100 mt-2" : "max-h-0 opacity-0"
  }`;

  return (
    <>
      {/* Skip link – sayfadaki main id'siyle aynı */}{/* Header */}
      <header
        className={
          scrolled || mobileOpen
            ? "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b bg-white/98 backdrop-blur-xl border-neutral-200/70 shadow-xl"
            : "fixed top-0 inset-x-0 z-50 transition-all duration-500 border-b bg-white/90 backdrop-blur-lg border-transparent"
        }
        itemScope
        itemType="https://schema.org/Organization"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 group"
              aria-label="Sahneva - Profesyonel sahne ve etkinlik ekipmanları kiralama"
              title="Sahneva Ana Sayfa - Etkinlik ekipmanları kiralama"
              itemProp="url"
            >
              <Image
                src="/img/logo.png"
                alt="Sahneva Logo - Profesyonel sahne, podyum, LED ekran kiralama"
                width={scrolled ? 140 : 160}
                height={scrolled ? 35 : 40}
                priority={pathname === "/"}
                sizes="(max-width: 768px) 120px, 160px"
                className="transition-all duration-300 h-8 lg:h-10 w-auto"
                itemProp="logo"
              />
            </Link>

            {/* Masaüstü menü */}
            <nav className="hidden lg:flex items-center gap-6" aria-label="Ana menü">
              <Link
                href="/hakkimizda"
                className={
                  active("/hakkimizda")
                    ? "relative text-[15px] font-bold transition-all duration-300 px-4 py-2.5 rounded-xl text-blue-700 bg-blue-50/90 border border-blue-200/60"
                    : "relative text-[15px] font-bold transition-all duration-300 px-4 py-2.5 rounded-xl text-neutral-800 hover:text-blue-700 hover:bg-neutral-50/90 hover:border hover:border-neutral-200/60"
                }
                aria-current={active("/hakkimizda") ? "page" : undefined}
                title="Sahneva Hakkında - Şirket bilgileri ve referanslar"
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
                      ? "relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-300 group border text-blue-700 bg-blue-50/90 border-blue-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                      : "relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-300 group border text-neutral-800 hover:text-blue-700 hover:bg-neutral-50/90 border-transparent hover:border-neutral-200/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50"
                  }
                  aria-haspopup="true"
                  aria-expanded={servicesOpen}
                  aria-controls={servicesMenuId}
                  onClick={() => setServicesOpen((s) => !s)}
                  title="Sahneva Hizmetler - Tüm ekipman kiralama hizmetlerimiz"
                >
                  <span className="flex items-center gap-2">
                    Hizmetler
                    <svg
                      className={`w-4 h-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </span>
                </button>

                {/* Hover kaybında boşluk köprüsü */}
                <span aria-hidden="true" className="absolute left-0 right-0 top-full h-2" onMouseEnter={openNow} />

                <div
                  id={servicesMenuId}
                  role="menu"
                  aria-labelledby={servicesBtnId}
                  hidden={!servicesOpen}
                  className={`absolute left-0 top-full mt-2 w-80 bg-white/95 backdrop-blur-xl border border-neutral-200/60 rounded-xl shadow-lg z-[60] overflow-hidden ${
                    servicesOpen ? "animate-fadeIn" : "pointer-events-none"
                  }`}
                  onMouseEnter={openNow}
                  onMouseLeave={closeWithDelay}
                >
                  <div className="flex flex-col p-2">
                    {serviceLinks.map(({ href, label, title, icon, description }) => (
                      <Link
                        key={href}
                        role="menuitem"
                        href={href}
                        className="group flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-all duration-200 w-full"
                        onClick={() => setServicesOpen(false)}
                        aria-current={active(href) ? "page" : undefined}
                        title={title}
                      >
                        <span className="text-lg opacity-70 group-hover:opacity-100 transition-opacity mt-0.5 flex-shrink-0" aria-hidden="true">
                          {icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-neutral-800 group-hover:text-blue-600">{label}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{description}</div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <Link
                href="/iletisim"
                className={
                  active("/iletisim")
                    ? "relative text-[15px] font-bold transition-all duration-300 px-4 py-2.5 rounded-xl text-blue-700 bg-blue-50/90 border border-blue-200/60"
                    : "relative text-[15px] font-bold transition-all duration-300 px-4 py-2.5 rounded-xl text-neutral-800 hover:text-blue-700 hover:bg-neutral-50/90 hover:border hover:border-neutral-200/60"
                }
                aria-current={active("/iletisim") ? "page" : undefined}
                title="Sahneva İletişim - Bize ulaşın ve teklif alın"
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
                onClick={(e) => burst(e, ["#10b981", "#059669"])}
                title="WhatsApp'tan teklif alın"
              >
                <span aria-hidden="true" className="text-base">💬</span>
                <span>WhatsApp Teklif</span>
                <span className="sr-only"> — yeni sekmede açılır</span>
              </a>
            </nav>

            {/* Mobil menü butonu */}
            <button
              onClick={() => setMobileOpen((s) => !s)}
              className="lg:hidden inline-flex items-center justify-center p-3 rounded-xl bg-white/90 backdrop-blur-sm border border-neutral-200/60 hover:bg-white hover:border-neutral-300 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/50 min-h-[44px] min-w-[44px]"
              aria-label="Menüyü aç veya kapat"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              title="Mobil menü"
            >
              <span className="relative w-6 h-6" aria-hidden="true">
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    mobileOpen ? "rotate-45" : "-translate-y-2"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    mobileOpen ? "opacity-0" : "opacity-100"
                  }`}
                />
                <span
                  className={`absolute top-1/2 left-1/2 w-5 h-0.5 bg-neutral-800 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                    mobileOpen ? "-rotate-45" : "translate-y-2"
                  }`}
                />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobil backdrop */}
      {mobileOpen && (
        <button
          type="button"
          aria-label="Menüyü kapat"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Mobil menü - ŞEFFAFLIK DÜZELTİLDİ */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Mobil menü"
        onClick={(e) => {
          if (e.target === e.currentTarget) setMobileOpen(false);
        }}
        className={
          mobileOpen
            ? "lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200/70 rounded-b-2xl shadow-2xl transition-all duration-500 will-change-transform overflow-hidden max-h-[80vh] opacity-100"
            : "lg:hidden fixed z-50 left-0 right-0 top-16 bg-white border-t border-neutral-200/70 rounded-b-2xl shadow-2xl transition-all duration-500 will-change-transform overflow-hidden max-h-0 opacity-0"
        }
      >
        <div className="px-5 py-6 space-y-3 max-h-[80vh] overflow-y-auto">
          <Link
            href="/hakkimizda"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3.5 px-4 text-neutral-800 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 border border-transparent hover:border-blue-200/60"
            aria-current={active("/hakkimizda") ? "page" : undefined}
            title="Sahneva Hakkında"
          >
            <span className="text-lg" aria-hidden="true">👥</span>
            Hakkımızda
          </Link>

          <div className="py-1">
            <button
              type="button"
              onClick={() => setMobileServicesOpen((s) => !s)}
              aria-expanded={mobileServicesOpen}
              aria-controls="mobile-services-list"
              className="w-full flex items-center justify-between gap-3 py-3.5 px-4 text-[15px] font-bold text-neutral-900 rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 border border-transparent hover:border-blue-200/60 min-h-[44px]"
              title="Sahneva Hizmetler Menüsü"
            >
              <span className="flex items-center gap-3">
                <span className="text-lg" aria-hidden="true">🎯</span>
                <span>Hizmetler</span>
              </span>
              <svg
                className={`w-5 h-5 shrink-0 text-neutral-700 transition-transform duration-300 ${mobileServicesOpen ? "rotate-180" : ""}`}
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
              className={mobileServicesListClass}
            >
              <div className="ml-4 rounded-lg border border-neutral-200/60 bg-white p-2">
                {serviceLinks.map(({ href, label, title, icon, description }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={() => setMobileOpen(false)}
                    className="flex items-start gap-3 px-3 py-2 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-600 rounded-md transition-all duration-200 w-full"
                    aria-current={active(href) ? "page" : undefined}
                    title={title}
                  >
                    <span className="text-base opacity-70 mt-0.5 flex-shrink-0" aria-hidden="true">{icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-neutral-800">{label}</div>
                      <div className="text-xs text-neutral-500 mt-0.5">{description}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/iletisim"
            onClick={() => setMobileOpen(false)}
            className="flex items-center gap-3 py-3.5 px-4 text-neutral-800 font-bold text-[15px] rounded-xl hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 border border-transparent hover:border-blue-200/60"
            aria-current={active("/iletisim") ? "page" : undefined}
            title="Sahneva İletişim"
          >
            <span className="text-lg" aria-hidden="true">📞</span>
            İletişim
          </Link>

          {/* Mobil WhatsApp CTA */}
          <a
            href="https://wa.me/905453048671?text=Merhaba%2C+sahne+ve+etkinlik+ekipmanları+için+teklif+almak+istiyorum."
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp Teklif — yeni sekmede açılır"
            className={mobileWhatsappBtnClass}
            onClick={(e) => {
              burst(e, ["#10b981", "#059669"]);
              setMobileOpen(false);
            }}
            title="WhatsApp'tan teklif alın"
          >
            <span aria-hidden="true" className="text-base">💬</span>
            <span>WhatsApp Teklif</span>
            <span className="sr-only"> — yeni sekmede açılır</span>
          </a>
        </div>
      </div>

      {/* Burst particle CSS */}
      <style jsx>{`
        .burst-particle {
          position: fixed;
          pointer-events: none;
          z-index: 9999;
          background: linear-gradient(135deg, var(--burst-c1), var(--burst-c2));
          border-radius: 50%;
          animation: burst-animation var(--life) ease-out forwards;
        }
        @keyframes burst-animation {
          0% { transform: translate(0, 0) rotate(0deg); opacity: 1; }
          100% { transform: translate(var(--dx), var(--dy)) rotate(var(--dr)); opacity: 0; }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.3s ease-out; }
      `}</style>
    </>
  );
}
