import { ArrowRight } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { ProjectMock } from "@/components/ProjectMock";
import { Link } from "@/lib/router";
import { projects } from "@/data/projects";
import { trackEvent } from "@/lib/analytics";

export function WorkShowcase() {
  return (
    <section className="bg-[hsl(var(--soft))]" aria-labelledby="work-heading">
      <div className="container-x py-24 sm:py-32">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="eyebrow">Selected work</p>
            <h2 id="work-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-primary text-balance">
              What this looks like in practice
            </h2>
          </div>
          <Link to="/work" className="group link-underline inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-primary">
            View all work
            <ArrowRight className="h-4 w-4 text-accent transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={i * 100}>
              <Link
                to={`/work/${p.slug}`}
                onClick={() => trackEvent("case_study_click", { project: p.slug })}
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-400 hover:-translate-y-1.5 hover:border-accent/50 hover:shadow-[0_28px_60px_-24px_rgba(11,35,64,0.4)]"
              >
                <div className="relative p-3 pb-0">
                  <ProjectMock accent={p.accent} className="transition-transform duration-500 group-hover:scale-[1.015]" />
                  <span className="absolute left-6 top-6 rounded-full bg-[hsl(var(--navy-deep))]/85 px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur">
                    Demo project
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{p.industry}</p>
                  <h3 className="mt-2 font-display text-lg font-bold text-primary">{p.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{p.summary}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-2.5 py-1 text-[10.5px] font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-auto flex items-center gap-1.5 pt-5 text-[13px] font-semibold text-primary transition-colors duration-300 group-hover:text-accent">
                    View case study
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal delay={150} className="mt-8">
          <p className="text-center text-xs text-muted-foreground">
            These are demonstration projects that show the kind of systems we build.{" "}
            <span className="text-primary/60">[ADD CLIENT PROJECT HERE]</span> — real client work will be showcased with permission.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
