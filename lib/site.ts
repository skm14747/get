export const site = {
  name: "GoEasyTools",
  description:
    "Free browser tools for text, calculators, images, and PDFs. Files and typed text stay in the browser.",
  locale: "en",
  htmlLang: "en",
  numberLocale: "en-US",
} as const;

export function siteUrl(): string {
  const configured = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  const url = configured && configured.length > 0 ? configured : "https://www.goeasytools.com";
  return url.replace(/\/$/, "");
}

export function canonicalUrl(path: string): string {
  const withoutHash = path.split("#")[0] ?? "/";
  const withoutQuery = withoutHash.split("?")[0] ?? "/";
  const withSlash = withoutQuery.startsWith("/") ? withoutQuery : `/${withoutQuery}`;
  const normalized = withSlash === "/" ? "/" : withSlash.replace(/\/+$/, "");
  return `${siteUrl()}${normalized}`;
}

export function contactEmail(): string | null {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim();
  if (!email || !email.includes("@")) return null;
  return email;
}
