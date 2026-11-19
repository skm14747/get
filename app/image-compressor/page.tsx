import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { ImageCompressorGuide } from "@/components/image-compressor-guide";
import { ImageTool } from "@/components/image-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("image-compressor");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <ImageTool mode="compress" />
      <ImageCompressorGuide />
    </ToolPage>
  );
}
