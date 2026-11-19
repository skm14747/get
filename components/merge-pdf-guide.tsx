import { MAX_PDF_BYTES, MAX_PDF_FILES } from "@/lib/files";

export function MergePdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select between 2 and {MAX_PDF_FILES} PDF files. Reorder the documents into your preferred reading sequence using the up/down controls, then click Merge PDFs to combine all pages into a single downloadable PDF.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">File limitations and assembly rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>File constraints:</strong> Supports 2 to {MAX_PDF_FILES} PDF documents. Each individual file must be {Math.round(MAX_PDF_BYTES / (1024 * 1024))} MB or smaller to prevent browser tab memory exhaustion.</li>
          <li><strong>Page sequence:</strong> Pages from each document are appended in the exact top-to-bottom order displayed in the file list.</li>
          <li><strong>Encrypted documents:</strong> Password-protected or encrypted PDFs are safely refused because client-side assembly requires reading structural page trees without cracking credentials.</li>
          <li><strong>Structure preservation:</strong> Embedded vector paths, fonts, forms, and raster images are carried directly into the output document using pdf-lib.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: zero server uploads</h2>
        <p className="mt-2">
          Unlike traditional PDF portals that upload confidential financial statements, medical files, or contracts to remote cloud servers, this tool merges PDF bytes strictly in-browser. Your files never touch a GoEasyTools server.
        </p>
      </section>
    </div>
  );
}
