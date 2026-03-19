import React from "react";
import {
  CheckCircle,
  Headphones,
  Shield,
  Zap,
  Download,
  DollarSign,
} from "lucide-react";
import TrueFocus from "../TrueFocus";

export default function WhyChooseUs() {
  const features = [
    {
      title: "99.9% Uptime Guarantee",
      description:
        "Your website stays online with our industry-leading uptime guarantee. We monitor our servers 24/7 to ensure maximum availability.",
      icon: CheckCircle,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
    {
      title: "24/7 Expert Support",
      description:
        "Our experienced support team is available around the clock to help you with any hosting-related questions or issues.",
      icon: Headphones,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
    {
      title: "Free SSL Certificates",
      description:
        "Secure your website with free SSL certificates. All our hosting plans include automatic SSL installation and renewal.",
      icon: Shield,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
    {
      title: "Lightning Fast Speed",
      description:
        "Experience blazing-fast website loading times with our SSD storage, CDN integration, and optimized server configurations.",
      icon: Zap,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
    {
      title: "Free Website Migration",
      description:
        "Moving from another host? Our experts will migrate your website for free with zero downtime and no data loss.",
      icon: Download,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
    {
      title: "30-Day Money Back",
      description:
        "Not satisfied? Get a full refund within 30 days. We're confident you'll love our hosting services.",
      icon: DollarSign,
      iconColorClass: "text-brand-green",
      iconBgClass: "bg-brand-green/10",
      iconBorderClass: "border-brand-green/20",
    },
  ];

  const stats = [
    { number: 370, label: "Happy Customers", suffix: "+" },
    { number: 99.9, label: "Uptime", suffix: "%" },
    { number: 24, label: "Expert Support", suffix: "/7" },
    { number: 20, label: "Years Experience", suffix: "+" },
  ];

  return (
    <section className="w-full bg-muted/5   relative overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1200px] mx-auto  border-border/60 bg-background flex flex-col shadow-sm">

        {/* Section Header */}
        <div className="border-b border-border/60 p-10 lg:p-16 flex flex-col items-center text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Why Momtaz Host?
          </h2>
          <p className="text-base text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            We&apos;re committed to providing the best hosting experience with <br className="hidden sm:block" />
            unmatched reliability, security, and support.
          </p>
        </div>

        {/* Features List (Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-px bg-border/60">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-background p-8 lg:p-10 flex flex-col"
            >
              <div className={`w-12 h-12 mb-6 rounded-xl border ${feature.iconBorderClass} ${feature.iconBgClass} flex items-center justify-center`}>
                <feature.icon className={`h-5 w-5 ${feature.iconColorClass}`} strokeWidth={2} />
              </div>
              <h3 className="text-xl font-bold tracking-tight mb-3 text-foreground">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed pr-2">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section (Grid) */}
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-4 w-full  ">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-primary p-8 lg:p-12 flex flex-col items-center justify-center text-center text-primary-foreground"
              >
                <div className="text-4xl lg:text-5xl font-bold mb-3 tracking-tighter flex items-center">
                  {stat.number}
                  <span className="text-3xl lg:text-4xl">{stat.suffix}</span>
                </div>
                <div className="text-sm font-semibold text-primary-foreground/90 tracking-wide uppercase">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="py-12">
          <TrueFocus
            sentence="Build. Host. Grow."
            manualMode={false}
            blurAmount={5}
            borderColor="#00C897"
            animationDuration={0.5}
            pauseBetweenAnimations={1}
          />
        </div>
      </div>
    </section>
  );
}
