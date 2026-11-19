export function ColorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Enter a color code in HEX format (e.g. #1f2937 or #3b82f6). The tool updates the live color preview swatch and converts the color into RGB and HSL values. Click any copy button to place the formatted CSS string onto your clipboard.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Color models and conversion formulas</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>HEX (Hexadecimal):</strong> Represents RGB channels as hexadecimal byte values from 00 to FF (0 to 255). Supports 3-digit shorthand (e.g. #fff expands to #ffffff) and standard 6-digit notation.</li>
          <li><strong>RGB (Red, Green, Blue):</strong> Additive color model specifying channel intensities from 0 to 255. Formatted for CSS as <code className="rounded bg-line px-1 py-0.5 text-xs">rgb(r, g, b)</code>.</li>
          <li><strong>HSL (Hue, Saturation, Lightness):</strong> Cylindrical coordinate representation:
            <ul className="mt-1 list-disc pl-5">
              <li><strong>Hue (0°–360°):</strong> The color family around the color wheel (0° red, 120° green, 240° blue).</li>
              <li><strong>Saturation (0%–100%):</strong> Purity or intensity of the color (0% is grayscale, 100% is full color).</li>
              <li><strong>Lightness (0%–100%):</strong> Luminance level (0% is black, 50% is normal color, 100% is white).</li>
            </ul>
          </li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Color conversions execute entirely within your browser runtime using standard mathematical formulas. No telemetry or tracking scripts monitor your color palette choices.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why this page exists</h2>
        <p className="mt-2">
          Frontend engineers and UI designers convert colors between stylesheet notations daily. This tool provides an instant, zero-latency conversion utility with copy-ready CSS properties.
        </p>
      </section>
    </div>
  );
}
