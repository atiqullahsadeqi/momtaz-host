"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Check, ArrowRight } from "lucide-react";

type TabType = 'shared' | 'vps' | 'dedicated';

interface Plan {
  name: string;
  displayName: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

export default function PricingSection() {
  const [activeTab, setActiveTab] = useState<TabType>('shared');
  const [sharedPlans, setSharedPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        const response = await fetch('/api/hosting/packages');
        const data = await response.json();
        if (data.success) {
          setSharedPlans(data.data.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching plans:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const fallbackSharedPlans = [
    {
      name: "Starter Plan",
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

  const vpsPlans = [
    {
      name: "VPS Basic",
      displayName: "VPS Basic",
      price: 19.99,
      features: [
        "2 CPU Cores",
        "4GB RAM",
        "80GB SSD Storage",
        "2TB Bandwidth",
        "Full Root Access",
        "Free SSL Certificate",
        "1 Dedicated IP",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "VPS Pro",
      displayName: "VPS Pro",
      price: 39.99,
      features: [
        "4 CPU Cores",
        "8GB RAM",
        "160GB SSD Storage",
        "4TB Bandwidth",
        "Full Root Access",
        "Free SSL Certificate",
        "2 Dedicated IPs",
        "Priority Support",
      ],
      isPopular: true,
    },
    {
      name: "VPS Enterprise",
      displayName: "VPS Enterprise",
      price: 79.99,
      features: [
        "8 CPU Cores",
        "16GB RAM",
        "320GB SSD Storage",
        "8TB Bandwidth",
        "Full Root Access",
        "Free SSL Certificate",
        "4 Dedicated IPs",
        "24/7 Priority Support",
      ],
      isPopular: false,
    }
  ];

  const dedicatedPlans = [
    {
      name: "Dedicated Starter",
      displayName: "Dedicated Starter",
      price: 149.99,
      features: [
        "Intel Xeon E3-1230",
        "16GB DDR4 RAM",
        "1TB SSD Storage",
        "10TB Bandwidth",
        "Full Root Access",
        "5 Dedicated IPs",
        "Free SSL Certificate",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "Dedicated Pro",
      displayName: "Dedicated Pro",
      price: 249.99,
      features: [
        "Intel Xeon E5-2670",
        "32GB DDR4 RAM",
        "2TB SSD Storage",
        "20TB Bandwidth",
        "Full Root Access",
        "10 Dedicated IPs",
        "Free SSL Certificate",
        "24/7 Priority Support",
      ],
      isPopular: true,
    },
    {
      name: "Dedicated Enterprise",
      displayName: "Dedicated Enterprise",
      price: 399.99,
      features: [
        "Dual Intel Xeon E5-2690",
        "64GB DDR4 RAM",
        "4TB SSD Storage",
        "Unlimited Bandwidth",
        "Full Root Access",
        "20 Dedicated IPs",
        "Free SSL Certificate",
        "24/7 Premium Support",
      ],
      isPopular: false,
    }
  ];

  const getCurrentPlans = () => {
    switch (activeTab) {
      case 'shared':
        return isLoading || sharedPlans.length === 0 ? fallbackSharedPlans : sharedPlans;
      case 'vps':
        return vpsPlans;
      case 'dedicated':
        return dedicatedPlans;
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

              {isLoading && activeTab === 'shared' ? (
                <div className="flex-1 flex items-center justify-center py-12">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <div className="flex-1 flex flex-col">
                  {/* Divider */}
                  {/* Vercel uses a subtle text to head the features */}
                  <div className="text-sm font-medium text-foreground mb-4">
                    {index === 0 ? "Includes:" : index === 1 ? `All ${currentPlans[0].name.split(' ')[0]} features, plus:` : `All ${currentPlans[1].name.split(' ')[0]} features, plus:`}
                  </div>
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-start text-sm gap-3 text-muted-foreground">
                        <Check className={`w-4 h-4 shrink-0 mt-0.5 ${plan.isPopular ? 'text-brand-blue' : 'text-foreground/40'}`} strokeWidth={2.5} />
                        <span className="leading-snug">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Button */}
              <div className="mt-auto pt-4">
                <Button
                  className={`w-full flex items-center justify-center px-6 py-6 rounded-full font-semibold transition-all cursor-pointer ${plan.isPopular
                    ? "bg-brand-green text-white hover:bg-brand-green/90 border-transparent shadow-md shadow-brand-green/20"
                    : "bg-transparent text-foreground border border-border hover:bg-muted/30"
                    }`}
                  variant={plan.isPopular || index === 2 ? "default" : "outline"}
                >
                  Order Now
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
