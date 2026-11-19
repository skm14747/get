import type { Metadata } from "next";
import { JsonToPythonGuide } from "@/components/json-to-python-guide";
import { JsonToPythonTool } from "@/components/json-to-python-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("json-to-python");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <JsonToPythonTool />
      <JsonToPythonGuide />
    </ToolPage>
  );
}
