export function ExtractPdfPagesGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter the pages or ranges to extract (e.g. 1-3, 5). Only those pages are copied into a new PDF document. The original file is not modified. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool uses pdf-lib to create a fresh PDF and copy only the specified pages from the source document. Annotations, embedded images, and form fields on the extracted pages are preserved in the output.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Sharing specific sections:</strong> Extract only the relevant chapter or pages from a large report to share with colleagues without sending the entire document.</li>
          <li><strong>Isolating forms:</strong> Pull out a specific form page from a multi-page document package for individual printing or filling.</li>
          <li><strong>Creating handouts:</strong> Extract selected slides from a PDF presentation to create a focused handout for a meeting.</li>
          <li><strong>Legal discovery:</strong> Extract specific exhibit pages from a large document set for inclusion in court filings.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page specification syntax</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Individual pages:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1, 3, 7</code> — extracts pages 1, 3, and 7.</li>
          <li><strong>Ranges:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1-5</code> — extracts pages 1 through 5.</li>
          <li><strong>Mixed:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1-3, 5, 8-10</code> — extracts pages 1, 2, 3, 5, 8, 9, and 10.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Extract vs. Delete vs. Split</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Extract:</strong> Specify which pages to keep — creates one PDF with only those pages.</li>
          <li><strong>Delete:</strong> Specify which pages to remove — creates one PDF with everything else.</li>
          <li><strong>Split:</strong> Divide the PDF into multiple separate files at specified breakpoints.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">What gets preserved during extraction</h2>
        <p className="mt-2">
          When pages are extracted, all visible content on those pages is preserved: text, images, vector graphics, annotations, form fields, and embedded multimedia. Document-level metadata like bookmarks, cross-page links, and the table of contents may reference pages that are no longer present in the extracted document, so those links may become non-functional.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use this tool instead of Delete when it&apos;s easier to specify the pages you want rather than the pages you don&apos;t want.</li>
          <li>Pages in the output appear in the order you specify — use <code className="rounded bg-line px-1 py-0.5 text-xs">5, 3, 1</code> to reverse the order of extracted pages.</li>
          <li>The original file is never modified — extraction creates a completely new document.</li>
          <li>For extracting a single page, just enter its page number (e.g. <code className="rounded bg-line px-1 py-0.5 text-xs">3</code>).</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The file is never uploaded to any server. The PDF is loaded into browser memory, specified pages are copied, and the result is downloaded locally.
        </p>
      </section>
    </div>
  );
}
