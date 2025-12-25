// components/Navbar.js (Server Component)
// Goal: Keep the ...rt NavbarMobile from "@/components/NavbarMobile.client";
import ServicesDropdownBehavior from "@/components/ServicesDropdownBehavior.client";
import Image from "next/image";
import Link from "next/link";

/* =====================
   Config / Content
===================== */

const FOCUS_RING_CLASS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

const NAVBAR_WHATSAPP_MESSAGE =
  "Merhaba, web sitenizden ulaşıyorum. Sahne, podyum ve LED ekran fiyatları hakkında detaylı teklif almak istiyorum.";

const SERVICE_LINKS = [
  {
    href: "/sahne-kiralama",
    label: "Sahne Kiralama",
    description: "Konser, festival ve etkinlik sahnesi",
    icon: "🎤",
  },
  {
    href: "/podyum-kiralama",
    label: "Podyum Kiralama",
    description: "Modüler podyum ve platform çözümleri",
    icon: "🧱",
  },
  {
    href: "/led-ekran-kiralama",
    label: "LED Ekran Kiralama",
    description: "Indoor/Outdoor LED ekran sistemleri",
    icon: "📺",
  },
  {
    href: "/ses-isik-sistemleri",
    label: "Ses & Işık Sistemleri",
    description: "Profesyonel ses ve ışık tasarımı",
    icon: "🔊",
  },
  {
    href: "/cadir-kiralama",
    label: "Çadır Kiralama",
    description: "Açık hava organizasyon çözümleri",
    icon: "⛺",
  },
  {
    href: "/masa-sandalye-kiralama",
    label: "Masa & Sandalye",
    description: "Davet, düğün ve kurumsal etkinlikler",
    icon: "🪑",
  },
];

const RESEARCH_LINKS = [
  {
    href: "/iletisim",
    label: "İletişim",
    description: "Hızlı teklif ve iletişim kanalları",
    icon: "📞",
  },
  {
    href: "/nasil-calisiyoruz",
    label: "Nasıl Çalışıyoruz",
    description: "Süreç, kurulum ve operasyon akışı",
    icon: "⚙️",
  },
  {
    href: "/bolgesel-kiralama",
    label: "Bölgesel Kiralama",
    description: "Türkiye geneli kurulum ve lojistik",
    icon: "🗺️",
  },
  {
    href: "/sss",
    label: "SSS",
    description: "Sık sorulan sorular ve yanıtlar",
    icon: "❓",
  },
];

/* =====================
   Small UI helpers
===================== */

function DesktopNavLink({ href, children }) {
  return (
    <Link
      href={href}
      prefetch={false}
      className={`px-3 py-2 rounded-xl font-bold text-neutral-900 hover:bg-neutral-100 transition-colors ${FOCUS_RING_CLASS}`}
    >
      {children}
    </Link>
  );
}

