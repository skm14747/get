export function AustraliaGstGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter an amount in Australian Dollars ($). Choose whether to Add 10% GST to an exclusive price or Remove GST from an inclusive retail price using the statutory Australian Taxation Office (ATO) 1/11th rule.
        </p>
        <p className="mt-2">
          The calculator instantly shows the net amount, the GST component, and the total inclusive price. All arithmetic uses the exact ATO-prescribed formulas and rounds to the nearest cent.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">ATO GST rules and the 1/11th formula</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Standard 10% GST:</strong> In Australia, Goods and Services Tax (GST) is a broad-based tax of 10% on most supplies of goods, services, and anything else consumed in Australia.</li>
          <li><strong>Adding GST (Tax Exclusive):</strong> To calculate gross price, multiply net amount by 0.10 for GST, then add to net (<code className="rounded bg-line px-1 py-0.5 text-xs">Total = Net × 1.10</code>).</li>
          <li><strong>The Statutory 1/11th Rule (Tax Inclusive):</strong> When a price already includes GST, the GST component is exactly one-eleventh of the total amount (<code className="rounded bg-line px-1 py-0.5 text-xs">GST = Total ÷ 11</code>). The net price is the remaining ten-elevenths (<code className="rounded bg-line px-1 py-0.5 text-xs">Net = Total − (Total ÷ 11)</code>).</li>
          <li><strong>GST-Free Supplies:</strong> The ATO classifies certain items as GST-free, including most basic food items, some medical and health services, and designated educational courses.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Small business invoicing:</strong> Calculate the GST component to include on tax invoices as required by the ATO for GST-registered businesses.</li>
          <li><strong>BAS preparation:</strong> Verify GST amounts on supplier invoices before entering them into your Business Activity Statement (BAS).</li>
          <li><strong>Retail price verification:</strong> Check the GST-exclusive price from a shelf price to compare wholesale costs across suppliers.</li>
          <li><strong>Freelancer quotes:</strong> Determine the GST-inclusive quote amount when your base rate is GST-exclusive.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Adding 10% GST to $100:</strong> GST is $10.00 ($100 × 0.10) and total price is $110.00.</li>
          <li><strong>Removing GST from $110 retail:</strong> GST is $10.00 ($110 ÷ 11) and net price is $100.00.</li>
          <li><strong>Odd cents rounding:</strong> For a retail price of $55.00: GST is $55 ÷ 11 = $5.00, and Net is $50.00.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>In Australia, prices displayed to consumers must be GST-inclusive. Use the reverse calculation to extract the GST component from displayed prices.</li>
          <li>The 1/11th rule is exact for 10% GST — it&apos;s not an approximation, but the mathematically precise formula specified by the ATO.</li>
          <li>This calculator does not determine whether a supply is GST-free or input-taxed — consult the ATO for classification guidance.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">GST registration thresholds</h2>
        <p className="mt-2">
          In Australia, businesses with a GST turnover of $75,000 or more per year (or $150,000 for non-profit organisations) are required to register for GST with the ATO. Once registered, you must charge GST on taxable supplies, file Business Activity Statements (BAS), and can claim GST credits on business purchases. This calculator helps both registered and unregistered businesses verify GST components in their pricing.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy disclosure</h2>
        <p className="mt-2">
          Calculations run client-side. Invoicing amounts and pricing figures stay in this browser session and are never uploaded to remote analytics or servers. No financial data is logged or transmitted.
        </p>
      </section>
    </div>
  );
}
