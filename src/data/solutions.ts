import {
  Code2,
  Smartphone,
  Workflow,
  Store,
  Cloud,
  BrainCircuit,
  PenTool,
  LifeBuoy,
  type LucideIcon,
} from "lucide-react";

export interface Solution {
  slug: string;
  number: string;
  title: string;
  short: string;
  description: string;
  features: string[];
  icon: LucideIcon;
}

export const solutions: Solution[] = [
  {
    slug: "custom-software",
    number: "01",
    title: "Custom Software Development",
    short: "Tailored software solutions built around your unique business requirements.",
    description:
      "Off-the-shelf tools force your business to adapt to them. We do the opposite — designing and building software around the way your team actually works, so the system fits the business, not the other way around.",
    features: [
      "Requirements discovery and solution architecture",
      "Tailored business logic and workflows",
      "Integration with your existing tools",
      "Scalable, maintainable codebase",
    ],
    icon: Code2,
  },
  {
    slug: "web-mobile",
    number: "02",
    title: "Web & Mobile Applications",
    short: "High-performance, responsive and user-friendly digital applications.",
    description:
      "From customer-facing portals to internal tools and mobile apps, we build fast, responsive applications that feel modern on every device and hold up under real-world use.",
    features: [
      "Responsive web applications",
      "iOS and Android app development",
      "Progressive web apps (PWA)",
      "Performance and accessibility built in",
    ],
    icon: Smartphone,
  },
  {
    slug: "business-automation",
    number: "03",
    title: "Business Automation",
    short: "Automate workflows and reduce repetitive manual processes.",
    description:
      "Manual data entry, copy-paste reporting and approval chains over chat cost your team hours every week. We map those processes and automate them, so work moves forward without the busywork.",
    features: [
      "Workflow and approval automation",
      "Automated reporting and notifications",
      "Document and data processing",
      "Process analysis and optimization",
    ],
    icon: Workflow,
  },
  {
    slug: "pos-erp",
    number: "04",
    title: "POS, ERP & Business Systems",
    short: "Connected systems for sales, inventory, finance, operations and more.",
    description:
      "Connect sales, inventory, customers, suppliers, finance and reporting through one centralized system — built around your operation instead of a generic template.",
    features: [
      "Point-of-sale and billing systems",
      "Inventory and supplier management",
      "Customer and finance modules",
      "Real-time reports and dashboards",
    ],
    icon: Store,
  },
  {
    slug: "cloud-integration",
    number: "05",
    title: "Cloud & Integration",
    short: "Cloud solutions, APIs and third-party system integrations.",
    description:
      "Your systems should talk to each other. We design APIs, move workloads to the cloud and connect third-party services into one reliable, well-documented architecture.",
    features: [
      "Cloud deployment and migration",
      "REST API design and development",
      "Third-party service integrations",
      "Reliable, monitored infrastructure",
    ],
    icon: Cloud,
  },
  {
    slug: "ai-solutions",
    number: "06",
    title: "AI-Powered Solutions",
    short: "Practical AI tools and automation that help businesses work smarter.",
    description:
      "AI is useful when it solves a real problem. We build practical AI features — assistants, document understanding, predictions and intelligent automation — grounded in your actual business data.",
    features: [
      "AI assistants and chatbots",
      "Document and data intelligence",
      "Prediction and recommendation tools",
      "AI-enhanced workflow automation",
    ],
    icon: BrainCircuit,
  },
  {
    slug: "ui-ux",
    number: "07",
    title: "UI/UX Design",
    short: "Modern interfaces designed around usability and great user experiences.",
    description:
      "Good software feels effortless. We design clean, modern interfaces through research, prototyping and testing — so your product is easy to learn and a pleasure to use.",
    features: [
      "User research and journey mapping",
      "Wireframes and interactive prototypes",
      "Design systems and UI kits",
      "Usability testing and refinement",
    ],
    icon: PenTool,
  },
  {
    slug: "support",
    number: "08",
    title: "Maintenance & Support",
    short: "Reliable technical support and long-term system maintenance.",
    description:
      "Launch day is the beginning, not the end. We keep your systems secure, updated and improving with ongoing maintenance, monitoring and a support channel you can actually reach.",
    features: [
      "Ongoing maintenance and updates",
      "Monitoring and issue response",
      "Security patches and backups",
      "Continuous improvement plans",
    ],
    icon: LifeBuoy,
  },
];

