import React from "react";
import {
  HeroSection,
  CompanyLogos,
  DomainSearch,
  ServicesSection,
  PricingSection,
  WhyChooseUs,
  GoogleWorkspace,
  Testimonials,
  EnhancedCta,
} from "./index";

interface HomepageProps {
  data: {
    heroSection: any;
    companyLogos: any;
    domainSearch: any;
    servicesSection: any;
    pricingSection: any;
    whyChooseUs: any;
    googleWorkspace: any;
    testimonials: any;
    enhancedCta: any;
  };
}

export default function Homepage({ data }: HomepageProps) {
  return (
    <div className="min-h-screen">
      <HeroSection {...data.heroSection} />
      <CompanyLogos {...data.companyLogos} />
      <DomainSearch {...data.domainSearch} />
      <ServicesSection {...data.servicesSection} />
      <PricingSection {...data.pricingSection} />
      <WhyChooseUs {...data.whyChooseUs} />
      <GoogleWorkspace {...data.googleWorkspace} />
      <Testimonials {...data.testimonials} />
      <EnhancedCta {...data.enhancedCta} />
    </div>
  );
}

