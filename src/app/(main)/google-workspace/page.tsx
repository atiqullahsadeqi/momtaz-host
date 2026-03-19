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
      <section className="relative pt-24 pb-16 px-6 w-full bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-4">
              Official Google Partner
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Professional Email
              <br />
              <span className="text-primary">&amp; Collaboration</span>
            </h1>
            <p className="text-muted-foreground max-w-xl mb-6">
              Power your business with Google Workspace. Get custom email, cloud
              storage, video meetings, and collaboration tools all in one secure platform.
            </p>
            <Button size="lg" className="rounded-full cursor-pointer bg-brand-green hover:bg-brand-green/80">
              View Pricing <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Bento cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#0F1E3D] p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-primary flex items-center justify-center flex-shrink-0">
                <Mail className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  Everything your business needs in <strong>one platform.</strong>
                </h2>
                <p className="text-white/60 text-sm">
                  Powerful tools that work together seamlessly to help your team collaborate, communicate, and get more done.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-brand-green/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4099325/pexels-photo-4099325.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <Users className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">Team Collaboration</h2>
                <p className="text-white/80 text-xs">Real-time editing with Docs, Sheets, and Slides. Work together seamlessly.</p>
              </div>
            </div>

            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Shield className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">Enterprise Security</h2>
                <p className="text-white/80 text-xs max-w-[180px]">
                  Advanced security with 2-step verification and data loss prevention.
                </p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">2FA Secured</div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">SAML SSO</div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">DLP Active</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── All sections in one container ── */}
      <section className="w-full relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── Pricing header ── */}
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
