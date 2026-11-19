import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogSlugs, getBlogPostLocale } from "@/lib/blog";
import { tools } from "@/lib/tools";
import { pageMetadata } from "@/lib/seo";
import { BlogBody } from "@/components/blog-body";

export function generateStaticParams() {
  return allBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostLocale(slug, "en");
  if (!post) return {};
  return pageMetadata({
    title: post.content.title,
    description: post.content.description,
    path: `/blog/${slug}`,
  });
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getBlogPostLocale(slug, "en");
  if (!post) notFound();

  const relatedTools = post.toolIds.flatMap((id) => {
    const t = tools.find((tool) => tool.id === id);
    return t ? [t] : [];
  });

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href="/blog" className="hover:text-accent">← Blog</Link>
      </nav>

      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{post.content.title}</h1>
        <p className="mt-2 text-muted">{post.content.description}</p>
        <time className="mt-1.5 block text-xs text-faint">{post.publishedAt}</time>
      </header>

      <BlogBody body={post.content.body} />

      {relatedTools.length > 0 && (
        <aside className="mt-10 rounded-lg border border-border bg-paper p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">Related tools</h2>
          <ul className="mt-3 space-y-2">
            {relatedTools.map((t) => (
              <li key={t.id}>
                <Link href={t.path} className="text-accent hover:underline">{t.name}</Link>
                <span className="ml-2 text-sm text-muted">{t.shortDescription}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
