import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { JsonFormatterGuide } from "@/components/json-formatter-guide";
import { JsonTool } from "@/components/json-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("json-formatter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <JsonTool />
      <JsonFormatterGuide />
    </ToolPage>
  );
}
