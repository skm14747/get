import type { MetadataRoute } from "next";
import { browseGroups } from "@/lib/browse";
import { publishedIndexablePaths } from "@/lib/hreflang";
import { canonicalUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...publishedIndexablePaths(), ...browseGroups.map((group) => group.path)];
  return paths.map((path) => ({
    url: canonicalUrl(path),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
