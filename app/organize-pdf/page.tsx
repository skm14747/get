import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("organize-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="organize" />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Enter page numbers in any order to rearrange them. Use ranges like 3,1,2 to reorder or 1-3,5 to keep only certain pages. Leave blank to keep all pages in order. Encrypted files are refused. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. The page does not put the contents in the address or in measurement events.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
