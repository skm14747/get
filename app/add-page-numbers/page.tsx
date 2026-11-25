import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { AddPageNumbersGuide } from "@/components/add-page-numbers-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("add-page-numbers");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="pagenumber" />
      <AddPageNumbersGuide />
    </ToolPage>
  );
}
