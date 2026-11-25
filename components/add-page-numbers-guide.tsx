export function AddPageNumbersGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Select a position (top or bottom, left, center, or right), choose a start number and font size, then upload a PDF. Sequential page numbers are stamped on every page using Helvetica. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool draws text directly onto each page&apos;s content stream using pdf-lib. The page number is positioned relative to the page&apos;s MediaBox dimensions, ensuring consistent placement regardless of page size.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Thesis and dissertation submissions:</strong> Add sequential page numbers as required by university formatting guidelines.</li>
          <li><strong>Legal documents:</strong> Number pages for court filings, contracts, and exhibit binders where page references are critical.</li>
          <li><strong>Meeting handouts:</strong> Add page numbers to multi-page agendas or presentation printouts so attendees can follow along.</li>
          <li><strong>Book manuscripts:</strong> Number pages of a draft manuscript before sending to editors or beta readers.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Positioning options</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Bottom center:</strong> The most common placement for formal documents, books, and reports.</li>
          <li><strong>Bottom right:</strong> Common in business documents and slide printouts.</li>
          <li><strong>Top center / top right:</strong> Useful for documents where the bottom margin is occupied by footnotes or existing content.</li>
          <li><strong>Custom start number:</strong> Begin numbering from any integer — useful when the first few pages (title page, table of contents) should be unnumbered.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why page numbers matter</h2>
        <p className="mt-2">
          Page numbers serve as essential navigation aids in printed and digital documents. They enable precise cross-referencing in tables of contents, indexes, and footnotes. Many institutions require numbered pages for official submissions, and courts require Bates numbering for legal discovery. Even for informal documents, page numbers help readers identify where they are and reference specific content in discussions.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use a font size of 10–12 points for standard documents. Smaller sizes (8pt) work well for dense reference materials.</li>
          <li>If your document has a cover page that shouldn&apos;t be numbered, extract pages 2 onward, add numbers starting from 1, then merge the cover page back.</li>
          <li>Page numbers are drawn on top of existing content — ensure your chosen position doesn&apos;t overlap with existing headers, footers, or margins.</li>
          <li>For documents with mixed page sizes, the number position adapts to each page&apos;s dimensions.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Font and styling</h2>
        <p className="mt-2">
          Page numbers are rendered in Helvetica, a standard PDF base font available in all PDF viewers without embedding. The numbers are drawn in black ink at your specified font size. For more complex numbering formats (Roman numerals, custom fonts, or alternating positions), use a full desktop PDF editor.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The PDF is loaded into browser memory, page numbers are stamped, and the result is downloaded — all without any data leaving your device.
        </p>
      </section>
    </div>
  );
}
