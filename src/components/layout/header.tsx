"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef } from "react";
import { useEffect } from "react";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { Menu, ChevronDown, Server, Layers, Cpu, Shield, Code2, Database, Smartphone, Search, Palette, Mail, LayoutDashboard, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

// ── Menu Data ────────────────────────────────────────────────────────────────

const menuData = {
  hosting: {
    label: "Hosting",
    items: [
      { icon: Server,  label: "VPS Hosting",      desc: "Full root access, scalable resources",  href: "/hosting/vps" },
      { icon: Cpu,     label: "Dedicated Servers", desc: "Bare-metal performance, no sharing",    href: "/hosting/dedicated" },
      { icon: Shield,  label: "Windows Hosting",   desc: "ASP.NET, MSSQL, IIS support",           href: "/hosting/windows-server" },
      { icon: Layers,  label: "Shared Hosting",    desc: "Affordable, beginner-friendly plans",   href: "/hosting/shared" },
    ],
  },
  services: {
    label: "Services",
    items: [
      { icon: Code2,      label: "Web Development",      desc: "Custom websites, CMS, WordPress",       href: "/web-development" },
      { icon: Database,   label: "Database Development",  desc: "Design, migration & optimization",      href: "/database-development" },
      { icon: Smartphone, label: "Mobile Development",    desc: "iOS & Android native apps",             href: "/mobile-development" },
      { icon: Search,     label: "SEO Services",          desc: "Rank higher, get more traffic",         href: "/seo-services" },
      { icon: Palette,    label: "Branding",              desc: "Logo, identity & brand guidelines",     href: "/branding" },
    ],
  },
};

// ── Dropdown Panel ───────────────────────────────────────────────────────────

function DropdownPanel({ items, visible }: { items: typeof menuData.hosting.items; visible: boolean }) {
  return (
    <div className={cn(
      "absolute top-full left-1/2 -translate-x-1/2 mt-2 w-96 rounded-xl border border-border/60 bg-background shadow-lg",
      "transition-all duration-150 origin-top",
      visible ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
    )} style={{ zIndex: 100 }}>
      <div className="p-2">
        {items.map((item) => (
          <Link key={item.href} href={item.href}
            className="group flex items-center gap-4 rounded-lg px-4 py-3.5 hover:bg-muted/60 transition-colors">
            <item.icon className="w-5 h-5 text-foreground shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground leading-none mb-1">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Mobile Accordion ─────────────────────────────────────────────────────────

function MobileSection({ label, items, onClose }: { label: string; items: typeof menuData.hosting.items; onClose: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-border/50">
      <button onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-3.5 text-sm font-semibold text-foreground">
        {label}
        <ChevronDown className={cn("w-4 h-4 text-muted-foreground transition-transform duration-200", open && "rotate-180")} />
      </button>
      <div className={cn("overflow-hidden transition-all duration-300", open ? "max-h-[600px] pb-2" : "max-h-0")}>
        {items.map((item) => (
          <Link key={item.href} href={item.href} onClick={onClose}
            className="flex items-center gap-3 rounded-lg px-2 py-2.5 hover:bg-muted/60 transition-colors">
            <div className="w-8 h-8 rounded-lg bg-brand-green/10 border border-brand-green/20 flex items-center justify-center shrink-0">
              <item.icon className="w-4 h-4 text-brand-green" />
            </div>
            <div>
              <p className="text-sm font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ── Header ───────────────────────────────────────────────────────────────────

export function Header() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const hoverTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { data: sessionData } = authClient.useSession();

  const enter = (key: string) => { if (hoverTimeout.current) clearTimeout(hoverTimeout.current); setActiveMenu(key); };
  const leave = () => { hoverTimeout.current = setTimeout(() => setActiveMenu(null), 120); };

  const simpleLinks = [
    { href: "/domains", label: "Domains" },
    { href: "/google-workspace", label: "Google Workspace" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header className="sticky w-full top-0 z-50 bg-background border-b border-border/60">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-6">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <Image src="/images/logo.png" alt="Momtaz Host" width={52} height={52} priority />
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1" onMouseLeave={leave}>
          {(["hosting", "services"] as const).map((key) => (
            <div key={key} className="relative" onMouseEnter={() => enter(key)}>
              <button className={cn(
                "flex items-center gap-1 px-3.5 py-2 rounded-lg text-sm font-medium transition-colors",
                activeMenu === key ? "bg-muted text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-muted/60"
              )}>
                {menuData[key].label}
                <ChevronDown className={cn("w-3.5 h-3.5 transition-transform duration-200", activeMenu === key && "rotate-180")} />
              </button>
              <DropdownPanel items={menuData[key].items} visible={activeMenu === key} />
            </div>
          ))}

          {simpleLinks.map((link) => (
            <Link key={link.href} href={link.href}
              className="px-3.5 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/60 transition-colors">
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-2 shrink-0">
          <ThemeToggle />
          {sessionData?.user ? (
            <Button size="sm" className="hidden lg:flex gap-1.5 rounded-full bg-brand-green hover:bg-brand-green/80 text-white" asChild>
              <Link href="/dashboard"><LayoutDashboard className="w-4 h-4" />Dashboard</Link>
            </Button>
          ) : (
            <div className="hidden lg:flex items-center gap-2">
              <Button variant="ghost" size="lg" className="rounded-full" asChild>
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="lg" className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white gap-1.5" asChild>
                <Link href="/register">Get Started <ArrowRight className="w-3.5 h-3.5" /></Link>
              </Button>
            </div>
          )}

          {/* Mobile trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[360px] p-0 flex flex-col">
              <SheetHeader className="px-5 py-4 border-b border-border/60">
                <SheetTitle asChild>
                  <Link href="/" onClick={() => setMobileOpen(false)}>
                    <Image src="/images/logo.png" alt="Momtaz Host" width={48} height={48} />
                  </Link>
                </SheetTitle>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 py-4">
                <MobileSection label="Hosting" items={menuData.hosting.items} onClose={() => setMobileOpen(false)} />
                <MobileSection label="Services" items={menuData.services.items} onClose={() => setMobileOpen(false)} />
                {simpleLinks.map((link) => (
                  <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
                    className="block border-b border-border/50 py-3.5 text-sm font-semibold text-foreground last:border-0">
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="border-t border-border/60 px-5 py-4 bg-background flex flex-col gap-2.5">
                {sessionData?.user ? (
                  <Button className="w-full rounded-full bg-brand-green hover:bg-brand-green/80 text-white gap-2" asChild>
                    <Link href="/dashboard" onClick={() => setMobileOpen(false)}>
                      <LayoutDashboard className="w-4 h-4" />Go to Dashboard
                    </Link>
                  </Button>
                ) : (
                  <>
                    <Button variant="outline" className="w-full rounded-full" asChild>
                      <Link href="/login" onClick={() => setMobileOpen(false)}>Sign In</Link>
                    </Button>
                    <Button className="w-full rounded-full bg-brand-green hover:bg-brand-green/80 text-white gap-1.5" asChild>
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
    </header>
  );
}
