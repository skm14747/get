import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { SplitPdfGuide } from "@/components/split-pdf-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("split-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="split" />
      <SplitPdfGuide />
    </ToolPage>
  );
}
