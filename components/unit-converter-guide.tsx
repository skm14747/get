export function UnitConverterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Select a measurement category (Length, Mass/Weight, Temperature, Area, Volume, or Speed). Enter a value and select the source and destination units to calculate the converted measurement instantly. The result updates in real time as you type.
        </p>
        <p className="mt-2">
          All conversions use internationally standardized constants defined by the International System of Units (SI) and NIST. No approximations or rounded constants are used — every factor is the exact defined value.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Standard constants and scientific formulas</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Length:</strong> Based on the international metre standard. Defined constants include 1 in = 0.0254 m exact, 1 ft = 0.3048 m exact, and 1 mi = 1,609.344 m exact.</li>
          <li><strong>Mass / Weight:</strong> Based on the kilogram. Standard avoirdupois conversion specifies 1 lb = 0.45359237 kg exact.</li>
          <li><strong>Temperature:</strong> Uses standard thermodynamic formulas:
            <ul className="mt-1 list-disc pl-5">
              <li>Celsius to Fahrenheit: (°C × 9/5) + 32</li>
              <li>Fahrenheit to Celsius: (°F − 32) × 5/9</li>
              <li>Celsius to Kelvin: °C + 273.15</li>
            </ul>
          </li>
          <li><strong>Volume:</strong> 1 US gallon = 3.785411784 L exact. 1 millilitre = 0.001 L.</li>
          <li><strong>Display precision:</strong> Results display up to six decimal places while preserving complete floating-point precision internally.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Cooking and recipes:</strong> Convert between cups, millilitres, ounces, and grams when following recipes from different countries.</li>
          <li><strong>Travel:</strong> Convert miles to kilometres, Fahrenheit to Celsius, or gallons to litres when navigating between metric and imperial regions.</li>
          <li><strong>Engineering:</strong> Convert between metric and imperial units for technical drawings, material specifications, and manufacturing tolerances.</li>
          <li><strong>Fitness and health:</strong> Convert body weight between kilograms and pounds, or running distances between miles and kilometres.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Temperature is the only category that uses formulas with offsets — all other categories use simple multiplication factors.</li>
          <li>For compound conversions (e.g. cubic inches to litres), the tool handles the full conversion in one step.</li>
          <li>Results are shown to six decimal places; for most practical purposes, two or three decimal places are sufficient.</li>
          <li>The tool uses US customary units for gallons and fluid ounces. UK imperial gallons are approximately 20% larger.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Metric vs. Imperial: A quick history</h2>
        <p className="mt-2">
          The metric system (SI) is used by virtually every country in the world for science, trade, and daily life. The United States, Liberia, and Myanmar are the only countries that have not fully adopted metric for everyday use. This converter bridges the gap, letting you quickly translate between the two systems without memorizing conversion factors.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          All conversion calculations are performed locally in your browser with zero network requests or analytics payload tracking. No values you enter are logged.
        </p>
      </section>
    </div>
  );
}
