"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Check,
  ChevronsUpDown,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { toast } from "sonner";

interface TLDOption {
  value: string;
  label: string;
}

interface FeatureItem {
  text: string;
  icon?: string;
}

interface DomainSearchProps {
  heading: string;
  description: string;
  placeholder: string;
  tlds: TLDOption[];
  features: FeatureItem[];
}

export default function DomainSearch({
  heading,
  description,
  placeholder,
  tlds,
  features,
}: DomainSearchProps) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleSearch = () => {
    toast("Domain search initiated", {
      description: "Checking domain availability...",
    });
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            {description}
          </p>

          <div className="bg-background rounded-xl px-4 py-2 border border-border">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex-1">
                <Input
                  type="text"
                  placeholder={placeholder}
                  className="w-full px-6 text-lg border-0 rounded-xl focus:outline-none focus:border-none bg-background text-foreground"
                />
              </div>
              <div className="flex gap-2 mt-1">
                <Button
                  size="lg"
                  className="px-8 py-4 text-lg"
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
            {features.map((feature, index) => (
              <span key={index} className="flex items-center text-muted-foreground">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                {feature.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

