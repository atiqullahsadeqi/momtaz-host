"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  Users,
  Cloud,
  Mail,
  MonitorPlay,
  Calendar,
  MapPin,
  X,
  ArrowRight,
} from "lucide-react";
import SplitText from "@/components/SplitText";

export default function GoogleWorkspacePage() {
  

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
        "Enhanced security and management controls, including Vault and advanced endpoint management",
        "Standard Support (paid upgrade to Enhanced Support)",
      ],
      popular: false,
    },
  ];

  const comparisons = [
    {
      feature: "Professional Email",
      workspace: true,
      webmail: true,
      description: "Custom domain email addresses",
    },
    {
      feature: "Cloud Storage",
      workspace: true,
      webmail: false,
      description: "Secure file storage and sharing",
    },
    {
      feature: "Video Conferencing",
      workspace: true,
      webmail: false,
      description: "Built-in video meeting solution",
    },
    {
      feature: "Real-time Collaboration",
      workspace: true,
      webmail: false,
      description: "Simultaneous document editing",
    },
    {
      feature: "Mobile Apps",
      workspace: true,
      webmail: true,
      description: "Native mobile applications",
    },
    {
      feature: "Advanced Security",
      workspace: true,
      webmail: false,
      description: "Enterprise-grade security features",
    }
  ];

  const faqs = [
    {
      question: "What is Google Workspace?",
      answer:
        "Google Workspace is a collection of cloud computing, productivity and collaboration tools, software and products developed by Google. It includes Gmail, Calendar, Drive, Docs, Sheets, Slides, Meet, and more.",
    },
    {
      question: "How is this different from free Gmail?",
      answer:
        "Google Workspace provides business email with your custom domain, advanced admin controls, 24/7 support, enhanced security features, and more storage. Free Gmail uses @gmail.com addresses and has limited features.",
    },
    {
      question: "Can I use my existing domain?",
      answer:
        "Yes! You can use your existing domain name for Google Workspace. We'll help you set up the necessary DNS records to get your custom email addresses working.",
    },
    {
      question: "Is there a setup fee?",
      answer:
        "No, there are no setup fees. You only pay the monthly subscription fee per user. We provide free setup and migration assistance.",
    },
    {
      question: "Can I migrate from another email provider?",
      answer:
        "Absolutely! We offer free migration services from other email providers including Outlook, Yahoo, and other business email solutions. Your emails, contacts, and calendars will be transferred safely.",
    },
    {
      question: "What happens if I cancel?",
      answer:
        "You can cancel anytime. Your data remains accessible for a grace period, and you can export all your data before the account is closed. No long-term contracts required.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-muted bg-cover bg-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center flex flex-col gap-4 items-center">
            <Badge variant="default" className="px-4 py-2 rounded-full">
              Official Google Partner
            </Badge>
            <h1 className="text-4xl lg:text-5xl leading-tight font-bold">Professional Email & Collaboration</h1>

            <p className="text-sm  max-w-2xl mx-auto">
              Power your business with Google Workspace. Get custom email, cloud
              storage, video meetings, and collaboration tools all in one secure
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                variant="link"
                className="cursor-pointer  "
              >
                View Pricing
                 <ArrowRight className="ml-2 size-4" />
              </Button>
            </div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="bg-foreground dark:bg-[#333333] p-10 col-span-2 min-h-80 rounded-2xl flex flex-col justify-between items-start">
                <div className="h-12 w-12  mb-4 p-2 rounded-sm bg-primary flex items-center justify-center">
                  <Mail className=" text-popover" />
                </div>
                <div>
                  <h2 className="text-2xl mb-2  text-white leading-tight">Everything your business needs</h2>
                  <p className="text-white/80 text-sm">Powerful tools that work together seamlessly to help your team collaborate, communicate, and get more done.</p>
                </div>
              </div>
              <div className="relative w-full min-h-80 rounded-2xl overflow-hidden bg-primary/50">
                {/* The Background Image Layer */}
                <div
                  className="absolute inset-0 bg-[url('https://images.pexels.com/photos/4099325/pexels-photo-4099325.jpeg')] bg-cover bg-center"
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
                  <h2 className="text-1xl mb-2 font-bold text-white leading-tight">Team Collaboration</h2>
                  <p className="text-white/80 text-xs">Real-time document editing with Docs, Sheets, and Slides. Work together seamlessly.</p>
                </div>
              </div>
              <div className="relative bg-primary p-4 rounded-2xl min-h-80 overflow-hidden group">
                {/* Content Layer */}
                <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                  <h2 className="text-xl mb-2 font-bold text-white leading-tight">Enterprise Security</h2>
                  <p className="text-white/80 text-xs max-w-[180px]">
                    Advanced security features with 2-step verification and data loss prevention.
                  </p>
                </div>

                {/* Floating Badges Container */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                  {/* 2FA Badge */}
                  <div className="absolute bottom-8 left-13 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">
                    2FA Secured
                  </div>

                  {/* SAML Badge */}
                  <div className="absolute bottom-13 right-10 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-18 border border-slate-200">
                    SAML SSO
                  </div>

                  {/* DLP Badge */}
                  <div className="absolute bottom-2 right-12 px-5 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">
                    DLP Active
                  </div>

                  {/* Encryption Badge */}
                  <div className="absolute bottom-21 left-1/2 -translate-x-1/2 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-full shadow-2xl -rotate-[45deg] border border-white/20 opacity-90">
                    AES-256
                  </div>
                </div>

                {/* Subtle Background Glow for Premium Feel */}
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that&apos;s right for your business. All plans include
              24/7 support and a 14-day free trial.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={` flex flex-col justify-between relative ${plan.popular
                  ? "border-primary shadow-lg scale-105"
                  : "border-primary/20"
                  }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground">
                    Most Popular
                  </Badge>
                )}
                <CardHeader className="text-center">
                  <CardTitle className="text-xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <span className="text-3xl font-bold text-primary">
                      {plan.price}
                    </span>
                    <span className="text-muted-foreground ml-1 text-xs">
                      {plan.period}
                    </span>
                  </div>
                  <CardDescription className="mt-2">
                    {plan.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, featureIndex) => (
                      <li
                        key={featureIndex}
                        className="flex items-start gap-2 text-sm"
                      >
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                    <Button
                    className="w-full mt-6"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Special Partner Offer */}
          <div className="mt-12 max-w-5xl mx-auto">
            <Card className="relative overflow-hidden shadow-none py-0 border-none bg-slate-50 min-h-[450px] flex justify-end">
              {/* Layer 1: The Background Image (Sharp at bottom, Fades at top) */}
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/7320612/pexels-photo-7320612.jpeg')] bg-bottom bg-cover"
                style={{
                  // Mask: Solid at the bottom (100%), Transparent at the top (0%)
                  maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)'
                }}
              />

              {/* Layer 2: The Blur Overlay (Sharp at bottom, Blurs at top) */}
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  // Inverse Mask: Transparent at the bottom (keep sharp), Solid at top (blur out)
                  maskImage: 'linear-gradient(to bottom, transparent 20%, black 100%)',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 20%, black 100%)'
                }}
              />

              {/* Content Layer */}
              <CardContent className="relative z-10 p-8 w-full h-full">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6 w-full">
                  <div className="text-center md:text-left ">
                  
                     <Badge className="mb-4 bg-primary text-primary-foreground px-4 py-2 rounded-full border-none ">
                      Special Google Partner Offer
                    </Badge>

                    <h3 className="text-3xl font-bold mb-4 dark:text-black leading-tight">
                      Enterprise & <br className="hidden md:block" /> Custom Solutions
                    </h3>
                  

                   
                     <p className=" text-sm mb-6 leading-relaxed dark:text-black/80">
                      <strong>Need more than 300 users?</strong> Looking for custom integrations
                      or advanced security features? Our Google Partner
                      specialists can create a tailored solution for your
                      organization.
                    </p>

                    <Button
                      size="lg"
                      variant="default"
                      className="cursor-pointer px-8 shadow-lg hover:shadow-primary/20 transition-all font-semibold"
                    >
                      Contact Sales
                    </Button>
                   
                  </div>

                  {/* Right side spacer to maintain visual balance */}
                  <div className="hidden md:block w-1/3"></div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose Google Workspace?
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              See how Google Workspace compares to other email and productivity
              solutions.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4 font-semibold">Features</th>
                    <th className="text-center p-4 font-semibold text-primary">
                      Google Workspace
                    </th>
                    <th className="text-center p-4 font-semibold">
                      Traditional Webmail
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map((comparison, index) => (
                    <tr key={index} className="border-b hover:bg-muted/50">
                      <td className="p-4">
                        <div>
                          <div className="font-medium">
                            {comparison.feature}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {comparison.description}
                          </div>
                        </div>
                      </td>
                      <td className="text-center p-4">
                        {comparison.workspace ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5  mx-auto" />
                        )}
                      </td>
                      <td className="text-center p-4">
                        {comparison.webmail ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5  mx-auto" />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-muted/3">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why choose Momtaz Host for Google Workspace?
            </h2>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center shadow-none border-none">
              <CardHeader>
                <div className="h-12 w-12 mx-auto mb-4 p-2 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Star className=" text-primary" />
                </div>
                <CardTitle className="text-lg font-bold">
                  Official Google Partner
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  We&apos;re an official Google Cloud Partner with certified
                  expertise in Google Workspace deployment and management.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-none border-none">
              <CardHeader>
                <div className="h-12 w-12 mx-auto mb-4 p-2 rounded-sm bg-primary/10 flex items-center justify-center">
                  <Headphones className=" text-primary" />
                </div>
                <CardTitle className="text-lg font-bold">
                  Free Setup & Migration
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Our experts will set up your Google Workspace and migrate your
                  existing emails, contacts, and calendars for free.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center shadow-none border-none">
              <CardHeader>
                <div className="h-12 w-12 mx-auto mb-4 p-2 rounded-sm bg-primary/10 flex items-center justify-center">
                  <MapPin className=" text-primary" />
                </div>
                <CardTitle className="text-lg font-bold">
                  Local Support
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm">
                  Get local support in your timezone with our dedicated Google
                  Workspace specialists available 24/7.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Frequently Asked Questions
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

      {/* CTA Section */}
      <section className="pb-16">
        <div className="container mx-auto px-4 text-center">
          <div className="bg-muted/10 py-20 rounded-lg">
            <h3 className="text-3xl md:text-4xl font-bold  mb-4">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground text-sm mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust Google Workspace for their
              email and collaboration needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="px-8 py-3">
                Get Started Now
              </Button>
              <Button variant="outline" size="lg" className="px-8 py-3">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
