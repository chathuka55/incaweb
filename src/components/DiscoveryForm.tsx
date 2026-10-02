import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Loader2, RotateCcw, Send } from "lucide-react";
import { submitLead, validateEmail } from "@/lib/contact";
import { trackEvent } from "@/lib/analytics";
import { cn } from "@/lib/utils";

const projectTypes = [
  "Website", "Web Application", "Mobile App", "POS / ERP",
  "Business Automation", "AI Solution", "Custom Software", "Not Sure",
];
const industryOptions = [
  "Retail", "Hospitality", "Healthcare", "Education", "Finance",
  "Manufacturing", "Logistics", "Services", "Other",
];

interface FormState {
  projectType: string;
  industry: string;
  idea: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  whatsapp: string;
  website: string; // honeypot
}

const initial: FormState = {
  projectType: "", industry: "", idea: "",
  name: "", company: "", email: "", phone: "", whatsapp: "", website: "",
};

const steps = [
  { id: 1, title: "What do you want to build?" },
  { id: 2, title: "What industry are you in?" },
  { id: 3, title: "Tell us about your idea" },
  { id: 4, title: "Your contact details" },
];

function OptionPill({ label, selected, onSelect }: { label: string; selected: boolean; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={cn(
        "min-h-[48px] rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-all duration-300",
        selected
          ? "border-accent bg-primary text-white shadow-[0_10px_28px_-12px_rgba(11,35,64,0.5)]"
          : "border-border bg-card text-heading hover:border-accent/50",
      )}
    >
      <span className="flex items-center justify-between gap-2">
        {label}
        <span className={cn("flex h-4.5 w-4.5 h-[18px] w-[18px] items-center justify-center rounded-full border", selected ? "border-accent bg-accent text-[#06202E]" : "border-border text-transparent")}>
          <Check className="h-3 w-3" aria-hidden="true" />
        </span>
      </span>
    </button>
  );
}

const inputCls =
  "min-h-[48px] w-full rounded-xl border border-border bg-card px-4 py-3 text-sm text-heading placeholder:text-muted-foreground/60 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/25";

