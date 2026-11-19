"use client";

import { ToolCard } from "@/components/ui/tool-card";
import { track } from "@/lib/analytics";
import type { ToolDefinition } from "@/lib/tools";

export function RelatedTools({ toolId, tools }: { toolId: string; tools: ToolDefinition[] }) {
  if (tools.length === 0) return null;
  return (
    <aside className="mt-10 border-t border-line pt-8">
      <h2 className="text-lg font-medium">Related tools</h2>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((item) => (
          <li key={item.id} onClick={() => track("related_tool_clicked", { tool_id: toolId, destination_tool_id: item.id })}>
            <ToolCard tool={item} />
          </li>
        ))}
      </ul>
    </aside>
  );
}
