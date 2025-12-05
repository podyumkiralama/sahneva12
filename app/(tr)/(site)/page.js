import Image from "next/image";
// View Transitions uyumlu Link bileşeni
import { Link } from 'next-view-transitions';
import heroImg from "@/public/img/hero-bg.webp";

// İzole edilmiş Client Component'ler (Etkileşim Sınırları)
import { MotionWrapper, MotionGroup } from "@/components/MotionPrimitives.client"; 
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

// Statik Bileşenler (Server Side Rendered)
import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";

// --- SABİTLER & YAPILANDIRMA ---
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?? "https://www.sahneva.com";

// Performans: content-visibility ile tarayıcı render yükünü azaltma (Layout Shift korumalı)
// 'contain-intrinsic-size' eklenerek scroll bar titremesi önlenir.
const PERFORMANCE_SECTION_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px", // Tahmini yükseklik
};

const HERO_FEATURES = [
  { icon: "⭐", title: "4.9/5 Puan", desc: "500+ Mutlu Müşteri", bg: "bg-yellow-500/10", border: "border-yellow-500/20", text: "text-yellow-600" },
  { icon: "⚡", title: "Aynı Gün", desc: "Hızlı Kurulum", bg: "bg-cyan-500/10", border: "border-cyan-500/20", text: "text-cyan-600" },
  { icon: "👑", title: "Premium", desc: "Kalite Garantisi", bg: "bg-purple-500/10", border: "border-purple-500/20", text: "text-purple-600" },
];

const SEO_LINKS =;

export const revalidate = 3600;

// --- SCHEMA.ORG (JSON-LD) ---
function StructuredData() {
  const data = {
    "@context": "https://schema.org",
    "@graph":
        }
      },
      {
        "@type": "VideoObject",
        "@id": `${SITE_URL}#intro-video`,
        name: "Sahneva Tanıtım Filmi",
        description: "Sahneva etkinlik prodüksiyon süreçleri ve referans projeler.",
        uploadDate: "2024-01-01",
        thumbnailUrl:,
        contentUrl: "https://www.youtube.com/watch?v=173gBurWSRQ",
        embedUrl: "https://www.youtube.com/embed/173gBurWSRQ"
      }
    ]
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

// --- ATOMIC COMPONENTS ---

// A11y: Sadece ikon değil, metin de içeren erişilebilir buton yapısı
function PrimaryCTA({ href, label, icon, variant = "primary" }) {
  const styles = variant === "primary" 
   ? "bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 text-white shadow-lg shadow-blue-900/20" 
    : "bg-white text-blue-900 border border-gray-200 hover:bg-gray-50 shadow-md";

  return (
    <a
      href={href}
      className={`
        group relative inline-flex items-center justify-center 
        min-w-[180px] min-h-[52px] px-6 py-3 rounded-xl 
        font-bold text-base transition-all duration-300 hover:scale-[1.02]
        focus:outline-none focus-visible:ring-4 focus-visible:ring-blue-300
        ${styles}
      `}
    >
      <span className="mr-2 text-xl" aria-hidden="true">{icon}</span>
      <span>{label}</span>
    </a>
  );
}

// 2026 Tasarım Dili: Erişilebilir Glassmorphism Kartı
function FeatureCard({ item }) {
  return (
    <div className={`
      relative h-full p-6 rounded-2xl border ${item.border} ${item.bg} 
      backdrop-blur-md transition-shadow hover:shadow-xl
    `}>
      <div className="flex items-start justify-between mb-4">
        <span className="text-3xl" aria-hidden="true">{item.icon}</span>
      </div>
      <h3 className={`text-xl font-bold ${item.text} mb-2`}>{item.title}</h3>
      <p className="text-neutral-600 text-sm leading-relaxed">{item.desc}</p>
    </div>
  );
}

// --- MAIN PAGE ---

