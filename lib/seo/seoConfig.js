export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "https://www.sahneva.com";

export const OG_IMAGE_PATH = "/img/og/sahneva-og.webp";
export const HOME_PAGE_TITLE =
  "Sahne, Podyum, LED Ekran & Ses Işık Kiralama | Sahneva";

export const buildAlternateLanguages = () => ({
  "tr-TR": `${SITE_URL}/`,
  en: `${SITE_URL}/en`,
  ar: `${SITE_URL}/ar`,
  "x-default": `${SITE_URL}/`,
});

export const buildCanonical = (localePath = "/") => {
  const normalizedPath =
    localePath === "/"
      ? ""
      : `/${localePath.replace(/^\/+/, "").replace(/\/$/, "")}`;

  return `${SITE_URL}${normalizedPath}`;
};

export const getOgImageUrl = () => `${SITE_URL}${OG_IMAGE_PATH}`;
