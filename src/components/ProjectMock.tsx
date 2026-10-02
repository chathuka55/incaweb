import { cn } from "@/lib/utils";

/** Code-drawn product mock visuals for demo projects — no stock imagery. */

function PosMock() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 sm:p-5">
      <div className="flex items-center justify-between">
        <div className="flex gap-1.5">
          {["All", "Food", "Retail"].map((t, i) => (
            <span key={t} className={cn("rounded-full px-2.5 py-1 text-[9px] font-semibold", i === 0 ? "bg-accent text-[#06202E]" : "bg-white/8 text-white/50")}>
              {t}
            </span>
          ))}
        </div>
        <span className="rounded-md bg-emerald-400/15 px-2 py-1 text-[9px] font-semibold text-emerald-300">Register open</span>
      </div>
      <div className="grid flex-1 grid-cols-3 gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex flex-col justify-between rounded-lg border border-white/8 bg-white/[0.05] p-2">
            <span className="h-5 w-5 rounded-md bg-accent/25" />
            <div>
              <span className="block h-1.5 w-4/5 rounded bg-white/25" />
              <span className="mt-1 block h-1.5 w-2/5 rounded bg-accent/50" />
            </div>
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between rounded-lg border border-accent/30 bg-accent/10 px-3 py-2.5">
        <span className="text-[10px] font-medium text-white/70">Total · 4 items</span>
        <span className="font-display text-sm font-bold text-accent">LKR 12,450</span>
      </div>
    </div>
  );
}

function DashboardMock() {
  return (
    <div className="flex h-full flex-col gap-2.5 p-4 sm:p-5">
      <div className="grid grid-cols-3 gap-2">
        {["Revenue", "Active", "Alerts"].map((t, i) => (
          <div key={t} className="rounded-lg border border-white/8 bg-white/[0.05] p-2.5">
            <span className="block h-1.5 w-2/3 rounded bg-white/25" />
            <span className={cn("mt-1.5 block h-2 w-1/2 rounded", i === 0 ? "bg-accent" : "bg-white/40")} />
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5 rounded-lg border border-white/8 bg-white/[0.04] p-3">
        {[40, 65, 50, 80, 58, 92, 70, 100, 84, 74].map((h, i) => (
          <span key={i} className="flex-1 rounded-t-[3px] bg-gradient-to-t from-accent/20 to-accent/80" style={{ height: `${h}%` }} />
        ))}
      </div>
      <div className="flex items-center gap-2">
        <span className="h-1.5 flex-1 rounded-full bg-white/15" />
        <span className="h-1.5 w-16 rounded-full bg-accent/60" />
      </div>
    </div>
  );
}

function ServiceMock() {
  return (
    <div className="flex h-full flex-col gap-2 p-4 sm:p-5">
      {[
        { t: "Job #1082 · Screen replacement", s: "In progress", tone: "text-accent bg-accent/12" },
        { t: "Job #1081 · Annual maintenance", s: "Scheduled", tone: "text-white/60 bg-white/8" },
        { t: "Job #1080 · Diagnostics", s: "Completed", tone: "text-emerald-300 bg-emerald-400/12" },
        { t: "Job #1079 · Installation", s: "Completed", tone: "text-emerald-300 bg-emerald-400/12" },
      ].map((j) => (
        <div key={j.t} className="flex flex-1 items-center justify-between rounded-lg border border-white/8 bg-white/[0.05] px-3">
          <div className="flex items-center gap-2.5">
            <span className="h-6 w-6 rounded-md bg-white/10" />
            <span className="text-[10px] font-medium text-white/80">{j.t}</span>
          </div>
          <span className={cn("rounded-full px-2 py-0.5 text-[8.5px] font-semibold", j.tone)}>{j.s}</span>
        </div>
      ))}
    </div>
  );
}

const mocks = { pos: PosMock, dashboard: DashboardMock, service: ServiceMock } as const;

export function ProjectMock({ accent, className }: { accent: keyof typeof mocks; className?: string }) {
  const Mock = mocks[accent];
  return (
    <div className={cn("relative overflow-hidden rounded-2xl border border-white/10 bg-[#0C2440]", className)}>
      <div className="bg-grid absolute inset-0 opacity-40" aria-hidden="true" />
      <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-accent/15 blur-[50px]" aria-hidden="true" />
      <div className="relative flex h-full flex-col">
        <div className="flex items-center gap-1.5 border-b border-white/8 px-4 py-2.5" aria-hidden="true">
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-white/15" />
          <span className="h-2 w-2 rounded-full bg-accent/70" />
        </div>
        <div className="min-h-[190px] flex-1">
          <Mock />
        </div>
      </div>
    </div>
  );
}