/** Options for the interactive "What do you want to build?" selector. */
export interface BuildOption {
  id: string;
  label: string;
  headline: string;
  description: string;
  features: string[];
  cta: string;
  solutionSlug?: string;
}

export const buildOptions: BuildOption[] = [
  {
    id: "custom-software",
    label: "Custom Software",
    headline: "Software shaped around your business.",
    description:
      "When no existing tool fits the way you work, we design and build a system that does — from internal platforms to full business products.",
    features: ["Tailored workflows", "Your business logic, built in", "Integrates with existing tools", "Built to scale"],
    cta: "Discuss Your Custom Software Project",
    solutionSlug: "custom-software",
  },
  {
    id: "web-app",
    label: "Web Application",
    headline: "A fast, modern app your users will love.",
    description:
      "Portals, dashboards, booking systems, internal tools — responsive web applications that work beautifully on every screen.",
    features: ["Responsive on all devices", "Fast and secure", "Real-time data", "Easy to maintain"],
    cta: "Discuss Your Web Application",
    solutionSlug: "web-mobile",
  },
  {
    id: "mobile-app",
    label: "Mobile App",
    headline: "Your business, in your customers' pockets.",
    description:
      "Native-feel mobile applications for iOS and Android — designed for daily use, offline resilience and smooth performance.",
    features: ["iOS & Android", "Push notifications", "Offline support", "Store-ready delivery"],
    cta: "Discuss Your Mobile App",
    solutionSlug: "web-mobile",
  },
  {
    id: "pos-erp",
    label: "POS / ERP",
    headline: "One system for your entire operation.",
    description:
      "Connect sales, inventory, customers, suppliers, finance and reporting through one centralized system — built around how your business runs.",
    features: ["Sales & billing", "Inventory & suppliers", "Finance & reporting", "Multi-branch ready"],
    cta: "Discuss Your POS / ERP Project",
    solutionSlug: "pos-erp",
  },
  {
    id: "automation",
    label: "Business Automation",
    headline: "Give your team their hours back.",
    description:
      "We find the repetitive work slowing your team down and automate it — approvals, reporting, data entry, notifications and more.",
    features: ["Workflow automation", "Automated reports", "Approvals & alerts", "Less manual error"],
    cta: "Discuss Automation for Your Business",
    solutionSlug: "business-automation",
  },
  {
    id: "ai-solution",
    label: "AI Solution",
    headline: "Practical AI, not hype.",
    description:
      "Assistants, document intelligence, predictions and smart automation — AI features grounded in your real data and real problems.",
    features: ["AI assistants", "Document intelligence", "Smart predictions", "Human-in-the-loop design"],
    cta: "Discuss Your AI Solution",
    solutionSlug: "ai-solutions",
  },
  {
    id: "cloud-api",
    label: "Cloud / API",
    headline: "Systems that talk to each other.",
    description:
      "Cloud infrastructure, well-designed APIs and integrations that connect your tools into one reliable architecture.",
    features: ["Cloud deployment", "API development", "Third-party integrations", "Monitored & reliable"],
    cta: "Discuss Cloud & Integration",
    solutionSlug: "cloud-integration",
  },
  {
    id: "something-custom",
    label: "Something Custom",
    headline: "Have an idea that doesn't fit a box?",
    description:
      "Tell us what you're trying to solve. If it involves software, we can almost certainly help — and if we can't, we'll tell you honestly.",
    features: ["Free initial consultation", "Honest technical advice", "Clear scope & plan", "No obligation"],
    cta: "Tell Us Your Idea",
  },
];
