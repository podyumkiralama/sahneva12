/**
 * Erişilebilir dış bağlantı bileşeni
 * - target="_blank" ise: rel güvenliği + “(yeni sekmede açılır)” sr-only uyarısı ekler
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
  ariaLabel,
  ...rest
}) {
  const isNewTab = target === "_blank";

  // Metni string’e çevir (sadece düz string ise)
  const visibleText =
    typeof children === "string" ? children.trim() : "";

  // 1) ARIA LABEL
  // - Eğer ariaLabel prop geldiyse: aynen kullan
  // - Yoksa: sadece görünür metni kullan (uyarıyı sr-only vereceğiz)
  const computedAriaLabel = ariaLabel || (visibleText || undefined);

  // 2) REL güvenliği + nofollow (isteğe bağlı)
  let computedRel = rel || "";
  if (isNewTab) {
    const relParts = new Set(
      computedRel
        .split(" ")
        .map((p) => p.trim())
        .filter(Boolean)
    );
    relParts.add("noopener");
    relParts.add("noreferrer");

    // Harici link ise nofollow ekle
    try {
      const url = new URL(href, typeof window !== "undefined" ? window.location.href : undefined);
      if (typeof window !== "undefined" && url.origin !== window.location.origin) {
        relParts.add("nofollow");
      }
    } catch {
      // Hata olursa zorlamadan bırak
    }

    computedRel = Array.from(relParts).join(" ");
  }

  return (
    <a
      href={href}
      target={target}
      rel={computedRel || undefined}
      title={title}
      aria-label={computedAriaLabel}
      className={className}
      {...rest}
    >
      {/* Görünür içerik */}
      {children}
      {/* Erişilebilirlik: yeni sekme uyarısı (ekranda görünmez) */}
      {isNewTab && (
        <span className="sr-only"> (yeni sekmede açılır)</span>
      )}
    </a>
  );
}
