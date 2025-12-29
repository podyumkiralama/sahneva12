// components/Footer.js
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

// Navbar ile uyumlu focus ring (Offset rengi footer background'a göre ayarlandı)
const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#020617]";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/sahnevaorganizasyon",
    label: "Sahneva Instagram hesabı",
    title: "Instagram",
    icon: "📷",
    gradient: "from-blue-500/30 via-purple-500/30 to-pink-500/20",
    rel: "me",
  },
  {
    href: "https://www.youtube.com/@sahneva",
    label: "Sahneva YouTube kanalı",
    title: "YouTube",
    icon: "▶",
    gradient: "from-red-500/30 via-orange-400/30 to-yellow-400/20",
  },
];

const SERVICES = [
  { href: "/podyum-kiralama", label: "Podyum Kiralama" },
  { href: "/led-ekran-kiralama", label: "LED Ekran Kiralama" },
  { href: "/ses-isik-sistemleri", label: "Ses Işık Sistemleri" },
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
    icon: "📍",
  },
  {
    href: "https://g.page/r/CZhkMzkNOdgnEBI/review",
    label: "Google'da yorum yazın",
    icon: "⭐",
  },
];

/* --- Yardımcı Bileşen: Standart Footer Link --- */
const FooterLink = ({
  href,
  children,
  hoverColorClass = "hover:text-blue-400 hover:border-blue-400",
}) => (
  <li>
    <Link
      href={href}
      className={`
        group flex items-center py-1.5 pl-2 border-l-2 border-transparent
        transition-all duration-200 rounded-sm text-gray-300
        hover:pl-3 hover:text-white ${hoverColorClass} ${FOCUS_RING_CLASS}
      `}
    >
      <span className="text-sm leading-relaxed">{children}</span>
    </Link>
  </li>
);

