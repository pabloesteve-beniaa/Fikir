import { NextRequest, NextResponse } from "next/server";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";

/**
 * Sends the newsletter welcome email with the 5% discount coupon
 * via a Brevo template (configure template in Brevo dashboard).
 */
export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const templateId = process.env.BREVO_WELCOME_TEMPLATE_ID;
    if (!apiKey || !templateId) {
      console.error("Brevo env vars missing (BREVO_API_KEY / BREVO_WELCOME_TEMPLATE_ID)");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const res = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        templateId: Number(templateId),
        to: [{ email }],
      }),
    });

    if (res.status === 201) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const data = await res.json().catch(() => ({}));
    console.error("Welcome email failed:", res.status, data);
    return NextResponse.json(
      { error: "No se pudo enviar el email de bienvenida" },
      { status: 502 }
    );
  } catch (err) {
    console.error("send-welcome API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
