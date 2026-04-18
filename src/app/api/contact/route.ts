import { NextRequest, NextResponse } from "next/server";

const BREVO_SMTP_URL = "https://api.brevo.com/v3/smtp/email";
const TEAM_EMAIL = "hola@fikircafe.com";
const TEAM_NAME = "Fikir Coffee";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const SUBJECT_LABELS: Record<string, string> = {
  pedido: "Sobre mi pedido",
  producto: "Sobre el café",
  impacto: "Sobre el impacto",
  empresa: "Propuesta para empresas",
  colaborar: "Quiero colaborar",
  otro: "Otro",
};

async function sendBrevo(apiKey: string, payload: object): Promise<boolean> {
  const res = await fetch(BREVO_SMTP_URL, {
    method: "POST",
    headers: {
      "api-key": apiKey,
      "Content-Type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify(payload),
  });
  if (res.status !== 201) {
    const data = await res.json().catch(() => ({}));
    console.error("Brevo email failed:", res.status, data);
    return false;
  }
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { nombre, email, asunto, mensaje } = body;

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
      console.error("BREVO_API_KEY missing");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje);
    const subjectLabel = SUBJECT_LABELS[asunto] || escapeHtml(asunto || "Sin asunto");

    // 1. Notify team
    const teamOk = await sendBrevo(apiKey, {
      sender: { name: "Web Fikir Coffee", email: TEAM_EMAIL },
      to: [{ email: TEAM_EMAIL, name: TEAM_NAME }],
      replyTo: { email },
      subject: `[Contacto] ${subjectLabel} — ${nombre}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A270D;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Nombre</td><td style="padding: 8px;">${safeNombre}</td></tr>
            <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Asunto</td><td style="padding: 8px;">${subjectLabel}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
            <strong style="color: #4A270D;">Mensaje:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${safeMensaje}</p>
          </div>
        </div>
      `,
    });

    // 2. Confirmation to user
    const userOk = await sendBrevo(apiKey, {
      sender: { name: TEAM_NAME, email: TEAM_EMAIL },
      to: [{ email, name: nombre }],
      subject: "Hemos recibido tu mensaje — Fikir Coffee",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #444;">
          <div style="background: #4A270D; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4892A; margin: 0; font-size: 24px;">Fikir Coffee</h1>
          </div>
          <div style="padding: 32px; background: #FBF7F3; border-radius: 0 0 8px 8px;">
            <h2 style="color: #4A270D;">Hola ${safeNombre},</h2>
            <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas laborables.</p>
            <hr style="border: 1px solid #E5DDD5; margin: 24px 0;" />
            <p style="font-size: 12px; color: #aaa;">Fikir Coffee · 100% del beneficio, 100% al origen.</p>
          </div>
        </div>
      `,
    });

    if (!teamOk) {
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, confirmationSent: userOk },
      { status: 200 }
    );
  } catch (err) {
    console.error("contact API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
