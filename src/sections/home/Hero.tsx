import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { CTA } from "@/components/CTA";
import { DashboardVisual } from "@/components/DashboardVisual";
import { ParticleDrift } from "@/components/ParticleDrift";
import { trackEvent } from "@/lib/analytics";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};
const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as const } },
};

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "18%"]);
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", reduce ? "0%" : "-8%"]);

  const scrollToSelector = () => {
    document.getElementById("build-selector")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <section ref={ref} className="relative overflow-hidden bg-[hsl(var(--navy-deep))] text-white" aria-labelledby="hero-heading">
      {/* backdrop: particle drift field + glow */}
      <motion.div style={{ y: bgY }} className="absolute inset-0" aria-hidden="true">
        <ParticleDrift className="absolute inset-0 h-full w-full [mask-image:linear-gradient(to_bottom,black_75%,transparent)]" />
        <div className="absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full bg-accent/12 blur-[130px]" />
        <div className="absolute bottom-[-20%] left-[-10%] h-[420px] w-[420px] rounded-full bg-[hsl(var(--cyan-light))]/8 blur-[120px]" />
      </motion.div>

      <motion.div style={{ y: fgY }} className="container-x relative">
        <div className="grid min-h-[100svh] items-center gap-12 pb-20 pt-32 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-24 lg:pt-36">
          <motion.div variants={container} initial="hidden" animate="show">
            <motion.p variants={item} className="eyebrow !text-accent">
              INCASOFT Solutions · Software Development
            </motion.p>
            <motion.h1
              id="hero-heading"
              variants={item}
              className="mt-6 font-display text-[clamp(2.1rem,5.4vw,4.1rem)] font-bold uppercase leading-[1.04] tracking-[-0.02em] text-balance"
            >
              Building digital solutions for the way{" "}
              <span className="relative inline-block text-accent">
                your business
                <svg className="absolute -bottom-1.5 left-0 w-full" viewBox="0 0 220 10" fill="none" aria-hidden="true">
                  <path d="M2 8C60 2 160 2 218 6" stroke="hsl(192 71% 49%)" strokeWidth="3" strokeLinecap="round" opacity="0.5" />
                </svg>
              </span>{" "}
              works.
            </motion.h1>
            <motion.p variants={item} className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/65 sm:text-base">
              Custom software, web &amp; mobile applications, business automation, POS/ERP, AI and cloud
              solutions designed around your business.
            </motion.p>
            <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
              <CTA to="/start-a-project" onClick={() => trackEvent("start_project_click", { location: "hero" })}>
                Start a Project
              </CTA>
              <CTA variant="secondary" direction="down" onClick={scrollToSelector} href="#build-selector">
                Explore Solutions
              </CTA>
            </motion.div>
            <motion.div variants={item} className="mt-12 flex flex-wrap gap-x-8 gap-y-3 text-[12px] text-white/45">
              {["Custom Software", "POS / ERP Systems", "AI & Automation", "Cloud & APIs"].map((t) => (
                <span key={t} className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent" aria-hidden="true" />
                  {t}
                </span>
              ))}
            </motion.div>
          </motion.div>

          <div className="relative pb-8 lg:pb-0">
            <DashboardVisual />
          </div>
        </div>
      </motion.div>

      {/* bottom fade into next section */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" aria-hidden="true" />
    </section>
  );
}
