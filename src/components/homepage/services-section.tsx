"use client";
import React from "react";
import { ArrowRight, Code2, Smartphone, Database, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ServicesSection() {
  return (
    <section className="w-full bg-background relative z-10 flex flex-col gap-px">

      {/* 3-Column Grid for main 6 services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">

        {/* Block 1: Main Partner Title */}
        <div className="p-8 lg:p-12 bg-background flex flex-col justify-start min-h-[350px]">
          <h2 className="text-xl md:text-3xl lg:text-3xl  font-bold text-foreground leading-[1.1] tracking-tight mb-4 mt-4">
            One Partner. <br className="hidden lg:block" /> All Your <br className="hidden lg:block" /> Digital Needs.
          </h2>
          <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed">
            Explore our comprehensive range of services tailored for individuals, startups, and enterprises.
          </p>
        </div>

        {/* Block 2: Web Hosting */}
        <Link href="/hosting/shared" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Web Hosting</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Reliable, secure, and blazing fast servers optimized for peak performance.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Server Rack */}
          <div className="absolute py-3 -bottom-0 right-1/2 translate-x-1/2 w-[85%] max-w-[210px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col items-center justify-end pb-4 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5/6 h-10 rounded-md border border-border/60 bg-muted/10 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-brand-green' : 'bg-muted'}`} />
                  <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                </div>
                <div className="w-1/3 h-1.5 bg-muted rounded-full" />
              </div>
            ))}
          </div>
        </Link>

        {/* Block 3: Web Development */}
        <Link href="/web-development" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Web Development</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Custom web applications and stunning websites built perfectly for your brand.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Browser Editor */}
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[210px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col">
            <div className="h-8 py-1 border-b border-border/60 flex items-center px-3 gap-1.5 bg-muted/20">
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-brand-green " />
            </div>
            <div className="flex-1 p-5 flex  gap-3">

              <div className="w-full flex gap-3">
                <div className="w-1/3 h-16 rounded border border-border/60 bg-muted/10 flex items-center justify-center">
                  <Code2 className="w-4 h-4 text-muted-foreground/40" />
                </div>
                <div className="flex-1 flex flex-col gap-2">
                  <div className="w-1/2 h-1 rounded bg-muted " />
                  <div className="w-full h-1 rounded bg-muted" />
                  <div className="w-4/5 h-1 rounded bg-muted" />
                  <div className="w-2/5 h-1 rounded bg-muted" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Block 4: Mobile Development */}
        <Link href="/mobile-development" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Mobile Development</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Native iOS & Android mobile applications crafted for optimal user experience.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Smartphone mockup */}
          <div className="absolute -bottom-35 right-1/2 translate-x-1/2 w-[140px] h-[280px] bg-background border border-muted rounded-[25px] flex flex-col items-center pt-3 px-2 pb-2">
            <div className="w-12 h-1.5 bg-muted rounded-full mb-4" />
            <div className="w-full h-full rounded-xl bg-muted border-t border-border/60  p-2 flex flex-col gap-2 bg-muted/10">

              <div className="w-full h-8 rounded-md bg-brand-blue/10 border border-brand-purple/10 " />
              <div className="flex gap-1">
                <div className="h-2 w-2 rounded-full bg-brand-green" />
                <div className="w-3/4 h-2 rounded bg-muted" />
              </div>
              <div className="w-1/2 h-2 rounded bg-muted" />
            </div>
          </div>
        </Link>

        {/* Block 5: SEO Services */}
        <Link href="/seo-services" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">SEO Services</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Boost your visibility and rank higher with our data-driven SEO techniques.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: SEO Analytics Chart */}
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[85%] max-w-[210px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col justify-end  pb-0">
            <div className="h-8 py-1 w-full border-b border-border/60 flex items-center px-3 gap-1.5 bg-muted/20">
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-brand-green " />
            </div>
            <div className="w-full h-full relative flex gap-1 items-end justify-center">
              <div className="absolute -bottom-2">
                <svg width="123" height="72" viewBox="0 0 123 72" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M0.365229 69.5191C-0.176524 70.1458 -0.107634 71.093 0.5191 71.6348C1.14583 72.1766 2.09308 72.1077 2.63483 71.4809L1.50003 70.5L0.365229 69.5191ZM123 0L106.776 6.0636L120.139 17.0826L123 0ZM78.0467 54.5178L79.204 55.4721L78.0467 54.5178ZM60.5296 30.2691L59.2449 29.4947L60.5296 30.2691ZM42.2168 60.6516L40.9322 59.8773L42.2168 60.6516ZM28.4214 43.369L29.7077 42.5972L28.4214 43.369ZM1.50003 70.5L2.63483 71.4809L26.3282 44.071L25.1934 43.0901L24.0586 42.1091L0.365229 69.5191L1.50003 70.5ZM28.4214 43.369L27.1352 44.1407L37.5027 61.4199L38.7889 60.6482L40.0752 59.8764L29.7077 42.5972L28.4214 43.369ZM42.2168 60.6516L43.5015 61.426L61.8143 31.0434L60.5296 30.2691L59.2449 29.4947L40.9322 59.8773L42.2168 60.6516ZM64.0664 30.4808L62.6985 31.0963L73.3119 54.6817L74.6798 54.0662L76.0477 53.4506L65.4343 29.8652L64.0664 30.4808ZM78.0467 54.5178L79.204 55.4721L115.569 11.3701L114.412 10.4158L113.254 9.46151L76.8894 53.5636L78.0467 54.5178ZM74.6798 54.0662L73.3119 54.6817C74.3764 57.0471 77.5539 57.4733 79.204 55.4721L78.0467 54.5178L76.8894 53.5636C76.6537 53.8494 76.1998 53.7886 76.0477 53.4506L74.6798 54.0662ZM60.5296 30.2691L61.8143 31.0434C62.0225 30.698 62.533 30.7285 62.6985 31.0963L64.0664 30.4808L65.4343 29.8652C64.2757 27.2906 60.7024 27.0768 59.2449 29.4947L60.5296 30.2691ZM38.7889 60.6482L37.5027 61.4199C38.8605 63.683 42.1392 63.6863 43.5015 61.426L42.2168 60.6516L40.9322 59.8773C40.7375 60.2002 40.2692 60.1997 40.0752 59.8764L38.7889 60.6482ZM25.1934 43.0901L26.3282 44.071C26.5508 43.8135 26.96 43.8488 27.1352 44.1407L28.4214 43.369L29.7077 42.5972C28.4817 40.554 25.6168 40.3065 24.0586 42.1091L25.1934 43.0901Z" fill="#00C897" />
                </svg>
              </div>
              <div className="w-3 h-8 bg-muted rounded-md" />
              <div className="w-3 h-10 bg-muted rounded-md" />
              <div className="w-3 h-16 bg-muted rounded-md" />
              <div className="w-3 h-18 bg-muted rounded-md" />
              <div className="w-3 h-12 bg-muted rounded-md" />
              <div className="w-3 h-8 bg-muted rounded-md" />
              <div className="w-3 h-15 bg-muted rounded-md" />
              <div className="w-3 h-5 bg-muted rounded-md" />
              <div className="w-3 h-11 bg-muted rounded-md" />
              <div className="w-3 h-7 bg-muted rounded-md" />
            </div>
          </div>
        </Link>

        {/* Block 6: Database Development */}
        <Link href="/database-development" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Database Development</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Design, migration, and optimization of scalable database architectures.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Database graph */}
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[210px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col items-center justify-center ">
            <div className="h-8 py-1 w-full border-b border-border/60 flex items-center px-3 gap-1.5 bg-muted/20">
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-red-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-amber-400" />
              <div className="w-1.5 h-1.5 rounded-full border border-border/60 bg-brand-green " />
            </div>
            <div className="relative w-full h-full flex items-center justify-between px-4">
              {/* Connecting Lines */}
              <svg className="absolute inset-0 w-full h-full text-border/60" style={{ zIndex: 0 }}>
                <line x1="25%" y1="50%" x2="70%" y2="20%" stroke="currentColor" strokeWidth="1.5" />
                <line x1="25%" y1="50%" x2="70%" y2="50%" stroke="currentColor" strokeWidth="1.5" />
                <line x1="25%" y1="50%" x2="70%" y2="80%" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              {/* Main DB Node */}
              <div className="w-9 h-9  bg-brand-purple rounded-md flex items-center justify-center relative z-10">
                <Database className="w-5 h-5 text-white" />
              </div>
              {/* Child Nodes */}
              <div className="flex flex-col justify-between h-full py-2 z-10">
                <div className="w-12 h-4 bg-background border border-border/80 rounded-md flex items-center px-2 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                  <div className="w-5 h-1.5 bg-muted rounded-full" />
                </div>
                <div className="w-12 h-4 bg-background border border-border/80 rounded-md flex items-center px-2 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                  <div className="w-5 h-1.5 bg-muted rounded-full" />
                </div>
                <div className="w-12 h-4 bg-background border border-border/80 rounded-md flex items-center px-2 gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-muted" />
                  <div className="w-5 h-1.5 bg-muted rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>

      {/* 2-Column Grid for additional services */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60 border-b border-border/60">

        {/* Block 7: Google Workspace */}
        <Link href="/google-workspace" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Google Workspace</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Professional business email, secure cloud storage, and team collaboration tools.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: App Window UI */}
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[280px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col overflow-hidden">
            <div className="h-10 border-b border-border/60 bg-muted/10 flex items-center px-3 gap-3">
              <div className="w-6 h-6 rounded  bg-background flex items-center justify-center">
                <Image src="/images/Gmail.png" alt="Google Workspace" width={10} height={10} />
              </div>
              <div className="h-2 w-16 rounded bg-muted" />
            </div>
            <div className="flex-1 p-3 flex flex-col gap-2">
              <div className="flex items-center gap-3 w-full p-2 border border-border/40 rounded-md bg-muted/10">
                <div className="w-6 h-6 rounded-full border border-border/60 bg-brand-green/10 flex items-center justify-center text-[10px] text-brand-green font-medium">A</div>
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="w-1/2 h-1.5 rounded bg-muted" />
                  <div className="w-3/4 h-1.5 rounded bg-muted/60" />
                </div>
              </div>
              <div className="flex items-center gap-3 w-full p-2 border border-border/40 rounded-md bg-muted/5">
                <div className="w-6 h-6 rounded-full border border-border/60 bg-muted/20" />
                <div className="flex-1 flex flex-col gap-1.5">
                  <div className="w-1/3 h-1.5 rounded bg-muted" />
                  <div className="w-2/3 h-1.5 rounded bg-muted/60" />
                </div>
              </div>
            </div>
          </div>
        </Link>

        {/* Block 8: Branding */}
        <Link href="/branding" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <h3 className="text-md font-bold text-foreground tracking-tight">Branding</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Visually striking brand identities, versatile logos, and comprehensive design systems.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Canvas Outline */}
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[280px] h-[110px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col overflow-hidden">
            <div className="flex-1 flex">
              {/* Toolbar */}
              <div className="w-10 h-full border-r border-border/60 bg-muted/10 flex flex-col items-center py-3 gap-2">
                <div className="w-5 h-5 rounded border border-border/80 bg-brand-green flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full border border-white" />
                </div>
                <div className="w-5 h-5 rounded border border-border/80 bg-brand-blue/10" />
                <div className="w-5 h-5 rounded border border-border/80 bg-brand-green/10" />
              </div>
              {/* Canvas */}
              <div className="flex-1 relative flex items-center justify-center overflow-hidden">
                {/* Grid background */}
                <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(var(--foreground) 1px, transparent 1px)', backgroundSize: '8px 8px' }} />
                {/* Vector shape outline */}
                <div className="w-12 h-12 rounded-xl border-2 border-brand-blue bg-brand-blue/5 transform rotate-12 relative flex items-center justify-center">
                  <div className="absolute -top-1.5 -left-1.5 w-2 h-2 bg-background border border-brand-blue rounded-sm" />
                  <div className="absolute -top-1.5 -right-1.5 w-2 h-2 bg-background border border-brand-blue rounded-sm" />
                  <div className="absolute -bottom-1.5 -left-1.5 w-2 h-2 bg-background border border-brand-blue rounded-sm" />
                  <div className="absolute -bottom-1.5 -right-1.5 w-2 h-2 bg-background border border-brand-blue rounded-sm" />

                  <div className="w-6 h-6 rounded-full border border-brand-purple bg-brand-purple/5" />
                </div>
              </div>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}
