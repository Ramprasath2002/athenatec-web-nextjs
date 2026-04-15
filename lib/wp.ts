const DEFAULT_WP_SITE_URL = "https://athenatec.com";
const LEGACY_WP_SITE_URL = "https://cms.athenatec.com";

function normalizeWpSiteUrl(url?: string | null) {
  const normalized = (url ?? DEFAULT_WP_SITE_URL).trim().replace(/\/+$/, "");

  if (!normalized || normalized === LEGACY_WP_SITE_URL) {
    return DEFAULT_WP_SITE_URL;
  }

  return normalized;
}

export const WP_SITE_URL = normalizeWpSiteUrl(
  process.env.WP_SITE_URL ?? process.env.NEXT_PUBLIC_WP_SITE_URL,
);

export const getCf7Endpoint = (id: string) =>
  `https://athenatec.com/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;

export function getWpApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${WP_SITE_URL}${normalizedPath}`;
}
