import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfPipelineTool } from "@/components/pdf-pipeline-tool";
import { PdfPipelineGuide } from "@/components/pdf-pipeline-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("pdf-pipeline");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfPipelineTool />
      <PdfPipelineGuide />
    </ToolPage>
  );
}
