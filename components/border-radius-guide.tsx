export function BorderRadiusGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is the CSS border-radius property?</h2>
        <p className="mt-2">
          The CSS <code className="rounded bg-line px-1 py-0.5 text-xs">border-radius</code> property rounds the outer corner edges of an element. Using advanced 8-value slash syntax, it defines both horizontal and vertical radii to create organic liquid blobs, asymmetric cards, and custom visual buttons without vector image assets.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose a preset shape (Organic Blob, Liquid Pebble, Soft Teardrop, Card Smooth, or Rounded Pill) or toggle between Simple (4-corner pixel radii) and Advanced (8-point percentage radii) modes. Adjust the interactive corner sliders to observe changes on the live preview canvas, and copy the compiled CSS code or Tailwind utility class directly into your project.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The 8-point slash syntax explained</h2>
        <p className="mt-2">
          Standard border-radius uses 1 to 4 values to define circular corner quarter-circles. When a forward slash (<code className="rounded bg-line px-1 py-0.5 text-xs">/</code>) is included, the values before the slash define the <strong>horizontal radii</strong>, and the values after the slash define the <strong>vertical radii</strong>:
        </p>
        <div className="mt-2 rounded-lg border border-line bg-surface p-4 font-mono text-xs text-ink leading-relaxed">
          border-radius: [tlH] [trH] [brH] [blH] / [tlV] [trV] [brV] [blV];
        </div>
        <ul className="mt-3 list-disc space-y-2 pl-5">
          <li><strong>Elliptical Corners:</strong> Setting different horizontal and vertical radii creates elongated elliptical arcs instead of symmetric circles.</li>
          <li><strong>Liquid Blobs:</strong> Combining asymmetric percentage values (such as <code className="rounded bg-line px-1 py-0.5 text-xs">60% 40% 30% 70% / 60% 30% 70% 40%</code>) yields natural, undulating liquid shapes widely used in modern web landing pages and avatar frames.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Button styling:</strong> Apply uniform corner radii for rounded buttons, or use pill-shaped radii (9999px) for tag badges and chips.</li>
          <li><strong>Card components:</strong> Add subtle 8–12px corner rounding to card containers for modern Material or Apple-style UI design.</li>
          <li><strong>Avatar frames:</strong> Create organic blob shapes for profile pictures and feature section backgrounds.</li>
          <li><strong>Hero section accents:</strong> Design asymmetric decorative shapes for landing page backgrounds without loading SVG or image files.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Browser compatibility and prefixes</h2>
        <p className="mt-2">
          The 8-point border-radius syntax is part of the W3C CSS Backgrounds and Borders Module Level 3 and is natively supported across 100% of modern web browsers without polyfills. The output snippet includes the standard property alongside the <code className="rounded bg-line px-1 py-0.5 text-xs">-webkit-border-radius</code> fallback for legacy rendering engines.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use pixel values for consistent sizing across screen sizes, and percentage values for shapes that scale proportionally with the element.</li>
          <li>A border-radius of 50% on a square element creates a perfect circle. On a rectangle, it creates an ellipse.</li>
          <li>Combine border-radius with <code className="rounded bg-line px-1 py-0.5 text-xs">overflow: hidden</code> to clip child content to the rounded shape.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          All corner radius computations, shape morphing calculations, and code exports run entirely within your local browser memory. Zero design metrics are tracked or transmitted across the network.
        </p>
      </section>
    </div>
  );
}
