import type { Metadata } from "next";
import { JwtGuide } from "@/components/jwt-guide";
import { JwtTool } from "@/components/jwt-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("jwt-decoder");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <JwtTool />
      <JwtGuide />
    </ToolPage>
  );
}
