import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { Base64Guide } from "@/components/base64-guide";
import { Base64Tool } from "@/components/base64-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("base64");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <Base64Tool />
      <Base64Guide />
    </ToolPage>
  );
}
