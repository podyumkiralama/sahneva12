// components/HeroBelow.jsx
import { HERO_FEATURES_TR } from "@/lib/heroFeatures";

const PROCESS_STEPS = [
  {
    title: "Keşif & Planlama",
    desc: "Mekân ölçüleri, kapasite ve konsept doğrulaması ile doğru paket seçimi",
    badge: "1",
  },
  {
    title: "Kurulum & Test",
    desc: "Saha ekibi, güvenlik ve yedek güç kontrolleriyle aynı gün devreye alma",
    badge: "2",
  },
  {
    title: "Canlı Yönetim",
    desc: "Operatör, rejisör ve teknik sorumlu ile kesintisiz etkinlik akışı",
    badge: "3",
  },
];

function HeroFeatureGrid() {
  return (
    <ul
      className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-fr items-stretch list-none p-0 m-0"
      aria-label="Öne çıkan hizmet avantajları"
    >
      {HERO_FEATURES_TR.map((item) => (
        <li key={item.title} className="flex min-w-0">
          <article className="w-full h-full flex flex-col items-start bg-slate-900/60 backdrop-blur-sm rounded-xl p-5 border border-white/10 shadow-lg hover:bg-slate-800/60 transition-colors duration-300">
            <div
              className={`text-3xl mb-4 p-3 rounded-lg bg-white/5 ${item.color}`}
              aria-hidden="true"
            >
              {item.icon}
            </div>

            <h3 className="text-white font-bold text-lg mb-2">{item.title}</h3>

            <p className="text-gray-300 text-sm leading-relaxed">
              {item.description}
            </p>
          </article>
        </li>
      ))}
    </ul>
  );
}

function ConsultationCard() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-blue-800 to-indigo-900 rounded-2xl p-1 border border-white/10 shadow-2xl">
      {/* Dekoratif glow */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-white/10 rounded-full blur-3xl pointer-events-none" />

      <div className="bg-slate-950/30 rounded-xl p-5 md:p-7 backdrop-blur-sm h-full">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-shrink-0">
            <div
              className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-3xl shadow-lg transform rotate-3"
              aria-hidden="true"
            >
              🎯
            </div>
          </div>

          <div className="flex-1 text-center md:text-left space-y-2">
            <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">
              Ücretsiz Profesyonel Danışmanlık
            </h3>

            <p className="text-slate-200 text-base leading-relaxed max-w-2xl">
              Etkinliğiniz için{" "}
              <span className="text-white font-semibold">
                en doğru sahne ve podyum kiralama planını
              </span>{" "}
              ve bütçenize uygun LED ekran kiralama seçeneklerini ücretsiz planlayalım.
              <span className="block mt-1 text-yellow-300 font-medium">
                ⚡ 2 saat içinde detaylı teklif garantisi.
              </span>
            </p>
          </div>

          <div className="flex-shrink-0 w-full md:w-auto mt-4 md:mt-0">
            <a
              href="#teklif-al"
              className="group relative w-full md:w-auto inline-flex items-center justify-center gap-2 bg-white text-blue-900 hover:bg-blue-50 font-bold px-8 py-4 rounded-xl transition-all duration-200 shadow-lg hover:shadow-white/20 hover:-translate-y-1 focus-ring min-h-[44px]"
            >
              <span>Hemen Teklif Al</span>
              <span className="group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function ProcessList() {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-3 gap-3"
      role="region"
      aria-label="Proje akış adımları"
    >
      {PROCESS_STEPS.map((step) => (
        <article
          key={step.title}
          className="relative h-full rounded-2xl border border-white/10 bg-slate-900/60 p-4 backdrop-blur-sm shadow-md"
        >
          <div className="absolute -top-3 left-4 inline-flex items-center justify-center rounded-full bg-white text-blue-900 font-bold w-8 h-8 shadow-lg">
            {step.badge}
          </div>
          <h3 className="text-white font-semibold text-lg mt-2 mb-2">{step.title}</h3>
          <p className="text-slate-200/80 text-sm leading-relaxed">{step.desc}</p>
        </article>
      ))}
    </div>
  );
}

export default function HeroBelow() {
  return (
    <section
      className="home-section home-section--surface relative overflow-hidden bg-slate-950 mt-6 md:mt-8 py-10 md:py-12 2xl:py-16"
      aria-labelledby="hero-supporting-title"
    >
      <h2 id="hero-supporting-title" className="sr-only">
        Sahne Kiralama Hizmet Özellikleri ve Danışmanlık
      </h2>

      <div className="home-container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-3xl space-y-2">
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-blue-200/80 bg-white/5 border border-white/10 px-3 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-300 animate-pulse" aria-hidden="true" />
            Süreç & Güvence
          </p>
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
            Kurulum-sökümden canlı yönetimine kadar tek ekip, tek zaman çizelgesi
          </h3>
          <p className="text-slate-200/80 text-base md:text-lg leading-relaxed max-w-3xl">
            Sahneva ekibi keşif, statik hesap, LED içerik hazırlığı, truss kiralama ve sahne üstü operasyonu aynı çatı altında toparlar; bu da hem hız hem de hatasız teslimat sağlar.
          </p>
        </div>

        <div className="relative z-10">
          <HeroFeatureGrid />
        </div>

        <div className="relative z-0 mt-4">
          <ConsultationCard />
        </div>

        <ProcessList />
      </div>
    </section>
  );
}
