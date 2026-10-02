import { Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { industries } from "@/data/industries";
import { FinalCTA } from "@/sections/home/FinalCTA";

export function IndustriesPage() {
  return (
    <>
      <PageHero
        eyebrow="Industries"
        title={<>Built for the way <span className="text-accent">your industry</span> runs</>}
        description="We don't force one product onto every business. Each system is designed around the workflows, pressures and realities of your industry."
      />
      <section className="bg-background">
        <div className="container-x space-y-16 py-20 sm:py-24">
          {industries.map((ind) => (
            <Reveal key={ind.slug}>
              <article
                id={ind.slug}
                className="grid scroll-mt-24 gap-8 rounded-3xl border border-border bg-card p-7 transition-shadow duration-400 hover:shadow-[0_24px_60px_-30px_rgba(11,35,64,0.3)] sm:p-10 lg:grid-cols-[1fr_1.5fr]"
              >
                <div>
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-heading">
                    <ind.icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-display text-2xl font-bold uppercase text-heading">{ind.name}</h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{ind.description}</p>
                  <div className="mt-6">
                    <CTA to="/start-a-project" variant="ghost-light">{ind.cta}</CTA>
                  </div>
                </div>
                <div className="grid gap-8 sm:grid-cols-2">
                  <div className="rounded-2xl bg-[hsl(var(--soft))] p-6">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Common challenges</h3>
                    <ul className="mt-4 space-y-3">
                      {ind.challenges.map((c) => (
                        <li key={c} className="flex items-start gap-2.5 text-sm text-heading/70">
                          <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-heading/30" aria-hidden="true" />
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-[hsl(var(--navy-deep))] p-6 text-white">
                    <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What we can build</h3>
                    <ul className="mt-4 space-y-3">
                      {ind.solutions.map((s) => (
                        <li key={s} className="flex items-start gap-2.5 text-sm text-white/85">
                          <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                          {s}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
