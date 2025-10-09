import React from "react";
import { Card, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function BlogsSection() {
  const featuredPost = {
    id: 1,
    title: "Exploring the Future of AI in Modern Technology Trends",
    image: "/images/Blog-1.png",
    category: "Technology",
    excerpt:
      "Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence. Discover how AI is transforming industries and learn about the latest advancements in artificial intelligence.",
  };

  const popularPosts = [
    {
      id: 2,
      title: "Strategies for Effective Business Growth in 2025",
      image: "/images/Blog-2.png",
      category: "Business",
      excerpt:
        "Learn proven strategies to grow your business and stay competitive in the ever-evolving market landscape.",
    },
    {
      id: 3,
      title: "Top Wellness Trends to Improve Your Health in 2025",
      image: "/images/BLog-3.png",
      category: "Health & Wellness",
      excerpt:
        "Explore the top wellness trends that can help you achieve a healthier and more balanced lifestyle.",
    },
    {
      id: 4,
      title: "Boosting Productivity with Smart Tools and Techniques",
      image: "/images/Blog-4.png",
      category: "Productivity",
      excerpt:
        "Find out how to enhance your productivity using the latest tools and techniques for better time management.",
    },
  ];

  return (
    <section className="py-20 bg-primary/10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">
            Blogs & Updates
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Stay informed with the latest insights, news, and expert tips on
            technology, web solutions, and digital innovation to help your
            business grow.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Featured Post */}
          <div className="bg-primary/10 rounded-lg overflow-hidden">
            <Image
              src={featuredPost.image}
              alt={featuredPost.title}
              width={600}
              height={400}
              className="w-full aspect-[4/3] object-cover"
            />
          </div>

          <div className="flex flex-col justify-center">
            <Badge className="w-fit mb-2">{featuredPost.category}</Badge>
            <h2 className="text-3xl font-bold mb-4 leading-tight">
              {featuredPost.title}
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              {featuredPost.excerpt}
            </p>
          </div>
        </div>

        {/* Popular Posts Section */}
        <div>
          <h3 className="text-2xl font-bold  mb-8">Popular Posts</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {popularPosts.map((post) => (
              <Card key={post.id} className=" border-0 overflow-hidden pt-0">
                <Image
                  src={post.image}
                  alt={post.title}
                  width={400}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <Badge className="w-fit mb-2">{post.category}</Badge>
                  <h4 className="text-xl font-bold  mb-3 leading-tight">
                    {post.title}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {post.excerpt}
                  </p>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
