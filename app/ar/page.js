import Link from "next/link";
import { LOCALE_CONTENT } from "../../lib/i18n/localeContent";

const { home } = LOCALE_CONTENT.ar;

export const metadata = {
  title: "تجهيز وتأجير منصات وشاشات LED في تركيا",
  description:
    "سحنيفا توفر منصات، شاشات LED، أنظمة صوت وإضاءة مع تركيب وتشغيل كامل في جميع المدن التركية.",
  alternates: {
    canonical: "https://www.sahneva.com/ar",
    languages: {
      "tr-TR": "https://www.sahneva.com/",
      "en": "https://www.sahneva.com/en",
    },
  },
};

export default function ArabicHomePage() {
  return (
    <div className="space-y-16" dir="rtl">
      <section className="bg-gradient-to-br from-indigo-700 via-purple-700 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-20 sm:py-24">
          <div className="grid gap-12 lg:grid-cols-[1.1fr,0.9fr]">
            <div className="space-y-6 text-right">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1 text-sm font-semibold">
                <span aria-hidden="true">⚡</span>حلول تقنية متكاملة للفعاليات
              </span>
              <h1 className="text-3xl font-black leading-tight sm:text-4xl lg:text-5xl">
                {home.hero.title}
              </h1>
              <p className="max-w-xl text-lg text-white/90">{home.hero.subtitle}</p>
              <div className="flex flex-wrap justify-end gap-4">
                <a
                  href="https://wa.me/905453048671?text=%D8%A3%D8%B1%D9%8A%D8%AF+%D8%B9%D8%B1%D8%B6+%D8%B3%D8%B9%D8%B1+%D9%84%D8%AA%D8%AC%D9%87%D9%8A%D8%B2+%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A9."
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg hover:shadow-xl"
                >
                  <span aria-hidden="true">💬</span>
                  {home.hero.ctaPrimary}
                </a>
                <Link
                  href="/ar/projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
                >
                  {home.hero.ctaSecondary}
                </Link>
              </div>
            </div>
            <div className="grid content-end gap-4 sm:grid-cols-3">
              {home.hero.stats.map((item) => (
                <div key={item.label} className="rounded-2xl bg-white/10 p-4 text-center">
                  <div className="text-2xl font-black">{item.value}</div>
                  <div className="text-xs font-semibold uppercase tracking-wide text-white/70">
                    {item.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl border border-neutral-200 bg-white/80 p-8 shadow-lg backdrop-blur">
          <h2 className="text-2xl font-bold text-neutral-900">{home.intro.title}</h2>
          <p className="mt-4 text-base leading-7 text-neutral-700">{home.intro.body}</p>
        </div>
      </section>

      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-neutral-900">{home.services.title}</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {home.services.items.map((service) => (
              <div key={service.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm text-right">
                <h3 className="text-lg font-semibold text-neutral-900">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-50 via-white to-blue-50 p-10">
          <h2 className="text-2xl font-bold text-neutral-900">{home.process.title}</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {home.process.steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-indigo-100 bg-white/70 p-6 shadow-sm text-right">
                <div className="text-sm font-semibold uppercase tracking-wide text-indigo-500">الخطوة {index + 1}</div>
                <h3 className="mt-2 text-lg font-semibold text-neutral-900">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-neutral-600">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-indigo-900 py-20 text-white">
        <div className="container mx-auto px-4">
          <div className="ms-auto max-w-3xl space-y-6 text-right">
            <h2 className="text-3xl font-black leading-tight">{home.cta.title}</h2>
            <p className="text-lg text-white/80">{home.cta.body}</p>
            <div className="flex flex-wrap justify-end gap-4">
              <a
                href="https://wa.me/905453048671?text=%D8%A3%D8%B1%D9%8A%D8%AF+%D8%B9%D8%B1%D8%B6+%D8%B3%D8%B9%D8%B1+%D9%84%D8%AA%D8%AC%D9%87%D9%8A%D8%B2+%D9%81%D8%B9%D8%A7%D9%84%D9%8A%D8%A9."
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-bold text-indigo-700 shadow-lg hover:shadow-xl"
              >
                <span aria-hidden="true">📝</span>
                {home.cta.primary}
              </a>
              <a
                href="tel:+905453048671"
                className="inline-flex items-center gap-2 rounded-xl border border-white/80 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10"
              >
                <span aria-hidden="true">📞</span>
                {home.cta.secondary}
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
