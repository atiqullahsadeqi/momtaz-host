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
  Zap,
  Shield,
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


const LOCATION_NAMES: Record<string, { name: string; flag: string }> = {
  hel1: { name: "Helsinki, Finland", flag: "🇫🇮" },
  hel2: { name: "Helsinki, Finland", flag: "🇫🇮" },
  fsn1: { name: "Falkenstein, Germany", flag: "🇩🇪" },
  fsn2: { name: "Falkenstein, Germany", flag: "🇩🇪" },
  nbg1: { name: "Nuremberg, Germany", flag: "🇩🇪" },
  nbg2: { name: "Nuremberg, Germany", flag: "🇩🇪" },
  ash:  { name: "Ashburn, USA", flag: "🇺🇸" },
  hil:  { name: "Hillsboro, USA", flag: "🇺🇸" },
  sin:  { name: "Singapore", flag: "🇸🇬" },
};

function locationLabel(code: string) {
  const key = code.toLowerCase();
  return LOCATION_NAMES[key] ?? { name: code, flag: "🌍" };
}

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
      <div className="w-7 h-7 flex items-center justify-center flex-shrink-0">
        <Icon className="w-3.5 h-3.5 text-foreground" />
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
            <Badge className="bg-brand-green/10 text-brand-green border-brand-green/20">
              No Setup Fee
            </Badge>
          )}
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatPill icon={Cpu} label="CPU" value={plan.cpu.split(" ")[0]} />
          <StatPill icon={MemoryStick} label="RAM" value={plan.ram} />
          <StatPill icon={HardDrive} label="Storage" value={plan.storage} />
          <StatPill icon={Wifi} label="Traffic" value={plan.traffic} />
        </div>

        {/* OS Options */}
        <div className="flex items-start gap-2">
          <Server className="w-3.5 h-3.5 flex-shrink-0 mt-0.5 text-foreground" />
          <div className="flex-1">
            <p className="text-[11px] mb-1">Operating Systems</p>
            <div className="flex flex-wrap gap-1">
              {plan.operatingSystems.slice(0, 3).map((os, i) => (
                <span
                  key={i}
                  className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded"
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
          <Globe className="w-3.5 h-3.5 flex-shrink-0 text-foreground" />
          {plan.locations.map((loc) => {
            const { name, flag } = locationLabel(loc);
            return (
              <span key={loc} className="text-[11px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded flex items-center gap-1">
                {flag} {name}
              </span>
            );
          })}
        </div>

        {/* Divider */}
        <div className="h-px bg-border/60" />

        {/* Price + CTA */}
        <div className="flex items-end justify-between mt-auto">
          <div>
            <p className="text-[11px] uppercase tracking-wider mb-0.5">
              Starting at
            </p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground font-mono">
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
            <Button size="sm" className="cursor-pointer rounded-full bg-brand-green hover:bg-brand-green/80 text-white">
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
      <section ref={heroRef} className="relative pt-24 pb-16 px-6 w-full mx-auto bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Dedicated Servers
              <br />
              <span className="text-primary">Enterprise-Grade Power</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              Bare metal servers with AMD Ryzen™ and Intel® Xeon® processors,
              NVMe storage, and unlimited traffic. Full root access included.
            </p>
          </div>

          {/* Bento cards */}
          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Card 1 — dark promo col-span-2 */}
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  True bare-metal performance — <strong>no hypervisor</strong>, no noisy neighbours, no shared resources.
                </h2>
                <p className="text-white/60 text-sm">
                  Every CPU cycle, every GB of RAM, every NVMe IOPS is yours alone.
                </p>
              </div>
            </div>

            {/* Card 2 — photo card */}
            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">AMD Ryzen™ & Intel® Xeon®</h2>
                <p className="text-white text-sm mb-3">Latest-gen processors</p>
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">Up to 10 Gbps</h2>
                <p className="text-white text-sm">Dedicated uplink</p>
              </div>
            </div>

            {/* Card 3 — primary with floating badges */}
            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Shield className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">Full Root Access</h2>
                <p className="text-white/80 text-xs max-w-[160px]">
                  Complete control over your hardware — install any OS, any software.
                </p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">IPMI Access</div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">KVM Console</div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">Root SSH</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-0 z-20 backdrop-blur bg-background/80 border-b border-border/60">
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
          <div className="flex items-center justify-center py-32 gap-3 text-muted-foreground">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span className="text-sm">Loading dedicated servers…</span>
          </div>
        )}

        {error && (
          <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm max-w-md mx-auto">
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
              <p className="col-span-full text-center text-muted-foreground py-20 text-sm">
                No servers available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
