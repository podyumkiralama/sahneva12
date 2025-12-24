# PERF_NOTE.md — TR Homepage Perf + SEO Sanity Checks

## Özet
Bu not, TR anasayfa için Page Objects test uyarılarını azaltmaya yönelik yapılan iyileştirmeleri ve bilinçli olarak kabul edilen uyarıları özetler.

## 1) HTTP Request Count (>20)
**Neden uyarı veriyordu?**
- Below-the-fold görseller (galeri, kurumsal bloklar) ve servis görselleri birden fazla istek oluşturuyor.
- HTTP/2/3 ortamında >20 istek fatal değil ancak testlerde uyarı veriyor.

**Yapılan iyileştirme**
- Aşağıdaki görseller zaten lazy-load (Next/Image default) ve LCP öncesi tetiklenmiyor.
- LCP kritiği: Hero görseli `loading="eager"` ve `fetchPriority="high"` olarak bırakıldı (bilinçli).

**Kalan uyarı (bilinçli)**
- Below-the-fold görsel sayısı fazla; görsel kalite düşürülmedi.

## 2) Image Aspect Ratio Test
**Kontrol edildi**
- `fill` kullanılan Next/Image bileşenlerinde parent container’ların aspect ratio’ları sabit.
- `img` kullanılan bileşenlerde width/height değerleri bulunuyor.

**Sonuç**
- CLS riski oluşturan oran eksikliği tespit edilmedi.

## 3) Render Blocking Resources
**Kontrol edildi**
- `next/font` kullanımı `display: swap` ile sürüyor.
- Kritik CSS: global CSS zaten üstte load oluyor, ek render-blocking CSS eklenmedi.

**Kalan uyarı (bilinçli)**
- Google Fonts fetch bazı ortamlarda TLS nedeniyle build/test uyarısı üretiyor.

## 4) Fonts Optimization
**Yapılan iyileştirme**
- Inter fontu için yalnızca kullanılan weight’ler seçildi: **400/600/700/800/900**.
- `display: swap` korunarak FOIT engellendi.

**Beklenen etki**
- Font payload oranı düşer; text paint bloklanmaz.

## 5) Image Alt Test
**Kontrol edildi**
- Dekoratif görseller: `alt=""` + `aria-hidden` kullanımına devam.
- Bilgilendirici görseller: anlamlı alt metinler korunuyor.

## 6) Plaintext Emails Test
**Kontrol edildi**
- Footer mailto linki `mailto:info@sahneva.com` formatında ve görünür label içeriyor.

**Not**
- E-posta templating için plaintext versiyon uygulama dışında yönetiliyor; test notu olarak kabul edildi.

## 7) Social Media – Instagram Tag/Entity
**Kontrol edildi**
- Footer Instagram linki doğru URL ve `aria-label` ile mevcut.
- Organization schema `sameAs` içinde Instagram bulunuyor.

## 8) Hero Dışı Preload Temizliği
**Yapılan iyileştirme**
- TR anasayfada hero görseli dışındaki `priority`/`fetchPriority` kullanımları kaldırıldı.
- Navbar logo görselinde `priority` kaldırıldı.
- ServicesTabs kart görselleri eager yükleme yerine lazy davranışa bırakıldı.
- ServicesTabs ve ProjectsGallery yüklemeleri sadece IntersectionObserver tetikleyince gerçekleşir (idle timeout kaldırıldı).
**Beklenen etki**
- İlk yüklemede hero dışı görseller için preload isteği oluşmaz; below-the-fold görseller scroll yaklaşınca yüklenir.

## Kalan Bilinen Limitler
- `npm run build` sırasında Google Fonts TLS hatası (ortam kaynaklı) nedeniyle uyarı devam ediyor.
- Lighthouse CI için CHROME_PATH gerekli (bu ortamda yok).
