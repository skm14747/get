import Link from "next/link";
import { notFound } from "next/navigation";
import { HeroPreview } from "@/components/ui/hero-preview";
import { ToolCard } from "@/components/ui/tool-card";
import { categoryColorClasses, iconNameForGroup, ToolIcon } from "@/components/ui/tool-icon";
import { LocaleHomeClient, LocaleRecentTools } from "@/components/locale-home-client";
import { localePath, resolvePrefixedRequest } from "@/lib/hreflang";
import { browseGroups, toolsInGroup } from "@/lib/browse";
import { getLocale } from "@/lib/locales";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";
import { getToolTranslation, getPageHeadings, getCategoryName } from "@/lib/translations";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!resolvePrefixedRequest(locale, null)) return {};
  return pageMetadata({
    title: "Free browser tools",
    description: site.description,
    path: `/${locale}`,
    pageId: "home",
  });
}

const featured = ["word-counter", "percentage-calculator", "json-formatter", "image-compressor", "merge-pdf", "password-generator"];

export default async function PrefixedHome({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: code } = await params;
  if (!resolvePrefixedRequest(code, null)) notFound();

  const locale = getLocale(code);
  if (!locale) notFound();

  const headings = getPageHeadings(code);
  const hrefFor = (id: string) => localePath(locale, id as Parameters<typeof localePath>[1]) ?? `/${code}`;
  const translateTool = (tool: (typeof tools)[number]) => {
    const t = getToolTranslation(code, tool.id, tool);
    return { ...tool, name: t.name, shortDescription: t.shortDescription };
  };

  const featuredTools = featured.flatMap((id) => {
    const tool = tools.find((item) => item.id === id);
    return tool ? [translateTool(tool)] : [];
  });

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
      {/* ── Hero ── */}
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:tracking-[-0.02em]">{headings.heroTitle}</h1>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">{headings.heroSubtitle}</p>
          <LocaleHomeClient localeCode={code} />
          <ul className="mt-4 flex flex-wrap gap-2">
            {browseGroups.map((group) => (
              <li key={group.id}>
                <Link href={group.path} className="inline-flex h-8 items-center rounded-lg border border-line px-3 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:border-line-strong hover:text-ink">
                  {getCategoryName(code, group.id)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:block">
          <HeroPreview />
        </div>
      </section>

      {/* ── Featured tools ── */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-ink">{headings.popularTools}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <li key={tool.id}><ToolCard tool={tool} href={hrefFor(tool.id)} /></li>
          ))}
        </ul>
      </section>

      <LocaleRecentTools localeCode={code} />

      {/* ── Browse by category ── */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-ink">{headings.browseByCategory}</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {browseGroups.map((group) => {
            const colors = categoryColorClasses(group.id);
            const catName = getCategoryName(code, group.id);
            return (
              <li key={group.id}>
                <Link href={group.path} className="flex h-full gap-4 rounded-xl border border-line bg-surface p-5 no-underline transition-colors hover:border-line-strong">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.fg}`}>
                    <ToolIcon name={iconNameForGroup(group.id)} />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">{catName}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-muted">{group.summary}</span>
                    <span className="mt-1.5 block font-mono text-xs text-faint">{toolsInGroup(group).length === 1 ? "1 tool" : `${toolsInGroup(group).length} tools`}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* ── All tools ── */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-ink">{headings.allTools}</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {tools.map((tool) => {
            const path = localePath(locale, tool.id);
            if (!path) return null;
            const translated = translateTool(tool);
            return (
              <li key={tool.id}><ToolCard tool={translated} href={path} /></li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
