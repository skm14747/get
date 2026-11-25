export function OrganizePdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter page numbers in any order to rearrange them. Use ranges like <code className="rounded bg-line px-1 py-0.5 text-xs">3,1,2</code> to reorder or <code className="rounded bg-line px-1 py-0.5 text-xs">1-3,5</code> to keep only certain pages. Leave blank to keep all pages in order. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool copies the specified pages in your desired sequence into a fresh PDF document using pdf-lib. Annotations, form fields, and embedded media on the selected pages are preserved.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Reordering chapters:</strong> Rearrange sections of a report or thesis that were scanned or combined out of order.</li>
          <li><strong>Moving cover pages:</strong> Place a title page or table of contents at the front of a document that was assembled from multiple sources.</li>
          <li><strong>Selective extraction:</strong> Keep only the pages you need (e.g. pages 1, 3, and 7) and discard the rest in a single operation.</li>
          <li><strong>Duplicating pages:</strong> Enter a page number multiple times (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">1,1,2,3</code>) to duplicate specific pages for printing purposes.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page specification syntax</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Individual pages:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1,3,5</code> — keeps pages 1, 3, and 5 in that order.</li>
          <li><strong>Ranges:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1-5</code> — keeps pages 1 through 5.</li>
          <li><strong>Mixed:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1-3,7,5-6</code> — keeps pages 1, 2, 3, 7, 5, 6 in that exact order.</li>
          <li><strong>Reversed order:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">5,4,3,2,1</code> — reverses a 5-page document.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Organize vs. other page tools</h2>
        <p className="mt-2">
          The Organize tool is the most flexible page manipulation tool — it can reorder pages, extract a subset, duplicate pages, and reverse order all using the same page specification syntax. Use Delete when you simply want to remove a few pages. Use Extract when you want to keep specific pages without worrying about order. Use Organize when order matters or when you need to combine multiple operations like reordering and filtering in one step.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use this tool to reverse page order for documents that need to be printed and stacked in the correct sequence.</li>
          <li>Combine with the Delete PDF Pages tool if you want to remove specific pages rather than specifying which ones to keep.</li>
          <li>Page numbers are 1-based (the first page is page 1, not page 0).</li>
          <li>Invalid page numbers (e.g. page 10 in a 5-page document) are flagged as errors.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">What gets preserved during reorganization</h2>
        <p className="mt-2">
          All content on the selected pages is preserved: text, images, annotations, and form fields. Document-level bookmarks that reference reorganized pages will continue to point to the correct content. However, if you exclude pages that bookmarks point to, those bookmarks may become broken in the output.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The PDF file is loaded into browser memory, pages are copied in your specified order, and the result is downloaded — all without any data leaving your device.
        </p>
      </section>
    </div>
  );
}
