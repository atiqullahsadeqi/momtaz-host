"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, Loader2 } from "lucide-react";

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
      isPopular: true,
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
      isPopular: true,
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
      isPopular: false,
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

  return (
    <section id="pricing" className="py-10">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-10">
          <h2 className="text-2xl lg:text-4xl font-bold mb-4">
            Choose Your Perfect Hosting Plan.
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
            From shared hosting to powerful VPS solutions, we have the perfect
            plan for your needs.
          </p>

          {/* Hosting Type Tabs */}
          <div className="flex items-center justify-center space-x-2 mb-8 border border-primary rounded-full px-4 py-2 w-fit mx-auto">
            <button
              onClick={() => setActiveTab('shared')}
              className={`cursor-pointer px-4 py-1 md:px-6 md:py-2 rounded-full text-sm font-medium transition-all ${
                activeTab === 'shared'
                  ? "bg-primary text-white"
                  : "bg-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              Linux Shared
            </button>
            <button
              onClick={() => setActiveTab('vps')}
              className={`cursor-pointer px-4 py-1 md:px-6 md:py-2  rounded-full text-sm font-medium transition-all ${
                activeTab === 'vps'
                  ? "bg-primary text-white"
                  : "bg-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              Linux VPS
            </button>
            <button
              onClick={() => setActiveTab('dedicated')}
              className={`cursor-pointer px-4 py-1 md:px-6 md:py-2  rounded-full text-sm font-medium transition-all ${
                activeTab === 'dedicated'
                  ? "bg-primary text-white"
                  : "bg-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              Dedicated
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="max-w-full md:max-w-5xl mx-auto px-8 md:px-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getCurrentPlans().map((plan, index) => (
            <Card
              key={index}
              className={`${
                plan.isPopular
                  ? "border-2 border-primary relative"
                  : "border border-primary/20"
              } transition-all duration-300 shadow-none`}
            >
              {plan.isPopular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                    Most Popular
                  </span>
                </div>
              )}
              <CardContent className="p-6 h-full">
                <div className="text-center flex flex-col gap-6 justify-between h-full">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {plan.displayName || plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">
                        ${plan.price.toFixed(2)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                    </div>
                  </div>
                  {isLoading && activeTab === 'shared' ? (
                    <div className="flex items-center justify-center py-8">
                      <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    </div>
                  ) : (
                    <ul className="space-y-3 text-left">
                      {plan.features.map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-center text-sm gap-2"
                        >
                          <CircleCheckBig size={18} />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  )}
                  <Button
                    className="cursor-pointer w-full"
                    variant={plan.isPopular ? "default" : "outline"}
                    size="default"
                  >
                    Get Started
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
}
