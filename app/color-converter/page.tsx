import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { ColorGuide } from "@/components/color-guide";
import { ColorTool } from "@/components/color-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("color-converter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <ColorTool />
      <ColorGuide />
    </ToolPage>
  );
}
