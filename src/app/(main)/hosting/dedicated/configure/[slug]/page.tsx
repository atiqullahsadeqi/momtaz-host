"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
import { OrderInquiryButton } from "@/components/order-inquiry-button";
import { dedicatedDisplayName } from "@/lib/plan-names";
import Image from "next/image";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Cpu,
  MemoryStick,
  HardDrive,
  Wifi,
  MapPin,
  Key,
  Monitor,
  ArrowLeft,
  Check,
  ChevronDown,
  Loader2,
  AlertCircle,
  Server,
  Plus,
  Minus,
  Info,
  ChevronRight,
  ShieldCheck,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────
interface DedicatedPlan {
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
  prices: {
    location: string;
    monthly: number;
    setup: number;
  }[];
  monthlyPrice: number;
  setupFee: number;
  orderableAddons: AddonOption[];
}

interface AddonOption {
  id: string;
  name: string;
  description: string;
  monthlyPrice: number;
  setupFee: number;
  category: "ram" | "storage" | "ip" | "other";
  min: number;
  max?: number;
  requires?: number;
  isDefault?: boolean;
  defaultQuantity?: number;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────
const fmt = (n: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(n);

const OS_ICONS: Record<string, string> = {
  ubuntu: "/images/ubuntu-icon.png",
  debian: "/images/debian.png",
  centos: "/images/cent_os-icon.png",
  fedora: "/images/fedora-icon.png",
  rocky: "/images/rocky_linux-icon.png",
  alma: "/images/alma_linux-icon.png",
  windows: "/images/windows.png",
  opensuse: "/images/openSUSE-icon.png",
};


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

function osIcon(osName: string): string {
  const lower = osName.toLowerCase();
  if (lower.includes("ubuntu")) return OS_ICONS.ubuntu;
  if (lower.includes("debian")) return OS_ICONS.debian;
  if (lower.includes("centos")) return OS_ICONS.centos;
  if (lower.includes("fedora")) return OS_ICONS.fedora;
  if (lower.includes("rocky")) return OS_ICONS.rocky;
  if (lower.includes("alma")) return OS_ICONS.alma;
  if (lower.includes("windows")) return OS_ICONS.windows;
  if (lower.includes("opensuse") || lower.includes("suse")) return OS_ICONS.opensuse;
  return OS_ICONS.opensuse;
}

// ─── Selection Card ───────────────────────────────────────────────────────────
function SelectCard({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`relative cursor-pointer w-full text-left rounded-xl border p-3 transition-all duration-200
        ${selected
          ? "border-primary bg-muted/20"
          : "border-border hover:border-primary hover:bg-muted/40"
        }`}
    >
      {selected && (
        <span className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
          <Check className="w-2.5 h-2.5 text-primary-foreground" />
        </span>
      )}
      {children}
    </button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function Section({
  icon: Icon,
  title,
  children,
  description,
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
  description?: string;
}) {
  return (
    <div className="config-section">
      <div className="mb-4">
        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
            <Icon className="w-3.5 h-3.5" />
          </div>
          <h2 className="text-sm font-semibold uppercase tracking-wider">
            {title}
          </h2>
        </div>
        {description && (
          <p className="text-xs text-muted-foreground ml-9">{description}</p>
        )}
      </div>
      {children}
    </div>
  );
}

// ─── Addon Counter ────────────────────────────────────────────────────────────
function AddonCounter({
  addon,
  quantity,
  onIncrement,
  onDecrement,
}: {
  addon: AddonOption;
  quantity: number;
  onIncrement: () => void;
  onDecrement: () => void;
}) {
  return (
    <div className={`flex items-center justify-between p-3 rounded-xl border transition-colors ${quantity > 0 ? "border-primary bg-muted/20" : "border-border bg-muted/20"}`}>
      <div className="flex-1">
        <p className="text-sm font-medium">{addon.name}</p>
        <p className="text-xs text-muted-foreground mt-0.5">
          {addon.monthlyPrice > 0 ? `${fmt(addon.monthlyPrice)}/mo` : "Included"}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrement}
          disabled={quantity === 0}
          className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Minus className="w-3.5 h-3.5" />
        </button>
        <span className="text-sm font-mono font-semibold w-6 text-center">
          {quantity}
        </span>
        <button
          type="button"
          onClick={onIncrement}
          disabled={addon.max !== undefined && quantity >= addon.max}
          className="w-8 h-8 rounded-lg bg-muted hover:bg-muted/80 disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
        >
          <Plus className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DedicatedConfigurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [plan, setPlan] = useState<DedicatedPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Config state
  const [selectedOS, setSelectedOS] = useState<string | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [serverName, setServerName] = useState("");
  const [filterOS, setFilterOS] = useState<string>("all");

  // Addon state
  const [selectedRamId, setSelectedRamId] = useState<string | null>(null);
  const [ipv4Selected, setIpv4Selected] = useState(true); // default selected
  const [driveAddons, setDriveAddons] = useState<Record<string, number>>({});
  const [baseConfig, setBaseConfig] = useState<any[]>([]);
  const [spaces, setSpaces] = useState<any>(null);
  const [maxDriveSlotsApi, setMaxDriveSlotsApi] = useState<number>(4);

  const [isOrdering, setIsOrdering] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<"stripe" | "paypal" | "offline">("stripe");
  const [orderStatus, setOrderStatus] = useState<{ success: boolean; message: string } | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  const ramAddons = plan?.orderableAddons.filter(a => a.category === "ram") || [];
  const ipv4Addon = plan?.orderableAddons.find(a => a.category === "ip");
  const driveOptions = plan?.orderableAddons.filter(a => a.category === "storage") || [];

  // Initialize drive addon counters
  useEffect(() => {
    if (plan && driveOptions.length > 0) {
      const initialDrives: Record<string, number> = {};
      driveOptions.forEach((d) => {
        initialDrives[d.id] = d.defaultQuantity || 0;
      });
      setDriveAddons(initialDrives);

      // Initialize RAM
      const defaultRam = ramAddons.find(r => r.isDefault);
      if (defaultRam) setSelectedRamId(defaultRam.id);
    }
  }, [plan]);

  // Fetch plan and live addons
  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // 1. Fetch base plan info
        const res = await fetch("/api/hetzner/dedicated-servers");
        const data = await res.json();
        const basePlan = data.plans.find((p: any) => p.slug === slug);

        if (!basePlan) {
          setError("Plan not found");
          setLoading(false);
          return;
        }

        // 2. Fetch detailed live addons
        const configRes = await fetch(`/api/hetzner/dedicated-servers/${slug}/config`);
        const configData = await configRes.json();

        const combinedPlan = {
          ...basePlan,
          orderableAddons: [
            ...(basePlan.orderableAddons || []),
            ...(configData.addons || [])
          ]
        };

        setBaseConfig(configData.baseConfig || []);
        setSpaces(configData.spaces || null);
        setMaxDriveSlotsApi(configData.maxDriveSlots || 4);
        setPlan(combinedPlan);

        // Default selections
        if (combinedPlan.operatingSystems.length > 0)
          setSelectedOS(combinedPlan.operatingSystems[0]);
        if (combinedPlan.locations.length > 0)
          setSelectedLocation(combinedPlan.locations[0]);

      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch configuration details");
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [slug]);

  // GSAP entrance
  useEffect(() => {
    if (loading || !pageRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".config-section",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.5,
          ease: "power2.out",
        }
      );
    }, pageRef);
    return () => ctx.revert();
  }, [loading]);

  // Calculate total drive count including base drives (addons marked as isDefault)
  const totalDrives = Object.entries(driveAddons).reduce((sum, [id, qty]) => {
    const addon = driveOptions.find((d) => d.id === id);
    return sum + (addon ? (addon.requires || 1) * qty : 0);
  }, 0);

  // Dynamic max drive slots from API
  const maxDriveSlots = maxDriveSlotsApi;

  // Calculate addon pricing
  const ramAddon = ramAddons.find(r => r.id === selectedRamId);
  const ramAddonCost = (ramAddon && !ramAddon.isDefault) ? ramAddon.monthlyPrice : 0;
  const ipv4Cost = (ipv4Selected && ipv4Addon) ? ipv4Addon.monthlyPrice : 0;
  const driveCost = Object.entries(driveAddons).reduce((sum, [id, qty]) => {
    const addon = driveOptions.find((d) => d.id === id);
    if (addon) {
      // Only charge for quantities above the included amount
      const extraQty = Math.max(0, qty - (addon.defaultQuantity || 0));
      return sum + addon.monthlyPrice * extraQty;
    }
    return sum;
  }, 0);

  const totalMonthlyPrice = plan
    ? plan.monthlyPrice + ramAddonCost + ipv4Cost + driveCost
    : 0;

  // Unique OS categories
  const osCategories = ["all", ...new Set(plan?.operatingSystems.map(os => {
    if (os.toLowerCase().includes("windows")) return "windows";
    if (os.toLowerCase().includes("ubuntu")) return "ubuntu";
    if (os.toLowerCase().includes("debian")) return "debian";
    if (os.toLowerCase().includes("centos")) return "centos";
    return "other";
  }) || [])];

  const filteredOS = filterOS === "all"
    ? plan?.operatingSystems || []
    : plan?.operatingSystems.filter(os => {
      const lower = os.toLowerCase();
      return lower.includes(filterOS);
    }) || [];

  const handleOrder = async () => {
    if (!plan || !selectedOS || !selectedLocation) {
      alert("Please select OS and Location first.");
      return;
    }

    try {
      setIsOrdering(true);
      setOrderStatus(null);

      // Build monthly total
      const basePrice = plan.prices.find(p => p.location === selectedLocation)?.monthly ?? plan.monthlyPrice;
      const ramAddon = ramAddons.find(r => r.id === selectedRamId);
      const ramPrice = ramAddon?.monthlyPrice ?? 0;
      const drivesPrice = Object.entries(driveAddons).reduce((acc, [id, qty]) => {
        const addon = driveOptions.find(d => d.id === id);
        return acc + (addon?.monthlyPrice ?? 0) * qty;
      }, 0);
      const ipPrice = ipv4Selected && ipv4Addon ? ipv4Addon.monthlyPrice : 0;
      const totalMonthly = basePrice + ramPrice + drivesPrice + ipPrice;
      const setupFee = plan.prices.find(p => p.location === selectedLocation)?.setup ?? plan.setupFee;

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "dedicated",
          planId: plan.id,
          planName: plan.name,
          configuration: {
            slug,
            location: selectedLocation,
            operatingSystem: selectedOS,
            hostname: serverName || `server-${slug}`,
            ram: ramAddon ? { id: selectedRamId, name: ramAddon.name } : null,
            drives: Object.entries(driveAddons)
              .filter(([_, qty]) => qty > 0)
              .map(([id, qty]) => {
                const d = driveOptions.find(d => d.id === id);
                return { id, name: d?.name, quantity: qty };
              }),
            ipv4: ipv4Selected,
          },
          totalMonthly,
          setupFee,
        }),
      });

      const result = await response.json();
      if (result.success) {
        if (result.checkoutUrl) {
          window.location.href = `${result.checkoutUrl}?method=${paymentMethod}`;
        } else {
          window.location.href = `/dashboard/orders/${result.order.id}`;
        }
      } else if (response.status === 401) {
        window.location.href = `/login?callbackURL=/hosting/dedicated/configure/${slug}`;
      } else {
        throw new Error(result.error || "Order failed");
      }
    } catch (err: unknown) {
      console.error("Order error:", err);
      setOrderStatus({ success: false, message: err instanceof Error ? err.message : "Order failed" });
    } finally {
      setIsOrdering(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center gap-3 text-muted-foreground">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading configuration…</span>
      </div>
    );

  if (error || !plan)
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="flex items-center gap-3 bg-destructive/10 border border-destructive/20 rounded-xl p-4 text-destructive text-sm">
          <AlertCircle className="w-4 h-4" />
          {error ?? "Plan not found"}
        </div>
      </div>
    );

  return (
    <div ref={pageRef} className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        {/* Back */}
        <Link
          href="/hosting/dedicated"
          className="config-section inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dedicated Servers
        </Link>

        {/* Page title */}
        <div className="config-section mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Configure <span className="text-primary">{dedicatedDisplayName(plan.cpu, parseInt(plan.ram))}</span>
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            Customize your dedicated server and deploy instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* ── Left: config panels ── */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            {/* Server Name */}
            <Section icon={Server} title="Server Name">
              <Input
                value={serverName}
                onChange={(e) => setServerName(e.target.value)}
                placeholder="e.g. dedicated-prod-01"
                className="rounded-xl text-sm"
              />
              <p className="text-xs text-muted-foreground mt-2">
                Lowercase letters, numbers, and hyphens only.
              </p>
            </Section>

            {/* OS Image */}
            <Section
              icon={Monitor}
              title="Operating System"
              description="Choose your preferred operating system"
            >
              {/* OS filter tabs */}
              <div className="flex gap-1 mb-4 flex-wrap">
                {osCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setFilterOS(cat)}
                    className={`px-2.5 py-1 rounded-md text-xs capitalize transition-all
                      ${filterOS === cat
                        ? "bg-primary text-white font-semibold"
                        : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {filteredOS.map((os) => (
                  <SelectCard
                    key={os}
                    selected={selectedOS === os}
                    onClick={() => setSelectedOS(os)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={osIcon(os)}
                        alt={os}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <div>
                        <p className="text-sm font-medium">{os}</p>
                      </div>
                    </div>
                  </SelectCard>
                ))}
              </div>
            </Section>

            {/* Location */}
            <Section
              icon={MapPin}
              title="Server Location"
              description="Select datacenter location"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {plan.locations.map((loc) => {
                  const { name, flag } = locationLabel(loc);
                  return (
                    <SelectCard
                      key={loc}
                      selected={selectedLocation === loc}
                      onClick={() => setSelectedLocation(loc)}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-base">{flag}</span>
                        <p className="text-sm font-medium">{name}</p>
                      </div>
                    </SelectCard>
                  );
                })}
              </div>
            </Section>

            {ramAddons.length > 0 && (
              <Section
                icon={MemoryStick}
                title="RAM"
                description="Default configuration is included. Choose an upgrade if needed."
              >
                <div className="space-y-2">
                  {ramAddons.map((addon) => (
                    <SelectCard
                      key={addon.id}
                      selected={selectedRamId === addon.id}
                      onClick={() => setSelectedRamId(addon.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium">{addon.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">
                            {addon.isDefault ? "Included" : `${fmt(addon.monthlyPrice)}/mo`}
                          </p>
                        </div>
                        {selectedRamId === addon.id && (
                          <Badge variant="secondary" className="text-xs">
                            {addon.isDefault ? "Current" : "Selected"}
                          </Badge>
                        )}
                      </div>
                    </SelectCard>
                  ))}
                </div>
              </Section>
            )}

            {/* IPv4 Address */}
            <Section
              icon={Wifi}
              title="IP Address"
              description="Base IP is IPv6 (free included). Add IPv4 if needed."
            >
              <div className="flex items-start gap-3 p-4 rounded-xl border border-border/60 bg-muted/40 mb-3">
                <Info className="w-4 h-4 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div className="text-xs text-muted-foreground">
                  <p className="font-medium mb-1 text-foreground">IPv6 Included by Default</p>
                  <p>
                    Your server comes with a free IPv6 address. IPv4 is optional and can be added for {fmt(ipv4Addon?.monthlyPrice || 0)}/month.
                  </p>
                </div>
              </div>

              {ipv4Addon ? (
                <SelectCard
                  selected={ipv4Selected}
                  onClick={() => setIpv4Selected(!ipv4Selected)}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium">{ipv4Addon.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {fmt(ipv4Addon.monthlyPrice)}/mo
                      </p>
                    </div>

                  </div>
                </SelectCard>
              ) : (
                <div className="text-xs text-muted-foreground p-4 rounded-xl border border-dashed text-center">
                  Managed IP options currently unavailable for this model.
                </div>
              )}
            </Section>

            {/* Drives */}
            {driveOptions.length > 0 && (
              <Section
                icon={HardDrive}
                title="DRIVES"
                description={`You can add additional drives to your configuration. Used drive slots: ${totalDrives} / ${maxDriveSlots}`}
              >
                {/* NVME SSD */}
                {driveOptions.filter((d) => d.id.includes("nvme") && !d.id.includes("dc")).length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      NVME SSD
                    </h3>
                    <div className="space-y-2">
                      {driveOptions
                        .filter((d) => d.id.includes("nvme") && !d.id.includes("dc"))
                        .map((addon) => (
                          <AddonCounter
                            key={addon.id}
                            addon={addon}
                            quantity={driveAddons[addon.id] || 0}
                            onIncrement={() => {
                              if (totalDrives < maxDriveSlots) {
                                setDriveAddons((prev) => ({
                                  ...prev,
                                  [addon.id]: (prev[addon.id] || 0) + 1,
                                }));
                              }
                            }}
                            onDecrement={() => {
                              setDriveAddons((prev) => ({
                                ...prev,
                                [addon.id]: Math.max(0, (prev[addon.id] || 0) - 1),
                              }));
                            }}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* NVME Datacenter Edition */}
                {driveOptions.filter((d) => d.id.includes("nvme") && d.id.includes("dc")).length > 0 && (
                  <div className="mb-4">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      NVME SSD Datacenter Edition
                    </h3>
                    <div className="space-y-2">
                      {driveOptions
                        .filter((d) => d.id.includes("nvme") && d.id.includes("dc"))
                        .map((addon) => (
                          <AddonCounter
                            key={addon.id}
                            addon={addon}
                            quantity={driveAddons[addon.id] || 0}
                            onIncrement={() => {
                              if (totalDrives < maxDriveSlots) {
                                setDriveAddons((prev) => ({
                                  ...prev,
                                  [addon.id]: (prev[addon.id] || 0) + 1,
                                }));
                              }
                            }}
                            onDecrement={() => {
                              setDriveAddons((prev) => ({
                                ...prev,
                                [addon.id]: Math.max(0, (prev[addon.id] || 0) - 1),
                              }));
                            }}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {/* SATA SSD */}
                {driveOptions.filter((d) => d.id.includes("sata")).length > 0 && (
                  <div>
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                      SATA SSD
                    </h3>
                    <div className="space-y-2">
                      {driveOptions
                        .filter((d) => d.id.includes("sata"))
                        .map((addon) => (
                          <AddonCounter
                            key={addon.id}
                            addon={addon}
                            quantity={driveAddons[addon.id] || 0}
                            onIncrement={() => {
                              if (totalDrives < maxDriveSlots) {
                                setDriveAddons((prev) => ({
                                  ...prev,
                                  [addon.id]: (prev[addon.id] || 0) + 1,
                                }));
                              }
                            }}
                            onDecrement={() => {
                              setDriveAddons((prev) => ({
                                ...prev,
                                [addon.id]: Math.max(0, (prev[addon.id] || 0) - 1),
                              }));
                            }}
                          />
                        ))}
                    </div>
                  </div>
                )}

                {totalDrives >= maxDriveSlots && (
                  <div className="flex items-start gap-2 p-3 rounded-xl border border-amber-500/20 bg-amber-500/5 mt-3">
                    <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-amber-300">
                      Maximum drive slots reached ({maxDriveSlots}/{maxDriveSlots})
                    </p>
                  </div>
                )}
              </Section>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="config-section lg:sticky lg:top-24">
            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              <div className="px-5 py-4 border-b border-border/60">
                <h3 className="text-md font-semibold uppercase tracking-wider">
                  Order Summary
                </h3>
              </div>

              <div className="p-5 flex flex-col gap-4">
                {/* Plan details */}
                <div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Selected Plan
                  </p>
                  <div className="mb-3">
                    <span className="font-bold font-mono">{dedicatedDisplayName(plan.cpu, parseInt(plan.ram))}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    {[
                      ["CPU", plan.cpu],
                      ["RAM", plan.ram],
                      ["Storage", plan.storage.replace(/\s*(Datacenter|Edition|Software|Gen\s*\d|RAID|\(|,).*/gi, "").trim()],
                      ["Bandwidth", plan.bandwidth],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="text-muted-foreground">{label}</p>
                        <p className="font-medium">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-border/60" />

                {/* Config summary */}
                <div className="flex flex-col gap-2 text-xs">
                  <SummaryRow
                    label="OS"
                    value={selectedOS || "Not selected"}
                  />
                  <SummaryRow
                    label="Location"
                    value={selectedLocation ? locationLabel(selectedLocation).name : "Not selected"}
                  />
                  <SummaryRow
                    label="Server Name"
                    value={serverName || "Auto-generated"}
                  />
                </div>

                {/* Addons summary */}
                {(ramAddonCost > 0 || ipv4Selected || totalDrives > 0) && (
                  <>
                    <div className="h-px bg-border/60" />
                    <div>
                      <p className="text-xs text-muted-foreground mb-2">
                        Add-ons
                      </p>
                      <div className="flex flex-col gap-1.5 text-xs">
                        {ramAddonCost > 0 && ramAddon && (
                          <div className="flex justify-between">
                            <span>RAM Upgrade ({ramAddon.name})</span>
                            <span className="font-mono">
                              {fmt(ramAddonCost)}
                            </span>
                          </div>
                        )}
                        {ipv4Selected && (
                          <div className="flex justify-between">
                            <span>IPv4 Address</span>
                            <span className="font-mono">{fmt(ipv4Cost)}</span>
                          </div>
                        )}
                        {totalDrives > 0 && (
                          <div className="flex justify-between">
                            <span>Additional Drives ({totalDrives})</span>
                            <span className="font-mono">{fmt(driveCost)}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </>
                )}

                <div className="h-px bg-border/60" />

                {/* Price */}
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs text-muted-foreground">
                      Monthly Total
                    </span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold font-mono">
                        {fmt(totalMonthlyPrice)}
                      </span>
                      <span className="text-xs text-muted-foreground">/mo</span>
                    </div>
                  </div>
                  {plan.setupFee > 0 && (
                    <p className="text-[10px] text-muted-foreground">
                      + {fmt(plan.setupFee)} one-time setup fee
                    </p>
                  )}
                  <p className="text-[10px] text-muted-foreground mt-1">
                    Billed monthly. Cancel any time.
                  </p>
                </div>

{/* TEMP HIDDEN: Payment method selector — restore when order flow is ready */}

                {/* TEMP: Order button commented for launch — original handleOrder flow preserved above */}
                <OrderInquiryButton
                  product="Dedicated Server"
                  disabled={!selectedOS || !selectedLocation}
                  details={{
                    Plan: plan ? dedicatedDisplayName(plan.cpu, parseInt(plan.ram)) : slug,
                    Location: selectedLocation || "—",
                    OS: selectedOS || "—",
                    Hostname: serverName || `server-${slug}`,
                    "Monthly Price": `$${(() => { const bp = plan?.prices.find(p => p.location === selectedLocation)?.monthly ?? plan?.monthlyPrice ?? 0; return bp.toFixed(2); })()}`,
                  }}
                />

                {orderStatus && (
                  <div
                    className={`mt-4 p-4 rounded-xl text-xs flex items-start gap-2 ${orderStatus.success
                      ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                      : "bg-red-500/10 text-red-400 border border-red-500/20"
                      }`}
                  >
                    <Info className="w-4 h-4 flex-shrink-0" />
                    <p>{orderStatus.message}</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string | React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className="text-muted-foreground flex-shrink-0">{label}</span>
      <span className="text-right leading-relaxed">{value}</span>
    </div>
  );
}
