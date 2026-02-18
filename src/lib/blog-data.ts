export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  category: string;
  author: string;
  published: string;
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    slug: "beyond-generic-erp",
    title: "Beyond Generic ERP: The Power of Custom Logic",
    summary: "In the early stages of a business, a few spreadsheets or a generic CRM might do the trick. But as you scale, you begin to notice the friction.",
    content: `# Introduction

In the early stages of a business, a few spreadsheets or a generic CRM might do the trick. But as you scale, you begin to notice the friction. You find yourself changing your workflow to fit the software's limitations rather than the software supporting your growth. This is the "Generic ERP Trap."

## The Problem with Off-the-Shelf

Most "out of the box" solutions are built for the average business. The problem? Your business isn't average. Generic platforms often come with "feature bloat"—hundreds of tools you'll never touch but still pay for—while missing the one specific automation that would save your team hours every week.

## The Momtaz Approach: Modular Logic

We believe software should be invisible. It should work in the background, exactly how you do. By using a modular approach with Laravel and Next.js, we build only what you need:

- **Inventory that talks to Finance**: No more manual data entry.
- **Custom Reporting**: See the metrics that actually matter to your bottom line.
- **Scalability**: Start with a core module and add HR, Payroll, or Sales features as you grow.

## Conclusion

Owning your software means owning your data and your future. Don't rent a rigid box; build an engine.`,
    category: "Software Development",
    author: "Momtaz Team",
    published: "Feb 15, 2026",
    image: "https://images.unsplash.com/photo-1631749352020-b8ce2d86727e?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "2",
    slug: "optimizing-web-performance",
    title: "Optimizing Web Performance for Higher Conversions",
    summary: "The data is clear: 53% of mobile visitors will leave a site if it takes longer than three seconds to load.",
    content: `# The 3-Second Rule

The data is clear: 53% of mobile visitors will leave a site if it takes longer than three seconds to load. In the digital world, speed isn't just a technical metric—it is your most important marketing feature. If your site is slow, your marketing budget is being wasted.

## Why Most Sites Are Slow

Most modern websites are weighed down by heavy themes, unoptimized images, and "plugin soup." Every time a user clicks your link, their browser has to download megabytes of unnecessary code before they even see your headline.

## How We Build for Speed

At Momtaz Host, we prioritize Core Web Vitals. We use a high-performance stack to ensure your site feels instantaneous:

- **Next.js Implementation**: We utilize Static Site Generation (SSG) so your pages are pre-rendered and ready to serve.
- **Asset Optimization**: We implement automated image compression and "lazy loading" so users only download what they see.
- **Clean Code**: By avoiding heavy page builders, we reduce "code bloat," making it easier for Google to crawl and rank your site.

## The Bottom Line

A faster site leads to lower bounce rates, higher Google rankings, and ultimately, more conversions. Speed is the ultimate competitive advantage.`,
    category: "Web Performance",
    author: "Momtaz Team",
    published: "Feb 12, 2026",
    image: "https://images.unsplash.com/photo-1686061593269-420785fb8fa0?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    id: "3",
    slug: "choosing-right-hosting",
    title: "Choosing the Right Hosting for Your Project",
    summary: "Choosing a hosting plan can feel like navigating an alphabet soup of technical jargon. However, it's much simpler when you think of it like real estate.",
    content: `# Where Does Your Website Live?

Choosing a hosting plan can feel like navigating an alphabet soup of technical jargon. However, it's much simpler when you think of it like real estate. Your choice of "home" for your website determines how much traffic you can handle and how secure your data stays.

## 1. Shared Hosting: The Apartment Complex

Shared hosting is the most cost-effective entry point. You share server resources (like the hallway and elevators) with other websites. It's perfect for new blogs or small portfolios.

**Best for**: Startups and small business sites.

## 2. Linux VPS: The Modern Townhouse

A Virtual Private Server (VPS) gives you a dedicated slice of a server. While you are still in a "building" with others, your resources (CPU and RAM) are yours alone. If a "neighboring" site gets a massive traffic spike, your site stays fast.

**Best for**: Growing businesses and e-commerce stores.

## 3. Dedicated Servers: The Private Mansion

A dedicated server means the entire machine belongs to you. You have total control over the hardware, security, and configuration. It is the gold standard for high-traffic applications and sensitive database management.

**Best for**: Large enterprises and complex web apps.

## The Momtaz Difference

Regardless of the plan you choose, we power our servers with NVMe SSD storage and include cPanel for easy management. We don't just give you a space; we give you a high-performance foundation.`,
    category: "Hosting",
    author: "Momtaz Team",
    published: "Feb 10, 2026",
    image: "https://images.unsplash.com/photo-1554098415-788601c80aef?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

export const categories = [
  "All Posts",
  "Software Development",
  "Web Performance",
  "Hosting",
];

export function getBlogPosts(): BlogPost[] {
  return blogPosts;
}

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function getCategories(): string[] {
  return categories;
}
