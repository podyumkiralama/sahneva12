import Image from "next/image";
import Link from "next/link";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const ORIGIN = "https://www.sahneva.com";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || ORIGIN).replace(/\/$/, "");
const BLOG_PATH = "/blog/kurumsal-etkinlik-yonetimi";
const BLOG_URL = `${SITE_URL}${BLOG_PATH}`;
const PUBLISH_DATE = "2024-11-30T00:00:00+03:00";

const HERO = "/img/blog/kurumsal-etkinlik-hero.webp";
const SECTIONS = [
  {
    title: "Kurumsal Etkinlik Yönetiminin Temel Aşamaları",
    description:
      "Amaç, bütçe, mekan, sahne tasarımı ve içerik akışı birlikte planlandığında marka mesajı her temas noktasında tutarlı kalır. Program akışını teknik hazırlıklarla paralel yürütmek riskleri azaltır.",
    bullets: [
      "Hedef kitle ve etkinlik amacını belirledikten sonra mekana ve teknik altyapıya karar verin.",
      "Sunum, video ve canlı yayın ihtiyaçları için sahne, ekran ve ses altyapısını erken doğrulayın.",
      "Prova takvimini konuşmacı ve tedarikçi ekiplerle paylaşıp sorumlulukları netleştirin.",
    ],
    image: "/img/blog/kurumsal-etkinlik-sahne-genel.webp",
  },
  {
    title: "Sahne, Ses ve Işıkta Dikkat Edilecek Noktalar",
    description:
      "Sunumların net, etkileyici ve hatasız olması için sahne yerleşimi ile teknik ekipmanın uyumlu çalışması gerekir. LED ekran çözünürlüğü, kamera açıları ve akustik ayarları birlikte tasarlanmalıdır.",
    bullets: [
      "LED ekran piksel aralığını izleme mesafesine göre seçin; aşırı parlaklığı azaltın.",
      "Hataya açık noktaları azaltmak için kablosuz mikrofon yedekleri ve kayıt hattı oluşturun.",
      "Sahne ışıklarını konuşmacı, moderatör ve demo alanlarına ayrı ayrı kurgulayın.",
    ],
    image: "/img/blog/kurumsal-etkinlik-led-ekran-sahne.webp",
  },
  {
    title: "Backstage ve Operasyon Yönetimi",
    description:
      "Backstage iletişimi, zamanlama ve güvenlik akışı kusursuz bir program için kritik. Teknik ekip, ajans ve marka temsilcilerinin aynı bilgi ekranlarını görmesi hataları azaltır.",
    bullets: [
      "Talkback ve interkom sistemlerini sahne önü, reji ve danışma alanlarına dağıtın.",
      "Konuşmacı anonsları, çalma listeleri ve video geçişleri için tek bir zaman çizelgesi kullanın.",
      "Misafir yönlendirmesi, kayıt masası ve oturum geçişleri için saha ekibine net roller verin.",
    ],
    image: "/img/blog/kurumsal-etkinlik-ses-backstage.webp",
  },
];

const RELATED_SERVICES = [
  {
    title: "Kurumsal organizasyon çözümleri",
    href: "/kurumsal-organizasyon",
    description: "Konferans, lansman ve gala etkinlikleri için uçtan uca planlama ve sahne tasarımı.",
  },
  {
    title: "LED ekran kiralama",
    href: "/led-ekran-kiralama",
    description: "İç ve dış mekan etkinliklerine uygun, yüksek parlaklıkta LED ekran ve reji çözümleri.",
  },
  {
    title: "Ses & ışık sistemleri",
    href: "/ses-isik-sistemleri",
    description: "Line array, dijital miks, hareketli ışık ve sahne altyapısı için teknik ekipman tedariği.",
  },
];

export const metadata = {
  title: "Kurumsal Etkinlik Yönetimi: Teknik Planlama ve Backstage İpuçları | Sahneva",
  description:
    "Kurumsal etkinlik yönetiminde sahne tasarımı, ses-ışık altyapısı ve backstage koordinasyonu için pratik ipuçları. Konferans ve lansmanlarda kusursuz deneyim için kontrol listesi.",
  image: HERO,
  category: "Kurumsal Organizasyon",
  readTime: "15 dk okuma",
  date: PUBLISH_DATE,
  alternates: { canonical: BLOG_URL },
  openGraph: {
    title: "Kurumsal Etkinlik Yönetimi: Teknik Planlama Rehberi",
    description:
      "Backstage iletişiminden LED ekran seçimlerine kadar kurumsal etkinlik yönetiminde dikkat edilmesi gereken teknik başlıklar.",
    url: BLOG_URL,
    type: "article",
    locale: "tr_TR",
    siteName: "Sahneva",
    images: [
      {
        url: `${SITE_URL}${HERO}`,
        width: 1200,
        height: 630,
        alt: "Kurumsal etkinlik sahnesi ve LED ekran",
      },
    ],
  },
};

