// lib/ledEkranData.js

const PHONE = "+905453048671";

const getServiceWhatsappLink = (title) => {
  const text = `Merhaba, ${title} hizmeti icin detayli bilgi ve fiyat teklifi almak istiyorum. Etkinlik tarihi: [gg.aa.yyyy], mekan: [ic/dis], tahmini ekran olcusu: [xx m2]`;
  return `https://wa.me/${PHONE.replace("+", "")}?text=${encodeURIComponent(text)}`;
};

export const SERVICES = [
  {
    icon: "🖥️",
    title: "İç Mekan LED Ekranlar",
    description: "P2.5-P3.9 piksel aralığı ile yüksek çözünürlüklü iç mekan çözümleri",
    features: ["P2.5-P3.9 piksel", "800-1500 nit parlaklık", "4K çözünürlük", "Hızlı kurulum"],
    cta: { label: "Detaylı Bilgi", href: getServiceWhatsappLink("İç Mekan LED Ekranlar") },
  },
  {
    icon: "🌞",
    title: "Dış Mekan LED Ekranlar",
    description: "P4-P6 piksel aralığı ve yüksek parlaklık ile açık hava çözümleri",
    features: ["P4-P6 piksel", "5000-6500+ nit", "IP65 su geçirmez", "UV dayanıklı"],
    cta: { label: "Teklif Al", href: getServiceWhatsappLink("Dış Mekan LED Ekranlar") },
  },
  {
    icon: "🎬",
    title: "Video Wall Sistemleri",
    description: "Modüler yapıda esnek video wall ve kreatif ekran çözümleri",
    features: ["Modüler tasarım", "Esnek konfigürasyon", "Yüksek yenileme hızı", "Profesyonel kontrol"],
    cta: { label: "Kreatif Çözüm Planla", href: getServiceWhatsappLink("Video Wall Sistemleri") },
  },
  {
    icon: "⚡",
    title: "Kontrol & Yayın Sistemleri",
    description: "Profesyonel video işleme, kontrol ve canlı yayın sistemleri",
    features: ["Novastar işlemciler", "4K scaler", "Medya sunucular", "Canlı yayın"],
    cta: { label: "Yayın Desteği", href: getServiceWhatsappLink("Kontrol & Yayın Sistemleri") },
  },
  {
    icon: "🔧",
    title: "Kurulum & Rigging",
    description: "Profesyonel kurulum, truss sistemleri ve güvenlik çözümleri",
    features: ["Ground stack", "Truss rigging", "Güvenlik sistemleri", "Hızlı montaj"],
    cta: { label: "Kurulum Planı", href: getServiceWhatsappLink("Kurulum & Rigging") },
  },
  {
    icon: "🎮",
    title: "Operatör & Teknik Destek",
    description: "Deneyimli operatörler ve 7/24 teknik destek hizmeti",
    features: ["Profesyonel operatör", "İçerik yönetimi", "7/24 teknik destek", "Acil müdahale"],
    cta: { label: "Operatör Talep Et", href: getServiceWhatsappLink("Operatör & Teknik Destek") },
  },
];

export const USE_CASES = [
  {
    icon: "🎵",
    text: "Konser, festival ve sahne performansları",
    desc: "Ana sahne LED ekranları ve yan ekran çözümleri"
  },
  {
    icon: "💼",
    text: "Kurumsal lansman ve toplantılar",
    desc: "Profesyonel sunum ve marka gösterimi"
  },
  {
    icon: "🎪",
    text: "Fuar, sergi ve ticari etkinlikler",
    desc: "Stand tasarımı ve etkileşimli ekranlar"
  },
  {
    icon: "🏟️",
    text: "Spor etkinlikleri ve stadyumlar",
    desc: "Dev ekranlar ve skorboard sistemleri"
  },
  {
    icon: "🛍️",
    text: "AVM ve perakende mekanları",
    desc: "Reklam ve bilgilendirme ekranları"
  },
  {
    icon: "💒",
    text: "Düğün ve özel davetler",
    desc: "Fotoğraf/video gösterimi ve canlı yayın"
  },
];

export const FAQ_ITEMS = [
  {
    q: "LED ekran kiralama fiyatları ne kadar?",
    a: "LED ekran kiralama fiyatları piksel aralığına ve ekran boyutuna göre değişmektedir. P2.5 iç mekan LED ekran için m² fiyatı 2.800 TL, P4 dış mekan LED ekran için m² fiyatı 1.800 TL'dir. Profesyonel kurulum ve operatör hizmetleri paket fiyatlarına dahildir."
  },
  {
    q: "LED ekran kurulumu ne kadar sürer?",
    a: "Standart bir LED ekran kurulumu 2-6 saat arasında tamamlanır. 20m²'ye kadar küçük kurulumlar 2-3 saat, 20-50m² orta ölçekli kurulumlar 3-4 saat, 50m²+ büyük kurulumlar ise 4-6 saat sürmektedir. Kompleks rigging gerektiren projelerde bu süre 24 saate kadar çıkabilir."
  },
  {
    q: "Yağmurlu havada LED ekran kullanılabilir mi?",
    a: "Evet, dış mekan LED ekranlarımız IP65 koruma sınıfına sahiptir ve yağmurlu havada güvenle kullanılabilir. IP65 koruma, ekranın toza karşı tam korumalı ve su jetlerine karşı korumalı olduğu anlamına gelir. Ancak şiddetli fırtına ve kasırga gibi ekstrem hava koşullarında güvenlik önlemi olarak kullanıma ara verilmesini öneriyoruz."
  },
  {
    q: "LED ekran için hangi piksel aralığını seçmeliyim?",
    a: "Piksel aralığı seçimi izleyici mesafesine göre belirlenmelidir. 3-10m mesafe için P2.5-P3.9, 10-25m mesafe için P4, 25m+ mesafe için P6 piksel aralığı öneriyoruz. İç mekan etkinliklerinde P2.5-P3.9, dış mekan etkinliklerinde ise P4-P6 aralığı tercih edilmektedir."
  },
];

export const GALLERY_IMAGES = [
  {
    src: "/img/galeri/led-ekran-kiralama-1.webp",
    alt: "Konser sahnesinde kurulmuş büyük LED ekran, kalabalık önünde canlı performans gösterimi"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-2.webp",
    alt: "Kurumsal etkinlikte kullanılan LED ekran, sunum sırasında profesyonel aydınlatma ile aydınlatılmış"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-3.webp",
    alt: "Açık hava festivalinde yüksek parlaklıklı LED ekran, gün ışığında net görüntü"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-4.webp",
    alt: "Fuar standında kullanılan video wall sistemi, marka tanıtımı için optimize edilmiş"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-5.webp",
    alt: "Stadyumda dev LED ekran, spor etkinliği sırasında canlı skor ve görüntüler"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-6.webp",
    alt: "Düğün organizasyonunda LED ekran, canlı fotoğraf ve video gösterimi"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-7.webp",
    alt: "TV stüdyosunda kullanılan profesyonel LED ekran, canlı yayın için optimize edilmiş"
  },
  {
    src: "/img/galeri/led-ekran-kiralama-8.webp",
    alt: "Alışveriş merkezinde reklam LED ekranı, yüksek trafikli alanda marka gösterimi"
  },
];

export const WHATSAPP_PHONE = PHONE;
