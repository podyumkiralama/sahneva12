# Inline Style Refactor Raporu

- Taranan dosya sayısı: 18
- Bulunan inline stil sayısı: 35
- Otomatik dönüştürülen inline stil sayısı: 30
- Dönüştürülemeyen (dinamik / karmaşık) inline stil sayısı: 5

## Dönüştürülemeyen Inline Stiller

1. `components/StickyVideoRail.jsx:425`
   ```jsx
   style={{
     transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
   }}
   ```
2. `components/Faq.jsx:95`
   ```jsx
   style={{ height }}
   ```
3. `components/MotionPrimitives.client.jsx:69`
   ```jsx
   style={{ transitionDelay: `${delay}ms` }}
   ```
4. `app/(tr)/blog/kurumsal-etkinlik-yonetimi/page.jsx:472`
   ```jsx
   style={{ width: item.w }}
   ```
5. `app/(tr)/projeler/page.js:75`
   ```jsx
   style={{ animationDelay: `${index * 100}ms` }}
   ```

## Anasayfa ve ana bileşenler için 2. pass sonuçları

- app/(tr)/(site)/page.js: 6 inline stil bulundu, 6'sı dönüştürüldü.
- components/HeroSection.js: 1 inline stil bulundu, 1'i dönüştürüldü.
- components/ServicesTabs.js: 1 inline stil bulundu, 1'i dönüştürüldü.
- Yeni dinamik inline stil tespit edilmedi; mevcut 5 dinamik örnek korunmaya devam ediyor.

## Forced Reflow Notları

- components/StickyVideoRail.jsx: Scroll tetikleyicisi requestAnimationFrame ve passive listener ile güncellendi; drag hareketi rAF ile tek frame'de işlenerek zorunlu reflow riski azaltıldı.

## Unused CSS Çalışması

- find:unused-css script'i eklendi ve çalıştırıldı.
- Kullanılmayan 1 class (.hide-scrollbar) kaldırıldı; dinamik gecikme sınıfları doğrulandı.
- non-critical.css mevcut nc-* yardımcılarının tamamı yerinde bırakıldı; kritik dışı bloklar yeniden düzenlenmedi.
- Lighthouse "unused CSS" tasarrufunun azaltılması için CSS tarama altyapısı eklendi.
