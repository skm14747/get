import type { Metadata } from "next";
import { PercentageCalculatorTool } from "@/components/percentage-calculator-tool";
import { PercentageGuide } from "@/components/percentage-guide";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("percentage-calculator");
export const metadata: Metadata = toolMetadata(tool);

export default function PercentageCalculatorPage() {
  return (
    <ToolPage tool={tool}>
      <PercentageCalculatorTool />
      <PercentageGuide />
    </ToolPage>
  );
}
