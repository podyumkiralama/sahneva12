"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function GlowBg() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[#0B1120]" />
      <div
        className="pointer-events-none absolute inset-0 -z-10 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.06) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
        }}
      />
      <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-48 left-10 -z-10 h-[480px] w-[480px] rounded-full bg-cyan-400/10 blur-3xl" />
    </>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80">
      {children}
    </span>
  );
}

function SoftCard({ children, className = "" }) {
  return (
    <div
      className={
        "rounded-2xl border border-white/10 bg-white/[0.03] shadow-[0_0_0_1px_rgba(255,255,255,0.03)] " +
        "transition-transform duration-300 hover:-translate-y-1 hover:bg-white/[0.045] " +
        className
      }
    >
      {children}
    </div>
  );
}

function usePrefersReducedMotion() {
  const [reduce, setReduce] = useState(false);
  useEffect(() => {
    const m = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!m) return;
    const onChange = () => setReduce(!!m.matches);
    onChange();
    m.addEventListener?.("change", onChange);
    return () => m.removeEventListener?.("change", onChange);
  }, []);
  return reduce;
}

function Reveal({ children }) {
  const reduce = usePrefersReducedMotion();
  const ref = useRef(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (reduce) {
      setShown(true);
      return;
    }
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, [reduce]);

  return (
    <div
      ref={ref}
      className={
        "transition-all duration-700 will-change-transform " +
        (shown ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4")
      }
    >
      {children}
    </div>
  );
}

function InlineLink({ href, children }) {
  return (
    <Link
      href={href}
      className="font-semibold text-white underline decoration-white/30 underline-offset-4 hover:decoration-white/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 rounded"
    >
      {children}
    </Link>
  );
}

/* Smart scroll */
function useSmartScroll() {
  const navRef = useRef(null);

  const scrollToId = (id) => {
    const el = document.getElementById(id);
    if (!el) return;

    const navH = navRef.current?.offsetHeight ?? 0;
    const extra = 12;
    const y = el.getBoundingClientRect().top + window.scrollY - navH - extra;

    window.history.replaceState(null, "", `#${id}`);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return { navRef, scrollToId };
}

function useActiveSection(ids) {
  const [activeId, setActiveId] = useState(ids?.[0] ?? null);

  useEffect(() => {
    if (!ids?.length) return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean);
    if (!els.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0))[0];
        if (visible?.target?.id) setActiveId(visible.target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: [0.1, 0.2, 0.35, 0.5] }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);

  return activeId;
}

function StepsNav({ steps, onGo, navRef, activeId }) {
  return (
    <div className="mx-auto max-w-6xl px-4" ref={navRef}>
      <div className="sticky top-2 z-20 rounded-2xl border border-white/10 bg-[#0B1120]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B1120]/50">
        <div className="flex flex-wrap items-center gap-2 p-3">
          <span className="mr-2 text-xs font-semibold text-white/70">Kısayollar:</span>

          {steps.map((s) => {
            const isActive = activeId === s.id;
            return (
              <button
                key={s.id}
                type="button"
                onClick={() => onGo(s.id)}
                aria-current={isActive ? "step" : undefined}
                className={
                  "rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 " +
                  (isActive
                    ? "border-white/25 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10")
                }
                title={s.desc}
              >
                {s.title}
              </button>
            );
          })}

          <Link
            href="/iletisim"
            className="ml-auto rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            Teklif Al
          </Link>
        </div>
      </div>
    </div>
  );
}

function CityCard({ name, desc, href, imgSrc }) {
  return (
    <SoftCard className="p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold text-white">{name}</h3>
          <p className="mt-2 text-sm text-white/70">{desc}</p>
        </div>
        <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-white/80">
          ↗
        </span>
      </div>

      <div className="mt-4">
        <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02]">
          <Image
            src={imgSrc}
            alt={`${name} bölgesel kiralama görseli`}
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            className="object-cover opacity-90"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
        </div>
      </div>

      <Link
        href={href}
        className="mt-4 inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
        aria-label={`${name} için teklif almak üzere iletişime git`}
      >
        {name} için Teklif Al
      </Link>
    </SoftCard>
  );
}

