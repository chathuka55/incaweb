import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Bell,
  CheckCircle2,
  ShoppingCart,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";

/**
 * Custom "software product" composition for the hero — dashboard, metrics,
 * orders, automation and notification cards with mouse parallax.
 * Built entirely in code: no stock imagery.
 */

const bars = [42, 58, 47, 66, 54, 74, 62, 82, 70, 90, 78, 96];
const months = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

const orders = [
  { id: "#INV-2041", name: "Wholesale order", status: "Paid", amount: "LKR 184,500", tone: "text-emerald-300" },
  { id: "#INV-2040", name: "Retail sale — Branch 2", status: "Paid", amount: "LKR 32,750", tone: "text-emerald-300" },
  { id: "#INV-2039", name: "Service invoice", status: "Pending", amount: "LKR 58,200", tone: "text-amber-300" },
];

function DashboardCard() {
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-[#0C2440]/90 p-4 shadow-[0_30px_80px_-20px_rgba(3,12,24,0.8)] backdrop-blur-xl sm:p-5">
      {/* window chrome */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent/70" />
        </div>
        <span className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-medium tracking-wide text-white/50">
          incasoft.app/dashboard
        </span>
      </div>

      {/* metrics */}
      <div className="mt-4 grid grid-cols-3 gap-2.5">
        {[
          { label: "Revenue", value: "LKR 4.2M", icon: TrendingUp, delta: "+18%" },
          { label: "Orders", value: "1,284", icon: ShoppingCart, delta: "+9%" },
          { label: "Customers", value: "3,562", icon: Users, delta: "+12%" },
        ].map((m) => (
          <div key={m.label} className="rounded-xl border border-white/8 bg-white/[0.04] p-2.5 sm:p-3">
            <div className="flex items-center justify-between text-white/45">
              <m.icon className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="flex items-center gap-0.5 text-[9px] font-semibold text-emerald-300">
                <ArrowUpRight className="h-2.5 w-2.5" aria-hidden="true" />
                {m.delta}
              </span>
            </div>
            <p className="mt-1.5 font-display text-[13px] font-bold text-white sm:text-sm">{m.value}</p>
            <p className="text-[9.5px] text-white/40">{m.label}</p>
          </div>
        ))}
      </div>

      {/* chart */}
      <div className="mt-2.5 rounded-xl border border-white/8 bg-white/[0.04] p-3">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-white/45">Monthly performance</p>
          <span className="flex items-center gap-1.5 text-[9px] text-white/40">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" /> Live
          </span>
        </div>
        <div className="mt-3 flex h-20 items-end gap-1.5 sm:h-24" role="img" aria-label="Bar chart showing monthly performance trending upward">
          {bars.map((h, i) => (
            <motion.div
              key={i}
              className="flex-1 rounded-t-[3px] bg-gradient-to-t from-accent/25 to-accent"
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              transition={{ delay: 0.9 + i * 0.06, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            />
          ))}
        </div>
        <div className="mt-1.5 flex gap-1.5 text-[7.5px] text-white/30" aria-hidden="true">
          {months.map((m, i) => (
            <span key={i} className="flex-1 text-center">{m}</span>
          ))}
        </div>
      </div>

      {/* orders */}
      <div className="mt-2.5 space-y-1.5">
        {orders.map((o) => (
          <div key={o.id} className="flex items-center justify-between rounded-lg border border-white/6 bg-white/[0.03] px-3 py-2">
            <div className="min-w-0">
              <p className="truncate text-[11px] font-medium text-white/85">{o.name}</p>
              <p className="text-[9px] text-white/35">{o.id}</p>
            </div>
            <div className="text-right">
              <p className="text-[11px] font-semibold text-white/90">{o.amount}</p>
              <p className={`text-[9px] font-medium ${o.tone}`}>{o.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function FloatingPanel({
  className,
  children,
  delay = 0,
}: {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.92 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function DashboardVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setTilt({ x, y });
    };
    const onLeave = () => setTilt({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [reduce]);

  const layer = (depth: number) => ({
    transform: `translate3d(${tilt.x * depth}px, ${tilt.y * depth}px, 0)`,
    transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
  });

  return (
    <div ref={ref} className="relative mx-auto w-full max-w-[560px]" aria-label="Illustration of a business software dashboard built by INCASOFT">
      {/* glow + grid */}
      <div className="absolute -inset-10 rounded-[40px] bg-[radial-gradient(closest-side,hsl(192_71%_49%/0.22),transparent)]" aria-hidden="true" />

      <motion.div
        initial={{ opacity: 0, y: 40, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ delay: 0.45, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        style={layer(10)}
        className="relative"
      >
        <DashboardCard />
      </motion.div>

      {/* floating: automation */}
      <FloatingPanel
        delay={1.15}
        className="absolute -left-2 -top-7 sm:-left-10 sm:-top-8"
      >
        <div style={layer(26)} className="rounded-xl border border-white/10 bg-[#0E2A4A]/95 p-3 shadow-[0_18px_50px_-12px_rgba(3,12,24,0.8)] backdrop-blur-xl">
          <div className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
              <Zap className="h-4 w-4" aria-hidden="true" />
            </span>
            <div>
              <p className="text-[10.5px] font-semibold text-white">Automation running</p>
              <p className="text-[9px] text-white/45">Invoice reminders · Stock alerts</p>
            </div>
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <span className="h-1 flex-1 rounded-full bg-accent/80" aria-hidden="true" />
            <span className="h-1 flex-1 rounded-full bg-accent/50" aria-hidden="true" />
            <span className="h-1 flex-1 animate-pulse rounded-full bg-accent/25" aria-hidden="true" />
          </div>
        </div>
      </FloatingPanel>

      {/* floating: notification */}
      <FloatingPanel delay={1.35} className="absolute -right-2 top-[38%] sm:-right-10">
        <div style={layer(34)} className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-[#0E2A4A]/95 p-3 shadow-[0_18px_50px_-12px_rgba(3,12,24,0.8)] backdrop-blur-xl">
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
            <Bell className="h-4 w-4" aria-hidden="true" />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          </span>
          <div>
            <p className="text-[10.5px] font-semibold text-white">New order received</p>
            <p className="text-[9px] text-white/45">Just now · Branch 1</p>
          </div>
        </div>
      </FloatingPanel>

      {/* floating: success */}
      <FloatingPanel delay={1.55} className="absolute -bottom-5 left-6 sm:left-14">
        <div style={layer(22)} className="flex items-center gap-2 rounded-full border border-white/10 bg-[#0E2A4A]/95 py-2 pl-2.5 pr-4 shadow-[0_18px_50px_-12px_rgba(3,12,24,0.8)] backdrop-blur-xl">
          <CheckCircle2 className="h-4 w-4 text-emerald-300" aria-hidden="true" />
          <p className="text-[10.5px] font-semibold text-white">Report exported · Sales_Q3.pdf</p>
        </div>
      </FloatingPanel>
    </div>
  );
}
