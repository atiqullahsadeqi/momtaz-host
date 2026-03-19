"use client";

import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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
  ArrowRight,
} from "lucide-react";

export default function ContactPage() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-line",
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.1 }
      );
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formState.name, email: formState.email,
          product: "Contact Form",
          details: { Subject: formState.subject, Message: formState.message },
        }),
      });
    } catch { /* ignore */ }
    setSubmitted(true);
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen ">
      {/* ── Hero Section ── */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-6 w-full mx-auto bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <div className="hero-line inline-block px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold mb-4">
              Get in Touch
            </div>
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              We&apos;re Here to
              <br />
              <span className="text-primary">Help You</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              Whether you have a question about hosting plans, need technical
              support, or want to discuss a custom solution — our team is ready to
              assist you.
            </p>
          </div>

          {/* Bento Feature Cards */}
          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-[#0F1E3D] p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-primary flex items-center justify-center flex-shrink-0">
                <Headphones className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  <strong>24/7</strong> Technical Support for all your hosting,
                  server, and <strong>infrastructure</strong> needs.
                </h2>
                <p className="text-white/60 text-sm">
                  Our expert team is always available to help you resolve issues
                  quickly — no matter the time zone.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-brand-green/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg')] bg-cover bg-center"
                style={{
                  maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)",
                }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{
                  maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)",
                }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <Globe className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">Sales & Inquiries</h2>
                <p className="text-white/80 text-xs">
                  Explore hosting plans, domain registration, or development services with our team.
                </p>
              </div>
            </div>

            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden group">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Building2 className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">Enterprise Solutions</h2>
                <p className="text-white/80 text-xs max-w-[180px]">
                  Custom infrastructure and dedicated account management for large organizations.
                </p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">
                  Dedicated
                </div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">
                  Custom
                </div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">
                  Managed
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── All content in one container ── */}
      <section className="w-full  relative flex flex-col items-center">
        <div className="w-full max-w-[1100px] mx-auto bg-background flex flex-col border-x border-border/60">

          {/* ── Contact Info Row ── */}
          <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
              Get in Touch
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Reach out through any of the channels below — we&apos;re always happy to help.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 w-full gap-px bg-border/60 border-b border-border/60">
            <a
              href="tel:+937744990002"
              className="p-8 lg:p-10 bg-background flex flex-col gap-4 group  transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0  transition-colors">
                <Phone className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Phone</p>
                <p className="text-muted-foreground text-sm">+93 77 44 99 000</p>
                <p className="text-muted-foreground text-sm">+93 70 44 99 000</p>
                <p className="text-muted-foreground text-sm">+93 70 41 99 000</p>
              </div>
              <div className="w-8 h-8 mt-auto rounded-full border border-border flex items-center justify-center  transition-colors">
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>

            <a
              href="https://wa.me/93799555440"
              target="_blank"
              rel="noopener noreferrer"
              className="p-8 lg:p-10 bg-background flex flex-col gap-4 group  transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0  transition-colors">
                <MessageCircle className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">WhatsApp</p>
                <p className="text-muted-foreground text-sm">+93 799 555 440</p>
                <p className="text-primary text-xs font-medium mt-2">Chat with us instantly</p>
              </div>
              <div className="w-8 h-8 mt-auto rounded-full border border-border flex items-center justify-center  transition-colors">
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>

            <a
              href="mailto:info@momtaz.ws"
              className="p-8 lg:p-10 bg-background flex flex-col gap-4 group  transition-colors cursor-pointer"
            >
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0  transition-colors">
                <Mail className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Email</p>
                <p className="text-muted-foreground text-sm">info@momtaz.ws</p>
                <p className="text-primary text-xs font-medium mt-2">We reply within 24 hours</p>
              </div>
              <div className="w-8 h-8 mt-auto rounded-full border border-border flex items-center justify-center  transition-colors">
                <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </div>
            </a>

            <div className="p-8 lg:p-10 bg-background flex flex-col gap-4">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5 text-brand-green" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm mb-1">Business Hours</p>
                <p className="text-muted-foreground text-sm">Sat – Thu: 8 AM – 6 PM</p>
                <p className="text-muted-foreground text-sm">Friday: Closed</p>
                <p className="text-primary text-xs font-medium mt-2">Tech support available 24/7</p>
              </div>
            </div>
          </div>

          {/* ── Contact Form ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
            <div className="p-8 lg:p-12 bg-background flex flex-col justify-start">
              <h2 className="text-xl md:text-3xl font-bold text-foreground leading-[1.1] tracking-tight mb-3">
                Send Us a <br className="hidden lg:block" /> Message.
              </h2>
              <p className="text-muted-foreground text-sm max-w-[280px] leading-relaxed mb-6">
                Fill out the form and our team will respond within 24 hours.
              </p>
              <div className="flex flex-col gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>Response within 24 hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>Free consultation available</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-brand-green flex-shrink-0" />
                  <span>No commitment required</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 p-8 lg:p-12 bg-background">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <CheckCircle className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">Message Sent!</h3>
                  <p className="text-muted-foreground text-sm max-w-sm">
                    Thank you for reaching out. Our team will get back to you within 24 hours.
                  </p>
                  <Button
                    className="mt-6 cursor-pointer"
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormState({ name: "", email: "", subject: "", message: "" });
                    }}
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-foreground text-sm">Full Name</Label>
                      <Input id="name" name="name" placeholder="Ahmad Karimi" required value={formState.name} onChange={handleChange} className="border-border focus:border-primary" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-foreground text-sm">Email Address</Label>
                      <Input id="email" name="email" type="email" placeholder="you@example.com" required value={formState.email} onChange={handleChange} className="border-border focus:border-primary" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-foreground text-sm">Subject</Label>
                    <Input id="subject" name="subject" placeholder="How can we help you?" required value={formState.subject} onChange={handleChange} className="border-border focus:border-primary" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-foreground text-sm">Message</Label>
                    <Textarea id="message" name="message" placeholder="Tell us more about your inquiry, project, or issue..." required rows={6} value={formState.message} onChange={handleChange} className="border-border focus:border-primary resize-none" />
                  </div>
                  <Button type="submit" size="lg" disabled={isLoading} className="w-full cursor-pointer rounded-full bg-brand-green">
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
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
            </div>
          </div>

          {/* ── Map ── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-px bg-border/60 ">
            <div className="p-8 lg:p-12 bg-background flex flex-col justify-center">
              <div className="w-10 h-10 rounded-lg bg-brand-green/10 flex items-center justify-center shrink-0 mb-4">
                <MapPin className="w-5 h-5 text-brand-green" />
              </div>
              <h2 className="text-xl md:text-3xl font-bold text-foreground leading-[1.1] tracking-tight mb-2">
                Visit Our <br className="hidden lg:block" /> Office.
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed mb-1">Near 3rd Police Station</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-1">Karte 4, Kabul</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">Afghanistan, P.O.Box 1307</p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a href="https://maps.google.com/?q=Karte+4+Kabul+Afghanistan" target="_blank" rel="noopener noreferrer">
                  <Button variant="default" className="cursor-pointer rounded-full bg-brand-green hover:bg-brand-green/80 border-0">
                    <MapPin className="w-4 h-4 mr-2" />
                    Open in Maps
                  </Button>
                </a>
                <a href="tel:+937744990002">
                  <Button variant="outline" className="cursor-pointer rounded-full">
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </a>
              </div>
            </div>

            <div className="lg:col-span-2 bg-background">
              <iframe
                title="Momtaz Host Location – Karte 4, Kabul, Afghanistan"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3289.012345678!2d69.1628!3d34.5037!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38d16e5fcdb34dbf%3A0x4b2d8d8f0a5e57b0!2sKarte+4%2C+Kabul%2C+Afghanistan!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s"
                width="100%"
                height="100%"
                className="min-h-[400px]"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
