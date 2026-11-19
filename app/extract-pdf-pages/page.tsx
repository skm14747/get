import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("extract-pdf-pages");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="extract" />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Enter the pages or ranges to extract (e.g. 1-3, 5). Only those pages are copied into a new PDF document. The original file is not modified. Encrypted files are refused. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. The file is never uploaded to any server.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
