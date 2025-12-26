// app/en/projects/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/projects";

export const revalidate = 1800;

const ORIGIN = "https://www.sahneva.com";

export const metadata = {
  title: "Projects | Sahneva",
  description:
    "Selected examples from our completed events. Stage, podium, LED screen and sound-light installations.",
  alternates: {
    canonical: `${ORIGIN}/en/projects`,
    languages: {
      "tr-TR": `${ORIGIN}/projeler`,
      "en-US": `${ORIGIN}/en/projects`,
      "x-default": `${ORIGIN}/en/projects`,
    },
  },
  openGraph: {
    title: "Projects | Sahneva",
    description: "Archive of our completed projects and event setups.",
    url: `${ORIGIN}/en/projects`,
    type: "website",
    siteName: "Sahneva",
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Sahneva",
    description: "Selected examples from our completed stage and LED screen setups.",
  },
};

export default async function ProjectsIndexPageEn() {
  const projects = getProjects();

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Background decorations */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 right-[-10%] w-80 h-80 bg-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24 pb-20">
        {/* Header Section */}
        <header className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse" />
            <span className="text-sm text-white/70">Project Portfolio</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text gradient-text--safe-xl">
              Our Projects
            </span>
          </h1>

          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70">
            A selection of projects we have brought to life as Sahneva. Explore our meticulously designed
            stages, LED screens and technical setups for corporate events, concerts, fairs and more.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-left md:text-center">
            <div>
              <div className="text-sm text-white/60">Customer Satisfaction</div>
              <div className="text-xl font-semibold text-white">4.9 / 5</div>
            </div>
            <div>
              <div className="text-sm text-white/60">Completed Project</div>
              <div className="text-xl font-semibold text-white">500+</div>
            </div>
          </div>
        </header>

        {/* Projects Grid */}
        <section
          aria-label="Project list"
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((p) => (
            <article
              key={p.slug}
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-300 hover:-translate-y-1 hover:border-blue-400/50 hover:bg-white/10"
            >
              <Link
                href={`/projeler/${p.slug}`}
                title={`View project ${p.title}`}
                className="flex flex-col h-full"
              >
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt={`${p.title} – cover image`}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-slate-900/60">
                      <div className="text-center">
                        <div className="mb-2 text-2xl">🖼️</div>
                        <p className="text-sm text-white/70">Image coming soon</p>
                      </div>
                    </div>
                  )}

                  {/* Hover overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span className="inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-sm font-medium text-slate-900 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                      View project
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col px-5 pb-5 pt-5">
                  {p.date && (
                    <time
                      className="mb-3 inline-flex items-center gap-1 text-sm text-white/60"
                      dateTime={p.date}
                    >
                      <span aria-hidden="true">📅</span>
                      {new Date(p.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </time>
                  )}

                  <h2 className="mb-2 text-lg font-semibold text-white">
                    {p.title}
                  </h2>

                  {p.excerpt && (
                    <p className="mb-4 text-sm text-white/70 line-clamp-3">
                      {p.excerpt}
                    </p>
                  )}

                  {/* Tags */}
                  {p.tags?.length > 0 && (
                    <div
                      className="mt-auto flex flex-wrap gap-2"
                      aria-label="Project tags"
                    >
                      {p.tags.slice(0, 3).map((t) => (
                        <span
                          key={t}
                          className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/80"
                        >
                          {t}
                        </span>
                      ))}
                      {p.tags.length > 3 && (
                        <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/60">
                          +{p.tags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </Link>
            </article>
          ))}
        </section>

        {/* Empty state */}
        {projects.length === 0 && (
          <div className="py-20 text-center">
            <div className="mb-6 mx-auto grid h-24 w-24 place-items-center rounded-full bg-white/5">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">No projects yet</h3>
            <p className="text-white/60">
              You will soon be able to see our reference projects here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
