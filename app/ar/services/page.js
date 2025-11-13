import { LOCALE_CONTENT } from "../../../lib/i18n/localeContent";

const { services } = LOCALE_CONTENT.ar.home;

export const metadata = {
  title: "خدمات تجهيز الفعاليات",
  description:
    "تعرف على حلول سحنيفا للمنصات، شاشات LED، أنظمة الصوت والإضاءة، الخيام وتجهيزات الجلوس مع تشغيل كامل.",
  alternates: {
    canonical: "https://www.sahneva.com/ar/services",
    languages: {
      "tr-TR": "https://www.sahneva.com/hizmetler",
      "en": "https://www.sahneva.com/en/services",
    },
  },
};

export default function ArabicServicesPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-10" dir="rtl">
      <header className="space-y-4 text-right">
        <h1 className="text-3xl font-black text-neutral-900">{services.title}</h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-600">
          نقدّم حلولاً متكاملة يمكن حجزها بشكل منفصل أو ضمن باقات جاهزة تشمل الهيكل، الشاشات، الصوت، الإضاءة وتجربة الجمهور.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {services.items.map((item, idx) => (
          <section key={item.title} id={idx === 0 ? "stage" : idx === 1 ? "led" : idx === 2 ? "audio" : "tents"} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-right">
            <h2 className="text-xl font-semibold text-neutral-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
            <p className="mt-4 text-sm leading-6 text-neutral-500">
              {idx === 0 &&
                "منصات حتى 12×20 متر، ارتفاعات مخصصة، حواجز أمان، منحدرات وحماية من الأحوال الجوية."}
              {idx === 1 &&
                "ألواح خارجية مقاومة للعوامل الجوية، تعليق أرضي أو معلق، إدارة محتوى وبث مباشر."}
              {idx === 2 &&
                "أنظمة صوت Line-array، طاولات مزج رقمية، وحدات إضاءة، هياكل تراس وتوزيع طاقة."}
              {idx === 3 &&
                "خيام قابلة للتمديد، خيام باجودا، طاولات وكراسي للحفلات مع خيارات تدفئة أو تبريد."}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
