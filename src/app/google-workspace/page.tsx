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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  CheckCircle,
  Star,
  Globe,
  Shield,
  Headphones,
  ArrowRight,
  Users,
  Cloud,
  Mail,
  MonitorPlay,
  Calendar,
  MapPin,
  X,
} from "lucide-react";
import Link from "next/link";
import SplitText from "@/components/SplitText";

export default function GoogleWorkspacePage() {
  const features = [
    {
      icon: <Mail className=" text-primary" />,
      title: "Professional Email",
      description:
        "Custom email addresses with your domain name. Powerful spam protection and 99.9% uptime guarantee.",
    },
    {
      icon: <Cloud className=" text-primary" />,
      title: "Cloud Storage",
      description:
        "Secure cloud storage with real-time collaboration. Access your files anywhere, anytime.",
    },
    {
      icon: <MonitorPlay className=" text-primary" />,
      title: "Video Conferencing",
      description:
        "HD video meetings with up to 500 participants. Screen sharing and recording included.",
    },
    {
      icon: <Calendar className=" text-primary" />,
      title: "Smart Calendar",
      description:
        "Intelligent scheduling with automatic meeting rooms and smart suggestions.",
    },
    {
      icon: <Users className=" text-primary" />,
      title: "Team Collaboration",
      description:
        "Real-time document editing with Docs, Sheets, and Slides. Work together seamlessly.",
    },
    {
      icon: <Shield className=" text-primary" />,
      title: "Enterprise Security",
      description:
        "Advanced security features with 2-step verification and data loss prevention.",
    },
  ];

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
      webmail: false,
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
    },
    {
      feature: "24/7 Support",
      workspace: true,
      webmail: false,
      description: "Round-the-clock customer support",
    },
    {
      feature: "Offline Access",
      workspace: true,
      webmail: false,
      description: "Work without internet connection",
    },
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
      <section className="py-20 bg-primary">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="px-4 py-2 rounded-full bg-primary-foreground text-primary">
              Official Google Partner
            </Badge>
            <div className="my-4">
              <SplitText
                text="Professional Email & Collaboration"
                className="text-4xl lg:text-6xl text-primary-foreground  leading-tight font-bold"
                delay={30}
                duration={1.8}
                ease="elastic.out(1, 0.3)"
                splitType="chars"
                from={{ opacity: 0, y: 40 }}
                to={{ opacity: 1, y: 0 }}
                threshold={0.1}
                rootMargin="-100px"
                textAlign="center"
              />
            </div>

            <p className="text-sm text-primary-foreground mb-8  max-w-2xl mx-auto">
              Power your business with Google Workspace. Get custom email, cloud
              storage, video meetings, and collaboration tools all in one secure
              platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                variant="secondary"
                className="cursor-pointer  "
              >
                View Pricing
              </Button>
            </div>

            {/* Hero Image Placeholder */}
            <div className="bg-primary-foreground/10 rounded-lg p-8 backdrop-blur-sm">
              <div className="text-primary-foreground/60 text-sm">
                Google Workspace Interface Preview
                <br />
                (Illustration will be added here)
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Everything your business needs
            </h2>
            <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
              Powerful tools that work together seamlessly to help your team
              collaborate, communicate, and get more done.
            </p>
          </div>

          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center shadow-none border-primary/20 hover:border-primary/40 transition-colors"
              >
                <CardHeader>
                  <div className="h-12 w-12 mx-auto mb-4 p-2 rounded-sm bg-primary/10 flex items-center justify-center">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-lg font-bold">
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

      {/* Pricing Section */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple, transparent pricing
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Choose the plan that's right for your business. All plans include
              24/7 support and a 14-day free trial.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <Card
                key={index}
                className={`relative ${
                  plan.popular
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
                    <span className="text-muted-foreground ml-1">
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
                  <Button
                    className="w-full mt-6"
                    variant={plan.popular ? "default" : "outline"}
                  >
                    Get Started
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Special Partner Offer */}
          <div className="mt-12 max-w-5xl mx-auto">
            <Card className="bg-primary text-primary-foreground border-primary">
              <CardContent className="p-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <Badge className="mb-4 bg-primary-foreground text-primary px-4 py-2 rounded-full">
                      Special Google Partner Offer
                    </Badge>
                    <h3 className="text-2xl font-bold mb-2">
                      Enterprise & Custom Solutions
                    </h3>
                    <p className="text-primary-foreground text-sm mb-4">
                      Need more than 300 users? Looking for custom integrations
                      or advanced security features? Our Google Partner
                      specialists can create a tailored solution for your
                      organization.
                    </p>
                    <ul className="text-sm text-primary-foreground/90 space-y-1 text-left">
                      <li>• Volume discounts available</li>
                      <li>• Custom deployment and training</li>
                      <li>• Advanced security and compliance</li>
                    </ul>
                    <Button
                      size="lg"
                      variant="secondary"
                      className="cursor-pointer mt-4"
                    >
                      Contact Sales
                    </Button>
                  </div>
                  <div className="w-100"></div>
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
      <section className="py-20 bg-primary/5">
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
                  We're an official Google Cloud Partner with certified
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
          <div className="bg-primary/10 py-20 rounded-lg">
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
