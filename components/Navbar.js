// components/Navbar.js (Server Component)
// Goal: Keep the navbar mostly server-rendered to reduce hydration/TBT.
// Interactivity is isolated to the mobile drawer only.

import Link from "next/link";
import Image from "next/image";
import NavbarMobile from "@/components/NavbarMobile.client";

const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white";

const NAVBAR_WHATSAPP_MESSAGE = encodeURIComponent(
  "Merhaba, Sahneva ile etkinlik ekipmanları için teklif ve destek almak istiyorum.",
);

// Keep the same data so existing text/SEO stays consistent.
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

function DesktopNavLink({ href, children }) {
  return (
    <Link
      href={href}
      className={`relative text-[15px] font-bold transition-all duration-200 px-4 py-2.5 rounded-xl
      text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 border border-transparent hover:border-neutral-200
      ${FOCUS_RING_CLASS}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar(props) {
  const whatsappHref = `https://wa.me/905453048671?text=${NAVBAR_WHATSAPP_MESSAGE}&utm_source=navbar&utm_medium=desktop_whatsapp`;

  return (
    <>
      <nav
        {...props}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200/80 shadow-lg"
      >
        <div className="container">
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
                priority
                decoding="async"
                sizes="(max-width: 768px) 120px, 160px"
                className="h-8 lg:h-10 w-auto transition-transform duration-200 group-hover:scale-105"
                style={{ width: "auto" }}
              />
            </Link>

            {/* Desktop */}
            <div className="hidden lg:flex items-center gap-4">
              <DesktopNavLink href="/hakkimizda">Hakkımızda</DesktopNavLink>
              <DesktopNavLink href="/blog">Blog</DesktopNavLink>

              {/* Services: native <details> => no JS */}
              <details className="relative group">
                <summary
                  className={`list-none cursor-pointer select-none relative text-[15px] font-bold px-4 py-2.5 rounded-xl transition-all duration-200 border
                    text-neutral-800 hover:text-blue-700 hover:bg-neutral-50 border-transparent hover:border-neutral-200
                    ${FOCUS_RING_CLASS}`}
                  aria-haspopup="menu"
                >
                  <span className="flex items-center gap-2">
                    Hizmetler
                    <svg
                      className="w-4 h-4 transition-transform duration-200 group-open:rotate-180"
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
                </summary>

                <div
                  role="menu"
                  aria-label="Hizmetler menüsü"
                  className="absolute left-0 top-full mt-3 w-[min(880px,calc(100vw-2rem))] rounded-3xl border border-neutral-200 bg-white shadow-2xl overflow-hidden"
                >
                  <div className="grid gap-4 p-6 md:grid-cols-2">
                    {SERVICE_LINKS.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className={`group flex items-start gap-3 rounded-xl px-5 py-3.5 text-sm text-neutral-700 hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 border border-transparent hover:border-blue-200 ${FOCUS_RING_CLASS}`}
                        role="menuitem"
                      >
                        <span className="mt-0.5 text-lg opacity-80 group-hover:opacity-100" aria-hidden="true">
                          {s.icon}
                        </span>
                        <div className="min-w-0 flex-1">
                          <div className="font-extrabold text-neutral-900 group-hover:text-blue-700">
                            {s.label}
                          </div>
                          <div className="mt-0.5 text-xs font-medium text-neutral-600">
                            {s.description}
                          </div>
                        </div>
                        <span className="ml-2 text-neutral-400 group-hover:text-blue-600" aria-hidden="true">
                          ›
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </details>

              <DesktopNavLink href="/iletisim">İletişim</DesktopNavLink>

              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Destek – yeni sekmede açılır"
                className={`ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-bold
                  bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700
                  transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105
                  min-h-[44px] border border-green-700/20 ${FOCUS_RING_CLASS}`}
              >
                <span aria-hidden="true" className="text-base">
                  💬
                </span>
                <span>WhatsApp Destek</span>
              </a>
            </div>

            {/* Mobile (small JS island) */}
            <NavbarMobile serviceLinks={SERVICE_LINKS} />
          </div>
        </div>
      </nav>

      {/* Spacer to keep layout stable under fixed nav */}
      <div className="h-16 lg:h-20" aria-hidden="true" />
    </>
  );
}
