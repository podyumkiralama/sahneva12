// components/CorporateEvents.js
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, ScrollRevealGroup } from "@/components/ScrollReveal";

const CARD_SIZES = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";

const CARDS = [
  {
    slug: "lansman",
    title: "Ürün Lansmanları",
    img: "/img/kurumsal/lansman.webp",
    alt: "Kurumsal ürün lansmanı için profesyonel sahne, LED ekran ve ışık sistemi kurulumu",
    text: "LED ekran kurgu, sahne tasarımı, ışık şovları ve canlı yayın altyapısıyla etkileyici sunumlar.",
    icon: "🚀",
    gradient: "from-purple-500/10 to-blue-500/10",
    color: "text-purple-600",
  },
  {
    slug: "konferans",
    title: "Konferans & Kongre",
    img: "/img/kurumsal/konferans.webp",
    alt: "Konferans ve kongre organizasyonları için sahne, ses-ışık sistemleri ve teknik ekipman",
    text: "Çoklu mikrofon, simultane çeviri, sunum yönetimi ve kayıt çözümleriyle kusursuz akış.",
    icon: "🎤",
    gradient: "from-green-500/10 to-emerald-500/10",
    color: "text-green-600",
  },
  {
    slug: "bayi-toplantisi",
    title: "Bayi & İç İletişim",
    img: "/img/kurumsal/bayi-toplantisi.webp",
    alt: "Bayi toplantısı ve kurumsal iletişim etkinlikleri için özel sahne, ekran ve aydınlatma çözümleri",
    text: "Kurumsal kimliğe uygun sahne–dekor, çoklu ekran, video–ses yönetimi ve teknik ekip.",
    icon: "🤝",
    gradient: "from-orange-500/10 to-red-500/10",
    color: "text-orange-600",
  },
];

const ADVANTAGES = [
  {
    icon: "⚡",
    label: "Aynı Gün Kurulum",
    desc: "Hızlı ve profesyonel kurulum hizmeti",
    bg: "bg-blue-50",
    border: "border-blue-200",
  },
  {
    icon: "🎛",
    label: "Güncel Ekipman Parkı",
    desc: "En son teknoloji ekipmanlar",
    bg: "bg-green-50",
    border: "border-green-200",
  },
  {
    icon: "👷",
    label: "Deneyimli Teknik Ekip",
    desc: "Uzman profesyonel ekip",
    bg: "bg-purple-50",
    border: "border-purple-200",
  },
  {
    icon: "🛡",
    label: "Güvenlik & Yedek Plan",
    desc: "Güvenlik öncelikli hizmet",
    bg: "bg-amber-50",
    border: "border-amber-200",
  },
];

// Daha optimize blur placeholder
const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAADAAQDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R";

// Optimize edilmiş Image bileşeni
function OptimizedImage({ src, alt, sizes, className, priority = false }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      quality={70}
      fetchPriority={priority ? "high" : "low"}
    />
  );
}

