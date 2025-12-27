// app/(tr)/yardim/page.jsx
import Link from "next/link";
import HeroSearch from "@/components/HeroSearch.client";

export const metadata = {
  title: "Yardım & Keşfet | Sahneva",
  description:
    "Sahneva hizmetleri ve rehber içeriklerde arama yapın, hızlıca doğru sayfaya ulaşın.",
};

const QUICK_CARDS = [
  {
    title: "İşletme Yardım Merkezi",
    desc: "Sahne kurulumu, süreç, teslimat ve sık sorulan sorular.",
    href: "/blog",
  },
  {
    title: "Beceriler ve Eğitim",
    desc: "Etkinlik planlama, teknik ekipman ve doğru seçim rehberleri.",
    href: "/blog",
  },
  {
    title: "Reklamlar Kılavuzu",
    desc: "Kurumsal organizasyonlar için örnek kurulumlar ve kullanım alanları.",
    href: "/kurumsal-organizasyon",
  },
];

export default function HelpPage() {
  return (
    <main className="bg-white min-h-[70vh]">
      <HeroSearch />

      <section className="mx-auto max-w-[1200px] px-6 pb-14">
        <div className="pt-8">
          <div className="text-xs uppercase tracking-wide text-slate-500">
            Önerilen faydalı bağlantılar
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {QUICK_CARDS.map((c) => (
              <Link
                key={c.title}
                href={c.href}
                className="block rounded-2xl border border-slate-200 bg-white p-6 hover:shadow-sm hover:border-slate-300 transition"
              >
                <div className="text-lg font-semibold text-slate-900">
                  {c.title}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">
                  {c.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
