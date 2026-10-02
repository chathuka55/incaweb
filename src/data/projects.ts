export interface Project {
  slug: string;
  title: string;
  industry: string;
  tags: string[];
  summary: string;
  challenge: string;
  solution: string;
  features: string[];
  technology: string[];
  /** Visual accent for the demo mock UI */
  accent: "pos" | "dashboard" | "service";
  isDemo: true;
}

export const projects: Project[] = [
  {
    slug: "retail-management-platform",
    title: "Retail Management Platform",
    industry: "Retail & Wholesale",
    tags: ["POS", "Inventory", "Web Application"],
    summary:
      "A connected retail platform unifying point-of-sale, inventory, customers and reporting across a multi-branch retail operation.",
    challenge:
      "Retail operations often run on disconnected tools — a POS here, a stock spreadsheet there, reports assembled by hand. Staff spend hours reconciling numbers, and management makes decisions on stale data.",
    solution:
      "A single web platform connecting billing, stock, suppliers, customers and finance. Sales update inventory in real time, managers see live dashboards, and reports generate themselves.",
    features: [
      "Fast touchscreen point-of-sale with offline fallback",
      "Real-time, multi-branch inventory tracking",
      "Supplier and purchase-order management",
      "Customer accounts and loyalty tracking",
      "Daily, weekly and custom sales reports",
    ],
    technology: ["React", "TypeScript", "Node.js", "PostgreSQL", "REST API", "Docker"],
    accent: "pos",
    isDemo: true,
  },
  {
    slug: "business-operations-dashboard",
    title: "Business Operations Dashboard",
    industry: "Business Automation",
    tags: ["Automation", "Analytics", "Web"],
    summary:
      "A real-time operations dashboard that pulls data from across the business and turns it into clear, actionable visibility.",
    challenge:
      "When key numbers live in five different systems, nobody sees the whole picture. Reporting becomes a weekly manual project instead of a daily habit, and problems surface late.",
    solution:
      "An automated analytics layer that connects existing systems through APIs, aggregates the data and presents live KPIs, trends and alerts in one clean dashboard.",
    features: [
      "Live KPI and trend dashboards",
      "Automated data sync from multiple sources",
      "Threshold alerts and notifications",
      "Role-based views for management and teams",
      "Scheduled report exports",
    ],
    technology: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Charting", "Cloud"],
    accent: "dashboard",
    isDemo: true,
  },
  {
    slug: "service-management-platform",
    title: "Service Management Platform",
    industry: "Repairs & Services",
    tags: ["Workflow", "Customer Management", "Automation"],
    summary:
      "A job-tracking and customer-management platform for service businesses — from first call to final invoice.",
    challenge:
      "Service businesses live on job cards, phone calls and memory. Jobs get lost, customers call for updates, and invoices go out days late — all of it costing time and trust.",
    solution:
      "A workflow platform where every job has a clear status, customers get automatic updates, technicians see their schedule, and invoices generate the moment work is done.",
    features: [
      "Job intake, assignment and status tracking",
      "Automatic customer status notifications",
      "Technician scheduling and mobile access",
      "Quotation-to-invoice workflow",
      "Service history per customer",
    ],
    technology: ["React", "TypeScript", "Node.js", "PostgreSQL", "SMS/WhatsApp API", "Cloud"],
    accent: "service",
    isDemo: true,
  },
];
