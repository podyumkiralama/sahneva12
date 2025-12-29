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

function ImgFrame({
  src,
  alt,
  priority = false,
  className = "",
  imgClassName = "",
  aspectClassName = "aspect-[16/10]",
  sizes = "(max-width: 768px) 100vw, 560px",
}) {
  return (
    <SoftCard className={"overflow-hidden " + className}>
      <div className={"relative w-full " + aspectClassName}>
        <Image
          src={src}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={
            "object-cover transition-transform duration-500 will-change-transform hover:scale-[1.03] " +
            imgClassName
          }
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
      </div>
    </SoftCard>
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

function useParallax() {
  const reduce = usePrefersReducedMotion();
  const wrapRef = useRef(null);
  const [t, setT] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reduce) return;
    const el = wrapRef.current;
    if (!el) return;

    let raf = 0;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (r.width / 2);
      const dy = (e.clientY - cy) / (r.height / 2);

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        setT({
          x: Math.max(-1, Math.min(1, dx)) * 6,
          y: Math.max(-1, Math.min(1, dy)) * 4,
        });
      });
    };

    const onLeave = () => setT({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  return { wrapRef, t };
}

function StepsNav({ steps, onGo, navRef, activeId }) {
  return (
    <div className="mx-auto max-w-6xl px-4" ref={navRef}>
      <div className="sticky top-2 z-20 rounded-2xl border border-white/10 bg-[#0B1120]/70 backdrop-blur supports-[backdrop-filter]:bg-[#0B1120]/50">
        <div className="flex flex-wrap items-center gap-2 p-3">
          <span className="mr-2 text-xs font-semibold text-white/70">Adımlar:</span>

          {steps.map((s) => {
            const id = `adim-${s.stepNo}`;
            const isActive = activeId === id;
            return (
              <button
                key={s.stepNo}
                type="button"
                onClick={() => onGo(id)}
                aria-current={isActive ? "step" : undefined}
                className={
                  "rounded-xl border px-3 py-2 text-xs font-semibold focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 " +
                  (isActive
                    ? "border-white/25 bg-white/15 text-white"
                    : "border-white/10 bg-white/5 text-white/80 hover:bg-white/10")
                }
                title={s.title}
              >
                {s.stepNo}
              </button>
            );
          })}

          <button
            type="button"
            onClick={() => onGo("faq")}
            className="ml-auto rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/80 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          >
            FAQ
          </button>
        </div>
      </div>
    </div>
  );
}

function StepSection({ stepNo, label, title, body, imageSrc, imageAlt, reverse }) {
  const id = `adim-${stepNo}`;
  return (
    <section id={id} className="scroll-mt-28" aria-labelledby={`${id}-title`}>
      <Reveal>
        <div
          className={
            "grid items-center gap-6 lg:gap-10 " +
            (reverse ? "lg:grid-cols-[520px_1fr]" : "lg:grid-cols-[1fr_520px]")
          }
        >
          <div className={reverse ? "lg:order-2" : ""}>
            <div className="flex flex-wrap items-center gap-3">
              <Badge>{label}</Badge>
              <Badge>Adım {stepNo}</Badge>
            </div>

            <h3 id={`${id}-title`} className="mt-4 text-xl font-semibold text-white sm:text-2xl">
              {title}
            </h3>

            <SoftCard className="mt-4 p-5 sm:p-6">
              <div className="prose prose-invert max-w-none prose-p:my-0">{body}</div>
            </SoftCard>
          </div>

          <div className={reverse ? "lg:order-1" : ""}>
            <Reveal>
              <ImgFrame src={imageSrc} alt={imageAlt} />
            </Reveal>
          </div>
        </div>
      </Reveal>
    </section>
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

export default function HowItWorksClient({ stepsData, faqs }) {
  const CTA_BRIEF = "/iletisim";
  const CTA_WHATSAPP = "https://wa.me/905453048671";

  const { navRef, scrollToId } = useSmartScroll();

  const sectionIds = useMemo(() => stepsData.map((s) => `adim-${s.stepNo}`), [stepsData]);
  const activeId = useActiveSection(sectionIds);

  const { wrapRef, t } = useParallax();

  const stepsUi = useMemo(() => {
    return stepsData.map((s) => {
      if (s.stepNo === 1) {
        return {
          ...s,
          body: (
            <>
              <p className="text-sm leading-relaxed text-white/75">
                İhtiyaçlarınızı iletin:{" "}
                <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink>,{" "}
                <InlineLink href="/truss-kiralama">truss</InlineLink>,{" "}
                <InlineLink href="/podyum-kiralama">sahne/podyum</InlineLink>,{" "}
                <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink>.
              </p>
              <p className="mt-3 text-sm leading-relaxed text-white/75">
                <InlineLink href="/iletisim">İletişim formu</InlineLink> ile brief bırakın veya WhatsApp’tan yazın.
              </p>
            </>
          ),
        };
      }
      if (s.stepNo === 3) {
        return {
          ...s,
          body: (
            <p className="text-sm leading-relaxed text-white/75">
              Teklif opsiyonlarına <InlineLink href="/cadir-kiralama">çadır</InlineLink> ve{" "}
              <InlineLink href="/masa-sandalye-kiralama">masa-sandalye</InlineLink> eklenebilir.
            </p>
          ),
        };
      }
      if (s.stepNo === 6) {
        return {
          ...s,
          body: (
            <p className="text-sm leading-relaxed text-white/75">
              Kurulum + testte <InlineLink href="/ses-isik-sistemleri">ses-ışık</InlineLink> ve{" "}
              <InlineLink href="/led-ekran-kiralama">LED ekran</InlineLink> testleri tamamlanır; güvenlik kontrolleri yapılır.
            </p>
          ),
        };
      }
      return { ...s, body: <p className="text-sm leading-relaxed text-white/75">{s.plainText}</p> };
    });
  }, [stepsData]);

  return (
    <>
      <GlowBg />

      {/* HERO */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-16 sm:pb-14 sm:pt-20">
        {/* ✅ Yazı biraz geniş, görsel biraz dar */}
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_680px]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Badge>Sahneva Organizasyon</Badge>
              <Badge>Uçtan uca kurulum</Badge>
              <Badge>Teknik ekip + operasyon</Badge>
            </div>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-5xl">
                Nasıl Çalışıyoruz?
              </h1>
              <p className="mt-3 text-base text-white/70 sm:text-lg">
                Sahneva’da etkinlikler nasıl planlanır, kurulur ve yönetilir?
              </p>
            </div>

            <p className="max-w-3xl text-sm leading-relaxed text-white/75 sm:text-base">
              İhtiyaç → teklif → keşif → kurulum → etkinlik günü → söküm. Süreci uçtan uca yönetir,
              sahada teknik ekiple birlikte kontrol ederiz.
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
              <span>Hızlı linkler:</span>
              <InlineLink href="/truss-kiralama">Truss</InlineLink>
              <span aria-hidden="true">•</span>
              <InlineLink href="/podyum-kiralama">Sahne/Podyum</InlineLink>
              <span aria-hidden="true">•</span>
              <InlineLink href="/ses-isik-sistemleri">Ses-Işık</InlineLink>
            </div>
          </div>

          <div className="lg:justify-self-stretch">
            <Reveal>
              <div ref={wrapRef} className="w-full" style={{ perspective: 900 }}>
                {/* ✅ Görsel az yukarı (12px), parallax korunur */}
                <div
                  className="transition-transform duration-300 will-change-transform"
                  style={{ transform: `translate3d(${t.x}px, calc(${t.y}px - 12px), 0)` }}
                >
                  <ImgFrame
                    src="/img/nasil-calisiriz/hero-surec.webp"
                    alt="Sahneva etkinlik süreci: planlama, kurulum ve operasyon"
                    priority
                    /* aynı oran kalsın */
                    aspectClassName="aspect-[16/3] sm:aspect-[16/9]"
                    /* ✅ görsel çok az küçüldü (daha temiz) */
                    imgClassName="scale-[1.015] origin-center"
                    sizes="(max-width: 768px) 100vw, 820px"
                    className="w-full"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <StepsNav steps={stepsData} onGo={scrollToId} navRef={navRef} activeId={activeId} />

      {/* Enrichment */}
      <section className="mx-auto max-w-6xl px-4 pb-10 pt-6">
        <div className="grid gap-4 lg:grid-cols-3">
          <Reveal>
            <SoftCard className="p-6">
              <h2 className="text-base font-semibold text-white">Neler Dahil?</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• İhtiyaç analizi + teklif</li>
                <li>• Teknik keşif (gerekiyorsa)</li>
                <li>• Kurulum + test + saha operasyonu</li>
                <li>• Söküm + temiz teslim</li>
              </ul>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h2 className="text-base font-semibold text-white">Brief’te Neler Soruyoruz?</h2>
              <ul className="mt-3 space-y-2 text-sm text-white/75">
                <li>• Tarih / lokasyon / alan ölçüsü</li>
                <li>• Sahne ölçüsü ve yükseklik</li>
                <li>• İçerik akışı / program</li>
                <li>• Enerji ve erişim koşulları</li>
              </ul>
            </SoftCard>
          </Reveal>

          <Reveal>
            <SoftCard className="p-6">
              <h2 className="text-base font-semibold text-white">Hızlı İç Linkler</h2>
              <div className="mt-3 grid gap-2 text-sm">
                <InlineLink href="/led-ekran-kiralama">LED Ekran Kiralama</InlineLink>
                <InlineLink href="/truss-kiralama">Truss Kiralama</InlineLink>
                <InlineLink href="/podyum-kiralama">Sahne / Podyum</InlineLink>
                <InlineLink href="/ses-isik-sistemleri">Ses & Işık</InlineLink>
              </div>
            </SoftCard>
          </Reveal>
        </div>
      </section>

      {/* STEPS */}
      <section className="mx-auto max-w-6xl px-4 pb-14" aria-label="Çalışma adımları">
        <h2 className="text-2xl font-semibold text-white">Ana Süreç Adımları</h2>

        <div className="mt-8 grid gap-10">
          {stepsUi.map((s, idx) => (
            <StepSection
              key={`step-${s.stepNo}`}
              stepNo={s.stepNo}
              label={s.label}
              title={s.title}
              body={s.body}
              imageSrc={s.imageSrc}
              imageAlt={s.imageAlt}
              reverse={idx % 2 === 1}
            />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-6xl px-4 pb-20" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-semibold text-white">
          Sık Sorulan Sorular
        </h2>
        <div className="mt-6 grid gap-4">
          {faqs.map((f) => (
            <FaqItem key={f.q} q={f.q} a={f.a} />
          ))}
        </div>
      </section>
    </>
  );
}
