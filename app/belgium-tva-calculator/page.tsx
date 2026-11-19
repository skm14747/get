import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { BelgiumTvaGuide } from "@/components/belgium-tva-guide";
import { BelgiumTvaTool } from "@/components/belgium-tva-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("belgium-tva-calculator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <BelgiumTvaTool />
      <BelgiumTvaGuide />
    </ToolPage>
  );
}
