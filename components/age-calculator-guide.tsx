export function AgeCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Select or enter a Date of Birth and a reference date (defaults to today). The calculator determines chronological age in exact years, months, and days, along with a countdown to the next birthday.
        </p>
        <p className="mt-2">
          The computation walks through completed calendar years first, then counts remaining full months, and finally the leftover days. This matches how age is conventionally expressed in everyday language and on official documents.
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
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Legal age verification:</strong> Determine whether someone meets the minimum age requirement for contracts, driving licenses, or retirement benefits.</li>
          <li><strong>School enrollment:</strong> Check if a child meets the age cutoff date for kindergarten or first-grade admission in your district.</li>
          <li><strong>Insurance and medical forms:</strong> Calculate exact age in years, months, and days as required by health and life insurance applications.</li>
          <li><strong>Birthday planning:</strong> See exactly how many days remain until the next birthday to plan celebrations or countdown events.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked example</h2>
        <p className="mt-2">
          For a birth date of January 15, 2000 evaluated on March 20, 2026, the calculated age is 26 years, 2 months, and 5 days, with 301 days remaining until the 27th birthday.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Change the reference date to a future date to calculate what someone&apos;s age will be on that day.</li>
          <li>For historical research, set both the birth date and reference date in the past to find the age of a historical figure at a specific event.</li>
          <li>The birthday countdown counts calendar days, not business days.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How the birthday countdown works</h2>
        <p className="mt-2">
          The countdown calculates the number of calendar days between the reference date and the next occurrence of the birth month and day. If the birthday has already passed in the current year, it counts forward to the same date next year. For leap day births (February 29), the countdown targets February 28 in non-leap years to maintain annual consistency.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Dates are calculated entirely in your browser memory. Birth dates, personal records, and calculated ages are never transmitted across the network or stored in analytics. No personal information is logged or cached.
        </p>
      </section>
    </div>

  );
}
