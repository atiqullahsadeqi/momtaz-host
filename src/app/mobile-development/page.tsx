"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Code, 
  Zap, 
  Shield, 
  CheckCircle, 
  ArrowRight,
  Apple,
  SmartphoneIcon,
  Globe,
  Palette,
  BarChart3,
  Settings
} from "lucide-react";
import Link from "next/link";

export default function MobileDevelopmentPage() {
  const services = [
    {
      title: "iOS App Development",
      description: "Native iOS applications built with Swift and SwiftUI",
      features: ["Native performance", "App Store optimization", "iOS design guidelines", "Push notifications"],
      price: "From $1,000",
      icon: <Apple className="h-8 w-8 text-primary" />,
      popular: true
    },
    {
      title: "Android App Development",
      description: "Native Android applications built with Kotlin and Jetpack Compose",
      features: ["Material Design", "Google Play optimization", "Android compatibility", "Background services"],
      price: "From $1,000",
      icon: <SmartphoneIcon className="h-8 w-8 text-primary" />,
      popular: false
    },
    {
      title: "Cross-Platform Apps",
      description: "Single codebase for both iOS and Android using React Native or Flutter",
      features: ["Cost-effective", "Faster development", "Consistent UI", "Easy maintenance"],
      price: "From $800",
      icon: <Globe className="h-8 w-8 text-primary" />,
      popular: false
    },
    {
      title: "App UI/UX Design",
      description: "Beautiful and intuitive user interfaces for mobile applications",
      features: ["User research", "Wireframing", "Prototyping", "Design systems"],
      price: "From $500",
      icon: <Palette className="h-8 w-8 text-primary" />,
      popular: false
    }
  ];

  const technologies = [
    "React Native", "Flutter", "Swift", "Kotlin", "SwiftUI", "Jetpack Compose", "Xcode", "Android Studio", "Firebase", "AWS", "Figma", "Sketch"
  ];

  const process = [
    {
      step: "01",
      title: "Discovery & Strategy",
      description: "We analyze your requirements and create a comprehensive mobile strategy"
    },
    {
      step: "02", 
      title: "Design & Prototyping",
      description: "Create user-centered designs and interactive prototypes for testing"
    },
    {
      step: "03",
      title: "Development & Testing",
      description: "Build your app with clean code and comprehensive testing across devices"
    },
    {
      step: "04",
      title: "Launch & Maintenance",
      description: "Deploy to app stores and provide ongoing support and updates"
    }
  ];

  const benefits = [
    {
      icon: <Zap className="h-6 w-6 text-primary" />,
      title: "Native Performance",
      description: "Optimized apps that run smoothly on all devices and operating systems"
    },
    {
      icon: <Shield className="h-6 w-6 text-primary" />,
      title: "Security First",
      description: "Implement robust security measures to protect user data and privacy"
    },
    {
      icon: <BarChart3 className="h-6 w-6 text-primary" />,
      title: "Analytics & Insights",
      description: "Built-in analytics to track user behavior and app performance"
    },
    {
      icon: <Settings className="h-6 w-6 text-primary" />,
      title: "Scalable Architecture",
      description: "Apps designed to grow with your business and user base"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <Smartphone className="h-4 w-4" />
              Mobile Development
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
              Native & Cross-Platform Apps
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
        Native and cross-platform mobile applications for iOS and Android devices.
              Built with modern technologies and best practices.
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
              Our Mobile Development <span className="text-primary">Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              From native apps to cross-platform solutions, we deliver mobile experiences that users love.
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
              We use the latest mobile development technologies to create high-performance applications.
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
              We follow a proven methodology to ensure your mobile app is delivered on time and exceeds expectations.
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

      {/* Benefits */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Why Choose Our <span className="text-primary">Mobile Services</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              We deliver mobile applications that provide exceptional user experiences and drive business results.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 rounded-full bg-primary/10 w-fit">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-xl">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {benefit.description}
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
              Ready to Build Your Mobile App?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Let's discuss your mobile app idea and create a solution that engages users and drives business growth.
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
