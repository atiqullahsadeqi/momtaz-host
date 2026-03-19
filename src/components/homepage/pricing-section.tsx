"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ArrowRight } from "lucide-react";
import { vpsDisplayName, dedicatedDisplayName } from "@/lib/plan-names";
import Link from "next/link";

type TabType = 'shared' | 'vps' | 'dedicated';

interface Plan {
  name: string;
  slug: string;
  displayName: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabType>('shared');
  const [sharedPlans, setSharedPlans] = useState<Plan[]>([]);
  const [loadingShared, setLoadingShared] = useState(true);
  const [loadingVps, setLoadingVps] = useState(true);
  const [loadingDedicated, setLoadingDedicated] = useState(true);

  useEffect(() => {
    fetch("/api/hosting/packages")
      .then(r => r.json())
      .then(data => { if (data.success) setSharedPlans(data.data.slice(0, 3).map((p: any) => ({ ...p, slug: p.name }))); })
      .catch(() => {})
      .finally(() => setLoadingShared(false));

    fetch("/api/hetzner/server-types")
      .then(r => r.json())
      .then(data => {
        if (data.plans?.length) {
          setVpsPlans(data.plans.slice(0, 3).map((p: any, i: number) => ({
            name: p.name, slug: p.slug, displayName: vpsDisplayName(p.cores, p.memory), price: p.monthlyPrice, isPopular: i === 1,
            features: [`${p.cores} vCPU Cores`, `${p.memory} GB RAM`, `${p.disk} GB NVMe`, `${p.includedTraffic || "20 TB"} Traffic`, "Full Root Access", "Free SSL Certificate", "24/7 Support"],
          })));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingVps(false));

    fetch("/api/hetzner/dedicated-servers")
      .then(r => r.json())
      .then(data => {
        if (data.plans?.length) {
          setDedicatedPlans(data.plans.slice(0, 3).map((p: any, i: number) => {
            const ramNum = parseInt(p.ram) || 0;
            const storageShort = (p.storage || "").replace(/\s*(Datacenter|Edition|Software|Gen\s*\d|RAID|\(|,).*/gi, "").trim();
            return {
              name: p.name, slug: p.slug, displayName: dedicatedDisplayName(p.cpu, ramNum), price: p.monthlyPrice, isPopular: i === 1,
              features: [p.cpu, p.ram, storageShort || "NVMe Storage", p.traffic || "Unlimited Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"],
            };
          }));
        }
      })
      .catch(() => {})
      .finally(() => setLoadingDedicated(false));
  }, []);

  const fallbackSharedPlans = [
    {
      name: "Starter Plan",
      slug: "Starter Plan",
      displayName: "Starter Plan",
      price: 2.29,
      features: [
        "15GB SSD Storage",
        "100GB Bandwidth",
        "1 Website",
        "2 Databases",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Email Accounts (5)",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "Business Plan",
      slug: "Business Plan",
      displayName: "Business Plan",
      price: 6.89,
      features: [
        "100GB SSD Storage",
        "500GB Bandwidth",
        "5 Websites",
        "10 Databases",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Email Accounts (10)",
        "24/7 Support",
      ],
      isPopular: true,
    },
    {
      name: "Ultimate Plan",
      slug: "Ultimate Plan",
      displayName: "Ultimate Plan",
      price: 8.59,
      features: [
        "Unlimited SSD Storage",
        "Unlimited Bandwidth",
        "10 Websites",
        "20 Databases",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Unlimited Email Accounts",
        "Daily Backups",
        "24/7 Support",
      ],
      isPopular: false,
    }
  ];

  const [vpsPlans, setVpsPlans] = useState<Plan[]>([]);
  const fallbackVpsPlans: Plan[] = [
    { name: "cx22", slug: "cx22", displayName: "VPS 2C-4G", price: 4.82, features: ["2 vCPU Cores", "4 GB RAM", "40 GB NVMe", "20 TB Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: false },
    { name: "cx32", slug: "cx32", displayName: "VPS 4C-8G", price: 8.39, features: ["4 vCPU Cores", "8 GB RAM", "80 GB NVMe", "20 TB Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: true },
    { name: "cx42", slug: "cx42", displayName: "VPS 8C-16G", price: 16.13, features: ["8 vCPU Cores", "16 GB RAM", "160 GB NVMe", "20 TB Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: false },
  ];



  const [dedicatedPlans, setDedicatedPlans] = useState<Plan[]>([]);
  const fallbackDedicatedPlans: Plan[] = [
    { name: "ax42", slug: "ax42", displayName: "Server R5-64G", price: 55.34, features: ["AMD Ryzen 5 3600", "64 GB DDR4", "2× 512 GB NVMe", "Unlimited Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: false },
    { name: "ax52", slug: "ax52", displayName: "Server R7-64G", price: 79.34, features: ["AMD Ryzen 7 3700X", "64 GB DDR4", "2× 1 TB NVMe", "Unlimited Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: true },
    { name: "ax102", slug: "ax102", displayName: "Server R9-128G", price: 138.58, features: ["AMD Ryzen 9 5950X", "128 GB DDR4", "2× 1.92 TB NVMe", "Unlimited Traffic", "Full Root Access", "Free SSL Certificate", "24/7 Support"], isPopular: false },
  ];



  const isCurrentTabLoading = activeTab === "shared" ? loadingShared : activeTab === "vps" ? loadingVps : loadingDedicated;

  const getCurrentPlans = () => {
    switch (activeTab) {
      case 'shared':
        return sharedPlans.length > 0 ? sharedPlans : fallbackSharedPlans;
      case 'vps':
        return vpsPlans.length > 0 ? vpsPlans : fallbackVpsPlans;
      case 'dedicated':
        return dedicatedPlans.length > 0 ? dedicatedPlans : fallbackDedicatedPlans;
    }
  };

  const getPlanDescription = (index: number) => {
    if (index === 0) return "The perfect starting place for your web app or personal project.";
    if (index === 1) return "Everything you need to build and scale your app.";
    if (index === 2) return "Critical security, performance, observability, platform SLAs, and support.";
    return "Scalable hosting solution.";
  };

  const currentPlans = getCurrentPlans();

  return (
    <section id="pricing" className="w-full border-b border-border/60 bg-muted/5 relative overflow-hidden flex flex-col items-center">


      <div className="w-full max-w-[1200px] mx-auto bg-background/80 backdrop-blur-sm relative z-10 flex flex-col  shadow-sm">

        {/* Section Header */}
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center bg-background">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 text-foreground">
            Find a plan to power your apps.
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Momtaz Host supports teams of all sizes, with pricing that scales.
          </p>

          {/* Hosting Type Segmented Control */}
          <div className="flex items-center justify-center p-1 bg-muted border border-border/60 rounded-full w-fit mx-auto">
            <button
              onClick={() => setActiveTab('shared')}
              className={`cursor-pointer px-6 py-2.5 outline-none rounded-full text-sm font-semibold transition-all ${activeTab === 'shared'
                ? "bg-background shadow-sm border border-border/80 text-foreground"
                : "bg-transparent text-muted-foreground hover:text-foreground border border-transparent"
                }`}
            >
              Linux Shared
            </button>
            <button
              onClick={() => setActiveTab('vps')}
              className={`cursor-pointer px-6 py-2.5 outline-none rounded-full text-sm font-semibold transition-all ${activeTab === 'vps'
                ? "bg-background shadow-sm border border-border/80 text-foreground"
                : "bg-transparent text-muted-foreground hover:text-foreground border border-transparent"
                }`}
            >
              Linux VPS
            </button>
            <button
              onClick={() => setActiveTab('dedicated')}
              className={`cursor-pointer px-6 py-2.5 outline-none rounded-full text-sm font-semibold transition-all ${activeTab === 'dedicated'
                ? "bg-background shadow-sm border border-border/80 text-foreground"
                : "bg-transparent text-muted-foreground hover:text-foreground border border-transparent"
                }`}
            >
              Dedicated
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid */}
        {isCurrentTabLoading ? (
          <div className="flex items-center justify-center py-24 col-span-full bg-background">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {currentPlans.map((plan, index) => (
            <div
              key={index}
              className={`bg-background p-8 lg:p-12 flex flex-col relative ${plan.isPopular ? 'md:z-10' : ''}`}
            >
              {plan.isPopular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-green text-background px-4 py-1 text-xs font-bold rounded-full tracking-wide shadow-md">
                  Popular
                </div>
              )}

              <div className="mb-8">
                <h3 className="text-2xl font-bold text-foreground tracking-tight mb-3">
                  {plan.displayName || plan.name}
                </h3>
                <p className="text-muted-foreground text-sm min-h-[40px] leading-relaxed mb-4 pr-4">
                  {getPlanDescription(index)}
                </p>
                <div className="flex items-baseline gap-1 mt-2">
                  <span className="text-4xl font-bold text-foreground tracking-tight">
                    ${plan.price.toFixed(2)}
                  </span>
                  <span className="text-muted-foreground font-medium">/mo</span>
                </div>
              </div>

                <div className="flex-1 flex flex-col">

                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm gap-3 text-muted-foreground">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-brand-blue' : 'text-foreground/40'}`} strokeWidth={2.5} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

              {/* Button */}
              <div className="mt-auto pt-4">
                <Button
                  asChild
                  className={`w-full flex items-center justify-center px-6 py-6 rounded-full font-semibold transition-all cursor-pointer ${plan.isPopular
                    ? "bg-brand-green text-white hover:bg-brand-green/90 border-transparent shadow-md shadow-brand-green/20"
                    : "bg-transparent text-foreground border border-border hover:bg-muted/30"
                    }`}
                  variant={plan.isPopular || index === 2 ? "default" : "outline"}
                >
                  <Link href={activeTab === "shared" ? `/hosting/shared/order/${plan.slug}` : activeTab === "vps" ? `/hosting/vps/configure/${plan.slug}` : `/hosting/dedicated/configure/${plan.slug}`}>
                    Order Now
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
        )}

      </div>
    </section>
  );
}
