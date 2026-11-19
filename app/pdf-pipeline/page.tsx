import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfPipelineTool } from "@/components/pdf-pipeline-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("pdf-pipeline");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfPipelineTool />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Upload a PDF once and chain as many operations as you need: rotate, crop, delete pages, extract pages, reorganize, add page numbers, watermark, compress, or unlock. Each operation creates a new version. You can undo, redo, or jump to any version in the timeline. Download the result at any point.</p>
        <h2 className="text-xl font-medium">Version history</h2>
        <p>Every operation creates a versioned copy (v0 = original, v1 = first operation, v2 = second, etc.). Clicking any version in the timeline jumps to that state. Undo goes back one step; redo goes forward. If you apply a new operation from an earlier version, the later versions are replaced — just like branching.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>All versions live in your browser memory. Nothing is uploaded to any server. Version history is lost when you close the tab.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
