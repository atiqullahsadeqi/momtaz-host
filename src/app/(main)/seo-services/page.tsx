"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  ArrowRight, Search, BarChart3, Link2, FileText, MapPin,
  CheckCircle, TrendingUp, Zap, Globe, ShieldCheck, Users,
  Loader2, Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    icon: Search,
    title: "Technical SEO Audit",
    desc: "We crawl your entire site to uncover crawl errors, broken links, duplicate content, slow pages, and indexation issues — then give you a prioritised fix list.",
    tags: ["Crawl Analysis", "Core Web Vitals", "Schema Markup"],
  },
  {
    icon: FileText,
    title: "On-Page Optimisation",
    desc: "Title tags, meta descriptions, heading hierarchy, keyword placement, internal linking, and content structure — every page tuned to rank and convert.",
    tags: ["Keyword Research", "Content Optimisation", "Meta Tags"],
  },
  {
    icon: Link2,
    title: "Link Building",
    desc: "White-hat outreach to earn high-authority backlinks from relevant, trusted domains. We build your domain authority the right way — no spam, no shortcuts.",
    tags: ["Outreach", "Guest Posts", "Digital PR"],
  },
  {
    icon: MapPin,
    title: "Local SEO",
    desc: "Dominate local search results with Google Business Profile optimisation, local citations, review management, and geo-targeted content strategies.",
    tags: ["Google Business Profile", "Citations", "Local Keywords"],
  },
  {
    icon: BarChart3,
    title: "SEO Reporting & Analytics",
    desc: "Monthly reports covering keyword rankings, organic traffic, click-through rates, and conversion data — so you always know exactly what's working.",
    tags: ["GA4", "Search Console", "Rank Tracking"],
  },
  {
    icon: Globe,
    title: "E-Commerce SEO",
    desc: "Product page optimisation, category structure, faceted navigation fixes, and structured data for rich snippets — built to drive qualified buyers to your store.",
    tags: ["Product Pages", "Rich Snippets", "Category SEO"],
  },
];

const process = [
  { step: "01", title: "Audit & Discovery", desc: "Full technical audit, competitor analysis, and keyword opportunity mapping to build your SEO baseline." },
  { step: "02", title: "Strategy", desc: "A custom roadmap with prioritised actions, target keywords, and content gaps tailored to your industry." },
  { step: "03", title: "Implementation", desc: "On-page fixes, technical improvements, content creation, and link building — executed systematically." },
  { step: "04", title: "Monitor & Grow", desc: "Monthly reporting, rank tracking, and continuous optimisation to compound your results over time." },
];

const benefits = [
  { icon: TrendingUp, title: "Sustainable Organic Growth", desc: "Unlike paid ads, SEO compounds over time. Rankings you earn today keep delivering traffic for years." },
  { icon: Zap, title: "Faster, Healthier Sites", desc: "Technical SEO improvements directly boost Core Web Vitals — better UX for users and better signals for Google." },
  { icon: ShieldCheck, title: "White-Hat Only", desc: "We follow Google's guidelines strictly. No black-hat tactics that risk penalties or de-indexation." },
  { icon: Users, title: "Qualified Traffic", desc: "We target keywords with real commercial intent — visitors who are actively looking for what you offer." },
  { icon: BarChart3, title: "Full Transparency", desc: "You get access to live dashboards and monthly reports. No vanity metrics — just rankings, traffic, and revenue." },
  { icon: CheckCircle, title: "Dedicated SEO Manager", desc: "One point of contact who knows your site inside out and is accountable for your results." },
];

