import { MAX_IMAGE_BYTES } from "@/lib/files";

export function ImageCompressorGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Select or drag-and-drop a JPG, PNG, or WebP image (up to {Math.round(MAX_IMAGE_BYTES / (1024 * 1024))} MB). Adjust the compression quality slider, preview the resulting file size and reduction percentage in real time, and download the compressed image.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Compression rules by image format</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>JPEG images:</strong> Uses lossy compression by re-encoding pixel blocks via the browser HTML5 canvas export. Adjusting the quality slider between 0.1 and 1.0 directly tunes the balance between visual sharpness and file size.</li>
          <li><strong>WebP images:</strong> Advanced modern lossy compression offering superior byte savings compared to legacy JPEG at equivalent perceived fidelity.</li>
          <li><strong>PNG images:</strong> Browser canvas PNG output is strictly lossless. Compressing a PNG re-encodes clean raster data without altering pixel clarity; photos with photographic gradients are best converted to WebP or JPEG for significant byte reduction.</li>
          <li><strong>Target size transparency:</strong> Unlike tools that make unrealistic promises (such as compressing any photo to 50 KB without blur), this canvas encoder performs honest quality scaling while preserving legible details.</li>
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
