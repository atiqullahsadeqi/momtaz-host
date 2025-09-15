import React from "react";
import { Button } from "@/components/ui/button";
import { Settings2, Fingerprint, Headset } from "lucide-react";
import Link from "next/link";

interface TrustIndicator {
  title: string;
  description: string;
  icon: string;
}

interface EnhancedCtaProps {
  heading: string;
  description: string;
  primaryCta: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "default" | "lg";
    href?: string;
    onClick?: string;
  };
  secondaryCta: {
    text: string;
    variant?: "default" | "secondary" | "outline" | "ghost";
    size?: "sm" | "default" | "lg";
    href?: string;
    onClick?: string;
  };
  trustIndicators: TrustIndicator[];
  finalCta?: {
    heading: string;
    description: string;
    primaryCta: {
      text: string;
      variant?: "default" | "secondary" | "outline" | "ghost";
      size?: "sm" | "default" | "lg";
      href?: string;
    };
    secondaryCta: {
      text: string;
      variant?: "default" | "secondary" | "outline" | "ghost";
      size?: "sm" | "default" | "lg";
      href?: string;
    };
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Settings2,
  Fingerprint,
  Headset,
};

export default function EnhancedCta({
  heading,
  description,
  primaryCta,
  secondaryCta,
  trustIndicators,
  finalCta,
}: EnhancedCtaProps) {
  const handlePrimaryClick = () => {
    if (primaryCta.onClick) {
      console.log("Primary CTA clicked");
    }
  };

  // Debug logging
  console.log("EnhancedCta - finalCta:", finalCta);
  console.log("EnhancedCta - finalCta.primaryCta:", finalCta?.primaryCta);
  console.log("EnhancedCta - finalCta.secondaryCta:", finalCta?.secondaryCta);

  return (
    <>
      {/* Enhanced CTAs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              {heading}
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              {description}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              {primaryCta && (
                <Button
                  size={primaryCta.size || "lg"}
                  variant={primaryCta.variant || "default"}
                  className="px-8"
                  onClick={handlePrimaryClick}
                  asChild={!!primaryCta.href}
                >
                  {primaryCta.href ? (
                    <Link href={primaryCta.href}>{primaryCta.text}</Link>
                  ) : (
                    primaryCta.text
                  )}
                </Button>
              )}
              {secondaryCta && (
                <Button
                  variant={secondaryCta.variant || "ghost"}
                  size={secondaryCta.size || "lg"}
                  className="text-foreground"
                  asChild={!!secondaryCta.href}
                >
                  {secondaryCta.href ? (
                    <Link href={secondaryCta.href}>{secondaryCta.text}</Link>
                  ) : (
                    secondaryCta.text
                  )}
                </Button>
              )}
            </div>

            {/* Trust Indicators */}
            {trustIndicators && trustIndicators.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                {trustIndicators.map((indicator, index) => {
                  const IconComponent = iconMap[indicator.icon] || Settings2;
                  
                  return (
                    <div key={index} className="text-center">
                      <div className="w-16 h-16 bg-muted/50 dark:bg-input/50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">{indicator.title}</h3>
                      <p className="text-muted-foreground">{indicator.description}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      {finalCta ? (
        <section className="py-16 bg-muted/50 ">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              {finalCta.heading}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {finalCta.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
             
                <Button
                  size={finalCta.primaryCta.size || "lg"}
                  variant={finalCta.primaryCta.variant || "default"}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
                  asChild={!!finalCta.primaryCta.href}
                >
                  {finalCta.primaryCta.href ? (
                    <Link href={finalCta.primaryCta.href}>{finalCta.primaryCta.text}</Link>
                  ) : (
                    finalCta.primaryCta.text
                  )}
                </Button>
          
             
                <Button
                  variant={finalCta.secondaryCta.variant || "outline"}
                  size={finalCta.secondaryCta.size || "lg"}
                  asChild={!!finalCta.secondaryCta.href}
                >
                  {finalCta.secondaryCta.href ? (
                    <Link href={finalCta.secondaryCta.href}>{finalCta.secondaryCta.text}</Link>
                  ) : (
                    finalCta.secondaryCta.text
                  )}
                </Button>
              
            </div>
          </div>
        </section>
      ) : (
        <section className="py-16 bg-muted/50 dark:bg-background">
          <div className="container mx-auto px-4 text-center">
            <div className="text-sm text-muted-foreground">Final CTA section missing data</div>
          </div>
        </section>
      )}
    </>
  );
}

