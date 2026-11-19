import type { Metadata } from "next";
import { hreflangLinks, type IndexableId } from "@/lib/hreflang";
import { canonicalUrl, site } from "@/lib/site";
import type { ToolDefinition } from "@/lib/tools";

export function pageMetadata(input: {
  title: string;
  description: string;
  path: string;
  pageId?: IndexableId;
}): Metadata {
  const url = canonicalUrl(input.path);
  const languages = input.pageId ? hreflangLinks(input.pageId) : [];
  return {
    title: { absolute: `${input.title} · ${site.name}` },
    description: input.description,
    alternates: {
      canonical: url,
      ...(languages.length > 0
        ? { languages: Object.fromEntries(languages.map((link) => [link.hrefLang, link.href])) }
        : {}),
    },
    openGraph: {
      title: input.title,
      description: input.description,
      url,
      siteName: site.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: `${canonicalUrl("/opengraph-image")}`,
          width: 1200,
          height: 630,
          alt: `${input.title} · ${site.name}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: input.title,
      description: input.description,
      images: [`${canonicalUrl("/opengraph-image")}`],
    },
    robots: { index: true, follow: true },
  };
}

export function toolMetadata(tool: ToolDefinition): Metadata {
  return pageMetadata({
    title: tool.title,
    description: tool.metaDescription,
    path: tool.path,
  });
}
