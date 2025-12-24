// components/PriceEstimatorPodyum.jsx
"use client";

import { useId, useMemo, useState } from "react";

import ExternalLink from "@/components/ExternalLink";

export default function PriceEstimatorPodyum({ unitPrices, className = "" }) {
  const [w, setW] = useState(4);
  const [d, setD] = useState(6);
  const [loc, setLoc] = useState("istanbul"); // istanbul | sehir-disi

  const presets = [
    { w: 3, d: 4, label: "3×4" },
    { w: 4, d: 6, label: "4×6" },
    { w: 6, d: 8, label: "6×8" },
  ];

  const { area, perimeter, base, carpet, skirt, paketToplam, lojistikTL, genelToplam } = useMemo(() => {
    const area = Math.max(1, Math.round(Number(w) * Number(d)));
    const perimeter = 2 * (Number(w) + Number(d));
    const base = area * unitPrices.platform_m2_week;
    const carpet = area * unitPrices.carpet_m2_week;
    const skirt = perimeter * unitPrices.skirt_ml_week;
    const paketToplam = base + carpet + skirt;

    // İstanbul içi ≤200 m² sabit 8.000 TL; aksi durumda teklife göre (dahil edilmez)
    const lojistikTL =
      loc === "istanbul" && area <= 200
        ? 8000
        : null;

    const genelToplam = paketToplam + (lojistikTL ?? 0);

    return { area, perimeter, base, carpet, skirt, paketToplam, lojistikTL, genelToplam };
  }, [w, d, loc, unitPrices]);

  const liveTotalText = useMemo(() => {
    const lojistikMetni =
      loc === "istanbul"
        ? area <= 200
          ? `Nakliye ve kurulum dahil ${formatTRY(lojistikTL ?? 0)}`
          : "200 metrekare üzeri projelerde nakliye ve kurulum teklife göre"
        : "Şehir dışı projelerde nakliye ve kurulum teklife göre";

    const genelToplamMetni = lojistikTL ? formatTRY(genelToplam) : "Belirtilmedi";

    return `Önerilen paket toplamı ${formatTRY(paketToplam)}. ${lojistikMetni}. Genel toplam: ${genelToplamMetni}.`;
  }, [area, genelToplam, loc, lojistikTL, paketToplam]);

  return (
    <div
      className={[
        "mx-auto w-full max-w-2xl rounded-2xl border bg-white/90 shadow-sm ring-1 ring-black/5 backdrop-blur",
        className,
      ].join(" ")}
      role="region"
      aria-labelledby="podyum-fiyat-hesaplayici"
      aria-describedby="podyum-fiyat-hesaplayici-aciklama"
    >
      {/* Üst şerit */}
      <div className="rounded-t-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent px-4 py-3 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 id="podyum-fiyat-hesaplayici" className="text-sm font-semibold text-neutral-800">
            Hızlı Fiyat Hesaplama
          </h3>
          <div className="flex flex-wrap gap-1.5">
            {presets.map((p) => {
              const isActive = p.w === w && p.d === d;
              return (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setW(p.w);
                    setD(p.d);
                  }}
                  className={[
                    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-[background,transform] active:scale-[.98]",
                    isActive
                      ? "border-primary/30 bg-primary/15 text-primary"
                      : "border-neutral-200 bg-white hover:bg-neutral-50 text-neutral-700",
                  ].join(" ")}
                  aria-pressed={isActive}
                >
                  {p.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Gövde */}
      <div className="px-4 py-4 sm:px-6 sm:py-6">
        <p id="podyum-fiyat-hesaplayici-aciklama" className="sr-only">
          Ölçüleri, konumu ve paket seçeneklerini güncellediğinizde toplam maliyetler otomatik olarak hesaplanır.
        </p>

        {/* Konum seçimi */}
        <div className="mb-4 grid gap-3 sm:grid-cols-3">
          <SelectField
            label="Konum"
            value={loc}
            onChange={setLoc}
            name="konum"
            options={[
              { value: "istanbul", label: "İstanbul içi" },
              { value: "sehir-disi", label: "Şehir dışı" },
            ]}
          />
          <Field
            label="Genişlik (m)"
            value={w}
            onChange={(v) => setW(sanitizeNum(v))}
            name="genislik"
            inputProps={{ min: 1, step: 0.5, "aria-label": "Podyum genişlik (metre)" }}
          />
          <Field
            label="Derinlik (m)"
            value={d}
            onChange={(v) => setD(sanitizeNum(v))}
            name="derinlik"
            inputProps={{ min: 1, step: 0.5, "aria-label": "Podyum derinlik (metre)" }}
          />
        </div>

        {/* Özet kartları */}
        <div className="grid gap-3 sm:grid-cols-3">
          <Info label="Alan" value={`${area} m²`} />
          <Info label="Çevre" value={`${perimeter} m`} />
          <Info label="Platform" value={formatTRY(base)} emphasize />
        </div>

        {/* Ayrıntı + Toplam */}
        <div className="mt-4 rounded-xl border border-primary/10 bg-primary/5 p-4">
          <Row left="Halı (ops.)" right={formatTRY(carpet)} />
          <Row left="Skört (ops.)" right={formatTRY(skirt)} />
          <Row
            left="Nakliye + Kurulum/Söküm"
            right={
              loc === "istanbul"
                ? (area <= 200 ? formatTRY(lojistikTL ?? 0) : "200 m² üzeri: Teklife göre")
                : "Şehir dışı: Teklife göre"
            }
          />
          <div className="my-3 h-px w-full bg-primary/10" />
          <div className="flex items-baseline justify-between" aria-live="polite" aria-atomic="true">
            <span className="text-[13px] text-neutral-700">Önerilen Paket (Halı + Skört)</span>
            <span className="text-base font-semibold tracking-tight">{formatTRY(paketToplam)}</span>
          </div>
          <div className="mt-1 flex items-baseline justify-between" aria-live="polite" aria-atomic="true">
            <span className="text-[13px] text-neutral-700">Genel Toplam (Paket + Nakliye/Kurulum)</span>
            <span className="text-lg font-semibold tracking-tight text-primary">
              {lojistikTL ? formatTRY(genelToplam) : "—"}
            </span>
          </div>
          <p className="sr-only" aria-live="polite" aria-atomic="true">
            {liveTotalText}
          </p>
        </div>

        {/* Alt satır */}
        <div className="mt-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
          <span className="text-xs text-neutral-500">
            *İstanbul içi ≤200 m² projelerde sabit ₺8.000 uygulanır. Üzeri ve şehir dışı projelerde keşfe/rota ve vardiyaya göre hesaplanır.
          </span>
          <ExternalLink
            href="https://wa.me/905453048671?text=Merhaba%20Sahneva%2C%20Podyum%20fiyat%20hesaplay%C4%B1c%C4%B1s%C4%B1ndan%20yaz%C4%B1yorum."
            className="inline-flex items-center rounded-lg border border-primary/30 bg-white px-3 py-1.5 text-xs font-medium text-primary hover:bg-primary/10"
            ariaLabel="WhatsApp’tan Sor — yeni sekmede açılır"
          >
            WhatsApp’tan Sor
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}

/* ---- Küçük yardımcı bileşenler ---- */

function Field({ label, value, onChange, name, inputProps = {} }) {
  const reactId = useId();
  const inputId = name ?? reactId;
  return (
    <label className="text-xs" htmlFor={inputId}>
      <span className="block text-neutral-600">{label}</span>
      <input
        id={inputId}
        name={name ?? inputId}
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          mt-1 w-full rounded-xl border border-neutral-200 bg-white
          px-3 py-2 text-sm transition-colors duration-200 focus-ring
          focus-visible:border-primary/40
        "
        {...inputProps}
      />
    </label>
  );
}

function SelectField({ label, value, onChange, options, name }) {
  const reactId = useId();
  const selectId = name ?? reactId;
  return (
    <label className="text-xs" htmlFor={selectId}>
      <span className="block text-neutral-600">{label}</span>
      <select
        id={selectId}
        name={name ?? selectId}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          mt-1 w-full rounded-xl border border-neutral-200 bg-white
          px-3 py-2 text-sm transition-colors duration-200 focus-ring
          focus-visible:border-primary/40
        "
        aria-label={label}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}

function Info({ label, value, emphasize = false }) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-3">
      <div className="text-xs text-neutral-500">{label}</div>
      <div className={["font-semibold", emphasize ? "text-primary" : ""].join(" ")}>{value}</div>
    </div>
  );
}

function Row({ left, right }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-neutral-700">{left}</span>
      <span className="font-medium">{right}</span>
    </div>
  );
}

function sanitizeNum(v) {
  const n = Number(v);
  if (Number.isNaN(n) || n <= 0) return 1;
  return Math.round(n * 2) / 2; // 0.5 adım
}

function formatTRY(n) {
  try {
    return new Intl.NumberFormat("tr-TR", {
      style: "currency",
      currency: "TRY",
      maximumFractionDigits: 0,
    }).format(n);
  } catch {
    return `${n} TL`;
  }
}
