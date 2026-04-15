export const DEFAULT_WP_SITE_URL = "https://athenatec.com";

const WP_SITE_URL = (
  process.env.NEXT_PUBLIC_WP_SITE_URL || DEFAULT_WP_SITE_URL
).replace(/\/+$/, "");

export function getWpApiUrl(path: string, baseUrl = WP_SITE_URL) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${baseUrl.replace(/\/+$/, "")}${normalizedPath}`;
}

export const getCf7Endpoint = (id: string) =>
  `${WP_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;
