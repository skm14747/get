export function AgeCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select or enter a Date of Birth and a reference date (defaults to today). The calculator determines chronological age in exact years, months, and days, along with a countdown to the next birthday.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Calculation rules and leap years</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Chronological calculation:</strong> Age is computed by counting completed calendar years, then remaining full calendar months, and finally remaining days.</li>
          <li><strong>Leap year anniversaries:</strong> For individuals born on February 29 (leap day), the anniversary in a common non-leap year is recognized as February 28.</li>
          <li><strong>Calendar vs. clock time:</strong> Calculations rely strictly on calendar dates (YYYY-MM-DD), unaffected by daylight saving time shifts or clock hours.</li>
          <li><strong>Validation:</strong> The reference date must be on or after the birth date. Future birth dates are flagged as invalid.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="mt-2">
          For a birth date of January 15, 2000 evaluated on March 20, 2026, the calculated age is 26 years, 2 months, and 5 days, with 301 days remaining until the 27th birthday.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Dates are calculated in your browser memory. Birth dates and personal records are never transmitted across the network or stored in analytics.
        </p>
      </section>
    </div>
  );
}
