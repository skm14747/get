import type { Metadata } from "next";
import { CronGuide } from "@/components/cron-guide";
import { CronTool } from "@/components/cron-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("cron-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <CronTool />
      <CronGuide />
    </ToolPage>
  );
}
