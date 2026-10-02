export interface ProcessStep {
  number: string;
  title: string;
  description: string;
}

export const processSteps: ProcessStep[] = [
  { number: "01", title: "Discover", description: "Understand the business, problem and goals." },
  { number: "02", title: "Plan", description: "Define requirements, architecture and project scope." },
  { number: "03", title: "Design", description: "Create intuitive interfaces and user experiences." },
  { number: "04", title: "Develop", description: "Build the software using modern technologies." },
  { number: "05", title: "Test", description: "Test performance, functionality, usability and security." },
  { number: "06", title: "Launch", description: "Deploy and deliver the completed solution." },
  { number: "07", title: "Support", description: "Continue supporting and improving the system." },
];

export interface TechLayer {
  id: string;
  label: string;
  items: string[];
  note: string;
}

export const techLayers: TechLayer[] = [
  { id: "frontend", label: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"], note: "Interfaces users love" },
  { id: "application", label: "Application", items: ["Node.js", "API Design", "Business Logic"], note: "Your rules, in code" },
  { id: "backend", label: "API / Backend", items: ["REST", "Auth", "Integrations"], note: "Systems that connect" },
  { id: "database", label: "Database", items: ["PostgreSQL", "MySQL", "MongoDB"], note: "Data you can trust" },
  { id: "cloud", label: "Cloud / Infrastructure", items: ["Docker", "Cloud Platforms", "Monitoring"], note: "Reliable at scale" },
];
