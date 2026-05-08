import { NextResponse } from "next/server";

const BREVO_CONTACTS_URL = "https://api.brevo.com/v3/contacts";
const BREVO_API_KEY = process.env.BREVO_API_KEY ?? "";
const BREVO_LIST_ID = process.env.BREVO_NEWSLETTER_LIST_ID;

type Payload = {
  email?: string;
  source?: string;
};

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid_json" }, { status: 400 });
  }

  const email = (payload.email ?? "").trim();
  if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  if (!BREVO_API_KEY) {
    console.warn("[newsletter] BREVO_API_KEY not set, skipping subscribe");
    return NextResponse.json({ ok: true, delivered: false });
  }

  const listIds = BREVO_LIST_ID ? [Number(BREVO_LIST_ID)] : undefined;

  const res = await fetch(BREVO_CONTACTS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": BREVO_API_KEY,
    },
    body: JSON.stringify({
      email,
      attributes: payload.source ? { SOURCE: payload.source } : undefined,
      listIds,
      updateEnabled: true,
    }),
  });

  if (!res.ok && res.status !== 204) {
    const detail = await res.text().catch(() => "");
    console.error("[newsletter] Brevo subscribe failed", res.status, detail);
    return NextResponse.json({ error: "subscribe_failed" }, { status: 502 });
  }

  return NextResponse.json({ ok: true, delivered: true });
}
