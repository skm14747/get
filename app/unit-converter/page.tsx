import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { UnitConverterGuide } from "@/components/unit-converter-guide";
import { UnitTool } from "@/components/unit-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("unit-converter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <UnitTool />
      <UnitConverterGuide />
    </ToolPage>
  );
}
