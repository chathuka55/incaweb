import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { buildOptions } from "@/data/solutions";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

/**
 * Signature interaction — "What are you looking to build?"
 * Selecting a card animates it and updates the info panel.
 */
export function BuildSelector() {
  const [activeId, setActiveId] = useState(buildOptions[3].id); // POS / ERP as the featured default
  const active = buildOptions.find((o) => o.id === activeId) ?? buildOptions[0];

  return (
    <section id="build-selector" className="relative overflow-hidden bg-[hsl(var(--soft))] scroll-mt-20" aria-labelledby="build-heading">
      <div className="bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">Start here</p>
          <h2 id="build-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-primary text-balance">
            What are you looking to build?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Pick the closest match — we'll show you exactly what INCASOFT can provide for it.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          {/* option cards */}
          <Reveal delay={100}>
            <div className="grid grid-cols-2 gap-3" role="tablist" aria-label="What do you want to build?">
              {buildOptions.map((opt) => {
                const selected = opt.id === activeId;
                return (
                  <button
                    key={opt.id}
                    role="tab"
                    aria-selected={selected}
                    onClick={() => {
                      setActiveId(opt.id);
                      trackEvent("solution_select", { option: opt.id, location: "build_selector" });
                    }}
                    className={cn(
                      "group relative min-h-[64px] overflow-hidden rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-all duration-300",
                      selected
                        ? "border-accent bg-primary text-white shadow-[0_14px_36px_-12px_rgba(11,35,64,0.5)]"
                        : "border-border bg-white text-primary hover:border-accent/50 hover:shadow-[0_10px_28px_-14px_rgba(11,35,64,0.3)]",
                    )}
                  >
                    {selected && (
                      <motion.span
                        layoutId="build-selector-glow"
                        className="absolute inset-0 bg-gradient-to-br from-accent/20 to-transparent"
                        aria-hidden="true"
                      />
                    )}
                    <span className="relative flex items-center justify-between gap-2">
                      {opt.label}
                      <span
                        className={cn(
                          "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                          selected ? "border-accent bg-accent text-[#06202E]" : "border-border text-transparent group-hover:border-accent/50",
                        )}
                      >
                        <Check className="h-3 w-3" aria-hidden="true" />
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </Reveal>

          {/* info panel */}
          <Reveal delay={200}>
            <div className="relative min-h-[340px] overflow-hidden rounded-2xl bg-[hsl(var(--navy-deep))] p-7 text-white sm:p-9">
              <div className="bg-grid pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/15 blur-[70px]" aria-hidden="true" />
              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex h-full flex-col"
                >
                  <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-accent">{active.label}</p>
                  <h3 className="mt-3 font-display text-2xl font-bold sm:text-[1.7rem]">{active.headline}</h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-white/65">{active.description}</p>
                  <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                    {active.features.map((f, i) => (
                      <motion.li
                        key={f}
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.06 }}
                        className="flex items-center gap-2.5 text-[13px] text-white/80"
                      >
                        <span className="flex h-4.5 w-4.5 h-[18px] w-[18px] items-center justify-center rounded-full bg-accent/15 text-accent">
                          <Check className="h-3 w-3" aria-hidden="true" />
                        </span>
                        {f}
                      </motion.li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-8">
                    <Link
                      to="/start-a-project"
                      onClick={() => trackEvent("start_project_click", { location: "build_selector", option: active.id })}
                      className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-[#06202E] transition-all duration-300 hover:bg-[#3ec3e0]"
                    >
                      {active.cta}
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
                    </Link>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
