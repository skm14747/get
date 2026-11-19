import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { UnixTimestampGuide } from "@/components/unix-timestamp-guide";
import { UnixTimestampTool } from "@/components/unix-timestamp-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("unix-timestamp-converter");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <UnixTimestampTool />
      <UnixTimestampGuide />
    </ToolPage>
  );
}
