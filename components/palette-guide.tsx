export function PaletteGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a color palette generator?</h2>
        <p className="mt-2">
          A color palette generator creates harmonious color schemes using mathematical relationships on the HSL (Hue, Saturation, Lightness) color wheel. It helps web designers and UI developers establish cohesive brand palettes, background accents, and text combinations.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose a seed color or hit <kbd className="rounded bg-line px-1.5 py-0.5 text-xs font-mono">Spacebar</kbd> to generate random combinations. Select a color harmony mode (Analogous, Monochromatic, Triadic, or Complementary). Click the lock icon on individual swatches to hold favorite colors while shuffling the rest, and copy ready-to-use CSS root variables with a single click.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Color harmony modes explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Analogous (Adjacent):</strong> Colors located next to each other on the color wheel (e.g. blue, blue-green, green). Produces serene, comfortable designs often found in nature.
          </li>
          <li>
            <strong>Monochromatic:</strong> Single hue with varying levels of saturation and lightness. Creates subtle, clean, and elegant corporate UI designs.
          </li>
          <li>
            <strong>Complementary (Opposite):</strong> Colors from directly opposite sides of the color wheel (180° apart, such as blue and orange). Provides high visual energy and distinct call-to-action button contrast.
          </li>
          <li>
            <strong>Triadic (Balanced 120°):</strong> Three colors evenly spaced around the color wheel. Highly vibrant while retaining visual balance.
          </li>
          <li>
            <strong>Split-Complementary:</strong> Uses the base color and the two colors adjacent to its complement (150° and 210°). Offers high contrast with less tension than strict complementary pairs.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Brand identity design:</strong> Generate a cohesive primary, secondary, and accent color palette for a new brand or product launch.</li>
          <li><strong>UI theme creation:</strong> Build light and dark mode color tokens for a design system using harmonious color relationships.</li>
          <li><strong>Presentation design:</strong> Find complementary slide colors that look professional without clashing.</li>
          <li><strong>Creative inspiration:</strong> Hit Spacebar repeatedly to explore random palettes when you need a creative spark for a new project.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The 60-30-10 design rule</h2>
        <p className="mt-2">
          Interior and UI designers apply the 60-30-10 rule to balance visual weight: <strong>60%</strong> dominant color (typically canvas background/neutral cards), <strong>30%</strong> secondary color (structural chrome, navigation, cards), and <strong>10%</strong> accent color (call-to-action buttons, badges, active link states).
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Lock your primary brand color and shuffle the remaining swatches to find accent and secondary colors that harmonize with your base.</li>
          <li>Test your palette against the Contrast Checker to ensure text readability across all color combinations.</li>
          <li>Export CSS variables directly into your project&apos;s root stylesheet for instant theming.</li>
          <li>Use analogous palettes for calm, professional interfaces and complementary palettes for high-energy marketing pages.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Palette generations, color pin locks, and CSS variable exports run 100% inside your browser session. Your brand themes and design assets are never logged or transmitted.
        </p>
      </section>
    </div>
  );
}
