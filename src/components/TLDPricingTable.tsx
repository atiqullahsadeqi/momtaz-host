"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "./ui/button";

interface TLDPrice {
  tld: string;
  firstYear: number;
  renew: number;
  transfer: number;
  category: string;
}

export default function TLDPricingTable() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("popular");
  const [tldPrices, setTldPrices] = useState<TLDPrice[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchPricing = async () => {
      try {
        const response = await fetch("/api/domains/tlds-detailed");
        const data = await response.json();
        
        if (data.success) {
          const prices: TLDPrice[] = data.data
            .filter((item: any) => item.tld !== 'af') // Exclude .af from DNA API
            .map((item: any) => ({
              tld: item.tld,
              firstYear: item.registration,
              renew: item.renew,
              transfer: item.transfer,
              category: getCategoryForTLD(item.tld),
            }));
          
          // Add .af manually at the beginning
          prices.unshift({
            tld: 'af',
            firstYear: 29.99,
            renew: 29.99,
            transfer: 29.99,
            category: 'popular',
          });
          
          setTldPrices(prices);
        }
      } catch (error) {
        console.error("Error fetching TLD pricing:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPricing();
  }, []);

  const getCategoryForTLD = (tld: string): string => {
    // Popular/Generic
    if (['com', 'net', 'org', 'info', 'biz', 'online', 'xyz', 'site', 'website', 'af'].includes(tld)) {
      return "popular";
    }
    
    // Business
    if (['biz', 'store', 'shop', 'market', 'company', 'business', 'trade', 'services', 'solutions', 'agency', 'consulting', 'enterprises', 'ventures', 'holdings', 'group', 'partners', 'associates'].includes(tld)) {
      return "business";
    }
    
    // Education
    if (['edu', 'academy', 'school', 'university', 'college', 'education', 'training', 'courses', 'institute'].includes(tld) || tld.includes('edu')) {
      return "education";
    }
    
    // Technology
    if (['tech', 'technology', 'digital', 'software', 'app', 'dev', 'cloud', 'io', 'ai', 'data', 'systems', 'network', 'host', 'hosting', 'server', 'web', 'codes', 'computer'].includes(tld)) {
      return "technology";
    }
    
    // Creative/Media
    if (['art', 'design', 'studio', 'media', 'photo', 'photography', 'gallery', 'graphics', 'video', 'film', 'music', 'audio', 'blog', 'news', 'press'].includes(tld)) {
      return "creative";
    }
    
    // Lifestyle
    if (['life', 'lifestyle', 'health', 'fitness', 'beauty', 'fashion', 'style', 'food', 'restaurant', 'cafe', 'bar', 'travel', 'hotel', 'tours', 'events', 'party', 'wedding', 'family', 'baby', 'kids', 'pet', 'garden', 'home', 'house', 'realestate', 'property'].includes(tld)) {
      return "lifestyle";
    }
    
    // Finance
    if (['finance', 'financial', 'money', 'bank', 'credit', 'loan', 'insurance', 'tax', 'accountant', 'investments'].includes(tld)) {
      return "finance";
    }
    
    return "other";
  };

  const categories = [
    { value: "popular", label: "Popular" },
    { value: "business", label: "Business" },
    { value: "technology", label: "Technology" },
    { value: "education", label: "Education" },
    { value: "creative", label: "Creative & Media" },
    { value: "lifestyle", label: "Lifestyle" },
    { value: "finance", label: "Finance" },
    { value: "other", label: "Other" },
  ];

  const filteredTLDs = tldPrices.filter((tld) => {
    const matchesSearch = tld.tld.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = tld.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  
  const displayedTLDs = showAll ? filteredTLDs : filteredTLDs.slice(0, 7);

  return (
    <div className="w-full">
        <div className="border-b border-border/60 p-6 lg:p-8">
          {/* Search and Filter */}
          <div className="flex flex-col md:flex-row items-center rounded-lg border border-border/60 overflow-hidden divide-y md:divide-y-0 md:divide-x divide-border/60 mb-8">
            <div className="relative flex-1 w-full">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search domain extensions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-0 shadow-none rounded-none h-12 focus-visible:ring-0"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full md:w-[200px] border-0 shadow-none rounded-none h-12 cursor-pointer focus:ring-0">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value} className="focus:bg-primary focus:text-white cursor-pointer">
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Pricing Table */}
          <div className="border rounded-lg overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="py-4">
                  <TableHead className="font-semibold py-6 text-lg text-foreground pl-6">Domain Extension</TableHead>
                  <TableHead className="font-semibold text-lg text-foreground pl-6">First Year</TableHead>
                  <TableHead className="font-semibold text-lg text-foreground pl-6">Renew</TableHead>
                  <TableHead className="font-semibold text-lg text-foreground pl-6">Transfer</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8">
                      Loading pricing...
                    </TableCell>
                  </TableRow>
                ) : filteredTLDs.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                      No domain extensions found
                    </TableCell>
                  </TableRow>
                ) : (
                  displayedTLDs.map((tld, index) => (
                    <TableRow key={tld.tld} className={index % 2 === 0 ? "bg-muted/20" : "bg-transparent"}>
                      <TableCell className="font-medium py-6 text-md font-bold text-foreground pl-6 ">.{tld.tld}</TableCell>
                      <TableCell className=" text-md font-bold text-foreground pl-6 ">${tld.firstYear.toFixed(2)}</TableCell>
                      <TableCell className=" text-md font-bold text-foreground pl-6 ">${tld.renew.toFixed(2)}</TableCell>
                      <TableCell className=" text-md font-bold text-foreground pl-6 ">${tld.transfer.toFixed(2)}</TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
            
            {/* Load More / Show Less Button */}
            {!isLoading && filteredTLDs.length > 7 && (
              <div className="border-t p-4 text-center">
                <Button onClick={() => setShowAll(!showAll)} className="rounded-full bg-brand-green hover:bg-brand-green/80 text-white cursor-pointer font-medium">
                  {showAll ? 'Show Less' : `Load More (${filteredTLDs.length - 7} more)`}
                </Button >
              </div>
            )}
          </div>
        </div>
    </div>
  );
}
