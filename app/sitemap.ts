import type { MetadataRoute } from "next";
import { browseGroups } from "@/lib/browse";
import { allBlogSlugs } from "@/lib/blog";
import { publishedIndexablePaths } from "@/lib/hreflang";
import { INTENDED_LAUNCH_LOCALES } from "@/lib/locales";
import { canonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolPaths = [...publishedIndexablePaths(), ...browseGroups.map((group) => group.path)];

  const slugs = allBlogSlugs();
  const blogPaths = [
    "/blog",
    ...slugs.map((s) => `/blog/${s}`),
    ...INTENDED_LAUNCH_LOCALES.filter((l) => l !== "en").flatMap((locale) => [
      `/${locale}/blog`,
      ...slugs.map((s) => `/${locale}/blog/${s}`),
    ]),
  ];

  return [
    ...toolPaths.map((path) => ({
      url: canonicalUrl(path),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : 0.8,
    })),
    ...blogPaths.map((path) => ({
      url: canonicalUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/blog" ? 0.7 : 0.6,
    })),
  ];
}