/* --- Yardımcı Bileşen: Sosyal Medya İkonu --- */
const SocialLink = ({
  href,
  label,
  title,
  icon,
  gradient,
  rel,
  sizeClass = "h-11 w-11",
}) => {
  const relValue = rel ? `noopener noreferrer ${rel}` : "noopener noreferrer";

  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel={relValue}
        aria-label={`${label} – yeni sekmede açılır`}
        title={title || label}
        className={`
          group relative inline-flex ${sizeClass} items-center justify-center rounded-2xl
          bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
          hover:border-white/40 transition-all duration-300 hover:scale-110
          ${FOCUS_RING_CLASS}
        `}
      >
        <span
          className={`
            absolute inset-0 rounded-2xl bg-gradient-to-tr ${gradient}
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
};

export default function Footer({
  id = "_main_footer",
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
  role: roleOverride,
  descriptionId: descriptionIdProp,
  headingId: headingIdProp,
}) {
  const instanceId = useId();
  const currentYear = new Date().getFullYear();

  const footerStrings = LOCALE_CONTENT?.tr?.footer || {
    ariaLabel: "Site altbilgisi",
    description:
      "İletişim bilgileri, hizmet bağlantıları ve sosyal medya hesaplarının bulunduğu altbilgi alanı",
  };

  const computedHeadingId =
    ariaLabelledby ?? headingIdProp ?? `site-footer-heading-${instanceId}`;
  const computedDescriptionId =
    ariaDescribedby ?? descriptionIdProp ?? `site-footer-desc-${instanceId}`;

  const ariaLabelledbyValue = ariaLabel ? undefined : computedHeadingId;
  const footerDescription = footerStrings.description;

  return (
    <footer
      id={id}
      className="
        relative w-full flex-shrink-0
        bg-gradient-to-br from-[#020617] via-[#0B1120] to-[#020617]
        border-t border-white/10
        overflow-hidden
      "
      aria-labelledby={ariaLabelledbyValue}
      aria-label={ariaLabel}
      aria-describedby={computedDescriptionId}
      role={roleOverride}
      tabIndex={-1}
    >
      {/* Dekoratif arka plan efektleri */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-60">
          <div
            className="grid-overlay"
            style={{
              "--grid-overlay-top": "#1d4ed833",
              "--grid-overlay-bottom": "#7c3aed33",
              "--grid-overlay-opacity": "0.4",
              "--grid-overlay-blur": "32px",
            }}
          />
        </div>

        {/* Glow orbs */}
        <div className="absolute -top-32 -left-16 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full" />
        <div className="absolute -bottom-40 right-0 w-96 h-96 bg-purple-500/25 blur-3xl rounded-full" />

        {/* ekstra hafif vignette (kontrastı bozmadan derinlik) */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/25" />
      </div>

      {/* Görünmez ana başlık (SR için) */}
      {!ariaLabel && !ariaLabelledby && (
        <h2 id={computedHeadingId} className="sr-only">
          {footerStrings.ariaLabel}
        </h2>
      )}

      {/* SR-only açıklama: id TEK YERDE kullanılmalı */}
      {footerDescription ? (
        <p id={computedDescriptionId} className="sr-only">
          {footerDescription}
        </p>
      ) : null}

      {/* Üst grid */}
      <div
        className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 items-start gap-6 xl:gap-8 pt-8 pb-8 md:pt-10 md:pb-10 px-6"
        aria-label="Altbilgi: hizmetler, hızlı erişim ve iletişim"
      >
        {/* 1. SÜTUN: Marka & Sosyal */}
        <section aria-labelledby="ft-brand" className="lg:col-span-1">
          <div
            className="
              rounded-3xl border border-white/10 bg-white/5
              bg-gradient-to-br from-white/5 via-white/0 to-white/0
              backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.8)]
              p-4 md:p-4 flex flex-col gap-4
            "
          >
            <h3 id="ft-brand" className="sr-only">
              Sahneva Hakkında
            </h3>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src="/android-chrome-512x512.png"
                  alt="Sahneva logo"
                  width={48}
                  height={48}
                  className="w-12 h-12 object-contain rounded-2xl"
                />
                <span
                  className="
                    pointer-events-none absolute -bottom-1 -right-1 w-4 h-4 rounded-full
                    bg-emerald-400/80 blur-[3px]
                  "
                  aria-hidden="true"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-white">Sahneva</p>
                <p className="text-xs text-slate-300 leading-relaxed">
                  Profesyonel etkinlik prodüksiyon ve organizasyon firması hizmetleri.
                </p>
              </div>
            </div>

            <p className="text-sm leading-relaxed text-gray-300 max-w-prose">
              <span className="block">
                Türkiye genelinde{" "}
                <span className="text-blue-300 font-semibold">
                  sahne kiralama, podyum kiralama, LED ekran kiralama
                </span>
                , ses ışık sistemleri ve truss kiralama ile tam kapasiteli kurulum.
              </span>
              <span className="block mt-1 text-slate-300/90 leading-relaxed">
                Festival, fuar, konser, kurumsal etkinlik ve mezuniyet organizasyonlarında çadır
                kiralama ile masa sandalye kiralama çözümlerinde yanınızdayız.
              </span>
            </p>
          </div>
        </section>

        {/* 2. SÜTUN: Hizmetler */}
        <nav aria-labelledby="ft-services" className="lg:col-span-1">
          <div
            className="
              rounded-3xl border border-white/10 bg-white/5
              bg-gradient-to-br from-blue-600/10 via-slate-900/40 to-slate-900/60
              backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.85)]
              p-4 md:p-4
            "
          >
            <h3
              id="ft-services"
              className="
                text-white font-bold mb-4 text-lg
                gradient-text gradient-text--safe-xl
              "
            >
              Hizmetlerimiz
            </h3>
            <ul className="space-y-0.5 text-sm text-gray-300">
              {SERVICES.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  hoverColorClass="hover:text-blue-300 hover:border-blue-400"
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </nav>

        {/* 3. SÜTUN: Hızlı Erişim */}
        <nav aria-labelledby="ft-quick" className="lg:col-span-1">
          <div
            className="
              rounded-3xl border border-white/10 bg-white/5
              bg-gradient-to-br from-purple-600/15 via-slate-900/40 to-slate-900/60
              backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.85)]
              p-4 md:p-4
            "
          >
            <h3
              id="ft-quick"
              className="
                text-white font-bold mb-4 text-lg
                gradient-text gradient-text--safe-xl
              "
            >
              Hızlı Erişim
            </h3>
            <ul className="space-y-0.5 text-sm text-gray-300">
              {QUICK_LINKS.map((link) => (
                <FooterLink
                  key={link.href}
                  href={link.href}
                  hoverColorClass="hover:text-purple-300 hover:border-purple-400"
                >
                  {link.label}
                </FooterLink>
              ))}
            </ul>
          </div>
        </nav>

        {/* 4. SÜTUN: İletişim */}
        <section aria-labelledby="ft-contact" className="lg:col-span-1">
          <div
            className="
              rounded-3xl border border-white/10 bg-white/5
              bg-gradient-to-br from-cyan-500/15 via-slate-900/40 to-slate-900/60
              backdrop-blur-xl shadow-[0_18px_45px_rgba(15,23,42,0.85)]
              p-4 md:p-4
            "
          >
            <h3
              id="ft-contact"
              className="
                text-white font-bold mb-4 text-lg
                gradient-text gradient-text--safe-xl
              "
            >
              İletişim Bilgileri
            </h3>

            <address className="not-italic space-y-3 text-sm text-gray-300">
              {/* Adres */}
              <div className="flex items-start gap-3">
                <span
                  className="
                    flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl
                    bg-slate-900/80 text-lg border border-white/10 shadow-sm
                  "
                  aria-hidden="true"
                >
                  📍
                </span>
                <div>
                  <span className="block text-white font-medium mb-0.5">Merkez Ofis</span>
                  <span className="block text-gray-200">Kağıthane, İstanbul</span>
                  <span className="block text-gray-100 text-xs mt-0.5">Türkiye geneli hizmet</span>
                </div>
              </div>

              {/* Telefon */}
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl
                    bg-slate-900/80 text-lg border border-white/10 shadow-sm
                  "
                  aria-hidden="true"
                >
                  📞
                </span>
                <a
                  href="tel:+905453048671"
                  className={`text-gray-200 hover:text-white font-medium transition-colors ${FOCUS_RING_CLASS}`}
                >
                  +90 545 304 8671
                </a>
              </div>

              {/* E-posta */}
              <div className="flex items-center gap-3">
                <span
                  className="
                    flex-shrink-0 flex items-center justify-center w-9 h-9 rounded-xl
                    bg-slate-900/80 text-lg border border-white/10 shadow-sm
                  "
                  aria-hidden="true"
                >
                  ✉️
                </span>
                <a
                  href="mailto:info@sahneva.com"
                  className={`text-gray-200 hover:text-white transition-colors ${FOCUS_RING_CLASS}`}
                >
                  info@sahneva.com
                </a>
              </div>
            </address>

            <nav className="pt-2 flex flex-col gap-2" aria-label="İşletme bağlantıları">
              {BUSINESS_LINKS.map(({ href, label, icon }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`
                    group inline-flex items-center gap-2 text-xs text-gray-300
                    hover:text-white transition-all duration-300 ${FOCUS_RING_CLASS}
                  `}
                  aria-label={`${label} – yeni sekmede açılır`}
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
            </nav>

            <nav className="border-t border-white/10 pt-3" aria-label="Sosyal medya">
              <p className="text-xs font-medium text-slate-400 mb-2">Sosyal medya hesaplarımız</p>
              <ul className="flex gap-2">
                {SOCIAL_LINKS.map((link) => (
                  <SocialLink key={link.href} sizeClass="h-9 w-9" {...link} />
                ))}
              </ul>
            </nav>
          </div>
        </section>
      </div>

      {/* Alt Telif Satırı */}
      <div className="relative border-t border-white/10 text-center py-5 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6 relative z-10">
          {/* İSTEDİĞİN AYAR: text-[13px] + text-gray-400 */}
          <p className="mb-2 text-[13px] text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Türkiye genelinde profesyonel sahne kiralama, podyum kiralama, LED ekran kiralama, ses
            ışık sistemleri, çadır kiralama ve masa sandalye kiralama hizmetleri.
          </p>

          <p className="mb-3 text-sm text-gray-300">
            © <span>{currentYear}</span>{" "}
            <span className="text-white font-medium">Sahneva</span> — Tüm hakları saklıdır.
          </p>

          <nav
            aria-label="Altbilgi bağlantıları"
            className="flex flex-wrap justify-center items-center gap-x-4 gap-y-2 text-sm text-gray-300"
          >
            <Link
              href="/kvkk"
              className={`
                hover:text-white transition-colors underline underline-offset-4
                ${FOCUS_RING_CLASS}
              `}
            >
              KVKK Aydınlatma Metni
            </Link>
            <span className="hidden sm:inline text-white/30" aria-hidden="true">
              •
            </span>
            <a
              href="#_main_content"
              className={`
                hover:text-white transition-colors underline underline-offset-4
                ${FOCUS_RING_CLASS}
              `}
            >
              Başa dön
            </a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
