// components/Footer.js
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

const FOCUS_RING_CLASS =
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 focus-visible:ring-offset-2 focus-visible:ring-offset-[#020617]";

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

const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className={`group flex items-center py-1.5 pl-2 border-l-2 border-transparent text-slate-200
        hover:pl-3 hover:text-white hover:border-sky-400 transition-all duration-200 rounded-sm
        ${FOCUS_RING_CLASS}`}
    >
      <span className="text-sm">{children}</span>
    </Link>
  </li>
);

const SocialLink = ({ href, label, title, icon, gradient, rel }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel={`noopener noreferrer ${rel || ""}`}
      aria-label={`${label} – yeni sekmede açılır`}
      title={title || label}
      className={`group relative inline-flex h-9 w-9 items-center justify-center rounded-xl
        bg-white/5 border border-white/10 backdrop-blur-sm
        hover:border-white/40 hover:scale-110 transition-all duration-300
        ${FOCUS_RING_CLASS}`}
    >
      <span
        className={`absolute inset-0 rounded-xl bg-gradient-to-tr ${gradient}
          opacity-0 group-hover:opacity-100 transition-opacity`}
        aria-hidden="true"
      />
      <span className="relative z-10">{icon}</span>
    </a>
  </li>
);

export default function Footer({
  id = "_main_footer",
  ariaLabel,
  ariaLabelledby,
  ariaDescribedby,
}) {
  const instanceId = useId();
  const year = new Date().getFullYear();

  const footerStrings = LOCALE_CONTENT?.tr?.footer || {
    ariaLabel: "Site altbilgisi",
    description:
      "İletişim bilgileri, hizmet bağlantıları ve sosyal medya hesaplarının bulunduğu altbilgi alanı",
  };

  const headingId =
    ariaLabelledby ?? `site-footer-heading-${instanceId}`;
  const descriptionId =
    ariaDescribedby ?? `site-footer-desc-${instanceId}`;

  return (
    <footer
      id={id}
      aria-labelledby={!ariaLabel ? headingId : undefined}
      aria-label={ariaLabel}
      aria-describedby={descriptionId}
      className="relative overflow-hidden bg-[#020617] border-t border-white/10"
    >
      {/* ARKA PLAN */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-overlay opacity-40" />
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] bg-sky-500/20 blur-[140px] rounded-full" />
        <div className="absolute -bottom-40 right-0 w-[480px] h-[480px] bg-purple-500/25 blur-[160px] rounded-full" />
      </div>

      <h2 id={headingId} className="sr-only">
        {footerStrings.ariaLabel}
      </h2>
      <p id={descriptionId} className="sr-only">
        {footerStrings.description}
      </p>

      {/* ÜST GRID */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-6 py-10">
        {/* Marka */}
        <section className="space-y-4">
          <div className="flex items-center gap-3">
            <Image
              src="/android-chrome-512x512.png"
              alt="Sahneva logo"
              width={48}
              height={48}
              className="rounded-xl"
            />
            <div>
              <p className="text-white font-semibold">Sahneva</p>
              <p className="text-xs text-slate-300">
                Etkinlik Prodüksiyon & Organizasyon
              </p>
            </div>
          </div>
          <p className="text-sm text-slate-200 leading-relaxed">
            Türkiye genelinde sahne, LED ekran, ses-ışık sistemleri ve
            organizasyon çözümleri sunuyoruz.
          </p>
        </section>

        {/* Hizmetler */}
        <nav aria-label="Hizmetler">
          <h3 className="text-white font-bold mb-3">Hizmetler</h3>
          <ul>{SERVICES.map((l) => <FooterLink key={l.href} {...l} />)}</ul>
        </nav>

        {/* Hızlı Erişim */}
        <nav aria-label="Hızlı erişim">
          <h3 className="text-white font-bold mb-3">Hızlı Erişim</h3>
          <ul>{QUICK_LINKS.map((l) => <FooterLink key={l.href} {...l} />)}</ul>
        </nav>

        {/* İletişim */}
        <section aria-label="İletişim">
          <h3 className="text-white font-bold mb-3">İletişim</h3>
          <address className="not-italic space-y-2 text-sm text-slate-200">
            <p>📍 Kağıthane, İstanbul</p>
            <a href="tel:+905453048671" className={FOCUS_RING_CLASS}>
              📞 +90 545 304 8671
            </a>
            <a href="mailto:info@sahneva.com" className={FOCUS_RING_CLASS}>
              ✉️ info@sahneva.com
            </a>
          </address>

          <ul className="flex gap-2 mt-4">
            {SOCIAL_LINKS.map((s) => (
              <SocialLink key={s.href} {...s} />
            ))}
          </ul>
        </section>
      </div>

      {/* ALT BAR */}
      <div className="relative z-10 border-t border-white/10 bg-black/40 backdrop-blur py-4 text-center text-sm text-slate-300">
        © {year} <span className="text-white font-medium">Sahneva</span> — Tüm
        hakları saklıdır.
      </div>
    </footer>
  );
}
