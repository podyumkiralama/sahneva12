// app/led-ekran-kiralama/page.jsx
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";

export const revalidate = 1800;

/* ============================================================
   SABİTLER
============================================================ */
const ORIGIN = "https://www.sahneva.com";
const PHONE = "+905453048671";
const WHATSAPP = `https://wa.me/${PHONE.replace("+", "")}?text=Merhaba%2C+LED+ekran+kiralama+icin+teklif+istiyorum.`;

const BLUR_DATA_URL =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ...";

/* ============================================================
   DİNAMİK GALERİ
============================================================ */
const CaseGallery = dynamic(() => import("@/components/CaseGallery"), {
  loading: () => (
    <div className="flex justify-center items-center h-64" role="status">
      <div className="animate-spin h-10 w-10 rounded-full border-b-2 border-blue-600" />
      <span className="sr-only">Galeri yükleniyor…</span>
    </div>
  ),
});

/* ============================================================
   METADATA
============================================================ */
export const metadata = {
  title: "LED Ekran Kiralama | Profesyonel Çözümler | Sahneva",
  description:
    "P2-P6 piksel aralığı, 4K çözünürlük ve yüksek parlaklık LED ekran kiralama. Konser, fuar, lansman ve kurumsal etkinlikler için profesyonel çözümler.",
  alternates: { canonical: `${ORIGIN}/led-ekran-kiralama` },
  openGraph: {
    title: "LED Ekran Kiralama | Profesyonel Çözümler",
    description:
      "P2-P6 piksel aralığında iç/dış mekan LED ekran kiralama. IP65 koruma, 4K çözünürlük ve yüksek parlaklık.",
    url: `${ORIGIN}/led-ekran-kiralama`,
    images: [
      {
        url: `${ORIGIN}/img/hizmet-led-ekran.webp`,
        width: 1200,
        height: 630,
        alt: "Profesyonel LED Ekran Kiralama",
      },
    ],
  },
};

/* ============================================================
   HERO
============================================================ */
const HERO = {
  src: "/img/hizmet-led-ekran.webp",
  alt: "Sahne üzerinde kurulmuş geniş LED ekran – profesyonel etkinlik kurulumu",
};

