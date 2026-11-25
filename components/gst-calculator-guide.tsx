export function GstCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter an amount and your applicable GST tax rate percentage. Choose whether the amount is exclusive of tax (Add GST) or inclusive of tax (Reverse GST), and select the tax split mode: combined IGST or split CGST + SGST.
        </p>
        <p className="mt-2">
          The calculator instantly displays the net taxable amount, the tax component, and the gross total. When CGST/SGST split is selected, each component is shown individually — useful for creating GST-compliant invoices.
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
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Invoice preparation:</strong> Quickly compute the tax breakdown for client invoices — enter the net amount and rate to get the gross total.</li>
          <li><strong>Price verification:</strong> Reverse-calculate a tax-inclusive retail price to verify the net and tax components on a supplier invoice.</li>
          <li><strong>Freelancer billing:</strong> Determine how much GST to charge on consulting fees and ensure your invoice matches the correct CGST/SGST split for intra-state supply.</li>
          <li><strong>Budgeting:</strong> Estimate the tax impact on bulk purchases before placing orders with vendors.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked example</h2>
        <p className="mt-2">
          For a tax-inclusive amount of $118 at an 18% rate with CGST/SGST split: Taxable value is $100.00, Total Tax is $18.00, CGST is $9.00, and SGST is $9.00.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use IGST mode for inter-state transactions within India, and CGST/SGST split for intra-state transactions.</li>
          <li>Double-check the rate against the latest GST schedule for your specific goods or service category — rates change with government notifications.</li>
          <li>This calculator rounds to two decimal places; for high-volume invoicing, verify rounding rules match your accounting software.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">IGST vs. CGST/SGST explained</h2>
        <p className="mt-2">
          In India&apos;s GST framework, the type of tax depends on whether the supply crosses state borders. <strong>IGST</strong> (Integrated GST) applies to inter-state transactions and imports — the full tax goes to the central government, which later settles with the destination state. <strong>CGST + SGST</strong> applies to intra-state transactions — the tax is split 50/50 between the central government (CGST) and the state government (SGST). The total tax amount is identical in both cases; only the allocation between central and state governments differs.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Financial values, invoice amounts, and tax percentages stay strictly in your browser and are never transmitted to analytics or server databases. No accounting data, invoice figures, or tax calculations are logged or cached.
        </p>
      </section>
    </div>

  );
}
