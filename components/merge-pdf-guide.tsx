import Link from "next/link";
import { MAX_PDF_BYTES, MAX_PDF_FILES } from "@/lib/files";

export function MergePdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select between 2 and {MAX_PDF_FILES} PDF files. Reorder the documents into your preferred reading sequence using the up/down controls, then click Merge PDFs to combine all pages into a single downloadable PDF. If you need to remove pages before combining, use our{" "}
          <Link href="/delete-pdf-pages" className="text-action underline">
            Delete PDF Pages
          </Link>{" "}
          or{" "}
          <Link href="/extract-pdf-pages" className="text-action underline">
            Extract PDF Pages
          </Link>{" "}
          tools first.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">File limitations and assembly rules</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>File constraints:</strong> Supports 2 to {MAX_PDF_FILES} PDF documents. Each individual file must be {Math.round(MAX_PDF_BYTES / (1024 * 1024))} MB or smaller to prevent browser tab memory exhaustion.
          </li>
          <li>
            <strong>Page sequence:</strong> Pages from each document are appended in the exact top-to-bottom order displayed in the file list.
          </li>
          <li>
            <strong>Encrypted documents:</strong> Password-protected or encrypted PDFs cannot be read without authentication credentials. Use our{" "}
            <Link href="/unlock-pdf" className="text-action underline">
              Unlock PDF
            </Link>{" "}
            tool to strip owner password restrictions before merging.
          </li>
          <li>
            <strong>Page content vs. interactive forms:</strong> Embedded vector graphics, page text, typography fonts, and raster images on each page are preserved intact. However, document-level interactive AcroForms (fillable form fields) and bookmark trees from multiple files are not automatically combined into a single interactive form structure. To preserve form values, flatten the fields or fill them with our{" "}
            <Link href="/pdf-forms" className="text-action underline">
              PDF Forms
            </Link>{" "}
            utility before merging.
          </li>
          <li>
            <strong>Page orientation:</strong> If any documents contain sideways or inverted pages, you can orient them uniformly with our{" "}
            <Link href="/rotate-pdf" className="text-action underline">
              Rotate PDF
            </Link>{" "}
            utility prior to combining.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy: zero server uploads</h2>
        <p className="mt-2">
          Unlike traditional PDF portals that upload confidential financial statements, medical files, or contracts to remote cloud servers, this tool merges PDF bytes strictly in-browser using pdf-lib. Your files never touch a GoEasyTools server.
        </p>
      </section>
    </div>
  );
}
