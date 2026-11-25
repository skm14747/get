import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfEditTool } from "@/components/pdf-edit-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("edit-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfEditTool />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Add text annotations to any page at exact coordinates. Set the page number (1-based), X and Y position in PDF points (measured from the bottom-left corner), font size, and colour. You can add multiple annotations to a single document. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. No file content or annotation text leaves your device.</p>
      </div>
    </ToolPage>
  );
}
