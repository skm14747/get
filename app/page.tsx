import type { Metadata } from "next";
import Link from "next/link";
import { RecentTools } from "@/components/recent-tools";
import { ToolSearch } from "@/components/tool-search";
import { ToolCard } from "@/components/ui/tool-card";
import { categoryColorClasses, iconNameForGroup, ToolIcon } from "@/components/ui/tool-icon";
import { browseGroups, toolsInGroup } from "@/lib/browse";
import { pageMetadata } from "@/lib/seo";
import { canonicalUrl, site } from "@/lib/site";
import { tools } from "@/lib/tools";

export const metadata: Metadata = pageMetadata({
  title: "Free Browser Tools — Fast, Private, In-Browser Utilities",
  description: site.description,
  path: "/",
});

const featured = [
  "word-counter",
  "merge-pdf",
  "image-compressor",
  "percentage-calculator",
  "json-formatter",
  "jwt-decoder",
  "contrast-checker",
  "audio-trimmer",
  "password-generator",
];

export default function HomePage() {
  const featuredTools = featured.flatMap((id) => {
    const tool = tools.find((item) => item.id === id);
    return tool ? [tool] : [];
  });

  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free browser tools",
    description: site.description,
    numberOfItems: tools.length,
    itemListElement: tools.map((tool, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: tool.name,
      url: canonicalUrl(tool.path),
    })),
  };

  return (
    <div className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6 sm:py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }} />
      {/* ── Conversion-Oriented Hero ── */}
      <section className="mx-auto max-w-3xl text-center">
        <h1 className="text-3xl font-bold tracking-tight text-ink sm:text-5xl sm:tracking-[-0.02em]">
          Fast, free browser tools — 100% private.
        </h1>
        <p className="mt-3 text-base leading-relaxed text-muted sm:text-lg">
          Process text, PDFs, images, audio, and calculations directly in your browser. Zero server uploads, no accounts, and no data tracking.
        </p>

        {/* Prominent Search */}
        <div id="search" className="mt-6 mx-auto max-w-xl text-left">
          <ToolSearch id="home-search" />
        </div>

        {/* Category Quick Chips */}
        <ul className="mt-4 flex flex-wrap justify-center gap-1.5">
          {browseGroups.map((group) => (
            <li key={group.id}>
              <Link
                href={group.path}
                className="inline-flex h-8 items-center rounded-lg border border-line bg-surface px-3 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:border-line-strong hover:text-ink"
              >
                {group.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ── Privacy & Trust Highlights ── */}
      <section className="mt-10 rounded-2xl border border-line bg-surface p-5 sm:p-6" aria-label="Privacy & Security Guarantee">
        <div className="grid gap-6 sm:grid-cols-3 text-center sm:text-left">
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-action font-semibold text-sm">
              <span>🔒</span>
              <span>100% In-Browser</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Files, passwords, financial numbers, and documents are processed locally via WebAssembly and Canvas. Never uploaded to cloud servers.
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-action font-semibold text-sm">
              <span>⚡</span>
              <span>Instant Execution</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              No server upload queues or processing delays. Calculations, PDF merges, and image conversions execute immediately with local device hardware.
            </p>
          </div>
          <div className="space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-2 text-action font-semibold text-sm">
              <span>🆓</span>
              <span>Zero Friction</span>
            </div>
            <p className="text-xs text-muted leading-relaxed">
              Completely free with no user accounts, no credit cards, no email capture walls, and no artificial daily usage limits.
            </p>
          </div>
        </div>
      </section>

      {/* ── Recently Used Tools (for returning visitors) ── */}
      <RecentTools />

      {/* ── Popular Tools Immediately Visible ── */}
      <section className="mt-10">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-ink">Popular tools</h2>
          <span className="text-xs text-muted">Instant utility in 1 click</span>
        </div>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <li key={tool.id}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      </section>

      {/* ── Browse by Category ── */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold tracking-tight text-ink">Browse by category</h2>
          <span className="text-xs text-muted">{browseGroups.length} categories</span>
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          {browseGroups.map((group) => {
            const colors = categoryColorClasses(group.id);
            return (
              <li key={group.id}>
                <Link href={group.path} className="flex h-full gap-4 rounded-xl border border-line bg-surface p-4 no-underline transition-colors hover:border-line-strong">
                  <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.fg}`}>
                    <ToolIcon name={iconNameForGroup(group.id)} />
                  </span>
                  <span>
                    <span className="block text-[0.9375rem] font-medium text-ink">{group.name}</span>
                    <span className="mt-0.5 block text-[0.8125rem] leading-relaxed text-muted line-clamp-2">{group.summary}</span>
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
