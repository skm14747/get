export function JpgToPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Select or drop JPG or PNG images. Reorder your photos into the desired sequence, choose whether to format pages to standard A4 paper dimensions or match native image dimensions, and download your consolidated PDF. The conversion uses pdf-lib to embed each image as a separate page in a standards-compliant PDF document.
        </p>
        <p className="mt-2">
          Images are decoded in browser memory and placed into the PDF stream without re-compressing JPEG data, so quality is preserved exactly as the original file. PNG images retain their lossless pixel data as well.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Page sizing and formatting modes</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Standard A4:</strong> Scales each image proportionately to fit within international A4 dimensions (595.28 × 841.89 points) with neat white margins, ideal for printing, assignments, and formal document submissions.</li>
          <li><strong>Match original image:</strong> Creates PDF pages with dimensions identical to each image&apos;s native pixel width and height, avoiding any scaling, margins, or cropping. This mode is best for archiving photos at full resolution.</li>
          <li><strong>Supported formats:</strong> Compatible with JPG/JPEG and PNG image files. WebP files are excluded because standard PDF embedding requires raw JPEG or PNG streams.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Scanned documents:</strong> Combine phone-camera photos of receipts, handwritten notes, or whiteboards into a single PDF for email or cloud storage.</li>
          <li><strong>Student assignments:</strong> Merge hand-drawn diagrams and solution pages photographed from a notebook into one PDF for online submission portals.</li>
          <li><strong>Real estate and insurance:</strong> Compile property photos or accident documentation into a professional multi-page PDF report.</li>
          <li><strong>Portfolio assembly:</strong> Photographers and designers can batch artwork into a shareable PDF lookbook without installing desktop software.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding A4 page dimensions</h2>
        <p className="mt-2">
          A4 is the international standard paper size (210 × 297 mm), used everywhere except North America. In PDF points, A4 is 595.28 × 841.89 points. When you select A4 mode, each image is scaled to fit within these dimensions with proportional margins, ensuring the output looks correct when printed on standard paper.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Drag images in the preview panel to reorder them before converting — the PDF page order will match your arrangement.</li>
          <li>For the smallest file size, compress your images first with our Image Compressor before converting to PDF.</li>
          <li>If your images are landscape-oriented, A4 mode will fit them with white space above and below. Use &ldquo;Match original&rdquo; to avoid extra margins.</li>
          <li>There is no page limit — you can add dozens of images in a single batch.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Supported image formats and limitations</h2>
        <p className="mt-2">
          The tool accepts JPEG/JPG and PNG files. JPEG images are embedded directly into the PDF using their native compressed data stream, so there is no quality loss from re-encoding. PNG images retain their lossless pixel data. WebP, HEIC, AVIF, and other modern formats are not supported because the PDF specification requires JPEG or PNG image streams for universal viewer compatibility.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy: confidential document security</h2>
        <p className="mt-2">
          Photo conversions are executed entirely in your browser tab using pdf-lib. Photos of identity cards, tax forms, receipts, and personal documents are never transmitted across the internet. No server ever sees your images, and the generated PDF exists only in your browser memory until you download it.
        </p>
      </section>
    </div>

  );
}
