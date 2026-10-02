import { ArrowDown, ArrowRight } from "lucide-react";
import { Link } from "@/lib/router";
import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

interface CTAProps {
  to?: string;
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost-light" | "ghost-dark";
  direction?: "right" | "down";
  className?: string;
  external?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
}

const base =
  "group inline-flex min-h-[44px] items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-300 focus-visible:outline-none";

const variants = {
  primary:
    "bg-accent text-[#06202E] hover:bg-[#3ec3e0] hover:shadow-[0_8px_30px_-6px_hsl(192_71%_49%/0.55)] active:scale-[0.98]",
  secondary:
    "border border-white/25 bg-white/5 text-white backdrop-blur-sm hover:border-accent/60 hover:text-accent active:scale-[0.98]",
  "ghost-light": "border border-heading/15 bg-card text-heading hover:border-accent hover:text-accent active:scale-[0.98]",
  "ghost-dark": "text-heading hover:text-accent px-2",
};

export function CTA({
  to,
  href,
  children,
  variant = "primary",
  direction = "right",
  className,
  external,
  onClick,
  ariaLabel,
}: CTAProps) {
  const Icon = direction === "down" ? ArrowDown : ArrowRight;
  const iconEl = (
    <Icon
      className={cn(
        "h-4 w-4 transition-transform duration-300",
        direction === "down" ? "group-hover:translate-y-0.5" : "group-hover:translate-x-1",
      )}
      aria-hidden="true"
    />
  );
  const cls = cn(base, variants[variant], className);
  const content = (
    <>
      <span>{children}</span>
      {iconEl}
    </>
  );
  if (to) {
    return (
      <Link to={to} className={cls} onClick={onClick} aria-label={ariaLabel}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {content}
    </a>
  );
}