export function DiscoveryForm() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormState>(initial);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitNote, setSubmitNote] = useState("");

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  };

  const validateStep = (s: number): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (s === 1 && !form.projectType) e.projectType = "Please choose the closest option.";
    if (s === 2 && !form.industry) e.industry = "Please choose your industry.";
    if (s === 3 && form.idea.trim().length < 10) e.idea = "A sentence or two helps us prepare (min. 10 characters).";
    if (s === 4) {
      if (!form.name.trim()) e.name = "Please tell us your name.";
      if (!validateEmail(form.email)) e.email = "Please enter a valid email address.";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => {
    if (!validateStep(step)) return;
    trackEvent("discovery_step_complete", { step: String(step) });
    setStep((s) => Math.min(s + 1, 4));
  };
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const submit = async () => {
    if (!validateStep(4)) return;
    setStatus("sending");
    const result = await submitLead({
      kind: "discovery",
      name: form.name.trim(),
      email: form.email.trim(),
      company: form.company.trim() || undefined,
      phone: form.phone.trim() || undefined,
      whatsapp: form.whatsapp.trim() || undefined,
      projectType: form.projectType,
      industry: form.industry,
      idea: form.idea.trim(),
      website: form.website,
    });
    if (result.ok) {
      setStatus("success");
      trackEvent("contact_submission", { kind: "discovery" });
      setSubmitNote(
        result.via === "mailto"
          ? "Your email app should have opened with the details pre-filled — just press send."
          : "We've received your project details.",
      );
    } else {
      setStatus("error");
      setSubmitNote(result.error ?? "Something went wrong. Please try again or reach us on WhatsApp.");
    }
  };

  const progress = useMemo(() => (step / steps.length) * 100, [step]);

  if (status === "success") {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-2xl border border-emerald-200 bg-emerald-50/60 p-8 text-center sm:p-12"
        role="status"
      >
        <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-500" aria-hidden="true" />
        <h3 className="mt-5 font-display text-2xl font-bold text-heading">Thank you, {form.name.split(" ")[0]}.</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
          {submitNote} We'll review your {form.projectType.toLowerCase()} idea and get back to you shortly.
        </p>
        <button
          type="button"
          onClick={() => { setForm(initial); setStep(1); setStatus("idle"); }}
          className="mt-7 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold text-heading transition-colors hover:border-accent"
        >
          <RotateCcw className="h-4 w-4" aria-hidden="true" />
          Submit another idea
        </button>
      </motion.div>
    );
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[0_24px_60px_-30px_rgba(11,35,64,0.3)]">
      {/* progress */}
      <div className="border-b border-border px-6 py-5 sm:px-8">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="uppercase tracking-[0.16em] text-heading">Step {step} of {steps.length}</span>
          <span className="text-muted-foreground">{steps[step - 1].title}</span>
        </div>
        <div className="mt-3 h-1 overflow-hidden rounded-full bg-border" role="progressbar" aria-valuenow={step} aria-valuemin={1} aria-valuemax={steps.length}>
          <motion.div className="h-full rounded-full bg-accent" animate={{ width: `${progress}%` }} transition={{ duration: 0.4, ease: "easeOut" }} />
        </div>
      </div>

      <form
        className="p-6 sm:p-8"
        onSubmit={(e) => { e.preventDefault(); step < 4 ? next() : void submit(); }}
        noValidate
      >
        {/* honeypot */}
        <input
          type="text"
          name="website"
          value={form.website}
          onChange={(e) => set("website", e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="pointer-events-none absolute -left-[9999px] h-0 w-0 opacity-0"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            {step === 1 && (
              <fieldset>
                <legend className="font-display text-xl font-bold text-heading">What do you want to build?</legend>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {projectTypes.map((t) => (
                    <OptionPill key={t} label={t} selected={form.projectType === t} onSelect={() => set("projectType", t)} />
                  ))}
                </div>
                {errors.projectType && <p role="alert" className="mt-3 text-xs font-medium text-red-600">{errors.projectType}</p>}
              </fieldset>
            )}

            {step === 2 && (
              <fieldset>
                <legend className="font-display text-xl font-bold text-heading">What industry are you in?</legend>
                <div className="mt-5 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {industryOptions.map((t) => (
                    <OptionPill key={t} label={t} selected={form.industry === t} onSelect={() => set("industry", t)} />
                  ))}
                </div>
                {errors.industry && <p role="alert" className="mt-3 text-xs font-medium text-red-600">{errors.industry}</p>}
              </fieldset>
            )}

            {step === 3 && (
              <div>
                <label htmlFor="idea" className="font-display text-xl font-bold text-heading">Tell us about your idea</label>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  What problem are you solving? Who will use it? Anything you already have in place?
                </p>
                <textarea
                  id="idea"
                  rows={6}
                  value={form.idea}
                  onChange={(e) => set("idea", e.target.value)}
                  placeholder="e.g. We run two retail shops and want one system for billing, stock and reports…"
                  className={cn(inputCls, "mt-4 resize-y")}
                  aria-invalid={!!errors.idea}
                  aria-describedby={errors.idea ? "idea-error" : undefined}
                />
                {errors.idea && <p id="idea-error" role="alert" className="mt-2 text-xs font-medium text-red-600">{errors.idea}</p>}
              </div>
            )}

            {step === 4 && (
              <fieldset>
                <legend className="font-display text-xl font-bold text-heading">Your contact details</legend>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label htmlFor="d-name" className="mb-1.5 block text-xs font-semibold text-heading">Name *</label>
                    <input id="d-name" type="text" autoComplete="name" value={form.name} onChange={(e) => set("name", e.target.value)} className={inputCls} aria-invalid={!!errors.name} />
                    {errors.name && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="d-company" className="mb-1.5 block text-xs font-semibold text-heading">Company</label>
                    <input id="d-company" type="text" autoComplete="organization" value={form.company} onChange={(e) => set("company", e.target.value)} className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="d-email" className="mb-1.5 block text-xs font-semibold text-heading">Email *</label>
                    <input id="d-email" type="email" autoComplete="email" value={form.email} onChange={(e) => set("email", e.target.value)} className={inputCls} aria-invalid={!!errors.email} />
                    {errors.email && <p role="alert" className="mt-1.5 text-xs font-medium text-red-600">{errors.email}</p>}
                  </div>
                  <div>
                    <label htmlFor="d-phone" className="mb-1.5 block text-xs font-semibold text-heading">Phone</label>
                    <input id="d-phone" type="tel" autoComplete="tel" value={form.phone} onChange={(e) => set("phone", e.target.value)} className={inputCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label htmlFor="d-whatsapp" className="mb-1.5 block text-xs font-semibold text-heading">WhatsApp <span className="font-normal text-muted-foreground">(if different)</span></label>
                    <input id="d-whatsapp" type="tel" value={form.whatsapp} onChange={(e) => set("whatsapp", e.target.value)} className={inputCls} />
                  </div>
                </div>
              </fieldset>
            )}
          </motion.div>
        </AnimatePresence>

        {status === "error" && (
          <p role="alert" className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{submitNote}</p>
        )}

        <div className="mt-7 flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={back}
            disabled={step === 1}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full px-4 py-2.5 text-sm font-semibold text-muted-foreground transition-colors enabled:hover:text-heading disabled:opacity-0"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back
          </button>
          {step < 4 ? (
            <button
              type="submit"
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition-all duration-300 hover:bg-[hsl(var(--navy-soft))]"
            >
              Continue
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </button>
          ) : (
            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex min-h-[48px] items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-bold text-[#06202E] transition-all duration-300 hover:bg-[#3ec3e0] disabled:opacity-70"
            >
              {status === "sending" ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Sending…
                </>
              ) : (
                <>
                  Start the Conversation
                  <Send className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-0.5" aria-hidden="true" />
                </>
              )}
            </button>
          )}
        </div>
        <p className="mt-4 text-center text-[11px] leading-relaxed text-muted-foreground">
          No obligation, no pricing calculators — just a real conversation about your project.
        </p>
      </form>
    </div>
  );
}
