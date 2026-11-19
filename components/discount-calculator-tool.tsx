"use client";

import { useEffect, useRef, useState } from "react";
import { track } from "@/lib/analytics";
import { centsToAmount, DISCOUNT_CURRENCIES, discountErrorMessage, formatMoney, quoteDiscount, type DiscountCurrency } from "@/lib/discount";
import { formatPercent, messageForParseFailure, parseDecimal } from "@/lib/numbers";

export function DiscountCalculatorTool() {
  const [mode, setMode] = useState<"percent" | "amount">("percent");
  const [original, setOriginal] = useState("");
  const [discount, setDiscount] = useState("");
  const [additional, setAdditional] = useState("");
  const [currency, setCurrency] = useState<DiscountCurrency>("USD");
  const [copied, setCopied] = useState("");
  const started = useRef(false);
  const reported = useRef("");

  useEffect(() => { track("tool_view", { tool_id: "discount-calculator" }); }, []);

  const parsedOriginal = parseDecimal(original);
  const parsedDiscount = parseDecimal(discount);
  const additionalTrimmed = additional.trim();
  const parsedAdditional = additionalTrimmed === "" ? { ok: true as const, value: 0 } : parseDecimal(additional);
  const ready = parsedOriginal.ok && parsedDiscount.ok && parsedAdditional.ok;
  const quote = ready ? quoteDiscount({ original: parsedOriginal.value, mode, discount: parsedDiscount.value, additionalPercent: parsedAdditional.value }) : null;

  const inputError = [
    original.trim() && !parsedOriginal.ok ? messageForParseFailure(parsedOriginal.reason) : "",
    discount.trim() && !parsedDiscount.ok ? messageForParseFailure(parsedDiscount.reason) : "",
    additionalTrimmed && !parsedAdditional.ok ? messageForParseFailure(parsedAdditional.reason) : "",
  ].find(Boolean);

  useEffect(() => {
    if (!started.current && (original.trim() || discount.trim() || additional.trim())) {
      started.current = true;
      track("tool_input_started", { tool_id: "discount-calculator" });
    }
  }, [additional, discount, original]);

  const operation = additionalTrimmed ? "additional-percent" : mode;
  const reportToken = !quote ? "" : quote.ok ? `${operation}:ok` : `${operation}:${quote.reason}`;
  useEffect(() => {
    if (!reportToken || reported.current === reportToken) return;
    const handle = window.setTimeout(() => {
      reported.current = reportToken;
      if (reportToken.endsWith(":ok")) { track("tool_completed", { tool_id: "discount-calculator", operation }); return; }
      const errorCode = reportToken.slice(operation.length + 1);
      track("tool_error", { tool_id: "discount-calculator", error_code: errorCode });
    }, 600);
    return () => window.clearTimeout(handle);
  }, [operation, reportToken]);

  const summary = quote?.ok ? `Original ${formatMoney(quote.originalCents, currency)}; discount ${formatMoney(quote.firstDiscountCents + quote.secondDiscountCents, currency)}; final ${formatMoney(quote.finalCents, currency)}` : "";

  async function copy() {
    if (!summary) return;
    try { await navigator.clipboard.writeText(summary); setCopied("Result copied."); track("copy_result", { tool_id: "discount-calculator" }); }
    catch { setCopied("Clipboard writing was blocked."); }
  }

  function clear() {
    setOriginal(""); setDiscount(""); setAdditional(""); setCopied("");
    started.current = false; reported.current = "";
    track("clear_input", { tool_id: "discount-calculator" });
  }

  return (
    <form className="mx-auto max-w-2xl" onSubmit={(e) => e.preventDefault()}>
      {/* ── Mode ── */}
      <fieldset>
        <legend className="text-sm font-medium text-ink">Discount type</legend>
        <div className="mt-2 flex gap-1.5">
          {([["percent", "I know the percentage"], ["amount", "I know the amount"]] as const).map(([id, label]) => (
            <label key={id} className={`flex min-h-10 flex-1 cursor-pointer items-center justify-center rounded-md border text-[0.8125rem] font-medium transition-colors ${mode === id ? "border-action bg-action-soft text-action" : "border-line text-muted hover:border-line-strong"}`}>
              <input type="radio" className="sr-only" name="discount-mode" checked={mode === id} onChange={() => setMode(id)} />
              {label}
            </label>
          ))}
        </div>
      </fieldset>

      {/* ── Inputs ── */}
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium">Original price<input inputMode="decimal" value={original} onChange={(e) => setOriginal(e.target.value)} className="field-control mt-1" /></label>
        <label className="text-sm font-medium">{mode === "percent" ? "Discount %" : "Discount amount"}<input inputMode="decimal" value={discount} onChange={(e) => setDiscount(e.target.value)} className="field-control mt-1" /></label>
        <label className="text-sm font-medium">Additional % <span className="font-normal text-muted">(optional)</span><input inputMode="decimal" value={additional} onChange={(e) => setAdditional(e.target.value)} className="field-control mt-1" /></label>
      </div>
      <details className="mt-3 rounded-lg border border-line px-4 py-3">
        <summary className="cursor-pointer text-[0.8125rem] font-medium text-ink">Why 20% + 10% off ≠ 30% off</summary>
        <div className="mt-2 text-[0.8125rem] leading-relaxed text-muted">
          <p>Stacked discounts apply sequentially, not added. On a $100 item:</p>
          <ul className="mt-1.5 ml-4 list-disc space-y-1">
            <li><strong>20% off first</strong> → $100 → $80</li>
            <li><strong>10% off second</strong> → $80 → $72</li>
            <li><strong>Combined effect: 28%</strong>, not 30%</li>
          </ul>
          <p className="mt-1.5">The second discount applies to the <em>already-reduced</em> price. Use the Additional % field to see the real combined savings.</p>
        </div>
      </details>
      <p className="mt-2 text-xs text-faint">Amounts use hundredths, so yen is not listed.</p>

      <label className="mt-3 inline-flex items-center gap-2 text-sm font-medium">
        Currency
        <select className="field-control inline-block w-auto" value={currency} onChange={(e) => setCurrency(e.target.value as DiscountCurrency)}>
          {DISCOUNT_CURRENCIES.map((code) => <option key={code} value={code}>{code}</option>)}
        </select>
      </label>

      {inputError ? <p role="alert" className="mt-3 text-sm text-danger">{inputError}</p> : null}

      {/* ── Result ── */}
      <div className="mt-5 rounded-lg bg-canvas p-5" aria-live="polite">
        {quote?.ok ? (
          <dl className="grid gap-3 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <dt className="text-xs font-medium text-faint">Final price</dt>
              <dd className="text-3xl font-medium tabular-nums tracking-tight text-ink">{formatMoney(quote.finalCents, currency)}</dd>
            </div>
            <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="text-muted">Total savings</span>
              <span className="font-medium tabular-nums">{formatMoney(quote.firstDiscountCents + quote.secondDiscountCents, currency)}</span>
            </div>
            <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="text-muted">Effective discount</span>
              <span className="font-medium tabular-nums">{formatPercent(quote.effectivePercent)}</span>
            </div>
          </dl>
        ) : quote && !quote.ok ? (
          <p role="alert" className="text-sm text-danger">{discountErrorMessage(quote.reason)}</p>
        ) : (
          <p className="text-sm text-muted">Enter a price and a discount to see the final price.</p>
        )}
        {quote?.ok && quote.finalCents < 0 ? <p className="mt-2 text-sm text-muted">The discount is larger than the price, so the final price is negative.</p> : null}
        {quote?.ok && additionalTrimmed ? <p className="mt-2 text-[0.8125rem] text-muted">Second discount: {formatMoney(quote.secondDiscountCents, currency)}. Combined, the discounts remove {formatMoney(quote.firstDiscountCents + quote.secondDiscountCents, currency)} from {formatMoney(quote.originalCents, currency)}.</p> : null}
        {quote?.ok && mode === "amount" && quote.originalCents > 0 ? <p className="mt-1 text-[0.8125rem] text-muted">The first discount is {formatPercent((quote.firstDiscountCents / quote.originalCents) * 100)} of the original price.</p> : null}
        {quote?.ok ? <p className="sr-only">Amount after discount {centsToAmount(quote.finalCents)}</p> : null}
      </div>

      {/* ── Actions ── */}
      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" className="btn btn-primary" onClick={copy} disabled={!summary}>Copy result</button>
        <button type="button" className="btn btn-secondary" onClick={clear}>Clear</button>
        {copied ? <p role="status" className="self-center text-sm text-muted">{copied}</p> : null}
      </div>
    </form>
  );
}
