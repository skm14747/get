"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { calculateGst, type GstSplit } from "@/lib/gst";
import { parseDecimal } from "@/lib/numbers";

function rupees(value: number): string {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 2 }).format(value);
}

export function GstTool() {
  const session = useToolSession("gst-calculator");
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [inclusive, setInclusive] = useState(false);
  const [split, setSplit] = useState<GstSplit>("cgst-sgst");
  const parsedAmount = parseDecimal(amount);
  const parsedRate = parseDecimal(rate);
  const result = parsedAmount.ok && parsedRate.ok ? calculateGst(parsedAmount.value, parsedRate.value, inclusive, split) : null;

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[0.8125rem] leading-relaxed text-muted">Enter the rate yourself. This page does not look up a current Indian GST schedule and it is not tax advice.</p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Amount
          <input className="field-control mt-1" value={amount} inputMode="decimal" onChange={(e) => { setAmount(e.target.value); session.markInput(); }} />
        </label>
        <label className="text-sm font-medium">
          GST percent
          <input className="field-control mt-1" value={rate} inputMode="decimal" onChange={(e) => setRate(e.target.value)} />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3">
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={inclusive} onChange={(e) => setInclusive(e.target.checked)} />
          Amount already includes GST
        </label>
        <label className="text-sm font-medium">
          Split
          <select className="field-control ms-2 inline-block w-auto" value={split} onChange={(e) => setSplit(e.target.value as GstSplit)}>
            <option value="cgst-sgst">CGST + SGST</option>
            <option value="igst">IGST</option>
          </select>
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result?.ok ? (
          <dl className="grid gap-3">
            <div>
              <dt className="text-xs font-medium text-faint">Final amount</dt>
              <dd className="text-3xl font-medium tabular-nums tracking-tight text-ink">{rupees(result.total)}</dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">Taxable</span>
                <span className="font-medium tabular-nums">{rupees(result.taxable)}</span>
              </div>
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">GST</span>
                <span className="font-medium tabular-nums">{rupees(result.tax)}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[0.8125rem] text-muted">
              <span>CGST {rupees(result.cgst)}</span>
              <span>SGST {rupees(result.sgst)}</span>
              <span>IGST {rupees(result.igst)}</span>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">Enter an amount and a rate of zero or more. Amounts are shown in rupees. This is not tax advice.</p>
        )}
      </div>
    </form>
  );
}
