import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { DateCalculatorGuide } from "@/components/date-calculator-guide";
import { DateTool } from "@/components/date-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("date-calculator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <DateTool />
      <DateCalculatorGuide />
    </ToolPage>
  );
}
