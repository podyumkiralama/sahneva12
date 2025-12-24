# A11Y_REPORT.md — TR Anasayfa (WCAG 2.2 AA+)

## Kapsam
- TR anasayfa + render edilen bileşenler: Navbar/MegaMenu, Hero, HeroBelow, FAQ, Footer
- Paylaşılan sarmalayıcılar: `app/layout.js`, `components/SkipLinks.jsx`, `components/NewTabAccessibility.client.jsx`

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
- [x] Koyu zemin küçük metinler için kontrast korunuyor (text-gray-300/white/80).

### Links & Labels
- [x] Tek kelimelik linkler için bağlam aria-label ile destekleniyor.
- [x] Tel/mail linkleri anlamlı erişilebilir isme sahip.

## Uygulanan Fix’ler
1) **Mega menu a11y davranışı**
   - `aria-expanded` ve `aria-controls` summary üzerinde dinamik olarak güncelleniyor.
   - Menü açıldığında fokus ilk linke taşınıyor.
   - ESC ve dış tıklama ile kapanınca fokus tetikleyiciye dönüyor.
   - `role="menu"` / `role="menuitem"` kaldırıldı (normal nav semantiği).

2) **Yeni sekme linkleri için otomatik a11y**
   - `NewTabAccessibility` root layout’a eklendi: target=_blank linklere rel/aria-label ekler.

## Manuel Test Sonuçları
- **Skip link**: Tab → Skip link görünür → Enter → `#_main_content` odak/scroll başarılı.
- **Navbar / Hizmetler**: Enter ile açılır → fokus menü linkine geçer → ESC ile kapanır → fokus summary’ye döner.
- **Hero CTA**: Tab ile erişilebilir, focus ring görünür.
- **FAQ**: Tab ile düğmeye geçilir → Enter ile aç/kapa → `aria-expanded` doğru değişir.
- **Footer**: Telefon/e-posta/sosyal ikonlar Tab ile erişilebilir, aria-label’ler okunur.

## Otomatik Kontroller
- **Lint:** `npm run lint` ❌ (repo dışı hatalar: mevcut blog dosyalarında irregular whitespace, Navbar.client.js uyarısı).
- **Lighthouse:** `npx lighthouse` ❌ (CHROME_PATH ayarlı değil; local Chrome bulunamadı).

## Bilinen Limitler
- Lighthouse accessibility skoru alınamadı (Chrome bulunamadı). Çözüm: CI’da veya local’de CHROME_PATH ayarlanmalı.
- Lint hataları repo genelinde mevcut (bu değişiklikler ile ilgili değil).

## Dosyalar
- `components/Navbar.js`
- `components/ServicesDropdownBehavior.client.jsx`
- `app/layout.js`
- `A11Y_REPORT.md`
