"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { addDays, businessDaysBetween, daysBetween } from "@/lib/dates";

const modes = [
  { id: "between", label: "Days between dates" },
  { id: "add", label: "Add or subtract days" },
  { id: "business", label: "Business days (Mon–Fri)" },
] as const;

type Mode = (typeof modes)[number]["id"];

export function DateTool() {
  const session = useToolSession("date-calculator");
  const [mode, setMode] = useState<Mode>("between");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [amount, setAmount] = useState("10");
  const result = mode === "add" ? addDays(start, Number(amount)) : mode === "business" ? businessDaysBetween(start, end) : daysBetween(start, end);

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <fieldset>
        <legend className="text-sm font-medium text-ink">Mode</legend>
        <div className="mt-2 grid gap-1.5 sm:grid-cols-3">
          {modes.map((item) => (
            <label key={item.id} className={`flex min-h-10 cursor-pointer items-center justify-center rounded-md border px-3 text-center text-[0.8125rem] font-medium transition-colors ${mode === item.id ? "border-action bg-action-soft text-action" : "border-line text-muted hover:border-line-strong"}`}>
              <input type="radio" className="sr-only" checked={mode === item.id} onChange={() => setMode(item.id)} />
              {item.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Start date
          <input type="date" className="field-control mt-1" value={start} onChange={(e) => { setStart(e.target.value); session.markInput(); }} />
        </label>
        {mode === "add" ? (
          <label className="text-sm font-medium">
            Days to add <span className="font-normal text-muted">(negative subtracts)</span>
            <input className="field-control mt-1" value={amount} onChange={(e) => setAmount(e.target.value)} inputMode="numeric" />
          </label>
        ) : (
          <label className="text-sm font-medium">
            End date
            <input type="date" className="field-control mt-1" value={end} onChange={(e) => setEnd(e.target.value)} />
          </label>
        )}
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result.ok ? (
          mode === "add" ? (
            <p className="text-2xl font-medium tabular-nums tracking-tight text-ink">{result.end}</p>
          ) : (
            <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{result.days} <span className="text-lg font-normal text-muted">{result.days === 1 ? "day" : "days"}</span></p>
          )
        ) : (
          <p className="text-sm text-muted">Enter valid dates. Business days are Monday to Friday only. No holiday calendar is included.</p>
        )}
      </div>
    </form>
  );
}
