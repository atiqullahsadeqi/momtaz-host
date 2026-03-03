"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Check,
  Server,
  Shield,
  Zap,
  Users,
  Database,
  Globe,
  ArrowRight,
  Loader2,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

// ─── Types ────────────────────────────────────────────────────────────────────
interface WindowsEdition {
  name: string;
  edition: "Standard" | "Datacenter";
  description: string;
  features: string[];
  useCases: string[];
  startingPrice: string;
}

const editions: WindowsEdition[] = [
  {
    name: "Windows Server Standard",
    edition: "Standard",
    description:
      "Perfect for small to medium businesses with limited virtualization needs",
    features: [
      "2 Virtual Machines (VMs) or Containers",
      "Active Directory Domain Services",
      "DNS, DHCP, File Services",
      "Web Server (IIS)",
      "Remote Desktop Services",
      "PowerShell automation",
    ],
    useCases: [
      "Small business file servers",
      "Web hosting with IIS",
      "Active Directory domain controller",
      "Application hosting",
    ],
    startingPrice: "Contact for pricing",
  },
  {
    name: "Windows Server Datacenter",
    edition: "Datacenter",
    description:
      "Enterprise-grade solution with unlimited virtualization and advanced features",
    features: [
      "Unlimited Virtual Machines",
      "Storage Replica & Spaces Direct",
      "Shielded VMs & Host Guardian",
      "Software-Defined Networking",
      "Network Controller",
      "All Standard Edition features",
    ],
    useCases: [
      "Large-scale virtualization",
      "Hyper-V clusters",
      "Software-defined datacenter",
      "Mission-critical workloads",
    ],
    startingPrice: "Contact for pricing",
  },
];

const generalFeatures = [
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Advanced security features including Windows Defender, BitLocker, and Credential Guard",
  },
  {
    icon: Zap,
    title: "High Performance",
    description:
      "Optimized for demanding workloads with support for the latest hardware",
  },
  {
    icon: Users,
    title: "Remote Desktop",
    description:
      "Built-in Remote Desktop Services for seamless remote access and management",
  },
  {
    icon: Database,
    title: "Storage Flexibility",
    description:
      "Support for Storage Spaces, ReFS, and data deduplication",
  },
  {
    icon: Globe,
    title: "Hybrid Cloud Ready",
    description:
      "Seamless integration with Azure for hybrid cloud scenarios",
  },
  {
    icon: Server,
    title: "Container Support",
    description:
      "Native Windows and Linux container support with Docker integration",
  },
];

