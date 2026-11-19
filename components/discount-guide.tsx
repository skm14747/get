import { DISCOUNT_RULES } from "@/lib/discount";

export function DiscountGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-medium">How the discount is applied</h2>
        <p className="mt-2">
          Enter the original price and either a percentage or a discount amount. The final price is the original price minus the discount. A $50 price with 20% off has a $10 discount and a $40 final price. The page does not assume a currency.
        </p>
        <p className="mt-2">{DISCOUNT_RULES.rounding}</p>
        <p className="mt-2">{DISCOUNT_RULES.additional} A $100 price with 20% off, then 10% off, ends at $72. The first discount is $20 and the second is $8.</p>
      </section>
      <section>
        <h2 className="text-xl font-medium">Examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>$19.99 with 10% off discounts $2.00 and finishes at $17.99. The discount is rounded to the nearest hundredth.</li>
          <li>A $40 price with an $8 discount is 20% off before any second discount, and the final price is $32.00.</li>
          <li>A discount larger than the price produces a negative final price and the page says so.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-medium">Limits</h2>
        <p className="mt-2">
          Negative prices and negative discounts are rejected. This is not a tax calculator. It does not add sales tax, VAT, or GST after the discount.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-medium">Privacy</h2>
        <p className="mt-2">Prices and discounts stay in this browser. Measurement does not receive them.</p>
      </section>
    </div>
  );
}