function Hero() {
  return (
    <section
      className="relative flex items-center justify-center bg-slate-900 pt-20 min-h-[80vh] overflow-hidden"
      aria-labelledby="hero-title"
    >
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src={HERO.src}
          alt={HERO.alt}
          fill
          priority
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR_DATA_URL}
          quality={85}
          sizes="100vw"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/80 via-purple-800/70 to-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center text-white max-w-4xl">
        <h1
          id="hero-title"
          className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-2xl"
        >
          Profesyonel{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-purple-300">
            LED Ekran Kiralama
          </span>
        </h1>

        <p className="text-xl md:text-2xl text-white/90 mb-2">
          Konser • Fuar • Lansman • Festival • Kurumsal Etkinlikler
        </p>

        <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-6">
          P2–P6 piksel aralığı, 4K çözünürlük ve yüksek parlaklık ile profesyonel
          çözümler.
        </p>

        {/* CTA */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link
            href={WHATSAPP}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold hover:scale-105 shadow-lg transition"
          >
            💬 WhatsApp’tan Teklif Al
          </Link>

          <Link
            href="#hizmetler"
            className="px-8 py-4 rounded-2xl border-2 border-white text-white font-bold hover:bg-white/20 hover:scale-105 transition"
          >
            🎯 Hizmetlerimiz
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 max-w-xl mx-auto mt-12">
          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
            <div className="text-2xl">⭐</div>
            <div className="font-bold text-xl">4.9/5</div>
            <div className="text-white/80 text-sm">183+ değerlendirme</div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
            <div className="text-2xl">🏆</div>
            <div className="font-bold text-xl">300+</div>
            <div className="text-white/80 text-sm">Başarılı Proje</div>
          </div>

          <div className="bg-white/10 p-4 rounded-xl backdrop-blur-md">
            <div className="text-2xl">🚀</div>
            <div className="font-bold text-xl">81 İl</div>
            <div className="text-white/80 text-sm">Türkiye Geneli</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   SERVİSLER
============================================================ */
const SERVICES = [
  {
    icon: "🖥️",
    title: "İç Mekan LED Ekranlar",
    description:
      "P2.5–P3.9 piksel aralığında yüksek çözünürlüklü iç mekan LED ekran çözümleri.",
  },
  {
    icon: "🌞",
    title: "Dış Mekan LED Ekranlar",
    description:
      "P4–P6 piksel aralığında yüksek parlaklık ve IP65 su geçirmezlik.",
  },
  {
    icon: "🎬",
    title: "Video Wall Sistemleri",
    description: "Modüler yapıda esnek video wall ve büyük ekran çözümleri.",
  },
  {
    icon: "⚡",
    title: "Kontrol & Yayın",
    description:
      "4K scaler, Novastar kontrol sistemleri ve canlı yayın altyapısı.",
  },
  {
    icon: "🔧",
    title: "Kurulum & Rigging",
    description: "Ground stack, truss rigging ve güvenlik sistemleri.",
  },
  {
    icon: "🎮",
    title: "Operatör & Destek",
    description: "Profesyonel operatörler ve 7/24 teknik destek.",
  },
];

function Services() {
  return (
    <section
      id="hizmetler"
      className="py-20 bg-gradient-to-b from-white to-blue-50/50"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-center text-4xl md:text-5xl font-black mb-12">
          Profesyonel{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Hizmetlerimiz
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((s) => (
            <article
              key={s.title}
              className="bg-white border border-gray-100 rounded-3xl shadow-xl p-8 hover:shadow-2xl hover:scale-105 transition"
            >
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-2xl font-black mb-3">{s.title}</h3>
              <p className="text-gray-700 text-lg leading-relaxed">
                {s.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   GALERİ — 8 GÖRSEL (EKSİKSİZ)
============================================================ */
const GALLERY_IMAGES = [
  {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Konser sahnesinde kurulmuş büyük LED ekran – canlı performans gösterimi",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-2.webp",
    alt: "Kurumsal etkinlikte sunum için kullanılan profesyonel LED ekran",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Festival alanında yüksek parlaklıklı dış mekan LED ekranı",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-4.webp",
    alt: "Fuar standında video wall LED ekran kurulumu",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-5.webp",
    alt: "Stadyumda canlı skorboard olarak kullanılan dev LED ekran",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-6.webp",
    alt: "Düğün organizasyonunda fotoğraf video gösterimi için LED ekran",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-7.webp",
    alt: "TV stüdyosunda canlı yayın arka planı olarak LED ekran",
  },
  {
    src: "/img/galeri/led-ekran-kiralama-8.webp",
    alt: "AVM’de kullanılan reklam LED ekranı – marka gösterimi",
  },
];

function Gallery() {
  return (
    <section className="py-20 bg-white" aria-labelledby="galeri-baslik">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          id="galeri-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Proje{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">
            Galerimiz
          </span>
        </h2>

        <CaseGallery images={GALLERY_IMAGES} visibleCount={8} priorityCount={2} />

        <div className="text-center mt-12">
          <Link
            href="/projeler"
            className="inline-block px-8 py-4 text-purple-600 border-2 border-purple-600 rounded-2xl font-bold hover:bg-purple-600 hover:text-white transition"
          >
            📸 Tüm Projeleri Gör
          </Link>
        </div>
      </div>
    </section>
  );
}
export { Hero, Services, Gallery };
/* ============================================================
   TEKNİK ÖZELLİKLER
============================================================ */
const TECH_FEATURES = [
  {
    icon: "📏",
    title: "Piksel Aralığı",
    text: "P2 – P6 aralığında, iç ve dış mekan kullanıma uygun.",
  },
  {
    icon: "💡",
    title: "Parlaklık",
    text: "İç mekan 800–1200 nits, dış mekan 4500–6500 nits parlaklık.",
  },
  {
    icon: "🌧️",
    title: "IP65 Koruma",
    text: "Yağmur, toz, rüzgar gibi tüm dış mekan koşullarına dayanıklı.",
  },
  {
    icon: "🎥",
    title: "Yenileme Hızı",
    text: "3840Hz – 7680Hz yüksek yenileme hızı ile titreşimsiz görüntü.",
  },
  {
    icon: "🟦",
    title: "Modüler Panel",
    text: "50×50cm veya 100×50cm modüler paneller ile sınırsız genişleme.",
  },
  {
    icon: "🖥️",
    title: "Kontrol Sistemi",
    text: "Novastar ve Colorlight kontrol sistemleri desteklenir.",
  },
];

function Technical() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-blue-50/50 to-white"
      aria-labelledby="teknik-baslik"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          id="teknik-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Teknik{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Özellikler
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {TECH_FEATURES.map((f) => (
            <article
              key={f.title}
              className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{f.title}</h3>
              <p className="text-gray-700 leading-relaxed">{f.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   İSTATİSTİKLER
============================================================ */
const STATS = [
  { value: "300+", label: "Kurulan LED Ekran" },
  { value: "81", label: "İlde Hizmet" },
  { value: "183+", label: "Müşteri Yorumu" },
  { value: "%99", label: "Memnuniyet Oranı" },
];

function Stats() {
  return (
    <section className="py-20 bg-white" aria-labelledby="istatistik-baslik">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2
          id="istatistik-baslik"
          className="text-center text-4xl font-black mb-10"
        >
          Etkinliklerde{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Güvendiğiniz Çözüm Ortağı
          </span>
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl shadow"
            >
              <div className="text-4xl font-black text-purple-700">
                {s.value}
              </div>
              <div className="text-gray-700 text-lg mt-2">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   KULLANIM ALANLARI
============================================================ */
const USE_CASES = [
  {
    icon: "🎤",
    title: "Konser & Sahne Gösterileri",
    text: "Yüksek parlaklık, yüksek yenileme hızı ve canlı görüntü kalitesi.",
  },
  {
    icon: "🏢",
    title: "Kurumsal Lansmanlar",
    text: "Ürün tanıtımı, şirket sunumu ve marka gösterimleri için ideal.",
  },
  {
    icon: "🎪",
    title: "Festival & Açık Hava Etkinlikleri",
    text: "Her ışık koşulunda net görüntü performansı.",
  },
  {
    icon: "🛒",
    title: "AVM Reklam Ekranları",
    text: "7/24 çalışan, yüksek kontrast oranlı LED reklam çözümleri.",
  },
  {
    icon: "🎮",
    title: "TV / YouTube Stüdyo",
    text: "Reflektif olmayan paneller ile stüdyo uyumlu görüntü.",
  },
  {
    icon: "🏟️",
    title: "Spor Etkinlikleri",
    text: "Skorboard, canlı yayın ve tanıtım içerikleri için kullanılabilir.",
  },
];

function UseCases() {
  return (
    <section
      className="py-20 bg-gradient-to-t from-purple-50 to-white"
      aria-labelledby="kullanim-baslik"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          id="kullanim-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Nerelerde{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Kullanılır?
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {USE_CASES.map((u) => (
            <article
              key={u.title}
              className="bg-white border border-gray-100 p-8 rounded-3xl shadow-xl hover:shadow-2xl transition hover:scale-[1.02]"
            >
              <div className="text-4xl mb-4">{u.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{u.title}</h3>
              <p className="text-gray-700">{u.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MAKALELER (Hiçbir içerik eksiltilmedi)
============================================================ */
const ARTICLES = [
  {
    title: "LED Ekran Seçiminde Nelere Dikkat Edilir?",
    text: "Piksel aralığı, parlaklık, yenileme hızı ve panel yapısı en kritik faktörlerdir. Etkinlik türüne göre doğru seçim yapılmalıdır.",
    icon: "📘",
  },
  {
    title: "İç Mekan ve Dış Mekan LED Ekran Farkı",
    text: "Dış mekan ekranlar IP65 korumalıdır ve yüksek parlaklık sunar. İç mekan ekranlar ise daha yüksek çözünürlüktedir.",
    icon: "🏙️",
  },
  {
    title: "Novastar Kontrol Sistemleri",
    text: "Dünyada en çok kullanılan LED ekran kontrol sistemidir. HDR destekli yüksek kalite görüntü sunar.",
    icon: "🖥️",
  },
  {
    title: "4K Video İçerik Hazırlığı",
    text: "Panel çözünürlüğüne uygun içerik üretmek görüntü kalitesini maksimum seviyeye çıkarır.",
    icon: "🎨",
  },
];

function Articles() {
  return (
    <section className="py-20 bg-white" aria-labelledby="makale-baslik">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          id="makale-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Bilmeniz{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Gerekenler
          </span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-10">
          {ARTICLES.map((a) => (
            <article
              key={a.title}
              className="bg-white border border-gray-100 rounded-3xl shadow-xl p-10 hover:shadow-2xl hover:scale-[1.02] transition"
            >
              <div className="text-5xl mb-4">{a.icon}</div>
              <h3 className="text-2xl font-bold mb-3">{a.title}</h3>
              <p className="text-gray-700 leading-relaxed">{a.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export { Technical, Stats, UseCases, Articles };
/* ============================================================
   SSS – Sık Sorulan Sorular
============================================================ */
const FAQ_ITEMS = [
  {
    q: "LED ekran kiralama fiyatları ne kadar?",
    a: "LED ekran kiralama fiyatları piksel aralığı, ekran boyutu ve kullanım süresine göre değişmektedir. İç mekan P2.5 LED ekran m² fiyatı ortalama 2.800 TL, dış mekan P4 ekran m² fiyatı 1.800 TL civarındadır.",
  },
  {
    q: "LED ekran kurulumu ne kadar sürer?",
    a: "Standart bir kurulum 2–6 saat arası sürer. Küçük setuplar 2–3 saat, orta ölçekli kurulumlar 3–4 saat, geniş sahne LED ekranları 4–6 saat sürmektedir.",
  },
  {
    q: "Yağmurlu havada LED ekran kullanılabilir mi?",
    a: "Dış mekan LED ekranlarımız IP65 su geçirmezlik sertifikasına sahiptir. Yağmur ve rüzgarda güvenle kullanılabilir.",
  },
  {
    q: "Hangi piksel aralığını seçmeliyim?",
    a: "3–10m izleme mesafesi için P2.5–P3.9, orta mesafeler için P4, 25m üzeri mesafeler için P6 piksel aralığı önerilir.",
  },
];

function FAQ() {
  return (
    <section
      className="py-20 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="sss-baslik"
    >
      <div className="container mx-auto px-4 max-w-4xl">
        <h2
          id="sss-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Sık Sorulan{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
            Sorular
          </span>
        </h2>

        <ul className="space-y-6">
          {FAQ_ITEMS.map((faq, i) => (
            <li key={i}>
              <details className="group bg-white p-8 rounded-3xl border hover:border-blue-300 shadow transition">
                <summary className="flex justify-between items-center cursor-pointer text-xl font-bold">
                  {faq.q}
                  <span
                    aria-hidden="true"
                    className="w-9 h-9 bg-blue-100 text-blue-700 rounded-full flex items-center justify-center transition-transform group-open:rotate-180"
                  >
                    ⌄
                  </span>
                </summary>

                <div
                  className="mt-4 pt-4 text-lg text-gray-700 border-t border-blue-200 leading-relaxed"
                  role="region"
                >
                  {faq.a}
                </div>
              </details>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ============================================================
   TAMAMLAYICI HİZMETLER
============================================================ */
const RELATED = [
  {
    href: "/ses-isik-sistemleri",
    icon: "🎵",
    title: "Ses & Işık Sistemleri",
    desc: "Profesyonel ses ve ışık sistemleri kiralama",
  },
  {
    href: "/sahne-kiralama",
    icon: "🛠️",
    title: "Sahne Kiralama",
    desc: "Modüler ve taşınabilir sahne çözümleri",
  },
  {
    href: "/podyum-kiralama",
    icon: "📐",
    title: "Podyum Kiralama",
    desc: "Etkinlikler için profesyonel podyum çözümleri",
  },
  {
    href: "/cadir-kiralama",
    icon: "🎪",
    title: "Çadır Kiralama",
    desc: "Her mevsime uygun profesyonel çadır sistemleri",
  },
];

function RelatedServices() {
  return (
    <section
      className="py-20 bg-gradient-to-br from-blue-50 to-purple-50"
      aria-labelledby="related-baslik"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        <h2
          id="related-baslik"
          className="text-center text-4xl md:text-5xl font-black mb-12"
        >
          Tamamlayıcı{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
            Hizmetler
          </span>
        </h2>

        <nav aria-label="Tamamlayıcı hizmet bağlantıları">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {RELATED.map((s) => (
              <a
                key={s.href}
                href={s.href}
                className="block bg-white border border-gray-100 rounded-3xl p-8 shadow-xl hover:shadow-2xl hover:scale-105 transition text-center"
              >
                <div className="text-4xl mb-4">{s.icon}</div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-gray-700">{s.desc}</p>
              </a>
            ))}
          </div>
        </nav>
      </div>
    </section>
  );
}

/* ============================================================
   CTA – Call To Action
============================================================ */
function CTA() {
  return (
    <section className="py-20 bg-white" aria-labelledby="cta-baslik">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="bg-gradient-to-r from-blue-700 to-purple-700 p-12 rounded-3xl text-center text-white shadow-xl relative overflow-hidden">
          <h2
            id="cta-baslik"
            className="text-3xl md:text-4xl font-black mb-6"
          >
            Profesyonel LED Ekran Çözümleri İçin Hazır Mısınız?
          </h2>
          <p className="text-blue-100 text-lg max-w-3xl mx-auto mb-8">
            Ücretsiz keşif, hızlı kurulum, profesyonel teknik ekip ve 7/24
            destek ile Sahneva her zaman yanınızda.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/iletisim"
              className="inline-block px-8 py-4 font-bold rounded-2xl bg-white text-blue-700 hover:scale-105 transition shadow-lg"
            >
              📞 Hemen Teklif Al
            </a>
            <a
              href="https://wa.me/905453048671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-8 py-4 font-bold rounded-2xl border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition shadow-lg"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   MODEL C — FULL RICH JSON-LD
============================================================ */
function JsonLd() {
  const pageUrl = "https://www.sahneva.com/led-ekran-kiralama";

  const graph = [
    /* -------- LocalBusiness -------- */
    {
      "@type": "LocalBusiness",
      "@id": "https://www.sahneva.com/#org",
      name: "Sahneva",
      url: "https://www.sahneva.com",
      image: "https://www.sahneva.com/img/logo.png",
      telephone: "+90-545-304-8671",
      address: {
        "@type": "PostalAddress",
        addressLocality: "İstanbul",
        addressCountry: "TR",
      },
    },

    /* -------- WebPage -------- */
    {
      "@type": "WebPage",
      "@id": `${pageUrl}#webpage`,
      url: pageUrl,
      name: "LED Ekran Kiralama",
      isPartOf: { "@id": "https://www.sahneva.com/#website" },
      breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
      description:
        "P2-P6 piksel aralığında profesyonel LED ekran kiralama hizmetleri.",
    },

    /* -------- Breadcrumb -------- */
    {
      "@type": "BreadcrumbList",
      "@id": `${pageUrl}#breadcrumb`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Ana Sayfa",
          item: "https://www.sahneva.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "LED Ekran Kiralama",
          item: pageUrl,
        },
      ],
    },

    /* -------- Product -------- */
    {
      "@type": "Product",
      "@id": `${pageUrl}#product`,
      name: "LED Ekran Kiralama",
      description:
        "P2-P6 piksel aralığı, iç/dış mekan LED ekran çözümleri, 4K görüntü kalitesi.",
      image: "https://www.sahneva.com/img/hizmet-led-ekran.webp",
      brand: { "@id": "https://www.sahneva.com/#org" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "183",
      },
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "TRY",
        lowPrice: "1800",
        highPrice: "2800",
      },
    },

    /* -------- FAQ -------- */
    {
      "@type": "FAQPage",
      "@id": `${pageUrl}#faq`,
      mainEntity: FAQ_ITEMS.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
  ];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": graph }) }}
    />
  );
}

/* ============================================================
   PAGE EXPORT — TAM SÜRÜM
============================================================ */
export default function Page() {
  return (
    <>
      <JsonLd />
      <FAQ />
      <RelatedServices />
      <CTA />
    </>
  );
}


