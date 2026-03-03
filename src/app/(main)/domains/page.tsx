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
import { Globe, Shield, Gift, Headphones, Loader2, Search, Mail, MessageCircleWarning } from "lucide-react";
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
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Free domain name",
      description: "Get a free domain when you purchase hosting with us",
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: ".af Partner",
      description:
        "We are a .af partner, we can register .af domains for you in just a few clicks",
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
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
      resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
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

        setSearchResults([mainResult, ...altResults.filter(Boolean)]);
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
    <div className="min-h-screen">
      {/* Hero Section - Domain Search */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl  font-bold mb-6">
              Search for a domain name
            </h1>
            <p className="text-sm  mb-8 opacity-90">
              Find your perfect domain name and make it yours.
            </p>

            {/* Domain Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center rounded-full bg-card overflow-hidden py-1 pr-4">
                <Input
                  type="text"
                  placeholder="Enter your domain name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 px-6 py-3 text-sm border-0 transparent focus:outline-none focus:ring-0 text-muted-foreground placeholder:text-muted-foreground"
                />
                <Button
                  variant="default"
                  size="icon"
                  className=" rounded-full -mr-2"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Search />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-foreground dark:bg-[#333333] p-10 md:col-span-2 min-h-80 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12  mb-4 p-2 rounded-sm bg-primary flex items-center justify-center">
                <Mail className=" text-popover" />
              </div>
              <div>
                <h2 className="text-2xl mb-2  text-white leading-tight">Register <strong>.com</strong> domain and get up to <strong>50% discount</strong> for 1st year.</h2>
                <p className="text-white/80 text-sm">Applicable when you register with a 3-year term. Standard rates at renewal after 1st year.</p>
              </div>
            </div>
            <div className="relative w-full min-h-80 rounded-2xl overflow-hidden bg-primary/50">
              {/* The Background Image Layer */}
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3183155/pexels-photo-3183155.jpeg')] bg-cover bg-center"
                style={{
                  // Mask: Solid at the top (100%), Transparent at the bottom (0%)
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
              />

              {/* The Blur Overlay Layer */}
              <div className="absolute inset-0 backdrop-blur-md"
                style={{
                  // Inverse Mask: Transparent at the top (keep subject sharp), Solid at bottom (blur background)
                  maskImage: 'linear-gradient(to bottom, transparent 20%, white 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, white 100%)'
                }}
              />

              {/* Content Layer (Moved to top for readability) */}
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-1xl mb-2 font-bold text-white leading-tight">1K+</h2>
                <p className="text-white text-sm mb-3">Registered domains.</p>
                <h2 className="text-1xl mb-2 font-bold text-white leading-tight">100+</h2>
                <p className="text-white text-sm">Support tlds</p>
              </div>
            </div>
            <div className="relative bg-primary p-4 rounded-2xl min-h-80 overflow-hidden group">
              {/* Content Layer */}
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">.af Partner</h2>
                <p className="text-white/80 text-xs max-w-[180px]">
                  We are a .af partner, we can register .af domains for you in just a few clicks
                </p>
              </div>

              {/* Floating Badges Container */}
              <div className="absolute inset-0 z-10 pointer-events-none w-[280px]">
                {/* 2FA Badge */}
                <div className="absolute bottom-8 left-13 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">
                  .af - .com.af
                </div>

                {/* SAML Badge */}
                <div className="absolute bottom-12 right-16 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-18 border border-slate-200">
                  .org.af
                </div>

                {/* DLP Badge */}
                <div className="absolute bottom-2 right-20 px-5 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">
                  .edu.af
                </div>

                {/* Encryption Badge */}
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-2xl -rotate-[30deg] border border-white/20 opacity-90">
                  .net.af
                </div>
              </div>

              {/* Subtle Background Glow for Premium Feel */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Domain search result */}
      {showResults && (
        <section ref={resultsRef} className="py-20 ">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-6 max-w-6xl mx-auto">

              {isSearching ? (
                <div className="flex items-center bg-muted/30 justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : searchResults.length > 0 && searchResults[0].available ? (
                <div className="grid grid-cols-1  gap-4">
                  <div className="bg-muted/30 p-6 rounded-lg flex justify-center flex-col items-center gap-2">
                    <Badge variant="default" className="px-3 py-1 text-sm">
                      Perfect Match
                    </Badge>
                    <h1 className="text-2xl md:text-4xl font-bold mt-2">{searchResults[0].domain.includes('.') ? searchResults[0].domain : `${searchResults[0].domain}.com`}</h1>
                    <p className="mt-2"><strong>is available</strong> for  {searchResults[0].price && (
                       <strong>
                          ${searchResults[0].price.toFixed(2)}/year
                       </strong>
                      )} for the first year!</p>
                      <Button className="mt-4" size="lg" onClick={() => router.push(`/checkout?domain=${searchResults[0].domain}`)}>
                        Continue
                      </Button>
                  </div>
                </div>
              ) : (
                <Alert className="mb-4 py-6 bg-muted/30 border-none max-w-2xl mx-auto">
                  <AlertTitle className="text-lg flex gap-1 justify-center"><strong className="flex gap-1 justify-center"> <MessageCircleWarning /> {searchResults[0].domain.includes('.') ? searchResults[0].domain : `${searchResults[0].domain}.com`} is already taken.</strong>  Please search for alternatives!</AlertTitle>

                </Alert>
              )}

            </div>
          </div>
        </section>
      )}

      <section className="pb-20 bg-background">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why buy domain names <br /> at Momtaz Host?
          </h2>
        </div>
        <div className="container mx-auto px-4  rounded-lg grid grid-cols-3 gap-16">
          <div className="relative w-full min-h-100 rounded-2xl overflow-hidden bg-primary/50 col-span-2 ">
            {/* The Background Image Layer */}
            <div
              className="absolute inset-0 bg-[url('https://images.pexels.com/photos/17011082/pexels-photo-17011082.jpeg')] bg-cover bg-center"
              style={{
                // Mask: Solid at the top (100%), Transparent at the bottom (0%)
                maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
              }}
            />

            {/* The Blur Overlay Layer */}
            <div className="absolute inset-0 backdrop-blur-md"
              style={{
                // Inverse Mask: Transparent at the top (keep subject sharp), Solid at bottom (blur background)
                maskImage: 'linear-gradient(to bottom, transparent 20%, white 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, white 100%)'
              }}
            />

            {/* Content Layer (Moved to top for readability) */}
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <h2 className="text-3xl mb-2 font-bold text-white leading-tight">Trusted domain registrar in Afghanistan</h2>
              <p className="text-white/80 text-sm">Momtaz Host is an AFGNIC-accredited registrar and offers all .af extensions alongside 100+ global domains.</p>
            </div>
          </div>
          <div className="bg-primary min-h-100 rounded-2xl">
            <div className="relative z-10 p-8 flex flex-col justify-end h-full">
              <h2 className="text-3xl mb-2 font-bold text-white leading-tight">Privacy</h2>
              <p className="text-white/80 text-sm">Momtaz Host is an AFGNIC-accredited registrar and offers all .af extensions alongside 100+ global domains.</p>
            </div>
          </div>
        </div>
      </section>


      {/* Choose from Popular Domains */}
      <section className="py-20 bg-muted text-white overflow-hidden">
        <div className="container mx-auto px-6">
          {/* Header with Navigation */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h2 className="text-foreground text-4xl md:text-5xl font-bold mb-4 max-w-md leading-tight ">
                Choose from the most popular domains
              </h2>

            </div>

            <div className="flex gap-2">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white/5 hover:bg-white/10 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>

          {/* Draggable/Scrollable Container */}
          <div
            ref={sliderRef}
            className="flex gap-6 overflow-x-hidden scrollbar-hide py-4"
            style={{ scrollBehavior: 'auto' }}
          >
            {popularDomains.map((domain, index) => (
              <Card
                key={index}
                className="min-w-[300px] text-black rounded-2xl p-8 flex flex-col justify-between shadow-none"
              >
                <CardHeader>
                  <h3 className="text-foreground text-3xl font-bold mb-3">{domain.name}</h3>
                  <p className="text-muted-foreground text-[15px] leading-relaxed mb-8">
                    {domain.description}
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="mb-4">

                    <span className="text-2xl font-bold text-foreground">
                      {domain.price}
                    </span>
                    <span className="text-muted-foreground text-sm">/year</span>
                  </div>

                  <button className="w-full py-3 px-4 bg-[#111] text-white font-bold rounded-lg hover:bg-black transition-colors">
                    Check availability
                  </button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TLD Pricing Table */}
      <TLDPricingTable />

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Domain name search FAQs
            </h2>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b"
                >
                  <AccordionTrigger className="text-left hover:no-underline">
                    <span className="font-semibold">{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
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
