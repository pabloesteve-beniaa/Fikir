import { NextRequest, NextResponse } from "next/server";
import { addBrevoContact } from "@/lib/brevo";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, firstName } = body;

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Email requerido" }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Email inválido" }, { status: 400 });
    }

    // IMPORTANT: Replace `2` with the actual Brevo newsletter list ID.
    // Find it in Brevo → Contacts → Lists → click your list → ID in the URL.
    const NEWSLETTER_LIST_ID = 2;

    const result = await addBrevoContact({
      email: email.trim().toLowerCase(),
      firstName: firstName?.trim() || undefined,
      listIds: [NEWSLETTER_LIST_ID],
      attributes: {
        SOURCE: "newsletter-website",
        NEWSLETTER_CONSENT: "yes",
      },
    });

    if (!result.success) {
      console.error("Brevo subscription failed:", result.error);
      // Return success anyway to avoid revealing internal errors to users
      // (and because "already subscribed" is also a success from UX perspective)
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (err) {
    console.error("Newsletter API error:", err);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
