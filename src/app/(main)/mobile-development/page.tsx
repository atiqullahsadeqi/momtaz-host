"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { CheckCircle, Smartphone, Zap, Shield, Globe, Layers, Code2, BarChart3, Settings, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const process = [
  { step: "01", title: "Discovery & Strategy",  desc: "We analyse your requirements, target audience, and business goals to define the right mobile strategy." },
  { step: "02", title: "UI/UX Design",           desc: "User-centred wireframes and interactive prototypes crafted for both iOS and Android design guidelines." },
  { step: "03", title: "Development & QA",       desc: "Clean, tested code in React Native or Flutter — built once, runs natively on both platforms." },
  { step: "04", title: "Launch & App Store",     desc: "We handle App Store and Google Play submission, review, and post-launch monitoring." },
];

const benefits = [
  { icon: Zap,       title: "Native Performance",    desc: "React Native and Flutter compile to native code — no WebView, no compromises on speed." },
  { icon: Shield,    title: "Security First",         desc: "Biometric auth, encrypted storage, and secure API communication built in from day one." },
  { icon: BarChart3, title: "Analytics & Insights",  desc: "Integrated analytics to track user behaviour, retention, and in-app events." },
  { icon: Settings,  title: "Scalable Architecture", desc: "Modular codebase designed to grow with your user base and feature roadmap." },
  { icon: Globe,     title: "Offline Support",        desc: "Local-first data sync so your app works even without an internet connection." },
  { icon: Layers,    title: "API Integration",        desc: "REST, GraphQL, Firebase, Supabase — we connect your app to any backend." },
];

