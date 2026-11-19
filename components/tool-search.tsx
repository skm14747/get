"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { groupForTool, searchTools } from "@/lib/browse";

export function ToolSearch({ id = "tool-search", hrefForTool }: { id?: string; hrefForTool?: (toolId: string) => string | null }) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);
  const results = useMemo(() => searchTools(query), [query]);
  const open = query.trim().length > 0;

  function onKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (!open) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (event.key === "Escape") {
      setQuery("");
    } else if (event.key === "Enter" && results[active]) {
      window.location.assign(hrefForTool?.(results[active].id) ?? results[active].path);
    }
  }

  return (
    <div className="relative">
      <label className="grid gap-2 text-sm font-medium" htmlFor={id}>
        <span className="sr-only">Search tools</span>
        <input
          id={id}
          role="combobox"
          aria-expanded={open}
          aria-controls={`${id}-list`}
          aria-autocomplete="list"
          className="field-control"
          placeholder="Search by name or task"
          value={query}
          onChange={(e) => { setQuery(e.target.value); setActive(0); }}
          onKeyDown={onKeyDown}
        />
      </label>
      {open ? (
        <ul id={`${id}-list`} role="listbox" className="absolute z-30 mt-1.5 max-h-80 w-full overflow-auto rounded-lg border border-line bg-surface p-1 shadow-[var(--shadow-lg)]">
          {results.length === 0 ? (
            <li className="px-3 py-3 text-sm text-muted">No tools match that search. Try a category below.</li>
          ) : null}
          {results.map((tool, index) => (
            <li key={tool.id} role="option" aria-selected={index === active}>
              <Link
                href={hrefForTool?.(tool.id) ?? tool.path}
                className={`block rounded-md px-3 py-2 no-underline transition-colors ${index === active ? "bg-action-soft" : "hover:bg-canvas"}`}
              >
                <span className="block text-sm font-medium text-ink">{tool.name}</span>
                <span className="block text-[0.8125rem] leading-snug text-muted">{groupForTool(tool.id)?.name} · {tool.shortDescription}</span>
              </Link>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}
