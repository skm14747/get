import { EMI_MAX_MONTHS } from "@/lib/emi";

export function EmiCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter your loan principal amount, annual interest rate percentage, and loan tenure in months (up to {EMI_MAX_MONTHS} months / 30 years). The calculator displays your monthly payment (EMI), total interest payable, overall payment, and a full month-by-month repayment schedule.
        </p>
        <p className="mt-2">
          The amortization schedule breaks down each month&apos;s payment into the principal component and interest component, showing how the balance decreases over time. Early payments are interest-heavy, while later payments go mostly toward principal.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Reducing-balance payment formula</h2>
        <p className="mt-2">
          The monthly payment uses the standard reducing-balance amortization formula:
        </p>
        <div className="mt-2 rounded-lg border border-line bg-surface p-4 font-mono text-sm text-ink">
          EMI = [P × r × (1 + r)^n] / [(1 + r)^n − 1]
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>P:</strong> Principal loan amount borrowed.</li>
          <li><strong>r:</strong> Monthly interest rate, calculated as annual interest rate divided by 12 and by 100 (<code className="rounded bg-line px-1 py-0.5 text-xs">Annual% ÷ 1200</code>).</li>
          <li><strong>n:</strong> Total tenure in months (1 to {EMI_MAX_MONTHS}).</li>
          <li><strong>Zero interest:</strong> If the interest rate is 0%, the monthly payment simplifies directly to principal divided by months (<code className="rounded bg-line px-1 py-0.5 text-xs">P ÷ n</code>).</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Home loan planning:</strong> Estimate monthly EMI before applying for a mortgage to ensure the payment fits within your budget.</li>
          <li><strong>Car loan comparison:</strong> Compare EMIs across different loan tenures and interest rates offered by banks to find the most affordable option.</li>
          <li><strong>Personal loan budgeting:</strong> Calculate the total interest you&apos;ll pay over the life of a personal loan and decide whether a shorter tenure saves enough interest to justify higher monthly payments.</li>
          <li><strong>Education loan estimation:</strong> Plan for student loan repayments before enrollment by modeling different principal amounts and repayment periods.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Shortening the loan tenure increases EMI but dramatically reduces total interest paid — a 15-year mortgage costs far less in interest than a 30-year one.</li>
          <li>Use the amortization schedule to see the crossover point where more of each payment goes to principal than interest.</li>
          <li>Compare multiple scenarios by adjusting the rate or tenure to find the right balance between monthly affordability and total cost.</li>
          <li>This calculator uses a fixed-rate model. If your loan has a floating rate, recalculate whenever the rate changes.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Financial disclosure</h2>
        <p className="mt-2">
          This calculator provides an educational mathematical estimate. Actual lender contracts may include processing fees, insurance premiums, fluctuating rate structures, or proprietary daily rounding methods. Always confirm the final EMI with your bank or lender.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: no loan solicitations</h2>
        <p className="mt-2">
          Unlike commercial banking portals that require your phone number or email to view loan calculations, GoEasyTools does not harvest your personal information, sell leads, or run credit checks. All calculations stay in your browser.
        </p>
      </section>
    </div>
  );
}