// ─── Edition Card ─────────────────────────────────────────────────────────────
function EditionCard({ edition }: { edition: WindowsEdition }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={cardRef}
      className="edition-card relative rounded-2xl border border-white/10 bg-card overflow-hidden
                  transition-all duration-300 hover:border-primary/30"
    >
      <div className="p-6 flex flex-col h-full">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-2">
            <Image
              src="/images/windows.png"
              alt="Windows Server"
              width={32}
              height={32}
              className="object-contain"
            />
            <Badge
              className={`${
                edition.edition === "Datacenter"
                  ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
                  : "bg-green-500/20 text-green-400 border-green-500/30"
              }`}
            >
              {edition.edition}
            </Badge>
          </div>
          <h3 className="text-xl font-bold mb-2">{edition.name}</h3>
          <p className="text-sm text-muted-foreground">{edition.description}</p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
            Key Features
          </h4>
          <ul className="space-y-2">
            {edition.features.map((feature, i) => (
              <li key={i} className="flex items-start gap-2 text-sm">
                <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Use Cases */}
        <div className="mb-6">
          <h4 className="text-xs font-semibold uppercase tracking-wider mb-3">
            Ideal For
          </h4>
          <div className="flex flex-wrap gap-1.5">
            {edition.useCases.map((useCase, i) => (
              <span
                key={i}
                className="text-[11px] bg-muted/20 px-2 py-1 rounded"
              >
                {useCase}
              </span>
            ))}
          </div>
        </div>

        {/* Price */}
        <div className="mt-auto pt-4 border-t border-white/10">
          <p className="text-xs text-muted-foreground mb-3">
            {edition.startingPrice}
          </p>
          <a href="#quote-form">
            <Button className="w-full bg-secondary" size="sm">
              Get Quote
              <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}

// ─── Quote Form ───────────────────────────────────────────────────────────────
function QuoteForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    edition: "",
    cpu: "",
    ram: "",
    storage: "",
    location: "",
    additionalRequirements: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setSubmitting(false);
    setSubmitted(true);

    // Reset form after 3 seconds
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: "",
        email: "",
        company: "",
        edition: "",
        cpu: "",
        ram: "",
        storage: "",
        location: "",
        additionalRequirements: "",
      });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-white/10 bg-card p-6"
    >
      <h3 className="text-xl font-bold mb-4">Request a Quote</h3>
      <p className="text-sm text-muted-foreground mb-6">
        Fill out the form below and our team will contact you with a custom
        quote within 24 hours.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Contact Info */}
        <Input
          name="name"
          placeholder="Full Name *"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Email Address *"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Input
          name="company"
          placeholder="Company Name"
          value={formData.company}
          onChange={handleChange}
        />

        {/* Server Requirements */}
        <select
          name="edition"
          value={formData.edition}
          onChange={handleChange}
          required
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Select Edition *</option>
          <option value="standard">Windows Server Standard</option>
          <option value="datacenter">Windows Server Datacenter</option>
        </select>

        <Input
          name="cpu"
          placeholder="CPU Requirements (e.g., 8 cores)"
          value={formData.cpu}
          onChange={handleChange}
        />
        <Input
          name="ram"
          placeholder="RAM Requirements (e.g., 32 GB)"
          value={formData.ram}
          onChange={handleChange}
        />
        <Input
          name="storage"
          placeholder="Storage Requirements (e.g., 1 TB SSD)"
          value={formData.storage}
          onChange={handleChange}
        />
        <select
          name="location"
          value={formData.location}
          onChange={handleChange}
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <option value="">Preferred Location</option>
          <option value="FSN1">Germany (Falkenstein)</option>
          <option value="HEL1">Finland (Helsinki)</option>
          <option value="any">Any Location</option>
        </select>
      </div>

      <Textarea
        name="additionalRequirements"
        placeholder="Additional Requirements (optional)"
        value={formData.additionalRequirements}
        onChange={handleChange}
        className="mt-4"
        rows={4}
      />

      <Button
        type="submit"
        disabled={submitting || submitted}
        className="w-full mt-6 bg-secondary"
      >
        {submitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : submitted ? (
          <>
            <Check className="w-4 h-4 mr-2" />
            Quote Requested!
          </>
        ) : (
          "Request Quote"
        )}
      </Button>
    </form>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function WindowsServerPage() {
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          delay: 0.1,
        }
      );
      gsap.fromTo(
        ".edition-card",
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.15,
          duration: 0.6,
          ease: "power2.out",
          delay: 0.4,
        }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative pt-24 pb-16 px-6 w-full mx-auto bg-muted/80"
      >
        <div className="max-w-6xl mx-auto text-center">
          <div className="hero-line flex items-center justify-center gap-3 mb-4">
            <Image
              src="/images/windows.png"
              alt="Windows Server"
              width={48}
              height={48}
              className="object-contain"
            />
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">
              Windows Server
            </h1>
          </div>
          <p className="hero-line text-xl max-w-2xl mx-auto mb-6">
            Enterprise-grade Windows Server hosting on powerful Hetzner
            dedicated hardware
          </p>
          <div className="hero-line flex items-center justify-center gap-3 flex-wrap">
            <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
              Fully Managed
            </Badge>
            <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
              Licensed & Supported
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
              Custom Configurations
            </Badge>
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Editions */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Choose Your Edition
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {editions.map((edition) => (
              <EditionCard key={edition.edition} edition={edition} />
            ))}
          </div>
        </section>

        {/* General Features */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Why Windows Server?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {generalFeatures.map((feature, i) => (
              <div
                key={i}
                className="rounded-xl border border-white/10 bg-card p-5 hover:border-primary/30 transition-colors"
              >
                <div className="w-10 h-10 rounded-lg bg-muted/20 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <h3 className="font-semibold mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Quote Form */}
        <section id="quote-form">
          <QuoteForm />
        </section>
      </div>
    </div>
  );
}
