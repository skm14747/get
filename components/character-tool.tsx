"use client";

import { useMemo, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { parseDecimal } from "@/lib/numbers";
import { countText } from "@/lib/word-count";

export function CharacterTool() {
  const session = useToolSession("character-counter");
  const [text, setText] = useState("");
  const [limit, setLimit] = useState("");
  const counts = useMemo(() => countText(text), [text]);
  const parsed = limit.trim() === "" ? null : parseDecimal(limit);
  const remaining = parsed?.ok ? parsed.value - counts.characters : null;
  const ratio = parsed?.ok && parsed.value > 0 ? Math.min(counts.characters / parsed.value, 1) : 0;
  const over = remaining !== null && remaining < 0;

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.4fr)_18rem]">
      <label className="text-sm font-medium">
        Text
        <textarea className="field-control mt-1 min-h-64" value={text} onChange={(e) => { setText(e.target.value); if (e.target.value) { session.markInput(); session.markSuccess("count"); } }} />
      </label>

      <section className="rounded-lg bg-canvas p-5" aria-live="polite">
        <p className="text-4xl font-medium tabular-nums tracking-tight text-ink">{counts.characters.toLocaleString("en-US")}</p>
        <p className="text-sm text-muted">Characters</p>

        <dl className="mt-4 grid gap-2 text-sm">
          <div className="flex justify-between gap-3">
            <dt className="text-muted">Without spaces</dt>
            <dd className="font-medium tabular-nums">{counts.charactersNoSpaces.toLocaleString("en-US")}</dd>
          </div>
        </dl>

        <label className="mt-5 block text-sm font-medium">
          Optional limit
          <input className="field-control mt-1" value={limit} onChange={(e) => setLimit(e.target.value)} inputMode="numeric" placeholder="For example, 280" />
        </label>

        {parsed && !parsed.ok ? <p role="alert" className="mt-2 text-sm text-danger">Enter a numeric limit, or leave it blank.</p> : null}

        {remaining !== null && parsed?.ok ? (
          <div className="mt-4">
            <div className="flex justify-between text-sm">
              <span className={over ? "font-medium text-danger" : "text-muted"}>{over ? "Over the limit" : "Remaining"}</span>
              <span className="tabular-nums">{remaining.toLocaleString("en-US")}</span>
            </div>
            <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line" aria-hidden="true">
              <div className={`h-full rounded-full transition-colors ${over ? "bg-danger" : "bg-action"}`} style={{ width: `${ratio * 100}%` }} />
            </div>
            <p className="mt-2 text-xs text-faint">{Math.round(ratio * 100)}% of the limit. This is not a platform rule.</p>
          </div>
        ) : null}
      </section>
    </div>
  );
}
