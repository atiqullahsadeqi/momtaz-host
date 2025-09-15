"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Code, 
  Globe, 
  Smartphone, 
  ShoppingCart, 
  Search, 
  Zap, 
  CheckCircle, 
  ArrowRight,
  Palette,
  Database
} from "lucide-react";
import Link from "next/link";

export default function WebDevelopmentPage() {
  const services = [
    {
      title: "Custom Websites",
      description: "Tailored web solutions built from scratch",
      features: ["Responsive design", "Modern frameworks", "SEO optimized", "Fast loading"],
      price: "From $500",
      icon: <Code className="h-8 w-8 text-primary" />,
      popular: true
    },
    {
      title: "WordPress Development",
      description: "Professional WordPress sites and themes",
      features: ["Custom themes", "Plugin development", "E-commerce ready", "Maintenance"],
      price: "From $300",
      icon: <Globe className="h-8 w-8 text-primary" />,
      popular: false
    },
    {
      title: "E-commerce Solutions",
      description: "Online stores that convert visitors to customers",
      features: ["Shopping cart", "Payment integration", "Inventory management", "Analytics"],
      price: "From $800",
      icon: <ShoppingCart className="h-8 w-8 text-primary" />,
      popular: false
    },
    {
      title: "Mobile-First Design",
      description: "Websites optimized for mobile devices",
      features: ["Responsive layout", "Touch-friendly", "Fast mobile loading", "App-like experience"],
      price: "From $400",
      icon: <Smartphone className="h-8 w-8 text-primary" />,
      popular: false
    }
  ];

  const technologies = [
    "React & Next.js", "Vue.js", "Angular", "Node.js", "PHP", "Python", "WordPress", "Shopify", "WooCommerce", "MongoDB", "MySQL", "PostgreSQL"
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Planning",
      description: "We analyze your requirements and create a detailed project plan"
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "Create wireframes and visual designs that align with your brand"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Build your website with clean, efficient code and thorough testing"
    },
    {
      step: "04",
      title: "Launch & Support",
      description: "Deploy your site and provide ongoing maintenance and support"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Code className="h-4 w-4" />
              Web Development
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Modern Web Development
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Custom websites, WordPress solutions, and modern web applications 
              tailored to your business needs. Built with cutting-edge technologies.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="text-lg px-8 py-6">
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Web Development <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From simple websites to complex web applications, we deliver solutions that drive results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Card key={index} className={`text-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                service.popular ? 'ring-2 ring-primary shadow-lg' : ''
              }`}>
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-3 py-1">
                      Popular
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    {service.icon}
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription className="text-base">{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-primary mb-4">{service.price}</div>
                  <ul className="space-y-2 mb-6 text-sm">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button asChild className="w-full">
                    <Link href="/contact">Get Started</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Technologies We <span className="text-primary">Use</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We stay up-to-date with the latest technologies to deliver modern, scalable solutions.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {technologies.map((tech, index) => (
              <Card key={index} className="text-center p-4 hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="text-sm font-medium">{tech}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Our Development <span className="text-primary">Process</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We follow a proven methodology to ensure your project is delivered on time and exceeds expectations.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {process.map((step, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-2xl font-bold">
                    {step.step}
                  </div>
                  <CardTitle className="text-xl">{step.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {step.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Build Your Website?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your project and create a stunning website that drives results for your business.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
                <Link href="/contact">
                  Start Your Project
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                <Link href="/services">
                  View All Services
                </Link>
              </Button>
            </div>
          </div>
      </div>
      </section>
    </div>
  );
}
