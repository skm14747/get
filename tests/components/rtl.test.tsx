/** @vitest-environment jsdom */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { documentLanguage } from "@/lib/locales";

function LocaleFrame({ code, children }: { code: string; children: string }) {
  const language = documentLanguage(code);
  if (!language) return null;
  return (
    <div lang={language.lang} dir={language.dir}>
      {children}
    </div>
  );
}

describe("RTL frame", () => {
  it("puts Arabic text in an RTL document container", () => {
    render(<LocaleFrame code="ar">مرحبا</LocaleFrame>);
    const frame = screen.getByText("مرحبا");
    expect(frame.getAttribute("lang")).toBe("ar");
    expect(frame.getAttribute("dir")).toBe("rtl");
    // jsdom does not apply the browser stylesheet that maps dir="rtl" to CSS direction.
  });

  it("keeps English left to right", () => {
    render(<LocaleFrame code="en">Hello</LocaleFrame>);
    expect(screen.getByText("Hello").getAttribute("dir")).toBe("ltr");
  });
});