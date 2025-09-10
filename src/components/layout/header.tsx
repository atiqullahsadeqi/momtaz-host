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
import { ThemeToggle } from "@/components/theme-toggle";
import Image from "next/image";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background">
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

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Hosting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/vps"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      <div className="font-medium">VPS Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        Scalable virtual private servers
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/shared"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      <div className="font-medium">Shared Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        Affordable web hosting
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/cloud"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      <div className="font-medium">Cloud Hosting</div>
                      <div className="text-sm text-muted-foreground">
                        High-performance cloud solutions
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/hosting/windows"
                      className="block p-2 hover:bg-accent rounded"
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
              <NavigationMenuTrigger>Services</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link
                      href="/domains"
                      className="block p-2 hover:bg-accent rounded"
                    >
                      <div className="font-medium">Domain Registration</div>
                      <div className="text-sm text-muted-foreground">
                        Register your perfect domain
                      </div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link
                      href="/web-development"
                      className="block p-2 hover:bg-accent rounded"
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
                      className="block p-2 hover:bg-accent rounded"
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
                      className="block p-2 hover:bg-accent rounded"
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
                <Link
                  href="/google-workspace"
                  className="px-4 py-2 hover:text-primary"
                >
                  Google Workspace
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link
                  href="/seo-services"
                  className="px-4 py-2 hover:text-primary"
                >
                  SEO Services
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/branding" className="px-4 py-2 hover:text-primary">
                  Branding
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons & Theme Toggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
