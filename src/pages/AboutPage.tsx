import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { WhyIncasoft } from "@/sections/home/WhyIncasoft";
import { Process } from "@/sections/home/Process";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { company } from "@/data/company";

const values = [
  {
    title: "Practical over flashy",
    text: "We build software that solves real problems. If a simpler approach works better, we'll say so.",
  },
  {
    title: "Honest communication",
    text: "Clear scope, honest timelines and straight answers — including when something isn't a good fit.",
  },
  {
    title: "Built to last",
    text: "Maintainable code, proper documentation and systems designed to grow with your business.",
  },
  {
    title: "Partnership, not handoff",
    text: "Launch is the beginning. We stay available for support, improvements and the next phase.",
  },
];

export function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About INCASOFT"
        title={<><span className="text-accent">Smart solutions.</span> Better business. Stronger future.</>}
        description="INCASOFT Solutions is a software development company building practical digital solutions for growing businesses — from custom software and business systems to automation and AI."
      />
      <section className="bg-white">
        <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1fr_1.2fr] lg:gap-20">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase text-primary sm:text-3xl">What we believe</h2>
            <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              Good software doesn't demand attention — it quietly makes everything else work better.
              That's the standard we build to: technology shaped around the business, delivered with
              care, and supported for the long run.
            </p>
            <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
              {company.positioning}
            </p>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 80}>
                <div className="h-full rounded-2xl border border-border bg-[hsl(var(--soft))] p-6 transition-all duration-300 hover:border-accent/50">
                  <span className="font-display text-xs font-bold text-accent">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-[16px] font-bold text-primary">{v.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{v.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <WhyIncasoft />
      <Process />
      <FinalCTA />
    </>
  );
}