export default function HomePage() {
  return (
    <div className="overflow-x-hidden selection:bg-indigo-100 selection:text-indigo-900">
      <StructuredData />

      {/* === HERO SECTION === */}
      <section 
        className="relative min-h-[90dvh] flex items-center justify-center overflow-hidden bg-slate-900" 
        aria-labelledby="hero-heading"
      >
        {/* Arkaplan - LCP Optimized */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="Sahneva büyük ölçekli sahne ve LED ekran kurulumu referans görseli"
            fill
            sizes="100vw"
            priority={true}        // LCP: En yüksek öncelik
            fetchPriority="high"   // Tarayıcıya sinyal
            quality={75}           // Hız/Kalite dengesi (Google Best Practice)
            className="object-cover opacity-40 mix-blend-overlay"
            style={{ objectPosition: 'center 30%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/60 to-slate-900" />
        </div>

        <div className="relative z-10 container px-4 py-20 text-center">
          <MotionWrapper animation="fade-down" delay={0.1}>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-500/30 backdrop-blur-sm mb-8">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-blue-100 text-xs font-semibold tracking-wide uppercase">Türkiye Geneli Hizmet</span>
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={0.2}>
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1] mb-6">
              Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sahne</span> ve <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">LED Ekran</span> Çözümleri
            </h1>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={0.4}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-300 leading-relaxed mb-10">
              Kurumsal etkinlikler, konserler ve festivaller için uçtan uca teknik prodüksiyon. 
              <strong> 500+ başarılı proje</strong> ve %98 müşteri memnuniyeti ile çözüm ortağınız.
            </p>
          </MotionWrapper>

          <MotionWrapper animation="scale-up" delay={0.6}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <PrimaryCTA href="tel:+905453048671" label="Hemen Ara" icon="📞" />
              <PrimaryCTA 
                href="https://wa.me/905453048671" 
                label="WhatsApp Teklif" 
                icon="💬" 
                variant="secondary" 
              />
            </div>
          </MotionWrapper>
        </div>
      </section>

      {/* === FEATURES & TRUST === */}
      <section className="py-16 bg-white relative z-10 -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.1)]">
        <div className="container px-4">
          <MotionGroup className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto -mt-24 mb-16">
            {HERO_FEATURES.map((item) => (
              <FeatureCard key={item.title} item={item} />
            ))}
          </MotionGroup>

          {/* Danışmanlık Kartı */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-blue-900 p-8 md:p-12 text-white shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
              <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-sm">
                <span className="text-4xl">🎯</span>
              </div>
              <div className="flex-1">
                <h2 className="text-2xl md:text-3xl font-bold mb-3">Ücretsiz Teknik Danışmanlık</h2>
                <p className="text-blue-100 text-lg">
                  Etkinlik alanınıza en uygun sahne ve LED ekran ölçülerini mühendislerimizle birlikte planlayın.
                  <span className="block mt-1 text-yellow-300 font-semibold">2 saat içinde detaylı teklif garantisi.</span>
                </p>
              </div>
              <PrimaryCTA href="#teklif-al" label="Teklif İste" icon="🚀" variant="secondary" />
            </div>
          </div>
        </div>
      </section>

      <div id="teklif-al" className="scroll-mt-32" />

      {/* === DEFERRED SECTIONS (PERFORMANCE OPTIMIZED) === */}
      {/* Below-the-fold içerikler 'content-visibility: auto' ile render edilmeden beklenir */}
      
      <section style={PERFORMANCE_SECTION_STYLE} className="py-20 bg-slate-50">
        <div className="container px-4">
          <ReviewBannerDeferred idleTimeout={1500} />
        </div>
      </section>

      <section style={PERFORMANCE_SECTION_STYLE} className="py-20 bg-white">
        <div className="container px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Profesyonel <span className="text-blue-600">Hizmetlerimiz</span>
            </h2>
            <p className="text-slate-600">
              Türkiye'nin 81 ilinde, kendi ekipman parkurumuz ve uzman kadromuzla hizmet veriyoruz.
            </p>
          </div>
          <ServicesTabsDeferred idleTimeout={2500} />
        </div>
      </section>

      <section style={PERFORMANCE_SECTION_STYLE} className="py-20 bg-slate-900 text-white">
        <div className="container px-4">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <span className="text-blue-400 font-bold tracking-wider text-sm uppercase">Referanslar</span>
              <h2 className="text-3xl md:text-4xl font-bold mt-2">Başarılı Projeler</h2>
            </div>
            <Link href="/projelerimiz" className="text-white border-b border-blue-400 pb-1 hover:text-blue-400 transition-colors">
              Tümünü Gör →
            </Link>
          </div>
          <ProjectsGalleryDeferred idleTimeout={3500} rootMargin="200px" />
        </div>
      </section>

      {/* === SEO CONTENT & INTERNAL LINKING === */}
      <section className="py-20 bg-white">
        <div className="container px-4 grid lg:grid-cols-2 gap-12 items-center">
          <div className="prose prose-lg prose-blue text-slate-600">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Etkinlik Teknolojilerinde Güçlü Çözüm Ortağı</h3>
            <p>
              <strong>Sahneva</strong>, teknolojik altyapısı ve deneyimli ekibiyle; 
              {SEO_LINKS.map((link, i) => (
                <span key={link.href}>
                  {i > 0 && ", "}
                  <Link href={link.href} className="text-blue-700 font-semibold hover:underline decoration-2 underline-offset-2">
                    {link.text}
                  </Link>
                </span>
              ))}
              {" "} alanlarında sektörün öncü firmalarından biridir.
            </p>
            <ul className="list-none pl-0 space-y-3 mt-6">
              {.map(item => (
                <li key={item} className="flex items-center gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="bg-slate-100 rounded-3xl p-8 border border-slate-200">
            <CorporateIntro />
          </div>
        </div>
      </section>

      <section style={PERFORMANCE_SECTION_STYLE} className="py-20 bg-slate-50">
        <div className="container px-4 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Sıkça Sorulan Sorular</h2>
          <FaqDeferred idleTimeout={4000} />
        </div>
      </section>

    </div>
  );
}
