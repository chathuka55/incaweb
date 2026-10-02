import { useState } from "react";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import { submitLead, validateEmail } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const inputCls =
  "min-h-[48px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [note, setNote] = useState("");

  const set = (key: keyof typeof form, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: "" }));
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Please tell us your name.";
    if (!validateEmail(form.email)) errs.email = "Please enter a valid email address.";
    if (form.message.trim().length < 10) errs.message = "Please add a short message (min. 10 characters).";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setStatus("sending");
    const result = await submitLead({
      kind: "contact",
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || undefined,
      message: form.message.trim(),
      website: form.website,
    });
    if (result.ok) {
      setStatus("success");
      trackEvent("contact_submission", { kind: "contact" });
      setNote(
        result.via === "mailto"
          ? "Your email app should have opened with your message pre-filled — just press send."
          : "We've received your message and will reply soon.",
      );
    } else {
      setStatus("error");
      setNote(result.error ?? "Something went wrong. Please try again or reach us on WhatsApp.");
    }
  };

  if (status === "success") {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center" role="status">
        <CheckCircle2 className="h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-5 font-display text-xl font-bold text-heading">Message ready.</h3>
        <p className="mt-2 max-w-sm text-sm text-muted-foreground">{note}</p>
        <button
          type="button"
          onClick={() => { setForm({ name: "", email: "", company: "", message: "", website: "" }); setStatus("idle"); }}
          className="mt-6 min-h-[44px] rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-4" aria-label="Contact form">
      <input
        type="text" name="website" value={form.website} onChange={(e) => set("website", e.target.value)}
        tabIndex={-1} autoComplete="off" aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="c-name" className="mb-1.5 block text-xs font-semibold text-heading">Name *</label>
          <input id="c-name" type="text" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} aria-invalid={!!errors.name} />
          {errors.name && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="c-email" className="mb-1.5 block text-xs font-semibold text-heading">Email *</label>
          <input id="c-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} aria-invalid={!!errors.email} />
          {errors.email && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="c-company" className="mb-1.5 block text-xs font-semibold text-heading">Company</label>
        <input id="c-company" type="text" autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls} />
      </div>
      <div>
        <label htmlFor="c-message" className="mb-1.5 block text-xs font-semibold text-heading">Message *</label>
        <textarea
          id="c-message" rows={5} value={form.message} onChange={(e) => set("message", e.target.value)}
          placeholder="Tell us about your idea, problem or business process…"
          className={cn(inputCls, "resize-y")} aria-invalid={!!errors.message}
        />
        {errors.message && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.message}</p>}
      </div>
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{note}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="group inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-[#06202E] transition-all duration-300 hover:bg-[#3ec3e0] disabled:opacity-70 sm:w-auto"
      >
        {status === "sending" ? (
          <><Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" /> Sending…</>
        ) : (
          <>Send Message <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" /></>
        )}
      </button>
    </form>
  );
}
