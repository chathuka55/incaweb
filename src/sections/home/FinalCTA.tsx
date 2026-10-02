import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { trackEvent } from "@/lib/analytics";

/** "Have an idea?" discovery CTA band */
export function DiscoveryCTA() {
  return (
    <section className="bg-white" aria-labelledby="idea-heading">
      <div className="container-x py-20 sm:py-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-[hsl(var(--navy-deep))] px-7 py-14 text-center text-white sm:px-14 sm:py-18 sm:py-20">
            <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
            <div className="absolute left-1/2 top-0 h-64 w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-[90px]" aria-hidden="true" />
            <div className="relative">
              <p className="eyebrow justify-center after:h-px after:w-8 after:bg-accent/70">Project discovery</p>
              <h2 id="idea-heading" className="mx-auto mt-5 max-w-2xl font-display text-[clamp(1.8rem,4vw,3rem)] font-bold uppercase leading-[1.08] text-balance">
                Have an idea?
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
                Tell us what you're trying to build. Answer four quick questions and we'll take it from there.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                <CTA to="/start-a-project" onClick={() => trackEvent("start_project_click", { location: "discovery_cta" })}>
                  Start the Discovery
                </CTA>
                <CTA to="/contact" variant="secondary">Contact Us</CTA>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Final page CTA — "Ready to build something better?" */
export function FinalCTA() {
  return (
    <section className="bg-[hsl(var(--soft))]" aria-labelledby="final-cta-heading">
      <div className="container-x py-24 sm:py-32">
        <Reveal className="mx-auto max-w-3xl text-center">
          <h2 id="final-cta-heading" className="font-display text-[clamp(1.9rem,4.4vw,3.4rem)] font-bold uppercase leading-[1.06] text-primary text-balance">
            Ready to build something{" "}
            <span className="text-accent">better?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Tell us what you're trying to solve. We'll help turn your idea into a practical digital solution.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <CTA to="/start-a-project" onClick={() => trackEvent("start_project_click", { location: "final_cta" })}>
              Start Your Project
            </CTA>
            <CTA to="/contact" variant="ghost-light">Talk to Us</CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
