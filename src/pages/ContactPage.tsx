import { Facebook, Instagram, Mail, MessageCircle, Phone } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { company } from "@/data/company";
import { trackEvent } from "@/lib/analytics";

const channels = [
  {
    icon: MessageCircle,
    label: "WhatsApp",
    value: company.whatsappDisplay,
    href: company.whatsappHref,
    note: "Fastest response",
    external: true,
    event: "whatsapp_click" as const,
  },
  {
    icon: Phone,
    label: "Phone",
    value: company.phoneDisplay,
    href: company.phoneHref,
    note: "Call us directly",
    external: false,
  },
  {
    icon: Mail,
    label: "Email",
    value: company.email,
    href: company.emailHref,
    note: "We reply to every message",
    external: false,
  },
];

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Let's build <span className="text-accent">something.</span></>}
        description="Have an idea, problem or business process that could be improved with technology? Let's talk."
      />
      <section className="bg-background">
        <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase text-heading">Reach us directly</h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">
              Choose whichever channel suits you. No tickets, no bots — you'll talk to the people who build the software.
            </p>
            <div className="mt-8 space-y-3">
              {channels.map((c) => (
                <a
                  key={c.label}
                  href={c.href}
                  {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  onClick={() => c.event && trackEvent(c.event, { location: "contact_page" })}
                  className="group flex min-h-[64px] items-center gap-4 rounded-2xl border border-border p-4 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_16px_40px_-20px_rgba(11,35,64,0.3)]"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-heading transition-colors duration-300 group-hover:bg-accent group-hover:text-[#06202E]">
                    <c.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">{c.label} · {c.note}</span>
                    <span className="block truncate text-[15px] font-semibold text-heading">{c.value}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className="mt-8 flex items-center gap-3">
              <span className="text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">Follow us</span>
              <a
                href={company.facebook} target="_blank" rel="noopener noreferrer" aria-label="INCASOFT on Facebook"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-heading transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <Facebook className="h-[18px] w-[18px]" />
              </a>
              <a
                href={company.instagram} target="_blank" rel="noopener noreferrer" aria-label="INCASOFT on Instagram"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-heading transition-all duration-300 hover:border-accent hover:text-accent"
              >
                <Instagram className="h-[18px] w-[18px]" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl border border-border bg-[hsl(var(--soft))] p-6 sm:p-8">
              <h2 className="font-display text-xl font-bold text-heading">Send us a message</h2>
              <p className="mt-1.5 text-sm text-muted-foreground">We usually reply within one business day.</p>
              <div className="mt-6">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
