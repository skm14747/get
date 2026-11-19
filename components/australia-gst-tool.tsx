"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { calculateAustraliaGst } from "@/lib/australia-gst";
import { parseDecimal } from "@/lib/numbers";

function aud(value: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
    maximumFractionDigits: 2,
  }).format(value);
}

export function AustraliaGstTool() {
  const session = useToolSession("gst-calculator-australia");
  const [amount, setAmount] = useState("");
  const [inclusive, setInclusive] = useState(false);

  const parsedAmount = parseDecimal(amount);
  const result = parsedAmount.ok ? calculateAustraliaGst(parsedAmount.value, inclusive) : null;

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Calculate Australian Goods and Services Tax (GST) using the standard ATO 10% rate and the statutory 1/11th inclusive rule.
      </p>

      <div className="mt-4">
        <label className="text-sm font-medium text-ink">
          Amount (AUD $)
          <input
            className="field-control mt-1"
            value={amount}
            inputMode="decimal"
            placeholder="e.g. 110.00"
            onChange={(e) => {
              setAmount(e.target.value);
              session.markInput();
            }}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          className={`min-h-11 rounded-md px-4 text-sm font-medium transition-colors ${
            !inclusive
              ? "bg-ink text-paper"
              : "border border-line bg-surface text-muted hover:text-ink"
          }`}
          onClick={() => setInclusive(false)}
        >
          Add 10% GST (Tax Exclusive)
        </button>
        <button
          type="button"
          className={`min-h-11 rounded-md px-4 text-sm font-medium transition-colors ${
            inclusive
              ? "bg-ink text-paper"
              : "border border-line bg-surface text-muted hover:text-ink"
          }`}
          onClick={() => setInclusive(true)}
        >
          Remove GST (1/11th Tax Inclusive)
        </button>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result?.ok ? (
          <dl className="grid gap-3">
            <div>
              <dt className="text-xs font-medium text-faint">
                {inclusive ? "Net Base (Excl. GST)" : "Total Price (Incl. GST)"}
              </dt>
              <dd className="text-3xl font-medium tabular-nums tracking-tight text-ink">
                {aud(inclusive ? result.net : result.total)}
              </dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">Net (Excl. GST)</span>
                <span className="font-medium tabular-nums text-ink">{aud(result.net)}</span>
              </div>
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">
                  GST {result.usedOneEleventhRule ? "(1/11th)" : "(10%)"}
                </span>
                <span className="font-medium tabular-nums text-ink">{aud(result.gst)}</span>
              </div>
            </div>
            <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="text-muted">Gross Total</span>
              <span className="font-medium tabular-nums text-ink">{aud(result.total)}</span>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">
            Enter an amount to see the Australian GST breakdown at the statutory 10% rate.
          </p>
        )}
      </div>
    </form>
  );
}
