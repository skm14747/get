import type { Metadata } from "next";
import Link from "next/link";
import { browseGroups } from "@/lib/browse";
import { guideEntries } from "@/lib/guide-content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "Free Tool Guides — Tips, Workflows & Best Practices",
  description:
    "Browse educational guides for text tools, calculators, developer utilities, image editors, PDF tools, converters, and more. Learn workflows, tips, and when to use which tool.",
  path: "/guides",
});

export default function GuidesIndexPage() {
  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li>
            <Link href="/" className="no-underline transition-colors hover:text-ink">Home</Link>
          </li>
          <li aria-hidden="true" className="text-faint">/</li>
          <li aria-current="page" className="text-ink">Guides</li>
        </ol>
      </nav>

      <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
        Tool guides &amp; tutorials
      </h1>
      <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
        In-depth guides covering tips, common workflows, and best practices for every tool category on GoEasyTools.
      </p>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {guideEntries.map((guide) => {
          const group = browseGroups.find((g) => g.id === guide.slug);
          return (
            <li key={guide.slug}>
              <Link
                href={`/guides/${guide.slug}`}
                className="flex h-full flex-col rounded-xl border border-line bg-surface p-5 no-underline transition-colors hover:border-line-strong"
              >
                <h2 className="text-base font-semibold text-ink">
                  {group?.name ?? guide.slug}
                </h2>
                <p className="mt-1.5 flex-1 text-sm leading-relaxed text-muted">
                  {guide.metaDescription}
                </p>
                <span className="mt-3 text-[0.8125rem] font-medium text-action">
                  Read guide →
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </article>
  );
}
