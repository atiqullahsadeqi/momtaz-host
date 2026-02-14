"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";
import { LogIn, Menu, ChevronDown } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="top-0 z-50 sticky bg-primary-foreground">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src="/images/logo.png"
            alt="Momtaz Host Logo"
            width={60}
            height={60}
          />
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary-foreground/0">Hosting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/vps" className="block p-2  rounded">
                      <div className="font-medium">VPS Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        Scalable virtual private servers
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/shared"
                      className="block p-2   rounded"
                    >
                      <div className="font-medium">Shared Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        Affordable web hosting
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/cloud" className="block p-2   rounded">
                      <div className="font-medium">Cloud Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        High-performance cloud solutions
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/windows"
                      className="block p-2   rounded"
                    >
                      <div className="font-medium">Windows Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        ASP.NET and Windows applications
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="bg-primary-foreground/0">Development</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/web-development"
                      className="block p-2   rounded"
                    >
                      <div className="font-medium">Web Development</div>
                      <div className="text-sm text-muted-foreground">
                        Custom websites & WordPress
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/database-development"
                      className="block p-2   rounded"
                    >
                      <div className="font-medium">Database Development</div>
                      <div className="text-sm text-muted-foreground">
                        Database design & optimization
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/mobile-development"
                      className="block p-2   rounded"
                    >
                      <div className="font-medium">Mobile Development</div>
                      <div className="text-sm text-muted-foreground">
                        iOS & Android applications
                      </div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/domains" className="px-4 py-2">
                  Domains
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/google-workspace" className="px-4 py-2 ">
                  Google Workspace
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/seo-services" className="px-4 py-2 ">
                  SEO Services
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/branding" className="px-4 py-2 ">
                  Branding
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons & Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="default" className="hidden md:flex">
            <Link href="/login">Client Area</Link>
            <LogIn />
          </Button>
          
          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="px-4">
              <SheetHeader>
                <SheetTitle><Link href="/" className="text-2xl font-bold text-primary">
          <Image
            src="/images/logo.png"
            alt="Momtaz Host Logo"
            width={60}
            height={60}
          />
        </Link></SheetTitle>
              </SheetHeader>
              <nav className="flex flex-col gap-4 mt-4">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
                    Hosting <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col gap-2 pl-4 mt-2">
                    <Link href="/hosting/vps" onClick={() => setOpen(false)} className="py-2">VPS Hosting</Link>
                    <Link href="/hosting/shared" onClick={() => setOpen(false)} className="py-2">Shared Hosting</Link>
                    <Link href="/hosting/cloud" onClick={() => setOpen(false)} className="py-2">Cloud Hosting</Link>
                    <Link href="/hosting/windows" onClick={() => setOpen(false)} className="py-2">Windows Hosting</Link>
                  </CollapsibleContent>
                </Collapsible>

                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full py-2 font-medium">
                    Development <ChevronDown className="h-4 w-4" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="flex flex-col gap-2 pl-4 mt-2">
                    <Link href="/web-development" onClick={() => setOpen(false)} className="py-2">Web Development</Link>
                    <Link href="/database-development" onClick={() => setOpen(false)} className="py-2">Database Development</Link>
                    <Link href="/mobile-development" onClick={() => setOpen(false)} className="py-2">Mobile Development</Link>
                  </CollapsibleContent>
                </Collapsible>

                <Link href="/domains" onClick={() => setOpen(false)} className="py-2 font-medium">Domains</Link>
                <Link href="/google-workspace" onClick={() => setOpen(false)} className="py-2 font-medium">Google Workspace</Link>
                <Link href="/seo-services" onClick={() => setOpen(false)} className="py-2 font-medium">SEO Services</Link>
                <Link href="/branding" onClick={() => setOpen(false)} className="py-2 font-medium">Branding</Link>
                
                <Button variant="default" className="mt-4" asChild>
                  <Link href="/login" onClick={() => setOpen(false)}>
                    <LogIn className="mr-2 h-4 w-4" />
                    Client Area
                  </Link>
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
