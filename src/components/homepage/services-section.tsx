"use client";
import React from "react";
import { ArrowRight, Code2, Smartphone, Database, Mail, BrainCircuit, SplinePointer, CircleGauge, EarthLock, Search, TrendingUp, Link2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import DatabaseBeamIllustration from "./database-beam";
import MobileIconCloud from "./mobile-icon-cloud";
import GoogleWorkspaceOrbits from "./google-workspace-orbits";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";

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
          <div className="absolute py-3  -bottom-0 right-1/2 translate-x-1/2 w-[85%] max-w-[210px] h-[110px] bg-card rounded-t-xl border-x border-t border-border/80 flex flex-col items-center justify-end pb-4 gap-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="w-5/6 h-10 rounded-md border border-border/60 bg-background/20 flex items-center px-4 justify-between">
                <div className="flex gap-2">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 0 ? 'bg-brand-green' : 'bg-muted/80'}`} />
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
          <div className="absolute -bottom-5 right-1/2 translate-x-1/2 w-[90%] max-w-[310px] h-[110px]  rounded-t-xl  flex  gap-3 items-center justify-center flex-wrap">

          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
          <BrainCircuit width={15} />
            <p className="text-sm">UI/UX</p>
          </div>
          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
          <SplinePointer width={15} />
            <p className="text-sm">Unique</p>
          </div>
          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
          <CircleGauge width={15} />
            <p className="text-sm">Speed</p>
          </div>
          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
            <p className="text-sm">Responsive</p>
          </div>
          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
            <p className="text-sm">CMS</p>
          </div>
          <div className=" flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
          <EarthLock width={15} />
            <p className="text-sm">Secure</p>
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
          {/* Illustration: Icon Cloud */}
          <div className="absolute -bottom-10 right-1/2 translate-x-1/2 w-[200px] h-[200px]" style={{ maskImage: "radial-gradient(circle, black 30%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle, black 30%, transparent 70%)" }}>
            <MobileIconCloud />
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
          {/* Illustration: SEO Keywords */}
          <div className="absolute -bottom-5 right-1/2 translate-x-1/2 w-[90%] max-w-[310px] h-[110px] rounded-t-xl flex gap-3 items-center justify-center flex-wrap">
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <Search width={15} />
              <p className="text-sm">Keywords</p>
            </div>
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <TrendingUp width={15} />
              <p className="text-sm">Ranking</p>
            </div>
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <Link2 width={15} />
              <p className="text-sm">Backlinks</p>
            </div>
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <p className="text-sm">On-Page</p>
            </div>
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <p className="text-sm">Analytics</p>
            </div>
            <div className="flex gap-1 items-center border border-border/80 bg-card py-2 px-4 rounded-lg shadow-lg">
              <CircleGauge width={15} />
              <p className="text-sm">Audit</p>
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
          {/* Illustration: Database beam */}
          <div className="absolute -bottom-5 right-1/2 translate-x-1/2 w-[90%] max-w-[310px] h-[180px] flex flex-col items-center justify-center">
         
            <DatabaseBeamIllustration />
          </div>
        </Link>

      </div>

      {/* 2-Column Grid for additional services */}
      <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60 border-b border-border/60">

        {/* Block 7: Google Workspace */}
        <Link href="/google-workspace" className="p-8 lg:p-10 bg-background flex flex-col min-h-[350px] relative overflow-hidden cursor-pointer group">
          <div className="relative z-10 flex flex-col gap-3">
            <div className="group/shiny inline-flex w-fit items-center gap-1.5 rounded-full border border-border/60 bg-muted/30 px-3 py-1">
              <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              <AnimatedShinyText className="text-[11px] font-medium">
                Official Google Workspace Partner
              </AnimatedShinyText>
            </div>
            <h3 className="text-md font-bold text-foreground tracking-tight">Google Workspace</h3>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              Professional business email, secure cloud storage, and team collaboration tools.
            </p>
            <div className="w-8 h-8 mt-2 rounded-full border border-border flex items-center justify-center transition-colors group-hover:bg-brand-green group-hover:border-brand-green">
              <ArrowRight className="w-4 h-4 text-muted-foreground transition-colors group-hover:text-white" />
            </div>
          </div>
          {/* Illustration: Orbiting Google Apps */}
          <div className="absolute -bottom-[50%] right-1/2 translate-x-1/2 w-[100%] h-[100%] ">
            <GoogleWorkspaceOrbits />
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
          <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[280px] h-[110px] bg-card rounded-t-xl border-x border-t border-border/80 flex flex-col overflow-hidden">
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
