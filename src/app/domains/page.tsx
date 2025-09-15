"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { 
  Globe, 
  Search, 
  Shield, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  Star,
  Users,
  Zap,
  Lock,
  RefreshCw,
  Gift,
  Headphones,
  ArrowRightLeft,
  MapPin,
  Timer,
  Tag,
  Eye,
  Infinity
} from "lucide-react";
import Link from "next/link";

export default function DomainsPage() {
  const popularDomains = [
    { name: ".com", price: "$12.99", description: "Most popular choice for businesses", icon: <Globe className="h-6 w-6" /> },
    { name: ".af", price: "$8.99", description: "Perfect for Afghan businesses", icon: <Globe className="h-6 w-6" /> },
    { name: ".net", price: "$14.99", description: "Great for technology companies", icon: <Globe className="h-6 w-6" /> },
    { name: ".org", price: "$13.99", description: "Ideal for organizations", icon: <Globe className="h-6 w-6" /> },
    { name: ".online", price: "$9.99", description: "Perfect for digital presence", icon: <Globe className="h-6 w-6" /> },
    { name: ".store", price: "$7.99", description: "Built for e-commerce", icon: <Globe className="h-6 w-6" /> },
    { name: ".shop", price: "$6.99", description: "Designed for online stores", icon: <Globe className="h-6 w-6" /> },
    { name: ".xyz", price: "$5.99", description: "Creative and modern", icon: <Globe className="h-6 w-6" /> }
  ];

  const whyChooseUs = [
    {
      icon: <Gift className="h-8 w-8 text-primary" />,
      title: "Free domain name",
      description: "Get a free domain when you purchase hosting with us"
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Free domain privacy",
      description: "Protect your personal information at no extra cost"
    },
    {
      icon: <Headphones className="h-8 w-8 text-primary" />,
      title: "24/7 customer support",
      description: "Our expert team is always here to help you"
    }
  ];

  const domainTips = [
    { icon: <Tag className="h-6 w-6" />, tip: "Keep it short" },
    { icon: <Infinity className="h-6 w-6" />, tip: "Less is more" },
    { icon: <Star className="h-6 w-6" />, tip: "Include your brand name" },
    { icon: <Search className="h-6 w-6" />, tip: "Check availability" },
    { icon: <MapPin className="h-6 w-6" />, tip: "Think locally" },
    { icon: <Timer className="h-6 w-6" />, tip: "Act fast" }
  ];

  const tlds = [
    ".com", ".net", ".org", ".info", ".biz", ".online", ".store", ".tech", 
    ".site", ".space", ".website", ".app", ".blog", ".cloud", ".dev", 
    ".digital", ".email", ".expert", ".group", ".host", ".io", ".live", 
    ".me", ".media", ".news", ".photo", ".shop", ".solutions", ".studio", 
    ".team", ".today", ".top", ".vip", ".world", ".xyz", ".zone", ".af"
  ];

  const faqs = [
    {
      question: "What is a domain name?",
      answer: "A domain name is the address of your website on the internet. It's what people type in their browser to visit your site, like 'momtazhost.com'. It's a human-readable way to access websites instead of using complex IP addresses."
    },
    {
      question: "How do I register a domain name?",
      answer: "Registering a domain is simple! Just search for your desired domain name using our search tool, check if it's available, select your preferred extension (.com, .af, .net, etc.), and complete the registration process. We'll guide you through each step."
    },
    {
      question: "What is a TLD?",
      answer: "TLD stands for Top-Level Domain. It's the part of the domain name that comes after the dot, like .com, .org, .net, or .af. Different TLDs serve different purposes - .com is for commercial sites, .org for organizations, and .af is perfect for Afghan businesses."
    },
    {
      question: "How much does a domain cost?",
      answer: "Domain prices vary depending on the extension you choose. Our .com domains start at $12.99/year, .af domains at $8.99/year, and other extensions range from $5.99 to $14.99/year. We offer competitive pricing with no hidden fees."
    },
    {
      question: "Can I transfer my domain?",
      answer: "Yes! You can easily transfer your existing domain to Momtaz Host. We provide free domain transfer services with zero downtime. Our team will handle the entire process for you, ensuring a smooth transition with better management tools and support."
    },
    {
      question: "What is domain privacy protection?",
      answer: "Domain privacy protection (also called WHOIS privacy) hides your personal contact information from public databases. Without it, your name, address, phone number, and email are visible to anyone who looks up your domain. We provide this service for free with all our domains."
    },
    {
      question: "How long does domain registration last?",
      answer: "Domain registration typically lasts for one year, but you can register for multiple years (up to 10 years). We'll send you renewal reminders before your domain expires, and you can set up auto-renewal to ensure your domain never expires accidentally."
    },
    {
      question: "Can I change my domain name?",
      answer: "Once registered, you cannot change a domain name. However, you can register a new domain name and redirect the old one to the new one. We can help you set up domain forwarding to ensure your visitors are automatically directed to your new domain."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Domain Search */}
      <section className="py-20 bg-primary/70 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Search for a domain name
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Find your perfect domain name and make it yours.
            </p>
            
            {/* Domain Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <div className="flex gap-2">
                <Input 
                  placeholder="Search for your perfect domain name..." 
                  className="text-lg py-4 px-6 bg-white text-black placeholder:text-gray-500"
                />
                <Button size="lg" className="px-8 py-4 text-lg">
                  Search
                </Button>
              </div>
            </div>
            
            {/* Popular TLDs */}
            <div className="flex flex-wrap justify-center gap-2">
              {popularDomains.slice(0, 8).map((domain, index) => (
                <Badge key={index} variant="secondary" className="px-3 py-1 text-sm bg-white/10 text-white hover:bg-white/20">
                  {domain.name} {domain.price}
                </Badge>
              ))}
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularDomains.map((domain, index) => (
              <Card key={index} className="shadow-none transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 w-fit">
                    {domain.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-primary">
                    {domain.name}
                  </CardTitle>
                  <CardDescription className="text-sm">
                    {domain.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center space-y-4">
                  <div className="text-2xl font-bold text-foreground">
                    USD {domain.price}
                  </div>
                  <Button asChild className="w-full">
                    <Link href="/contact">
                      Register
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
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
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyChooseUs.map((feature, index) => (
              <Card key={index} className="text-center shadow-none">
                <CardHeader>
                  <div className="mx-auto mb-4 p-4 rounded-2xl bg-primary/10 w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          {/* Protect Privacy */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Shield className="h-20 w-20 text-gray-400 mx-auto" />
                  <p className="text-gray-500 text-lg">Privacy Protection</p>
                  <p className="text-gray-400 text-sm">Feature Image Placeholder</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold">Protect your privacy - for free</h3>
              <p className="text-lg text-muted-foreground">
                Keep your personal information private with our free domain privacy protection. 
                We'll hide your contact details from public WHOIS databases, protecting you from 
                spam and unwanted solicitations.
              </p>
              <Button asChild>
                <Link href="/contact">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Domain Transfer */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
            <div className="space-y-6">
              <h3 className="text-3xl font-bold">Purchased a domain already? Transfer it to Momtaz Host today</h3>
              <p className="text-lg text-muted-foreground">
                Transfer your existing domain to us and enjoy better management tools, 
                faster support, and competitive pricing. We'll handle the entire process 
                for you with zero downtime.
              </p>
              <Button asChild>
                <Link href="/contact">Transfer Domain</Link>
              </Button>
            </div>
            <div>
              <div className="bg-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <ArrowRightLeft className="h-20 w-20 text-gray-400 mx-auto" />
                  <p className="text-gray-500 text-lg">Domain Transfer</p>
                  <p className="text-gray-400 text-sm">Feature Image Placeholder</p>
                </div>
              </div>
            </div>
          </div>

          {/* Free Domain Registration */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-gray-200 rounded-2xl p-8 h-80 flex items-center justify-center">
                <div className="text-center space-y-4">
                  <Gift className="h-20 w-20 text-gray-400 mx-auto" />
                  <p className="text-gray-500 text-lg">Free Domain</p>
                  <p className="text-gray-400 text-sm">Feature Image Placeholder</p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2 space-y-6">
              <h3 className="text-3xl font-bold">Register a domain name for free</h3>
              <p className="text-lg text-muted-foreground">
                Get a free domain name when you purchase our hosting plans. Choose from 
                .com, .net, .org, and many other extensions. Perfect for getting your 
                online presence started.
              </p>
              <Button asChild>
                <Link href="/hosting/shared">View Hosting Plans</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Domain Tips */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              6 things to remember before you buy domains
            </h2>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {domainTips.map((tip, index) => (
              <Card key={index} className="text-center p-6 shadow-none">
                <div className="mx-auto mb-4 p-3 rounded-2xl bg-primary/10 w-fit">
                  {tip.icon}
                </div>
                <p className="font-semibold text-sm">{tip.tip}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* TLD List */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Explore the possibilities from our TLD list
            </h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-2">
            {tlds.map((tld, index) => (
              <Badge key={index} variant="outline" className="px-3 py-1 text-sm hover:bg-primary hover:text-primary-foreground cursor-pointer transition-colors">
                {tld}
              </Badge>
            ))}
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
                <AccordionItem key={index} value={`item-${index}`} className="border-b">
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
