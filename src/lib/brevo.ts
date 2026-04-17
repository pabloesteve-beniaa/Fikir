/**
 * Brevo (ex-Sendinblue) email service integration for Fikir Coffee.
 * Handles newsletter subscriptions and transactional emails.
 */

const BREVO_API_URL = "https://api.brevo.com/v3";
const BREVO_API_KEY = process.env.BREVO_API_KEY || "";

export function isBrevoConfigured(): boolean {
  return Boolean(BREVO_API_KEY);
}

interface BrevoContact {
  email: string;
  firstName?: string;
  listIds?: number[];
  attributes?: Record<string, string>;
  updateEnabled?: boolean;
}

/**
 * Adds or updates a contact in Brevo.
 * @param listIds - Brevo list IDs to add the contact to (get these from Brevo dashboard)
 */
export async function addBrevoContact({
  email,
  firstName,
  listIds = [],
  attributes = {},
  updateEnabled = true,
}: BrevoContact): Promise<{ success: boolean; error?: string }> {
  if (!isBrevoConfigured()) {
    console.warn("Brevo not configured — skipping contact creation");
    return { success: false, error: "Brevo not configured" };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/contacts`, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        updateEnabled,
        listIds,
        attributes: {
          FIRSTNAME: firstName || "",
          SOURCE: "website",
          SIGNUP_DATE: new Date().toISOString().split("T")[0],
          ...attributes,
        },
      }),
    });

    // 204 = success, 400 with "Contact already exist" is also acceptable
    if (response.status === 204 || response.status === 201) {
      return { success: true };
    }

    const data = await response.json();

    // Contact already exists — treat as success
    if (data.code === "duplicate_parameter") {
      return { success: true };
    }

    return { success: false, error: data.message || "Unknown error" };
  } catch (err) {
    console.error("Brevo addContact error:", err);
    return { success: false, error: "Network error" };
  }
}

interface TransactionalEmailParams {
  to: string;
  toName?: string;
  subject: string;
  htmlContent: string;
  replyTo?: string;
}

/**
 * Sends a transactional email via Brevo SMTP.
 * Uses Fikir's brand sender — configure the sender in Brevo dashboard.
 */
export async function sendTransactionalEmail({
  to,
  toName,
  subject,
  htmlContent,
  replyTo = "hola@fikircoffee.com",
}: TransactionalEmailParams): Promise<{ success: boolean; error?: string }> {
  if (!isBrevoConfigured()) {
    console.warn("Brevo not configured — skipping email send");
    return { success: false, error: "Brevo not configured" };
  }

  try {
    const response = await fetch(`${BREVO_API_URL}/smtp/email`, {
      method: "POST",
      headers: {
        "api-key": BREVO_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        sender: { name: "Fikir Coffee", email: "hola@fikircoffee.com" },
        to: [{ email: to, name: toName || to }],
        replyTo: { email: replyTo },
        subject,
        htmlContent,
      }),
    });

    if (response.status === 201) return { success: true };

    const data = await response.json();
    return { success: false, error: data.message || "Email send failed" };
  } catch (err) {
    console.error("Brevo sendEmail error:", err);
    return { success: false, error: "Network error" };
  }
}
