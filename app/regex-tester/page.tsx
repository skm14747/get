import type { Metadata } from "next";
import { RegexGuide } from "@/components/regex-guide";
import { RegexTool } from "@/components/regex-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("regex-tester");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <RegexTool />
      <RegexGuide />
    </ToolPage>
  );
}
