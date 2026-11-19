"use client";

import { useEffect, useMemo, useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { ageOn, formatIsoDate } from "@/lib/age";

export function AgeTool() {
  const { markError, markInput, markSuccess } = useToolSession("age-calculator");
  const [birth, setBirth] = useState("");
  const [reference, setReference] = useState("");
  const result = useMemo(() => (birth && reference ? ageOn(birth, reference) : null), [birth, reference]);
  useEffect(() => {
    if (result?.ok) markSuccess("age");
    else if (result && !result.ok) markError(result.reason);
  }, [markError, markSuccess, result]);

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium">
          Date of birth
          <input type="date" className="field-control mt-1" value={birth} onChange={(e) => { setBirth(e.target.value); markInput(); }} />
        </label>
        <label className="text-sm font-medium">
          Reference date
          <input type="date" className="field-control mt-1" value={reference} onChange={(e) => setReference(e.target.value)} />
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result?.ok ? (
          <>
            <div className="flex flex-wrap gap-x-5 gap-y-1">
              <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{result.years} <span className="text-base font-normal text-muted">years</span></p>
              <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{result.months} <span className="text-base font-normal text-muted">months</span></p>
              <p className="text-3xl font-medium tabular-nums tracking-tight text-ink">{result.days} <span className="text-base font-normal text-muted">days</span></p>
            </div>
            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
              <div className="flex justify-between gap-3 rounded-md bg-surface px-3 py-2">
                <dt className="text-muted">Next birthday</dt>
                <dd className="font-medium tabular-nums">{formatIsoDate(result.nextBirthday)}</dd>
              </div>
              <div className="flex justify-between gap-3 rounded-md bg-surface px-3 py-2">
                <dt className="text-muted">Days until</dt>
                <dd className="font-medium tabular-nums">{result.daysUntilNextBirthday.toLocaleString("en-US")}</dd>
              </div>
            </dl>
          </>
        ) : result && !result.ok ? (
          <p role="alert" className="text-sm text-danger">
            {result.reason === "reference_before_birth" ? "The reference date is before the date of birth." : "Enter real calendar dates."}
          </p>
        ) : (
          <p className="text-sm text-muted">Choose both dates. February 29 uses February 28 in a non-leap year.</p>
        )}
      </div>
    </form>
  );
}
