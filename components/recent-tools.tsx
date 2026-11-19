"use client";

import { useEffect, useState } from "react";
import { ToolCard } from "@/components/ui/tool-card";
import { tools } from "@/lib/tools";

const KEY = "goeasytools.recent-tools";

export function RecentRecorder({ id }: { id: string }) {
  useEffect(() => {
    let parsed: unknown = [];
    try {
      parsed = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
    } catch {
      parsed = [];
    }
    const current = Array.isArray(parsed) ? parsed.filter((item): item is string => typeof item === "string") : [];
    const next = [id, ...current.filter((item) => item !== id)].slice(0, 4);
    window.localStorage.setItem(KEY, JSON.stringify(next));
  }, [id]);
  return null;
}

export function RecentTools({ hrefForTool }: { hrefForTool?: (id: string) => string | null } = {}) {
  const [ids, setIds] = useState<string[]>([]);
  useEffect(() => {
    try {
      const parsed: unknown = JSON.parse(window.localStorage.getItem(KEY) ?? "[]");
      if (Array.isArray(parsed)) setIds(parsed.filter((item): item is string => typeof item === "string"));
    } catch {
      setIds([]);
    }
  }, []);
  const items = ids.flatMap((id) => {
    const tool = tools.find((item) => item.id === id);
    return tool ? [tool] : [];
  });
  if (items.length === 0) return null;
  return (
    <section className="mt-12">
      <h2 className="text-lg font-medium text-ink">Recently used</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">Only the tool names are saved in this browser. Typed text and files are not.</p>
      <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((tool) => (
          <li key={tool.id}><ToolCard tool={tool} href={hrefForTool?.(tool.id) ?? undefined} /></li>
        ))}
      </ul>
    </section>
  );
}
