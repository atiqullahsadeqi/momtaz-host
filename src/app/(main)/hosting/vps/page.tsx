"use client";

import { JSX, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { vpsDisplayName } from "@/lib/plan-names";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  ChevronRight,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  DollarSign,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Zap,
  Shield,
  Globe,
  Server,
} from "lucide-react";


gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface VPSPlan {
  id: number;
  slug: string;
  name: string;
  description: string;
  cpuType: "shared" | "dedicated";
  architecture: string;
  cores: number;
  memory: number;
  disk: number;
  includedTraffic: string;
  monthlyPrice: number;
  locations: string[];
}

type FilterCPU = "all" | "shared" | "dedicated";
type SortKey = "price" | "cores" | "memory";

const sortIcons: Record<SortKey, JSX.Element> = {
  price: <DollarSign />,
  cores: <Cpu />,
  memory: <MemoryStick />,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);



// ─── Table Sort Header ─────────────────────────────────────────────────────
function SortHeader({
  label,
  column,
  sortBy,
  sortDir,
  onSort,
}: {
  label: string;
  column: SortKey;
  sortBy: SortKey;
  sortDir: "asc" | "desc";
  onSort: (col: SortKey) => void;
}) {
  const isActive = sortBy === column;
  return (
    <button
      onClick={() => onSort(column)}
      className={`flex items-center gap-1 text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer
        ${isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
    >
      {label}
      {isActive ? (
        sortDir === "asc" ? (
          <ArrowUp className="w-3 h-3" />
        ) : (
          <ArrowDown className="w-3 h-3" />
        )
      ) : (
        <ArrowUpDown className="w-3 h-3 opacity-40" />
      )}
    </button>
  );
}

// ─── Table Row ─────────────────────────────────────────────────────────────
function PlanRow({ plan }: { plan: VPSPlan }) {
  return (
    <tr className="plan-row group border-b border-border transition-colors hover:bg-muted/40">
      {/* Name */}
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-sm leading-tight">{vpsDisplayName(plan.cores, plan.memory)}</p>
          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
            {plan.description}
          </p>
        </div>
      </td>

      {/* vCPU */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <Cpu className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
          <span className="text-sm font-medium">{plan.cores}</span>
          <span className="text-xs text-muted-foreground">vCPU</span>
        </div>
      </td>

      {/* RAM */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <MemoryStick className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
          <span className="text-sm font-medium">{plan.memory} GB</span>
        </div>
      </td>

      {/* Storage */}
      <td className="px-4 py-4">
        <div className="flex items-center gap-2">
          <HardDrive className="w-3.5 h-3.5 text-foreground flex-shrink-0" />
          <span className="text-sm font-medium">{plan.disk} GB</span>
          <span className="text-xs text-muted-foreground">NVMe</span>
        </div>
      </td>

      {/* Price */}
      <td className="px-4 py-4 text-right">
        <div className="text-left">
          <span className="text-lg font-bold text-foreground">
            {fmt(plan.monthlyPrice)}
          </span>
          <span className="text-xs text-muted-foreground ml-1">/mo</span>
        </div>
      </td>

      {/* Action */}
      <td className="px-5 py-4 text-right">
        <Link href={`/hosting/vps/configure/${plan.slug}`}>
          <Button
            size="sm"
            className="cursor-pointer text-xs rounded-full bg-brand-green hover:bg-brand-green/80 text-white transition-all duration-200"
          >
            Configure
            <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
          </Button>
        </Link>
      </td>
    </tr>
  );
}

export default function VPSPlansPage() {
  const [plans, setPlans] = useState<VPSPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterCPU, setFilterCPU] = useState<FilterCPU>("all");
  const [sortBy, setSortBy] = useState<SortKey>("price");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const heroRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLTableSectionElement>(null);

  // Fetch plans
  useEffect(() => {
    fetch("/api/hetzner/server-types")
      .then((r) => r.json())
      .then((data) => {
        if (data.error) throw new Error(data.error);
        setPlans(data.plans);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  // GSAP hero entrance
  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  // GSAP table rows entrance after load
  useEffect(() => {
    if (loading || !tableRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plan-row",
        { opacity: 0, x: -16 },
        {
          opacity: 1,
          x: 0,
          stagger: 0.04,
          duration: 0.4,
          ease: "power2.out",
        }
      );
    }, tableRef);
    return () => ctx.revert();
  }, [loading, filterCPU, sortBy, sortDir]);

  // Handle sort column click — toggle direction if same column
  const handleSort = (col: SortKey) => {
    if (sortBy === col) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
  };

  // Filtered + sorted plans
  const displayed = plans
    .filter((p) => filterCPU === "all" || p.cpuType === filterCPU)
    .sort((a, b) => {
      let diff = 0;
      if (sortBy === "price") diff = a.monthlyPrice - b.monthlyPrice;
      else if (sortBy === "cores") diff = a.cores - b.cores;
      else diff = a.memory - b.memory;
      return sortDir === "asc" ? diff : -diff;
    });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 px-6 w-full mx-auto bg-muted/80"
      >
        <div className="max-w-6xl mx-auto">
          {/* Headline */}
          <div className="mb-10">
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Cloud VPS Servers
              <br />
              <span className="text-primary">Built for Performance</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              Scalable virtual servers with NVMe storage, generous traffic, and
              data centers across Europe and North America. Deploy in seconds.
            </p>
          </div>

          {/* Bento Feature Cards */}
          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">

            {/* Card 1 — Dark promo card (col-span-2) */}
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-primary flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  Blazing fast <strong>NVMe SSD</strong> storage with up to
                  <strong> 10 Gbps</strong> network throughput.
                </h2>
                <p className="text-white/60 text-sm">
                  Every plan comes with dedicated NVMe drives and generous
                  bandwidth — no throttling, no surprises.
                </p>
              </div>
            </div>

            {/* Card 2 — Photo card with bottom blur */}
            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              {/* Background image layer */}
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg')] bg-cover bg-center"
                style={{
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              />
              {/* Blur overlay */}
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                }}
              />
              {/* Content */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">20+</h2>
                <p className="text-white text-sm mb-3">Global data centers</p>
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">99.9%</h2>
                <p className="text-white text-sm">Uptime SLA guaranteed</p>
              </div>
            </div>

            {/* Card 3 — Primary card with floating badges */}
            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden group">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Shield className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">DDoS Protection</h2>
                <p className="text-white/80 text-xs max-w-[160px]">
                  Always-on protection included with every VPS — at no extra cost.
                </p>
              </div>
              {/* Floating badges */}
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">
                  Layer 3
                </div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">
                  Layer 4
                </div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">
                  Layer 7
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>

          </div>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-10">
        {loading && (
          <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading server plans…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="rounded-md border border-border overflow-hidden">
            {/* Toolbar — lives inside the card */}
            <div className="px-4 py-2.5 flex items-center gap-3 border-b border-border bg-muted/30">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground mr-1">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                Filter
              </div>

              {/* CPU type segmented control */}
              <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5 border border-border">
                {(["all", "shared", "dedicated"] as FilterCPU[]).map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterCPU(f)}
                    className={`cursor-pointer px-3 py-1 text-xs font-semibold capitalize rounded transition-all duration-200
                      ${filterCPU === f
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {f === "all" ? "All Plans" : `${f} CPU`}
                  </button>
                ))}
              </div>

              <div className="ml-auto flex items-center gap-3">
                {!loading && (
                  <span className="text-xs text-muted-foreground">
                    {displayed.length} plan{displayed.length !== 1 ? "s" : ""}
                  </span>
                )}

                {/* Sort segmented control */}
                <div className="flex items-center gap-0.5 bg-background rounded-md p-0.5 border border-border">
                  {(["price", "cores", "memory"] as SortKey[]).map((s) => (
                    <button
                      key={s}
                      onClick={() => handleSort(s)}
                      title={`Sort by ${s}`}
                      className={`cursor-pointer w-7 h-6 flex items-center justify-center rounded transition-all duration-200
                        ${sortBy === s
                          ? "bg-muted text-foreground"
                          : "text-muted-foreground hover:text-foreground"
                        }`}
                    >
                      <span className="[&>svg]:w-3.5 [&>svg]:h-3.5">{sortIcons[s]}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border bg-muted/50">
                    <th className="px-5 py-3.5 text-left">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Plan
                      </span>
                    </th>
                    <th className="px-4 py-3.5 text-left">
                      <SortHeader
                        label="vCPU"
                        column="cores"
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-4 py-3.5 text-left">
                      <SortHeader
                        label="RAM"
                        column="memory"
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-4 py-3.5 text-left">
                      <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                        Storage
                      </span>
                    </th>
                    <th className="px-4 py-3.5 text-left">
                      <SortHeader
                        label="Price/mo"
                        column="price"
                        sortBy={sortBy}
                        sortDir={sortDir}
                        onSort={handleSort}
                      />
                    </th>
                    <th className="px-5 py-3.5" />
                  </tr>
                </thead>
                <tbody ref={tableRef}>
                  {displayed.map((plan) => (
                    <PlanRow key={plan.id} plan={plan} />
                  ))}
                  {displayed.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center py-20 text-sm text-muted-foreground"
                      >
                        No plans match your filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}