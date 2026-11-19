import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { QrCodeGeneratorGuide } from "@/components/qr-code-generator-guide";
import { QrTool } from "@/components/qr-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("qr-code-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <QrTool />
      <QrCodeGeneratorGuide />
    </ToolPage>
  );
}
