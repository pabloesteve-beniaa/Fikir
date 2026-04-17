import { NextRequest, NextResponse } from "next/server";
import { addBrevoContact, sendTransactionalEmail } from "@/lib/brevo";

const TEAM_EMAIL = "hola@fikircoffee.com";

const SUBJECT_LABELS: Record<string, string> = {
  pedido: "Sobre mi pedido",
  producto: "Sobre el café",
  impacto: "Sobre el impacto",
  empresa: "Propuesta para empresas",
  colaborar: "Quiero colaborar",
  otro: "Otro",
};

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, newsletter } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Nombre, email y mensaje son obligatorios" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const subjectLabel = SUBJECT_LABELS[subject] || subject || "Sin asunto";

    // 1. Notify the Fikir team
    await sendTransactionalEmail({
      to: TEAM_EMAIL,
      subject: `[Contacto Fikir] ${subjectLabel} — ${name}`,
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #4A270D;">Nuevo mensaje de contacto</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Nombre</td><td style="padding: 8px;">${name}</td></tr>
            <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Email</td><td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px; font-weight: bold; color: #7B451D;">Asunto</td><td style="padding: 8px;">${subjectLabel}</td></tr>
            <tr style="background: #FBF7F3;"><td style="padding: 8px; font-weight: bold; color: #7B451D;">Newsletter</td><td style="padding: 8px;">${newsletter ? "Sí, quiere suscribirse" : "No"}</td></tr>
          </table>
          <div style="margin-top: 16px; padding: 16px; background: #F5F0EB; border-radius: 8px;">
            <strong style="color: #4A270D;">Mensaje:</strong>
            <p style="margin-top: 8px; white-space: pre-wrap; color: #444;">${message}</p>
          </div>
        </div>
      `,
      replyTo: email,
    });

    // 2. Send confirmation to the user
    await sendTransactionalEmail({
      to: email,
      toName: name,
      subject: "Hemos recibido tu mensaje — Fikir Coffee",
      htmlContent: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; color: #444;">
          <div style="background: #4A270D; padding: 32px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: #D4892A; margin: 0; font-size: 24px;">Fikir Coffee</h1>
          </div>
          <div style="padding: 32px; background: #FBF7F3; border-radius: 0 0 8px 8px;">
            <h2 style="color: #4A270D;">Hola ${name},</h2>
            <p>Hemos recibido tu mensaje y te responderemos en menos de 24 horas laborables.</p>
            <p style="color: #7B451D; font-style: italic;">"${message.slice(0, 150)}${message.length > 150 ? "..." : ""}"</p>
            <hr style="border: 1px solid #E5DDD5; margin: 24px 0;" />
            <p style="font-size: 13px; color: #888;">
              Mientras tanto, puedes explorar nuestro café en
              <a href="https://www.fikircafe.com/tienda" style="color: #2E6B3E;">fikircafe.com</a>.
            </p>
            <p style="font-size: 12px; color: #aaa; margin-top: 24px;">Fikir Coffee · 100% del beneficio, 100% al origen.</p>
          </div>
        </div>
      `,
    });

    // 3. Add to Brevo — newsletter list only if user opted in; otherwise store as contact-form lead.
    const NEWSLETTER_LIST_ID = 2; // Replace with your actual Brevo list ID

    await addBrevoContact({
      email: email.trim().toLowerCase(),
      firstName: name.split(" ")[0],
      listIds: newsletter ? [NEWSLETTER_LIST_ID] : [],
      attributes: {
        SOURCE: "contact-form",
        CONTACT_TYPE: newsletter ? "contact-form" : "contact-form-no-newsletter",
      },
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Contacto API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
