// app/gizlilik-politikasi/page.jsx
import Link from "next/link";
import Script from "next/script";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 1800;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");
const PHONE = "+905453048671";
const MAIL = "info@sahneva.com";

export const metadata = {
  title: "Gizlilik Politikası | KVKK ve GDPR Uyumlu",
  description:
    "Sahneva olarak kişisel verilerinizi KVKK ve GDPR kapsamında güvenli şekilde işliyor, saklıyor ve koruyoruz. Gizlilik politikamızı bu sayfadan inceleyebilirsiniz.",
  alternates: {
    canonical: `${SITE_URL}/gizlilik-politikasi`,
    languages: {
      "tr-TR": `${SITE_URL}/gizlilik-politikasi`,
      "x-default": `${SITE_URL}/gizlilik-politikasi`,
    },
  },
  openGraph: {
    title: "Gizlilik Politikası | Sahneva Organizasyon",
    description:
      "Sahneva Organizasyon’un KVKK ve GDPR uyumlu gizlilik politikası, çerez kullanımı ve veri işleme süreçleri.",
    url: `${SITE_URL}/gizlilik-politikasi`,
    siteName: "Sahneva Organizasyon",
    type: "article",
    images: [
      {
        url: `${SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Gizlilik Politikası",
    url: `${SITE_URL}/gizlilik-politikasi`,
    description:
      "Sahneva Organizasyon’un KVKK ve GDPR uyumlu gizlilik politikası, çerez kullanımı ve veri işleme süreçleri.",
    inLanguage: "tr-TR",
    image: `${SITE_URL}/img/og/sahneva-og.webp`,
    isPartOf: {
      "@type": "WebSite",
      name: "Sahneva",
      url: SITE_URL,
    },
  };
  const baseUrl = SITE_URL;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Gizlilik Politikası", url: `${baseUrl}/gizlilik-politikasi` },
  ];

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      {/* JSON-LD */}
      <Script id="ld-json-privacy" type="application/ld+json" strategy="afterInteractive">
        {JSON.stringify(jsonLd)}
      </Script>

      <div className="bg-slate-950 text-slate-50">
        {/* Hero / Başlık */}
        <section className="relative border-b border-white/5 bg-gradient-to-b from-purple-900/40 via-slate-950 to-slate-950">
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-purple-500/30 blur-3xl" />
          </div>

          <div className="relative mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
            {/* Breadcrumb */}
            <nav className="mb-6 text-sm text-slate-400" aria-label="Sayfa konumu">
              <ol className="flex flex-wrap items-center gap-1">
                <li>
                  <Link
                    href="/"
                    className="transition-colors hover:text-slate-100 focus-ring rounded-md px-1 -mx-1"
                  >
                    Ana Sayfa
                  </Link>
                </li>
                <li aria-hidden="true" className="px-1">
                  /
                </li>
                <li className="text-slate-300">Gizlilik Politikası</li>
              </ol>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.1fr)] items-start">
              <div>
                <h1 className="text-3xl font-bold tracking-tight text-slate-50 sm:text-4xl lg:text-5xl">
                  Gizlilik Politikası
                </h1>
                <p className="mt-4 max-w-2xl text-base sm:text-lg text-slate-300">
                  Sahneva olarak; sahne, podyum, LED ekran, ses ve ışık sistemleri hizmetlerimiz sırasında
                  kişisel verilerinizin gizliliğine en üst düzeyde önem veriyoruz. Bu sayfada, verilerinizin
                  nasıl toplandığını, işlendiğini ve korunduğunu bulabilirsiniz.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  <span className="inline-flex items-center rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                    KVKK & GDPR uyumlu
                  </span>
                  <span className="inline-flex items-center rounded-full border border-purple-400/30 bg-purple-500/10 px-3 py-1 text-xs font-medium text-purple-100">
                    Güvenli iletişim (HTTPS)
                  </span>
                  <span className="inline-flex items-center rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-100">
                    Çerez yönetimi
                  </span>
                </div>
              </div>

              {/* Özet / Hızlı Bilgi Kartı */}
              <aside
                aria-label="Gizlilik özeti"
                className="rounded-3xl border border-white/10 bg-slate-900/60 p-5 shadow-xl shadow-purple-900/20 backdrop-blur"
              >
                <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-300">
                  Kısa Özet
                </h2>
                <p className="mt-3 text-sm text-slate-300">
                  Verilerinizi yalnızca hizmet sunmak, teklif hazırlamak ve siteyi iyileştirmek için
                  kullanıyoruz. Verileriniz hiçbir şekilde üçüncü kişilere satılmaz.
                </p>
                <dl className="mt-4 space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-400">Veri sorumlusu</dt>
                    <dd className="text-slate-100">Sahneva Organizasyon</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-400">E-posta</dt>
                    <dd>
                      <a
                        href={`mailto:${MAIL}`}
                        className="text-sky-300 underline-offset-2 hover:underline"
                      >
                        {MAIL}
                      </a>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-400">Telefon</dt>
                    <dd>
                      <a
                        href={`tel:${PHONE}`}
                        className="text-sky-300 underline-offset-2 hover:underline"
                      >
                        0 (545) 304 86 71
                      </a>
                    </dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-slate-400">Son güncelleme</dt>
                    <dd className="text-slate-100">2025</dd>
                  </div>
                </dl>
              </aside>
            </div>
          </div>
        </section>

        {/* İçerik + TOC */}
        <section className="relative mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
          <div className="grid gap-10 lg:grid-cols-[260px,minmax(0,1fr)]">
            {/* TOC */}
            <aside className="hidden lg:block">
              <nav
                aria-label="Sayfa içi menü"
                className="sticky top-24 rounded-2xl border border-white/10 bg-slate-900/70 p-4 text-sm text-slate-300 backdrop-blur"
              >
                <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Bu sayfada
                </p>
                <ul className="space-y-2">
                  <li>
                    <a href="#toplanan-veriler" className="hover:text-sky-300">
                      1. Toplanan Veriler
                    </a>
                  </li>
                  <li>
                    <a href="#isleme-amaclari" className="hover:text-sky-300">
                      2. İşleme Amaçları
                    </a>
                  </li>
                  <li>
                    <a href="#hukuki-dayanak" className="hover:text-sky-300">
                      3. Hukuki Dayanak
                    </a>
                  </li>
                  <li>
                    <a href="#saklama-sureleri" className="hover:text-sky-300">
                      4. Saklama Süreleri
                    </a>
                  </li>
                  <li>
                    <a href="#veri-aktarimi" className="hover:text-sky-300">
                      5. Veri Aktarımı
                    </a>
                  </li>
                  <li>
                    <a href="#haklariniz" className="hover:text-sky-300">
                      6. Haklarınız
                    </a>
                  </li>
                  <li>
                    <a href="#guvenlik" className="hover:text-sky-300">
                      7. Veri Güvenliği
                    </a>
                  </li>
                  <li>
                    <a href="#cerezler" className="hover:text-sky-300">
                      8. Çerezler
                    </a>
                  </li>
                  <li>
                    <a href="#degisiklikler" className="hover:text-sky-300">
                      9. Değişiklikler
                    </a>
                  </li>
                  <li>
                    <a href="#iletisim" className="hover:text-sky-300">
                      10. İletişim
                    </a>
                  </li>
                </ul>
              </nav>
            </aside>

            {/* İçerik */}
            <div className="space-y-10 text-sm leading-relaxed text-slate-200">
              {/* 1. Toplanan Veriler */}
              <section id="toplanan-veriler" aria-labelledby="toplanan-veriler-baslik">
                <h2
                  id="toplanan-veriler-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  1. Topladığımız Veriler
                </h2>
                <p className="mt-3">
                  Sahneva olarak hizmetlerimizi sunarken, sizinle kurduğumuz iletişim ve yasal
                  yükümlülüklerimiz kapsamında bazı kişisel verilerinizi işleyebiliriz.
                </p>
                <h3 className="mt-4 text-base font-semibold text-slate-50">
                  1.1. Kullanıcı Tarafından Sağlanan Veriler
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Teklif ve iletişim formlarında paylaşılan bilgiler</li>
                  <li>Ad, soyad, telefon numarası, e-posta adresi</li>
                  <li>Firma unvanı, görev bilgisi (paylaşıldıysa)</li>
                  <li>Etkinlik türü, tarih, lokasyon gibi proje detayları</li>
                  <li>WhatsApp veya telefon yoluyla ilettiğiniz bilgiler</li>
                </ul>

                <h3 className="mt-4 text-base font-semibold text-slate-50">
                  1.2. Otomatik Olarak Toplanan Veriler
                </h3>
                <p className="mt-2">
                  Siteyi ziyaret ettiğinizde bazı veriler otomatik olarak toplanır ve anonim
                  istatistikler üretmek için kullanılır:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>IP adresi (anonimleştirilmiş olarak)</li>
                  <li>Tarayıcı türü, işletim sistemi, cihaz türü</li>
                  <li>Ziyaret edilen sayfalar, tıklanan bağlantılar</li>
                  <li>Oturum süresi, sayfada kalma süresi</li>
                  <li>Çerez (cookie) verileri ve GA4 analitik verileri</li>
                </ul>
              </section>

              {/* 2. İşleme Amaçları */}
              <section id="isleme-amaclari" aria-labelledby="isleme-amaclari-baslik">
                <h2
                  id="isleme-amaclari-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  2. Kişisel Verilerin İşlenme Amaçları
                </h2>
                <p className="mt-3">
                  Toplanan kişisel verileriniz aşağıdaki amaçlarla KVKK ve ilgili mevzuata uygun
                  olarak işlenmektedir:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Hizmetlerimiz hakkında size bilgi vermek ve teklif oluşturmak</li>
                  <li>
                    Podyum, sahne, LED ekran, ses ve ışık sistemleri kiralama taleplerinizi
                    değerlendirmek
                  </li>
                  <li>Müşteri memnuniyetini ölçmek ve iyileştirme çalışmaları yapmak</li>
                  <li>Site performansını, kullanıcı deneyimini ve içerikleri optimize etmek</li>
                  <li>
                    Güvenlik, dolandırıcılık önleme ve kötüye kullanımın tespiti gibi teknik ve
                    hukuki denetimler yürütmek
                  </li>
                  <li>
                    Rızanız bulunması halinde kampanya, duyuru ve pazarlama içerikleri iletmek
                  </li>
                </ul>
              </section>

              {/* 3. Hukuki Dayanak */}
              <section id="hukuki-dayanak" aria-labelledby="hukuki-dayanak-baslik">
                <h2
                  id="hukuki-dayanak-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  3. Kişisel Verilerin İşlenmesinin Hukuki Dayanakları
                </h2>
                <p className="mt-3">
                  Kişisel verileriniz, 6698 sayılı Kişisel Verilerin Korunması Kanunu (&quot;KVKK&quot;)
                  ve ilgili mevzuat kapsamında aşağıdaki hukuki sebeplere dayanarak işlenmektedir:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Açık rızanızın bulunması</li>
                  <li>Bir sözleşmenin kurulması veya ifasıyla doğrudan ilgili olması</li>
                  <li>Hukuki yükümlülüklerimizin yerine getirilmesi</li>
                  <li>
                    Temel hak ve özgürlüklerinize zarar vermemek kaydıyla Sahneva&apos;nın meşru
                    menfaatleri
                  </li>
                </ul>
              </section>

              {/* 4. Saklama Süreleri */}
              <section id="saklama-sureleri" aria-labelledby="saklama-sureleri-baslik">
                <h2
                  id="saklama-sureleri-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  4. Kişisel Verilerin Saklanma Süreleri
                </h2>
                <p className="mt-3">
                  Kişisel verileriniz, ilgili mevzuatta öngörülen süreler ve işleme amaçlarımızın
                  gerektirdiği süre boyunca saklanmakta; bu sürelerin sonunda ise silinmekte,
                  anonim hale getirilmekte veya yok edilmektedir.
                </p>
                <div className="mt-4 overflow-hidden rounded-2xl border border-white/10 bg-slate-900/60">
                  <table className="min-w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-900/80 text-slate-300">
                      <tr>
                        <th className="px-4 py-3 font-semibold">Veri Türü</th>
                        <th className="px-4 py-3 font-semibold">Yaklaşık Saklama Süresi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 text-slate-200">
                      <tr>
                        <td className="px-4 py-3">Teklif &amp; iletişim formu verileri</td>
                        <td className="px-4 py-3">3 yıl</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Müşteri yazışmaları ve proje kayıtları</td>
                        <td className="px-4 py-3">3 yıl</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Analitik ve istatistik verileri</td>
                        <td className="px-4 py-3">26 aya kadar (GA4 varsayılan süreleri)</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-3">Çerez verileri</td>
                        <td className="px-4 py-3">Tarayıcı ayarlarına ve çerez türüne göre değişir</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </section>

              {/* 5. Veri Aktarımı */}
              <section id="veri-aktarimi" aria-labelledby="veri-aktarimi-baslik">
                <h2
                  id="veri-aktarimi-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  5. Kişisel Verilerin Aktarılması
                </h2>
                <p className="mt-3">
                  Kişisel verileriniz, yalnızca işbu Gizlilik Politikası&apos;nda belirtilen amaçlar
                  doğrultusunda ve yasal sınırlar içerisinde aşağıdaki taraflarla paylaşılabilir:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Yetkili kamu kurum ve kuruluşları (yasal zorunluluk halinde)</li>
                  <li>Sunucu, barındırma (hosting) ve altyapı sağlayıcılarımız</li>
                  <li>Google Analytics ve Google Tag Manager gibi analitik hizmet sağlayıcıları</li>
                  <li>Teknik destek ve danışmanlık aldığımız çözüm ortaklarımız</li>
                  <li>Hukuki süreçler kapsamında avukatlar ve hukuk danışmanları (gerekirse)</li>
                </ul>
                <p className="mt-2">
                  Verileriniz hiçbir koşulda üçüncü kişilere satılmaz veya izinsiz pazarlama amacıyla
                  paylaşılmaz.
                </p>
              </section>

              {/* 6. Haklarınız */}
              <section id="haklariniz" aria-labelledby="haklariniz-baslik">
                <h2 id="haklariniz-baslik" className="text-xl font-semibold text-slate-50">
                  6. Veri Sahibi Olarak Haklarınız
                </h2>
                <p className="mt-3">
                  KVKK madde 11 uyarınca, Sahneva&apos;ya başvurarak aşağıdaki haklara sahipsiniz:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme</li>
                  <li>İşlenmişse buna ilişkin bilgi talep etme</li>
                  <li>İşleme amacını ve amacına uygun kullanılıp kullanılmadığını öğrenme</li>
                  <li>Yurt içinde veya yurt dışında aktarıldığı üçüncü kişileri bilme</li>
                  <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme</li>
                  <li>İşlenmesini gerektiren sebeplerin ortadan kalkması halinde silinmesini veya yok edilmesini isteme</li>
                  <li>
                    Yapılan düzeltme, silme veya yok etme işlemlerinin, verilerin aktarıldığı üçüncü
                    kişilere bildirilmesini isteme
                  </li>
                  <li>
                    İşlenen verilerin otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize
                    bir sonucun ortaya çıkmasına itiraz etme
                  </li>
                  <li>KVKK&apos;ya aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme</li>
                </ul>
                <p className="mt-2">
                  Haklarınıza ilişkin taleplerinizi aşağıda belirtilen iletişim kanalları üzerinden
                  Sahneva&apos;ya iletebilirsiniz.
                </p>
              </section>

              {/* 7. Güvenlik */}
              <section id="guvenlik" aria-labelledby="guvenlik-baslik">
                <h2 id="guvenlik-baslik" className="text-xl font-semibold text-slate-50">
                  7. Veri Güvenliğine İlişkin Tedbirler
                </h2>
                <p className="mt-3">
                  Sahneva olarak, kişisel verilerinizi yetkisiz erişime, kayba veya kötüye kullanıma
                  karşı korumak için teknik ve idari tedbirler almaktayız:
                </p>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>HTTPS üzerinden şifrelenmiş veri aktarımı</li>
                  <li>Güvenlik duvarları ve erişim kontrol mekanizmaları</li>
                  <li>Düzenli güncellenen sunucu ve yazılım altyapısı</li>
                  <li>Yetkili personel dışındaki erişimlerin kısıtlanması</li>
                  <li>Gerekli durumlarda yedekleme ve kurtarma prosedürleri</li>
                </ul>
              </section>

              {/* 8. Çerezler */}
              <section id="cerezler" aria-labelledby="cerezler-baslik">
                <h2 id="cerezler-baslik" className="text-xl font-semibold text-slate-50">
                  8. Çerezler (Cookies)
                </h2>
                <p className="mt-3">
                  Web sitemizde kullanıcı deneyimini iyileştirmek, performansı analiz etmek ve
                  içerikleri geliştirmek amacıyla çerezler kullanılmaktadır.
                </p>
                <h3 className="mt-3 text-base font-semibold text-slate-50">
                  8.1. Kullanılan Çerez Türleri
                </h3>
                <ul className="mt-2 list-disc space-y-1 pl-5">
                  <li>
                    <strong>Zorunlu çerezler:</strong> Sitenin temel fonksiyonlarının çalışması için
                    gereklidir.
                  </li>
                  <li>
                    <strong>Analitik ve performans çerezleri:</strong> Google Analytics 4 ile site
                    kullanımına dair anonim istatistikler üretir.
                  </li>
                  <li>
                    <strong>Fonksiyonel çerezler:</strong> Tercihlerinizi (dil, tema vb.) hatırlamaya
                    yardımcı olabilir.
                  </li>
                  <li>
                    <strong>Reklam ve hedefleme çerezleri (varsa):</strong> Google Ads gibi platformlar
                    üzerinden yeniden pazarlama yapılmasına imkân tanır.
                  </li>
                </ul>
                <p className="mt-2">
                  Çerezleri tarayıcınızın ayarları üzerinden yönetebilir, silebilir veya tamamen
                  engelleyebilirsiniz. Ancak bu durumda sitenin bazı bölümleri düzgün çalışmayabilir.
                </p>
              </section>

              {/* 9. Değişiklikler */}
              <section id="degisiklikler" aria-labelledby="degisiklikler-baslik">
                <h2
                  id="degisiklikler-baslik"
                  className="text-xl font-semibold text-slate-50"
                >
                  9. Gizlilik Politikasında Yapılabilecek Değişiklikler
                </h2>
                <p className="mt-3">
                  Bu Gizlilik Politikası, yasal düzenlemeler ve Sahneva&apos;nın veri işleme
                  faaliyetlerindeki değişikliklere bağlı olarak güncellenebilir. Güncel sürüm her zaman
                  <span className="px-1 text-sky-300">/gizlilik-politikasi</span> adresinde yayımlanır.
                </p>
              </section>

              {/* 10. İletişim */}
              <section id="iletisim" aria-labelledby="iletisim-baslik">
                <h2 id="iletisim-baslik" className="text-xl font-semibold text-slate-50">
                  10. İletişim
                </h2>
                <p className="mt-3">
                  Gizlilik Politikası veya kişisel verilerinizin işlenmesiyle ilgili her türlü soru,
                  talep ve başvurunuz için aşağıdaki kanallardan bize ulaşabilirsiniz:
                </p>

                <div className="mt-4 rounded-3xl border border-purple-500/40 bg-gradient-to-r from-purple-900/50 via-slate-900 to-sky-900/40 p-5 shadow-lg shadow-purple-900/40">
                  <p className="text-sm text-slate-100">
                    <span className="font-semibold">Veri Sorumlusu:</span> Sahneva Organizasyon
                  </p>
                  <p className="mt-2 text-sm">
                    <span className="font-semibold">E-posta:</span>{" "}
                    <a
                      href={`mailto:${MAIL}`}
                      className="text-sky-100 underline-offset-2 hover:underline"
                    >
                      {MAIL}
                    </a>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">Telefon:</span>{" "}
                    <a
                      href={`tel:${PHONE}`}
                      className="text-sky-100 underline-offset-2 hover:underline"
                    >
                      0 (545) 304 86 71
                    </a>
                  </p>
                  <p className="mt-1 text-sm">
                    <span className="font-semibold">Web sitesi:</span>{" "}
                    <Link
                      href="/"
                      className="text-sky-100 underline-offset-2 hover:underline"
                    >
                      www.sahneva.com
                    </Link>
                  </p>

                  <div className="mt-4 flex flex-wrap gap-3">
                    <Link
                      href="/iletisim"
                      className="inline-flex items-center justify-center rounded-2xl bg-slate-950/70 px-4 py-2 text-sm font-semibold text-slate-50 shadow-md shadow-black/40 ring-1 ring-white/10 transition hover:scale-[1.02] hover:bg-slate-900"
                    >
                      İletişim Sayfasına Git
                    </Link>
                    <a
                      href={`https://wa.me/${PHONE.replace("+", "")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center rounded-2xl bg-emerald-500/90 px-4 py-2 text-sm font-semibold text-slate-950 shadow-md shadow-emerald-900/60 transition hover:scale-[1.02] hover:bg-emerald-400"
                    >
                      WhatsApp Üzerinden Yaz
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
