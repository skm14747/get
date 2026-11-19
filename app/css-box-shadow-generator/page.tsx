import type { Metadata } from "next";
import { BoxShadowGuide } from "@/components/box-shadow-guide";
import { BoxShadowTool } from "@/components/box-shadow-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("css-box-shadow-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <BoxShadowTool />
      <BoxShadowGuide />
    </ToolPage>
  );
}
