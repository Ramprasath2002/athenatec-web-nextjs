const WP_SITE_URL =
  process.env.NEXT_PUBLIC_WP_SITE_URL || "https://cms.athenatec.com";

export function getWpApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${WP_SITE_URL}${normalizedPath}`;
}

export const getCf7Endpoint = (id: string) =>
  `${WP_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;