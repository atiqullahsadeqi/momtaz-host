"use client";

import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DomainSearchSection() {
  const [domain, setDomain] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (domain) {
      window.location.href = `/domains?search=${encodeURIComponent(domain)}`;
    }
  };

  return (
    <section className="relative w-full border-b border-border/60 bg-primary overflow-hidden">
      {/* Abstract Background Illustration (Curved Globe lines) */}
      <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-50 pointer-events-none">
        <svg viewBox="0 0 400 400" className="w-full h-full text-white/40" fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M 200 0 C 200 100, 400 200, 400 400" />
          <path d="M 150 0 C 150 100, 350 200, 350 400" />
          <path d="M 100 0 C 100 100, 300 200, 300 400" />
          <path d="M 50 0 C 50 100, 250 200, 250 400" />
          <path d="M 0 0 C 0 100, 200 200, 200 400" />
          <path d="M -50 0 C -50 100, 150 200, 150 400" />
          <path d="M -100 0 C -100 100, 100 200, 100 400" />
        </svg>
      </div>

      <div className="relative z-10 w-full px-6 lg:px-16 xl:px-24 py-10 flex flex-col md:flex-row items-center justify-between gap-10 lg:gap-20">
        <div className="flex-1 text-center md:text-left">

        </div>

        <div className="flex-2 w-full max-w-xl">
          <h2 className="text-lg lg:text-xl font-bold tracking-tight text-center mb-8 text-white">
            Find your domain for your business.
          </h2>
          <form onSubmit={handleSearch} className="relative flex items-center bg-background rounded-full p-1 shadow-sm ">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              placeholder="your-domain.com"
              className="w-full bg-transparent outline-none pl-12 pr-32 h-12 text-foreground font-medium"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
            <Button type="submit" className="absolute right-2 h-10 px-6 rounded-full bg-brand-green hover:bg-brand-green/90 text-primary-foreground font-semibold transition-colors">
              Search
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
