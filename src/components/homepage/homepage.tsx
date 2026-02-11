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
    const posts = [
    {
      id: "post-1",
      title: "Getting Started with shadcn/ui Components ",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects. We'll cover installation, theming, and best practices for building modern interfaces.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-2",
      title: "Building Accessible Web Applications",
      summary:
        "Explore how to create inclusive web experiences using shadcn/ui's accessible components. Discover practical tips for implementing ARIA labels, keyboard navigation, and semantic HTML.",
      label: "Accessibility",
      author: "Marcus Rodriguez",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
    {
      id: "post-3",
      title: "Modern Design Systems with Tailwind CSS",
      summary:
        "Dive into creating scalable design systems using Tailwind CSS and shadcn/ui. Learn how to maintain consistency while building flexible and maintainable component libraries.",
      label: "Design Systems",
      author: "Emma Thompson",
      published: "1 Jan 2024",
      url: "https://shadcnblocks.com",
      image: "https://deifkwefumgah.cloudfront.net/shadcnblocks/block/placeholder-dark-1.svg",
    },
  ]
  return (
    <div className="min-h-screen">
      <HeroSection />
      <CompanyLogos />
      <DomainSearch />
      <ServicesSection />
      <PricingSection />
      <WhyChooseUs />
      <GoogleWorkspace />
      <BlogsSection tagline="Latest Updates" heading="Blog Posts" description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights." buttonText="View all articles" buttonUrl="https://momtaz.ws/" className="" posts={posts}  />
      <EnhancedCta />
    </div>
  );
}

