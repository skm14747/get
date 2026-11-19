import type { Metadata } from "next";
import { BarcodeGuide } from "@/components/barcode-guide";
import { BarcodeTool } from "@/components/barcode-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("barcode-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <BarcodeTool />
      <BarcodeGuide />
    </ToolPage>
  );
}
