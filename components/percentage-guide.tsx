import { PERCENT_EXAMPLES } from "@/lib/percentage";

export function PercentageGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What each calculation means: Increase, decrease, and difference</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>What is X% of Y? Multiplies Y by X, then divides by 100. Fifteen percent of 80 is 12.</li>
          <li>X is what percent of Y? Divides X by Y, then multiplies by 100. “What percentage is X of Y?” is the same question. Both stay on this page.</li>
          <li>Percentage change from the original number to the new number is (new − original) ÷ original × 100. Positive means an increase. Negative means a decrease.</li>
          <li>Percentage increase uses that same change formula. If the result is negative, the new number is smaller.</li>
          <li>Percentage decrease is (original − new) ÷ original × 100. A price that falls from 100 to 80 is a 20% decrease. If the result is negative, the new number is larger.</li>
          <li>Percentage difference compares two numbers without a direction. It divides the absolute gap by the average of the two absolute values. The difference between 80 and 100 is 22.222222%. That is not the 25% change from 80 to 100, and it is not a percentage-point change.</li>
          <li>Original before an increase divides the final amount by 1 + percent / 100. A final amount of 112 after a 12% increase started at 100.</li>
          <li>Original before a discount divides the final amount by 1 − percent / 100. A final amount of 80 after a 20% discount started at 100. A 100% discount has no original price, because that would divide by zero.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Step-by-step worked percentage examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          {PERCENT_EXAMPLES.map((example) => (
            <li key={example.id}>
              <span className="font-medium">{example.label}. </span>
              {example.detail}
            </li>
          ))}
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Calculation edge cases and mathematical bounds</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Dividing by zero has no percentage. The page says the result is undefined instead of showing an infinite value.</li>
          <li>Negative inputs are allowed. A negative part of a positive whole is a negative percent.</li>
          <li>Use a dot for decimals. A comma is rejected so 1,000 is not read as 1.</li>
          <li>Results are displayed with up to six decimal places. Very large values can fall outside ordinary floating-point numbers and are rejected.</li>
          <li>A percentage-point change is a subtraction of two percentages, such as a rate moving from 5% to 7%, which is 2 percentage points. This page does not call that a 40% change unless you calculate the change from 5 to 7.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Client-side privacy: Calculations stay in your browser</h2>
        <p className="mt-2">
          The numbers stay in this browser. Measurement does not receive them.
        </p>
      </section>
    </div>
  );
}
