export function CompressPdfGuide() {
  return (

    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          The PDF is loaded, all pages are copied into a fresh document, and saved with object-stream compression enabled. This removes unused objects, dead cross-references, and redundant metadata accumulated from repeated edits and re-saves. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The reduction is most noticeable on unoptimized or repeatedly re-saved PDFs that have accumulated orphaned objects. Already-optimized files from professional publishing tools may see little change because they are already efficiently structured.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Email attachments:</strong> Reduce PDF file size to fit within email provider limits (typically 10–25 MB) without removing any visible content.</li>
          <li><strong>Upload portals:</strong> Compress PDFs before uploading to job applications, university submissions, or government forms with strict file size requirements.</li>
          <li><strong>Cloud storage savings:</strong> Reduce the byte footprint of archived PDFs stored in Google Drive, Dropbox, or OneDrive.</li>
          <li><strong>Website downloads:</strong> Optimize PDFs served on your website to reduce download times for visitors on slow connections.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">What gets optimized</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Dead objects:</strong> PDF editors often leave orphaned objects (deleted images, old fonts) in the file. Rebuilding the document drops these.</li>
          <li><strong>Cross-reference table:</strong> The fresh save writes an optimized cross-reference stream instead of a legacy cross-reference table.</li>
          <li><strong>Object streams:</strong> Multiple small PDF objects are packed into compressed object streams, reducing per-object overhead.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why PDF files grow larger over time</h2>
        <p className="mt-2">
          Every time a PDF is opened, edited, and re-saved — even with minor changes like adding a bookmark or correcting a typo — many PDF editors append new data without removing the old version. After several rounds of editing, the file can balloon with redundant objects. This tool rebuilds the file from scratch, keeping only the data that is actually referenced.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>This tool optimizes PDF structure — it does not re-compress embedded images. For image-heavy PDFs, compressing the images before creating the PDF yields the best results.</li>
          <li>Try compression on any PDF and check the before/after size. If the file barely shrinks, it was already well-optimized.</li>
          <li>Compression preserves all visible content, annotations, form fields, and bookmarks.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <p className="mt-2">
          This tool optimizes PDF document structure and cannot reduce the resolution or quality of embedded images. If your PDF is large primarily because of high-resolution photographs, the structure-level optimization may not produce a significant reduction. For image-heavy PDFs, consider compressing the source images before assembling the PDF, or use a tool that supports image re-encoding.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser using pdf-lib. No file content leaves your device. The PDF is loaded into JavaScript memory, rebuilt with optimized structure, and downloaded — all locally.
        </p>
      </section>
    </div>

  );
}
