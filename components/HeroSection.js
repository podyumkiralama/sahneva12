// components/HeroSection.js
import Image from "next/image";
import heroImg from "@/public/img/hero-bg.webp";

const HERO_KEYWORDS = ["Sahne Kiralama", "LED Ekran", "Ses-Işık Sistemleri"];

const CTA_BASE =
  "w-full sm:w-auto min-w-[180px] min-h-[44px] inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-bold text-base text-white shadow-md hover:shadow-lg border border-white/15 transition-transform duration-200 hover:scale-[1.02] focus-ring";

function KeywordPills() {
  return (
    <ul
      className="mt-4 mb-6 flex flex-wrap justify-center gap-2"
      aria-label="Öne çıkan hizmet başlıkları"
    >
      {HERO_KEYWORDS.map((text) => (
        <li key={text} className="list-none">
          <span className="text-sm md:text-base font-semibold px-3 py-1 text-slate-100 bg-white/15 rounded-lg border border-white/10">
            {text}
          </span>
        </li>
      ))}
    </ul>
  );
}

function CTAButtons() {
  return (
    <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
      <a href="tel:+905453048671" className={`${CTA_BASE} bg-gradient-to-r from-blue-600 to-purple-600`}>
        <span aria-hidden="true">📞</span>
        Hemen Ara
      </a>

      <a
        href="https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ula%C5%9F%C4%B1yorum.+Sahne+kiralama+ve+LED+ekran+fiyatlar%C4%B1+hakk%C4%B1nda+detayl%C4%B1+teklif+almak+istiyorum.&utm_source=homepage&utm_medium=hero_cta&utm_campaign=whatsapp"
        target="_blank"
        rel="noopener noreferrer nofollow"
        aria-label="WhatsApp Teklif — WhatsApp üzerinden teklif isteyin (bağlantı yeni sekmede açılır)"
        className={`${CTA_BASE} bg-gradient-to-r from-green-600 to-emerald-700`}
      >
        <span aria-hidden="true">💬</span>
        WhatsApp Teklif
        <span className="sr-only">(yeni sekmede açılır)</span>
      </a>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative min-h-[75vh] pt-16 lg:pt-20 flex items-center justify-center overflow-hidden bg-black"
      aria-labelledby="hero-title"
      aria-describedby="hero-description hero-keywords"
    >
      {/* Background image (LCP) */}
      <div className="absolute inset-0" aria-hidden="true">

    <Image
      src={heroImg}
      alt={ariaHidden ? "" : alt}
      fill
      // ✅ LCP ve PERFORMANS OPTİMİZASYONLARI
      priority={true}
      fetchPriority="high"
      decoding="sync"
      sizes="(min-width: 1600px) 1600px, 100vw"
      quality={45}
      placeholder="empty"
      className="absolute inset-0 h-full w-full object-cover object-center"
      aria-hidden={ariaHidden}
    />

        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-10">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-4 flex justify-center">
            <p className="inline-flex items-center gap-3 rounded-full bg-black/40 backdrop-blur-md px-4 py-1.5 text-xs md:text-sm text-slate-100 border border-white/10 shadow-sm">
              <span
                className="h-2 w-2 rounded-full bg-green-400 animate-pulse motion-reduce:animate-none"
                aria-hidden="true"
              />
              Sahneva Organizasyon • Türkiye Geneli Profesyonel Hizmet
            </p>
          </div>

          {/* H1 */}
          <h1
            id="hero-title"
            className="text-white text-4xl sm:text-5xl lg:text-7xl font-black leading-tight tracking-tight drop-shadow-xl"
          >
            Türkiye genelinde
            <span className="block mt-1 pb-2 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-300">
              Sahne &amp; LED Ekran Kiralama
            </span>
          </h1>

          {/* Keywords */}
          <div id="hero-keywords">
            <KeywordPills />
          </div>

          {/* Subtitle */}
          <p
            id="hero-description"
            className="mt-4 mx-auto max-w-2xl text-slate-100 text-base md:text-xl leading-relaxed font-medium drop-shadow-md"
          >
            500+ başarılı proje, %98 müşteri memnuniyeti ve Türkiye geneli hızlı
            kurulum ile etkinliğinizde yanınızdayız.
          </p>

          {/* CTAs */}
          <CTAButtons />
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="hidden lg:block absolute bottom-8 left-1/2 -translate-x-1/2 opacity-80"
        aria-hidden="true"
      >
        <div className="animate-bounce motion-reduce:animate-none">
          <div className="w-6 h-10 border-2 border-white/40 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-white rounded-full mt-1" />
          </div>
        </div>
      </div>
    </section>
  );
}
