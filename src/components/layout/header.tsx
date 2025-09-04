"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"

export function Header() {
  return (
    <header className="border-b bg-white">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="text-2xl font-bold text-blue-600">
          Momtaz Host
        </Link>

        {/* Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Hosting</NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="grid gap-3 p-6 w-[400px]">
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/vps" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">VPS Hosting</div>
                      <div className="text-sm text-gray-600">Scalable virtual private servers</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/shared" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Shared Hosting</div>
                      <div className="text-sm text-gray-600">Affordable web hosting</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/cloud" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Cloud Hosting</div>
                      <div className="text-sm text-gray-600">High-performance cloud solutions</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/hosting/windows" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Windows Hosting</div>
                      <div className="text-sm text-gray-600">ASP.NET and Windows applications</div>
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
                    <Link href="/domains" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Domain Registration</div>
                      <div className="text-sm text-gray-600">Register your perfect domain</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/web-development" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Web Development</div>
                      <div className="text-sm text-gray-600">Custom websites & WordPress</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/database-development" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Database Development</div>
                      <div className="text-sm text-gray-600">Database design & optimization</div>
                    </Link>
                  </NavigationMenuLink>
                  <NavigationMenuLink asChild>
                    <Link href="/mobile-development" className="block p-2 hover:bg-gray-50 rounded">
                      <div className="font-medium">Mobile Development</div>
                      <div className="text-sm text-gray-600">iOS & Android applications</div>
                    </Link>
                  </NavigationMenuLink>
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/google-workspace" className="px-4 py-2 hover:text-blue-600">
                  Google Workspace
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/seo-services" className="px-4 py-2 hover:text-blue-600">
                  SEO Services
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink asChild>
                <Link href="/branding" className="px-4 py-2 hover:text-blue-600">
                  Branding
                </Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Auth Buttons */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </div>
    </header>
  )
}
