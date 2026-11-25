export function ContrastGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is color contrast ratio?</h2>
        <p className="mt-2">
          Color contrast ratio measures the difference in perceived luminance (brightness) between foreground text and its background. Expressed from 1:1 (zero contrast, e.g. white on white) to 21:1 (maximum contrast, e.g. black on white), it dictates whether digital content is readable for users with visual impairments.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Pick or type your foreground text color and background color in HEX format. The tool computes the relative luminance, calculates the exact contrast ratio, checks compliance against Web Content Accessibility Guidelines (WCAG 2.1), and renders an interactive live preview showing both body text and headlines.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">WCAG 2.1 compliance thresholds</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>Level AA (Minimum Contrast):</strong> Requires a contrast ratio of at least <strong>4.5:1</strong> for normal text (under 18pt or under 14pt bold) and <strong>3.0:1</strong> for large text (at least 18pt / 24px or 14pt / 18.66px bold). This is the mandatory legal standard under the Americans with Disabilities Act (ADA), Section 508, and the European Accessibility Act (EAA).
          </li>
          <li>
            <strong>Level AAA (Enhanced Contrast):</strong> Requires a contrast ratio of at least <strong>7.0:1</strong> for normal text and <strong>4.5:1</strong> for large text. This provides superior legibility for users with color blindness or low vision.
          </li>
          <li>
            <strong>UI Components and Graphical Objects:</strong> Requires at least <strong>3.0:1</strong> against adjacent colors for visual boundaries of active user interface controls (buttons, form inputs) and important icons.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Web accessibility audits:</strong> Verify that every text color on your site meets WCAG AA or AAA thresholds before launch.</li>
          <li><strong>Design system validation:</strong> Check all foreground/background combinations in your design token palette for accessibility compliance.</li>
          <li><strong>Legal compliance:</strong> Ensure your website meets ADA, Section 508, or EAA accessibility requirements to avoid legal liability.</li>
          <li><strong>Dark mode testing:</strong> Verify that your dark theme color pairs maintain sufficient contrast for readability.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">The mathematical formula for relative luminance</h2>
        <p className="mt-2">
          Relative luminance is calculated per the sRGB color space definition:
        </p>
        <div className="mt-2 rounded-lg border border-line bg-surface p-4 font-mono text-xs text-ink leading-relaxed">
          L = 0.2126 × R + 0.7152 × G + 0.0722 × B
        </div>
        <p className="mt-2 text-xs text-muted">
          Where channel values C are converted to linear values: C / 12.92 if C &le; 0.04045, else ((C + 0.055) / 1.055)^2.4. Contrast ratio is (L1 + 0.05) / (L2 + 0.05), where L1 is the lighter luminance and L2 is the darker luminance.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Aim for WCAG AAA (7:1) for body text to serve the widest possible audience, including users with low vision.</li>
          <li>Grey text on white backgrounds often fails AA — check ratios before using light grey for secondary text.</li>
          <li>Large text (18pt+) has relaxed thresholds, but heading contrast alone does not guarantee an accessible page.</li>
          <li>Test contrast with both your light and dark themes — a color pair that passes in light mode may fail in dark mode.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Brand color codes, palette selections, and accessibility checks execute entirely in your local browser memory. No color values are tracked or sent to remote servers.
        </p>
      </section>
    </div>
  );
}
