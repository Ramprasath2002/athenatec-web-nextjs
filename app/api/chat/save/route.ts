import { getWpApiUrl } from "@/lib/wp";

const CF7_FORM_ID = "224297";
const CF7_SITE_URL = process.env.WP_SITE_URL || "https://cms.athenatec.com";

export async function POST(req: Request) {
  try {
    const { name, email, services, messages } = await req.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    const safeService =
      typeof services === "string" && services.trim()
        ? services.trim()
        : "Not specified";

    const transcript = (messages ?? [])
      .map(
        (msg: { role: string; content: string; timestamp?: string }) =>
          `[${msg.role === "user" ? "👤 User" : "🤖 Bot"}${
            msg.timestamp ? ` ${msg.timestamp}` : ""
          }]: ${msg.content}`
      )
      .join("\n\n");

    const chatSummary = `
── Chatbot Lead ──────────────────────────
Name:     ${name}
Email:    ${email}
Services: ${safeService}
Time:     ${new Date().toLocaleString("en-US", {
      timeZone: "Asia/Kolkata",
    })}
──────────────────────────────────────────

${transcript}
    `.trim();

    const CF7_URL = getWpApiUrl(
      `/wp-json/contact-form-7/v1/contact-forms/${CF7_FORM_ID}/feedback`,
      CF7_SITE_URL
    );

    const fd = new FormData();

    // CF7 required fields
    fd.append("_wpcf7", CF7_FORM_ID);
    fd.append("_wpcf7_version", "5.9");
    fd.append("_wpcf7_locale", "en_US");
    fd.append("_wpcf7_unit_tag", `wpcf7-f${CF7_FORM_ID}-o1`);
    fd.append("_wpcf7_container_post", "0");

    // Your fields
    fd.append("your-name", name);
    fd.append("your-email", email);
    fd.append("your-message", chatSummary);
    fd.append("your-service", safeService);
    fd.append("your-page", "Chatbot");
    fd.append("your-source", "chatbot-widget");

    const response = await fetch(CF7_URL, {
      method: "POST",
      body: fd,
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
      redirect: "follow",
    });

    const text = await response.text();
    console.log("CF7 RAW:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      return new Response(
        JSON.stringify({ error: "Invalid response from WordPress", raw: text }),
        { status: 500 }
      );
    }

    console.log("CF7 PARSED:", data);

    if (data.status === "mail_sent") {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200 }
      );
    }

    return new Response(
      JSON.stringify({
        success: false,
        cf7Status: data.status,
        details: data,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("SAVE LEAD ERROR:", err);
    return new Response(
      JSON.stringify({ error: "Server error" }),
      { status: 500 }
    );
  }
}
