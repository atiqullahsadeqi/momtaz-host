import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface FeatureItem {
  text: string;
  icon?: string;
}

interface PricingPlan {
  name: string;
  description: string;
  price: string;
  period: string;
  features: FeatureItem[];
  isPopular?: boolean;
  badgeText?: string;
  ctaButton: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "default" | "lg";
    href?: string;
    icon?: string;
  };
}

interface PricingSectionProps {
  heading: string;
  description: string;
  plans: PricingPlan[];
  ctaText: string;
  ctaButton: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "default" | "lg";
    href?: string;
  };
}

export default function PricingSection({
  heading,
  description,
  plans,
  ctaText,
  ctaButton,
}: PricingSectionProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`bg-card border-2 ${
                plan.isPopular ? "border-primary" : "border-border"
              } rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group relative`}
            >
              {plan.isPopular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <Badge
                    variant="default"
                    className="px-4 py-1 text-sm font-medium"
                  >
                    {plan.badgeText || "Most Popular"}
                  </Badge>
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  {plan.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan.description}
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    {plan.price}
                  </span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <svg
                        className="w-5 h-5 text-green-500 mr-3"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {feature.text}
                    </li>
                  ))}
                </ul>
                <Button 
                  className="w-full" 
                  variant={plan.ctaButton.variant || "default"}
                  size={plan.ctaButton.size || "default"}
                  asChild={!!plan.ctaButton.href}
                >
                  {plan.ctaButton.href ? (
                    <Link href={plan.ctaButton.href}>{plan.ctaButton.text}</Link>
                  ) : (
                    plan.ctaButton.text
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">{ctaText}</p>
          <Button variant="outline" size="lg" asChild>
            <Link href={ctaButton.href || "/contact"}>{ctaButton.text}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

