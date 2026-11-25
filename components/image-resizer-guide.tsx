import { MAX_IMAGE_BYTES } from "@/lib/files";

export function ImageResizerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How it works</h2>
        <p className="mt-2">
          Upload a JPG, PNG, or WebP image up to {Math.round(MAX_IMAGE_BYTES / (1024 * 1024))} MB. Enter target width and height pixel dimensions, toggle the aspect ratio lock as needed, preview the resized image, and download the result. The resizing is performed using the browser&apos;s HTML5 2D canvas context with bilinear interpolation.
        </p>
        <p className="mt-2">
          The original file is never modified — a new image is rendered at your specified dimensions and exported in the same format as the source file.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Resizing rules and aspect ratio</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Aspect ratio lock:</strong> When enabled, modifying the width automatically calculates the proportionate height (and vice-versa) based on the image&apos;s original dimensions to prevent distortion or stretching.</li>
          <li><strong>Freeform dimensions:</strong> Unchecking aspect ratio allows custom pixel scaling for banners, digital signage, and exact profile photo specifications.</li>
          <li><strong>Resolution limitations:</strong> Resizing down-samples or interpolates existing pixel data. Upscaling an image increases pixel dimensions but cannot recover missing optical detail — the result may appear softer.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common use cases</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Social media profiles:</strong> Resize photos to exact platform dimensions like 400×400 for LinkedIn, 110×110 for Instagram, or 800×800 for Etsy product listings.</li>
          <li><strong>Website optimization:</strong> Scale down high-resolution camera photos (4000×3000) to web-friendly sizes (1200×900) to improve page load speed.</li>
          <li><strong>Government portals:</strong> Meet strict upload requirements for passport or visa applications that specify exact pixel dimensions and file size limits.</li>
          <li><strong>Email attachments:</strong> Reduce image dimensions so photos fit within email size limits without installing desktop editing software.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Tips &amp; best practices</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>Always keep the aspect ratio locked unless you intentionally need a non-proportional crop — unlocked resizing can distort faces and text in photos.</li>
          <li>For the smallest file size, resize first to reduce pixel dimensions, then use the Image Compressor to further reduce byte weight.</li>
          <li>When targeting a specific file size limit (e.g. under 100 KB), reduce dimensions aggressively — compression alone may not be enough for high-resolution photos.</li>
          <li>WebP output generally produces smaller files than JPEG at equivalent visual quality.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Understanding image resolution</h2>
        <p className="mt-2">
          Image resolution is determined by pixel dimensions (width × height). A 4000×3000 photo has 12 megapixels. When you resize to 1200×900, you reduce the pixel count to 1.08 megapixels — roughly 91% fewer pixels, which translates to a proportionally smaller file size. For web use, images wider than 1920 pixels rarely provide visible benefit on standard displays.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Common target dimensions</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Instagram profile:</strong> 110 × 110 px (displayed) or 320 × 320 px (stored).</li>
          <li><strong>LinkedIn profile:</strong> 400 × 400 px.</li>
          <li><strong>YouTube thumbnail:</strong> 1280 × 720 px.</li>
          <li><strong>OpenGraph / social share:</strong> 1200 × 630 px.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and performance</h2>
        <p className="mt-2">
          Resizing executes entirely within your browser using the HTML5 2D canvas context. No images are uploaded across the internet, ensuring rapid processing with complete personal privacy. The original and resized images exist only in browser memory.
        </p>
      </section>
    </div>
  );
}
