import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfSignTool } from "@/components/pdf-sign-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("sign-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfSignTool />
      <div className="mt-10 max-w-3xl space-y-4 text-[15px] leading-7">
        <h2 className="text-xl font-medium">How it works</h2>
        <p>Choose how to create your signature: draw it freehand with your mouse or finger, type your name and it renders in a cursive script, or upload an existing signature image (PNG or JPG). Then set the page number (1-based), position in PDF points from the bottom-left corner, and the display width and height. The signature is embedded as an image on the page. The file is limited to 20 MB.</p>
        <h2 className="text-xl font-medium">Important note</h2>
        <p>This tool places a visual signature image on the PDF. It does not apply a cryptographic digital signature (PKI). For legal purposes, verify whether a visual signature meets your jurisdiction&apos;s requirements.</p>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p>Processing stays in this browser. No signature, file content, or personal data leaves your device.</p>
        <p>Demand for this tool is not yet validated with search volume data.</p>
      </div>
    </ToolPage>
  );
}
