// components/WhyChooseUs.js
"use client";

// —————————————————————————————————————————
// SVG İKONLAR
// —————————————————————————————————————————

const IconWrap = ({ children }) => (
  <div
    className="inline-flex items-center justify-center w-12 h-12 rounded-2xl
               bg-slate-950/80 ring-1 ring-white/10
               shadow-[0_0_30px_rgba(15,23,42,0.9)]"
    aria-hidden="true"
  >
    {children}
  </div>
);

const CheckStarIcon = () => (
  <svg
    className="w-6 h-6 text-amber-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path
      d="M12 3.5l2.47 4.8 5.3.8-3.83 3.73.9 5.3L12 15.98l-4.84 2.12.9-5.3L4.64 9.1l5.3-.8L12 3.5z"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M9 12l2 2.2L15 10" strokeLinecap="round" />
  </svg>
);

const BoltIcon = () => (
  <svg
    className="w-6 h-6 text-cyan-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

const DisplayIcon = () => (
  <svg
    className="w-6 h-6 text-fuchsia-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <rect x="3" y="5" width="18" height="12" rx="2" />
    <path d="M8 21h8" />
  </svg>
);

const UsersIcon = () => (
  <svg
    className="w-6 h-6 text-emerald-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <circle cx="9" cy="8.5" r="3" />
    <circle cx="17" cy="9" r="2.5" />
    <path d="M4.5 19a4.5 4.5 0 0 1 9 0" />
    <path d="M14.5 17.5c.6-1.2 1.7-2 3-2 1.8 0 3.5 1.3 3.5 3.5" />
  </svg>
);

const PriceIcon = () => (
  <svg
    className="w-6 h-6 text-amber-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <circle cx="12" cy="12" r="7.5" />
    <path d="M10 8h3a2 2 0 1 1 0 4h-3v4" />
  </svg>
);

const GlobeIcon = () => (
  <svg
    className="w-6 h-6 text-indigo-300"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
  >
    <circle cx="12" cy="12" r="7.5" />
    <path d="M5 12h14M12 4.5c2.5 3 2.5 11 0 15" />
  </svg>
);

// —————————————————————————————————————————
// VERİ
// —————————————————————————————————————————

const FEATURES = [
  {
    icon: <CheckStarIcon />,
    title: "Yüksek Müşteri Memnuniyeti",
    stat: "%98",
    desc:
      "%98’in üzerinde müşteri memnuniyeti ve güçlü referans ağı ile güvenilir hizmet sunuyoruz.",
    glow: "from-amber-400/30",
  },
  {
    icon: <BoltIcon />,
    title: "Hızlı Kurulum",
    stat: "2–6 Saat",
    desc:
      "Sahne, LED ekran ve ses-ışık sistemlerini aynı gün içinde eksiksiz kuruyoruz.",
    glow: "from-cyan-400/30",
  },
  {
    icon: <DisplayIcon />,
    title: "Premium LED Teknolojisi",
    stat: "P2–P6",
    desc:
      "Indoor ve outdoor LED ekranlarda yüksek parlaklık ve netlik sağlıyoruz.",
    glow: "from-fuchsia-400/30",
  },
  {
    icon: <UsersIcon />,
    title: "Uzman Teknik Kadro",
    stat: "15+ Kişi",
    desc:
      "10+ yıl deneyimli sahne, ses, ışık ve LED uzmanlarından oluşan ekip.",
    glow: "from-emerald-400/30",
  },
  {
    icon: <PriceIcon />,
    title: "Şeffaf Fiyatlandırma",
    stat: "%30 Avantaj",
    desc:
      "Kaliteden ödün vermeden bütçenize uygun ve net fiyatlandırma.",
    glow: "from-amber-400/30",
  },
  {
    icon: <GlobeIcon />,
    title: "Türkiye Geneli Hizmet",
    stat: "81 İl",
    desc:
      "İstanbul merkezli operasyonumuzla Türkiye’nin her noktasındayız.",
    glow: "from-indigo-400/30",
  },
];

// —————————————————————————————————————————
// ANA BİLEŞEN
// —————————————————————————————————————————

export default function WhyChooseUs() {
  return (
    <section
      aria-labelledby="why-choose-us-title"
      className="relative bg-[#0B1120] overflow-hidden py-20"
    >
      {/* ARKA PLAN */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 grid-overlay" />
        <div className="absolute top-0 left-0 w-[420px] h-[420px] bg-blue-600/10 blur-[120px] rounded-full" />
      </div>

      {/* İÇERİK */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* BAŞLIK */}
        <header className="max-w-3xl mb-16">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase text-slate-400">
            Avantajlarımız
          </p>
          <h2
            id="why-choose-us-title"
            className="mt-4 text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight"
          >
            Neden{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-orange-300 to-yellow-300">
              Sahneva
            </span>{" "}
            Organizasyon?
          </h2>
          <p className="mt-6 text-slate-300 text-base md:text-lg leading-relaxed">
            Profesyonel ekipman, deneyimli kadro ve kusursuz operasyon yönetimiyle
            etkinliğinizi riske atmadan hayata geçiriyoruz.
          </p>
        </header>

        {/* KARTLAR */}
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <li key={f.title}>
              <article
                className="relative h-full rounded-2xl border border-white/10
                           bg-slate-900/70 p-6
                           shadow-[0_18px_45px_rgba(0,0,0,0.65)]
                           transition-transform duration-300
                           hover:-translate-y-1"
              >
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${f.glow}
                              opacity-0 hover:opacity-100 transition-opacity`}
                  aria-hidden="true"
                />

                <div className="relative z-10 space-y-4">
                  <IconWrap>{f.icon}</IconWrap>

                  <span className="inline-block text-xs font-bold uppercase tracking-wider text-slate-400">
                    {f.stat}
                  </span>

                  <h3 className="text-lg font-semibold text-white">
                    {f.title}
                  </h3>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {f.desc}
                  </p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
