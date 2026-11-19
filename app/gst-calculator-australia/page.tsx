import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { AustraliaGstGuide } from "@/components/australia-gst-guide";
import { AustraliaGstTool } from "@/components/australia-gst-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("gst-calculator-australia");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <AustraliaGstTool />
      <AustraliaGstGuide />
    </ToolPage>
  );
}
