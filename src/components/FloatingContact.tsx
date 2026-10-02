import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Mail, MessageCircle, Rocket, X } from "lucide-react";
import { Link, useRoute } from "@/lib/router";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

export function FloatingContact() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const route = useRoute();
  const ref = useRef<HTMLDivElement>(null);

  // Hide on contact/start pages and when the footer is in view.
  useEffect(() => {
    setOpen(false);
    const footer = document.querySelector("footer");
    if (!footer) return;
    const io = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { threshold: 0.05 });
    io.observe(footer);
    return () => io.disconnect();
  }, [route]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, []);

  if (route === "/contact" || route === "/start-a-project") return null;

  return (
    <div
      ref={ref}
      className={cn(
        "fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-500 sm:bottom-6 sm:right-6",
        hidden && "pointer-events-none translate-y-4 opacity-0",
      )}
    >
      <div
        role="dialog"
        aria-label="Contact options"
        className={cn(
          "w-[270px] origin-bottom-right rounded-2xl border border-border bg-card p-2 shadow-[0_16px_50px_-12px_rgba(11,35,64,0.35)] transition-all duration-300",
          open ? "pointer-events-auto scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0",
        )}
      >
        <a
          href={company.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackEvent("whatsapp_click", { location: "floating_widget" })}
          className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[hsl(var(--soft))]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#1da851]">
            <MessageCircle className="h-[18px] w-[18px]" />
          </span>
          <span className="text-sm font-semibold text-heading">WhatsApp</span>
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </a>
        <a
          href={company.emailHref}
          className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[hsl(var(--soft))]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/10 text-accent">
            <Mail className="h-[18px] w-[18px]" />
          </span>
          <span className="text-sm font-semibold text-heading">Email</span>
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </a>
        <Link
          to="/start-a-project"
          onClick={() => trackEvent("start_project_click", { location: "floating_widget" })}
          className="flex min-h-[48px] items-center gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-[hsl(var(--soft))]"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-heading/10 text-heading">
            <Rocket className="h-[18px] w-[18px]" />
          </span>
          <span className="text-sm font-semibold text-heading">Start a Project</span>
          <ArrowUpRight className="ml-auto h-4 w-4 text-muted-foreground" />
        </Link>
      </div>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Have a project in mind? Chat with INCASOFT"}
        className={cn(
          "flex min-h-[52px] items-center gap-2.5 rounded-full px-5 py-3 text-sm font-semibold shadow-[0_10px_36px_-8px_rgba(11,35,64,0.5)] transition-all duration-300 active:scale-95",
          open ? "bg-primary text-white" : "bg-[hsl(var(--navy-deep))] text-white hover:bg-primary",
        )}
      >
        {open ? (
          <>
            <X className="h-[18px] w-[18px]" />
            Close
          </>
        ) : (
          <>
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-accent" />
            </span>
            <span className="hidden sm:inline">Have a project in mind?</span>
            <span className="text-accent">Chat with INCASOFT</span>
          </>
        )}
      </button>
    </div>
  );
}
