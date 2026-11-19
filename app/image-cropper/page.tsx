import type { Metadata } from "next";
import { ImageCropperGuide } from "@/components/image-cropper-guide";
import { ImageCropperTool } from "@/components/image-cropper-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("image-cropper");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <ImageCropperTool />
      <ImageCropperGuide />
    </ToolPage>
  );
}
