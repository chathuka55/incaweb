import { ArrowLeft, Check } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ProjectMock } from "@/components/ProjectMock";
import { CTA } from "@/components/CTA";
import { Link } from "@/lib/router";
import { projects } from "@/data/projects";
import { FinalCTA } from "@/sections/home/FinalCTA";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function CaseStudyPage({ slug }: { slug: string }) {
  const project = projects.find((p) => p.slug === slug);
  if (!project) return <NotFoundPage />;

  return (
    <>
      <PageHero
        eyebrow={`Case study · ${project.industry}`}
        title={project.title}
        description={project.summary}
      />
      <section className="bg-white">
        <div className="container-x py-16 sm:py-20">
          <Reveal>
            <div className="relative">
              <ProjectMock accent={project.accent} className="aspect-[16/8] min-h-[280px]" />
              <span className="absolute left-7 top-7 rounded-full bg-[hsl(var(--navy-deep))]/85 px-3 py-1.5 text-[9.5px] font-bold uppercase tracking-[0.14em] text-accent backdrop-blur">
                Demo project
              </span>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div className="space-y-12">
              <Reveal>
                <h2 className="eyebrow">The challenge</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">{project.challenge}</p>
              </Reveal>
              <Reveal>
                <h2 className="eyebrow">The solution</h2>
                <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">{project.solution}</p>
              </Reveal>
              <Reveal>
                <h2 className="eyebrow">Key features</h2>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {project.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 rounded-xl border border-border bg-[hsl(var(--soft))] p-4">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span className="text-sm font-medium text-primary">{f}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
              <Reveal>
                <h2 className="eyebrow">Results</h2>
                <p className="mt-4 max-w-xl rounded-xl border border-dashed border-border bg-[hsl(var(--soft))] p-5 text-sm leading-relaxed text-muted-foreground">
                  This is a demonstration project, so no client metrics are shown. For real projects,
                  measurable outcomes are agreed with the client up front and reported here.
                  <span className="mt-2 block font-semibold text-primary/60">[ADD PROJECT RESULTS HERE]</span>
                </p>
              </Reveal>
            </div>

            <Reveal delay={120}>
              <aside className="space-y-6 lg:sticky lg:top-28">
                <div className="rounded-2xl border border-border p-6">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">Project</h3>
                  <dl className="mt-4 space-y-3 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Industry</dt>
                      <dd className="text-right font-semibold text-primary">{project.industry}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Services</dt>
                      <dd className="text-right font-semibold text-primary">{project.tags.join(" · ")}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-muted-foreground">Status</dt>
                      <dd className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs font-bold text-accent">Demo</dd>
                    </div>
                  </dl>
                </div>
                <div className="rounded-2xl bg-[hsl(var(--navy-deep))] p-6 text-white">
                  <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Technology</h3>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {project.technology.map((t) => (
                      <span key={t} className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <CTA to="/start-a-project" className="w-full">Build Something Similar</CTA>
              </aside>
            </Reveal>
          </div>

          <Link to="/work" className="mt-14 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary">
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            Back to all work
          </Link>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
