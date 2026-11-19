export function DateCalculatorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose a calculation mode: count days between two dates, calculate business days (Monday through Friday), or add/subtract days from a starting date to determine a past or future date.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Counting conventions and business day rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Midnight counting:</strong> The calendar day count measures the number of midnights elapsed between the two dates. January 1 to January 2 is counted as 1 day, avoiding off-by-one ambiguities.</li>
          <li><strong>Business days:</strong> Counts Monday through Friday dates falling within the interval. To avoid unverified regional assumptions, no specific national or bank holiday calendar is applied.</li>
          <li><strong>Adding or subtracting days:</strong> Accurately accounts for varying month lengths (28, 29, 30, or 31 days) and leap years across the entire Gregorian calendar range.</li>
          <li><strong>Date formatting:</strong> Operates on standard ISO 8601 calendar dates (YYYY-MM-DD), independent of local daylight saving clock changes.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Example</h2>
        <p className="mt-2">
          Counting days between June 1, 2026 and June 15, 2026 yields 14 calendar days and 10 Monday–Friday business days.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Calculations run in browser memory without sending dates or planning schedules to any server.
        </p>
      </section>
    </div>
  );
}
