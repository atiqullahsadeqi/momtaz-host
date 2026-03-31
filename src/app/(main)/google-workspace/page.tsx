"use client";

import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Star,
  Shield,
  Headphones,
  Mail,
  MapPin,
  X,
  ArrowRight,
  Users,
  Cloud,
} from "lucide-react";
import { AnimatedShinyText } from "@/components/ui/animated-shiny-text";
import GoogleWorkspaceOrbits from "@/components/homepage/google-workspace-orbits";
import { Safari } from "@/components/ui/safari";

const plans = [
  {
    name: "Business Starter",
    price: "$6",
    period: "per user/month",
    description: "Perfect for small teams getting started",
    features: [
      "Custom and secure business email",
      "100 participant video meetings",
      "30 GB cloud storage per user",
      "Security and management controls",
      "Standard Support",
    ],
    popular: false,
  },
  {
    name: "Business Standard",
    price: "$12",
    period: "per user/month",
    description: "Enhanced features for growing businesses",
    features: [
      "Custom and secure business email",
      "150 participant video meetings + recording",
      "2 TB cloud storage per user",
      "Security and management controls",
      "Standard Support (paid upgrade to Enhanced Support)",
    ],
    popular: true,
  },
  {
    name: "Business Plus",
    price: "$18",
    period: "per user/month",
    description: "Advanced features for larger teams",
    features: [
      "Custom and secure business email + eDiscovery, retention",
      "500 participant video meetings + recording, attendance tracking",
      "5 TB cloud storage per user",
      "Enhanced security and management controls, including Vault",
      "Standard Support (paid upgrade to Enhanced Support)",
    ],
    popular: false,
  },
];

const comparisons = [
  { feature: "Professional Email", workspace: true, webmail: true, description: "Custom domain email addresses" },
  { feature: "Cloud Storage", workspace: true, webmail: false, description: "Secure file storage and sharing" },
  { feature: "Video Conferencing", workspace: true, webmail: false, description: "Built-in video meeting solution" },
  { feature: "Real-time Collaboration", workspace: true, webmail: false, description: "Simultaneous document editing" },
  { feature: "Mobile Apps", workspace: true, webmail: true, description: "Native mobile applications" },
  { feature: "Advanced Security", workspace: true, webmail: false, description: "Enterprise-grade security features" },
];

const faqs = [
  {
    question: "What is Google Workspace?",
    answer: "Google Workspace is a collection of cloud computing, productivity and collaboration tools developed by Google. It includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more.",
  },
  {
    question: "How is this different from free Gmail?",
    answer: "Google Workspace provides business email with your custom domain, advanced admin controls, 24/7 support, enhanced security features, and more storage. Free Gmail uses @gmail.com addresses and has limited features.",
  },
  {
    question: "Can I use my existing domain?",
    answer: "Yes! You can use your existing domain name for Google Workspace. We'll help you set up the necessary DNS records to get your custom email addresses working.",
  },
  {
    question: "Is there a setup fee?",
    answer: "No, there are no setup fees. You only pay the monthly subscription fee per user. We provide free setup and migration assistance.",
  },
  {
    question: "Can I migrate from another email provider?",
    answer: "Absolutely! We offer free migration services from other email providers including Outlook, Yahoo, and other business email solutions. Your emails, contacts, and calendars will be transferred safely.",
  },
  {
    question: "What happens if I cancel?",
    answer: "You can cancel anytime. Your data remains accessible for a grace period, and you can export all your data before the account is closed. No long-term contracts required.",
  },
];

