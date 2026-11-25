import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfFormTool } from "@/components/pdf-form-tool";
import { PdfFormsGuide } from "@/components/pdf-forms-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("pdf-forms");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfFormTool />
      <PdfFormsGuide />
    </ToolPage>
  );
}
