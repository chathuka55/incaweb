import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { industries } from "@/data/industries";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function IndustriesSelector() {
  const [activeSlug, setActiveSlug] = useState(industries[0].slug);
  const active = industries.find((i) => i.slug === activeSlug) ?? industries[0];

  // Support deep links like #/industries#retail → preselect on home mount
  useEffect(() => {
    const parts = window.location.hash.split("#");
    const target = parts[2];
    if (target && industries.some((i) => i.slug === target)) {
      setActiveSlug(target);
      document.getElementById("industries")?.scrollIntoView();
    }
  }, []);

  return (
    <section id="industries" className="relative overflow-hidden bg-[hsl(var(--navy-deep))] text-white scroll-mt-20" aria-labelledby="industries-heading">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Industries</p>
          <h2 id="industries-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-balance">
            Solutions for your industry
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-white/60 sm:text-base">
            Every industry runs differently. We design systems around the realities of yours.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-8 lg:grid-cols-[340px_1fr] lg:gap-14">
          {/* selector list */}
          <Reveal delay={100}>
            <div className="flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0" role="tablist" aria-label="Industries">
              {industries.map((ind) => {
                const selected = ind.slug === activeSlug;
                return (
                  <button
                    key={ind.slug}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      setActiveSlug(ind.slug);
                      trackEvent("industry_select", { industry: ind.slug });
                    }}
                    className={cn(
                      "group flex min-h-[52px] shrink-0 items-center gap-3 rounded-xl border px-4 py-3 text-left transition-all duration-300 lg:w-full",
                      selected
                        ? "border-accent/70 bg-white/[0.07] text-white"
                        : "border-white/10 text-white/55 hover:border-white/25 hover:text-white",
                    )}
                  >
                    <ind.icon className={cn("h-[18px] w-[18px] shrink-0 transition-colors", selected ? "text-accent" : "text-white/40 group-hover:text-white/70")} aria-hidden="true" />
                    <span className="text-sm font-semibold">{ind.name}</span>
                    <span className={cn("ml-auto hidden h-1.5 w-1.5 rounded-full bg-accent transition-opacity lg:block", selected ? "opacity-100" : "opacity-0")} aria-hidden="true" />
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* content panel */}
          <Reveal delay={180}>
            <div className="relative min-h-[320px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.slug}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{active.name}</p>
                  <p className="mt-4 max-w-xl font-display text-xl font-medium leading-relaxed text-white/90 sm:text-2xl">
                    {active.description}
                  </p>
                  <div className="mt-8 grid gap-8 sm:grid-cols-2">
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-white/40">Common challenges</h3>
                      <ul className="mt-4 space-y-2.5">
                        {active.challenges.map((c) => (
                          <li key={c} className="flex items-start gap-2.5 text-sm text-white/60">
                            <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-white/40" aria-hidden="true" />
                            {c}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">What we can build</h3>
                      <ul className="mt-4 space-y-2.5">
                        {active.solutions.map((s, i) => (
                          <motion.li
                            key={s}
                            initial={{ opacity: 0, x: -8 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.08 + i * 0.06 }}
                            className="flex items-start gap-2.5 text-sm text-white/85"
                          >
                            <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                            {s}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <Link
                    to="/start-a-project"
                    onClick={() => trackEvent("start_project_click", { location: "industries", industry: active.slug })}
                    className="group mt-9 inline-flex min-h-[44px] items-center gap-2 text-sm font-semibold text-accent"
                  >
                    <span className="link-underline">{active.cta}</span>
                    <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
