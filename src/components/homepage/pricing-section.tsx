"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig, Server, Monitor, FileText } from "lucide-react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Starter Web",
      monthlyPrice: 4.99,
      annualDiscount: 20, // 20% discount
      storage: "10GB SSD",
      features: [
        "10GB SSD Storage",
        "100GB Bandwidth",
        "1 Website",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Email Accounts (5)",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "Business Pro",
      monthlyPrice: 9.99,
      annualDiscount: 25, // 25% discount
      storage: "50GB SSD",
      features: [
        "50GB SSD Storage",
        "500GB Bandwidth",
        "5 Websites",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Unlimited Email Accounts",
        "Free Domain (1 Year)",
        "24/7 Priority Support",
      ],
      isPopular: true,
    },
    {
      name: "Enterprise Plus",
      monthlyPrice: 19.99,
      annualDiscount: 30, // 30% discount
      storage: "100GB SSD",
      features: [
        "100GB SSD Storage",
        "Unlimited Bandwidth",
        "Unlimited Websites",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Unlimited Email Accounts",
        "Free Domain (1 Year)",
        "Daily Backups",
        "24/7 Priority Support",
      ],
      isPopular: false,
    },
    {
      name: "Ultimate Scale",
      monthlyPrice: 39.99,
      annualDiscount: 35, // 35% discount
      storage: "200GB SSD",
      features: [
        "200GB SSD Storage",
        "Unlimited Bandwidth",
        "Unlimited Websites",
        "Free SSL Certificate",
        "cPanel Control Panel",
        "Unlimited Email Accounts",
        "Free Domain (1 Year)",
        "Daily Backups",
        "Performance Optimization",
        "Dedicated IP",
        "24/7 VIP Support",
      ],
      isPopular: false,
    },
  ];

  const getPrice = (plan: typeof plans[0]) => {
    if (isAnnual) {
      const discountedPrice = plan.monthlyPrice * (1 - plan.annualDiscount / 100);
      return discountedPrice.toFixed(2);
    }
    return plan.monthlyPrice.toFixed(2);
  };

  const getSavings = (plan: typeof plans[0]) => {
    if (isAnnual) {
      return `Save ${plan.annualDiscount}%`;
    }
    return null;
  };

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Choose Your Perfect Hosting Plan.
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto mb-8">
            From shared hosting to powerful VPS solutions, we have the perfect
            plan for your needs.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8 border border-primary rounded-full px-4 py-2 w-fit mx-auto">
            <button
              onClick={() => setIsAnnual(false)}
              className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-primary text-white"
                  : "bg-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`cursor-pointer px-6 py-2 rounded-full text-sm font-medium transition-all ${
                isAnnual
                  ? "bg-primary text-white"
                  : "bg-transparent text-muted-foreground hover:text-primary"
              }`}
            >
              Annually
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan, index) => (
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
                      {plan.name}
                    </h3>
                    <div className="mb-4">
                      <span className="text-3xl font-bold text-foreground">
                        ${getPrice(plan)}
                      </span>
                      <span className="text-muted-foreground">/month</span>
                      {isAnnual && (
                        <div className="text-xs text-green-600 font-medium mt-1">
                          {getSavings(plan)}
                        </div>
                      )}
                    </div>
                    {!isAnnual && (
                      <div className="text-xs text-muted-foreground mb-2">
                        Save up to {plan.annualDiscount}% with annual billing
                      </div>
                    )}
                  </div>
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

        {/* Additional Hosting Options */}
        <div className="mt-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-2">Need Something More Powerful?</h3>
            <p className="text-muted-foreground">We&apos;ve got you covered with specialized hosting solutions</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* VPS Hosting */}
            <Card className="border border-primary/20 hover:border-primary/40 transition-colors shadow-none">
              <CardContent className="p-6">
                <div className="text-left">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Server className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">VPS Hosting</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Need dedicated resources? Our VPS servers give you full control with guaranteed performance and scalability.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/hosting/vps">Explore VPS Plans</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Windows Hosting */}
            <Card className="border border-primary/20 hover:border-primary/40 transition-colors shadow-none">
              <CardContent className="p-6">
                <div className="text-left">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Monitor className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">Windows Hosting</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Running ASP.NET or need Windows-specific features? Our Windows servers are optimized for Microsoft technologies.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/hosting/windows">View Windows Plans</a>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* WordPress Hosting */}
            <Card className="border border-primary/20 hover:border-primary/40 transition-colors shadow-none">
              <CardContent className="p-6">
                <div className="text-left">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <h4 className="text-lg font-bold mb-2">WordPress Hosting</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimized specifically for WordPress with automatic updates, enhanced security, and lightning-fast performance.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/hosting/wordpress">WordPress Plans</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="text-center">
                  <div className="h-12 w-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                    <div className="text-primary text-lg">📝</div>
                  </div>
                  <h4 className="text-lg font-bold mb-2">WordPress Hosting</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Optimized specifically for WordPress with automatic updates, enhanced security, and lightning-fast performance.
                  </p>
                  <Button className="w-full" asChild>
                    <a href="/hosting/wordpress">WordPress Plans</a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
