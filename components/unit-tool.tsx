"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { formatDecimal, parseDecimal } from "@/lib/numbers";
import { convertUnit, UNIT_GROUPS, type UnitKind } from "@/lib/units";

export function UnitTool() {
  const session = useToolSession("unit-converter");
  const [kind, setKind] = useState<UnitKind>("length");
  const units = UNIT_GROUPS[kind];
  const [from, setFrom] = useState(units[0] ?? "m");
  const [to, setTo] = useState(units[1] ?? units[0] ?? "m");
  const [raw, setRaw] = useState("1");
  const parsed = parseDecimal(raw);
  const converted = parsed.ok ? convertUnit(kind, parsed.value, from, to) : null;

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <label className="text-sm font-medium">
        Quantity
        <select className="field-control mt-1" value={kind} onChange={(e) => { const next = e.target.value as UnitKind; setKind(next); setFrom(UNIT_GROUPS[next][0] ?? ""); setTo(UNIT_GROUPS[next][1] ?? UNIT_GROUPS[next][0] ?? ""); }}>
          {Object.keys(UNIT_GROUPS).map((item) => <option key={item}>{item}</option>)}
        </select>
      </label>

      <label className="mt-4 block text-sm font-medium">
        Value
        <input className="field-control mt-1" value={raw} inputMode="decimal" onChange={(e) => { setRaw(e.target.value); session.markInput(); }} />
      </label>

      <div className="mt-4 grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
        <label className="text-sm font-medium">
          From
          <select className="field-control mt-1" value={from} onChange={(e) => setFrom(e.target.value)}>
            {units.map((unit) => <option key={unit}>{unit}</option>)}
          </select>
        </label>
        <button type="button" className="btn btn-secondary self-end" onClick={() => { const next = from; setFrom(to); setTo(next); }} aria-label="Swap units">⇄</button>
        <label className="text-sm font-medium">
          To
          <select className="field-control mt-1" value={to} onChange={(e) => setTo(e.target.value)}>
            {units.map((unit) => <option key={unit}>{unit}</option>)}
          </select>
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {converted === null ? (
          <p className="text-sm text-muted">Enter a number.</p>
        ) : (
          <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{formatDecimal(converted)} <span className="text-lg font-normal text-muted">{to}</span></p>
        )}
      </div>
    </form>
  );
}
