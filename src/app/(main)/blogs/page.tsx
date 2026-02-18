"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { getBlogPosts, getCategories } from "@/lib/blog-data";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Posts");
  
  const allPosts = getBlogPosts();
  const categories = getCategories();

  const filteredPosts = allPosts.filter((post) => {
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.summary.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All Posts" || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <>
     <div className="py-20 mb-12 text-center bg-muted/20">
        <h1 className="mb-4 text-4xl font-bold lg:text-5xl ">Our Blog</h1>
        <p className=" text-sm ">
          Insights, tutorials, and updates from our team
        </p>
      </div>
    
    
    <div className="container mx-auto px-4 py-16 lg:px-16">
      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        {/* Sidebar */}
        <aside className="space-y-6 bg-card p-6 rounded-md">
          {/* Search */}
          <div>
            <h3 className="mb-3 text-md font-semibold">Search</h3>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="mb-3 text-md font-semibold">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`block w-full rounded-lg text-sm cursor-pointer px-4 py-2 text-left transition-colors ${
                    selectedCategory === category
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Blog Posts Grid */}
        <div className="grid gap-6 md:grid-cols-3 lg:gap-8">
          {filteredPosts.map((post) => (
            <Card
              key={post.id}
              className="grid grid-rows-[auto_auto_1fr_auto] overflow-hidden pt-0 shadow-none"
            >
              <div className="aspect-16/9 w-full">
                <Link
                  href={`/blogs/${post.slug}`}
                  className="transition-opacity duration-200 fade-in hover:opacity-70"
                >
                  <img
                    src={post.image}
                    alt={post.title}
                    className="h-full w-full object-cover object-center"
                  />
                </Link>
              </div>
              <CardHeader>
                <Badge variant="default" className="w-fit mb-2">
                  {post.category}
                </Badge>
                <h3 className="text-md font-semibold hover:underline md:text-md">
                  <Link href={`/blogs/${post.slug}`}>
                    {post.title}
                  </Link>
                </h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{post.summary}</p>
              </CardContent>
              <CardFooter>
                <Link
                  href={`/blogs/${post.slug}`}
                  className="flex items-center text-sm text-foreground hover:underline"
                >
                  Read more
                  <ArrowRight className="ml-2 size-4" />
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </>
  );
}
