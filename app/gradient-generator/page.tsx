import type { Metadata } from "next";
import { GradientGuide } from "@/components/gradient-guide";
import { GradientTool } from "@/components/gradient-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("gradient-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <GradientTool />
      <GradientGuide />
    </ToolPage>
  );
}
