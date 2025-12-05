import Image from "next/image";
import Link from "next/link";
import heroImg from "@/public/img/hero-bg.webp";

// Client Component'ler (Etkileşim Sınırları)
import { MotionWrapper, MotionGroup } from "@/components/MotionPrimitives.client"; 
import {
  ReviewBannerDeferred,
  ServicesTabsDeferred,
  ProjectsGalleryDeferred,
  FaqDeferred,
} from "@/components/DeferredSections.client";

import CorporateEvents from "@/components/CorporateEvents";
import CorporateIntro from "@/components/CorporateIntro";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "https://www.sahneva.com";

// --- PERFORMANS OPTİMİZASYONU ---
// content-visibility: auto -> Ekran dışındaki içeriği render etme (Rendering maliyetini düşürür)
// contain-intrinsic-size -> Scroll bar'ın titremesini engeller (CLS optimizasyonu)
const BELOW_FOLD_STYLE = {
  contentVisibility: "auto",
  containIntrinsicSize: "1px 800px", 
};

// --- SABİT VERİLER ---
const HERO_FEATURES = [
  {
    icon: "⭐",
    title: "4.9/5 Memnuniyet",
    desc: "500+ proje ve referans",
    styles:
      "bg-white/70 border-white/50 text-slate-900 shadow-lg shadow-blue-900/10 backdrop-blur",
  },
  {
    icon: "⚡",
    title: "Hızlı Kurulum",
    desc: "Aynı gün montaj ve devreye alma",
    styles:
      "bg-blue-600/80 border-blue-400/60 text-white shadow-lg shadow-blue-900/20 backdrop-blur",
  },
  {
    icon: "👑",
    title: "Premium Ekipman",
    desc: "Turne sınıfı sahne ve LED teknolojisi",
    styles:
      "bg-slate-900/70 border-white/10 text-white shadow-xl shadow-slate-900/30 backdrop-blur",
  },
];

const KEYWORDS = [
  "Sahne kiralama",
  "LED ekran kiralama",
  "Truss sistemleri",
  "Ses ışık kiralama",
  "Podyum & catwalk",
  "Konser sahnesi",
  "Kurumsal etkinlik",
  "Festival sahnesi",
  "Fuar ve lansman",
  "Açılış töreni",
];

const SERVICE_BENEFITS = [
  "Her ölçekte sahne ve LED kurulumunda mühendislik hesaplarına uygun çözümler",
  "P2–P6 arası iç/dış mekan LED paneller ve güvenli rigging altyapısı",
  "Konser, festival, kurumsal etkinlik ve fuarlar için uçtan uca teknik ekip",
  "Hızlı lojistik, 81 ilde aynı gün veya ertesi gün devreye alma",
  "Şeffaf bütçe planlaması ve detaylı teklif dokümanı",
];

// --- ATOMİK BİLEŞENLER (Sunucu Tarafında Render Edilir) ---

// 2026 Tasarım: Accessible Glassmorphism Kart
function FeatureCard({ item }) {
  return (
    <div className={`
      relative h-full p-6 rounded-2xl border ${item.styles} 
      bg-opacity-60 backdrop-blur-md shadow-sm hover:shadow-md transition-shadow
    `}>
      <div className="text-3xl mb-3" aria-hidden="true">{item.icon}</div>
      <h3 className="text-lg font-bold mb-1">{item.title}</h3>
      <p className="text-sm opacity-90">{item.desc}</p>
    </div>
  );
}

// A11Y Uyumlu CTA Butonu
function CtaButton({ href, label, icon, variant = "primary", isExternal = false }) {
  const baseClasses = "group relative inline-flex items-center justify-center min-w-[180px] min-h-[52px] px-6 py-3 rounded-xl font-bold text-base transition-transform duration-200 hover:scale-[1.02] focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-900/20 focus-visible:ring-blue-600",
    secondary: "bg-white text-slate-900 border border-slate-200 hover:bg-slate-50 shadow-sm focus-visible:ring-slate-400",
    whatsapp: "bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-900/20 focus-visible:ring-emerald-600"
  };

  const Component = isExternal? 'a' : Link;
  const props = isExternal? { target: "_blank", rel: "noopener noreferrer" } : {};

  return (
    <Component href={href} className={`${baseClasses} ${variants[variant]}`} {...props}>
      <span className="mr-2 text-xl" aria-hidden="true">{icon}</span>
      <span>{label}</span>
      {isExternal && <span className="sr-only">(yeni sekmede açılır)</span>}
    </Component>
  );
}

// --- ANA SAYFA ---

