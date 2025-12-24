// app/sss/page.js
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");

/* ——— META ——— */
export const metadata = {
  title: "Sık Sorulan Sorular",
  description:
    "Podyum, LED ekran, ses-ışık ve çadır kiralama; kurulum, elektrik, izinler ve fiyatlandırma hakkında detaylı SSS.",
  alternates: { canonical: `${SITE_URL}/sss` },
  openGraph: {
    title: "Sık Sorulan Sorular | Sahneva Organizasyon",
    description:
      "Sahne, podyum, LED ekran ve ses-ışık kiralama süreçleri hakkında sık sorulan sorular.",
    url: `${SITE_URL}/sss`,
    type: "website",
    siteName: "Sahneva Organizasyon",
    locale: "tr_TR",
    images: [
      {
        url: `${SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sık Sorulan Sorular | Sahneva Organizasyon",
    description:
      "Sahne, podyum, LED ekran ve ses-ışık kiralama süreçleri hakkında sık sorulan sorular.",
    images: [`${SITE_URL}/img/og/sahneva-og.webp`],
  },
};

/* ——— VERİ ——— */
const FAQ_CATEGORIES = [
  {
    id: "genel",
    icon: "🧭",
    title: "Genel & Koordinasyon",
    items: [
      {
        q: "Kurumsal etkinlik tecrübemiz var mı?",
        a: "Evet. Lansman, konferans, bayi toplantısı, miting ve konser gibi geniş yelpazede yüzlerce etkinlik deneyimimiz var.",
      },
      {
        q: "Ekipmanlarınız güncel mi? Bakımlar nasıl yapılır?",
        a: "Tüm ekipmanlar periyodik bakımdan geçirilir ve her iş öncesi fonksiyon testleri yapılır. Kritik cihazlarda yedekleme ile çalışırız.",
      },
      {
        q: "Etkinlik günü teknik ekip büyüklüğü nedir?",
        a: "Kapsama göre değişir. Küçük etkinliklerde 2–3 kişi, büyük kurulumlarda sahne, ses, ışık, görüntü ve kamera ekipleri dahil 10+ kişilik kadro görev alır.",
      },
      {
        q: "Keşif yapıyor musunuz? Ücretli mi?",
        a: "Gerekli görülen projelerde ücretsiz keşif yapıyoruz. Mekân ölçümü, elektrik erişimi ve yükleme–boşaltma koşulları yerinde değerlendirilir.",
      },
      {
        q: "Fiyatlandırma nasıl belirleniyor?",
        a: "Fiyat; ekipman kalemi, süre (kurulum + etkinlik + söküm), şehir ve lojistik, gerekli personel ve aksesuarlar üzerinden netleştirilir. İhtiyacınıza göre alternatif paketler sunuyoruz.",
      },
      {
        q: "Türkiye genelinde hizmet veriyor musunuz?",
        a: "Evet. İstanbul merkezli ekibimizle Türkiye’nin tamamında çalışıyoruz. Şehir dışı işler için sevkiyat ve konaklama planını teklif aşamasında şeffaf şekilde paylaşıyoruz.",
      },
      {
        q: "Rezervasyon ve iptal koşulları nedir?",
        a: "Rezervasyon avans ödemesi ile kesinleşir. İptallerde tarih yakınlığına göre üretim/lojistik maliyetleri kesilerek iade süreçleri sözleşmede tanımlanır.",
      },
      {
        q: "Etkinlik günü sorumlular kimler olur?",
        a: "Her projede bir saha sorumlusu bulunur. Ses, ışık, görüntü, sahne/rigging ve genel koordinasyon ayrı personeller tarafından yönetilir.",
      },
    ],
  },
  {
    id: "podyum",
    icon: "🪜",
    title: "Podyum Kiralama",
    items: [
      {
        q: "Podyum kurulumu ne kadar sürer?",
        a: "Standart 6×4 m modüler podyumun kurulumu ortalama 60–90 dakika sürer. Ölçü, zemin ve erişime göre süre değişebilir.",
      },
      {
        q: "Zemine zarar verir mi?",
        a: "Kaymaz kaplama ve kauçuk ayaklar sayesinde podyum zemine zarar vermez. İç/dış mekânda güvenle kullanılır.",
      },
      {
        q: "Yükseklik ve ölçü seçenekleri neler?",
        a: "Modüler sistemle 20–100 cm kademeli yükseklik; 1×2 m panellerle istenen ölçüde kurulum yapılır.",
      },
      {
        q: "Podyum güvenliği için hangi önlemler alınıyor?",
        a: "Korkuluk, rampa, merdiven ve yük hesapları standart güvenlik protokolüyle planlanır. Kenar–köşe kaplamaları ve sabitlemeler kurulumda uygulanır.",
      },
      {
        q: "Dış mekânda podyum kurulabilir mi?",
        a: "Evet. Zemin tesviyesi, rüzgâr ve yağış senaryolarına göre sabitleme/örtüleme uygulanır. Detaylar keşifte netleştirilir.",
      },
      {
        q: "Podyum üstü kaplama ve brandalama yapıyor musunuz?",
        a: "Siyah podyum eteği standarttır. Marka rengine uygun ön yüzey, logolu branda ve özel kaplama opsiyoneldir.",
      },
      {
        q: "Sahne ile podyum arasındaki fark nedir?",
        a: "Podyum; konuşmacı, ödül töreni ve defile gibi yükü nispeten düşük kurgular içindir. Sahne; truss/rigging, ışık/ekran asımı gibi ağır yükler ve yüksek platform gerektiren prodüksiyonlar için tercih edilir. Detaylar: /podyum-kiralama ve /sahne-kiralama.",
      },
      {
        q: "Podyum kiralamak için nasıl teklif alabilirim?",
        a: "İhtiyacınızı /podyum-kiralama sayfasından veya +90 545 304 8671 numarasından iletebilirsiniz. Keşif sonrası net ölçü ve fiyat paylaşırız.",
      },
    ],
  },
  {
    id: "led",
    icon: "📺",
    title: "LED Ekran",
    items: [
      {
        q: "Dış mekânda kullanılabilir mi?",
        a: "Evet. IP65 sınıfı paneller yağmur ve toza dayanıklıdır. Gündüz kullanımında yüksek parlaklık sağlanır.",
      },
      {
        q: "Hangi çözünürlükleri sunuyorsunuz?",
        a: "P2–P5 arası iç/dış mekân panellerimiz bulunur. İzleme mesafesi ve sahne genişliğine göre doğru pitch önerilir.",
      },
      {
        q: "İçerik yönetimini kim yapıyor?",
        a: "Video miksaj ve içerik geçişleri teknik ekibimiz tarafından canlı olarak yönetilir.",
      },
      {
        q: "Gündüz güneşte görünürlük nasıl sağlanıyor?",
        a: "Yüksek nit değerli paneller, uygun renk–kontrast kalibrasyonu ve doğru yerleşim ile gündüz net görünürlük elde edilir.",
      },
      {
        q: "Elektrik ihtiyacı nedir? Jeneratör gerekiyor mu?",
        a: "Ekran ölçüsü ve parlaklığa göre tek/üç faz enerji gereksinimi değişir. Şebekenin yetersiz olduğu açık alanlarda sessiz jeneratör öneririz.",
      },
      {
        q: "Ekran oranı ve içerik nasıl olmalı?",
        a: "16:9 ana ekran önerilir. Yan destek ekranlar ve sahne içi bantlar için içerik ayrı hazırlanır. Reji üzerinden çoklu kaynak mikslenir.",
      },
      {
        q: "Canlı yayın veya kamera girişi yapılabilir mi?",
        a: "Evet. SDI/HDMI kaynaklar miksere bağlanarak canlı kameralar, sunum ve videolar aynı anda yönetilir.",
      },
      {
        q: "Kurulum süresi ve teknik ekip desteği nasıl?",
        a: "Ölçüye göre 60–180 dakika arasında kurulum tamamlanır. Etkinlik boyunca LED operatörü ve reji ekibi sahada kalır.",
      },
      {
        q: "LED ekran kiralamada fiyatı etkileyen kalemler neler?",
        a: "Pitch, metrekare, iç/dış mekân, kurulum yüksekliği, reji–kamera ihtiyacı ve etkinlik süresi toplam maliyeti belirler.",
      },
    ],
  },
  {
    id: "ses-isik",
    icon: "🎤",
    title: "Ses & Işık Sistemleri",
    items: [
      {
        q: "Teknik ekip sağlıyor musunuz?",
        a: "Kurulum, test ve etkinlik boyunca operatörlerimiz sahada aktif görev alır; tüm süreç teknik ekip tarafından yönetilir.",
      },
      {
        q: "Mikrofon ve kayıt çözümleri var mı?",
        a: "Kablosuz el/yaka mikrofonları, çok kanallı miksaj ve çok izli kayıt çözümlerimiz mevcut. Simultane altyapı kurulabilir.",
      },
      {
        q: "Işık tasarımı yapıyor musunuz?",
        a: "LED PAR, spot, wash ve efekt armatürleriyle mekâna uygun ışık planı hazırlanır; DMX ile sahnelenir.",
      },
      {
        q: "Konferans için kaç mikrofon gerekir?",
        a: "Konuşmacı sayısı ve oturma düzenine göre el, yaka (lav), kürsü ve ortam mikrofonları kombine edilir.",
      },
      {
        q: "Küçük toplantı vs. açık hava konseri için ses sistemi nasıl ölçeklenir?",
        a: "Katılımcı sayısı, alan tipi ve akustik koşullara göre line-array, sub dağılımı ve delay hoparlör noktaları planlanır.",
      },
      {
        q: "Elektrik güvenliği ve kablo düzeni nasıl sağlanıyor?",
        a: "Tüm kablolar rampa ve bantla sabitlenir. Güç hatları kaçak akım rölesi ile korunur.",
      },
      {
        q: "Işıkta marka renklerine uygun sahneleme yapılabilir mi?",
        a: "Evet. Gobo, renk paleti ve akış senaryosu kurumsal kimliğe göre programlanır.",
      },
      {
        q: "DJ/orkestra ile çalışırken koordinasyon nasıl?",
        a: "Prova saatleri planlanır; reji, DJ ve ışık operatörü ortak cue list üzerinden ilerler.",
      },
    ],
  },
  {
    id: "cadir",
    icon: "🎪",
    title: "Çadır Kiralama",
    items: [
      {
        q: "Kurulum ve söküm hizmeti dâhil mi?",
        a: "Evet. Taşıma, kurulum ve söküm ekibimiz tarafından yapılır; güvenlik ankrajları ve ağırlıklandırma dâhildir.",
      },
      {
        q: "Boyut ve zemin koşulları nedir?",
        a: "Farklı açıklıklarda çadır seçenekleri vardır. Zemin beton, asfalt veya düz toprak olabilir; seviye şap ile dengelenir.",
      },
      {
        q: "Isıtma/soğutma ve aydınlatma sağlıyor musunuz?",
        a: "İsteğe bağlı klima/ısıtıcı ve genel aydınlatma sağlanır. Acil çıkış ve güvenlik şartları sağlanır.",
      },
      {
        q: "Rüzgârlı ve yağışlı havalarda çadır güvenli mi?",
        a: "Doğru ankraj, ağırlıklandırma, gergi ve yan kapamalarla rüzgâr–yağış senaryolarına dayanım sağlanır.",
      },
      {
        q: "Zemin kaplama ve yürüyüş yolu yapılır mı?",
        a: "Evet. Modüler platform, halı kaplama ve rampalı erişim seçenekleri sunuyoruz.",
      },
      {
        q: "Kiralama süresi uzatılabilir mi?",
        a: "Müsaitliğe bağlı olarak süre uzatılabilir. Ek gün ücretleri sözleşmede belirtilir.",
      },
    ],
  },
  {
    id: "sozlesme",
    icon: "🧾",
    title: "Sözleşme & Ödeme",
    items: [
      {
        q: "Keşif ve fiyatlandırma nasıl ilerler?",
        a: "İhtiyaçlar alındıktan sonra gerekirse ücretsiz keşif yapılır; net fiyat ve zaman planı sunulur.",
      },
      {
        q: "Teslimat bölgeleri ve zamanlama?",
        a: "Türkiye genelinde çalışıyoruz. İstanbul içi aynı gün kurulum mümkün; şehir dışına planlı sevkiyat yapılır.",
      },
      {
        q: "Faturalandırma ve sözleşme süreçleri?",
        a: "Tüm işler sözleşmeli ve e-faturalıdır. Rezervasyon, avans ve teslim tutanakları ile süreç tamamlanır.",
      },
      {
        q: "Ödeme yöntemleri ve vadeler nedir?",
        a: "E-fatura, havale/EFT ve kurumsal sözleşmelerde tanımlı vade seçenekleri sunulur.",
      },
      {
        q: "Sigorta ve sorumluluk kapsamı nedir?",
        a: "Saha güvenliği ve ekipman kullanımı Sahneva prosedürlerine uygun yapılır.",
      },
    ],
  },
];

/* ——— YARDIMCI ——— */
function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function stripTags(s = "") {
  return s.replace(/<[^>]+>/g, "");
}
function injectLinks(text) {
  const pairs = [
    { key: "podyum", href: "/podyum-kiralama" },
    { key: "LED ekran", href: "/led-ekran-kiralama" },
    { key: "ses–ışık", href: "/ses-isik-sistemleri" },
    { key: "ses-ışık", href: "/ses-isik-sistemleri" },
    { key: "sahne", href: "/sahne-kiralama" },
    { key: "çadır", href: "/cadir-kiralama" },
    { key: "teklif", href: "/iletisim" },
  ];
  let html = text;
  for (const { key, href } of pairs) {
    const re = new RegExp(`(${escapeRegex(key)})`, "gi");
    html = html.replace(
      re,
      `<a href="${href}" class="underline hover:no-underline font-medium">$1</a>`
    );
  }
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}

/* ——— BİLEŞENLER ——— */
function CategoryChips() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mb-8">
      {FAQ_CATEGORIES.map((c) => (
        <a key={c.id} href={`#${c.id}`} className="faq-chip px-3 py-2 rounded-full text-sm">
          <span className="mr-1">{c.icon}</span>
          {c.title}
        </a>
      ))}
    </div>
  );
}

