import type { Metadata } from "next";
import Link from "next/link";
import { HeroPreview } from "@/components/ui/hero-preview";
import { RecentTools } from "@/components/recent-tools";
import { ToolSearch } from "@/components/tool-search";
import { ToolCard } from "@/components/ui/tool-card";
import { categoryColorClasses, iconNameForGroup, ToolIcon } from "@/components/ui/tool-icon";
import { browseGroups, toolsInGroup } from "@/lib/browse";
import { pageMetadata } from "@/lib/seo";
import { site } from "@/lib/site";
import { tools } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Free browser tools",
  description: site.description,
  path: "/",
});

const featured = ["word-counter", "percentage-calculator", "json-formatter", "image-compressor", "merge-pdf", "password-generator"];

export default function HomePage() {
  const featuredTools = featured.flatMap((id) => {
    const tool = tools.find((item) => item.id === id);
    return tool ? [tool] : [];
  });
  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
      {/* ── Hero ── */}
      <section className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        <div>
          <h1 className="text-4xl font-medium tracking-tight text-ink sm:text-5xl sm:tracking-[-0.02em]">Count, calculate, convert — right here.</h1>
          <p className="mt-4 max-w-lg text-[0.9375rem] leading-relaxed text-muted">Text, math, images, and PDFs processed in your browser. No account, no upload.</p>
          <div id="search" className="mt-6 max-w-lg">
            <ToolSearch id="home-search" />
          </div>
          <ul className="mt-4 flex flex-wrap gap-2">
            {browseGroups.map((group) => (
              <li key={group.id}>
                <Link href={group.path} className="inline-flex h-8 items-center rounded-lg border border-line px-3 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:border-line-strong hover:text-ink">
                  {group.name}
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
        <h2 className="text-lg font-medium text-ink">Popular tools</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <li key={tool.id}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      </section>

      <RecentTools />

      {/* ── Browse by category ── */}
      <section className="mt-12">
        <h2 className="text-lg font-medium text-ink">Browse by category</h2>
        <ul className="mt-4 grid gap-3 md:grid-cols-2">
          {browseGroups.map((group) => {
            const colors = categoryColorClasses(group.id);
            return (
              <li key={group.id}>
                <Link href={group.path} className="flex h-full gap-4 rounded-xl border border-line bg-surface p-5 no-underline transition-colors hover:border-line-strong">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.fg}`}>
                    <ToolIcon name={iconNameForGroup(group.id)} />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">{group.name}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-muted">{group.summary}</span>
                    <span className="mt-1.5 block font-mono text-xs text-faint">{toolsInGroup(group).length === 1 ? "1 tool" : `${toolsInGroup(group).length} tools`}</span>
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
}
