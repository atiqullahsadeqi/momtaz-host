"use client";

import { useEffect, useRef, useState, use } from "react";
import Link from "next/link";
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
} from "lucide-react";

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

interface OSImage {
  id: number;
  name: string;
  description: string;
  osFlavor: string;
  osVersion: string;
  architecture: string;
}

interface Datacenter {
  id: number;
  name: string;
  description: string;
  location: string;
  country: string;
  networkZone: string;
}

interface SSHKey {
  id: number;
  name: string;
  fingerprint: string;
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
};

function osIcon(flavor: string) {
  return OS_ICONS[flavor] || "/images/openSUSE-icon.png";
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
          : "border-primary/20 bg-white/3 hover:border-primary hover:bg-white/5"
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
}: {
  icon: any;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="config-section">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-7 h-7 rounded-lg bg-muted/20 flex items-center justify-center">
          <Icon className="w-3.5 h-3.5 " />
        </div>
        <h2 className="text-sm font-semibold  uppercase tracking-wider">
          {title}
        </h2>
      </div>
      {children}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ConfigurePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);

  const [plan, setPlan] = useState<VPSPlan | null>(null);
  const [images, setImages] = useState<OSImage[]>([]);
  const [datacenters, setDatacenters] = useState<Datacenter[]>([]);
  const [sshKeys, setSSHKeys] = useState<SSHKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Config state
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [selectedDC, setSelectedDC] = useState<number | null>(null);
  const [selectedSSHKeys, setSelectedSSHKeys] = useState<number[]>([]);
  const [serverName, setServerName] = useState("");
  const [filterOS, setFilterOS] = useState<string>("all");
  const [isOrdering, setIsOrdering] = useState(false);
  const [orderStatus, setOrderStatus] = useState<{ success: boolean; message: string } | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  // Fetch plan + config options
  useEffect(() => {
    Promise.all([
      fetch("/api/hetzner/server-types").then((r) => r.json()),
      fetch("/api/hetzner/config-options").then((r) => r.json()),
    ])
      .then(([plansData, configData]) => {
        if (plansData.error) throw new Error(plansData.error);
        if (configData.error) throw new Error(configData.error);

        const found = plansData.plans.find((p: VPSPlan) => p.slug === slug);
        if (!found) throw new Error("Plan not found");
        setPlan(found);

        // Filter images matching server architecture
        const filteredImages = configData.images.filter(
          (img: OSImage) =>
            img.architecture === found.architecture ||
            img.architecture === "x86" // always show x86 as fallback
        );
        setImages(filteredImages);
        setDatacenters(configData.datacenters);
        setSSHKeys(configData.sshKeys);

        // Default selections
        if (filteredImages.length > 0) setSelectedImage(filteredImages[0].id);
        if (configData.datacenters.length > 0)
          setSelectedDC(configData.datacenters[0].id);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
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

  const toggleSSHKey = (id: number) =>
    setSelectedSSHKeys((prev) =>
      prev.includes(id) ? prev.filter((k) => k !== id) : [...prev, id]
    );

  const handleOrder = async () => {
    if (!plan || !selectedImage || !selectedDC) {
      alert("Please select an OS and Datacenter first.");
      return;
    }
    try {
      setIsOrdering(true);
      setOrderStatus(null);
      const selectedImageObj = images.find(i => i.id === selectedImage);
      const selectedDCObj = datacenters.find(d => d.id === selectedDC);
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          orderType: "vps",
          planId: String(plan.id),
          planName: plan.name,
          configuration: {
            slug,
            operatingSystem: selectedImageObj?.description ?? selectedImageObj?.name,
            osFlavor: selectedImageObj?.osFlavor,
            datacenter: selectedDCObj ? `${selectedDCObj.location} (${selectedDCObj.name})` : null,
            hostname: serverName || `vps-${slug}`,
            sshKeys: selectedSSHKeys,
            cores: plan.cores,
            memory: plan.memory,
            disk: plan.disk,
          },
          totalMonthly: plan.monthlyPrice,
          setupFee: 0,
        }),
      });
      const result = await response.json();
      if (result.success) {
        if (result.checkoutUrl) {
          window.location.href = result.checkoutUrl;
        } else {
          window.location.href = `/dashboard/orders/${result.order.id}`;
        }
      } else if (response.status === 401) {
        window.location.href = `/login?callbackURL=/hosting/vps/configure/${slug}`;
      } else {
        throw new Error((result.error || "Order failed") + (result.details ? `: ${result.details}` : ""));
      }
    } catch (err: unknown) {
      console.error("Order error:", err);
      setOrderStatus({ success: false, message: err instanceof Error ? err.message : "Order failed" });
    } finally {
      setIsOrdering(false);
    }
  };

  // Unique OS flavors for tab filter
  const osFlavors = [
    "all",
    ...Array.from(new Set(images.map((i) => i.osFlavor))),
  ];

  const filteredImages =
    filterOS === "all"
      ? images
      : images.filter((i) => i.osFlavor === filterOS);

  if (loading)
    return (
      <div className="min-h-screen bg-[#090c10] flex items-center justify-center gap-3 text-white/40">
        <Loader2 className="w-5 h-5 animate-spin" />
        <span className="text-sm">Loading configuration…</span>
      </div>
    );

  if (error || !plan)
    return (
      <div className="min-h-screen bg-[#090c10] flex items-center justify-center">
        <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm">
          <AlertCircle className="w-4 h-4" />
          {error ?? "Plan not found"}
        </div>
      </div>
    );

  const selectedImageObj = images.find((i) => i.id === selectedImage);
  const selectedDCObj = datacenters.find((d) => d.id === selectedDC);

  return (
    <div ref={pageRef} className="min-h-screen ">


      <div className="max-w-6xl mx-auto px-6 pt-8 pb-24">
        {/* Back */}
        <Link
          href="/hosting/vps"
          className="config-section inline-flex items-center gap-2 text-sm  hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Plans
        </Link>

        {/* Page title */}
        <div className="config-section mb-10">
          <h1 className="text-3xl font-bold tracking-tight">
            Configure{" "}
            <span className="">{plan.name}</span>
          </h1>
          <p className=" text-sm mt-1">
            Customize your server and deploy instantly.
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
                placeholder="e.g. web-production-01"
                className="  rounded-xl  text-sm"
              />
              <p className="text-xs mt-2">
                Lowercase letters, numbers, and hyphens only.
              </p>
            </Section>

            {/* OS Image */}
            <Section icon={Monitor} title="Operating System">
              {/* OS flavor tabs */}
              <div className="flex gap-1 mb-4 flex-wrap">
                {osFlavors.map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilterOS(f)}
                    className={`px-2.5 py-1 rounded-md text-xs capitalize transition-all
                      ${filterOS === f
                        ? "bg-secondary text-primary-foreground font-semibold"
                        : "bg-muted/20 hover:text-white"
                      }`}
                  >
                    <div className="flex items-center gap-1">
                      {f !== "all" && (
                        <Image
                          src={osIcon(f)}
                          alt={f}
                          width={16}
                          height={16}
                          className="object-contain"
                        />
                      )}
                      <span>{f === "all" ? "All" : f}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2  overflow-y-auto pr-1 ">
                {filteredImages.map((img) => (
                  <SelectCard
                    key={img.id}
                    selected={selectedImage === img.id}
                    onClick={() => setSelectedImage(img.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src={osIcon(img?.osFlavor)}
                        alt={img.osFlavor}
                        width={20}
                        height={20}
                        className="object-contain"
                      />
                      <div>
                        <p className="text-sm font-medium ">
                          {img.description}
                        </p>
                        <p className="text-[11px] ">
                          {img.name}
                        </p>
                      </div>
                    </div>
                  </SelectCard>
                ))}
              </div>
            </Section>

            {/* Datacenter */}
            <Section icon={MapPin} title="Datacenter Location">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {datacenters.map((dc) => (
                  <SelectCard
                    key={dc.id}
                    selected={selectedDC === dc.id}
                    onClick={() => setSelectedDC(dc.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-base">
                        {dc.country === "DE"
                          ? "🇩🇪"
                          : dc.country === "FI"
                            ? "🇫🇮"
                            : dc.country === "US"
                              ? "🇺🇸"
                              : dc.country === "SG"
                                ? "🇸🇬"
                                : "🌍"}
                      </span>
                      <div>
                        <p className="text-sm font-medium ">
                          {dc.location}
                        </p>
                        <p className="text-[11px] ">
                          {dc.name} · {dc.networkZone}
                        </p>
                      </div>
                    </div>
                  </SelectCard>
                ))}
              </div>
            </Section>

            {/* SSH Keys */}
            <Section icon={Key} title="SSH Keys">
              {sshKeys.length === 0 ? (
                <p className="text-sm rounded-xl p-4 text-center">
                  No SSH keys found in your Hetzner account.{" "}
                  <a
                    href="https://console.hetzner.cloud"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#7aa2f7] hover:underline"
                  >
                    Add one in Hetzner Console →
                  </a>
                </p>
              ) : (
                <div className="flex flex-col gap-2">
                  {sshKeys.map((key) => (
                    <SelectCard
                      key={key.id}
                      selected={selectedSSHKeys.includes(key.id)}
                      onClick={() => toggleSSHKey(key.id)}
                    >
                      <div className="flex items-center gap-2">
                        <Key className="w-3.5 h-3.5  flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium ">
                            {key.name}
                          </p>
                          <p className="text-[11px]  font-mono truncate max-w-[260px]">
                            {key.fingerprint}
                          </p>
                        </div>
                      </div>
                    </SelectCard>
                  ))}
                  <p className="text-xs  mt-1">
                    Select all SSH keys you want to inject. Multiple keys
                    supported.
                  </p>
                </div>
              )}
            </Section>
          </div>

          {/* ── Right: Order Summary ── */}
          <div className="config-section lg:sticky lg:top-24">
            <div className="rounded-2xl border border-white/10 bg-card overflow-hidden">
              <div className="  px-5 py-4">
                <h3 className="text-md font-semibold  uppercase tracking-wider">
                  Order Summary
                </h3>
              </div>

              <div className="p-5 flex flex-col gap-4">
                {/* Plan details */}
                <div>
                  <p className="text-xs  mb-2">Selected Plan</p>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="font-bold  font-mono">
                      {plan.name}
                    </span>
                    <span
                      className={`text-[10px] px-1.5 py-0.5 rounded font-semibold uppercase
                      ${plan.cpuType === "dedicated"
                          ? "bg-amber-400/10 text-amber-400"
                          : "bg-sky-400/10 text-sky-400"
                        }`}
                    >
                      {plan.cpuType}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-y-2 text-xs">
                    {[
                      ["vCPU", `${plan.cores} Cores`],
                      ["RAM", `${plan.memory} GB`],
                      ["Disk", `${plan.disk} GB NVMe`],
                      ["Traffic", plan.includedTraffic],
                    ].map(([label, val]) => (
                      <div key={label}>
                        <p className="">{label}</p>
                        <p className=" font-medium">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="h-px bg-muted/20" />

                {/* Config summary */}
                <div className="flex flex-col gap-2 text-xs">
                  <SummaryRow
                    label="OS"
                    value={
                      selectedImageObj ? (
                        <div className="flex items-center gap-2">
                          <Image
                            src={osIcon(selectedImageObj.osFlavor)}
                            alt={selectedImageObj.osFlavor}
                            width={20}
                            height={20}
                            className="object-contain"
                          />
                          <span>{selectedImageObj.description}</span>
                        </div>
                      ) : (
                        "Not selected"
                      )
                    }
                  />
                  <SummaryRow
                    label="Location"
                    value={
                      selectedDCObj
                        ? `${selectedDCObj.location} (${selectedDCObj.name})`
                        : "Not selected"
                    }
                  />
                  <SummaryRow
                    label="SSH Keys"
                    value={
                      selectedSSHKeys.length > 0
                        ? `${selectedSSHKeys.length} key${selectedSSHKeys.length > 1 ? "s" : ""}`
                        : "None (password auth)"
                    }
                  />
                  <SummaryRow
                    label="Server Name"
                    value={serverName || "Auto-generated"}
                  />
                </div>

                <div className="h-px bg-muted/20" />

                {/* Price */}
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <span className="text-xs ">Monthly Total</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold  font-mono">
                        {fmt(plan.monthlyPrice)}
                      </span>
                      <span className="text-xs ">/mo</span>
                    </div>
                  </div>
                  <p className="text-[10px] ">
                    Billed monthly. Cancel any time.
                  </p>
                </div>

                {orderStatus && !orderStatus.success && (
                  <p className="text-xs text-red-400 text-center">{orderStatus.message}</p>
                )}
                <Button
                  className="w-full bg-secondary cursor-pointer font-bold
                             rounded-xl py-5 transition-all duration-200 text-sm"
                  disabled={!selectedImage || !selectedDC || isOrdering}
                  onClick={handleOrder}
                >
                  {isOrdering ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Placing Order…
                    </span>
                  ) : "Place Order"}
                </Button>

                <p className="text-[10px] text-center">
                  Hetzner infra · Managed by Momtaz Host
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ label, value }: { label: string; value: string | React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-2">
      <span className=" flex-shrink-0">{label}</span>
      <span className=" text-right leading-relaxed">{value}</span>
    </div>
  );
}