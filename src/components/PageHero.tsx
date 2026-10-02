import type { ReactNode } from "react";
import { Reveal } from "@/components/Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description?: string;
}

/** Consistent dark page header for interior pages. */
export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-[hsl(var(--navy-deep))] pt-36 pb-16 text-white sm:pb-20">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_80%_at_70%_0%,black,transparent)]" aria-hidden="true" />
      <div className="absolute -top-24 right-[-8%] h-[360px] w-[360px] rounded-full bg-accent/12 blur-[110px]" aria-hidden="true" />
      <div className="container-x relative">
        <Reveal>
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="mt-5 max-w-3xl font-display text-[clamp(1.9rem,4.6vw,3.4rem)] font-bold uppercase leading-[1.06] text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/60 sm:text-base">{description}</p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
