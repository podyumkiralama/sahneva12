export const metadata = {
  title: "Recent Projects",
  description:
    "Highlights from Sahneva productions including corporate launches, concerts, public festivals and sporting ceremonies across Türkiye.",
  alternates: {
    canonical: "https://www.sahneva.com/en/projects",
    languages: {
      "tr-TR": "https://www.sahneva.com/projeler",
      "ar": "https://www.sahneva.com/ar/projects",
    },
  },
};

const PROJECTS = [
  {
    title: "Istanbul corporate launch",
    description:
      "High-end LED wall with live broadcast integration, modular stage and dynamic lighting for a technology brand product reveal.",
    details: "Indoor venue — 800 guests",
  },
  {
    title: "Ankara open-air concert",
    description:
      "24m concert stage, line-array PA, lighting truss and 40 m² outdoor LED screen with content control room.",
    details: "Outdoor — 25,000 audience",
  },
  {
    title: "Izmir sports festival",
    description:
      "Ceremonial podium, LED scoreboards, commentary booth, distributed sound system and VIP tent structures.",
    details: "Seaside arena — 3 days",
  },
];

export default function EnglishProjectsPage() {
  return (
    <div className="container mx-auto space-y-12 px-4 py-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-black text-neutral-900">Recent case studies</h1>
        <p className="max-w-3xl text-base leading-7 text-neutral-600">
          Every project is engineered to match venue requirements, audience capacity and creative direction. Explore a selection of productions delivered by Sahneva across Türkiye.
        </p>
      </header>

      <div className="grid gap-8 md:grid-cols-3">
        {PROJECTS.map((project) => (
          <article key={project.title} className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-neutral-900">{project.title}</h2>
            <p className="mt-3 text-sm leading-6 text-neutral-600">{project.description}</p>
            <p className="mt-4 text-xs uppercase tracking-wide text-neutral-500">{project.details}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
