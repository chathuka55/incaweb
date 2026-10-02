import {
  ShoppingBag,
  BedDouble,
  Wrench,
  GraduationCap,
  HeartPulse,
  Landmark,
  Factory,
  Truck,
  type LucideIcon,
} from "lucide-react";

export interface Industry {
  slug: string;
  name: string;
  shortName: string;
  description: string;
  challenges: string[];
  solutions: string[];
  cta: string;
  icon: LucideIcon;
}

export const industries: Industry[] = [
  {
    slug: "retail",
    name: "Retail & Wholesale",
    shortName: "Retail",
    description:
      "Build connected retail systems for sales, inventory, customers, reporting and business operations — from a single shop to multi-branch distribution.",
    challenges: ["Stock inaccuracies and manual counts", "Disconnected sales channels", "Slow, spreadsheet-based reporting"],
    solutions: ["POS & billing systems", "Real-time inventory tracking", "Customer loyalty & CRM", "Sales analytics dashboards"],
    cta: "Explore Retail Solutions",
    icon: ShoppingBag,
  },
  {
    slug: "hospitality",
    name: "Hotels & Hospitality",
    shortName: "Hospitality",
    description:
      "Reservation, guest management and operational systems that keep front office, kitchen, housekeeping and billing in sync.",
    challenges: ["Double bookings and manual registers", "Fragmented guest information", "Slow billing at checkout"],
    solutions: ["Booking & reservation systems", "Guest management portals", "Restaurant & bar POS", "Occupancy and revenue reporting"],
    cta: "Explore Hospitality Solutions",
    icon: BedDouble,
  },
  {
    slug: "services",
    name: "Repairs & Services",
    shortName: "Services",
    description:
      "Job tracking, customer management and invoicing systems for repair shops and service businesses that run on schedules and trust.",
    challenges: ["Lost job cards and follow-ups", "Unclear job status for customers", "Delayed invoices and payments"],
    solutions: ["Job & ticket management", "Customer status notifications", "Quotation and invoicing", "Technician scheduling"],
    cta: "Explore Service Solutions",
    icon: Wrench,
  },
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    description:
      "Learning platforms, student information systems and admin tools that reduce paperwork for institutes, academies and training centres.",
    challenges: ["Manual attendance and records", "Scattered communication with parents", "Time-consuming fee management"],
    solutions: ["Student information systems", "Learning management platforms", "Online exams & assessments", "Fee and payment tracking"],
    cta: "Explore Education Solutions",
    icon: GraduationCap,
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    shortName: "Healthcare",
    description:
      "Clinic, appointment and patient-record systems designed with care for usability, privacy and the pace of medical work.",
    challenges: ["Paper-based patient records", "Appointment no-shows", "Slow billing and reporting"],
    solutions: ["Appointment scheduling", "Electronic patient records", "Pharmacy & lab modules", "Billing and insurance workflows"],
    cta: "Explore Healthcare Solutions",
    icon: HeartPulse,
  },
  {
    slug: "finance",
    name: "Finance",
    shortName: "Finance",
    description:
      "Secure, auditable systems for lending, collections, reporting and customer management in financial services.",
    challenges: ["Error-prone manual ledgers", "Compliance and audit pressure", "Slow approval workflows"],
    solutions: ["Loan & microfinance systems", "Automated approval workflows", "Audit-ready reporting", "Customer portals"],
    cta: "Explore Finance Solutions",
    icon: Landmark,
  },
  {
    slug: "manufacturing",
    name: "Manufacturing",
    shortName: "Manufacturing",
    description:
      "Production planning, inventory and quality systems that give factory floors and management one shared source of truth.",
    challenges: ["No real-time production visibility", "Raw material stockouts", "Quality data trapped on paper"],
    solutions: ["Production planning & tracking", "Bill of materials & inventory", "Quality control modules", "Machine & shift reporting"],
    cta: "Explore Manufacturing Solutions",
    icon: Factory,
  },
  {
    slug: "logistics",
    name: "Logistics & Distribution",
    shortName: "Logistics",
    description:
      "Fleet, delivery and distribution systems that track goods from warehouse to doorstep with clear accountability.",
    challenges: ["Untracked deliveries", "Manual route planning", "Proof-of-delivery disputes"],
    solutions: ["Delivery & fleet tracking", "Route optimization", "Digital proof of delivery", "Warehouse management"],
    cta: "Explore Logistics Solutions",
    icon: Truck,
  },
];
