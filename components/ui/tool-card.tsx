import Link from "next/link";
import { groupForTool } from "@/lib/browse";
import type { ToolDefinition } from "@/lib/tools";
import { categoryColorClasses, iconNameForGroup, ToolIcon } from "@/components/ui/tool-icon";

export function ToolCard({ tool, href }: { tool: ToolDefinition; href?: string }) {
  const group = groupForTool(tool.id);
  const colors = categoryColorClasses(group?.id ?? "");
  return (
    <Link
      href={href ?? tool.path}
      className="group flex h-full flex-col rounded-xl border border-line bg-surface p-5 no-underline transition-colors hover:border-line-strong"
    >
      <span className={`flex h-9 w-9 items-center justify-center rounded-lg ${colors.bg} ${colors.fg}`}>
        <ToolIcon name={iconNameForGroup(group?.id ?? "")} />
      </span>
      <span className="mt-3 text-[0.9375rem] font-medium text-ink">{tool.name}</span>
      <span className="mt-1 flex-1 text-[0.8125rem] leading-relaxed text-muted">{tool.shortDescription}</span>
      <span className="mt-3 flex items-center justify-between text-xs font-medium text-faint">
        <span>{group?.name ?? "Tool"}</span>
        <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">→</span>
      </span>
    </Link>
  );
}
