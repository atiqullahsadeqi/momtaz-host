"use client";
import React, { useEffect, useRef } from "react";
import {
  ArrowRight,
  Paintbrush,
  Code2,
  ShoppingCart,
  Globe,
  CheckCircle,
  Zap,
  Shield,
  BarChart3,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Paintbrush,
    title: "Website Redesign",
    tagline: "Is your current site stuck in the past?",
    description:
      "We breathe new life into outdated websites — analyzing UX, restructuring navigation, and modernizing aesthetics to improve conversion rates. Keep your content, lose the clutter.",
    tags: ["UX Audit", "Modern Design", "Better Conversions"],
  },
  {
    icon: Globe,
    title: "Build with WordPress",
    tagline: "Powering over 40% of the web.",
    description:
      "Custom themes and plugins on the world's most popular CMS. Full control over your content without writing a single line of code. Perfect for blogs, corporate sites, and portfolios.",
    tags: ["Custom Themes", "Plugins", "Easy Management"],
  },
  {
    icon: Code2,
    title: "Bespoke Web Development",
    tagline: "Custom solutions for unique challenges.",
    description:
      "When templates aren't enough, we build from the ground up. React, Vue, or Next.js — lightning-fast, scalable web applications tailored exactly to your business logic.",
    tags: ["React / Next.js", "Vue", "Scalable Apps"],
  },
  {
    icon: ShoppingCart,
    title: "WooCommerce & E-Commerce",
    tagline: "Turn visitors into customers.",
    description:
      "Launch a powerful online store with WooCommerce. Product catalogs, Stripe & PayPal integration, inventory management — a checkout process that's smooth, secure, and optimized for sales.",
    tags: ["Stripe & PayPal", "Inventory", "Optimized Checkout"],
  },
];

const processSteps = [
  { step: "01", title: "Discovery", desc: "We learn your goals, audience, and requirements." },
  { step: "02", title: "Design", desc: "Wireframes and high-fidelity mockups for your approval." },
  { step: "03", title: "Build", desc: "Clean, performant code with regular progress updates." },
  { step: "04", title: "Launch", desc: "Thorough testing, deployment, and post-launch support." },
];

const whyUs = [
  { icon: Zap, title: "Lightning Fast", desc: "Core Web Vitals optimized. Your site loads in under 2 seconds." },
  { icon: Shield, title: "Secure by Default", desc: "SSL, hardened configs, and regular security audits." },
  { icon: BarChart3, title: "Built to Convert", desc: "Every layout decision is backed by UX data and best practices." },
  { icon: CheckCircle, title: "Ongoing Support", desc: "We don't disappear after launch. Monthly retainers available." },
];

const speedItems = [
  { title: "Core Web Vitals", desc: "Optimization for LCP, FID, and CLS to meet Google's standards." },
  { title: "Asset Management", desc: "Image compression, code minification, and lazy loading." },
  { title: "Caching Strategies", desc: "Advanced server-side and browser caching for instant delivery." },
];

const analyticsItems = [
  { title: "Google Analytics (GA4)", desc: "Deep dive into user behavior and traffic sources." },
  { title: "Search Console", desc: "Monitor search health and keyword performance." },
  { title: "Business Profile & Maps", desc: "Essential integration for local SEO visibility." },
  { title: "Google Tag Manager", desc: "Organized management of marketing tags without code clutter." },
];

