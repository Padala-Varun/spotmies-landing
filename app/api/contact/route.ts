/**
 * Contact form endpoint. Set CONTACT_WEBHOOK_URL (Slack, Zapier, Make, Formspree, your CRM…)
 * to forward submissions as JSON. Without it the endpoint answers 503 and the form
 * falls back to opening the visitor's email app with the message prefilled.
 */

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  message?: unknown;
  projectTypes?: unknown;
};

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const name = str(body.name, 120);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const message = str(body.message, 5000);
  const projectTypes = Array.isArray(body.projectTypes)
    ? body.projectTypes.filter((t): t is string => typeof t === "string").slice(0, 10)
    : [];

  if (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
    return Response.json({ error: "Please provide a name, a valid email and a short message." }, { status: 422 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (!webhook) {
    return Response.json({ error: "Contact delivery is not configured." }, { status: 503 });
  }

  try {
    const res = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, phone, message, projectTypes, source: "spotmies-landing" }),
    });
    if (!res.ok) return Response.json({ error: "Delivery failed." }, { status: 502 });
  } catch {
    return Response.json({ error: "Delivery failed." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
