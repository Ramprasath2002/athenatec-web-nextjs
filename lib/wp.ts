const DEFAULT_WP_SITE_URL = "https://athenatec.com";

export const WP_SITE_URL =
  process.env.NEXT_PUBLIC_WP_SITE_URL ?? DEFAULT_WP_SITE_URL;

export function getCf7Endpoint(formId: string) {
  return `${WP_SITE_URL}/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`;
}

export function getWpApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${WP_SITE_URL}${normalizedPath}`;
}
