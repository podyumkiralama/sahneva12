// app/projeler/page.jsx
import Image from "next/image";
import Link from "next/link";
import { getProjects } from "@/lib/projects";
import { BreadcrumbJsonLd } from "@/components/seo/BreadcrumbJsonLd";

export const revalidate = 1800;
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.sahneva.com").replace(/\/$/, "");

export const metadata = {
  title: "Projeler | Sahneva",
  description: "Gerçekleştirdiğimiz seçili projelerden örnekler. Sahne, podyum, LED ekran, ses-ışık kurulumları.",
  alternates: { canonical: "https://www.sahneva.com/projeler" },
  openGraph: {
    title: "Projeler | Sahneva Organizasyon",
    description: "Gerçekleşen projelerimizin arşivi.",
    url: "https://www.sahneva.com/projeler",
    type: "website",
    images: [
      {
        url: `${SITE_URL}/img/og/sahneva-og.webp`,
        width: 1200,
        height: 630,
        alt: "Sahneva Organizasyon etkinlik prodüksiyon görseli",
      },
    ],
  },
};

function ProjectsStructuredData() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Projeler | Sahneva Organizasyon",
    description:
      "Sahneva Organizasyon tarafından gerçekleştirilen sahne, podyum, LED ekran ve ses-ışık projeleri.",
    url: `${SITE_URL}/projeler`,
    image: `${SITE_URL}/img/og/sahneva-og.webp`,
    inLanguage: "tr-TR",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export default async function ProjectsIndexPage() {
  const baseUrl = SITE_URL;
  const breadcrumbItems = [
    { name: "Ana Sayfa", url: `${baseUrl}/` },
    { name: "Projeler", url: `${baseUrl}/projeler` },
  ];
  const projects = getProjects();

  return (
    <div id="main" className="min-h-screen bg-gradient-to-br from-slate-900 via-[#0b0f1a] to-purple-900/20 text-white">
      <BreadcrumbJsonLd items={breadcrumbItems} baseUrl={baseUrl} />
      <ProjectsStructuredData />
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <section className="relative mx-auto max-w-7xl px-4 pt-20 md:pt-24 pb-20">
        {/* Header Section */}
        <header className="text-center mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
            <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></span>
            <span className="text-sm text-white/70">Proje Portfolyosu</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            <span className="gradient-text gradient-text--safe-xl">
              Projelerimiz
            </span>
          </h1>
          
          <p className="text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            Sahneva olarak hayata geçirdiğimiz 
            <span className="text-blue-300 font-semibold"> unutulmaz anlardan </span>
            seçkiler. Her detayı özenle tasarlanmış projelerimizi keşfedin.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-blue-300">{projects.length}+</div>
              <div className="text-white/60 text-sm">Tamamlanan Proje</div>
            </div>
            <div className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-purple-300">100%</div>
              <div className="text-white/60 text-sm">Müşteri Memnuniyeti</div>
            </div>
          </div>
        </header>

        {/* Projects Grid */}
        <div className="relative">
          <ul
            aria-label="Proje listesi"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
          >
            {projects.map((p, index) => (
              <li
                key={p.slug}
                className="group relative"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
                
                <Link
                  href={`/projeler/${p.slug}`}
                  className="relative flex flex-col h-full bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 overflow-hidden"
                  title={`${p.title} projesini görüntüle`}
                >
                  {/* Image Container */}
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {p.cover ? (
                      <>
                        <Image
                          src={p.cover}
                          alt={`${p.title} – kapak görseli`}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width:1024px) 50vw, 33vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-110"
                          priority={index < 3}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </>
                    ) : (
                      <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-slate-800 to-slate-900 text-white/40">
                        <div className="text-center">
                          <div className="w-12 h-12 bg-white/10 rounded-full grid place-items-center mx-auto mb-2">
                            <span className="text-lg">📷</span>
                          </div>
                          <p className="text-sm">Görsel hazırlanıyor</p>
                        </div>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-6 py-3 rounded-full font-semibold transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        Projeyi İncele
                        <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col gap-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-3">
                        <h2 className="text-xl font-bold text-white leading-tight line-clamp-2">
                          {p.title}
                        </h2>
                        <svg className="w-5 h-5 text-white/40 flex-shrink-0 mt-1 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </div>

                      {p.date && (
                        <time className="inline-flex items-center gap-1 text-sm text-white/60 mb-3" dateTime={p.date}>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {new Date(p.date).toLocaleDateString("tr-TR", {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </time>
                      )}

                      {p.excerpt && (
                        <p className="text-white/80 leading-relaxed line-clamp-3 text-sm md:text-base">
                          {p.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {p.tags?.length > 0 && (
                      <ul
                        className="flex flex-wrap gap-2 list-none p-0 m-0"
                        aria-label="Proje etiketleri"
                      >
                        {p.tags.slice(0, 3).map((t) => (
                          <li key={t}>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border border-blue-500/30">
                              #{t}
                            </span>
                          </li>
                        ))}
                        {p.tags.length > 3 && (
                          <li>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/60">
                              +{p.tags.length - 3}
                            </span>
                          </li>
                        )}
                      </ul>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Empty State */}
        {projects.length === 0 && (
          <div className="text-center py-20">
            <div className="w-24 h-24 bg-white/5 rounded-full grid place-items-center mx-auto mb-6">
              <span className="text-2xl">📁</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Henüz proje bulunmuyor</h3>
            <p className="text-white/60">Yakında burada projelerimizi görebileceksiniz.</p>
          </div>
        )}
      </section>
    </div>
  );
}
