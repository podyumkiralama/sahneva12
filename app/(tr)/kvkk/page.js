// app/kvkk/page.jsx
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");

export const metadata = {
  title: "KVKK / Gizlilik",
  description:
    "Sahneva KVKK ve Gizlilik Politikası: kişisel verilerin işlenmesi, saklanması, aktarımı ve haklarınız hakkında bilgilendirme.",
  alternates: { canonical: `${SITE_URL}/kvkk` },
  openGraph: {
    title: "KVKK / Gizlilik | Sahneva Organizasyon",
    description:
      "Sahneva Organizasyon’un KVKK ve Gizlilik Politikası hakkında bilgilendirme.",
    url: `${SITE_URL}/kvkk`,
    type: "article",
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
    title: "KVKK / Gizlilik | Sahneva Organizasyon",
    description:
      "Sahneva Organizasyon’un KVKK ve Gizlilik Politikası hakkında bilgilendirme.",
    images: [`${SITE_URL}/img/og/sahneva-og.webp`],
  },
  robots: { index: true, follow: true },
};

export default function KvkkPage() {
  const updatedAt = "11 Ekim 2025"; // ihtiyaç oldukça güncelle
  const baseUrl = SITE_URL;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "KVKK", url: `${baseUrl}/kvkk` },
  ];

  return (
    <div className="container max-w-3xl mx-auto px-4 py-10 md:py-14">
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold">KVKK / Gizlilik Politikası</h1>
        <p className="text-sm text-neutral-600 mt-1">Son güncelleme: {updatedAt}</p>
      </header>

      <section className="space-y-6 text-neutral-800 leading-7">
        <p>
          Bu KVKK ve Gizlilik Politikası, <strong>Sahneva</strong> (“Şirket”) tarafından
          sağlanan hizmetler kapsamında kişisel verilerin 6698 sayılı Kişisel Verilerin
          Korunması Kanunu (“<strong>KVKK</strong>”) ve ilgili mevzuata uygun olarak
          işlenmesine ilişkin esasları açıklar.
        </p>

        <div className="rounded-xl border bg-white p-4">
          <h2 className="font-semibold">Veri Sorumlusu</h2>
          <p className="mt-1">
            Sahneva — İstanbul / Türkiye<br />
            E-posta: <a className="text-[#6d28d9] hover:underline" href="mailto:info@sahneva.com">info@sahneva.com</a><br />
            Telefon: <a className="text-[#6d28d9] hover:underline" href="tel:+905453048671">+90 545 304 8671</a>
          </p>
        </div>

        <h2 className="text-xl font-semibold">1. İşlediğimiz Kişisel Veriler</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>İletişim bilgileri: ad–soyad, e-posta, telefon, şirket/kurum bilgisi.</li>
          <li>Teklif ve sözleşme verileri: talep içeriği, hizmet kapsamı, faturalama bilgileri.</li>
          <li>Etkinlik operasyon verileri: kurulum adresi, tarih/saat, teknik gereksinimler.</li>
          <li>İşlem ve denetim kayıtları: log bilgileri, talep–yanıt geçmişi.</li>
          <li>Çerez/analitik verileri: sayfa görüntüleme, trafik kaynakları (toplu/anonim).</li>
        </ul>

        <h2 className="text-xl font-semibold">2. İşleme Amaçlarımız</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Hizmet sunumu, tekliflendirme, sözleşme kurulması ve ifası.</li>
          <li>Müşteri ilişkileri ve destek süreçlerinin yürütülmesi.</li>
          <li>Finans ve muhasebe işlemleri, faturalama.</li>
          <li>Operasyon planlama (saha kurulumları, lojistik, teknik destek).</li>
          <li>Güvenlik ve denetim, hukuki yükümlülüklere uyum.</li>
          <li>Web sitesi kullanım deneyimini iyileştirme ve performans analizi.</li>
        </ul>

        <h2 className="text-xl font-semibold">3. Hukuki Sebepler</h2>
        <p>
          KVKK m.5/2 uyarınca; <em>sözleşmenin kurulması/ifası</em>, <em>hukuki yükümlülük</em>,
          <em>meşru menfaat</em> ve <em>bir hakkın tesisi/kullanılması/korunması</em> hukuki
          sebeplerine dayanarak veri işleriz. Açık rıza gerektiren hallerde açık rızanızı alırız.
        </p>

        <h2 className="text-xl font-semibold">4. Toplama Yöntemleri</h2>
        <p>
          Veriler; web sitemizdeki formlar, telefon/WhatsApp görüşmesi, e-posta yazışmaları,
          teklif–sözleşme süreçleri ve saha operasyonları sırasında elde edilir.
        </p>

        <h2 className="text-xl font-semibold">5. Aktarım ve Veri İşleyenler</h2>
        <p>
          Hizmetin ifası için gerekli hallerde; kargo/lojistik, finans, muhasebe, barındırma
          (hosting), bulut altyapı ve teknik servis sağlayıcılarıyla sınırlı olarak veri paylaşımı
          yapılabilir. Tüm tedarikçilerle KVKK’ya uygun sözleşmeler yapılır.
        </p>

        <h2 className="text-xl font-semibold">6. Yurt Dışına Aktarım</h2>
        <p>
          Barındırma/analitik gibi bazı hizmetler yurt dışında konumlanabilir. Bu hallerde KVKK
          m.9 uyarınca açık rıza veya Kurul’un uygun bulduğu güvenceler sağlanarak aktarım
          gerçekleştirilir.
        </p>

        <h2 className="text-xl font-semibold">7. Saklama Süreleri</h2>
        <ul className="list-disc pl-6 space-y-1">
          <li>Teklif–sözleşme ve fatura verileri: Vergi/TTK mevzuatındaki asgari süreler (genelde 5–10 yıl).</li>
          <li>İletişim ve destek kayıtları: müşteri ilişkileri ve zamanaşımı süreleriyle sınırlı.</li>
          <li>Çerez/analitik: amaçla orantılı, mümkün olduğunca kısa ve anonimleştirilmiş.</li>
        </ul>

        <h2 className="text-xl font-semibold">8. Çerezler ve Analitik</h2>
        <p>
          Sitede zorunlu çerezler ve Google Analytics 4 (“GA4”) kullanılabilir. GA4, sayfa
          görüntüleme ve etkileşimleri toplu olarak ölçer. Tarayıcı ayarlarından çerez tercihlerinizi
          yönetebilir, reklam kişiselleştirmesini kapatabilirsiniz. GA çerezleri hakkında daha fazla
          bilgi için Google’ın ilgili sayfalarına bakabilirsiniz.
        </p>

        <h2 className="text-xl font-semibold">9. KVKK m.11 Kapsamındaki Haklarınız</h2>
        <p>Veri sahibi olarak bize başvurarak:</p>
        <ul className="list-disc pl-6 space-y-1">
          <li>Kişisel verilerinizin işlenip işlenmediğini öğrenme,</li>
          <li>İşlenmişse buna ilişkin bilgi talep etme,</li>
          <li>Amacına uygun kullanılıp kullanılmadığını öğrenme,</li>
          <li>Yurt içinde/dışında aktarıldığı üçüncü kişileri bilme,</li>
          <li>Eksik veya yanlış işlenmişse düzeltilmesini isteme,</li>
          <li>KVKK m.7 kapsamındaki şartlarla silinmesini/yok edilmesini isteme,</li>
          <li>Aktarıldığı üçüncü kişilere bildirilmesini talep etme,</li>
          <li>Otomatik analiz sonucu aleyhinize sonuca itiraz etme,</li>
          <li>Meşru menfaatlerinize aykırı sonuç doğurması halinde işlenmesine itiraz etme</li>
        </ul>
        <p>
          taleplerini iletebilirsiniz. Başvurularınızı{" "}
          <a className="text-[#6d28d9] hover:underline" href="mailto:info@sahneva.com">
            info@sahneva.com
          </a>{" "}
          adresine gönderebilirsiniz.
        </p>

        <h2 className="text-xl font-semibold">10. Güvenlik</h2>
        <p>
          Uygun teknik ve idari tedbirlerle verilerinizi koruruz (erişim yetkilendirme, loglama,
          şifreleme ve ihtiyaç olduğunda anonim/pseudonimleştirme gibi).
        </p>

        <h2 className="text-xl font-semibold">11. Değişiklikler</h2>
        <p>
          Bu politika güncellenebilir. Güncel sürüm her zaman{" "}
          <strong>https://sahneva.com/kvkk</strong> adresinde yayınlanır.
        </p>
      </section>
    </div>
  );
}
