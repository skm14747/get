export function WatermarkPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Enter your watermark text, choose a font size and opacity, and optionally enable diagonal placement. The text is drawn on every page in semi-transparent grey. Encrypted files are refused. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The watermark is rendered as a text overlay using pdf-lib&apos;s page drawing API. It is drawn on top of existing page content with the specified transparency level, ensuring the underlying document remains readable.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Draft marking:</strong> Stamp &ldquo;DRAFT&rdquo; or &ldquo;CONFIDENTIAL&rdquo; across all pages to clearly indicate a document&apos;s status before final approval.</li>
          <li><strong>Copyright protection:</strong> Add your company name or copyright notice across shared PDFs to deter unauthorized redistribution.</li>
          <li><strong>Review copies:</strong> Mark documents as &ldquo;FOR REVIEW ONLY&rdquo; before distributing to external reviewers or beta readers.</li>
          <li><strong>Branding:</strong> Add your organization&apos;s name as a subtle watermark on internal reports and presentations.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Watermark settings</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Opacity:</strong> Lower values (10–20%) create subtle background marks that don&apos;t interfere with readability. Higher values (40–60%) create more prominent stamps for draft or confidential markings.</li>
          <li><strong>Diagonal placement:</strong> Rotates the text at a 45° angle across the page center — the most recognizable watermark layout used in legal and publishing industries.</li>
          <li><strong>Font size:</strong> Larger sizes (48–72pt) create page-spanning watermarks visible at a glance. Smaller sizes (18–24pt) work for subtle footer-style marks.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common watermark text examples</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>&ldquo;DRAFT&rdquo;:</strong> Standard marking for documents under review that should not be treated as final.</li>
          <li><strong>&ldquo;CONFIDENTIAL&rdquo;:</strong> Marks documents containing sensitive business, legal, or personal information.</li>
          <li><strong>&ldquo;SAMPLE&rdquo; or &ldquo;SPECIMEN&rdquo;:</strong> Marks example documents that should not be used as originals.</li>
          <li><strong>Company name or URL:</strong> Branding mark for internal distribution or public-facing documents.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Use 15–20% opacity for professional-looking watermarks that are visible but don&apos;t obstruct the underlying content.</li>
          <li>Keep watermark text short — &ldquo;DRAFT&rdquo;, &ldquo;CONFIDENTIAL&rdquo;, or a company name works best. Long sentences become hard to read at an angle.</li>
          <li>Diagonal placement is harder to remove or crop out, making it more effective for deterring unauthorized use.</li>
          <li>Note that text watermarks can be removed by someone with PDF editing tools — they are a visual deterrent, not a security mechanism.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Limitations</h2>
        <p className="mt-2">
          The watermark is applied as a text overlay on top of page content. It cannot be placed behind existing content (as a background layer) because pdf-lib draws on the page surface. For image-based watermarks (logos, stamps), use the Sign PDF tool to place an image at the desired position.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. The PDF is loaded into browser memory, watermark text is drawn on each page, and the result is downloaded — all without any data leaving your device.
        </p>
      </section>
    </div>
  );
}
