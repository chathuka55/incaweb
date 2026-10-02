import { MessageCircle } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { DiscoveryForm } from "@/components/DiscoveryForm";
import { company } from "@/data/company";
import { trackEvent } from "@/lib/analytics";

export function StartProjectPage() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--soft))] pb-24 pt-36 sm:pb-32" aria-labelledby="start-heading">
      <div className="bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_50%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.25fr] lg:gap-16">
          <Reveal>
            <p className="eyebrow">Start a project</p>
            <h1 id="start-heading" className="mt-5 font-display text-[clamp(1.9rem,4.4vw,3.2rem)] font-bold uppercase leading-[1.06] text-heading text-balance">
              Tell us what you're trying to build.
            </h1>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Four quick steps. No obligation, no automated pricing — just the start of a real
              conversation about your project.
            </p>
            <div className="mt-8 rounded-2xl bg-[hsl(var(--navy-deep))] p-6 text-white">
              <p className="text-sm font-semibold">Prefer to just talk?</p>
              <p className="mt-1.5 text-sm leading-relaxed text-white/60">
                Message us on WhatsApp and we'll take it from there.
              </p>
              <a
                href={company.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("whatsapp_click", { location: "start_project_page" })}
                className="mt-4 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-bold text-[#062E16] transition-all duration-300 hover:brightness-110"
              >
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                WhatsApp {company.whatsappDisplay}
              </a>
            </div>
          </Reveal>
          <Reveal delay={140}>
            <DiscoveryForm />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
