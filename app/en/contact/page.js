export const metadata = {
  title: "Contact Sahneva",
  description:
    "Reach out to the Sahneva event production team for quotations, technical planning or last-minute support across Türkiye.",
  alternates: {
    canonical: "https://www.sahneva.com/en/contact",
    languages: {
      "tr-TR": "https://www.sahneva.com/iletisim",
      "ar": "https://www.sahneva.com/ar/contact",
    },
  },
};

const CONTACT_CHANNELS = [
  {
    title: "WhatsApp",
    value: "+90 545 304 86 71",
    href: "https://wa.me/905453048671?text=Hello%2C+I+would+like+to+get+a+quote+for+event+equipment.",
    description: "Instant messaging with our production coordinators.",
  },
  {
    title: "Email",
    value: "info@sahneva.com",
    href: "mailto:info@sahneva.com",
    description: "Send technical drawings or event briefs.",
  },
  {
    title: "Phone",
    value: "+90 545 304 86 71",
    href: "tel:+905453048671",
    description: "Speak directly with a project manager.",
  },
];

export default function EnglishContactPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-10">
      <header className="space-y-3">
        <h1 className="text-3xl font-black text-neutral-900">Contact Sahneva</h1>
        <p className="max-w-2xl text-base leading-7 text-neutral-600">
          Tell us about your event and we will prepare a same-day quotation including technical drawings, gear lists and setup timeline. Our team operates nationwide with fast mobilisation.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-3">
        {CONTACT_CHANNELS.map((channel) => (
          <a
            key={channel.title}
            href={channel.href}
            className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
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
