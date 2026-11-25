export function PdfToJpgGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Each page of the PDF is rendered to a canvas at the chosen scale and exported as a JPEG image. Single-page PDFs download as a JPG file; multi-page PDFs download as a ZIP archive. Quality and scale are adjustable. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool uses pdf.js to parse and render each PDF page onto an HTML5 canvas element. The canvas is then exported as a JPEG at your specified quality level. This approach preserves text clarity, embedded images, and vector graphics.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Social media sharing:</strong> Convert a PDF flyer, poster, or infographic into a JPG image for posting on Instagram, Facebook, or LinkedIn.</li>
          <li><strong>Presentation slides:</strong> Extract PDF slide pages as individual JPG images for embedding in website articles or email newsletters.</li>
          <li><strong>Thumbnail generation:</strong> Create preview thumbnails of PDF documents for file manager UIs or document listing pages.</li>
          <li><strong>Image editing:</strong> Export PDF pages as JPGs so they can be opened in image editors (Photoshop, GIMP, Canva) for further manipulation.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Quality and scale settings</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Scale factor:</strong> Higher scale values produce larger, sharper images. A scale of 2x renders at double the PDF&apos;s native point dimensions, ideal for high-DPI displays and print.</li>
          <li><strong>JPEG quality:</strong> Controls the lossy compression level. Higher quality (0.9–1.0) produces sharper but larger files. Lower quality (0.5–0.7) reduces file size significantly with some visible compression artifacts.</li>
          <li><strong>ZIP packaging:</strong> Multi-page PDFs are automatically bundled into a single ZIP download with files named <code className="rounded bg-line px-1 py-0.5 text-xs">page-1.jpg</code>, <code className="rounded bg-line px-1 py-0.5 text-xs">page-2.jpg</code>, etc.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding resolution and scale</h2>
        <p className="mt-2">
          PDF pages are defined in points (72 points per inch). At 1x scale, each point maps to one pixel, producing an image at 72 DPI. At 2x scale, each point maps to two pixels, producing 144 DPI — roughly equivalent to standard print quality. For high-DPI (Retina) displays or large-format printing, use 3x or higher scale values.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use scale 2x with quality 0.85 for a good balance between image clarity and file size for most use cases.</li>
          <li>For text-heavy PDFs, higher scale factors preserve text legibility better than higher JPEG quality alone.</li>
          <li>If you need PNG output (lossless, with transparency support), consider using a different tool — this converter outputs JPEG only.</li>
          <li>Large PDFs with many pages may take several seconds to process as each page is rendered individually.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <p className="mt-2">
          PDF pages with complex vector graphics, custom fonts, or transparency effects are rendered as closely as the pdf.js library supports. Some rare font substitutions or color profile differences may appear slightly different from Adobe Acrobat&apos;s rendering. For most standard documents containing text, images, and simple graphics, the output is visually identical to what you see in your PDF viewer.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Rendering runs entirely in this browser using pdf.js. The file is never uploaded to any server. All page rendering and JPEG encoding happens in your browser memory.
        </p>
      </section>
    </div>

  );
}
