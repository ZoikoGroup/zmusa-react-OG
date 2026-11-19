// Shared helpers for posting site forms to the Zoiko backend.

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://zmapi.zoikomobile.co.uk";

async function readJson(res) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Sends a form through the contact-us endpoint.
 * `subject` is the first line of the message so the team can tell forms apart;
 * `fields` are appended as "Label: value" lines.
 */
export async function submitContactMessage({ name, email, phone = "", subject, fields = {} }) {
  const lines = [
    subject,
    ...Object.entries(fields).map(
      ([label, value]) =>
        `${label}: ${value === undefined || value === null || value === "" ? "-" : value}`
    ),
  ];

  const res = await fetch(`${API_BASE_URL}/api/contact-us`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: (name || email || "").trim(),
      email: (email || "").trim(),
      phone: (phone || "").trim(),
      message: lines.join("\n"),
    }),
  });

  const data = await readJson(res);
  if (!res.ok) throw new Error(data?.message || "Request failed");
  return data;
}

/** Subscribes an email address to the newsletter list. */
export async function subscribeEmail(email) {
  const res = await fetch(`${API_BASE_URL}/api/v1/subscribe`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: email.trim() }),
  });

  const data = await readJson(res);
  if (!res.ok || data?.success === false) {
    throw new Error(data?.message || "Subscription failed");
  }
  return data;
}

export const FORM_ERROR_MESSAGE =
  "We couldn't send this right now. Please try again in a few minutes.";
