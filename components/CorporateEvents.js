// components/CorporateEvents.js

import Image from "next/image";
import Link from "next/link";

const CARD_SIZES =
  "(max-width: 768px) 100vw, " +
  "(max-width: 1024px) calc((100vw - 4rem) / 2), " +
  "calc((1280px - 4rem) / 3)";

const CARDS = [
  {
    slug: "lansman",
    title: "Ürün Lansmanları",
    img: "/img/kurumsal/lansman.webp",
    alt: "Kurumsal ürün lansmanı için profesyonel sahne, LED ekran ve ışık sistemi kurulumu - Sahneva",
    text: "LED ekran kurgu, sahne tasarımı, ışık şovları ve canlı yayın altyapısıyla etkileyici sunumlar.",
    icon: "🚀",
    gradient: "from-purple-500/10 to-blue-500/10",
    color: "text-purple-600",
  },
  {
    slug: "konferans",
    title: "Konferans & Kongre",
    img: "/img/kurumsal/konferans.webp",
    alt: "Konferans ve kongre organizasyonları için sahne, ses-ışık sistemleri ve teknik ekipman - Sahneva",
    text: "Çoklu mikrofon, simultane çeviri, sunum yönetimi ve kayıt çözümleriyle kusursuz akış.",
    icon: "🎤",
    gradient: "from-green-500/10 to-emerald-500/10",
    color: "text-green-600",
  },
  {
    slug: "bayi-toplantisi",
    title: "Bayi & İç İletişim",
    img: "/img/kurumsal/bayi-toplantisi.webp",
    alt: "Bayi toplantısı ve kurumsal iletişim etkinlikleri için özel sahne, ekran ve aydınlatma çözümleri - Sahneva",
    text: "Kurumsal kimliğe uygun sahne–dekor, çoklu ekran, video–ses yönetimi ve teknik ekip.",
    icon: "🤝",
    gradient: "from-orange-500/10 to-red-500/10",
    color: "text-orange-600",
  },
];

const ADVANTAGES = [
  { icon: "⚡", label: "Aynı Gün Kurulum", desc: "Hızlı ve profesyonel kurulum hizmeti", bg: "bg-blue-50", border: "border-blue-200" },
  { icon: "🎛", label: "Güncel Ekipman Parkı", desc: "En son teknoloji ekipmanlar", bg: "bg-green-50", border: "border-green-200" },
  { icon: "👷", label: "Deneyimli Teknik Ekip", desc: "Uzman profesyonel ekip", bg: "bg-purple-50", border: "border-purple-200" },
  { icon: "🛡", label: "Güvenlik & Yedek Plan", desc: "Güvenlik öncelikli hizmet", bg: "bg-amber-50", border: "border-amber-200" },
];

export default function CorporateEvents() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-blue-50/30 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-24 -left-24 w-96 h-96 bg-gradient-to-r from-blue-100/20 to-purple-100/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-r from-green-100/20 to-cyan-100/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        {/* KART LİSTESİ: ul/li + article (a11y) */}
        <ul className="grid gap-8 md:grid-cols-3 mb-16">
          {CARDS.map((card, i) => (
            <li key={card.slug}>
              <article
                className="group relative bg-white rounded-3xl border border-gray-200/60 shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden hover:border-blue-200/80"
                aria-labelledby={`corp-card-${i}-title`}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  aria-hidden="true"
                />
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={card.img}
                    alt={card.alt}
                    fill
                    sizes={CARD_SIZES}
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                    decoding="async"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" aria-hidden="true" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-2xl p-3 transform -translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <span className="text-2xl" aria-hidden="true">{card.icon}</span>
                  </div>
                </div>

                <div className="relative p-6 bg-white/80 backdrop-blur-sm">
                  <h3 id={`corp-card-${i}-title`} className={`font-bold text-xl mb-3 ${card.color}`}>
                    {card.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">{card.text}</p>

                  <div className="flex items-center justify-between">
                    <Link
                      href="/iletisim"
                      prefetch={false}
                      className="inline-flex items-center gap-2 font-semibold text-gray-700 hover:text-blue-600 transition-colors duration-200 group/link"
                    >
                      <span>Teklif Al</span>
                      <span className="transform group-hover/link:translate-x-1 transition-transform duration-200" aria-hidden="true">→</span>
                    </Link>
                    <span className="text-xs font-medium text-gray-700 bg-gray-200 rounded-full px-3 py-1">
                      Profesyonel Çözüm
                    </span>
                  </div>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <div className="mb-16">
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200/50 rounded-full px-6 py-3 shadow-sm mb-4">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" aria-hidden="true" />
              <span className="text-sm font-medium text-gray-700">Neden Sahneva?</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Kurumsal Çözümlerde <span className="text-blue-600">Farkımız</span>
            </h3>
          </div>

          {/* AVANTAJ LİSTESİ: ul/li (role gerekmez) */}
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {ADVANTAGES.map((item, i) => (
              <li
                key={i}
                className={`group relative ${item.bg} ${item.border} rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-blue-300/50`}
              >
                <div className="flex items-center gap-4">
                  <span className="text-3xl transition-transform duration-300 group-hover:scale-110" aria-hidden="true">
                    {item.icon}
                  </span>
                  <div>
                    <span className="block font-bold text-gray-900 text-lg mb-1">{item.label}</span>
                    <span className="text-sm text-gray-600">{item.desc}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="relative rounded-3xl bg-gradient-to-r from-blue-600 to-purple-600 p-8 md:p-12 text-center text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10" aria-hidden="true">
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white rounded-full" />
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white rounded-full" />
          </div>

          <div className="relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Kurumsal Etkinlikleriniz İçin <span className="text-yellow-300">Anahtar Teslim</span> Çözüm
            </h3>
            <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              Profesyonel sahne, podyum, LED ekran, ses–ışık ve yayın çözümleri için uzman ekibimizle hemen iletişime geçin.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
              <a
                href="tel:+905453048671"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-600 font-semibold px-8 py-4 rounded-2xl hover:bg-gray-100 transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1 min-h-[60px]"
                title="Telefonla ücretsiz danışmanlık alın"
              >
                <span className="text-2xl" aria-hidden="true">📞</span>
                <span>Telefonla Görüş</span>
              </a>

              <a
                href="https://wa.me/905453048671?text=Merhaba%2C+web+sitenizden+ulaşıyorum.+Sahne+kiralama+ve+LED+ekran+fiyatları+hakkında+detaylı+teklif+almak+istiyorum."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-green-100 hover:bg-green-200 border-2 border-green-600 text-green-900 font-bold px-5 py-4 rounded-xl shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl min-h-[60px]"
              >
                <span className="text-xl" aria-hidden="true">💬</span>
                <span className="text-sm font-bold">WhatsApp'tan Yaz</span>
                <span className="sr-only">(yeni sekmede açılır)</span>
              </a>
            </div>

            <div className="flex items-center justify-center gap-4 text-blue-100 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                <span>7/24 Müşteri Desteği</span>
              </div>
              <div className="w-px h-4 bg-blue-400" aria-hidden="true" />
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" aria-hidden="true" />
                <span>15 Dakikada Yanıt</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
