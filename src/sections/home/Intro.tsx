import { Reveal } from "@/components/Reveal";

export function Intro() {
  return (
    <section className="relative bg-background" aria-labelledby="intro-heading">
      <div className="container-x grid gap-10 py-24 sm:py-32 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
        <Reveal>
          <p className="eyebrow">Who we are</p>
          <h2
            id="intro-heading"
            className="mt-5 font-display text-[clamp(1.7rem,3.6vw,2.9rem)] font-bold uppercase leading-[1.1] text-heading text-balance"
          >
            Your ideas. Our technology.{" "}
            <span className="text-accent">Endless possibilities.</span>
          </h2>
        </Reveal>
        <Reveal delay={150} className="flex flex-col justify-end gap-5">
          <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            INCASOFT Solutions develops technology designed around real business requirements — not
            templates, not guesswork. We listen to how your business actually runs, then build the
            software that helps it run better.
          </p>
          <p className="text-[15px] leading-relaxed text-muted-foreground sm:text-base">
            From a first conversation to long-term support, everything we build is practical,
            reliable and made to grow with you.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
