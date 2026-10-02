import { ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { Link } from "@/lib/router";
import { solutions } from "@/data/solutions";
import { FinalCTA } from "@/sections/home/FinalCTA";

export function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Solutions"
        title={<>What we <span className="text-accent">build</span></>}
        description="Eight ways we help businesses work smarter — from custom software and apps to automation, POS/ERP, AI and long-term support."
      />
      <section className="bg-white">
        <div className="container-x space-y-6 py-20 sm:py-24">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={Math.min(i * 60, 200)}>
              <Link
                to={`/solutions/${s.slug}`}
                className="group grid gap-5 rounded-2xl border border-border bg-white p-6 transition-all duration-400 hover:border-accent/60 hover:shadow-[0_24px_50px_-22px_rgba(11,35,64,0.35)] sm:grid-cols-[auto_1fr_auto] sm:items-center sm:p-8"
              >
                <div className="flex items-center gap-4">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-primary transition-all duration-400 group-hover:bg-accent group-hover:text-[#06202E]">
                    <s.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="font-display text-sm font-bold text-primary/25 group-hover:text-accent">{s.number}</span>
                </div>
                <div>
                  <h2 className="font-display text-xl font-bold text-primary sm:text-2xl">{s.title}</h2>
                  <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.short}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                    {s.features.slice(0, 3).map((f) => (
                      <span key={f} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                        <Check className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
                <span className="flex items-center gap-2 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                  Explore
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            </Reveal>
          ))}
          <Reveal className="flex justify-center pt-6">
            <CTA to="/start-a-project">Discuss Your Project</CTA>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
