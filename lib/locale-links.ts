import { localePath, type IndexableId } from "@/lib/hreflang";
import { getLocale, launchLocales } from "@/lib/locales";
import { tools } from "@/lib/tools";

/**
 * Given a pathname like `/percentage-calculator` or `/es/calculadora-de-porcentajes`,
 * returns the IndexableId for the page, or null if not recognized.
 */
export function pageIdFromPathname(pathname: string): IndexableId | null {
  const trimmed = pathname.replace(/\/$/, "") || "/";

  if (trimmed === "/") return "home";
  if (trimmed === "/privacy") return "privacy";
  if (trimmed === "/contact") return "contact";

  const tool = tools.find((t) => t.path === trimmed);
  if (tool) return tool.id as IndexableId;

  const segments = trimmed.split("/").filter(Boolean);
  if (segments.length >= 1) {
    const locale = getLocale(segments[0]);
    if (locale) {
      if (segments.length === 1) return "home";
      const slug = segments[1];
      if (slug === "privacy") return "privacy";
      if (slug === "contact") return "contact";
      const entry = (Object.entries(locale.toolSlugs) as [string, string][]).find(([, s]) => s === slug);
      if (entry) return entry[0] as IndexableId;
    }
  }

  return null;
}

export type LocaleLink = {
  code: string;
  name: string;
  href: string;
  active: boolean;
};

const LOCALE_NAMES: Record<string, string> = {
  en: "English",
  es: "Español",
  fr: "Français",
  ar: "العربية",
  "pt-BR": "Português (BR)",
  de: "Deutsch",
  ja: "日本語",
  hi: "हिन्दी",
  id: "Bahasa Indonesia",
  it: "Italiano",
};

/**
 * Returns locale links for the current page.
 * Each link points to the same page in the target locale.
 */
export function localeLinksForPage(pathname: string): LocaleLink[] {
  const pageId = pageIdFromPathname(pathname);
  if (!pageId) return fallbackLinks();

  const currentLocaleCode = detectLocale(pathname);

  return launchLocales
    .filter((l) => l.published)
    .map((locale) => {
      const href = localePath(locale, pageId) ?? (locale.urlStrategy === "unprefixed" ? "/" : `/${locale.code}`);
      return {
        code: locale.code,
        name: LOCALE_NAMES[locale.code] ?? locale.code,
        href,
        active: locale.code === currentLocaleCode,
      };
    });
}

function detectLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length >= 1) {
    const locale = getLocale(segments[0]);
    if (locale && locale.urlStrategy === "prefix") return locale.code;
  }
  return "en";
}

function fallbackLinks(): LocaleLink[] {
  return launchLocales
    .filter((l) => l.published)
    .map((locale) => ({
      code: locale.code,
      name: LOCALE_NAMES[locale.code] ?? locale.code,
      href: locale.urlStrategy === "unprefixed" ? "/" : `/${locale.code}`,
      active: false,
    }));
}
