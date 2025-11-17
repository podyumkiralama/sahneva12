import heroImg from "@/public/img/hero-sahne.webp";

export default function Head() {
  return (
    <>
      <link
        rel="preload"
        as="image"
        href={heroImg.src}
        imageSrcSet="/_next/image?url=%2Fimg%2Fhero-sahne.webp&w=1200&q=85 1200w, /_next/image?url=%2Fimg%2Fhero-sahne.webp&w=1920&q=85 1920w"
        imageSizes="(min-width: 1280px) 1280px, 100vw"
        fetchPriority="high"
      />
    </>
  );
}
