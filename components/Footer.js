// components/Footer.js
import Image from "next/image";
import Link from "next/link";
import { useId } from "react";
import { LOCALE_CONTENT } from "@/lib/i18n/localeContent";

/* -------------------------------------------------
   Yeni Tema: FAQ ile Aynı Arka Plan
   bg-[#0B1120] + 32px grid + blue glow
--------------------------------------------------- */

const FOCUS_RING_CLASS =
  "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#0B1120]";

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/sahnevaorganizasyon",
    label: "Instagram",
    title: "Sahneva Instagram hesabı (yeni sekmede açılır)",
    icon: "",
    gradient: "from-pink-500/80 via-red-500/70 to-yellow-500/80",
  },
  {
    href: "https://www.youtube.com/@sahneva",
    label: "YouTube",
    title: "Sahneva YouTube kanalı (yeni sekmede açılır)",
    icon: "",
    gradient: "from-red-500/80 via-rose-500/80 to-orange-500/80",
  },
  {
    href: "https://wa.me/905453048671?text=Merhaba%2C%20Sahne%20ve%20ekipman%20kiralama%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum.",
    label: "WhatsApp",
    title: "WhatsApp ile teklif al (yeni sekmede açılır)",
    icon: "",
    gradient: "from-emerald-500/80 via-green-500/80 to-lime-400/80",
  },
];

const FOOTER_LINK_GROUPS = [
  {
    title: "Hizmetler",
    items: [
      { href: "/podyum-kiralama", label: "Podyum & Sahne Kiralama" },
      { href: "/led-ekran-kiralama", label: "LED Ekran Kiralama" },
      { href: "/ses-isik-sistemleri", label: "Ses & Işık Sistemleri" },
      { href: "/cadir-kiralama", label: "Çadır & Tente Kiralama" },
      { href: "/masa-sandalye-kiralama", label: "Masa & Sandalye Kiralama" },
    ],
  },
  {
    title: "Kurumsal",
    items: [
      { href: "/hakkimizda", label: "Hakkımızda" },
      { href: "/projeler", label: "Tamamlanan Projeler" },
      { href: "/kurumsal-organizasyon", label: "Kurumsal Organizasyon" },
      { href: "/blog", label: "Blog & Rehberler" },
      { href: "/iletisim", label: "İletişim" },
    ],
  },
  {
    title: "Destek & Yasal",
    items: [
      { href: "/sss", label: "Sıkça Sorulan Sorular" },
      { href: "/kvkk-aydinlatma-metni", label: "KVKK Aydınlatma Metni" },
      { href: "/gizlilik-politikasi", label: "Gizlilik Politikası" },
      { href: "/cerez-politikasi", label: "Çerez Politikası" },
    ],
  },
];

const CONTACT_INFO = {
  addressTitle: "Merkez Ofis",
  addressLines: [
    "Hamidiye, Anadolu Cd. 61 a",
    "34400 Kağıthane / İstanbul",
    "Türkiye",
  ],
  phone: "+90 545 304 86 71",
  phoneDisplay: "+90 (545) 304 86 71",
  email: "info@sahneva.com",
  mapUrl:
    "https://www.google.com/maps?q=Hamidiye,+Anadolu+Cd.+61+a,+34400+Ka%C4%9F%C4%B1thane/İstanbul",
};

const FooterLogo = () => (
  <div className="flex items-center gap-3">
    <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-2xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 p-[2px] shadow-lg shadow-indigo-900/40">
      <div className="flex h-full w-full items-center justify-center rounded-2xl bg-slate-950">
        <Image
          src="/img/logo.svg"
          alt="Sahneva Organizasyon logo"
          width={32}
          height={32}
          className="h-7 w-7 md:h-8 md:w-8"
        />
      </div>
    </div>
    <div className="flex flex-col items-start">
      <span className="text-base md:text-lg font-semibold tracking-tight text-white">
        Sahneva
      </span>
      <span className="text-xs md:text-sm text-slate-400">
        Etkinlik Teknolojileri & Organizasyon
      </span>
    </div>
  </div>
);

