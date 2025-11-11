# Sahneva Next.js Uygulaması

Bu depo, Next.js 16 ile oluşturulan Sahneva web uygulamasının kaynak kodlarını içerir. Geliştirme ve üretim süreçlerinde varsayılan olarak Turbopack bundler'ı kullanacak şekilde yapılandırılmıştır.

## Başlangıç

Gereksinimler:

- Node.js \>= 20 ve < 23
- npm

Bağımlılıkları yüklemek için:

```bash
npm install
```

## Geliştirme

Yerel geliştirme sunucusunu Turbopack ile çalıştırmak için:

```bash
npm run dev
```

Webpack tabanlı derleyiciye geçmeniz gerekirse (örneğin nadir uyumluluk sorunlarında) aşağıdaki komut ile Turbopack'i devre dışı bırakabilirsiniz:

```bash
npm run dev:webpack
```

## Üretim Derlemesi

Turbopack kullanarak üretim derlemesi oluşturmak için:

```bash
npm run build
```

Webpack ile klasik derleme almak için:

```bash
npm run build:webpack
```

Oluşan çıktıyı doğrulamak veya dağıtım öncesi test etmek için Next.js'in standart `start` komutunu kullanabilirsiniz:

```bash
npm run start
```

## Ek Komutlar

- `npm run lint`: Next.js lint kontrollerini çalıştırır.
- `npm run analyze`: Bundle analizi oluşturur.
- `npm run security:check`: Next.js güvenlik başlıklarını doğrular.

## Konfigürasyon Notları

- `next.config.mjs` dosyasında `turbopack` anahtarı etkin durumda tutulmuştur.
- `package.json` içindeki varsayılan script'ler Turbopack ile uyumlu olacak şekilde güncellenmiştir.
