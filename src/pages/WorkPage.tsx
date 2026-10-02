import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProjectMock } from "@/components/ProjectMock";
import { Link } from "@/lib/router";
import { projects } from "@/data/projects";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { trackEvent } from "@/lib/analytics";

export function WorkPage() {
  return (
    <>
      <PageHero
        eyebrow="Our work"
        title={<>Selected <span className="text-accent">work</span></>}
        description="The projects below are demonstration case studies that show the kind of systems we design and build. Real client work will be published here with client permission."
      />
      <section className="bg-background">
        <div className="container-x space-y-14 py-20 sm:py-24">
          {projects.map((p, i) => (
            <Reveal key={p.slug} delay={Math.min(i * 80, 160)}>
              <Link
                to={`/work/${p.slug}`}
                onClick={() => trackEvent("case_study_click", { project: p.slug, location: "work_page" })}
                className={`group grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div className="relative">
                  <ProjectMock accent={p.accent} className="transition-transform duration-500 group-hover:scale-[1.01]" />
                  <span className="absolute left-7 top-7 rounded-full bg-[hsl(var(--navy-deep))]/85 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur">
                    Demo project
                  </span>
                </div>
                <div>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-accent">{p.industry}</p>
                  <h2 className="mt-3 font-display text-2xl font-bold text-heading sm:text-3xl">{p.title}</h2>
                  <p className="mt-3 max-w-lg text-[15px] leading-relaxed text-muted-foreground">{p.summary}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.tags.map((t) => (
                      <span key={t} className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground">
                        {t}
                      </span>
                    ))}
                  </div>
                  <span className="mt-6 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-heading transition-colors group-hover:text-accent">
                    <span className="link-underline">View case study</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
          <Reveal>
            <p className="rounded-2xl border border-dashed border-border bg-[hsl(var(--soft))] p-6 text-center text-sm text-muted-foreground">
              <span className="font-semibold text-heading/70">[ADD CLIENT PROJECT HERE]</span> — this space is ready
              for real case studies as they're completed and approved for publishing.
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
