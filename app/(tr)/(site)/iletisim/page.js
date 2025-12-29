// app/(site)/iletisim/page.jsx
import Link from "next/link";
import { BASE_SITE_URL, ORGANIZATION_ID } from "@/lib/seo/schemaIds";

const PAGE_URL = `${BASE_SITE_URL}/iletisim`;

export const metadata = {
  title: "İletişim | Sahneva - Profesyonel Etkinlik Çözümleri",
  description:
    "Sahne kiralama, LED ekran, ses-ışık sistemleri için hemen ulaşın. Türkiye geneli hızlı kurulum ve profesyonel danışmanlık.",
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "İletişim | Sahneva Organizasyon - Profesyonel Etkinlik Çözümleri",
    description:
      "Sahne, LED ekran, ses-ışık sistemleri için hemen teklif alın. Türkiye geneli hızlı kurulum ve profesyonel danışmanlık.",
    url: PAGE_URL,
    images: [
      {
        url: `${BASE_SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
    type: "website",
    locale: "tr_TR",
  },
  robots: { index: true, follow: true },
};

const PHONE = "+905453048671";
const MAIL = "info@sahneva.com";
const WHATSAPP_URL = `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(
  "Merhaba, Sahneva web sitesinden ulaşıyorum. Etkinlik için teklif almak istiyorum."
)}`;

const GMB_PROFILE_URL = "https://g.page/r/CZhkMzkNOdgnEBI";
const GMB_REVIEW_URL = "https://g.page/r/CZhkMzkNOdgnEBI/review";

/* ───── STRUCTURED DATA (Rich Snippet) ───── */
function ContactStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Sahneva İletişim",
    description:
      "Profesyonel sahne kiralama, LED ekran, ses-ışık sistemleri iletişim bilgileri",
    url: PAGE_URL,
    image: `${BASE_SITE_URL}/img/og/sahneva-og.webp`,
    mainEntity: {
      "@id": ORGANIZATION_ID,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <ContactStructuredData />

      {/* HERO */}
      <section
        className="relative min-h-[60vh] 2xl:min-h-[75vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 pt-16 lg:pt-20"
        aria-labelledby="hero-title"
      >
        {/* Gradient efektler */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse delay-1000" />
          <div className="absolute top-40 left-1/2 w-80 h-80 bg-cyan-500 rounded-full mix-blend-multiply blur-3xl opacity-30 animate-pulse delay-500" />
        </div>

        {/* Arka plan yazısı */}
        <div
          className="absolute inset-0 flex items-center justify-center opacity-5 select-none"
          aria-hidden="true"
        >
          <span className="text-[100px] lg:text-[160px] font-black text-white tracking-wider">
            İLETİŞİM
          </span>
        </div>

        <div className="relative z-10 container text-center text-white">
          
            <div className="max-w-4xl 2xl:max-w-5xl mx-auto">
              <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-md rounded-full px-6 py-3 border border-white/20 mb-6">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-white/90 text-sm font-medium">
                  7/24 Teknik Destek
                </span>
              </div>

              <h1
                id="hero-title"
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-6 leading-tight"
              >
                <span className="block">BİZE</span>
                <span className="gradient-text gradient-text--safe-xl">
                  Ulaşın
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8 leading-relaxed max-w-3xl 2xl:max-w-4xl mx-auto">
                Etkinliğiniz için{" "}
                <strong className="text-blue-300">en uygun çözümleri</strong>{" "}
                sunalım
                <br />
                <strong className="text-purple-300">
                  2 saat içinde detaylı teklif
                </strong>{" "}
                hazırlıyoruz
              </p>
            </div>
          
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2" aria-hidden="true">
          <div className="animate-bounce">
            <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white/70 rounded-full mt-2" />
            </div>
          </div>
        </div>
      </section>

      <div id="main" className="relative pb-28 md:pb-0">
        {/* Hızlı İletişim Kartları */}
        <section className="py-20 bg-gradient-to-br from-white to-blue-50/50">
          <div className="container max-w-6xl mx-auto px-4">
            
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                  Hızlı{" "}
                  <span className="gradient-text gradient-text--safe-xl">
                    İletişim
                  </span>
                </h2>
                <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                  Size en uygun iletişim yöntemiyle hemen bize ulaşın, 2 saat
                  içinde yanıt verelim
                </p>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 mx-auto mt-8" />
              </div>
            

            
              <div
                className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto"
                role="list"
                aria-label="Hızlı iletişim seçenekleri"
              >
                
                  <ContactCard
                    icon="📞"
                    title="Telefon ile Ara"
                    info="+90 545 304 86 71"
                    description="Hemen arayın, uzman ekibimizle görüşün"
                    href={`tel:${PHONE}`}
                    color="from-blue-700 to-cyan-700"
                    buttonText="Hemen Ara"
                  />
                

                
                  <ContactCard
                    icon="💬"
                    title="WhatsApp"
                    info="Hızlı Mesaj"
                    description="WhatsApp'tan yazın, anında yanıt verelim"
                    href={WHATSAPP_URL}
                    color="from-green-700 to-emerald-700"
                    buttonText="WhatsApp'tan Yaz"
                  />
                

                
                  <ContactCard
                    icon="✉️"
                    title="E-posta"
                    info={MAIL}
                    description="Detaylı teklif için e-posta gönderin"
                    href={`mailto:${MAIL}?subject=Sahneva Teklif Talebi&body=Merhaba, etkinliğim hakkında detaylı teklif almak istiyorum.`}
                    color="from-purple-700 to-pink-700"
                    buttonText="E-posta Gönder"
                  />
                
              </div>
            
          </div>
        </section>

        {/* Harita + Form */}
        <section className="py-20 bg-gradient-to-br from-neutral-50 to-blue-100/30">
          <div className="container max-w-6xl mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Harita ve Konum */}
              <div className="space-y-8">
                
                  <div className="text-center lg:text-left">
                    <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-6">
                      Konumumuz ve{" "}
                      <span className="gradient-text gradient-text--safe-xl">
                        İletişim
                      </span>
                    </h2>
                    <p className="text-xl text-neutral-600 mb-8">
                      Türkiye geneli hizmet veriyoruz. Ofisimizi ziyaret etmek
                      için haritayı kullanabilirsiniz.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-purple-600 lg:mx-0 mx-auto" />
                  </div>
                

                
                  <div className="rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
                    <iframe
                      title="Sahneva Konumu - Profesyonel Etkinlik Ekipmanları"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3006.7561988118778!2d28.97663777518891!3d41.09737131400938!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab7eef124ac6d%3A0x27d8390d39336498!2sSahneva%20Organizasyon!5e0!3m2!1str!2str!4v1691234567890!5m2!1str!2str"
                      width="100%"
                      height="300"
                      className="w-full nc-IletisimPage-map-1"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="strict-origin-when-cross-origin"
                    />
                  </div>
                

                
                  <div className="flex flex-col sm:flex-row gap-4">
                    <a
                      href={GMB_PROFILE_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover:scale-105 shadow-lg"
                      aria-label="Google Haritalar'da Sahneva profilini aç (yeni sekmede açılır)"
                    >
                      <span className="flex items-center justify-center gap-2">
                        📍 Haritalar'da Aç
                      </span>
                    </a>
                    <a
                      href={GMB_REVIEW_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 bg-gradient-to-r from-amber-800 to-orange-800 hover:from-amber-900 hover:to-orange-900 text-white font-bold py-4 px-6 rounded-xl text-center transition-all duration-300 hover:scale-105 shadow-lg"
                      aria-label="Google üzerinde Sahneva için yorum yaz (yeni sekmede açılır)"
                    >
                      <span className="flex items-center justify-center gap-2">
                        ⭐ Google'da Yorum Yap
                      </span>
                    </a>
                  </div>
                

                
                  <div className="bg-white rounded-2xl p-8 shadow-lg border border-neutral-100">
                    <h3 className="text-2xl font-black text-neutral-900 mb-6 flex items-center gap-3">
                      <span className="text-3xl">🏢</span>
                      İletişim Bilgileri
                    </h3>
                    <div className="space-y-4" role="list" aria-label="Doğrudan iletişim yöntemleri">
                      <InfoRow label="Telefon" icon="📞">
                        <a
                          href={`tel:${PHONE}`}
                          className="text-blue-600 hover:text-blue-700 font-medium"
                        >
                          {PHONE}
                        </a>
                      </InfoRow>
                      <InfoRow label="WhatsApp" icon="💬">
                        <a
                          href={WHATSAPP_URL}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-green-600 hover:text-green-700 font-medium"
                          aria-label="WhatsApp üzerinden hızlı mesaj gönder (yeni sekmede açılır)"
                        >
                          Hızlı Mesaj Gönder
                        </a>
                      </InfoRow>
                      <InfoRow label="E-posta" icon="✉️">
                        <a
                          href={`mailto:${MAIL}`}
                          className="text-purple-600 hover:text-purple-700 font-medium"
                        >
                          {MAIL}
                        </a>
                      </InfoRow>
                    </div>
                  </div>
                
              </div>

              {/* Teklif Formu */}
              
                <div
                  className="bg-white rounded-2xl shadow-2xl border border-neutral-200 p-8"
                  id="teklif-formu"
                >
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-black text-neutral-900 mb-4">
                      Hızlı{" "}
                      <span className="gradient-text gradient-text--safe-xl">
                        Teklif Alın
                      </span>
                    </h2>
                    <p className="text-neutral-600">
                      Etkinlik bilgilerinizi bırakın, 2 saat içinde detaylı
                      teklif sunalım
                    </p>
                  </div>

                  <form
                    action="https://formspree.io/f/xanppven"
                    method="POST"
                    acceptCharset="UTF-8"
                    className="space-y-6"
                  >
                    <div
                      className="p-4 bg-blue-50 border border-blue-100 rounded-xl text-sm text-blue-900"
                      role="status"
                      aria-live="polite"
                    >
                      * ile işaretli alanlar zorunludur. Lütfen telefon numaranıza ülke kodunu ekleyin ve geçerli bir
                      e-posta adresi yazın ki size hızlıca dönüş yapabilelim.
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label
                          htmlFor="name"
                          className="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                          Ad Soyad *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          placeholder="Adınız ve soyadınız"
                          aria-describedby="name-help"
                          className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                          required
                          autoComplete="name"
                          inputMode="text"
                          title="Teklif hazırlarken sizi doğru hitapla arayabilmemiz için adınızı yazın."
                        />
                        <p id="name-help" className="mt-2 text-xs text-neutral-500">
                          Teklifi hangi kişiyle paylaşacağımızı ve gerektiğinde kimi arayacağımızı belirtin.
                        </p>
                      </div>
                      <div>
                        <label
                          htmlFor="phone"
                          className="block text-sm font-semibold text-neutral-700 mb-2"
                        >
                          Telefon *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          placeholder="+90 ___ ___ __ __"
                          aria-describedby="phone-help"
                          className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                          required
                          autoComplete="tel"
                          inputMode="tel"
                          title="Ülke kodu dahil ulaşılabilir bir numara yazın."
                        />
                        <p id="phone-help" className="mt-2 text-xs text-neutral-500">
                          Ülke koduyla birlikte yazarsanız ekibimiz sizi arayarak detayları hızla netleştirebilir.
                        </p>
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        E-posta *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="email@example.com"
                        aria-describedby="email-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                        required
                        autoComplete="email"
                        inputMode="email"
                        title="Teklif ve çizimleri gönderebileceğimiz geçerli bir e-posta yazın."
                      />
                      <p id="email-help" className="mt-2 text-xs text-neutral-500">
                        Teklif, teknik çizimler ve onay süreçleri için bu adresi kullanacağız.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="eventType"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        Etkinlik Türü *
                      </label>
                      <select
                        id="eventType"
                        name="eventType"
                        aria-describedby="event-type-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60"
                        required
                        autoComplete="off"
                      >
                        <option value="">Etkinlik türünü seçin</option>
                        <option value="Kurumsal Etkinlik">
                          Kurumsal Etkinlik
                        </option>
                        <option value="Konser">Konser</option>
                        <option value="Düğün">Düğün</option>
                        <option value="Festival">Festival</option>
                        <option value="Konferans">Konferans</option>
                        <option value="Sergi">Sergi</option>
                        <option value="Diğer">Diğer</option>
                      </select>
                      <p id="event-type-help" className="mt-2 text-xs text-neutral-500">
                        En yakın seçeneği belirtmek, sahne, ekran ve ses sistemi önerilerimizi netleştirir.
                      </p>
                    </div>

                    <div>
                      <label
                        htmlFor="message"
                        className="block text-sm font-semibold text-neutral-700 mb-2"
                      >
                        Etkinlik Detayları *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        placeholder="Etkinlik tarihi, konumu, tahmini katılımcı sayısı ve ihtiyaç duyduğunuz ekipmanlar..."
                        rows={5}
                        aria-describedby="message-help"
                        className="w-full border border-neutral-300 rounded-xl p-4 transition-all duration-200 focus-ring focus-visible:border-blue-500/60 resize-none"
                        required
                        autoComplete="off"
                        title="Tarih, konum, kitle büyüklüğü ve teknik ihtiyaçları paylaşın."
                      />
                      <p id="message-help" className="mt-2 text-xs text-neutral-500">
                        Tarih, mekan, hedef kitle ve ihtiyaç duyduğunuz ekipmanları yazdığınızda teklif süreci hızlanır.
                      </p>
                    </div>

                    {/* Formspree hidden fields */}
                    <input
                      type="hidden"
                      name="_subject"
                      value="Sahneva | Yeni Teklif Talebi"
                    />
                    <input
                      type="hidden"
                      name="_redirect"
                      value="https://www.sahneva.com/tesekkurler"
                    />
                    <input
                      type="text"
                      name="_gotcha"
                      className="hidden"
                      tabIndex={-1}
                      autoComplete="off"
                    />

                    <button
                      type="submit"
                      className="w-full bg-gradient-to-r from-blue-700 to-purple-800 hover:from-blue-800 hover:to-purple-900 text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <span className="flex items-center justify-center gap-2">
                        🚀 Hemen Teklif Al
                      </span>
                    </button>

                    <p className="text-xs text-neutral-500 text-center">
                      Formu göndererek{" "}
                      <Link
                        href="/gizlilik-politikasi"
                        className="text-blue-600 hover:text-blue-700 underline"
                      >
                        gizlilik politikamızı
                      </Link>{" "}
                      kabul etmiş olursunuz.
                    </p>
                  </form>
                </div>
              
            </div>
          </div>
        </section>

        {/* Acil Destek */}
        <section className="py-20 bg-gradient-to-br from-neutral-900 to-blue-900/95">
          <div className="container max-w-4xl mx-auto px-4 text-center text-white">
            
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-12 border border-white/20">
                <h2 className="text-4xl md:text-5xl font-black mb-6">
                  Acil{" "}
                  <span className="gradient-text gradient-text--safe-xl">
                    Teknik Destek
                  </span>
                </h2>
                <p className="text-xl text-white/80 mb-8 leading-relaxed">
                  Mevcut etkinliğinizde teknik sorun mu yaşıyorsunuz?
                  <br />
                  7/24 acil destek hattımızdan hemen yardım alın.
                </p>

                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                  <a
                    href={`tel:${PHONE}`}
                    className="group bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                    aria-label="Acil teknik destek için hemen ara"
                  >
                    <span className="flex items-center justify-center gap-2">
                      🚨 Acil Destek Hattı
                    </span>
                  </a>

                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group bg-green-600 hover:bg-green-700 text-white font-bold px-8 py-4 rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 min-w-[200px] text-center"
                    aria-label="WhatsApp'tan acil destek iste (yeni sekmede açılır)"
                  >
                    <span className="flex items-center justify-center gap-2">
                      💬 WhatsApp Destek
                    </span>
                  </a>
                </div>

                <div className="mt-8 p-4 bg-yellow-500/20 rounded-xl border border-yellow-400/30 max-w-2xl mx-auto">
                  <p className="text-yellow-200 text-sm">
                    <strong>⏰ 7/24 Hizmet:</strong> Mevcut etkinliklerinizde
                    yaşadığınız teknik sorunlarda aynı gün içinde çözüm
                    sunuyoruz.
                  </p>
                </div>
              </div>
            
          </div>
        </section>

        {/* Mobil bar için ekstra boşluk (yapışmayı engeller) */}
        <div className="h-28 md:hidden" aria-hidden="true" />
      </div>

      {/* Mobile CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white shadow-2xl border-t py-4 flex justify-around md:hidden z-50">
        <a
          href={`tel:${PHONE}`}
          className="flex flex-col items-center text-blue-600 font-bold text-sm"
          aria-label="Sahneva'yı ara"
        >
          <span className="text-lg">📞</span>
          <span>Ara</span>
        </a>
        <a
          href={WHATSAPP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center text-green-600 font-bold text-sm"
          aria-label="WhatsApp üzerinden Sahneva'ya yaz (yeni sekmede açılır)"
        >
          <span className="text-lg">💬</span>
          <span>WhatsApp</span>
        </a>
        <a
          href="#teklif-formu"
          className="flex flex-col items-center text-purple-600 font-bold text-sm"
          aria-label="Teklif formuna git"
        >
          <span className="text-lg">📝</span>
          <span>Teklif Al</span>
        </a>
      </div>
    </div>
  );
}

/* ───── YARDIMCI BİLEŞENLER ───── */
function ContactCard({ icon, title, info, description, href, color, buttonText }) {
  const headingId = `iletisim-kart-${title.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, "-")}`;
  const descriptionId = `${headingId}-aciklama`;

  return (
    <article
      className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl border border-neutral-100 hover:border-blue-200 transition-all duration-500 hover:scale-105 text-center"
      role="listitem"
      aria-labelledby={headingId}
      aria-describedby={descriptionId}
    >
      <div className="text-5xl mb-4 gradient-text gradient-text--safe-xl" aria-hidden="true">
        {icon}
      </div>
      <h3
        id={headingId}
        className="text-xl font-black text-neutral-900 mb-3 group-hover:text-blue-600 transition-colors"
      >
        {title}
      </h3>
      <div className="text-2xl font-bold text-neutral-800 mb-2">{info}</div>
      <p id={descriptionId} className="text-neutral-600 mb-6 leading-relaxed">
        {description}
      </p>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-describedby={`${headingId} ${descriptionId}`}
        aria-label={`${title} – ${buttonText} (yeni sekmede açılır)`}
        className={`inline-flex items-center justify-center bg-gradient-to-r ${color} hover:shadow-xl text-white font-bold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg`}
      >
        <span className="flex items-center gap-2">{buttonText}</span>
      </a>
    </article>
  );
}

function InfoRow({ label, icon, children }) {
  const labelId = `${label.toLowerCase().replace(/[^a-z0-9çğıöşü]+/gi, "-")}-etiket`;

  return (
    <div className="flex items-center gap-4" role="listitem" aria-labelledby={labelId}>
      <div className="w-12 h-12 bg-neutral-100 rounded-xl flex items-center justify-center" aria-hidden="true">
        <span className="text-2xl">{icon}</span>
      </div>
      <div>
        <div id={labelId} className="font-semibold text-neutral-900">
          {label}
        </div>
        <div className="text-neutral-800">{children}</div>
      </div>
    </div>
  );
}
