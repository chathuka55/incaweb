import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { solutions } from "@/data/solutions";

export function SolutionsGrid({ showAll = true }: { showAll?: boolean }) {
  return (
    <section className="bg-white" aria-labelledby="solutions-heading">
      <div className="container-x py-24 sm:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Solutions</p>
            <h2 id="solutions-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-primary text-balance">
              What we build
            </h2>
          </div>
          {showAll && (
            <Link
              to="/solutions"
              className="group link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary"
            >
              View all solutions
              <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          )}
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {solutions.map((s, i) => (
            <Reveal key={s.slug} delay={(i % 4) * 80}>
              <Link
                to={`/solutions/${s.slug}`}
                className="group relative flex h-full min-h-[240px] flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-400 hover:-translate-y-1.5 hover:border-accent/60 hover:shadow-[0_24px_50px_-20px_rgba(11,35,64,0.35)]"
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-primary transition-all duration-400 group-hover:bg-accent group-hover:text-[#06202E]">
                    <s.icon className="h-5 w-5 transition-transform duration-400 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <span className="font-display text-xs font-bold text-primary/25 transition-colors duration-300 group-hover:text-accent">
                    {s.number}
                  </span>
                </div>
                <h3 className="mt-5 font-display text-[17px] font-bold leading-snug text-primary">{s.title}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{s.short}</p>
                <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
                  Learn more
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                </span>
                <span className="pointer-events-none absolute inset-x-6 bottom-0 h-[2px] origin-left scale-x-0 bg-accent transition-transform duration-400 group-hover:scale-x-100" aria-hidden="true" />
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
