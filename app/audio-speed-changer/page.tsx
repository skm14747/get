import type { Metadata } from "next";
import { AudioSpeedGuide } from "@/components/audio-speed-guide";
import { AudioSpeedTool } from "@/components/audio-speed-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("audio-speed-changer");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <AudioSpeedTool />
      <AudioSpeedGuide />
    </ToolPage>
  );
}
