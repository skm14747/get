/** A miniature word-counter result card used as the homepage hero visual. */
export function HeroPreview() {
  const rows = [
    ["Characters", "4,231"],
    ["Without spaces", "3,396"],
    ["Sentences", "52"],
    ["Paragraphs", "8"],
    ["Lines", "34"],
    ["Reading time", "4 min"],
  ] as const;

  return (
    <div className="rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow)]" aria-hidden="true">
      <p className="text-xs font-medium text-muted">Counts</p>
      <p className="mt-3 text-4xl font-medium tabular-nums tracking-tight text-ink">847</p>
      <p className="text-sm text-muted">Words</p>
      <dl className="mt-4 grid grid-cols-2 gap-2">
        {rows.map(([label, value]) => (
          <div key={label} className="rounded-lg bg-canvas px-3 py-2">
            <dt className="text-xs text-faint">{label}</dt>
            <dd className="font-mono text-sm font-medium tabular-nums text-ink">{value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
