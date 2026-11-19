"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { formatDecimal, formatPercent, messageForParseFailure, parseDecimal } from "@/lib/numbers";
import {
  percentageChange,
  percentageDecrease,
  percentageDifference,
  percentageIncrease,
  percentErrorMessage,
  originalBeforeDiscount,
  originalBeforeIncrease,
  percentOf,
  whatPercent,
  type PercentValue,
} from "@/lib/percentage";

const operations = [
  { id: "percent-of", label: "What is X% of Y?" },
  { id: "what-percent", label: "X is what % of Y?" },
  { id: "change", label: "Percentage change" },
  { id: "increase", label: "Percentage increase" },
  { id: "decrease", label: "Percentage decrease" },
  { id: "difference", label: "Percentage difference" },
  { id: "reverse-increase", label: "Original before increase" },
  { id: "reverse-discount", label: "Original before discount" },
] as const;

type OperationId = (typeof operations)[number]["id"];

function fieldsFor(operation: OperationId): [string, string] {
  if (operation === "percent-of") return ["Percent", "Whole number"];
  if (operation === "what-percent") return ["Part", "Whole number"];
  if (operation === "difference") return ["First number", "Second number"];
  if (operation === "reverse-increase") return ["Final amount", "Increase percent"];
  if (operation === "reverse-discount") return ["Final amount", "Discount percent"];
  return ["Original number", "New number"];
}

function calculate(operation: OperationId, left: number, right: number): PercentValue {
  if (operation === "percent-of") return percentOf(left, right);
  if (operation === "what-percent") return whatPercent(left, right);
  if (operation === "change") return percentageChange(left, right);
  if (operation === "increase") return percentageIncrease(left, right);
  if (operation === "decrease") return percentageDecrease(left, right);
  if (operation === "reverse-increase") return originalBeforeIncrease(left, right);
  if (operation === "reverse-discount") return originalBeforeDiscount(left, right);
  return percentageDifference(left, right);
}

function explain(operation: OperationId, result: PercentValue): string {
  if (!result.ok) return "";
  if (operation === "increase" && result.value < 0) return "The new number is smaller, so this is a decrease rather than an increase.";
  if (operation === "decrease" && result.value < 0) return "The new number is larger, so this is an increase rather than a decrease.";
  if (operation === "change" && result.value > 0) return "A positive change is an increase.";
  if (operation === "change" && result.value < 0) return "A negative change is a decrease.";
  if (operation === "difference") return "This comparison has no direction. It is not a percentage-point change and it is not percentage change.";
  return "";
}

export function PercentageCalculatorTool() {
  const [operation, setOperation] = useState<OperationId>("percent-of");
  const [left, setLeft] = useState("");
  const [right, setRight] = useState("");
  const [copied, setCopied] = useState("");
  const started = useRef(false);
  const reported = useRef("");

  useEffect(() => { track("tool_view", { tool_id: "percentage-calculator" }); }, []);

  const [leftLabel, rightLabel] = fieldsFor(operation);
  const parsedLeft = parseDecimal(left);
  const parsedRight = parseDecimal(right);
  const ready = parsedLeft.ok && parsedRight.ok;
  const result = ready ? calculate(operation, parsedLeft.value, parsedRight.value) : null;
  const leftError = left.trim() !== "" && !parsedLeft.ok ? messageForParseFailure(parsedLeft.reason) : "";
  const rightError = right.trim() !== "" && !parsedRight.ok ? messageForParseFailure(parsedRight.reason) : "";

  useEffect(() => {
    if (!started.current && (left.trim() !== "" || right.trim() !== "")) {
      started.current = true;
      track("tool_input_started", { tool_id: "percentage-calculator" });
    }
  }, [left, right]);

  const reportToken = !result ? "" : result.ok ? `${operation}:ok` : `${operation}:${result.reason}`;
  useEffect(() => {
    if (!reportToken || reported.current === reportToken) return;
    const handle = window.setTimeout(() => {
      reported.current = reportToken;
      if (reportToken.endsWith(":ok")) { track("tool_completed", { tool_id: "percentage-calculator", operation }); return; }
      const errorCode = reportToken.slice(operation.length + 1);
      track("tool_error", { tool_id: "percentage-calculator", error_code: errorCode });
    }, 600);
    return () => window.clearTimeout(handle);
  }, [operation, reportToken]);

  const display = result?.ok
    ? operation === "percent-of" || operation === "reverse-increase" || operation === "reverse-discount"
      ? formatDecimal(result.value) : formatPercent(result.value)
    : "";

  async function copy() {
    if (!display) return;
    try { await navigator.clipboard.writeText(display); setCopied("Result copied."); track("copy_result", { tool_id: "percentage-calculator" }); }
    catch { setCopied("Clipboard writing was blocked."); }
  }

  function clear() {
    setLeft(""); setRight(""); setCopied("");
    started.current = false; reported.current = "";
    track("clear_input", { tool_id: "percentage-calculator" });
  }

  return (
    <form className="mx-auto max-w-2xl" onSubmit={(e) => e.preventDefault()}>
      {/* ── Mode selector ── */}
      <fieldset>
        <legend className="text-sm font-medium text-ink">Calculation</legend>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {operations.map((item) => (
            <label key={item.id} className={`flex min-h-10 cursor-pointer items-center gap-2 rounded-md border px-3 text-[0.8125rem] font-medium transition-colors ${operation === item.id ? "border-action bg-action-soft text-action" : "border-line text-muted hover:border-line-strong"}`}>
              <input type="radio" name="percentage-operation" className="sr-only" value={item.id} checked={operation === item.id} onChange={() => setOperation(item.id)} />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Inputs ── */}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          {leftLabel}
          <input inputMode="decimal" value={left} onChange={(e) => setLeft(e.target.value)} className="field-control mt-1" />
        </label>
        <label className="text-sm font-medium">
          {rightLabel}
          <input inputMode="decimal" value={right} onChange={(e) => setRight(e.target.value)} className="field-control mt-1" />
        </label>
      </div>
      {leftError || rightError ? <p role="alert" className="mt-2 text-sm text-danger">{leftError || rightError}</p> : null}

      {/* ── Result ── */}
      <div className="mt-5 rounded-lg bg-canvas p-5" aria-live="polite">
        {result?.ok ? (
          <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{display}</p>
        ) : result && !result.ok ? (
          <p role="alert" className="text-sm text-danger">{percentErrorMessage(result.reason)}</p>
        ) : (
          <p className="text-sm text-muted">Enter both numbers to see a result.</p>
        )}
      </div>
      {result?.ok && explain(operation, result) ? <p className="mt-2 text-[0.8125rem] text-muted">{explain(operation, result)}</p> : null}

      {/* ── Actions ── */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={copy} disabled={!display}>Copy result</button>
        <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
        {copied ? <p role="status" className="self-center text-sm text-muted">{copied}</p> : null}
      </div>
    </form>
  );
}