export default function CorporateEvents() {
  return (
    <section
      className="relative py-16 bg-gradient-to-br from-gray-50 to-blue-50/20 overflow-hidden"
      aria-labelledby="corporate-events-title"
    >
      {/* Basitleştirilmiş background - performans için */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-100/20 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-green-100/20 rounded-full blur-2xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <h2 id="corporate-events-title" className="sr-only">
          Kurumsal Organizasyon Çözümlerimiz
        </h2>

        {/* KART GRID + SCROLL ANİMASYON */}
        <ScrollRevealGroup>
          <ul
            className="grid gap-6 md:grid-cols-3 mb-12"
            role="list"
            aria-label="Kurumsal etkinlik hizmetlerimiz"
          >
            {CARDS.map((card, index) => (
              <ScrollReveal key={card.slug} delay={String(index)}>
                <li>
                  <article
                    className="group relative bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2"
                    aria-labelledby={`corp-card-${index}-title`}
                    tabIndex={0}
                  >
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <OptimizedImage
                        src={card.img}
                        alt={card.alt}
                        sizes={CARD_SIZES}
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        priority={index === 0} // Sadece ilk görsel priority
                      />
                      <div
                        className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        aria-hidden="true"
                      />
                      <div
                        className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm rounded-xl p-2"
                        aria-hidden="true"
                      >
                        <span className="text-xl">{card.icon}</span>
                      </div>
                    </div>

                    <div className="p-5">
                      <h3
                        id={`corp-card-${index}-title`}
                        className={`font-bold text-lg mb-2 ${card.color}`}
                      >
                        {card.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4">
                        {card.text}
                      </p>

                      <div className="flex items-center justify-between">
                        <Link
                          href="/iletisim"
                          prefetch={false}
                          className="inline-flex items-center gap-1 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 text-sm focus:outline-none focus:underline"
                          aria-label={`${card.title} için teklif al - iletişim sayfasına git`}
                        >
                          <span>Teklif Al</span>
                          <span
                            aria-hidden="true"
                            className="transition-transform duration-200"
                          >
                            →
                          </span>
                        </Link>
                        <span
                          className="text-xs font-medium text-gray-700 bg-gray-100 rounded-full px-2 py-1"
                          aria-label="Profesyonel çözüm"
                        >
                          Profesyonel
                        </span>
                      </div>
                    </div>
                  </article>
                </li>
              </ScrollReveal>
            ))}
          </ul>
        </ScrollRevealGroup>

        {/* Avantajlar bölümü + SCROLL ANİMASYON */}
        <ScrollRevealGroup>
          <ScrollReveal delay="0">
            <div className="mb-12">
              <div className="text-center mb-8">
                <div
                  className="inline-flex items-center gap-2 bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm mb-3"
                  aria-hidden="true"
                >
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    Neden Sahneva?
                  </span>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
                  Kurumsal Çözümlerde{" "}
                  <span className="text-blue-600">Farkımız</span>
                </h3>
                <p className="text-gray-600 text-sm max-w-2xl mx-auto">
                  Profesyonel ekipman ve deneyimli teknik kadromuzla
                  kurumsal etkinliklerinizde yanınızdayız
                </p>
              </div>

              <ul
                className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
                role="list"
                aria-label="Avantajlarımız"
              >
                {ADVANTAGES.map((item, index) => (
                  <ScrollReveal key={index} delay={String(index + 1)}>
                    <li
                      className={`group relative ${item.bg} ${item.border} rounded-xl border p-4 transition-all duration-200 hover:shadow-md focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-offset-2`}
                      tabIndex={0}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className="text-2xl transition-transform duration-200 group-hover:scale-110"
                          aria-hidden="true"
                        >
                          {item.icon}
                        </span>
                        <div>
                          <span className="block font-bold text-gray-900 text-base mb-0.5">
                            {item.label}
                          </span>
                          <span className="text-xs text-gray-600">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    </li>
                  </ScrollReveal>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </ScrollRevealGroup>

        {/* CTA bölümü + SCROLL ANİMASYON */}
        <ScrollReveal delay="2">
          <div
            className="relative rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 p-6 md:p-8 text-center text-white overflow-hidden"
            role="region"
            aria-labelledby="cta-title"
          >
            <div className="absolute inset-0 opacity-5" aria-hidden="true">
              <div className="absolute -top-10 -right-10 w-20 h-20 bg-white rounded-full" />
              <div className="absolute -bottom-10 -left-10 w-20 h-20 bg-white rounded-full" />
            </div>

            <div className="relative z-10">
              <h3
                id="cta-title"
                className="text-xl md:text-2xl font-bold mb-3"
              >
                Kurumsal Etkinlikleriniz İçin{" "}
                <span className="text-yellow-300">Anahtar Teslim</span> Çözüm
              </h3>
              <p className="text-blue-100 text-base mb-6 max-w-2xl mx-auto">
                Profesyonel sahne, podyum, LED ekran, ses–ışık ve yayın
                çözümleri için uzman ekibimizle hemen iletişime geçin.
              </p>

              <div className="flex flex-col sm:flex-row justify-center gap-3 mb-4">
                <a
                  href="tel:+905453048671"
                  className="inline-flex items-center justify-center gap-2 bg-white text-blue-600 font-semibold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:-translate-y-0.5 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600 text-sm"
                  aria-label="Telefonla ücretsiz danışmanlık alın: +90 545 304 86 71"
                >
                  <span aria-hidden="true">📞</span>
                  <span>Telefonla Görüş</span>
                </a>

                <a
                  href="https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ulaşıyorum.+Kurumsal+etkinlik+çözümleri+hakkında+detaylı+teklif+almak+istiyorum."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-3 rounded-xl transition-all duration-200 transform hover:scale-105 min-h-[52px] focus:outline-none focus:ring-2 focus:ring-green-300 focus:ring-offset-2 focus:ring-offset-purple-600 text-sm"
                  aria-label="WhatsApp üzerinden mesaj gönderin - yeni sekmede açılır"
                >
                  <span aria-hidden="true">💬</span>
                  <span>WhatsApp'tan Yaz</span>
                </a>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-blue-100 text-xs">
                <div className="flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
                    aria-hidden="true"
                  />
                  <span>7/24 Müşteri Desteği</span>
                </div>
                <div
                  className="hidden sm:block w-px h-3 bg-blue-400"
                  aria-hidden="true"
                />
                <div className="flex items-center gap-1">
                  <div
                    className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"
                    aria-hidden="true"
                  />
                  <span>15 Dakikada Yanıt</span>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
