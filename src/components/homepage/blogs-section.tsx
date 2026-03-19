import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface Post {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
}

interface BlogsSectionProps {
  tagline?: string;
  heading?: string;
  description?: string;
  buttonText?: string;
  buttonUrl?: string;
  posts?: Post[];
  className?: string;
}

export default function BlogsSection({
  tagline = "Latest Updates",
  heading = "From the Blog",
  description = "Discover the latest trends, tips, and best practices in modern web hosting and development.",
  buttonText = "View all articles",
  buttonUrl = "/blog",
  posts = [
    {
      id: "post-1",
      title: "Beyond Generic ERP: The Power of Custom Logic",
      summary:
        "Learn how to quickly integrate and customize shadcn/ui components in your Next.js projects.",
      label: "Tutorial",
      author: "Sarah Chen",
      published: "1 Jan 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "post-2",
      title: "Optimizing Web Performance for Higher Conversions",
      summary:
        "Explore how to create inclusive web experiences using modern accessible components.",
      label: "Performance",
      author: "Marcus Rodriguez",
      published: "5 Jan 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&auto=format&fit=crop&q=60",
    },
    {
      id: "post-3",
      title: "Choosing the Right Hosting for Your Project",
      summary:
        "Dive into creating scalable infrastructure solutions using modern hosting platforms.",
      label: "Hosting",
      author: "Emma Thompson",
      published: "10 Jan 2024",
      url: "#",
      image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60",
    },
  ],
  className,
}: BlogsSectionProps) {
  return (
    <section
      className={cn(
        "w-full bg-background border-b border-border/60 relative flex flex-col items-center",
        className
      )}
    >
      <div className="w-full max-w-[1200px] mx-auto bg-background flex flex-col">

        {/* Grid Header Row — same pattern as services section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 w-full gap-px bg-border/60 border-b border-border/60">

          {/* Left: Section title cell */}
          <div className="p-8 lg:p-12 bg-background flex flex-col justify-between min-h-[160px]">
            <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-foreground leading-[1.1] tracking-tight mb-4">
              {heading}
            </h2>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-[260px]">
              {description}
            </p>
          </div>

          {/* Middle: Empty filler */}
          <div className="bg-background hidden lg:block" />

          {/* Right: CTA cell */}
          <div className="p-8 lg:p-12 bg-background flex items-end justify-end">
            <Link
              href={buttonUrl}
              className="inline-flex items-center gap-2 text-sm font-semibold text-foreground hover:opacity-70 transition-opacity"
            >
              {buttonText}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Blog posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-px bg-border/60">
          {posts.map((post) => (
            <Link
              key={post.id}
              href={post.url}
              className="group bg-background flex flex-col overflow-hidden"
            >
              {/* Post Image */}
              <div className="aspect-video w-full overflow-hidden border-b border-border/60">
                <img
                  src={post.image}
                  alt={post.title}
                  className="h-full w-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-500"
                />
              </div>

              {/* Post Content */}
              <div className="flex flex-col flex-1 p-6 lg:p-8">
                {/* Label */}
                <span className="text-xs font-semibold text-brand-green uppercase tracking-wider mb-3">
                  {post.label}
                </span>

                {/* Title */}
                <h3 className="text-base font-bold text-foreground tracking-tight leading-snug mb-3 group-hover:opacity-70 transition-opacity">
                  {post.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 flex-1">
                  {post.summary}
                </p>

                {/* Footer: Author + Read More */}
                <div className="flex items-center justify-between border-t border-border/60 pt-4">
                  <span className="text-xs text-muted-foreground">{post.author} · {post.published}</span>
                  <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-foreground">
                    Read more
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  );
}
