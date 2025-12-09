# Ana Sayfa İyileştirme Özeti (Görev 05)

- **Erişilebilirlik:** `main` landmark'lardaki gereksiz canlı bölge öznitelikleri kaldırıldı; mobil menü ve masaüstü açılır menü durumları için `aria-expanded`, `data-open` ve odak yönetimi iyileştirildi; mobil backdrop ve diyaloglar durumlarına göre `aria-hidden` güncellendi.
- **SEO & Yapısal Veri:** WebPage JSON-LD başlığı, sayfa `<title>` kaynağıyla tek noktadan yönetilen `HOME_PAGE_TITLE` değeriyle hizalandı; OpenGraph görseli JSON-LD `ImageObject` ile aynı kaynaktan (`/img/og/hero-og.webp`) sunuluyor; hreflang/canonical üretimi için merkezi yardımcılar eklendi.
- **Performans & CSS:** `NonCriticalStylesheet` mevcut SSR bağlantısını yeniden kullanarak `media="all"` durumuna geçiriyor; gövde üzerindeki `scroll-smooth` sınıfı kaldırılarak tek kaynaktan kaydırma davranışı korunuyor; tekrar eden bölüm sınıfları için `PageSection` bileşeni oluşturuldu.
