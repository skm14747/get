import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/ui/tool-card";
import { browseGroups, toolsInGroup } from "@/lib/browse";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return browseGroups.map((group) => ({ topic: group.id }));
}

export function generateMetadata({ params }: { params: Promise<{ topic: string }> }): Promise<Metadata> {
  return params.then(({ topic }) => {
    const group = browseGroups.find((item) => item.id === topic);
    if (!group) return {};
    return pageMetadata({ title: group.name, description: group.summary, path: group.path });
  });
}

export default async function TopicPage({ params }: { params: Promise<{ topic: string }> }) {
  const { topic } = await params;
  const group = browseGroups.find((item) => item.id === topic);
  if (!group) notFound();
  const items = toolsInGroup(group);
  return (
    <article className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href="/" className="no-underline transition-colors hover:text-ink">Home</Link></li>
          <li aria-hidden="true" className="text-faint">/</li>
          <li aria-current="page" className="text-ink">{group.name}</li>
        </ol>
      </nav>
      <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">{group.name}</h1>
      <p className="mt-1.5 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">{group.summary}</p>

      {/* ── Pillar overview ── */}
      <section className="mt-6 max-w-3xl rounded-xl border border-line bg-surface p-6">
        <h2 className="text-base font-semibold text-ink sm:text-lg">About {group.name}</h2>
        <p className="mt-2 text-sm leading-relaxed text-muted">{group.overview}</p>
        <h3 className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted">What you can do</h3>
        <ul className="mt-2 space-y-1.5 text-sm text-ink">
          {group.keyUseCases.map((useCase) => (
            <li key={useCase} className="flex items-start gap-2">
              <span className="text-action shrink-0">•</span>
              <span>{useCase}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-8">
        <h2 className="text-lg font-medium text-ink">Available tools</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((tool) => (
            <li key={tool.id}><ToolCard tool={tool} /></li>
          ))}
        </ul>
      </section>
      <nav aria-label="Other categories" className="mt-12">
        <h2 className="text-lg font-medium text-ink">Other categories</h2>
        <ul className="mt-3 flex flex-wrap gap-1.5">
          {browseGroups.filter((item) => item.id !== group.id).map((item) => (
            <li key={item.id}>
              <Link href={item.path} className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:border-line-strong hover:text-ink">{item.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </article>
  );
}
