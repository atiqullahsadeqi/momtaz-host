"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CircleCheckBig } from "lucide-react";

export default function PricingSection() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Shared Linux Hosting",
      price: isAnnual ? "$9.50" : "$9.50",
      period: "/month",
      features: [
        "Unlimited SSD Storage",
        "Unlimited Bandwidth",
        "Free SSL Certificate",
        "cPanel",
        "Shared Email",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "VPS Hosting",
      price: isAnnual ? "$9.29" : "$9.29",
      period: "/month",
      features: [
        "20GB SSD Storage",
        "Unlimited Bandwidth",
        "2GB RAM",
        "1 Core CPU",
        "Root Access",
        "24/7 Support",
      ],
      isPopular: true,
    },
    {
      name: "Managed VPS",
      price: isAnnual ? "$44.62" : "$44.62",
      period: "/month",
      features: [
        "80GB SSD Storage",
        "Unlimited Bandwidth",
        "4GB RAM",
        "2 Core CPU",
        "cPanel",
        "Root Access",
        "24/7 Support",
      ],
      isPopular: false,
    },
    {
      name: "Windows VPS",
      price: isAnnual ? "$18.79" : "$18.79",
      period: "/month",
      features: [
        "40GB NVMe Storage",
        "2GB RAM",
        "2 Core CPU",
        "Unlimited Site Access",
        "Windows 2019 / 2022",
        "24/7 Support",
      ],
      isPopular: false,
    },
  ];

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
                  ? "border-2 border-primary "
                  : "border border-primary/20 "
              } transition-all duration-300`}
            >
              <CardContent className="p-6 h-full">
                <div className="text-center flex flex-col gap-6 justify-between h-full ">
                  <div>
                    <h3 className="text-lg font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <div className="mb-6">
                      <span className="text-3xl font-bold text-foreground">
                        {plan.price}
                      </span>
                      <span className="text-muted-foreground">
                        {plan.period}
                      </span>
                    </div>
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
      </div>
    </section>
  );
}
