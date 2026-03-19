"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Check, Server, Shield, Zap, Users, Database, Globe, ArrowRight, Loader2 } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

interface WindowsEdition {
  edition: "Standard" | "Datacenter";
  description: string;
  features: string[];
  useCases: string[];
}

const editions: WindowsEdition[] = [
  {
    edition: "Standard",
    description: "Perfect for small to medium businesses with limited virtualisation needs",
    features: [
      "2 Virtual Machines or Containers",
      "Active Directory Domain Services",
      "DNS, DHCP, File Services",
      "Web Server (IIS)",
      "Remote Desktop Services",
      "PowerShell automation",
    ],
    useCases: ["Small business file servers", "Web hosting with IIS", "Active Directory", "Application hosting"],
  },
  {
    edition: "Datacenter",
    description: "Enterprise-grade solution with unlimited virtualisation and advanced features",
    features: [
      "Unlimited Virtual Machines",
      "Storage Replica & Spaces Direct",
      "Shielded VMs & Host Guardian",
      "Software-Defined Networking",
      "Network Controller",
      "All Standard Edition features",
    ],
    useCases: ["Large-scale virtualisation", "Hyper-V clusters", "Software-defined datacenter", "Mission-critical workloads"],
  },
];

const generalFeatures = [
  { icon: Shield,   title: "Enterprise Security",  desc: "Windows Defender, BitLocker, and Credential Guard included" },
  { icon: Zap,      title: "High Performance",     desc: "Optimised for demanding workloads with latest hardware support" },
  { icon: Users,    title: "Remote Desktop",       desc: "Built-in RDS for seamless remote access and management" },
  { icon: Database, title: "Storage Flexibility",  desc: "Storage Spaces, ReFS, and data deduplication support" },
  { icon: Globe,    title: "Hybrid Cloud Ready",   desc: "Seamless Azure integration for hybrid cloud scenarios" },
  { icon: Server,   title: "Container Support",    desc: "Native Windows and Linux containers with Docker integration" },
];

