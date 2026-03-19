"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { CircleCheckBig, Shield, Lock, Server, HardDrive, Zap, Clock, Loader2, Globe, Cpu } from "lucide-react";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Plan {
  name: string;
  displayName: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

const features = [
  { icon: Shield,    title: "DDoS Protection",     desc: "Advanced protection against distributed denial-of-service attacks" },
  { icon: Lock,      title: "Free SSL Certificate", desc: "Secure your website with free SSL encryption for all domains" },
  { icon: Server,    title: "Free cPanel",          desc: "Industry-leading control panel for easy website management" },
  { icon: HardDrive, title: "Weekly Backups",       desc: "Automatic weekly backups to keep your data safe and secure" },
  { icon: Zap,       title: "99.9% Uptime",         desc: "Guaranteed uptime with redundant infrastructure" },
  { icon: Clock,     title: "24/7 Support",         desc: "Expert support team available around the clock" },
];

export default function SharedHostingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/hosting/packages")
      .then((r) => r.json())
      .then((data) => { if (data.success) setPlans(data.data); })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if (!heroRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(".hero-line", { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.12, duration: 0.8, ease: "power3.out", delay: 0.1 });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen">

      {/* ── Hero ── */}
      <section ref={heroRef} className="relative pt-24 pb-16 px-6 w-full bg-muted/80">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10">
            <h1 className="hero-line text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.1] mb-4">
              Shared Hosting<br />
              <span className="text-primary">Simple & Affordable</span>
            </h1>
            <p className="hero-line text-muted-foreground max-w-xl">
              Reliable cPanel hosting with SSD storage, free SSL, and 24/7 support. Perfect for personal sites, blogs, and small businesses.
            </p>
          </div>

          {/* Bento cards */}
          <div className="hero-line grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-primary p-10 md:col-span-2 min-h-72 rounded-2xl flex flex-col justify-between items-start">
              <div className="h-12 w-12 mb-4 p-2 rounded-sm bg-white/10 flex items-center justify-center flex-shrink-0">
                <Zap className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl mb-2 text-white leading-tight">
                  LiteSpeed web server with <strong>NVMe SSD</strong> storage — pages load in milliseconds.
                </h2>
                <p className="text-white/60 text-sm">
                  Every plan runs on optimised hardware with built-in caching so your visitors never wait.
                </p>
              </div>
            </div>

            <div className="relative w-full min-h-72 rounded-2xl overflow-hidden bg-primary/50">
              <div
                className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg')] bg-cover bg-center"
                style={{ maskImage: "linear-gradient(to bottom, black 40%, transparent 100%)", WebkitMaskImage: "linear-gradient(to bottom, black 40%, transparent 100%)" }}
              />
              <div
                className="absolute inset-0 backdrop-blur-md"
                style={{ maskImage: "linear-gradient(to bottom, transparent 20%, white 100%)", WebkitMaskImage: "linear-gradient(to bottom, transparent 20%, white 100%)" }}
              />
              <div className="relative z-10 p-8 flex flex-col justify-end h-full">
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">5 Plans</h2>
                <p className="text-white text-sm mb-3">From $2.29/mo</p>
                <h2 className="text-xl mb-1 font-bold text-white leading-tight">Free SSL</h2>
                <p className="text-white text-sm">On every domain</p>
              </div>
            </div>

            <div className="relative bg-primary p-4 rounded-2xl min-h-72 overflow-hidden">
              <div className="relative z-20 p-6 flex flex-col justify-start h-full">
                <Globe className="text-white mb-3 w-7 h-7" />
                <h2 className="text-xl mb-2 font-bold text-white leading-tight">One-Click Installs</h2>
                <p className="text-white/80 text-xs max-w-[160px]">
                  WordPress, Joomla, Drupal and 400+ apps installed in seconds via cPanel.
                </p>
              </div>
              <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute bottom-8 left-6 px-4 py-2 bg-blue-500 text-white text-xs font-bold rounded-full shadow-xl -rotate-12 border border-white/20">WordPress</div>
                <div className="absolute bottom-14 right-4 px-4 py-2 bg-white text-primary text-xs font-bold rounded-full shadow-xl rotate-12 border border-slate-200">Joomla</div>
                <div className="absolute bottom-2 right-8 px-4 py-2 bg-slate-800 text-white text-xs font-bold rounded-full shadow-xl -rotate-6 border border-white/10">Drupal</div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 blur-[50px] rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* ── Pricing ── */}
      <div className="w-full max-w-[1100px] mx-auto border-x border-border/60">

        {/* Section header */}
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Choose Your Plan</h2>
          <p className="text-muted-foreground text-sm max-w-md">All plans include free SSL, cPanel, and 24/7 support</p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-24 gap-3 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            <span className="text-sm">Loading plans…</span>
          </div>
        ) : (
          <>
            {/* Top row: first 3 plans */}
            <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">
              {plans.slice(0, 3).map((plan) => (
                <PlanCell key={plan.name} plan={plan} />
              ))}
            </div>
            {/* Bottom row: last 2 plans */}
            <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
              {plans.slice(3).map((plan) => (
                <PlanCell key={plan.name} plan={plan} wide />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Features ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="border-b border-border/60 p-10 lg:p-12 flex flex-col items-center text-center">
          <h2 className="text-3xl font-bold mb-2">Everything Included</h2>
          <p className="text-muted-foreground text-sm max-w-md">Enterprise-grade features on every plan</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full gap-px bg-border/60">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-8 lg:p-10 bg-background flex flex-col gap-3">
              <div className="w-9 h-9 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center">
                <Icon className="h-5 w-5 text-brand-green" />
              </div>
              <p className="font-semibold text-sm">{title}</p>
              <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose Us ── */}
      <div className="w-full max-w-[1100px] mx-auto border border-border/60 border-t-0">
        <div className="grid grid-cols-1 md:grid-cols-2 w-full gap-px bg-border/60">
          <div className="p-10 lg:p-12 bg-background flex flex-col gap-3">
            <p className="font-bold text-lg">Lightning Fast Performance</p>
            <p className="text-sm text-muted-foreground">Our servers are optimised for speed with NVMe SSD storage, LiteSpeed web server, and advanced caching technologies.</p>
          </div>
          <div className="p-10 lg:p-12 bg-background flex flex-col gap-3">
            <p className="font-bold text-lg">Easy to Use</p>
            <p className="text-sm text-muted-foreground">Manage your hosting with the industry-standard cPanel control panel. Install WordPress and other apps with one click.</p>
          </div>
          <div className="p-10 lg:p-12 bg-background flex flex-col gap-3">
            <p className="font-bold text-lg">Expert Support</p>
            <p className="text-sm text-muted-foreground">Our experienced support team is available 24/7 to help you with any questions or issues you may encounter.</p>
          </div>
          <div className="p-10 lg:p-12 bg-primary flex flex-col gap-3 justify-between">
            <div>
              <p className="font-bold text-lg text-white">Ready to Get Started?</p>
              <p className="text-sm text-white/60 mt-2">Join thousands of satisfied customers hosting their websites with Momtaz Host.</p>
            </div>
            <Button className="rounded-full bg-white text-primary hover:bg-white/90 w-fit mt-4" asChild>
              <Link href="#pricing">Choose a Plan</Link>
            </Button>
          </div>
        </div>
      </div>

    </div>
  );
}

function PlanCell({ plan, wide = false }: { plan: Plan; wide?: boolean }) {
  return (
    <div className={`relative p-8 lg:p-10 bg-background flex flex-col gap-6 ${plan.isPopular ? "bg-primary" : ""}`}>
      {plan.isPopular && (
        <span className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-wider bg-white/20 text-white px-2 py-1 rounded-full">
          Recommended
        </span>
      )}
      <div>
        <p className={`text-xs font-semibold uppercase tracking-wider mb-2 ${plan.isPopular ? "text-white/60" : "text-muted-foreground"}`}>
          {plan.displayName}
        </p>
        <div className="flex items-baseline gap-1">
          <span className={`text-4xl font-extrabold ${plan.isPopular ? "text-white" : "text-foreground"}`}>
            ${plan.price.toFixed(2)}
          </span>
          <span className={`text-sm ${plan.isPopular ? "text-white/60" : "text-muted-foreground"}`}>/mo</span>
        </div>
      </div>

      <ul className={`flex flex-col gap-2 text-sm flex-1 ${wide ? "grid grid-cols-2 gap-x-6" : ""}`}>
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2">
            <CircleCheckBig className={`h-4 w-4 mt-0.5 flex-shrink-0 ${plan.isPopular ? "text-white/80" : "text-brand-green"}`} />
            <span className={plan.isPopular ? "text-white/80" : "text-muted-foreground"}>{f}</span>
          </li>
        ))}
      </ul>

      <Button
        className={`rounded-full w-full ${plan.isPopular
          ? "bg-white text-primary hover:bg-white/90"
          : "border border-border bg-background text-foreground hover:bg-brand-green hover:text-white hover:border-brand-green"
        }`}
        asChild
      >
        <Link href={`/hosting/shared/order/${plan.name}`}>Get Started</Link>
      </Button>
    </div>
  );
}
