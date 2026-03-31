"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Confetti, type ConfettiRef } from "@/components/ui/confetti";
import { Globe, Shield, Gift, Headphones, Loader2, Search, Mail, MessageCircleWarning, CheckCircle } from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import Link from "next/link";
import LogoLoop from "@/components/LogoLoop";
import { useState, useEffect, useMemo, Suspense, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { gsap } from 'gsap';
import TLDPricingTable from "@/components/TLDPricingTable";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface DomainPrice {
  tld: string;
  price: number;
  currency: string;
}

interface DomainAvailability {
  domain: string;
  available: boolean;
  price?: number;
}

// fadeOutColor is computed client-side inside the component to avoid SSR document access

function DomainsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [domainPricing, setDomainPricing] = useState<DomainPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [searchedDomain, setSearchedDomain] = useState("");
  const [availableTlds, setAvailableTlds] = useState<string[]>([]);
  const [hasAutoSearched, setHasAutoSearched] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef<HTMLDivElement>(null);
  const confettiRef = useRef<ConfettiRef>(null);
  const sliderRef = useRef<HTMLDivElement>(null);



  // Get domain param - memoized to avoid re-renders
  const domainParam = useMemo(() => searchParams?.get("domain") || "", [searchParams]);

  useEffect(() => {
    const updateTheme = () => {
      if (typeof document !== "undefined") {
        setIsDark(document.documentElement.classList.contains("dark"));
      }
    };

    // Initial check
    updateTheme();

    // Listen for theme changes
    const observer = new MutationObserver(updateTheme);
    if (typeof document !== "undefined") {
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    return () => observer.disconnect();
  }, []);

  const fadeOutColor = isDark ? "#1a1d23" : "#f9f9fa";

  const popularTlds = [
    "com",
    "af",
    "net",
    "org",
    "online",
    "store",
    "shop",
    "xyz",
  ];

  // Fetch domain pricing on component mount
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Fetch pricing for popular TLDs
        const pricingResponse = await fetch(
          `/api/domains/pricing?tlds=${popularTlds.join(",")}`
        );
        const pricingData = await pricingResponse.json();
        if (pricingData.success) {
          setDomainPricing(pricingData.data);
        }

        // Fetch all available TLDs
        const tldsResponse = await fetch('/api/domains/tlds');
        const tldsData = await tldsResponse.json();
        if (tldsData.success) {
          setAvailableTlds(tldsData.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  console.log(domainPricing);

  const handleSearch = async () => {
    const trimmed = searchTerm.trim();
    if (!trimmed) return;

    router.replace("/domains", undefined);
    performSearch(trimmed);
  };

  const getPriceForTld = (tld: string) => {
    // Hardcode .af price since it's not in DNA API
    if (tld === 'af') {
      return '$29.99';
    }

    if (!domainPricing || domainPricing.length === 0) {
      return "Loading...";
    }
    const pricing = domainPricing.find((p) => p.tld === tld);
    return pricing ? `$${pricing.price.toFixed(2)}` : "Loading...";
  };

  const popularDomains = popularTlds.map((tld) => ({
    name: `.${tld}`,
    price: getPriceForTld(tld),
    description: getDescriptionForTld(tld),
    icon: <Globe className="h-6 w-6" />,
  }));

  function getDescriptionForTld(tld: string): string {
    const descriptions: Record<string, string> = {
      com: "Most popular choice for businesses",
      af: "Perfect for Afghan businesses",
      net: "Great for technology companies",
      org: "Ideal for organizations",
      online: "Perfect for digital presence",
      store: "Built for e-commerce",
      shop: "Designed for online stores",
      xyz: "Creative and modern",
    };
    return descriptions[tld] || "Great choice for your website";
  }

  type ScrollDirection = 'left' | 'right';

  const scroll = (direction: ScrollDirection) => {
    if (!sliderRef.current) return;
    const cardWidth = 320; // width + gap
    const currentScroll = sliderRef.current.scrollLeft;
    const targetScroll = direction === 'left'
      ? currentScroll - cardWidth
      : currentScroll + cardWidth;

    gsap.to(sliderRef.current, {
      scrollLeft: targetScroll,
      duration: 0.6,
      ease: "power2.out"
    });
  };

  const whyChooseUs = [
    {
      icon: Gift,
      title: "Free domain name",
      description: "Get a free domain when you purchase hosting with us",
    },
    {
      icon: Shield,
      title: ".af Partner",
      description:
        "We are a .af partner, we can register .af domains for you in just a few clicks",
    },
    {
      icon: Headphones,
      title: "24/7 customer support",
      description: "Our expert team is always here to help you",
    },
  ];

  const tldsList = availableTlds.map((tld) => ({
    node: (
      <Badge
        variant="outline"
        className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors"
      >
        .{tld}
      </Badge>
    ),
    alt: "",
    href: "#",
  }));

  // Divide TLDs into three parts for three LogoLoops
  const chunkSize = Math.ceil(tldsList.length / 3);
  const tldsList1 = tldsList.slice(0, chunkSize);
  const tldsList2 = tldsList.slice(chunkSize, chunkSize * 2);
  const tldsList3 = tldsList.slice(chunkSize * 2);

  // Handle auto-search from URL parameter
  useEffect(() => {
    if (domainParam && !hasAutoSearched && !isLoading) {
      setSearchTerm(domainParam);
      setHasAutoSearched(true);
      // Trigger search after a short delay to ensure other effects are ready
      setTimeout(() => {
        performSearch(domainParam);
      }, 500);
    }
  }, [domainParam, hasAutoSearched, isLoading]);

  const performSearch = async (domain: string) => {
    const trimmed = domain.trim();
    if (!trimmed) return;

    setIsSearching(true);
    setSearchedDomain(trimmed);
    setShowResults(true);
    setSearchResults([]);

    // Scroll to results section
    setTimeout(() => {
      if (resultsRef.current) { const top = resultsRef.current.getBoundingClientRect().top + window.scrollY - 80; window.scrollTo({ top, behavior: 'smooth' }); }
    }, 100);

    try {
      // Search main domain
      const response = await fetch(
        `/api/domains/check?domain=${encodeURIComponent(trimmed)}`
      );
      const data = await response.json();

      if (data.success) {
        const mainResult = data.data.results[0];
        const extractedDomain = data.data.extractedDomain;
        const searchedTld = data.data.extractedTld;

        // Search alternative TLDs
        const altTlds = ['com', 'net', 'org', 'store', 'online', 'shop'].filter(t => t !== searchedTld);
        const altResponse = await fetch(
          `/api/domains/check?domain=${extractedDomain}.${altTlds[0]}`
        );

        // Get all alternative results
        const altResults = await Promise.all(
          altTlds.map(async (tld) => {
            const res = await fetch(`/api/domains/check?domain=${extractedDomain}.${tld}`);
            const d = await res.json();
            return d.success ? d.data.results[0] : null;
          })
        );

        const results = [mainResult, ...altResults.filter(Boolean)];
        setSearchResults(results);
        if (mainResult?.available) setTimeout(() => confettiRef.current?.fire({}), 300);
      } else {
        console.error('Search failed:', data.error);
        setSearchResults([]);
      }
    } catch (error) {
      console.error("Error searching domains:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const faqs = [
    {
      question: "What is a domain name?",
      answer:
        "A domain name is the address of your website on the internet. It's what people type in their browser to visit your site, like 'momtazhost.com'. It's a human-readable way to access websites instead of using complex IP addresses.",
    },
    {
      question: "How do I register a domain name?",
      answer:
        "Registering a domain is simple! Just search for your desired domain name using our search tool, check if it's available, select your preferred extension (.com, .af, .net, etc.), and complete the registration process. We'll guide you through each step.",
    },
    {
      question: "What is a TLD?",
      answer:
        "TLD stands for Top-Level Domain. It's the part of the domain name that comes after the dot, like .com, .org, .net, or .af. Different TLDs serve different purposes - .com is for commercial sites, .org for organizations, and .af is perfect for Afghan businesses.",
    },
    {
      question: "How much does a domain cost?",
      answer:
        "Domain prices vary depending on the extension you choose. Our domains are competitively priced with no hidden fees. Check our pricing above for current rates.",
    },
    {
      question: "Can I transfer my domain?",
      answer:
        "Yes! You can easily transfer your existing domain to Momtaz Host. We provide free domain transfer services with zero downtime. Our team will handle the entire process for you, ensuring a smooth transition with better management tools and support.",
    },
  ];

  return (
    <div className="w-full flex flex-col items-center">

      {/* ── HERO — full-width bg-muted ── */}
      <section className="w-full bg-brand-blue pt-16 pb-12 px-6 relative overflow-hidden">
        {/* Noise overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-[20] opacity-[0.12]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.6' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            filter: 'contrast(100%) brightness(20%) grayscale(50%)',
            mixBlendMode: 'multiply',
          }}
        />
        <div className="max-w-[1100px] mx-auto relative z-10">
          <div className="mb-8 flex flex-col items-center gap-4 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1">
              <Globe className="h-3.5 w-3.5 text-white" />
              <AnimatedShinyText shimmerWidth={80} className="text-xs font-medium text-white/70 [--shiny-width:80px] bg-linear-to-r from-transparent via-white via-50% to-transparent">
                .af Partner
              </AnimatedShinyText>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-white">
              Find Your Perfect<br />
              <span className="text-white/60">Domain Name</span><span className="text-brand-green">.</span>
            </h1>
            <p className="text-white/70 max-w-xl text-sm leading-relaxed">
              Search, register, and manage your domain with Afghanistan&apos;s trusted registrar.
            </p>
          </div>

          {/* Search bar */}
          <div className="w-full mx-auto mb-10">
            <div className="flex items-center rounded-xl bg-white overflow-hidden shadow-lg">
              <Input
                type="text"
                placeholder="Enter your domain name"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-6 h-14 text-base border-0 bg-transparent focus:outline-none focus:ring-0"
              />
              <Button className="h-14 px-6 cursor-pointer rounded-none rounded-r-xl bg-brand-green hover:bg-brand-green/80 text-white font-medium" onClick={handleSearch} disabled={isSearching}>
                {isSearching ? <Loader2 className="h-4 w-4 animate-spin" /> : "Search"}
              </Button>
            </div>
            <p className="text-sm text-white/60 mt-3">See list of supported TLDs and prices <a href="#tld-pricing" className="text-brand-green hover:underline font-medium">click here</a></p>
          </div>
        </div>
      </section>

      {/* ── MAIN CONTAINER ── */}
      <section className="w-full relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── Search Results (conditional) ── */}
          {showResults && (
            <div ref={resultsRef} className="border-b border-border/60 relative overflow-hidden">
              {isSearching ? (
                <div className="flex items-center justify-center py-16"><Loader2 className="h-8 w-8 animate-spin text-primary" /></div>
              ) : searchResults.length > 0 && searchResults[0].available ? (
                <div className="p-10 lg:p-12 flex flex-col items-center gap-4 text-center bg-background">
                  <Confetti ref={confettiRef} className="absolute inset-0 w-full h-full pointer-events-none" />
                  <h2 className="text-2xl md:text-3xl font-bold">{searchResults[0].domain.includes(".") ? searchResults[0].domain : `${searchResults[0].domain}.com`}</h2>
                  <p className="text-muted-foreground text-sm">is available for {searchResults[0].price && <strong className="text-foreground">${searchResults[0].price.toFixed(2)}/year</strong>}</p>
                  <Button size="lg" className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white" onClick={() => router.push(`/domains/register/${encodeURIComponent(searchResults[0].domain)}?price=${searchResults[0].price ?? 0}`)}>Register Now</Button>
                </div>
              ) : searchResults.length > 0 ? (
                <div className="p-10 lg:p-12 flex flex-col items-center gap-3 text-center bg-primary">
                  <MessageCircleWarning className="h-8 w-8 text-white/60" />
                  <h2 className="text-lg font-bold text-white">{searchResults[0].domain.includes(".") ? searchResults[0].domain : `${searchResults[0].domain}.com`} is already taken.</h2>
                  <p className="text-sm text-white/60">Please search for an alternative domain name.</p>
                </div>
              ) : null}
            </div>
          )}

          {/* Why Momtaz Host header */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Why buy domains at Momtaz Host?</h2>
            <p className="text-muted-foreground text-sm max-w-xl leading-relaxed">
              Afghanistan&apos;s trusted registrar — AFGNIC-accredited with 100+ global TLDs.
            </p>
          </div>

          {/* Trusted registrar image + privacy card */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="md:col-span-2 relative min-h-[380px] overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/17011082/pexels-photo-17011082.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }} />
              <div className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }} />
              <div className="relative z-10 p-8 lg:p-10 flex flex-col justify-end h-full">
                <h2 className="text-2xl md:text-3xl font-bold text-white leading-tight mb-2">Trusted domain registrar in Afghanistan</h2>
                <p className="text-white/70 text-sm max-w-md">Momtaz Host is an AFGNIC-accredited registrar and offers all .af extensions alongside 100+ global domains.</p>
              </div>
            </div>
            <div className="bg-primary p-8 lg:p-10 flex flex-col justify-between min-h-[280px]">
              <div>
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                  <Shield className="h-5 w-5 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Privacy Protection</h3>
                <p className="text-white/60 text-sm leading-relaxed">Your personal information stays private. We shield your WHOIS data from spammers and marketers.</p>
              </div>
              <div className="flex flex-col gap-2 mt-6">
                {["WHOIS privacy", "Spam protection", "Data security"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-sm text-white/80">
                    <CheckCircle className="h-4 w-4 text-brand-green shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Why choose us — 3 cells */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            {whyChooseUs.map((item, i) => (
              <div key={i} className="bg-background p-8 lg:p-10 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                  <item.icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="font-bold text-foreground">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>

          {/* Popular domains slider */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex items-center justify-between">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Popular domains</h2>
              <p className="text-muted-foreground text-sm mt-1">Choose from the most popular TLDs</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => scroll("left")} className="p-2 rounded-full border border-border/60 hover:bg-muted transition-colors"><ChevronLeft size={20} /></button>
              <button onClick={() => scroll("right")} className="p-2 rounded-full border border-border/60 hover:bg-muted transition-colors"><ChevronRight size={20} /></button>
            </div>
          </div>
          <div ref={sliderRef} className="flex gap-px overflow-x-hidden bg-border/60 border-b border-border/60" style={{ scrollBehavior: "auto" }}>
            {popularDomains.map((domain, i) => (
              <div key={i} className="min-w-[260px] bg-background p-8 flex flex-col gap-3">
                <h3 className="text-3xl font-bold text-foreground">{domain.name}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed flex-1">{domain.description}</p>
                <div className="mt-2">
                  <span className="text-2xl font-bold text-foreground">{domain.price}</span>
                  <span className="text-muted-foreground text-sm">/year</span>
                </div>
                <button className="w-full py-2.5 px-4 bg-brand-green hover:bg-brand-green/80 text-white text-sm font-semibold rounded-full transition-colors">Check availability</button>
              </div>
            ))}
          </div>

          {/* TLD Pricing Table */}
          <div id="tld-pricing" className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">All Domain Extension Prices</h2>
            <p className="text-muted-foreground text-sm max-w-xl">Compare prices for all available domain extensions</p>
          </div>
          <TLDPricingTable />

          {/* FAQ */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Domain name FAQs</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
            <div className="bg-background p-8 lg:p-10 flex flex-col gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-brand-green">Got questions?</p>
              <p className="text-sm text-muted-foreground leading-relaxed mt-2">Everything you need to know about domain registration, transfers, and management.</p>
            </div>
            <div className="md:col-span-2 bg-background p-8 lg:p-10">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
                    <AccordionTrigger className="text-left hover:no-underline font-semibold">{faq.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground leading-relaxed">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>

        </div>
      </section>
     
    </div>
  );
}

export default function DomainsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <DomainsPageContent />
    </Suspense>
  );
}
