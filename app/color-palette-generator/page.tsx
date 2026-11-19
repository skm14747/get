import type { Metadata } from "next";
import { PaletteGuide } from "@/components/palette-guide";
import { PaletteTool } from "@/components/palette-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("color-palette-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PaletteTool />
      <PaletteGuide />
    </ToolPage>
  );
}
