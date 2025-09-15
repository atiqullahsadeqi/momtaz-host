"use client";

import { ServiceCard } from "./service-card";
import { 
  Globe, 
  Code, 
  Database, 
  Smartphone,
  Search,
  Palette,
  Zap,
  Shield
} from "lucide-react";

export function ServicesGrid() {
  const services = [
    {
      title: "Domain Registration",
      description: "Secure your perfect domain name with our comprehensive registration services including .af domains and international TLDs.",
      features: [
        "Domain search and availability check",
        "All major TLDs including .af, .com, .net",
        "Domain transfer assistance",
        "DNS management tools",
        "Domain privacy protection",
        "Auto-renewal setup"
      ],
      price: "$12/year",
      href: "/domains",
      icon: <Globe className="h-8 w-8 text-primary" />,
      badge: "Popular",
      popular: true
    },
    {
      title: "Web Development",
      description: "Custom websites, WordPress solutions, and modern web applications built with cutting-edge technologies.",
      features: [
        "Custom website design",
        "WordPress development",
        "E-commerce solutions",
        "Responsive design",
        "SEO optimization",
        "Performance optimization"
      ],
      price: "From $500",
      href: "/web-development",
      icon: <Code className="h-8 w-8 text-primary" />,
      badge: "Custom"
    },
    {
      title: "Database Development",
      description: "Professional database design, optimization, and management services for scalable applications.",
      features: [
        "Database design & architecture",
        "Performance optimization",
        "Data migration services",
        "Backup & recovery solutions",
        "Security implementation",
        "Monitoring & maintenance"
      ],
      price: "From $300",
      href: "/database-development",
      icon: <Database className="h-8 w-8 text-primary" />,
      badge: "Expert"
    },
    {
      title: "Mobile Development",
      description: "Native and cross-platform mobile applications for iOS and Android with modern development practices.",
      features: [
        "iOS app development",
        "Android app development",
        "Cross-platform solutions",
        "UI/UX design",
        "App store optimization",
        "Maintenance & updates"
      ],
      price: "From $1,000",
      href: "/mobile-development",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      badge: "Modern"
    }
  ];

  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We offer a comprehensive range of digital services to help your business 
            establish a strong online presence and achieve your goals.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
}


