export function GstCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Enter an amount and your applicable GST tax rate percentage. Choose whether the amount is exclusive of tax (Add GST) or inclusive of tax (Reverse GST), and select the tax split mode: combined IGST or split CGST + SGST.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Formulas and split rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Adding GST (Tax Exclusive):</strong> Tax amount is calculated as <code className="rounded bg-line px-1 py-0.5 text-xs">Amount × (Rate ÷ 100)</code>, and Gross Total equals <code className="rounded bg-line px-1 py-0.5 text-xs">Amount + Tax</code>.</li>
          <li><strong>Removing GST (Reverse / Tax Inclusive):</strong> Net Taxable Amount is calculated as <code className="rounded bg-line px-1 py-0.5 text-xs">Amount ÷ (1 + Rate ÷ 100)</code>, and Tax is the difference between Gross Amount and Net Taxable.</li>
          <li><strong>CGST and SGST split:</strong> Central GST and State GST each take 50% of the calculated tax. When the rounded tax yields an odd cent or paisa, the extra hundredth remains allocated to CGST.</li>
          <li><strong>User-supplied rates:</strong> Because GST statutory schedules vary widely across jurisdictions (such as 5%, 12%, 18%, 28% in India or 10% in Australia), this calculator uses the rate you enter and does not provide legal or tax advice.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="mt-2">
          For a tax-inclusive amount of $118 at an 18% rate with CGST/SGST split: Taxable value is $100.00, Total Tax is $18.00, CGST is $9.00, and SGST is $9.00.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Financial values, invoice amounts, and tax percentages stay strictly in your browser and are never transmitted to analytics or server databases.
        </p>
      </section>
    </div>
  );
}