export default function WindowsServerPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-6 w-full bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Windows Server<br />
              <span className="text-primary">Enterprise-Grade Hosting</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              Fully managed Windows Server on powerful dedicated hardware. Licensed, supported, and configured to your exact requirements.
            </p>
          </div>

          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <Image src="/images/windows.png" alt="Windows" width={28} height={28} className="object-contain" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  Run <strong>ASP.NET, MSSQL, IIS</strong> and the full Microsoft stack on bare-metal hardware.
                </h2>
                <p className="text-white/60 text-sm">
                  Genuine Microsoft licences, fully managed setup, and expert support from day one.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/325229/pexels-photo-325229.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-xl mb-1 font-bold text-white">2 Editions</h2>
                <p className="text-white text-sm mb-3">Standard & Datacenter</p>
                <h2 className="text-xl mb-1 font-bold text-white">Fully Managed</h2>
                <p className="text-white text-sm">Setup & ongoing support</p>
              </div>
            </div>

            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Shield className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">Microsoft Licensed</h2>
                <p className="text-white/80 text-xs max-w-[160px]">
                  Genuine licences included. No grey-market keys, no compliance risk.
                </p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">ASP.NET</div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">MSSQL</div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">IIS</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Editions ── */}
      <div className="w-full max-w-[1100px] mx-auto border-x border-border/60">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Choose Your Edition</h2>
          <p className="text-muted-foreground text-sm max-w-md">Both editions run on dedicated Hetzner hardware with full root access</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
          {editions.map((ed, i) => (
            <div key={ed.edition} className={`p-8 lg:p-12 flex flex-col gap-6 ${i === 1 ? "bg-primary" : "bg-background"}`}>
              <div className="flex items-center gap-3">
                <Image src="/images/windows.png" alt="Windows" width={28} height={28} className="object-contain" />
                <div>
                  <p className={`text-xs font-semibold uppercase tracking-wider ${i === 1 ? "text-white/60" : "text-muted-foreground"}`}>Windows Server</p>
                  <p className={`font-bold text-lg ${i === 1 ? "text-white" : "text-foreground"}`}>{ed.edition}</p>
                </div>
              </div>
              <p className={`text-sm ${i === 1 ? "text-white/70" : "text-muted-foreground"}`}>{ed.description}</p>
              <ul className="flex flex-col gap-2">
                {ed.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm">
                    <Check className={`w-4 h-4 mt-0.5 flex-shrink-0 ${i === 1 ? "text-white/70" : "text-brand-green"}`} />
                    <span className={i === 1 ? "text-white/80" : ""}>{f}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-1.5">
                {ed.useCases.map((u) => (
                  <span key={u} className={`text-[11px] px-2 py-1 rounded ${i === 1 ? "bg-white/10 text-white/70" : "bg-muted text-muted-foreground"}`}>{u}</span>
                ))}
              </div>
              <a href="#quote-form" className="mt-auto">
                <Button className={`rounded-full w-full gap-1.5 ${i === 1 ? "bg-white text-primary hover:bg-white/90" : "border border-border bg-background text-foreground hover:bg-brand-green hover:text-white hover:border-brand-green"}`}>
                  Get Quote <ArrowRight className="w-3.5 h-3.5" />
                </Button>
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Windows Server ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Why Windows Server?</h2>
          <p className="text-muted-foreground text-sm max-w-md">The platform trusted by enterprises worldwide</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {generalFeatures.map(({ icon: Icon, title, desc }) => (
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

      {/* ── Quote Form ── */}
      <div id="quote-form" className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Request a Quote</h2>
          <p className="text-muted-foreground text-sm max-w-md">Fill out the form and our team will get back to you within 24 hours with a custom quote.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
          <div className="p-8 lg:p-12 bg-background">
            <QuoteForm />
          </div>
          <div className="relative min-h-[400px] overflow-hidden bg-primary/50">
            <div
              className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg')] bg-cover bg-center"
              style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
            />
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
            />
            <div className="relative z-10 p-10 flex flex-col justify-end h-full">
              <p className="text-white font-bold text-xl mb-2">Custom configurations available</p>
              <p className="text-white/60 text-sm">Our team will design the perfect Windows Server setup for your workload and budget.</p>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function QuoteForm() {
  const [formData, setFormData] = useState({ name: "", email: "", company: "", edition: "", cpu: "", ram: "", storage: "", location: "", additionalRequirements: "" });
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
          product: "Windows Server",
          details: { Edition: formData.edition, CPU: formData.cpu, RAM: formData.ram, Storage: formData.storage, Location: formData.location, "Additional Requirements": formData.additionalRequirements },
        }),
      });
      setSubmitted(true);
      setTimeout(() => { setSubmitted(false); setFormData({ name: "", email: "", company: "", edition: "", cpu: "", ram: "", storage: "", location: "", additionalRequirements: "" }); }, 3000);
    } catch { /* ignore */ }
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const selectClass = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input name="name" placeholder="Full Name *" value={formData.name} onChange={handleChange} required />
        <Input name="email" type="email" placeholder="Email Address *" value={formData.email} onChange={handleChange} required />
        <Input name="company" placeholder="Company Name" value={formData.company} onChange={handleChange} />
        <select name="edition" value={formData.edition} onChange={handleChange} required className={selectClass}>
          <option value="">Select Edition *</option>
          <option value="standard">Windows Server Standard</option>
          <option value="datacenter">Windows Server Datacenter</option>
        </select>
        <Input name="cpu" placeholder="CPU Requirements (e.g. 8 cores)" value={formData.cpu} onChange={handleChange} />
        <Input name="ram" placeholder="RAM Requirements (e.g. 32 GB)" value={formData.ram} onChange={handleChange} />
        <Input name="storage" placeholder="Storage (e.g. 1 TB SSD)" value={formData.storage} onChange={handleChange} />
        <select name="location" value={formData.location} onChange={handleChange} className={selectClass}>
          <option value="">Preferred Location</option>
          <option value="FSN1">Germany (Falkenstein)</option>
          <option value="HEL1">Finland (Helsinki)</option>
          <option value="any">Any Location</option>
        </select>
      </div>
      <Textarea name="additionalRequirements" placeholder="Additional Requirements (optional)" value={formData.additionalRequirements} onChange={handleChange} className="mt-4" rows={4} />
      <Button type="submit" disabled={submitting || submitted} className="mt-6 rounded-full bg-brand-green hover:bg-brand-green/80 text-white px-8">
        {submitting ? <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Submitting…</> : submitted ? <><Check className="w-4 h-4 mr-2" />Quote Requested!</> : "Request Quote"}
      </Button>
    </form>
  );
}
