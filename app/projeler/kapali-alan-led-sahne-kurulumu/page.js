// app/projeler/kapali-alan-led-sahne-kurulumu/page.js
import Image from "next/image";
import Link from "next/link";
import CaseGallery from "../../../components/CaseGallery";

export const metadata = {
  title:
    "Devlet Protokolüne Uygun Kapalı Alan LED ve Sahne Kurulumu — Teknik Referans | Sahneva",
  description:
    "40’lık çadır içinde 24×8 m sahne/podyum ve 24×6 m P2 LED ekran; scaff ve truss üst yapısıyla, 60 kişilik ekiple 2 günde tamamlanan büyük ölçekli kurulum.",
  alternates: { canonical: "/projeler/kapali-alan-led-sahne-kurulumu" },
  openGraph: {
    type: "article",
    title:
      "Devlet Protokolüne Uygun Kapalı Alan LED ve Sahne Kurulumu — Teknik Referans",
    description:
      "24×6 m P2 LED, 24×8 m sahne/podyum, scaff ve truss ile büyük ölçekli kapalı alan kurulumu.",
    images: ["/img/projeler/kapali-alan-led/01.webp"], // OG görseli (ilk kare)
    url: "https://www.sahneva.com/projeler/kapali-alan-led-sahne-kurulumu",
  },
  twitter: {
    card: "summary_large_image",
    title:
      "Devlet Protokolüne Uygun Kapalı Alan LED ve Sahne Kurulumu — Teknik Referans",
    description:
      "Kapalı alan sahne & LED uygulaması — 24×6 m P2 LED ve 24×8 m sahne/podyum.",
    images: ["/img/projeler/kapali-alan-led/01.webp"],
  },
};

// ⚠ Görselleri aynı klasöre 01–10.webp olarak koyabilirsin (kaç adet varsa o kadarı yeter).
const IMAGES = [
  { src: "/img/projeler/kapali-alan-led/1.webp", alt: "Protokol seviyesi LED sahne kurulumu; P2 çözünürlüklü 24×6 m ana LED ekran ve truss üst yapı görünümü" },
  { src: "/img/projeler/kapali-alan-led/2.webp", alt: "24×8 m podyum önüne yerleştirilmiş protokol oturma alanı ve LED ekran arka plan kurulumu" },
  { src: "/img/projeler/kapali-alan-led/3.webp", alt: "Yeşillik dekor arka plan üzerine konumlandırılmış projeye özel sosyal konut tanıtım panosu" },
  { src: "/img/projeler/kapali-alan-led/4.webp", alt: "P2 LED ekran ve yeşil duvar dekorlu sahne alanı genel görüntüsü" },
  { src: "/img/projeler/kapali-alan-led/5.webp", alt: "24×8 m podyum üzerinde LED ekran kurulumunun tamamlandığı genel sahne görüntüsü" },
  { src: "/img/projeler/kapali-alan-led/6.webp", alt: "Truss iskelet sistemiyle desteklenen geniş katılımlı kapalı alan etkinlik sahnesi genel planı" },
  { src: "/img/projeler/kapali-alan-led/7.webp", alt: "Tam kapasite sandalye dizilimiyle birlikte LED ekran odaklı sahne genel kurulumu" },
  { src: "/img/projeler/kapali-alan-led/8.webp", alt: "Sahne ön görünümü, podyum ve sandalye dizilimleriyle birlikte protokol düzenine hazır kurulum" },
  { src: "/img/projeler/kapali-alan-led/9.webp", alt: "Teknik kurulum sonrası sahne ve oturma düzeninin son kontrollerinin yapıldığı geniş açılı görünüm" },
];


