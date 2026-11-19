export function UnitConverterGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select a measurement category (Length, Mass/Weight, Temperature, Area, Volume, or Speed). Enter a value and select the source and destination units to calculate the converted measurement instantly.
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
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          All conversion calculations are performed locally in your browser with zero network requests or analytics payload tracking.
        </p>
      </section>
    </div>
  );
}
