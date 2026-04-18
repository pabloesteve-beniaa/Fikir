import { NextRequest, NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const NEWSLETTER_LIST_ID = 3; // "Newsletter Fikir"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
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

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: email.trim().toLowerCase(),
        listIds: [NEWSLETTER_LIST_ID],
        updateEnabled: true,
      }),
    });

    if (res.status === 201 || res.status === 204) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    const data = await res.json().catch(() => ({}));
    if (data?.code === "duplicate_parameter") {
      // Already subscribed — treat as success
      return NextResponse.json({ success: true }, { status: 200 });
    }

    console.error("Brevo subscription failed:", res.status, data);
    return NextResponse.json(
      { error: "No se pudo completar la suscripción" },
      { status: 502 }
    );
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
