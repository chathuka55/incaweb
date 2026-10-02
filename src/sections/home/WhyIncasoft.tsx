import { Layers, Cpu, ShieldCheck, Clock, HeartHandshake } from "lucide-react";
import { Reveal } from "@/components/Reveal";

const reasons = [
  {
    icon: Layers,
    title: "Customized Solutions",
    text: "Built around your requirements — not a generic template forced onto your business.",
  },
  {
    icon: Cpu,
    title: "Modern Technology",
    text: "Current, proven tools and frameworks that keep your system fast and maintainable.",
  },
  {
    icon: ShieldCheck,
    title: "Scalable & Secure",
    text: "Architected to grow with your business, with security considered from day one.",
  },
  {
    icon: Clock,
    title: "On-Time Delivery",
    text: "Clear scope, honest timelines and regular progress updates throughout the project.",
  },
  {
    icon: HeartHandshake,
    title: "Dedicated Support",
    text: "A real support channel after launch — maintenance, improvements and answers when you need them.",
  },
];

export function WhyIncasoft() {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-deep))] text-white" aria-labelledby="why-heading">
      <div className="absolute -left-24 top-0 h-[380px] w-[380px] rounded-full bg-accent/10 blur-[110px]" aria-hidden="true" />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_60%_70%_at_30%_50%,black,transparent)]" aria-hidden="true" />
      <div className="container-x relative py-24 sm:py-32">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-20">
          <Reveal>
            <p className="eyebrow">Why INCASOFT</p>
            <h2 id="why-heading" className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-balance">
              Why choose INCASOFT?
            </h2>
            <p className="mt-5 max-w-md text-[15px] leading-relaxed text-white/60 sm:text-base">
              Smart solutions. Better business. Stronger future. It's not just a tagline — it's how
              we approach every project we take on.
            </p>
          </Reveal>

          <div className="grid gap-4 sm:grid-cols-2">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 80} className={i === reasons.length - 1 ? "sm:col-span-2" : ""}>
                <div className="group h-full rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-all duration-400 hover:border-accent/50 hover:bg-white/[0.07]">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/12 text-accent transition-transform duration-400 group-hover:scale-110">
                    <r.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="mt-4 font-display text-[17px] font-bold">{r.title}</h3>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-white/55">{r.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
