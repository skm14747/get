import type { Metadata } from "next";
import { AudioTrimmerGuide } from "@/components/audio-trimmer-guide";
import { AudioTrimmerTool } from "@/components/audio-trimmer-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("audio-trimmer");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <AudioTrimmerTool />
      <AudioTrimmerGuide />
    </ToolPage>
  );
}
