import { MAX_IMAGE_BYTES } from "@/lib/files";

export function ImageResizerGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload a JPG, PNG, or WebP image up to {Math.round(MAX_IMAGE_BYTES / (1024 * 1024))} MB. Enter target width and height pixel dimensions, toggle the aspect ratio lock as needed, preview the resized image, and download the result.
        </p>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Resizing rules and aspect ratio</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li><strong>Aspect ratio lock:</strong> When enabled, modifying the width automatically calculates the proportionate height (and vice-versa) based on the image original dimensions to prevent distortion or stretching.</li>
          <li><strong>Freeform dimensions:</strong> Unchecking aspect ratio allows custom pixel scaling for banners, digital signage, and exact profile photo specifications.</li>
          <li><strong>Resolution limitations:</strong> Resizing down-samples or interpolates existing pixel data. Upscaling an image increases pixel dimensions but cannot recover missing optical detail.</li>
        </ul>
      </section>
      <section>
        <h2 className="text-xl font-semibold">Privacy and performance</h2>
        <p className="mt-2">
          Resizing executes entirely within your browser using the HTML5 2D canvas context. No images are uploaded across the internet, ensuring rapid processing with complete personal privacy.
        </p>
      </section>
    </div>
  );
}
