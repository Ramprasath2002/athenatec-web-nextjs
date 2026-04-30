import { getWpApiUrl } from "@/lib/wp";

const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

const RESERVED_CF7_FIELDS = new Set([
  "_wpcf7",
  "_wpcf7_version",
  "_wpcf7_locale",
  "_wpcf7_unit_tag",
  "_wpcf7_container_post",
]);

export async function POST(
  req: Request,
  { params }: { params: Promise<{ formId: string }> },
) {
  try {
    const { formId } = await params;

    if (!/^\d+$/.test(formId)) {
      return Response.json(
        { status: "validation_failed", message: "Invalid form id." },
        { status: 400 },
      );
    }

    const incoming = await req.formData();
    const fd = new FormData();

    fd.append("_wpcf7", formId);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${formId}-o1`);
    fd.append("_wpcf7_container_post", "0");

    for (const [key, value] of incoming.entries()) {
      if (!RESERVED_CF7_FIELDS.has(key)) {
        fd.append(key, value);
      }
    }

    if (!incoming.has("page-url")) {
      fd.append("page-url", req.headers.get("referer") || "");
    }

    const response = await fetch(
      getWpApiUrl(
        `/wp-json/contact-form-7/v1/contact-forms/${formId}/feedback`,
        CF7_SITE_URL,
      ),
      {
        method: "POST",
        body: fd,
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        redirect: "follow",
      },
    );

    const text = await response.text();

    try {
      return Response.json(JSON.parse(text), {
        status: response.ok ? 200 : response.status,
      });
    } catch {
      return Response.json(
        {
          status: "mail_failed",
          message: "Contact service returned an unexpected response.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("CF7 PROXY ERROR:", error);

    return Response.json(
      {
        status: "mail_failed",
        message: "Message could not be sent. Please try again.",
      },
      { status: 500 },
    );
  }
}
