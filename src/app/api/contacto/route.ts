import { NextRequest, NextResponse } from "next/server";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const CONTACT_RECIPIENT = "pablo.esteve@beniaa.com";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, mensaje } = body;

    if (!nombre || !email || !mensaje) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
      console.error("BREVO_API_KEY is not set");
      return NextResponse.json(
        { error: "Servicio no configurado" },
        { status: 500 }
      );
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje);

    const res = await fetch(BREVO_SMTP_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Web Fikir Coffee", email: CONTACT_RECIPIENT },
        to: [{ email: CONTACT_RECIPIENT }],
        replyTo: { email },
        subject: `Nuevo mensaje de contacto - ${nombre}`,
        htmlContent: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
            <h2 style="color: #4A270D;">Nuevo mensaje de contacto</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Nombre</td><td style="padding: 8px;">${safeNombre}</td></tr>
              <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            </table>
            <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
              <strong style="color: #4A270D;">Mensaje:</strong>
              <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${safeMensaje}</p>
            </div>
          </div>
        `,
      }),
    });

    if (res.status === 201) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const data = await res.json().catch(() => ({}));
    console.error("Brevo email failed:", res.status, data);
    return NextResponse.json(
      { error: "No se pudo enviar el mensaje" },
      { status: 502 }
    );
  } catch (err) {
    console.error("Contacto API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
