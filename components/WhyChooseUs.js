// components/WhyChooseUs.js
"use client";

import { useMemo } from "react";

const slugify = (s) =>
  String(s || "")
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const BIG_CARDS = [
  {
    icon: "🚀",
    title: "Uçtan Uca Teknik Hizmet ve Profesyonel Çözümler",
    desc:
      "Sahneva olarak Türkiye genelinde sahne, podyum, LED ekran ve ses ışık sistemleri alanlarında komple teknik çözümler sunuyoruz.",
    bullets: [
      "IP65 dış mekân LED paneller, 4500+ nit parlaklık",
      "Profesyonel line-array ses sistemleri, dijital miksaj altyapısı",
      "Modüler podyum ve sahne platformları, truss kiralama çözümleri",
      "DMX kontrollü ışık sistemleri ve ambiyans aydınlatma",
    ],
    accent: "text-sky-400",
  },
  {
    icon: "🎤",
    title: "Büyük Ölçekli Etkinlikler İçin Güçlü Altyapı",
    desc:
      "Konser, miting, festival, fuar ve açık hava etkinlikleri için yüksek kapasiteli ekipman altyapımızla hizmet veriyoruz.",
    bullets: [
      "100 m²+ LED ekran kurulumu (P3.9 outdoor, P2.6 indoor)",
      "Line-array ses sistemleri (JBL, RCF, dB vb.)",
      "Truss kule sistemleri ve roof sahne çözümleri",
      "Jeneratör, UPS ve yedekli enerji altyapısı",
    ],
    accent: "text-fuchsia-400",
  },
];

const FEATURES = [
  {
    title: "Yüksek Müşteri Memnuniyeti",
    desc:
      "%98'in üzerinde müşteri memnuniyeti. Referanslar ve yorumlar en güçlü göstergemiz.",
    stat: "%98 Memnuniyet",
  },
  {
    title: "Hızlı Kurulum ve Teslimat",
    desc:
      "Sahne, LED ekran ve ses-ışık kurulumlarında aynı gün içinde profesyonel montaj.",
    stat: "2–6 Saat",
  },
  {
    title: "Premium LED Teknolojisi",
    desc: "P2–P6 indoor/outdoor LED ekranlarla yüksek parlaklık ve netlik.",
    stat: "P2–P6",
  },
  {
    title: "Uzman Teknik Ekip",
    desc: "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanları.",
    stat: "15+ Uzman",
  },
  {
    title: "Rekabetçi Fiyat Garantisi",
    desc: "Şeffaf, öngörülebilir ve bütçe dostu fiyatlandırma.",
    stat: "%30 Tasarruf",
  },
  {
    title: "Türkiye Geneli Hizmet",
    desc: "İstanbul merkezli ekibimizle 81 ilde kurulum ve destek.",
    stat: "81 İl",
  },
];

const DEFAULT_DICTIONARY = {
  sectionPill: "Avantajlarımız",
  sectionTitlePrefix: "Neden",
  sectionTitleHighlight: "Sahneva",
  sectionTitleSuffix: "'yı Tercih Etmelisiniz?",
  sectionDesc:
    "10+ yıllık deneyim, modern ekipmanlar ve uzman ekibimizle etkinliğinizin her detayı için yanınızdayız.",
};

export default function WhyChooseUs({ dictionary: dictionaryOverride }) {
  const dictionary = useMemo(
    () => ({ ...DEFAULT_DICTIONARY, ...dictionaryOverride }),
    [dictionaryOverride]
  );

  return (
    <section
      aria-labelledby="why-choose-title"
      className="relative bg-[#0B1120] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <header className="max-w-4xl mb-16">
          <p className="text-xs uppercase tracking-[0.22em] text-slate-200">
            {dictionary.sectionPill}
          </p>

          <h2
            id="why-choose-title"
            className="mt-3 text-3xl md:text-4xl lg:text-5xl font-bold text-white"
          >
            {dictionary.sectionTitlePrefix}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-300">
              {dictionary.sectionTitleHighlight}
            </span>
            {dictionary.sectionTitleSuffix}
          </h2>

          <p className="mt-5 text-slate-200 text-base md:text-lg leading-relaxed">
            {dictionary.sectionDesc}
          </p>
        </header>

        {/* BIG CARDS SECTION (semantic + SR label) */}
        <section
          aria-label="Sahneva Altyapı Avantajları"
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14"
        >
          {BIG_CARDS.map((card) => {
            const headingId = `why-big-${slugify(card.title)}`;

            return (
              <article
                key={card.title}
                aria-labelledby={headingId}
                className="rounded-3xl bg-white/5 border border-white/10 p-6 md:p-8"
              >
                <div className="flex items-start gap-3">
                  <span className="text-3xl" aria-hidden="true">
                    {card.icon}
                  </span>

                  <h3
                    id={headingId}
                    className="text-xl md:text-2xl font-bold text-white"
                  >
                    {card.title}
                  </h3>
                </div>

                <p className="mt-4 text-slate-200 text-sm md:text-base leading-relaxed">
                  {card.desc}
                </p>

                <ul className="mt-5 space-y-2 text-slate-100 text-sm leading-relaxed">
                  {card.bullets.map((item, i) => (
                    <li key={i} className="flex gap-2">
                      <span
                        className={`mt-[3px] ${card.accent}`}
                        aria-hidden="true"
                      >
                        •
                      </span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </section>

        {/* SMALL FEATURES */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => {
            const id = `why-feature-${slugify(f.title)}`;
            return (
              <li key={f.title}>
                <article
                  aria-labelledby={id}
                  className="rounded-2xl bg-slate-900/70 border border-white/10 p-6"
                >
                  <span className="inline-block text-xs px-3 py-1 rounded-full bg-white/10 text-slate-200">
                    {f.stat}
                  </span>

                  <h4 id={id} className="mt-3 text-lg font-semibold text-white">
                    {f.title}
                  </h4>

                  <p className="mt-2 text-slate-200 text-sm leading-relaxed">
                    {f.desc}
                  </p>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}