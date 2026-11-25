import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfTool } from "@/components/pdf-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("pdf-to-jpg");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfTool mode="pdf2jpg" />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Each page of the PDF is rendered to a canvas at the chosen scale and exported as a JPEG image. Single-page PDFs download as a JPG file; multi-page PDFs download as a ZIP archive. Quality and scale are adjustable. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Rendering runs entirely in this browser using pdf.js. The file is never uploaded to any server.</p>
      </div>
    </ToolPage>
  );
}
