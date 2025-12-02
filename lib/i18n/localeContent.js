// lib/i18n/localeContent.js

export const LOCALE_CONTENT = {
  tr: {
    direction: "ltr",
    // 1. Layout için gerekli META verileri
    meta: {
      title: "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva",
      description: "Türkiye genelinde profesyonel sahne, podyum, LED ekran, ses-ışık ve çadır kiralama hizmetleri.",
    },
    // 2. Navbar için gerekli veriler (Eski yapınıza sadık kalındı)
    navbar: {
      mainNavLabel: "Ana Gezinme",
      tagline: "Profesyonel Etkinlik Çözümleri",
      primaryLinks: [
        { href: "/", label: "Anasayfa", title: "Sahneva Anasayfa" },
        { href: "/hakkimizda", label: "Hakkımızda", title: "Sahneva Hakkında" },
        { href: "/hizmetler", label: "Hizmetler", title: "Hizmetlerimiz" },
        { href: "/iletisim", label: "İletişim", title: "Bize Ulaşın" },
      ],
      servicesLabel: "Hizmetlerimiz",
      callNow: "Hemen Ara",
      whatsappCta: "WhatsApp",
      mobileMenuOpenLabel: "Menüyü Aç",
      mobileMenuCloseLabel: "Menüyü Kapat",
      mobileMenuLabel: "Menü",
      mobileNavLabel: "Mobil Navigasyon",
    },
    skipLinks: {
      toMain: "İçeriğe atla",
      toHeader: "Başlığa atla",
      toFooter: "Altbilgiye atla",
      regionLabel: "Sayfa içi atlama bağlantıları",
    },
    footer: {
      ariaLabel: "Sahneva site altbilgisi",
      about: "Türkiye genelinde profesyonel sahne, podyum, LED ekran, ses ve ışık kiralama hizmetleri. Uzman teknik ekibimizle kurumsal ve halka açık etkinlikleriniz için hızlı kurulum ve yerinde destek sağlıyoruz.",
      phoneLabel: "Telefon",
      mailLabel: "E-posta",
      servicesTitle: "Hizmetlerimiz",
      services: [
        { href: "/sahne-kiralama", label: "Sahne & Podyum Kiralama" },
        { href: "/led-ekran-kiralama", label: "LED Ekran & Görsel Çözümler" },
        { href: "/ses-isik-kiralama", label: "Ses & Işık Sistemleri" },
        { href: "/masa-sandalye-kiralama", label: "Masa & Sandalye Kiralama" },
        { href: "/cadir-kiralama", label: "Etkinlik Çadırları" },
      ],
      officeTitle: "Merkez Ofis",
      address: "Kağıthane / İstanbul\nTürkiye'nin her yerine yerinde hizmet",
      social: [
        { href: "https://www.instagram.com/sahnevaorganizasyon", label: "Instagram" },
        { href: "https://www.youtube.com/@sahneva", label: "YouTube" },
      ],
      rights: "Tüm hakları saklıdır",
    },
    home: {
      hero: {
        title: "Unutulmaz etkinlikler için teknik çözüm ortağınız",
        subtitle: "Türkiye'nin her yerine anahtar teslim sahne, LED ekran, ses ve ışık sistemleri kurulumu.",
        ctaPrimary: "Teklif İste",
        ctaSecondary: "Projelerimizi Gör",
        stats: [
          { label: "Tamamlanan Etkinlik", value: "500+" },
          { label: "Ortalama Kurulum", value: "2-6 saat" },
          { label: "Hizmet Verilen İl", value: "81" },
        ],
      },
      intro: {
        title: "Uçtan uca etkinlik teknolojileri ve prodüksiyon",
        body: "Sahneva; modüler sahneler, podyumlar, LED ekranlar ve profesyonel ses-ışık sistemleri sunan çok disiplinli bir prodüksiyon ekibidir.",
      },
      services: {
        title: "Neler Sunuyoruz?",
        items: [
          { title: "Sahne ve Podyum Yapıları", description: "Modüler sahne sistemleri ve podyumlar." },
          { title: "LED Ekranlar", description: "Yüksek çözünürlüklü iç ve dış mekan LED ekranlar." },
          { title: "Ses ve Işık", description: "Konser standardında ses ve ışık sistemleri." },
          { title: "Çadır ve Dekor", description: "Etkinlik çadırları ve oturma düzenleri." },
        ],
      },
      process: {
        title: "Nasıl Çalışıyoruz?",
        steps: [
          { title: "Planlama", description: "İhtiyaç analizi ve teknik planlama." },
          { title: "Lojistik", description: "Ekipmanların güvenli nakliyesi." },
          { title: "Kurulum", description: "Profesyonel montaj ve test." },
          { title: "Operasyon", description: "Etkinlik süresince teknik destek." },
        ],
      },
      cta: {
        title: "Bir sonraki etkinliğinizi tasarlayalım",
        body: "Detaylı teklif için hemen bize ulaşın.",
        primary: "Teklif Al",
        secondary: "Ara",
      },
    },
  },
  en: {
    direction: "ltr",
    meta: {
      title: "Stage, Podium, LED Screen Rentals | Sahneva",
      description: "Professional event production services across Turkiye.",
    },
    navbar: {
      mainNavLabel: "Main Navigation",
      tagline: "Event Production Solutions",
      primaryLinks: [
        { href: "/en", label: "Home", title: "Home" },
        { href: "/en/about", label: "About", title: "About Us" },
        { href: "/en/services", label: "Services", title: "Our Services" },
        { href: "/en/contact", label: "Contact", title: "Contact Us" },
      ],
      servicesLabel: "Services",
      callNow: "Call Now",
      whatsappCta: "WhatsApp",
      mobileMenuOpenLabel: "Open Menu",
      mobileMenuCloseLabel: "Close Menu",
      mobileMenuLabel: "Menu",
      mobileNavLabel: "Mobile Navigation",
    },
    skipLinks: {
      toMain: "Skip to main content",
      toHeader: "Skip to header",
      toFooter: "Skip to footer",
      regionLabel: "Skip navigation shortcuts",
    },
    footer: {
      ariaLabel: "Site Footer",
      about: "Premium stage, podium, LED screen, sound and lighting rentals.",
      phoneLabel: "Phone",
      mailLabel: "Email",
      servicesTitle: "Key Services",
      services: [
        { href: "/en/stage-rental", label: "Stage Rentals" },
        { href: "/en/services", label: "LED Screens" },
        { href: "/en/services", label: "Sound & Light" },
        { href: "/en/services", label: "Furniture" },
        { href: "/en/services", label: "Tents" },
      ],
      officeTitle: "Head Office",
      address: "Istanbul, Turkiye",
      social: [
        { href: "https://www.instagram.com/sahnevaorganizasyon", label: "Instagram" },
        { href: "https://www.youtube.com/@sahneva", label: "YouTube" },
      ],
      rights: "All rights reserved",
    },
    home: {
      hero: {
        title: "Technical production partner",
        subtitle: "Turnkey installation anywhere in Türkiye.",
        ctaPrimary: "Get Quote",
        ctaSecondary: "Our Work",
        stats: [
          { label: "Events", value: "500+" },
          { label: "Setup Time", value: "2-6 hrs" },
          { label: "Cities", value: "81" },
        ],
      },
      intro: {
        title: "Event Technology",
        body: "We deliver stages, LED screens and audio-light systems.",
      },
      services: {
        title: "What we deliver",
        items: [
          { title: "Stage Structures", description: "Modular systems." },
          { title: "LED Walls", description: "High-res panels." },
          { title: "AV Systems", description: "Sound & Lighting." },
          { title: "Tents", description: "Event tents." },
        ],
      },
      process: {
        title: "How we work",
        steps: [
          { title: "Discovery", description: "Planning." },
          { title: "Logistics", description: "Transport." },
          { title: "Setup", description: "Installation." },
          { title: "Operation", description: "On-site support." },
        ],
      },
      cta: {
        title: "Let's plan your event",
        body: "Contact us for a quote.",
        primary: "Plan Event",
        secondary: "Call Now",
      },
    },
  },
  ar: {
    direction: "rtl",
    meta: {
      title: "تأجير المسارح وشاشات LED | سحنيفا",
      description: "خدمات إنتاج الفعاليات الاحترافية في تركيا.",
    },
    navbar: {
      mainNavLabel: "التنقل الرئيسي",
      tagline: "حلول الفعاليات",
      primaryLinks: [
        { href: "/ar", label: "الرئيسية", title: "الرئيسية" },
        { href: "/ar/about", label: "من نحن", title: "من نحن" },
        { href: "/ar/services", label: "خدماتنا", title: "خدماتنا" },
        { href: "/ar/contact", label: "اتصل بنا", title: "اتصل بنا" },
      ],
      servicesLabel: "الخدمات",
      callNow: "اتصل الآن",
      whatsappCta: "واتساب",
      mobileMenuOpenLabel: "افتح القائمة",
      mobileMenuCloseLabel: "أغلق القائمة",
      mobileMenuLabel: "القائمة",
      mobileNavLabel: "تصفح الجوال",
    },
    skipLinks: {
      toMain: "انتقل للمحتوى",
      toHeader: "انتقل للترويسة",
      toFooter: "انتقل للتذييل",
      regionLabel: "روابط سريعة",
    },
    footer: {
      ariaLabel: "تذييل الموقع",
      about: "تأجير مسارح وشاشات وصوتيات.",
      phoneLabel: "هاتف",
      mailLabel: "بريد",
      servicesTitle: "خدماتنا",
      services: [
        { href: "/ar/services", label: "المسارح" },
        { href: "/ar/services", label: "الشاشات" },
        { href: "/ar/services", label: "الصوتيات" },
        { href: "/ar/services", label: "الأثاث" },
        { href: "/ar/services", label: "الخيام" },
      ],
      officeTitle: "المكتب",
      address: "إسطنبول، تركيا",
      social: [
        { href: "https://www.instagram.com/sahnevaorganizasyon", label: "Instagram" },
        { href: "https://www.youtube.com/@sahneva", label: "YouTube" },
      ],
      rights: "جميع الحقوق محفوظة",
    },
    home: {
      hero: {
        title: "شريكك التقني للفعاليات",
        subtitle: "تركيب وتشغيل في جميع أنحاء تركيا.",
        ctaPrimary: "اطلب عرضاً",
        ctaSecondary: "أعمالنا",
        stats: [
          { label: "فعالية", value: "500+" },
          { label: "زمن التركيب", value: "2-6 ساعات" },
          { label: "مدينة", value: "81" },
        ],
      },
      intro: {
        title: "تكنولوجيا الفعاليات",
        body: "نقدم منصات وشاشات وأنظمة صوت.",
      },
      services: {
        title: "ماذا نقدم",
        items: [
          { title: "المسارح", description: "أنظمة معيارية." },
          { title: "الشاشات", description: "لوحات عالية الدقة." },
          { title: "الصوتيات", description: "أنظمة احترافية." },
          { title: "الخيام", description: "خيام للمناسبات." },
        ],
      },
      process: {
        title: "كيف نعمل",
        steps: [
          { title: "التخطيط", description: "تحليل المتطلبات." },
          { title: "النقل", description: "اللوجستيات." },
          { title: "التركيب", description: "التجهيز." },
          { title: "التشغيل", description: "الدعم الميداني." },
        ],
      },
      cta: {
        title: "لنخطط لفعاليتك",
        body: "تواصل معنا للحصول على عرض.",
        primary: "ابدأ التخطيط",
        secondary: "اتصل الآن",
      },
    },
  },
};
