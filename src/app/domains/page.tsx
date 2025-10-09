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
import { Globe, Shield, Gift, Headphones, Loader2 } from "lucide-react";
import Link from "next/link";
import LogoLoop from "@/components/LogoLoop";
import { useState, useEffect } from "react";
import DomainAvailabilityModal from "@/components/domain-availability-modal";

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

export default function DomainsPage() {
  const [domainPricing, setDomainPricing] = useState<DomainPrice[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<DomainAvailability[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [showResultsModal, setShowResultsModal] = useState(false);
  const [searchedDomain, setSearchedDomain] = useState("");
  const [availableTlds, setAvailableTlds] = useState<string[]>([]);

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

  const fadeOutColor = isDark ? "#382e29" : "#f5eae3";

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
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    setSearchedDomain(searchTerm);
    setShowResultsModal(true);
    
    try {
      const response = await fetch(
        `/api/domains/check?domain=${encodeURIComponent(searchTerm)}`
      );
      const data = await response.json();
      
      if (data.success) {
        setSearchResults(data.data.results);
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

  const getPriceForTld = (tld: string) => {
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
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl text-primary-foreground font-bold mb-6">
              Search for a domain name
            </h1>
            <p className="text-sm text-primary-foreground mb-8 opacity-90">
              Find your perfect domain name and make it yours.
            </p>

            {/* Domain Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex items-center justify-center rounded-lg border border-secondary overflow-hidden py-1 pr-4">
                <Input
                  type="text"
                  placeholder="Enter your domain name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                  className="flex-1 px-6 py-4 text-sm border-0 transparent focus:outline-none focus:ring-0 text-primary-foreground placeholder:text-primary-foreground"
                />
                <Button
                  variant="secondary"
                  size="lg"
                  className="px-8 py-4 text-sm"
                  onClick={handleSearch}
                  disabled={isSearching}
                >
                  {isSearching ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    "Search"
                  )}
                </Button>
              </div>
            </div>

            {/* Popular TLDs */}
            <div className="flex flex-wrap justify-center gap-2">
              {isLoading ? (
                <span className="text-sm text-primary-foreground">
                  Loading prices...
                </span>
              ) : (
                popularDomains.slice(0, 8).map((domain, index) => (
                  <span key={index} className="text-sm text-primary-foreground">
                    {domain.name} {domain.price}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Choose from Popular Domains */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose from the most popular domains
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDomains.map((domain, index) => (
              <Card
                key={index}
                className="transition-transform duration-300 hover:-translate-y-1 shadow-none border-primary/20"
              >
                <CardHeader className="text-left">
                  <CardTitle className="text-sm font-bold">
                    {domain.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {domain.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-left space-y-2">
                  <div className="text-2xl font-bold text-primary">
                    USD {domain.price}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 bg-primary/10 rounded-lg ">
          <div className="min-h-100 w-full relative overflow-hidden flex items-center justify-center">
            {/* Dashed Bottom Fade Grid */}
            <div
              className="absolute inset-0 z-0 -bottom-50"
              style={{
                backgroundImage: `
                        linear-gradient(to right, var(--primary) 1px, transparent 1px),
                        linear-gradient(to bottom, var(--primary) 1px, transparent 1px)
                      `,
                backgroundSize: "20px 20px",
                backgroundPosition: "0 0, 0 0",
                maskImage: `
                        repeating-linear-gradient(
                              to right,
                              black 0px,
                              black 3px,
                              transparent 3px,
                              transparent 8px
                            ),
                            repeating-linear-gradient(
                              to bottom,
                              black 0px,
                              black 3px,
                              transparent 3px,
                              transparent 8px
                            ),
                            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                      `,
                WebkitMaskImage: `
                        repeating-linear-gradient(
                                    to right,
                                    black 0px,
                                    black 3px,
                                    transparent 3px,
                                    transparent 8px
                                  ),
                                  repeating-linear-gradient(
                                    to bottom,
                                    black 0px,
                                    black 3px,
                                    transparent 3px,
                                    transparent 8px
                                  ),
                            radial-gradient(ellipse 100% 80% at 50% 100%, #000 50%, transparent 90%)
                      `,
                maskComposite: "intersect",
                WebkitMaskComposite: "source-in",
              }}
            />
            <div className="text-center ">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                What about getting a free domain?
              </h2>
              <p className="text-sm text-muted-foreground">
                Get a free domain when you purchase hosting with us
              </p>
              <Button className="mt-4" size="lg" variant="default">
                <Link href="/hosting/shared">Get a free domain</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why buy domain names at Momtaz Host?
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="text-center shadow-none border-none">
                <CardHeader>
                  <div className="h-12 w-12 mx-auto mb-4 p-2 rounded-sm bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-sm font-bold">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-sm">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TLD List */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore the possibilities from our TLD list
            </h2>
          </div>

          <div className="space-y-4">
            {/* First LogoLoop - Left direction */}
            {tldsList1.length > 0 && (
              <LogoLoop
                logos={tldsList1}
                speed={40}
                direction="left"
                logoHeight={30}
                gap={10}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor={fadeOutColor}
                ariaLabel="Available TLDs - Part 1"
              />
            )}

            {/* Second LogoLoop - Right direction, slower speed */}
            {tldsList2.length > 0 && (
              <LogoLoop
                logos={tldsList2}
                speed={20}
                direction="right"
                logoHeight={30}
                gap={10}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor={fadeOutColor}
                ariaLabel="Available TLDs - Part 2"
              />
            )}

            {/* Third LogoLoop - Left direction */}
            {tldsList3.length > 0 && (
              <LogoLoop
                logos={tldsList3}
                speed={30}
                direction="left"
                logoHeight={30}
                gap={10}
                pauseOnHover
                scaleOnHover
                fadeOut
                fadeOutColor={fadeOutColor}
                ariaLabel="Available TLDs - Part 3"
              />
            )}
          </div>
        </div>
      </section>

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

      {/* Domain Availability Modal */}
      <DomainAvailabilityModal
        isOpen={showResultsModal}
        onClose={() => setShowResultsModal(false)}
        results={searchResults}
        searchedDomain={searchedDomain}
        isLoading={isSearching}
      />
    </div>
  );
}