function FaqSection({ id, icon, title, items }) {
  return (
    <section id={id} className="scroll-mt-28 mb-8 rounded-2xl faq-glass p-5 md:p-7">
      
        <h2 className="flex items-center gap-2 text-xl md:text-2xl font-bold mb-5">
          <span className="text-lg md:text-xl">{icon}</span>
          {title}
        </h2>
      

      
        <div className="space-y-3">
          {items.map((it) => (

              <details key={it.q} className="faq-card group rounded-xl bg-white p-4">
                <summary
                  className="cursor-pointer select-none list-none font-semibold leading-7 flex items-center justify-between"
                  role="button"
                >
                  <span className="pr-3">{it.q}</span>
                  <svg
                    className="ml-2 h-5 w-5 text-slate-500 transition-transform group-open:rotate-90"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M8 4l8 8-8 8" />
                  </svg>
                </summary>
                <div className="faq-anim mt-3 text-neutral/90 leading-relaxed">
                  {injectLinks(it.a)}
                </div>
              </details>
            
          ))}
        </div>
      
    </section>
  );
}

/* ——— SAYFA ——— */
export default function FaqPage() {
  const mainEntity = [];
  for (const category of FAQ_CATEGORIES) {
    for (const item of category.items) {
      mainEntity.push({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: { "@type": "Answer", text: stripTags(item.a) },
      });
    }
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": "https://www.sahneva.com/sss#faq",
    inLanguage: "tr-TR",
    mainEntity,
  };
  const baseUrl = SITE_URL;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "SSS", url: `${baseUrl}/sss` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      {/* JSON-LD – SSR ile direkt HTML içinde */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="container py-10 md:py-14">
        
          <h1 className="text-3xl md:text-[34px] font-extrabold tracking-tight text-center mb-6">
            Sık Sorulan Sorular
          </h1>
        

        
          <CategoryChips />
        

        <div className="space-y-6">
          {FAQ_CATEGORIES.map((c) => (
            <FaqSection key={c.id} {...c} />
          ))}
        </div>

        
          <div className="mt-10 md:mt-12 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="tel:+905453048671"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 font-semibold text-white hover:opacity-95"
            >
              📞 Hemen Teklif Al
            </a>
            <a
              href="https://wa.me/905453048671"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border px-4 py-2 font-semibold hover:bg-neutral-50"
              aria-label="WhatsApp’tan Sor — yeni sekmede açılır"
            >
              💬 WhatsApp’tan Sor
            </a>
          </div>
        
      </div>
    </>
  );
}
