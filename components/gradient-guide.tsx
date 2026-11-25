export function GradientGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is a CSS gradient?</h2>
        <p className="mt-2">
          A CSS gradient is a synthetic CSS image rendered by the browser showing smooth transitions between two or more colors. Rather than loading heavy raster image files (JPEG, PNG), CSS gradients consume zero network bandwidth and scale infinitely without pixelation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Choose a preset combination or click Randomize to spark inspiration. Switch between Linear and Radial modes, adjust the angle dial (0° to 360°), and fine-tune your color stops using the interactive position sliders. Copy the compiled CSS declaration or Tailwind arbitrary value directly into your stylesheet.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">CSS gradient syntax explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Linear Gradients:</strong> Defined with <code className="rounded bg-line px-1 py-0.5 text-xs">linear-gradient(angle, stop1, stop2, ...)</code>. An angle of <code className="rounded bg-line px-1 py-0.5 text-xs">0deg</code> flows from bottom to top, <code className="rounded bg-line px-1 py-0.5 text-xs">90deg</code> flows from left to right, and <code className="rounded bg-line px-1 py-0.5 text-xs">180deg</code> flows from top to bottom.
          </li>
          <li>
            <strong>Radial Gradients:</strong> Defined with <code className="rounded bg-line px-1 py-0.5 text-xs">radial-gradient(shape, stop1, stop2, ...)</code>. The transition originates from a central focal point and radiates outwards in a circular or elliptical pattern.
          </li>
          <li>
            <strong>Color Stops:</strong> Each stop specifies a color and a percentage position along the gradient axis (from 0% to 100%). Multiple stops allow complex sunset, neon, and multi-tier lighting effects.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Hero section backgrounds:</strong> Replace heavy background images with lightweight CSS gradients that load instantly and look crisp on all screen sizes.</li>
          <li><strong>Button hover effects:</strong> Apply gradient backgrounds to call-to-action buttons for eye-catching visual depth.</li>
          <li><strong>Card overlays:</strong> Use semi-transparent gradients over images to ensure text readability on photo-heavy card components.</li>
          <li><strong>Brand theming:</strong> Create consistent gradient palettes that match your brand identity across headers, footers, and accent elements.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Fallback rules for older browsers</h2>
        <p className="mt-2">
          The generated CSS snippet includes a solid background fallback declaration (<code className="rounded bg-line px-1 py-0.5 text-xs">background: #firstColor;</code>) followed by the gradient declaration. In the unlikely event an ancient client cannot render CSS gradients, the container gracefully displays the primary theme color.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Avoid harsh color transitions — add a mid-tone color stop between high-contrast colors for a smoother blend.</li>
          <li>Use radial gradients for spotlight or vignette effects, and linear gradients for directional color flows.</li>
          <li>Keep gradients subtle for text-heavy sections to maintain readability — high-contrast gradients work better as decorative accents.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Color palettes, angle configurations, and CSS snippets are rendered entirely in your client-side browser runtime. Zero design assets are sent across network connections.
        </p>
      </section>
    </div>
  );
}