export default function SEOServicesPage() {
  const rootRef = useRef<HTMLDivElement>(null);

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
              SEO Services
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Rank Higher.<br />
              <span className="text-primary">Get Found. Grow.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              Data-driven SEO that moves the needle — from technical audits and on-page optimisation to link building and local search. We help businesses earn sustainable organic traffic that converts.
            </p>
            <Button className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white" asChild>
              <Link href="#quote-form">Request a Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 hero-stagger">
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between">
              <div className="h-12 w-12 p-2 rounded-sm bg-white/10 flex items-center justify-center">
                <Search className="text-white h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">
                  More organic traffic. Less ad spend.
                </h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                  We optimise every layer of your site so Google ranks you above the competition — and keeps you there.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: "url(https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=1748&auto=format&fit=crop)",
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
                <p className="text-sm font-semibold text-white/80">Keyword research to link building</p>
                <p className="text-xs text-white/50 mt-1">Full-spectrum SEO, handled for you.</p>
              </div>
            </div>

            <div className="relative bg-primary rounded-2xl min-h-72 overflow-hidden flex flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">By the numbers</p>
              <div className="flex flex-col gap-4">
                {[
                  { value: "3×", label: "avg. organic traffic increase" },
                  { value: "Top 3", label: "rankings for target keywords" },
                  { value: "6 mo", label: "avg. time to measurable results" },
                ].map(({ value, label }) => (
                  <div key={label} className="flex flex-col">
                    <span className="text-2xl font-black text-white leading-none">{value}</span>
                    <span className="text-xs text-white/50 mt-0.5">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <div className="w-full max-w-[1100px] mx-auto border-x border-border/60">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">What We Do</h2>
          <p className="text-muted-foreground text-sm max-w-md">A complete SEO service covering every factor that influences your rankings</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {services.map(({ icon: Icon, title, desc, tags }) => (
            <div key={title} className="scroll-fade p-8 lg:p-10 bg-background flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <p className="font-semibold">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {tags.map(t => (
                  <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── CTA banner ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="relative p-10 lg:p-16 bg-primary overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="absolute left-0 top-0 bottom-0 w-1/3 opacity-30 pointer-events-none">
            <svg viewBox="0 0 400 400" className="w-full h-full text-white/40" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M 200 0 C 200 100, 400 200, 400 400" />
              <path d="M 150 0 C 150 100, 350 200, 350 400" />
              <path d="M 100 0 C 100 100, 300 200, 300 400" />
              <path d="M 50 0 C 50 100, 250 200, 250 400" />
              <path d="M 0 0 C 0 100, 200 200, 200 400" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Ready to rank higher?</h2>
            <p className="text-white/60 text-sm max-w-md">Tell us about your site and goals — we'll put together a custom SEO strategy and quote within 48 hours.</p>
          </div>
          <Button className="relative z-10 rounded-full bg-white text-primary hover:bg-white/90 shrink-0 px-8" asChild>
            <Link href="#quote-form">Request a Quote <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
        </div>
      </div>

      {/* ── Process ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">How It Works</h2>
          <p className="text-muted-foreground text-sm max-w-md">A structured, transparent process from day one</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 w-full gap-px bg-border/60">
          {process.map(({ step, title, desc }) => (
            <div key={step} className="scroll-fade p-8 lg:p-10 bg-background flex flex-col gap-3 relative overflow-hidden">
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
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">Why Invest in SEO?</h2>
          <p className="text-muted-foreground text-sm max-w-md">The highest ROI marketing channel for most businesses — when done right</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {benefits.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="scroll-fade p-8 lg:p-10 bg-background flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Quote Form ── */}
      <div id="quote-form" className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
          <p className="text-muted-foreground text-sm max-w-md">Tell us about your site and goals — we'll get back to you within 48 hours with a custom SEO strategy and pricing.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
          <div className="p-8 lg:p-12 bg-background">
            <QuoteForm />
          </div>
          <div className="relative min-h-[400px] overflow-hidden bg-primary/50">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: "url(https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1715&auto=format&fit=crop)",
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
            <div className="relative z-10 p-10 flex flex-col justify-end h-full">
              <p className="text-white font-bold text-xl mb-2">A strategy built around your goals</p>
              <p className="text-white/60 text-sm">Whether you're starting from scratch or recovering from a penalty, we'll map out exactly what it takes to grow your organic presence.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", website: "", service: "", budget: "", goals: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name, email: formData.email, company: formData.company,
          product: "SEO Services",
          details: { Website: formData.website, Service: formData.service, Budget: formData.budget, Goals: formData.goals },
        }),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", website: "", service: "", budget: "", goals: "" }); }, 3000);
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
        <Input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
        <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
        <Input name="website" placeholder="Website URL" value={formData.website} onChange={handleChange} />
        <Select value={formData.service} onValueChange={(v) => setFormData((p) => ({ ...p, service: v }))} required>
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Service Needed *" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="technical-audit">Technical SEO Audit</SelectItem>
            <SelectItem value="on-page">On-Page Optimisation</SelectItem>
            <SelectItem value="link-building">Link Building</SelectItem>
            <SelectItem value="local-seo">Local SEO</SelectItem>
            <SelectItem value="ecommerce-seo">E-Commerce SEO</SelectItem>
            <SelectItem value="full-service">Full-Service SEO</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.budget} onValueChange={(v) => setFormData((p) => ({ ...p, budget: v }))}>
          <SelectTrigger className="w-full h-10">
            <SelectValue placeholder="Monthly Budget" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="under-500">Under $500</SelectItem>
            <SelectItem value="500-1000">$500 – $1,000</SelectItem>
            <SelectItem value="1000-2500">$1,000 – $2,500</SelectItem>
            <SelectItem value="2500-plus">$2,500+</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea name="goals" placeholder="Describe your SEO goals and current challenges (optional)" value={formData.goals} onChange={handleChange} className="mt-4" rows={4} />
      <Button type="submit" disabled={submitting || submitted} className="mt-6 rounded-full bg-brand-green hover:bg-brand-green/80 text-white px-8">
        {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</> : submitted ? <><Check className="w-4 h-4 mr-2" />Quote Requested!</> : "Request Quote"}
      </Button>
    </form>
  );
}
