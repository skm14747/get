import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { GstCalculatorGuide } from "@/components/gst-calculator-guide";
import { GstTool } from "@/components/gst-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("gst-calculator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <GstTool />
      <GstCalculatorGuide />
    </ToolPage>
  );
}
