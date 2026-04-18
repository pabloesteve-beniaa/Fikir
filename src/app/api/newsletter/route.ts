import { NextRequest, NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, honeypot } = body;

    // Honeypot field: real users leave it empty; bots fill it.
    if (honeypot) {
      // Pretend success so bots don't retry
      return NextResponse.json({ success: true }, { status: 200 });
    }

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    const apiKey = process.env.BREVO_API_KEY;
    const listId = process.env.BREVO_NEWSLETTER_LIST_ID;
    if (!apiKey || !listId) {
      console.error("Brevo env vars missing (BREVO_API_KEY / BREVO_NEWSLETTER_LIST_ID)");
      return NextResponse.json({ error: "Servicio no configurado" }, { status: 500 });
    }

    const normalized = email.trim().toLowerCase();

    const res = await fetch(BREVO_CONTACTS_URL, {
      method: "POST",
      headers: {
        "api-key": apiKey,
        "Content-Type": "application/json",
        accept: "application/json",
      },
      body: JSON.stringify({
        email: normalized,
        listIds: [Number(listId)],
        updateEnabled: true,
      }),
    });

    const subscribed = res.status === 201 || res.status === 204;
    let alreadyExists = false;
    if (!subscribed) {
      const data = await res.json().catch(() => ({}));
      if (data?.code === "duplicate_parameter") {
        alreadyExists = true;
      } else {
        console.error("Brevo subscribe failed:", res.status, data);
        return NextResponse.json(
          { error: "No se pudo completar la suscripción" },
          { status: 502 }
        );
      }
    }

    // Fire-and-forget welcome email with discount coupon (only for new subscribers).
    if (!alreadyExists) {
      const origin = request.nextUrl.origin;
      fetch(`${origin}/api/send-welcome`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalized }),
      }).catch((err) => console.error("send-welcome dispatch failed:", err));
    }

    return NextResponse.json({ success: true, alreadyExists }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
