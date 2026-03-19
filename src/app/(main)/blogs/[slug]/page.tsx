import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-data";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <div className="w-full flex flex-col items-center">

      {/* Hero banner */}
      <section className="w-full relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${post.image})`,
            maskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, black 30%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-0 backdrop-blur-xl bg-background/60"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 10%, white 100%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 10%, white 100%)",
          }}
        />
        <div className="relative z-10 max-w-[1100px] mx-auto px-6 pt-12 pb-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to all posts
          </Link>
          <div className="flex items-center gap-2 mb-4">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-brand-green/10 border border-brand-green/20 text-brand-green text-[10px] font-semibold">
              <Tag className="h-3 w-3" />
              {post.category}
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.1] mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1"><User className="h-3.5 w-3.5" />{post.author}</span>
            <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{post.published}</span>
          </div>
        </div>
      </section>

      {/* Featured image */}
      <section className="w-full px-6">
        <div className="max-w-[1100px] mx-auto -mt-2">
          <div className="rounded-2xl overflow-hidden border border-border/60">
            <img
              src={post.image}
              alt={post.title}
              className="w-full aspect-[21/9] object-cover"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="w-full px-6 py-12">
        <article className="max-w-[720px] mx-auto prose prose-lg dark:prose-invert prose-headings:font-extrabold prose-headings:tracking-tight prose-a:text-brand-green">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </article>
      </section>

      {/* Back link */}
      <section className="w-full px-6 pb-20">
        <div className="max-w-[720px] mx-auto border-t border-border/60 pt-8">
          <Link
            href="/blogs"
            className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all posts
          </Link>
        </div>
      </section>
    </div>
  );
}
