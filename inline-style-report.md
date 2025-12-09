# Inline Style Refactor Raporu

- Taranan dosya sayısı: 15
- Bulunan inline stil sayısı: 27
- Otomatik dönüştürülen inline stil sayısı: 22
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
