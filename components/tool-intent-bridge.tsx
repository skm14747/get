"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import { intentBridgeFor } from "@/lib/intent-bridges";

export function ToolIntentBridge({ toolId }: { toolId: string }) {
  const bridge = intentBridgeFor(toolId);
  if (!bridge) return null;

  return (
    <section
      aria-label="Suggested next tool"
      className="mt-8 rounded-xl border border-line bg-surface p-5 transition-all hover:border-line-strong"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="max-w-xl">
          <span className="inline-block text-xs font-semibold uppercase tracking-wider text-muted">
            Next Step
          </span>
          <h2 className="mt-1 text-base font-semibold text-ink sm:text-lg">
            {bridge.headline}
          </h2>
          <p className="mt-1 text-sm leading-relaxed text-muted">
            {bridge.description}
          </p>
        </div>
        <div className="shrink-0">
          <Link
            href={bridge.targetTool.path}
            onClick={() =>
              track("related_tool_clicked", {
                tool_id: toolId,
                destination_tool_id: bridge.targetTool.id,
              })
            }
            className="inline-flex h-10 items-center justify-center rounded-lg bg-ink px-4 text-sm font-medium text-paper no-underline transition-opacity hover:opacity-90"
          >
            {bridge.callToAction} →
          </Link>
        </div>
      </div>
    </section>
  );
}
