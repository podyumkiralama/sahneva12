export const metadata = {
  title: "تواصل مع سحنيفا",
  description:
    "تواصل مع فريق سحنيفا لطلب عروض الأسعار، التخطيط التقني أو الدعم العاجل في جميع أنحاء تركيا.",
  alternates: {
    canonical: "https://www.sahneva.com/ar/contact",
    languages: {
      "tr-TR": "https://www.sahneva.com/iletisim",
      "en": "https://www.sahneva.com/en/contact",
    },
  },
};

const CONTACT_CHANNELS = [
  {
    title: "واتساب",
    value: "+90 545 304 86 71",
    href: "https://wa.me/905453048671?text=%D8%A3%D8%B1%D9%8A%D8%AF+%D8%B9%D8%B1%D8%B6+%D8%B3%D8%B9%D8%B1+%D9%84%D8%AA%D8%AC%D9%87%D9%8A%D8%B2+%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A9.",
    description: "محادثة فورية مع منسقي الإنتاج لدينا.",
  },
  {
    title: "البريد الإلكتروني",
    value: "info@sahneva.com",
    href: "mailto:info@sahneva.com",
    description: "أرسل المخططات التقنية أو تفاصيل الفعالية.",
  },
  {
    title: "الهاتف",
    value: "+90 545 304 86 71",
    href: "tel:+905453048671",
    description: "تحدث مباشرة مع مدير المشروع.",
  },
];

export default function ArabicContactPage() {
  const contactChannels = Array.isArray(CONTACT_CHANNELS)
    ? CONTACT_CHANNELS
    : [];

  return (
    <div className="container mx-auto space-y-12 px-4 py-10" dir="rtl">
      <header className="space-y-3 text-right">
        <h1 className="text-3xl font-black text-neutral-900">تواصل مع سحنيفا</h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-600">
          شاركنا تفاصيل الفعالية لنرسل لك عرضاً تفصيلياً في نفس اليوم يتضمن المخططات، قائمة الأجهزة والجدول الزمني. يعمل فريقنا في جميع المدن التركية بسرعة استجابة عالية.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {contactChannels.map((channel) => (
          <a
            key={channel.title}
            href={channel.href}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg text-right"
          >
            <h2 className="text-lg font-semibold text-neutral-900">{channel.title}</h2>
            <p className="mt-2 text-base font-bold text-indigo-600">{channel.value}</p>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{channel.description}</p>
          </a>
        ))}
      </div>
    </div>
  );
}
