import { ArrowRight, BookOpen } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { Link } from "@/lib/router";
import { FinalCTA } from "@/sections/home/FinalCTA";

/**
 * Insights is architected for a future article system:
 * add entries to `articles` and the list/detail routes scale automatically.
 * Until real articles exist, the page presents honest, clearly-marked topics.
 */
interface ArticleSeed {
  slug: string;
  title: string;
  topic: string;
  excerpt: string;
  status: "coming-soon";
}

const articles: ArticleSeed[] = [
  {
    slug: "when-does-a-business-need-custom-software",
    title: "When does a business actually need custom software?",
    topic: "Custom Software",
    excerpt: "Spreadsheets and off-the-shelf tools take you far — but there are clear signals it's time to build something of your own.",
    status: "coming-soon",
  },
  {
    slug: "pos-erp-what-to-look-for",
    title: "Choosing a POS / ERP: what growing businesses should look for",
    topic: "Business Systems",
    excerpt: "Sales, stock, finance and reporting in one system — what matters, what's marketing, and what to ask before you commit.",
    status: "coming-soon",
  },
  {
    slug: "practical-ai-for-small-business",
    title: "Practical AI for everyday business operations",
    topic: "AI & Automation",
    excerpt: "Beyond the hype: where AI genuinely saves time in small and mid-sized businesses, and where it doesn't.",
    status: "coming-soon",
  },
];

export function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Insights"
        title={<>Ideas on software <span className="text-accent">&amp; business</span></>}
        description="Practical notes on software, automation and digital transformation for growing businesses. New articles are on the way."
      />
      <section className="bg-white">
        <div className="container-x py-20 sm:py-24">
          <div className="grid gap-6 md:grid-cols-3">
            {articles.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <article className="group flex h-full flex-col rounded-2xl border border-border bg-white p-6 transition-all duration-400 hover:border-accent/50 hover:shadow-[0_20px_50px_-24px_rgba(11,35,64,0.35)]">
                  <div className="flex items-center justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[hsl(var(--soft))] text-primary">
                      <BookOpen className="h-4.5 w-4.5 h-[18px] w-[18px]" aria-hidden="true" />
                    </span>
                    <span className="rounded-full bg-[hsl(var(--soft))] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground">
                      Coming soon
                    </span>
                  </div>
                  <p className="mt-5 text-[11px] font-semibold uppercase tracking-[0.16em] text-accent">{a.topic}</p>
                  <h2 className="mt-2 font-display text-lg font-bold leading-snug text-primary">{a.title}</h2>
                  <p className="mt-2 text-[13.5px] leading-relaxed text-muted-foreground">{a.excerpt}</p>
                  <p className="mt-auto pt-5 text-xs text-muted-foreground/70">
                    [ADD ARTICLE HERE] — this topic is planned for the INCASOFT insights series.
                  </p>
                </article>
              </Reveal>
            ))}
          </div>
          <Reveal delay={150} className="mt-10 text-center">
            <p className="text-sm text-muted-foreground">
              Have a topic you'd like us to cover?{" "}
              <Link to="/contact" className="group inline-flex items-center gap-1.5 font-semibold text-accent">
                <span className="link-underline">Suggest it</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </p>
          </Reveal>
        </div>
      </section>
      <FinalCTA />
    </>
  );
}
