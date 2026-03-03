"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  LogIn,
  Menu,
  ChevronDown,
  ChevronRight,
  Server,
  Globe,
  HardDrive,
  Layers,
  Code2,
  Database,
  Smartphone,
  Search,
  Palette,
  Mail,
  LayoutDashboard,
  Shield,
  Zap,
  ArrowRight,
  Star,
  Cloud,
  Cpu,
} from "lucide-react";
import { cn } from "@/lib/utils";

// ── Menu Data ────────────────────────────────────────────────────────────────

const menuData = {
  hosting: {
    label: "Hosting",
    sections: [
      {
        heading: "Infrastructure",
        items: [
          {
            icon: Server,
            label: "VPS Hosting",
            desc: "Full root access, scalable resources",
            href: "/hosting/vps",
            badge: "Popular",
            badgeColor: "blue",
          },
          {
            icon: Cpu,
            label: "Dedicated Servers",
            desc: "Bare-metal performance, no sharing",
            href: "/hosting/dedicated",
          },
          {
            icon: Cloud,
            label: "Cloud Hosting",
            desc: "Auto-scaling cloud infrastructure",
            href: "/hosting/cloud",
          },
        ],
      },
      {
        heading: "Shared & Managed",
        items: [
          {
            icon: Layers,
            label: "Shared Hosting",
            desc: "Affordable, beginner-friendly plans",
            href: "/hosting/shared",
            badge: "From $3/mo",
            badgeColor: "green",
          },
          {
            icon: Shield,
            label: "Windows Hosting",
            desc: "ASP.NET, MSSQL, IIS support",
            href: "/hosting/windows",
          },
          {
            icon: HardDrive,
            label: "cPanel Hosting",
            desc: "Full-featured cPanel environment",
            href: "/hosting/cpanel",
          },
        ],
      },
    ],
    featured: {
      label: "⚡ Most Popular",
      title: "VPS with NVMe",
      desc: "Starting at $5.76/mo · Hetzner-powered · Deploy in 60 seconds",
      href: "/hosting/vps",
      cta: "See VPS Plans",
    },
  },

  domains: {
    label: "Domains",
    sections: [
      {
        heading: "Domain Services",
        items: [
          {
            icon: Globe,
            label: "Domain Registration",
            desc: "Search and register any TLD",
            href: "/domains",
            badge: "New",
            badgeColor: "blue",
          },
          {
            icon: Search,
            label: "Domain Search",
            desc: "Check availability instantly",
            href: "/domains#search",
          },
          {
            icon: ArrowRight,
            label: "Domain Transfer",
            desc: "Move your domain to us",
            href: "/domains/transfer",
          },
        ],
      },
      {
        heading: "DNS & Management",
        items: [
          {
            icon: Shield,
            label: "DNS Management",
            desc: "Cloudflare-powered DNS control",
            href: "/domains/dns",
          },
          {
            icon: Mail,
            label: "Domain Privacy",
            desc: "WHOIS protection included",
            href: "/domains/privacy",
          },
          {
            icon: Star,
            label: "Premium Domains",
            desc: "Short, memorable domain names",
            href: "/domains/premium",
          },
        ],
      },
    ],
    featured: {
      label: "🔍 Find Your Domain",
      title: "Search 500+ TLDs",
      desc: ".com · .net · .af · .co · .io · .dev and hundreds more",
      href: "/domains",
      cta: "Search Domains",
    },
  },

  services: {
    label: "Services",
    sections: [
      {
        heading: "Development",
        items: [
          {
            icon: Code2,
            label: "Web Development",
            desc: "Custom websites, CMS, WordPress",
            href: "/web-development",
          },
          {
            icon: Database,
            label: "Database Development",
            desc: "Design, migration & optimization",
            href: "/database-development",
          },
          {
            icon: Smartphone,
            label: "Mobile Development",
            desc: "iOS & Android native apps",
            href: "/mobile-development",
          },
        ],
      },
      {
        heading: "Business",
        items: [
          {
            icon: Mail,
            label: "Google Workspace",
            desc: "Gmail, Drive, Meet for business",
            href: "/google-workspace",
            badge: "Partner",
            badgeColor: "green",
          },
          {
            icon: Search,
            label: "SEO Services",
            desc: "Rank higher, get more traffic",
            href: "/seo-services",
          },
          {
            icon: Palette,
            label: "Branding",
            desc: "Logo, identity & brand guidelines",
            href: "/branding",
          },
        ],
      },
    ],
    featured: {
      label: "💼 Google Partner",
      title: "Google Workspace",
      desc: "Official reseller. Business email + full suite starting at $6/user/mo",
      href: "/google-workspace",
      cta: "Get Started",
    },
  },
};

// ── Badge Component ──────────────────────────────────────────────────────────

