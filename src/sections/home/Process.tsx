import { useEffect, useRef, useState } from "react";
import { Reveal } from "@/components/Reveal";
import { processSteps } from "@/data/process";
import { cn } from "@/lib/utils";

/**
 * "From Idea to Reality" — scroll-driven timeline. The connecting line
 * fills as the section moves through the viewport.
 */
export function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const total = r.height - vh * 0.4;
        const done = Math.min(Math.max(vh * 0.75 - r.top, 0), total);
        setProgress(total > 0 ? done / total : 0);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const activeCount = Math.floor(progress * processSteps.length + 0.35);

  return (
    <section className="bg-white" aria-labelledby="process-heading">
      <div className="container-x py-24 sm:py-32">
        <Reveal className="max-w-2xl">
          <p className="eyebrow">How we work</p>
          <h2 id="process-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-primary text-balance">
            From idea to reality
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            A clear, transparent process — so you always know where your project stands.
          </p>
        </Reveal>

        <div ref={ref} className="relative mt-14">
          {/* rail */}
          <div className="absolute bottom-6 left-[19px] top-2 w-px bg-border sm:left-1/2" aria-hidden="true" />
          <div
            className="absolute left-[19px] top-2 w-px bg-accent transition-[height] duration-150 ease-linear sm:left-1/2"
            style={{ height: `calc(${Math.min(progress * 100, 100)}% - 8px)` }}
            aria-hidden="true"
          />

          <ol className="space-y-10 sm:space-y-14">
            {processSteps.map((step, i) => {
              const active = i < activeCount;
              const left = i % 2 === 0;
              return (
                <li key={step.number} className="relative sm:grid sm:grid-cols-2 sm:gap-16">
                  {/* node */}
                  <span
                    className={cn(
                      "absolute left-[19px] top-1.5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full border font-display text-[11px] font-bold transition-all duration-500 sm:left-1/2",
                      active
                        ? "border-accent bg-accent text-[#06202E] glow-cyan"
                        : "border-border bg-white text-primary/40",
                    )}
                    aria-hidden="true"
                  >
                    {step.number}
                  </span>
                  <Reveal
                    className={cn(
                      "pl-14 sm:pl-0",
                      left ? "sm:col-start-1 sm:pr-4 sm:text-right" : "sm:col-start-2 sm:pl-4",
                    )}
                    delay={60}
                  >
                    <h3
                      className={cn(
                        "font-display text-xl font-bold uppercase tracking-wide transition-colors duration-500 sm:text-2xl",
                        active ? "text-primary" : "text-primary/35",
                      )}
                    >
                      {step.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-2 max-w-md text-sm leading-relaxed transition-colors duration-500",
                        active ? "text-muted-foreground" : "text-muted-foreground/50",
                        left && "sm:ml-auto",
                      )}
                    >
                      {step.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
