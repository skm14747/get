import { canonicalUrl } from "@/lib/site";
import { getLocale, launchLocales, type LaunchLocale, type LocaleCode } from "@/lib/locales";
import { tools } from "@/lib/tools";

export type IndexableId = "home" | "privacy" | "contact" | (typeof tools)[number]["id"];

export type HreflangLink = { hrefLang: string; href: string };

const STATIC_PATHS: Record<"home" | "privacy" | "contact", string> = {
  home: "/",
  privacy: "/privacy",
  contact: "/contact",
};

export function englishPath(page: IndexableId): string {
  if (page === "home" || page === "privacy" || page === "contact") return STATIC_PATHS[page];
  const tool = tools.find((item) => item.id === page);
  if (!tool) throw new Error(`Unknown page: ${page}`);
  return tool.path;
}

export function localePath(locale: LaunchLocale, page: IndexableId): string | null {
  if (!locale.published) return null;
  if (locale.urlStrategy === "unprefixed") return englishPath(page);
  const slug = page === "home" || page === "privacy" || page === "contact" ? page : locale.toolSlugs[page];
  if (!slug) return null;
  const prefix = `/${locale.code}`;
  if (page === "home") return prefix;
  return `${prefix}/${slug}`;
}

export function hreflangLinks(page: IndexableId, locales: readonly LaunchLocale[] = launchLocales): HreflangLink[] {
  const published = locales.filter((locale) => locale.published);
  if (published.length < 2) return [];
  const links: HreflangLink[] = [];
  for (const locale of published) {
    const path = localePath(locale, page);
    if (!path) return [];
    links.push({ hrefLang: locale.htmlLang, href: canonicalUrl(path) });
  }
  const fallback = published.find((locale) => locale.code === "en") ?? published[0];
  const fallbackPath = fallback ? localePath(fallback, page) : null;
  if (!fallbackPath) return [];
  links.push({ hrefLang: "x-default", href: canonicalUrl(fallbackPath) });
  return links;
}

export function hreflangIsReciprocal(page: IndexableId, locales: readonly LaunchLocale[] = launchLocales): boolean {
  const links = hreflangLinks(page, locales);
  if (links.length === 0) return locales.filter((locale) => locale.published).length < 2;
  const hrefs = new Set(links.map((link) => link.href));
  return locales
    .filter((locale) => locale.published)
    .every((locale) => {
      const path = localePath(locale, page);
      return path !== null && hrefs.has(canonicalUrl(path));
    });
}

export function resolvePrefixedRequest(code: string, page: string | null): { locale: LocaleCode; path: string } | null {
  const locale = getLocale(code);
  if (!locale || locale.urlStrategy !== "prefix") return null;
  if (!locale.published || publicationReady(locale) === false) return null;
  if (page === null) {
    const path = localePath(locale, "home");
    return path ? { locale: locale.code, path } : null;
  }
  const match = (Object.entries(locale.toolSlugs) as [IndexableId, string][]).find(([, slug]) => slug === page);
  const staticPage = page === "privacy" || page === "contact" ? page : null;
  const id = match?.[0] ?? staticPage;
  if (!id) return null;
  const path = localePath(locale, id);
  return path ? { locale: locale.code, path } : null;
}

function publicationReady(locale: LaunchLocale): boolean {
  if (!locale.published) return false;
  if (locale.urlStrategy === "unprefixed") return true;
  return Object.keys(locale.toolSlugs).length > 0;
}

export function publishedIndexablePaths(): string[] {
  const pages: IndexableId[] = ["home", "privacy", "contact", ...tools.map((tool) => tool.id)];
  const paths = new Set<string>();
  for (const locale of launchLocales) {
    for (const page of pages) {
      const path = localePath(locale, page);
      if (path) paths.add(path);
    }
  }
  return [...paths];
}
