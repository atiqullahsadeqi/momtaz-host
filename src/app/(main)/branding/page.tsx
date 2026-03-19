"use client";
import React, { useEffect, useRef, useState } from "react";
import { ArrowRight, Palette, PenTool, Layout, FileImage, Type, Layers, CheckCircle, Zap, ShieldCheck, Users, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const services = [
  { icon: PenTool, title: "Logo Design", desc: "A distinctive, versatile logo that works across every medium — from business cards to billboards. We deliver full source files in all formats.", tags: ["Vector Files", "Multiple Concepts", "Unlimited Revisions"] },
  { icon: Palette, title: "Brand Identity", desc: "Colour palette, typography system, iconography, and visual language — everything codified into a brand guidelines document your whole team can use.", tags: ["Colour System", "Typography", "Brand Guidelines"] },
  { icon: Layout, title: "Marketing Collateral", desc: "Business cards, letterheads, brochures, social media templates, and presentation decks — all consistent with your brand identity.", tags: ["Print Ready", "Social Templates", "Presentations"] },
  { icon: FileImage, title: "Packaging Design", desc: "Product packaging that stands out on the shelf and communicates your brand values at a glance. From concept to print-ready artwork.", tags: ["Print Ready", "Dieline Setup", "Retail Optimised"] },
  { icon: Type, title: "Brand Naming & Messaging", desc: "Company name, tagline, tone of voice, and key messaging framework — the words that define how your brand speaks to the world.", tags: ["Naming", "Tagline", "Tone of Voice"] },
  { icon: Layers, title: "Brand Refresh", desc: "Already have a brand but it feels dated? We modernise your visual identity while preserving the equity you've already built.", tags: ["Audit", "Evolution", "Consistency"] },
];

const process = [
  { step: "01", title: "Discovery", desc: "We learn your business, audience, competitors, and goals through a structured brand questionnaire and workshop." },
  { step: "02", title: "Concept", desc: "Multiple creative directions presented for feedback — mood boards, logo concepts, and colour explorations." },
  { step: "03", title: "Refine", desc: "We iterate on your chosen direction until every detail is exactly right. Unlimited revisions until you're happy." },
  { step: "04", title: "Deliver", desc: "Full brand guidelines document plus all source files — ready to hand to any designer, printer, or developer." },
];

const benefits = [
  { icon: Zap, title: "Fast Turnaround", desc: "Initial concepts delivered within 5 business days. Full brand identity in 3–4 weeks." },
  { icon: ShieldCheck, title: "You Own Everything", desc: "Full IP transfer on delivery. Every file, every font, every asset — yours forever." },
  { icon: Users, title: "Collaborative Process", desc: "You're involved at every stage. No surprises — just a brand that truly reflects your vision." },
  { icon: CheckCircle, title: "Print & Digital Ready", desc: "Every asset delivered in the right format for every use case — web, print, social, and beyond." },
  { icon: Palette, title: "Consistent Across Touchpoints", desc: "A brand guidelines document ensures your identity stays consistent no matter who's using it." },
  { icon: PenTool, title: "Dedicated Brand Designer", desc: "One senior designer owns your project from start to finish — no handoffs, no miscommunication." },
];

export default function BrandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".hero-stagger > *", { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power3.out", delay: 0.1 });
      gsap.utils.toArray<HTMLElement>(".scroll-fade").forEach((el) => {
        gsap.from(el, { scrollTrigger: { trigger: el, start: "top 85%" }, y: 30, opacity: 0, duration: 0.6, ease: "power2.out" });
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
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold">Branding</div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Brands That People<br /><span className="text-primary">Remember.</span>
            </h1>
            <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
              From logo design to full brand identity systems — we craft visual identities that communicate who you are, build trust, and make you impossible to forget.
            </p>
            <Button className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white" asChild>
              <Link href="#quote-form">Start Your Brand <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Bento */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 hero-stagger">
            {/* Primary card */}
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between">
              <div className="h-12 w-12 p-2 rounded-sm bg-white/10 flex items-center justify-center">
                <Palette className="text-white h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white leading-tight mb-2">A brand is more than a logo — it's a feeling.</h2>
                <p className="text-white/60 text-sm leading-relaxed max-w-xs">We build complete visual identities that work across every touchpoint, from your website to your packaging.</p>
              </div>
            </div>

            {/* Photo card */}
            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url(https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1964&auto=format&fit=crop)", maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }} />
              <div className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }} />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <p className="text-sm font-semibold text-white/80">Logo to full identity system</p>
                <p className="text-xs text-white/50 mt-1">Every asset, every format, delivered.</p>
              </div>
            </div>

            {/* Brand illustration card */}
            <div className="relative bg-primary rounded-2xl min-h-72 overflow-hidden flex flex-col p-6">
              <p className="text-xs font-bold uppercase tracking-widest text-white/50 mb-4">Identity System</p>
              {/* Mini brand illustration */}
              <div className="flex flex-col gap-3">
                {/* Logo placeholder */}
                <div className="w-full h-10 rounded-lg bg-white/10 border border-white/20 flex items-center px-3 gap-2">
                  <div className="w-6 h-6 rounded bg-brand-green/60" />
                  <div className="w-20 h-2 rounded bg-white/30" />
                </div>
                {/* Colour swatches */}
                <div className="flex gap-2">
                  {["bg-white", "bg-brand-green/80", "bg-white/40", "bg-white/20"].map((c, i) => (
                    <div key={i} className={`w-8 h-8 rounded-md ${c}`} />
                  ))}
                </div>
                {/* Typography lines */}
                <div className="flex flex-col gap-1.5">
                  <div className="w-3/4 h-3 rounded bg-white/40" />
                  <div className="w-1/2 h-2 rounded bg-white/20" />
                  <div className="w-2/3 h-2 rounded bg-white/20" />
                </div>
                {/* Card mockup */}
                <div className="w-full h-14 rounded-lg bg-white/10 border border-white/20 flex items-center px-3 gap-2 mt-1">
                  <div className="w-8 h-8 rounded bg-brand-green/40" />
                  <div className="flex flex-col gap-1">
                    <div className="w-16 h-1.5 rounded bg-white/40" />
                    <div className="w-10 h-1 rounded bg-white/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <div className="w-full max-w-[1100px] mx-auto border-x border-border/60">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">What We Offer</h2>
          <p className="text-muted-foreground text-sm max-w-md">End-to-end branding services for startups, SMEs, and established businesses</p>
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
                {tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>)}
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
              <path d="M 200 0 C 200 100, 400 200, 400 400" /><path d="M 150 0 C 150 100, 350 200, 350 400" />
              <path d="M 100 0 C 100 100, 300 200, 300 400" /><path d="M 50 0 C 50 100, 250 200, 250 400" />
              <path d="M 0 0 C 0 100, 200 200, 200 400" />
            </svg>
          </div>
          <div className="relative z-10 flex flex-col gap-3">
            <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Get Started</p>
            <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight">Ready to build your brand?</h2>
            <p className="text-white/60 text-sm max-w-md">Share your vision and we'll come back with a creative brief and quote within 48 hours.</p>
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
          <p className="text-muted-foreground text-sm max-w-md">A clear, collaborative process from brief to brand launch</p>
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
          <h2 className="text-3xl font-bold mb-2">Why Work With Us</h2>
          <p className="text-muted-foreground text-sm max-w-md">We treat your brand like it's our own</p>
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
      <div id="quote-form" className="w-full max-w-[1100px] mx-auto border-x border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center scroll-fade">
          <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
          <p className="text-muted-foreground text-sm max-w-md">Tell us about your brand project and we'll get back to you within 48 hours.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
          <div className="p-8 lg:p-12 bg-background"><QuoteForm /></div>
          <div className="relative min-h-[400px] overflow-hidden bg-primary/50">
            <div className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(https://images.unsplash.com/photo-1634942537034-2531766767d1?q=80&w=1740&auto=format&fit=crop)", maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }} />
            <div className="absolute inset-0 backdrop-blur-md"
              style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }} />
            <div className="relative z-10 p-10 flex flex-col justify-end h-full">
              <p className="text-white font-bold text-xl mb-2">Every great brand starts with a conversation</p>
              <p className="text-white/60 text-sm">Share your vision and we'll craft an identity that sets you apart.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", service: "", budget: "", timeline: "", brief: "" });
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
          product: "Branding & Identity",
          details: { Service: formData.service, Budget: formData.budget, Timeline: formData.timeline, Brief: formData.brief },
        }),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", service: "", budget: "", timeline: "", brief: "" }); }, 3000);
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
        <Input name="company" placeholder="Company / Brand Name" value={formData.company} onChange={handleChange} />
        <Select value={formData.service} onValueChange={(v) => setFormData((p) => ({ ...p, service: v }))}>
          <SelectTrigger className="w-full h-10"><SelectValue placeholder="Service Needed *" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="logo">Logo Design</SelectItem>
            <SelectItem value="identity">Full Brand Identity</SelectItem>
            <SelectItem value="collateral">Marketing Collateral</SelectItem>
            <SelectItem value="packaging">Packaging Design</SelectItem>
            <SelectItem value="naming">Brand Naming & Messaging</SelectItem>
            <SelectItem value="refresh">Brand Refresh</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.budget} onValueChange={(v) => setFormData((p) => ({ ...p, budget: v }))}>
          <SelectTrigger className="w-full h-10"><SelectValue placeholder="Budget Range" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="under-500">Under $500</SelectItem>
            <SelectItem value="500-1500">$500 – $1,500</SelectItem>
            <SelectItem value="1500-5000">$1,500 – $5,000</SelectItem>
            <SelectItem value="5000-plus">$5,000+</SelectItem>
          </SelectContent>
        </Select>
        <Select value={formData.timeline} onValueChange={(v) => setFormData((p) => ({ ...p, timeline: v }))}>
          <SelectTrigger className="w-full h-10"><SelectValue placeholder="Timeline" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="asap">As soon as possible</SelectItem>
            <SelectItem value="2-weeks">Within 2 weeks</SelectItem>
            <SelectItem value="1-month">Within 1 month</SelectItem>
            <SelectItem value="flexible">Flexible</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Textarea name="brief" placeholder="Tell us about your brand, audience, and what you're looking for (optional)" value={formData.brief} onChange={handleChange} className="mt-4" rows={4} />
      <Button type="submit" disabled={submitting || submitted} className="mt-6 rounded-full bg-brand-green hover:bg-brand-green/80 text-white px-8">
        {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</> : submitted ? <><Check className="w-4 h-4 mr-2" />Quote Requested!</> : "Request Quote"}
      </Button>
    </form>
  );
}
