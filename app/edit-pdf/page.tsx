import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfEditTool } from "@/components/pdf-edit-tool";
import { EditPdfGuide } from "@/components/edit-pdf-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("edit-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfEditTool />
      <EditPdfGuide />
    </ToolPage>
  );
}
