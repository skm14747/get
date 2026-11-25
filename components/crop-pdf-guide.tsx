export function CropPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Set top, right, bottom, and left margins in points (72 points = 1 inch). The CropBox is adjusted on every page, which controls the visible area when the PDF is displayed or printed. Content outside the crop area is hidden but not permanently removed from the file. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool modifies the PDF page dictionary&apos;s CropBox coordinates using pdf-lib. Because the underlying content streams are not altered, the operation is lossless and reversible by resetting the CropBox.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Removing white margins:</strong> Trim excessive white space around scanned documents or academic papers for better screen readability on tablets and e-readers.</li>
          <li><strong>Print area adjustment:</strong> Set precise crop margins so the printed output excludes headers, footers, or printer&apos;s marks that shouldn&apos;t appear on the final copy.</li>
          <li><strong>Presentation slides:</strong> Crop away slide borders or speaker notes from exported presentation PDFs to create cleaner handout documents.</li>
          <li><strong>Document standardization:</strong> Apply uniform margins across all pages of a multi-source merged document for a consistent layout.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding PDF page boxes</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>MediaBox:</strong> Defines the full physical page dimensions — the maximum extent of the page content.</li>
          <li><strong>CropBox:</strong> Defines the visible region. Content outside this box is hidden in viewers. This is what GoEasyTools modifies.</li>
          <li><strong>BleedBox and TrimBox:</strong> Used in professional printing to define bleed and trim areas. These are not affected by this tool.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common margin values</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>36 points (0.5 inch):</strong> Light trim suitable for removing scanner borders while preserving document margins.</li>
          <li><strong>72 points (1 inch):</strong> Standard crop for removing generous white borders from academic papers or legal documents.</li>
          <li><strong>18 points (0.25 inch):</strong> Minimal trim for cleaning up slight alignment issues from scanning.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use equal values for all four margins to remove uniform white borders. Typical scanned document margins are 36–72 points (0.5–1 inch).</li>
          <li>Cropping is non-destructive — hidden content can be restored by clearing the CropBox in a PDF editor.</li>
          <li>Preview the cropped result before distributing. Over-cropping can cut into text or images near the page edges.</li>
          <li>For sensitive documents where hidden content must be truly removed, flatten or re-export the PDF after cropping.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Cropping for e-reader optimization</h2>
        <p className="mt-2">
          Academic papers and books often have generous margins designed for printing. Cropping these margins makes the content area fill more of the screen on e-readers (Kindle, Kobo) and tablets, dramatically improving readability at any zoom level. Experiment with 50–72 point margins on each side for typical journal articles.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The PDF file is loaded into browser memory, the CropBox metadata is modified, and the result is downloaded — all without any data leaving your device.
        </p>
      </section>
    </div>
  );
}
