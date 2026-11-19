export function SlugGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Type or paste a headline, blog post title, or product name into the source box. The URL-friendly slug updates instantly. Choose between hyphens or underscores as delimiters, toggle lowercase casing, and enable accent stripping for clean SEO URLs.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">SEO slug best practices and Unicode handling</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>URL readability:</strong> Hyphens (-) are recommended by Google Search Central over underscores (_) as word separators in web addresses.</li>
          <li><strong>Unicode Normalization Form KD (NFKD):</strong> Decomposes combined characters (e.g. &apos;é&apos; into &apos;e&apos; + acute accent mark), allowing accurate transliteration to plain ASCII letters without corrupting the word root.</li>
          <li><strong>Multilingual script support:</strong> Unlike legacy tools that discard all non-English characters, this generator preserves letters and numbers from Arabic, Cyrillic, Devanagari, and Asian scripts while stripping unsafe punctuation and symbols.</li>
          <li><strong>Whitespace and separator collapsing:</strong> Multiple spaces, dashes, or punctuation marks are collapsed into a single delimiter, and leading/trailing dashes are automatically trimmed.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example transformations</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>French accents:</strong> &quot;Café au Lait &amp; Crème Brûlée!&quot; → <code className="rounded bg-line px-1 py-0.5 text-xs">cafe-au-lait-creme-brulee</code></li>
          <li><strong>Spanish diacritics:</strong> &quot;El Niño &amp; Año Nuevo 2026&quot; → <code className="rounded bg-line px-1 py-0.5 text-xs">el-nino-ano-nuevo-2026</code></li>
          <li><strong>Symbols &amp; Punctuation:</strong> &quot;Top 10 React/Next.js Tips (#1 is Amazing)&quot; → <code className="rounded bg-line px-1 py-0.5 text-xs">top-10-react-next-js-tips-1-is-amazing</code></li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Slug generation executes 100% inside your browser runtime. Draft article titles, product names, and private URLs are never sent to external servers.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Content creators and developers need clean, URL-safe slugs that preserve multilingual meaning and strip diacritics. This tool runs entirely in-browser without sending draft titles to external servers.
        </p>
      </section>
    </div>
  );
}
