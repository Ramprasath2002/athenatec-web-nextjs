const DEFAULT_WP_SITE_URL = "https://cms.athenatec.com";

export const WP_SITE_URL =
  (process.env.NEXT_PUBLIC_WP_SITE_URL ?? DEFAULT_WP_SITE_URL).replace(
    /\/+$/,
    "",
  );

export const getCf7Endpoint = (id: string) =>
  `https://athenatec.com/wp-json/contact-form-7/v1/contact-forms/${id}/feedback`;

export function getWpApiUrl(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${WP_SITE_URL}${normalizedPath}`;
}
