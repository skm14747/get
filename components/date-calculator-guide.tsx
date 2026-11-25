export function DateCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Choose a calculation mode: count days between two dates, calculate business days (Monday through Friday), or add/subtract days from a starting date to determine a past or future date.
        </p>
        <p className="mt-2">
          All arithmetic uses the Gregorian calendar and correctly handles variable month lengths (28, 29, 30, or 31 days) across any year range. No internet connection is needed after the page loads.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Counting conventions and business day rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Midnight counting:</strong> The calendar day count measures the number of midnights elapsed between the two dates. January 1 to January 2 is counted as 1 day, avoiding off-by-one ambiguities.</li>
          <li><strong>Business days:</strong> Counts Monday through Friday dates falling within the interval. To avoid unverified regional assumptions, no specific national or bank holiday calendar is applied.</li>
          <li><strong>Adding or subtracting days:</strong> Accurately accounts for varying month lengths and leap years across the entire Gregorian calendar range.</li>
          <li><strong>Date formatting:</strong> Operates on standard ISO 8601 calendar dates (YYYY-MM-DD), independent of local daylight saving clock changes.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Project deadlines:</strong> Calculate how many working days remain between today and a delivery deadline to plan sprints or milestones.</li>
          <li><strong>Legal and contractual periods:</strong> Determine the exact number of days in a notice period, warranty window, or statute of limitations.</li>
          <li><strong>Travel planning:</strong> Count the days between departure and return dates to estimate hotel nights and daily budgets.</li>
          <li><strong>Payroll cycles:</strong> Find the number of business days in a pay period to verify timesheet hours.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Worked example</h2>
        <p className="mt-2">
          Counting days between June 1, 2026 and June 15, 2026 yields 14 calendar days and 10 Monday–Friday business days. Adding 90 days to March 1, 2026 lands on May 30, 2026.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>For contractual deadlines that exclude public holidays, calculate business days here and then manually subtract known holidays for your jurisdiction.</li>
          <li>Use the add/subtract mode to work backwards from a deadline — enter a negative number of days to find the start date.</li>
          <li>Results are purely date-based and unaffected by timezones or daylight saving transitions.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why business day calculations exclude holidays</h2>
        <p className="mt-2">
          Public holidays vary by country, state, and even municipality. A US federal holiday may not apply in the UK, and a state holiday in California may not apply in Texas. Rather than applying an incomplete or incorrect holiday calendar that could cause errors, this tool counts only weekdays (Monday–Friday) and lets you manually subtract known holidays for your specific jurisdiction. This approach avoids false precision that could lead to missed deadlines.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Calculations run entirely in browser memory without sending dates or planning schedules to any server. No date inputs, deadline calculations, or project timelines are stored, logged, or transmitted.
        </p>
      </section>
    </div>

  );
}
