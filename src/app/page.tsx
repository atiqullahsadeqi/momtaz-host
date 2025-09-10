"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";
import Image from "next/image";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronsUpDown,
  Headset,
  Fingerprint,
  Settings2,
  Server,
  Globe,
  Mail,
  Code,
  Search,
  Database,
  Smartphone,
  Heart,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const tlds = [
  {
    value: ".com",
    label: ".com",
  },
  {
    value: ".org",
    label: ".org",
  },
  {
    value: ".net",
    label: ".net",
  },
  {
    value: ".af",
    label: ".af",
  },
  {
    value: ".af.com",
    label: ".af.com",
  },
  {
    value: ".af.org",
    label: ".af.org",
  },
  {
    value: ".af.net",
    label: ".af.net",
  },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className=" py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8 ">
              {/* Badge */}
              <Badge variant="default" className="text-sm font-medium">
                <span className="w-2 h-2 bg-primary-foreground rounded-full mr-2"></span>
                Professional Hosting Solutions
              </Badge>

              {/* Main Heading */}
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground leading-tight">
                All in one Web hosting
                <br />
                for your business
              </h1>

              {/* Description */}
              <p className="text-lg text-muted-foreground max-w-lg">
                Keep your website running smoothly with reliable hosting
                solutions. Manage domains, hosting, and applications quickly,
                easily & efficiently.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="px-8"
                  onClick={() =>
                    toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                  Get Started
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-foreground"
                  asChild
                >
                  <Link href="/hosting/shared">
                    View Pricing
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>

              {/* Social Proof */}
              <div className="flex items-center space-x-4">
                <div className="flex -space-x-2">
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="bg-primary text-primary-foreground text-xs font-bold">
                      A
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="bg-secondary text-secondary-foreground text-xs font-bold">
                      M
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="w-8 h-8 border-2 border-background">
                    <AvatarFallback className="bg-accent text-accent-foreground text-xs font-bold">
                      S
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <div className="font-semibold text-foreground">12k+</div>
                  <div className="text-sm text-muted-foreground">
                    Trusted by businesses worldwide
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Hero Image */}
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/Hero-Right-Side-Image.jpg"
                alt="Momtaz Host Dashboard"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center space-x-8 lg:space-x-12 opacity-40 flex-wrap">
            <div className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              slack
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              zoom
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              airbnb
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              spotify
            </div>
            <div className="text-2xl lg:text-4xl font-bold text-muted-foreground">
              envato
            </div>
          </div>
        </div>
      </section>

      {/* Domain Search Bar */}
      <section className="py-16 bg-background ">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center ">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
              Find Your Perfect Domain
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Search for available domains including .af domains for Afghanistan
            </p>

            <div className="bg-background rounded-2xl  pr-4 py-2 border border-border ">
              <div className="flex flex-col sm:flex-row gap-2">
                <div className="flex-1">
                  <Input
                    type="text"
                    placeholder="Enter your domain name"
                    className="w-full px-6 text-lg border-0 rounded-xl focus:outline-none focus:border-none bg-background text-foreground"
                  />
                </div>
                <div className="flex gap-2">
                  <Popover open={open} onOpenChange={setOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={open}
                        className="w-[200px] justify-between py-5"
                      >
                        {value
                          ? tlds.find((tld) => tld.value === value)?.label
                          : "Select tld..."}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput
                          placeholder="Search tld..."
                          className="h-9"
                        />
                        <CommandList>
                          <CommandEmpty>No tld found.</CommandEmpty>
                          <CommandGroup>
                            {tlds.map((tld) => (
                              <CommandItem
                                key={tld.value}
                                value={tld.value}
                                onSelect={(currentValue) => {
                                  setValue(
                                    currentValue === value ? "" : currentValue
                                  );
                                  setOpen(false);
                                }}
                              >
                                {tld.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    value === tld.value
                                      ? "opacity-100"
                                      : "opacity-0"
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <Button
                    size="lg"
                    className="px-8 py-4 text-lg"
                    onClick={() =>
                      toast("Domain search initiated", {
                        description: "Checking domain availability...",
                      })
                    }
                  >
                    Search
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Free SSL Certificate
              </span>
              <span className="flex items-center text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Domain Privacy Protection
              </span>
              <span className="flex items-center text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 Support
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-muted/50 dark:bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              One Partner. All Your Digital Needs.
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our complete range of services tailored
              <br />
              for individuals, startups, and enterprises.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Web Hosting */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Server />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Web Hosting
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Fast, secure, and scalable hosting solutions.
              </p>
            </div>

            {/* Domain Registration */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Globe />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Domain Registration
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Find and secure your perfect domain name.
              </p>
            </div>

            {/* Google Workspace */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Mail />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Google Workspace
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Official Google Partner – Seamless business email and
                collaboration tools.
              </p>
            </div>

            {/* Web Design & Development */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Code />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Web Design & Development
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Beautiful, responsive websites that deliver results.
              </p>
            </div>

            {/* SEO & Branding */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Search />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Search Engine Optimization (SEO) & Branding
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Rank higher, attract more traffic, grow faster with your unique
                tailored brand.
              </p>
            </div>

            {/* Web & Database Applications */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Database />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Web & Database Applications
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Custom-built software tailored to your business logic.
              </p>
            </div>

            {/* Mobile App Development */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.7s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Smartphone />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Mobile App Development
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                iOS and Android apps with seamless performance.
              </p>
            </div>

            {/* Digital Marketing */}
            <div
              className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              style={{ animationDelay: "0.8s" }}
            >
              <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                <Heart />
              </div>
              <h3 className="text-xl font-semibold text-card-foreground mb-3">
                Digital Marketing
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Comprehensive marketing strategies to grow your online presence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Choose Your Perfect Hosting Plan
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From shared hosting to powerful VPS solutions, we have the perfect
              plan for your needs.
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Shared Hosting */}
            <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Shared Hosting
                </h3>
                <p className="text-muted-foreground mb-6">
                  Perfect for small websites
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    $2.99
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    10GB SSD Storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Unlimited Bandwidth
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Free SSL Certificate
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    24/7 Support
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>

            {/* VPS Hosting */}
            <div className="bg-card border-2 border-primary rounded-2xl p-8 hover:shadow-xl transition-all duration-300 group relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge
                  variant="default"
                  className="px-4 py-1 text-sm font-medium"
                >
                  Most Popular
                </Badge>
              </div>
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  VPS Hosting
                </h3>
                <p className="text-muted-foreground mb-6">
                  Scalable virtual servers
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    $19.99
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    50GB SSD Storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2GB RAM
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Root Access
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Free Migration
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>

            {/* Cloud Hosting */}
            <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Cloud Hosting
                </h3>
                <p className="text-muted-foreground mb-6">
                  High-performance cloud
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    $39.99
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    100GB SSD Storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    4GB RAM
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Auto Scaling
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    CDN Included
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>

            {/* Windows Hosting */}
            <div className="bg-card border-2 border-border rounded-2xl p-8 hover:border-primary hover:shadow-xl transition-all duration-300 group">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-card-foreground mb-2">
                  Windows Hosting
                </h3>
                <p className="text-muted-foreground mb-6">
                  ASP.NET & Windows apps
                </p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-card-foreground">
                    $29.99
                  </span>
                  <span className="text-muted-foreground">/month</span>
                </div>
                <ul className="space-y-3 mb-8 text-left">
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    75GB SSD Storage
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    3GB RAM
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    IIS 10 Support
                  </li>
                  <li className="flex items-center">
                    <svg
                      className="w-5 h-5 text-green-500 mr-3"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    SQL Server
                  </li>
                </ul>
                <Button className="w-full">Get Started</Button>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Need help choosing the right plan?
            </p>
            <Button variant="outline" size="lg" asChild>
              <Link href="/contact">Contact Our Experts</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Momtaz Host?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're committed to providing the best hosting experience with
              unmatched reliability, security, and support.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* 99.9% Uptime */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                99.9% Uptime Guarantee
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Your website stays online with our industry-leading uptime
                guarantee. We monitor our servers 24/7 to ensure maximum
                availability.
              </p>
            </div>

            {/* 24/7 Support */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192L5.636 18.364M12 2.25a9.75 9.75 0 100 19.5 9.75 9.75 0 000-19.5z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                24/7 Expert Support
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Our experienced support team is available around the clock to
                help you with any hosting-related questions or issues.
              </p>
            </div>

            {/* Free SSL */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Free SSL Certificates
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Secure your website with free SSL certificates. All our hosting
                plans include automatic SSL installation and renewal.
              </p>
            </div>

            {/* Fast Performance */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-orange-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Lightning Fast Speed
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Experience blazing-fast website loading times with our SSD
                storage, CDN integration, and optimized server configurations.
              </p>
            </div>

            {/* Easy Migration */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-teal-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                Free Website Migration
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Moving from another host? Our experts will migrate your website
                for free with zero downtime and no data loss.
              </p>
            </div>

            {/* Money Back Guarantee */}
            <div className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-card-foreground mb-4">
                30-Day Money Back
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Not satisfied? Get a full refund within 30 days. We're confident
                you'll love our hosting services.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="mt-20 bg-muted/50 dark:bg-background rounded-3xl p-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  12,000+
                </div>
                <div className="text-muted-foreground">Happy Customers</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">
                  99.9%
                </div>
                <div className="text-muted-foreground">Uptime Guarantee</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                <div className="text-muted-foreground">Expert Support</div>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">5+</div>
                <div className="text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Workspace Section */}
      <section className="py-20 bg-muted/50 dark:bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Hero Image */}
            <div className="relative flex items-center justify-center">
              <Image
                src="/images/google-workspace.jpg"
                alt="Momtaz Host Dashboard"
                width={600}
                height={500}
                className="rounded-2xl shadow-xl"
                priority
              />
            </div>
            {/* Right Side */}
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                Professional Email &
                <br />
                Collaboration - Powered by
                <br />
                Google
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg">
                As an official Google Workspace Partner, we help you set up and
                manage professional business email, cloud storage, and team
                collaboration tools like Gmail, Drive, Docs, Meet, and more —
                all under your custom domain.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-foreground">
                    Business-grade Gmail with your domain name
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-foreground">
                    Secure cloud storage and file sharing
                  </span>
                </li>

                <li className="flex items-start space-x-3">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-foreground">
                    Calendar, Meet, and Docs for seamless teamwork
                  </span>
                </li>
              </ul>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="px-8"
                  onClick={() =>
                    toast("Event has been created", {
                      description: "Sunday, December 03, 2023 at 9:00 AM",
                      action: {
                        label: "Undo",
                        onClick: () => console.log("Undo"),
                      },
                    })
                  }
                >
                  Get Started
                </Button>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-foreground"
                  asChild
                >
                  <Link href="/hosting/shared">
                    View Pricing
                    <svg
                      className="ml-2 w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
              What Our Customers Say
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our satisfied
              customers have to say about their experience with Momtaz Host.
            </p>
          </div>

          {/* Testimonials Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "Momtaz Host has been incredible for our business. The uptime is
                excellent, and their support team is always there when we need
                them. Highly recommended!"
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  A
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Ahmad Zahir
                  </div>
                  <div className="text-muted-foreground text-sm">
                    CEO, Tech Solutions
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "The migration process was seamless, and our website has never
                been faster. The VPS hosting plan is perfect for our growing
                e-commerce business."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  S
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Sara Mohammadi
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Founder, Online Store
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "Outstanding service! The 24/7 support is amazing, and they
                helped us set up our domain and hosting in no time. Great value
                for money."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  M
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Mohammad Karimi
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Web Developer
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 4 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "The cloud hosting solution is perfect for our startup.
                Auto-scaling and CDN integration have improved our site
                performance significantly."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  F
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Fatima Ahmadi
                  </div>
                  <div className="text-muted-foreground text-sm">
                    CTO, StartupCo
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 5 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "Excellent Windows hosting for our ASP.NET applications. The SQL
                Server integration and IIS support are top-notch. Highly
                professional service."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-teal-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  H
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Hassan Rezaei
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Software Engineer
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonial 6 */}
            <div className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border">
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                "The free migration service was incredible. They moved our
                entire website without any downtime. The team is knowledgeable
                and very responsive."
              </blockquote>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold text-lg mr-4">
                  N
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    Nargis Hashemi
                  </div>
                  <div className="text-muted-foreground text-sm">
                    Marketing Director
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Overall Rating */}
          <div className="mt-16 text-center">
            <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
              <div className="flex justify-center items-center mb-4">
                <div className="flex text-yellow-400 text-2xl">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="ml-3 text-3xl font-bold text-foreground">
                  4.9/5
                </span>
              </div>
              <p className="text-lg text-muted-foreground mb-4">
                Based on{" "}
                <span className="font-semibold text-primary">
                  1,247 reviews
                </span>{" "}
                from satisfied customers
              </p>
              <Button size="lg" className="">
                Read More Reviews
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTAs Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center ">
            <h2 className="text-4xl lg:text-5xl font-bold mb-6 text-foreground">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Momtaz Host for
              their hosting needs. Get started today and experience the
              difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
              <Button
                size="lg"
                className="px-8"
                onClick={() =>
                  toast("Event has been created", {
                    description: "Sunday, December 03, 2023 at 9:00 AM",
                    action: {
                      label: "Undo",
                      onClick: () => console.log("Undo"),
                    },
                  })
                }
              >
                Get Started Now
              </Button>
              <Button
                variant="ghost"
                size="lg"
                className="text-foreground"
                asChild
              >
                <Link href="/hosting/shared">Contact Sales</Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-16 h-16 bg-muted/50 dark:bg-input/50  rounded-full flex items-center justify-center mx-auto mb-4">
                  <Settings2 />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quick Setup</h3>
                <p className="text-muted-foreground">
                  Get your website online in minutes with our easy setup process
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted/50 dark:bg-input/50  rounded-full flex items-center justify-center mx-auto mb-4">
                  <Fingerprint />
                </div>
                <h3 className="text-xl font-semibold mb-2">
                  Secure & Reliable
                </h3>
                <p className="text-muted-foreground">
                  99.9% uptime guarantee with enterprise-grade security
                </p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-muted/50 dark:bg-input/50  rounded-full flex items-center justify-center mx-auto mb-4">
                  <Headset />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Support</h3>
                <p className="text-muted-foreground">
                  Expert support team available around the clock to help you
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-muted/50 dark:bg-background">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-3xl font-bold text-foreground mb-4">
            Still Have Questions?
          </h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Our team of experts is here to help you choose the perfect hosting
            solution for your needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8"
              asChild
            >
              <Link href="/contact">Get Free Consultation</Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-muted-foreground text-muted-foreground hover:bg-muted-foreground hover:text-primary-foreground px-8"
              asChild
            >
              <Link href="/faq">View FAQ</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
