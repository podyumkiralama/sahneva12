import { LOCALE_CONTENT } from "../../../lib/i18n/localeContent";

const { services } = LOCALE_CONTENT.en.home;

export const metadata = {
  title: "Event Production Services",
  description:
    "Discover Sahneva's stage, LED wall, sound, lighting, tent and seating solutions for corporate events, concerts and launches across Türkiye.",
  alternates: {
    canonical: "https://www.sahneva.com/en/services",
    languages: {
      "tr-TR": "https://www.sahneva.com/hizmetler",
      "ar": "https://www.sahneva.com/ar/services",
    },
  },
};

export default function EnglishServicesPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-neutral-900">{services.title}</h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-600">
          We design, deliver and operate complete event technology packages. Each service can be booked separately or combined into turnkey productions covering structure, visuals, audio, lighting and visitor comfort.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-2">
        {services.items.map((item, idx) => (
          <section key={item.title} id={idx === 0 ? "stage" : idx === 1 ? "led" : idx === 2 ? "audio" : "tents"} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{item.title}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{item.description}</p>
            <p className="mt-4 text-sm leading-6 text-neutral-500">
              {idx === 0 &&
                "Stage decks up to 12x20 metres, custom podium heights, guard rails, ramps and weather protection tailored to your venue."}
              {idx === 1 &&
                "Outdoor-rated cabinets, ground support or flown installation, playback systems, content management and live mixing."}
              {idx === 2 &&
                "Line-array and point-source configurations, digital mixing desks, lighting consoles, rigging and power distribution."}
              {idx === 3 &&
                "Clear-span tents, pagoda tents, banquet seating, lounge concepts and heating/cooling accessories available on request."}
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
