// components/Footer.js
import Link from "next/link";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/sahnevaorganizasyon",
    label: "Instagram: Sahneva Organizasyon (yeni sekmede açılır)",
    title: "Instagram",
    icon: "📷",
    gradient: "from-blue-500/20 to-purple-500/20",
  },
  {
    href: "https://www.youtube.com/@sahneva",
    label: "YouTube: Sahneva (yeni sekmede açılır)",
    title: "YouTube",
    icon: "▶",
    gradient: "from-purple-500/20 to-cyan-500/20",
  },
];

const SERVICES = [
  { href: "/podyum-kiralama", label: "Podyum Kiralama" },
  { href: "/led-ekran-kiralama", label: "LED Ekran Kiralama" },
  { href: "/ses-isik-sistemleri", label: "Ses & Işık Sistemleri" },
  { href: "/sahne-kiralama", label: "Sahne Kiralama" },
  { href: "/cadir-kiralama", label: "Çadır Kiralama" },
];

const QUICK_LINKS = [
  { href: "/hakkimizda", label: "Hakkımızda" },
  { href: "/hizmetler", label: "Hizmetler" },
  { href: "/sss", label: "Sık Sorulan Sorular" },
  { href: "/kvkk", label: "KVKK / Gizlilik" },
];

const BUSINESS_LINKS = [
  {
    href: "https://g.page/r/CZhkMzkNOdgnEBI",
    label: "Google Haritalar'da bizi bulun",
    title: "Google Haritalar (yeni sekme)",
    icon: "📍",
  },
  {
    href: "https://g.page/r/CZhkMzkNOdgnEBI/review",
    label: "Google'da yorum yazın",
    title: "Google Yorum (yeni sekme)",
    icon: "⭐",
  },
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/80 to-blue-900 border-t border-white/10"
      role="contentinfo"
      aria-labelledby="site-footer-heading"
      itemScope
      itemType="https://schema.org/Organization"
    >
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-black/20 to-black/60" />
      </div>

      <h2 id="site-footer-heading" className="sr-only">
        Site altbilgisi
      </h2>

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 px-6">
        {/* Marka */}
        <section
          aria-labelledby="ft-brand"
          itemProp="brand"
          itemScope
          itemType="https://schema.org/Brand"
        >
          <h3 id="ft-brand" className="sr-only">
            Sahneva Hakkında
          </h3>

          <div className="flex items-center gap-3 text-white font-bold text-2xl mb-6">
            <div className="relative" aria-hidden="true">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-75" />
              <span className="relative bg-gradient-to-r from-blue-500 to-purple-500 text-white p-2 rounded-lg" aria-hidden="true">
                ⭐
              </span>
            </div>
            <span
              itemProp="name"
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent"
            >
              SAHNEVA
            </span>
          </div>

          <p className="text-sm leading-6 text-gray-300 mb-6" itemProp="description">
            <span className="block">Profesyonel etkinlik prodüksiyon & ekipman kiralama.</span>
            <span className="block">
              <span className="text-blue-300 font-medium">Türkiye geneli</span> sahne, podyum, LED ekran ve ses-ışık sistemleri.
            </span>
          </p>

          <ul className="flex gap-3" aria-label="Sahneva sosyal bağlantılar">
            {SOCIAL_LINKS.map(({ href, label, title, icon, gradient }) => (
              <li key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  aria-label={label}
                  title={title}
                  className="group relative inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 min-h-[44px] min-w-[44px]"
                  itemProp="sameAs"
                >
                  <span
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                    aria-hidden="true"
                  />
                  <span aria-hidden="true" className="text-lg relative z-10">
                    {icon}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* Hizmetler */}
        <nav aria-labelledby="ft-services">
          <h3
            id="ft-services"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent"
          >
            Hizmetlerimiz
          </h3>
          <ul className="space-y-3 text-sm">
            {SERVICES.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group text-gray-300 hover:text-white focus-visible:text-white transition-all duration-200 block py-1 pl-2 border-l-2 border-transparent hover:border-blue-400 hover:pl-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-sm"
                >
                  <span className="group-hover:text-blue-300 transition-colors">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Hızlı Erişim */}
        <nav aria-labelledby="ft-quick">
          <h3
            id="ft-quick"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"
          >
            Hızlı Erişim
          </h3>
          <ul className="space-y-3 text-sm">
            {QUICK_LINKS.map(({ href, label }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group text-gray-300 hover:text-white focus-visible:text-white transition-all duration-200 block py-1 pl-2 border-l-2 border-transparent hover:border-purple-400 hover:pl-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/60 rounded-sm"
                >
                  <span className="group-hover:text-purple-300 transition-colors">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* İletişim */}
        <section aria-labelledby="ft-contact">
          <h3
            id="ft-contact"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent"
          >
            İletişim Bilgileri
          </h3>

          <address className="not-italic space-y-4 text-sm" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
            <div className="flex items-start gap-3">
              <div className="relative" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg blur-sm opacity-50" />
                <span className="relative text-white text-base p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm" aria-hidden="true">
                  📍
                </span>
              </div>
              <div>
                <span className="block text-white font-semibold" itemProp="addressLocality">
                  İstanbul
                </span>
                <span className="text-gray-300">Türkiye geneli hizmet</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg blur-sm opacity-50" />
                <span className="relative text-white text-base p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm" aria-hidden="true">
                  📞
                </span>
              </div>
              <a
                href="tel:+905453048671"
                className="text-gray-300 hover:text-white font-semibold transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 rounded-sm"
                itemProp="telephone"
              >
                +90 545 304 8671
              </a>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative" aria-hidden="true">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur-sm opacity-50" />
                <span className="relative text-white text-base p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm" aria-hidden="true">
                  ✉️
                </span>
              </div>
              <a
                href="mailto:info@sahneva.com"
                className="text-gray-300 hover:text-white transition-all duration-300 hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-fuchsia-400/60 rounded-sm"
                itemProp="email"
              >
                info@sahneva.com
              </a>
            </div>

            {BUSINESS_LINKS.map(({ href, label, title, icon }) => (
              <div className="flex items-center gap-3" key={href}>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className="group inline-flex items-center gap-2 text-xs text-gray-300 hover:text-white transition-all duration-300 hover:gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-sm"
                  title={title}
                >
                  <span className="group-hover:scale-110 transition-transform duration-300" aria-hidden="true">
                    {icon}
                  </span>
                  {label}
                </a>
              </div>
            ))}
          </address>
        </section>
      </div>

      <div className="relative border-t border-white/10 text-center text-sm text-gray-300 py-6 bg-gradient-to-r from-slate-900/50 via-purple-900/30 to-blue-900/50 backdrop-blur-sm">
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" aria-hidden="true" />
        <div className="container mx-auto px-6 relative z-10">
          <p className="mb-3 text-gray-400">
            <span className="block">
              Türkiye genelinde profesyonel sahne, podyum, LED ekran, ses-ışık sistemleri ve kurulum hizmetleri.
            </span>
          </p>

          <meta itemProp="copyrightYear" content={String(currentYear)} />
          <p className="text-gray-400">
            © {currentYear}{" "}
            <span itemProp="name" className="text-white font-semibold">
              Sahneva
            </span>{" "}
            — Tüm hakları saklıdır.
            <span className="mx-3 text-blue-400" aria-hidden="true">
              •
            </span>
            <Link
              href="/kvkk"
              className="text-gray-300 hover:text-white underline-offset-4 hover:underline focus-visible:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400/60 rounded-sm"
            >
              KVKK Aydınlatma Metni
            </Link>
            <span className="mx-3 text-blue-400" aria-hidden="true">
              •
            </span>
            <a
              href="#main-content"
              className="text-gray-300 hover:text-white underline-offset-4 hover:underline focus-visible:underline transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/60 rounded-sm"
            >
              Başa dön
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
