"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  MessageCircle,
  Clock,
  Send,
  CheckCircle,
  Headphones,
  Globe,
  Building2,
} from "lucide-react";

const contactInfo = [
  {
    icon: Phone,
    title: "Phone",
    lines: ["+93 77 44 99 000", "+93 70 44 99 000", "+93 70 41 99 000"],
    href: "tel:+937744990002",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    lines: ["+93 799 555 440"],
    href: "https://wa.me/93799555440",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["info@momtaz.ws"],
    href: "mailto:info@momtaz.ws",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    icon: MapPin,
    title: "Office",
    lines: ["Near 3rd Police Station", "Karte 4, Kabul", "Afghanistan, P.O.Box 1307"],
    href: "https://maps.google.com/?q=Karte+4+Kabul+Afghanistan",
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
];

const supportOptions = [
  {
    icon: Headphones,
    title: "Technical Support",
    description: "Get help with hosting, server issues, or any technical problems.",
    badge: "24/7 Available",
  },
  {
    icon: Globe,
    title: "Sales & Inquiries",
    description: "Explore our hosting plans, domain registration, or development services.",
    badge: "Mon–Sat",
  },
  {
    icon: Building2,
    title: "Enterprise Solutions",
    description: "Custom infrastructure and dedicated account management for large organizations.",
    badge: "By Appointment",
  },
];

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a submit delay
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <>
      {/* ── Hero Section ── */}
      <section className="relative overflow-hidden bg-secondary py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <Badge
            variant="outline"
            className="mb-4 border-primary/40 text-primary bg-primary/10"
          >
            Get in Touch
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground leading-tight mb-6">
            We&apos;re Here to{" "}
            <span className="text-primary">Help</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto text-base md:text-lg">
            Whether you have a question about hosting plans, need technical
            support, or want to discuss a custom solution — our team is ready to
            assist you.
          </p>
        </div>
      </section>

      {/* ── Support Options ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option) => (
              <Card
                key={option.title}
                className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-lg group"
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                    <option.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="flex items-start justify-between mb-3">
                    <CardTitle className="text-lg text-foreground">
                      {option.title}
                    </CardTitle>
                    <Badge variant="secondary" className="text-xs shrink-0 ml-2">
                      {option.badge}
                    </Badge>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {option.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ── Contact Info Cards + Form ── */}
      <section className="py-16 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* Contact Info Cards */}
            <div className="lg:col-span-2 flex flex-col gap-5">
              <div className="mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                  Contact Information
                </h2>
                <p className="text-muted-foreground text-sm">
                  Multiple ways to reach our team — choose what works best for you.
                </p>
              </div>

              {contactInfo.map((item) => (
                <a
                  key={item.title}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="group"
                >
                  <Card className="border-border hover:border-primary/40 transition-all duration-300 hover:shadow-md cursor-pointer">
                    <CardContent className="p-5 flex items-start gap-4">
                      <div
                        className={`w-10 h-10 rounded-lg ${item.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}
                      >
                        <item.icon className={`w-5 h-5 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground text-sm mb-1">
                          {item.title}
                        </p>
                        {item.lines.map((line) => (
                          <p key={line} className="text-muted-foreground text-sm">
                            {line}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </a>
              ))}

              {/* Business Hours */}
              <Card className="border-border">
                <CardContent className="p-5 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground text-sm mb-1">
                      Business Hours
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Saturday – Thursday: 8:00 AM – 6:00 PM
                    </p>
                    <p className="text-muted-foreground text-sm">
                      Friday: Closed
                    </p>
                    <p className="text-primary text-xs font-medium mt-1">
                      Technical support available 24/7
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-3">
              <Card className="border-border shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-xl text-foreground">
                    Send Us a Message
                  </CardTitle>
                  <p className="text-muted-foreground text-sm">
                    Fill out the form and our team will respond within 24 hours.
                  </p>
                </CardHeader>
                <CardContent>
                  {submitted ? (
                    <div className="flex flex-col items-center justify-center py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                        <CheckCircle className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold text-foreground mb-2">
                        Message Sent!
                      </h3>
                      <p className="text-muted-foreground text-sm max-w-sm">
                        Thank you for reaching out. Our team will get back to you
                        within 24 hours.
                      </p>
                      <Button
                        className="mt-6"
                        variant="outline"
                        onClick={() => {
                          setSubmitted(false);
                          setFormState({
                            name: "",
                            email: "",
                            subject: "",
                            message: "",
                          });
                        }}
                      >
                        Send Another Message
                      </Button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-5">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-foreground text-sm">
                            Full Name
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            placeholder="Ahmad Karimi"
                            required
                            value={formState.name}
                            onChange={handleChange}
                            className="border-border focus:border-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email" className="text-foreground text-sm">
                            Email Address
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="you@example.com"
                            required
                            value={formState.email}
                            onChange={handleChange}
                            className="border-border focus:border-primary"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="subject" className="text-foreground text-sm">
                          Subject
                        </Label>
                        <Input
                          id="subject"
                          name="subject"
                          placeholder="How can we help you?"
                          required
                          value={formState.subject}
                          onChange={handleChange}
                          className="border-border focus:border-primary"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="message" className="text-foreground text-sm">
                          Message
                        </Label>
                        <Textarea
                          id="message"
                          name="message"
                          placeholder="Tell us more about your inquiry, project, or issue..."
                          required
                          rows={6}
                          value={formState.message}
                          onChange={handleChange}
                          className="border-border focus:border-primary resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        size="lg"
                        disabled={isLoading}
                        className="w-full"
                      >
                        {isLoading ? (
                          <span className="flex items-center gap-2">
                            <svg
                              className="animate-spin h-4 w-4"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                              />
                              <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8H4z"
                              />
                            </svg>
                            Sending...
                          </span>
                        ) : (
                          <span className="flex items-center gap-2">
                            <Send className="w-4 h-4" />
                            Send Message
                          </span>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ── Map Section ── */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
              Find Us on the Map
            </h2>
            <p className="text-muted-foreground text-sm max-w-xl mx-auto">
              Our office is located in Karte 4, Kabul — near the 3rd Police
              Station. We welcome walk-ins during business hours.
            </p>
          </div>

          <div className="rounded-xl overflow-hidden border border-border shadow-lg">
            <iframe
              title="Momtaz Host Location – Karte 4, Kabul, Afghanistan"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.012345678!2d69.1628!3d34.5037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16e5fcdb34dbf%3A0x4b2d8d8f0a5e57b0!2sKarte+4%2C+Kabul%2C+Afghanistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
              width="100%"
              height="480"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href="https://maps.google.com/?q=Karte+4+Kabul+Afghanistan"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="default">
                <MapPin className="w-4 h-4 mr-2" />
                Open in Google Maps
              </Button>
            </a>
            <a href="tel:+937744990002">
              <Button variant="outline">
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="py-20 bg-muted/10">
        <div className="container mx-auto px-4">
          <div className="bg-secondary rounded-2xl py-16 px-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent" />
            </div>
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-muted-foreground text-sm md:text-base max-w-xl mx-auto mb-8">
                Explore our hosting plans, register your domain, or let us help
                you build your next digital product.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button size="lg" asChild>
                  <a href="/hosting/shared">View Hosting Plans</a>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <a href="/domains">Register a Domain</a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
