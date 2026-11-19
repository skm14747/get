import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { allBlogSlugs, getBlogPostLocale } from "@/lib/blog";
import { resolvePrefixedRequest } from "@/lib/hreflang";
import { tools } from "@/lib/tools";
import { getToolTranslation } from "@/lib/translations";
import { pageMetadata } from "@/lib/seo";
import { BlogBody } from "@/components/blog-body";
import { INTENDED_LAUNCH_LOCALES } from "@/lib/locales";

export function generateStaticParams() {
  const slugs = allBlogSlugs();
  const locales = INTENDED_LAUNCH_LOCALES.filter((l) => l !== "en");
  return locales.flatMap((locale) => slugs.map((slug) => ({ locale, slug })));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!resolvePrefixedRequest(locale, null)) return {};
  const post = getBlogPostLocale(slug, locale);
  if (!post) return {};
  return pageMetadata({
    title: post.content.title,
    description: post.content.description,
    path: `/${locale}/blog/${slug}`,
  });
}

export default async function LocaleBlogPost({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!resolvePrefixedRequest(locale, null)) notFound();
  const post = getBlogPostLocale(slug, locale);
  if (!post) notFound();

  const relatedTools = post.toolIds.flatMap((id) => {
    const t = tools.find((tool) => tool.id === id);
    if (!t) return [];
    const translated = getToolTranslation(locale, t.id, t);
    return [{ ...t, name: translated.name, shortDescription: translated.shortDescription }];
  });

  const relatedLabel: Record<string, string> = {
    es: "Herramientas relacionadas",
    fr: "Outils associés",
    de: "Verwandte Tools",
    "pt-BR": "Ferramentas relacionadas",
    ar: "أدوات ذات صلة",
    ja: "関連ツール",
    hi: "संबंधित टूल्स",
    id: "Alat terkait",
    it: "Strumenti correlati",
  };

  return (
    <article className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <nav className="mb-6 text-sm text-muted">
        <Link href={`/${locale}/blog`} className="hover:text-accent">← Blog</Link>
      </nav>

      <header>
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{post.content.title}</h1>
        <p className="mt-2 text-muted">{post.content.description}</p>
        <time className="mt-1.5 block text-xs text-faint">{post.publishedAt}</time>
      </header>

      <BlogBody body={post.content.body} />

      {relatedTools.length > 0 && (
        <aside className="mt-10 rounded-lg border border-border bg-paper p-5">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-muted">
            {relatedLabel[locale] ?? "Related tools"}
          </h2>
          <ul className="mt-3 space-y-2">
            {relatedTools.map((t) => (
              <li key={t.id}>
                <Link href={`/${locale}${t.path}`} className="text-accent hover:underline">{t.name}</Link>
                <span className="ml-2 text-sm text-muted">{t.shortDescription}</span>
              </li>
            ))}
          </ul>
        </aside>
      )}
    </article>
  );
}
