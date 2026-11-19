"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { parseDecimal } from "@/lib/numbers";
import { calculateUkVat, type UkVatRateType } from "@/lib/uk-vat";

function gbp(value: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 2,
  }).format(value);
}

export function UkVatTool() {
  const session = useToolSession("vat-calculator-uk");
  const [amount, setAmount] = useState("");
  const [rateType, setRateType] = useState<UkVatRateType>("standard");
  const [customRate, setCustomRate] = useState("20");
  const [inclusive, setInclusive] = useState(false);

  const parsedAmount = parseDecimal(amount);
  const parsedCustomRate = parseDecimal(customRate);

  const activeRate =
    rateType === "custom"
      ? parsedCustomRate.ok
        ? parsedCustomRate.value
        : 20
      : rateType;

  const result = parsedAmount.ok ? calculateUkVat(parsedAmount.value, activeRate, inclusive) : null;

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Calculate UK Value Added Tax. Select standard HMRC rates (20% standard, 5% reduced, 0% zero) or enter a custom rate. This page is not formal tax advice.
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Amount (£)
          <input
            className="field-control mt-1"
            value={amount}
            inputMode="decimal"
            placeholder="e.g. 100.00"
            onChange={(e) => {
              setAmount(e.target.value);
              session.markInput();
            }}
          />
        </label>

        <div>
          <span className="block text-sm font-medium text-ink">UK VAT Rate</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {(["standard", "reduced", "zero", "custom"] as const).map((type) => (
              <button
                key={type}
                type="button"
                className={`min-h-11 rounded-md px-3 text-xs font-medium transition-colors ${
                  rateType === type
                    ? "bg-ink text-paper"
                    : "border border-line bg-surface text-muted hover:text-ink"
                }`}
                onClick={() => setRateType(type)}
              >
                {type === "standard"
                  ? "Standard (20%)"
                  : type === "reduced"
                  ? "Reduced (5%)"
                  : type === "zero"
                  ? "Zero (0%)"
                  : "Custom"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {rateType === "custom" ? (
        <div className="mt-4">
          <label className="text-sm font-medium text-ink">
            Custom Rate (%)
            <input
              className="field-control mt-1 w-full sm:w-48"
              value={customRate}
              inputMode="decimal"
              onChange={(e) => setCustomRate(e.target.value)}
            />
          </label>
        </div>
      ) : null}

      <div className="mt-4 flex items-center gap-2">
        <label className="flex items-center gap-2 text-sm text-ink cursor-pointer">
          <input
            type="checkbox"
            checked={inclusive}
            onChange={(e) => setInclusive(e.target.checked)}
          />
          Amount already includes UK VAT (Reverse VAT calculation)
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result?.ok ? (
          <dl className="grid gap-3">
            <div>
              <dt className="text-xs font-medium text-faint">
                {inclusive ? "Net Amount (Excl. VAT)" : "Gross Total (Incl. VAT)"}
              </dt>
              <dd className="text-3xl font-medium tabular-nums tracking-tight text-ink">
                {gbp(inclusive ? result.net : result.gross)}
              </dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">Net (Excl. VAT)</span>
                <span className="font-medium tabular-nums text-ink">{gbp(result.net)}</span>
              </div>
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">VAT ({result.ratePercent}%)</span>
                <span className="font-medium tabular-nums text-ink">{gbp(result.vat)}</span>
              </div>
            </div>
            <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="text-muted">Gross Total</span>
              <span className="font-medium tabular-nums text-ink">{gbp(result.gross)}</span>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">
            Enter an amount above £0.00 to view the UK VAT breakdown. Values formatted in GBP (£).
          </p>
        )}
      </div>
    </form>
  );
}
