import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPostsForLocale } from "@/lib/blog";
import { resolvePrefixedRequest } from "@/lib/hreflang";
import { pageMetadata } from "@/lib/seo";
import { getUiMessages } from "@/lib/translations";

const blogHeadings: Record<string, { title: string; subtitle: string }> = {
  es: { title: "Blog", subtitle: "Guías prácticas y consejos con herramientas gratuitas del navegador." },
  fr: { title: "Blog", subtitle: "Guides pratiques et astuces avec des outils gratuits dans le navigateur." },
  de: { title: "Blog", subtitle: "Praktische Anleitungen und Tipps mit kostenlosen Browser-Tools." },
  "pt-BR": { title: "Blog", subtitle: "Guias práticos e dicas com ferramentas gratuitas no navegador." },
  ar: { title: "المدونة", subtitle: "أدلة عملية ونصائح باستخدام أدوات مجانية في المتصفح." },
  ja: { title: "ブログ", subtitle: "無料ブラウザツールを活用した実用ガイドとヒント。" },
  hi: { title: "ब्लॉग", subtitle: "मुफ़्त ब्राउज़र टूल्स के साथ व्यावहारिक गाइड और सुझाव।" },
  id: { title: "Blog", subtitle: "Panduan praktis dan tips dengan alat browser gratis." },
  it: { title: "Blog", subtitle: "Guide pratiche e suggerimenti con strumenti gratuiti nel browser." },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!resolvePrefixedRequest(locale, null)) return {};
  return pageMetadata({
    title: `Blog: ${blogHeadings[locale]?.title ?? "Guides"}`,
    description: blogHeadings[locale]?.subtitle ?? "Practical guides powered by free browser tools.",
    path: `/${locale}/blog`,
  });
}

export default async function LocaleBlogIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!resolvePrefixedRequest(locale, null)) notFound();

  const posts = blogPostsForLocale(locale);
  const ui = getUiMessages(locale);
  const heading = blogHeadings[locale] ?? { title: "Blog", subtitle: "Practical guides powered by free browser tools." };

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{heading.title}</h1>
      <p className="mt-2 text-muted">{heading.subtitle}</p>

      <ul className="mt-8 divide-y divide-border">
        {posts.map((post) => (
          <li key={post.slug} className="py-5">
            <Link href={`/${locale}/blog/${post.slug}`} className="group block">
              <h2 className="text-lg font-semibold group-hover:text-accent">{post.content.title}</h2>
              <p className="mt-1 text-sm text-muted">{post.content.description}</p>
              <time className="mt-1.5 block text-xs text-faint">{post.publishedAt}</time>
            </Link>
          </li>
        ))}
      </ul>

      <nav className="mt-8 text-sm text-muted">
        <Link href={`/${locale}`} className="hover:text-accent">← {ui.home}</Link>
      </nav>
    </div>
  );
}
