export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href="/img/hero-bg.webp"
        imageSrcSet="/img/hero-bg.webp"
        imageSizes="100vw"
        fetchPriority="high"
      />
    </>
  );
}
