export default function PageSection({
  variant = "light",
  className = "",
  role,
  ...props
}) {
  const variants = {
    light: "py-12 bg-white",
    lightGrid: "relative py-8 bg-gradient-to-b from-white to-neutral-50/80",
    dark: "py-12 bg-gradient-to-br from-neutral-900 to-blue-900/95",
    brand: "py-12 bg-gradient-to-br from-blue-50/80 to-purple-50/60",
  };

  const variantClass = variants[variant] || variants.light;
  const ariaLabelledby = props["aria-labelledby"];
  const ariaLabel = props["aria-label"];
  const computedRole = role ?? (ariaLabelledby || ariaLabel ? "region" : undefined);

  return (
    <section
      role={computedRole}
      className={`nc-SitePage-section-1 ${variantClass} ${className}`.trim()}
      {...props}
    />
  );
}
