import Link from "next/link";
import { MAX_IMAGE_BYTES } from "@/lib/files";

export function ImageCompressorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
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
        <h2 className="text-xl font-semibold">Privacy and local canvas rendering</h2>
        <p className="mt-2">
          Your photos are loaded directly into browser memory and processed via client-side canvas APIs. Image bytes are never transmitted to any cloud server or third-party storage bucket.
        </p>
      </section>
    </div>
  );
}
