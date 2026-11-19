/** @vitest-environment jsdom */
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { WordCounterTool } from "@/components/word-counter-tool";

describe("WordCounterTool", () => {
  it("counts typed text and starts from an empty state", () => {
    render(<WordCounterTool />);
    const textbox = screen.getByRole("textbox", { name: "Text" });
    expect(screen.getByRole("button", { name: "Clear" })).toBeTruthy();
    expect(screen.getByText("Counts appear when the text box has text.")).toBeTruthy();
    fireEvent.change(textbox, { target: { value: "hello world" } });
    expect(screen.getByText("2")).toBeTruthy();
    expect(screen.getByText("Less than 1 minute")).toBeTruthy();
  });
});
