export function ImageCropperGuide() {
  return (
    <div className="mt-10 max-w-3xl space-y-8 text-[15px] leading-7">
      <section>
        <h2 className="text-xl font-semibold">What is in-browser image cropping?</h2>
        <p className="mt-2">
          Image cropping extracts a specific rectangular coordinate region from a photograph and discards unwanted perimeter pixels. Executed in-browser using the HTML5 2D canvas context, it reframes visual composition, adjusts aspect ratios, and trims borders without uploading original files to third-party servers.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">How to use it</h2>
        <p className="mt-2">
          Upload any JPG, PNG, or WebP photo (up to 15 MB). Select your desired aspect ratio preset (1:1 Square, 16:9 Widescreen, 4:3 Standard, or Freeform) and fine-tune your crop coordinates. The interactive preview highlights your crop area with compositional rule-of-thirds grid lines. Click Download Cropped Image to export your trimmed picture in its native file format.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Common aspect ratios explained</h2>
        <ul className="mt-2 list-disc space-y-2 pl-5">
          <li>
            <strong>1:1 Square:</strong> Perfect for profile avatars, social media grid posts (Instagram), product catalogue thumbnails, and app icon assets.
          </li>
          <li>
            <strong>16:9 Widescreen:</strong> Standard widescreen ratio for YouTube video thumbnails, presentation title slides, desktop wallpaper backgrounds, and OpenGraph share cards.
          </li>
          <li>
            <strong>4:3 Standard:</strong> Classic photography format for tablet displays, presentation slides, and retro display monitors.
          </li>
          <li>
            <strong>3:2 Classic Photo:</strong> Traditional 35mm DSLR film and digital sensor aspect ratio, ideal for physical photo frame prints (4×6 inch prints).
          </li>
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Direct canvas extraction without compression loss</h2>
        <p className="mt-2">
          Cropping uses hardware-accelerated canvas pixel coordinate copying (<code className="rounded bg-line px-1 py-0.5 text-xs">ctx.drawImage</code>) at full native resolution. Cropping a 4000×3000px photo retains pure native pixel clarity without down-sampling or artificial blur.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold">Privacy guarantee for personal photos</h2>
        <p className="mt-2">
          Personal portraits, identification scans, and private family photos are processed entirely inside your local browser memory. Files are never uploaded to cloud buckets or processed on remote server infrastructure.
        </p>
      </section>
    </div>
  );
}