function SectionCard({ title, description, bullets, image }) {
  return (
    <section className="grid gap-8 rounded-3xl bg-white/80 p-6 shadow-lg ring-1 ring-gray-200 lg:grid-cols-2 lg:items-center">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
        <p className="text-lg leading-relaxed text-gray-700">{description}</p>
        <ul className="space-y-2 text-gray-800">
          {bullets.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-blue-500" aria-hidden />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="relative h-72 overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
          priority
        />
      </div>
    </section>
  );
}

export default function CorporateEventManagementPage() {
  return (
    <main className="bg-gray-50 py-14">
      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 px-4 sm:px-8">
        <div className="absolute -left-32 top-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl" aria-hidden />
        <div className="absolute -right-20 bottom-10 h-52 w-52 rounded-full bg-purple-400/10 blur-3xl" aria-hidden />

        <header className="space-y-4">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Blog / Rehber
          </p>
          <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl">
            Kurumsal Etkinlik Yönetimi: Backstage ve Sahne İçin 9 Adım
          </h1>
          <p className="text-lg text-gray-700 sm:max-w-4xl">
            Konferans, lansman ve iç iletişim toplantılarında kusursuz deneyim için teknik planlama, backstage iletişimi ve
            sahne tasarımını aynı çerçevede anlatan pratik bir rehber.
          </p>

          <div className="flex flex-wrap gap-3 text-sm text-gray-600">
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">15 dk okuma</span>
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">30 Kasım 2024</span>
            <span className="rounded-full bg-white px-3 py-1 ring-1 ring-gray-200">Kurumsal Organizasyon</span>
          </div>
        </header>

        <div className="relative h-80 overflow-hidden rounded-3xl bg-gray-100 shadow-xl">
          <Image
            src={HERO}
            alt="Kurumsal etkinlikte sahne ve LED ekran"
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
        </div>

        <div className="grid gap-12">
          {SECTIONS.map((section) => (
            <SectionCard key={section.title} {...section} />
          ))}
        </div>

        <section className="grid gap-4 rounded-3xl bg-white/90 p-6 shadow-lg ring-1 ring-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Etkinlik Ekibi İçin Kontrol Listesi</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Teknik çizimler, oturma planı ve sahne yönlendirmelerini tek dosyada paylaşın.",
              "Kurulum öncesi güç altyapısı ve internet yedeklemesini doğrulayın.",
              "Prova günü için konuşmacı, MC ve demo ekipleriyle zaman çizelgesi paylaşın.",
              "Kayıt, karşılama ve sahne gerisi koordinasyonu için telsiz/whatsapp grubu açın.",
              "Son dakika değişiklikleri için rejide canlı yedek sunum ve video bulundurun.",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-gray-50 p-4">
                <span className="mt-1 h-2.5 w-2.5 rounded-full bg-emerald-500" aria-hidden />
                <span className="text-gray-800">{item}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-3 rounded-3xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white shadow-xl">
          <h2 className="text-2xl font-semibold">İlgili hizmetler</h2>
          <p className="text-blue-100">
            Sahneva ekipleri, uçtan uca organizasyon ve teknik kurulumlarda tek temas noktasından destek verir.
          </p>
          <div className="grid gap-4 sm:grid-cols-3">
            {RELATED_SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex flex-col gap-2 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"
              >
                <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                <p className="text-sm text-blue-100">{service.description}</p>
                <span className="text-sm font-semibold text-white/90 group-hover:text-white">Detayları Gör →</span>
              </Link>
            ))}
          </div>
        </section>
      </div>

      <BreadcrumbJsonLd
        baseUrl={SITE_URL}
        items={[
          { name: "Anasayfa", url: SITE_URL },
          { name: "Blog", url: `${SITE_URL}/blog` },
          { name: "Kurumsal Etkinlik Yönetimi", url: BLOG_URL },
        ]}
      />
    </main>
  );
}
