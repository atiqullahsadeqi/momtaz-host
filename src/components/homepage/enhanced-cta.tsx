import React from "react";
import { Button } from "@/components/ui/button";
import { Zap, Shield, Headphones } from "lucide-react";

export default function EnhancedCta() {
  const trustIndicators = [
    {
      title: "Quick Setup",
      description:
        "Get your website online in minutes with our easy setup process.",
      icon: Zap,
    },
    {
      title: "Secure & Reliable",
      description: "99.9% uptime guarantee with enterprise-grade security.",
      icon: Shield,
    },
    {
      title: "24/7 Support",
      description:
        "Expert support team available around the clock to help you.",
      icon: Headphones,
    },
  ];

  return (
    <>
      {/* Ready to Get Started Section */}
      <section className="py-20 ">
        <div className="container mx-auto px-4 bg-primary/3 rounded-md py-16">
          <div className="text-center">
            <h2 className="text-3xl lg:text-4xl font-bold  mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-sm text-muted-foreground mb-12 max-w-3xl mx-auto">
              Join thousands of satisfied customers who trust Momtaz Host for{" "}
              <br />
              their hosting needs. Get started today and experience the
              difference.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button size="sm" >
                Get Started Now
              </Button>
              <Button variant="outline" size="sm" >
                Contact Sales
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {trustIndicators.map((indicator, index) => {
                const IconComponent = indicator.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">
                      {indicator.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {indicator.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
