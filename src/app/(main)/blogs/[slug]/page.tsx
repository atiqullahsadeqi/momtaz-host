import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-data";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <>
    <div className="bg-muted/20 py-8">
       <div className="max-w-3xl mx-auto">
         <Link
        href="/blogs"
        className=" inline-flex items-center  "
      >
        <ArrowLeft className="mr-2 size-4" />
        Back to all posts
      </Link>
       </div>
    </div>
    <div className="container mx-auto px-4 py-16 lg:px-16">
    

      <article className="mx-auto max-w-3xl">
        <div className="mb-8">
          <Badge variant="default" className="mb-4 rounded-full">
            {post.category}
          </Badge>
          <h1 className="mb-4 text-4xl font-bold lg:text-5xl">{post.title}</h1>
          <div className="flex items-center gap-4 text-muted-foreground text-sm">
            <span>{post.author}</span>
            <span>•</span>
            <span>{post.published}</span>
          </div>
        </div>

        <div className="mb-8 aspect-video w-full overflow-hidden rounded-lg">
          <img
            src={post.image}
            alt={post.title}
            className="h-full w-full object-cover"
          />
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
      </article>
    </div>
    </>
  );
}