const techStack = [
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
  { name: "Flutter",      logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
  { name: "Firebase",     logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
  { name: "TypeScript",   logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
  { name: "Dart",         logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg" },
  { name: "Figma",        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
];

// ── Illustrations ─────────────────────────────────────────────────────────────

function PhoneIllustration() {
  return (
    <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[130px] h-[240px] bg-background border border-border/80 rounded-[22px] flex flex-col items-center pt-3 px-2 pb-2 shadow-sm">
      <div className="w-10 h-1.5 bg-muted rounded-full mb-3" />
      <div className="w-full flex-1 rounded-xl bg-muted/10 border border-border/60 p-2 flex flex-col gap-2 overflow-hidden">
        <div className="w-full h-7 rounded-md bg-primary/10 border border-primary/20 flex items-center px-2 gap-1.5">
          <div className="w-2 h-2 rounded-full bg-brand-green" />
          <div className="w-12 h-1.5 rounded bg-muted" />
        </div>
        <div className="flex gap-1.5">
          <div className="w-1/2 h-12 rounded-md bg-muted/40 border border-border/40" />
          <div className="w-1/2 h-12 rounded-md bg-brand-green/10 border border-brand-green/20" />
        </div>
        <div className="w-3/4 h-1.5 rounded bg-muted" />
        <div className="w-1/2 h-1.5 rounded bg-muted" />
        <div className="w-full h-6 rounded-md bg-primary flex items-center justify-center">
          <div className="w-10 h-1.5 rounded bg-white/40" />
        </div>
      </div>
    </div>
  );
}

function DualPhoneIllustration() {
  return (
    <div className="absolute bottom-0 right-1/2 translate-x-1/2 flex items-end gap-3">
      {/* iOS phone */}
      <div className="w-[100px] h-[200px] bg-background border border-border/80 rounded-[20px] flex flex-col items-center pt-2.5 px-1.5 pb-1.5 shadow-sm">
        <div className="w-8 h-1 bg-muted rounded-full mb-2" />
        <div className="w-full flex-1 rounded-lg bg-muted/10 border border-border/60 p-1.5 flex flex-col gap-1.5 overflow-hidden">
          <div className="w-full h-5 rounded bg-primary/10 border border-primary/20" />
          <div className="grid grid-cols-2 gap-1">
            {[...Array(4)].map((_, i) => (
              <div key={i} className={`h-8 rounded border ${i === 0 ? "bg-brand-green/10 border-brand-green/20" : "bg-muted/30 border-border/40"}`} />
            ))}
          </div>
          <div className="w-full h-4 rounded bg-primary flex items-center justify-center">
            <div className="w-8 h-1 rounded bg-white/40" />
          </div>
        </div>
      </div>
      {/* Android phone — slightly taller */}
      <div className="w-[100px] h-[220px] bg-background border border-border/80 rounded-[18px] flex flex-col items-center pt-2.5 px-1.5 pb-1.5 shadow-sm mb-0">
        <div className="w-4 h-1 bg-muted rounded-full mb-2" />
        <div className="w-full flex-1 rounded-lg bg-muted/10 border border-border/60 p-1.5 flex flex-col gap-1.5 overflow-hidden">
          <div className="flex gap-1 mb-0.5">
            <div className="w-2 h-2 rounded-full bg-brand-green" />
            <div className="w-2 h-2 rounded-full bg-muted" />
            <div className="w-2 h-2 rounded-full bg-muted" />
          </div>
          <div className="w-full h-14 rounded bg-muted/30 border border-border/40" />
          <div className="w-3/4 h-1.5 rounded bg-muted" />
          <div className="w-1/2 h-1.5 rounded bg-muted" />
          <div className="w-full h-4 rounded bg-brand-green/20 border border-brand-green/30 flex items-center justify-center">
            <div className="w-8 h-1 rounded bg-brand-green/60" />
          </div>
        </div>
        <div className="w-8 h-1 bg-muted rounded-full mt-1.5" />
      </div>
    </div>
  );
}

function ReactNativeIllustration() {
  return (
    <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[220px] h-[120px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col overflow-hidden">
      <div className="h-8 border-b border-border/60 bg-muted/20 flex items-center px-3 gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
        <div className="ml-2 text-[9px] text-muted-foreground font-mono">App.tsx</div>
      </div>
      <div className="flex-1 p-3 font-mono text-[8px] leading-relaxed text-muted-foreground flex flex-col gap-0.5">
        <span><span className="text-primary">import</span> React <span className="text-primary">from</span> <span className="text-brand-green">&apos;react&apos;</span>;</span>
        <span><span className="text-primary">import</span> {"{"} View, Text {"}"} <span className="text-primary">from</span> <span className="text-brand-green">&apos;react-native&apos;</span>;</span>
        <span className="text-muted-foreground/50">&nbsp;</span>
        <span><span className="text-primary">export default function</span> <span className="text-amber-400">App</span>() {"{"}</span>
        <span>&nbsp;&nbsp;<span className="text-primary">return</span> &lt;<span className="text-brand-green">View</span>&gt;&lt;<span className="text-brand-green">Text</span>&gt;Hello&lt;/<span className="text-brand-green">Text</span>&gt;&lt;/<span className="text-brand-green">View</span>&gt;;</span>
        <span>{"}"}</span>
      </div>
    </div>
  );
}

function FlutterIllustration() {
  return (
    <div className="absolute -bottom-0 right-1/2 translate-x-1/2 w-[90%] max-w-[220px] h-[120px] bg-background rounded-t-xl border-x border-t border-border/80 flex flex-col overflow-hidden">
      <div className="h-8 border-b border-border/60 bg-muted/20 flex items-center px-3 gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
        <div className="w-1.5 h-1.5 rounded-full bg-brand-green" />
        <div className="ml-2 text-[9px] text-muted-foreground font-mono">main.dart</div>
      </div>
      <div className="flex-1 p-3 font-mono text-[8px] leading-relaxed text-muted-foreground flex flex-col gap-0.5">
        <span><span className="text-primary">import</span> <span className="text-brand-green">&apos;package:flutter/material.dart&apos;</span>;</span>
        <span className="text-muted-foreground/50">&nbsp;</span>
        <span><span className="text-primary">void</span> <span className="text-amber-400">main</span>() =&gt; <span className="text-amber-400">runApp</span>(<span className="text-brand-green">MyApp</span>());</span>
        <span className="text-muted-foreground/50">&nbsp;</span>
        <span><span className="text-primary">class</span> <span className="text-brand-green">MyApp</span> <span className="text-primary">extends</span> <span className="text-amber-400">StatelessWidget</span> {"{"}</span>
        <span>&nbsp;&nbsp;<span className="text-primary">Widget</span> <span className="text-amber-400">build</span>(context) =&gt; <span className="text-brand-green">MaterialApp</span>();</span>
      </div>
    </div>
  );
}

export default function MobileDevelopmentPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".process-step").forEach((el) => {
        gsap.fromTo(el, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out", scrollTrigger: { trigger: el, start: "top 85%" } });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-6 w-full bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Mobile Apps for<br />
              <span className="text-primary">iOS & Android</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              We build cross-platform mobile apps with React Native and Flutter — one codebase, two platforms, native performance.
            </p>
          </div>

          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <Smartphone className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  <strong>React Native & Flutter</strong> — write once, ship to the App Store and Google Play.
                </h2>
                <p className="text-white/60 text-sm">No hybrid WebView. Real native components, real native performance, on both platforms.</p>
              </div>
            </div>

            {/* iOS card — photo with mask+blur */}
            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1092644/pexels-photo-1092644.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">iOS & Android</h2>
                <p className="text-white text-sm mb-3">One codebase, two platforms</p>
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">App Store Ready</h2>
                <p className="text-white text-sm">We handle submission & review</p>
              </div>
            </div>

            {/* Android card — bg-primary with cut-off dual phones */}
            <div className="relative bg-primary rounded-2xl min-h-72 overflow-hidden flex flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-1">Platforms</p>
              <p className="font-bold text-lg text-white">iOS & Android</p>
              <div className="absolute -bottom-16 right-1/2 translate-x-1/2 flex items-end gap-3">
                <div className="w-[100px] h-[200px] bg-background/90 border border-white/20 rounded-[20px] flex flex-col items-center pt-2.5 px-1.5 pb-1.5 shadow-lg">
                  <div className="w-8 h-1 bg-muted rounded-full mb-2" />
                  <div className="w-full flex-1 rounded-lg bg-muted/10 border border-border/60 p-1.5 flex flex-col gap-1.5 overflow-hidden">
                    <div className="w-full h-5 rounded bg-primary/20 border border-primary/30" />
                    <div className="grid grid-cols-2 gap-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className={`h-8 rounded border ${i === 0 ? "bg-brand-green/20 border-brand-green/30" : "bg-muted/30 border-border/40"}`} />
                      ))}
                    </div>
                    <div className="w-full h-4 rounded bg-primary/60" />
                  </div>
                </div>
                <div className="w-[100px] h-[220px] bg-background/90 border border-white/20 rounded-[18px] flex flex-col items-center pt-2.5 px-1.5 pb-1.5 shadow-lg">
                  <div className="w-4 h-1 bg-muted rounded-full mb-2" />
                  <div className="w-full flex-1 rounded-lg bg-muted/10 border border-border/60 p-1.5 flex flex-col gap-1.5 overflow-hidden">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-brand-green" />
                      <div className="w-2 h-2 rounded-full bg-muted" />
                    </div>
                    <div className="w-full h-14 rounded bg-muted/30 border border-border/40" />
                    <div className="w-3/4 h-1.5 rounded bg-muted" />
                    <div className="w-1/2 h-1.5 rounded bg-muted" />
                    <div className="w-full h-4 rounded bg-brand-green/30 border border-brand-green/40" />
                  </div>
                  <div className="w-8 h-1 bg-muted rounded-full mt-1.5" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── What We Build ── */}
      <div className="w-full max-w-[1100px] mx-auto border-x border-border/60">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">What We Build</h2>
          <p className="text-muted-foreground text-sm max-w-md">From MVPs to full-scale products — we cover the full mobile development lifecycle</p>
        </div>

        {/* React Native row */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
          <div className="md:col-span-2 p-8 lg:p-12 bg-background flex flex-col gap-4">
            
            <p className="font-bold text-xl">React Native</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">JavaScript-powered cross-platform apps that feel truly native. Ideal for teams with web experience who want to ship fast without sacrificing quality.</p>
            <ul className="grid grid-cols-2 gap-2 mt-2">
              {["iOS & Android from one codebase", "Hot reload for fast iteration", "Access to native device APIs", "Large ecosystem & community", "Easy CI/CD integration", "TypeScript support"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative min-h-64 overflow-hidden bg-muted/40 flex items-end justify-center">
            <ReactNativeIllustration />
          </div>
        </div>

        {/* Flutter row */}
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          <div className="relative min-h-64 overflow-hidden bg-muted flex items-end justify-center">
            <FlutterIllustration />
          </div>
          <div className="md:col-span-2 p-8 lg:p-12 bg-background flex flex-col gap-4">
           
            <p className="font-bold text-xl">Flutter</p>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-md">Google's UI toolkit for building natively compiled apps from a single Dart codebase. Pixel-perfect UI on every screen size and platform.</p>
            <ul className="grid grid-cols-2 gap-2 mt-2">
              {["Consistent UI across platforms", "60/120fps smooth animations", "Rich widget library", "Dart — easy to learn", "Web & desktop support too", "Strong Google backing"].map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />{f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ── Maintenance Banner ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="relative w-full bg-primary overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full text-white/40" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M 200 0 C 200 100, 400 200, 400 400" />
              <path d="M 150 0 C 150 100, 350 200, 350 400" />
              <path d="M 100 0 C 100 100, 300 200, 300 400" />
              <path d="M 50 0 C 50 100, 250 200, 250 400" />
              <path d="M 0 0 C 0 100, 200 200, 200 400" />
            </svg>
          </div>
          <div className="relative z-10 px-10 lg:px-16 py-12 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Included Free</span>
              <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">1st Year of Maintenance</h2>
              <p className="text-white/60 text-sm max-w-md leading-relaxed">Every app includes a full year of maintenance — OS compatibility updates, bug fixes, and minor feature tweaks at no extra cost.</p>
            </div>
            <div className="grid grid-cols-2 gap-3 shrink-0">
              {["OS version updates", "Bug fixes & patches", "App Store re-submissions", "Performance monitoring"].map(item => (
                <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                  <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />{item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">How We Work</h2>
          <p className="text-muted-foreground text-sm max-w-md">A clear, collaborative process from idea to app store</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-px bg-border/60">
          {process.map(({ step, title, desc }) => (
            <div key={step} className="process-step p-8 lg:p-10 bg-background flex flex-col gap-3 relative overflow-hidden">
              <span className="absolute -top-4 -right-2 text-[7rem] font-black text-muted/30 leading-none select-none pointer-events-none">{step}</span>
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green">{step}</p>
              <p className="font-bold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Benefits ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Why Choose Us</h2>
          <p className="text-muted-foreground text-sm max-w-md">We build apps that users love and businesses rely on</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 lg:p-10 bg-background flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tech Stack ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Our Tech Stack</h2>
          <p className="text-muted-foreground text-sm">The tools we use to build world-class mobile apps</p>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-6 w-full gap-px bg-border/60">
          {techStack.map(({ name, logo }) => (
            <div key={name} className="p-6 bg-background flex flex-col items-center gap-3">
              <Image src={logo} alt={name} width={36} height={36} className="object-contain" unoptimized />
              <p className="text-xs font-medium text-muted-foreground">{name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="p-10 lg:p-16 bg-primary flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Start Today</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Ready to build your mobile app?</h2>
            <p className="text-white/60 text-sm max-w-md">Tell us about your idea and we'll get back to you within 24 hours with a plan and estimate.</p>
          </div>
          <Button className="rounded-full bg-white text-primary hover:bg-white/90 shrink-0 px-8" asChild>
            <Link href="/contact">Start Your Project <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
        </div>
      </div>

    </div>
  );
}
