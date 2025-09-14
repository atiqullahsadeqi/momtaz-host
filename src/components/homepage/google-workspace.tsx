import React from "react";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

interface FeatureItem {
  text: string;
  icon?: string;
}

interface GoogleWorkspaceProps {
  heading: string;
  description: string;
  image: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  features: FeatureItem[];
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
}

export default function GoogleWorkspace({
  heading,
  description,
  image,
  features,
  primaryCta,
  secondaryCta,
}: GoogleWorkspaceProps) {
  const handlePrimaryClick = () => {
    if (primaryCta.onClick) {
      // Handle custom onClick logic here
      console.log("Primary CTA clicked");
    }
  };

  return (
    <section className="py-20 bg-muted/50 dark:bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Hero Image */}
          <div className="relative flex items-center justify-center">
            <Image
              src={image.url}
              alt={image.alt || "Google Workspace Image"}
              width={image.width}
              height={image.height}
              className="rounded-2xl shadow-xl"
              priority
            />
          </div>
          {/* Right Side */}
          <div className="space-y-8">
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              {heading.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < heading.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>
            <p className="text-lg text-muted-foreground max-w-lg">
              {description}
            </p>
            <ul className="space-y-3">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-foreground">{feature.text}</span>
                </li>
              ))}
            </ul>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
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
              <Button
                variant={secondaryCta.variant || "ghost"}
                size={secondaryCta.size || "lg"}
                className="text-foreground"
                asChild={!!secondaryCta.href}
              >
                {secondaryCta.href ? (
                  <Link href={secondaryCta.href}>
                    {secondaryCta.text}
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </Link>
                ) : (
                  secondaryCta.text
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

