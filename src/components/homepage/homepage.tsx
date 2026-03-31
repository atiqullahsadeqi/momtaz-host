"use client";
import React from "react";
import {
  HeroSection,
  CompanyLogos,
  DomainSearchSection,
  ServicesSection,
  PricingSection,
  WhyChooseUs,
  GoogleWorkspace,
  BlogsSection,
  EnhancedCta,
} from "./index";
import { getBlogPosts } from "@/lib/blog-data";

export default function Homepage() {
  const blogPosts = getBlogPosts();
  const posts = blogPosts.map((post) => ({
    id: post.id,
    title: post.title,
    summary: post.summary,
    label: post.category,
    author: post.author,
    published: post.published,
    url: `/blogs/${post.slug}`,
    image: post.image,
  }));

  return (
    <div className="min-h-screen bg-background relative selection:bg-brand-blue/20 ">
      <HeroSection />
      <div className="relative z-10 max-w-[1100px] mx-auto border-x border-border/60 min-h-[calc(100vh-4rem)] flex flex-col bg-background">
        <CompanyLogos />
        <DomainSearchSection />
        <ServicesSection />
        <PricingSection />
        <WhyChooseUs />
        <GoogleWorkspace />
        <BlogsSection
          tagline="Latest Updates"
          heading="Blog Posts"
          description="Discover the latest trends, tips, and best practices in modern web development. From UI components to design systems, stay updated with our expert insights."
          buttonText="View all articles"
          buttonUrl="/blogs"
          className=""
          posts={posts}
        />
        {/* <EnhancedCta /> */}
      </div>
    </div>
  );
}
