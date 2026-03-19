"use client";

import React, { useEffect, useRef, useState } from "react";
import { Search, ArrowRight, Calendar, User, Tag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { getBlogPosts, getCategories } from "@/lib/blog-data";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  const rootRef = useRef<HTMLDivElement>(null);

  const allPosts = getBlogPosts();
  const categories = getCategories();

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "All Posts" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featured = filteredPosts[0];
  const rest = filteredPosts.slice(1);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger > *", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.1,
      });
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.from(el, {
          scrollTrigger: { trigger: el, start: "top 85%" },
          y: 30, opacity: 0, duration: 0.6, ease: "power2.out",
        });
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full flex flex-col items-center">

      {/* ── HERO ── */}
      <section className="w-full bg-muted/60 pt-16 pb-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-8 hero-stagger flex flex-col items-start gap-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Blog
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Insights &amp; Ideas<br />
              <span className="text-primary">From Our Team</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Tutorials, industry insights, and updates on hosting, development, and digital growth — straight from the Momtaz team.
            </p>
          </div>

          {/* Bento hero */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden hero-stagger">
            {/* Primary card */}
            <div className="bg-primary p-10 md:col-span-2 min-h-72 flex flex-col justify-between">
              <div className="h-12 w-12 p-2 rounded-sm bg-white/10 flex items-center justify-center">
                <Search className="text-white h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                  Knowledge That<br />Powers Growth
                </h2>
                <p className="text-white/70 text-sm">
                  From choosing the right hosting to building custom software — we share what we know.
                </p>
              </div>
            </div>

            {/* Featured post image card */}
            {featured && (
              <Link href={`/blogs/${featured.slug}`} className="md:col-span-2 relative min-h-72 overflow-hidden group">
                <div
                  className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                  style={{
                    backgroundImage: `url(${featured.image})`,
                    maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  }}
                />
                <div
                  className="absolute inset-0 backdrop-blur-md bg-background/30"
                  style={{
                    maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                    WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                  }}
                />
                <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                  <span className="text-xs font-semibold text-brand-green mb-1">Featured</span>
                  <p className="text-sm font-bold text-foreground">{featured.title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{featured.published}</p>
                </div>
              </Link>
            )}

            {/* Stats cards */}
            <div className="bg-background p-8 flex flex-col justify-center items-center text-center">
              <p className="text-3xl font-extrabold text-brand-green">{allPosts.length}</p>
              <p className="text-xs text-muted-foreground mt-1">Articles Published</p>
            </div>
            <div className="bg-background p-8 flex flex-col justify-center items-center text-center">
              <p className="text-3xl font-extrabold text-brand-green">{categories.length - 1}</p>
              <p className="text-xs text-muted-foreground mt-1">Categories</p>
            </div>
            <div className="bg-background p-8 md:col-span-2 flex flex-col justify-center items-center text-center">
              <p className="text-sm text-muted-foreground">Covering</p>
              <p className="text-sm font-semibold mt-1">
                {categories.filter((c) => c !== "All Posts").join(" · ")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FILTER BAR ── */}
      <section className="w-full px-6 py-8 scroll-fade">
        <div className="max-w-[1100px] mx-auto flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 rounded-full h-9 text-sm"
            />
          </div>
        </div>
      </section>

      {/* ── POSTS GRID ── */}
      <section className="w-full px-6 pb-20">
        <div className="max-w-[1100px] mx-auto">
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground text-sm">
              No posts found matching your search.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border/60 border border-border/60 rounded-2xl overflow-hidden">
              {filteredPosts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blogs/${post.slug}`}
                  className="bg-background group flex flex-col"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-semibold">
                        <Tag className="h-3 w-3" />
                        {post.category}
                      </span>
                    </div>
                    <h3 className="font-bold text-sm leading-snug mb-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed flex-1">
                      {post.summary}
                    </p>
                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/60">
                      <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
                        <span className="inline-flex items-center gap-1"><User className="h-3 w-3" />{post.author}</span>
                        <span className="inline-flex items-center gap-1"><Calendar className="h-3 w-3" />{post.published}</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-brand-green transition-colors" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="w-full px-6 pb-20 scroll-fade">
        <div className="max-w-[1100px] mx-auto bg-primary rounded-2xl p-10 md:p-16 text-center">
          <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-3">
            Have a Project in Mind?
          </h2>
          <p className="text-white/70 text-sm max-w-md mx-auto mb-6">
            Whether it&apos;s hosting, development, or digital marketing — let&apos;s talk about how we can help your business grow.
          </p>
          <Button className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white" asChild>
            <Link href="/contact">Get in Touch <ArrowRight className="ml-2 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
