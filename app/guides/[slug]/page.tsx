import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ToolCard } from "@/components/ui/tool-card";
import { browseGroups, toolsInGroup } from "@/lib/browse";
import { guideEntries, getGuideEntry } from "@/lib/guide-content";
import { pageMetadata } from "@/lib/seo";
import { canonicalUrl } from "@/lib/site";

export function generateStaticParams() {
  return guideEntries.map((entry) => ({ slug: entry.slug }));
}

export function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return params.then(({ slug }) => {
    const entry = getGuideEntry(slug);
    if (!entry) return {};
    return pageMetadata({
      title: entry.title,
      description: entry.metaDescription,
      path: `/guides/${entry.slug}`,
    });
  });
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const entry = getGuideEntry(slug);
  if (!entry) notFound();

  const group = browseGroups.find((g) => g.id === slug);
  const tools = group ? toolsInGroup(group) : [];
  const otherGuides = guideEntries.filter((g) => g.slug !== slug);

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: entry.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: canonicalUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: canonicalUrl("/guides"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: entry.title,
        item: canonicalUrl(`/guides/${entry.slug}`),
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <article className="mx-auto max-w-[1200px] px-4 py-8 sm:px-6">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-[0.8125rem] text-muted">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="no-underline transition-colors hover:text-ink">Home</Link>
            </li>
            <li aria-hidden="true" className="text-faint">/</li>
            <li>
              <Link href="/guides" className="no-underline transition-colors hover:text-ink">Guides</Link>
            </li>
            <li aria-hidden="true" className="text-faint">/</li>
            <li aria-current="page" className="text-ink">
              {group?.name ?? entry.title}
            </li>
          </ol>
        </nav>

        {/* Title */}
        <h1 className="mt-3 text-2xl font-medium tracking-tight sm:text-3xl">
          {entry.title}
        </h1>

        {/* Intro */}
        <div className="mt-6 max-w-3xl space-y-4 text-[0.9375rem] leading-relaxed text-muted">
          {entry.intro.split("\n\n").map((paragraph, i) => (
            <p key={i}>{paragraph}</p>
          ))}
        </div>

        {/* Educational sections */}
        <div className="mt-10 max-w-3xl space-y-8">
          {entry.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-lg font-semibold text-ink sm:text-xl">
                {section.heading}
              </h2>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                {section.content}
              </p>
            </section>
          ))}
        </div>

        {/* Tools grid */}
        {tools.length > 0 && (
          <section className="mt-12">
            <h2 className="text-lg font-semibold text-ink sm:text-xl">
              {group?.name} available on GoEasyTools
            </h2>
            <p className="mt-1.5 max-w-2xl text-sm text-muted">
              Try these tools — they run entirely in your browser with no uploads or sign-ups.
            </p>
            <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {tools.map((tool) => (
                <li key={tool.id}><ToolCard tool={tool} /></li>
              ))}
            </ul>
          </section>
        )}

        {/* FAQ */}
        <section className="mt-12 max-w-3xl">
          <h2 className="text-lg font-semibold text-ink sm:text-xl">
            Frequently asked questions
          </h2>
          <dl className="mt-4 space-y-6">
            {entry.faqs.map((faq) => (
              <div key={faq.question}>
                <dt className="text-[0.9375rem] font-medium text-ink">
                  {faq.question}
                </dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </section>

        {/* Related guides */}
        <nav aria-label="Related guides" className="mt-12">
          <h2 className="text-lg font-semibold text-ink sm:text-xl">
            More guides
          </h2>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {otherGuides.map((guide) => {
              const guideGroup = browseGroups.find((g) => g.id === guide.slug);
              return (
                <li key={guide.slug}>
                  <Link
                    href={`/guides/${guide.slug}`}
                    className="inline-flex h-8 items-center rounded-md border border-line px-3 text-[0.8125rem] font-medium text-muted no-underline transition-colors hover:border-line-strong hover:text-ink"
                  >
                    {guideGroup?.name ?? guide.slug}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </article>
    </>
  );
}
