export function BoxShadowGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is the CSS box-shadow property?</h2>
        <p className="mt-2">
          The CSS <code className="rounded bg-line px-1 py-0.5 text-xs">box-shadow</code> property attaches drop shadows or inner inset shadows to element frames. It creates depth, elevation, and realistic visual hierarchy in web interfaces without adding heavy image overlays.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select a preset elevation card or customize the interactive sliders: Horizontal offset (X), Vertical offset (Y), Blur radius, and Spread radius. Toggle Inset for an inner debossed effect, adjust the shadow opacity slider, and layer up to 4 shadows together. Copy the compiled CSS declaration or Tailwind arbitrary value into your codebase.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The 6 box-shadow parameters explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Horizontal Offset (X):</strong> Positive values push the shadow to the right; negative values push the shadow to the left. Set to <code className="rounded bg-line px-1 py-0.5 text-xs">0px</code> for centered overhead ambient lighting.
          </li>
          <li>
            <strong>Vertical Offset (Y):</strong> Positive values push the shadow downwards; negative values push the shadow upwards.
          </li>
          <li>
            <strong>Blur Radius:</strong> Higher values create a softer, more diffused edge blur. A value of <code className="rounded bg-line px-1 py-0.5 text-xs">0px</code> creates a hard, crisp shadow edge. Negative blur is invalid in CSS.
          </li>
          <li>
            <strong>Spread Radius:</strong> Positive values expand the size of the shadow perimeter in all directions; negative values shrink the shadow footprint.
          </li>
          <li>
            <strong>Color &amp; Opacity:</strong> Defined with <code className="rounded bg-line px-1 py-0.5 text-xs">rgba(r, g, b, alpha)</code>. Lower opacities (between 5% and 15%) yield modern, subtle elevation effects.
          </li>
          <li>
            <strong>Inset:</strong> When present, draws the shadow inside the container frame, giving the impression of an indented, hollowed, or sunken surface.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Card elevation:</strong> Apply layered drop shadows to card components for Material Design-style elevation hierarchy (raised, hover, dialog).</li>
          <li><strong>Button depth:</strong> Add subtle shadows to buttons so they appear raised and clickable, improving perceived affordance.</li>
          <li><strong>Modal and dialog overlays:</strong> Use large, soft shadows behind modal windows to create visual separation from the page background.</li>
          <li><strong>Input focus states:</strong> Apply a colored spread shadow on focus to highlight the active form field without changing layout.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Why multi-layer shadows look more natural</h2>
        <p className="mt-2">
          In real-world physics, objects cast two types of shadows: a direct shadow near the contact base (low blur, darker) and an ambient occlusion shadow (wide blur, lighter). By layering 2 or more shadow definitions separated by commas, UI components achieve smooth, photorealistic elevation that looks dramatically cleaner than a single harsh shadow.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use low-opacity shadows (5–15%) for modern, subtle elevation — heavy black shadows look dated.</li>
          <li>Layer 2–3 shadows at different blur radii for the most natural, photorealistic depth effect.</li>
          <li>Use <code className="rounded bg-line px-1 py-0.5 text-xs">inset</code> shadows for input fields to create a recessed, text-entry affordance.</li>
          <li>Test shadows on both light and dark backgrounds — shadow visibility changes dramatically with background color.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          All slider calculations, multi-layer shadow compositing, and CSS string exports run entirely inside your local browser memory with zero network requests.
        </p>
      </section>
    </div>
  );
}
