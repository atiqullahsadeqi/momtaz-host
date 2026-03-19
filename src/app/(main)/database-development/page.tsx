"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { gsap } from "gsap";

import { ChevronLeft, ChevronRight,   CheckCircle, } from "lucide-react";
import React, { useState, useLayoutEffect, useRef, useEffect } from "react";
import Image from "next/image";
import RotatingText from '@/components/RotatingText'
import { ScrollTrigger } from "gsap/ScrollTrigger";


gsap.registerPlugin(ScrollTrigger);

const slides = [
  {
    title: "Inventory & Supply Chain Module",
    image: "https://images.unsplash.com/photo-1761624159464-686d31623aa7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Real-time stock tracking across multiple warehouses.",
      "Automated reordering triggers based on historical data.",
      "Supplier management and QR/Barcode scanning integration.",
    ],
  },
  {
    title: "Financial Management Module",
    image: "https://images.unsplash.com/photo-1761624159464-686d31623aa7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Automated invoicing and expense tracking.",
      "Custom financial reporting and P&L dashboards.",
      "Tax calculation engines tailored to your region.",
      "Seamless integration with banking APIs."
    ],
  },
  {
    title: "HR & Payroll Module",
    image: "https://images.unsplash.com/photo-1761624159464-686d31623aa7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Employee attendance tracking and leave management.",
      "Automated payroll calculation and slip generation.",
      "Role-based access control (RBAC) for sensitive data.",
    ],
  },
  {
    title: "CRM & Sales Module",
    image: "https://images.unsplash.com/photo-1761624159464-686d31623aa7?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    features: [
      "Lead pipeline tracking specific to your sales cycle.",
      "Customer purchase history and behavior analysis.",
      "Automated email marketing sequences based on database triggers."
    ],
  }

];
const workstreams = [
  { label: "Growing", color: "bg-emerald-500" },
  { label: "Optimizing", color: "bg-amber-500" },
  { label: "Scaling", color: "bg-blue-500" },
];

const highlights = [
  {
    title: "Zero Pre-Made Solutions",
    description: " We start with a blank canvas. We map your actual paper trails and digital workflows first, then architect a database schema that mirrors reality.",
  },
  {
    title: "Lean Efficiency",
    description: " You never pay for features you don't use. Every table, relation, and query is written specifically for your needs.",
  },
  {
    title: "Ownership",
    description: " You own the code and the data. No vendor lock-in with proprietary SaaS platforms.",
  },
];

const keyFeatures = [
  {
    title: "Role-Based Access Control (RBAC)",
    description: "Granular permission settings — the Intern sees only what they need; the CFO sees everything.",
  },
  {
    title: "Audit Logging",
    description: "Every action (create, update, delete) is logged so you always know who changed what and when.",
  },
  {
    title: "Automated Backups",
    description: "Daily encrypted snapshots of your database stored securely off-site.",
  },
  {
    title: "API Integration",
    description: "Connect your custom database to third-party tools (Stripe, Slack, Google Workspace, etc.).",
  },
];

const steps = [
  {
    title: "Discovery & Mapping",
    description: "We sit down with you to draw out your entity relationships on a whiteboard.",
  },
  {
    title: "Schema Design",
    description: "We design the database architecture (ERD) to ensure data integrity and normalization.",
  },
  {
    title: "API Development (Laravel)",
    description: "We build the endpoints and business logic.",
  },
  {
    title: "UI Implementation (Next.js)",
    description: "We connect the frontend to the data.",
  },
  {
    title: "UAT (User Acceptance Testing)",
    description: "You test the system with real data.",
  },
  {
    title: "Deployment & Training",
    description: "We launch on secure cloud servers and train your staff.",
  },
];

