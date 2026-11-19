import type { Metadata } from "next";
import { TokenizerGuide } from "@/components/tokenizer-guide";
import { TokenizerTool } from "@/components/tokenizer-tool";
import { ToolPage } from "@/components/tool-page";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("tokenizer");
export const metadata: Metadata = toolMetadata(tool);

export default function TokenizerPage() {
  return (
    <ToolPage tool={tool}>
      <TokenizerTool />
      <TokenizerGuide />
    </ToolPage>
  );
}
