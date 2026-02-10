import React from "react";
import { Button } from "@/components/ui/button";

interface Testimonial {
  quote: string;
  author: string;
  position: string;
  rating: number;
  avatar: {
    initials: string;
    backgroundColor: "primary" | "secondary" | "accent";
  };
}

interface OverallRating {
  rating: number;
  maxRating: number;
  reviewCount: string;
  description: string;
  ctaText: string;
}

interface TestimonialsProps {
  heading: string;
  description: string;
  testimonials: Testimonial[];
  overallRating: OverallRating;
}


const getAvatarColor = (index: number) => {
  const colors = [
    "bg-blue-500",
    "bg-green-500",
    "bg-purple-500",
    "bg-orange-500",
    "bg-teal-500",
    "bg-pink-500",
  ];
  return colors[index % colors.length];
};

export default function Testimonials({
  heading,
  description,
  testimonials,
  overallRating,
}: TestimonialsProps) {
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-card p-8 rounded-2xl hover:shadow-lg transition-all duration-300 border border-border"
            >
              <div className="flex items-center mb-6">
                <div className="flex text-yellow-400">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg
                      key={i}
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <blockquote className="text-card-foreground mb-6 italic">
                &quot;{testimonial.quote}&quot;
              </blockquote>
              <div className="flex items-center">
                <div className={`w-12 h-12 ${getAvatarColor(index)} rounded-full flex items-center justify-center text-white font-bold text-lg mr-4`}>
                  {testimonial.avatar.initials}
                </div>
                <div>
                  <div className="font-semibold text-card-foreground">
                    {testimonial.author}
                  </div>
                  <div className="text-muted-foreground text-sm">
                    {testimonial.position}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Overall Rating */}
        <div className="mt-16 text-center">
          <div className="bg-muted/50 rounded-2xl p-8 max-w-2xl mx-auto">
            <div className="flex justify-center items-center mb-4">
              <div className="flex text-yellow-400 text-2xl">
                {[...Array(overallRating.maxRating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-8 h-8"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="ml-3 text-3xl font-bold text-foreground">
                {overallRating.rating}/{overallRating.maxRating}
              </span>
            </div>
            <p className="text-lg text-muted-foreground mb-4">
              Based on{" "}
              <span className="font-semibold text-primary">
                {overallRating.reviewCount}
              </span>{" "}
              {overallRating.description}
            </p>
            <Button size="lg">{overallRating.ctaText}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}

