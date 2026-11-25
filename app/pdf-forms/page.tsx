import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfFormTool } from "@/components/pdf-form-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("pdf-forms");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfFormTool />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Upload a PDF that contains interactive form fields (AcroForms). The tool detects text fields, checkboxes, dropdowns, and radio buttons automatically. Fill in values and download the completed form. Optionally flatten to lock the fields as static content. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. No file content or filled data leaves your device.</p>
      </div>
    </ToolPage>
  );
}
