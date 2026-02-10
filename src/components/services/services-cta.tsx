"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

export function ServicesCTA() {
  return (
    <section className="py-20 bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Let&apos;s discuss your project and find the perfect solution for your business needs.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <Phone className="h-8 w-8 mx-auto mb-4 text-primary-foreground" />
                <h3 className="font-semibold mb-2">Call Us</h3>
                <p className="text-sm opacity-80 mb-4">+93 70 123 4567</p>
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Call Now
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <Mail className="h-8 w-8 mx-auto mb-4 text-primary-foreground" />
                <h3 className="font-semibold mb-2">Email Us</h3>
                <p className="text-sm opacity-80 mb-4">info@momtazhost.com</p>
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Send Email
                </Button>
              </CardContent>
            </Card>
            
            <Card className="bg-primary-foreground/10 border-primary-foreground/20">
              <CardContent className="pt-6 text-center">
                <MessageCircle className="h-8 w-8 mx-auto mb-4 text-primary-foreground" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-sm opacity-80 mb-4">Available 24/7</p>
                <Button variant="outline" size="sm" className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
                  Start Chat
                </Button>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" variant="secondary" className="text-lg px-8 py-6">
              <Link href="/contact">
                Get Free Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-lg px-8 py-6 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              <Link href="/domains">
                Start with Domain
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}


