import Link from "next/link";
import type { ReactNode } from "react";
import { RecentRecorder } from "@/components/recent-tools";
import { RelatedTools } from "@/components/related-tools";
import { ToolIntentBridge } from "@/components/tool-intent-bridge";
import { AdSlot } from "@/components/ui/ad-slot";
import { groupForTool } from "@/lib/browse";
import { faqsFor } from "@/lib/faqs";
import { breadcrumbJsonLd, howToJsonLd, toolJsonLd } from "@/lib/schema";
import { howToFor } from "@/lib/how-tos";
import { relatedTools, type ToolDefinition } from "@/lib/tools";

export function ToolPage({ tool, children, homePath = "/", homeLabel = "Home" }: { tool: ToolDefinition; children: ReactNode; homePath?: string; homeLabel?: string }) {
  const related = relatedTools(tool.id).slice(0, 4);
  const group = groupForTool(tool.id);
  const faqs = faqsFor(tool.id);
  const howTo = howToFor(tool.id);
  const jsonLd = toolJsonLd(tool);
  const breadcrumb = breadcrumbJsonLd(tool, group);
  const howToSchema = howTo ? howToJsonLd(howTo) : null;
  const faqSchema =
    faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  return (
    <article className="mx-auto w-full max-w-[1200px] px-4 py-6 sm:px-6 sm:py-8">
      <RecentRecorder id={tool.id} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }} />
      {faqSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      ) : null}
      {howToSchema ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      ) : null}

      <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
        <ol className="flex flex-wrap items-center gap-1.5">
          <li><Link href={homePath} className="no-underline transition-colors hover:text-ink">{homeLabel}</Link></li>
          {group ? (
            <>
              <li aria-hidden="true" className="text-faint">/</li>
              <li><Link href={group.path} className="no-underline transition-colors hover:text-ink">{group.name}</Link></li>
            </>
          ) : null}
          <li aria-hidden="true" className="text-faint">/</li>
          <li aria-current="page" className="text-ink">{tool.name}</li>
        </ol>
      </nav>

      <header className="mt-3 mb-5 max-w-3xl">
        <h1 className="text-2xl font-medium tracking-tight text-ink sm:text-3xl">{tool.h1 ?? tool.name}</h1>
        <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">{tool.shortDescription}</p>
      </header>

      <AdSlot />
      {children}

      <ToolIntentBridge toolId={tool.id} />

      {faqs.length > 0 ? (
        <section className="mt-10 max-w-3xl">
          <h2 className="text-lg font-medium text-ink">Questions</h2>
          <div className="mt-3 divide-y divide-line rounded-lg border border-line">
            {faqs.map((item) => (
              <details key={item.question} className="group px-5 py-3.5">
                <summary className="flex cursor-pointer items-center text-[0.9375rem] font-medium text-ink">{item.question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

      <RelatedTools toolId={tool.id} tools={related} />
    </article>
  );
}
