// components/HeroSection.js
import Image from "next/image";
import Link from "next/link";
import heroImg from "@/public/img/hero-bg.webp";

const HERO_ID = "hero-title";

function HeroBackgroundImage() {
  return (
    <div className="absolute inset-0 -z-10" aria-hidden="true">
      {/* Cheap base paint (CLS/TBT güvenli) */}
      <div className="absolute inset-0 bg-[#0B1120]" />

      {/* LCP Image */}
      <Image
        src={heroImg}
        alt=""
        fill
        priority
        fetchPriority="high"
        sizes="100vw"
        quality={45}
        placeholder="empty" // ❌ blur yok (desktop TBT artmasın)
        className="absolute inset-0 h-full w-full object-cover object-center"
        aria-hidden="true"
      />

      {/* Lightweight overlays */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60" />

      {/* Subtle grid (paint cost düşük) */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.08]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,.12) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,.12) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>
    </div>
  );
}

export default function HeroSection() {
  return (
    <section aria-labelledby={HERO_ID} className="relative overflow-hidden">
      <div className="relative min-h-[75vh] md:min-h-[78vh] flex items-center">
        <HeroBackgroundImage />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 md:py-20">
          <div className="max-w-3xl">
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs sm:text-sm font-semibold text-white/90">
              <span aria-hidden="true">⚡</span>
              Türkiye genelinde hızlı kurulum & teklif
            </p>

            {/* H1 */}
            <h1
              id={HERO_ID}
              className="mt-5 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white"
            >
              Sahne, LED Ekran ve Etkinlik Prodüksiyon Kiralama
            </h1>

            {/* Subtitle */}
            <p className="mt-5 text-base sm:text-lg text-white/85 leading-relaxed">
              Sahneva Organizasyon ile sahne, podyum, LED ekran, ses-ışık ve truss
              çözümlerini tek noktadan kiralayın. Kurulum, test ve söküm dahil
              profesyonel ekip.
            </p>

            {/* CTA */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="#teklif-al"
                className="inline-flex items-center justify-center rounded-xl bg-white px-6 py-3 text-sm font-extrabold text-slate-900 hover:bg-white/90 transition min-h-[44px]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
              >
                Hemen Teklif Al
              </a>

              <Link
                href="/hizmetler"
                className="inline-flex items-center justify-center rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-bold text-white hover:bg-white/15 transition min-h-[44px]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
              >
                Tüm Hizmetler
                <span aria-hidden="true" className="ml-2">›</span>
              </Link>

              <a
                href={`https://wa.me/905453048671?text=${encodeURIComponent(
                  "Merhaba, Sahneva ile etkinlik ekipmanları için teklif ve destek almak istiyorum."
                )}&utm_source=hero&utm_medium=cta_whatsapp`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp üzerinden teklif al – yeni sekmede açılır"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-3 text-sm font-extrabold text-white
                           hover:from-green-700 hover:to-emerald-700 transition min-h-[44px]
                           focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-[#0B1120]"
              >
                <span aria-hidden="true" className="mr-2">💬</span>
                WhatsApp
              </a>
            </div>

            {/* Trust chips */}
            <div className="mt-9 flex flex-wrap gap-2 text-xs sm:text-sm">
              {[
                "Kurulum & Söküm Dahil",
                "Profesyonel Teknik Ekip",
                "Hızlı Teklif & Destek",
                "Türkiye Geneli Hizmet",
              ].map((t) => (
                <span
                  key={t}
                  className="inline-flex items-center rounded-full border border-white/15 bg-white/10 px-3 py-1.5 font-semibold text-white/90"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll cue – mobile kapalı (performans) */}
        <div
          className="hidden sm:block absolute bottom-6 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        >
          <div className="flex flex-col items-center gap-2 text-white/80">
            <span className="text-xs font-semibold">Aşağı kaydır</span>
            <div className="h-10 w-6 rounded-full border border-white/35 flex items-start justify-center p-1">
              <div className="h-2 w-2 rounded-full bg-white/80 animate-bounce" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
