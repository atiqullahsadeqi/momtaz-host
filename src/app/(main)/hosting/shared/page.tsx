"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheckBig, Shield, Server, Zap, Lock, Clock, HardDrive, Loader2 } from "lucide-react";
import Link from "next/link";

interface Plan {
  name: string;
  displayName: string;
  price: number;
  features: string[];
  isPopular: boolean;
}

export default function SharedHostingPage() {
  const [plans, setPlans] = useState<Plan[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPlans = async () => {
      try {
        console.log('[SharedHosting] Fetching plans from API...');
        const response = await fetch('/api/hosting/packages');
        console.log('[SharedHosting] Response status:', response.status);
        const data = await response.json();
        console.log('[SharedHosting] API response:', data);
        if (data.success) {
          console.log('[SharedHosting] Setting plans:', data.data);
          setPlans(data.data);
        } else {
          console.error('[SharedHosting] API returned success=false:', data.error);
        }
      } catch (error) {
        console.error('[SharedHosting] Error fetching plans:', error);
      } finally {
        console.log('[SharedHosting] Loading complete');
        setIsLoading(false);
      }
    };

    fetchPlans();
  }, []);

  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "DDoS Protection",
      description: "Advanced protection against distributed denial-of-service attacks"
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Free SSL Certificate",
      description: "Secure your website with free SSL encryption for all domains"
    },
    {
      icon: <Server className="h-8 w-8 text-primary" />,
      title: "Free cPanel",
      description: "Industry-leading control panel for easy website management"
    },
    {
      icon: <HardDrive className="h-8 w-8 text-primary" />,
      title: "Daily Backups",
      description: "Automatic daily backups to keep your data safe and secure"
    },
    {
      icon: <Zap className="h-8 w-8 text-primary" />,
      title: "99.9% Uptime",
      description: "Guaranteed uptime with redundant infrastructure"
    },
    {
      icon: <Clock className="h-8 w-8 text-primary" />,
      title: "24/7 Support",
      description: "Expert support team available around the clock"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Shared Hosting Plans
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Affordable, reliable, and feature-rich hosting perfect for websites of all sizes
          </p>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Choose Your Perfect Plan
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All plans include free SSL, cPanel, and 24/7 support
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`${plan.isPopular
                    ? "border-2 border-primary relative"
                    : "border border-primary/20"
                    } transition-all duration-300 shadow-none`}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-primary text-primary-foreground px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}
                  <CardContent className="p-6 h-full">
                    <div className="text-center flex flex-col gap-6 justify-between h-full">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {plan.displayName}
                        </h3>
                        <div className="mb-4">
                          <span className="text-3xl font-bold text-foreground">
                            ${plan.price.toFixed(2)}
                          </span>
                          <span className="text-muted-foreground text-sm">/month</span>
                        </div>
                      </div>
                      <ul className="space-y-3 text-left">
                        {plan.features.map((feature, featureIndex) => (
                          <li
                            key={featureIndex}
                            className="flex items-start text-sm gap-2"
                          >
                            <CircleCheckBig size={18} className="mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <Button
                        className="w-full"
                        variant={plan.isPopular ? "default" : "outline"}
                        asChild
                      >
                        <Link href={`/hosting/shared/order/${plan.name}`}>
                          Get Started
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Security & Features */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Security & Features Included
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Every hosting plan comes with enterprise-grade security and premium features
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {securityFeatures.map((feature, index) => (
              <Card key={index} className="border-none shadow-none">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-8 text-center">
              Why Choose Momtaz Host?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Lightning Fast Performance</h3>
                <p className="text-muted-foreground">
                  Our servers are optimized for speed with SSD storage, LiteSpeed web server, and advanced caching technologies.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Easy to Use</h3>
                <p className="text-muted-foreground">
                  Manage your hosting with the industry-standard cPanel control panel. Install WordPress and other apps with one click.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Expert Support</h3>
                <p className="text-muted-foreground">
                  Our experienced support team is available 24/7 to help you with any questions or issues.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold">Scalable Solutions</h3>
                <p className="text-muted-foreground">
                  Start small and upgrade as you grow. Easily scale your resources without any downtime.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of satisfied customers hosting their websites with Momtaz Host
          </p>
          <Button size="lg" variant="secondary" asChild>
            <Link href="#pricing">Choose Your Plan</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
