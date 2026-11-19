import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { MergePdfGuide } from "@/components/merge-pdf-guide";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("merge-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="merge" />
      <MergePdfGuide />
    </ToolPage>
  );
}
