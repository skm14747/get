"use client";

import { useState } from "react";
import { useToolSession } from "@/components/use-tool-session";
import { calculateBelgiumTva, type BelgiumTvaRateType } from "@/lib/belgium-tva";
import { parseDecimal } from "@/lib/numbers";

function eur(value: number): string {
  return new Intl.NumberFormat("nl-BE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function BelgiumTvaTool() {
  const session = useToolSession("belgium-tva-calculator");
  const [amount, setAmount] = useState("");
  const [rateType, setRateType] = useState<BelgiumTvaRateType>("standard");
  const [customRate, setCustomRate] = useState("21");
  const [inclusive, setInclusive] = useState(false);

  const parsedAmount = parseDecimal(amount);
  const parsedCustomRate = parseDecimal(customRate);

  const activeRate =
    rateType === "custom"
      ? parsedCustomRate.ok
        ? parsedCustomRate.value
        : 21
      : rateType;

  const result = parsedAmount.ok ? calculateBelgiumTva(parsedAmount.value, activeRate, inclusive) : null;

  return (
    <form className="mx-auto max-w-xl" onSubmit={(e) => e.preventDefault()}>
      <p className="text-[0.8125rem] leading-relaxed text-muted">
        Calculer la TVA belge (BTW) selon les taux légaux du SPF Finances (21% standard, 12% intermédiaire, 6% réduit).
      </p>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="text-sm font-medium text-ink">
          Montant (€)
          <input
            className="field-control mt-1"
            value={amount}
            inputMode="decimal"
            placeholder="Ex : 100,00"
            onChange={(e) => {
              setAmount(e.target.value);
              session.markInput();
            }}
          />
        </label>

        <div>
          <span className="block text-sm font-medium text-ink">Taux TVA / BTW</span>
          <div className="mt-1 flex flex-wrap gap-2">
            {(["standard", "intermediaire", "reduit", "custom"] as const).map((type) => (
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
                  ? "Standard (21%)"
                  : type === "intermediaire"
                  ? "Intermédiaire (12%)"
                  : type === "reduit"
                  ? "Réduit (6%)"
                  : "Personnalisé"}
              </button>
            ))}
          </div>
        </div>
      </div>

      {rateType === "custom" ? (
        <div className="mt-4">
          <label className="text-sm font-medium text-ink">
            Taux personnalisé (%)
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
          Montant TTC inclus (Calcul de la TVA inversée)
        </label>
      </div>

      <div aria-live="polite" className="mt-5 rounded-lg bg-canvas p-5">
        {result?.ok ? (
          <dl className="grid gap-3">
            <div>
              <dt className="text-xs font-medium text-faint">
                {inclusive ? "Montant net (Hors Taxes - HT)" : "Montant total (TTC)"}
              </dt>
              <dd className="text-3xl font-medium tabular-nums tracking-tight text-ink">
                {eur(inclusive ? result.ht : result.ttc)}
              </dd>
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">Montant HT</span>
                <span className="font-medium tabular-nums text-ink">{eur(result.ht)}</span>
              </div>
              <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
                <span className="text-muted">TVA ({result.ratePercent}%)</span>
                <span className="font-medium tabular-nums text-ink">{eur(result.tva)}</span>
              </div>
            </div>
            <div className="flex justify-between rounded-md bg-surface px-3 py-2 text-sm">
              <span className="text-muted">Total TTC</span>
              <span className="font-medium tabular-nums text-ink">{eur(result.ttc)}</span>
            </div>
          </dl>
        ) : (
          <p className="text-sm text-muted">
            Saisissez un montant pour voir la ventilation de la TVA belge en euros (€).
          </p>
        )}
      </div>
    </form>
  );
}
