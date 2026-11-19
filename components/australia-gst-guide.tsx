export function AustraliaGstGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Enter an amount in Australian Dollars ($). Choose whether to Add 10% GST to an exclusive price or Remove GST from an inclusive retail price using the statutory Australian Taxation Office (ATO) 1/11th rule.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">ATO GST rules and the 1/11th formula</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Standard 10% GST:</strong> In Australia, Goods and Services Tax (GST) is a broad-based tax of 10% on most supplies.</li>
          <li><strong>Adding GST (Tax Exclusive):</strong> To calculate gross price, multiply net amount by 0.10 for GST, then add to net (<code className="rounded bg-line px-1 py-0.5 text-xs">Total = Net × 1.10</code>).</li>
          <li><strong>The Statutory 1/11th Rule (Tax Inclusive):</strong> When a price already includes GST, the GST component is exactly one-eleventh of the total amount (<code className="rounded bg-line px-1 py-0.5 text-xs">GST = Total ÷ 11</code>). The net price is the remaining ten-elevenths (<code className="rounded bg-line px-1 py-0.5 text-xs">Net = Total − (Total ÷ 11)</code>).</li>
          <li><strong>GST-Free Supplies:</strong> The ATO classifies certain items as GST-free, including most basic food items, some medical and health services, and designated educational courses.</li>
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
        <h2 className="text-xl font-semibold">Privacy disclosure</h2>
        <p className="mt-2">
          Calculations run client-side. Invoicing amounts and pricing figures stay in this browser session and are never uploaded to remote analytics or servers.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Businesses and consumers in Australia frequently need to calculate 10% GST or verify inclusive retail prices using the ATO 1/11th rule. This tool provides instant, private arithmetic on your device.
        </p>
      </section>
    </div>
  );
}
