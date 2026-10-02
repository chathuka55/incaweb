import { Reveal } from "@/components/Reveal";
import { CTA } from "@/components/CTA";

export function NotFoundPage() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-[hsl(var(--navy-deep))] text-white" aria-labelledby="nf-heading">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-60" aria-hidden="true" />
      <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-accent/12 blur-[100px]" aria-hidden="true" />
      <div className="container-x relative py-32 text-center">
        <Reveal>
          <p className="font-display text-[clamp(5rem,18vw,11rem)] font-bold leading-none text-accent/90" aria-hidden="true">404</p>
          <h1 id="nf-heading" className="mt-2 font-display text-2xl font-bold uppercase sm:text-3xl">
            Looks like this page went offline.
          </h1>
          <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/60">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <CTA to="/">Back to INCASOFT</CTA>
            <CTA to="/contact" variant="secondary">Contact Us</CTA>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
