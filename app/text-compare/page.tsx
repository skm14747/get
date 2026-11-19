import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { TextDiffGuide } from "@/components/text-diff-guide";
import { TextDiffTool } from "@/components/text-diff-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("text-compare");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <TextDiffTool />
      <TextDiffGuide />
    </ToolPage>
  );
}
