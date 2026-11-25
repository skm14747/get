export function SignPdfGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Choose how to create your signature: draw it freehand with your mouse or finger, type your name and it renders in a cursive script, or upload an existing signature image (PNG or JPG). Then set the page number (1-based), position in PDF points from the bottom-left corner, and the display width and height. The signature is embedded as an image on the page. The file is limited to 20 MB.
        </p>
        <p className="mt-2">
          The tool rasterizes your signature (whether drawn, typed, or uploaded) into a PNG image, then embeds it at the specified coordinates using pdf-lib. The signature becomes a permanent part of the page content.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Signature creation methods</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Draw:</strong> Use your mouse, trackpad, or touchscreen to draw a freehand signature. Best for natural-looking results on mobile devices with a finger or stylus.</li>
          <li><strong>Type:</strong> Enter your name and select from cursive font styles. Quick and consistent, ideal for professional correspondence.</li>
          <li><strong>Upload:</strong> Provide an existing signature image (PNG or JPG). Useful if you have a pre-scanned signature or a digital signature file from your company.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Contracts and agreements:</strong> Sign NDAs, freelance contracts, or rental agreements without printing, signing, and re-scanning.</li>
          <li><strong>Approval workflows:</strong> Add your signature to internal approval documents, purchase orders, or expense reports.</li>
          <li><strong>Letters and correspondence:</strong> Sign formal letters, recommendation letters, or official communications digitally.</li>
          <li><strong>Notarized documents:</strong> Add a visual signature before submitting documents that require a witnessed signature (check local requirements).</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Important note on legal validity</h2>
        <p className="mt-2">
          This tool places a visual signature image on the PDF. It does not apply a cryptographic digital signature (PKI). For legal purposes, verify whether a visual signature meets your jurisdiction&apos;s requirements. Many contracts and informal agreements accept visual signatures, but some regulated industries require PKI-based digital signatures.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Draw signatures on a touchscreen for the most natural-looking result. Mouse-drawn signatures tend to be less smooth.</li>
          <li>Use a transparent PNG for uploaded signatures so the background doesn&apos;t cover underlying text.</li>
          <li>Position the signature carefully — use the Edit PDF tool&apos;s coordinate system (bottom-left origin) as a reference.</li>
          <li>After signing, consider flattening the PDF (via PDF Forms or Pipeline) to prevent the signature from being moved or removed.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Visual vs. digital signatures</h2>
        <p className="mt-2">
          A <strong>visual signature</strong> (what this tool creates) is an image of your handwriting placed on the document — similar to a wet-ink signature on printed paper. A <strong>digital signature</strong> (PKI/cryptographic) uses a certificate to mathematically bind your identity to the document, providing tamper-evidence and non-repudiation. Most everyday contracts, internal approvals, and informal agreements accept visual signatures. Regulated industries (banking, healthcare, government) may require PKI-based digital signatures.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy</h2>
        <p className="mt-2">
          Processing stays entirely in this browser. No signature, file content, or personal data leaves your device. Your signature image is generated and embedded in browser memory only, and is discarded when you close the tab.
        </p>
      </section>
    </div>

  );
}
