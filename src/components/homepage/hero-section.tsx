"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { toast } from "sonner";
import SplitText from "@/components/SplitText";
import FadeContent from "@/components/FadeContent";

export default function HeroSection() {
  const handlePrimaryClick = () => {
    toast("Getting started!", {
      description: "Redirecting to hosting plans...",
    });
  };

  return (
    <section className="py-20 lg:py-15">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-8">
          {/* Main Heading */}
          {/* Badge */}
          <Badge className="   px-4 py-2 rounded-full">
            PROFESSIONAL HOSTING SOLUTIONS
          </Badge>
          <div>
            <SplitText
              text="Build. Host. Grow."
              className="text-4xl lg:text-6xl  leading-tight font-bold"
              delay={50}
              duration={2}
              ease="elastic.out(1, 0.3)"
              splitType="chars"
              from={{ opacity: 0, y: 40 }}
              to={{ opacity: 1, y: 0 }}
              threshold={0.1}
              rootMargin="-100px"
              textAlign="center"
            />
          </div>
          <FadeContent
            blur={true}
            duration={600}
            easing="ease-in-out"
            initialOpacity={0}
          >
            {/* Description */}
            <p className=" text-muted-foreground max-w-3xl mx-auto">
              Keep your website running smoothly with reliable hosting
              solutions. Manage <br /> domains, hosting, and applications in one
              place, fast & affordably.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-5 justify-center">
              <Button
                variant="default"
                size="lg"
                className="cursor-pointer px-8 py-3"
                onClick={handlePrimaryClick}
              >
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="cursor-pointer px-8 py-3"
                onClick={() => {
                  document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                View Pricing
              </Button>
            </div>

            {/* Hero Image */}
            <div className="relative flex items-center justify-center mt-12">
              <Image
                src="/images/Hero-Image.png"
                alt="Hero Image"
                width={800}
                height={400}
                className="rounded-2xl"
                priority
              />
            </div>
          </FadeContent>
        </div>
      </div>
    </section>
  );
}
