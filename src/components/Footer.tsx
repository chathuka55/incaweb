import { Facebook, Instagram, Mail, MessageCircle } from "lucide-react";
import { Logo } from "@/components/Logo";
import { Link } from "@/lib/router";
import { company } from "@/data/company";
import { solutions } from "@/data/solutions";
import { industries } from "@/data/industries";
import { trackEvent } from "@/lib/analytics";

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[hsl(var(--navy-deep))] text-white">
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="container-x relative">
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_1fr] lg:py-20">
          <div>
            <Logo />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">{company.tagline}</p>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-white/60">{company.positioning}</p>
            <div className="mt-6 flex gap-3">
              {[
                { href: company.facebook, icon: Facebook, label: "INCASOFT on Facebook" },
                { href: company.instagram, icon: Instagram, label: "INCASOFT on Instagram" },
                { href: company.whatsappHref, icon: MessageCircle, label: "Chat with INCASOFT on WhatsApp" },
                { href: company.emailHref, icon: Mail, label: "Email INCASOFT" },
              ].map(({ href, icon: Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() => label.includes("WhatsApp") && trackEvent("whatsapp_click", { location: "footer" })}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-white/15 text-white/70 transition-all duration-300 hover:border-accent hover:text-accent"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Solutions">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Solutions</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {solutions.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <Link to={`/solutions/${s.slug}`} className="text-white/65 transition-colors hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Industries">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Industries</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              {industries.slice(0, 6).map((i) => (
                <li key={i.slug}>
                  <Link to={`/industries#${i.slug}`} className="text-white/65 transition-colors hover:text-white">
                    {i.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Company</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li><Link to="/about" className="text-white/65 transition-colors hover:text-white">About</Link></li>
              <li><Link to="/work" className="text-white/65 transition-colors hover:text-white">Our Work</Link></li>
              <li><Link to="/insights" className="text-white/65 transition-colors hover:text-white">Insights</Link></li>
              <li><Link to="/contact" className="text-white/65 transition-colors hover:text-white">Contact</Link></li>
              <li><Link to="/start-a-project" className="text-accent transition-colors hover:text-[hsl(var(--cyan-light))]">Start a Project</Link></li>
            </ul>
          </nav>

          <nav aria-label="Connect">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">Connect</h3>
            <ul className="mt-5 space-y-2.5 text-sm">
              <li>
                <a href={company.phoneHref} className="text-white/65 transition-colors hover:text-white">
                  {company.phoneDisplay}
                </a>
              </li>
              <li>
                <a href={company.emailHref} className="break-all text-white/65 transition-colors hover:text-white">
                  {company.email}
                </a>
              </li>
              <li>
                <a href={company.facebook} target="_blank" rel="noopener noreferrer" className="text-white/65 transition-colors hover:text-white">
                  Facebook
                </a>
              </li>
              <li>
                <a href={company.instagram} target="_blank" rel="noopener noreferrer" className="text-white/65 transition-colors hover:text-white">
                  Instagram
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 py-7 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>{company.copyright}</p>
          <p className="flex items-center gap-2">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
            Software, designed around your business.
          </p>
        </div>
      </div>
    </footer>
  );
}
