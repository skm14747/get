import { MAX_PDF_BYTES } from "@/lib/files";

export function SplitPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload a PDF file up to {Math.round(MAX_PDF_BYTES / (1024 * 1024))} MB. Enter the specific page numbers or page ranges you wish to extract (e.g. 1-3, 5), and download a new document containing only those selected pages.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page range syntax and rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Range syntax:</strong> Separate individual pages and ranges using commas, such as <code className="rounded bg-line px-1 py-0.5 text-xs">1-4, 7, 9-12</code>.</li>
          <li><strong>Inclusive ranges:</strong> A range like <code className="rounded bg-line px-1 py-0.5 text-xs">1-3</code> includes pages 1, 2, and 3. Page indices outside the document total page count are rejected.</li>
          <li><strong>Output format:</strong> Selected pages are compiled into a single consolidated PDF in the order specified.</li>
          <li><strong>Protected documents:</strong> Encrypted or password-locked PDFs cannot be parsed locally and must be unlocked with credentials before page extraction.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee</h2>
        <p className="mt-2">
          Document parsing and page extraction run entirely client-side using WebAssembly and JavaScript. No document contents or private metadata are uploaded to any server.
        </p>
      </section>
    </div>
  );
}