export default function DatabaseDevelopmentPage() {

  const [index, setIndex] = useState(0);
  const containerRef = useRef(null);
  const progressRef = useRef(null);


  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Fade out current content
      gsap.fromTo(".slide-content",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power2.out" }
      );

      // 2. Scale/Fade image
      // gsap.fromTo(".slide-image",
      //   { scale: 0.95, opacity: 0.8 },
      //   { scale: 1, opacity: 1, duration: 0.8, ease: "expo.out" }
      // );

      // 3. Reset and Animate Progress Bar
      gsap.fromTo(progressRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 5, ease: "none", onComplete: handleNext }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [index]);

  const handleNext = () => setIndex((prev) => (prev + 1) % slides.length);
  const handlePrev = () => setIndex((prev) => (prev - 1 + slides.length) % slides.length);

  const heroRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.2 } });

      // 1. Text reveal (Left Side)
      tl.from(".hero-text-item", {
        x: -50,
        opacity: 0,
        stagger: 0.2,
      })
        // 2. Main visual card (Right Side)
        .from(".main-visual-card", {
          scale: 0.9,
          opacity: 0,
          duration: 1.4,
        }, "-=1") // Start slightly before text finishes
        // 3. Floating Image Assets (The "premium" touch)
        .from(".floating-asset", {
          y: 40,
          x: (i) => (i === 0 ? 30 : -30), // Chart slides from right, Profile from left
          opacity: 0,
          stagger: 0.2,
          duration: 1,
        }, "-=0.8")
        // 4. Grid items pop-in
        .from(".workstream-grid-item", {
          scale: 0.8,
          opacity: 0,
          stagger: 0.1,
          ease: "back.out(1.7)",
        }, "-=0.5")
        // 5. CRM card pops in with rotation
        .from(".crm-card", {
          scale: 0.7,
          opacity: 0,
          rotate: 15,
          duration: 0.7,
          ease: "back.out(1.7)",
        }, "-=0.3");

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const [activeHighlight, setActiveHighlight] = useState(0);
  const highlightTextRef = useRef(null);
  const highlightProgressRef = useRef(null);

  useEffect(() => {
    // Logic inside braces doesn't return anything to the useEffect
    const tl = gsap.timeline({
      onComplete: () => {
        setActiveHighlight((prev) => (prev + 1) % highlights.length);
      }
    });

    tl.fromTo(highlightTextRef.current,
      { opacity: 0, y: 15 },
      { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" }
    );

    tl.fromTo(highlightProgressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 6, ease: "none" },
      "-=0.4"
    );

    // The cleanup function
    return () => {
      tl.kill();
    };
  }, [activeHighlight]);

  const sectionRef = useRef(null);
  const triggerRef = useRef(null);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // We create the timeline first
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerRef.current,
          start: "top 50%", // Triggers when the top of the section hits 70% of viewport
          end: "bottom 20%", // Ends when bottom of section hits 20%
          toggleActions: "play reverse play reverse", // The magic line for back-and-forth
        },
      });

      // Grid card stagger animation
      steps.forEach((_, i) => {
        const position = (i / steps.length) * 0.7;
        tl.to(`.content-${i}`, {
          opacity: 1,
          y: 0,
          duration: 0.4,
          ease: "power2.out",
        }, position);
      });


    }, sectionRef);

    return () => ctx.revert();
  }, []);


  return (
    <>
      <div className="bg-brand-purple w-full relative overflow-hidden">
        {/* Curved lines decoration */}
        <div className="absolute inset-0 opacity-15 pointer-events-none">
          <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="0.5">
            <path d="M 400 0 C 400 200, 800 400, 800 600" />
            <path d="M 300 0 C 300 200, 700 400, 700 600" />
            <path d="M 200 0 C 200 200, 600 400, 600 600" />
            <path d="M 100 0 C 100 200, 500 400, 500 600" />
            <path d="M 0 0 C 0 200, 400 400, 400 600" />
            <path d="M -100 0 C -100 200, 300 400, 300 600" />
            <path d="M -200 0 C -200 200, 200 400, 200 600" />
            <path d="M -300 0 C -300 200, 100 400, 100 600" />
          </svg>
        </div>
        <div className="container mx-auto h-full md:h-[70vh] relative z-10 px-4" ref={heroRef}>
          <div className="w-full relative flex flex-col md:flex-row gap-8 py-8 md:py-16 h-full">
            <div className="w-full md:w-1/2 flex flex-col justify-between gap-8 md:py-16">
              <h1 className="hero-text-item text-4xl lg:text-6xl text-white leading-tight font-bold">
                Software <br /> That Adapts to <br /> Your Business.
              </h1>
              <div>
                <p className="text-sm text-white/70 mb-8 mt-4 max-w-2xl">We don't believe in "one-size-fits-all." We architect high-performance, custom database solutions and ERP systems designed strictly around your operational workflows.</p>
                <div>
                  <Button className="bg-brand-green hover:bg-brand-green/80 text-white rounded-full" asChild><Link href="/contact">Contact Us</Link></Button>
                </div>
              </div>
            </div>
            <div className="main-visual-card flex items-center py-4 px-4 w-full md:w-1/2 h-full relative rounded-md  bg-center bg-cover overflow-visible">
              <div className="max-w-full md:max-w-2xl mx-auto rounded-md bg-white/70 overflow-visible">
                <div className="workstream-grid-item gap-4 flex flex-col md:flex-row md:justify-between items-start md:items-center p-4">
                  <h3 className="text-foreground"><strong>Workstreams</strong></h3>
                  <div className="flex gap-3 md:mt-0 mt-4">
                    {workstreams.map((item, i) => (
                      <div key={i} className="flex items-center gap-1">
                        <span className={`h-2 w-2 rounded-full ${item.color}`}></span>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 p-4 relative">
                  {/* CRM placeholder — dashed border where the card was */}
                  <div className="workstream-grid-item aspect-square rounded-xl border-2 border-dashed border-muted/40 flex items-center justify-center p-4">
                  </div>
                  <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4">
                    <h1 className="text-gray-400 text-center font-medium">Data Workflow</h1>
                  </div>
                  <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4">
                    <h1 className="text-gray-400 text-center font-medium">Maintenance</h1>
                  </div>
                  <div className="workstream-grid-item aspect-square bg-gray-100 rounded-xl flex items-center justify-center p-4">
                    <h1 className="text-gray-400 text-center font-medium">Security</h1>
                  </div>
                  {/* CRM card — rotated, popping out of the grid */}
                  <div className="crm-card absolute -top-0 -left-6 aspect-square w-[calc(50%-6px)] bg-brand-green rounded-xl flex items-center justify-center p-4 shadow-xl -rotate-6 z-10">
                    <h1 className="text-white text-center font-medium">CRM Automation</h1>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <section className="w-full relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── "No Templates" header ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <div className="flex flex-wrap gap-4 items-center justify-center mb-4">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">No</h2>
              <RotatingText
                texts={['Templates.', 'Bloatware.']}
                mainClassName="px-3 md:px-4 bg-brand-green text-3xl md:text-4xl lg:text-5xl text-white font-bold overflow-hidden py-1 md:py-2 justify-center rounded-lg"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">Just Code.</h2>
            </div>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Most agencies sell you a pre-packaged CRM or ERP and try to force your unique processes into their rigid boxes. We do the opposite.
            </p>
          </div>

          {/* ── Highlights image row ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="md:col-span-2 relative min-h-[400px] overflow-hidden">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1761168129112-4ddc297dc797?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            </div>
            <div className="bg-background p-8 lg:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Our Philosophy</span>
                <div ref={highlightTextRef} className="min-h-[80px] mt-3">
                  <p className="text-sm leading-relaxed">
                    <strong>{highlights[activeHighlight].title}:</strong>
                    {highlights[activeHighlight].description}
                  </p>
                </div>
              </div>
              <div className="h-[2px] w-full bg-border mt-6 overflow-hidden">
                <div ref={highlightProgressRef} className="h-full bg-brand-green origin-left w-full" />
              </div>
              <div className="flex flex-col gap-3 mt-6">
                {highlights.map((h, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHighlight(i)}
                    className={`text-left text-xs px-3 py-2 rounded-lg transition-colors ${i === activeHighlight ? "bg-brand-green/10 text-brand-green font-semibold" : "text-muted-foreground hover:bg-muted"}`}
                  >
                    {h.title}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* ── Carousel section ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Scalable by Design. Grow Module by Module.</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Start with a single core module and plug in others as your business expands — seamless data flow between departments.
            </p>
          </div>

          <div ref={containerRef} className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="relative min-h-[400px] overflow-hidden">
              <Image
                src={slides[index].image}
                alt={slides[index].title}
                fill
                className="slide-image object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 slide-content">
                <div className="bg-background/80 backdrop-blur-md px-6 py-3 rounded-md">
                  <h2 className="text-foreground font-semibold">{slides[index].title}</h2>
                </div>
              </div>
            </div>
            <div className="bg-background p-8 lg:p-10 flex flex-col justify-between">
              <ul className="space-y-6">
                {slides[index].features.map((feature, i) => (
                  <li key={i} className="slide-content flex items-start gap-3">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature}</p>
                  </li>
                ))}
              </ul>
              <div className="pt-8 flex items-center gap-6">
                <div className="relative h-[2px] w-full bg-border overflow-hidden">
                  <div ref={progressRef} className="absolute top-0 left-0 h-full bg-foreground origin-left w-full" />
                </div>
                <div className="flex gap-2 shrink-0">
                  <Button variant="default" size="icon" onClick={handlePrev} className="rounded-full h-10 w-10 cursor-pointer bg-brand-green hover:bg-brand-green/80 border-0">
                    <ChevronLeft className="h-5 w-5" />
                  </Button>
                  <Button variant="default" size="icon" onClick={handleNext} className="rounded-full h-10 w-10 cursor-pointer bg-brand-green hover:bg-brand-green/80 border-0">
                    <ChevronRight className="h-5 w-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Key Features ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Key Features</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60 border-b border-border/60">
            {keyFeatures.map((kf, i) => (
              <div key={i} className="bg-background p-8 lg:p-10 flex flex-col gap-3">
                <h3 className="font-bold text-foreground">{kf.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{kf.description}</p>
              </div>
            ))}
          </div>



          {/* ── Maintenance banner ── */}
          <div className="relative w-full bg-primary overflow-hidden">
            <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none">
              <svg viewBox="0 0 400 400" className="w-full h-full text-white" fill="none" stroke="currentColor" strokeWidth="0.5">
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
                <p className="text-white/60 text-sm max-w-md leading-relaxed">
                  Every project includes a full year of maintenance — security patches, updates, and minor content changes at no extra cost.
                </p>
              </div>
              <div className="grid grid-cols-2 gap-3 shrink-0">
                {["Security updates", "Plugin & CMS updates", "Minor content edits", "Uptime monitoring"].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Backend / Frontend ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Robust Backend, Lightning Frontend.</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              We combine the industry's most secure PHP framework with the world's fastest React framework.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="bg-background p-8 lg:p-10 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Backend</span>
              <h3 className="font-bold text-foreground text-lg">Laravel</h3>
              <p className="text-sm text-muted-foreground">We use Laravel to build the heavy-lifting logic and API layers.</p>
              <ul className="flex flex-col gap-3 mt-2">
                {[
                  { t: "Security First", d: "Built-in protection against SQL injection, CSRF, and XSS attacks." },
                  { t: "Complex Logic", d: 'Perfect for handling complicated relationships e.g., "If Stock < 10 AND Vendor is X, create Order Y".' },
                  { t: "Job Queues", d: "Efficient handling of background tasks like sending emails or generating large PDF reports." },
                ].map(item => (
                  <li key={item.t} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                    <span><strong className="text-foreground">{item.t}:</strong> <span className="text-muted-foreground">{item.d}</span></span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-background p-8 lg:p-10 flex flex-col gap-4">
              <span className="text-xs font-bold uppercase tracking-widest text-brand-green">Frontend</span>
              <h3 className="font-bold text-foreground text-lg">Next.js</h3>
              <p className="text-sm text-muted-foreground">We use Next.js for the user interface (Dashboard).</p>
              <ul className="flex flex-col gap-3 mt-2">
                {[
                  { t: "Instant Interactions", d: "No page reloads. The dashboard feels like a native desktop app." },
                  { t: "Data Visualization", d: "Interactive charts and graphs powered by real-time data." },
                  { t: "Server-Side Rendering", d: "Ensures fast initial loads and secure data fetching." },
                ].map(item => (
                  <li key={item.t} className="flex items-start gap-2 text-sm">
                    <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand-green shrink-0" />
                    <span><strong className="text-foreground">{item.t}:</strong> <span className="text-muted-foreground">{item.d}</span></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* ── Lifecycle / Timeline → Grid ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Our Database Architecture Lifecycle</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A structured, transparent process from whiteboard to production.
            </p>
          </div>
          <div ref={sectionRef}>
            <div ref={triggerRef} className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
              {steps.map((step, i) => (
                <div key={i} className={`content-${i} opacity-0 translate-y-4 bg-background p-8 lg:p-10 flex flex-col gap-3 relative overflow-hidden`}>
                  <span className="absolute -top-4 -right-2 text-[7rem] font-black text-muted/20 leading-none select-none pointer-events-none">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h4 className="font-bold text-foreground text-lg relative z-10 mt-2">{step.title}</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </>
  );
}