export default function GoogleWorkspacePage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero Section ── */}
      <section className="relative pt-24 pb-16 px-6 w-full bg-brand-blue overflow-hidden">
        {/* Noise overlay */}
    
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 mb-4">
            <svg viewBox="0 0 24 24" width="14" height="14" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <AnimatedShinyText shimmerWidth={80} className="text-xs font-medium text-white/70 bg-linear-to-r from-transparent via-white via-50% to-transparent">
              Official Google Workspace Partner
            </AnimatedShinyText>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-shadow-lg leading-[1.1] mb-4 text-white">
            Professional Email
            <br />
            <span className="text-white">&amp; Collaboration</span>
          </h1>
          <p className="text-white/70 max-w-xl mb-8">
            Power your business with Google Workspace. Get custom email, cloud
            storage, video meetings, and collaboration tools all in one secure platform.
          </p>
          <Button size="lg" className="rounded-full cursor-pointer bg-brand-green hover:bg-brand-green/80 mb-12">
            <a href="#pricing">View Pricing <ArrowRight className="ml-2 w-4 h-4 inline" /></a>
          </Button>
          <div className="relative w-full max-w-3xl">
            <Safari url="workspace.google.com" className="w-full" />
            <div className="absolute inset-0 top-[7%] flex items-center justify-center z-10 bg-background" style={{ left: "0.1%", width: "99.8%", borderRadius: "0 0 11px 11px" }}>
              <GoogleWorkspaceOrbits />
            </div>
          </div>
        </div>
      </section>

      {/* ── All sections in one container ── */}
      <section className="w-full relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── Feature cards ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="bg-background p-10 lg:p-12 flex flex-col gap-4 md:col-span-2">
              <div className="h-12 w-12 p-2 rounded-sm bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                <Mail className="text-brand-green" />
              </div>
              <h2 className="text-xl font-bold text-foreground leading-tight">
                Everything your business needs in <strong>one platform.</strong>
              </h2>
              <p className="text-muted-foreground text-sm">
                Powerful tools that work together seamlessly to help your team collaborate, communicate, and get more done.
              </p>
            </div>
            <div className="bg-background p-10 lg:p-12 flex flex-col gap-4 relative overflow-hidden">
              <div className="relative z-10">
                <Shield className="text-foreground mb-3 w-7 h-7" />
                <h2 className="text-xl font-bold text-foreground leading-tight mb-2">Enterprise Security</h2>
                <p className="text-muted-foreground text-sm">
                  Advanced security with 2-step verification and data loss prevention.
                </p>
              </div>
              <div className="absolute inset-0 z-0 pointer-events-none flex items-end justify-end gap-2 p-6">
                <span className="px-3 py-1.5 bg-muted text-foreground text-[10px] font-medium rounded-full border border-border/60">2FA Secured</span>
                <span className="px-3 py-1.5 bg-muted text-foreground text-[10px] font-medium rounded-full border border-border/60">SAML SSO</span>
                <span className="px-3 py-1.5 bg-muted text-foreground text-[10px] font-medium rounded-full border border-border/60">DLP Active</span>
              </div>
            </div>
          </div>

          {/* ── Pricing header ── */}
          <div id="pricing" />
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Simple, transparent pricing.
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Choose the plan that&apos;s right for your business. All plans include 24/7 support and free setup.
            </p>
          </div>

          {/* ── Pricing cards grid ── */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            {plans.map((plan) => (
              <div key={plan.name} className="bg-background p-8 lg:p-12 flex flex-col relative">
                {plan.popular && (
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-brand-green text-white px-4 py-1 text-xs font-bold rounded-full tracking-wide shadow-md">
                    Recommended
                  </div>
                )}
                <h3 className="text-xl font-bold text-foreground ">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                  <span className="text-muted-foreground text-sm ml-1">{plan.period}</span>
                </div>
                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-brand-green mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  className={`w-full rounded-full cursor-pointer ${plan.popular ? "bg-brand-green hover:bg-brand-green/80" : ""}`}
                  variant={plan.popular ? "default" : "outline"}
                >
                  Get Started
                </Button>
              </div>
            ))}
          </div>

          {/* ── Enterprise CTA row ── */}
          <div className="relative overflow-hidden min-h-[420px] flex items-end border-b border-border/60">
            <div
              className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7320612/pexels-photo-7320612.jpeg')] bg-cover bg-center"
              style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
            />
            <div
              className="absolute inset-0 backdrop-blur-md"
              style={{ maskImage: "linear-gradient(to bottom, transparent 20%, black 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, black 100%)" }}
            />
            <div className="relative z-10 p-10 lg:p-16 flex flex-col md:flex-row items-end md:items-center justify-between gap-8 w-full">
              <div>
             
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 leading-tight">
                  Enterprise &amp; Custom Solutions
                </h3>
                <p className="text-white text-sm max-w-md leading-relaxed ">
                  <strong className="text-white ">Need more than 300 users?</strong> Looking for custom integrations or advanced security features? Our Google Partner specialists can create a tailored solution for your organization.
                </p>
                <Button size="lg" className="mt-3 rounded-full cursor-pointer bg-brand-green hover:bg-brand-green/80 shrink-0">
                Contact Sales
              </Button>
              </div>
              
            </div>
          </div>

          {/* ── Comparison table ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Why Google Workspace?
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              See how it compares to traditional webmail solutions.
            </p>
          </div>

          <div className=" overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border/60">
                  <th className="text-left text-sm p-6 font-semibold text-foreground">Feature</th>
                  <th className="text-center text-sm p-6 font-semibold ">Google Workspace</th>
                  <th className="text-center text-sm p-6 font-semibold text-muted-foreground">Traditional Webmail</th>
                </tr>
              </thead>
              <tbody>
                {comparisons.map((c, i) => (
                  <tr key={i} className="border-b border-border/60 hover:bg-muted/30 transition-colors">
                    <td className="p-6">
                      <p className="font-medium text-sm text-foreground">{c.feature}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>
                    </td>
                    <td className="text-center p-6">
                      {c.workspace ? <CheckCircle className="h-5 w-5 text-brand-green mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                    </td>
                    <td className="text-center p-6">
                      {c.webmail ? <CheckCircle className="h-5 w-5 text-brand-green mx-auto" /> : <X className="h-5 w-5 text-muted-foreground mx-auto" />}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* ── Why Momtaz Host ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Why Momtaz Host?
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We&apos;re not just resellers — we&apos;re your local Google Workspace partner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            {[
              { icon: Star, title: "Official Google Partner", desc: "Certified expertise in Google Workspace deployment and management with direct Google support." },
              { icon: Headphones, title: "Free Setup & Migration", desc: "Our experts set up your Workspace and migrate existing emails, contacts, and calendars at no cost." },
              { icon: MapPin, title: "Local Support", desc: "Get support in your timezone from our dedicated Google Workspace specialists, available 24/7." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="p-8 lg:p-12 bg-background flex flex-col">
                <div className="w-12 h-12 mb-6 rounded-xl bg-brand-green/10 flex items-center justify-center">
                  <Icon className="h-5 w-5 text-brand-green" />
                </div>
                <h3 className="text-lg font-bold tracking-tight mb-3 text-foreground">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          {/* ── FAQ ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-px bg-border/60">
            <div className="p-8 lg:p-12 bg-background flex flex-col justify-start">
              <h2 className="text-xl md:text-3xl font-bold text-foreground leading-[1.1] tracking-tight mb-3">
                Frequently <br className="hidden lg:block" /> Asked Questions.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Everything you need to know about Google Workspace.
              </p>
            </div>
            <div className="lg:col-span-2 p-8 lg:p-12 bg-background">
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="border-b border-border/60">
                    <AccordionTrigger className="text-left hover:no-underline py-5">
                      <span className="font-semibold text-sm">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm leading-relaxed pb-5">
                      {faq.answer}
                    </AccordionContent>
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
