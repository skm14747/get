import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PdfSignTool } from "@/components/pdf-sign-tool";
import { SignPdfGuide } from "@/components/sign-pdf-guide";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("sign-pdf");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PdfSignTool />
      <SignPdfGuide />
    </ToolPage>
  );
}
