import { cn } from "@/lib/utils";

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={cn("h-9 w-9", className)} aria-hidden="true">
      <rect width="40" height="40" rx="10" className="fill-primary" />
      {/* Connected-nodes motif */}
      <circle cx="13" cy="13" r="2.4" className="fill-accent" />
      <circle cx="27" cy="13" r="2.4" className="fill-accent/70" />
      <circle cx="13" cy="27" r="2.4" className="fill-accent/70" />
      <circle cx="27" cy="27" r="2.4" className="fill-white" />
      <path d="M13 13L27 27M27 13L13 27M13 13h14M13 27h14" stroke="currentColor" strokeWidth="1.1" className="text-accent/50" />
    </svg>
  );
}

export function Logo({ dark = false, className }: { dark?: boolean; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <LogoMark />
      <span className="flex flex-col leading-none">
        <span className={cn("font-display text-[17px] font-bold tracking-tight", dark ? "text-primary" : "text-white")}>
          INCASOFT
        </span>
        <span className={cn("text-[9px] font-semibold uppercase tracking-[0.34em]", dark ? "text-accent" : "text-accent")}>
          Solutions
        </span>
      </span>
    </span>
  );
}
