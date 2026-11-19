import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("watermark-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="watermark" />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Enter your watermark text, choose a font size and opacity, and optionally enable diagonal placement. The text is drawn on every page in semi-transparent grey. Encrypted files are refused. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. The page does not put the contents in the address or in measurement events.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
