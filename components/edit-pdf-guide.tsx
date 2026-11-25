export function EditPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Add text annotations to any page at exact coordinates. Set the page number (1-based), X and Y position in PDF points (measured from the bottom-left corner), font size, and colour. You can add multiple annotations to a single document. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool draws text directly onto the page&apos;s content stream using pdf-lib with the Helvetica standard font. Each annotation is positioned using the PDF coordinate system where the origin (0, 0) is at the bottom-left corner of the page.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Adding notes and comments:</strong> Place correction notes, approval stamps, or reference annotations directly on PDF pages.</li>
          <li><strong>Filling non-interactive forms:</strong> Add text to static PDF forms that don&apos;t have interactive form fields — position text at exact field locations.</li>
          <li><strong>Date and reference stamps:</strong> Add date received, file reference numbers, or case IDs to incoming documents.</li>
          <li><strong>Header and footer text:</strong> Place custom header or footer text (such as &ldquo;Page X of Y&rdquo; or a document title) on every page.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding PDF coordinates</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Origin point:</strong> PDF coordinates start at the bottom-left corner of the page (0, 0), not the top-left as in most screen coordinate systems.</li>
          <li><strong>Units:</strong> Coordinates are measured in PDF points, where 72 points = 1 inch. A standard A4 page is 595 × 842 points.</li>
          <li><strong>Y-axis direction:</strong> Y values increase upward. To place text near the top of an A4 page, use a Y value around 800.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Quick reference: Common A4 page coordinates</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Top-left corner:</strong> X = 50, Y = 790 (with standard margins).</li>
          <li><strong>Top-center:</strong> X = 297, Y = 790.</li>
          <li><strong>Bottom-center:</strong> X = 297, Y = 30.</li>
          <li><strong>Center of page:</strong> X = 297, Y = 421.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Start with approximate coordinates, preview the result, and fine-tune the position. Each point is roughly 0.35 mm.</li>
          <li>Use the PDF-to-JPG tool first to screenshot a page, measure the desired position, and convert pixel coordinates to points.</li>
          <li>Add multiple annotations before downloading — you can stack text at different positions and pages in a single session.</li>
          <li>Text is drawn in the Helvetica font. For other fonts, consider using the PDF Forms tool or a full desktop PDF editor.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <p className="mt-2">
          This tool adds new text on top of existing page content. It cannot modify, delete, or reflow existing text that is already in the PDF. For editing existing text inline, a full desktop PDF editor like Adobe Acrobat is required. The embedded font is Helvetica; custom fonts are not supported.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. No file content or annotation text leaves your device. The PDF is modified in browser memory and downloaded locally.
        </p>
      </section>
    </div>
  );
}
