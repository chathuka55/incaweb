import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";
import { Link } from "@/lib/router";
import { solutions } from "@/data/solutions";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function SolutionDetailPage({ slug }: { slug: string }) {
  const solution = solutions.find((s) => s.slug === slug);
  if (!solution) return <NotFoundPage />;
  const idx = solutions.indexOf(solution);
  const next = solutions[(idx + 1) % solutions.length];
  const related = solutions.filter((s) => s.slug !== slug).slice(0, 3);

  return (
    <>
      <PageHero
        eyebrow={`Solution ${solution.number}`}
        title={solution.title}
        description={solution.description}
      />
      <section className="bg-white">
        <div className="container-x grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <h2 className="font-display text-2xl font-bold uppercase text-primary">What we provide</h2>
            <ul className="mt-6 space-y-4">
              {solution.features.map((f) => (
                <li key={f} className="flex items-start gap-3.5 rounded-xl border border-border bg-[hsl(var(--soft))] p-4.5 p-4">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span className="text-[15px] font-medium text-primary">{f}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-4">
              <CTA to="/start-a-project">Discuss This Solution</CTA>
              <CTA to="/solutions" variant="ghost-light" direction="right">All Solutions</CTA>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <div className="rounded-2xl bg-[hsl(var(--navy-deep))] p-7 text-white sm:p-8">
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-0" aria-hidden="true" />
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/15 text-accent">
                <solution.icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-5 font-display text-lg font-bold">Not sure this is the right fit?</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Tell us what you're trying to achieve — we'll recommend the right approach, even if it isn't this one.
              </p>
              <Link to="/contact" className="group mt-5 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent">
                <span className="link-underline">Ask us directly</span>
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="container-x border-t border-border pb-20 pt-14">
          <h2 className="font-display text-xl font-bold uppercase text-primary">More solutions</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to={`/solutions/${r.slug}`}
                className="group rounded-2xl border border-border p-5 transition-all duration-300 hover:border-accent/60 hover:shadow-[0_16px_40px_-20px_rgba(11,35,64,0.3)]"
              >
                <span className="flex items-center justify-between">
                  <r.icon className="h-5 w-5 text-accent" aria-hidden="true" />
                  <span className="font-display text-xs font-bold text-primary/25">{r.number}</span>
                </span>
                <h3 className="mt-3 font-display text-[15px] font-bold text-primary">{r.title}</h3>
              </Link>
            ))}
          </div>
          <Link to="/solutions" className="mt-8 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all solutions
          </Link>
          <span className="mx-3 text-border" aria-hidden="true">·</span>
          <Link to={`/solutions/${next.slug}`} className="inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent">
            Next: {next.title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