export default function HomePage() {
  return (
    <div className="flex flex-col gap-0">
      
      {/* 1. HERO SECTION (LCP Hedefli) */}
      <section 
        className="relative min-h-[85vh] flex items-center justify-center overflow-hidden bg-slate-950" 
        aria-labelledby="hero-heading"
      >
        {/* Arkaplan Görseli: Priority + High Fetch Priority */}
        <div className="absolute inset-0 z-0">
          <Image
            src={heroImg}
            alt="Sahneva büyük ölçekli konser sahnesi ve LED ekran kurulumu"
            fill
            sizes="100vw"
            priority={true}
            fetchPriority="high" // LCP Optimizasyonu
            quality={75} // Hız/Kalite Dengesi
            placeholder="empty" // Renk blokları yerine anında yükleme
            className="object-cover opacity-40 mix-blend-overlay"
            style={{ objectPosition: 'center 40%' }}
          />
          {/* Kontrast için Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950/90 via-slate-950/50 to-slate-950" />
        </div>

        <div className="relative z-10 container px-4 py-20 text-center">
          <MotionWrapper animation="fade-down" delay={100}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-900/40 border border-blue-500/30 backdrop-blur-sm mb-8 text-blue-100 text-xs font-bold uppercase tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
              Türkiye Geneli Hizmet
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={200}>
            <h1 id="hero-heading" className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.15] mb-6 drop-shadow-2xl">
              Profesyonel <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Sahne</span> ve <br className="hidden md:block"/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">LED Ekran</span> Çözümleri
            </h1>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={400}>
            <p className="max-w-2xl mx-auto text-lg md:text-xl text-slate-200 leading-relaxed mb-8 opacity-90">
              500+ başarılı proje ve %98 müşteri memnuniyeti ile kurumsal etkinlikler, konserler ve festivaller için uçtan uca teknik prodüksiyon ortağınız.
            </p>
          </MotionWrapper>

          {/* Anahtar Kelimeler */}
          <MotionWrapper animation="scale" delay={500}>
            <div className="flex flex-wrap justify-center gap-2 mb-10" aria-label="Hizmetlerimiz">
              {KEYWORDS.map((word) => (
                <span key={word} className="px-3 py-1 rounded-md bg-white/10 border border-white/10 text-sm text-white font-medium backdrop-blur-sm">
                  {word}
                </span>
              ))}
            </div>
          </MotionWrapper>

          <MotionWrapper animation="fade-up" delay={600}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <CtaButton href="tel:+905453048671" label="Hemen Ara" icon="📞" variant="primary" />
              <CtaButton 
                href="https://wa.me/905453048671" 
                label="WhatsApp Teklif" 
                icon="💬" 
                variant="whatsapp" 
                isExternal={true}
              />
            </div>
          </MotionWrapper>
        </div>

        {/* Scroll İpucu - Reduced Motion kontrolü MotionWrapper içinde yapıldığı için güvenli */}
        <MotionWrapper delay={1000} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50">
          <div className="flex flex-col items-center gap-2">
            <span className="text-xs uppercase tracking-widest">Keşfet</span>
            <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
          </div>
        </MotionWrapper>
      </section>

      {/* 2. FEATURES & TRUST (LCP Dışı - Normal Akış) */}
      <section className="relative z-20 py-16 bg-slate-50 -mt-8 rounded-t-[2.5rem] shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        <div className="container px-4">
          
          {/* Özellik Kartları */}
          <ul className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto -mt-24 mb-16">
            {HERO_FEATURES.map((item, idx) => (
              <li key={item.title}>
                <MotionWrapper animation="fade-up" delay={idx * 100} as="article" className="h-full">
                  <FeatureCard item={item} />
                </MotionWrapper>
              </li>
            ))}
          </ul>

          {/* Danışmanlık Kartı - 2026 Glassmorphism */}
          <MotionWrapper animation="scale" delay={200}>
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 to-indigo-950 p-8 md:p-10 text-white shadow-2xl border border-white/10">
              {/* Dekoratif Gradient Blob */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" aria-hidden="true" />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 text-center lg:text-left">
                <div className="flex-shrink-0 w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center text-3xl backdrop-blur-sm border border-white/10 shadow-inner">
                  🎯
                </div>
                <div className="flex-1">
                  <h2 className="text-2xl md:text-3xl font-bold mb-3">Ücretsiz Teknik Danışmanlık</h2>
                  <p className="text-slate-200 text-lg leading-relaxed">
                    Etkinlik alanınıza en uygun sahne ölçülerini mühendislerimizle planlayın.
                    <span className="block mt-1 text-emerald-300 font-semibold">2 saat içinde detaylı teklif garantisi.</span>
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <CtaButton href="#teklif-al" label="Teklif İste" icon="🚀" variant="secondary" />
                </div>
              </div>
            </div>
          </MotionWrapper>
        </div>
      </section>

      <div id="teklif-al" className="scroll-mt-32" />

      {/* 3. DEFERRED SECTIONS (Below the Fold Performance) */}
      {/* 'content-visibility: auto' ile bu bölümler ekrana girene kadar render edilmez */}
      
      <section style={BELOW_FOLD_STYLE} className="py-20 bg-white">
        <div className="container px-4">
          <ReviewBannerDeferred idleTimeout={2000} />
        </div>
      </section>

      <section style={BELOW_FOLD_STYLE} className="py-20 bg-slate-50 relative">
        {/* CSS Grid Pattern Arkaplan */}
        <div className="absolute inset-0 bg-[linear-gradient(#e2e8f0_1px,transparent_1px),linear-gradient(90deg,#e2e8f0_1px,transparent_1px)] bg-[size:20px_20px][mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)] opacity-40 pointer-events-none" aria-hidden="true" />
        
        <div className="container px-4 relative z-10">
          <MotionWrapper animation="fade-up">
            <SectionHeader 
              title="Profesyonel " 
              highlight="Hizmetlerimiz" 
              description="Türkiye geneli sahne, podyum, LED ekran kiralama ve ses-ışık sistemleri kurulumu sağlıyoruz."
            />
          </MotionWrapper>
          <ServicesTabsDeferred idleTimeout={2500} />
        </div>
      </section>

      <section style={BELOW_FOLD_STYLE} className="py-20 bg-slate-900 text-white">
        <div className="container px-4">
          <MotionWrapper animation="fade-up">
            <SectionHeader 
              title="Başarılı " 
              highlight="Projelerimiz" 
              theme="dark"
              description="500'den fazla kurumsal etkinlik, konser ve fuar tecrübesi."
            />
          </MotionWrapper>
          <ProjectsGalleryDeferred idleTimeout={3500} rootMargin="200px" />
        </div>
      </section>

      {/* 4. SEO & CONTENT (Semantic Structure) */}
      <section className="py-20 bg-white">
        <div className="container px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Sol: Metin */}
            <article className="prose prose-lg prose-slate max-w-none">
              <h3 className="text-3xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <span className="bg-blue-100 text-blue-600 p-2 rounded-lg text-2xl" aria-hidden="true">🚀</span>
                Uçtan Uca Teknik Hizmet
              </h3>
              <p>
                <strong>Sahneva</strong> olarak Türkiye genelinde; 
                <Link href="/sahne-kiralama" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1">
                  sahne kiralama
                </Link>, 
                <Link href="/led-ekran-kiralama" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1">
                  LED ekran kiralama
                </Link> ve 
                <Link href="/ses-isik-sistemleri" className="font-semibold text-blue-600 hover:text-blue-800 underline decoration-2 underline-offset-2 transition-colors mx-1">
                  ses ışık sistemleri
                </Link> 
                alanlarında komple çözümler sunuyoruz.
              </p>
              <ul className="mt-6 space-y-3 list-none pl-0">
                {SERVICE_BENEFITS.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </article>

            {/* Sağ: Kurumsal İçerik */}
            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 shadow-lg">
              <CorporateIntro />
            </div>
          </div>
          
          <div className="mt-16">
            <CorporateEvents />
          </div>
        </div>
      </section>

      {/* 5. FAQ (Deferred) */}
      <section style={BELOW_FOLD_STYLE} className="py-20 bg-slate-50 border-t border-slate-200">
        <div className="container px-4 max-w-4xl mx-auto">
          <MotionWrapper animation="fade-up">
            <h2 className="text-3xl font-bold text-center mb-12 text-slate-900">Sıkça Sorulan Sorular</h2>
          </MotionWrapper>
          <FaqDeferred idleTimeout={4000} />
        </div>
      </section>

    </div>
  );
}

// Yardımcı SectionHeader (Tekrar kullanımı için)
function SectionHeader({ title, highlight, description, theme = "light" }) {
  const isDark = theme === "dark";
  return (
    <div className="mb-12">
      <h2 className={`text-3xl md:text-4xl font-black mb-4 ${isDark? 'text-white' : 'text-slate-900'}`}>
        {title}
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-500">
          {highlight}
        </span>
      </h2>
      {description && (
        <p className={`text-lg max-w-2xl ${isDark? 'text-slate-300' : 'text-slate-600'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
