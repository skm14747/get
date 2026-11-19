import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { UkVatGuide } from "@/components/uk-vat-guide";
import { UkVatTool } from "@/components/uk-vat-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("vat-calculator-uk");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <UkVatTool />
      <UkVatGuide />
    </ToolPage>
  );
}