export default function CasePage() {
  return (
    <div className="overflow-x-hidden">
      {/* HERO */}
      <section className="relative h-[340px] flex items-center justify-center text-white">
  {/* Arka plan görseli */}
  <Image
    src="/img/projeler/kapali-alan-led/1.webp"
    alt="Kapalı alan sahne ve LED ekran kurulumu"
    fill
    priority
    className="object-cover"
  />

  {/* Koyu overlay (okunabilirliği artırır) */}
  <div className="absolute inset-0 bg-black/60"></div>

  {/* Metin katmanı */}
  <div className="relative z-10 container text-center px-4">
    <h1 className="text-3xl md:text-5xl font-extrabold">
      Kapalı Alan LED & Sahne Kurulumu (Protokol Seviyesi)
    </h1>
    <p className="mt-4 max-w-3xl mx-auto text-white/90">
      Dış alana kurulan 40’lık çadır içinde, 24×8 m podyum ve 24×6 m P2 çözünürlüklü LED ekran kurulumuyla gerçekleştirilen büyük ölçekli sahne ve teknik altyapı çalışmasıdır. Scaff ve truss sistemleriyle desteklenen yapı, protokol seviyesinde bir etkinlik standardına uygun şekilde hazırlanmıştır.
    </p>
  </div>
</section>


      {/* ÖZET KARTLARI */}
      <section aria-labelledby="ozet-baslik" className="container py-10 md:py-14">
        <h2 id="ozet-baslik" className="sr-only">Kurulum Özeti</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <article className="p-5 rounded-2xl border bg-white">
            <h3 className="font-semibold mb-2">Teknik Ölçüler</h3>
            <ul className="text-sm text-neutral-700 space-y-1 list-disc pl-4">
              <li>Sahne / Podyum: <strong>24 × 8 m</strong></li>
              <li>LED Ekran: <strong>24 × 6 m</strong> (P2)</li>
              <li>Üst Yapı: <strong>Truss</strong> + Scaff iskelet</li>
            </ul>
          </article>

          <article className="p-5 rounded-2xl border bg-white">
            <h3 className="font-semibold mb-2">Alan & Altyapı</h3>
            <ul className="text-sm text-neutral-700 space-y-1 list-disc pl-4">
              <li>Kurulum Yeri: Dış alana kurulu <strong>40’lık çadır</strong></li>
              <li>İç Zemin: Özel hazırlık + <strong>halı kaplama</strong></li>
              <li>
                <Link href="/ses-isik-sistemleri" className="underline font-medium">
                  Ses & Işık
                </Link>
                : Line-array, robot ışık, sahne aydınlatma
              </li>
            </ul>
          </article>

          <article className="p-5 rounded-2xl border bg-white">
            <h3 className="font-semibold mb-2">Operasyon</h3>
            <ul className="text-sm text-neutral-700 space-y-1 list-disc pl-4">
              <li>Ekip Büyüklüğü: <strong>60 kişi</strong></li>
              <li>Kurulum Süresi: <strong>2 iş günü</strong></li>
              <li>Ölçek: Protokol seviyesi (üst düzey katılım)</li>
            </ul>
            <p className="text-xs text-neutral-500 mt-2">
              Not: Sayfa teknik referanstır; belirli bir kampanya/kurum adı içermez.
            </p>
          </article>
        </div>
      </section>

      {/* AÇIKLAMA (iç linkli) */}
      <section aria-labelledby="aciklama-baslik" className="container pb-10 md:pb-12">
        <h2 id="aciklama-baslik" className="text-xl md:text-2xl font-bold mb-4">
          Uygulama ve Yaklaşım
        </h2>
        <div className="prose max-w-none text-neutral-700">
          <p>
            Kurulum; dış alan üzerine inşa edilen 40’lık çadırda, güvenli rigging ve hızlı
            montaj öncelikleriyle planlandı. Zemin hazırlığı tamamlandıktan sonra{" "}
            <Link href="/podyum-kiralama" className="underline font-medium">
              podyum
            </Link>{" "}
            ve LED taşıyıcı iskelet (scaff) kuruldu;{" "}
            <Link href="/sahne-kiralama" className="underline font-medium">
              truss
            </Link>{" "}
            üst yapı ile ses ve aydınlatma elemanlarının konumlandırılması yapıldı. Görüş açısı
            ve parlaklık için{" "}
            <Link href="/led-ekran-kiralama" className="underline font-medium">
              P2 LED ekran
            </Link>{" "}
            tercih edildi.
          </p>
          <p>
            Yayın zinciri yedekli kurgulandı; protokol standardı dikkate alınarak sahne
            görünürlüğü, akustik ve{" "}
            <Link href="/ses-isik-sistemleri" className="underline font-medium">
              ışık dengesi
            </Link>{" "}
            test edildi. Çadır içi{" "}
            <Link href="/cadir-kiralama" className="underline font-medium">
              zemin kaplama
            </Link>{" "}
            tamamlandıktan sonra oturma düzeni yerleştirildi.
          </p>
        </div>
      </section>

      {/* BU PROJEDE KULLANILAN HİZMETLER (internal link hub) */}
      <section aria-labelledby="services-used" className="container pb-8">
        <h2 id="services-used" className="text-xl md:text-2xl font-bold mb-4">
          Bu Projede Kullanılan Hizmetler
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <li><Link href="/podyum-kiralama" className="card block p-4 rounded-xl border hover:shadow-sm">Podyum Kiralama</Link></li>
          <li><Link href="/led-ekran-kiralama" className="card block p-4 rounded-xl border hover:shadow-sm">LED Ekran Kiralama</Link></li>
          <li><Link href="/ses-isik-sistemleri" className="card block p-4 rounded-xl border hover:shadow-sm">Ses & Işık Sistemleri</Link></li>
          <li><Link href="/cadir-kiralama" className="card block p-4 rounded-xl border hover:shadow-sm">Çadır Kiralama</Link></li>
          <li><Link href="/sahne-kiralama" className="card block p-4 rounded-xl border hover:shadow-sm">Sahne Kurulumu</Link></li>
        </ul>
      </section>

      {/* GALERİ */}
      <section aria-labelledby="galeri-baslik" className="container pb-10 md:pb-14">
        <h2 id="galeri-baslik" className="text-xl md:text-2xl font-bold mb-6">
          Görsel Galeri
        </h2>
        <CaseGallery images={IMAGES} />
      </section>

      {/* CTA (internal link) */}
      <section aria-labelledby="cta-baslik" className="container pb-14 md:pb-16">
        <h2 id="cta-baslik" className="sr-only">Teklif CTA</h2>
        <div className="rounded-2xl border p-6 md:p-8 bg-white flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <p className="text-neutral-800">
            Benzer bir kapalı alan sahne & LED kurulumuna mı ihtiyacınız var? İhtiyacınıza uygun paketi birlikte planlayalım.
          </p>
          <div className="flex gap-3">
            <Link href="/iletisim" className="btn btn-primary">Teklif Alın</Link>
            <a
              href="https://wa.me/905453048671?text=Merhaba%2C+kapal%C4%B1+alan+sahne+%26+LED+kurulumu+i%C3%A7in+teklif+almak+istiyorum."
              target="_blank"
              rel="noopener noreferrer"
              className="btn"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* JSON-LD: Project */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Project",
            name: "Kapalı Alan LED ve Sahne Kurulumu (Protokol Seviyesi)",
            description:
              "40’lık çadır içinde 24×8 m sahne/podyum ve 24×6 m P2 LED ekranla scaff ve truss altyapısı kullanılan, 2 günde 60 kişilik ekiple tamamlanan büyük ölçekli kurulum.",
            image: IMAGES.map((i) => `https://www.sahneva.com${i.src}`),
            creator: { "@type": "Organization", name: "Sahneva" },
            additionalProperty: [
              { "@type": "PropertyValue", name: "Sahne/Podyum", value: "24×8 m" },
              { "@type": "PropertyValue", name: "LED Ekran", value: "24×6 m (P2)" },
              { "@type": "PropertyValue", name: "Altyapı", value: "Scaff + Truss" },
              { "@type": "PropertyValue", name: "Alan", value: "40’lık çadır (kapalı alan)" },
              { "@type": "PropertyValue", name: "Kurulum Süresi", value: "2 iş günü" },
              { "@type": "PropertyValue", name: "Ekip", value: "60 kişi" },
              { "@type": "PropertyValue", name: "Ses & Işık", value: "Line-array, robot ışık, sahne ışıkları" },
            ],
          }),
        }}
      />
    </div>
  );
}