function FaqItem({ q, a }) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:bg-white/[0.045]">
      <summary className="cursor-pointer list-none select-none">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-base font-semibold text-white">{q}</h3>
          <span
            className="mt-0.5 inline-flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white/80 group-open:bg-white/10"
            aria-hidden="true"
          >
            +
          </span>
        </div>
        <p className="mt-2 text-sm text-white/60">Cevabı görmek için tıklayın.</p>
      </summary>
      <div className="mt-3 text-sm leading-relaxed text-white/75">{a}</div>
    </details>
  );
}

export default function RegionalRentalClient({ regions, services, faqs, steps }) {
  const CTA_BRIEF = "/iletisim";
  const CTA_WHATSAPP = "https://wa.me/905453048671";

  const IMG_DIR = "/img/bolgesel-kiralama";

  const cityImages = useMemo(() => {
    const map = {};
    regions.forEach((r) => {
      map[r.slug] = `${IMG_DIR}/${r.slug}.webp`;
    });
    return map;
  }, [regions]);

  const ids = useMemo(() => steps.map((s) => s.id), [steps]);
  const activeId = useActiveSection(ids);
  const { navRef, scrollToId } = useSmartScroll();

  return (
    <>
      <GlowBg />

    {/* HERO */}
<section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pb-14 sm:pt-20">
  {/* ✅ Burada büyüttük: sağ kolon 680px */}
  <div className="grid items-start gap-8 lg:grid-cols-[1.15fr_680px]">
    {/* Sol (yazı) */}
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-center gap-3">
        <Badge>Türkiye geneli</Badge>
        <Badge>Kurulum + operasyon</Badge>
        <Badge>Hızlı teklif</Badge>
      </div>

      <div>
        <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
          Bölgesel Kiralama
        </h1>
        <p className="mt-3 text-base text-white/70 sm:text-lg">
          Bulunduğunuz şehre göre planlayalım: LED ekran, truss, sahne/podyum ve ses-ışık.
        </p>
      </div>

      <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
        Sahneva, şehir bazlı lojistik ve ekip planlamasıyla etkinlik kurulumlarını uçtan uca yönetir.
        Teklif aşamasında teknik gereksinimleri netleştirir, kurulum ve testleri planlar, etkinlik günü
        operasyon desteği sağlar ve söküm sonrası alanı düzenli şekilde teslim eder.
      </p>

      <div className="flex flex-wrap gap-3">
        <Link
          href={CTA_BRIEF}
          className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          İletişim / Brief Bırak
        </Link>

        <a
          href={CTA_WHATSAPP}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
          aria-label="WhatsApp üzerinden iletişime geç (yeni sekmede açılır)"
        >
          WhatsApp’tan Yazın
        </a>
      </div>

      <div className="flex flex-wrap gap-2 text-xs text-white/60">
        <span>Önerilen paketler:</span>
        <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>
        <span aria-hidden="true">•</span>
        <InlineLink href="/truss-kiralama">truss</InlineLink>
        <span aria-hidden="true">•</span>
        <InlineLink href="/podyum-kiralama">sahne/podyum</InlineLink>
        <span aria-hidden="true">•</span>
        <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>
      </div>
    </div>

    {/* Sağ (görsel) */}
    {/* ✅ Görseli “dolu” göstermek için: aspect + sizes + az yukarı */}
    <div className="lg:justify-self-stretch lg:-mt-2 w-full">
      <Reveal>
        <SoftCard className="overflow-hidden">
          <div className="relative aspect-[16/3] sm:aspect-[16/9] w-full">
            <Image
              src="/img/bolgesel-kiralama/hero.webp"
              alt="Sahneva bölgesel kiralama: ekip, planlama ve operasyon"
              fill
              priority
              sizes="(max-width: 768px) 100vw, 820px"
              className="object-cover object-[50%_35%] transition-transform duration-500 will-change-transform hover:scale-[1.03]"
              style={{ transform: "translate3d(0, -12px, 0)" }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-transparent" />
          </div>
        </SoftCard>
      </Reveal>
    </div>
  </div>
</section>

      {/* STICKY NAV */}
      <StepsNav steps={steps} onGo={scrollToId} navRef={navRef} activeId={activeId} />

      {/* HİZMETLER */}
      <section id="hizmetler" className="mx-auto max-w-6xl px-4 pb-10 pt-6 scroll-mt-28">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            <SoftCard className="p-6">
              <h2 className="text-base font-semibold text-white">Hizmet Kataloğu</h2>
              <p className="mt-2 text-sm text-white/70">
                Şehre göre aynı projede birden fazla kalemi paketleyebiliriz.
              </p>

              <div className="mt-4 grid gap-2 text-sm">
                {services.map((s) => (
                  <Link
                    key={s.href}
                    href={s.href}
                    className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 font-semibold text-white/85 hover:bg-white/[0.06] focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
                  >
                    {s.title}
                  </Link>
                ))}
              </div>
            </SoftCard>

            <SoftCard className="p-6 lg:col-span-2">
              <h2 className="text-base font-semibold text-white">Bölgesel Kiralama Neden Önemli?</h2>

              <div className="mt-3 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-white">Doğru lojistik planlama</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Mesafe, ekip sayısı ve kurulum süresi şehir bazında değişir. Bu sayfa, planı doğru kurar.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-white">Tek ekip, tek koordinasyon</h3>
                  <p className="mt-2 text-sm text-white/70">
                    LED ekran + truss + sahne/podyum + ses-ışık tek takvim ve tek sorumlulukla yürür.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-white">Teklif daha hızlı netleşir</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Şehir bilgisi, taşıma/kurulum varsayımlarını netleştirir; fiyatlandırma daha doğru çıkar.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                  <h3 className="text-sm font-semibold text-white">Sahada risk azalır</h3>
                  <p className="mt-2 text-sm text-white/70">
                    Erişim, enerji, zemin ve güvenlik kontrol listeleri önceden planlanır.
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5">
                <p className="text-sm text-white/75">
                  Özellikle{" "}
                  <InlineLink href="/truss-kiralama">truss</InlineLink> ve{" "}
                  <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>{" "}
                  içeren projelerde şehir bazlı planlama; kurulum süresi, güvenlik ve enerji gereksinimleri açısından kritik fark yaratır.
                </p>
              </div>
            </SoftCard>
          </div>
        </Reveal>
      </section>

      {/* SÜREÇ */}
      <section id="surec" className="mx-auto max-w-6xl px-4 pb-14 scroll-mt-28" aria-label="Süreç">
        <h2 className="text-2xl font-semibold text-white">Süreç Nasıl İlerler?</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Bölgesel kurulumlarda hedef: doğru ekipman, doğru ekip ve doğru zamanlama. Süreci standartlaştırırız.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-3">
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">1) Brief & ihtiyaç</h3>
              <p className="mt-2 text-sm text-white/70">
                Tarih, şehir, alan ölçüsü ve hizmet kalemleri netleşir. Gerekirse hızlı keşif planlanır.
              </p>
            </SoftCard>
          </Reveal>
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">2) Teklif & planlama</h3>
              <p className="mt-2 text-sm text-white/70">
                Paket/opsiyonlar hazırlanır. Lojistik, kurulum süresi ve ekip planı şehre göre çıkarılır.
              </p>
            </SoftCard>
          </Reveal>
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">3) Kurulum & test</h3>
              <p className="mt-2 text-sm text-white/70">
                Kurulum (çoğunlukla 24–48 saat önce), testler, kablolama ve güvenlik kontrolleri tamamlanır.
              </p>
            </SoftCard>
          </Reveal>
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">4) Etkinlik günü</h3>
              <p className="mt-2 text-sm text-white/70">
                Operasyon ekibi sahada akışı takip eder; ses-görüntü, ışık ve sahne güvenliği yönetilir.
              </p>
            </SoftCard>
          </Reveal>
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">5) Söküm & teslim</h3>
              <p className="mt-2 text-sm text-white/70">
                Etkinlik sonrası söküm yapılır; ekipman güvenli şekilde toplanır ve alan temiz teslim edilir.
              </p>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">Hızlı teklif için</h3>
              <p className="mt-2 text-sm text-white/70">
                Şehir + tarih + etkinlik türü + ihtiyaç listesi yeterli. Kalan detayları birlikte netleştiririz.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Link
                  href="/iletisim"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                >
                  Brief Bırak
                </Link>
                <a
                  href={CTA_WHATSAPP}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
                  aria-label="WhatsApp üzerinden yaz (yeni sekmede açılır)"
                >
                  WhatsApp
                </a>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>

      {/* BÖLGELER */}
      <section id="bolgeler" className="mx-auto max-w-6xl px-4 pb-14 scroll-mt-28" aria-label="Bölgeler">
        <h2 className="text-2xl font-semibold text-white">Şehrinizi Seçin</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Şehre göre ulaşım, ekip sayısı ve kurulum takvimi netleşir. Teklif için şehrinizi seçin.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {regions.map((r) => (
            <Reveal key={r.slug}>
              <CityCard
                name={r.name}
                desc={r.desc}
                imgSrc={cityImages[r.slug]}
                href={`/iletisim?konu=bolgesel-kiralama&sehir=${encodeURIComponent(r.name)}`}
              />
            </Reveal>
          ))}
        </div>
      </section>

      {/* PLANLAMA / CHECKLIST */}
      <section id="planlama" className="mx-auto max-w-6xl px-4 pb-14 scroll-mt-28" aria-label="Planlama">
        <h2 className="text-2xl font-semibold text-white">Planlama Kontrol Listesi</h2>
        <p className="mt-2 max-w-3xl text-sm text-white/70">
          Bölgesel kurulumlarda en çok vakit kazandıran şey: doğru ön bilgi. Aşağıdaki maddeler teklif ve kurulum hızını artırır.
        </p>

        <div className="mt-8 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">Mekân / erişim</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Yükleme alanı / asansör / kapı genişliği</li>
                <li>• Kurulum saat aralığı (mekân kuralları)</li>
                <li>• Zemin tipi (çim, beton, parke) ve düzlüğü</li>
                <li>• Truss / sahne için yükseklik sınırı</li>
              </ul>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">Enerji / güvenlik</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Elektrik gücü (kW) ve priz tipi</li>
                <li>• Kablo geçiş güzergâhı, sabitleme noktaları</li>
                <li>• Bariyer/çevreleme ihtiyacı</li>
                <li>• Yağmur/rüzgâr planı (açık hava)</li>
              </ul>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">İçerik / program</h3>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Program akışı ve sahne giriş-çıkışları</li>
                <li>• LED ekran içerik formatları (çözünürlük/oran)</li>
                <li>• Mikrofon sayısı ve konuşmacı planı</li>
                <li>• Işık senaryosu (açılış, konuşma, final)</li>
              </ul>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h3 className="text-base font-semibold text-white">Önerilen iç linkler</h3>
              <p className="mt-2 text-sm text-white/70">
                İhtiyacınıza göre ilgili sayfalara göz atın:
              </p>
              <div className="mt-4 grid gap-2 text-sm">
                <InlineLink href="/led-ekran-kiralama">LED Ekran Kiralama</InlineLink>
                <InlineLink href="/truss-kiralama">Truss Kiralama</InlineLink>
                <InlineLink href="/podyum-kiralama">Sahne / Podyum</InlineLink>
                <InlineLink href="/ses-isik-sistemleri">Ses & Işık</InlineLink>
                <InlineLink href="/cadir-kiralama">Çadır Kiralama</InlineLink>
                <InlineLink href="/masa-sandalye-kiralama">Masa & Sandalye</InlineLink>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section id="sss" className="mx-auto max-w-6xl px-4 pb-20 scroll-mt-28" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-semibold text-white">
          Sık Sorulan Sorular
        </h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <h3 className="text-base font-semibold text-white">Hızlı teklif</h3>
          <p className="mt-2 text-sm text-white/70">
            “Şehir + tarih + etkinlik türü + ihtiyaçlar” yeterli. Ekibimiz hızlıca dönüş yapar.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href={CTA_BRIEF}
              className="inline-flex items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Brief Bırak
            </Link>
            <a
              href={CTA_WHATSAPP}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-semibold text-white hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="WhatsApp üzerinden yaz (yeni sekmede açılır)"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
