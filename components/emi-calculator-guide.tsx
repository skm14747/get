import { EMI_MAX_MONTHS } from "@/lib/emi";

export function EmiCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Enter your loan principal amount, annual interest rate percentage, and loan tenure in months (up to {EMI_MAX_MONTHS} months / 30 years). The calculator displays your monthly payment (EMI), total interest payable, overall payment, and a full month-by-month repayment schedule.
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
        <h2 className="text-xl font-semibold">Financial disclosure</h2>
        <p className="mt-2">
          This calculator provides an educational mathematical estimate. Actual lender contracts may include processing fees, insurance premiums, fluctuating rate structures, or proprietary daily rounding methods.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: no loan solicitations</h2>
        <p className="mt-2">
          Unlike commercial banking portals that require your phone number or email to view loan calculations, GoEasyTools does not harvest your personal information, sell leads, or run credit checks.
        </p>
      </section>
    </div>
  );
}
