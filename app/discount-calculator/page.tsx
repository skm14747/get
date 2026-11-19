import type { Metadata } from "next";
import { DiscountCalculatorTool } from "@/components/discount-calculator-tool";
import { DiscountGuide } from "@/components/discount-guide";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("discount-calculator");
export const metadata: Metadata = toolMetadata(tool);

export default function DiscountCalculatorPage() {
  return (
    <ToolPage tool={tool}>
      <DiscountCalculatorTool />
      <DiscountGuide />
    </ToolPage>
  );
}