const FooterLink = ({ href, children }) => (
  <li>
    <Link
      href={href}
      className={`
        inline-flex items-center gap-2 text-sm text-slate-300
        hover:text-white transition-colors duration-150
        ${FOCUS_RING_CLASS}
      `}
    >
      <span className="h-1 w-1 rounded-full bg-slate-500" aria-hidden="true" />
      <span>{children}</span>
    </Link>
  </li>
);

const SocialLink = ({ href, label, title, icon, gradient }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer nofollow"
      aria-label={`${label} (yeni sekmede açılır)`}
      title={title}
      className={`
        group relative inline-flex h-11 w-11 items-center justify-center rounded-2xl
        bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10
        hover:border-white/40 transition-all duration-300 hover:scale-110
        ${FOCUS_RING_CLASS}
      `}
      itemProp="sameAs"
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

export default function Footer({
  ariaLabel,
  ariaLabelledby,
  descriptionId,
  locale = "tr",
}) {
  const currentYear = new Date().getFullYear();
  const fallbackDescriptionId = useId();
  const computedDescriptionId = descriptionId || fallbackDescriptionId;

  const localeContent = LOCALE_CONTENT[locale] || LOCALE_CONTENT.tr;
  const footerStrings = localeContent.footer || {
    ariaLabel: "Sahneva site altbilgi",
    description:
      "Türkiye genelinde etkinlik teknolojileri, sahne ve ekipman kiralama hizmetleri sunuyoruz.",
  };

  const computedHeadingId = useId();

  return (
    <footer
      className="relative bg-[#020617] text-slate-100 border-t border-slate-800/80"
      role="contentinfo"
      aria-label={ariaLabel || footerStrings.ariaLabel}
      aria-labelledby={ariaLabel ? undefined : computedHeadingId}
      aria-describedby={computedDescriptionId}
      itemScope
      itemType="https://schema.org/LocalBusiness"
    >
      {/* Background Layer */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(56,189,248,0.18),transparent_55%),radial-gradient(circle_at_bottom,_rgba(129,140,248,0.22),transparent_60%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px] opacity-50" />
        <div className="absolute inset-x-0 -bottom-32 h-32 bg-gradient-to-t from-black via-black/80 to-transparent" />
      </div>

      {/* Invisible heading for a11y if needed */}
      {!ariaLabel && !ariaLabelledby && (
        <h2 id={computedHeadingId} className="sr-only">
          {footerStrings.ariaLabel}
        </h2>
      )}

      {/* Main Grid */}
      <div className="relative z-10 container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 xl:gap-10 pt-16 pb-14 px-6">
        {/* 1. Sütun — Marka & Kısa Açıklama */}
        <section
          aria-label="Sahneva marka ve kısa açıklama"
          className="space-y-5 max-w-sm"
        >
          <FooterLogo />
          <p
            id={computedDescriptionId}
            className="text-sm text-slate-300 leading-relaxed"
            itemProp="description"
          >
            Sahne, podyum, LED ekran, ses-ışık ve çadır sistemleri ile
            kurumsal etkinlik, lansman, festival ve konserleriniz için uçtan uca
            prodüksiyon çözümleri sunuyoruz.
          </p>

          <ul className="flex items-center gap-3 pt-2" aria-label="Sosyal medya bağlantıları">
            {SOCIAL_LINKS.map((item) => (
              <SocialLink key={item.href} {...item} />
            ))}
          </ul>
        </section>

        {/* 2. Sütun — Hizmetler & Kurumsal Linkler */}
        <section aria-label="Hizmetler ve kurumsal bağlantılar" className="grid grid-cols-1 sm:grid-cols-2 gap-8">
          {FOOTER_LINK_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase mb-4">
                {group.title}
              </h3>
              <ul className="space-y-2.5">
                {group.items.map((item) => (
                  <FooterLink key={item.href} href={item.href}>
                    {item.label}
                  </FooterLink>
                ))}
              </ul>
            </div>
          ))}
        </section>

        {/* 3. Sütun — İletişim Bilgileri */}
        <section aria-label="İletişim ve adres" className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            İletişim
          </h3>
          <div className="space-y-3 text-sm text-slate-300">
            <p className="font-medium text-slate-100" itemProp="name">
              Sahneva Organizasyon
            </p>
            <div itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <p className="text-slate-300" itemProp="streetAddress">
                {CONTACT_INFO.addressLines[0]}
              </p>
              <p className="text-slate-300">
                <span itemProp="postalCode">34400</span>{" "}
                <span itemProp="addressLocality">Kağıthane</span> /{" "}
                <span itemProp="addressRegion">İstanbul</span>
              </p>
              <meta itemProp="addressCountry" content="TR" />
            </div>
            <p>
              <a
                href={`tel:${CONTACT_INFO.phone}`}
                className="hover:text-white transition-colors inline-flex items-center gap-1"
                itemProp="telephone"
              >
                <span className="text-lg" aria-hidden="true">
                  
                </span>
                <span>{CONTACT_INFO.phoneDisplay}</span>
              </a>
            </p>
            <p>
              <a
                href={`mailto:${CONTACT_INFO.email}`}
                className="hover:text-white transition-colors inline-flex items-center gap-1"
                itemProp="email"
              >
                <span className="text-lg" aria-hidden="true">
                  
                </span>
                <span>{CONTACT_INFO.email}</span>
              </a>
            </p>
            <p>
              <a
                href={CONTACT_INFO.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 hover:text-white transition-colors text-xs md:text-sm"
              >
                <span className="text-lg" aria-hidden="true">
                  
                </span>
                <span>Google Haritalar'da Görüntüle</span>
              </a>
            </p>
          </div>
        </section>

        {/* 4. Sütun — Hızlı Aksiyonlar */}
        <section aria-label="Hızlı aksiyon bağlantıları" className="space-y-4">
          <h3 className="text-sm font-semibold tracking-wide text-slate-200 uppercase">
            Hızlı Erişim
          </h3>
          <ul className="space-y-2.5 text-sm text-slate-300">
            <li>
              <Link
                href="/teklif-al"
                className={`inline-flex items-center gap-2 ${FOCUS_RING_CLASS} hover:text-white`}
              >
                <span className="h-1 w-1 rounded-full bg-emerald-400" aria-hidden="true" />
                <span>Hızlı Teklif Formu</span>
              </Link>
            </li>
            <li>
              <Link
                href="/projeler"
                className={`inline-flex items-center gap-2 ${FOCUS_RING_CLASS} hover:text-white`}
              >
                <span className="h-1 w-1 rounded-full bg-sky-400" aria-hidden="true" />
                <span>Tamamlanan Projeler</span>
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className={`inline-flex items-center gap-2 ${FOCUS_RING_CLASS} hover:text-white`}
              >
                <span className="h-1 w-1 rounded-full bg-violet-400" aria-hidden="true" />
                <span>Kurumsal Etkinlik Rehberleri</span>
              </Link>
            </li>
          <li>
  <a
    href="#_main_header" // layout’ta zaten header id="_main_header"
    className={`inline-flex items-center gap-2 ${FOCUS_RING_CLASS} hover:text-white`}
  >
    <span className="h-1 w-1 rounded-full bg-amber-400" aria-hidden="true" />
    <span>Başa dön</span>
  </a>
</li>

          </ul>
        </section>
      </div>

      {/* Telif satırı */}
      <div className="relative border-t border-white/10 text-center text-sm text-gray-300 py-6 bg-black/40 backdrop-blur-md">
        <div className="container mx-auto px-6">
          <p className="mb-3 text-gray-300 max-w-2xl mx-auto">
            Türkiye genelinde profesyonel sahne, podyum, LED ekran, ses-ışık sistemleri ve kurulum hizmetleri.
          </p>
          <p>
            © {currentYear} <span className="text-white font-medium">Sahneva</span> — Tüm hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
}
