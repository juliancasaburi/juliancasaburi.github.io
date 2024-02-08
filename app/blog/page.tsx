import Link from "next/link";
import { getBlogPosts } from "../db/blog";
import { Button } from "@/components/ui/button";

export const metadata = {
  title: "Blog",
  description: "Read my thoughts on software development, design, and more.",
};

export default function BlogPage() {
  let allBlogs = getBlogPosts();

  return (
    <section className="container px-8 py-24">
      <h1 className="mb-8 text-2xl font-medium tracking-tighter">
        My thoughts on software development, design, and more.
      </h1>
      {allBlogs
        .sort((a, b) => {
          if (
            new Date(a.metadata.publishedAt) > new Date(b.metadata.publishedAt)
          ) {
            return -1;
          }
          return 1;
        })
        .map((post) => (
          <Link
            key={post.slug}
            className="mb-4 flex flex-col space-y-1"
            href={`/blog/${post.slug}`}
          >
            <div className="flex w-full flex-col justify-start items-start">
              <Button
                variant="link"
                className="p-0 tracking-tight text-neutral-900 dark:text-neutral-100"
                asChild
              >
                <p>{post.metadata.title}</p>
              </Button>
              <p className="text-muted-foreground">{post.metadata.publishedAt}</p>
            </div>
          </Link>
        ))}
    </section>
  );
}
