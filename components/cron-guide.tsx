export function CronGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a cron expression?</h2>
        <p className="mt-2">
          A cron expression is a string of five space-separated fields representing a time schedule for automated background jobs. Used by Unix/Linux crontab, GitHub Actions, AWS CloudWatch, Kubernetes CronJobs, and serverless schedulers, it dictates when automated scripts execute.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Use the Visual Builder to select recurring intervals (minutes, hours, weekdays), or toggle to Direct Input to type any 5-field cron syntax. The tool translates your schedule into natural English and projects the next 5 upcoming run dates and times relative to your local system clock.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The 5 standard cron fields</h2>
        <div className="mt-3 overflow-x-auto rounded-lg border border-line">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-line text-muted">
              <tr>
                <th className="p-2.5 font-medium">Field Position</th>
                <th className="p-2.5 font-medium">Field Name</th>
                <th className="p-2.5 font-medium">Allowed Values</th>
                <th className="p-2.5 font-medium">Special Characters</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line text-ink font-mono">
              <tr>
                <td className="p-2.5">1</td>
                <td className="p-2.5 font-sans">Minute</td>
                <td className="p-2.5">0 – 59</td>
                <td className="p-2.5">* , - /</td>
              </tr>
              <tr>
                <td className="p-2.5">2</td>
                <td className="p-2.5 font-sans">Hour</td>
                <td className="p-2.5">0 – 23 (24h)</td>
                <td className="p-2.5">* , - /</td>
              </tr>
              <tr>
                <td className="p-2.5">3</td>
                <td className="p-2.5 font-sans">Day of Month</td>
                <td className="p-2.5">1 – 31</td>
                <td className="p-2.5">* , - /</td>
              </tr>
              <tr>
                <td className="p-2.5">4</td>
                <td className="p-2.5 font-sans">Month</td>
                <td className="p-2.5">1 – 12</td>
                <td className="p-2.5">* , - /</td>
              </tr>
              <tr>
                <td className="p-2.5">5</td>
                <td className="p-2.5 font-sans">Day of Week</td>
                <td className="p-2.5">0 – 6 (0 = Sun)</td>
                <td className="p-2.5">* , - /</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Special characters explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Asterisk (<code className="rounded bg-line px-1 py-0.5 text-xs">*</code>):</strong> Wildcard matching every possible value within that field (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">*</code> in the minute field means every minute).
          </li>
          <li>
            <strong>Slash (<code className="rounded bg-line px-1 py-0.5 text-xs">/</code>):</strong> Specifies step intervals (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">*/15</code> in minutes means every 15 minutes).
          </li>
          <li>
            <strong>Comma (<code className="rounded bg-line px-1 py-0.5 text-xs">,</code>):</strong> Separates individual values in a list (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">1,15</code> in day-of-month means on the 1st and 15th).
          </li>
          <li>
            <strong>Hyphen (<code className="rounded bg-line px-1 py-0.5 text-xs">-</code>):</strong> Defines an inclusive numerical range (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">1-5</code> in day-of-week means Monday through Friday).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Your cron expressions, script frequencies, and schedule parameters are calculated entirely in client-side memory. No scheduling data or infrastructure details are uploaded or logged.
        </p>
      </section>
    </div>
  );
}
