import type { Metadata } from "next";
import { CaseConverterTool } from "@/components/case-converter-tool";
import { CaseGuide } from "@/components/case-guide";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("case-converter");
export const metadata: Metadata = toolMetadata(tool);

export default function CaseConverterPage() {
  return (
    <ToolPage tool={tool}>
      <CaseConverterTool />
      <CaseGuide />
    </ToolPage>
  );
}
