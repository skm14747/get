export function DeletePdfPagesGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter the pages you want to remove (e.g. 2, 4-6). The tool keeps all other pages and saves them into a clean PDF. At least one page must remain after deletion. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool creates a new PDF document and copies only the pages that are not in your deletion list. This means the resulting file contains no traces of the removed pages — they are not hidden, they are genuinely excluded from the output.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Removing blank pages:</strong> Delete empty pages that scanners often insert between document sections.</li>
          <li><strong>Redacting pages:</strong> Remove entire pages containing sensitive information before sharing a document externally.</li>
          <li><strong>Trimming cover sheets:</strong> Remove fax cover pages, table of contents pages, or appendices that aren&apos;t needed for the recipient.</li>
          <li><strong>Cleaning scanned batches:</strong> Remove accidentally scanned pages (wrong document, duplicate scans) from a batch scan PDF.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page specification syntax</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Individual pages:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">2, 5, 8</code> — removes pages 2, 5, and 8.</li>
          <li><strong>Ranges:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">4-6</code> — removes pages 4, 5, and 6.</li>
          <li><strong>Mixed:</strong> <code className="rounded bg-line px-1 py-0.5 text-xs">1, 3-5, 9</code> — removes pages 1, 3, 4, 5, and 9.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Delete vs. Extract</h2>
        <p className="mt-2">
          Deleting pages specifies which pages to remove — everything else is kept. Extracting pages specifies which pages to keep — everything else is removed. Choose whichever approach requires listing fewer page numbers. If you need to remove 2 pages from a 50-page document, delete is easier. If you need to keep 2 pages from a 50-page document, extract is easier.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Preview the PDF first to identify the correct page numbers — page numbering starts at 1.</li>
          <li>If you need to keep specific pages rather than delete specific ones, use the Organize PDF or Extract PDF Pages tool instead.</li>
          <li>You cannot delete all pages — at least one page must remain in the output document.</li>
          <li>Deletion is permanent in the output file. Keep a copy of the original PDF if you might need the removed pages later.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">What happens to bookmarks and links</h2>
        <p className="mt-2">
          When pages are deleted, any bookmarks or cross-references that pointed to the removed pages may become non-functional in the output file. Internal links pointing to remaining pages continue to work correctly. If your document relies heavily on internal navigation (table of contents, cross-references), verify the bookmarks after deletion.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The file is never uploaded to any server. The PDF is loaded into browser memory, specified pages are excluded, and the result is downloaded locally.
        </p>
      </section>
    </div>

  );
}
