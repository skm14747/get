import type { Metadata } from "next";
import { BorderRadiusGuide } from "@/components/border-radius-guide";
import { BorderRadiusTool } from "@/components/border-radius-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("css-border-radius-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <BorderRadiusTool />
      <BorderRadiusGuide />
    </ToolPage>
  );
}
