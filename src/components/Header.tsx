import { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link, useRoute } from "@/lib/router";
import { cn } from "@/lib/utils";
import { trackEvent } from "@/lib/analytics";

const navItems = [
  { to: "/solutions", label: "Solutions" },
  { to: "/industries", label: "Industries" },
  { to: "/work", label: "Our Work" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Insights" },
];

const mobileItems = [
  ...navItems,
  { to: "/contact", label: "Contact" },
  { to: "/start-a-project", label: "Start a Project" },
];

export function Header() {
  const route = useRoute();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [route]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const onDarkHero = route === "/" && !scrolled && !open;
  const solid = scrolled || open || route !== "/";

  return (
    <>
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        solid
          ? "border-b border-primary/8 bg-white/85 shadow-[0_4px_24px_-12px_rgba(11,35,64,0.15)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-[68px] items-center justify-between">
        <Link to="/" aria-label="INCASOFT Solutions — home" className="rounded-md">
          <Logo dark={solid} />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              data-active={route.startsWith(item.to)}
              className={cn(
                "link-underline text-[13.5px] font-medium transition-colors",
                onDarkHero ? "text-white/85 hover:text-white" : "text-foreground/75 hover:text-foreground",
                route.startsWith(item.to) && (onDarkHero ? "text-white" : "text-foreground"),
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => trackEvent("start_project_click", { location: "header" })}
            className="group inline-flex min-h-[44px] items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-[#06202E] transition-all duration-300 hover:bg-[#3ec3e0] hover:shadow-[0_8px_24px_-6px_hsl(192_71%_49%/0.5)]"
          >
            Let's Talk
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors lg:hidden",
            onDarkHero ? "text-white hover:bg-white/10" : "text-primary hover:bg-primary/5",
          )}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

    </header>

    {/* Mobile menu — sibling of header (backdrop-filter on header would trap `fixed`) */}
    <div
      id="mobile-menu"
      className={cn(
        "fixed inset-x-0 top-[68px] bottom-0 z-[45] bg-white transition-all duration-300 ease-out lg:hidden",
        open ? "pointer-events-auto translate-y-0 opacity-100" : "pointer-events-none -translate-y-3 opacity-0",
      )}
    >
        <nav aria-label="Mobile" className="container-x flex h-full flex-col gap-1 overflow-y-auto py-8 safe-bottom">
          {mobileItems.map((item, i) => (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex min-h-[52px] items-center justify-between border-b border-border/70 py-3 font-display text-2xl font-semibold text-primary transition-all duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0",
                item.to === "/start-a-project" && "text-accent",
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              {item.label}
              <ArrowRight className="h-5 w-5 text-accent" aria-hidden="true" />
            </Link>
          ))}
          <p className="mt-auto pt-10 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Smart Solutions. Better Business. Stronger Future.
          </p>
        </nav>
    </div>
    </>
  );
}
