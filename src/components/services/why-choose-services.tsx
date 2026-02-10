"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Award, 
  Clock, 
  Headphones, 
  Shield, 
  Users, 
  Zap,
  Star
} from "lucide-react";

export function WhyChooseServices() {
  const features = [
    {
      icon: <Award className="h-6 w-6 text-primary" />,
      title: "Expert Team",
      description: "Our certified professionals bring years of experience and industry expertise to every project."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary" />,
      title: "Fast Delivery",
      description: "We understand the importance of time and deliver projects on schedule without compromising quality."
    },
    {
      icon: <Headphones className="h-6 w-6 text-primary" />,
      title: "24/7 Support",
      description: "Round-the-clock customer support to ensure your services run smoothly at all times."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security measures and reliable infrastructure to protect your digital assets."
    },
    {
      icon: <Users className="h-6 w-6 text-primary" />,
      title: "Client-Focused",
      description: "We prioritize your needs and work closely with you to achieve your business objectives."
    },
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Modern Technology",
      description: "We use the latest technologies and best practices to deliver cutting-edge solutions."
    }
  ];

  const stats = [
    { number: "500+", label: "Projects Completed" },
    { number: "98%", label: "Client Satisfaction" },
    { number: "24/7", label: "Support Available" },
    { number: "5+", label: "Years Experience" }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Why Choose <span className="text-primary">Our Services</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We&apos;re committed to delivering exceptional value and results that exceed your expectations.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                {stat.number}
              </div>
              <div className="text-muted-foreground font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="text-center hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 text-center">
          <Card className="max-w-4xl mx-auto bg-primary/5 border-primary/20">
            <CardContent className="pt-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl italic text-muted-foreground mb-6">
                &quot;Momtaz Host has been instrumental in our digital transformation. 
                Their expertise in web development and database optimization helped us 
                scale our business efficiently. Highly recommended!&quot;
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <div className="font-semibold">Sarah Johnson</div>
                  <div className="text-sm text-muted-foreground">CEO, TechStart Inc.</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}


