import type { Metadata } from "next";
import { CsvJsonGuide } from "@/components/csv-json-guide";
import { CsvJsonTool } from "@/components/csv-json-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("csv-to-json");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <CsvJsonTool />
      <CsvJsonGuide />
    </ToolPage>
  );
}
