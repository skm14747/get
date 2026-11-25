export function ColorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter a color code in HEX format (e.g. #1f2937 or #3b82f6). The tool updates the live color preview swatch and converts the color into RGB and HSL values. Click any copy button to place the formatted CSS string onto your clipboard.
        </p>
        <p className="mt-2">
          The conversion is bidirectional — you can also type RGB or HSL values and get the HEX equivalent. All calculations use standard color-space math with no rounding until the final display value.
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
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>CSS development:</strong> Convert between HEX, RGB, and HSL notations when different parts of your stylesheet use different formats.</li>
          <li><strong>Design handoff:</strong> Translate HEX values from Figma or Sketch designs into the RGB or HSL format your CSS framework expects.</li>
          <li><strong>Brand guidelines:</strong> Verify that the HEX code in your brand book matches the RGB values printed on marketing materials.</li>
          <li><strong>Accessibility:</strong> Extract HSL lightness values to quickly assess whether a color is light enough or dark enough for text contrast.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>HSL is often the most intuitive model for designers — adjusting the hue rotates through the color wheel, saturation controls vibrancy, and lightness adjusts brightness.</li>
          <li>For creating tints and shades of a brand color, start with HSL and increment or decrement the lightness value while keeping hue and saturation fixed.</li>
          <li>3-digit HEX shortcuts (#abc) expand by doubling each digit (#aabbcc), not by adding zeros.</li>
          <li>RGB and HEX are mathematically equivalent — HEX is simply the hexadecimal representation of the same three byte values.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why designers use different color models</h2>
        <p className="mt-2">
          HEX is the most compact notation for CSS and is universally recognized in design tools. RGB is the native format for screens and monitors — every pixel on your display is described as an RGB triplet. HSL is the most intuitive for human editing because adjusting hue, saturation, and lightness maps to how we naturally think about color. Each model represents the exact same color — the choice depends on the context and what property you want to adjust.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Color conversions execute entirely within your browser runtime using standard mathematical formulas. No telemetry or tracking scripts monitor your color palette choices. No color values, design tokens, or brand codes are transmitted to any server or logged in analytics.
        </p>
      </section>
    </div>

  );
}
