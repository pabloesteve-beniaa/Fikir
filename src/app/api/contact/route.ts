import { NextResponse } from "next/server";

const BREVO_API_URL = "https://api.brevo.com/v3/smtp/email";
const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const CONTACT_TO_EMAIL = process.env.CONTACT_TO_EMAIL ?? "hola@fikircafe.com";
const CONTACT_FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "hola@fikircafe.com";

type ContactPayload = {
  kind?: "contact" | "b2b";
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  company?: string;
  service?: string;
};

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(req: Request) {
  let payload: ContactPayload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (payload.email ?? "").trim();
  const message = (payload.message ?? "").trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }
  if (!message) {
    return NextResponse.json({ error: "missing_message" }, { status: 400 });
  }

  if (!BREVO_API_KEY) {
    console.warn("[contact] BREVO_API_KEY not set, skipping send");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const isB2B = payload.kind === "b2b";
  const subject = isB2B
    ? `Nueva solicitud B2B${payload.company ? ` — ${payload.company}` : ""}`
    : `Nuevo mensaje${payload.subject ? ` — ${payload.subject}` : ""}`;

  const lines: string[] = [];
  if (payload.name) lines.push(`<p><strong>Nombre:</strong> ${escapeHtml(payload.name)}</p>`);
  if (payload.company) lines.push(`<p><strong>Empresa:</strong> ${escapeHtml(payload.company)}</p>`);
  lines.push(`<p><strong>Email:</strong> ${escapeHtml(email)}</p>`);
  if (payload.subject) lines.push(`<p><strong>Asunto:</strong> ${escapeHtml(payload.subject)}</p>`);
  if (payload.service) lines.push(`<p><strong>Interés:</strong> ${escapeHtml(payload.service)}</p>`);
  lines.push(`<p><strong>Mensaje:</strong></p><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>`);

  const res = await fetch(BREVO_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      sender: { email: CONTACT_FROM_EMAIL, name: "Fikir Coffee" },
      to: [{ email: CONTACT_TO_EMAIL }],
      replyTo: { email },
      subject,
      htmlContent: `<div style="font-family:sans-serif">${lines.join("")}</div>`,
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    console.error("[contact] Brevo send failed", res.status, detail);
    return NextResponse.json({ error: "send_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