export default function WebDevelopmentPage() {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger > *", {
        y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.1,
      });
      gsap.from(".service-card", {
        scrollTrigger: { trigger: ".services-grid", start: "top 80%" },
        y: 40, opacity: 0, duration: 0.6, stagger: 0.1, ease: "power3.out",
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={rootRef} className="w-full flex flex-col items-center">

      {/* ── HERO — full-width bg-muted ── */}
      <section className="w-full bg-muted/60 pt-16 pb-12 px-6">
        <div className="max-w-[1100px] mx-auto">
          <div className="mb-8 hero-stagger flex flex-col items-start gap-4">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
              Web Development
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Crafting Digital<br />
              <span className="text-primary">Experiences That Convert.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Pixel-perfect, secure, and scalable websites designed to elevate your brand and engage your audience. Whether you need a simple refresh or a complex custom platform, we turn your vision into code.
            </p>
            <div className="flex gap-3">
              <Button className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white">
                Start a Project <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button variant="outline" className="rounded-full">View Our Work</Button>
            </div>
          </div>

          {/* Bento cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 hero-stagger">
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between">
              <div className="h-12 w-12 p-2 rounded-sm bg-white/10 flex items-center justify-center">
                <Code2 className="text-white h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                  Everything your business needs — built right.
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  From redesigns to full custom builds, we cover every stage of the web.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-brand-green/50">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?q=80&w=1740&auto=format&fit=crop)",
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <p className="text-sm font-semibold text-white/80">Redesigns to custom platforms</p>
                <p className="text-xs text-white/50 mt-1">We turn your vision into code.</p>
              </div>
            </div>

            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden">
              <div className="relative z-20 p-6 flex flex-col gap-3">
                <p className="text-xs font-semibold text-primary-foreground/60 uppercase tracking-widest">Our Stack</p>
                <p className="text-primary-foreground font-bold text-lg leading-tight">Modern frameworks for modern businesses.</p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                {[
                  { label: "Next.js", cls: "top-[30%] left-4 -rotate-6" },
                  { label: "React", cls: "top-[48%] right-3 rotate-3" },
                  { label: "WordPress", cls: "top-[62%] left-6 rotate-2" },
                  { label: "WooCommerce", cls: "top-[76%] right-2 -rotate-2" },
                ].map(({ label, cls }) => (
                  <span key={label} className={`absolute ${cls} bg-white/10 text-primary-foreground text-[10px] font-medium px-2.5 py-1 rounded-full border border-white/20`}>
                    {label}
                  </span>
                ))}
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTAINER ── */}
      <section className="w-full relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── Services header ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">What We Build</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              From a quick refresh to a full custom platform — we cover every stage of the web.
            </p>
          </div>

          {/* ── Services 3-col grid ── */}
          <div className="services-grid grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">

            {/* Card 1 — large, col-span-2, dark */}
            <div className="service-card md:col-span-2 bg-background  p-10 flex flex-col justify-between min-h-[320px]">
              <div className="flex items-center gap-3 mb-4">
                
                <h3 className="font-bold  text-lg">{services[0].title}</h3>
              </div>
              <div>
                <p className=" font-semibold mb-2">{services[0].tagline}</p>
                <p className=" text-sm text-muted-foreground leading-relaxed max-w-md">{services[0].description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-6">
                {services[0].tags.map((t) => (
                  <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>

            {/* Card 2 — image */}
            <div className="service-card relative overflow-hidden min-h-[320px]">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1498758536662-35b82cd15e29?q=80&w=776&auto=format&fit=crop)" }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <p className="text-sm font-semibold text-white/90">Pixel-perfect on every screen</p>
                <p className="text-xs text-white/50 mt-1">Built with modern frameworks.</p>
              </div>
            </div>

            {/* Cards 3–5 — remaining services */}
            {services.slice(1).map((svc) => (
              <div key={svc.title} className="service-card bg-background p-8 lg:p-10 flex flex-col gap-4 min-h-[280px]">
                <div className="flex items-center gap-3">
                 
                  <h3 className="font-bold text-foreground">{svc.title}</h3>
                </div>
                <p className="text-sm font-semibold text-foreground/80">{svc.tagline}</p>
                <p className="text-sm text-muted-foreground leading-relaxed flex-1">{svc.description}</p>
                <div className="flex flex-wrap gap-2">
                  {svc.tags.map((t) => (
                    <span key={t} className="text-xs px-3 py-1 rounded-full bg-muted text-muted-foreground">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* ── Process ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">How We Work</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A clear, collaborative process from first call to final launch.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-px bg-border/60 border-b border-border/60">
            {processSteps.map((s) => (
              <div key={s.step} className="bg-background p-8 lg:p-10 flex flex-col gap-2 relative overflow-hidden min-h-[200px]">
                <span className="absolute -top-4 -left-2 text-[8rem] font-black text-muted/30 leading-none select-none pointer-events-none">{s.step}</span>
                <h3 className="font-bold text-foreground text-lg relative z-10 mt-16">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed relative z-10">{s.desc}</p>
              </div>
            ))}
          </div>

          {/* ── Maintenance banner — full-width bg-primary ── */}
          <div className="relative w-full bg-primary overflow-hidden border-b border-border/60">
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

          {/* ── Performance & Analytics ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Built for Speed, Driven by Data</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              A successful website needs to be fast enough to retain visitors and smart enough to track them.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 ">

            {/* Speed column */}
            <div className="bg-background p-8 lg:p-10 flex flex-col gap-6 md:col-span-1">
              <h3 className="font-bold text-foreground text-lg">The Speed</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                A slow website costs you customers. We obsess over metrics to ensure instant loading times.
              </p>
              <div className="flex flex-col gap-4">
                {speedItems.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
              <div className="mt-auto p-4 rounded-xl bg-muted/60 border border-border/60">
                <p className="text-xs text-muted-foreground italic leading-relaxed">
                  "53% of mobile users leave a site that takes longer than 3 seconds to load."
                </p>
              </div>
            </div>

            {/* Analytics column */}
            <div className="bg-background p-8 lg:p-10 flex flex-col gap-6 md:col-span-1">
              <h3 className="font-bold text-foreground text-lg">The Intelligence</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Launching is just the beginning. We integrate the full suite of Google tools so you can track success.
              </p>
              <div className="flex flex-col gap-4">
                {analyticsItems.map((item) => (
                  <div key={item.title}>
                    <p className="text-sm font-semibold text-foreground mb-1">{item.title}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Why us column */}
            <div className="bg-primary p-8 lg:p-10 flex flex-col gap-5 md:col-span-1">
              <h3 className="font-bold text-white text-lg">Why It Matters</h3>
              <p className="text-white/60 text-xs leading-relaxed">
                We combine rigorous technical optimization with deep data integration to ensure your site is a true growth engine.
              </p>
              <div className="flex flex-col gap-4 mt-2">
                {whyUs.map((item) => (
                  <div key={item.title} className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center shrink-0 mt-0.5">
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{item.title}</p>
                      <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </section>

      
    </div>
  );
}
