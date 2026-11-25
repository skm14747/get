import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { ExtractPdfPagesGuide } from "@/components/extract-pdf-pages-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("extract-pdf-pages");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="extract" />
      <ExtractPdfPagesGuide />
    </ToolPage>
  );
}
