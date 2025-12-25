# A11Y_REPORT.md — TR Anasayfa (WCAG 2.2 AA+)

## Kapsam
- TR anasayfa + render edilen bileşenler: Navbar/MegaMenu, Hero, HeroBelow, Hizmetler sekmeleri, Projeler galerisi, Kurumsal etkinlikler, Teknik kabiliyetler, Neden Sahneva, FAQ, Footer
- Paylaşılan sarmalayıcılar: `app/layout.js`, `components/SkipLinks.jsx`, `components/NewTabAccessibility.client.jsx`
- (Varsa) UtilityBar: TR anasayfada varsayılan olarak render edilmedi.

## Checklist (özet)
### Landmarks & Skip Links
- [x] Sayfada yalnızca **tek** `<main>` var.
- [x] `<header>`, `<nav>`, `<main>`, `<footer>` doğru yerde, yanlış nesting yok.
- [x] Skip links odaklanabilir ve görünür; `#_main_content` hedefi mevcut.

### Headings
- [x] Homepage’de **tek** H1 var.
- [x] H2/H3 hiyerarşisi düzenli; başlıklar sadece stil amaçlı kullanılmıyor.

### Keyboard UX
- [x] Tüm interaktif öğeler Tab ile erişilebilir.
- [x] Focus ring görünür (outline-only kaldırılmadı; focus-ring sınıfı korunuyor).
- [x] Mega menu: Enter/Space ile açılır, ESC ile kapanır.
- [x] Açılınca fokus ilk menü linkine taşınır; kapanınca fokus tetikleyiciye döner.
- [x] Menü kapalıyken içerideki linkler Tab ile erişilemez (display: none).
- [x] FAQ accordion düğmesi `<button>`, aria-expanded/controls doğru, Enter/Space ile toggle.
- [x] Projeler lightbox: ESC ile kapanır, ok tuşlarıyla gezilir, fokus tuş döngüsü vardır.

### Screen Reader (SR) Coherence
- [x] Menü tetikleyici `aria-expanded` + `aria-controls` ile güncellenir.
- [x] Mega menu rolü normal nav list semantiğinde (role="menu" kullanılmıyor).
- [x] Icon-only linklerde aria-label mevcut; new-tab linklerde “yeni sekmede açılır” bilgisi korunuyor.

### Images
- [x] Dekoratif görseller alt="" + aria-hidden.
- [x] Anlamlı görsellerde açıklayıcı alt metin korunuyor.

### Motion / Reduced Motion
- [x] `prefers-reduced-motion` etkinse ScrollReveal animasyonları devre dışı.

### Contrast
- [x] Koyu zemin küçük metinler için kontrast güçlendirildi (text-blue-100/90, text-blue-200/80 vb.).

### Links & Labels
- [x] Tek kelimelik linkler için bağlam aria-label ile destekleniyor.
- [x] Tel/mail linkleri anlamlı erişilebilir isme sahip.
- [x] Linkler sadece renkle değil, biçim/ikon veya underline ile ayırt edilebilir.

### HTML Language
- [x] `<html>` dil etiketi `lang` ve `xml:lang` ile tutarlı.

## Uygulanan Fix’ler
1) **Mega menu a11y davranışı**
   - `aria-expanded` ve `aria-controls` summary üzerinde dinamik olarak güncelleniyor.
   - Menü açıldığında fokus ilk linke taşınıyor.
   - ESC ve dış tıklama ile kapanınca fokus tetikleyiciye dönüyor.
   - `role="menu"` / `role="menuitem"` kullanılmıyor (normal nav semantiği).

2) **Yeni sekme linkleri için otomatik a11y**
   - `NewTabAccessibility` root layout’a eklendi: target=_blank linklere rel/aria-label ekler.

3) **FAQ destek kartı**
   - Telefon/WhatsApp/e-posta linklerine görünür fokus ring eklendi.

4) **Projeler lightbox kontrol butonları**
   - Kapat/ileri/geri butonlarında görünür focus ring eklendi.
   - Koyu arka planda kontrast güçlendirildi.

5) **Kurumsal etkinlik CTA**
   - Kart CTA ve banner düğmelerine focus ring eklendi.
   - Koyu zemin üzerinde küçük metin kontrastı artırıldı.
   - Kart CTA linki underline ile renk dışında ayırt edilebilir hale getirildi.

6) **Neden Sahneva başlık etiketi**
   - Üst etiket metin kontrastı iyileştirildi.

7) **Footer alt linkleri**
   - KVKK ve “Başa dön” linklerinde underline varsayılan olarak görünür.

8) **Dil öznitelikleri**
   - `xml:lang` eklendi (lang ile aynı değer).

## Manuel Test Sonuçları
- **Skip link**: Tab → Skip link görünür → Enter → `#_main_content` odak/scroll başarılı.
- **Navbar / Hizmetler**: Enter ile açılır → fokus menü linkine geçer → ESC ile kapanır → fokus summary’ye döner.
- **Hero CTA**: Tab ile erişilebilir, focus ring görünür.
- **FAQ**: Tab ile düğmeye geçilir → Enter ile aç/kapa → `aria-expanded` doğru değişir.
- **Projeler lightbox**: Enter ile açılır → ESC kapanır → fokus geri döner.
- **Footer**: Telefon/e-posta/sosyal ikonlar Tab ile erişilebilir, aria-label’ler okunur.

## Otomatik Kontroller
- **Lint:** `npm run lint` ❌
  - `app/(tr)/blog/kurumsal-etkinlik-yonetimi/page.jsx`: irregular whitespace
  - `app/(tr)/blog/page.jsx`: `BreadcrumbJsonLd` kullanılmıyor
  - `components/HeroSection.js`: `Image` kullanılmıyor
  - `components/ServicesTabs.js`: `initialServiceId` kullanılmıyor
  - `components/Navbar.client.js`: unused eslint-disable uyarısı
- **Lighthouse:** `npx lighthouse http://localhost:3000 --only-categories=accessibility --chrome-flags="--headless --no-sandbox"` ❌ (Chrome bulunamadı / CHROME_PATH ayarlı değil).

## Bilinen Limitler
- Lighthouse accessibility skoru alınamadı (Chrome bulunamadı). Çözüm: CI’da veya local’de CHROME_PATH ayarlanmalı.
- Lint hataları repo genelinde mevcut (bu değişiklikler ile ilgili değil).

## Dosyalar
- `app/layout.js`
- `components/Navbar.client.js`
- `components/Footer.js`
- `components/Faq.jsx`
- `components/ProjectsGallery.js`
- `components/CorporateEvents.js`
- `components/WhyChooseUs.js`
- `components/Navbar.js`
- `components/ServicesDropdownBehavior.client.jsx`
- `components/SkipLinks.jsx`
- `components/NewTabAccessibility.client.jsx`
- `A11Y_REPORT.md`
