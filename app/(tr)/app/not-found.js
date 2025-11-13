// app/not-found.js

export const metadata = {
  title: "Sayfa Bulunamadı | Sahneva",
  description: "Aradığınız sayfa bulunamadı veya taşınmış olabilir.",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] flex items-center justify-center bg-white">
      <section className="text-center px-6">
        <h1 className="text-3xl md:text-4xl font-black text-neutral-900 mb-3">404 — Sayfa Bulunamadı</h1>
        <p className="text-neutral-600 mb-6 max-w-xl mx-auto">
          Aradığınız sayfa kaldırılmış, adı değiştirilmiş veya geçici olarak kullanılamıyor olabilir.
        </p>
        <div className="flex items-center justify-center gap-3">
          <a
            href="/"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-lg transition-colors"
          >
            Anasayfaya Dön
          </a>
          <a
            href="/iletisim"
            className="bg-neutral-100 hover:bg-neutral-200 text-neutral-900 font-bold px-5 py-3 rounded-lg transition-colors"
          >
            İletişim
          </a>
        </div>
      </section>
    </main>
  );
}
