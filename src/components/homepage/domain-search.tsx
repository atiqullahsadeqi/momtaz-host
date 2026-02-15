"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function DomainSearch() {
  const [domainName, setDomainName] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    if (!domainName.trim()) {
      toast("Please enter a domain name", {
        description: "Enter a domain to search for availability",
      });
      return;
    }
    
    // Navigate to domains page with the search term
    router.push(`/domains?domain=${encodeURIComponent(domainName.trim())}`);
  };

  return (
    <section className="py-16 bg-primary/3">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-primary mb-4">
            Find Your Perfect Domain
          </h2>
          <p className="text-sm text-muted-foreground  mb-8">
            Search for available domains including .af domains for Afghanistan
          </p>

          <div className="max-w-2xl mx-auto">
            <div className="flex items-center justify-center rounded-lg border border-primary overflow-hidden   py-1 pr-4">
              <Input
                type="text"
                placeholder="Enter your domain name"
                value={domainName}
                onChange={(e) => setDomainName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                className="flex-1 px-6 py-4 text-sm  border-0 transparent focus:outline-none focus:ring-0"
              />
              <Button
                variant="default"
                size="lg"
                className="px-8 py-4 text-sm"
                onClick={handleSearch}
              >
                Search
              </Button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm text-gray-400">
            <a href="#" className="hover:text-white transition-colors">
              Free SSL Certificate
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Domain Privacy Protection
            </a>
            <a href="#" className="hover:text-white transition-colors">
              24/7 Support
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
