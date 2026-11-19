import type { Metadata } from "next";
import Link from "next/link";
import { blogPostsForLocale } from "@/lib/blog";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Blog: Practical Browser Tool Guides",
  description:
    "Practical guides on stacked discounts, Wi-Fi QR codes, PDF signing, and browser privacy without uploading your files.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = blogPostsForLocale("en");

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Blog</h1>
      <p className="mt-2 text-muted">Practical guides and tips powered by free browser tools.</p>

      <ul className="mt-8 divide-y divide-border">
        {posts.map((post) => (
          <li key={post.slug} className="py-5">
            <Link href={`/blog/${post.slug}`} className="group block">
              <h2 className="text-lg font-semibold group-hover:text-accent">{post.content.title}</h2>
              <p className="mt-1 text-sm text-muted">{post.content.description}</p>
              <time className="mt-1.5 block text-xs text-faint">{post.publishedAt}</time>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
