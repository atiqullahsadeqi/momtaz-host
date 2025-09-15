import React from "react";
import { CheckCircle, Headphones, Shield, Zap, Download, ShieldCheck } from "lucide-react";

interface FeatureCard {
  title: string;
  description: string;
  icon: string;
  iconColor?: string;
}

interface StatItem {
  number: string;
  label: string;
}

interface WhyChooseUsProps {
  heading: string;
  description: string;
  features: FeatureCard[];
  stats: {
    stats: StatItem[];
  };
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  CheckCircle,
  Headphones,
  Shield,
  Zap,
  Download,
  ShieldCheck,
};

export default function WhyChooseUs({
  heading,
  description,
  features,
  stats,
}: WhyChooseUsProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = iconMap[feature.icon] || iconMap.CheckCircle;
            
            return (
              <div
                key={index}
                className="group bg-card p-8 rounded-2xl border border-border hover:shadow-xl transition-all duration-300 hover:-translate-y-2 animate-fade-in-up"
              >
                <div className="w-12 h-12 bg-muted dark:bg-input/50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <IconComponent />
                </div>
                <h3 className="text-2xl font-bold text-card-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Stats Section */}
        <div className="mt-20 bg-muted/50  rounded-3xl p-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {stats?.stats?.map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

