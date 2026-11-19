import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { VideoGifGuide } from "@/components/video-gif-guide";
import { VideoGifTool } from "@/components/video-gif-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("video-to-gif");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <VideoGifTool />
      <VideoGifGuide />
    </ToolPage>
  );
}
