import { getWpApiUrl } from "@/lib/wp";

const WP_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

export async function POST(req: Request) {
  try {
    const incoming = await req.formData();
    const response = await fetch(
      getWpApiUrl("/wp-json/athenatec/v1/apply", WP_SITE_URL),
      {
        method: "POST",
        body: incoming,
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
          success: false,
          message: "Application service returned an unexpected response.",
        },
        { status: 502 },
      );
    }
  } catch (error) {
    console.error("APPLICATION PROXY ERROR:", error);

    return Response.json(
      {
        success: false,
        message: "Application could not be submitted. Please try again.",
      },
      { status: 500 },
    );
  }
}
