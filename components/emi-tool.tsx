"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { calculateEmi } from "@/lib/emi";
import { formatDecimal, parseDecimal } from "@/lib/numbers";

export function EmiTool() {
  const session = useToolSession("emi-calculator");
  const [principal, setPrincipal] = useState("");
  const [rate, setRate] = useState("");
  const [months, setMonths] = useState("12");
  const parsedPrincipal = parseDecimal(principal);
  const parsedRate = parseDecimal(rate);
  const parsedMonths = parseDecimal(months);
  const result = parsedPrincipal.ok && parsedRate.ok && parsedMonths.ok ? calculateEmi(parsedPrincipal.value, parsedRate.value, parsedMonths.value) : null;

  return (
    <form className="mx-auto max-w-2xl" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-3">
        <label className="text-sm font-medium">
          Principal
          <input className="field-control mt-1" value={principal} inputMode="decimal" onChange={(e) => { setPrincipal(e.target.value); session.markInput(); }} />
        </label>
        <label className="text-sm font-medium">
          Annual interest %
          <input className="field-control mt-1" value={rate} inputMode="decimal" onChange={(e) => setRate(e.target.value)} />
        </label>
        <label className="text-sm font-medium">
          Tenure <span className="font-normal text-muted">(months)</span>
          <input className="field-control mt-1" value={months} inputMode="numeric" onChange={(e) => setMonths(e.target.value)} />
        </label>
      </div>

      {result?.ok ? (
        <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
          <div className="grid gap-3 sm:grid-cols-3">
            <div>
              <p className="text-xs font-medium text-faint">Monthly payment</p>
              <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{formatDecimal(result.payment)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-faint">Total interest</p>
              <p className="text-xl font-medium tabular-nums text-ink">{formatDecimal(result.totalInterest)}</p>
            </div>
            <div>
              <p className="text-xs font-medium text-faint">Total repayment</p>
              <p className="text-xl font-medium tabular-nums text-ink">{formatDecimal(result.totalPayment)}</p>
            </div>
          </div>

          {/* Principal vs interest bar */}
          <div className="mt-4 flex h-2.5 overflow-hidden rounded-full" aria-hidden="true">
            <div className="bg-action" style={{ width: `${result.totalPayment > 0 ? ((result.totalPayment - result.totalInterest) / result.totalPayment) * 100 : 0}%` }} />
            <div className="bg-warning" style={{ width: `${result.totalPayment > 0 ? (result.totalInterest / result.totalPayment) * 100 : 0}%` }} />
          </div>
          <p className="mt-1.5 text-xs text-faint">Indigo is principal · amber is interest · a lender&apos;s fees can differ</p>

          {/* Amortization schedule */}
          <details className="mt-5">
            <summary className="flex cursor-pointer items-center text-sm font-medium text-ink">Amortization schedule</summary>
            <div className="mt-2 max-h-72 overflow-auto rounded-md border border-line bg-surface">
              <table className="w-full text-sm tabular-nums">
                <thead><tr><th className="sticky top-0 z-10 bg-surface">Month</th><th className="sticky top-0 z-10 bg-surface">Payment</th><th className="sticky top-0 z-10 bg-surface">Interest</th><th className="sticky top-0 z-10 bg-surface">Balance</th></tr></thead>
                <tbody>
                  {result.schedule.map((row) => (
                    <tr key={row.month}><td>{row.month}</td><td>{formatDecimal(row.payment)}</td><td>{formatDecimal(row.interest)}</td><td>{formatDecimal(row.balance)}</td></tr>
                  ))}
                </tbody>
              </table>
            </div>
          </details>
        </div>
      ) : (
        <div className="mt-5 rounded-lg bg-canvas p-5">
          <p className="text-sm text-muted">{result && !result.ok && result.reason === "too_long" ? "Tenure is capped at 360 months." : "Enter a principal, a rate, and a whole number of months."}</p>
        </div>
      )}
    </form>
  );
}
