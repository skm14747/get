import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("add-page-numbers");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="pagenumber" />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Select a position (top or bottom, left, center, or right), choose a start number and font size, then upload a PDF. Sequential page numbers are stamped on every page using Helvetica. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. The page does not put the contents in the address or in measurement events.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
