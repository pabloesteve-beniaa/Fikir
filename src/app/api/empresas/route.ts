import { NextRequest, NextResponse } from "next/server";
import { escapeHtml, getContactEmail, getSender, sendEmail } from "@/lib/brevo";

const SERVICE_LABELS: Record<string, string> = {
  oficina: "Café para oficina",
  regalo: "Regalos corporativos",
  rsc: "RSC y eventos",
  otro: "Otro",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { empresa, nombre, email, servicio, mensaje } = body;

    if (!nombre || !email) {
      return NextResponse.json(
        { error: "Nombre y email son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    if (!process.env.BREVO_API_KEY) {
      console.error("BREVO_API_KEY missing");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const safeEmpresa = escapeHtml(empresa || "—");
    const safeNombre = escapeHtml(nombre);
    const safeEmail = escapeHtml(email);
    const safeMensaje = escapeHtml(mensaje || "—");
    const servicioLabel =
      SERVICE_LABELS[servicio] || escapeHtml(servicio || "No especificado");

    const teamRes = await sendEmail({
      to: { email: getContactEmail(), name: getSender().name },
      subject: `[B2B] ${servicioLabel} — ${empresa || nombre}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A270D;">Nuevo lead de empresas</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Empresa</td><td style="padding: 8px;">${safeEmpresa}</td></tr>
            <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Nombre</td><td style="padding: 8px;">${safeNombre}</td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${safeEmail}">${safeEmail}</a></td></tr>
            <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Servicio</td><td style="padding: 8px;">${servicioLabel}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
            <strong style="color: #4A270D;">Mensaje:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${safeMensaje}</p>
          </div>
        </div>
      `,
      replyTo: { email, name: nombre },
    });

    const userRes = await sendEmail({
      to: { email, name: nombre },
      subject: "Hemos recibido tu propuesta — Fikir Coffee",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #444;">
          <div style="background: #4A270D; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4892A; margin: 0; font-size: 24px;">Fikir Coffee</h1>
          </div>
          <div style="padding: 32px; background: #FBF7F3; border-radius: 0 0 8px 8px;">
            <h2 style="color: #4A270D;">Hola ${safeNombre},</h2>
            <p>Gracias por tu interés en Fikir Coffee para ${
              safeEmpresa === "—" ? "tu empresa" : safeEmpresa
            }. Revisaremos tu propuesta y te enviaremos una propuesta personalizada en menos de 24 horas laborables.</p>
            <hr style="border: 1px solid #E5DDD5; margin: 24px 0;" />
            <p style="font-size: 12px; color: #aaa;">Fikir Coffee · 100% del beneficio, 100% al origen.</p>
          </div>
        </div>
      `,
    });

    if (!teamRes.ok) {
      return NextResponse.json(
        { error: "No se pudo enviar el mensaje" },
        { status: 502 }
      );
    }

    return NextResponse.json(
      { success: true, confirmationSent: userRes.ok },
      { status: 200 }
    );
  } catch (err) {
    console.error("empresas API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