function ItemBadge({ text, color }: { text: string; color: string }) {
  const styles: Record<string, string> = {
    blue: "bg-blue-50 text-blue-600 border border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900",
    green: "bg-emerald-50 text-emerald-600 border border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900",
    amber: "bg-amber-50 text-amber-600 border border-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900",
  };
  return (
    <span className={cn("text-[10px] font-semibold px-1.5 py-0.5 rounded-md leading-none shrink-0", styles[color] || styles.blue)}>
      {text}
    </span>
  );
}

// ── Mega Menu Panel ──────────────────────────────────────────────────────────

function MegaMenuPanel({
  data,
  visible,
}: {
  data: (typeof menuData)[keyof typeof menuData];
  visible: boolean;
}) {
  return (
    <div
      className={cn(
        "absolute top-full left-1/2 -translate-x-1/2 mt-0 w-[820px] rounded-2xl border bg-background shadow-xl shadow-black/8 dark:shadow-black/30",
        "transition-all duration-200 origin-top",
        visible
          ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
          : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
      )}
      style={{ zIndex: 100 }}
    >
      {/* Top arrow */}
      <div className="absolute -top-[5px] left-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-background border-l border-t rotate-45 rounded-sm" />

      <div className="grid grid-cols-3 divide-x divide-border/60">
        {/* Left: item sections */}
        <div className="col-span-2 p-5 grid grid-cols-2 gap-x-6 gap-y-1">
          {data.sections.map((section) => (
            <div key={section.heading}>
              <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-3 px-2">
                {section.heading}
              </p>
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex items-start gap-3 rounded-xl px-2 py-2.5 hover:bg-muted/60 transition-colors duration-150"
                >
                  <div className="mt-0.5 w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors duration-150">
                    <item.icon className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className="text-sm font-medium text-foreground leading-none">
                        {item.label}
                      </span>
                      {item.badge && (
                        <ItemBadge text={item.badge} color={item.badgeColor!} />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground leading-snug">
                      {item.desc}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>

        {/* Right: featured card */}
        <div className="p-5 bg-muted/30 rounded-r-2xl flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-semibold text-primary mb-3 block">
              {data.featured.label}
            </span>
            <h3 className="text-base font-bold text-foreground mb-2 leading-tight">
              {data.featured.title}
            </h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {data.featured.desc}
            </p>
          </div>
          <Link href={data.featured.href}>
            <Button size="sm" className="w-full mt-6 gap-1.5 rounded-xl">
              {data.featured.cta}
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-border/60 px-5 py-3 flex items-center justify-between rounded-b-2xl bg-muted/20">
        <span className="text-xs text-muted-foreground">
          Need help choosing?
        </span>
        <Link
          href="/contact"
          className="text-xs font-semibold text-primary hover:underline underline-offset-4 flex items-center gap-1"
        >
          Talk to our team <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
}

// ── Mobile Nav Item ──────────────────────────────────────────────────────────

function MobileNavSection({
  data,
  label,
  onClose,
}: {
  data: (typeof menuData)[keyof typeof menuData];
  label: string;
  onClose: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/50 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-foreground"
      >
        {label}
        <ChevronDown
          className={cn(
            "w-4 h-4 text-muted-foreground transition-transform duration-200",
            open && "rotate-180"
          )}
        />
      </button>

      <div
        className={cn(
          "overflow-hidden transition-all duration-300",
          open ? "max-h-[800px] pb-3" : "max-h-0"
        )}
      >
        {data.sections.map((section) => (
          <div key={section.heading} className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground/70 mb-2 ml-1">
              {section.heading}
            </p>
            {section.items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className="flex items-center gap-3 rounded-xl px-2 py-2.5 hover:bg-muted/60 transition-colors"
              >
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-foreground">
                      {item.label}
                    </span>
                    {item.badge && (
                      <ItemBadge text={item.badge} color={item.badgeColor!} />
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </Link>
            ))}
          </div>
        ))}

        {/* Featured CTA in mobile */}
        <div className="mx-1 mt-2 p-3 rounded-xl bg-primary/5 border border-primary/10">
          <p className="text-xs font-semibold text-primary mb-1">
            {data.featured.label}
          </p>
          <p className="text-xs text-muted-foreground mb-3">
            {data.featured.desc}
          </p>
          <Link href={data.featured.href} onClick={onClose}>
            <Button size="sm" className="w-full rounded-lg text-xs gap-1">
              {data.featured.cta} <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

// ── Simple mobile link ───────────────────────────────────────────────────────

function MobileSimpleLink({
  href,
  label,
  onClose,
}: {
  href: string;
  label: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClose}
      className="block border-b border-border/50 py-3.5 text-sm font-semibold text-foreground last:border-0"
    >
      {label}
    </Link>
  );
}

// ── Main Header ──────────────────────────────────────────────────────────────

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: sessionData } = authClient.useSession();

  // Scroll shadow
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleMouseEnter = (key: string) => {
    if (hoverTimeout.current) clearTimeout(hoverTimeout.current);
    setActiveMenu(key);
  };

  const handleMouseLeave = () => {
    hoverTimeout.current = setTimeout(() => setActiveMenu(null), 120);
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50 bg-background transition-shadow duration-200",
        scrolled && "shadow-sm shadow-black/5 dark:shadow-black/20"
      )}
    >
      {/* Top promo bar */}
      <div className="bg-primary text-primary-foreground text-center py-1.5 text-xs font-medium tracking-wide">
        🚀 Free domain with any annual hosting plan &nbsp;·&nbsp;
        <Link href="/hosting" className="underline underline-offset-2 font-semibold hover:opacity-80">
          View Plans
        </Link>
      </div>

      <div className="border-b border-border/60">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link href="/" className="shrink-0 flex items-center">
            <Image
              src="/images/logo.png"
              alt="Momtaz Host"
              width={52}
              height={52}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav
            className="hidden lg:flex items-center gap-1"
            onMouseLeave={handleMouseLeave}
          >
            {/* Mega menu triggers */}
            {(["hosting", "domains", "services"] as const).map((key) => (
              <div key={key} className="relative" onMouseEnter={() => handleMouseEnter(key)}>
                <button
                  className={cn(
                    "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors duration-150",
                    activeMenu === key
                      ? "bg-muted text-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  )}
                >
                  {menuData[key].label}
                  <ChevronDown
                    className={cn(
                      "w-3.5 h-3.5 transition-transform duration-200",
                      activeMenu === key && "rotate-180"
                    )}
                  />
                </button>

                <MegaMenuPanel data={menuData[key]} visible={activeMenu === key} />
              </div>
            ))}

            {/* Simple links */}
            {[
              { href: "/pricing", label: "Pricing" },
              { href: "/about", label: "About" },
              { href: "/contact", label: "Contact" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center gap-2 shrink-0">
            <ThemeToggle />

            {/* Desktop auth */}
            {sessionData?.user ? (
              <Button variant="default" size="sm" className="hidden lg:flex gap-1.5 rounded-xl" asChild>
                <Link href="/dashboard">
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
              </Button>
            ) : (
              <div className="hidden lg:flex items-center gap-2">
                <Button variant="ghost" size="sm" className="rounded-xl text-sm" asChild>
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" className="rounded-xl gap-1.5 text-sm" asChild>
                  <Link href="/register">
                    Get Started
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </Button>
              </div>
            )}

            {/* Mobile menu */}
            <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent side="left" className="w-[320px] sm:w-[380px] p-0 flex flex-col">
                <SheetHeader className="px-5 py-4 border-b border-border/60">
                  <SheetTitle asChild>
                    <Link href="/" onClick={() => setMobileOpen(false)}>
                      <Image
                        src="/images/logo.png"
                        alt="Momtaz Host"
                        width={48}
                        height={48}
                      />
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                {/* Scrollable nav area */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                  <MobileNavSection
                    data={menuData.hosting}
                    label="Hosting"
                    onClose={() => setMobileOpen(false)}
                  />
                  <MobileNavSection
                    data={menuData.domains}
                    label="Domains"
                    onClose={() => setMobileOpen(false)}
                  />
                  <MobileNavSection
                    data={menuData.services}
                    label="Services"
                    onClose={() => setMobileOpen(false)}
                  />
                  <MobileSimpleLink href="/pricing" label="Pricing" onClose={() => setMobileOpen(false)} />
                  <MobileSimpleLink href="/about" label="About" onClose={() => setMobileOpen(false)} />
                  <MobileSimpleLink href="/contact" label="Contact" onClose={() => setMobileOpen(false)} />
                </div>

                {/* Sticky bottom auth */}
                <div className="border-t border-border/60 px-5 py-4 bg-background flex flex-col gap-2.5">
                  {sessionData?.user ? (
                    <Button className="w-full rounded-xl gap-2" asChild>
                      <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                        <LayoutDashboard className="w-4 h-4" />
                        Go to Dashboard
                      </Link>
                    </Button>
                  ) : (
                    <>
                      <Button variant="outline" className="w-full rounded-xl" asChild>
                        <Link href="/login" onClick={() => setMobileOpen(false)}>
                          Sign In
                        </Link>
                      </Button>
                      <Button className="w-full rounded-xl gap-1.5" asChild>
                        <Link href="/register" onClick={() => setMobileOpen(false)}>
                          Get Started <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </Button>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>

        </div>
      </div>
    </header>
  );
}