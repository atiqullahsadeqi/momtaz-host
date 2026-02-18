import React from "react";
import Image from "next/image";
import CountUp from "../CountUp";
import {
  CheckCircle,
  Headphones,
  Shield,
  Zap,
  Download,
  DollarSign,
} from "lucide-react";

export default function WhyChooseUs() {
  const features = [
    {
      title: "99.9% Uptime Guarantee",
      description:
        "Your website stays online with our industry-leading uptime guarantee. We monitor our servers 24/7 to ensure maximum availability.",
      icon: CheckCircle,
      iconColor: "green-600",
    },
    {
      title: "24/7 Expert Support",
      description:
        "Our experienced support team is available around the clock to help you with any hosting-related questions or issues.",
      icon: Headphones,
      iconColor: "blue-600",
    },
    {
      title: "Free SSL Certificates",
      description:
        "Secure your website with free SSL certificates. All our hosting plans include automatic SSL installation and renewal.",
      icon: Shield,
      iconColor: "purple-600",
    },
    {
      title: "Lightning Fast Speed",
      description:
        "Experience blazing-fast website loading times with our SSD storage, CDN integration, and optimized server configurations.",
      icon: Zap,
      iconColor: "orange-600",
    },
    {
      title: "Free Website Migration",
      description:
        "Moving from another host? Our experts will migrate your website for free with zero downtime and no data loss.",
      icon: Download,
      iconColor: "teal-600",
    },
    {
      title: "30-Day Money Back",
      description:
        "Not satisfied? Get a full refund within 30 days. We're confident you'll love our hosting services.",
      icon: DollarSign,
      iconColor: "red-600",
    },
  ];

  const stats = [
    { number: 370, label: "Happy Customers" },
    { number: 99.9, label: "Uptime" },
    { number: 24, label: "Expert Support" },
    { number: 20, label: "Years Experience" },
  ];

  return (
    <section className="py-20 bg-muted/3">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4 ">
            Why Momtaz Host?
          </h2>
          <p className="text-sm  max-w-2xl mx-auto">
            We&apos;re committed to providing the best hosting experience with <br />
            unmatched reliability, security, and support.
          </p>
        </div>

        <div className="w-full md:w-7xl mx-auto  gap-12 items-start">
          {/* Features List */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div key={index} className="flex flex-col gap-4">
                <div className="h-12 w-12 bg-primary/10 rounded-md flex items-center justify-center">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold ">{feature.title}</h3>
                <p className="text-sm ">{feature.description}</p>
              </div>
            ))}
          </div>

          {/* Image */}
          <div className="relative  ">
            <div className="grid grid-cols-4 gap-4 bg-muted/10 bg-cover bg-center rounded-lg p-4 h-50 mt-10">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center"
                >
                  <div className="text-3xl lg:text-4xl flex font-bold  mb-2">
                    <h2 className="">{stat.number}</h2>
                  
                    {stat.label === "Uptime" ? (
                      <span className="">%</span>
                    ) : stat.label === "Happy Customers" ? (
                      <span className="">+</span>
                    ) : stat.label === "Expert Support" ? (
                      <span className="">/7</span>
                    ) : stat.label === "Years Experience" ? (
                      <span className="">+</span>
                    ) : (
                      <span className="">+</span>
                    )}
                  </div>
                  <div className="font-bold ">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
