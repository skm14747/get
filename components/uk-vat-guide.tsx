export function UkVatGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter an amount in British Pounds (£). Select a standard UK VAT rate (20% standard, 5% reduced, or 0% zero) or enter a custom rate. Toggle whether the price is tax-exclusive (Add VAT) or tax-inclusive (Reverse VAT) to see an instant breakdown of Net Price, VAT, and Gross Total.
        </p>
        <p className="mt-2">
          The calculator applies HMRC-standard arithmetic and rounds to the nearest penny. Results update in real time as you adjust the amount or rate.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">UK VAT rates and statutory formulas</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Standard Rate (20%):</strong> Applies to most goods and services in the UK. In effect since 4 January 2011 under HMRC guidelines.</li>
          <li><strong>Reduced Rate (5%):</strong> Applies to specific items such as domestic fuel and power, children&apos;s car seats, and energy-saving materials.</li>
          <li><strong>Zero Rate (0%):</strong> Applies to most groceries, books, newspapers, and children&apos;s clothing. Zero-rated supplies charge 0% VAT while allowing VAT-registered businesses to reclaim input tax.</li>
          <li><strong>Adding VAT (Tax Exclusive):</strong> Calculated as <code className="rounded bg-line px-1 py-0.5 text-xs">VAT = Net × (Rate ÷ 100)</code> and <code className="rounded bg-line px-1 py-0.5 text-xs">Gross = Net + VAT</code>.</li>
          <li><strong>Removing VAT (Reverse / Tax Inclusive):</strong> Net amount is calculated as <code className="rounded bg-line px-1 py-0.5 text-xs">Net = Gross ÷ (1 + Rate ÷ 100)</code> (for 20% VAT, divide by 1.20). VAT is <code className="rounded bg-line px-1 py-0.5 text-xs">Gross − Net</code>.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Freelancer invoicing:</strong> Calculate the VAT to add onto your net consulting fees when billing VAT-registered clients.</li>
          <li><strong>VAT return preparation:</strong> Extract the VAT component from supplier invoices to reconcile your quarterly HMRC VAT return.</li>
          <li><strong>Retail price analysis:</strong> Reverse-calculate the net price from a shelf price to compare supplier margins.</li>
          <li><strong>International trade:</strong> Verify VAT charges on UK imports or cross-border services where the rate may differ from your home country.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Adding 20% VAT to £100:</strong> Net is £100.00, VAT is £20.00, and Gross Total is £120.00.</li>
          <li><strong>Removing 20% VAT from £120:</strong> Net is £120 ÷ 1.20 = £100.00, and VAT is £20.00.</li>
          <li><strong>Reduced 5% rate on £105:</strong> Net is £105 ÷ 1.05 = £100.00, and VAT is £5.00.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>UK consumer prices are displayed inclusive of VAT — use the reverse calculation to find the net amount for accounting records.</li>
          <li>The VAT Flat Rate Scheme uses different percentages based on business type — this calculator uses the standard method, not the flat rate.</li>
          <li>Always verify the applicable rate for your specific goods or services on the HMRC website, as some items have changed classification post-Brexit.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">VAT registration in the UK</h2>
        <p className="mt-2">
          In the UK, businesses with taxable turnover exceeding £90,000 per year must register for VAT with HMRC. Voluntarily registered businesses below the threshold can still charge VAT and reclaim input tax. This calculator helps both registered and unregistered businesses verify VAT arithmetic on invoices and receipts.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and statutory disclosure</h2>
        <p className="mt-2">
          Calculations are computed locally in your browser. No financial figures, invoice amounts, or client details are stored or transmitted. This tool provides arithmetic assistance and is not formal accounting or legal tax advice.
        </p>
      </section>
    </div>
  );
}
