import { Resend } from "resend";

type InquiryPayload = {
  source: "domestic" | "global";
  name: string;
  company?: string;
  country?: string;
  phone?: string;
  email: string;
  inquiryType: string;
  quantity?: string;
  message: string;
};

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    const adminEmail = process.env.ADMIN_EMAIL;

    if (!apiKey || !adminEmail) {
      return Response.json({
        ok: true,
        skipped: true,
        message: "Email notification skipped because RESEND_API_KEY or ADMIN_EMAIL is not configured.",
      });
    }

    const payload = (await request.json()) as InquiryPayload;
    const resend = new Resend(apiKey);

    const sourceLabel =
      payload.source === "domestic" ? "Domestic Inquiry" : "Global Inquiry";

    const safeMessage = payload.message.replaceAll("\n", "<br />");

    const html = `
      <div style="font-family:Arial,sans-serif;line-height:1.7;color:#111827;">
        <h2>UREVS O New Inquiry</h2>
        <p><strong>Source:</strong> ${sourceLabel}</p>
        <p><strong>Name:</strong> ${payload.name}</p>
        <p><strong>Company:</strong> ${payload.company || "-"}</p>
        <p><strong>Country:</strong> ${payload.country || "-"}</p>
        <p><strong>Phone:</strong> ${payload.phone || "-"}</p>
        <p><strong>Email:</strong> ${payload.email}</p>
        <p><strong>Inquiry Type:</strong> ${payload.inquiryType}</p>
        <p><strong>Quantity:</strong> ${payload.quantity || "-"}</p>
        <hr />
        <p><strong>Message</strong></p>
        <p>${safeMessage}</p>
      </div>
    `;

    const { data, error } = await resend.emails.send({
      from: "UREVS O <onboarding@resend.dev>",
      to: [adminEmail],
      subject: `[UREVS O] New ${sourceLabel}`,
      html,
    });

    if (error) {
      return Response.json({ ok: false, error }, { status: 500 });
    }

    return Response.json({ ok: true, data });
  } catch (error) {
    return Response.json(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
