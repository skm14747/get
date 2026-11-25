import { DISCOUNT_RULES } from "@/lib/discount";

export function DiscountGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter the original price and either a percentage or a discount amount. The final price is the original price minus the discount. A $50 price with 20% off has a $10 discount and a $40 final price. The page does not assume a currency.
        </p>
        <p className="mt-2">{DISCOUNT_RULES.rounding}</p>
        <p className="mt-2">{DISCOUNT_RULES.additional} A $100 price with 20% off, then 10% off, ends at $72. The first discount is $20 and the second is $8.</p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Retail shopping:</strong> Quickly verify sale prices in-store — enter the sticker price and advertised discount percentage to check the register total before you pay.</li>
          <li><strong>Coupon stacking:</strong> Calculate the effect of sequential discounts — enter the first percentage, then apply a second discount to the reduced price.</li>
          <li><strong>Wholesale pricing:</strong> Determine the per-unit cost after volume discount tiers for procurement and budgeting decisions.</li>
          <li><strong>Negotiation prep:</strong> Know your target number before salary or vendor negotiations — work backwards from a desired final price to the percentage off.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked retail and shopping discount examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>$19.99 with 10% off discounts $2.00 and finishes at $17.99. The discount is rounded to the nearest hundredth.</li>
          <li>A $40 price with an $8 discount is 20% off before any second discount, and the final price is $32.00.</li>
          <li>A discount larger than the price produces a negative final price and the page says so.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Sequential discounts are not additive: 20% off then 10% off is not the same as 30% off. The second discount applies to the already-reduced price.</li>
          <li>To find the original price from a sale price, divide the sale price by (1 − discount/100). For example, a $72 final after 10% off started at $80.</li>
          <li>Use this alongside the Percentage Calculator for more complex multi-step percentage problems.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding sequential (stacked) discounts</h2>
        <p className="mt-2">
          When two discounts are applied in sequence, the second discount applies to the already-reduced price, not the original. This is why 20% off then 10% off equals 28% total savings — not 30%. The formula is: Final = Original × (1 − d1/100) × (1 − d2/100). Retailers sometimes advertise stacked discounts to make them sound larger than they are.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Discount limits and separation from sales tax</h2>
        <p className="mt-2">
          Negative prices and negative discounts are rejected. This is not a tax calculator. It does not add sales tax, VAT, or GST after the discount. For tax calculations, use the dedicated GST or VAT calculators.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Rounding and currency precision</h2>
        <p className="mt-2">
          All results are rounded to the nearest hundredth (two decimal places) to match standard currency formatting. The calculator does not assume a specific currency — it works with any monetary unit. For currencies without subunits (like Japanese Yen), round the result manually to the nearest whole number.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: pricing calculations stay in your browser</h2>
        <p className="mt-2">Prices and discounts stay in this browser. Measurement does not receive them. No financial data is logged or transmitted.</p>
      </section>
    </div>
  );
}
