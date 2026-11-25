export function PdfPipelineGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Upload a PDF once and chain as many operations as you need: rotate, crop, delete pages, extract pages, reorganize, add page numbers, watermark, compress, or unlock. Each operation creates a new version. You can undo, redo, or jump to any version in the timeline. Download the result at any point.
        </p>
        <p className="mt-2">
          The pipeline eliminates the need to upload, download, and re-upload between individual tools. Instead of processing the same file through 3 or 4 separate tool pages, you apply all transformations in a single session with full version history.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Version history</h2>
        <p className="mt-2">
          Every operation creates a versioned copy (v0 = original, v1 = first operation, v2 = second, etc.). Clicking any version in the timeline jumps to that state. Undo goes back one step; redo goes forward. If you apply a new operation from an earlier version, the later versions are replaced — just like branching in version control.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Available operations</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Rotate:</strong> Rotate all pages by 90°, 180°, or 270° clockwise.</li>
          <li><strong>Crop:</strong> Adjust the visible area by setting top, right, bottom, and left margins in points.</li>
          <li><strong>Delete pages:</strong> Remove specific pages by number or range.</li>
          <li><strong>Extract pages:</strong> Keep only specified pages and discard the rest.</li>
          <li><strong>Reorganize:</strong> Reorder pages in any sequence.</li>
          <li><strong>Add page numbers:</strong> Stamp sequential numbers at your chosen position and font size.</li>
          <li><strong>Watermark:</strong> Add text watermarks with custom opacity and diagonal placement.</li>
          <li><strong>Compress:</strong> Optimize the document structure by removing dead objects.</li>
          <li><strong>Unlock:</strong> Remove owner-password restrictions from encrypted PDFs.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Document cleanup:</strong> Delete blank pages, rotate sideways scans, crop white margins, and add page numbers — all in one session.</li>
          <li><strong>Report preparation:</strong> Extract relevant sections, reorganize chapter order, add a watermark, and compress before distribution.</li>
          <li><strong>Submission prep:</strong> Unlock a restricted PDF, delete cover pages, add page numbers, and compress to meet an upload portal&apos;s size limit.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Apply destructive operations (delete, extract) early in the pipeline, and cosmetic operations (page numbers, watermark) last.</li>
          <li>Use the version timeline to compare before/after states — click any version to preview it.</li>
          <li>Compress as the final step to maximize file size reduction after all other transformations are complete.</li>
          <li>Version history lives in browser memory only — it is lost when you close or refresh the tab.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Why use a pipeline instead of individual tools?</h2>
        <p className="mt-2">
          Without the pipeline, applying three operations to a PDF requires uploading the file three times, downloading intermediate files, and re-uploading each time. The pipeline keeps the PDF in browser memory across all operations, saving time and avoiding the hassle of managing temporary files on your desktop. The version history also lets you experiment freely — if an operation doesn&apos;t produce the result you expected, just click an earlier version and try a different approach.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          All versions live in your browser memory. Nothing is uploaded to any server. Version history is lost when you close the tab, ensuring no data persists beyond your session.
        </p>
      </section>
    </div>
  );
}
