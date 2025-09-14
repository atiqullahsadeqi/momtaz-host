"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";

interface HeroSectionProps {
  badge: string;
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
  heroImage: {
    url: string;
    alt: string;
    width: number;
    height: number;
  };
  socialProof: {
    statNumber: string;
    statLabel: string;
    avatars: Array<{
      initials: string;
      backgroundColor: "primary" | "secondary" | "accent";
    }>;
  };
}

export default function HeroSection({
  badge,
  heading,
  description,
  primaryCta,
  secondaryCta,
  heroImage,
  socialProof,
}: HeroSectionProps) {
    console.log("Hero section data:", badge);
  const handlePrimaryClick = () => {
    if (primaryCta.onClick) {
      // Handle custom onClick logic here
      toast("Event has been created", {
        description: "Sunday, December 03, 2023 at 9:00 AM",
        action: {
          label: "Undo",
          onClick: () => console.log("Undo"),
        },
      });
    }
  };

  const getAvatarClass = (bgColor: string) => {
    switch (bgColor) {
      case "primary":
        return "bg-primary text-primary-foreground";
      case "secondary":
        return "bg-secondary text-secondary-foreground";
      case "accent":
        return "bg-accent text-accent-foreground";
      default:
        return "bg-primary text-primary-foreground";
    }
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            {/* Badge */}
            <Badge variant="default" className="text-sm font-medium">
              <span className="w-2 h-2 bg-primary-foreground rounded-full mr-2"></span>
              {badge}
            </Badge>

            {/* Main Heading */}
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
              {heading.split('\n').map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < heading.split('\n').length - 1 && <br />}
                </React.Fragment>
              ))}
            </h1>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-lg">
              {description}
            </p>

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

            {/* Social Proof */}
            <div className="flex items-center space-x-4">
              <div className="flex -space-x-2">
                {socialProof.avatars.map((avatar, index) => (
                  <Avatar key={index} className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className={`text-xs font-bold ${getAvatarClass(avatar.backgroundColor)}`}>
                      {avatar.initials}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <div>
                <div className="font-semibold text-foreground">{socialProof.statNumber}</div>
                <div className="text-sm text-muted-foreground">
                  {socialProof.statLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Hero Image */}
          <div className="relative flex items-center justify-center">
            <Image
              src={heroImage.url}
              alt={heroImage.alt || "Hero Image"}
              width={heroImage.width}
              height={heroImage.height}
              className="rounded-2xl shadow-2xl"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  );
}

