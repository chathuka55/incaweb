import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { techLayers } from "@/data/process";

/**
 * Technology stack rendered as a visual architecture — layered system
 * diagram with animated connectors instead of a logo soup.
 */
export function TechArchitecture() {
  return (
    <section className="relative overflow-hidden bg-white" aria-labelledby="tech-heading">
      <div className="bg-grid-faint pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative py-24 sm:py-32">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow justify-center after:h-px after:w-8 after:bg-accent/70">Technology</p>
          <h2 id="tech-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-primary text-balance">
            Technology that powers our solutions
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            Modern, proven tools — chosen for reliability, performance and long-term maintainability.
          </p>
        </Reveal>

        <div className="mx-auto mt-14 max-w-3xl">
          {techLayers.map((layer, i) => (
            <div key={layer.id}>
              <Reveal delay={i * 90}>
                <div className="group relative rounded-2xl border border-border bg-white/80 p-5 backdrop-blur transition-all duration-400 hover:border-accent/60 hover:shadow-[0_18px_44px_-18px_rgba(11,35,64,0.3)] sm:p-6">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3.5">
                      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary font-display text-[11px] font-bold text-accent">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="font-display text-base font-bold text-primary sm:text-lg">{layer.label}</h3>
                        <p className="text-xs text-muted-foreground">{layer.note}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap justify-end gap-1.5">
                      {layer.items.map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-border bg-[hsl(var(--soft))] px-3 py-1.5 text-[11.5px] font-semibold text-primary transition-colors duration-300 group-hover:border-accent/40"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
              {i < techLayers.length - 1 && (
                <div className="relative flex justify-center py-1" aria-hidden="true">
                  <motion.div
                    initial={{ scaleY: 0 }}
                    whileInView={{ scaleY: 1 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    className="flex h-8 origin-top flex-col items-center"
                  >
                    <span className="h-6 w-px bg-gradient-to-b from-accent/70 to-accent/30" />
                    <ArrowDown className="-mt-1 h-3 w-3 text-accent/70" />
                  </motion.div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