export default function Navbar(props) {
  const whatsappHref = `https://wa.me/905453048671?text=${encodeURIComponent(
    NAVBAR_WHATSAPP_MESSAGE
  )}&utm_source=navbar&utm_medium=desktop_whatsapp`;

  return (
    <>
      <nav
        {...props}
        className="fixed top-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-b border-neutral-200/80 shadow-lg"
      >
        {/* Tiny client island: closes the Services <details> on outside click / Esc / link click */}
        <ServicesDropdownBehavior detailsId="nav-services-details" />
        <ServicesDropdownBehavior
          detailsId="nav-research-details"
          panelId="nav-research-panel"
        />

        <div className="mx-auto max-w-7xl px-3 sm:px-4">
          <div className="flex items-center justify-between h-14 lg:h-16">
            {/* Brand */}
            <Link
              href="/"
              aria-label="Sahneva Organizasyon – Ana Sayfa"
              className={`flex items-center gap-2 group ${FOCUS_RING_CLASS}`}
            >
              <Image
                src="/img/logo.webp"
                alt="Sahneva Organizasyon"
                width={160}
                height={40}
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
              <details
                id="nav-services-details"
                className="relative group"
                data-nav-dropdown="true"
              >
                <summary
                  className={`list-none select-none cursor-pointer px-3 py-2 rounded-xl font-bold text-neutral-900 hover:bg-neutral-100 transition-colors ${FOCUS_RING_CLASS}`}
                  aria-controls="nav-services-panel"
                  aria-haspopup="true"
                  aria-expanded="false"
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
                  id="nav-services-panel"
                  data-dropdown-panel
                  role="region"
                  aria-labelledby="nav-services-title"
                  className="hidden group-open:block absolute left-0 top-full mt-2 z-[70] w-[min(720px,92vw)]"
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xl p-4">
                    <div className="px-2 pt-1">
                      <div
                        id="nav-services-title"
                        className="text-base font-extrabold text-neutral-900"
                      >
                        Hizmetler
                      </div>
                      <p className="mt-1 text-xs font-medium text-neutral-600">
                        En çok tercih edilen kiralama kategorileri
                      </p>
                    </div>

                    <div className="mt-3 grid grid-cols-2 gap-2">
                      {SERVICE_LINKS.map((s) => (
                        <Link
                          key={s.href}
                          href={s.href}
                          prefetch={false}
                          className={`group flex items-start gap-3 rounded-xl border border-transparent bg-neutral-50 p-3 hover:bg-white hover:border-blue-200 transition-colors ${FOCUS_RING_CLASS}`}
                        >
                          <span
                            className="mt-0.5 text-lg opacity-80 group-hover:opacity-100"
                            aria-hidden="true"
                          >
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
                          <span
                            className="ml-2 text-neutral-400 group-hover:text-blue-600"
                            aria-hidden="true"
                          >
                            ›
                          </span>
                        </Link>
                      ))}
                    </div>

                    <div className="mt-3 px-2">
                      <Link
                        href="/hizmetler"
                        prefetch={false}
                        className={`inline-flex items-center gap-2 font-extrabold text-blue-700 hover:text-blue-800 ${FOCUS_RING_CLASS}`}
                      >
                        Tümünü gör <span aria-hidden="true">›</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </details>

              {/* Research dropdown (single; after Hizmetler) */}
              <details
                id="nav-research-details"
                className="relative group"
                data-nav-dropdown="true"
              >
                <summary
                  className={`list-none select-none cursor-pointer px-3 py-2 rounded-xl font-bold text-neutral-900 hover:bg-neutral-100 transition-colors ${FOCUS_RING_CLASS}`}
                  aria-controls="nav-research-panel"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <span className="flex items-center gap-2">
                    Bizi Araştırın
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
                  id="nav-research-panel"
                  data-dropdown-panel
                  role="region"
                  aria-labelledby="nav-research-title"
                  className="hidden group-open:block absolute right-0 top-full mt-2 z-[70] w-[min(520px,92vw)]"
                >
                  <div className="rounded-2xl border border-neutral-200 bg-white shadow-2xl p-4">
                    <div className="px-2 pt-1">
                      <div
                        id="nav-research-title"
                        className="text-base font-extrabold text-neutral-900"
                      >
                        Bizi Araştırın
                      </div>
                      <p className="mt-1 text-xs font-medium text-neutral-600">
                        Süreç, iletişim ve bilgi sayfaları
                      </p>
                    </div>

                    <ul className="mt-3 grid gap-2">
                      {RESEARCH_LINKS.map((item) => (
                        <li key={item.href}>
                          <Link
                            href={item.href}
                            prefetch={false}
                            className={`group flex items-start gap-3 rounded-xl border border-transparent bg-neutral-50 p-3 hover:bg-white hover:border-blue-200 transition-colors ${FOCUS_RING_CLASS}`}
                          >
                            <span
                              className="mt-0.5 text-lg opacity-80 group-hover:opacity-100"
                              aria-hidden="true"
                            >
                              {item.icon}
                            </span>
                            <div className="min-w-0 flex-1">
                              <div className="font-extrabold text-neutral-900 group-hover:text-blue-700">
                                {item.label}
                              </div>
                              <div className="mt-0.5 text-xs font-medium text-neutral-600">
                                {item.description}
                              </div>
                            </div>
                            <span
                              className="ml-2 text-neutral-400 group-hover:text-blue-600"
                              aria-hidden="true"
                            >
                              ›
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>

              {/* WhatsApp button */}
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp Destek – yeni sekmede açılır"
                className={`ml-2 inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-white text-sm font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 transition shadow-md hover:shadow-lg ${FOCUS_RING_CLASS}`}
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

      {/*
        NOT: Layout zaten <main className="pt-16 lg:pt-20"> verdiği için burada ekstra spacer kullanmıyoruz.
        Aksi halde sayfa ile navbar arasında çift boşluk oluşur.
      */}
    </>
  );
}
