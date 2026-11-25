import Link from "next/link";
import { MAX_IMAGE_BYTES } from "@/lib/files";

export function ImageCompressorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Select or drag-and-drop a JPG, PNG, or WebP image (up to {Math.round(MAX_IMAGE_BYTES / (1024 * 1024))} MB). Adjust the compression quality slider, preview the resulting file size and reduction percentage in real time, and download the compressed image. If you also need to scale pixel dimensions, use our{" "}
          <Link href="/image-resizer" className="text-action underline">
            Image Resizer
          </Link>{" "}
          or crop aspect ratios with{" "}
          <Link href="/image-cropper" className="text-action underline">
            Image Cropper
          </Link>.
        </p>
        <p className="mt-2">
          The tool re-encodes your image through the browser&apos;s native canvas API at your chosen quality level. The before/after file sizes are shown so you can find the optimal balance between visual quality and byte savings.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Compression rules by image format</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>JPEG images:</strong> Uses lossy quantization by re-encoding 8×8 pixel blocks via the browser HTML5 canvas export. Adjusting the quality slider between 0.1 and 1.0 directly tunes the balance between visual sharpness and byte savings.
          </li>
          <li>
            <strong>WebP images:</strong> Advanced modern lossy compression offering 25% to 35% smaller file sizes compared to legacy JPEG at equivalent perceived fidelity.
          </li>
          <li>
            <strong>PNG images:</strong> Browser canvas PNG output is strictly lossless. Compressing a PNG re-encodes clean raster data without altering pixel clarity; photos with photographic gradients are best converted to WebP or JPEG for significant byte reduction.
          </li>
          <li>
            <strong>Converting photos to PDF:</strong> If you need to compile multiple compressed photos into an organized document, use our{" "}
            <Link href="/jpg-to-pdf" className="text-action underline">
              JPG to PDF
            </Link>{" "}
            tool.
          </li>
          <li>
            <strong>Compressing to target sizes (e.g. 100 KB):</strong> File size depends on pixel dimensions and image complexity. A 4000×3000px high-resolution photo cannot be compressed to 100 KB with quality alone without severe blur; to hit strict government portal or upload size limits (like under 100 KB or 50 KB), reduce the width and height with our{" "}
            <Link href="/image-resizer" className="text-action underline">
              Image Resizer
            </Link>{" "}
            first, then apply compression.
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Website performance:</strong> Compress hero images, product photos, and blog images to reduce page load time and improve Core Web Vitals scores.</li>
          <li><strong>Email attachments:</strong> Reduce photo file sizes to fit within email provider attachment limits (typically 25 MB for Gmail).</li>
          <li><strong>Social media uploads:</strong> Compress images before uploading to avoid platform re-compression that may introduce additional quality loss.</li>
          <li><strong>Government and form uploads:</strong> Meet strict file size requirements for visa applications, ID submissions, or official portals.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>A quality setting of 0.7–0.8 typically provides a good balance between file size reduction and visual quality for JPEG images.</li>
          <li>For the most aggressive size reduction, resize the image dimensions first (smaller canvas = smaller file) and then apply compression.</li>
          <li>PNG compression won&apos;t reduce file size much for photographic images — convert to JPEG or WebP for photos, and keep PNG for graphics with text or sharp edges.</li>
          <li>Compare the before/after preview at 100% zoom to verify that compression artifacts are acceptable for your use case.</li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy and local canvas rendering</h2>
        <p className="mt-2">
          Your photos are loaded directly into browser memory and processed via client-side canvas APIs. Image bytes are never transmitted to any cloud server or third-party storage bucket. The compressed output exists only in your browser until you download it.
        </p>
      </section>
    </div>
  );
}
