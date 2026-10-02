/**
 * Contact / lead submission abstraction.
 *
 * The form UI talks only to `submitLead()`. Delivery is intentionally
 * provider-agnostic so it can later connect to Resend, SMTP, a CRM or a
 * serverless endpoint without touching components:
 *
 *   - Set VITE_CONTACT_ENDPOINT to a POST endpoint that accepts JSON
 *     ({ kind, name, email, ...payload }) and returns 200 on success.
 *     Credentials/API keys belong on that server, never in this bundle.
 *   - If no endpoint is configured, submissions are validated, then
 *     composed into a mailto: draft so nothing is silently lost, and the
 *     UI reports success with a clear note.
 */

import { company } from "@/data/company";

export interface LeadPayload {
  kind: "contact" | "discovery";
  name: string;
  email: string;
  company?: string;
  phone?: string;
  whatsapp?: string;
  message?: string;
  projectType?: string;
  industry?: string;
  idea?: string;
  /** Honeypot — must stay empty; filled means bot. */
  website?: string;
}

export interface SubmitResult {
  ok: boolean;
  via: "endpoint" | "mailto";
  error?: string;
}

const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT as string | undefined;

export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

export async function submitLead(lead: LeadPayload): Promise<SubmitResult> {
  // Spam protection: honeypot filled => silently accept and discard.
  if (lead.website) return { ok: true, via: "endpoint" };

  if (endpoint) {
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...lead, submittedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      return { ok: true, via: "endpoint" };
    } catch (err) {
      return { ok: false, via: "endpoint", error: err instanceof Error ? err.message : "Network error" };
    }
  }

  // Fallback: open a pre-filled email draft so the lead still reaches the team.
  const lines = [
    `Type: ${lead.kind === "discovery" ? "Project discovery" : "Contact"}`,
    `Name: ${lead.name}`,
    lead.company && `Company: ${lead.company}`,
    `Email: ${lead.email}`,
    lead.phone && `Phone: ${lead.phone}`,
    lead.whatsapp && `WhatsApp: ${lead.whatsapp}`,
    lead.projectType && `Project type: ${lead.projectType}`,
    lead.industry && `Industry: ${lead.industry}`,
    "",
    lead.idea || lead.message || "",
  ].filter(Boolean);
  const subject = encodeURIComponent(
    lead.kind === "discovery" ? `Project inquiry — ${lead.projectType ?? "New project"}` : `Contact from ${lead.name}`,
  );
  const body = encodeURIComponent(lines.join("\n"));
  window.location.href = `mailto:${company.email}?subject=${subject}&body=${body}`;
  return { ok: true, via: "mailto" };
}
