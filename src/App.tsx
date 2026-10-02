import { useEffect } from "react";
import { RouterProvider, useRoute } from "@/lib/router";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FloatingContact } from "@/components/FloatingContact";
import { HomePage } from "@/pages/HomePage";
import { SolutionsPage } from "@/pages/SolutionsPage";
import { SolutionDetailPage } from "@/pages/SolutionDetailPage";
import { IndustriesPage } from "@/pages/IndustriesPage";
import { WorkPage } from "@/pages/WorkPage";
import { CaseStudyPage } from "@/pages/CaseStudyPage";
import { AboutPage } from "@/pages/AboutPage";
import { InsightsPage } from "@/pages/InsightsPage";
import { ContactPage } from "@/pages/ContactPage";
import { StartProjectPage } from "@/pages/StartProjectPage";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { solutions } from "@/data/solutions";
import { projects } from "@/data/projects";
import { company } from "@/data/company";

const baseTitle = "INCASOFT Solutions | Software & Digital Solutions";
const baseDesc =
  "INCASOFT Solutions builds custom software, web and mobile applications, business automation, POS/ERP, AI and cloud solutions for growing businesses.";

function setMeta(title: string, description: string) {
  document.title = title;
  document.querySelector('meta[name="description"]')?.setAttribute("content", description);
}

function RouteView() {
  const route = useRoute();
  const [path] = route.split("#");
  const segments = path.split("/").filter(Boolean);

  let page: React.ReactNode;
  let title = baseTitle;
  let desc = baseDesc;

  if (segments.length === 0) {
    page = <HomePage />;
  } else if (segments[0] === "solutions" && segments.length === 1) {
    page = <SolutionsPage />;
    title = "Solutions | INCASOFT Solutions";
    desc = "Custom software, web & mobile apps, business automation, POS/ERP, cloud & integration, AI, UI/UX design and long-term support.";
  } else if (segments[0] === "solutions" && segments[1]) {
    const s = solutions.find((x) => x.slug === segments[1]);
    page = <SolutionDetailPage slug={segments[1]} />;
    title = s ? `${s.title} | INCASOFT Solutions` : "Page Not Found | INCASOFT Solutions";
    desc = s ? s.short : "The page you're looking for doesn't exist.";
  } else if (segments[0] === "industries") {
    page = <IndustriesPage />;
    title = "Industries | INCASOFT Solutions";
    desc = "Software solutions for retail, hospitality, healthcare, education, finance, manufacturing, logistics and services.";
  } else if (segments[0] === "work" && segments.length === 1) {
    page = <WorkPage />;
    title = "Our Work | INCASOFT Solutions";
    desc = "Demonstration case studies showing the kind of software systems INCASOFT Solutions designs and builds.";
  } else if (segments[0] === "work" && segments[1]) {
    const p = projects.find((x) => x.slug === segments[1]);
    page = <CaseStudyPage slug={segments[1]} />;
    title = p ? `${p.title} — Case Study | INCASOFT Solutions` : "Page Not Found | INCASOFT Solutions";
    desc = p ? p.summary : "The page you're looking for doesn't exist.";
  } else if (segments[0] === "about") {
    page = <AboutPage />;
    title = "About | INCASOFT Solutions";
    desc = `${company.tagline} Learn how INCASOFT Solutions builds practical software around real business requirements.`;
  } else if (segments[0] === "insights") {
    page = <InsightsPage />;
    title = "Insights | INCASOFT Solutions";
    desc = "Practical notes on software, automation and digital transformation for growing businesses.";
  } else if (segments[0] === "contact") {
    page = <ContactPage />;
    title = "Contact | INCASOFT Solutions";
    desc = "Have an idea or a business process that could be improved with technology? Let's talk — WhatsApp, phone or email.";
  } else if (segments[0] === "start-a-project") {
    page = <StartProjectPage />;
    title = "Start a Project | INCASOFT Solutions";
    desc = "Tell us what you're trying to build in four quick steps — the start of a real conversation about your project.";
  } else {
    page = <NotFoundPage />;
    title = "Page Not Found | INCASOFT Solutions";
    desc = "The page you're looking for doesn't exist or has been moved.";
  }

  useEffect(() => {
    setMeta(title, desc);
  }, [title, desc]);

  return <main id="main">{page}</main>;
}

export default function App() {
  return (
    <RouterProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-[#06202E]"
      >
        Skip to content
      </a>
      <Header />
      <RouteView />
      <Footer />
      <FloatingContact />
    </RouterProvider>
  );
}
