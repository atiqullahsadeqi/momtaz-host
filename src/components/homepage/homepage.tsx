"use client";
import React from "react";
import {
  HeroSection,
  CompanyLogos,
  DomainSearch,
  ServicesSection,
  PricingSection,
  WhyChooseUs,
  GoogleWorkspace,
  BlogsSection,
  EnhancedCta,
} from "./index";

export default function Homepage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CompanyLogos />
      <DomainSearch />
      <ServicesSection />
      <PricingSection />
      <WhyChooseUs />
      <GoogleWorkspace />
      <BlogsSection />
      <EnhancedCta />
    </div>
  );
}

