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

  // Görünür metni string’e çevir (çocuklar metinse)
  const visibleText =
    typeof children === "string" ? children.trim() : "";

  const computedAriaLabel =
    ariaLabel ||
    (visibleText
      ? `${visibleText}${isNewTab ? " (yeni sekmede açılır)" : ""}`
      : undefined);

  // rel güvenliği
  const computedRel =
    isNewTab ? (rel ? `${rel} noopener noreferrer` : "noopener noreferrer") : rel;

  return (
    <a
      href={href}
      target={target}
      rel={computedRel}
      title={title}
      aria-label={computedAriaLabel}
      className={className}
      {...rest}
    >
      {/* Görünür metin */}
      {children}
      {/* Erişilebilirlik: yeni sekme uyarısı (ekranda görünmez) */}
      {isNewTab && (
        <span className="sr-only"> (yeni sekmede açılır)</span>
      )}
    </a>
  );
}