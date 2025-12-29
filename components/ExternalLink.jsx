/**
 * Erişilebilir dış bağlantı bileşeni
 * - target="_blank" ise: rel güvenliği + “yeni sekmede açılır” uyarısını aria-label üzerine ekler
 * - aria-label yoksa, görünür metni baz alarak erişilebilir adı otomatik üretir
 * - clsx/extra bağımlılık YOK
 */
export default function ExternalLink({
  href,
  children,
  className = "",
  title,
  target = "_blank",
  rel,
  nofollow = false,
  ariaLabel,
  ...rest
}) {
  const isNewTab = target === "_blank";

  const DEFAULT_BRAND = "Sahneva";

  const getPlatform = (url) => {
    const host = url.hostname.replace(/^www\./, "");

    if (host.includes("instagram.com")) return "instagram";
    if (host.includes("youtube.com")) return "youtube";
    if (host === "wa.me" || host.endsWith("whatsapp.com")) return "whatsapp";
    return undefined;
  };

  // Metni string’e çevir (sadece düz string ise)
  const visibleText =
    typeof children === "string" ? children.trim() : "";

  const hasNewTabHint = (text = "") =>
    /(yeni sekmede açılır|opens in a new tab|علامة تبويب جديدة)/i.test(text);

  // 1) ARIA LABEL
  let platform;
  try {
    platform = getPlatform(
      new URL(
        href,
        typeof window !== "undefined" ? window.location.href : undefined
      )
    );
  } catch {
    platform = undefined;
  }

  const defaultPlatformLabel = {
    instagram: `${DEFAULT_BRAND} Instagram hesabı`,
    youtube: `${DEFAULT_BRAND} YouTube kanalı`,
    whatsapp: `${DEFAULT_BRAND} WhatsApp hattı`,
  }[platform];

  const baseAriaLabel =
    ariaLabel?.trim() || visibleText || defaultPlatformLabel || undefined;

  const computedAriaLabel = isNewTab
    ? baseAriaLabel
      ? hasNewTabHint(baseAriaLabel)
        ? baseAriaLabel
        : `${baseAriaLabel} – yeni sekmede açılır`
      : "Yeni sekmede açılır"
    : baseAriaLabel;

  // 2) REL güvenliği + nofollow (isteğe bağlı)
  let computedRel = rel || "";
  const relParts = new Set(
    computedRel
      .split(" ")
      .map((p) => p.trim())
      .filter(Boolean)
  );

  // Instagram için kimlik bağlantısı
  if (platform === "instagram") {
    relParts.add("me");
  }

  if (isNewTab) {
    // Güvenlik için her zaman ekle
    relParts.add("noopener");
    relParts.add("noreferrer");

    if (nofollow) {
      relParts.add("nofollow");
    }
  }

  computedRel = Array.from(relParts).join(" ");

  // 3) sameAs itemProp (schema.org)
  const itemPropValue =
    rest.itemProp ||
    (platform === "instagram" ||
    platform === "youtube" ||
    platform === "whatsapp"
      ? "sameAs"
      : undefined);

  return (
    <a
      href={href}
      target={target}
      rel={computedRel || undefined}
      title={title}
      aria-label={computedAriaLabel}
      className={className}
      itemProp={itemPropValue}
      data-external-link="true"
      {...rest}
    >
      {/* Görünür içerik */}
      {children}
    </a>
  );
}
