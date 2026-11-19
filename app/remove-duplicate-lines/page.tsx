import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { TextCleanerGuide } from "@/components/text-cleaner-guide";
import { TextCleanerTool } from "@/components/text-cleaner-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("remove-duplicate-lines");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <TextCleanerTool />
      <TextCleanerGuide />
    </ToolPage>
  );
}
