import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { JpgToPdfGuide } from "@/components/jpg-to-pdf-guide";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("jpg-to-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="images" />
      <JpgToPdfGuide />
    </ToolPage>
  );
}
