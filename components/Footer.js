// components/Footer.js
import Link from "next/link";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

// Navbar ile uyumlu focus ring (Offset rengi footer background'a göre ayarlandı)
const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0b1120]";

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
  // İhtiyaç halinde Facebook veya LinkedIn eklenebilir
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

/* --- Yardımcı Bileşen: Standart Footer Link --- */
const FooterLink = ({ href, children, hoverColorClass = "hover:text-blue-400 hover:border-blue-400" }) => (
  <li>
    <Link
      href={href}
      className={`
        group flex items-center py-1 pl-2 border-l-2 border-transparent 
        transition-all duration-200 rounded-sm text-gray-300 
        hover:pl-3 hover:border-current hover:text-white ${hoverColorClass} ${FOCUS_RING_CLASS}
      `}
    >
      <span>{children}</span>
    </Link>
  </li>
);

/* --- Yardımcı Bileşen: Sosyal Medya İkonu --- */
const SocialLink = ({ href, label, title, icon, gradient }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer me"
      aria-label={label}
      title={title}
      className={`
        group relative inline-flex h-11 w-11 items-center justify-center rounded-xl 
        bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 
        hover:border-white/20 transition-all duration-300 hover:scale-110 
        ${FOCUS_RING_CLASS}
      `}
      itemProp="sameAs"
    >
      <span
        className={`
          absolute inset-0 rounded-xl bg-gradient-to-r ${gradient} 
          opacity-0 group-hover:opacity-100 transition-opacity duration-300
        `}
        aria-hidden="true"
      />
      <span aria-hidden="true" className="text-xl relative z-10">
        {icon}
      </span>
    </a>
  </li>
);

