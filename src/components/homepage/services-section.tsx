import React from "react";
import {
  Server,
  Globe,
  Mail,
  Code,
  Search,
  Database,
  Smartphone,
  Heart,
} from "lucide-react";

interface ServiceCard {
  title: string;
  description: string;
  icon: string;
  animationDelay?: string;
}

interface ServicesSectionProps {
  heading: string;
  description: string;
  services: ServiceCard[];
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  Server,
  Globe,
  Mail,
  Code,
  Search,
  Database,
  Smartphone,
  Heart,
};

export default function ServicesSection({
  heading,
  description,
  services,
}: ServicesSectionProps) {
  return (
    <section className="py-20 bg-muted/50 dark:bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description.split('\n').map((line, index) => (
              <React.Fragment key={index}>
                {line}
                {index < description.split('\n').length - 1 && <br />}
              </React.Fragment>
            ))}
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Server;
            
            return (
              <div
                key={index}
                className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
                style={{ animationDelay: service.animationDelay || "0.1s" }}
              >
                <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <IconComponent />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground mb-3">
                  {service.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

