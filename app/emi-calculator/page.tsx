import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { EmiCalculatorGuide } from "@/components/emi-calculator-guide";
import { EmiTool } from "@/components/emi-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("emi-calculator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <EmiTool />
      <EmiCalculatorGuide />
    </ToolPage>
  );
}