export default function Footer() {
  const currentYear = new Date().getFullYear();
  // Safe access for localization
  const footerStrings = LOCALE_CONTENT?.tr?.footer || {
    ariaLabel: "Site altbilgisi",
  };

  return (
    <div id="site-footer-wrapper" className="w-full mt-auto">
      <footer
        id="_main_footer"
        role="contentinfo"
        aria-labelledby="site-footer-heading"
        className="relative w-full flex-shrink-0 bg-gradient-to-br from-[#0b1120] via-[#1a1038] to-[#1b1f4a] border-t border-white/10"
        itemScope
        itemType="https://schema.org/LocalBusiness"
      >
      {/* Üst Dalga (Wave) Efekti */}
      <div
        className="absolute inset-x-0 -top-24 h-24 pointer-events-none w-full overflow-hidden"
        aria-hidden="true"
      >
<img
  src="/footer-wave.svg"
  alt=""
  loading="lazy"
  aria-hidden="true"
  role="presentation"
  className="w-full h-full drop-shadow-[0_-20px_50px_rgba(24,24,72,0.32)]"
/>
      </div>

      {/* Arka plan glow efektleri */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-r from-[#2d2b68]/25 via-[#5a3fa2]/20 to-[#3b6ad6]/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-r from-[#1e2858]/20 via-[#4a3a95]/20 to-[#2f5fbf]/15 rounded-full blur-3xl opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-transparent via-[#121633]/55 to-[#0b1024]/85" />
      </div>

      {/* Başlık (Screen Reader Only) */}
        <h2 id="site-footer-heading" className="sr-only">
          {footerStrings.ariaLabel}
        </h2>

      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-24 pb-14 px-6">
        {/* 1. SÜTUN: Marka & Sosyal */}
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
            <div className="relative flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg shadow-purple-500/20">
              <span className="text-xl" aria-hidden="true">
                ⭐
              </span>
            </div>
            <p
              itemProp="name"
              className="bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent tracking-wide"
            >
              SAHNEVA
            </p>
          </div>

          <p className="text-sm leading-7 text-gray-300 mb-6" itemProp="description">
            <span className="block">
              Profesyonel etkinlik prodüksiyon & ekipman kiralama.
            </span>
            <span className="block">
              <span className="text-blue-300 font-medium">Türkiye geneli</span>{" "}
              sahne, podyum, LED ekran ve ses-ışık sistemleri.
            </span>
          </p>

          <ul className="flex gap-3" aria-label="Sosyal medya hesaplarımız">
            {SOCIAL_LINKS.map((link) => (
              <SocialLink key={link.href} {...link} />
            ))}
          </ul>
        </section>

        {/* 2. SÜTUN: Hizmetler */}
        <nav aria-labelledby="ft-services">
          <h3
            id="ft-services"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent inline-block"
          >
            Hizmetlerimiz
          </h3>
          <ul className="space-y-2 text-sm">
            {SERVICES.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
                hoverColorClass="hover:text-blue-400 hover:border-blue-400"
              >
                {link.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        {/* 3. SÜTUN: Hızlı Erişim */}
        <nav aria-labelledby="ft-quick">
          <h3
            id="ft-quick"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent inline-block"
          >
            Hızlı Erişim
          </h3>
          <ul className="space-y-2 text-sm">
            {QUICK_LINKS.map((link) => (
              <FooterLink
                key={link.href}
                href={link.href}
                hoverColorClass="hover:text-purple-400 hover:border-purple-400"
              >
                {link.label}
              </FooterLink>
            ))}
          </ul>
        </nav>

        {/* 4. SÜTUN: İletişim */}
        <section aria-labelledby="ft-contact">
          <h3
            id="ft-contact"
            className="text-white font-bold mb-6 text-lg bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent inline-block"
          >
            İletişim Bilgileri
          </h3>

          <address
            className="not-italic space-y-5 text-sm"
            itemProp="address"
            itemScope
            itemType="https://schema.org/PostalAddress"
          >
            {/* Adres */}
            <div className="flex items-start gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 text-lg border border-white/5"
                aria-hidden="true"
              >
                📍
              </span>
              <div>
                <span className="block text-white font-medium mb-0.5">
                  Merkez Ofis
                </span>
               <span className="text-slate-800 block" itemProp="addressLocality">
  Kağıthane, İstanbul
</span>


               <span className="text-slate-700 text-xs">
  Türkiye geneli hizmet
</span>


              </div>
            </div>

            {/* Telefon */}
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 text-lg border border-white/5"
                aria-hidden="true"
              >
                📞
              </span>
              <a
                href="tel:+905453048671"
                className={`text-gray-300 hover:text-white font-medium transition-colors ${FOCUS_RING_CLASS}`}
                itemProp="telephone"
              >
                +90 545 304 8671
              </a>
            </div>

            {/* E-posta */}
            <div className="flex items-center gap-3">
              <span
                className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800/80 text-lg border border-white/5"
                aria-hidden="true"
              >
                ✉️
              </span>
              <a
                href="mailto:info@sahneva.com"
                className={`text-gray-300 hover:text-white transition-colors ${FOCUS_RING_CLASS}`}
                itemProp="email"
              >
                info@sahneva.com
              </a>
            </div>

            {/* İşletme Linkleri (Harita vb) */}
            <div className="pt-2 flex flex-col gap-2">
              {BUSINESS_LINKS.map(({ href, label, title, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer nofollow"
                  className={`
                    group inline-flex items-center gap-2 text-xs text-gray-300
                    hover:text-white transition-all duration-300 ${FOCUS_RING_CLASS}
                  `}
                  title={title}
                >
                  <span
                    className="group-hover:scale-110 transition-transform duration-300"
                    aria-hidden="true"
                  >
                    {icon}
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </address>
        </section>
      </div>

      {/* Alt Telif Satırı */}
      <div className="relative border-t border-white/5 text-center text-sm text-gray-300 py-6 bg-black/20 backdrop-blur-md">
        <div className="container mx-auto px-6 relative z-10">
          <p className="mb-3 text-gray-300 max-w-2xl mx-auto">
            Türkiye genelinde profesyonel sahne, podyum, LED ekran,
            ses-ışık sistemleri ve kurulum hizmetleri.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2">
            <span>
              © <span itemProp="copyrightYear">{currentYear}</span>{" "}
              <span itemProp="name" className="text-white font-medium">
                Sahneva
              </span>{" "}
              — Tüm hakları saklıdır.
            </span>
            <span
              className="hidden sm:inline text-white/20"
              aria-hidden="true"
            >
              •
            </span>
            <Link
              href="/kvkk"
              className={`hover:text-white transition-colors underline-offset-4 hover:underline ${FOCUS_RING_CLASS}`}
            >
              KVKK Aydınlatma Metni
            </Link>
            <span
              className="hidden sm:inline text-white/20"
              aria-hidden="true"
            >
              •
            </span>
            <a
              href="#_main_content"
              className={`hover:text-white transition-colors underline-offset-4 hover:underline ${FOCUS_RING_CLASS}`}
            >
              Başa dön
            </a>
          </div>
        </div>
      </div>
      </footer>
    </div>
  );
}
