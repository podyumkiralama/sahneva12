export const metadata = {
  title: "Sayfa bulunamadı",
};

export default function NotFound() {
  return (
    <main className="min-h-[60vh] container mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl md:text-4xl font-bold">Sayfa bulunamadı</h1>
      <p className="mt-4 text-neutral-600">
        Aradığınız sayfa taşınmış veya hiç var olmamış olabilir.
      </p>
      <a
        href="/"
        className="inline-flex items-center justify-center mt-8 rounded-xl px-5 py-3 font-semibold bg-violet-700 text-white hover:bg-violet-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2"
      >
        Ana sayfaya dön
      </a>
    </main>
  );
}
