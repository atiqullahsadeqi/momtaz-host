"use client";

import { JSX, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Globe,
  Wifi,
  ChevronRight,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  DollarSign,
  Server,
} from "lucide-react";
import { ButtonGroup } from "@/components/ui/button-group";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface DedicatedServerPlan {
  id: string;
  slug: string;
  name: string;
  description: string;
  cpu: string;
  ram: string;
  storage: string;
  bandwidth: string;
  traffic: string;
  operatingSystems: string[];
  locations: string[];
  monthlyPrice: number;
  setupFee: number;
  orderableAddons: any[];
  prices: {
    location: string;
    monthly: number;
    setup: number;
  }[];
}

type SortKey = "price" | "name";

const sortIcons: Record<SortKey, JSX.Element> = {
  price: <DollarSign />,
  name: <Server />,
};

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

function StatPill({
  icon: Icon,
  label,
  value,
}: {
  icon: any;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm">
      <div className="w-7 h-7 rounded-md bg-muted/20 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5" />
      </div>
      <div>
        <p className="text-[11px] leading-none mb-0.5">{label}</p>
        <p className="font-medium leading-none text-xs">{value}</p>
      </div>
    </div>
  );
}

// ─── Plan Card ────────────────────────────────────────────────────────────────
function PlanCard({ plan }: { plan: DedicatedServerPlan }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className="plan-card group relative rounded-2xl border bg-card overflow-hidden
                  transition-colors duration-300 cursor-default"
      style={{ "--mx": "50%", "--my": "50%" } as React.CSSProperties}
    >
      <div className="p-6 flex flex-col gap-5 h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold tracking-tight font-mono">
              {plan.name}
            </h3>
            <p className="text-xs mt-0.5 line-clamp-2">{plan.cpu}</p>
          </div>
          {plan.setupFee === 0 && (
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              No Setup Fee
            </Badge>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatPill icon={Cpu} label="CPU" value={plan.cpu.split(" ")[0]} />
          <StatPill icon={MemoryStick} label="RAM" value={plan.ram} />
          <StatPill icon={HardDrive} label="Storage" value={plan.storage.split(" ")[0]} />
          <StatPill icon={Wifi} label="Traffic" value={plan.traffic} />
        </div>

        {/* OS Options */}
        <div className="flex items-start gap-2">
          <Server className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-[11px] mb-1">Operating Systems</p>
            <div className="flex flex-wrap gap-1">
              {plan.operatingSystems.slice(0, 3).map((os, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-muted/20 px-1.5 py-0.5 rounded"
                >
                  {os.replace(" base", "").replace(" latest minimal", "")}
                </span>
              ))}
              {plan.operatingSystems.length > 3 && (
                <span className="text-[10px]">
                  +{plan.operatingSystems.length - 3} more
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Locations */}
        <div className="flex items-center gap-2 flex-wrap">
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          {plan.locations.map((loc) => (
            <span
              key={loc}
              className="text-[11px] bg-muted/20 px-1.5 py-0.5 rounded"
            >
              {loc}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-muted/20" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-[11px] uppercase tracking-wider mb-0.5">
              Starting at
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-secondary font-mono">
                {fmt(plan.monthlyPrice)}
              </span>
              <span className="text-xs">/mo</span>
            </div>
            {plan.setupFee > 0 && (
              <p className="text-[10px] mt-1">
                + {fmt(plan.setupFee)} setup
              </p>
            )}
          </div>
          <Link href={`/hosting/dedicated/configure/${plan.slug}`}>
            <Button size="sm" variant="secondary" className="cursor-pointer">
              Configure
              <ChevronRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function DedicatedServersPage() {
  const [plans, setPlans] = useState<DedicatedServerPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("price");

  const heroRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Fetch plans
  useEffect(() => {
    fetch("/api/hetzner/dedicated-servers")
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

  // GSAP cards entrance after load
  useEffect(() => {
    if (loading || !gridRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".plan-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.06,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, [loading, sortBy]);

  // Sorted plans
  const displayed = [...plans].sort((a, b) => {
    if (sortBy === "price") return a.monthlyPrice - b.monthlyPrice;
    return a.name.localeCompare(b.name);
  });

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 px-6 w-full mx-auto bg-muted/80"
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
            Dedicated Servers
            <br />
            <span className="text-primary">Enterprise-Grade Power</span>
          </h1>
          <p className="hero-line max-w-xl">
            Bare metal servers with AMD Ryzen™ and Intel® Xeon® processors,
            NVMe storage, and unlimited traffic. Full root access included.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-20 backdrop-blur border-b border-white/6">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-4 flex-wrap">
          <div className="flex items-center gap-1.5 text-xs mr-2">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            Sort
          </div>

          {/* Sort */}
          <div className="flex items-center gap-1">
            <ButtonGroup>
              {(["price", "name"] as SortKey[]).map((s) => (
                <Button
                  variant="ghost"
                  size="sm"
                  key={s}
                  onClick={() => setSortBy(s)}
                  className={`bg-background hover:bg-muted/50 border text-xs capitalize transition-all duration-200
                  ${sortBy === s ? "bg-muted" : ""}
                   `}
                >
                  {sortIcons[s]}
                  <span className="ml-1.5">{s}</span>
                </Button>
              ))}
            </ButtonGroup>
          </div>

          {!loading && (
            <span className="text-xs font-mono ml-auto">
              {displayed.length} server{displayed.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        {loading && (
          <div className="flex items-center justify-center py-32 gap-3 text-white/40">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading dedicated servers…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm max-w-md mx-auto">
            <AlertCircle className="w-4 h-4 flex-shrink-0" />
            {error}
          </div>
        )}

        {!loading && !error && (
          <div
            ref={gridRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {displayed.map((plan) => (
              <PlanCard key={plan.id} plan={plan} />
            ))}
            {displayed.length === 0 && (
              <p className="col-span-full text-center text-white/30 py-20 text-sm">
                No servers available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
