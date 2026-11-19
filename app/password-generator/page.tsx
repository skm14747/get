import type { Metadata } from "next";
import { ToolPage } from "@/components/tool-page";
import { PasswordGeneratorGuide } from "@/components/password-generator-guide";
import { PasswordTool } from "@/components/password-tool";
import { toolMetadata } from "@/lib/seo";
import { getTool } from "@/lib/tools";

const tool = getTool("password-generator");

export const metadata: Metadata = toolMetadata(tool);

export default function Page() {
  return (
    <ToolPage tool={tool}>
      <PasswordTool />
      <PasswordGeneratorGuide />
    </ToolPage>
  );
}
