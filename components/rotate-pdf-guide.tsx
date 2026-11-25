export function RotatePdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Choose 90°, 180°, or 270° clockwise rotation. The rotation is added to any existing page rotation stored in the PDF metadata. All pages are rotated uniformly. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool modifies the PDF page dictionary&apos;s <code className="rounded bg-line px-1 py-0.5 text-xs">/Rotate</code> entry using pdf-lib, which adjusts how the viewer renders each page without re-encoding the page content streams. This means text, images, and annotations remain intact at their original quality.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Scanned documents:</strong> Fix landscape-scanned pages that appear sideways in your PDF viewer after scanning from a flatbed or phone camera.</li>
          <li><strong>Mixed orientation pages:</strong> Rotate specific pages so the entire document displays in a consistent portrait or landscape orientation.</li>
          <li><strong>Print preparation:</strong> Ensure all pages are correctly oriented before sending a document to a commercial print service.</li>
          <li><strong>Legal and government forms:</strong> Correct the orientation of signed or stamped documents that were scanned at the wrong angle.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding PDF rotation angles</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>90° clockwise:</strong> Turns the page so the right edge becomes the bottom. The most common correction for landscape-to-portrait conversion.</li>
          <li><strong>180°:</strong> Flips the page upside down. Useful for documents that were scanned with the pages facing the wrong direction entirely.</li>
          <li><strong>270° clockwise (or 90° counter-clockwise):</strong> Turns the page so the left edge becomes the bottom. Needed when a landscape scan was rotated the wrong way initially.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">How rotation metadata works in PDF</h2>
        <p className="mt-2">
          PDF files store rotation as a <code className="rounded bg-line px-1 py-0.5 text-xs">/Rotate</code> value in each page&apos;s dictionary. This value tells the PDF viewer how to orient the page for display and printing. The actual content coordinates remain unchanged, so no data is rewritten or degraded. This is fundamentally different from rotating an image file, which requires pixel re-encoding.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>90° clockwise is the most common correction for landscape pages scanned in portrait mode.</li>
          <li>180° fixes upside-down scans — common when documents are placed face-down on a scanner bed.</li>
          <li>Rotation is non-destructive: it changes viewing metadata, not actual pixel data, so quality is preserved exactly.</li>
          <li>If you need to rotate only specific pages, use the PDF Pipeline tool to chain rotation with page extraction.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <p className="mt-2">
          This tool rotates all pages uniformly — it does not support rotating individual pages to different angles in a single operation. If you need per-page rotation, use the PDF Pipeline tool to extract individual pages, rotate them separately, and merge them back together in sequence. Encrypted PDFs that block page modification are refused.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The PDF file is loaded into browser memory, the rotation metadata is modified, and the result is saved — all without any data leaving your device. The page does not put the contents in the address bar or in measurement events.
        </p>
      </section>
    </div>

  );
}
