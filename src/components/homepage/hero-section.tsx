"use client";

import Beams from "../Beams";
import { ArrowLeft, ArrowRight, RotateCw, Lock } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col lg:flex-row min-h-100 border-b border-border/40">
      {/* Left Text Block */}
      <div className="flex-1 flex flex-col justify-center px-6 lg:px-16 xl:px-24 py-20 lg:border-r border-border/40 relative z-10 w-full lg:w-1/2 bg-background">
        <h1 className="text-2xl lg:text-2xl xl:text-[48px] font-bold text-foreground leading-[1.1] tracking-tight">
          <span className="text-foreground">Presence</span> <span className="text-muted-foreground font-normal">of your</span> <span className="text-foreground">Business</span>
          <br />
          <span className="text-foreground">We Build</span> <span className="text-muted-foreground font-normal">An Online</span>
        </h1>
        <p className="text-muted-foreground text-md max-w-lg mt-8 leading-relaxed">
          Keep your website running smoothly with reliable hosting solutions. Manage domains, hosting, and applications in one place, fast & affordably.
        </p>
      </div>

      {/* Right Illustration Block */}
      <div className="flex-1 bg-muted/20 relative overflow-hidden flex items-center justify-center p-6 lg:p-16 w-full lg:w-1/2">
        {/* Grid pattern background */}
        <div className="absolute inset-0 translate-y-[20%] opacity-20 pointer-events-none"
          style={{ backgroundImage: 'linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)', backgroundSize: '40px 40px' }}
        />

        {/* The primary browser window */}
        <div className="w-full max-w-[550px] aspect-[4/3] bg-brand-blue rounded-2xl shadow-2xl border border-border/40 flex flex-col overflow-hidden relative group translate-x-[10%] lg:translate-x-[20%] lg:translate-y-[10%] xl:translate-x-[20%]">
          {/* Window Header */}
          <div className="h-12 border-b border-white/10 flex items-center px-4 justify-between bg-white/10 relative shrink-0">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-400 border border-white/20" />
              <div className="w-3 h-3 rounded-full bg-amber-400 border border-white/20" />
              <div className="w-3 h-3 rounded-full bg-brand-green border border-white/20" />
            </div>
            {/* Tab */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 h-full w-40 border-x border-b rounded-b-lg border-white/10 bg-brand-blue flex items-center justify-center shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
              <span className="text-white/90 text-xs font-medium">Your Brand ..</span>
            </div>
          </div>

          {/* Search bar area */}
          <div className="h-14 border-b border-white/10 flex items-center px-4 gap-4 bg-white/5 shrink-0">
            <div className="flex gap-3 text-white/60">
              <ArrowLeft className="w-4 h-4" />
              <ArrowRight className="w-4 h-4" />
              <RotateCw className="w-4 h-4" />
            </div>
            <div className="flex-1 h-8 rounded-md bg-white/10 border border-white/10 flex items-center px-3 gap-2">
              <div className="w-4 h-4 rounded-full bg-brand-green flex items-center justify-center shrink-0 shadow-sm shadow-brand-green/20">
                <Lock className="w-2.5 h-2.5 text-white" />
              </div>
              <span className="text-white/90 text-sm font-mono truncate">https://your-domain.com</span>
            </div>
          </div>

          {/* Window Body/Grid Area */}
          <div className="flex-1 relative overflow-hidden bg-brand-blue">
            {/* Simple wireframe grid on blue */}
            <div className="absolute top-0 right-1/4 bottom-0 w-px bg-white/10" />
            <div className="absolute top-0 right-2/4 bottom-0 w-px bg-white/10" />
            <div className="absolute top-1/3 left-0 right-0 h-px bg-white/10" />
            <div className="absolute top-2/3 left-0 right-0 h-px bg-white/10" />
          </div>
        </div>
      </div>
    </section>
  );
}